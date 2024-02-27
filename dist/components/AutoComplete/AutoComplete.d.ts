import { FC, ReactElement } from "react";
import { InputProps } from "../Input/Input";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /** 输入内容联想建议 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
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
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
