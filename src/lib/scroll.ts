// Smooth-scrolls to a section by id and rewrites the URL to a clean slug
// (e.g. "/shop") with no hash. Returns true if the section exists on the
// current page (so the caller can preventDefault); false otherwise, letting
// the browser follow the real href (e.g. navigate to /shop from another page).
export function scrollToSection(id: string, slug: string): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", slug ? `/${slug}` : "/");
  return true;
}

export function handleNavClick(
  e: { preventDefault: () => void },
  id: string,
  slug: string,
) {
  if (scrollToSection(id, slug)) e.preventDefault();
}
