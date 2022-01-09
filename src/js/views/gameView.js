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
  SECS_GAME_TIMER,
  SECS_FOR_PLAYER_TIMER,
  CLICK_AVAILABLE,
  CLICK_UNAVAILABLE,
  PLAYER,
  ROBOT,
  ONE_MILISEC
} from '../config.js';


class GameView extends View {
  // NOTE: These timers func() works behind and are not visible. Stores what may happen after the timer is finished
  gameTimerEnded;
  playerTimerEnded;
  // NOTE: These timers func() works on front and are visible. Stores showen timer on screen
  gameTimer;
  playerTimer;
  // NOTE: Stores showen number displayed on gameTimer/playerTimer
  _playerTimerNum; // 5 secs
  gameTimerNum = SECS_GAME_TIMER; // 2 mins

  timerBox = document.querySelector('.timer');
  _timerNums = document.querySelector('.timer__counter');

  _clickOnce = CLICK_AVAILABLE;

  startMsg = document.querySelector('.game__start');

  _diceLight = document.querySelector('.dice--light');
  _diceDark = document.querySelector('.dice--dark');

  btnRoll = document.querySelector('.btn--roll');
  btnHold = document.querySelector('.btn--hold');
  _btnYes = document.querySelector('.btn--swap-yes');
  _btnNo = document.querySelector('.btn--swap-no');
  btnRollPhone = document.querySelector('.btn--roll-phone');
  btnHoldPhone = document.querySelector('.btn--hold-phone');
  _btnYesPhone = document.querySelector('.btn--swap-yes-phone');
  _btnNoPhone = document.querySelector('.btn--swap-no-phone');
  btnYesInvisible = document.querySelector('.btn--swap-yes-invisible');
  btnNoInvisible = document.querySelector('.btn--swap-no-invisible');
  _btnAgain = document.querySelector('.btn--again');
  btnBack = document.querySelector('.btn--back');

  gameBtns = [this.btnRoll, this.btnHold, this.btnRollPhone, this.btnHoldPhone];
  swapBtns = [this._btnYes, this._btnNo, this._btnYesPhone, this._btnNoPhone];

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
  _victoryHeadingStart = document.querySelector('.victory-bar__heading--start');
  _victoryHeadingEnd = document.querySelector('.victory-bar__heading--end');
  _victoryHeadingMain = document.querySelector('.victory-bar__heading--main');

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

        // NOTE: if click happend on btn--swap-yes, call for swapping func(), hide btns, update in state obj scores, play sound
        if (
          btn.classList.contains('btn--swap-yes') ||
          btn.classList.contains('btn--swap-yes-phone') ||
          btn.classList.contains('btn--swap-yes-invisible')
        ) {
          model.swapScores();
          this._updateSwappedScores(...model.state.scores);
          this.displaySwapBtns(HIDE_BTNS);
          soundsView.play(soundsView.soundSwapped);
        }

