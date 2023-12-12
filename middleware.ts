// middleware.js
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest } from 'next/server';

export const locales = ['en-US', 'nl-NL', 'nl', 'zh-CN', 'zh-TW'] as const

export const defaultLocale = 'en-US'

function getLocale(request: NextRequest) { 
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  // 这里不能直接传入 request，有更简单的写法欢迎评论留言
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale)
 }
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // 获取匹配的 locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next).*)',
    // 可选: 仅在根 URL (/) 运行
    // '/'
  ],
}
