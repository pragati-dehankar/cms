export function getBookmarks() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("bookmarks") || "[]");
  } catch (e) {
    console.error("Error parsing bookmarks:", e);
    return [];
  }
}

export function saveBookmark(post) {
  if (typeof window === "undefined") return;
  const stored = getBookmarks();
  const exists = stored.find((p) => p.slug === post.slug);
  if (!exists) {
    localStorage.setItem("bookmarks", JSON.stringify([...stored, post]));
  }
}

export function removeBookmark(slug) {
  if (typeof window === "undefined") return;
  const stored = getBookmarks();
  const updated = stored.filter((p) => p.slug !== slug);
  localStorage.setItem("bookmarks", JSON.stringify(updated));
}

export function isBookmarked(slug) {
  if (typeof window === "undefined") return false;
  const stored = getBookmarks();
  return stored.some((p) => p.slug === slug);
}
