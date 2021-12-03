import View from './View.js';

class PauseView extends View {
  btnPause = document.querySelector('.btn--pause');
  btnUnpause = document.querySelector('.btn--unpause');
  pausedModal = document.querySelector('.paused-modal');
}

export default new PauseView();
