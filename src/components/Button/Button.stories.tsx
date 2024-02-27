import type { Meta, StoryObj } from '@storybook/react';
import  Button  from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;


export const DefaultButton: Story = {
    args: {
    //👇 Now all Button stories will be primary.
    size: 'lg',
    label: 'Default Large Button'
  },
}
export const DangerButton: Story = {
  args: {
  //👇 Now all Button stories will be primary.
  size: 'lg',
  label: 'Danger Large Button',
  btnType:'danger'
},
}