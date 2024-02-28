import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/Input";
import Icon from "../Icon/Icon";
import Transition from "../Transition/Transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 输入内容联想建议 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选择回调 */
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * Input 自动联想所输入的内容。
 *
 * ~~~js
 * import { AutoCompolete } from 'componentlibrary'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSugestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setSugestions([]);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSugestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSugestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSugestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  //箭头上下键回车
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  //选择回调
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  //自动下拉事件
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSugestions([]);
        }}
      >
        <ul className="suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="auto-complete" ref={componentRef} data-testid="auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputProps={{ "data-testid": "auto-complete-input" }}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
