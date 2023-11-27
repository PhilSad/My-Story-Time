import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'fr']
let defaultLocale = 'fr'
// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
  // Check if the request is from the browser (has window)
  if (typeof window !== 'undefined') {
    // Obtenez la locale préférée de l'utilisateur
    const userLocale = navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;

    // Vérifiez si la locale de l'utilisateur est prise en charge
    if (locales.includes(userLocale)) {
      return userLocale;
    } else {
      // Si la locale de l'utilisateur n'est pas prise en charge, utilisez une locale par défaut
      return 'en';
    }
  } else {
    // Si le code s'exécute dans un environnement de serveur, utilisez une locale par défaut
    return 'en';
  }
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  if (!pathname.startsWith(`/${locale}`)) {
    request.nextUrl.pathname = `/${locale}${pathname}`
  }
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
match(languages, locales, defaultLocale) // -> 'en-US'
