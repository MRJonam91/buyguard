/**
 * MV3 manifest | Manifest MV3
 *
 * Built from a single source of truth so `host_permissions` and the content
 * script `matches` cannot drift apart.
 *
 * Costruito da una singola fonte di verita cosi `host_permissions` e i
 * `matches` del content script non possono divergere.
 */

/**
 * Vinted runs one storefront per country TLD. A manifest listing only .com and
 * .it silently ignores most of the user base, so the supported domains are
 * enumerated explicitly. They are NOT expressed as `*://*.vinted.*` : a wildcard
 * TLD is a broader permission than the product needs and is hard to justify in
 * a store review.
 *
 * I domini supportati sono enumerati esplicitamente: un TLD con wildcard
 * sarebbe un permesso piu ampio del necessario.
 */
export const VINTED_HOSTS = [
  "vinted.com",
  "vinted.it",
  "vinted.fr",
  "vinted.de",
  "vinted.es",
  "vinted.nl",
  "vinted.be",
  "vinted.at",
  "vinted.pl",
  "vinted.cz",
  "vinted.sk",
  "vinted.lt",
  "vinted.lv",
  "vinted.ee",
  "vinted.lu",
  "vinted.pt",
  "vinted.ro",
  "vinted.se",
  "vinted.dk",
  "vinted.fi",
  "vinted.hu",
  "vinted.gr",
  "vinted.ie",
  "vinted.hr",
  "vinted.co.uk",
] as const;

/** `*.host` also matches the bare host in a Chrome match pattern. */
const VINTED_MATCHES = VINTED_HOSTS.map((host) => `*://*.${host}/*`);

const manifest = {
  manifest_version: 3,
  name: "BuyGuard",
  version: "0.1.0",
  description: "Privacy-first browser extension for spotting misleading marketplace listings.",
  // chrome.sidePanel landed in Chrome 114.
  minimum_chrome_version: "114",
  /**
   * `sidePanel` only. `scripting` was requested but never used, and `activeTab`
   * is redundant next to the declared host permissions plus a declarative
   * content script. An unused permission is both a least-privilege violation
   * (SECURITY.md) and a common store-review rejection.
   */
  permissions: ["sidePanel"],
  host_permissions: VINTED_MATCHES,
  background: {
    service_worker: "src/background.ts",
    type: "module" as const,
  },
  content_scripts: [
    {
      matches: VINTED_MATCHES,
      js: ["src/content.ts"],
      run_at: "document_idle",
    },
  ],
  action: {
    default_title: "Open BuyGuard",
  },
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
  /**
   * THREAT_MODEL.md and SECURITY.md both promise a strict CSP. MV3's default is
   * already restrictive; stating it makes the promise verifiable and stops a
   * later relaxation from passing review unnoticed.
   */
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
};

export default manifest;
