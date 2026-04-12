// Try to send a message to the content script.
// If it's not injected yet (tab was open before install), inject it first.
async function toggle(tab) {
  if (!tab?.id) return;
  const url = tab.url || '';
  // Chrome internal pages can't be scripted
  if (/^(chrome|chrome-extension|devtools|about|data):/.test(url)) return;

  try {
    // Content script already running — just toggle
    await chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
  } catch {
    // Not running yet — inject the file, then toggle
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });
      // Give the script ~150ms to initialize, then send toggle
      setTimeout(async () => {
        try { await chrome.tabs.sendMessage(tab.id, { action: 'toggle' }); } catch {}
      }, 150);
    } catch (err) {
      console.error('[VN Overlay] inject failed:', err);
    }
  }
}

// Icon click
chrome.action.onClicked.addListener(toggle);

// Keyboard shortcut (Ctrl+Shift+V registered in manifest commands)
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-overlay') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  toggle(tab);
});
