import View from './View.js';
import * as model from '../model.js';
import soundsView from './soundsView.js';
import menuView from './menuView.js';

import {
  ONE_SEC,
  SIXTY_SEC,
  HIDE_BTNS,
  BTN_WOKRING,
  BTN_DISABLED,
  SECS_FOR_GAME_TIMER,
  SECS_FOR_PLAYER_TIMER,
  CLICK_AVAILABLE,
  CLICK_DISABLED,
} from '../config.js';

class GameView extends View {
  timeoutID; // timeout for gameTimer
  inactiveTimerID; // timeout for playerTimer
  playerTimerID;
  gameTimerID;
  timeleftPlayerTimer;
  timeleftGameTimer = SECS_FOR_GAME_TIMER;
  clickGameTimerOnce = CLICK_AVAILABLE;
  _timerBox = document.querySelector('.timer');
  _timerNums = document.querySelector('.timer__counter');

  _diceLight = document.querySelector('.dice--light');
  _diceDark = document.querySelector('.dice--dark');

  btnRoll = document.querySelector('.btn--roll');
  btnHold = document.querySelector('.btn--hold');
  btnLeave = document.querySelector('.btn--leave');
  _btnYes = document.querySelector('.btn--swap-yes');
  _btnNo = document.querySelector('.btn--swap-no');
  _btnAgain = document.querySelector('.btn--again');

  _score0 = document.querySelector('.player__score--0');
  _score1 = document.querySelector('.player__score--1');
  scoreMarkup = '.player__score';

  _curScoreBox0 = document.querySelector('.current-box--0');
  _curScoreBox1 = document.querySelector('.current-box--1');
  _curScoreNum0 = document.querySelector('.current-box__score--0');
  _curScoreNum1 = document.querySelector('.current-box__score--1');
  curScoreMarkup = '.current-box__score';

  _player0 = document.querySelector('.player--0');
  _player1 = document.querySelector('.player--1');
  playersEls = [this._player0, this._player1];

  _playing0 = document.querySelector('.player__playing--0');
  _playing1 = document.querySelector('.player__playing--1');
  playingEls = [this._playing0, this._playing1];

  _winner0 = document.querySelector('.player__winner--0');
  _winner1 = document.querySelector('.player__winner--1');
  _victoryBar = document.querySelector('.victory-bar');
  _victoryHeading = document.querySelector('.victory-bar__heading');
  _victoryHeadingPlayer = document.querySelector(
    '.victory-bar__heading--player'
  );

  constructor() {
    super();
    this._handleSwapping();
    this._handleVictoryBar();
  }