        // NOTE: if click happend on btn--swap-no, hide btns
        if (
          btn.classList.contains('btn--swap-no') ||
          btn.classList.contains('btn--swap-no-phone') ||
          btn.classList.contains('btn--swap-no-invisible')
        ) {
          this.displaySwapBtns(HIDE_BTNS);
        }
      }.bind(this)
    );
  }

  handleVictoryBar(handler) {
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // NOTE: if click happend on btn--again, reset all game els, reset state obj, game mode stays as it is selected
        if (btn.classList.contains('btn--again')) {
          this.resetGameEls();
          model.resetState();
        }

        // NOTE: if click happend on btn--back, display menu, hide timer, run handler()
        if (btn.classList.contains('btn--back')) {
          menuView.displayMenuWindow();
          this.addClass(this.timerBox);
          handler(); // BUG: Opened dev tools in chrome returns undefined
        }
      }.bind(this)
    );
  }

  addHandlerInitGameTimer(handler, btn) {
    // NOTE: Only for hyper/runnig pig mode. On click btn(btnRoll) run handler() only once, after click disable that click, so the gameTimer won't reset every time there is click on btnRoll
    btn.addEventListener(
      'click',
      function () {
        if (this._clickOnce) {
          handler();
          this._clickOnce = CLICK_UNAVAILABLE;
        }
      }.bind(this)
    );
  }

  resetGameEls() {
    this.removeClass(this._victoryBar, 'bounce-in--first');
    this.addClass(this._victoryBar, 'bounce-out--first');

    this._clickOnce = CLICK_AVAILABLE;

    this.btnRoll.disabled = BTN_WOKRING;
    this.btnHold.disabled = BTN_DISABLED;
    this.btnRollPhone.disabled = BTN_WOKRING;
    this.btnHoldPhone.disabled = BTN_DISABLED;

    this._playing0.textContent = '';
    this._curScoreNum0.textContent = 0;
    this._curScoreNum1.textContent = 0;
    this._score0.textContent = 0;
    this._score1.textContent = 0;
    this._clickOnce = CLICK_AVAILABLE;
    this.gameTimerNum = SECS_GAME_TIMER;
    this._playerTimerNum = SECS_FOR_PLAYER_TIMER;
    this._timerNums.textContent = '04:00';
    this._playerName0.textContent = 'Player 1';
    this._playerName1.textContent = 'Player 2';

    this.removeClass(this.startMsg);
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
    }, ONE_MILISEC * 3);
  }

  displayDice(diceRoll) {
    if(this.body.classList.contains('dark-theme')) {
      this.removeClass(this._diceDark, 'opacity-zero');
      this._diceDark.src = `dice-dark-${diceRoll}.png`;
    } else {
      this.removeClass(this._diceLight, 'opacity-zero');
      this._diceLight.src = `dice-light-${diceRoll}.png`;
    }
  }

  displaySwapBtns(isAllowed) {
    if (isAllowed) {
      this.disabledBtns(BTN_DISABLED, this.gameBtns);
      this.addClass(this.btnRollPhone);
      this.addClass(this.btnHoldPhone);
      this.removeClass(this._btnYes);
      this.removeClass(this._btnNo);
      this.addClass(this._btnYes, 'bounce-in--first');
      this.addClass(this._btnNo, 'bounce-in--second');
      this.removeClass(this._btnYesPhone);
      this.removeClass(this._btnNoPhone);
      this.addClass(this._btnYesPhone, 'bounce-in--first');
      this.addClass(this._btnNoPhone, 'bounce-in--second');
    } else {
      this.disabledBtns(BTN_WOKRING, this.gameBtns);
      this.removeClass(this._btnYes, 'bounce-in--first');
      this.removeClass(this._btnNo, 'bounce-in--second');
      this.addClass(this._btnYes, 'bounce-out--first');
      this.addClass(this._btnNo, 'bounce-out--second');
      this.removeClass(this._btnYesPhone, 'bounce-in--first');
      this.removeClass(this._btnNoPhone, 'bounce-in--second');
      this.addClass(this._btnYesPhone, 'bounce-out--first');
      this.addClass(this._btnNoPhone, 'bounce-out--second');

      setTimeout(() => {
        this.removeClass(this.btnRollPhone);
        this.removeClass(this.btnHoldPhone);
        this.addClass(this._btnYes);
        this.addClass(this._btnNo);
        this.removeClass(this._btnYes, 'bounce-out--first');
        this.removeClass(this._btnNo, 'bounce-out--second');
        this.addClass(this._btnYesPhone);
        this.addClass(this._btnNoPhone);
        this.removeClass(this._btnYesPhone, 'bounce-out--first');
        this.removeClass(this._btnNoPhone, 'bounce-out--second');
      }, ONE_MILISEC * 7);
    }
  }

  displayWinner(activePlayer, draw, playingVsRobot) {
    // Resets html content
    this._victoryHeadingStart.textContent = '';
    this._victoryHeadingMain.textContent = '';
    this._victoryHeadingEnd.textContent = '';


    // 1) For playing 2 players
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

    // 2) For hyper/running pig mode after gameTimerEnded if it's a draw
    if (draw || playingVsRobot) {
      this._victoryHeadingStart.textContent = `No one wins,`;
      this._victoryHeadingMain.textContent = `it's a draw :(`;
    }

    // 3) For playing vs Robot
    if (!draw && playingVsRobot) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player__winner--${activePlayer}`)
        .classList.remove('hidden');
      if (model.state.scores[PLAYER] > model.state.scores[ROBOT]) {
        this._victoryHeadingStart.textContent = `Congratulations`;
        this._victoryHeadingMain.textContent = `you won!`;
      } else {
        this._victoryHeadingStart.textContent = `You lost!`;
        this._victoryHeadingMain.textContent = `Good luck`;
        this._victoryHeadingEnd.textContent = ` next time :)`;
      }
    }

    // Manipulate these els
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

  playerTimerCounting(activePlayer) {
    this._playerTimerNum = 10; // 10 secs

    const updatePlayerTimer = () => {
      document.querySelector(
        `.player__playing--${activePlayer}`
      ).textContent = `playing for ${this._playerTimerNum} sec`;
      this._playerTimerNum--;
    };
    updatePlayerTimer(); // Immediately run the func() so there is no delay
    this.playerTimer = setInterval(updatePlayerTimer, ONE_SEC);
  }

  gameTimerCounting() {
    const updateGameTimer = () => {
      const mins = Math.floor(this.gameTimerNum / 60);
      let secs = this.gameTimerNum % 60;
      secs = secs < 10 ? '0' + secs : secs;

      this._timerNums.textContent = `0${mins}:${secs}`;
      this.gameTimerNum--;
    };
    updateGameTimer(); // Immediately run the func() so there is no delay
    this.gameTimer = setInterval(updateGameTimer, ONE_SEC);
  }

  holdGameTimer() {
    // 1) Stores the printed number in html
    const savedTime = this._timerNums.innerHTML;

    // 2) Slices the mins and secs
    const mins = savedTime.slice(1, 2);
    const secs = savedTime.slice(3, 5);

    // 3) Stores secs as number
    // Ex: 2(mins) * 60(secs) + 41(secs) = 120(secs) + 41(secs) = 161 secs = 02:41
    this.gameTimerNum = mins * SIXTY_SEC + +secs;
  }

  resetAllTimers() {
    clearInterval(this.gameTimer);
    clearInterval(this.playerTimer);
    clearInterval(this.playerTimerEnded);
    clearTimeout(this.gameTimerEnded);
  }

  resetTimers(...timers) {
    timers.forEach(curTimer => clearInterval(curTimer));
  }

  disabledBtns(isDisabled, btnsArr) {
    btnsArr.forEach(curBtn => curBtn.disabled = isDisabled);
  }

  // For Robot when he rolls dice so there is an animation on btnRoll
  clickedAnimation(...btns) {
    btns.forEach(curBtn => {
      this.elToggleClass(curBtn, 'clicked');
      setTimeout(() => this.elToggleClass(curBtn, 'clicked'), ONE_MILISEC);
    });
  }
}

export default new GameView();
