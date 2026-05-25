import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { companyName, contactPerson, email, phone, teamSize, budget, inquiryType, message } = await request.json();

    if (!companyName || !contactPerson || !email || !message) {
      return NextResponse.json({ success: false, message: 'Required fields are missing' }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Corporate email not sent: EMAIL_USER or EMAIL_PASS is not set in .env.local');
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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const adminUrl = `${siteUrl}/admin/corporate-inquiries`;

    // 1. Email to Admin
    const adminMailOptions = {
      from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Corporate Inquiry: ${companyName} (${inquiryType})`,
      html: `
        <div style="font-family: 'Georgia', serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #A0522D; padding-bottom: 24px;">
                <h1 style="color: #A0522D; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Basho</h1>
                <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: #888; margin-top: 5px;">New Corporate Inquiry</p>
            </div>

            <div style="background-color: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">Inquiry Details</h2>
                
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Company Name:</strong> ${companyName}</p>
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Contact Person:</strong> ${contactPerson}</p>
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #A0522D; text-decoration: underline;">${email}</a></p>
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Phone:</strong> ${phone}</p>
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Type:</strong> <span style="text-transform: capitalize;">${inquiryType}</span></p>
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Team Size:</strong> ${teamSize || 'N/A'}</p>
                <p style="font-size: 15px; color: #555; margin-bottom: 8px;"><strong>Approx. Budget:</strong> ₹${budget || 'N/A'}</p>
                
                <div style="margin-top: 24px; background-color: #f9f9f9; padding: 20px; border-left: 4px solid #A0522D; border-radius: 4px;">
                    <p style="margin: 0; font-size: 15px; color: #444; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>

                <div style="margin-top: 36px; text-align: center;">
                    <a href="${adminUrl}" 
                       style="display: inline-block; padding: 14px 36px; background-color: #A0522D; color: white; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px;">
                        View in Admin Panel
                    </a>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #aaa;">
                <p>&copy; ${new Date().getFullYear()} Basho Pottery. All rights reserved.</p>
            </div>
        </div>
      `,
    };

    // 2. Email to Customer
    const customerMailOptions = {
      from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your Corporate Inquiry - Basho Pottery 🏺`,
      html: `
        <div style="font-family: 'Georgia', serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #A0522D; padding-bottom: 24px;">
                <h1 style="color: #A0522D; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Basho</h1>
                <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: #888; margin-top: 5px;">Corporate &amp; Collaborations</p>
            </div>

            <div style="background-color: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; color: #333; margin-top: 0; font-style: italic;">Thank you for your interest.</h2>

                <p style="line-height: 1.8; font-size: 15px; color: #555;">
                    Dear ${contactPerson},
                </p>

                <p style="line-height: 1.8; font-size: 15px; color: #555;">
                    Thank you for reaching out regarding a corporate partnership/collaboration with Basho Pottery. 
                    We have successfully received your inquiry for <strong>${companyName}</strong>. 
                </p>
                
                <p style="line-height: 1.8; font-size: 15px; color: #555;">
                    Our partnerships team is reviewing your requirements and will get back to you with custom catalog options or workshop availability within 24 hours.
                </p>

                <div style="background-color: #f9f9f9; padding: 20px; border-left: 2px solid #A0522D; font-style: italic; color: #666; margin: 20px 0; font-size: 14px; white-space: pre-wrap;">
                    "${message}"
                </div>

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

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log('Corporate inquiry emails sent successfully to admin and:', email);
    return NextResponse.json({ success: true, message: 'Corporate inquiry emails sent successfully' });
  } catch (error) {
    console.error('Corporate Inquiry Email API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
