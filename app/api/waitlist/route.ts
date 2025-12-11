import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required').max(100),
  homeCity: z.string().max(100).optional(),
  homeCountry: z.string().max(100).optional(),
  travelInterest: z.string().max(100).optional(),
  referredBy: z.string().uuid().optional(),
})

type WaitlistEntry = z.infer<typeof waitlistSchema>

const ipRateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || '60') * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const lastSubmission = ipRateLimitMap.get(ip)
  
  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW) {
    return false
  }
  
  ipRateLimitMap.set(ip, now)
  
  setTimeout(() => {
    ipRateLimitMap.delete(ip)
  }, RATE_LIMIT_WINDOW)
  
  return true
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  return 'unknown'
}

async function sendWelcomeEmail(email: string, firstName: string, userId: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const referralLink = `${appUrl}/?ref=${userId}`
  const fromEmail = process.env.FROM_EMAIL || 'noreply@example.com'
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not set, skipping welcome email')
    return
  }

  const resend = new Resend(resendApiKey)

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to the Waitlist! 🌍',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to the Waitlist</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                background: #ffffff;
                padding: 40px 30px;
                border: 1px solid #e5e5e5;
              }
              .content h2 {
                color: #667eea;
                margin-top: 0;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: 600;
              }
              .referral-box {
                background: #f7f7f7;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .referral-link {
                color: #667eea;
                word-break: break-all;
                font-weight: 600;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 14px;
                background: #f9f9f9;
                border-radius: 0 0 10px 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🌍 Welcome Aboard!</h1>
            </div>
            
            <div class="content">
              <h2>Hi ${firstName}! 👋</h2>
              
              <p>We're thrilled to have you join our waitlist! You're now part of an exclusive community of travelers who are ready to experience something extraordinary.</p>
              
              <p><strong>Our Vision:</strong> We're building the future of travel—a platform that connects passionate explorers with authentic experiences around the globe. Whether you're dreaming of hidden gems in bustling cities or serene escapes in nature, we're here to make your travel aspirations a reality.</p>
              
              <p>You'll be among the first to know when we launch, with exclusive early access and special perks reserved just for our waitlist members.</p>
              
              <div class="referral-box">
                <h3 style="margin-top: 0; color: #667eea;">🎁 Share the Adventure</h3>
                <p>Love what we're building? Invite your friends and move up the waitlist! Each person who joins using your link helps us grow our community.</p>
                <p><strong>Your personal referral link:</strong></p>
                <p><a href="${referralLink}" class="referral-link">${referralLink}</a></p>
              </div>
              
              <p>Stay tuned for updates, sneak peeks, and exclusive content as we prepare for launch.</p>
              
              <p style="margin-bottom: 0;">Safe travels,<br>The Team</p>
            </div>
            
            <div class="footer">
              <p>You're receiving this email because you signed up for our waitlist.</p>
              <p>© ${new Date().getFullYear()} All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    throw new Error('Failed to send welcome email')
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    const validatedData = waitlistSchema.parse(body)

    const supabaseAdmin = getSupabaseAdmin()

    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('emails')
      .select('email')
      .eq('email', validatedData.email.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist.' },
        { status: 409 }
      )
    }

    if (validatedData.referredBy) {
      const { data: referrer, error: referrerError } = await supabaseAdmin
        .from('emails')
        .select('id')
        .eq('id', validatedData.referredBy)
        .single()

      if (referrerError || !referrer) {
        return NextResponse.json(
          { error: 'Invalid referral code.' },
          { status: 400 }
        )
      }
    }

    const { data: newEntry, error: insertError } = await supabaseAdmin
      .from('emails')
      .insert([
        {
          email: validatedData.email.toLowerCase(),
          first_name: validatedData.firstName,
          home_city: validatedData.homeCity || null,
          home_country: validatedData.homeCountry || null,
          travel_interest: validatedData.travelInterest || null,
          referred_by: validatedData.referredBy || null,
        },
      ])
      .select()
      .single()

    if (insertError) {
      console.error('Database error:', insertError)
      
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist.' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      )
    }

    try {
      await sendWelcomeEmail(
        validatedData.email,
        validatedData.firstName,
        newEntry.id
      )
    } catch (emailError) {
      console.error('Email send error:', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist!',
        referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${newEntry.id}`,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
