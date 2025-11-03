// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

// Fetch available voices and populate the dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    voicesDropdown.innerHTML = `<option value="">No voices available</option>`;
    return;
  }

  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggleSpeech(true);
}

// Start or stop speaking
function toggleSpeech(startOver = true) {
  speechSynthesis.cancel();
  if (startOver && msg.text.trim() !== '') {
    speechSynthesis.speak(msg);
  }
}

// Update speech options dynamically (rate, pitch, text)
function setOption() {
  msg[this.name] = this.value;
  toggleSpeech(true);
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', () => toggleSpeech(true));
stopButton.addEventListener('click', () => toggleSpeech(false));
