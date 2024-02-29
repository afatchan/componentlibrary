import React, { FC } from "react";
export const Welcome: FC = () => {
  return (
    <>
      <h1>欢迎来到 @afat/componentLibrary 组件库</h1>
      <p>vikingship 是为慕课网课程打造的一套教学组件库，从零到一让大家去学习</p>
      <h3>安装试试</h3>
      <code>npm install @afat/componentLibrary --save</code>
    </>
  );
};
export default Welcome;
