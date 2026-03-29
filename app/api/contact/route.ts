import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, error: "Missing fields" });
    }

    const response = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["samarejanula@gmail.com"],
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true, response });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json({ success: false, error });
  }
}