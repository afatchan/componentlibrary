/* eslint-disable no-self-compare */
import React, { FC, useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import UploadList from "./UploadList";
import Dragger from "./Dragger";

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
  headers?: { [key: string]: any };
  /**自定义http post 请求 添加自定义 name */
  name?: string;
  /**自定义http post 请求 添加自定义 post formData */
  data?: { [key: string]: any };
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
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  //更新数组：文件上传进度
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  //按钮点击事件
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  //更改文件信息
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  //删除上传文件
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    //当用户存在自定义哦那Remove事件时，返回用户定义事件
    if (onRemove) {
      onRemove(file);
    }
  };
  //上传文件
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      //如有beforeupload则处理运行结果，否则直接返回
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  //提交
  const post = (file: File) => {
    //更新数组/上传进度
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      name: file.name,
      status: "ready",
      size: file.size,
      percent: 0,
      raw: file,
    };
    // setFileList([_file, ...fileList]);
    setFileList((prevList) => {
      return [_file, ...prevList];
    });

    const formData = new FormData();
    formData.append(name || "file", file);

    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / (e.total as any)) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        console.info(resp);
        updateFileList(_file, { status: "success", response: resp.data });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.info(err);
        updateFileList(_file, { status: "error", error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  return (
    <div className="upload-component">
      <div
        className="upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="file-input"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
Upload.defaultProps = {
  name: "file",
};
export default Upload;
