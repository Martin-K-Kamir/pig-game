import View from './View.js';

class LeavingView extends View {
  leavingModal = document.querySelector('.leaving-modal');
  btn = document.querySelector('.btn--leave');
  btnYes = document.querySelector('.btn--leave-yes');
  btnNo = document.querySelector('.btn--leave-no');
}

export default new LeavingView();
