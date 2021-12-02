import View from './View.js';
import menuView from './menuView.js';

class LeavingModalView extends View {
  _leavingModal = document.querySelector('.exit');
  btn = document.querySelector('.btn--exit-yes');

  constructor() {
    super();
    this._handleLeavingModal();
  }

  _handleLeavingModal() {
    this._body.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // If btn--exit or btn--exit-no were clicked
        // Toggle hidden for leavingModal
        if (
          btn.classList.contains('btn--leave') ||
          btn.classList.contains('btn--exit-no')
        ) {
          this._displayLeavingModal();
        }

        // If btn--exit-yes were clicked
        // Display menu window
        if (btn.classList.contains('btn--exit-yes')) {
          this._displayMenuWindow();
          // In the controller is handled the resetting function
        }
      }.bind(this)
    );
  }

  _displayLeavingModal() {
    this.elToggleClass(this._leavingModal);
  }

  _displayMenuWindow() {
    this.addClass(menuView._btnExit);
    this.addClass(menuView._btnPause);
    this.addClass(this._leavingModal);
    this.addClass(this._gameWindow);
    this.removeClass(this._menuWindow);
  }
}

export default new LeavingModalView();
