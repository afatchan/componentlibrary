import type { Meta, StoryObj } from "@storybook/react";
import Welcome from "./welcome";
const meta: Meta<typeof Welcome> = {
  component: Welcome,
};
export default meta;
type Story = StoryObj<typeof Welcome>;

export const WelcomePage: Story = {
  name:'welcome',
  render: () => (
    <>
      <h1>欢迎来到 @afat/componentLibrary 组件库</h1>
      <h3>安装试试</h3>
      <code>npm install @afat/componentLibrary --save</code>
      <body>
        <h3 style={{marginTop:'30px'}}>项目内容</h3>
        <ul>
          <li>typescript with React Hooks</li>
          <li>使用 react-testing-library 完成单元测试</li>
          <li>使用 storybook 本地调试和生成文档页面</li>
          <li>使用 react-doc-gen 自动生成文档</li>
          <li>使用第三方库扩充组件-(react-fontawesome, react-transition-group)</li>
          <li>使用Sass完成组件样式</li>
        </ul>
      </body>
    </>
  ),
};
