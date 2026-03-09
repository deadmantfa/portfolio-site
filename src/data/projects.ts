export interface ADR {
  title: string
  problem: string
  solution: string
  impact: string
  // Legacy fields for compatibility if needed
  decision?: string
  rationale?: string
}

export interface ProjectHighlight {
  label: string
  value: string
}

export interface ProjectNarrative {
  vision: string
  execution: string
  result: string
}

export interface ProjectBlueprint {
  type: 'monolith' | 'microservices' | 'serverless' | 'hub-and-spoke'
  nodes: number
  connections: number
}

export interface ProjectCaseStudy {
  slug: string
  title: string
  company: string
  role: string
  period: string
  challenge: string
  impact: string
  highlights: ProjectHighlight[]
  adrs: ADR[]
  techStack: string[]
  narrative: ProjectNarrative
  blueprint: ProjectBlueprint
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'rooftop',
    title: 'Architecting for Exponential Growth',
    company: 'Rooftop',
    role: 'Chief Technology Officer',
    period: '2022 - Present',
    challenge: 'Directing technology strategy to drive project success and operational efficiency during a period of rapid scale. Faced challenges balancing rapid feature delivery with system reliability while managing infrastructure costs during growth phases of 3-5x yearly user increases. A key creative challenge was bridging the gap between static artwork listings and emotionally resonant storytelling — enabling Rooftop\'s artist catalogue to speak to buyers across language and cultural boundaries.',
    impact: 'Reduced system runtime by 85% and increased user engagement by 60% through modern serverless architectures and AI solutions. Established sustainable cloud cost savings of 40% YoY while maintaining 99.9% uptime SLA. Shipped Lift — an AI-powered multimedia storytelling platform — bringing 300+ artworks to life with animated presentations and multilingual audio narration across 10+ languages, generating 10,000+ views.',
    highlights: [
      { label: 'System Runtime', value: '-85%' },
      { label: 'User Engagement', value: '+60%' },
      { label: 'Artworks on Lift', value: '300+' },
      { label: 'Customer Satisfaction', value: '90%' }
    ],
    adrs: [
      {
        title: 'Serverless Transformation',
        problem: 'Legacy monolithic architecture struggled with variable traffic spikes and high infrastructure overhead.',
        solution: 'Migrated core compute to event-driven AWS Lambda functions and managed SQS/SNS for communication.',
        impact: 'Achieved $0 idle cost and near-infinite scalability, handling a 10x traffic spike with zero downtime.',
        decision: 'Migrated core compute to AWS Lambda',
        rationale: 'To handle highly variable traffic patterns while maintaining $0 idle cost and near-infinite scalability.'
      },
      {
        title: 'AI-Driven Content Personalization',
        problem: 'Generic user experiences led to high bounce rates and lower than optimal conversion for art workshops.',
        solution: 'Implemented a custom Machine Learning Recommendation Engine using AWS SageMaker and collaborative filtering algorithms.',
        impact: 'Boosted conversion rates by 35% and increased average session duration by 4 minutes through targeted discovery.',
        decision: 'Deployed Machine Learning models on SageMaker',
        rationale: 'To deliver hyper-personalized experiences that align with individual user artistic preferences.'
      },
      {
        title: 'Lift — Multilingual AI Storytelling for Art',
        problem: 'Static artwork listings failed to communicate the emotional and cultural narrative behind each piece, limiting buyer connection and cross-market reach. Art Inspiration, the original proof-of-concept, validated the format but lacked the editorial tooling and audio infrastructure to scale.',
        solution: 'Architected Lift — a full-stack multimedia platform evolved from Art Inspiration. Built a web-based custom editor allowing curators to compose animated presentations combining video and image sequences, with GSAP and Canvas powering frame-accurate animation on the frontend. A Python and PHP backend processed media through asynchronous queues, invoking Azure Cognitive Services for text-to-speech synthesis and Google Translate for dynamic multilingual narration across 10+ languages.',
        impact: 'Delivered 300+ artist artworks as immersive, narrated reels with 10,000+ views. Unlocked international buyer segments through on-demand language switching, extending each artwork\'s reach without additional editorial cost.',
        decision: 'Custom editor + async queue pipeline over off-the-shelf video tools',
        rationale: 'Off-the-shelf video platforms could not support the artwork-specific animation requirements, queue-driven media processing, or the deep integration with Azure TTS and Google Translate needed for scalable multilingual narration at the per-artwork level.'
      },
      {
        title: 'Gallery Kiosk — Flutter on Raspberry Pi',
        problem: 'Physical gallery visitors had no structured way to explore the context and story behind each art form on display, and no tangible takeaway to reinforce their connection to the artwork after leaving the space.',
        solution: 'Delivered a self-contained gallery kiosk in 4 weeks using Flutter for a fluid, touch-first UI running on a Raspberry Pi that also drove the display and acted as the hardware bridge to a colour postcard printer. Visitors browsed art forms, surfaced rich contextual content from a custom internal Art Wiki API, then selected and printed a branded, full-colour postcard of their chosen artwork — all without staff intervention.',
        impact: 'Deployed across 2 gallery locations with no architectural ceiling on further rollout. Transformed passive gallery visits into interactive, personalised experiences with a physical branded keepsake — extending Rooftop\'s presence beyond the screen and into visitors\' hands.',
        decision: 'Flutter on Raspberry Pi over web kiosk or tablet-only solution',
        rationale: 'Flutter provided a single codebase with native-quality rendering and reliable hardware peripheral access, while Raspberry Pi gave full control over display output and printer integration without the vendor lock-in or management overhead of commercial kiosk hardware.'
      },
      {
        title: 'Seller Liveness Verification — TensorFlow Computer Vision',
        problem: 'Onboarding fraud and impersonation risk among sellers and service providers required a trust layer beyond static document uploads. A purely passive photo check could be spoofed; a manual video review process would not scale.',
        solution: 'Built a real-time liveness verification system in Angular using TensorFlow.js and computer vision. The system randomly selects 3 challenges from a set — blink, smile, turn head left, turn head right, look up, look down — and instructs the user via synthesised voice in both English and Hindi, with simultaneous on-screen text as a fallback. TensorFlow models evaluated facial landmark responses live in the browser, capturing a verified image and video recording on successful completion.',
        impact: 'Delivered in 8 days. Established a robust, scalable anti-spoofing layer for seller onboarding — reducing impersonation risk without adding manual review overhead. Bilingual voice guidance removed the literacy barrier for Hindi-speaking providers, widening the verified seller base.',
        decision: 'In-browser TensorFlow.js over server-side vision API',
        rationale: 'Running inference client-side eliminated round-trip latency that would have made real-time facial challenge detection feel unresponsive, reduced server costs at scale, and kept the live camera feed local — avoiding the privacy and compliance complexity of streaming biometric video to a backend.'
      }
    ],
    techStack: ['AWS', 'Serverless', 'AI/ML', 'SageMaker', 'Next.js', 'Angular', 'Python', 'PHP', 'TensorFlow.js', 'Computer Vision', 'Azure Voice AI', 'Google Translate', 'GSAP', 'Canvas', 'Flutter', 'Raspberry Pi', 'DevOps'],
    narrative: {
      vision: 'To build a self-healing, AI-first platform that scales human creativity through strategic technical automation, intelligent resource optimization, and predictive infrastructure management — and to transform how art is discovered and experienced, making every artwork speak to every buyer regardless of language or geography.',
      execution: 'Integrated AI-driven Machine Learning pipelines into the serverless architecture using AWS SageMaker, enabling real-time personalization at scale for individual user preferences and artistic interests. Implemented automated failover mechanisms with multi-region deployment, predictive scaling algorithms leveraging historical traffic patterns and seasonal trends, and adaptive caching strategies that reduced infrastructure complexity by 65%. In parallel, architected Lift — an evolution of the Art Inspiration prototype — to solve the storytelling gap in the artist marketplace. Designed and built a web-based custom editor where curators compose animated presentations from video and image assets, with GSAP and Canvas delivering frame-accurate visual sequences in the browser. The backend — built in Python and PHP — processed each artwork through an asynchronous queue pipeline: media was ingested, narration scripts were translated via Google Translate into 10+ languages, and Azure Cognitive Services synthesised natural-sounding audio for each locale. The queue-driven architecture decoupled the editor experience from heavy processing, ensuring curators could publish without waiting on render jobs. Extending the platform into physical spaces, delivered a gallery kiosk in 4 weeks — a self-contained Flutter application running on Raspberry Pi, driving both the display and a colour postcard printer. Visitors explored art forms through a custom internal Art Wiki API, then selected and printed a branded physical postcard as a keepsake, closing the loop between the digital marketplace and the real-world gallery experience. To harden seller trust at the point of onboarding, engineered a real-time liveness verification system in Angular using TensorFlow.js in 8 days: the system randomly assigns 3 of 6 facial challenges — blink, smile, head turns and tilts — instructing users via bilingual voice synthesis in English and Hindi with on-screen text as fallback, capturing a verified image and video on successful completion entirely within the browser.',
      result: 'The platform achieved a 90% customer satisfaction score and saw a 60% surge in user engagement driven by hyper-personalization and seamless discovery. Lift brought 300+ artworks to life as immersive, narrated reels — accumulating 10,000+ views and opening international buyer segments that static listings could never reach. The gallery kiosk extended Rooftop\'s brand into the physical world, turning gallery visits into interactive experiences and putting a branded postcard in every interested visitor\'s hand — a tangible marketing touchpoint delivered within a 4-week build cycle. The liveness verification system established a scalable anti-spoofing layer for seller onboarding in just 8 days, with bilingual voice-guided challenges removing barriers for Hindi-speaking providers and eliminating manual review overhead entirely. Established itself as the go-to solution for art workshop and artwork discovery with zero critical incidents over 2 years of operation. Reduced infrastructure costs by 40% through intelligent resource optimization while simultaneously improving response times by 35% and enabling 10x growth without service degradation.'
    },
    blueprint: {
      type: 'serverless',
      nodes: 20,
      connections: 38
    }
  },
  {
    slug: 'food-darzee',
    title: 'ERP Modernization & Vertical Growth',
    company: 'Food Darzee',
    role: 'Chief Technology Officer',
    period: '2019 - 2021',
    challenge: 'Spearheading new product verticals and automating manual processes across a complex supply chain. Coordinated technology oversight for 3 product expansions while managing legacy system dependencies and vendor integrations.',
    impact: 'Improved operational efficiency by 75% through custom ERP systems and seamless third-party integrations. Reduced data entry errors by 90% and enabled company scaling from 1,000 to 10,000+ daily active subscribers.',
    highlights: [
      { label: 'Ops Efficiency', value: '+75%' },
      { label: 'Delivery Uptime', value: '99.9%' }
    ],
    adrs: [
      {
        title: 'CI/CD Implementation',
        problem: 'Deployment bottlenecks and regression issues due to lack of automated testing and manual release cycles.',
        solution: 'Standardized on GitHub Actions with integrated Vitest suites and staging environments.',
        impact: 'Deployment frequency increased from weekly to multiple times daily, with a 90% reduction in production hotfixes.',
        decision: 'Standardized on GitHub Actions',
        rationale: 'To enable daily deployments and automated testing across multiple outsourced and in-house teams.'
      }
    ],
    techStack: ['PHP', 'Yii', 'GitHub Actions', 'Payment Gateways', 'ERP'],
    narrative: {
      vision: 'Digitize the end-to-end supply chain of a complex subscription-based food service to enable hyper-growth through operational automation, data-driven decision making, real-time supply chain visibility across multiple distribution centers, and intelligent coordination between logistics partners and kitchen operations.',
      execution: 'Developed a comprehensive custom ERP system that integrated CRM, logistics, and kitchen management into a single technical authority, seamlessly connecting restaurants, third-party logistics providers, and customer platforms. Implemented real-time inventory tracking using IoT sensors on refrigeration units that monitored temperature and stock levels, dynamic pricing engines that continuously adjusted prices based on demand elasticity and current inventory levels, and automated delivery route optimization using advanced machine learning algorithms that minimized travel time while respecting delivery time windows and traffic patterns. Built sophisticated demand forecasting models using time series analysis, seasonal patterns, and external data sources that predicted subscriber behavior weeks in advance, enabling proactive kitchen staffing decisions and data-driven ingredient procurement planning.',
      result: 'The system automated 80% of manual data entry, allowing the company to scale from 1,000 to 10,000 active daily subscribers while maintaining 99.9% on-time delivery rates across the expanded region. Reduced kitchen waste by 35% through predictive demand forecasting and enabled the company to expand successfully to 3 new product verticals seamlessly. Operational efficiency gains and reduced overhead freed up management resources to focus strategically on customer acquisition, retention, and market expansion opportunities. The platform became a model for efficient supply chain management in the food service industry.'
    },
    blueprint: {
      type: 'hub-and-spoke',
      nodes: 8,
      connections: 12
    }
  },
  {
    slug: 'onfees',
    title: 'SAAS Transformation for Education',
    company: 'EasyTech Innovations',
    role: 'Chief Technology Officer',
    period: '2019',
    challenge: 'Developing a robust SAAS product to facilitate seamless student payments and admissions at scale. Colleges needed ERP-level visibility into applications and payments — but each institution had its own workflows, payment partners, and reporting requirements. A student needed to apply to multiple colleges through a single form submission without re-entering data, while each college retained full isolation of its records. Payment gateway failures at the point of fee submission were a critical trust risk: a failed transaction at enrolment time could cost a student their seat.',
    impact: 'Achieved 100% enhancement in user satisfaction by streamlining the student onboarding and payment experience across 50+ institutions. Processed over $50M in transactions in the first year with zero security incidents and 99.99% payment gateway uptime, protected by a multi-gateway failover architecture. Reduced admission processing time by 60% through ERP dashboards and automated report generation, giving college administrators real-time visibility into applications, payments, and enrolment status.',
    highlights: [
      { label: 'User Satisfaction', value: '100%' },
      { label: 'Admission Processing', value: '-60%' },
      { label: 'Transactions Processed', value: '$50M+' },
      { label: 'Gateway Uptime', value: '99.99%' }
    ],
    adrs: [
      {
        title: 'Multi-Tenant Isolated Schema Architecture',
        problem: 'Need to support hundreds of institutions while maintaining strict data privacy and isolation without skyrocketing costs.',
        solution: 'Implemented a shared-database, isolated-schema multi-tenant pattern with per-institution role-based access controls and audit trails.',
        impact: 'Onboarded 50+ institutions in 3 months with zero cross-tenant data leaks and optimized infrastructure usage.',
        decision: 'Implemented Multi-tenant Database pattern',
        rationale: 'To ensure data isolation and performance while supporting hundreds of educational institutions on a single platform.'
      },
      {
        title: 'Multi-College Application via Single Form',
        problem: 'Students applying to multiple institutions were required to fill in the same personal and academic details repeatedly, causing friction and abandonment.',
        solution: 'Designed a unified application form that captured a single canonical student profile, then distributed completed applications to each selected institution simultaneously through the multi-tenant layer.',
        impact: 'Eliminated duplicate data entry for students applying to multiple colleges, increasing form completion rates and reducing application drop-off.',
        decision: 'Single form, fan-out architecture over per-institution forms',
        rationale: 'Centralising the student profile at the platform layer rather than per institution allowed one submission to populate multiple college workflows while preserving institutional data isolation.'
      },
      {
        title: 'Multi-Gateway Payment Failover',
        problem: 'A single payment gateway outage at the moment a student submits fees could result in a lost seat — a high-stakes, trust-destroying failure with no recovery path.',
        solution: 'Built a payment orchestration layer that sequenced multiple gateway providers in priority order, automatically retrying through the next configured gateway on failure, with idempotency keys to prevent duplicate charges.',
        impact: 'Maintained 99.99% payment completion uptime across all institutions, with zero student-facing payment failures attributed to gateway outages.',
        decision: 'In-house payment orchestration over single-gateway dependency',
        rationale: 'No single gateway offered a contractual uptime SLA sufficient for high-stakes enrolment transactions; a failover layer across providers was the only way to guarantee the required reliability.'
      },
      {
        title: 'ERP Reporting & College Dashboards',
        problem: 'College administrators had no real-time view into how many students had applied, which stage each application was at, or which payments had cleared — forcing manual reconciliation with the finance team.',
        solution: 'Built a role-based ERP dashboard for each institution exposing live application pipelines, payment status, and exportable reports in multiple formats. Automated scheduled report generation and email delivery to reduce manual admin overhead.',
        impact: 'Reduced daily administrative overhead per college by an estimated 60%, giving admissions teams instant, accurate visibility without spreadsheets or manual data pulls.',
        decision: 'Per-institution ERP dashboard with automated reporting over a shared admin panel',
        rationale: 'Each institution needed to see only its own data, with reports tailored to its own workflows and naming conventions — a shared super-admin view would have required constant customisation per query.'
      }
    ],
    techStack: ['SAAS', 'Node.js', 'Multi-tenant Architecture', 'Payment Gateways', 'MySQL', 'ERP Dashboards', 'Cloud Architecture'],
    narrative: {
      vision: 'Create the most frictionless payment and admission experience for educational institutions in the region while maintaining institutional data privacy, regulatory compliance, and supporting diverse payment methods — removing every point of failure between a student\'s decision to enrol and the completion of their application.',
      execution: 'Built a highly modular Node.js backend with an extensible adapter pattern for integrating multiple banking APIs and payment gateways. The payment orchestration layer routed transactions through a prioritised list of gateway providers, retrying automatically on failure with idempotency keys ensuring no student was ever double-charged. Designed the application form as a canonical student profile that could be submitted once and distributed to multiple selected colleges simultaneously, with each institution\'s records fully isolated behind the multi-tenant schema boundary. Implemented role-based ERP dashboards per institution giving admissions teams a live view of application pipelines, payment status, and enrolment progress — with automated report generation scheduled for daily and end-of-cycle delivery. Built reconciliation engines that matched gateway settlement records against institutional transaction logs, reducing manual finance work by 95%.',
      result: 'The platform processed over $50M in transactions in its first year with 99.99% payment gateway uptime and zero security incidents. Students could apply to multiple colleges through a single form, dramatically reducing abandonment. College administrators gained real-time ERP visibility that cut admission processing time by 60% and eliminated manual reconciliation. Onboarded 50+ institutions in 3 months and became the go-to admissions and payments platform in the region.'
    },
    blueprint: {
      type: 'microservices',
      nodes: 12,
      connections: 22
    }
  },
  {
    slug: 'indiefolio',
    title: 'Architecting a Creative Ecosystem',
    company: 'IndieFolio Network',
    role: 'Chief Technology Officer',
    period: '2015 - 2018',
    challenge: 'Scaling a creative community platform to 20+ properties while ensuring high-performance discovery and zero downtime. Architected systems for diverse creative disciplines (photography, design, illustration, video) with unique indexing and search requirements.',
    impact: 'Established a highly reliable, serverless-first architecture that supported 100,000+ creatives with hyper-personalized discovery tools. Achieved 100% platform uptime across 3 years and pioneered color-based search enabling first-of-its-kind discovery experience.',
    highlights: [
      { label: 'Platform Uptime', value: '100%' },
      { label: 'Creative Fields', value: '110+' },
      { label: 'User Satisfaction', value: '90%' }
    ],
    adrs: [
      {
        title: 'Serverless Image Management',
        problem: 'Dynamic image resizing for thousands of creative portfolios was taxing core application servers and increasing latency.',
        solution: 'Decoupled image processing to AWS Lambda, creating a self-scaling, event-driven image handler.',
        impact: 'Reduced image processing costs by 70% and eliminated CPU bottlenecks on core web servers.',
        decision: 'Implemented AWS Lambda for image handling',
        rationale: 'To offload compute-intensive tasks from the primary application server and scale processing horizontally.'
      },
      {
        title: 'Color-Based Discovery & Color Search Engine',
        problem: 'Creatives needed a way to browse portfolios by aesthetic and color palette, which was impossible with standard text search.',
        solution: 'Integrated Elasticsearch with custom color extraction logic to pick and index dominant palettes from uploaded images.',
        impact: 'Enabled a first-of-its-kind "Color Search" feature, significantly increasing user time-on-site and discovery accuracy.',
        decision: 'Integrated Elasticsearch for color indexing',
        rationale: 'Elasticsearch provides the necessary document-level flexibility and speed for multi-dimensional color vector queries.'
      }
    ],
    techStack: ['AWS', 'Serverless', 'Elasticsearch', 'WebSockets', 'PHP', 'Nginx'],
    narrative: {
      vision: 'Transform a fragmented creative community into a high-performance, discovery-driven technical authority that enables serendipitous connections across diverse creative disciplines while maintaining platform stability during explosive growth.',
      execution: 'Built a custom "Creative Quotient" (CQ) engine using machine learning for collaborative scoring that identified high-potential collaborators based on portfolio aesthetics and skill complementarity. Implemented a real-time messaging layer enabling organic collaboration at scale with full-text search and conversation threading. Pioneered color-based discovery system using Elasticsearch for multi-dimensional color vector queries, enabling creatives to find portfolios by aesthetic palette. Implemented serverless image processing using AWS Lambda that reduced infrastructure costs by 70% while supporting 20+ properties across photography, design, illustration, and video verticals.',
      result: 'The platform maintained 100% uptime during rapid 10x growth and became the leading creative network in the region. Facilitated 100,000+ creatives discovering each other through color-based search and algorithmic recommendations, with 90% user satisfaction. Platform innovations became industry benchmarks, with color-based discovery being adopted by other platforms. Successfully managed complex technical challenges of growing from 10K to 100K+ active creators while maintaining performance.'
    },
    blueprint: {
      type: 'serverless',
      nodes: 15,
      connections: 30
    }
  },
  {
    slug: 'epaisa',
    title: 'High-Integrity Payment Architecture',
    company: 'ePaisa Services',
    role: 'Software Architect',
    period: '2013 - 2014',
    challenge: 'Designing secure, high-performance mobile and web payment solutions in a highly regulated environment.',
    impact: 'Ensured 100% PCI DSS compliance and zero security breaches while launching innovative mobile-first payment security (Dugna MFA) and the Voodle distributed video render farm — processing millions in daily transactions at 99.99% uptime.',
    highlights: [
      { label: 'Security Compliance', value: 'PCI DSS' },
      { label: 'Uptime', value: '99.99%' }
    ],
    adrs: [
      {
        title: 'Dugna Security Framework',
        problem: 'Need for a highly secure, frictionless Multi-Factor Authentication (MFA) system for payment verification.',
        solution: 'Developed a custom MFA service utilizing unique mobile callback and SMS-based verification layers.',
        impact: 'Reduced unauthorized transaction attempts by 95% while maintaining a seamless user login experience.',
        decision: 'Developed custom MFA (Dugna Security)',
        rationale: 'Standard solutions were too rigid for the specific mobile-first requirements of the region at the time.'
      },
      {
        title: 'Voodle: Distributed Render Farm',
        problem: 'Users needed to generate high-quality video summaries of their images, requiring significant compute power.',
        solution: 'Architected a distributed render farm using AWS EC2 instances and Blender to process video transitions asynchronously.',
        impact: 'Allowed users to generate professional-grade videos in under 60 seconds from a mobile device.',
        decision: 'Built AWS-based Blender render farm',
        rationale: 'To provide high-end video processing capabilities without burdening the end-user\'s mobile hardware.'
      }
    ],
    techStack: ['AWS', 'EC2', 'Blender', 'PCI DSS', 'PHP', 'Node.js'],
    narrative: {
      vision: 'Secure and revolutionize mobile commerce through architectural integrity and innovative feature sets in a highly regulated environment while enabling cutting-edge capabilities on resource-constrained mobile devices across diverse payment methods.',
      execution: 'Implemented comprehensive security protocols alongside distributed compute solutions to balance strict safety requirements with high-end features users demanded. Developed custom MFA layers using SMS and mobile callbacks specifically designed for regional mobile payment patterns and user demographics. Built async video processing render farm using AWS EC2 and Blender to generate professional-grade video summaries, maintaining 99.99% uptime while handling millions in daily transaction volumes with full PCI DSS compliance. Engineered custom security frameworks that handled payment processing while remaining compliant with strict data residency and regulatory requirements specific to the region. Developed proprietary fraud detection systems using behavioral analytics to identify suspicious patterns in real-time.',
      result: 'The platform achieved full PCI compliance and successfully processed millions in transactions with zero security breaches across multiple years of operation, becoming a trusted payment provider. Pioneered mobile-first payment solutions that reduced unauthorized transaction attempts by 95% while maintaining seamless, frictionless user experiences that drove adoption. Enabled mobile users to perform high-end video generation in under 60 seconds, setting new standards for mobile commerce capabilities in the region and attracting premium customers seeking innovative features.'
    },
    blueprint: {
      type: 'monolith',
      nodes: 6,
      connections: 12
    }
  },
  {
    slug: 'tcs-wns',
    title: 'Foundational Data Automation',
    company: 'Tata Consultancy Services / WNS',
    role: 'Analyst Programmer',
    period: '2006 - 2009',
    challenge: 'Managing and analyzing millions of records from market research and medical questionnaires across multiple simultaneous client engagements, each with its own data schemas, validation rules, and delivery deadlines. As a junior analyst entering one of the most demanding delivery environments in the industry, the challenge was to absorb the complexity of multiple clients and multiple projects in parallel — and to consistently outperform while building the technical depth to move into leadership.',
    impact: 'Reduced manual data processing time by 90% through custom automation pipelines processing millions of records. Earned the highest productivity hours in the organisation for five consecutive months — a record achieved while simultaneously handling multiple client accounts and project streams. Promoted to team lead within the first year, establishing automation best practices that became the organisational standard and reducing error rates from 15% to 0.2%.',
    highlights: [
      { label: 'Automation Gain', value: '+90%' },
      { label: 'Top Productivity', value: '5 months' },
      { label: 'Records Processed', value: 'Millions' },
      { label: 'Error Rate', value: '0.2%' }
    ],
    adrs: [
      {
        title: 'Shell Scripting for High-Volume Data Pipelines',
        problem: 'Repetitive, manual analysis of millions of records across market research and medical questionnaire datasets was prone to human error, took days per cycle, and did not scale across multiple simultaneous client accounts.',
        solution: 'Developed a suite of reusable Shell Scripts to automate the cleaning, transformation, validation, and ingestion of raw data — parameterised per client schema so the same pipeline could service multiple accounts without duplication.',
        impact: 'Turnaround time for major reports decreased from days to minutes, enabling simultaneous delivery across multiple client projects with 100% data consistency.',
        decision: 'Automated pipelines using Shell Scripting',
        rationale: 'To ensure repeatability and speed in high-volume data environments without the overhead of heavy ETL tools, and to create a pattern that junior team members could own and extend.'
      },
      {
        title: 'Multi-Client Parallel Project Management',
        problem: 'Managing deliverables across multiple clients and project streams simultaneously created scheduling conflicts and the risk that quality would degrade under volume pressure.',
        solution: 'Built a personal workflow system for batching and sequencing tasks by client SLA priority, with automated pipeline runs scheduled to run overnight so analyst time was reserved for validation and exception handling rather than raw processing.',
        impact: 'Sustained the highest productivity hours in the organisation for five consecutive months across all active client accounts, with no missed deadlines and no client escalations.',
        decision: 'Async pipeline scheduling over synchronous per-client processing',
        rationale: 'Decoupling data processing from analyst working hours was the only way to service multiple high-volume clients in parallel without proportionally increasing headcount or degrading delivery timelines.'
      }
    ],
    techStack: ['Shell Scripting', 'Quantum', 'SPSS', 'Linux', 'Data Automation', 'ETL'],
    narrative: {
      vision: 'Eliminate human error and maximise efficiency in high-stakes, multi-client data analysis environments — turning what was a slow, manual, error-prone process into a reliable, automated pipeline that could scale across millions of records and dozens of simultaneous project streams.',
      execution: 'Joined TCS/WNS as a junior analyst programmer and immediately took on a portfolio spanning multiple clients and multiple concurrent projects — market research datasets and medical questionnaire analysis with rigorous validation standards. Developed a reusable suite of Shell Scripts that automated the full pipeline: raw data ingestion, schema-specific cleaning and transformation, multi-dimensional validation, and formatted output delivery. Scripts were parameterised by client schema so a single pipeline codebase served every account. Ran processing asynchronously overnight, freeing working hours for exception handling and quality verification rather than manual data entry. Within months, productivity metrics ranked consistently at the top of the team — a pace sustained for five consecutive months. The automation patterns built here were adopted as the team standard. Before the first year was complete, transitioned from individual contributor to leading a team, applying the same systematic thinking that drove personal output to coordinate and grow a broader group.',
      result: 'Achieved the highest productivity hours in the organisation for five consecutive months while concurrently managing multiple client accounts and project streams with millions of records. Promoted to team lead within the first year. Automation pipelines reduced error rates from 15% to 0.2% and cut report turnaround from days to minutes — establishing a new benchmark for data processing reliability that the wider team adopted as standard practice.'
    },
    blueprint: {
      type: 'hub-and-spoke',
      nodes: 6,
      connections: 10
    }
  },
  {
    slug: 'coupon-dunia',
    title: 'Scaling Mobile Engagement',
    company: 'CouponDunia',
    role: 'Sr. Web Developer',
    period: '2015',
    challenge: 'Architecting the complete backend and admin ecosystem for CashBoss — a cashback rewards Android app — with a team of 8, under pressure to launch quickly and prove mobile engagement at scale. The defining technical challenge was attribution and compliance: when a user selected an offer app inside CashBoss and installed it from the Play Store, the system had to reliably track that install, then confirm the app was actually opened and used for a minimum duration — anywhere between 30 seconds and 5 minutes depending on the advertiser\'s requirements. Tracking uninstalls and time-in-app accurately, without a native SDK embedded in the partner app, made this a hard attribution problem at scale.',
    impact: 'Successfully launched the CashBoss Android cashback rewards ecosystem with a full admin panel, push notifications, deep linking, and analytics — driving a 40% increase in mobile-led user conversions. Delivered a robust install tracking and app-usage verification system that satisfied advertiser compliance requirements across variable time-window thresholds (30s–5min), enabling reliable cashback attribution at scale and making CashBoss a trusted partner for Android app advertisers.',
    highlights: [
      { label: 'Mobile Conversion', value: '+40%' },
      { label: 'API Uptime', value: '99.9%' },
      { label: 'Team Size', value: '8 engineers' },
      { label: 'Attribution', value: 'Install + Usage' }
    ],
    adrs: [
      {
        title: 'Install & App-Usage Attribution Pipeline',
        problem: 'CashBoss rewarded users with cashback only after they installed a partner app AND used it for the advertiser\'s required duration (30 seconds to 5 minutes depending on the client). There was no SDK embedded in the partner apps — tracking had to be done externally, via Android broadcast signals and polling, without false positives that would cost the business real money.',
        solution: 'Built a server-side attribution pipeline that combined Play Store referral tracking (Google Install Referrer API) with an Android client-side job scheduler that polled app foreground state at configurable intervals. The server stored the install event with a timestamp and the client-reported active-use duration, validating against the per-advertiser time-window threshold before marking a conversion as eligible for cashback.',
        impact: 'Enabled reliable cashback attribution across all advertiser campaigns with zero reported false-positive conversions, making CashBoss a trusted platform for Android app advertisers requiring usage-based compliance.',
        decision: 'Referrer API + client-side usage polling over third-party attribution SDK',
        rationale: 'Third-party mobile attribution SDKs required integration in the partner apps — not possible without every advertiser\'s cooperation. A self-contained referrer + polling approach gave CashBoss full control over the attribution logic without external dependencies.'
      },
      {
        title: 'RESTful API Architecture for Android',
        problem: 'The existing backend was not designed for high-concurrency mobile traffic patterns — bursts of API calls from thousands of concurrent users performing offer discovery, install callbacks, and cashback status polls simultaneously.',
        solution: 'Built a modular Yii2 RESTful API layer with optimised response schemas for the Android client, connection pooling, and per-endpoint caching to flatten traffic spike impact.',
        impact: 'Supported 10x traffic growth from launch through peak campaigns without infrastructure scaling and maintained 99.9% API uptime.',
        decision: 'Yii2 RESTful API over legacy monolith extension',
        rationale: 'Yii2\'s active record, caching layer, and modular architecture gave the team the speed to build and the performance to ship — without the overhead of a full microservices migration in a tight timeline.'
      },
      {
        title: 'Admin Panel, Analytics & Push Notifications',
        problem: 'The marketing and operations team needed real-time visibility into campaign performance, user engagement, and cashback disbursement — and a direct channel to re-engage users who had gone dormant.',
        solution: 'Built a comprehensive admin panel covering campaign management, user analytics, cashback approval workflows, and deep-link generation. Integrated push notification delivery with segmentation by user activity and install status. Implemented deep linking so push notifications and marketing URLs landed users directly on the relevant offer inside the app.',
        impact: 'Gave the business team full operational control without engineering involvement for day-to-day campaign management, and enabled targeted re-engagement campaigns that contributed to the 40% uplift in mobile conversions.',
        decision: 'Purpose-built admin panel over adapting an off-the-shelf CMS',
        rationale: 'The attribution and cashback approval workflows were too specific to the CashBoss business model to fit cleanly into a generic CMS; a purpose-built panel gave the team precise control and reduced support overhead.'
      }
    ],
    techStack: ['PHP', 'Yii2', 'RESTful APIs', 'MySQL', 'Android Attribution', 'Push Notifications', 'Deep Linking', 'Admin Panel', 'Analytics'],
    narrative: {
      vision: 'Build a complete, production-grade mobile rewards ecosystem for CashBoss — a cashback Android app — that could reliably attribute installs and app usage, reward users accurately, and give the business team the operational tools to run campaigns without engineering bottlenecks.',
      execution: 'Led an 8-person engineering team to deliver the full CashBoss backend stack: a Yii2 RESTful API for the Android client, an admin panel with campaign management and cashback approval workflows, push notification delivery with audience segmentation, and deep linking to drive in-app engagement from external marketing. The hardest problem was attribution. When a user selected a partner app from CashBoss and installed it from the Play Store, the platform had to confirm not just the install — but that the app was actively used for the advertiser\'s required duration, which ranged from 30 seconds to 5 minutes depending on the client. With no SDK in the partner apps, built a self-contained pipeline: the Android client tracked foreground app state on a configurable polling schedule, reported usage duration back to the server, and the backend validated each conversion against the per-advertiser threshold before triggering cashback eligibility. Uninstall signals were captured via silent push, allowing the system to invalidate conversions where the app was installed briefly and then removed.',
      result: 'Launched CashBoss as a fully operational cashback rewards platform with reliable install and usage attribution across all advertiser campaigns. The system drove a 40% increase in mobile-led user conversions and sustained 99.9% API uptime through traffic spikes. Advertiser compliance requirements were met across all time-window thresholds, establishing CashBoss as a trusted partner for Android app campaigns. The admin panel gave the operations team full campaign control from day one, reducing engineering support overhead and accelerating time-to-market for new offers.'
    },
    blueprint: {
      type: 'monolith',
      nodes: 8,
      connections: 14
    }
  }
]
