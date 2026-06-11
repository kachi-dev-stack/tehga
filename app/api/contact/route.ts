import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, company, email, country, service, engagement, message } =
      await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Instantiate inside the function so it only runs at request time, not build time
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "TEHGA Contact Form <onboarding@resend.dev>",
      to: "info@tehgaconsulting.com",
      replyTo: email,
      subject: `New brief from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; color: #1a1a1a;">
          <h2 style="font-size: 20px; margin-bottom: 24px; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
            New brief submitted via tehgaconsulting.com
          </h2>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            ${
              company
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Organisation</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a2e1a;">${email}</a></td>
            </tr>
            ${
              country
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Country</td>
              <td style="padding: 8px 0;">${country}</td>
            </tr>`
                : ""
            }
            ${
              service
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Practice area</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>`
                : ""
            }
            ${
              engagement
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Engagement type</td>
              <td style="padding: 8px 0;">${engagement}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #f9f9f7; border-left: 3px solid #1a2e1a;">
            <p style="font-size: 12px; color: #666; margin: 0 0 8px;">Brief</p>
            <p style="font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
