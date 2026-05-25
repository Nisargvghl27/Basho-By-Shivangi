import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email, companyName, contactPerson, status } = await request.json();

    if (!email || !companyName || !status) {
      return NextResponse.json({ success: false, message: 'Required fields are missing' }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Corporate status email not sent: EMAIL_USER or EMAIL_PASS is not set in .env.local');
      return NextResponse.json(
        { success: false, message: 'Email service is not configured on the server.' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject = '';
    let messageBody = '';

    if (status === 'contacted') {
      subject = `Update on your Corporate Inquiry - Basho Pottery 🏺`;
      messageBody = `
        <p style="line-height: 1.8; font-size: 15px; color: #555;">
            Dear ${contactPerson || companyName},
        </p>
        <p style="line-height: 1.8; font-size: 15px; color: #555;">
            We wanted to let you know that our team has reviewed your corporate inquiry for <strong>${companyName}</strong> and we have recently tried to reach out to you.
        </p>
        <p style="line-height: 1.8; font-size: 15px; color: #555;">
            Please check your inbox (or spam folder) for further communication from us regarding custom catalog options or workshop details. You can also reply directly if you have any immediate questions.
        </p>
      `;
    } else if (status === 'closed') {
      subject = `Your Corporate Inquiry has been resolved - Basho Pottery 🏺`;
      messageBody = `
        <p style="line-height: 1.8; font-size: 15px; color: #555;">
            Dear ${contactPerson || companyName},
        </p>
        <p style="line-height: 1.8; font-size: 15px; color: #555;">
            Your corporate inquiry for <strong>${companyName}</strong> has been marked as resolved/closed by our team.
        </p>
        <p style="line-height: 1.8; font-size: 15px; color: #555;">
            Thank you for connecting with Basho Pottery! We look forward to potential collaborations in the future.
        </p>
      `;
    } else {
        return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const mailOptions = {
      from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: 'Georgia', serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #A0522D; padding-bottom: 24px;">
                <h1 style="color: #A0522D; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Basho</h1>
                <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: #888; margin-top: 5px;">Corporate &amp; Collaborations</p>
            </div>

            <div style="background-color: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; color: #333; margin-top: 0; font-style: italic;">Inquiry Status Update</h2>

                ${messageBody}

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="font-style: italic; color: #888; margin-bottom: 5px;">Warm regards,</p>
                    <p style="font-weight: bold; color: #A0522D; margin-top: 0;">Shivangi &amp; The Basho Team</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #aaa; line-height: 1.6;">
                <p>This is an automated acknowledgment. Please do not reply directly to this message.</p>
                <p>&copy; ${new Date().getFullYear()} Basho Pottery. All rights reserved.</p>
            </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Corporate inquiry status email (${status}) sent successfully to:`, email);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Corporate Inquiry Status Email API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
