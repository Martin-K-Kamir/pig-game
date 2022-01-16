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
  SECS_GAME_TIMER,
  LOSE_CURSCORE,
  DICE_1,
  DICE_7,
  PERCENT_50,
  PERCENT_90,
  PERCENT_100,
  PRIZE_CHANCES,
  BTN_DISABLED,
  BTN_WOKRING,
  PLAYER,
  ROBOT,
  ROBOT_CURSCORE_MAX_LIMIT,
  ROBOT_CURSCORE_MIN_LIMIT,
  SECS_FOR_ROBOT_CLICKING,
  CLICK_AVAILABLE,
  CLICK_UNAVAILABLE,
  UPDATE_DICE,
} from './config.js';

const controlThemes = function () {
  // 1) Toggle dark/light themes classes on body and in setTheme
  themesView.toggleThemes();

  // 2) Toggle icon and note els on btn
  themesView.arrToggleClass(themesView.btnEls);

  // 3) Toggle light/dark themes dices
  themesView.arrToggleClass(themesView.diceEls);

  // 4) Set to localStorage if dark-theme is on/off
  model.setLocalStorage(
    themesView.localStorageName,
    themesView.setTheme,
    THEME_LIGHT
  );

  // 5) Update dice only if game is running
  if (model.state.gameIsRunning) gameView.displayDice(model.state.diceRoll, UPDATE_DICE);
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
  if (model.gameModes.run) gameView.holdGameTimer();

  // 3) Reset all timers
  gameView.resetAllTimers()

  // 4) Reset Robot's rolling interval
  if (model.state.playingVsRobot) clearInterval(model.state.rollingSequence);
};

const controlUnpause = function () {
  // 1) Hide paused modal
  pauseView.elToggleClass(pauseView.pausedModal);

  // 2) Init VISIBLE game timer
  if (model.gameModes.run) gameView.gameTimerCounting();

  // 3) Init VISIBLE player timer for actived player
  gameView.playerTimerCounting(model.state.activePlayer);

  // 4) Run INVISIBLE game timer func() argument is saved time from holdGameTimer()
  if (model.gameModes.run) controlGameTimer(gameView.gameTimerNum);

  // 5) Run INVISIBLE player timer func() the timer resets
  controlPlayerTimer();

  // 6) Run func()
  if (model.state.playingVsRobot) controllPlayingVsRobot();
};

const controlSetGameMode = function () {
  // A) If pig game mode were selected
  if (model.gameModes.pig) model.initState(PIG_DICE, PIG_LIMIT);
  
  // B) If big pig game mode were selected
  if (model.gameModes.big) model.initState(BIG_DICE, BIG_LIMIT);

  // C) If running/hyper pig game mode were selected
  if (model.gameModes.run) {
    model.initState(RUN_DICE, RUN_LIMIT);
    gameView.removeClass(gameView.timerBox);
  }
};

const controlGameTimer = function (secs = SECS_GAME_TIMER) {
  // NOTE: Only for running/hyper pig mode start the timer
  if (model.gameModes.run) {
    // 1) Reset all timers
    // NOTE: Solved issue when paused/unpaused game after timeout finished the timer never finished and kept going
    gameView.resetAllTimers();

    // 2) Init VISIBLE game timer
    gameView.gameTimerCounting();

    // 3) After the game timer is over
    const gameTimerEnded = () => {
      // 3.1) Decide who's the winner or if it's a draw
      model.decideWinner();

      // 3.2) Display winner popup
      gameView.displayWinner(
        model.state.winnerPlayer,
        model.state.draw,
        model.state.playingVsRobot
      );

      // 3.3) Play victory sound
      soundsView.play(soundsView.soundVictory);

      // 3.4) Reset all timers
      gameView.resetAllTimers();

      // 3.5) Reset Robot's rolling interval
      if (model.state.playingVsRobot)
        clearInterval(model.state.rollingSequence);
    };

    // 4) Init timeout for INVISIBLE game timer / runs the func() above
    gameView.gameTimerEnded = setTimeout(gameTimerEnded, secs * ONE_SEC);
  }
};

