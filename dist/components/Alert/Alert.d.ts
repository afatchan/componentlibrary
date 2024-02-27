import React, { FC } from "react";
/**
 * 类型分析-type：成功、默认、危险、警告
 * 功能分析-：
 * 1.点击关闭整个元素消失
 * 2.支持四种主题颜色export type AlertType = "success" | "info" | "error" | "warning";
 * 3.可以包含标题和内容，解释更详尽的警告
 * 4.右侧是否显示关闭按钮可配置
 * */
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
export declare const Alert: FC<AlertProps>;
export default Alert;
