import View from './View.js';
import gameView from './gameView.js';

import * as model from '../model.js';

import { SELECTED, UNSELECTED } from '../config.js';

class MenuView extends View {
  _playgroundWindow = document.querySelector('.playground');
  _modesWindow = document.querySelector('.modes');
  _rulesWindow = document.querySelector('.rules');
  _creditsWindow = document.querySelector('.credits');

  btnPause = document.querySelector('.btn--pause');
  btnLeave = document.querySelector('.btn--leave');

  constructor() {
    super();
    this._handleMenuWindow();
    this._handlePlaygroundSelecting();
  }

  _handleMenuWindow() {
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (btn.classList.contains('btn--modes'))
          this._displayPlaygroundWindow();

        if (btn.classList.contains('btn--rules')) this._displayRulesWindow();

        if (btn.classList.contains('btn--credits'))
          this._displayCreditsWindow();
      }.bind(this)
    );
  }

  _handlePlaygroundSelecting() {
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn--playground');
        if (!btn) return;

        if (btn.classList.contains('btn--offline')) {
          model.state.playingVsRobot = UNSELECTED;
        }

        if (btn.classList.contains('btn--robot')) {
          model.state.playingVsRobot = SELECTED;
          gameView.changePlayerNameForRobot(); // NOTE: Changes names for player1/2 to 'You' & 'Robot'
        }
        
        this._displayModesWindow();
      }.bind(this)
    );
  }

  addHandlerModesSelecting(handler) {
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn--mode');
        if (!btn) return;

        // NOTE: This func sets to the gameModes obj which mode is true based on btn clicked. Also handles the handler 
        if (btn.classList.contains('pig-mode')) model.gameModes.pig = SELECTED;
        if (btn.classList.contains('big-pig-mode'))
          model.gameModes.big = SELECTED;
        if (btn.classList.contains('run-pig-mode'))
          model.gameModes.run = SELECTED;
        handler();
        this._displayGameWindow();
      }.bind(this)
    );
  }

  _displayGameWindow() {
    this.elToggleClass(this.gameWindow);
    this.elToggleClass(this._modesWindow);
    this.removeClass(this.btnLeave);
    this.removeClass(this.btnPause);
  }

  _displayPlaygroundWindow() {
    this.elToggleClass(this.menuWindow);
    this.elToggleClass(this._playgroundWindow);
  }

  _displayModesWindow() {
    this.elToggleClass(this._playgroundWindow);
    this.elToggleClass(this._modesWindow);
  }

  _displayRulesWindow() {
    this.elToggleClass(this.menuWindow);
    this.elToggleClass(this._rulesWindow);
  }

  _displayCreditsWindow() {
    this.elToggleClass(this.menuWindow);
    this.elToggleClass(this._creditsWindow);
  }
}

export default new MenuView();
