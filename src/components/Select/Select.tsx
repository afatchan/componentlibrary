import {
  FC,
  useState,
  createContext,
  useEffect,
  Children,
  cloneElement,
  FunctionComponentElement,
  useRef,
  useCallback,
  CSSProperties,
} from "react";
import classNames from "classnames";

import Input from "../Input/Input";
import Icon from "../Icon/";
import Transition from "../Transition";
import { OptionProps } from "./Option";

import useClickOutside from "../../hooks/useClickOutside";

/* 
1.支持单选多选两种模式
2.input框不能手动输入，点击选项后自动填入对应value
3.多选模式下，点击可以添加一项，再点击就取消这一项，点击tag上面的X也可以删除这一项
4.注意暴露足够多的函数，如onVisibleChange在下拉菜单，显示隐藏时被调用，
还有onChange，在选值发生变化时被触发，并且参数应该有当前选择的是哪几项
5.合理设计组件结构，注意组件结构语义化
 */
export interface SelectProps {
  /**指定默认选中的条目 可以是字符串或者字符串数组 */
  defaultValue?: string | string[];
  /**选择框默认文字 */
  placeholder?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**是否可以多选 */
  multiple?: boolean;
  children?: React.ReactNode;
  /**select input的name属性 */
  name?: string;
  /** 添加指定样式 */
  style?: CSSProperties;
  /**选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /**下拉框隐藏/出现时触发 */
  onVisibleChange?: (clickControl: boolean) => void;
}

interface IselectContext {
  setInputValue: any;
  setTagsArray: any;
  tagsArray: string[];
  multiple: boolean;
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
}

export const SelectContext = createContext<IselectContext>({
  setInputValue: () => {},
  setTagsArray: () => {},
  tagsArray: [],
  multiple: false,
  onChange: () => {},
});

/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'kgd'
 * ~~~
 */

const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    disabled,
    multiple,
    name,
    children,
    style,
    onChange,
    onVisibleChange,
  } = props;

  const [clickControl, setClickControl] = useState(false);
  const [inputValue, setInputValue] = useState(Array.isArray(defaultValue) ? defaultValue : []);
  const [tagsArray, setTagsArray] = useState([]);

  const divRef = useRef<HTMLDivElement>(null);

  //点击空白处
  useClickOutside(divRef, () => {
    setClickControl(false);
    roteTransition();
    onVisibleChange && onVisibleChange(clickControl);
  });

  //点击“X”删除选中项
  const removeTag = useCallback(
    (index: number) => {
      return () => {
        const newArray = tagsArray.slice();
        newArray.splice(index, 1);
        setTagsArray(newArray);
      };
    },
    [tagsArray]
  );

  //点击选项渲染“X”图标
  const renderTags = useCallback(
    (tagsArray: string[]) => {
      return tagsArray.map((tag, index) => (
        <span key={index} className="tag">
          {tag}
          <Icon icon="times" onClick={removeTag(index)} />
        </span>
      ));
    },
    [removeTag]
  );

  useEffect(() => {
    renderTags(tagsArray);
  }, [tagsArray, renderTags]);

  const classes = classNames("select", {
    "menu-is-open": clickControl,
    "is-multiple": multiple,
  });

  //旋转'>'图标
  const roteTransition = () => {
    const rotateIcon = document.querySelector(".fa-angle-down");
    rotateIcon?.classList.toggle("rotate");
  };

  //打开下拉框
  const openMenu = () => {
    roteTransition();
    setClickControl(!clickControl);
    onVisibleChange && onVisibleChange(clickControl);
  };

  const getLiContext: IselectContext = {
    setInputValue,
    setTagsArray,
    tagsArray,
    multiple: multiple ? multiple : false,
    onChange,
  };

  //渲染子节点/option选项
  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<OptionProps>;
      const { displayName } = childElement.type;
      if (displayName === "Option")
        return cloneElement(childElement, {
          index: index.toString(),
        });
      else
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
    });
  };

  return (
    <div className={classes} ref={divRef} style={style} data-testid="test-select">
      <div className="select-input">
        <Input
          readOnly
          placeholder={tagsArray.length > 0 ? "" : placeholder}
          icon="angle-down"
          value={inputValue}
          onClick={openMenu}
          disabled={disabled}
          name={name}
        />
      </div>
      <Transition animation="zoom-in-top" in={clickControl} timeout={200}>
        <SelectContext.Provider value={getLiContext}>
          <ul
            className="select-dropdown"
            onClick={!multiple ? openMenu : () => {}}
          >
            {renderChildren()}
          </ul>
        </SelectContext.Provider>
      </Transition>
      <div className="selected-tags">{renderTags(tagsArray)}</div>
    </div>
  );
};

Select.defaultProps = {
  name: "select",
  placeholder: "请选择",
};

export default Select;
