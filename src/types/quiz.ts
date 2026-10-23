/*
Extended Question Schema
This file defines the types for the quiz questions used in the application.
*/

export type QuestionType = 'multiple_choice' | 'dropdown' | 'drag_and_drop';

export interface BaseQuestion {
  id: number;
  domain: 'cloud_concepts' | 'architecture_services' | 'management_governance';
  skillRef: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3;
  explanation: string;
  padi_analogy?: string;
}

// 1. Standard Multiple Choice
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  scenario: string;
  options: { id: 'a' | 'b' | 'c' | 'd'; text: string; whyNot?: string }[];
  correct: 'a' | 'b' | 'c' | 'd';
}

// 2. Dropdown (Inline Fill-in-the-Blank)
export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  prompt: string; // e.g. "To protect against datacenter failures within a single region, deploy across {{blank_1}}. To protect against regional disasters at least 300 miles away, use {{blank_2}}."
  blanks: {
    id: string; // "blank_1"
    options: string[]; // ["Availability Zones", "Region Pairs", "Resource Groups"]
    correct: string;
  }[];
}

// 3. Drag-and-Drop (Matching / Categorization)
export interface DragDropQuestion extends BaseQuestion {
  type: 'drag_and_drop';
  instruction: string; // e.g. "Match each cloud service model to the layer the customer manages."
  items: { id: string; label: string }[]; // Draggable items
  targets: { id: string; targetLabel: string; correctItemId: string }[]; // Drop zones
}

export type Question = MultipleChoiceQuestion | DropdownQuestion | DragDropQuestion;
