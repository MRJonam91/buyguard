console.log("BuyGuard content script loaded.");

// In futuro, esporrà API per estrarre dati dalla pagina corrente e normalizzarli in `Listing`.
export function extractPageData() {
  return {
    title: document.title,
    url: window.location.href,
  };
}
