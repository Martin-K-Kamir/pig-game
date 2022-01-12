// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"19Ls1":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "51cf58d705cf099e";
"use strict";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"lA0Es":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _modelJs = require("./model.js");
var _themesViewJs = require("./views/themesView.js");
var _themesViewJsDefault = parcelHelpers.interopDefault(_themesViewJs);
var _gameViewJs = require("./views/gameView.js");
var _gameViewJsDefault = parcelHelpers.interopDefault(_gameViewJs);
var _pauseViewJs = require("./views/pauseView.js");
var _pauseViewJsDefault = parcelHelpers.interopDefault(_pauseViewJs);
var _soundsViewJs = require("./views/soundsView.js");
var _soundsViewJsDefault = parcelHelpers.interopDefault(_soundsViewJs);
var _leavingViewJs = require("./views/leavingView.js");
var _leavingViewJsDefault = parcelHelpers.interopDefault(_leavingViewJs);
var _menuViewJs = require("./views/menuView.js");
var _menuViewJsDefault = parcelHelpers.interopDefault(_menuViewJs);
var _viewJs = require("./views/View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _configJs = require("./config.js");
const controlThemes = function() {
    // 1) Toggle dark/light themes classes on body and in setTheme
    _themesViewJsDefault.default.toggleThemes();
    // 2) Toggle icon and note els on btn
    _themesViewJsDefault.default.arrToggleClass(_themesViewJsDefault.default.btnEls);
    // 3) Toggle light/dark themes dices
    _themesViewJsDefault.default.arrToggleClass(_themesViewJsDefault.default.diceEls);
    // 4) Set to localStorage if dark-theme is on/off
    _modelJs.setLocalStorage(_themesViewJsDefault.default.localStorageName, _themesViewJsDefault.default.setTheme, _configJs.THEME_LIGHT);
    // 5) Update dice only if game is running
    if (_modelJs.state.gameIsRunning) _gameViewJsDefault.default.displayDice(_modelJs.state.diceRoll, _configJs.UPDATE_DICE);
};
const controlSoundsOnOff = function() {
    // 1) Toggle icon and note elements on btn
    _soundsViewJsDefault.default.arrToggleClass(_soundsViewJsDefault.default.btnEls);
    // 2) Switch volume on/off
    _soundsViewJsDefault.default.switchVolumeOnOff();
    // 3) Set to localStorage if audio-volume is on/off
    _modelJs.setLocalStorage(_soundsViewJsDefault.default.localStorageName, _soundsViewJsDefault.default.setVolume, _configJs.AUDIO_ON);
};
const controlPause = function() {
    // 1) Display paused modal
    _pauseViewJsDefault.default.elToggleClass(_pauseViewJsDefault.default.pausedModal);
    // 2) Hold gameTimer
    if (_modelJs.gameModes.run) _gameViewJsDefault.default.holdGameTimer();
    // 3) Reset all timers
    _gameViewJsDefault.default.resetAllTimers();
    // 4) Reset Robot's rolling interval
    if (_modelJs.state.playingVsRobot) clearInterval(_modelJs.state.rollingSequence);
};
const controlUnpause = function() {
    // 1) Hide paused modal
    _pauseViewJsDefault.default.elToggleClass(_pauseViewJsDefault.default.pausedModal);
    // 2) Init VISIBLE game timer
    if (_modelJs.gameModes.run) _gameViewJsDefault.default.gameTimerCounting();
    // 3) Init VISIBLE player timer for actived player
    _gameViewJsDefault.default.playerTimerCounting(_modelJs.state.activePlayer);
    // 4) Run INVISIBLE game timer func() argument is saved time from holdGameTimer()
    if (_modelJs.gameModes.run) controlGameTimer(_gameViewJsDefault.default.gameTimerNum);
    // 5) Run INVISIBLE player timer func() the timer resets
    controlPlayerTimer();
    // 6) Run func()
    if (_modelJs.state.playingVsRobot) controllPlayingVsRobot();
};
const controlSetGameMode = function() {
    // A) If pig game mode were selected
    if (_modelJs.gameModes.pig) _modelJs.initState(_configJs.PIG_DICE, _configJs.PIG_LIMIT);
    // B) If big pig game mode were selected
    if (_modelJs.gameModes.big) _modelJs.initState(_configJs.BIG_DICE, _configJs.BIG_LIMIT);
    // C) If running/hyper pig game mode were selected
    if (_modelJs.gameModes.run) {
        _modelJs.initState(_configJs.RUN_DICE, _configJs.RUN_LIMIT);
        _gameViewJsDefault.default.removeClass(_gameViewJsDefault.default.timerBox);
    }
};
const controlGameTimer = function(secs = _configJs.SECS_GAME_TIMER) {
    // NOTE: Only for running/hyper pig mode start the timer
    if (_modelJs.gameModes.run) {
        // 1) Reset all timers
        // NOTE: Solved issue when paused/unpaused game after timeout finished the timer never finished and kept going
        _gameViewJsDefault.default.resetAllTimers();
        // 2) Init VISIBLE game timer
        _gameViewJsDefault.default.gameTimerCounting();
        // 3) After the game timer is over
        const gameTimerEnded = ()=>{
            // 3.1) Decide who's the winner or if it's a draw
            _modelJs.decideWinner();
            // 3.2) Display winner popup
            _gameViewJsDefault.default.displayWinner(_modelJs.state.winnerPlayer, _modelJs.state.draw, _modelJs.state.playingVsRobot);
            // 3.3) Play victory sound
            _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundVictory);
            // 3.4) Reset all timers
            _gameViewJsDefault.default.resetAllTimers();
            // 3.5) Reset Robot's rolling interval
            if (_modelJs.state.playingVsRobot) clearInterval(_modelJs.state.rollingSequence);
        };
        // 4) Init timeout for INVISIBLE game timer / runs the func() above
        _gameViewJsDefault.default.gameTimerEnded = setTimeout(gameTimerEnded, secs * _configJs.ONE_SEC);
    }
};
const controlPlayerTimer = function() {
    // 1) Reset timers
    _gameViewJsDefault.default.resetTimers(_gameViewJsDefault.default.playerTimer, _gameViewJsDefault.default.playerTimerEnded);
    // 2) Init VISIBLE player timer
    _gameViewJsDefault.default.playerTimerCounting(_modelJs.state.activePlayer);
    // 3) After the player's timer is over
    const playerTimerEnded = ()=>{
        // 3.1) Update curScore to 0 for active player
        _gameViewJsDefault.default.updateEl(_gameViewJsDefault.default.curScoreMarkup, _configJs.LOSE_CURSCORE, _modelJs.state.activePlayer);
        // 3.1) Switch active player and set in state obj curScore to 0
        _modelJs.switchActivePlayer();
        // 3.3) Toggle player--active class
        _gameViewJsDefault.default.arrToggleClass(_gameViewJsDefault.default.playersEls, 'player--active');
        // 3.4) Toggle playing for active player
        _gameViewJsDefault.default.arrToggleClass(_gameViewJsDefault.default.playingEls);
        // 3.5) Play whoosh sound
        _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundWhoosh);
        // 3.6) Reset timers
        _gameViewJsDefault.default.resetTimers(_gameViewJsDefault.default.playerTimer, _gameViewJsDefault.default.playerTimerEnded);
        // 3.7) Init player timer again for actived player
        _gameViewJsDefault.default.playerTimerCounting(_modelJs.state.activePlayer);
        // 3.8) Init this func() again
        // NOTE: Solved issue when player were inactive, active player switch to the other player but the timer didn't start
        _gameViewJsDefault.default.playerTimerEnded = setInterval(playerTimerEnded, _configJs.SECS_FOR_INACTIVE_TIMER);
    };
    // 4) Init interval for INVISIBLE active player's timer / runs the func() above
    _gameViewJsDefault.default.playerTimerEnded = setInterval(playerTimerEnded, _configJs.SECS_FOR_INACTIVE_TIMER);
};
const controlRollingDice = function() {
    // 0) Generate dice roll
    _modelJs.generateDiceRoll(_modelJs.state.diceSides);
    // 1) NOTE: If rolled 1
    if (_modelJs.state.diceRoll === _configJs.DICE_1) {
        // 1.1) Update curScore to 0 for active player
        _gameViewJsDefault.default.updateEl(_gameViewJsDefault.default.curScoreMarkup, _configJs.LOSE_CURSCORE, _modelJs.state.activePlayer);
        // 1.1) Switch active player and set in state obj curScore to 0
        _modelJs.switchActivePlayer();
        // 1.3) Toggle player--active class
        _gameViewJsDefault.default.arrToggleClass(_gameViewJsDefault.default.playersEls, 'player--active');
        // 1.4) Toggle playing for active player
        _gameViewJsDefault.default.arrToggleClass(_gameViewJsDefault.default.playingEls);
        // 1.5) Play whoosh sound
        _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundWhoosh);
        // 1.6) Reset VISIBLE player's timer
        _gameViewJsDefault.default.resetTimers(_gameViewJsDefault.default.playerTimer);
        // 1.7 Run INVISIBLE player timer func() for active player
        _gameViewJsDefault.default.playerTimerCounting(_modelJs.state.activePlayer);
        // 1.8) If playing vs robot undisable btns to work
        if (_modelJs.state.playingVsRobot) _gameViewJsDefault.default.disabledBtns(_configJs.BTN_WOKRING, _gameViewJsDefault.default.gameBtns);
    }
    // NOTE: 2) Rolled 2 - 6
    if (_modelJs.state.diceRoll !== _configJs.DICE_1 && _modelJs.state.diceRoll !== _configJs.DICE_7) // 2.1) Add to curScore rolled number
    _modelJs.addCurScore();
    // NOTE: 3) Rolled 7
    if (_modelJs.state.diceRoll === _configJs.DICE_7) {
        // 3.1) Generate percentages and Prize chances
        _modelJs.generatePercentages(_configJs.PERCENT_100);
        _modelJs.generatePrizeChances(_configJs.PRIZE_CHANCES);
        // NOTE: GAIN SCORE
        // 3.2) If percentages were under 50%
        if (_modelJs.state.percentages <= _configJs.PERCENT_50) {
            // Gain curScore based on prize chances and play positive sound
            _modelJs.gainCurScore();
            _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundPositive);
        }
        // NOTE: LOSE SCORE
        // 3.3) If percentages were under 50% and above 95%
        if (_modelJs.state.percentages > _configJs.PERCENT_50 && _modelJs.state.percentages < _configJs.PERCENT_90) {
            // Lose from score based on prize chances, play negative sound and update score
            _modelJs.takeScore();
            _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundNegative);
            _gameViewJsDefault.default.updateEl(_gameViewJsDefault.default.scoreMarkup, _modelJs.state.scores[_modelJs.state.activePlayer], _modelJs.state.activePlayer);
        }
        // NOTE: SWAP
        // 3.4) If percentages were above 90%
        if (_modelJs.state.percentages >= _configJs.PERCENT_90) {
            // Set dice to swap img, display swap btns and play swap alert sound
            _modelJs.diceRollSwap();
            _gameViewJsDefault.default.displaySwapBtns(_configJs.SHOW_BTNS);
            _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundSwapAlert);
            // If playing vs Robot
            if (_modelJs.state.activePlayer === _configJs.ROBOT && _modelJs.state.playingVsRobot) {
                // Reset Robot's rolling interval
                clearInterval(_modelJs.state.rollingSequence);
                // Disable swap btns
                _gameViewJsDefault.default.disabledBtns(_configJs.BTN_DISABLED, _gameViewJsDefault.default.swapBtns);
                setTimeout(()=>{
                    // Decide if is it worth to swap or not for Robot
                    if (_modelJs.state.scores[_configJs.PLAYER] > _modelJs.state.scores[_configJs.ROBOT]) // NOTE: Since btnYes, btnYesPhone, btnNo, btnNoPhone are disabled there is these invisible btnYes/No to be able to do click() event
                    _gameViewJsDefault.default.btnYesInvisible.click();
                    else _gameViewJsDefault.default.btnNoInvisible.click();
                    // Run robot func()
                    controllPlayingVsRobot();
                    // Undisable swap btns
                    _gameViewJsDefault.default.disabledBtns(_configJs.BTN_WOKRING, _gameViewJsDefault.default.swapBtns);
                }, _configJs.ONE_SEC * 1.5);
            }
        }
    }
    // 4) Update curScore for active player
    _gameViewJsDefault.default.updateEl(_gameViewJsDefault.default.curScoreMarkup, _modelJs.state.curScore, _modelJs.state.activePlayer);
    // 5) Display dice
    _gameViewJsDefault.default.displayDice(_modelJs.state.diceRoll);
    // 6) Run player's timer
    controlPlayerTimer();
    // 7) Make btnHold to work. At the start of the game btnHold is disabled
    if (_gameViewJsDefault.default._clickOnce) {
        _gameViewJsDefault.default.disabledBtns(_configJs.BTN_WOKRING, _gameViewJsDefault.default.gameBtns);
        this._clickOnce = _configJs.CLICK_UNAVAILABLE;
    }
    // 8) Hide .game__start msg
    _gameViewJsDefault.default.addClass(_gameViewJsDefault.default.startMsg);
    // 9) Sets to the state obj that game is running
    _modelJs.state.gameIsRunning = true;
};
const controlHoldingScore = function() {
    // 1) Update curScore to 0 for active player
    _gameViewJsDefault.default.updateEl(_gameViewJsDefault.default.curScoreMarkup, _configJs.LOSE_CURSCORE, _modelJs.state.activePlayer);
    // 2) Add score to active player
    _modelJs.addScore();
    // 3) Update score for active player
    _gameViewJsDefault.default.updateEl(_gameViewJsDefault.default.scoreMarkup, _modelJs.state.scores[_modelJs.state.activePlayer], _modelJs.state.activePlayer);
    // 4) If playing vs robot undisable btns
    if (_modelJs.state.playingVsRobot) _gameViewJsDefault.default.disabledBtns(_configJs.BTN_WOKRING, _gameViewJsDefault.default.gameBtns);
    // IMPORTANT NOTE: Check if player won game
    if (_modelJs.state.scores[_modelJs.state.activePlayer] >= _modelJs.state.scoreLimit) {
        // NOTE: If player's score is above score limit = wins the game
        _gameViewJsDefault.default.displayWinner(_modelJs.state.activePlayer, undefined, _modelJs.state.playingVsRobot);
        _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundVictory);
        _gameViewJsDefault.default.resetAllTimers();
    //
    //
    } else if (_modelJs.state.scores[_modelJs.state.activePlayer] <= _configJs.LOOSING_LIMIT) {
        // NOTE: Check if player's score is less then -50 = the opponent wins 
        _modelJs.switchActivePlayer();
        _gameViewJsDefault.default.displayWinner(_modelJs.state.activePlayer);
        _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundVictory);
        _gameViewJsDefault.default.resetAllTimers();
    //
    //
    } else {
        // NOTE: If none of that is true
        // 7) Switch active player and set curScore to 0
        _modelJs.switchActivePlayer();
        // 7.1) Toggle player--active class
        _gameViewJsDefault.default.arrToggleClass(_gameViewJsDefault.default.playersEls, 'player--active');
        // 7.2) Toggle playing for active player
        _gameViewJsDefault.default.arrToggleClass(_gameViewJsDefault.default.playingEls);
        // 7.3) Play whoosh sound
        _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundWhoosh);
        // 7.4) Reset VISIBLE player's timer
        _gameViewJsDefault.default.resetTimers(_gameViewJsDefault.default.playerTimer);
        // 7.5) Run INVISIBLE player timer func() for active player
        _gameViewJsDefault.default.playerTimerCounting(_modelJs.state.activePlayer);
    }
};
const controlResettingTheGame = function() {
    // 1) Reset state obj and gameModes obj
    _modelJs.resetState();
    _modelJs.resetModes();
    // 2) Reset all timers
    _gameViewJsDefault.default.resetAllTimers();
    // 3) Reset Robot's rolling interval
    clearInterval(_modelJs.state.rollingSequence);
    // 4) Undisable btns
    _gameViewJsDefault.default.disabledBtns(_configJs.BTN_WOKRING, _gameViewJsDefault.default.gameBtns);
    // 5) Reset game UI
    _gameViewJsDefault.default.resetGameEls();
};
const controlLeaving = function() {
    // 1) Show modal
    _leavingViewJsDefault.default.elToggleClass(_leavingViewJsDefault.default.leavingModal);
    // 2) Hold gameTimer
    if (_modelJs.gameModes.run) _gameViewJsDefault.default.holdGameTimer();
    // 3) Reset all timers
    _gameViewJsDefault.default.resetAllTimers();
    // 4) Reset Robot's rolling interval
    if (_modelJs.state.playingVsRobot) clearInterval(_modelJs.state.rollingSequence);
};
const controlLeavingNo = function() {
    // 1) Hide modal
    _leavingViewJsDefault.default.elToggleClass(_leavingViewJsDefault.default.leavingModal);
    // 2) Init VISIBLE game timer
    if (_modelJs.gameModes.run) _gameViewJsDefault.default.gameTimerCounting();
    // 3) Init VISIBLE player timer for actived player
    _gameViewJsDefault.default.playerTimerCounting(_modelJs.state.activePlayer);
    // 4) Run INVISIBLE game timer func() argument is saved time from holdGameTimer()
    if (_modelJs.gameModes.run) controlGameTimer(_gameViewJsDefault.default.gameTimerNum);
    // 5) Run INVISIBLE player timer func() the timer resets
    controlPlayerTimer();
    // 6) Run func()
    console.log(_modelJs.state.playingVsRobot);
    if (_modelJs.state.playingVsRobot) controllPlayingVsRobot();
};
const controlLeavingYes = function() {
    // 1) Hide modal
    _leavingViewJsDefault.default.elToggleClass(_leavingViewJsDefault.default.leavingModal);
    // 2) Display menu window and hide game window
    _menuViewJsDefault.default.displayMenuWindow();
    // 3) Hide game timer
    if (_modelJs.gameModes.run) _gameViewJsDefault.default.addClass(_gameViewJsDefault.default.timerBox);
    // 4) Run reseting func()
    controlResettingTheGame();
};
const controllPlayingVsRobot = function() {
    // 1) Reset Robot's rolling interval
    clearInterval(_modelJs.state.rollingSequence);
    // 2) Disable btns
    setInterval(()=>{
        // BUG Dunno why but wihnout interval it doesn't work
        if (_modelJs.state.activePlayer === _configJs.ROBOT && _modelJs.state.playingVsRobot) _gameViewJsDefault.default.disabledBtns(_configJs.BTN_DISABLED, _gameViewJsDefault.default.gameBtns);
    }, 0);
    _modelJs.state.rollingSequence = setInterval(()=>{
        if (_modelJs.state.activePlayer === _configJs.ROBOT && _modelJs.state.playingVsRobot) {
            // 1) Decide the range in which robot will hold the curScor
            _modelJs.generateDecisionRange(_configJs.ROBOT_CURSCORE_MAX_LIMIT);
            // 2) If game is won stop all timers
            if (_modelJs.state.scores[_configJs.ROBOT] >= _modelJs.state.scoreLimit) {
                _gameViewJsDefault.default.resetAllTimers();
                clearInterval(_modelJs.state.rollingSequence);
                return;
            }
            // 3) Rolling dice
            setTimeout(()=>{
                // 3.1) If active player is not Robot
                if (_modelJs.state.activePlayer !== _configJs.ROBOT) return;
                // 3.2) If Robot's score is above the score limit
                if (_modelJs.state.scores[_configJs.ROBOT] >= _modelJs.state.scoreLimit) return;
                // 3.3) Play sound click, do click animation on btn, run rolling dice func()
                _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundClick);
                _gameViewJsDefault.default.clickedAnimation(_gameViewJsDefault.default.btnRoll, _gameViewJsDefault.default.btnRollPhone);
                controlRollingDice();
            }, 0);
            // 4) Holding score
            // NOTE: HOLD only if curScore is greater or equal then Robot's min limit
            // NOTE: AND Robot's curScore is greater or equal then Robot's decisionRange
            // NOTE: OR Robot's curScore with his score is greater or equal game's score limit
            if (_modelJs.state.curScore >= _configJs.ROBOT_CURSCORE_MIN_LIMIT && _modelJs.state.curScore >= _modelJs.state.decisionRange || _modelJs.state.curScore + _modelJs.state.scores[_configJs.ROBOT] >= _modelJs.state.scoreLimit) {
                // 4.1 Play sound woosh, do click animation on btn, run holding func()
                _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundWhoosh);
                _gameViewJsDefault.default.clickedAnimation(_gameViewJsDefault.default.btnHold, _gameViewJsDefault.default.btnHoldPhone);
                controlHoldingScore();
            }
        }
    }, _configJs.SECS_FOR_ROBOT_CLICKING);
};
const init = function() {
    _themesViewJsDefault.default.addHandlerLoad(controlThemes);
    _soundsViewJsDefault.default.addHandlerLoad(controlSoundsOnOff);
    _themesViewJsDefault.default.addHandlerClick(controlThemes);
    _soundsViewJsDefault.default.addHandlerClick(controlSoundsOnOff);
    _pauseViewJsDefault.default.addHandlerClick(controlPause, _pauseViewJsDefault.default.btnPause);
    _pauseViewJsDefault.default.addHandlerClick(controlUnpause, _pauseViewJsDefault.default.btnUnpause);
    _gameViewJsDefault.default.addHandlerClick(controllPlayingVsRobot, _gameViewJsDefault.default.btnRoll);
    _gameViewJsDefault.default.addHandlerClick(controllPlayingVsRobot, _gameViewJsDefault.default.btnRollPhone);
    _gameViewJsDefault.default.addHandlerClick(controllPlayingVsRobot, _gameViewJsDefault.default.btnHold);
    _gameViewJsDefault.default.addHandlerClick(controllPlayingVsRobot, _gameViewJsDefault.default.btnHoldPhone);
    _gameViewJsDefault.default.addHandlerClick(controlRollingDice, _gameViewJsDefault.default.btnRoll);
    _gameViewJsDefault.default.addHandlerClick(controlRollingDice, _gameViewJsDefault.default.btnRollPhone);
    _gameViewJsDefault.default.addHandlerClick(controlHoldingScore, _gameViewJsDefault.default.btnHold);
    _gameViewJsDefault.default.addHandlerClick(controlHoldingScore, _gameViewJsDefault.default.btnHoldPhone);
    _leavingViewJsDefault.default.addHandlerClick(controlLeaving);
    _leavingViewJsDefault.default.addHandlerClick(controlLeavingNo, _leavingViewJsDefault.default.btnNo);
    _leavingViewJsDefault.default.addHandlerClick(controlLeavingYes, _leavingViewJsDefault.default.btnYes);
    _gameViewJsDefault.default.addHandlerInitGameTimer(controlGameTimer, _gameViewJsDefault.default.btnRoll);
    _gameViewJsDefault.default.addHandlerInitGameTimer(controlGameTimer, _gameViewJsDefault.default.btnRollPhone);
    _menuViewJsDefault.default.addHandlerModesSelecting(controlSetGameMode);
    _gameViewJsDefault.default.handleVictoryBar(controlResettingTheGame);
};
init();

},{"./model.js":"1pVJj","./views/themesView.js":"cJeHf","./views/gameView.js":"cmULW","./views/pauseView.js":"14C3k","./views/soundsView.js":"8lTlN","./views/leavingView.js":"frMJO","./views/menuView.js":"hMfow","./views/View.js":"9dvKv","./config.js":"6V52N","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1pVJj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state
);
parcelHelpers.export(exports, "initState", ()=>initState
);
parcelHelpers.export(exports, "resetState", ()=>resetState
);
parcelHelpers.export(exports, "gameModes", ()=>gameModes
);
parcelHelpers.export(exports, "resetModes", ()=>resetModes
);
parcelHelpers.export(exports, "generateDiceRoll", ()=>generateDiceRoll
);
parcelHelpers.export(exports, "generatePercentages", ()=>generatePercentages
);
parcelHelpers.export(exports, "generatePrizeChances", ()=>generatePrizeChances
);
parcelHelpers.export(exports, "generateDecisionRange", ()=>generateDecisionRange
);
parcelHelpers.export(exports, "switchActivePlayer", ()=>switchActivePlayer
);
parcelHelpers.export(exports, "addCurScore", ()=>addCurScore
);
parcelHelpers.export(exports, "addScore", ()=>addScore
);
parcelHelpers.export(exports, "gainCurScore", ()=>gainCurScore
);
parcelHelpers.export(exports, "takeScore", ()=>takeScore
);
parcelHelpers.export(exports, "diceRollSwap", ()=>diceRollSwap
);
parcelHelpers.export(exports, "swapScores", ()=>swapScores
);
parcelHelpers.export(exports, "setLocalStorage", ()=>setLocalStorage
);
parcelHelpers.export(exports, "decideWinner", ()=>decideWinner
);
const state = {
};
const initState = function(diceSides, scoreLimit) {
    state.diceSides = diceSides; // How many sides have the dice. 6 sides for Pig mode, 7 sides for Big/Hyper mode
    state.scoreLimit = scoreLimit; // Num limitations to win the game
    state.scores = [
        0,
        0
    ]; // Scores for player 1 and player 2/Robot
    state.curScore = 0;
    state.activePlayer = 0; // Which player is currently playing
    state.diceRoll = 0; // Num of the dice rolled
    state.percentages = 0; // To decide if there will be gaining curScore, losing score, swapping
    state.prizeChances = 0; // To decide how much player will gain/lose
    state.decisionRange = 0; // For Robot at which point he should hold
    state.rollingSequence = null; // Interval for Robot to roll dice
    state.gameIsRunning = 0;
};
const resetState = function() {
    state.scores = [
        0,
        0
    ];
    state.curScore = 0;
    state.activePlayer = 0;
    state.diceRoll = 0;
    state.percentages = 0;
    state.prizeChances = 0;
    state.gameIsRunning = 0;
};
const gameModes = {
    pig: false,
    big: false,
    run: false
};
const resetModes = function() {
    gameModes.pig = false;
    gameModes.big = false;
    gameModes.run = false;
};
const generateRandomNumber = function(maxNumber) {
    return Math.trunc(Math.random() * maxNumber) + 1;
};
const generateDiceRoll = function(diceSides) {
    state.diceRoll = generateRandomNumber(diceSides);
};
const generatePercentages = function(num) {
    state.percentages = generateRandomNumber(num);
};
const generatePrizeChances = function(num) {
    state.prizeChances = generateRandomNumber(num);
};
const generateDecisionRange = function(num) {
    state.decisionRange = generateRandomNumber(num);
};
const switchActivePlayer = function() {
    state.curScore = 0;
    state.activePlayer = state.activePlayer === 0 ? 1 : 0; // if playerActive is 1 switch to 0 and the other way
};
const addCurScore = function() {
    state.curScore += state.diceRoll;
};
const addScore = function() {
    state.scores[state.activePlayer] += state.curScore;
};
const gainCurScore = function() {
    for(let i = 1; i <= 3; i++)if (state.prizeChances === i) state.curScore += i * 10;
    state.diceRoll = `win-${state.prizeChances}`;
};
const takeScore = function() {
    state.diceRoll = `lost-${state.prizeChances}`;
    for(let i = 1; i <= 3; i++)if (state.prizeChances === i) state.scores[state.activePlayer] -= i * 10;
    state.diceRoll = `lost-${state.prizeChances}`;
};
const diceRollSwap = function() {
    state.diceRoll = `swap`; // just to display swap img on dice
};
const swapScores = function() {
    [state.scores[0], state.scores[1]] = [
        state.scores[1],
        state.scores[0]
    ];
};
const setLocalStorage = function(itemName, val1, val2) {
    localStorage.setItem(itemName, `${val1 === val2 ? 'on' : 'off'}`);
};
const decideWinner = function() {
    if (state.scores[0] > state.scores[1]) return state.winnerPlayer = 0;
    if (state.scores[0] < state.scores[1]) return state.winnerPlayer = 1;
    if (state.scores[0] === state.scores[1]) return state.draw = true;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cJeHf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _configJs = require("../config.js");
class ThemesView extends _viewJsDefault.default {
    _iconOn = document.querySelector('.icon-theme--on');
    _iconOff = document.querySelector('.icon-theme--off');
    _noteOn = document.querySelector('.note-theme--on');
    _noteOff = document.querySelector('.note-theme--off');
    btn = document.querySelector('.btn--theme');
    btnEls = [
        this._iconOn,
        this._iconOff,
        this._noteOn,
        this._noteOff
    ];
    _diceLight = document.querySelector('.dice--light');
    _diceDark = document.querySelector('.dice--dark');
    diceEls = [
        this._diceLight,
        this._diceDark
    ];
    setTheme = _configJs.THEME_DARK;
    localStorageName = 'dark-theme';
    _preferedOsTheme = window.matchMedia('(prefers-color-scheme: dark)');
    // NOTE: if user has selected dark theme load dark theme or if user already clicked on btn load dark theme
    addHandlerLoad(handler) {
        window.addEventListener('load', (function() {
            if (this._preferedOsTheme.matches) handler();
            if (localStorage.getItem('dark-theme') === 'on') handler();
        }).bind(this));
    }
    // NOTE: Sets to in user local storage dark/light theme and toggle class .dark-theme on body 
    toggleThemes() {
        this.setTheme = this.setTheme === _configJs.THEME_DARK ? _configJs.THEME_LIGHT : _configJs.THEME_DARK;
        this.body.classList.toggle('dark-theme');
    }
}
exports.default = new ThemesView();

},{"./View.js":"9dvKv","../config.js":"6V52N","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9dvKv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class View {
    body = document.querySelector('.body-container');
    gameWindow = document.querySelector('.game');
    menuWindow = document.querySelector('.menu');
    addHandlerClick(handler, btn = this.btn) {
        btn.addEventListener('click', function() {
            handler();
        });
    }
    arrToggleClass(arr, className = 'hidden') {
        arr.forEach((curEl)=>{
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
exports.default = View;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6V52N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AUDIO_ON", ()=>AUDIO_ON
);
parcelHelpers.export(exports, "AUDIO_OFF", ()=>AUDIO_OFF
);
parcelHelpers.export(exports, "THEME_LIGHT", ()=>THEME_LIGHT
);
parcelHelpers.export(exports, "THEME_DARK", ()=>THEME_DARK
);
parcelHelpers.export(exports, "SHOW_BTNS", ()=>SHOW_BTNS
);
parcelHelpers.export(exports, "HIDE_BTNS", ()=>HIDE_BTNS
);
parcelHelpers.export(exports, "BTN_WOKRING", ()=>BTN_WOKRING
);
parcelHelpers.export(exports, "BTN_DISABLED", ()=>BTN_DISABLED
);
parcelHelpers.export(exports, "UPDATE_DICE", ()=>UPDATE_DICE
);
parcelHelpers.export(exports, "ROBOT_CURSCORE_MIN_LIMIT", ()=>ROBOT_CURSCORE_MIN_LIMIT
);
parcelHelpers.export(exports, "ROBOT_CURSCORE_MAX_LIMIT", ()=>ROBOT_CURSCORE_MAX_LIMIT
);
parcelHelpers.export(exports, "LOOSING_LIMIT", ()=>LOOSING_LIMIT
);
parcelHelpers.export(exports, "UNSELECTED", ()=>UNSELECTED
);
parcelHelpers.export(exports, "SELECTED", ()=>SELECTED
);
parcelHelpers.export(exports, "PIG_DICE", ()=>PIG_DICE
);
parcelHelpers.export(exports, "BIG_DICE", ()=>BIG_DICE
);
parcelHelpers.export(exports, "RUN_DICE", ()=>RUN_DICE
);
parcelHelpers.export(exports, "PIG_LIMIT", ()=>PIG_LIMIT
);
parcelHelpers.export(exports, "BIG_LIMIT", ()=>BIG_LIMIT
);
parcelHelpers.export(exports, "RUN_LIMIT", ()=>RUN_LIMIT
);
parcelHelpers.export(exports, "ONE_MILISEC", ()=>ONE_MILISEC
);
parcelHelpers.export(exports, "ONE_SEC", ()=>ONE_SEC
);
parcelHelpers.export(exports, "SIXTY_SEC", ()=>SIXTY_SEC
);
parcelHelpers.export(exports, "SECS_FOR_ROBOT_CLICKING", ()=>SECS_FOR_ROBOT_CLICKING
);
parcelHelpers.export(exports, "SECS_FOR_INACTIVE_TIMER", ()=>SECS_FOR_INACTIVE_TIMER
);
parcelHelpers.export(exports, "SECS_GAME_TIMER", ()=>SECS_GAME_TIMER
);
parcelHelpers.export(exports, "SECS_FOR_PLAYER_TIMER", ()=>SECS_FOR_PLAYER_TIMER
);
parcelHelpers.export(exports, "CLICK_AVAILABLE", ()=>CLICK_AVAILABLE
);
parcelHelpers.export(exports, "CLICK_UNAVAILABLE", ()=>CLICK_UNAVAILABLE
);
parcelHelpers.export(exports, "LOSE_CURSCORE", ()=>LOSE_CURSCORE
);
parcelHelpers.export(exports, "DICE_1", ()=>DICE_1
);
parcelHelpers.export(exports, "DICE_7", ()=>DICE_7
);
parcelHelpers.export(exports, "PERCENT_50", ()=>PERCENT_50
);
parcelHelpers.export(exports, "PERCENT_90", ()=>PERCENT_90
);
parcelHelpers.export(exports, "PERCENT_100", ()=>PERCENT_100
);
parcelHelpers.export(exports, "PRIZE_CHANCES", ()=>PRIZE_CHANCES
);
parcelHelpers.export(exports, "PLAYER", ()=>PLAYER
);
parcelHelpers.export(exports, "PLAYER_1", ()=>PLAYER_1
);
parcelHelpers.export(exports, "ROBOT", ()=>ROBOT
);
parcelHelpers.export(exports, "PLAYER_2", ()=>PLAYER_2
);
const AUDIO_ON = 0.3;
const AUDIO_OFF = 0;
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const SHOW_BTNS = true;
const HIDE_BTNS = false;
const BTN_WOKRING = false;
const BTN_DISABLED = true;
const UPDATE_DICE = true;
const ROBOT_CURSCORE_MIN_LIMIT = 10;
const ROBOT_CURSCORE_MAX_LIMIT = 25;
const LOOSING_LIMIT = -50;
const UNSELECTED = false;
const SELECTED = true;
const PIG_DICE = 6;
const BIG_DICE = 7;
const RUN_DICE = 7;
const PIG_LIMIT = 100;
const BIG_LIMIT = 200;
const RUN_LIMIT = 999999;
const ONE_MILISEC = 100;
const ONE_SEC = 1000;
const SIXTY_SEC = 60;
const SECS_FOR_ROBOT_CLICKING = 800;
const SECS_FOR_INACTIVE_TIMER = 10000;
const SECS_GAME_TIMER = 120;
const SECS_FOR_PLAYER_TIMER = 10;
const CLICK_AVAILABLE = true;
const CLICK_UNAVAILABLE = false;
const LOSE_CURSCORE = 0;
const DICE_1 = 1;
const DICE_7 = 7;
const PERCENT_50 = 50;
const PERCENT_90 = 90;
const PERCENT_100 = 100;
const PRIZE_CHANCES = 3;
const PLAYER = 0;
const PLAYER_1 = 0;
const ROBOT = 1;
const PLAYER_2 = 1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cmULW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _modelJs = require("../model.js");
var _soundsViewJs = require("./soundsView.js");
var _soundsViewJsDefault = parcelHelpers.interopDefault(_soundsViewJs);
var _menuViewJs = require("./menuView.js");
var _menuViewJsDefault = parcelHelpers.interopDefault(_menuViewJs);
var _configJs = require("../config.js");
class GameView extends _viewJsDefault.default {
    // NOTE: These timers func() works behind and are not visible. Stores what may happen after the timer is finished
    gameTimerEnded;
    playerTimerEnded;
    // NOTE: These timers func() works on front and are visible. Stores showen timer on screen
    gameTimer;
    playerTimer;
    // NOTE: Stores showen number displayed on gameTimer/playerTimer
    _playerTimerNum;
    gameTimerNum = _configJs.SECS_GAME_TIMER;
    timerBox = document.querySelector('.timer');
    _timerNums = document.querySelector('.timer__counter');
    _clickOnce = _configJs.CLICK_AVAILABLE;
    startMsg = document.querySelector('.game__start');
    _diceLight = document.querySelector('.dice--light');
    _diceDark = document.querySelector('.dice--dark');
    btnRoll = document.querySelector('.btn--roll');
    btnHold = document.querySelector('.btn--hold');
    _btnYes = document.querySelector('.btn--swap-yes');
    _btnNo = document.querySelector('.btn--swap-no');
    btnRollPhone = document.querySelector('.btn--roll-phone');
    btnHoldPhone = document.querySelector('.btn--hold-phone');
    _btnYesPhone = document.querySelector('.btn--swap-yes-phone');
    _btnNoPhone = document.querySelector('.btn--swap-no-phone');
    btnYesInvisible = document.querySelector('.btn--swap-yes-invisible');
    btnNoInvisible = document.querySelector('.btn--swap-no-invisible');
    _btnAgain = document.querySelector('.btn--again');
    btnBack = document.querySelector('.btn--back');
    gameBtns = [
        this.btnRoll,
        this.btnHold,
        this.btnRollPhone,
        this.btnHoldPhone
    ];
    swapBtns = [
        this._btnYes,
        this._btnNo,
        this._btnYesPhone,
        this._btnNoPhone
    ];
    _score0 = document.querySelector('.player__score--0');
    _score1 = document.querySelector('.player__score--1');
    scoreMarkup = '.player__score';
    _curScoreBox0 = document.querySelector('.current-box--0');
    _curScoreBox1 = document.querySelector('.current-box--1');
    _curScoreNum0 = document.querySelector('.current-box__score--0');
    _curScoreNum1 = document.querySelector('.current-box__score--1');
    curScoreMarkup = '.current-box__score';
    _playerName0 = document.querySelector('.player__name--0');
    _playerName1 = document.querySelector('.player__name--1');
    _player0 = document.querySelector('.player--0');
    _player1 = document.querySelector('.player--1');
    playersEls = [
        this._player0,
        this._player1
    ];
    _playing0 = document.querySelector('.player__playing--0');
    _playing1 = document.querySelector('.player__playing--1');
    playingEls = [
        this._playing0,
        this._playing1
    ];
    _winner0 = document.querySelector('.player__winner--0');
    _winner1 = document.querySelector('.player__winner--1');
    _victoryBar = document.querySelector('.victory-bar');
    _victoryHeading = document.querySelector('.victory-bar__heading');
    _victoryHeadingStart = document.querySelector('.victory-bar__heading--start');
    _victoryHeadingEnd = document.querySelector('.victory-bar__heading--end');
    _victoryHeadingMain = document.querySelector('.victory-bar__heading--main');
    constructor(){
        super();
        this._handleSwapping();
        this.handleVictoryBar();
    }
    _handleSwapping() {
        this.body.addEventListener('click', (function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            // NOTE: if click happend on btn--swap-yes, call for swapping func(), hide btns, update in state obj scores, play sound
            if (btn.classList.contains('btn--swap-yes') || btn.classList.contains('btn--swap-yes-phone') || btn.classList.contains('btn--swap-yes-invisible')) {
                _modelJs.swapScores();
                this._updateSwappedScores(..._modelJs.state.scores);
                this.displaySwapBtns(_configJs.HIDE_BTNS);
                _soundsViewJsDefault.default.play(_soundsViewJsDefault.default.soundSwapped);
            }
            // NOTE: if click happend on btn--swap-no, hide btns
            if (btn.classList.contains('btn--swap-no') || btn.classList.contains('btn--swap-no-phone') || btn.classList.contains('btn--swap-no-invisible')) this.displaySwapBtns(_configJs.HIDE_BTNS);
        }).bind(this));
    }
    handleVictoryBar(handler) {
        this.body.addEventListener('click', (function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            // NOTE: if click happend on btn--again, reset all game els, reset state obj, game mode stays as it is selected
            if (btn.classList.contains('btn--again')) {
                this.resetGameEls();
                _modelJs.resetState();
            }
            // NOTE: if click happend on btn--back, display menu, hide timer, run handler()
            if (btn.classList.contains('btn--back')) {
                _menuViewJsDefault.default.displayMenuWindow();
                this.addClass(this.timerBox);
                handler(); // BUG: Opened dev tools in chrome returns undefined
            }
        }).bind(this));
    }
    addHandlerInitGameTimer(handler, btn) {
        // NOTE: Only for hyper/runnig pig mode. On click btn(btnRoll) run handler() only once, after click disable that click, so the gameTimer won't reset every time there is click on btnRoll
        btn.addEventListener('click', (function() {
            if (this._clickOnce) {
                handler();
                this._clickOnce = _configJs.CLICK_UNAVAILABLE;
            }
        }).bind(this));
    }
    resetGameEls() {
        this.removeClass(this._victoryBar, 'bounce-in--first');
        this.addClass(this._victoryBar, 'bounce-out--first');
        this._clickOnce = _configJs.CLICK_AVAILABLE;
        this.btnRoll.disabled = _configJs.BTN_WOKRING;
        this.btnHold.disabled = _configJs.BTN_DISABLED;
        this.btnRollPhone.disabled = _configJs.BTN_WOKRING;
        this.btnHoldPhone.disabled = _configJs.BTN_DISABLED;
        this._playing0.textContent = '';
        this._curScoreNum0.textContent = 0;
        this._curScoreNum1.textContent = 0;
        this._score0.textContent = 0;
        this._score1.textContent = 0;
        this._clickOnce = _configJs.CLICK_AVAILABLE;
        this.gameTimerNum = _configJs.SECS_GAME_TIMER;
        this._playerTimerNum = _configJs.SECS_FOR_PLAYER_TIMER;
        this._timerNums.textContent = '04:00';
        this._playerName0.textContent = 'Player 1';
        this._playerName1.textContent = 'Player 2';
        this.removeClass(this.startMsg);
        this.removeClass(this._playing0);
        this.removeClass(this._curScoreBox0);
        this.removeClass(this._curScoreBox1);
        this.removeClass(this._player0, 'player--winner');
        this.removeClass(this._player1, 'player--winner');
        this.removeClass(this._player1, 'player--active');
        this.addClass(this._playing1);
        this.addClass(this._winner0);
        this.addClass(this._winner1);
        this.addClass(this._player0, 'player--active');
        this.addClass(this._diceLight, 'opacity-zero');
        this.addClass(this._victoryBar, 'opacity-zero');
        setTimeout(()=>{
            this.removeClass(this._victoryBar, 'bounce-out--first');
            this.removeClass(this._victoryBar, 'opacity-zero');
            this.addClass(this._victoryBar);
        }, _configJs.ONE_MILISEC * 3);
    }
    _renderDiceDark(diceRoll) {
        this.removeClass(this._diceDark, 'opacity-zero');
        this._diceDark.src = `dice-dark-${diceRoll}.png`;
    }
    _renderDiceLight(diceRoll) {
        this.removeClass(this._diceLight, 'opacity-zero');
        this._diceLight.src = `dice-light-${diceRoll}.png`;
    }
    displayDice(diceRoll, updateDice) {
        if (this.body.classList.contains('dark-theme')) this._renderDiceDark(diceRoll);
        else if (updateDice) {
            this._renderDiceDark(diceRoll);
            this._renderDiceLight(diceRoll);
        } else this._renderDiceLight(diceRoll);
    }
    displaySwapBtns(isAllowed) {
        if (isAllowed) {
            this.disabledBtns(_configJs.BTN_DISABLED, this.gameBtns);
            this.addClass(this.btnRollPhone);
            this.addClass(this.btnHoldPhone);
            this.removeClass(this._btnYes);
            this.removeClass(this._btnNo);
            this.addClass(this._btnYes, 'bounce-in--first');
            this.addClass(this._btnNo, 'bounce-in--second');
            this.removeClass(this._btnYesPhone);
            this.removeClass(this._btnNoPhone);
            this.addClass(this._btnYesPhone, 'bounce-in--first');
            this.addClass(this._btnNoPhone, 'bounce-in--second');
        } else {
            this.disabledBtns(_configJs.BTN_WOKRING, this.gameBtns);
            this.removeClass(this._btnYes, 'bounce-in--first');
            this.removeClass(this._btnNo, 'bounce-in--second');
            this.addClass(this._btnYes, 'bounce-out--first');
            this.addClass(this._btnNo, 'bounce-out--second');
            this.removeClass(this._btnYesPhone, 'bounce-in--first');
            this.removeClass(this._btnNoPhone, 'bounce-in--second');
            this.addClass(this._btnYesPhone, 'bounce-out--first');
            this.addClass(this._btnNoPhone, 'bounce-out--second');
            setTimeout(()=>{
                this.removeClass(this.btnRollPhone);
                this.removeClass(this.btnHoldPhone);
                this.addClass(this._btnYes);
                this.addClass(this._btnNo);
                this.removeClass(this._btnYes, 'bounce-out--first');
                this.removeClass(this._btnNo, 'bounce-out--second');
                this.addClass(this._btnYesPhone);
                this.addClass(this._btnNoPhone);
                this.removeClass(this._btnYesPhone, 'bounce-out--first');
                this.removeClass(this._btnNoPhone, 'bounce-out--second');
            }, _configJs.ONE_MILISEC * 7);
        }
    }
    displayWinner(activePlayer, draw, playingVsRobot) {
        // Resets html content
        this._victoryHeadingStart.textContent = '';
        this._victoryHeadingMain.textContent = '';
        this._victoryHeadingEnd.textContent = '';
        // 1) For playing 2 players
        if (!draw && !playingVsRobot) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player__winner--${activePlayer}`).classList.remove('hidden');
            this._victoryHeadingStart.textContent = `Congratulations`;
            this._victoryHeadingMain.textContent = `Player ${activePlayer + 1}`;
            this._victoryHeadingEnd.textContent = `you won!`;
        }
        // 2) For hyper/running pig mode after gameTimerEnded if it's a draw
        if (draw || playingVsRobot) {
            this._victoryHeadingStart.textContent = `No one wins,`;
            this._victoryHeadingMain.textContent = `it's a draw :(`;
        }
        // 3) For playing vs Robot
        if (!draw && playingVsRobot) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player__winner--${activePlayer}`).classList.remove('hidden');
            if (_modelJs.state.scores[_configJs.PLAYER] > _modelJs.state.scores[_configJs.ROBOT]) {
                this._victoryHeadingStart.textContent = `Congratulations`;
                this._victoryHeadingMain.textContent = `you won!`;
            } else {
                this._victoryHeadingStart.textContent = `You lost!`;
                this._victoryHeadingMain.textContent = `Good luck`;
                this._victoryHeadingEnd.textContent = ` next time :)`;
            }
        }
        // Manipulate these els
        this.addClass(this._playing0);
        this.addClass(this._playing1);
        this.addClass(this._diceLight, 'opacity-zero');
        this.addClass(this._diceLight, 'opacity-zero');
        this.addClass(this._victoryBar, 'bounce-in--first');
        this.removeClass(this._victoryBar);
        this.removeClass(this._player0, 'player--active');
        this.removeClass(this._player1, 'player--active');
    }
    changePlayerNameForRobot() {
        this._playerName0.textContent = 'You';
        this._playerName1.textContent = 'Robot';
    }
    updateEl(el, data, player) {
        document.querySelector(`${el}--${player}`).textContent = data;
    }
    _updateSwappedScores(scorePlayer0, scorePlayer1) {
        this._score0.textContent = scorePlayer0;
        this._score1.textContent = scorePlayer1;
    }
    playerTimerCounting(activePlayer) {
        this._playerTimerNum = 10; // 10 secs
        const updatePlayerTimer = ()=>{
            document.querySelector(`.player__playing--${activePlayer}`).textContent = `playing for ${this._playerTimerNum} sec`;
            this._playerTimerNum--;
        };
        updatePlayerTimer(); // Immediately run the func() so there is no delay
        this.playerTimer = setInterval(updatePlayerTimer, _configJs.ONE_SEC);
    }
    gameTimerCounting() {
        const updateGameTimer = ()=>{
            const mins = Math.floor(this.gameTimerNum / 60);
            let secs = this.gameTimerNum % 60;
            secs = secs < 10 ? '0' + secs : secs;
            this._timerNums.textContent = `0${mins}:${secs}`;
            this.gameTimerNum--;
        };
        updateGameTimer(); // Immediately run the func() so there is no delay
        this.gameTimer = setInterval(updateGameTimer, _configJs.ONE_SEC);
    }
    holdGameTimer() {
        // 1) Stores the printed number in html
        const savedTime = this._timerNums.innerHTML;
        // 2) Slices the mins and secs
        const mins = savedTime.slice(1, 2);
        const secs = savedTime.slice(3, 5);
        // 3) Stores secs as number
        // Ex: 2(mins) * 60(secs) + 41(secs) = 120(secs) + 41(secs) = 161 secs = 02:41
        this.gameTimerNum = mins * _configJs.SIXTY_SEC + +secs;
    }
    resetAllTimers() {
        clearInterval(this.gameTimer);
        clearInterval(this.playerTimer);
        clearInterval(this.playerTimerEnded);
        clearTimeout(this.gameTimerEnded);
    }
    resetTimers(...timers) {
        timers.forEach((curTimer)=>clearInterval(curTimer)
        );
    }
    disabledBtns(isDisabled, btnsArr) {
        btnsArr.forEach((curBtn)=>curBtn.disabled = isDisabled
        );
    }
    // For Robot when he rolls dice so there is an animation on btnRoll
    clickedAnimation(...btns) {
        btns.forEach((curBtn)=>{
            this.elToggleClass(curBtn, 'clicked');
            setTimeout(()=>this.elToggleClass(curBtn, 'clicked')
            , _configJs.ONE_MILISEC);
        });
    }
}
exports.default = new GameView();

},{"./View.js":"9dvKv","../model.js":"1pVJj","./soundsView.js":"8lTlN","./menuView.js":"hMfow","../config.js":"6V52N","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8lTlN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _configJs = require("../config.js");
class SoundsView extends _viewJsDefault.default {
    _iconOn = document.querySelector('.icon-sounds--on');
    _iconOff = document.querySelector('.icon-sounds--off');
    _noteOn = document.querySelector('.note-sounds--on');
    _noteOff = document.querySelector('.note-sounds--off');
    btn = document.querySelector('.btn--sounds');
    btnEls = [
        this._iconOn,
        this._iconOff,
        this._noteOn,
        this._noteOff
    ];
    soundClick = document.querySelector('.audio-click');
    soundWhoosh = document.querySelector('.audio-whoosh');
    soundPositive = document.querySelector('.audio-positive');
    soundNegative = document.querySelector('.audio-negative');
    soundSwapAlert = document.querySelector('.audio-swap-alert');
    soundSwapped = document.querySelector('.audio-swapped');
    soundVictory = document.querySelector('.audio-victory');
    setVolume = _configJs.AUDIO_ON;
    localStorageName = 'audio-volume';
    constructor(){
        super();
        this._handleClickingSounds();
    }
    _handleClickingSounds() {
        this.body.addEventListener('click', (function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            // NOTE: On every btn with class .click-sound play sound click
            if (btn.classList.contains('click-sound')) return this.play(this.soundClick);
        }).bind(this));
    }
    // NOTE: if user selected audio off call for handler() func. Which shuts all sounds. If not true sounds will work
    addHandlerLoad(handler) {
        window.addEventListener('load', function() {
            if (localStorage.getItem('audio-volume') === 'off') handler();
        });
    }
    play(soundType) {
        soundType.volume = this.setVolume;
        soundType.play();
    }
    switchVolumeOnOff() {
        this.setVolume = this.setVolume === _configJs.AUDIO_ON ? _configJs.AUDIO_OFF : _configJs.AUDIO_ON;
    }
}
exports.default = new SoundsView();

},{"./View.js":"9dvKv","../config.js":"6V52N","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hMfow":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _gameViewJs = require("./gameView.js");
var _gameViewJsDefault = parcelHelpers.interopDefault(_gameViewJs);
var _modelJs = require("../model.js");
var _configJs = require("../config.js");
class MenuView extends _viewJsDefault.default {
    _playgroundWindow = document.querySelector('.playground');
    _modesWindow = document.querySelector('.modes');
    _rulesWindow = document.querySelector('.rules');
    _creditsWindow = document.querySelector('.credits');
    btnPause = document.querySelector('.btn--pause');
    btnLeave = document.querySelector('.btn--leave');
    constructor(){
        super();
        this._handleMenuWindow();
        this._handlePlaygroundSelecting();
    }
    _handleMenuWindow() {
        this.body.addEventListener('click', (function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            if (btn.classList.contains('btn--modes')) this._displayPlaygroundWindow();
            if (btn.classList.contains('btn--rules')) this._displayRulesWindow();
            if (btn.classList.contains('btn--credits')) this._displayCreditsWindow();
        }).bind(this));
    }
    _handlePlaygroundSelecting() {
        this.body.addEventListener('click', (function(e) {
            const btn = e.target.closest('.btn--playground');
            if (!btn) return;
            if (btn.classList.contains('btn--offline')) _modelJs.state.playingVsRobot = _configJs.UNSELECTED;
            if (btn.classList.contains('btn--robot')) {
                _modelJs.state.playingVsRobot = _configJs.SELECTED;
                _gameViewJsDefault.default.changePlayerNameForRobot(); // NOTE: Changes names for player1/2 to 'You' & 'Robot'
            }
            this._displayModesWindow();
        }).bind(this));
    }
    addHandlerModesSelecting(handler) {
        this.body.addEventListener('click', (function(e) {
            const btn = e.target.closest('.btn--mode');
            if (!btn) return;
            // NOTE: This func sets to the gameModes obj which mode is true based on btn clicked. Also handles the handler
            if (btn.classList.contains('pig-mode')) _modelJs.gameModes.pig = _configJs.SELECTED;
            if (btn.classList.contains('big-pig-mode')) _modelJs.gameModes.big = _configJs.SELECTED;
            if (btn.classList.contains('run-pig-mode')) _modelJs.gameModes.run = _configJs.SELECTED;
            handler();
            this._displayGameWindow();
        }).bind(this));
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
    displayMenuWindow() {
        this.removeClass(this.menuWindow);
        this.addClass(this.btnLeave);
        this.addClass(this.btnPause);
        this.addClass(_gameViewJsDefault.default.gameWindow);
    }
}
exports.default = new MenuView();

},{"./View.js":"9dvKv","./gameView.js":"cmULW","../model.js":"1pVJj","../config.js":"6V52N","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"14C3k":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class PauseView extends _viewJsDefault.default {
    btnPause = document.querySelector('.btn--pause');
    btnUnpause = document.querySelector('.btn--unpause');
    pausedModal = document.querySelector('.paused-modal');
}
exports.default = new PauseView();

},{"./View.js":"9dvKv","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"frMJO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class LeavingView extends _viewJsDefault.default {
    leavingModal = document.querySelector('.leaving-modal');
    btn = document.querySelector('.btn--leave');
    btnYes = document.querySelector('.btn--leave-yes');
    btnNo = document.querySelector('.btn--leave-no');
}
exports.default = new LeavingView();

},{"./View.js":"9dvKv","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["19Ls1","lA0Es"], "lA0Es", "parcelRequire0426")

//# sourceMappingURL=index.05cf099e.js.map
