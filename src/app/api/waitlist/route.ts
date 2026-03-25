import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // If RESEND_API_KEY is set, use Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "Welcome to THRYV — You're on the waitlist!",
        html: `
          <div style="font-family: sans-serif; background: #080808; color: #E8F4F8; padding: 40px; text-align: center;">
            <h1 style="color: #E8002D; font-size: 32px;">YOU'RE IN.</h1>
            <p style="font-size: 18px; color: #AABCC4;">We'll be in touch when it's your turn.</p>
            <p style="font-size: 14px; color: #AABCC4; margin-top: 30px;">— Team THRYV</p>
          </div>
        `,
      });
    }

    // Always return success (even without Resend, the email is "captured")
    return NextResponse.json({ success: true, email });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
