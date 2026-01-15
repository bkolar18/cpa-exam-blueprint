/**
 * Email Resource List Component
 * Display linked resources with titles and descriptions
 */

import { EMAIL_BRAND } from '../constants';

const { colors, layout } = EMAIL_BRAND;

export interface Resource {
  /** Resource title */
  title: string;
  /** Resource URL */
  url: string;
  /** Resource description */
  description: string;
}

export interface ResourceListProps {
  /** Array of resources */
  resources: Resource[];
  /** Optional section title */
  title?: string;
}

/**
 * Generate a resource list HTML
 */
export function resourceList({
  resources,
  title = 'Recommended Resources',
}: ResourceListProps): string {
  const resourcesHtml = resources
    .map(
      (resource, index) => `
      <a href="${resource.url}" class="resource-item" style="display:block;padding:12px;background:${colors.white};border:1px solid ${colors.border};border-radius:${layout.borderRadius.small};${index < resources.length - 1 ? 'margin-bottom:8px;' : ''}text-decoration:none;color:inherit;">
        <div class="resource-title" style="font-weight:600;color:${colors.primary};margin-bottom:4px;">${resource.title}</div>
        <div class="resource-desc" style="font-size:14px;color:${colors.muted};">${resource.description}</div>
      </a>
    `
    )
    .join('');

  return `
    <div class="resources" style="background:${colors.card};padding:20px;border-radius:${layout.borderRadius.medium};margin:${layout.spacing.lg} 0;">
      <h3 style="margin:0 0 ${layout.spacing.md} 0;color:${colors.primary};font-size:16px;font-weight:600;">${title}</h3>
      ${resourcesHtml}
    </div>
  `.trim();
}

/**
 * Single resource link (inline style)
 */
export function resourceLink(resource: Resource): string {
  return `
    <a href="${resource.url}" style="color:${colors.primary};text-decoration:none;font-weight:600;">${resource.title}</a>
  `.trim();
}
