/*
 * Centralised cookie options used across controllers.
 * Using the helper guarantees cookies are issued with
 *   • httpOnly for XSS safety
 *   • secure + SameSite=None for cross-site (frontend on different sub-domain)
 *   • optional root-domain support via COOKIE_DOMAIN env
 */

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // ms

export const buildCookieOptions = (maxAge = ONE_WEEK) => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'none',
    maxAge,
    // If COOKIE_DOMAIN env is provided (e.g. .oncart.onrender.com or .yourdomain.com),
    // set it so the cookie is available to both backend & frontend sub-domains.
    ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
  };
};