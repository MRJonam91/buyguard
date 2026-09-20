import { describe, expect, it } from "vitest";
import manifest, { VINTED_HOSTS } from "../manifest.config";

/**
 * The manifest is the extension's permission surface. These assertions are the
 * regression guard for the least-privilege promise in SECURITY.md, so widening
 * it becomes a deliberate, visible change rather than a quiet one.
 */
describe("MV3 manifest", () => {
  it("requests only the permissions the code actually uses", () => {
    expect(manifest.permissions).toEqual(["sidePanel"]);
  });

  it("keeps host permissions and content script matches in sync", () => {
    expect([...manifest.content_scripts[0].matches]).toEqual([...manifest.host_permissions]);
  });

  it("covers the Vinted country domains, not just .com and .it", () => {
    expect(VINTED_HOSTS.length).toBeGreaterThan(10);
    expect(VINTED_HOSTS).toContain("vinted.fr");
    expect(VINTED_HOSTS).toContain("vinted.co.uk");
  });

  it("never requests a wildcard TLD", () => {
    for (const pattern of manifest.host_permissions) {
      expect(pattern).not.toMatch(/vinted\.\*/);
    }
  });

  it("declares an explicit content security policy", () => {
    expect(manifest.content_security_policy.extension_pages).toContain("script-src 'self'");
  });
});
