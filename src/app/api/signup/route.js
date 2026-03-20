import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const validateName = (name, fieldName) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return `${fieldName} is required`;
  }

  // Check for letters only (plus spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }

  // Block obvious fake names
  const fakePatternsRegex = /^(test|asdf|qwerty|abc|xyz|fake|none|na|n\/a|\d+|(.)\2{4,})$/i;
  if (fakePatternsRegex.test(trimmedName.replace(/\s/g, ''))) {
    return `Please enter a real ${fieldName.toLowerCase()}`;
  }

  // Check for minimum reasonable name length
  if (trimmedName.length < 2) {
    return `${fieldName} is too short`;
  }

  return null;
};

const validatePhone = (phone) => {
  if (!phone.trim()) {
    return 'Emergency contact phone is required';
  }

  // Remove all non-digit characters to count actual numbers
  const digitsOnly = phone.replace(/\D/g, '');

  // Check for valid US format (10 digits, or 11 with country code)
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    return 'Phone number must be 10 digits (or 11 with country code)';
  }

  // If 11 digits, must start with 1 (US country code)
  if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
    return 'Invalid country code for US number';
  }

  // Get the 10-digit portion (remove country code if present)
  const tenDigits = digitsOnly.length === 11 ? digitsOnly.slice(1) : digitsOnly;

  // Block repeated digits (like 1111111111)
  if (/^(\d)\1{9}$/.test(tenDigits)) {
    return 'Please enter a valid phone number';
  }

  // Block sequential numbers (like 1234567890 or 0123456789)
  const isSequential = (str) => {
    for (let i = 1; i < str.length; i++) {
      if (parseInt(str[i]) !== (parseInt(str[i-1]) + 1) % 10) {
        return false;
      }
    }
    return true;
  };
  if (isSequential(tenDigits)) {
    return 'Please enter a valid phone number';
  }

  // Check for valid phone number characters
  if (!/^[\d\s\-\(\)\+]+$/.test(phone)) {
    return 'Phone number contains invalid characters';
  }

  return null;
};

export async function POST(request) {
  try {
    const { name, email, emergencyContactName, emergencyContactPhone, medicalConditions, waiverAgreed, website } = await request.json();

    // Honeypot check - if website field is filled, it's a bot
    if (website) {
      // Return success to not tip off the bot, but don't actually process
      return NextResponse.json(
        { success: true, message: 'Sign-up received successfully' },
        { status: 200 }
      );
    }

    // Validate input
    if (!name || !email || !emergencyContactName || !emergencyContactPhone || !waiverAgreed) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate name
    const nameError = validateName(name, 'Name');
    if (nameError) {
      return NextResponse.json(
        { error: nameError },
        { status: 400 }
      );
    }

    // Validate emergency contact name
    const emergencyNameError = validateName(emergencyContactName, 'Emergency contact name');
    if (emergencyNameError) {
      return NextResponse.json(
        { error: emergencyNameError },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneError = validatePhone(emergencyContactPhone);
    if (phoneError) {
      return NextResponse.json(
        { error: phoneError },
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
      // Send admin notification
      await resend.emails.send({
        from: 'Joyanna <noreply@joyogaflow.com>',
        to: 'aquajoybubble@gmail.com',
        subject: `New Sign-Up: ${name} - Pour Taproom Class`,
        text: emailContent,
      });

      // Send confirmation email to user
      const userConfirmation = `
Hi ${name},

Thanks for signing up for the Pour Taproom Saturday Yoga & Pilates class!

We've received your registration and look forward to seeing you on the mat.

If you have any questions, feel free to reach out.

See you soon!
Joyanna
      `;

      await resend.emails.send({
        from: 'Joyanna <noreply@joyogaflow.com>',
        to: email,
        subject: 'Registration Confirmed - Pour Taproom Saturday Class',
        text: userConfirmation,
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
