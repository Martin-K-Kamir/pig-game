import View from './View.js';
import { THEME_LIGHT, THEME_DARK } from '../config.js';

class ThemesView extends View {
  _iconOn = document.querySelector('.icon-theme--on');
  _iconOff = document.querySelector('.icon-theme--off');
  _noteOn = document.querySelector('.note-theme--on');
  _noteOff = document.querySelector('.note-theme--off');

  btn = document.querySelector('.btn--theme');
  btnEls = [this._iconOn, this._iconOff, this._noteOn, this._noteOff];

  _diceLight = document.querySelector('.dice--light');
  _diceDark = document.querySelector('.dice--dark');
  diceEls = [this._diceLight, this._diceDark];

  setTheme = THEME_DARK;
  localStorageName = 'dark-theme';
  _preferedOsTheme = window.matchMedia('(prefers-color-scheme: dark)');

  addHandlerLoad(handler) {
    window.addEventListener(
      'load',
      function () {
        if (this._preferedOsTheme.matches) handler();
        if (localStorage.getItem('dark-theme') === 'on') handler();
      }.bind(this)
    );
  }

  toggleThemes() {
    this.setTheme = this.setTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    this.body.classList.toggle('dark-theme');
  }
}

export default new ThemesView();
