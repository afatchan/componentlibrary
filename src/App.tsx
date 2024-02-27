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
import Upload, { UploadFile } from "./components/Upload/Upload";
import { action } from "@storybook/addon-actions";
import Icon from "./components/Icon";
fontawesome.library.add(faSearch);
/*
useState:在函数组件中添加状态
useEffect：指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。
 */
const defaultFileList: UploadFile[] = [
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
  return (
    <div className="App">
      <header className="App-header">
        {/* story book 可视化UI组件文档 */}
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={action("changed")}
          onRemove={action("removed")}
          name="fileName"
          multiple
          drag
        >
          <Icon icon="upload" size="5x" theme="secondary" />
          <br />
          <p>Drag file over to upload</p>
        </Upload>
        <Select style={{ width: "300px" }} multiple>
          <Option value="123" disabled index="0" />
          <Option value="456" index="0" />
          <Option value="789" index="0" />
        </Select>
        <Input
          style={{ width: "300px" }}
          placeholder="input with icon"
          icon="search"
        />
        <Input
          style={{ width: "300px" }}
          defaultValue="prepend text"
          prepend="https://"
        />
        <Input
          style={{ width: "300px" }}
          placeholder="disabled input"
          disabled
        />
        <Input style={{ width: "300px" }} defaultValue="google" append=".com" />
        <Button size="lg">123</Button>
        <Menu>
          <MenuItem>active</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>xyz</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>drop1</MenuItem>
          </SubMenu>
          <SubMenu title="opened">
            <MenuItem>opened1</MenuItem>
          </SubMenu>
        </Menu>
        <Alert description="温馨提示,你忘带口罩了" />
        <Alert description="温馨提示,你注册成功" type="success" />
        <Alert description="错误提示,你没洗手了" type="error" />
        <Alert description="提示: 我们开始吧" type="info" />
        <Alert
          type="info"
          closable
          onClose={() => {
            alert(111);
          }}
        />
        <Alert
          description="你在本网站已经注册成功,谢谢您的支持和反馈,多交流真正的技术吧"
          closable
          type="success"
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// import React, { FC, useState, useEffect } from "react";
// import axios from "axios";
// const App: FC = () => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const uploadedFile = files[0];
//       const formData = new FormData();
//       formData.append(uploadedFile.name, uploadedFile);
//       axios.post("https://jsonplaceholder.typicode.com/posts",formData,{
//         headers:{
//           'Content-Type':'multipart/form-data'
//         }
//       }).then(resp =>{
//         console.info(resp);
//       });
//     }
//   };
//   return (
//     <div className="App" style={{ marginTop: "100px", marginLeft: "100px" }}>
//       <input type="file" name="myFile" onChange={handleFileChange}></input>
//     </div>
//   );
// };
// export default App;
