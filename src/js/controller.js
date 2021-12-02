import * as model from './model.js';
import themesView from './views/themesView.js';
import gameView from './views/gameView.js';
import pauseView from './views/pauseView.js';
import soundsView from './views/soundsView.js';
import leavingModalView from './views/leavingModalView.js';
import menuView from './views/menuView.js';
import View from './views/View.js';

import {
  AUDIO_ON,
  THEME_LIGHT,
  SHOW_BTNS,
  LOOSING_LIMIT,
  PIG_DICE,
  BIG_DICE,
  RUN_DICE,
  PIG_LIMIT,
  BIG_LIMIT,
  RUN_LIMIT,
  ONE_SEC,
  SECS_FOR_INACTIVE_TIMER,
  SECS_FOR_GAME_TIMER,
  LOSE_CURSCORE,
  DICE_1,
  DICE_7,
  PERCENT_50,
  PERCENT_95,
  PERCENT_100,
  PRIZE_CHANCES,
} from './config.js';

const controlThemesDarkLight = function () {
  // 1) Toggle dark/light themes classes on body and in setTheme
  themesView.toggleThemes();

  // 2) Toggle icon and note elements on btn
  themesView.arrToggleClass(themesView.btnEls);

  // 3) Toggle light/dark themes dices
  themesView.arrToggleClass(themesView.diceEls);

  // 4) Set to localStorage if dark-theme is on/off
  model.setLocalStorage(
    themesView.localStorageName,
    themesView.setTheme,
    THEME_LIGHT
  );
};

const controlSoundsOnOff = function () {
  // 1) Toggle icon and note elements on btn
  soundsView.arrToggleClass(soundsView.btnEls);

  // 2) Switch volume on/off
  soundsView.switchVolumeOnOff();

  // 3) Set to localStorage if audio-volume is on/off
  model.setLocalStorage(
    soundsView.localStorageName,
    soundsView.setVolume,
    AUDIO_ON
  );
};

const controlPause = function () {
  // 1) Display paused modal
  pauseView.elToggleClass(pauseView.pausedModal);

  // 2) Hold gameTimer
  gameView.holdGameTimer();

  // 3) Clear timers
  gameView.clearTimers(
    gameView.gameTimerID,
    gameView.playerTimerID,
    gameView.inactiveTimerID
  );
};

const controlUnpause = function () {
  // 1) Hide paused modal
  pauseView.elToggleClass(pauseView.pausedModal);

  // 2) Init timers
  gameView.initGameTimer();
  gameView.initPlayerTimer(model.state.activePlayer);
  controlPlayerInactive();
};

const controlSetGameMode = function () {
  // 1) If pig game mode were selected
  if (model.gameModes.pig) model.initState(PIG_DICE, PIG_LIMIT);

  // 2) If big pig game mode were selected
  if (model.gameModes.big) model.initState(BIG_DICE, BIG_LIMIT);

  // 3) If running pig game mode were selected
  if (model.gameModes.run) {
    model.initState(RUN_DICE, RUN_LIMIT);
    gameView.elToggleClass(gameView.countdownBox);
  }
};

const controlGameTimeout = function () {
  // Only for run pig mode start the timer
  if (model.gameModes.run) {
    // 1) Init game timer
    gameView.initGameTimer();

    const runTimeout = () => {
      // 2.1) Decide who's the winner or if it's a draw
      model.decideWinner();

      // 2.2) Display winner popup
      gameView.displayWinner(model.state.winnerPlayer, model.state.draw);

      // 3.2) Play victory sound
      soundsView.play(soundsView.soundVictory);

      // 3.4) Clear all timers
      gameView.clearAllTimers();
    };

    // 4) Init timeout for game timer
    gameView.timeoutID = setTimeout(runTimeout, SECS_FOR_GAME_TIMER * ONE_SEC);
  }
};

const controlPlayerInactive = function () {
  // 1) Clear timers
  gameView.clearTimers(gameView.playerTimerID, gameView.inactiveTimerID);

  // 2) Init player timer
  gameView.initPlayerTimer(model.state.activePlayer);

  // 3) After the player's timer is over change player
  gameView.initInactiveTimer = function () {
    // 3.1) Update curScore to 0 for active player
    gameView.updateEl(
      gameView.curScoreMarkup,
      LOSE_CURSCORE,
      model.state.activePlayer
    );

    // 3.1) Switch active player and set in state obj curScore to 0
    model.switchActivePlayer();

    // 3.3) Toggle player--active class
    gameView.arrToggleClass(gameView.playersEls, 'player--active');

    // 3.4) Toggle playing for active player
    gameView.arrToggleClass(gameView.playingEls);

    // 3.5) Play whoosh sound
    soundsView.play(soundsView.soundWhoosh);

    // 3.6) Clear timers
    gameView.clearTimers(gameView.playerTimerID, gameView.inactiveTimerID);
  };

  // 4) Init inactive timer
  gameView.inactiveTimerID = setInterval(
    gameView.initInactiveTimer,
    SECS_FOR_INACTIVE_TIMER
  );
};

