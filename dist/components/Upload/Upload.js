var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-self-compare */
import { useState, useRef } from "react";
import axios from "axios";
import UploadList from "./UploadList";
import Dragger from "./Dragger";
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove;
    var fileInput = useRef(null);
    //更新数组：文件上传进度
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    //按钮点击事件
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    //更改文件信息
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    //删除上传文件
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        //当用户存在自定义哦那Remove事件时，返回用户定义事件
        if (onRemove) {
            onRemove(file);
        }
    };
    //上传文件
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            //如有beforeupload则处理运行结果，否则直接返回
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    //提交
    var post = function (file) {
        //更新数组/上传进度
        var _file = {
            uid: Date.now() + "upload-file",
            name: file.name,
            status: "ready",
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList]);
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (resp) {
            console.info(resp);
            updateFileList(_file, { status: "success", response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
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
    return (_jsxs("div", __assign({ className: "upload-component" }, { children: [_jsxs("div", __assign({ className: "upload-input", style: { display: "inline-block" }, onClick: handleClick }, { children: [drag ? (_jsx(Dragger, __assign({ onFile: function (files) {
                            uploadFiles(files);
                        } }, { children: children }))) : (children), _jsx("input", { className: "file-input", style: { display: "none" }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })] })), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: "file",
};
export default Upload;
