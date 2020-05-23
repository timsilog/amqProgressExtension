const toggleClick = () => {
  chrome.storage.sync.get(['tracking'], val => {
    if (val.tracking) {
      document.getElementById("toggle-button").innerText = "Start Tracking";
    } else {
      document.getElementById("toggle-button").innerText = "Stop Tracking";
    }
    chrome.runtime.sendMessage({
      action: 'updateIcon',
      value: !val.tracking
    });
    chrome.storage.sync.set({ tracking: !val.tracking }, val => {
      console.log(`Value set to ${val}`)
    })
  });
}

const progressClick = () => {
  const username = document.getElementById('username').value;
  window.open(`https://timsilog.github.io/amqprogress/?#/${username}`);
}

const checkEnter = e => {
  if (e.key === 'Enter') {
    progressClick();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#toggle-button').addEventListener('click', toggleClick, false);
  document.querySelector('#progress-button').addEventListener('click', progressClick, false);
  document.querySelector('#username').addEventListener('keyup', checkEnter, false);
  document.querySelector('#amq-link').addEventListener('click', () => window.open('https://animemusicquiz.com'), false);
  chrome.storage.sync.get(['username'], val => {
    document.querySelector('#username').value = val.username;
  })
}, false);