  _handleSwapping() {
    this._body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // If btn--swap-yes were clicked
        // Call for swapping scores in state obj, hide displayed btns,
        // update swapped scores and play swapped sound
        if (btn.classList.contains('btn--swap-yes')) {
          model.swapScores();
          this.displaySwapBtns(HIDE_BTNS);
          this._updateSwappedScores(...model.state.scores);
          soundsView.play(soundsView.soundSwapped);
        }

        // If btn--swap-no were clicked
        // Hide displayed btns
        if (btn.classList.contains('btn--swap-no')) {
          this.displaySwapBtns(HIDE_BTNS);
        }
      }.bind(this)
    );
  }

  _handleVictoryBar() {
    this._body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // If btn--again were clicked
        // Reset all game elements also reset state obj,
        // but keep diceSides and scoreLimit for current mode
        if (btn.classList.contains('btn--again')) {
          this.resetGameEls();
          model.resetState();

          // If runPig were selected
          if (model.gameModes.runPig) {
            this.clickGameTimerOnce = CLICK_AVAILABLE;
            this.elToggleClass(this._timerBox); // display gameTimer
          }
        }

        // If  btn--leave were clicked
        // Display menu window and hide game window
        if (btn.classList.contains('btn--leave')) {
          this._displayMenuWindow();
          // In the controller is handled the resetting function
        }
      }.bind(this)
    );
  }

  // At the start of the game let start gameTimer but after disable this fun. So the gameTimer wont restart everytime when btnRoll is clicked
  addHandlerInitGameTimer(handler) {
    this.btnRoll.addEventListener(
      'click',
      function () {
        if (this.clickGameTimerOnce === CLICK_AVAILABLE) {
          handler();

          this.clickGameTimerOnce = CLICK_DISABLED;
        }
      }.bind(this)
    );
  }

  _displayMenuWindow() {
    this.addClass(menuView._btnExit);
    this.addClass(menuView._btnPause);
    this.addClass(this._gameWindow);
    this.removeClass(this._menuWindow);
  }

  resetGameEls() {
    this.removeClass(this._victoryBar, 'bounce-in--first');
    this.addClass(this._victoryBar, 'bounce-out--first');

    this._playing0.textContent = '';
    this._curScoreNum0.textContent = 0;
    this._curScoreNum1.textContent = 0;
    this._score0.textContent = 0;
    this._score1.textContent = 0;
    this.clickGameTimerOnce = CLICK_AVAILABLE;
    this.timeleftGameTimer = SECS_FOR_GAME_TIMER;
    this.timeleftPlayerTimer = SECS_FOR_PLAYER_TIMER;
    this._timerNums.textContent = '04:00';

    this.removeClass(this._playing0);
    this.removeClass(this._player0, 'player--winner');
    this.removeClass(this._player1, 'player--winner');
    this.removeClass(this._player1, 'player--active');

    this.addClass(this._timerBox);
    this.addClass(this._playing1);
    this.addClass(this._curScoreBox0);
    this.addClass(this._curScoreBox0);
    this.addClass(this._winner0);
    this.addClass(this._winner1);
    this.addClass(this._player0, 'player--active');
    this.addClass(this._diceLight, 'opacity-zero');
    this.addClass(this._victoryBar, 'opacity-zero');

    setTimeout(() => {
      this.removeClass(this._victoryBar, 'bounce-out--first');
      this.addClass(this._victoryBar);
    }, 300);
  }

  displayDice(diceRoll) {
    this.removeClass(this._diceLight, 'opacity-zero');
    this._diceLight.src = `src/img/dice-light-${diceRoll}.png`;

    this.removeClass(this._diceDark, 'opacity-zero');
    this._diceDark.src = `src/img/dice-dark-${diceRoll}.png`;
  }

  displaySwapBtns(showBtns) {
    if (showBtns) {
      this.btnRoll.disabled = BTN_DISABLED;
      this.btnHold.disabled = BTN_DISABLED;
      this.removeClass(this._btnYes);
      this.removeClass(this._btnNo);
      this.addClass(this._btnYes, 'bounce-in--first');
      this.addClass(this._btnNo, 'bounce-in--second');
    } else {
      this.btnRoll.disabled = BTN_WOKRING;
      this.btnHold.disabled = BTN_WOKRING;
      this.removeClass(this._btnYes, 'bounce-in--first');
      this.removeClass(this._btnNo, 'bounce-in--second');
      this.addClass(this._btnYes, 'bounce-out--first');
      this.addClass(this._btnNo, 'bounce-out--second');

      setTimeout(() => {
        this.addClass(this._btnYes);
        this.addClass(this._btnNo);
        this.removeClass(this._btnYes, 'bounce-out--first');
        this.removeClass(this._btnNo, 'bounce-out--second');
      }, 700);
    }
  }

  displayWinner(activePlayer, draw) {
    if (!draw) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player__winner--${activePlayer}`)
        .classList.remove('hidden');
      this._victoryHeadingPlayer.textContent = `Player ${activePlayer + 1}`;
    }

    if (draw) {
      this._victoryHeading.textContent = `No one wins it's a draw :(`;
    }

    this.addClass(this._playing0);
    this.addClass(this._playing1);
    this.addClass(this._curScoreBox0);
    this.addClass(this._curScoreBox1);
    this.addClass(this._diceLight, 'opacity-zero');
    this.addClass(this._diceLight, 'opacity-zero');
    this.addClass(this._victoryBar, 'bounce-in--first');

    this.removeClass(this._victoryBar);
    this.removeClass(this._player0, 'player--active');
    this.removeClass(this._player1, 'player--active');
  }

  updateEl(el, data, player) {
    document.querySelector(`${el}--${player}`).textContent = data;
  }

  _updateSwappedScores(scorePlayer0, scorePlayer1) {
    this._score0.textContent = scorePlayer0;
    this._score1.textContent = scorePlayer1;
  }

  initPlayerTimer(activePlayer) {
    this.timeleftPlayerTimer = 5;

    const updatePlayerTimer = () => {
      document.querySelector(
        `.player__playing--${activePlayer}`
      ).textContent = `playing for ${this.timeleftPlayerTimer} sec`;
      this.timeleftPlayerTimer--;
    };
    updatePlayerTimer();
    this.playerTimerID = setInterval(updatePlayerTimer, ONE_SEC);
  }

  initGameTimer() {
    const updateGameTimer = () => {
      const mins = Math.floor(this.timeleftGameTimer / 60);
      let secs = this.timeleftGameTimer % 60;
      secs = secs < 10 ? '0' + secs : secs;

      this._timerNums.textContent = `0${mins}:${secs}`;
      this.timeleftGameTimer--;
    };
    updateGameTimer();
    this.gameTimerID = setInterval(updateGameTimer, ONE_SEC);
  }

  holdGameTimer() {
    const savedTime = this._timerNums.innerHTML;
    const mins = savedTime.slice(1, 2);
    const secs = savedTime.slice(3, 5);
    this.timeleftGameTimer = mins * SIXTY_SEC + +secs;
  }

  clearAllTimers() {
    clearInterval(this.gameTimerID);
    clearInterval(this.playerTimerID);
    clearInterval(this.inactiveTimerID);
    clearInterval(this.runTimeoutID);
  }

  clearTimers(...timersID) {
    timersID.forEach(curTimer => clearInterval(curTimer));
  }
}

export default new GameView();