const controlRollingDice = function () {
  // 0) Generate dice roll
  model.generateDiceRoll(model.state.diceSides);

  // 1) If rolled 1
  if (model.state.diceRoll === DICE_1) {
    // 1.1) Update curScore to 0 for active player
    gameView.updateEl(
      gameView.curScoreMarkup,
      LOSE_CURSCORE,
      model.state.activePlayer
    );

    // 1.1) Switch active player and set in state obj curScore to 0
    model.switchActivePlayer();

    // 1.3) Toggle player--active class
    gameView.arrToggleClass(gameView.playersEls, 'player--active');

    // 1.4) Toggle playing for active player
    gameView.arrToggleClass(gameView.playingEls);

    // 1.5) Play whoosh sound
    soundsView.play(soundsView.soundWhoosh);

    // 1.6) Clear player's timer and re-start
    gameView.clearTimers(gameView.playerTimerID);
    gameView.initPlayerTimer(model.state.activePlayer);
  }

  // 2) Rolled 2 - 6
  if (model.state.diceRoll !== DICE_1 && model.state.diceRoll !== DICE_7) {
    // 2.1) Add to curScore rolled number
    model.addCurScore();
  }

  // 3) Rolled 7
  if (model.state.diceRoll === DICE_7) {
    // 3.1) Generate percentages and Prize chances
    model.generatePercentages(PERCENT_100);
    model.generatePrizeChances(PRIZE_CHANCES);

    // 3.2) If percentages were under 50%
    if (model.state.percentages <= PERCENT_50) {
      // Gain curScore based on prize chances and play positive sound
      model.gainCurScore();
      soundsView.play(soundsView.soundPositive);
    }

    // 3.3) If percentages were under 50% and above 95%
    if (
      model.state.percentages > PERCENT_50 &&
      model.state.percentages < PERCENT_95
    ) {
      // Lose from score based on prize chances, play negative sound and update score
      model.takeScore();
      soundsView.play(soundsView.soundNegative);
      gameView.updateEl(
        gameView.scoreMarkup,
        model.state.scores[model.state.activePlayer],
        model.state.activePlayer
      );
    }

    // 3.4) If percentages were above 95%
    if (model.state.percentages >= PERCENT_95) {
      // Set diceRoll to swap, display swap btns and play swap alert sound
      model.diceRollSwap();
      gameView.displaySwapBtns(SHOW_BTNS);
      soundsView.play(soundsView.soundSwapAlert);
    }
  }

  // 4) Update curScore for active player
  gameView.updateEl(
    gameView.curScoreMarkup,
    model.state.curScore,
    model.state.activePlayer
  );

  // 5) Display dice
  gameView.displayDice(model.state.diceRoll);
};

const controlHoldingScore = function () {
  // 1) Update curScore to 0 for active player
  gameView.updateEl(
    gameView.curScoreMarkup,
    LOSE_CURSCORE,
    model.state.activePlayer
  );

  // 2) Add score to active player
  model.addScore();

  // 3) Update score for active player
  gameView.updateEl(
    gameView.scoreMarkup,
    model.state.scores[model.state.activePlayer],
    model.state.activePlayer
  );

  // 5) Check if player won game
  if (model.state.scores[model.state.activePlayer] >= model.state.scoreLimit) {
    // 5.1) Display winner class, play victory sound and clear all timers
    gameView.displayWinner(model.state.activePlayer);
    soundsView.play(soundsView.soundVictory);
    gameView.clearAllTimers();
    //
    //
    // 6) Check if player's score is less then -50
  } else if (model.state.scores[model.state.activePlayer] <= LOOSING_LIMIT) {
    // 6.1) Switch activePlayer so the displayed winner is the other player, play victory sound and clear all timers
    model.switchActivePlayer();
    gameView.displayWinner(model.state.activePlayer);
    soundsView.play(soundsView.soundVictory);
    gameView.clearAllTimers();
    //
    //
    // 7) If none of that is true
  } else {
    // 7.1) Switch active player and set curScore to 0
    model.switchActivePlayer();

    // 7.2) Toggle player--active class
    gameView.arrToggleClass(gameView.playersEls, 'player--active');

    // 7.3) Toggle playing for active player
    gameView.arrToggleClass(gameView.playingEls);

    // 7.4) Play whoosh sound
    soundsView.play(soundsView.soundWhoosh);

    // 7.5) Clear player's timer and re-start
    gameView.clearTimers(gameView.playerTimerID);
    gameView.initPlayerTimer(model.state.activePlayer);
  }
};

const controlResettingTheGame = function () {
  // 1) Reset state obj and gameModes obj
  model.resetState();
  model.resetModes();

  // 2) reset game UI
  gameView.resetGameEls();

  // 3) Reset all timers for run pig
  if (model.gameModes.runPig) {
    gameView.clearAllTimers();
  }
};

const init = function () {
  themesView.addHandlerLoad(controlThemesDarkLight);
  soundsView.addHandlerLoad(controlSoundsOnOff);

  themesView.addHandlerClick(controlThemesDarkLight);
  soundsView.addHandlerClick(controlSoundsOnOff);
  pauseView.addHandlerClick(controlPause, pauseView.btnPause);
  pauseView.addHandlerClick(controlUnpause, pauseView.btnUnpause);
  gameView.addHandlerClick(controlPlayerInactive, gameView.btnRoll);
  gameView.addHandlerClick(controlRollingDice, gameView.btnRoll);
  gameView.addHandlerClick(controlHoldingScore, gameView.btnHold);
  leavingModalView.addHandlerClick(controlResettingTheGame);
  gameView.addHandlerClick(controlResettingTheGame, gameView.btnLeave);

  gameView.addHandlerInitGameTimer(controlGameTimeout);
  menuView.addHandlerSelecting(controlSetGameMode);
};
init();
