import {
  type ExtractionFailure,
  type Listing,
  extractListingRequest,
  isExtractListingResponse,
} from "@buyguard/core";
import { render } from "preact";
import { useCallback, useState } from "preact/hooks";
import "./styles.css";

type State =
  | { status: "idle" }
  | { status: "analyzing" }
  | { status: "ready"; listing: Listing }
  | { status: "failed"; reason: ExtractionFailure; detail?: string };

/**
 * User-facing copy for every failure. Exhaustive by type: adding a failure mode
 * to the contract breaks the build until it has a message a user can act on.
 */
const FAILURE_COPY: Record<ExtractionFailure, string> = {
  "unsupported-page": "This page is not one BuyGuard can read yet.",
  "insufficient-metadata": "This page does not publish enough information to analyze.",
  "no-active-tab": "No active tab was found.",
  "content-script-unavailable": "Reload the listing page, then try again.",
  "internal-error": "Something went wrong while reading the page.",
};

function formatPrice(listing: Listing): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: listing.currency,
    }).format(listing.priceCents / 100);
  } catch {
    return `${(listing.priceCents / 100).toFixed(2)} ${listing.currency}`;
  }
}

async function requestListing(): Promise<State> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id === undefined) {
    return { status: "failed", reason: "no-active-tab" };
  }

  let response: unknown;
  try {
    response = await chrome.tabs.sendMessage(tab.id, extractListingRequest());
  } catch {
    // No content script in that tab, or the page was never a supported one.
    return { status: "failed", reason: "content-script-unavailable" };
  }

  if (!isExtractListingResponse(response)) {
    return { status: "failed", reason: "internal-error", detail: "malformed response" };
  }

  const { result } = response;
  return result.ok
    ? { status: "ready", listing: result.listing }
    : { status: "failed", reason: result.reason, detail: result.detail };
}

function ListingView({ listing }: { listing: Listing }) {
  return (
    <section>
      <h3 class="listing-title">{listing.title}</h3>
      <p class="listing-price">{formatPrice(listing)}</p>
      {listing.description === "" ? null : <p class="listing-description">{listing.description}</p>}
      <dl class="provenance">
        {Object.entries(listing.provenance).map(([field, source]) => (
          <div key={field}>
            <dt>{field}</dt>
            <dd>
              {source?.kind} &middot; <code>{source?.locator}</code>
            </dd>
          </div>
        ))}
      </dl>
      <p class="disclaimer">
        No risk detectors run yet. This view shows what BuyGuard read from the page and where each
        value came from.
      </p>
    </section>
  );
}

function App() {
  const [state, setState] = useState<State>({ status: "idle" });

  const analyze = useCallback(() => {
    setState({ status: "analyzing" });
    requestListing().then(setState, (error: unknown) => {
      setState({
        status: "failed",
        reason: "internal-error",
        detail: error instanceof Error ? error.message : String(error),
      });
    });
  }, []);

  return (
    <main>
      <h2>BuyGuard</h2>
      <button type="button" onClick={analyze} disabled={state.status === "analyzing"}>
        {state.status === "analyzing" ? "Reading page…" : "Analyze page"}
      </button>

      {state.status === "ready" ? <ListingView listing={state.listing} /> : null}

      {state.status === "failed" ? (
        <output class="failure">
          {FAILURE_COPY[state.reason]}
          {state.detail ? <span class="detail"> ({state.detail})</span> : null}
        </output>
      ) : null}
    </main>
  );
}

const root = document.getElementById("app");
if (root) {
  render(<App />, root);
}
