import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./Upload";
import Icon from "../Icon";

const meta: Meta<typeof Upload> = {
  component: Upload,
};

export default meta;
type Story = StoryObj<typeof Upload>;

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
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const DefaultUpload: Story = {
  render: () => (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      name="fileName"
      multiple
      defaultFileList={defaultFileList}
    ></Upload>
  ),
};

export const DragUpload: Story = {
  render: () => (
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
  ),
};
