// AZed Padi question bank. Original practice items, not real exam content.
// To replace/extend: paste a new array into `seedQuestions` keeping the same shape.
export type DomainKey = "d1" | "d2" | "d3";
export type OptionKey = "A" | "B" | "C" | "D";
export interface Question {
  id: number;
  domain: string;
  domain_key: DomainKey;
  domain_weight: string;
  topic: string;
  question_type: string;
  scenario: string;
  question: string;
  options: Record<OptionKey, string>;
  correct_option: OptionKey;
  explanation: string;
  padi_analogy: string;
  exam_trap_warning: string;
}

export const DOMAINS: Record<DomainKey, { name: string; short: string; weight: string; factor: number }> = {
  d1: { name: "Describe Cloud Concepts", short: "Cloud Concepts", weight: "25–30%", factor: 0.275 },
  d2: { name: "Describe Azure Architecture and Services", short: "Architecture & Services", weight: "35–40%", factor: 0.375 },
  d3: { name: "Describe Azure Management and Governance", short: "Management & Governance", weight: "30–35%", factor: 0.35 },
};

export const seedQuestions: Question[] = [
  {
    "id": 1,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "High availability vs. fault tolerance (SLA-backed uptime)",
    "question_type": "Scenario Decision",
    "scenario": "PayLagos, a Lagos fintech, is preparing for the December salary rush. Its CTO tells the architect: 'Our wallet service must stay reachable whatever disruption hits, and I want the provider's uptime promise in writing before I sign.'",
    "question": "Which cloud concept is the CTO asking for, and where does the provider put that promise in writing?",
    "options": {
      "A": "Scalability, stated in the monthly cost report",
      "B": "High availability, stated in the service-level agreement (SLA)",
      "C": "Fault tolerance, stated in the shared responsibility model",
      "D": "Predictability, stated in the Azure Pricing Calculator"
    },
    "correct_option": "B",
    "explanation": "B wins: the study notes define high availability as ensuring maximum availability regardless of disruptions, and Azure backs it with uptime guarantees that are part of each service's SLA. A is wrong: scalability adjusts resources to demand and is not an uptime promise. C is wrong: fault tolerance (a general design term the notes do not define) describes a system that keeps running through component failures, and the shared responsibility model divides security duties, not uptime guarantees. D is wrong: predictability covers performance and cost forecasting, and the Pricing Calculator only estimates cost.",
    "padi_analogy": "A danfo driver who shouts 'I go reach Yaba!' is hoping; a bus company that prints 'arrive by 8 a.m. or get a refund' on the ticket has an SLA. High availability is the engineering that keeps the buses running, and the SLA is the printed promise.",
    "exam_trap_warning": "The exam pairs 'uptime guarantee' with the SLA, so do not let 'fault tolerance' or 'scalability' sound more technical than the document that actually carries the promise.",
    "domain_key": "d1"
  },
  {
    "id": 2,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Vertical scaling (up/down) vs. horizontal scaling (out/in)",
    "question_type": "Scenario Decision",
    "scenario": "ShambaPay, a Nairobi agritech marketplace, runs its produce-ordering app on one virtual machine. During the Nakuru harvest festival the VM's CPU pins at 100%. The team adds eight identical VMs behind a load balancer, then removes them when the festival ends.",
    "question": "Which scaling approach did the team use?",
    "options": {
      "A": "Vertical scaling up, then vertical scaling down",
      "B": "Vertical scaling out, then vertical scaling in",
      "C": "Horizontal scaling: scale out, then scale in",
      "D": "Disaster recovery failover to a second region"
    },
    "correct_option": "C",
    "explanation": "C wins: horizontal scaling adds or subtracts the number of resources (more VMs or containers), scaling out when demand jumps and in when it drops, manually or automatically. A is wrong: vertical scaling changes the capability of one resource, such as adding CPU or RAM to the VM, which the team never did. B is wrong: 'out' and 'in' belong to horizontal scaling; vertical scaling uses 'up' and 'down'. D is wrong: failover to another region answers an outage, not a traffic surge.",
    "padi_analogy": "Vertical scaling is giving one porter at Wakulima Market a bigger trolley; horizontal scaling is calling eight more porters for the day and sending them home at closing time. When the harvest crowd arrives, the market with eight porters never strains a single back.",
    "exam_trap_warning": "The exam swaps the directions on purpose: up/down is vertical (a bigger or smaller machine), out/in is horizontal (more or fewer machines).",
    "domain_key": "d1"
  },
  {
    "id": 3,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Agility vs. elasticity in cloud workloads",
    "question_type": "Scenario Decision",
    "scenario": "Gold Coast Freight, a logistics firm in Tema, wins a contract that starts in nine days and needs a new shipment-tracking environment. In its old datacenter, buying and racking servers took four months.",
    "question": "Which cloud benefit lets the team have the environment ready in days instead of waiting months for hardware?",
    "options": {
      "A": "Agility: deploying capacity quickly without up-front procurement",
      "B": "Elasticity: capacity that stretches and shrinks with live demand",
      "C": "Fault tolerance: components keep working when a part fails",
      "D": "CapEx: spending up front on physical infrastructure"
    },
    "correct_option": "A",
    "explanation": "A wins: the study notes explain that deploying compute in the cloud instead of buying and configuring physical servers months in advance improves agility. B is wrong: elasticity (a general cloud term; the notes frame demand-driven change as scalability, scaling out and in) is about capacity following load, but this problem is time-to-deploy, not fluctuating load. C is wrong: fault tolerance concerns surviving failures. D is wrong: CapEx is the up-front hardware spending the cloud removes.",
    "padi_analogy": "Agility is walking into a Tema warehouse and leasing a loading bay by lunchtime instead of waiting four months to build your own. Elasticity is the bay that quietly grows when containers pile up and shrinks when they leave.",
    "exam_trap_warning": "The exam dangles elasticity whenever a scenario mentions growth, but speed of provisioning is agility and demand-driven stretching is elasticity (scalability).",
    "domain_key": "d1"
  },
  {
    "id": 4,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Disaster recovery vs. high availability",
    "question_type": "Scenario Decision",
    "scenario": "Rand Health runs its patient-records system in its own Johannesburg datacenter. Regulators now require that critical records workloads can keep running somewhere else if the whole datacenter becomes unavailable, for example after a flood.",
    "question": "Which approach meets this requirement?",
    "options": {
      "A": "Buy larger servers for the datacenter (vertical scaling)",
      "B": "Switch to pay-as-you-go billing to lower costs",
      "C": "Add a second rack of servers in the same datacenter for high availability",
      "D": "Keep failover capacity in Azure and run critical workloads there if the primary site is unavailable"
    },
    "correct_option": "D",
    "explanation": "D wins: the study notes describe disaster recovery as keeping failover capacity in Azure and running critical workloads there if the primary site is unavailable. A is wrong: a bigger server raises performance but still sits in the flooded building. B is wrong: billing models change cost, not survivability. C is wrong: a second rack protects against single-component failures but shares the same building, so a site-wide loss takes both racks down.",
    "padi_analogy": "High availability is keeping two generators in the same compound so one failure does not plunge you into darkness. Disaster recovery is owning a second compound in another city for the day the first one floods.",
    "exam_trap_warning": "'If the entire site is lost' signals disaster recovery; if the scenario mentions only a failed component or maintenance, think high availability.",
    "domain_key": "d1"
  },
  {
    "id": 5,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Capital expenditure (CapEx) vs. operational expenditure (OpEx)",
    "question_type": "Scenario Decision",
    "scenario": "A Kigali health-tech startup has two quotes: buy twenty servers and rent datacenter space up front, or run the same workload on Azure and pay monthly for the resources it uses.",
    "question": "How would the finance team classify the Azure spending?",
    "options": {
      "A": "CapEx, because Azure replaces physical servers",
      "B": "OpEx, because services are paid for as they are consumed",
      "C": "CapEx, because Azure requires a prepaid hardware deposit",
      "D": "Neither, because cloud spending cannot be classified"
    },
    "correct_option": "B",
    "explanation": "B wins: CapEx is up-front spending on physical infrastructure such as servers, network hardware, and datacenter space; OpEx is ongoing spending on services over time, and the study notes classify cloud computing as an operational expense because you pay as you consume. A is wrong: replacing servers does not make the payment up-front hardware spending. C is wrong: Azure has no hardware deposit; you rent compute and storage. D is wrong: the consumption-based model fits OpEx exactly.",
    "padi_analogy": "Buying servers is like building your own petrol station in Kigali: huge cash on day one, whether or not cars come. Using Azure is buying fuel at the pump: you pay for the litres you take.",
    "exam_trap_warning": "The size of the bill does not decide the category: up-front money for hardware is CapEx, and pay-per-consumption is OpEx even when the invoice is large.",
    "domain_key": "d1"
  },
  {
    "id": 6,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Consumption-based (pay-as-you-go) pricing benefits",
    "question_type": "Scenario Decision",
    "scenario": "TiketiYetu, a Nairobi concert-ticketing platform, is flooded with buyers on festival weekends and nearly idle the rest of the month. The CFO wants the cloud bill to follow that pattern.",
    "question": "Which statement describes the benefit of the consumption-based model for TiketiYetu?",
    "options": {
      "A": "It pays for peak capacity all year so it never runs short",
      "B": "It controls the hardware replacement schedule in the provider's datacenter",
      "C": "It adds resources when demand rises, releases them when demand falls, and avoids up-front hardware costs",
      "D": "It pays a fixed monthly amount whatever the usage"
    },
    "correct_option": "C",
    "explanation": "C wins: the study notes list no upfront hardware cost, no need to buy and manage capacity that may sit underutilized, and the ability to add or release resources as demand changes. A is wrong: paying for peak all year is the old datacenter habit the model removes. B is wrong: the provider owns hardware, so the customer does not schedule replacement. D is wrong: consumption-based means you pay for what you use and nothing more, not a flat fee.",
    "padi_analogy": "Pay-as-you-go is renting plastic chairs by the hour for a wedding: two hundred on Saturday, returned on Sunday. You never store two hundred chairs in your sitting room for the other fifty-one weeks.",
    "exam_trap_warning": "Any option promising 'fixed' or 'peak-sized' cost contradicts the model: its point is that you stop paying for capacity the moment you release it.",
    "domain_key": "d1"
  },
  {
    "id": 7,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Serverless computing core characteristics",
    "question_type": "Scenario Decision",
    "scenario": "NairaOTP, a Lagos fintech, sends one-time passcodes when customers log in. Traffic spikes at month-end and is almost silent overnight, and the team does not want to patch servers or pay for idle capacity.",
    "question": "Which characteristic of serverless computing best fits this workload?",
    "options": {
      "A": "Code runs in response to events, scales automatically with demand, and billing covers only the compute time used while it runs",
      "B": "The team keeps a pool of VMs running at all times so code can respond instantly",
      "C": "The team selects the VM size and patches the operating system",
      "D": "Capacity must be provisioned in advance for the month-end peak"
    },
    "correct_option": "A",
    "explanation": "A wins: per the study notes, Azure Functions is event-driven and serverless; an event wakes the function, so no resources need to stay provisioned when there are no events, it scales automatically with demand, deallocates resources when the work finishes, and charges only for the CPU time used. Servers still exist; the provider manages them. B is wrong: keeping resources provisioned is the VM model serverless avoids. C is wrong: choosing VM sizes and patching the OS is IaaS work. D is wrong: serverless scales automatically, so no peak provisioning is needed.",
    "padi_analogy": "Serverless is an okada that appears when you wave and vanishes when you pay. You never rent one to idle outside your gate all night.",
    "exam_trap_warning": "'Serverless' does not mean no servers exist; the exam means you manage none of them and idle time costs nothing.",
    "domain_key": "d1"
  },
  {
    "id": 8,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Shared responsibility: physical security and host infrastructure",
    "question_type": "Scenario Decision",
    "scenario": "Cedi Trust Bank in Accra runs customer-facing VMs in Azure. Its auditors ask who must guard the datacenter building and keep its power, cooling, and network connectivity running.",
    "question": "According to the shared responsibility model, who is responsible?",
    "options": {
      "A": "Cedi Trust's security team, because it owns the data on the VMs",
      "B": "Cedi Trust, because the VMs are IaaS",
      "C": "Both parties equally, with each covering half of physical security",
      "D": "The cloud provider, because physical security, power, cooling, and network connectivity are always its responsibility"
    },
    "correct_option": "D",
    "explanation": "D wins: the study notes state that physical security, power, cooling, and network connectivity belong to the cloud provider, since the consumer is not collocated with the datacenter. A is wrong: owning the data makes Cedi Trust responsible for the data, not the building. B is wrong: even in IaaS, where the consumer carries the most responsibility, the provider keeps the physical basics. C is wrong: the model assigns these items to the provider; it does not split them in halves.",
    "padi_analogy": "When you rent a stall in Makola Market, the market authority hires the guards at the gate and keeps the power running. Your job is to lock your own goods.",
    "exam_trap_warning": "Even in IaaS, where you manage the most, physical security, power, cooling, and network connectivity never move to the customer.",
    "domain_key": "d1"
  },
  {
    "id": 9,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Shared responsibility: data, devices, and accounts always stay with the customer",
    "question_type": "Scenario Decision",
    "scenario": "Umoja Savings SACCO in Nairobi is moving member management to a SaaS product. The board asks which responsibilities remain theirs no matter which cloud service type they choose.",
    "question": "Which set always remains the SACCO's responsibility?",
    "options": {
      "A": "Physical datacenter security, power, and cooling",
      "B": "Its information and data, the devices allowed to connect, and the accounts and identities of its people",
      "C": "Patching the host infrastructure that runs the service",
      "D": "Maintaining the vendor's application code and updates"
    },
    "correct_option": "B",
    "explanation": "B wins: the study notes say the consumer is always responsible for the information and data stored in the cloud, the devices allowed to connect, and the accounts and identities of people, services, and devices. A is wrong: physical security, power, and cooling always belong to the provider. C is wrong: host infrastructure sits with the provider in SaaS. D is wrong: in SaaS the provider handles infrastructure patching and application updates.",
    "padi_analogy": "A landlord fixes the roof and the wiring, but if you hand your gate key to a stranger, that is on you. In the cloud, your data, your devices, and your logins are the keys.",
    "exam_trap_warning": "A SaaS label does not remove your duties: the exam keeps data, devices, and identities on the customer side in every service type.",
    "domain_key": "d1"
  },
  {
    "id": 10,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "IaaS vs. PaaS vs. SaaS responsibility matrix",
    "question_type": "Scenario Decision",
    "scenario": "Pearl Cargo, a Kampala logistics firm, compares three offers: raw virtual machines on which it installs its own software, a managed database service the vendor maintains, and a ready-made email and calendar suite.",
    "question": "Order the three offers from the MOST customer responsibility to the LEAST.",
    "options": {
      "A": "Email suite, managed database, raw virtual machines",
      "B": "Managed database, raw virtual machines, email suite",
      "C": "Raw virtual machines, managed database, email suite",
      "D": "Raw virtual machines, email suite, managed database"
    },
    "correct_option": "C",
    "explanation": "C wins: the study notes place the most responsibility on the consumer in IaaS (raw VMs), where the provider covers only physical security, power, and connectivity. In PaaS the provider maintains the platform, such as the database engine, while you still own your data. In SaaS the provider also handles infrastructure patching and application updates, leaving you user onboarding, access controls, and data governance. A is wrong: it reverses the whole order. B is wrong: it ranks the managed database above raw VMs. D is wrong: it ranks the SaaS suite above the managed database, but SaaS sits at the provider-heavy end.",
    "padi_analogy": "IaaS is renting an empty plot in Kampala and building the shop yourself; PaaS is renting a fitted shop where you only bring stock. SaaS is buying from an online store and never touching a wall.",
    "exam_trap_warning": "Read the superlative first: the exam flips between 'most' and 'least' responsibility to catch candidates who rank on autopilot.",
    "domain_key": "d1"
  },
  {
    "id": 11,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Public vs. private vs. hybrid cloud scenarios",
    "question_type": "Scenario Decision",
    "scenario": "Kruger Mutual, a Johannesburg bank, must keep its core ledger in its own datacenter for regulatory control, but wants public cloud resources to absorb the mobile-banking surge every festive season.",
    "question": "Which cloud model fits Kruger Mutual?",
    "options": {
      "A": "Hybrid cloud",
      "B": "Public cloud only",
      "C": "Private cloud only",
      "D": "Multicloud"
    },
    "correct_option": "A",
    "explanation": "A wins: a hybrid cloud uses public and private clouds in an interconnected environment, lets a private cloud surge with public resources for temporary demand, and lets you decide where each application runs for security, compliance, or legal reasons. B is wrong: a public-only design gives up the control Kruger Mutual needs for the ledger. C is wrong: a private-only design needs hardware bought for the peak, which is the CapEx burden hybrid avoids. D is wrong: multicloud means two or more public providers, with no private cloud involved.",
    "padi_analogy": "Hybrid is keeping your cash in the vault at home while hiring taxis from the rank when the festive crowd arrives. The vault stays yours and the taxis flex.",
    "exam_trap_warning": "Whenever a scenario keeps something on-premises and bursts or extends into Azure, the answer is hybrid, not public.",
    "domain_key": "d1"
  },
  {
    "id": 12,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Multicloud architecture scenarios",
    "question_type": "Service Matching",
    "scenario": "Savannah Shield Insurance in Nairobi runs its analytics on Azure and its claims processing on a different public cloud provider. The CIO wants one way to manage resources across both.",
    "question": "Which model describes this setup, and which Azure technology helps manage resources across both?",
    "options": {
      "A": "Hybrid cloud, with Azure Arc",
      "B": "Multicloud, with Azure Advisor",
      "C": "Private cloud, with Azure Arc",
      "D": "Multicloud, with Azure Arc"
    },
    "correct_option": "D",
    "explanation": "D wins: a multicloud environment uses two or more public cloud providers, and Azure Arc helps manage a cloud environment whether it is solely on Azure, a private cloud in your datacenter, hybrid, or running on multiple cloud providers at once. A is wrong: hybrid combines public and private clouds, not two public providers. B is wrong: the model is right but Azure Advisor only recommends improvements to reliability, security, performance, operational excellence, and cost; it does not manage resources across providers. C is wrong: nothing here is a private cloud.",
    "padi_analogy": "Multicloud is buying maize at Wakulima Market and tomatoes at Marikiti because each stall sells what the other does not. Azure Arc is the one notebook where you track every purchase, whichever market it came from.",
    "exam_trap_warning": "Two public providers means multicloud; hybrid requires a private cloud in the mix, and the exam loves swapping those words.",
    "domain_key": "d1"
  },
  {
    "id": 13,
    "domain": "Cloud Concepts",
    "domain_weight": "25-30%",
    "topic": "Sovereign cloud regions (Azure Government and Azure China via 21Vianet)",
    "question_type": "Service Matching",
    "scenario": "Rift Valley Teas, a Nairobi tea exporter, opens a Shanghai office. Local rules require it to host customer data in China through a local operating partner.",
    "question": "Which Azure offering fits this requirement?",
    "options": {
      "A": "Azure Government regions",
      "B": "Azure China regions, delivered through a partnership between Microsoft and 21Vianet",
      "C": "A region pair in Europe",
      "D": "An availability zone in any region"
    },
    "correct_option": "B",
    "explanation": "B wins: sovereign regions are isolated instances of Azure for compliance or legal purposes, and the China regions (such as China East and China North) run through a partnership with 21Vianet, where Microsoft does not directly maintain the datacenters. A is wrong: Azure Government regions (US DoD Central, US Gov Virginia, US Gov Arizona) are isolated for U.S. government agencies and partners. C is wrong: region pairs are regular regions paired for resiliency within a geography. D is wrong: an availability zone isolates datacenters inside one region; it gives no legal isolation.",
    "padi_analogy": "A sovereign region is a duty-free zone with its own customs officers: same airline, different rules at the border. In China, 21Vianet is the local operator at that border post.",
    "exam_trap_warning": "The exam ties Azure Government to U.S. government agencies and partners, and Azure China to the 21Vianet partnership, so do not swap them.",
    "domain_key": "d1"
  },
  {
    "id": 14,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Azure regions and data residency requirements",
    "question_type": "Scenario Decision",
    "scenario": "Highveld Clinics, a Johannesburg hospital network, must keep patient data inside the geography where it operates. The architect also wants a built-in backup partner for the primary region.",
    "question": "Which approach best supports the residency requirement?",
    "options": {
      "A": "Deploy to the cheapest region, since all regions keep data in the same country",
      "B": "Use availability zones, because zones keep copies of the data in other geographies",
      "C": "Choose a region in the required geography; its region pair keeps data in that same geography (Brazil South is the exception)",
      "D": "Rely on global services, because they let you pick one specific datacenter"
    },
    "correct_option": "C",
    "explanation": "C wins: you pick the region at deployment, and the study notes say data continues to reside within the same geography as its pair for data-residency and compliance purposes, except for Brazil South, which is paired with South Central US outside its geography. A is wrong: prices differ by region, and the cheapest region may sit outside the required geography. B is wrong: availability zones are datacenters inside one region; they do not copy data to other geographies. D is wrong: global Azure services do not require you to select a region, so you do not control their location.",
    "padi_analogy": "Choosing a region is choosing which city's warehouse holds your stock, and its region pair is the sister warehouse inside the same trading bloc. Only Brazil South keeps its sister warehouse across the ocean.",
    "exam_trap_warning": "Brazil South is the exam's favorite exception: it is paired outside its geography, so residency assumptions about pairs carry a footnote.",
    "domain_key": "d2"
  },
  {
    "id": 15,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Availability Zones (minimum three, independent power, cooling, networking)",
    "question_type": "Service Matching",
    "scenario": "Eko Switch, a Lagos payment processor, must survive the loss of an entire datacenter while keeping its data inside a single Azure region.",
    "question": "Which design meets this requirement?",
    "options": {
      "A": "Spread VMs across Availability Zones",
      "B": "Place all VMs in one availability set within a single datacenter",
      "C": "Peer two virtual networks",
      "D": "Scale the VMs up to a larger size"
    },
    "correct_option": "A",
    "explanation": "A wins: availability zones are physically separate datacenters within a region, each with independent power, cooling, and networking, set up as an isolation boundary so that if one zone goes down the others keep working. AZ-enabled regions have a minimum of three zones, and not every region supports them. B is wrong: availability sets reduce the chance that one maintenance event or hardware failure hits all VMs, but they do not separate datacenters. C is wrong: peering connects networks privately and adds no datacenter resilience. D is wrong: a bigger VM adds capacity, not isolation.",
    "padi_analogy": "A Lagos bank keeps one branch in Victoria Island, one in Ikeja, and one in Lekki, each on its own power grid. When the Ikeja grid fails, the other two keep serving customers.",
    "exam_trap_warning": "Not every Azure region supports availability zones, so the exam can offer zones in a region that has none.",
    "domain_key": "d2"
  },
  {
    "id": 16,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Azure region pairs (300+ miles apart, sequential updates)",
    "question_type": "Scenario Decision",
    "scenario": "Bandari Track, a Mombasa shipping-tracker startup, replicates data between paired Azure regions. Its engineers worry that a platform update could hit both regions of the pair at the same moment.",
    "question": "Which statement about Azure region pairs is correct?",
    "options": {
      "A": "Paired regions sit within 50 miles of each other to cut replication latency",
      "B": "Planned updates are rolled out to both regions of a pair at the same moment",
      "C": "A pair always replicates data to a different geography",
      "D": "Paired regions are at least 300 miles apart, and planned updates roll out one region at a time"
    },
    "correct_option": "D",
    "explanation": "D wins: per the study notes, most regions are paired with another region in the same geography at least 300 miles away, and planned Azure updates roll out to paired regions one region at a time to minimize downtime and risk. A is wrong: the pair is deliberately far apart so one event cannot hit both. B is wrong: simultaneous updates would defeat the pair. C is wrong: data stays in the same geography as its pair, with Brazil South as the exception.",
    "padi_analogy": "Region pairs are two fuel depots hundreds of miles apart, and the fuel authority upgrades one depot at a time so the other keeps pumping. In a big outage, one depot of the pair is reopened first.",
    "exam_trap_warning": "Distance is at least 300 miles and updates are sequential, so any option with 'simultaneous' updates or a short distance is bait.",
    "domain_key": "d2"
  },
  {
    "id": 17,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Hierarchy: management groups, subscriptions, resource groups, resources",
    "question_type": "Scenario Decision",
    "scenario": "Afrimart Group, a retailer with subsidiaries in Nigeria, Kenya, and Ghana, has thirty Azure subscriptions. Compliance wants one policy limiting VM locations across all of them, and security wants a single role assignment covering every subscription.",
    "question": "Which design meets both goals, and how deep can management groups nest?",
    "options": {
      "A": "Assign at each resource group; management groups nest up to three levels",
      "B": "Assign at a management group above the subscriptions; management groups nest up to six levels, not counting the root or subscription levels",
      "C": "Assign at each subscription by script; management groups cannot be nested",
      "D": "Assign at each resource; management groups nest up to ten levels"
    },
    "correct_option": "B",
    "explanation": "B wins: management groups sit above subscriptions, and policies or Azure RBAC assignments made on a group are inherited by every sub-group, subscription, resource group, and resource beneath it; the owner of a subscription cannot override an inherited policy. The notes allow nesting up to six levels, not counting the Tenant Root Group level or the subscription level. A is wrong: thirty subscriptions would need many separate assignments, and the limit is six, not three. C is wrong: scripting per subscription is the work management groups remove, and nesting is allowed. D is wrong: resource-level assignment does not scale, and the limit is six, not ten.",
    "padi_analogy": "A management group is the head office of a family of shops: one memo from head office binds every branch from Lagos to Nairobi. Branch managers can rearrange their own shelves but cannot overrule the memo.",
    "exam_trap_warning": "The six-level limit excludes the root level and the subscription level, so a question that counts them is testing whether you remember the exclusion.",
    "domain_key": "d2"
  },
  {
    "id": 18,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Resource group rules",
    "question_type": "Scenario Decision",
    "scenario": "A Nairobi agritech team builds a temporary dev environment. A junior engineer proposes putting the shared virtual network into two resource groups, nesting the groups by team, and deleting the whole environment when the project ends.",
    "question": "Which statement about resource groups is correct?",
    "options": {
      "A": "A resource can belong to two resource groups at once if it is shared",
      "B": "Resource groups can be nested to mirror team structure",
      "C": "Deleting a resource group deletes every resource in it",
      "D": "Every resource must be in the same region as its resource group"
    },
    "correct_option": "C",
    "explanation": "C wins: the study notes state that deleting a resource group deletes everything in it, which is why grouping a temporary environment makes cleanup a single action. A is wrong: every resource belongs to exactly one resource group at a time, though some resources can be moved between groups. B is wrong: resource groups cannot be nested (and cannot be renamed after creation). D is wrong: a resource group is a logical container, so its resources can sit in different regions (general Azure behavior beyond the study notes).",
    "padi_analogy": "A resource group is a shipping container: everything inside travels, and sinks, together, and a parcel cannot sit in two containers at once. Drop the container in the lagoon and every parcel goes with it.",
    "exam_trap_warning": "'Exactly one resource group per resource' and 'groups cannot be nested' are the two statements the exam loves to flip.",
    "domain_key": "d2"
  },
  {
    "id": 19,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Compute selection: virtual machines vs. virtual machine scale sets",
    "question_type": "Service Matching",
    "scenario": "BetNaija, a Lagos sports-betting site, sees traffic jump sharply on match days. The team wants a group of identical, load-balanced VMs that scale out and in automatically with demand or on a schedule.",
    "question": "Which Azure feature fits?",
    "options": {
      "A": "Virtual machine scale sets",
      "B": "A single, larger Azure virtual machine",
      "C": "A virtual machine availability set",
      "D": "Azure Container Instances"
    },
    "correct_option": "A",
    "explanation": "A wins: virtual machine scale sets create and manage groups of identical, load-balanced VMs, centralize configuration, integrate with load balancing, and can scale out or in automatically based on demand or schedules. B is wrong: one bigger VM is vertical scaling and stays a single point of failure. C is wrong: availability sets improve resiliency inside a region by grouping VMs by update and fault domains, but they do not add or remove instances. D is wrong: Container Instances run containers, not groups of VMs.",
    "padi_analogy": "A single VM is one overworked bus on the Yaba route; a scale set is a bus company that sends out identical buses when the crowd swells and parks them when it thins. An availability set only parks the buses in different garages.",
    "exam_trap_warning": "Availability sets sound like scaling but only improve resiliency; the exam rewards remembering that scale sets are the feature that adds or removes instances automatically.",
    "domain_key": "d2"
  },
  {
    "id": 20,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Compute selection: Azure Container Instances vs. Azure Kubernetes Service",
    "question_type": "Service Matching",
    "scenario": "Osu Basket, an Accra e-commerce platform, has split into forty containerized microservices that must be deployed, scaled, and restarted as a fleet. The team wants Azure to manage the container lifecycle.",
    "question": "Which Azure service fits the fleet?",
    "options": {
      "A": "Azure Container Instances",
      "B": "Virtual machine scale sets",
      "C": "Azure Functions",
      "D": "Azure Kubernetes Service"
    },
    "correct_option": "D",
    "explanation": "D wins: Azure Kubernetes Service (AKS) is a container orchestration service that manages the lifecycle of containers and makes fleet management simpler and more efficient. A is wrong: Azure Container Instances are the fastest and simplest way to run a container without managing VMs, a PaaS fit for a single container, not an orchestrator for a fleet. B is wrong: scale sets manage groups of identical VMs, not container lifecycles. C is wrong: Azure Functions is event-driven serverless code, not a container fleet manager.",
    "padi_analogy": "Container Instances is hiring one okada rider for a single parcel. AKS is the dispatch office running forty riders, deciding who goes where and replacing the one whose bike breaks down.",
    "exam_trap_warning": "'Fleet' and 'orchestration' point to AKS; 'fastest and simplest way to run a container' points to Container Instances.",
    "domain_key": "d2"
  },
  {
    "id": 21,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Compute selection: Azure App Service vs. Azure Functions",
    "question_type": "Service Matching",
    "scenario": "Ankara Avenue, a Lagos fashion marketplace, needs two things: an always-on storefront website and REST API with automatic scaling and high availability, and a small piece of code that runs only when a payment provider sends a webhook and finishes within seconds.",
    "question": "Which pairing of Azure services fits best?",
    "options": {
      "A": "Azure Functions for the storefront; Azure App Service for the webhook code",
      "B": "Azure App Service for the storefront; Azure Functions for the webhook code",
      "C": "Virtual machines for both",
      "D": "Azure Container Instances for both"
    },
    "correct_option": "B",
    "explanation": "B wins: Azure App Service is an HTTP-based PaaS for hosting web apps, REST APIs, and mobile back ends with automatic scaling and high availability, while Azure Functions is event-driven serverless compute for short work triggered by an event, charged only for the CPU time used. A is wrong: it reverses the roles. C is wrong: VMs give maximum control but make you manage the platform you do not need to manage here. D is wrong: Container Instances run containers, and neither workload was described as containerized.",
    "padi_analogy": "App Service is a permanent shop on Allen Avenue with lights, security, and extra counters at rush hour. Functions is the courier you call only when a parcel arrives, paid per delivery.",
    "exam_trap_warning": "'Runs only when triggered, pay for execution time' means Functions; 'hosts a website or API continuously' means App Service.",
    "domain_key": "d2"
  },
  {
    "id": 22,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Azure Virtual Desktop and multi-session Windows scenario",
    "question_type": "Service Matching",
    "scenario": "Simba Contact Centre, a Nairobi BPO, employs three hundred agents on rotating night shifts, some contractors on personal laptops. Management wants standardized Windows desktops hosted in Azure, access controlled through Microsoft Entra ID, and no company data left on personal devices.",
    "question": "Which Azure service fits best?",
    "options": {
      "A": "A separate VM for each agent, configured by hand",
      "B": "Azure App Service",
      "C": "Azure Virtual Desktop",
      "D": "Azure Functions"
    },
    "correct_option": "C",
    "explanation": "C wins: Azure Virtual Desktop delivers Windows desktops and apps from Azure to many device types, integrates with Microsoft Entra ID, keeps apps and data in Azure-hosted sessions to reduce data exposure on local devices, and supports single-session and multi-session Windows experiences. The notes call it often easier to operate than building separate VM-based desktop environments. A is wrong: per-agent VMs work but are harder to standardize and operate. B is wrong: App Service hosts web apps and APIs, not desktops. D is wrong: Functions runs event-triggered code.",
    "padi_analogy": "Azure Virtual Desktop is a night-shift office floor where every agent sits at an identical, locked desk and walks out with nothing in their pockets. Their laptop is only the door; the desk stays in the building.",
    "exam_trap_warning": "When the exam says 'Windows desktops delivered from the cloud to any device', it wants Azure Virtual Desktop, not a VM per user.",
    "domain_key": "d2"
  },
  {
    "id": 23,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Networking: virtual networks, subnets, and VNet peering",
    "question_type": "Service Matching",
    "scenario": "Mandela Bay Hospitals in South Africa host patient records in one Azure virtual network and an imaging system in another. Traffic between them must stay private and never cross the public internet.",
    "question": "Which Azure feature connects the two virtual networks?",
    "options": {
      "A": "Virtual network peering",
      "B": "Public IP addresses on both networks, restricted by firewall rules",
      "C": "A site-to-site VPN to an on-premises network",
      "D": "Splitting the address space into more subnets"
    },
    "correct_option": "A",
    "explanation": "A wins: virtual network peering connects two virtual networks directly, and traffic between peered networks is private and travels on the Microsoft backbone network, never entering the public internet. B is wrong: public IP addresses put the traffic on the public path. C is wrong: a site-to-site VPN links an on-premises network to Azure, not one virtual network to another. D is wrong: subnets divide one virtual network's private address space (which is not internet routable) and do not connect two networks.",
    "padi_analogy": "A virtual network is a gated estate with its own private street numbers, and subnets are the blocks inside it. Peering is a private footbridge between two estates, so residents cross without ever stepping onto the public road.",
    "exam_trap_warning": "Subnets split one network while peering joins two, so a question about linking two virtual networks is never answered with subnets.",
    "domain_key": "d2"
  },
  {
    "id": 24,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Hybrid connectivity: P2S VPN vs. S2S VPN vs. ExpressRoute",
    "question_type": "Service Matching",
    "scenario": "Atlantic Trust Bank in Lagos has three connectivity needs: a field engineer's laptop must reach an Azure virtual network from anywhere; a branch office network must join the virtual network over an encrypted tunnel on the internet; and headquarters needs a dedicated private connection with greater bandwidth and higher security that does not travel over the internet.",
    "question": "Match each need to the correct connectivity option.",
    "options": {
      "A": "Engineer: Site-to-Site VPN; Branch: Point-to-Site VPN; Headquarters: ExpressRoute",
      "B": "Engineer: Point-to-Site VPN; Branch: ExpressRoute; Headquarters: Site-to-Site VPN",
      "C": "Engineer: ExpressRoute; Branch: Site-to-Site VPN; Headquarters: Point-to-Site VPN",
      "D": "Engineer: Point-to-Site VPN; Branch: Site-to-Site VPN; Headquarters: ExpressRoute"
    },
    "correct_option": "D",
    "explanation": "D wins: a point-to-site VPN has one client computer outside your environment start an encrypted VPN connection to the virtual network; a site-to-site VPN links an on-premises VPN device or gateway to the Azure VPN gateway, encrypted but over the internet; Azure ExpressRoute is dedicated private connectivity that does not travel over the internet, for greater bandwidth and higher security. A is wrong: it swaps the engineer and branch options. B is wrong: it gives the dedicated link to the branch and the internet-based VPN to headquarters. C is wrong: ExpressRoute for one laptop and a point-to-site VPN for headquarters match neither need.",
    "padi_analogy": "Point-to-site is a courier with a padlocked bag riding the public highway alone. Site-to-site is an armored bullion van carrying a branch's cash between two buildings on that same highway, and ExpressRoute is a private railway that never touches the highway at all.",
    "exam_trap_warning": "Both VPN types ride the public internet (encrypted); only ExpressRoute bypasses it, so 'does not travel over the internet' always means ExpressRoute.",
    "domain_key": "d2"
  },
  {
    "id": 25,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Network security and routing: public vs. private endpoints and Azure DNS",
    "question_type": "Scenario Decision",
    "scenario": "Pesa Link, a Nairobi mobile-money platform, runs an internal reconciliation API that only other services inside its virtual network should call. The security lead wants it to have an address that the internet cannot reach.",
    "question": "Which approach achieves this?",
    "options": {
      "A": "Expose it through a public endpoint with a public IP address",
      "B": "Expose it through a private endpoint with a private IP address from the virtual network's address space",
      "C": "Host the service's domain in Azure DNS",
      "D": "Connect the network to on-premises with ExpressRoute"
    },
    "correct_option": "B",
    "explanation": "B wins: private endpoints exist within a virtual network and use a private IP address from that network's address space, which exists only inside the virtual network and is not internet routable. A is wrong: public endpoints have a public IP address and can be reached from anywhere in the world. C is wrong: Azure DNS hosts DNS domains and provides name resolution (reliably, using anycast), but it tells clients where a service is; it does not control who can reach it. D is wrong: ExpressRoute is private connectivity between on-premises and Azure and does not change the API's exposure.",
    "padi_analogy": "A public endpoint is a shop front on Moi Avenue that anyone can walk into; a private endpoint is the staff door at the back of the estate, reachable only from inside. Azure DNS is the signboard that gives the shop's address and locks no door.",
    "exam_trap_warning": "Name resolution is not access control: Azure DNS tells clients where a service is, but only a private endpoint keeps it off the public internet.",
    "domain_key": "d2"
  },
  {
    "id": 26,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Azure Storage services: Blobs vs. Files vs. Queues vs. Tables vs. Disks",
    "question_type": "Service Matching",
    "scenario": "Kente Stream, an Accra media startup, needs three things: storage for large video files streamed to browsers, a shared folder that Windows office PCs mount over SMB, and a place to hold messages that trigger background processing.",
    "question": "Which mapping of needs to Azure Storage services is correct?",
    "options": {
      "A": "Video: Azure Blobs; shared folder: Azure Files; background messages: Azure Queues",
      "B": "Video: Azure Files; shared folder: Azure Blobs; background messages: Azure Tables",
      "C": "Video: Azure Disks; shared folder: Azure Queues; background messages: Azure Blobs",
      "D": "Video: Azure Tables; shared folder: Azure Disks; background messages: Azure Files"
    },
    "correct_option": "A",
    "explanation": "A wins: Azure Blobs is unstructured object storage for large volumes of data such as media and streamed video; Azure Files offers managed file shares accessible over SMB (or NFS) that cloud or on-premises clients can mount; Azure Queues stores large numbers of messages for asynchronous processing and pairs with Azure Functions. B is wrong: it swaps Blobs and Files and sends messages to Tables, which are a NoSQL store for structured, non-relational data. C is wrong: Azure Disks are block-level volumes for Azure VMs, and Queues hold messages, not shares. D is wrong: Tables hold structured NoSQL data, not video, and Files does not queue messages.",
    "padi_analogy": "Blobs is the bulk warehouse at Tema, Files is the office filing cabinet everyone on the floor can open, and Queues is the numbered-ticket machine at the bank counter. Tables is the tidy customer register and Disks is the hard floor under one VM's shop.",
    "exam_trap_warning": "The exam hides the protocol word in the middle of the scenario: SMB means Azure Files, 'unstructured objects' means Blobs, and 'block-level volumes for a VM' means Disks.",
    "domain_key": "d2"
  },
  {
    "id": 27,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Blob access tiers: Hot, Cool (30 days), Cold (90 days), Archive (180 days)",
    "question_type": "Scenario Decision",
    "scenario": "Mzansi Legal, a Johannesburg law firm, must keep case backups for years and almost never opens them. The IT lead asks which blob access tier fits.",
    "question": "Which statement about blob access tiers is correct for these backups?",
    "options": {
      "A": "Use Cool, because Cool is meant for data stored at least 180 days",
      "B": "Set Archive as the default tier for the whole storage account",
      "C": "Use Archive: it suits rarely accessed data stored at least 180 days with flexible latency, and it is set per blob, not per account",
      "D": "Use Hot, because Hot is the cheapest tier for long-term backups"
    },
    "correct_option": "C",
    "explanation": "C wins: the study notes describe Archive as appropriate for rarely accessed data stored at least 180 days with flexible latency requirements, such as long-term backups, and it is not available at the account level. A is wrong: Cool is for infrequently accessed data stored at least 30 days (Cold is at least 90 days). B is wrong: Hot, Cool, and Cold can be set at the account level, but Archive cannot. D is wrong: Hot is optimized for frequently accessed data, not for long-term backups.",
    "padi_analogy": "Hot is the till at the front of the shop, and Cool and Cold are the back-room shelves. Archive is the container yard in Durban: cheapest to keep, slow to fetch.",
    "exam_trap_warning": "The thresholds run 30, 90, and 180 days for Cool, Cold, and Archive in that order, and only Archive cannot be the account default.",
    "domain_key": "d2"
  },
  {
    "id": 28,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Storage redundancy: LRS (11 nines) vs. ZRS (12 nines)",
    "question_type": "Scenario Decision",
    "scenario": "Pearl Pay, a Kampala mobile-money firm, stores transaction receipts in Azure Storage. It wants the data to stay readable and writable even if one datacenter zone in the primary region goes down.",
    "question": "Which redundancy option and durability figure match this requirement?",
    "options": {
      "A": "LRS: three copies in one datacenter, at least 11 nines",
      "B": "LRS: three copies across availability zones, at least 12 nines",
      "C": "ZRS: three copies in one datacenter, at least 11 nines",
      "D": "ZRS: three copies replicated synchronously across three availability zones, at least 12 nines"
    },
    "correct_option": "D",
    "explanation": "D wins: zone-redundant storage replicates data synchronously across three availability zones in the primary region, offers at least 12 nines (99.9999999999%) of durability, and keeps data available for read and write operations even if one zone is unavailable. A is wrong: LRS keeps three copies in a single datacenter with at least 11 nines (99.999999999%), so a datacenter-level disaster can still cause data loss. B is wrong: LRS never spans zones and its figure is 11 nines. C is wrong: ZRS spans three zones, not one datacenter, and its figure is 12 nines.",
    "padi_analogy": "LRS is three safes in one bank basement; ZRS is one safe in each of three branches. A flooded basement empties the first setup, while the second keeps serving.",
    "exam_trap_warning": "The nines run 11 for LRS, 12 for ZRS, and 16 for GRS and GZRS; the exam shuffles the numbers across options to catch candidates who know the service but not its figure.",
    "domain_key": "d2"
  },
  {
    "id": 29,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Geo-redundancy: GRS vs. GZRS and read-access variants",
    "question_type": "Scenario Decision",
    "scenario": "Lagoon Assure, a Lagos insurer, needs its policy documents to survive the loss of an entire region. It wants zone-level resilience in the primary region and the ability to read from the secondary region without waiting for a failover.",
    "question": "Which storage redundancy option fits?",
    "options": {
      "A": "GRS",
      "B": "RA-GZRS",
      "C": "ZRS",
      "D": "RA-GRS"
    },
    "correct_option": "B",
    "explanation": "B wins: GZRS copies data across three availability zones in the primary region and replicates asynchronously to the paired secondary region (using LRS), at least 16 nines of durability; the read-access variant, RA-GZRS, adds read access to the secondary, which is otherwise not readable unless a failover occurs. A is wrong: GRS uses LRS in the primary region (three copies in one datacenter) and has no read access to the secondary by default. C is wrong: ZRS has no secondary region. D is wrong: RA-GRS offers read access, but its primary region is LRS, so it lacks the zone-level resilience required. Because geo-replication is asynchronous, recent writes can be lost if the primary region is unrecoverable.",
    "padi_analogy": "GRS is keeping three safes in Lagos and mailing a duplicate set to a vault in Abuja. GZRS first spreads the Lagos safes across three branches, and the read-access version lets you peek into the Abuja vault without waiting for a disaster.",
    "exam_trap_warning": "Read-access variants add read access to the secondary; without them the secondary is not readable until failover, and asynchronous copying means the latest writes can be lost.",
    "domain_key": "d2"
  },
  {
    "id": 30,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Data movement and migration: AzCopy, Storage Explorer, File Sync, Azure Migrate, Data Box",
    "question_type": "Service Matching",
    "scenario": "Afya Imaging, a Nairobi hospital group, has tens of terabytes of medical images in an on-site data room with a slow internet link. It wants them in Azure Blob storage quickly and securely.",
    "question": "Which option fits best?",
    "options": {
      "A": "Azure Data Box",
      "B": "AzCopy",
      "C": "Azure File Sync",
      "D": "Azure Migrate"
    },
    "correct_option": "A",
    "explanation": "A wins: Azure Data Box is a physical migration service that ships a storage device (up to 80 terabytes usable) to your site, you copy data on and ship it back, and the notes call it ideal for very large data sets, often tens of terabytes or more, when network bandwidth is limited. B is wrong: AzCopy is a command-line utility for copying blobs or files over the network (its sync is one-directional), so a slow link makes it impractical here; Azure Storage Explorer is the graphical counterpart for individual files. C is wrong: Azure File Sync keeps a Windows file server bi-directionally synced with Azure Files. D is wrong: Azure Migrate is a hub for assessing and migrating on-premises datacenter infrastructure, not a bulk-transfer appliance.",
    "padi_analogy": "AzCopy is a porter with a sack: perfect for a few hundred sacks, painful for a whole warehouse. Data Box is the lorry that backs up to your door, you load it, and it drives itself to Azure.",
    "exam_trap_warning": "Weak bandwidth plus tens of terabytes means Data Box; 'keep a Windows file server in sync both ways' means File Sync; 'one-way copy from the command line' means AzCopy.",
    "domain_key": "d2"
  },
  {
    "id": 31,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Identity: Microsoft Entra ID, SSO, MFA, and passwordless",
    "question_type": "Scenario Decision",
    "scenario": "Alaba Mart, a Lagos retail chain, uses Microsoft Entra ID (the service formerly called Azure AD). It wants staff to sign in once for email, HR, and sales dashboards, wants a second verification step for sign-ins, and wants store managers on their own Windows PCs to stop typing passwords.",
    "question": "Which statement correctly describes the options Alaba Mart needs?",
    "options": {
      "A": "SSO adds a second verification step, while MFA lets one sign-in reach many apps",
      "B": "Passwordless options include Windows Hello for Business, Microsoft Authenticator, and email codes",
      "C": "SSO signs in once for many trusted apps, MFA requires an additional factor, and passwordless replaces the password with a trusted device plus a biometric or PIN",
      "D": "MFA removes the password entirely, and passwordless requires two passwords"
    },
    "correct_option": "C",
    "explanation": "C wins: per the study notes, single sign-on lets a user sign in once and reach multiple trusted applications; multifactor authentication requires an additional factor such as a phone prompt or biometric; passwordless replaces the password with a trusted device plus a biometric signal or PIN, and Microsoft Entra ID supports three passwordless options: Windows Hello for Business, the Microsoft Authenticator app, and FIDO2 security keys. A is wrong: it swaps the definitions of SSO and MFA. B is wrong: email codes are not one of the three passwordless options. D is wrong: MFA adds a factor and keeps the password, and passwordless requires no password at all.",
    "padi_analogy": "SSO is one festival wristband that opens every stall, MFA is the guard who also asks for your ID, and passwordless is the gate that simply reads your fingerprint. Nobody has to remember a gate password.",
    "exam_trap_warning": "The exam shuffles three definitions across options: SSO is convenience across apps, MFA is an extra factor, and passwordless removes the password.",
    "domain_key": "d2"
  },
  {
    "id": 32,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Conditional Access vs. External Identities (B2B vs. customer identity)",
    "question_type": "Service Matching",
    "scenario": "Cape Ridge Advisory, a Johannesburg consultancy, has three needs: challenge or block sign-ins that come from unfamiliar locations or unmanaged devices; let a supplier's staff collaborate using their own work accounts; and let consumers sign in to the firm's public app.",
    "question": "Which mapping of needs to Microsoft Entra capabilities is correct?",
    "options": {
      "A": "Unusual sign-ins: B2B collaboration; supplier staff: Conditional Access; consumers: Microsoft Entra External ID for customers",
      "B": "Unusual sign-ins: Conditional Access; supplier staff: B2B collaboration; consumers: Microsoft Entra External ID for customers (formerly Azure AD B2C)",
      "C": "Unusual sign-ins: Conditional Access; supplier staff: Microsoft Entra External ID for customers; consumers: B2B collaboration",
      "D": "Unusual sign-ins: B2B collaboration; supplier staff: Conditional Access; consumers: passwordless sign-in"
    },
    "correct_option": "B",
    "explanation": "B wins: Conditional Access uses identity signals (who the user is, where they are, which device) to allow, deny, or challenge for multifactor authentication; B2B collaboration lets external partners sign in with their own identities and typically appear as guest users in your directory; Microsoft Entra External ID for customers (formerly Azure AD B2C) serves consumers of your apps. A is wrong: it swaps Conditional Access and B2B. C is wrong: it assigns customer identity to suppliers and B2B to consumers. D is wrong: B2B is not a sign-in risk control, and passwordless is an authentication method, not a consumer identity service.",
    "padi_analogy": "Conditional Access is the bouncer reading signals: who are you, where are you, what device are you carrying. B2B is a guest pass for a supplier at the staff entrance, and customer identity is the public turnstile out front.",
    "exam_trap_warning": "B2B is for partners who appear as guests in your directory, customer identity is for consumers of your apps, and Conditional Access is neither: it decides allow, deny, or challenge from signals.",
    "domain_key": "d2"
  },
  {
    "id": 33,
    "domain": "Architecture and Services",
    "domain_weight": "35-40%",
    "topic": "Security architecture: RBAC, Zero Trust, defense in depth, Defender for Cloud",
    "question_type": "Scenario Decision",
    "scenario": "Kilimanjaro Freight, a Dar es Salaam logistics company, is writing its Azure security standard. The CISO asks the architect to confirm which statement about core Azure security concepts is accurate before it goes into the policy document.",
    "question": "Which statement is correct?",
    "options": {
      "A": "Zero Trust trusts any device on the corporate network, and defense in depth has three layers",
      "B": "Azure RBAC enforces permissions inside an application's own data, and Defender for Cloud protects only Azure resources",
      "C": "Defense in depth relies on one strong perimeter layer, and Zero Trust means verifying once at sign-in",
      "D": "RBAC grants access through roles, Zero Trust means verify explicitly, use least privilege access, and assume breach, defense in depth layers run from physical to data, and Defender for Cloud calculates a secure score"
    },
    "correct_option": "D",
    "explanation": "D wins: Azure RBAC assigns built-in or custom roles to individuals and groups; Zero Trust is based on verify explicitly, use least privilege access, and assume breach; defense in depth is a set of layers around the data (physical, identity and access, perimeter, network, compute, application, data); and Defender for Cloud groups recommendations into security controls and calculates a secure score. A is wrong: Zero Trust trusts no device because of network location, and there are seven layers. B is wrong: Azure RBAC does not enforce permissions at the application or data level, and Defender for Cloud can also protect AWS and GCP resources and, with Azure Arc, on-premises machines. C is wrong: defense in depth removes reliance on any single layer, and Zero Trust verifies every request continuously.",
    "padi_analogy": "Zero Trust is the estate guard who checks every visitor, even the ones who say they live there. Defense in depth is the wall, gate, guard, door, and safe, RBAC decides which keys each staff member carries, and the secure score is the landlord's inspection mark.",
    "exam_trap_warning": "Zero Trust never grants trust by network location and defense in depth never relies on one layer, so options saying 'verify once' or 'one strong perimeter' are bait.",
    "domain_key": "d2"
  },
  {
    "id": 34,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Cost factors: consumption, geography, data transfer (inbound vs. outbound)",
    "question_type": "Scenario Decision",
    "scenario": "Makola Cart, an Accra e-commerce platform, sees its Azure bill climb even though it uploads the same amount of product images each month. Customers on other continents are downloading far more content than before.",
    "question": "Which statement about data transfer cost is correct?",
    "options": {
      "A": "Some inbound transfers are free, while outbound transfers are billed based on billing zones",
      "B": "All inbound and outbound transfers are free within one subscription",
      "C": "Outbound transfers are free, while inbound transfers are billed by region",
      "D": "Transfer costs are identical in every geography"
    },
    "correct_option": "A",
    "explanation": "A wins: the study notes say some inbound data transfers (data going into Azure datacenters) are free, while outbound transfers (data leaving Azure datacenters) are priced by zone, a billing grouping of regions. Geography is one of the cost factors alongside resource type, consumption, maintenance, subscription type, and Azure Marketplace, and moving data within Europe is cheaper than moving it from Europe to Asia or South America. B is wrong: a subscription does not make outbound transfer free. C is wrong: it reverses inbound and outbound. D is wrong: pricing varies by geography.",
    "padi_analogy": "Bringing goods into Makola wholesale market costs nothing at the gate, but every truck leaving pays at the toll gate by distance zone. Customers downloading content are trucks driving out.",
    "exam_trap_warning": "A billing zone is not an availability zone: the exam hopes the word 'zone' sends you thinking about resilience instead of data-transfer pricing.",
    "domain_key": "d3"
  },
  {
    "id": 35,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Cost saving: Reservations vs. savings plan for compute vs. Spot VMs",
    "question_type": "Service Matching",
    "scenario": "NaijaCrunch, a Lagos analytics firm, has three workloads: always-on database VMs that will run steadily for three years, nightly batch jobs that can be interrupted and rerun, and a compute estate where the team wants freedom to change VM types while committing to an hourly spend.",
    "question": "Which mapping of workloads to cost-saving options is correct?",
    "options": {
      "A": "Database: Spot VMs; batch jobs: Reservations; flexible compute: Azure Hybrid Benefit",
      "B": "Database: savings plan for compute; batch jobs: Reservations; flexible compute: Spot VMs",
      "C": "Database: Reservations; batch jobs: savings plan for compute; flexible compute: Spot VMs",
      "D": "Database: Reservations; batch jobs: Spot VMs; flexible compute: savings plan for compute"
    },
    "correct_option": "D",
    "explanation": "D wins: Reservations commit to specific resources for one or three years and suit stable, predictable workloads; Azure Spot Virtual Machines use unused Azure capacity at lower prices but can be evicted when Azure needs the capacity back, so they suit interruptible jobs like batch processing; the savings plan for compute commits to an hourly spend on eligible compute for one or three years without tying you to a VM type. A is wrong: Spot would risk evicting the always-on database, and Azure Hybrid Benefit (reusing existing licenses, a general Azure offering beyond the study notes) is not an hourly-spend commitment. B is wrong: it gives the savings plan to the database and Spot to the flexible estate. C is wrong: it sends the interruptible jobs to the savings plan and the flexible estate to Spot.",
    "padi_analogy": "Reservations is signing a three-year lease on a shop at a discount. Spot is taking an empty stall that the owner may reclaim at any hour, and a savings plan is promising the landlord a fixed hourly rent while you move between stalls freely.",
    "exam_trap_warning": "'Can be evicted when Azure needs the capacity back' always means Spot, so never choose it for an always-on database.",
    "domain_key": "d3"
  },
  {
    "id": 36,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Azure Pricing Calculator and the retired TCO Calculator (2026 update)",
    "question_type": "Scenario Decision",
    "scenario": "Safari Ledger, a Nairobi startup, is planning a new Azure workload and wants an estimate before deploying anything. A colleague's old playbook says to run the TCO Calculator first.",
    "question": "What should the team use to estimate the expected cost of the Azure resources it plans to provision?",
    "options": {
      "A": "The TCO Calculator, which is still the standard Azure estimating tool",
      "B": "Microsoft Cost Management, because it prices resources before they are deployed",
      "C": "The Azure Pricing Calculator, because the TCO Calculator has been retired",
      "D": "Azure Advisor, because it prices planned resources"
    },
    "correct_option": "C",
    "explanation": "C wins: the study notes state that the pricing calculator helps estimate potential Azure expenses (compute, storage, and network costs, including storage type, access tier, and redundancy) without provisioning anything or charging you, and that the Total Cost of Ownership (TCO) calculator has been retired. A is wrong: the TCO Calculator is retired. B is wrong: Microsoft Cost Management analyzes, monitors, and manages actual Azure spending and sets alerts and budgets. D is wrong: Azure Advisor recommends improvements to reliability, security, performance, operational excellence, and cost; it does not build price estimates.",
    "padi_analogy": "The pricing calculator is the shopping list with prices that you write before going to Balogun, and Cost Management is the receipt bag you check afterwards. The old TCO stall has shut its shutters for good.",
    "exam_trap_warning": "Any option still recommending the TCO Calculator is wrong in 2026: it is retired, and the Azure Pricing Calculator is the estimating tool.",
    "domain_key": "d3"
  },
  {
    "id": 37,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Microsoft Cost Management: cost analysis, budgets, and alerts",
    "question_type": "Scenario Decision",
    "scenario": "Umurinzi Pay, a Kigali fintech, gets a shock Azure invoice. The CFO wants to see where actual costs accrued last month by resource group, and wants an email when spending reaches 80% of the monthly dev/test budget.",
    "question": "Which tool and features meet this need?",
    "options": {
      "A": "Azure Pricing Calculator, using its estimate and alert tabs",
      "B": "Microsoft Cost Management, using cost analysis and a budget alert",
      "C": "Azure Advisor, using credit alerts",
      "D": "Application Insights, using page load times"
    },
    "correct_option": "B",
    "explanation": "B wins: Microsoft Cost Management analyzes and monitors actual Azure spending; cost analysis shows aggregated costs by subscription, resource group, or service, and budget alerts notify you when spending reaches or exceeds a threshold you define. A is wrong: the Pricing Calculator estimates cost before deployment and has no view of actual spend or alerts. C is wrong: credit alerts belong to Cost Management and fire at 90% and 100% of an Azure Prepayment balance, and Advisor offers recommendations, not spend analysis. D is wrong: Application Insights monitors web application performance, not cost.",
    "padi_analogy": "Cost Management is the prepaid electricity meter with a low-credit beep: it shows what you have burned and complains before the lights go off.",
    "exam_trap_warning": "The Pricing Calculator looks forward at estimates, while Cost Management looks at what you actually spent and warns you; the exam swaps those verbs.",
    "domain_key": "d3"
  },
  {
    "id": 38,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Resource tags and inheritance",
    "question_type": "Scenario Decision",
    "scenario": "Lekki Bank, a Lagos lender, tagged a resource group with CostCenter=Retail. Finance now reports that the VMs inside the group show no CostCenter tag in their cost reports.",
    "question": "Why is the tag missing, and what is the right approach?",
    "options": {
      "A": "Resources do not inherit tags from resource groups or subscriptions; apply tags to resources, optionally enforcing or re-applying them with Azure Policy",
      "B": "Tags are inherited automatically, so the report must be out of date",
      "C": "Tags can only be applied to subscriptions, not to resources",
      "D": "Tags inherit from a resource group only when a resource lock is enabled"
    },
    "correct_option": "A",
    "explanation": "A wins: the study notes state that resources do not inherit tags from subscriptions and resource groups, so applying a tag at one level does not apply it below; tags are name/value pairs you can add through the portal, PowerShell, CLI, ARM templates, or the REST API, and Azure Policy can require tags on new resources and reapply removed ones. B is wrong: the hierarchy inherits policy and RBAC assignments, but not tags. C is wrong: tags can be applied to resources and resource groups. D is wrong: locks have nothing to do with tag inheritance.",
    "padi_analogy": "A tag is a name sticker on a crate. Labeling the shipping container does not label each crate inside; you need a sticker on every crate, or a clerk called Azure Policy who stamps them as they arrive.",
    "exam_trap_warning": "The exam assumes inheritance because most things in the hierarchy inherit (policy, RBAC), but tags are the exception.",
    "domain_key": "d3"
  },
  {
    "id": 39,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Azure Advisor recommendation categories",
    "question_type": "Scenario Decision",
    "scenario": "Gye Nyame HR, an Accra HR-software company, wants one portal view of best-practice recommendations across its subscriptions: configuration risks, security threats, slow spots, deployment workflow improvements, and ways to cut spend.",
    "question": "Which tool provides these recommendations, and under which categories?",
    "options": {
      "A": "Azure Service Health, under Azure Status, Service Health, and Resource Health",
      "B": "Microsoft Defender for Cloud, under reliability, performance, and cost only",
      "C": "Azure Advisor, under reliability, security, performance, operational excellence, and cost",
      "D": "Microsoft Cost Management, under budget, credit, and department spending quota alerts"
    },
    "correct_option": "C",
    "explanation": "C wins: Azure Advisor evaluates your Azure resources and recommends improvements in five categories: Reliability, Security, Performance, Operational Excellence, and Cost, with each recommendation letting you act, postpone, or dismiss, and notifications available. A is wrong: those are the three health views of Azure Service Health, which report health, not recommendations. B is wrong: Defender for Cloud focuses on security posture and threat protection and uses a secure score. D is wrong: those are the alert types in Cost Management.",
    "padi_analogy": "Advisor is the senior dev friend who walks round your office after hours and sticks five colours of notes on your setup: reliability, security, performance, operational excellence, and cost. You choose which to act on, postpone, or tear off.",
    "exam_trap_warning": "Advisor has five categories, not four: operational excellence is the one candidates forget, and cost is only one of the five.",
    "domain_key": "d3"
  },
  {
    "id": 40,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Azure Policy vs. Azure RBAC",
    "question_type": "Service Matching",
    "scenario": "Table Mountain Cover, a Johannesburg insurer, has two requirements: no one may create VMs outside the approved regions or sizes, and the claims team must be able to read resources but not change or delete them.",
    "question": "Which mapping of requirements to governance tools is correct?",
    "options": {
      "A": "Approved regions and sizes: Azure RBAC; claims team access: Azure Policy",
      "B": "Approved regions and sizes: a resource lock; claims team access: Azure Policy",
      "C": "Approved regions and sizes: Azure Policy; claims team access: Microsoft Purview",
      "D": "Approved regions and sizes: Azure Policy; claims team access: Azure RBAC"
    },
    "correct_option": "D",
    "explanation": "D wins: Azure Policy evaluates resources against rules, highlights noncompliant ones, and can prevent noncompliant resources from being created, for example by allowing only certain VM sizes, and it is inherited down the hierarchy; Azure RBAC controls what people can do through roles, such as a read-only role. A is wrong: it reverses the two tools. B is wrong: a resource lock prevents deleting or changing a resource but cannot restrict which regions or sizes are allowed, and Policy does not assign user permissions. C is wrong: Microsoft Purview is data governance, not user permissions.",
    "padi_analogy": "Azure Policy is the estate bylaw that stops a non-compliant house from being built anywhere in the estate. RBAC is the key card that says what each person may do inside the houses already standing.",
    "exam_trap_warning": "Policy governs what resources may look like and RBAC governs what people may do; a question about allowed regions or sizes is a Policy question.",
    "domain_key": "d3"
  },
  {
    "id": 41,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Resource locks: CanNotDelete vs. ReadOnly",
    "question_type": "Service Matching",
    "scenario": "Kariakoo Wholesale, a Dar es Salaam distributor, has a production database whose settings admins must still adjust but which must never be deleted, and an archive storage account that must be neither changed nor deleted. An intern with broad permissions is about to start a cleanup.",
    "question": "Which locks should be applied?",
    "options": {
      "A": "Database: ReadOnly; archive account: CanNotDelete",
      "B": "Database: CanNotDelete; archive account: ReadOnly",
      "C": "Database: CanNotDelete; archive account: CanNotDelete",
      "D": "Database: ReadOnly; archive account: ReadOnly"
    },
    "correct_option": "B",
    "explanation": "B wins: the study notes describe two lock types: Delete (shown as CanNotDelete), where authorized users can still read and modify a resource but cannot delete it, and ReadOnly, where authorized users can read but cannot delete or update, similar to the Reader role. Locks work even against people with full permissions, so they stop accidental deletions that RBAC alone would allow. A is wrong: it blocks admins from adjusting the database and leaves the archive open to modification. C is wrong: the archive account could still be modified. D is wrong: ReadOnly on the database would block the settings changes admins still need.",
    "padi_analogy": "A CanNotDelete lock is a shop where staff can still sell and restock but nobody may throw the stock away. A ReadOnly lock is a museum display case: look, but nobody moves or sells anything.",
    "exam_trap_warning": "ReadOnly blocks updates as well as deletions, so a resource that still needs changes needs CanNotDelete, not ReadOnly.",
    "domain_key": "d3"
  },
  {
    "id": 42,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Microsoft Purview: unified data governance",
    "question_type": "Scenario Decision",
    "scenario": "Eko Telecom, a Lagos operator, keeps data in Azure, in SQL databases, on-premises, and in Amazon S3. Compliance wants one unified view with automated data discovery, sensitive data classification, and end-to-end data lineage.",
    "question": "Which Azure service fits?",
    "options": {
      "A": "Microsoft Purview",
      "B": "Azure Policy",
      "C": "Microsoft Defender for Cloud",
      "D": "Azure Advisor"
    },
    "correct_option": "A",
    "explanation": "A wins: Microsoft Purview is a family of data governance, risk, and compliance solutions that gives a unified view of on-premises, multicloud, and software-as-a-service data through automated data discovery, sensitive data classification, and end-to-end data lineage, with two solution areas: risk and compliance, and unified data governance. B is wrong: Azure Policy evaluates and enforces resource configuration rules. C is wrong: Defender for Cloud manages security posture and threat protection. D is wrong: Azure Advisor gives resource recommendations in five categories.",
    "padi_analogy": "Purview is the records clerk who walks every warehouse, tags each box by sensitivity, and draws the map of where each box came from. Even the boxes stored in a rival's warehouse across town.",
    "exam_trap_warning": "Purview governs data (where it is, how sensitive it is, where it came from), Policy governs resource configuration, and Defender for Cloud governs security posture.",
    "domain_key": "d3"
  },
  {
    "id": 43,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Management interfaces: Azure portal vs. Cloud Shell vs. local CLI and PowerShell",
    "question_type": "Scenario Decision",
    "scenario": "A freelance engineer at Jua Kali Cloud in Nairobi borrows a colleague's laptop that has nothing installed. She is already signed in to Azure in the browser and wants to run quick Bash commands to manage resources.",
    "question": "Which option fits best?",
    "options": {
      "A": "Install Azure PowerShell locally before starting",
      "B": "Use only the graphical Azure portal blades",
      "C": "Use Azure Cloud Shell with the Bash (Azure CLI) experience",
      "D": "Use Azure Arc"
    },
    "correct_option": "C",
    "explanation": "C wins: Azure Cloud Shell is a browser-based shell that needs no local installation, is authenticated to your Azure credentials so it knows who you are and what you may do, and lets you choose Azure PowerShell or the Azure CLI, which uses Bash. A is wrong: local installation is possible but unnecessary, and PowerShell is not the Bash experience she wants. B is wrong: the portal is a graphical interface, not a command shell. D is wrong: Azure Arc manages hybrid and multicloud resources and is not a command interface.",
    "padi_analogy": "The portal is the glass front counter, Cloud Shell is the mechanic's toolbox waiting in any browser, and the local CLI is the toolbox you bought and keep in your boot.",
    "exam_trap_warning": "'No local installation, already authenticated, runs in a browser' means Cloud Shell; Azure CLI and Azure PowerShell are the same tools you can also install locally.",
    "domain_key": "d3"
  },
  {
    "id": 44,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Azure Arc for hybrid and multicloud management",
    "question_type": "Scenario Decision",
    "scenario": "Witwatersrand Mining Co. runs servers in a mine-site datacenter and VMs at another public cloud provider. The IT director wants to manage them with Azure tools and extend Defender for Cloud protection to them, without moving them.",
    "question": "Which technology fits?",
    "options": {
      "A": "Azure Migrate",
      "B": "Azure ExpressRoute",
      "C": "Azure Advisor",
      "D": "Azure Arc"
    },
    "correct_option": "D",
    "explanation": "D wins: Azure Arc helps manage a cloud environment whether it is solely on Azure, a private cloud in your datacenter, a hybrid configuration, or a multicloud environment, and Defender for Cloud extends protection to on-premises machines by using Azure Arc. A is wrong: Azure Migrate is a hub for assessing and moving on-premises workloads to Azure, and nothing here is moving. B is wrong: ExpressRoute is a dedicated private network connection, not a management layer. C is wrong: Azure Advisor recommends improvements for Azure resources.",
    "padi_analogy": "Azure Arc is the head-office name badge pinned onto every outstation worker, whether he works in your building or a rival's. Same register, same rules, one manager's view.",
    "exam_trap_warning": "Arc manages resources where they already live, while Migrate moves them; if the scenario says leave the servers where they are, think Arc.",
    "domain_key": "d3"
  },
  {
    "id": 45,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Infrastructure as code: ARM templates (JSON) vs. Bicep",
    "question_type": "Scenario Decision",
    "scenario": "Ikoyi Deploy, a Lagos software house, builds its dev, test, and production environments by clicking through the portal and gets inconsistent results. The team wants repeatable code-based deployments through Azure Resource Manager, with the simplest possible syntax.",
    "question": "Which statement is correct?",
    "options": {
      "A": "ARM templates are written in Bicep, and Bicep files are JSON",
      "B": "Bicep is a declarative language that deploys through ARM and is generally simpler and more concise than JSON ARM templates",
      "C": "Bicep is imperative and bypasses Azure Resource Manager",
      "D": "ARM templates require step-by-step deployment commands, which Bicep removes"
    },
    "correct_option": "B",
    "explanation": "B wins: infrastructure as code manages infrastructure through code instead of manual configuration; ARM templates (JSON) are declarative, repeatable, and let ARM handle dependency order, and Bicep is a declarative language that deploys through ARM and is generally simpler and more concise than JSON templates. A is wrong: it reverses the relationship, since ARM templates are JSON and Bicep is its own language. C is wrong: Bicep is declarative and deploys through ARM. D is wrong: ARM templates are already declarative, so they do not need step-by-step commands.",
    "padi_analogy": "A JSON ARM template is a recipe written in formal legal language, and Bicep is the same recipe in plain kitchen talk. Both go to the same cook, Azure Resource Manager.",
    "exam_trap_warning": "Both ARM templates and Bicep are declarative and both deploy through ARM, so the difference the exam wants is syntax, not capability.",
    "domain_key": "d3"
  },
  {
    "id": 46,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Azure Monitor and Log Analytics",
    "question_type": "Service Matching",
    "scenario": "Tema Tracker, an Accra logistics firm, wants logs and metrics from its VMs, apps, and network layers collected in one place, the ability to query the data for all errors in the last hour, and an email when a VM's CPU stays above 80%.",
    "question": "Which combination of Azure features meets these needs?",
    "options": {
      "A": "Azure Monitor to collect and store the data, Log Analytics to query it, and Azure Monitor Alerts for the CPU notification",
      "B": "Azure Advisor to collect data, Resource Health to query it, and Cost Management alerts for CPU",
      "C": "Azure Service Health to collect data, Application Insights to query it, and budget alerts for CPU",
      "D": "Azure Arc to collect data, Azure Policy to query it, and Defender secure score for CPU"
    },
    "correct_option": "A",
    "explanation": "A wins: Azure Monitor is the platform that gathers logs and metrics from applications, operating systems, and network layers and stores them centrally; Log Analytics is the Azure portal tool where you write and run queries (the query language is KQL, a general fact beyond the study notes); Azure Monitor Alerts notify you when a defined condition is met, such as a metric alert when a VM's CPU stays above 80%. B is wrong: Advisor recommends, Resource Health reports a resource's health, and budget alerts track spend. C is wrong: Service Health reports Azure service issues, and budget alerts do not watch CPU. D is wrong: Arc manages resources, Policy enforces rules, and the secure score measures security posture.",
    "padi_analogy": "Azure Monitor is the CCTV system recording everything in the depot, Log Analytics is the control room where you rewind to 'show me every error in the last hour', and Alerts is the siren.",
    "exam_trap_warning": "Log Analytics is where you write queries, not where data is collected; the platform that collects and stores it is Azure Monitor.",
    "domain_key": "d3"
  },
  {
    "id": 47,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Application Insights for live web app telemetry",
    "question_type": "Scenario Decision",
    "scenario": "Matoke Express, a Kampala food-delivery startup, runs a live web app. The team wants request rates, response times, failure rates, dependency call performance, page load times, and user counts, and prefers to enable it with an agent and no code changes.",
    "question": "Which Azure feature fits?",
    "options": {
      "A": "Azure Service Health",
      "B": "Azure Resource Health",
      "C": "Azure Advisor",
      "D": "Application Insights"
    },
    "correct_option": "D",
    "explanation": "D wins: Application Insights is an Azure Monitor feature that monitors the performance and usage of web applications running in Azure, on-premises, or in another cloud, can be set up with an SDK or with an agent without code changes, and tracks request rates, response times, failure rates, dependency calls, page load times, user counts, and session trends. A is wrong: Service Health reports Azure service issues and planned maintenance affecting your environment. B is wrong: Resource Health reports whether one resource, such as a VM, is healthy. C is wrong: Advisor gives recommendations, not application telemetry.",
    "padi_analogy": "Application Insights is the mystery shopper inside your shop app: it times the queue, counts walk-ins, and notes which counter keeps failing. The CCTV, Azure Monitor, sees the building while the mystery shopper sees the customer journey.",
    "exam_trap_warning": "Application Insights watches your application's behavior and usage; it does not tell you whether Azure itself is having an outage, which is Service Health's job.",
    "domain_key": "d3"
  },
  {
    "id": 48,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Azure Status vs. Azure Service Health vs. Azure Resource Health",
    "question_type": "Service Matching",
    "scenario": "A Lagos fintech hears about a widespread outage online. Its engineer needs three answers: whether Azure is having a global problem, whether an issue or planned maintenance affects the services and regions the fintech uses, and whether one specific VM is unhealthy and on whose side the fault lies.",
    "question": "Match each question to the right health view.",
    "options": {
      "A": "Global problem: Service Health; relevant events: Azure Status; one VM: Resource Health",
      "B": "Global problem: Azure Status; relevant events: Resource Health; one VM: Service Health",
      "C": "Global problem: Azure Status; relevant events: Service Health; one VM: Resource Health",
      "D": "Global problem: Resource Health; relevant events: Azure Status; one VM: Service Health"
    },
    "correct_option": "C",
    "explanation": "C wins: the study notes describe three views that narrow from global to individual resources: Azure Status gives a global picture of Azure health across all services and regions; Service Health focuses on the services and regions you use, showing outages, planned maintenance, and health advisories relevant to you, with alerts; Resource Health zooms in on an individual resource and says whether the issue is on Azure's side or yours. A is wrong: it swaps Service Health and Azure Status. B is wrong: Resource Health covers one resource, not your services and regions, and Service Health is not per VM. D is wrong: it reverses all three scopes.",
    "padi_analogy": "Azure Status is the national weather bulletin, Service Health is the forecast for your own street, and Resource Health is the thermometer in your own room.",
    "exam_trap_warning": "Global means Azure Status, signed-in and personalized means Service Health, and one resource means Resource Health; the exam rotates the order to test the scope.",
    "domain_key": "d3"
  },
  {
    "id": 49,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Copilot in Azure (2026 addition)",
    "question_type": "Scenario Decision",
    "scenario": "At Pwani Cloud Services in Mombasa, a junior admin must understand a storage configuration and draft a CLI command before a change window. The team lead insists that a human reviews and approves every production change.",
    "question": "Which statement correctly describes how Copilot in Azure fits this situation?",
    "options": {
      "A": "Copilot in Azure replaces administrators and approves production changes automatically",
      "B": "Copilot in Azure is an AI assistant that gives contextual guidance in natural language, such as exploring services, understanding configuration, and drafting commands or scripts, while humans validate and approve",
      "C": "Copilot in Azure is a compute service for running containers",
      "D": "Copilot in Azure is a pricing tool that replaces the Azure Pricing Calculator"
    },
    "correct_option": "B",
    "explanation": "B wins: the study notes describe Copilot in Azure as an AI assistant experience that helps administrators work faster with contextual guidance in natural language, such as exploring services, understanding configuration options, and drafting commands or scripts, while you still validate recommendations, confirm permissions, and review deployment changes before production. A is wrong: it removes the human validation and approval the notes require. C is wrong: Copilot is an assistant experience, not a compute service. D is wrong: cost estimation belongs to the Azure Pricing Calculator.",
    "padi_analogy": "Copilot in Azure is a sharp senior dev friend whispering command suggestions while you type. You still hold the pen that signs the change request.",
    "exam_trap_warning": "Copilot assists but never carries accountability: the exam keeps validation and approval with the human.",
    "domain_key": "d3"
  },
  {
    "id": 50,
    "domain": "Management and Governance",
    "domain_weight": "30-35%",
    "topic": "Agentic AI patterns on Azure (2026 addition)",
    "question_type": "Scenario Decision",
    "scenario": "Ewa Insure, a Lagos insurer, wants a claims assistant that reads a claim, looks up policy data through connected tools, and completes a multistep workflow: classify the claim, verify coverage, and draft a response for a human to approve.",
    "question": "Which description of agentic AI on Azure is correct?",
    "options": {
      "A": "A separate Azure compute service category that you provision like virtual machines",
      "B": "A prebuilt Azure AI service that needs no application logic",
      "C": "A storage tier for AI training data",
      "D": "An application pattern that combines an AI model with instructions, context, and tool use, built by combining Azure AI services and Azure OpenAI Service with your own application logic, to complete multistep goals"
    },
    "correct_option": "D",
    "explanation": "D wins: the study notes describe agentic applications as combining an AI model with instructions, context, and tool use to complete multistep goals, usually built in Azure by combining Azure AI services and Azure OpenAI Service with your own application logic, and say to treat agentic AI as an application pattern built from Azure AI capabilities. A is wrong: it is explicitly not a separate compute service category. B is wrong: the pattern depends on your own application logic as well as AI capabilities. C is wrong: nothing about it is a storage tier.",
    "padi_analogy": "An agentic app is a clerk who does not just answer 'what is my claim status?' but walks to three desks, fetches the file, and drafts the letter for your signature. The model is the clerk's brain, and the tools and your code are the desks.",
    "exam_trap_warning": "Agentic AI is a pattern, not a new product line; the exam tempts you with 'service category' wording.",
    "domain_key": "d3"
  }
];
