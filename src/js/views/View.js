export default class View {
  body = document.querySelector('.body-container');
  gameWindow = document.querySelector('.game');
  menuWindow = document.querySelector('.menu');

  addHandlerClick(handler, btn = this.btn) {
    btn.addEventListener('click', function () {
      handler();
    });
  }

  arrToggleClass(arr, className = 'hidden') {
    arr.forEach(curEl => {
      curEl.classList.toggle(className);
    });
  }

  elToggleClass(el, className = 'hidden') {
    el.classList.toggle(className);
  }

  addClass(el, className = 'hidden') {
    el.classList.add(className);
  }

  removeClass(el, className = 'hidden') {
    el.classList.remove(className);
  }
}
