import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Hero ──────────────────────────────────────────────
  await prisma.heroContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      eyebrow: "Strategic Advisory",
      headline: "Rooted in Africa. Operating everywhere that matters.",
      subtext:
        "TEHGA Consulting works with the public sector, private enterprise, and capital markets — across infrastructure, investment, market expansion, and digital transformation — helping them move with precision through high-stakes decisions on every continent.",
      ctaPrimary: "Explore services",
      ctaSecondary: "Schedule a consultation",
      presenceLabel: "Africa · Global",
    },
  });

  // ── Firm Overview ─────────────────────────────────────
  await prisma.firmOverview.upsert({
    where: { id: 1 },
    update: {},
    create: {
      eyebrow: "The firm",
      heading: "Rigorous analysis. Grounded in the markets we serve.",
      body1:
        "TEHGA Consulting is a research-driven advisory firm. We bring structured analysis, strategic frameworks, and deep market intelligence to the decisions that matter most — across infrastructure, investment, government engagement, and digital transformation in Africa and international markets.",
      body2:
        "We work with clients on both a retained and project basis — embedding alongside leadership teams for long-term mandates, and deploying focused expertise for discrete engagements. In either case, our commitment is the same: rigorous thinking, clear recommendations, and results that hold.",
    },
  });

  // ── Why Pillars ───────────────────────────────────────
  await prisma.whyPillar.deleteMany();
  await prisma.whyPillar.createMany({
    data: [
      {
        title: "Clarity of direction",
        body: "We don't deliver options and walk away. Every engagement ends with a clear, defensible position — one your leadership can act on with confidence.",
        order: 1,
      },
      {
        title: "Operator discipline",
        body: "Our advisors have sat on both sides of the table. We bring the rigour of operators, not just analysts — which means recommendations built for execution, not presentation.",
        order: 2,
      },
      {
        title: "Africa & global reach",
        body: "Deep market knowledge across African economies, combined with active relationships in Europe, the Middle East, and Asia. We operate where your decisions actually play out.",
        order: 3,
      },
      {
        title: "Outcome obsession",
        body: "We measure our value by what gets built, closed, or changed — not by the quality of the deck. Every mandate is scoped around a result, not a process.",
        order: 4,
      },
    ],
  });

  // ── Services ──────────────────────────────────────────
  const services = [
    {
      slug: "strategy-advisory",
      title: "Strategy & Advisory",
      body: "We work with boards and leadership teams to set direction, sharpen corporate strategy, and build the operational structures to execute it — in complex, high-stakes environments.",
      detail:
        "Corporate strategy · Market entry · Organisational design · Competitive positioning · Transformation planning",
      image: "/services/strategy-advisory.jpg",
      imageAlt: "Boardroom set for strategic advisory work",
      order: 1,
    },
    {
      slug: "infrastructure-development",
      title: "Infrastructure & Development",
      body: "From project origination to financial close and delivery — we structure and advance major infrastructure programmes across energy, transport, and urban development.",
      detail:
        "Project development · PPP structuring · Feasibility & due diligence · Financing strategy · Stakeholder management",
      image: "/services/development-infrastructure.jpg",
      imageAlt: "Major infrastructure construction site at golden hour",
      order: 2,
    },
    {
      slug: "government-engagement",
      title: "Government & Global Engagement",
      body: "We advise governments and institutions on policy design, regulatory frameworks, and international engagement strategies that attract investment and enable growth.",
      detail:
        "Policy advisory · Regulatory reform · Institutional strengthening · International relations · Investment promotion",
      image: "/services/government-engagement.jpg",
      imageAlt: "Government building colonnade with flags",
      order: 3,
    },
    {
      slug: "innovation-technology",
      title: "Innovation, Technology & Execution",
      body: "We help organisations move from technology strategy to real-world deployment — modernising operations, enabling digital transformation, and building the systems that scale.",
      detail:
        "Digital strategy · Technology selection · Systems implementation · Innovation frameworks · Operational modernisation",
      image: "/services/innovation-technology.jpg",
      imageAlt: "Modern technology operations centre",
      order: 4,
    },
    {
      slug: "investment-advisory",
      title: "Investment & Commercial Advisory",
      body: "We support investors and corporates through the full transaction lifecycle — from opportunity identification and due diligence to deal structuring, capital raising, and close.",
      detail:
        "M&A advisory · Capital raising · Due diligence · Deal structuring · Transaction management",
      image: "/services/commercial-advisory.png",
      imageAlt: "Capital markets office at twilight",
      order: 5,
    },
    {
      slug: "digital-infrastructure",
      title: "Digital Infrastructure & Innovation",
      body: "We design and develop the digital backbone that organisations and economies need to compete — connectivity, smart systems, and the ecosystems that drive sustained innovation.",
      detail:
        "Connectivity strategy · Smart systems · Digital ecosystem design · Infrastructure deployment · Innovation enablement",
      image: "/services/infrastructure-digital.jpg",
      imageAlt:
        "Telecommunications tower with network connectivity over African landscape",
      order: 6,
    },
  ];
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  // ── Industries ────────────────────────────────────────
  const industries = [
    {
      slug: "aviation",
      title: "Aviation & Aerospace",
      description:
        "We advise on airport development, airline strategy, regulatory frameworks, and the infrastructure investments shaping Africa's aviation sector and its connectivity to global markets.",
      order: 1,
    },
    {
      slug: "government",
      title: "Government & Public Sector",
      description:
        "We work with governments and public institutions on policy design, institutional reform, public investment strategy, and the frameworks that enable effective service delivery and economic growth.",
      order: 2,
    },
    {
      slug: "healthcare",
      title: "Healthcare & Insurance",
      description:
        "We support healthcare organisations, insurers, and governments in building the systems, financing structures, and regulatory environments that expand access and drive sector development.",
      order: 3,
    },
    {
      slug: "energy",
      title: "Energy & Natural Resources",
      description:
        "From power generation and distribution to oil, gas, and minerals — we advise on project development, investment structuring, regulatory engagement, and the energy transition across African markets.",
      order: 4,
    },
    {
      slug: "transport",
      title: "Transport & Logistics",
      description:
        "We advise on transport infrastructure, logistics networks, port development, and the policy and investment frameworks that unlock the movement of goods and people across the continent.",
      order: 5,
    },
    {
      slug: "financial",
      title: "Financial Services",
      description:
        "We work with banks, investment firms, fintechs, and regulators on strategy, market entry, transaction advisory, and the development of financial markets across Africa and internationally.",
      order: 6,
    },
    {
      slug: "technology",
      title: "Technology & Digital Innovation",
      description:
        "We advise technology companies and organisations undergoing digital transformation — on strategy, market positioning, infrastructure deployment, and building innovation ecosystems that scale.",
      order: 7,
    },
    {
      slug: "infrastructure",
      title: "Infrastructure & Urban Development",
      description:
        "We support the planning, financing, and delivery of urban infrastructure — including housing, water, sanitation, and the mixed-use developments shaping Africa's fastest-growing cities.",
      order: 8,
    },
    {
      slug: "trade",
      title: "Trade & Commerce",
      description:
        "We advise on trade strategy, market access, cross-border commerce, and the policy and institutional frameworks — including AfCFTA — that are reshaping how Africa trades with itself and the world.",
      order: 9,
    },
    {
      slug: "education",
      title: "Education & Skills Development",
      description:
        "We work with education institutions, governments, and investors on sector strategy, institutional development, and the investments in human capital that underpin long-term economic growth.",
      order: 10,
    },
    {
      slug: "agriculture",
      title: "Agriculture & Food Systems",
      description:
        "We advise across the agricultural value chain — from production and processing to market access and food security policy — supporting the investors and institutions building Africa's food systems.",
      order: 11,
    },
    {
      slug: "security",
      title: "Security & Risk Advisory",
      description:
        "We support organisations and governments in assessing and managing the political, operational, and strategic risks that come with operating in complex and frontier markets across Africa.",
      order: 12,
    },
    {
      slug: "fashion",
      title: "Fashion & Textile",
      description:
        "We advise on market entry, supply chain development, investment structuring, and the policy frameworks enabling Africa's fashion and textile sector to compete in global markets.",
      order: 13,
    },
  ];
  for (const i of industries) {
    await prisma.industry.upsert({
      where: { slug: i.slug },
      update: {},
      create: i,
    });
  }

  // ── Case Studies ──────────────────────────────────────
  await prisma.caseStudy.deleteMany();
  await prisma.caseStudy.createMany({
    data: [
      {
        client: "National Aviation Authority",
        sector: "Aviation & Aerospace",
        region: "West Africa",
        body: "Advised a national aviation authority on a full institutional restructuring — redefining the regulatory framework, commercialising airport assets, and designing a private sector participation model to attract international operators.",
        outcome:
          "Restructuring framework adopted; two international operators entered formal negotiation within 6 months.",
        order: 1,
      },
      {
        client: "Federal Ministry of Infrastructure",
        sector: "Government & Public Sector",
        region: "East Africa",
        body: "Designed the policy architecture and investor facilitation strategy for a multi-corridor infrastructure programme, covering land-use sequencing, PPP structuring, and legislative alignment.",
        outcome:
          "Policy framework enacted; programme advanced to procurement stage ahead of schedule.",
        order: 2,
      },
      {
        client: "Regional Health Insurance Scheme",
        sector: "Healthcare & Insurance",
        region: "West Africa",
        body: "Developed the operating model, claims management framework, and digital systems roadmap for a government-backed health insurance scheme scaling across three states.",
        outcome:
          "Scheme launched on time; enrolment targets exceeded in the first operating quarter.",
        order: 3,
      },
      {
        client: "Integrated Energy Group",
        sector: "Energy & Natural Resources",
        region: "Nigeria",
        body: "Led the corporate strategy reset for a diversified energy group navigating the transition from upstream dependency — including portfolio rationalisation, new market entry analysis, and board-level strategic planning.",
        outcome:
          "Board approved a revised 5-year strategy; two non-core assets divested within the plan period.",
        order: 4,
      },
      {
        client: "Logistics & Freight Operator",
        sector: "Transport & Logistics",
        region: "Southern Africa",
        body: "Redesigned the end-to-end operations model for a regional freight operator — route optimisation, fleet utilisation strategy, and a digital dispatch and tracking implementation.",
        outcome:
          "On-time delivery rate improved significantly; operational costs reduced within the first year.",
        order: 5,
      },
      {
        client: "Tier-2 Commercial Bank",
        sector: "Financial Services",
        region: "Pan-African",
        body: "Supported a regional bank through a full digital transformation — core banking modernisation, mobile channel strategy, and an innovation roadmap aligned to emerging fintech competition.",
        outcome:
          "Digital channel adoption doubled within 12 months; time-to-market for new products reduced by a third.",
        order: 6,
      },
      {
        client: "Urban Development Agency",
        sector: "Infrastructure & Urban Development",
        region: "North Africa",
        body: "Provided strategic and commercial advisory for a large-scale mixed-use urban development — investor targeting, land value capture structuring, and phased delivery planning.",
        outcome:
          "Anchor investors secured for phase one; development finance approved and construction commenced.",
        order: 7,
      },
      {
        client: "Agricultural Export Cooperative",
        sector: "Agriculture & Food Systems",
        region: "East Africa",
        body: "Built the market access strategy and trade facilitation framework for a large agricultural cooperative seeking to expand into European and Middle Eastern export markets.",
        outcome:
          "Three new export agreements signed; cooperative achieved certified exporter status within the programme period.",
        order: 8,
      },
    ],
  });

  // ── About ─────────────────────────────────────────────
  await prisma.aboutCopy.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroEyebrow: "About",
      heroTitle: "A firm built for consequential decisions.",
      heroSubtitle:
        "TEHGA Consulting was established to close the gap between Africa's growth potential and the international capital, networks, and strategic expertise needed to realise it.",
      whoHeading:
        "A research-driven advisory firm. Built for Africa and global markets.",
      whoPara1:
        "TEHGA Consulting was founded to bring structured analysis, deep market intelligence, and strategic rigour to the decisions that shape organisations and economies — across Africa and internationally.",
      whoPara2:
        "We are disciplined in how we engage. Every mandate begins with a clear understanding of the market, the institution, and the decision at hand.",
      whoPara3:
        "Our team combines strategy, capital markets knowledge, and operational insight — structured to move across disciplines as mandates require.",
      reachHeading: "Rooted in Africa. Operating globally.",
      reachBody:
        "We operate across Africa's most active markets — from West and East Africa to the continent's emerging corridors — while maintaining active relationships in the international capital, policy, and business centres that shape investment flows.",
    },
  });

  // ── Principles ────────────────────────────────────────
  await prisma.principle.deleteMany();
  await prisma.principle.createMany({
    data: [
      {
        title: "Independence",
        body: "We have no conflicts of interest. Our advice is shaped by the evidence and the client's best interest — nothing else.",
        order: 1,
      },
      {
        title: "Rigour",
        body: "Every engagement is grounded in structured analysis and intellectual honesty. We challenge assumptions — including our own — before we present a recommendation.",
        order: 2,
      },
      {
        title: "Partnership",
        body: "We work alongside our clients, not above them. We invest in understanding their context, their constraints, and their objectives.",
        order: 3,
      },
      {
        title: "Discretion",
        body: "The most consequential decisions demand absolute confidentiality. We operate as trusted advisors — and we treat every mandate with the discretion that role requires.",
        order: 4,
      },
    ],
  });

  // ── Stats ─────────────────────────────────────────────
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { value: "12+", label: "Active markets", order: 1 },
      { value: "30+", label: "Senior advisors", order: 2 },
      { value: "4", label: "Regional hubs", order: 3 },
      { value: "20yrs", label: "Combined leadership", order: 4 },
    ],
  });

  // ── Footer ────────────────────────────────────────────
  await prisma.footerContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      description:
        "TEHGA Consulting is a strategic advisory firm working with governments, institutional investors, and leading corporates on strategy, infrastructure, investment, and policy — across Africa and international markets.",
      email: "info@tehgaconsulting.com",
      offices: "Lagos · Nairobi · London",
      copyright: "TEHGA Consulting. All rights reserved.",
      tagline: "Africa · Global",
    },
  });

  // ── Home Content ──────────────────────────────────────
  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      servicesEyebrow: "What we do",
      servicesHeading: "Advisory across every dimension of the mandate.",
      whyEyebrow: "Why TEHGA",
      whyHeading: "Built for decisions that carry weight.",
      whySubtext:
        "Retained by governments, institutions, and private sector leaders for mandates where the stakes are too high for generalist advice.",
      industriesEyebrow: "Industries",
      industriesHeading: "Sectors we serve.",
      industriesBody:
        "From energy and infrastructure to financial services and government — we work across the sectors that shape African economies and global markets.",
      industriesCta: "View all industries",
      ctaEyebrow: "Engage TEHGA",
      ctaTitle: "Strategy without compromise. Outcomes without excuses.",
      ctaBody:
        "If you are navigating a high-stakes decision, transaction, or transformation — we should talk. TEHGA works on a retained basis with clients who need more than a report.",
      ctaPrimary: "Start a conversation",
      ctaSecondary: "About the firm",
    },
  });

  // ── Services Page Content ─────────────────────────────
  await prisma.servicesPageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroEyebrow: "Services",
      heroTitle: "Advisory built around the decisions that define mandates.",
      heroSubtitle:
        "Built to address the most consequential challenges facing governments, investors, and organisations — across Africa and international markets.",
      introPart1: "TEHGA delivers",
      introEmphasis: "structured, evidence-led advisory",
      introPart2:
        "across the decisions that define organisations and markets — from the earliest stages of strategy through to execution and commercial close.",
      ctaEyebrow: "",
      ctaTitle: "",
      ctaBody: "",
      ctaLabel: "",
    },
  });

  // ── Industries Page Content ───────────────────────────
  await prisma.industriesPageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroEyebrow: "Industries",
      heroTitle: "The sectors that shape Africa's growth — and global markets.",
      heroSubtitle:
        "TEHGA advises across the industries that drive economies, attract capital, and determine how societies develop — from energy and infrastructure to financial services, healthcare, and beyond.",
      introPart1: "Our advisors combine",
      introEmphasis: "deep sector knowledge",
      introPart2:
        "with cross-industry perspective — working across the industries that define African economies and attract global capital.",
      ctaEyebrow: "Sector advisory",
      ctaTitle: "Your industry has its own rules. We know them.",
      ctaBody:
        "Whether you are navigating a market entry, a regulatory shift, or a complex transaction — we work with clients who need an advisor with genuine sector depth. Share your brief and let's talk.",
      ctaLabel: "Speak with an advisor",
    },
  });

  // ── Cases Page Content ────────────────────────────────
  await prisma.casesPageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroEyebrow: "Case Studies",
      heroTitle: "Mandates delivered. Outcomes achieved.",
      heroSubtitle:
        "A selection of engagements that illustrate the scope, scale and impact of TEHGA's advisory across sectors and markets.",
      introPart1: "Engagements defined by",
      introEmphasis:
        "clear mandates, rigorous execution, and results that stand on their own.",
      ctaEyebrow: "Start a mandate",
      ctaTitle: "Facing a decision that demands the right advice?",
      ctaBody:
        "Every engagement begins with a focused conversation. Share your context and our team will respond within two business days.",
      ctaLabel: "Brief our team",
    },
  });

  // ── AboutCopy — update with new fields ───────────────
  await prisma.aboutCopy.upsert({
    where: { id: 1 },
    update: {
      whoEyebrow: "Who we are",
      philosophyEyebrow: "Our philosophy",
      philosophyHeading: "Four principles guide every engagement.",
      reachEyebrow: "Our reach",
      ctaEyebrow: "Work with us",
      ctaTitle: "A conversation is the best way to begin.",
      ctaBody:
        "If you are navigating a complex decision — in strategy, infrastructure, investment, or government engagement — we would welcome the opportunity to understand your situation and explore how we can help.",
      ctaLabel: "Schedule a consultation",
    },
    create: {
      heroEyebrow: "About",
      heroTitle: "A firm built for consequential decisions.",
      heroSubtitle:
        "TEHGA Consulting was established to close the gap between Africa's growth potential and the international capital, networks, and strategic expertise needed to realise it.",
      whoEyebrow: "Who we are",
      whoHeading:
        "A research-driven advisory firm. Built for Africa and global markets.",
      whoPara1:
        "TEHGA Consulting was founded to bring structured analysis, deep market intelligence, and strategic rigour to the decisions that shape organisations and economies — across Africa and internationally.",
      whoPara2:
        "We are disciplined in how we engage. Every mandate begins with a clear understanding of the market, the institution, and the decision at hand.",
      whoPara3:
        "Our team combines strategy, capital markets knowledge, and operational insight — structured to move across disciplines as mandates require.",
      philosophyEyebrow: "Our philosophy",
      philosophyHeading: "Four principles guide every engagement.",
      reachEyebrow: "Our reach",
      reachHeading: "Rooted in Africa. Operating globally.",
      reachBody:
        "We operate across Africa's most active markets — from West and East Africa to the continent's emerging corridors — while maintaining active relationships in the international capital, policy, and business centres that shape investment flows.",
      ctaEyebrow: "Work with us",
      ctaTitle: "A conversation is the best way to begin.",
      ctaBody:
        "If you are navigating a complex decision — in strategy, infrastructure, investment, or government engagement — we would welcome the opportunity to understand your situation and explore how we can help.",
      ctaLabel: "Schedule a consultation",
    },
  });

  // ── Privacy Page ──────────────────────────────────────
  await prisma.privacyPage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      subtitle:
        "How we collect, use, and protect your personal information when you interact with TEHGA Consulting.",
    },
  });
  await prisma.privacySection.deleteMany();
  await prisma.privacySection.createMany({
    data: [
      {
        title: "Introduction",
        body: "TEHGA Consulting respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.\n\nBy using our website, you consent to the practices described in this policy.",
        order: 1,
        pageId: 1,
      },
      {
        title: "Information We Collect",
        body: "We may collect the following types of information:\n\n• Personal Information: Name, email address, company name, job title, and contact details submitted through our forms or during professional engagements.\n• Usage Data: Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on the site.\n• Cookies and Tracking: We use cookies and similar technologies to improve your experience and analyze site traffic.",
        order: 2,
        pageId: 1,
      },
      {
        title: "How We Use Your Information",
        body: "We use the information we collect for the following purposes:\n\n• To respond to your inquiries and provide the services you request.\n• To communicate with you about our services, events, and relevant updates.\n• To improve our website functionality and user experience.\n• To comply with legal obligations and protect our legitimate interests.\n\nWe will never sell or rent your personal information to third parties.",
        order: 3,
        pageId: 1,
      },
      {
        title: "Information Sharing",
        body: "TEHGA Consulting does not share your personal information except in the following circumstances:\n\n• With your explicit consent.\n• With trusted service providers who assist us in operating our website and delivering services, under strict confidentiality obligations.\n• When required by law or to protect our rights, property, or safety.",
        order: 4,
        pageId: 1,
      },
      {
        title: "Data Security",
        body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.\n\nHowever, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.",
        order: 5,
        pageId: 1,
      },
      {
        title: "Your Rights",
        body: "Depending on your location, you may have the following rights regarding your personal information:\n\n• Access: Request a copy of the personal data we hold about you.\n• Correction: Request that we correct inaccurate or incomplete information.\n• Deletion: Request that we delete your personal data, subject to legal obligations.\n• Objection: Object to the processing of your personal data in certain circumstances.\n\nTo exercise these rights, please contact us using the details below.",
        order: 6,
        pageId: 1,
      },
      {
        title: "Data Retention",
        body: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.\n\nWhen your information is no longer needed, we will securely delete or anonymize it.",
        order: 7,
        pageId: 1,
      },
      {
        title: "Third-Party Links",
        body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any site you visit.",
        order: 8,
        pageId: 1,
      },
      {
        title: "Contact Us",
        body: "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:\n\nTEHGA Consulting\nEmail: info@tehgaconsulting.com\nOffices: Lagos · Nairobi · London",
        order: 9,
        pageId: 1,
      },
    ],
  });

  // ── Terms Page ────────────────────────────────────────
  await prisma.termsPage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      eyebrow: "Legal",
      title: "Terms of Use",
      subtitle:
        "The rules and conditions governing your use of the TEHGA Consulting website and services.",
    },
  });
  await prisma.termsSection.deleteMany();
  await prisma.termsSection.createMany({
    data: [
      {
        title: "Acceptance of Terms",
        body: "By accessing or using the TEHGA Consulting website and services, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, please do not use our website or services.\n\nTEHGA Consulting reserves the right to modify these terms at any time. Your continued use of the site following any changes constitutes acceptance of those changes.",
        order: 1,
        pageId: 1,
      },
      {
        title: "Services Description",
        body: "TEHGA Consulting provides strategic advisory services to organizations operating in Africa and global markets. The content on this website is for informational purposes only and does not constitute professional advice tailored to any specific situation.\n\nAll engagements are governed by separate written agreements that supersede any representations made on this website.",
        order: 2,
        pageId: 1,
      },
      {
        title: "Intellectual Property",
        body: "All content on this website, including text, graphics, logos, icons, images, and software, is the property of TEHGA Consulting or its licensors and is protected by intellectual property laws.\n\nYou may not reproduce, distribute, modify, or create derivative works from any material on this site without our prior written consent.",
        order: 3,
        pageId: 1,
      },
      {
        title: "Confidentiality",
        body: "Any information you submit through our website forms is subject to our Privacy Policy. During professional engagements, TEHGA Consulting adheres to strict confidentiality standards and will protect client information in accordance with applicable laws and our engagement terms.\n\nWe do not sell, rent, or share personal information with third parties for marketing purposes.",
        order: 4,
        pageId: 1,
      },
      {
        title: "Limitation of Liability",
        body: "TEHGA Consulting shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your access to or use of this website or the services described herein.\n\nIn no event shall our total liability exceed the amount paid by you, if any, for accessing or using the site.",
        order: 5,
        pageId: 1,
      },
      {
        title: "Governing Law",
        body: "These Terms of Use shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.\n\nAny disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Lagos, Nigeria.",
        order: 6,
        pageId: 1,
      },
    ],
  });

  // ── Contact Page Content ──────────────────────────────
  await prisma.contactPageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroEyebrow: "Contact",
      heroTitle: "Tell us what you are working on.",
      heroSubtitle:
        "Whether you are exploring a mandate, responding to an opportunity, or navigating a complex situation — share a brief and we will respond promptly.",
      detailsEyebrow: "Direct",
      email: "info@tehgaconsulting.com",
      officesLabel: "Offices",
      officesText: "Lagos · Nairobi\nLondon",
      officesNote: "Meetings and engagements by appointment only.",
      expectEyebrow: "What to expect",
      expectStep1: "Submit your brief using the form.",
      expectStep2:
        "A senior member of our team reviews your enquiry personally.",
      expectStep3: "We respond to discuss next steps.",
      confirmTitle: "We have received your brief.",
      confirmBody:
        "A member of our team will review your enquiry and come back to you within one business day. All submissions are treated with strict confidence.",
      confirmReset: "Submit another enquiry",
    },
  });
  console.log("✅ Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
