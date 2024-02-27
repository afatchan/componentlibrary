import React, { FC } from "react";
import { ThemeProps } from "../Icon/Icon";
export interface ProgressProps {
    /**进度条进程数值 */
    percent: number;
    /**高度 */
    strokeHeight?: number;
    /**显示的文字 */
    showText?: boolean;
    /**样式 */
    styles?: React.CSSProperties;
    /**进度条主题类型 */
    theme?: ThemeProps;
}
export declare const Progress: FC<ProgressProps>;
export default Progress;
