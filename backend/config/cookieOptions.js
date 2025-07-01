/*
 * Centralised cookie options used across controllers.
 * Using the helper guarantees cookies are issued with
 *   • httpOnly for XSS safety
 *   • secure + SameSite=None for cross-site (frontend on different sub-domain)
 *   • optional root-domain support via COOKIE_DOMAIN env
 */

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // ms

export const buildCookieOptions = (maxAge = ONE_WEEK) => {
  // Determine cookie domain.
  let domain = process.env.COOKIE_DOMAIN;
  if (!domain && process.env.RENDER_EXTERNAL_HOSTNAME) {
    // Render gives sub-domain like xyz.onrender.com –
    // we want to share cookie across all sub-domains → .onrender.com
    const parts = process.env.RENDER_EXTERNAL_HOSTNAME.split('.');
    if (parts.length >= 2) {
      domain = `.${parts.slice(-2).join('.')}`; // .onrender.com
    }
  }

  return {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'none',
    maxAge,
    ...(domain ? { domain } : {}),
  };
};