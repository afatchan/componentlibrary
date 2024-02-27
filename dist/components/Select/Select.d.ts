import { FC, CSSProperties } from "react";
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
export declare const SelectContext: import("react").Context<IselectContext>;
/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'kgd'
 * ~~~
 */
declare const Select: FC<SelectProps>;
export default Select;
