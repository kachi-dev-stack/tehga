"use client";

import { LegalPage } from "@/app/components/LegalPage";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the TEHGA Consulting website and services, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, please do not use our website or services.

TEHGA Consulting reserves the right to modify these terms at any time. Your continued use of the site following any changes constitutes acceptance of those changes.`,
  },
  {
    title: "Services Description",
    body: `TEHGA Consulting provides strategic advisory services to organizations operating in Africa and global markets. The content on this website is for informational purposes only and does not constitute professional advice tailored to any specific situation.

All engagements are governed by separate written agreements that supersede any representations made on this website.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website, including text, graphics, logos, icons, images, and software, is the property of TEHGA Consulting or its licensors and is protected by intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from any material on this site without our prior written consent.`,
  },
  {
    title: "Confidentiality",
    body: `Any information you submit through our website forms is subject to our Privacy Policy. During professional engagements, TEHGA Consulting adheres to strict confidentiality standards and will protect client information in accordance with applicable laws and our engagement terms.

We do not sell, rent, or share personal information with third parties for marketing purposes.`,
  },
  {
    title: "Limitation of Liability",
    body: `TEHGA Consulting shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your access to or use of this website or the services described herein.

In no event shall our total liability exceed the amount paid by you, if any, for accessing or using the site.`,
  },
  {
    title: "Governing Law",
    body: `These Terms of Use shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.

Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Lagos, Nigeria.`,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      subtitle="The rules and conditions governing your use of the TEHGA Consulting website and services."
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
            For questions about these terms, contact us at{" "}
            <a
              href="mailto:info@tehgaconsulting.com"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              info@tehgaconsulting.com
            </a>
            .
          </p>
        </>
      }
    />
  );
}
