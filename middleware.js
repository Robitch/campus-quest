import { NextResponse } from 'next/server'

export async function middleware(req) {
    // redirect to /home page if url is /
    if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(req.nextUrl.origin + '/home')
    }
}

export const config = {
    matcher: '/',
}