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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import Icon from "../Icon/Icon";
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * import { Input } from 'componentlibrary'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    //接收参数属性
    var classes = classNames("input", (_a = {},
        _a["input-size-".concat(size)] = size,
        _a["is-disabled"] = disabled,
        _a["input-group"] = prepend || append,
        _a["input-group-append"] = !!append,
        _a["input-group-prepend"] = !!prepend,
        _a));
    //输入值的类型可以是多样的，类型定义为any
    var fixControlledValue = function (value) {
        //当值为undefined/null时返回空字符串
        if (typeof value === "undefined" || value === null) {
            return "";
        }
    };
    if ("value" in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (
    //根据属性判断是否要添加特定的节点
    _jsxs("div", __assign({ className: classes, style: style }, { children: [prepend && _jsx("div", __assign({ className: "input-group-prepend" }, { children: prepend })), icon && (_jsx("div", __assign({ className: "icon-wrapper" }, { children: _jsx(Icon, { icon: icon, title: "title-".concat(icon) }) }))), _jsx("input", __assign({ className: "input-inner", disabled: disabled }, restProps)), append && _jsx("div", __assign({ className: "input-group-append" }, { children: append }))] })));
};
export default Input;
