import * as model from './model.js';
import themesView from './views/themesView.js';
import gameView from './views/gameView.js';
import pauseView from './views/pauseView.js';
import soundsView from './views/soundsView.js';
import leavingView from './views/leavingView.js';
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
  PERCENT_90,
  PERCENT_100,
  PRIZE_CHANCES,
  BTN_DISABLED,
  BTN_WOKRING,
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

  // 3.1) Reset robot interval
  clearInterval(model.state.rollingSequence);
};

const controlUnpause = function () {
  // 1) Hide paused modal
  pauseView.elToggleClass(pauseView.pausedModal);

  // 2) Init timers
  gameView.initGameTimer();
  gameView.initPlayerTimer(model.state.activePlayer);
  controlPlayerInactive();

  // 3) Run robot
  controllPlayingVsRobot();
};

const controlSetGameMode = function () {
  // 1) If pig game mode were selected
  if (model.gameModes.pig) {
    model.initState(PIG_DICE, PIG_LIMIT);
    console.log(model.state);
  }

  // 2) If big pig game mode were selected
  if (model.gameModes.big) model.initState(BIG_DICE, BIG_LIMIT);

  // 3) If running pig game mode were selected
  if (model.gameModes.run) {
    model.initState(RUN_DICE, RUN_LIMIT);
    gameView.removeClass(gameView.timerBox);
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
      gameView.displayWinner(
        model.state.winnerPlayer,
        model.state.draw,
        model.state.playingVsRobot
      );

      // 3.2) Play victory sound
      soundsView.play(soundsView.soundVictory);

      // 3.4) Clear all timers
      gameView.clearAllTimers();

      // 3.5) Reset robot interval
      clearInterval(model.state.rollingSequence);
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

    // 3.7) Init player timer again
    gameView.initPlayerTimer(model.state.activePlayer);

    // 3.8) Init inactive timer again
    gameView.inactiveTimerID = setInterval(
      gameView.initInactiveTimer,
      SECS_FOR_INACTIVE_TIMER
    );
  };

  // 4) Init inactive timer func above
  // This func runs after the interval is finished. After interval is done player changes and interval resets (step .3)
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

    // 1.7) If playing vs robot undisable btns to work
    if (model.state.playingVsRobot) {
      gameView.disabledBtns(BTN_WOKRING);
    }
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
      model.state.percentages < PERCENT_90
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
    if (model.state.percentages >= PERCENT_90) {
      // Set diceRoll to swap, display swap btns and play swap alert sound
      model.diceRollSwap();
      gameView.displaySwapBtns(SHOW_BTNS);
      soundsView.play(soundsView.soundSwapAlert);

      // If playing vs robot
      if (model.state.activePlayer === 1 && model.state.playingVsRobot) {
        // Reset robot interval
        clearInterval(model.state.rollingSequence);

        // Disable swap btns
        gameView.disabledSwapBtns(BTN_DISABLED);

        setTimeout(() => {
          // Decide if is it worth to swap or not
          gameView.decideSwap();

          // Run robot
          controllPlayingVsRobot();

          // Undisable swap btns
          gameView.disabledSwapBtns(BTN_WOKRING);
        }, 1000);
      }
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

  // 6) Run Inactive
  controlPlayerInactive();

  // 7) Make hold btn to work
  gameView.disabledBtns(BTN_WOKRING);

  // 8) Hide game__start popup
  gameView.addClass(gameView.gameStartPopup);
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

  // 4) If playing vs robot undisable btns
  if (model.state.playingVsRobot) {
    gameView.disabledBtns(BTN_WOKRING);
  }

  // 5) Check if player won game
  if (model.state.scores[model.state.activePlayer] >= model.state.scoreLimit) {
    // 5.1) Display winner class, play victory sound and clear all timers
    gameView.displayWinner(
      model.state.activePlayer,
      undefined,
      model.state.playingVsRobot
    );
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

  // 3) Reset all timers
  gameView.clearAllTimers();

  // 3.1) Reset robot interval
  clearInterval(model.state.rollingSequence);

  // 4) Undisable btns
  gameView.disabledBtns(BTN_WOKRING);
};

const controlLeaving = function () {
  // 1) Show modal
  leavingView.elToggleClass(leavingView.leavingModal);

  // 2) Hold gameTimer
  gameView.holdGameTimer();

  // 3) Clear timers
  gameView.clearTimers(
    gameView.gameTimerID,
    gameView.playerTimerID,
    gameView.inactiveTimerID
  );
};

const controlLeavingNo = function () {
  // 1) Hide modal
  leavingView.elToggleClass(leavingView.leavingModal);

  // 2) Init timers
  gameView.initGameTimer();
  gameView.initPlayerTimer(model.state.activePlayer);
  controlPlayerInactive();
};

const controlLeavingYes = function () {
  // 1) Hide modal
  leavingView.elToggleClass(leavingView.leavingModal);

  // 2) Display menu window and hide game window
  gameView.displayMenuWindow();

  // 2) Restart game to the state
  controlResettingTheGame();
};

const controllPlayingVsRobot = function () {
  clearInterval(model.state.rollingSequence);

  // Dunno why but wihnout interval it doesn't work
  setInterval(() => {
    if (model.state.activePlayer === 1 && model.state.playingVsRobot) {
      gameView.disabledBtns(BTN_DISABLED);
    }
  }, 0);

  model.state.rollingSequence = setInterval(() => {
    if (model.state.activePlayer === 1 && model.state.playingVsRobot) {
      // 0) Decide the range in which robot will hold the curScor
      model.generateDecisionRange(25);

      // 1) If game is won stop all timers
      if (model.state.scores[1] >= model.state.scoreLimit) {
        gameView.clearAllTimers();
        clearInterval(model.state.rollingSequence);
        return;
      }

      // 2) Rolling dice
      setTimeout(() => {
        if (model.state.activePlayer !== 1) return;
        if (model.state.scores[1] >= model.state.scoreLimit) return;
        soundsView.play(soundsView.soundClick);
        gameView.clickedRollBtn();
        controlRollingDice();
      }, 0);

      // 3) If curScore is greater or equal then 10
      // AND If curScore is bgreater or equal then decisionRange hold
      // OR if curScore with score is greater or equal hold for the win
      if (
        (model.state.curScore >= 10 &&
          model.state.curScore >= model.state.decisionRange) ||
        model.state.curScore + model.state.scores[1] >= model.state.scoreLimit
      ) {
        soundsView.play(soundsView.soundWhoosh);
        gameView.clickedHoldBtn();
        controlHoldingScore();
      }
    }
  }, 800);
};

const init = function () {
  themesView.addHandlerLoad(controlThemesDarkLight);
  soundsView.addHandlerLoad(controlSoundsOnOff);

  themesView.addHandlerClick(controlThemesDarkLight);
  soundsView.addHandlerClick(controlSoundsOnOff);
  pauseView.addHandlerClick(controlPause, pauseView.btnPause);
  pauseView.addHandlerClick(controlUnpause, pauseView.btnUnpause);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnRoll);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnRollBt);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnHold);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnHoldBt);
  gameView.addHandlerClick(controlRollingDice, gameView.btnRoll);
  gameView.addHandlerClick(controlRollingDice, gameView.btnRollBt);
  gameView.addHandlerClick(controlHoldingScore, gameView.btnHold);
  gameView.addHandlerClick(controlHoldingScore, gameView.btnHoldBt);
  gameView.addHandlerClick(controlResettingTheGame, gameView.btnBack);
  leavingView.addHandlerClick(controlLeaving);
  leavingView.addHandlerClick(controlLeavingNo, leavingView.btnNo);
  leavingView.addHandlerClick(controlLeavingYes, leavingView.btnYes);

  gameView.addHandlerInitGameTimer(controlGameTimeout);
  menuView.addHandlerModesSelecting(controlSetGameMode);

  // Moved to controlRollingDice func & controlHoldingScore func
  // gameView.addHandlerClick(controlPlayerInactive, gameView.btnRoll);
  // gameView.addHandlerClick(controlPlayerInactive, gameView.btnRollBt);
};
init();
