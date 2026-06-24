import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Exclure les requêtes statiques ou API
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Domaine principal selon environnement
  const isProd = process.env.NODE_ENV === 'production';
  const mainDomain = isProd ? 'hosyardigital.com' : 'localhost:3000';

  // Extraction du sous-domaine (futur usage Netlify Pro)
  const isSubdomain = hostname !== mainDomain && hostname.endsWith(`.${mainDomain}`);
  const subdomain = isSubdomain ? hostname.replace(`.${mainDomain}`, '') : null;

  // Si un sous-domaine est détecté (ex: alexandre.tegere.com)
  if (subdomain && subdomain !== 'www') {
    url.pathname = `/v/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|icons).*)',
  ],
};
