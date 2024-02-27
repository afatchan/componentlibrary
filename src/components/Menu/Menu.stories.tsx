import type { Meta, StoryObj } from "@storybook/react";
import { action } from '@storybook/addon-actions'
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;


/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const HorizontalMenu: Story = {
  render: (args) => (
    <Menu {...args} defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}}>
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
  ),
};

export const VerticalMenu: Story = {
  render: (args) => (
    <Menu mode="vertical" defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}}  {...args}>
      <MenuItem>active1</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  ),
};
