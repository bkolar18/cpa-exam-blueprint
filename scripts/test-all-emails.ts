/**
 * Test script to send all email templates
 * Run with: npx tsx scripts/test-all-emails.ts
 */

import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env manually
const envPath = resolve(__dirname, '../.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  }
} catch (e) {
  console.error('Could not load .env.local');
}

import { welcomeEmail, passwordResetEmail } from '../src/lib/email/templates/transactional';
import { nurtureSequence, generateNurtureEmailHtml } from '../src/lib/email/nurture-sequence';
import { segmentEmails, generateSegmentEmailHtml } from '../src/lib/email/segment-content';
import { generateUnsubscribeHeaders } from '../src/lib/email/utils/unsubscribe';

const resend = new Resend(process.env.RESEND_API_KEY);
const TEST_EMAIL = 'brennankolar@gmail.com';
const FROM_EMAIL = 'Meridian CPA Review <hello@meridiancpareview.com>';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendEmail(name: string, subject: string, html: string, includeUnsubscribe = false) {
  try {
    const headers = includeUnsubscribe ? generateUnsubscribeHeaders(TEST_EMAIL) : undefined;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TEST_EMAIL],
      subject: `[TEST v2] ${subject}`,
      html,
      headers,
    });

    if (result.error) {
      console.log(`❌ ${name}: ${result.error.message}`);
      return false;
    }

    console.log(`✓ ${name}: Sent (${result.data?.id})`);
    return true;
  } catch (error) {
    console.log(`❌ ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function main() {
  console.log(`\nSending all email templates to ${TEST_EMAIL}\n`);
  console.log('Using 2 second delay between emails to avoid rate limiting\n');
  console.log('='.repeat(50));

  let sent = 0;
  let failed = 0;

  // 1. Transactional emails
  console.log('\n📧 TRANSACTIONAL EMAILS\n');

  if (await sendEmail(
    'Welcome',
    'Welcome to Meridian CPA Review!',
    welcomeEmail({ to: TEST_EMAIL, name: 'Test User' })
  )) sent++; else failed++;

  await delay(2000);

  if (await sendEmail(
    'Password Reset',
    'Reset Your Password',
    passwordResetEmail({
      to: TEST_EMAIL,
      resetUrl: 'https://meridiancpareview.com/reset-password?token=test-token-123',
      expiresInHours: 1
    })
  )) sent++; else failed++;

  // 2. Nurture sequence emails
  console.log('\n📧 NURTURE SEQUENCE (7 emails)\n');

  for (const email of nurtureSequence) {
    await delay(2000);
    if (await sendEmail(
      `Nurture #${email.id} (Day ${email.dayOffset})`,
      email.subject,
      generateNurtureEmailHtml(email, TEST_EMAIL),
      true
    )) sent++; else failed++;
  }

  // 3. Segment emails
  console.log('\n📧 SEGMENT EMAILS\n');

  const segmentNames = Object.keys(segmentEmails);
  for (const segmentName of segmentNames) {
    await delay(2000);
    const email = segmentEmails[segmentName];
    if (await sendEmail(
      `Segment: ${segmentName}`,
      email.subject,
      generateSegmentEmailHtml(email, TEST_EMAIL),
      true
    )) sent++; else failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 SUMMARY: ${sent} sent, ${failed} failed`);
  console.log(`\nCheck ${TEST_EMAIL} inbox (and spam folder)\n`);
}

main().catch(console.error);
