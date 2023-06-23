chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.update(tab.id, { url: chrome.extension.getURL('./index.html') });
  });
  