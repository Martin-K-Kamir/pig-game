import View from './View.js';
import * as model from '../model.js';

import { SELECTED } from '../config.js';

class MenuView extends View {
  _modesWindow = document.querySelector('.game-modes');
  _rulesWindow = document.querySelector('.game-rules');
  _creditsWindow = document.querySelector('.credits');

  _btnPause = document.querySelector('.btn--pause');
  _btnExit = document.querySelector('.btn--exit');

  constructor() {
    super();
    this._handleMenuWindows();
  }

  _handleMenuWindows() {
    this._body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (btn.classList.contains('btn--modes')) this._displayModesWindow();

        if (btn.classList.contains('btn--rules')) this._displayRulesWindow();

        if (btn.classList.contains('btn--credits'))
          this._displayCreditsWindow();
      }.bind(this)
    );
  }

  addHandlerSelecting(handler) {
    this._body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn--border');
        if (!btn) return;

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
    this.elToggleClass(this._gameWindow);
    this.elToggleClass(this._modesWindow);
    this.removeClass(this._btnExit);
    this.removeClass(this._btnPause);
  }

  _displayModesWindow() {
    this.elToggleClass(this._menuWindow);
    this.elToggleClass(this._modesWindow);
  }

  _displayRulesWindow() {
    this.elToggleClass(this._menuWindow);
    this.elToggleClass(this._rulesWindow);
  }

  _displayCreditsWindow() {
    this.elToggleClass(this._menuWindow);
    this.elToggleClass(this._creditsWindow);
  }
}

export default new MenuView();
