export function getBookmarks() {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("bookmarks") || "[]");
  }
  
  export function saveBookmark(post) {
    const stored = getBookmarks();
    const exists = stored.find((p) => p.slug === post.slug);
    if (!exists) {
      localStorage.setItem("bookmarks", JSON.stringify([...stored, post]));
    }
  }
  
  export function removeBookmark(slug) {
    const stored = getBookmarks();
    const updated = stored.filter((p) => p.slug !== slug);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }
  
  export function isBookmarked(slug) {
    const stored = getBookmarks();
    return stored.some((p) => p.slug === slug);
  }
  