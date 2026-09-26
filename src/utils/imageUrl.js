import { imagesBaseUrl } from '@/config/api'

// Compute backend server root (default http://localhost:3300)
const backendOrigin = imagesBaseUrl.replace(/\/uploads\/?$/, '')

/**
 * Resolves any image path or uploaded filename into a fully qualified URL.
 * Handles relative backend paths (/images/..., /uploads/...), full URLs, blobs, and base64.
 *
 * @param {string} path - Image path, URL, or relative filename
 * @param {string} fallback - Optional fallback image URL
 * @returns {string} Fully resolved image URL
 */
export function resolveImageUrl(path, fallback = '') {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback
  }

  const trimmed = path.trim()

  // Full URL or preview object URL
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed
  }

  // Prepend backend origin if leading slash
  if (trimmed.startsWith('/')) {
    return `${backendOrigin}${trimmed}`
  }

  // If path includes folder like "images/..." or "uploads/..."
  if (trimmed.startsWith('images/') || trimmed.startsWith('uploads/')) {
    return `${backendOrigin}/${trimmed}`
  }

  // Raw filename (e.g. "driver_dl_123.jpg")
  return `${imagesBaseUrl}/${trimmed}`
}

/**
 * Default document placeholders with clean SVG labels
 */
export const DOCUMENT_PLACEHOLDERS = {
  license:
    'https://placehold.co/600x380/e2e8f0/1e293b?text=Driving+License+Document',
  aadhaar:
    'https://placehold.co/600x380/e2e8f0/1e293b?text=Aadhaar+Card+Document',
  pan: 'https://placehold.co/600x380/e2e8f0/1e293b?text=PAN+Card+Document',
  rc: 'https://placehold.co/600x380/e2e8f0/1e293b?text=Vehicle+RC+Document',
  insurance:
    'https://placehold.co/600x380/e2e8f0/1e293b?text=Insurance+Certificate',
  permit: 'https://placehold.co/600x380/e2e8f0/1e293b?text=Commercial+Permit',
  vehicle: 'https://placehold.co/600x380/e2e8f0/1e293b?text=Vehicle+Photo',
  profile: 'https://placehold.co/300x300/e2e8f0/1e293b?text=Driver+Photo'
}

export default {
  resolveImageUrl,
  DOCUMENT_PLACEHOLDERS
}
