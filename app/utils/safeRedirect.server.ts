export function safeRedirect( to: string | null | undefined, defaultRedirect: string = "/" ) {
  if (!to || !to.startsWith("/") || to.startsWith("//")) return defaultRedirect;
  return to;
}