import type { Meta, StoryObj } from '@storybook/react';
import  Alert from './Alert';
const meta: Meta<typeof Alert> = {

  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const InfoAlert: Story = {
  args: {
    title: 'this is an info alert title',
    type: "info",
    description: "this is an alert description.",
    closable: true,
  },
}

export const ErrorAlert: Story = {
  args: {
    title: 'this is an error alert title',
    type: "error",
    description: "this is alert description.",
    closable: true,
  },
}