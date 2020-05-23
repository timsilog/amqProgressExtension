console.log("Extension Connected");

let un;

const getProgress = async () => {
  let username = document.querySelector('.self').innerText;
  if (!un || un !== username) {
    un = username;
    chrome.runtime.sendMessage({
      action: "updateUsername",
      username
    }, res => console.log(res.msg));
  }
  if (!username) {
    console.log(`Couldn't find username`);
    if (!un) {
      return;
    }
    username = un;
  }

  const players = document.querySelectorAll('.qpAvatarContainer')
  for (const player of players) {
    if (player.querySelector('.qpAvatarNameContainer').innerText === username) {
      const anime = document.querySelector('#qpAnimeName').innerText;
      const guess = document.querySelector('.qpAvatarAnswerText').innerText;
      const isCorrect = player.querySelector('.qpAvatarAnswerContainer').classList[1];
      const songName = document.querySelector('#qpSongName').innerText;
      const songArtist = document.querySelector('#qpSongArtist').innerText;
      const songType = document.querySelector('#qpSongType').innerText;
      const songLink = document.querySelector('#qpSongVideoLink').href;
      const url = 'https://serene-temple-88689.herokuapp.com/updateProgress';
      // const url = 'http://localhost:4000/updateProgress';
      if (!username) {
        console.log(`Couldn't find you`);
        return;
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          songName,
          songArtist,
          anime,
          songLink,
          songType,
          username,
          guess,
          isCorrect: isCorrect === 'wrongAnswer' ? false : true
        })
      };
      fetch(url, options);
      break;
    }
  }
}

const mutationObserver = new MutationObserver(async (mutations) => {
  for (mutation of mutations) {
    if (mutation.target.classList.contains('hide')) {
      chrome.storage.sync.get(['tracking'], val => {
        if (val.tracking) {
          getProgress();
        }
      });
      break;
    }
  }
});

try {
  mutationObserver.observe(document.querySelector('#qpAnimeNameHider'), {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });
  console.log("Looking for progress.")
} catch (err) {
  console.log(`Haven't started observing yet. Looks like you're on the login page.`);
}