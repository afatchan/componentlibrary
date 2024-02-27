import React, { FC, useState } from "react";
import classNames from "classnames";
/**
 * 类型分析-type：成功、默认、危险、警告
 * 功能分析-：
 * 1.点击关闭整个元素消失
 * 2.支持四种主题颜色export type AlertType = "success" | "info" | "error" | "warning";
 * 3.可以包含标题和内容，解释更详尽的警告
 * 4.右侧是否显示关闭按钮可配置
 * */

//alert类型
export type AlertType = "success" | "info" | "error" | "warning";

interface BaseAlertPorps {
  /** 设置 弹窗 标题 */
  title?: string;
  /** 设置 弹窗内容 */
  description?: string;
  /** 设置 弹窗 类型 */
  type?: AlertType;
  /** 关闭弹窗 */
  onClose?: () => void;
  /**  是否关闭 */
  closable?: boolean;
}

export type AlertProps = BaseAlertPorps & React.HTMLAttributes<HTMLDivElement>;
/**
 * 页面中最常用的的弹窗，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'componentlibrary'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const { style, className, title, description, type, onClose, closable } =
    props;
  //接收类型参数
  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
    closable: type === "warning" ? false : closable,
  });

  //是否可视--默认为ture
  const [visible, setVisible] = useState(true);
  //关闭弹窗
  const closeAlert = (onClose: Function) => {
    return () => {
      setVisible(false);
      onClose();
    };
  };

  //页面
  return visible ? (
    <div className={classes} style={{ opacity: visible ? "1" : "0", ...style }}>
      <span>{title}</span>
      {!!closable && (
        <span className="closeBtn" onClick={closeAlert(onClose as () => void)}>
          {closable ? "x" : null}
        </span>
      )}
      <p className="alertDesc">{description ? description : null}</p>
    </div>
  ) : null;
};

//默认属性
Alert.defaultProps = {
  type: "info",
  closable: false,
  description: "this is alert",
  title: "title",
  onClose: () => {},
};

export default Alert;
