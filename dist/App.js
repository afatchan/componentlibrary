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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import Button, { ButtonSize, ButtonType }  from "./components/Button/Button";
import Alert from "./components/Alert/Alert";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
import Button from "./components/Button";
import { Input } from "./components/Input/Input";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import fontawesome from "@fortawesome/fontawesome";
import Select from "./components/Select/Select";
import Option from "./components/Select/Option";
import Upload from "./components/Upload/Upload";
import { action } from "@storybook/addon-actions";
import Icon from "./components/Icon";
fontawesome.library.add(faSearch);
/*
useState:在函数组件中添加状态
useEffect：指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。
 */
var defaultFileList = [
    {
        uid: "123",
        size: 1234,
        name: "hello.md",
        status: "uploading",
        percent: 30,
    },
    { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
    { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false;
//   }
//   return true;
// }
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', {type: file.type})
//   return Promise.resolve(newFile)
// }
function App() {
    return (_jsx("div", __assign({ className: "App" }, { children: _jsxs("header", __assign({ className: "App-header" }, { children: [_jsxs(Upload, __assign({ action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange: action("changed"), onRemove: action("removed"), name: "fileName", multiple: true, drag: true }, { children: [_jsx(Icon, { icon: "upload", size: "5x", theme: "secondary" }), _jsx("br", {}), _jsx("p", { children: "Drag file over to upload" })] })), _jsxs(Select, __assign({ style: { width: "300px" }, multiple: true }, { children: [_jsx(Option, { value: "123", disabled: true, index: "0" }), _jsx(Option, { value: "456", index: "0" }), _jsx(Option, { value: "789", index: "0" })] })), _jsx(Input, { style: { width: "300px" }, placeholder: "input with icon", icon: "search" }), _jsx(Input, { style: { width: "300px" }, defaultValue: "prepend text", prepend: "https://" }), _jsx(Input, { style: { width: "300px" }, placeholder: "disabled input", disabled: true }), _jsx(Input, { style: { width: "300px" }, defaultValue: "google", append: ".com" }), _jsx(Button, __assign({ size: "lg" }, { children: "123" })), _jsxs(Menu, { children: [_jsx(MenuItem, { children: "active" }), _jsx(MenuItem, __assign({ disabled: true }, { children: "disabled" })), _jsx(MenuItem, { children: "xyz" }), _jsx(SubMenu, __assign({ title: "dropdown" }, { children: _jsx(MenuItem, { children: "drop1" }) })), _jsx(SubMenu, __assign({ title: "opened" }, { children: _jsx(MenuItem, { children: "opened1" }) }))] }), _jsx(Alert, { description: "\u6E29\u99A8\u63D0\u793A,\u4F60\u5FD8\u5E26\u53E3\u7F69\u4E86" }), _jsx(Alert, { description: "\u6E29\u99A8\u63D0\u793A,\u4F60\u6CE8\u518C\u6210\u529F", type: "success" }), _jsx(Alert, { description: "\u9519\u8BEF\u63D0\u793A,\u4F60\u6CA1\u6D17\u624B\u4E86", type: "error" }), _jsx(Alert, { description: "\u63D0\u793A: \u6211\u4EEC\u5F00\u59CB\u5427", type: "info" }), _jsx(Alert, { type: "info", closable: true, onClose: function () {
                        alert(111);
                    } }), _jsx(Alert, { description: "\u4F60\u5728\u672C\u7F51\u7AD9\u5DF2\u7ECF\u6CE8\u518C\u6210\u529F,\u8C22\u8C22\u60A8\u7684\u652F\u6301\u548C\u53CD\u9988,\u591A\u4EA4\u6D41\u771F\u6B63\u7684\u6280\u672F\u5427", closable: true, type: "success" }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload."] }), _jsx("a", __assign({ className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, { children: "Learn React" }))] })) })));
}
export default App;
