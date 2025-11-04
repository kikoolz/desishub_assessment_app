import nodemailer from "nodemailer";

export interface TierEmailPayload {
  name: string;
  email: string;
  tier: number;
  tierName: string;
  description: string;
  recommendations: string[];
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(
      "⚠️ SMTP configuration is missing. Email notifications will not be sent.\n" +
        "Please set SMTP_HOST, SMTP_USER, SMTP_PASS environment variables.\n" +
        "For development, you can use a service like Mailtrap, SendGrid, or Gmail."
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function renderTierEmailHtml(payload: TierEmailPayload) {
  const { name, tier, tierName, description, recommendations } = payload;
  const badgeColors: Record<number, string> = {
    0: "#EF4444",
    1: "#3B82F6",
    2: "#10B981",
    3: "#F59E0B",
    4: "#8B5CF6",
  };

  return `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background:#f7fafc; padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.06);overflow:hidden;">
      <div style="padding:24px 24px 0 24px;">
        <h1 style="margin:0 0 8px 0; font-size:20px; color:#111827;">Hi ${
          name || "there"
        },</h1>
        <p style="margin:0; color:#4B5563; font-size:14px;">Thanks for completing the Desishub assessment. Here are your results:</p>
      </div>

      <div style="padding:24px; text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:10px;background:${
          badgeColors[tier]
        };color:#fff;padding:10px 16px;border-radius:9999px;font-weight:700;">
          <span>Tier ${tier}</span>
          <span style="opacity:.9">${tierName}</span>
        </div>
        <p style="margin:16px 0 0 0; color:#374151; font-size:15px; line-height:1.6;">${description}</p>
      </div>

      <div style="padding:0 24px 24px 24px;">
        <h3 style="margin:0 0 8px 0; color:#111827; font-size:16px;">Recommended next steps</h3>
        <ol style="margin:0; padding-left:18px; color:#374151; font-size:14px;">
          ${recommendations
            .map((r) => `<li style=\"margin:6px 0;\">${r}</li>`)
            .join("")}
        </ol>
      </div>

      <div style="padding:16px 24px;border-top:1px solid #E5E7EB;color:#6B7280;font-size:12px;">
        <p style="margin:0;">Desishub • Candidate Assessment Results</p>
      </div>
    </div>
  </div>`;
}

export async function sendTierResultEmail(payload: TierEmailPayload) {
  try {
    const from = process.env.SMTP_FROM || "Desishub <no-reply@desishub.local>";
    const transport = getTransport();

    // If SMTP is not configured, log and return early
    if (!transport) {
      console.log(
        `📧 Email notification skipped for ${payload.email} (Tier ${payload.tier}). ` +
          `SMTP not configured.`
      );
      return;
    }

    const html = renderTierEmailHtml(payload);
    const subject = `Your Desishub Assessment Result – Tier ${payload.tier} (${payload.tierName})`;

    const info = await transport.sendMail({
      from,
      to: payload.email,
      subject,
      html,
    });

    console.log(`✅ Tier result email sent successfully to ${payload.email}`, {
      messageId: info.messageId,
      tier: payload.tier,
      tierName: payload.tierName,
    });
  } catch (error: any) {
    console.error("❌ Failed to send tier result email:", {
      email: payload.email,
      tier: payload.tier,
      error: error.message,
      stack: error.stack,
    });
  }
}
