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
import { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import Transition from "../Transition/Transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
/**
 * Input 自动联想所输入的内容。
 *
 * ~~~js
 * import { AutoCompolete } from 'componentlibrary'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSugestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, function () {
        setSugestions([]);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            setSugestions([]);
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSugestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSugestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    //箭头上下键回车
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            //回车
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            //上箭
            case 38:
                highlight(highlightIndex - 1);
                break;
            //下键
            case 40:
                highlight(highlightIndex + 1);
                break;
            //esc
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    //改变事件
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    //选择回调
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    //自动下拉事件
    var generateDropdown = function () {
        return (_jsx(Transition, __assign({ in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () {
                setSugestions([]);
            } }, { children: _jsxs("ul", __assign({ className: "suggestion-list" }, { children: [loading && (_jsx("div", __assign({ className: "suggstions-loading-icon" }, { children: _jsx(Icon, { icon: "spinner", spin: true }) }))), suggestions.map(function (item, index) {
                        var cnames = classNames("suggestion-item", {
                            "is-active": index === highlightIndex,
                        });
                        return (_jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                    })] })) })));
    };
    return (_jsxs("div", __assign({ className: "auto-complete", ref: componentRef }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)), generateDropdown()] })));
};
export default AutoComplete;
