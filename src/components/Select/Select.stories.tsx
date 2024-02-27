import type { Meta, StoryObj } from "@storybook/react";
import Option from "./Option";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const SingleSelect: Story = {
  render: (args) => (
    <Select {...args} style={{ width: "300px" }}>
      <Option value="123" disabled index="0" />
      <Option value="456" index="0" />
      <Option value="789" index="0" />
    </Select>
  ),
};

export const MultipleSelect: Story = {
  render: (args) => (
    <Select {...args} style={{ width: "300px" }} multiple>
      <Option value="123" disabled index="0" />
      <Option value="456" index="0" />
      <Option value="789" index="0" />
    </Select>
  ),
};
