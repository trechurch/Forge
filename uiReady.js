// uiReady.js
export function bindWhenReady(id, callback) {
  const el = document.getElementById(id);
  if (el) return callback(el);
  const observer = new MutationObserver(() => {
    const el = document.getElementById(id);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