const controlPlayerTimer = function () {
  // 1) Reset timers
  gameView.resetTimers(gameView.playerTimer, gameView.playerTimerEnded);

  // 2) Init VISIBLE player timer
  gameView.playerTimerCounting(model.state.activePlayer);

  // 3) After the player's timer is over
  const playerTimerEnded = () => {
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

    // 3.6) Reset timers
    gameView.resetTimers(gameView.playerTimer, gameView.playerTimerEnded);

    // 3.7) Init player timer again for actived player
    gameView.playerTimerCounting(model.state.activePlayer);

    // 3.8) Init this func() again
    // NOTE: Solved issue when player were inactive, active player switch to the other player but the timer didn't start
    gameView.playerTimerEnded = setInterval(
      playerTimerEnded,
      SECS_FOR_INACTIVE_TIMER
    );
  };

  // 4) Init interval for INVISIBLE active player's timer / runs the func() above
  gameView.playerTimerEnded = setInterval(
    playerTimerEnded,
    SECS_FOR_INACTIVE_TIMER
  );
};

const controlRollingDice = function () {

  // 0) Generate dice roll
  model.generateDiceRoll(model.state.diceSides);

  // 1) NOTE: If rolled 1
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

    // 1.6) Reset VISIBLE player's timer
    gameView.resetTimers(gameView.playerTimer);

    // 1.7 Run INVISIBLE player timer func() for active player
    gameView.playerTimerCounting(model.state.activePlayer);

    // 1.8) If playing vs robot undisable btns to work
    if (model.state.playingVsRobot) gameView.disabledBtns(BTN_WOKRING, gameView.gameBtns);
  }

  // NOTE: 2) Rolled 2 - 6
  if (model.state.diceRoll !== DICE_1 && model.state.diceRoll !== DICE_7) {
    // 2.1) Add to curScore rolled number
    model.addCurScore();
  }

  // NOTE: 3) Rolled 7
  if (model.state.diceRoll === DICE_7) {
    // 3.1) Generate percentages and Prize chances
    model.generatePercentages(PERCENT_100);
    model.generatePrizeChances(PRIZE_CHANCES);

    // NOTE: GAIN SCORE
    // 3.2) If percentages were under 50%
    if (model.state.percentages <= PERCENT_50) {
      // Gain curScore based on prize chances and play positive sound
      model.gainCurScore();
      soundsView.play(soundsView.soundPositive);
    }

    // NOTE: LOSE SCORE
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

    // NOTE: SWAP
    // 3.4) If percentages were above 90%
    if (model.state.percentages >= PERCENT_90) {
      // Set dice to swap img, display swap btns and play swap alert sound
      model.diceRollSwap();
      gameView.displaySwapBtns(SHOW_BTNS);
      soundsView.play(soundsView.soundSwapAlert);

      // If playing vs Robot
      if (model.state.activePlayer === ROBOT && model.state.playingVsRobot) {
        // Reset Robot's rolling interval
        clearInterval(model.state.rollingSequence);

        // Disable swap btns
        gameView.disabledBtns(BTN_DISABLED, gameView.swapBtns);

        setTimeout(() => {
          // Decide if is it worth to swap or not for Robot
          if (model.state.scores[PLAYER] > model.state.scores[ROBOT]) {
            // NOTE: Since btnYes, btnYesPhone, btnNo, btnNoPhone are disabled there is these invisible btnYes/No to be able to do click() event
            gameView.btnYesInvisible.click();
          } else {
            gameView.btnNoInvisible.click();
          }

          // Run robot func()
          controllPlayingVsRobot();

          // Undisable swap btns
          gameView.disabledBtns(BTN_WOKRING, gameView.swapBtns);
        }, ONE_SEC * 1.5);
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

  // 6) Run player's timer
  controlPlayerTimer();

  // 7) Make btnHold to work. At the start of the game btnHold is disabled
  if (gameView.clickOnce) {
    gameView.disabledBtns(BTN_WOKRING, gameView.gameBtns);
    this.clickOnce = false;
  } 

  // 8) Hide .game__start msg
  gameView.addClass(gameView.startMsg);

  // 9) Sets to the state obj that game is running
  model.state.gameIsRunning = true;
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
  if (model.state.playingVsRobot) gameView.disabledBtns(BTN_WOKRING, gameView.gameBtns);
  

  // IMPORTANT NOTE: Check if player won game
  if (model.state.scores[model.state.activePlayer] >= model.state.scoreLimit) {
    // NOTE: If player's score is above score limit = wins the game
    gameView.displayWinner(
      model.state.activePlayer,
      undefined,
      model.state.playingVsRobot
    );
    soundsView.play(soundsView.soundVictory);
    gameView.resetAllTimers();
    //
    //
  } else if (model.state.scores[model.state.activePlayer] <= LOOSING_LIMIT) {
    // NOTE: Check if player's score is less then -50 = the opponent wins 
    model.switchActivePlayer();
    gameView.displayWinner(model.state.activePlayer);
    soundsView.play(soundsView.soundVictory);
    gameView.resetAllTimers();
    //
    //
  } else {
    // NOTE: If none of that is true

    // 7) Switch active player and set curScore to 0
    model.switchActivePlayer();

    // 7.1) Toggle player--active class
    gameView.arrToggleClass(gameView.playersEls, 'player--active');

    // 7.2) Toggle playing for active player
    gameView.arrToggleClass(gameView.playingEls);

    // 7.3) Play whoosh sound
    soundsView.play(soundsView.soundWhoosh);

    // 7.4) Reset VISIBLE player's timer
    gameView.resetTimers(gameView.playerTimer);

    // 7.5) Run INVISIBLE player timer func() for active player
    gameView.playerTimerCounting(model.state.activePlayer);
  }
};

export const controlResettingTheGame = function () {
  // 1) Reset state obj and gameModes obj
  model.resetState();
  model.resetModes();

  // 2) Reset all timers
  gameView.resetAllTimers();

  // 3) Reset Robot's rolling interval
  clearInterval(model.state.rollingSequence);

  // 4) Undisable btns
  gameView.disabledBtns(BTN_WOKRING, gameView.gameBtns);

  // 5) Reset game UI
  gameView.resetGameEls();
};

const controlLeaving = function () {
  // 1) Show modal
  leavingView.elToggleClass(leavingView.leavingModal);

  // 2) Hold gameTimer
  if (model.gameModes.run) gameView.holdGameTimer();

  // 3) Reset all timers
  gameView.resetAllTimers();

  // 4) Reset Robot's rolling interval
  if (model.state.playingVsRobot) clearInterval(model.state.rollingSequence);
};

const controlLeavingNo = function () {
  // 1) Hide modal
  leavingView.elToggleClass(leavingView.leavingModal);

  // 2) Init VISIBLE game timer
  if (model.gameModes.run) gameView.gameTimerCounting();

  // 3) Init VISIBLE player timer for actived player
  gameView.playerTimerCounting(model.state.activePlayer);

  // 4) Run INVISIBLE game timer func() argument is saved time from holdGameTimer()
  if (model.gameModes.run) controlGameTimer(gameView.gameTimerNum);

  // 5) Run INVISIBLE player timer func() the timer resets
  controlPlayerTimer();

  // 6) Run func()
  console.log(model.state.playingVsRobot);
  if (model.state.playingVsRobot) controllPlayingVsRobot();
};

const controlLeavingYes = function () {
  // 1) Hide modal
  leavingView.elToggleClass(leavingView.leavingModal);

  // 2) Display menu window and hide game window
  menuView.displayMenuWindow();

  // 3) Hide game timer
  if (model.gameModes.run) gameView.addClass(gameView.timerBox);
  
  // 4) Run reseting func()
  controlResettingTheGame();
};

const controllPlayingVsRobot = function () {
  // 1) Reset Robot's rolling interval
  clearInterval(model.state.rollingSequence);

  // 2) Disable btns
  setInterval(() => {
    // BUG Dunno why but wihnout interval it doesn't work
    if (model.state.activePlayer === ROBOT && model.state.playingVsRobot) {
      gameView.disabledBtns(BTN_DISABLED, gameView.gameBtns);
    }
  }, 0);

  model.state.rollingSequence = setInterval(() => {
    if (model.state.activePlayer === ROBOT && model.state.playingVsRobot) {
      // 1) Decide the range in which robot will hold the curScor
      model.generateDecisionRange(ROBOT_CURSCORE_MAX_LIMIT);

      // 2) If game is won stop all timers
      if (model.state.scores[ROBOT] >= model.state.scoreLimit) {
        gameView.resetAllTimers();
        clearInterval(model.state.rollingSequence);
        return;
      }

      // 3) Rolling dice
      setTimeout(() => {
        // 3.1) If active player is not Robot
        if (model.state.activePlayer !== ROBOT) return;

        // 3.2) If Robot's score is above the score limit
        if (model.state.scores[ROBOT] >= model.state.scoreLimit) return;

        // 3.3) Play sound click, do click animation on btn, run rolling dice func()
        soundsView.play(soundsView.soundClick);
        gameView.clickedAnimation(gameView.btnRoll, gameView.btnRollPhone);
        controlRollingDice();
      }, 0);

      // 4) Holding score
      // NOTE: HOLD only if curScore is greater or equal then Robot's min limit
      // NOTE: AND Robot's curScore is greater or equal then Robot's decisionRange
      // NOTE: OR Robot's curScore with his score is greater or equal game's score limit
      if (
        (model.state.curScore >= ROBOT_CURSCORE_MIN_LIMIT &&
          model.state.curScore >= model.state.decisionRange) ||
        model.state.curScore + model.state.scores[ROBOT] >=
          model.state.scoreLimit
      ) {
        // 4.1 Play sound woosh, do click animation on btn, run holding func()
        soundsView.play(soundsView.soundWhoosh);
        gameView.clickedAnimation(gameView.btnHold, gameView.btnHoldPhone);
        controlHoldingScore();
      }
    }
  }, SECS_FOR_ROBOT_CLICKING);
};

const init = function () {
  themesView.addHandlerLoad(controlThemes);
  soundsView.addHandlerLoad(controlSoundsOnOff);

  themesView.addHandlerClick(controlThemes);
  soundsView.addHandlerClick(controlSoundsOnOff);
  pauseView.addHandlerClick(controlPause, pauseView.btnPause);
  pauseView.addHandlerClick(controlUnpause, pauseView.btnUnpause);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnRoll);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnRollPhone);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnHold);
  gameView.addHandlerClick(controllPlayingVsRobot, gameView.btnHoldPhone);
  gameView.addHandlerClick(controlRollingDice, gameView.btnRoll);
  gameView.addHandlerClick(controlRollingDice, gameView.btnRollPhone);
  gameView.addHandlerClick(controlHoldingScore, gameView.btnHold);
  gameView.addHandlerClick(controlHoldingScore, gameView.btnHoldPhone);
  leavingView.addHandlerClick(controlLeaving);
  leavingView.addHandlerClick(controlLeavingNo, leavingView.btnNo);
  leavingView.addHandlerClick(controlLeavingYes, leavingView.btnYes);

  gameView.addHandlerInitGameTimer(controlGameTimer, gameView.btnRoll);
  gameView.addHandlerInitGameTimer(controlGameTimer, gameView.btnRollPhone);
  menuView.addHandlerModesSelecting(controlSetGameMode);

  // BUG: Handler returns undefined if dev tools are opened. To fix the error there is imported to gameView controlResettingTheGame()
  //gameView.handleVictoryBar(controlResettingTheGame);
};
init();
