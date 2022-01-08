export const state = {};

export const initState = function (diceSides, scoreLimit) {
  state.diceSides = diceSides; // How many sides have the dice. 6 sides for Pig mode, 7 sides for Big/Hyper mode
  state.scoreLimit = scoreLimit; // Num limitations to win the game
  state.scores = [0, 0]; // Scores for player 1 and player 2/Robot
  state.curScore = 0;
  state.activePlayer = 0; // Which player is currently playing
  state.diceRoll = 0; // Num of the dice rolled
  state.percentages = 0; // To decide if there will be gaining curScore, losing score, swapping
  state.prizeChances = 0; // To decide how much player will gain/lose
  state.decisionRange = 0; // For Robot at which point he should hold
  state.rollingSequence = null; // Interval for Robot to roll dice
};

export const resetState = function () {
  state.scores = [0, 0];
  state.curScore = 0;
  state.activePlayer = 0;
  state.diceRoll = 0;
  state.percentages = 0;
  state.prizeChances = 0;
};

export const gameModes = {
  pig: false,
  big: false,
  run: false,
};

export const resetModes = function () {
  gameModes.pig = false;
  gameModes.big = false;
  gameModes.run = false;
};

const generateRandomNumber = function (maxNumber) {
  return Math.trunc(Math.random() * maxNumber) + 1;
};

export const generateDiceRoll = function (diceSides) {
  state.diceRoll = generateRandomNumber(diceSides);
};

export const generatePercentages = function (num) {
  state.percentages = generateRandomNumber(num);
};

export const generatePrizeChances = function (num) {
  state.prizeChances = generateRandomNumber(num);
};

export const generateDecisionRange = function (num) {
  state.decisionRange = generateRandomNumber(num);
};

export const switchActivePlayer = function () {
  state.curScore = 0;
  state.activePlayer = state.activePlayer === 0 ? 1 : 0; // if playerActive is 1 switch to 0 and the other way
};

export const addCurScore = function () {
  state.curScore += state.diceRoll;
};

export const addScore = function () {
  state.scores[state.activePlayer] += state.curScore;
};

export const gainCurScore = function () {
  for (let i = 1; i <= 3; i++) {
    if (state.prizeChances === i) state.curScore += i * 10;
  }
  state.diceRoll = `win-${state.prizeChances}`;
};

export const takeScore = function () {
  state.diceRoll = `lost-${state.prizeChances}`;
  for (let i = 1; i <= 3; i++) {
    if (state.prizeChances === i) state.scores[state.activePlayer] -= i * 10;
  }
  state.diceRoll = `lost-${state.prizeChances}`;
};

export const diceRollSwap = function () {
  state.diceRoll = `swap`; // just to display swap img on dice
};

export const swapScores = function () {
  [state.scores[0], state.scores[1]] = [state.scores[1], state.scores[0]];
};

export const setLocalStorage = function (itemName, val1, val2) {
  localStorage.setItem(itemName, `${val1 === val2 ? 'on' : 'off'}`);
};

export const decideWinner = function () {
  if (state.scores[0] > state.scores[1]) return (state.winnerPlayer = 0);
  if (state.scores[0] < state.scores[1]) return (state.winnerPlayer = 1);
  if (state.scores[0] === state.scores[1]) return (state.draw = true);
};
