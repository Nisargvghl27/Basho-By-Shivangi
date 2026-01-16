import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // 1. Configure the transporter (Use Gmail or your SMTP provider)
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your App Password (Not your normal password)
      },
    });

    // 2. Define the email content
    const mailOptions = {
      from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to the Basho Community',
      html: `
        <div style="font-family: 'Georgia', serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #A0522D; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Basho</h1>
                <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: #888; margin-top: 5px;">Clay & Soul</p>
            </div>
            
            <div style="background-color: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; color: #333; margin-top: 0;">Welcome to the fold.</h2>
                
                <p style="line-height: 1.6; font-size: 16px; color: #555;">
                    Hello,
                </p>
                
                <p style="line-height: 1.6; font-size: 16px; color: #555;">
                    Thank you for joining our community. We are honored to have you with us on this journey of craftsmanship and creativity.
                </p>
                
                <p style="line-height: 1.6; font-size: 16px; color: #555;">
                    As a subscriber, you will be the first to know about:
                </p>
                
                <ul style="line-height: 1.6; font-size: 16px; color: #555; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">Upcoming kiln firings and fresh batches</li>
                    <li style="margin-bottom: 10px;">New workshop schedules</li>
                    <li style="margin-bottom: 10px;">Exclusive studio events and exhibitions</li>
                </ul>
                
                <p style="line-height: 1.6; font-size: 16px; color: #555;">
                    We look forward to staying connected.
                </p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="font-style: italic; color: #888; margin-bottom: 5px;">Warm regards,</p>
                    <p style="font-weight: bold; color: #A0522D; margin-top: 0;">The Basho Team</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
                <p>&copy; ${new Date().getFullYear()} Basho Pottery. All rights reserved.</p>
            </div>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}