export function getComments(slug) {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(`comments-${slug}`) || "[]");
  }
  
  export function saveComment(slug, comment) {
    const existing = getComments(slug);
    localStorage.setItem(`comments-${slug}`, JSON.stringify([...existing, comment]));
  }
  
  export function deleteComment(slug, index) {
    const existing = getComments(slug);
    existing.splice(index, 1);
    localStorage.setItem(`comments-${slug}`, JSON.stringify(existing));
  }
  