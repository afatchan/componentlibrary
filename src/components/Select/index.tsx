import { FC } from "react";
import Select,{SelectProps} from "./Select";
import Option,{OptionProps} from "./Option";

export type ISelectComponent = FC<SelectProps> & {
    Optiin:FC<OptionProps>;
}
const TranSelect = Select as ISelectComponent;
TranSelect.Optiin = Option;

export default TranSelect;