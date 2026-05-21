// Stub for @angular/core -- used during testing only
export function Component(_opts) {
  return function (_cls) {};
}
export function EventEmitter() {
  this.handlers = [];
}
EventEmitter.prototype.emit = function (val) {
  this.handlers.forEach(function (h) {
    h(val);
  });
};
EventEmitter.prototype.subscribe = function (handler) {
  this.handlers.push(handler);
};
export function Inject(_token) {
  return function (_target, _key, _index) {};
}
export function Input() {
  return function (_target, _key) {};
}
export function Output() {
  return function (_target, _key) {};
}
export var PLATFORM_ID = 'platformId';
