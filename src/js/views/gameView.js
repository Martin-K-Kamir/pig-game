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
  timerBox = document.querySelector('.timer');
  _timerNums = document.querySelector('.timer__counter');

  gameStartPopup = document.querySelector('.game__start');

  _diceLight = document.querySelector('.dice--light');
  _diceDark = document.querySelector('.dice--dark');

  btnRoll = document.querySelector('.btn--roll');
  btnHold = document.querySelector('.btn--hold');
  btnBack = document.querySelector('.btn--back');
  _btnYes = document.querySelector('.btn--swap-yes');
  _btnNo = document.querySelector('.btn--swap-no');
  btnRollBt = document.querySelector('.btn--roll-bottom');
  btnHoldBt = document.querySelector('.btn--hold-bottom');
  _btnYesBt = document.querySelector('.btn--swap-yes-bottom');
  _btnNoBt = document.querySelector('.btn--swap-no-bottom');
  _btnYesInvisible = document.querySelector('.btn--swap-yes-invisible');
  _btnNoInvisible = document.querySelector('.btn--swap-no-invisible');
  _btnAgain = document.querySelector('.btn--again');

  _score0 = document.querySelector('.player__score--0');
  _score1 = document.querySelector('.player__score--1');
  scoreMarkup = '.player__score';

  _curScoreBox0 = document.querySelector('.current-box--0');
  _curScoreBox1 = document.querySelector('.current-box--1');
  _curScoreNum0 = document.querySelector('.current-box__score--0');
  _curScoreNum1 = document.querySelector('.current-box__score--1');
  curScoreMarkup = '.current-box__score';

  _playerName0 = document.querySelector('.player__name--0');
  _playerName1 = document.querySelector('.player__name--1');
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
  _victoryHeadingStart = document.querySelector(
    '.victory-bar__heading--span-start'
  );
  _victoryHeadingEnd = document.querySelector(
    '.victory-bar__heading--span-end'
  );
  _victoryHeadingMain = document.querySelector(
    '.victory-bar__heading--span-main'
  );

  constructor() {
    super();
    this._handleSwapping();
    this.handleVictoryBar();
  }

  _handleSwapping() {
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // If btn--swap-yes were clicked
        // Call for swapping scores in state obj, hide displayed btns,
        // update swapped scores and play swapped sound
        if (
          btn.classList.contains('btn--swap-yes') ||
          btn.classList.contains('btn--swap-yes-bottom') ||
          btn.classList.contains('btn--swap-yes-invisible')
        ) {
          model.swapScores();
          this.displaySwapBtns(HIDE_BTNS);
          this._updateSwappedScores(...model.state.scores);
          soundsView.play(soundsView.soundSwapped);
        }

        // If btn--swap-no were clicked
        // Hide displayed btns
        if (
          btn.classList.contains('btn--swap-no') ||
          btn.classList.contains('btn--swap-no-bottom') ||
          btn.classList.contains('btn--swap-no-invisible')
        ) {
          this.displaySwapBtns(HIDE_BTNS);
        }
      }.bind(this)
    );
  }

  // Robot decides if it's worth to swap
  decideSwap() {
    if (model.state.scores[0] > model.state.scores[1]) {
      this._btnYesInvisible.click();
      console.log('yes');
    } else {
      console.log('no');
      this._btnNoInvisible.click();
    }
  }

  // REFACTOR INTO CONTROLLER
  handleVictoryBar(handler) {
    this.body.addEventListener(
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
        }

        // If  btn--back were clicked
        // Display menu window and hide game window
        if (btn.classList.contains('btn--back')) {
          this.displayMenuWindow();
          this.addClass(this.timerBox);
          handler()
        }
      }.bind(this)
    );
  }

  // At the start of the game let start gameTimer but after disable this fun. So the gameTimer wont restart everytime when btnRoll is clicked
  addHandlerInitGameTimer(handler, btn) {
    btn.addEventListener(
      'click',
      function () {
        if (this.clickGameTimerOnce === CLICK_AVAILABLE) {
          handler();

          this.clickGameTimerOnce = CLICK_DISABLED;
        }
      }.bind(this)
    );
  }

  displayMenuWindow() {
    this.addClass(menuView.btnLeave);
    this.addClass(menuView.btnPause);
    this.addClass(this.gameWindow);
    this.removeClass(this.menuWindow);
  }

  resetGameEls() {
    this.removeClass(this._victoryBar, 'bounce-in--first');
    this.addClass(this._victoryBar, 'bounce-out--first');

    this.clickGameTimerOnce = CLICK_AVAILABLE;

    this.btnRoll.disabled = BTN_WOKRING;
    this.btnHold.disabled = BTN_DISABLED;
    this.btnRollBt.disabled = BTN_WOKRING;
    this.btnHoldBt.disabled = BTN_DISABLED;

    this._playing0.textContent = '';
    this._curScoreNum0.textContent = 0;
    this._curScoreNum1.textContent = 0;
    this._score0.textContent = 0;
    this._score1.textContent = 0;
    this.clickGameTimerOnce = CLICK_AVAILABLE;
    this.timeleftGameTimer = SECS_FOR_GAME_TIMER;
    this.timeleftPlayerTimer = SECS_FOR_PLAYER_TIMER;
    this._timerNums.textContent = '04:00';
    this._playerName0.textContent = 'Player 1';
    this._playerName1.textContent = 'Player 2';

    this.removeClass(this.gameStartPopup);
    this.removeClass(this._playing0);
    this.removeClass(this._curScoreBox0);
    this.removeClass(this._curScoreBox1);
    this.removeClass(this._player0, 'player--winner');
    this.removeClass(this._player1, 'player--winner');
    this.removeClass(this._player1, 'player--active');

    this.addClass(this._playing1);
    this.addClass(this._winner0);
    this.addClass(this._winner1);
    this.addClass(this._player0, 'player--active');
    this.addClass(this._diceLight, 'opacity-zero');
    this.addClass(this._victoryBar, 'opacity-zero');

    setTimeout(() => {
      this.removeClass(this._victoryBar, 'bounce-out--first');
      this.removeClass(this._victoryBar, 'opacity-zero');
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
      this.disabledBtns(BTN_DISABLED);
      this.addClass(this.btnRollBt);
      this.addClass(this.btnHoldBt);
      this.removeClass(this._btnYes);
      this.removeClass(this._btnNo);
      this.addClass(this._btnYes, 'bounce-in--first');
      this.addClass(this._btnNo, 'bounce-in--second');
      this.removeClass(this._btnYesBt);
      this.removeClass(this._btnNoBt);
      this.addClass(this._btnYesBt, 'bounce-in--first');
      this.addClass(this._btnNoBt, 'bounce-in--second');
    } else {
      this.disabledBtns(BTN_WOKRING);
      this.removeClass(this._btnYes, 'bounce-in--first');
      this.removeClass(this._btnNo, 'bounce-in--second');
      this.addClass(this._btnYes, 'bounce-out--first');
      this.addClass(this._btnNo, 'bounce-out--second');
      this.removeClass(this._btnYesBt, 'bounce-in--first');
      this.removeClass(this._btnNoBt, 'bounce-in--second');
      this.addClass(this._btnYesBt, 'bounce-out--first');
      this.addClass(this._btnNoBt, 'bounce-out--second');

      setTimeout(() => {
        this.removeClass(this.btnRollBt);
        this.removeClass(this.btnHoldBt);
        this.addClass(this._btnYes);
        this.addClass(this._btnNo);
        this.removeClass(this._btnYes, 'bounce-out--first');
        this.removeClass(this._btnNo, 'bounce-out--second');
        this.addClass(this._btnYesBt);
        this.addClass(this._btnNoBt);
        this.removeClass(this._btnYesBt, 'bounce-out--first');
        this.removeClass(this._btnNoBt, 'bounce-out--second');
      }, 700);
    }
  }

  displayWinner(activePlayer, draw, playingVsRobot) {
    this._victoryHeadingStart.textContent = '';
    this._victoryHeadingMain.textContent = '';
    this._victoryHeadingEnd.textContent = '';

    if (!draw && !playingVsRobot) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player__winner--${activePlayer}`)
        .classList.remove('hidden');
      this._victoryHeadingStart.textContent = `Congratulations`;
      this._victoryHeadingMain.textContent = `Player ${activePlayer + 1}`;
      this._victoryHeadingEnd.textContent = `you won!`;
    }

    if (draw || playingVsRobot) {
      this._victoryHeadingStart.textContent = `No one wins,`;
      this._victoryHeadingMain.textContent = `it's a draw :(`;
    }

    if (!draw && playingVsRobot) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player__winner--${activePlayer}`)
        .classList.remove('hidden');
      if (model.state.scores[0] > model.state.scores[1]) {
        this._victoryHeadingStart.textContent = `Congratulations`;
        this._victoryHeadingMain.textContent = `you won!`;
      } else {
        this._victoryHeadingStart.textContent = `You lost!`;
        this._victoryHeadingMain.textContent = `Good luck`;
        this._victoryHeadingEnd.textContent = ` next time :)`;
      }
    }

    this.addClass(this._playing0);
    this.addClass(this._playing1);
    this.addClass(this._diceLight, 'opacity-zero');
    this.addClass(this._diceLight, 'opacity-zero');
    this.addClass(this._victoryBar, 'bounce-in--first');

    this.removeClass(this._victoryBar);
    this.removeClass(this._player0, 'player--active');
    this.removeClass(this._player1, 'player--active');
  }

  changePlayerNameForRobot() {
    this._playerName0.textContent = 'You';
    this._playerName1.textContent = 'Robot';
  }

  updateEl(el, data, player) {
    document.querySelector(`${el}--${player}`).textContent = data;
  }

  _updateSwappedScores(scorePlayer0, scorePlayer1) {
    this._score0.textContent = scorePlayer0;
    this._score1.textContent = scorePlayer1;
  }

  initPlayerTimer(activePlayer) {
    this.timeleftPlayerTimer = 5; // number is here so the func doesnt break at start

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

  disabledBtns(isDisabled) {
    if (isDisabled) {
      this.btnRoll.disabled = BTN_DISABLED;
      this.btnHold.disabled = BTN_DISABLED;
      this.btnRollBt.disabled = BTN_DISABLED;
      this.btnHoldBt.disabled = BTN_DISABLED;
    } else {
      this.btnRoll.disabled = BTN_WOKRING;
      this.btnHold.disabled = BTN_WOKRING;
      this.btnRollBt.disabled = BTN_WOKRING;
      this.btnHoldBt.disabled = BTN_WOKRING;
    }
  }

  disabledSwapBtns(isDisabled) {
    if (isDisabled) {
      this._btnYes.disabled = BTN_DISABLED;
      this._btnNo.disabled = BTN_DISABLED;
      this._btnYesBt.disabled = BTN_DISABLED;
      this._btnNoBt.disabled = BTN_DISABLED;
    } else {
      this._btnYes.disabled = BTN_WOKRING;
      this._btnNo.disabled = BTN_WOKRING;
      this._btnYesBt.disabled = BTN_WOKRING;
      this._btnNoBt.disabled = BTN_WOKRING;
    }
  }

  clickedRollBtn() {
    this.elToggleClass(this.btnRoll, 'clicked');
    this.elToggleClass(this.btnRollBt, 'clicked');

    setTimeout(() => {
      this.elToggleClass(this.btnRoll, 'clicked');
      this.elToggleClass(this.btnRollBt, 'clicked');
    }, 100);
  }

  clickedHoldBtn() {
    this.elToggleClass(this.btnHold, 'clicked');
    this.elToggleClass(this.btnHoldBt, 'clicked');

    setTimeout(() => {
      this.elToggleClass(this.btnHold, 'clicked');
      this.elToggleClass(this.btnHoldBt, 'clicked');
    }, 100);
  }
}

export default new GameView();
