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
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="progress-bar" style={styles}>
      <div className="progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};
Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
