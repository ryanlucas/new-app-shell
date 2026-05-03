/** True when running inside the Tauri webview (Phase 4.5). False in normal browser. */
export function useIsDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return '__TAURI_INTERNALS__' in window
}
