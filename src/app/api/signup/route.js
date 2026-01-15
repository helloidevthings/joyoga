import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, emergencyContactName, emergencyContactPhone, medicalConditions, waiverAgreed } = await request.json();

    // Validate input
    if (!name || !email || !emergencyContactName || !emergencyContactPhone || !waiverAgreed) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email notification
    const emailContent = `
      New Sign-Up for Pour Taproom Saturday Class

      Student Information:
      ---------------------
      Name: ${name}
      Email: ${email}

      Emergency Contact:
      ---------------------
      Name: ${emergencyContactName}
      Phone: ${emergencyContactPhone}

      Medical Conditions/Injuries:
      ---------------------
      ${medicalConditions || 'None reported'}

      Waiver Status: Agreed
      Timestamp: ${new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'long'
      })}

      The student has read and agreed to the liability waiver.
    `;

    try {
      await resend.emails.send({
        from: 'Joyanna <reply@joyogaflow.com>', // Change this to your verified domain
        to: 'aquajoybubble@gmail.com',
        subject: `New Sign-Up: ${name} - Pour Taproom Class`,
        text: emailContent,
      });

      return NextResponse.json(
        { success: true, message: 'Sign-up received successfully' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);

      // Still return success to user even if email fails
      // You might want to log this to a database or monitoring service
      return NextResponse.json(
        { success: true, message: 'Sign-up received successfully' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
