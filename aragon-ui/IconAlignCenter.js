'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('./extends-5150c1f4.js');
var objectWithoutProperties = require('./objectWithoutProperties-5d2c0728.js');
var React = require('react');
var IconPropTypes = require('./IconPropTypes-f5b14dc5.js');
require('./_commonjsHelpers-1b94f6bc.js');
require('./slicedToArray-bb07ac16.js');
require('./unsupportedIterableToArray-d5a3ce67.js');
require('./index-c33eeeef.js');
require('./index-37353731.js');
require('./constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function IconAlignCenter(_ref) {
  var size = _ref.size,
      props = objectWithoutProperties._objectWithoutProperties(_ref, ["size"]);

  var sizeValue = IconPropTypes.useIconSize(size);
  return /*#__PURE__*/React__default['default'].createElement("svg", _extends._extends({
    width: sizeValue,
    height: sizeValue,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: 0.2,
    d: "M18.068 9.534H5.698a.699.699 0 000 1.398h12.37a.699.699 0 000-1.398zM19.602 6H3.7a.699.699 0 000 1.398h15.903a.699.699 0 100-1.398zm0 7.068H3.7a.699.699 0 000 1.398h15.903a.699.699 0 100-1.398zm-1.534 3.534H5.698a.699.699 0 000 1.398h12.37a.699.699 0 000-1.398z"
  }));
}

IconAlignCenter.propTypes = IconPropTypes.IconPropTypes;

exports.default = IconAlignCenter;
//# sourceMappingURL=IconAlignCenter.js.map
