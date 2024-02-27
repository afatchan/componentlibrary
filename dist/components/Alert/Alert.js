var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import classNames from "classnames";
/**
 * 页面中最常用的的弹窗，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'componentlibrary'
 * ~~~
 */
export var Alert = function (props) {
    var _a;
    var style = props.style, className = props.className, title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable;
    //接收类型参数
    var classes = classNames("alert", className, (_a = {},
        _a["alert-".concat(type)] = type,
        _a.closable = type === "warning" ? false : closable,
        _a));
    //是否可视--默认为ture
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    //关闭弹窗
    var closeAlert = function (onClose) {
        return function () {
            setVisible(false);
            onClose();
        };
    };
    //页面
    return visible ? (_jsxs("div", __assign({ className: classes, style: __assign({ opacity: visible ? "1" : "0" }, style) }, { children: [_jsx("span", { children: title }), !!closable && (_jsx("span", __assign({ className: "closeBtn", onClick: closeAlert(onClose) }, { children: closable ? "x" : null }))), _jsx("p", __assign({ className: "alertDesc" }, { children: description ? description : null }))] }))) : null;
};
//默认属性
Alert.defaultProps = {
    type: "info",
    closable: false,
    description: "this is alert",
    title: "title",
    onClose: function () { },
};
export default Alert;
