import { FC } from "react";
import { SelectProps } from "./Select";
import { OptionProps } from "./Option";
export type ISelectComponent = FC<SelectProps> & {
    Optiin: FC<OptionProps>;
};
declare const TranSelect: ISelectComponent;
export default TranSelect;
