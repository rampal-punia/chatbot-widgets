// Stub for @angular/core -- used during testing only
export function Component(opts) {
  return function (cls) {};
}
export function EventEmitter() {
  this.handlers = [];
}
EventEmitter.prototype.emit = function (val) {
  this.handlers.forEach(function (h) { h(val); });
};
EventEmitter.prototype.subscribe = function (handler) {
  this.handlers.push(handler);
};
export function Inject(token) {
  return function (target, key, index) {};
}
export function Input() {
  return function (target, key) {};
}
export function Output() {
  return function (target, key) {};
}
export var PLATFORM_ID = 'platformId';
