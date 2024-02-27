import React, { FC } from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

//继承FontAwesomeIconProps属性
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: FC<IconProps> = (props) => {
  // icon-primary
  //当theme传值时添加icon-的类
  const { className, theme, ...restProps } = props;
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
