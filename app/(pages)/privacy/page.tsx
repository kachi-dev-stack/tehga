"use client";

import { LegalPage } from "@/app/components/LegalPage";

const SECTIONS = [
  {
    title: "Introduction",
    body: `TEHGA Consulting respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.

By using our website, you consent to the practices described in this policy.`,
  },
  {
    title: "Information We Collect",
    body: `We may collect the following types of information:

• Personal Information: Name, email address, company name, job title, and contact details submitted through our forms or during professional engagements.
• Usage Data: Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on the site.
• Cookies and Tracking: We use cookies and similar technologies to improve your experience and analyze site traffic.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information we collect for the following purposes:

• To respond to your inquiries and provide the services you request.
• To communicate with you about our services, events, and relevant updates.
• To improve our website functionality and user experience.
• To comply with legal obligations and protect our legitimate interests.

We will never sell or rent your personal information to third parties.`,
  },
  {
    title: "Information Sharing",
    body: `TEHGA Consulting does not share your personal information except in the following circumstances:

• With your explicit consent.
• With trusted service providers who assist us in operating our website and delivering services, under strict confidentiality obligations.
• When required by law or to protect our rights, property, or safety.`,
  },
  {
    title: "Data Security",
    body: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.

However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.`,
  },
  {
    title: "Your Rights",
    body: `Depending on your location, you may have the following rights regarding your personal information:

• Access: Request a copy of the personal data we hold about you.
• Correction: Request that we correct inaccurate or incomplete information.
• Deletion: Request that we delete your personal data, subject to legal obligations.
• Objection: Object to the processing of your personal data in certain circumstances.

To exercise these rights, please contact us using the details below.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.

When your information is no longer needed, we will securely delete or anonymize it.`,
  },
  {
    title: "Third-Party Links",
    body: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any site you visit.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:

TEHGA Consulting
Email: info@tehgaconsulting.com
Offices: Lagos · Nairobi · London`,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information when you interact with TEHGA Consulting."
      sections={SECTIONS}
      footer={
        <>
          <p className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            We may update this policy from time to time. Continued use of our
            website after changes constitutes acceptance.
          </p>
        </>
      }
    />
  );
}
