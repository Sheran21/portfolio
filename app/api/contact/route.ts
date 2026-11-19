import { Resend } from "resend";

// Escape user input before placing it in the email's HTML body
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  // Create the client per request (not at module load) so `next build` never
  // needs the secret — a missing key only affects form submissions, not deploys.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("EMAIL ERROR: RESEND_API_KEY is not set");
    return Response.json({ success: false, error: "Email service is not configured" }, { status: 503 });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, "<br />");

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["samarejanula@gmail.com"],
      subject: `New message from ${String(name).slice(0, 100)}`,
      replyTo: String(email),
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("EMAIL ERROR:", error);
      return Response.json({ success: false, error: "Failed to send message" }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
