import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // Guard: fail fast with a clear message if credentials are not configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Welcome email not sent: EMAIL_USER or EMAIL_PASS is not set in .env.local');
      return NextResponse.json(
        { success: false, message: 'Email service is not configured on the server.' },
        { status: 503 }
      );
    }

    // Configure transporter using Gmail + App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

      const shopUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const mailOptions = {
      from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to the Basho Community 🏺',
      html: `
        <div style="font-family: 'Georgia', serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">

            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #A0522D; padding-bottom: 24px;">
                <h1 style="color: #A0522D; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Basho</h1>
                <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: #888; margin-top: 5px;">by Shivangi</p>
            </div>

            <div style="background-color: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="font-size: 22px; color: #333; margin-top: 0; font-style: italic;">Welcome to the fold.</h2>

                <p style="line-height: 1.8; font-size: 15px; color: #555;">
                    Thank you for joining our community. We are honoured to have you with us on this journey of craftsmanship and creativity.
                </p>

                <p style="line-height: 1.8; font-size: 15px; color: #555;">
                    As a subscriber, you will be the first to know about:
                </p>

                <ul style="line-height: 1.8; font-size: 15px; color: #555; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">&#x1F525; Upcoming kiln firings and fresh batches</li>
                    <li style="margin-bottom: 10px;">&#x1F3A8; New workshop schedules</li>
                    <li style="margin-bottom: 10px;">&#x2728; Exclusive studio events and exhibitions</li>
                </ul>

                <div style="margin-top: 36px; text-align: center;">
                    <a href="${shopUrl}/shop"
                       style="display: inline-block; padding: 14px 36px; background-color: #A0522D; color: white; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px;">
                        Explore the Collection
                    </a>
                </div>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="font-style: italic; color: #888; margin-bottom: 5px;">Warm regards,</p>
                    <p style="font-weight: bold; color: #A0522D; margin-top: 0;">Shivangi &amp; The Basho Team</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #aaa; line-height: 1.6;">
                <p>You received this because you subscribed at basho pottery.</p>
                <p>&copy; ${new Date().getFullYear()} Basho Pottery. All rights reserved.</p>
            </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);

    return NextResponse.json({ success: true, message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}