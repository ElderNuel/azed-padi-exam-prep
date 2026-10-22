import { useSyncExternalStore } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { freshProgress, normalizeProgress, type Progress } from './progress';

const KEY = 'azedpadi:v1:state';
type Status = 'local'|'syncing'|'synced'|'offline'|'memory';
let info: {status:Status; signedIn:boolean} = {status:'local',signedIn:false};
const listeners = new Set<()=>void>();
let userId: string | undefined;
let revision = 0;
let busy = false;
let initialized = false;
let localOK = true;
let timer: ReturnType<typeof setTimeout> | undefined;
let current = freshProgress();
let receive: (s:Progress)=>void = ()=>{};
const key = () => userId ? `${KEY}:${userId}` : KEY;
function publish(status:Status) { info={status,signedIn:!!userId}; listeners.forEach(l=>l()); }
function notice(message:string) { toast.info(message,{id:'progress-sync'}); }
export function readLocalProgress(): Progress {
  try { const raw=localStorage.getItem(key()); return raw ? normalizeProgress(JSON.parse(raw)) : freshProgress(); }
  catch { notice('Your saved progress could not be opened. You can keep studying.'); return freshProgress(); }
}
function saveLocal(dirty:boolean) {
  try { localStorage.setItem(key(),JSON.stringify(current)); if(dirty) localStorage.setItem(`${key()}:pending`,'true'); localOK=true; }
  catch { localOK=false; notice('Browser saving is unavailable. Keep this tab open to retain your progress.'); }
}
function pending() { try { return localStorage.getItem(`${key()}:pending`)==='true'; } catch { return true; } }
export function writeProgress(s:Progress) {
  current=normalizeProgress(s); revision++; saveLocal(true);
  publish(!localOK?'memory':!navigator.onLine?'offline':'local');
  clearTimeout(timer); timer=setTimeout(()=>void syncProgress(),400);
}
export async function syncProgress() {
  if(busy || !userId || !navigator.onLine) { if(!navigator.onLine) publish('offline'); return; }
  busy=true; const owner=userId; const rev=revision; const snapshot=current;
  publish('syncing');
  try {
    const {error}=await supabase.rpc('save_learner_progress',{payload:JSON.parse(JSON.stringify(snapshot))});
    if(error) throw error;
    if(owner!==userId) return;
    if(revision===rev) { try {localStorage.removeItem(`${key()}:pending`);} catch { /* retained in memory */ } publish(localOK?'synced':'memory'); }
  } catch {
    if(owner===userId) { publish(localOK?'local':'memory'); notice('Cloud sync is paused. Your local progress is safe; we’ll reconnect automatically.'); }
  } finally {
    busy=false;
    if(owner!==userId || revision!==rev) void syncProgress();
  }
}
async function restoreCloud(owner:string) {
  const rev=revision;
  publish('syncing');
  try {
    const [plan,attempts,analogies,profile]=await Promise.all([
      supabase.from('study_plans').select('state').eq('user_id',owner).maybeSingle(),
      supabase.from('quiz_attempts').select('*').eq('user_id',owner),
      supabase.from('saved_padi_analogies').select('*').eq('user_id',owner),
      supabase.from('profiles').select('*').eq('id',owner).maybeSingle(),
    ]);
    for(const result of [plan,attempts,analogies,profile]) if(result.error) throw result.error;
    if(owner!==userId || rev!==revision) return;
    if(plan.data) {
      current=normalizeProgress({...freshProgress(),...(plan.data.state as object),
        attempts:Object.fromEntries((attempts.data??[]).map(a=>[a.question_id,{qid:a.question_id,chosen:a.chosen_option,domain:a.domain,correct:a.is_correct,at:Date.parse(a.timestamp)}])),
        bookmarks:(analogies.data??[]).map(a=>({id:a.id,title:a.title,analogy:a.analogy,source:a.source,at:Date.parse(a.timestamp)})),
        ...(profile.data ? {displayName:profile.data.display_name,vibe:profile.data.preferred_language,examDate:profile.data.exam_date??'',hours:profile.data.daily_hours}:{}),
      });
      saveLocal(false); receive(current); publish(localOK?'synced':'memory');
    } else { saveLocal(true); await syncProgress(); }
  } catch { if(owner===userId) {publish('local'); notice('Cloud progress is temporarily unavailable. Your local copy is ready.');} }
  finally { if(owner===userId && revision!==rev) void syncProgress(); }
}
async function changeAccount(id?:string) {
  if(id===userId) return;
  const guest=current;
  userId=id; revision++;
  // Never import another account's cached progress into this account.
  let existing=false;
  try {existing=!!localStorage.getItem(key());} catch { /* use in-memory fallback */ }
  current=id && !existing && !info.signedIn ? guest : readLocalProgress();
  receive(current); publish(navigator.onLine?'local':'offline');
  if(id && navigator.onLine) { if(pending()) await syncProgress(); else await restoreCloud(id); }
}
export function initializeStorage(onRestore:(s:Progress)=>void) {
  if(initialized || typeof window==='undefined') return;
  initialized=true; receive=onRestore; current=readLocalProgress(); receive(current);
  supabase.auth.onAuthStateChange((event,session)=>{
    if(['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)) setTimeout(()=>void changeAccount(session?.user.id),0);
  });
  void (async()=>{
    try {const {data,error}=await supabase.auth.getSession(); if(error) throw error; await changeAccount(data.session?.user.id);}
    catch {notice('Sign-in is temporarily unavailable. Local study mode is ready.');}
    finally {if(!userId) publish(navigator.onLine?'local':'offline');}
  })();
  window.addEventListener('online',()=>{if(userId) {if(pending()) void syncProgress();else void restoreCloud(userId);}else publish('local');});
  window.addEventListener('offline',()=>publish('offline'));
}
const serverInfo = {status:'local' as Status,signedIn:false};
export function useSyncStatus() { return useSyncExternalStore(l=>{listeners.add(l);return()=>{listeners.delete(l);};},()=>info,()=>serverInfo); }