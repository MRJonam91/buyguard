/**
 * Content script | Content script
 *
 * Runs inside the marketplace page, which is untrusted by assumption. It does
 * exactly one thing: answer a well-formed extraction request from another
 * BUYGUARD surface. Anything that does not pass the runtime guard is ignored
 * without a reply.
 *
 * Gira dentro la pagina, considerata non affidabile: risponde solo a una
 * richiesta di estrazione ben formata, ignorando in silenzio tutto il resto.
 *
 * This module exports nothing on purpose. A manifest-declared content script is
 * loaded as a classic script; relying on the bundler to wrap an ESM export is a
 * silent build-configuration dependency.
 */

import { extractListingResponse, isExtractListingRequest } from "@buyguard/core";
import { extractListingFromDocument } from "./adapters/page-metadata";

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  if (!isExtractListingRequest(message)) {
    // Not ours, or a protocol version this build does not speak.
    return false;
  }

  try {
    const result = extractListingFromDocument(document, {
      href: window.location.href,
      platform: "page-metadata",
      capturedAt: new Date().toISOString(),
    });
    sendResponse(extractListingResponse(result));
  } catch (error) {
    sendResponse(
      extractListingResponse({
        ok: false,
        reason: "internal-error",
        detail: error instanceof Error ? error.message : String(error),
      }),
    );
  }

  // Responded synchronously; the channel does not need to stay open.
  return false;
});
