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
import { useState, createContext, useEffect, Children, cloneElement, useRef, useCallback, } from "react";
import classNames from "classnames";
import Input from "../Input/Input";
import Icon from "../Icon/";
import Transition from "../Transition";
import useClickOutside from "../../hooks/useClickOutside";
export var SelectContext = createContext({
    setInputValue: function () { },
    setTagsArray: function () { },
    tagsArray: [],
    multiple: false,
    onChange: function () { },
});
/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'kgd'
 * ~~~
 */
var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, multiple = props.multiple, name = props.name, children = props.children, style = props.style, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var _a = useState(false), clickControl = _a[0], setClickControl = _a[1];
    var _b = useState(Array.isArray(defaultValue) ? defaultValue : []), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState([]), tagsArray = _c[0], setTagsArray = _c[1];
    var divRef = useRef(null);
    //点击空白处
    useClickOutside(divRef, function () {
        setClickControl(false);
        roteTransition();
        onVisibleChange && onVisibleChange(clickControl);
    });
    //点击“X”删除选中项
    var removeTag = useCallback(function (index) {
        return function () {
            var newArray = tagsArray.slice();
            newArray.splice(index, 1);
            setTagsArray(newArray);
        };
    }, [tagsArray]);
    //点击选项渲染“X”图标
    var renderTags = useCallback(function (tagsArray) {
        return tagsArray.map(function (tag, index) { return (_jsxs("span", __assign({ className: "tag" }, { children: [tag, _jsx(Icon, { icon: "times", onClick: removeTag(index) })] }), index)); });
    }, [removeTag]);
    useEffect(function () {
        renderTags(tagsArray);
    }, [tagsArray, renderTags]);
    var classes = classNames("select", {
        "menu-is-open": clickControl,
        "is-multiple": multiple,
    });
    //旋转'>'图标
    var roteTransition = function () {
        var rotateIcon = document.querySelector(".fa-angle-down");
        rotateIcon === null || rotateIcon === void 0 ? void 0 : rotateIcon.classList.toggle("rotate");
    };
    //打开下拉框
    var openMenu = function () {
        roteTransition();
        setClickControl(!clickControl);
        onVisibleChange && onVisibleChange(clickControl);
    };
    var getLiContext = {
        setInputValue: setInputValue,
        setTagsArray: setTagsArray,
        tagsArray: tagsArray,
        multiple: multiple ? multiple : false,
        onChange: onChange,
    };
    //渲染子节点/option选项
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "Option")
                return cloneElement(childElement, {
                    index: index.toString(),
                });
            else
                console.error("Warning: Select has a child which is not a Option component");
        });
    };
    return (_jsxs("div", __assign({ className: classes, ref: divRef, style: style, "data-testid": "test-select" }, { children: [_jsx("div", __assign({ className: "select-input" }, { children: _jsx(Input, { readOnly: true, placeholder: tagsArray.length > 0 ? "" : placeholder, icon: "angle-down", value: inputValue, onClick: openMenu, disabled: disabled, name: name }) })), _jsx(Transition, __assign({ animation: "zoom-in-top", in: clickControl, timeout: 200 }, { children: _jsx(SelectContext.Provider, __assign({ value: getLiContext }, { children: _jsx("ul", __assign({ className: "select-dropdown", onClick: !multiple ? openMenu : function () { } }, { children: renderChildren() })) })) })), _jsx("div", __assign({ className: "selected-tags" }, { children: renderTags(tagsArray) }))] })));
};
Select.defaultProps = {
    name: "select",
    placeholder: "请选择",
};
export default Select;
