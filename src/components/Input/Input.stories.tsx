import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {
    //👇 Now all Input stories will be primary.
    size: "lg",
  },
};
export const PrependInput: Story = {
  args: {
    //👇 Now all Input stories will be primary.
    size: "lg",
    prepend: "https://",
  },
};
export const AppendInput: Story = {
    args: {
      //👇 Now all Input stories will be primary.
      size: "lg",
      append: ".conm",
    },
  };
