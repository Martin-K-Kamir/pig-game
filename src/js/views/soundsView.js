import View from './View.js';

import { AUDIO_ON, AUDIO_OFF } from '../config.js';

class SoundsView extends View {
  _iconOn = document.querySelector('.icon-sounds--on');
  _iconOff = document.querySelector('.icon-sounds--off');
  _noteOn = document.querySelector('.note-sounds--on');
  _noteOff = document.querySelector('.note-sounds--off');

  btn = document.querySelector('.btn--sounds');
  btnEls = [this._iconOn, this._iconOff, this._noteOn, this._noteOff];

  soundClick = document.querySelector('.audio-click');
  soundWhoosh = document.querySelector('.audio-whoosh');
  soundPositive = document.querySelector('.audio-positive');
  soundNegative = document.querySelector('.audio-negative');
  soundSwapAlert = document.querySelector('.audio-swap-alert');
  soundSwapped = document.querySelector('.audio-swapped');
  soundVictory = document.querySelector('.audio-victory');

  setVolume = AUDIO_ON;
  localStorageName = 'audio-volume';

  constructor() {
    super();
    this._handleClickingSounds();
  }

  _handleClickingSounds() {
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // On every button with class click-sound play sound click
        if (btn.classList.contains('click-sound'))
          return this.play(this.soundClick);
      }.bind(this)
    );
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', function () {
      if (localStorage.getItem('audio-volume') === 'off') handler();
    });
  }

  play(soundType) {
    soundType.volume = this.setVolume;
    soundType.play();
  }

  switchVolumeOnOff() {
    this.setVolume = this.setVolume === AUDIO_ON ? AUDIO_OFF : AUDIO_ON;
  }
}

export default new SoundsView();
