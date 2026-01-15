import { detectSuspiciousInput, logValidationFailure, logSuspiciousActivity } from './logging';

// Valid section codes
export const VALID_SECTIONS = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'] as const;
export type ValidSection = typeof VALID_SECTIONS[number];

// Maximum lengths for common fields
export const MAX_LENGTHS = {
  comment: 5000,
  notes: 10000,
  email: 254,
  name: 200,
  questionId: 100,
  topic: 200,
  subject: 500,
  body: 50000,
  url: 2048,
  searchQuery: 500,
} as const;

interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Validate and sanitize a section code
 */
export function validateSection(section: unknown, request?: Request): ValidationResult {
  if (typeof section !== 'string') {
    if (request) {
      logValidationFailure(request, 'section', 'Invalid type', typeof section);
    }
    return { valid: false, error: 'Section must be a string' };
  }

  const normalized = section.toUpperCase().trim();

  if (!VALID_SECTIONS.includes(normalized as ValidSection)) {
    if (request) {
      logValidationFailure(request, 'section', 'Invalid section code', section);
    }
    return {
      valid: false,
      error: `Invalid section. Must be one of: ${VALID_SECTIONS.join(', ')}`
    };
  }

  return { valid: true, sanitized: normalized };
}

/**
 * Validate string length
 */
export function validateLength(
  value: unknown,
  fieldName: string,
  maxLength: number,
  request?: Request
): ValidationResult {
  if (value === null || value === undefined) {
    return { valid: true, sanitized: undefined };
  }

  if (typeof value !== 'string') {
    if (request) {
      logValidationFailure(request, fieldName, 'Invalid type', typeof value);
    }
    return { valid: false, error: `${fieldName} must be a string` };
  }

  if (value.length > maxLength) {
    if (request) {
      logValidationFailure(request, fieldName, `Exceeds max length of ${maxLength}`, value.length);
    }
    return {
      valid: false,
      error: `${fieldName} exceeds maximum length of ${maxLength} characters`
    };
  }

  // Check for suspicious content
  if (detectSuspiciousInput(value)) {
    if (request) {
      logSuspiciousActivity(request, `Suspicious input detected in ${fieldName}`, {
        fieldName,
        inputLength: value.length,
      });
    }
    return { valid: false, error: 'Invalid input detected' };
  }

  return { valid: true, sanitized: value.trim() };
}

/**
 * Validate required string field
 */
export function validateRequired(
  value: unknown,
  fieldName: string,
  maxLength: number,
  request?: Request
): ValidationResult {
  if (value === null || value === undefined || value === '') {
    if (request) {
      logValidationFailure(request, fieldName, 'Required field missing');
    }
    return { valid: false, error: `${fieldName} is required` };
  }

  return validateLength(value, fieldName, maxLength, request);
}

/**
 * Validate email format
 */
export function validateEmail(email: unknown, request?: Request): ValidationResult {
  if (typeof email !== 'string') {
    if (request) {
      logValidationFailure(request, 'email', 'Invalid type', typeof email);
    }
    return { valid: false, error: 'Email must be a string' };
  }

  if (email.length > MAX_LENGTHS.email) {
    if (request) {
      logValidationFailure(request, 'email', 'Exceeds max length');
    }
    return { valid: false, error: 'Email is too long' };
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (request) {
      logValidationFailure(request, 'email', 'Invalid format');
    }
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true, sanitized: email.toLowerCase().trim() };
}

/**
 * Validate UUID format
 */
export function validateUUID(value: unknown, fieldName: string, request?: Request): ValidationResult {
  if (typeof value !== 'string') {
    if (request) {
      logValidationFailure(request, fieldName, 'Invalid type', typeof value);
    }
    return { valid: false, error: `${fieldName} must be a string` };
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value)) {
    if (request) {
      logValidationFailure(request, fieldName, 'Invalid UUID format', value);
    }
    return { valid: false, error: `${fieldName} is not a valid UUID` };
  }

  return { valid: true, sanitized: value.toLowerCase() };
}

/**
 * Validate positive integer
 */
export function validatePositiveInt(
  value: unknown,
  fieldName: string,
  max?: number,
  request?: Request
): ValidationResult {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;

  if (typeof num !== 'number' || isNaN(num)) {
    if (request) {
      logValidationFailure(request, fieldName, 'Invalid number', value);
    }
    return { valid: false, error: `${fieldName} must be a number` };
  }

  if (num < 0) {
    if (request) {
      logValidationFailure(request, fieldName, 'Negative value', num);
    }
    return { valid: false, error: `${fieldName} must be positive` };
  }

  if (max !== undefined && num > max) {
    if (request) {
      logValidationFailure(request, fieldName, `Exceeds max of ${max}`, num);
    }
    return { valid: false, error: `${fieldName} exceeds maximum of ${max}` };
  }

  return { valid: true, sanitized: String(num) };
}

/**
 * Sanitize HTML/script content from string
 */
export function sanitizeString(value: string): string {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Create validation error response
 */
export function validationErrorResponse(error: string, status: number = 400): Response {
  return new Response(
    JSON.stringify({ error }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
