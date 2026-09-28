export function shouldEnableAnalytics(pathname: string, automatedBrowser: boolean) {
  if (automatedBrowser) return false;
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}
