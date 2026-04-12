// When user clicks the extension icon, toggle overlay in active tab
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { action: "toggle" });
  } catch {}
});
