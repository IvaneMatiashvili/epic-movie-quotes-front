import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AUTH_ROUTES, GUEST_ROUTES } from './constants'

export function middleware(request: NextRequest) {
  let response = NextResponse.next()
  const cookies = request.cookies.getAll()
  const userHasToken = cookies.some((cookie) => cookie.name === 'XSRF-TOKEN')
  const pathname = request.nextUrl.pathname

  if (AUTH_ROUTES.test(pathname) && !userHasToken) {
    response = NextResponse.rewrite(new URL('/', request.url))
  }

  if (GUEST_ROUTES.test(pathname) && userHasToken) {
    response = NextResponse.redirect(new URL('/403', request.url))
  }

  return response
}

export const config = {
  matcher: ['/403', '/'],
}
