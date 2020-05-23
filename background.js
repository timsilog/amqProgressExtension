chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ tracking: true, username: '' }, () => {
    console.log(`Initialized tracking to true and username to ''`);
  })
});

chrome.commands.onCommand.addListener(function (command) {
  console.log(command);
  if (command === 'open_amq') {
    window.open('https://animemusicquiz.com');
  }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") {
    if (msg.value) {
      chrome.browserAction.setIcon({ path: "/assets/amqpIcon48.png" });
    } else {
      chrome.browserAction.setIcon({ path: "/assets/amqpIconOff48.png" });
    }
  }
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.action === "updateUsername") {
      chrome.storage.sync.set({ username: request.username ? request.username : '' }, () => console.log(`Set username to ${request.username}`))
      sendResponse({ msg: `Updated Username: ${request.username}` });
    }
  }
);