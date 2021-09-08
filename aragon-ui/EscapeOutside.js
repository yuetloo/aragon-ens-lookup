'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('./extends-5150c1f4.js');
var objectWithoutProperties = require('./objectWithoutProperties-5d2c0728.js');
var getPrototypeOf = require('./getPrototypeOf-e2e819f3.js');
var defineProperty = require('./defineProperty-fdbd3c46.js');
var React = require('react');
var index = require('./index-37353731.js');
var keycodes = require('./keycodes.js');
var miscellaneous = require('./miscellaneous.js');
require('./_commonjsHelpers-1b94f6bc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return getPrototypeOf._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EscapeOutside = /*#__PURE__*/function (_React$Component) {
  getPrototypeOf._inherits(EscapeOutside, _React$Component);

  var _super = _createSuper(EscapeOutside);

  function EscapeOutside() {
    var _this;

    getPrototypeOf._classCallCheck(this, EscapeOutside);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty._defineProperty(getPrototypeOf._assertThisInitialized(_this), "_element", /*#__PURE__*/React__default['default'].createRef());

    defineProperty._defineProperty(getPrototypeOf._assertThisInitialized(_this), "_document", null);

    defineProperty._defineProperty(getPrototypeOf._assertThisInitialized(_this), "handleClick", function (e) {
      var onEscapeOutside = _this.props.onEscapeOutside;

      if (!_this._element.contains(e.target)) {
        onEscapeOutside();
      }
    });

    defineProperty._defineProperty(getPrototypeOf._assertThisInitialized(_this), "handleEscape", function (e) {
      var onEscapeOutside = _this.props.onEscapeOutside;

      if (e.keyCode === keycodes.KEY_ESC) {
        onEscapeOutside();
      }
    });

    return _this;
  }

  getPrototypeOf._createClass(EscapeOutside, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var useCapture = this.props.useCapture;
      this._document = this._element.ownerDocument;

      this._document.addEventListener('keydown', this.handleEscape, useCapture);

      this._document.addEventListener('click', this.handleClick, useCapture);

      this._document.addEventListener('touchend', this.handleClick, useCapture);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var useCapture = this.props.useCapture;

      this._document.removeEventListener('keydown', this.handleEscape, useCapture);

      this._document.removeEventListener('click', this.handleClick, useCapture);

      this._document.removeEventListener('touchend', this.handleClick, useCapture);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children;
          _this$props.onEscapeOutside;
          _this$props.useCapture;
          var rest = objectWithoutProperties._objectWithoutProperties(_this$props, ["children", "onEscapeOutside", "useCapture"]);

      return /*#__PURE__*/React__default['default'].createElement("div", _extends._extends({}, rest, {
        ref: function ref(n) {
          return _this2._element = n;
        }
      }), children);
    }
  }]);

  return EscapeOutside;
}(React__default['default'].Component);

defineProperty._defineProperty(EscapeOutside, "propTypes", {
  children: index.propTypes.node.isRequired,
  onEscapeOutside: index.propTypes.func.isRequired,
  useCapture: index.propTypes.bool
});

defineProperty._defineProperty(EscapeOutside, "defaultProps", {
  onEscapeOutside: miscellaneous.noop,
  useCapture: false
});

exports.default = EscapeOutside;
//# sourceMappingURL=EscapeOutside.js.map
