import React, { FC } from "react";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    /**当前的时间串 */
    uid: string;
    /**文件大小 */
    size: number;
    /**文件名称 */
    name: string;
    /**上传状态 */
    status?: UploadFileStatus;
    /**上传进度 */
    percent?: number;
    /**源文件 */
    raw?: File;
    /**返回信息 上传动作完成后返回 */
    response?: any;
    /**上传失败返回信息 */
    error?: any;
}
export interface UploadProps {
    /**提交动作 */
    action: string;
    /**默认上传的文件信息 */
    defaultFileList?: UploadFile[];
    /**文件上传之前的动作 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**文件上传进程 */
    onProgress?: (percentage: number, file: File) => void;
    /**文件上传成功回调 */
    onSuccess?: (data: any, file: File) => void;
    /**文件上传失败回调 */
    onError?: (err: any, file: File) => void;
    /**文件名称更改 */
    onChange?: (file: File) => void;
    /**删除上传文件 */
    onRemove?: (file: UploadFile) => void;
    /**自定义http post 请求 添加自定义 header */
    headers?: {
        [key: string]: any;
    };
    /**自定义http post 请求 添加自定义 name */
    name?: string;
    /**自定义http post 请求 添加自定义 post formData */
    data?: {
        [key: string]: any;
    };
    /**自定义http post 请求 添加发送时是否携带cookie-withCredentials  */
    withCredentials?: boolean;
    /**添加accpte 属性  */
    accept?: string;
    /**添加multiple 属性  */
    multiple?: boolean;
    /**是否可以拖拽  */
    drag?: boolean;
    children?: React.ReactNode;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
