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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import classNames from "classnames";
import { SelectContext } from "./Select";
import Icon from "../Icon/Icon";
var Option = function (props) {
    var value = props.value, index = props.index, label = props.label, disabled = props.disabled;
    var context = useContext(SelectContext);
    //点击事件
    var handleClick = function () {
        var tagIndex = context.tagsArray.indexOf(value);
        !context.multiple &&
            context.setInputValue(value) &&
            context.onChange &&
            context.onChange(value, context.tagsArray);
        if (context.tagsArray.length > 0 && context.multiple) {
            // 点击删除最后一项时会触发useClickOutside，用延时函数规避
            setTimeout(function () {
                tagIndex > -1
                    ? removeTag(tagIndex)
                    : context.setTagsArray(__spreadArray(__spreadArray([], context.tagsArray, true), [value], false));
            }, 100);
        }
        else {
            context.setTagsArray([value]);
        }
    };
    //再次点击选项移除所选内容
    var removeTag = function (index) {
        context.tagsArray.splice(index, 1);
        context.setTagsArray(__spreadArray([], context.tagsArray, true));
    };
    var classes = classNames("select-item", {
        "is-disabled": disabled,
        "is-selected": context.tagsArray.includes(value),
    });
    return (_jsxs("li", __assign({ className: classes, onClick: handleClick }, { children: [label ? label : value, context.tagsArray.includes(value) && (_jsx(Icon, { className: "primary", icon: "check" }))] }), index));
};
Option.displayName = "Option";
export default Option;
