/**
 * Service worker | Service worker
 *
 * Owns the action-to-side-panel behavior and nothing else.
 *
 * It is deliberately NOT a message relay: the side panel talks to the content
 * script directly via `chrome.tabs.sendMessage`. Routing listing content through
 * the worker would add a third context that handles page-derived data without
 * making anything possible that is not already possible.
 *
 * Volutamente non e un relay: il side panel parla direttamente al content
 * script, senza far passare il contenuto della pagina da un terzo contesto.
 */

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error: unknown) => {
  console.error("BuyGuard: could not set side panel behavior", error);
});
