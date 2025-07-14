// lib/localComments.js

export function getComments(slug) {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(`comments-${slug}`) || "[]");
}

export function saveComment(slug, comment) {
  const existing = getComments(slug);
  localStorage.setItem(`comments-${slug}`, JSON.stringify([...existing, comment]));
}

export function deleteComment(slug, createdAt) {
  const existing = getComments(slug);
  const updated = existing.filter(c => c.createdAt !== createdAt);
  localStorage.setItem(`comments-${slug}`, JSON.stringify(updated));
}
