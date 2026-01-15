// Consolidated email exports
// Use this as the single entry point for all email functionality

// Core Resend client and basic senders
export {
  resend,
  sendSystemEmail,
  sendSupportEmail,
  sendGeneralEmail
} from './resend';

// Re-export nurture and segment email functions from legacy location
export {
  sendNurtureEmail,
  sendSegmentEmail,
  sendCustomEmail,
  getNextNurtureEmail,
  getSegmentEmailToSend,
  type SendEmailResult
} from '../email/send';

export {
  nurtureSequence,
  generateNurtureEmailHtml,
  getEmailByDay,
  getEmailsUpToDay,
  type NurtureEmail
} from '../email/nurture-sequence';

export {
  segments,
  segmentEmails,
  getSegmentEmail,
  determineSegments,
  type SegmentType,
  type SegmentEmail
} from '../email/segment-content';
