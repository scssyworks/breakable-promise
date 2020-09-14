
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
  'use strict';

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  var classPrivateFieldGet = _classPrivateFieldGet;

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  var classPrivateFieldSet = _classPrivateFieldSet;

  var setImmediateFn = typeof setImmediate === 'function' ? setImmediate : function (cb) {
    setTimeout(cb, 0);
  };

  var isPromise_1 = isPromise;
  var _default = isPromise;

  function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  }
  isPromise_1.default = _default;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var EventEmitter = /*#__PURE__*/function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);

      defineProperty(this, "events", {});

      defineProperty(this, "listenerId", Math.round(Math.random() * 1000000000000));
    }

    createClass(EventEmitter, [{
      key: "on",
      value: function on(eventType, cb) {
        this.events[eventType] = this.events[eventType] || [];
        this.events[eventType].push(cb);
        return this;
      }
    }, {
      key: "off",
      value: function off(eventType, cb) {
        if (typeof eventType !== 'string') {
          for (var currEventType in this.events) {
            this.events[currEventType].length = 0;
          }
        } else if (typeof cb !== 'function') {
          if (this.events[eventType]) {
            this.events[eventType].length = 0;
            delete this.events[eventType];
          }
        } else if (this.events[eventType]) {
          this.events[eventType].splice(this.events[eventType].indexOf(cb), 1);

          if (this.events[eventType].length === 0) {
            delete this.events[eventType];
          }
        }

        return this;
      }
    }, {
      key: "once",
      value: function once(eventType, cb) {
        var _this = this;

        var tempCallback = function tempCallback() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          cb.apply(_this, args);
          setImmediateFn(function () {
            _this.off(eventType, tempCallback);
          });
        };

        this.on(eventType, tempCallback);
        return this;
      }
    }, {
      key: "emit",
      value: function emit(eventType) {
        var _this2 = this;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (this.events[eventType]) {
          this.events[eventType].forEach(function (fn) {
            fn.apply(_this2, args);
          });
        }
      }
    }]);

    return EventEmitter;
  }();

  var Error = /*#__PURE__*/function () {
    function Error(err) {
      classCallCheck(this, Error);

      defineProperty(this, "_error", null);

      defineProperty(this, "isCaught", false);

      // eslint-disable-next-line
      if (err != null) {
        this.error = err;
      }
    }

    createClass(Error, [{
      key: "error",
      set: function set(e) {
        this._error = e;
      },
      get: function get() {
        this.isCaught = true;
        return this._error;
      }
    }]);

    return Error;
  }();

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var PromiseStates;

  (function (PromiseStates) {
    PromiseStates[PromiseStates["PENDING"] = 0] = "PENDING";
    PromiseStates[PromiseStates["FULFILLED"] = 1] = "FULFILLED";
    PromiseStates[PromiseStates["REJECTED"] = 2] = "REJECTED";
    PromiseStates[PromiseStates["BROKEN"] = 3] = "BROKEN";
  })(PromiseStates || (PromiseStates = {}));

  var EventTypes;

  (function (EventTypes) {
    EventTypes["SUCCESS"] = "promisesuccess";
    EventTypes["FAILED"] = "promisefailed";
    EventTypes["BREAKABLE"] = "promisebreak";
  })(EventTypes || (EventTypes = {}));

  var _state = new WeakMap();

  var _isBreakable = new WeakMap();

  var _callBreak = new WeakMap();

  var _data = new WeakMap();

  var _error = new WeakMap();

  var _emitter = new WeakMap();

  var _isFullfilled = new WeakMap();

  var _isPending = new WeakMap();

  var _checkState = new WeakMap();

  var _callThen = new WeakMap();

  var _callCatch = new WeakMap();

  var BreakablePromise = /*#__PURE__*/function () {
    function BreakablePromise(_fn) {
      var _this = this;

      classCallCheck(this, BreakablePromise);

      _state.set(this, {
        writable: true,
        value: void 0
      });

      _isBreakable.set(this, {
        writable: true,
        value: false
      });

      _callBreak.set(this, {
        writable: true,
        value: null
      });

      _data.set(this, {
        writable: true,
        value: void 0
      });

      _error.set(this, {
        writable: true,
        value: void 0
      });

      _emitter.set(this, {
        writable: true,
        value: void 0
      });

      _isFullfilled.set(this, {
        writable: true,
        value: function value() {
          return classPrivateFieldGet(_this, _state) === PromiseStates.FULFILLED;
        }
      });

      _isPending.set(this, {
        writable: true,
        value: function value() {
          return classPrivateFieldGet(_this, _state) === PromiseStates.PENDING;
        }
      });

      _checkState.set(this, {
        writable: true,
        value: function value(resolve, reject, fn) {
          if (!_this.isBroken()) {
            var _result;

            if (typeof fn === 'function') {
              _result = fn(classPrivateFieldGet(_this, _isFullfilled).call(_this) ? classPrivateFieldGet(_this, _data) : classPrivateFieldGet(_this, _error).error);
            }

            if (isPromise_1(_result)) {
              _result.then(resolve, reject);

              if (!classPrivateFieldGet(_this, _isFullfilled).call(_this)) {
                _result["catch"](reject);
              }
            } else if (classPrivateFieldGet(_this, _isFullfilled).call(_this)) {
              resolve(_result);
            } else {
              reject(typeof _result !== 'undefined' ? _result : classPrivateFieldGet(_this, _error)._error);
            }
          }
        }
      });

      _callThen.set(this, {
        writable: true,
        value: function value(resolveFn, rejectFn, breakFn) {
          return new BreakablePromise(function (resolve, reject, breakPromise) {
            if (!classPrivateFieldGet(_this, _isPending).call(_this)) {
              classPrivateFieldGet(_this, _checkState).call(_this, resolve, reject, classPrivateFieldGet(_this, _isFullfilled).call(_this) ? resolveFn : rejectFn);
            } else {
              var isSuccess = function isSuccess() {
                classPrivateFieldGet(_this, _checkState).call(_this, resolve, reject, resolveFn);
              };

              classPrivateFieldGet(_this, _emitter).once(EventTypes.SUCCESS, isSuccess).once(EventTypes.FAILED, function () {
                classPrivateFieldGet(_this, _emitter).off(EventTypes.SUCCESS, isSuccess);

                classPrivateFieldGet(_this, _checkState).call(_this, resolve, reject, rejectFn);
              });
            }

            if (typeof breakPromise === 'function') {
              breakPromise(breakFn);
            }
          });
        }
      });

      _callCatch.set(this, {
        writable: true,
        value: function value(cb, breakFn) {
          return new BreakablePromise(function (resolve, reject, breakPromise) {
            if (!classPrivateFieldGet(_this, _isPending).call(_this) && !classPrivateFieldGet(_this, _isFullfilled).call(_this)) {
              classPrivateFieldGet(_this, _checkState).call(_this, resolve, reject, cb);
            } else {
              classPrivateFieldGet(_this, _emitter).once(EventTypes.FAILED, function () {
                classPrivateFieldGet(_this, _checkState).call(_this, resolve, reject, cb);
              });
            }

            if (typeof breakPromise === 'function') {
              breakPromise(breakFn);
            }
          });
        }
      });

      classPrivateFieldSet(this, _state, PromiseStates.PENDING);

      classPrivateFieldSet(this, _data, null);

      classPrivateFieldSet(this, _error, new Error());

      classPrivateFieldSet(this, _emitter, new EventEmitter());

      try {
        _fn.call(this, function (data) {
          setImmediateFn(function () {
            if (!_this.isBroken()) {
              classPrivateFieldSet(_this, _data, data);

              classPrivateFieldSet(_this, _state, PromiseStates.FULFILLED);

              classPrivateFieldGet(_this, _emitter).emit(EventTypes.SUCCESS);

              classPrivateFieldGet(_this, _emitter).off(EventTypes.BREAKABLE);
            }
          });
        }, function (error) {
          setImmediateFn(function () {
            if (!_this.isBroken()) {
              classPrivateFieldSet(_this, _error, new Error(error));

              classPrivateFieldSet(_this, _state, PromiseStates.REJECTED);

              classPrivateFieldGet(_this, _emitter).emit(EventTypes.FAILED);

              classPrivateFieldGet(_this, _emitter).off(EventTypes.BREAKABLE);
            }
          });
        }, function (cb) {
          if (typeof cb === 'function') {
            classPrivateFieldSet(_this, _isBreakable, true);

            classPrivateFieldSet(_this, _callBreak, cb);

            classPrivateFieldGet(_this, _emitter).emit(EventTypes.BREAKABLE, classPrivateFieldGet(_this, _callBreak));
          } else {
            classPrivateFieldGet(_this, _emitter).off(EventTypes.BREAKABLE);
          }
        });
      } catch (error) {
        classPrivateFieldSet(this, _state, PromiseStates.REJECTED);

        classPrivateFieldSet(this, _error, new Error(error));
      }
    }

    createClass(BreakablePromise, [{
      key: "then",
      value: function then(resolveFn, rejectFn, breakFn) {
        return classPrivateFieldGet(this, _callThen).call(this, resolveFn, rejectFn, breakFn);
      }
    }, {
      key: "catch",
      value: function _catch(rejectFn, breakFn) {
        return classPrivateFieldGet(this, _callCatch).call(this, rejectFn, breakFn);
      }
    }, {
      key: "break",
      value: function _break() {
        var _this2 = this;

        return new BreakablePromise(function (resolve, reject) {
          if (classPrivateFieldGet(_this2, _isBreakable)) {
            if (typeof classPrivateFieldGet(_this2, _callBreak) === 'function') {
              classPrivateFieldGet(_this2, _callBreak).call(_this2);

              resolve();
            } else {
              classPrivateFieldGet(_this2, _emitter).once(EventTypes.BREAKABLE, function (callBreak) {
                callBreak();
                resolve();
              });
            }
          } else {
            reject();
          }
        });
      }
    }, {
      key: "isBroken",
      value: function isBroken() {
        return classPrivateFieldGet(this, _state) === PromiseStates.BROKEN;
      }
    }], [{
      key: "resolve",
      value: function resolve(data) {
        return new BreakablePromise(function (resolve) {
          resolve(data);
        });
      }
    }, {
      key: "reject",
      value: function reject(error) {
        return new BreakablePromise(function (_, reject) {
          reject(error);
        });
      }
    }, {
      key: "all",
      value: function all(promises, breakFn) {
        return new BreakablePromise(function (resolve, reject, breakPromise) {
          try {
            (function () {
              var allPromises = toConsumableArray(promises);

              var results = [];

              var _iterator = _createForOfIteratorHelper(allPromises),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var promise = _step.value;
                  promise.then(function (result) {
                    results.push(result);
                  })["catch"](function (error) {
                    throw new Error(error);
                  });
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              resolve(results);

              if (typeof breakPromise === 'function') {
                breakPromise(breakFn);
              }
            })();
          } catch (e) {
            reject(e.message);
          }
        });
      }
    }]);

    return BreakablePromise;
  }();

  var breakablePromise = new BreakablePromise(function (resolve) {
    resolve('Promise was success');
  });

}());
//# sourceMappingURL=breakablePromise.iife.js.map
