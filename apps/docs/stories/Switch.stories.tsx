import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@chekin/ui';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { label: 'Enable SMS reminders' } };
export const On: Story = { args: { label: 'Enable SMS reminders', defaultChecked: true } };
export const NoLabel: Story = {};
export const Disabled: Story = { args: { label: 'Legacy option', disabled: true } };
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-2 p-chekin-4">
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
  parameters: { layout: 'padded' },
};
