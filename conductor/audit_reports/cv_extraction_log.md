# CV Extraction Log - Microscopic Audit (2006-2026)

This log documents the granular extraction of skills, metrics, and project details from the CV PDF series.

## Extraction Targets
- **Missing Skills**: Tools, libraries, and frameworks not currently in `skills.ts`.
- **Quantitative Metrics**: Percentages, dollar amounts, traffic volumes, and time-savings.
- **Legacy Projects**: Details for IndieFolio, ePaisa, CouponDunia, MADAR, Tata, WNS, etc.
- **ADR Content**: Problem-Solution-Impact narratives.

---

## 2018-2025 CV Audit (Consolidated Microscopic Findings)

### 1. Missing/Granular Skills
- **Frameworks/Languages**: Laravel (2025), Flutter (2025), Angular (2025), Yii 1.1 & 2.0 (Legacy Authority), Node.js.
- **Tools & Specialized Tech**:
    - **Search & Data**: Elasticsearch (IndieFolio Deep-dive), Quantum, SPSS (Tata/WNS Data Era).
    - **Infrastructure**: AWS Lambda (Serverless Image Handler), AWS S3 (Media Manager), NGINX, Linux Server Management, WebSockets (Real-time Messaging).
    - **Security/Crypto**: PCI DSS Compliance (ePaisa), MFA (Dugna Security), RBAC, DUKPT Key Management, Triple DES.
    - **Automation**: Shell Scripting (Bash/Shell) - 15+ year history of automation at TCS/WNS.
    - **Media**: Blender Render Farm (AWS-based for Voodle).

### 2. Quantitative Metrics (The "Impact" Data)
- **Rooftop**: -85% System Runtime, +60% User Engagement, 90% Customer Satisfaction.
- **Food Darzee**: +75% Operational Efficiency via custom ERP.
- **OnFees (EasyTech)**: +100% User Satisfaction, +60% Project Success Rate.
- **IndieFolio**: 0% Downtime for 20+ properties, Drastic cost reduction via Serverless.
- **WNS**: "Highest Productivity Hours" award.

### 3. Legacy Project Details for Recovery
- **IndieFolio - Creative Field CQ & Color Search**:
    - *Problem*: Difficulty for users to browse creative portfolios by aesthetic.
    - *Solution*: Elasticsearch-backed color extraction and a custom "Creative Quotient" scoring algorithm.
    - *Impact*: 110 creative fields mapped per user; hyper-accurate discovery.
- **ePaisa - Voodle & Dugna Security**:
    - *Voodle*: AWS-based render farm for Blender to process photo-to-video transitions.
    - *Dugna*: High-security MFA implementation for payments.
- **TCS/WNS - Data Automation**:
    - *Problem*: Manual analysis of thousands of medical/market questionnaires.
    - *Solution*: Developed Shell Scripts and automated routines in Quantum/SPSS.
    - *Impact*: Drastic reduction in manual effort; earned highest productivity awards.

### 4. ADR Narrative Seeds
- **Serverless Image Management (IndieFolio)**: Decoupling image processing from core app to Lambda for cost and scale.
- **Multi-Tenant SAAS (OnFees)**: Scaling to 50+ institutions with isolated schemas.
- **Real-time Messaging (IndieFolio)**: WebSocket integration for creative collaboration.
