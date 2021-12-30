import View from './View.js';
import * as model from '../model.js';

import { SELECTED } from '../config.js';

class MenuView extends View {
  _modesWindow = document.querySelector('.modes');
  _rulesWindow = document.querySelector('.rules');
  _creditsWindow = document.querySelector('.credits');

  btnPause = document.querySelector('.btn--pause');
  btnLeave = document.querySelector('.btn--leave');

  constructor() {
    super();
    this._handleMenuWindows();
  }

  _handleMenuWindows() {
    this.body.addEventListener(
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
    this.body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn-mode');
        if (!btn) return;

        if (btn.classList.contains('pig-mode')) model.gameModes.pig = SELECTED;
        if (btn.classList.contains('big-pig-mode'))
          model.gameModes.big = SELECTED;
        if (btn.classList.contains('run-pig-mode'))
          model.gameModes.run = SELECTED;
        console.log(model.gameModes);
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

  _displayModesWindow() {
    this.elToggleClass(this.menuWindow);
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
