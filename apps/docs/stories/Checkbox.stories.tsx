import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@chekin/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Send check-in reminder email' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { checked: 'indeterminate' } };
export const WithDescription: Story = {
  args: {
    label: 'Auto-send reminders',
    description: '48 hours before arrival. You can override per reservation.',
    defaultChecked: true,
  },
};
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-2 p-chekin-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
  parameters: { layout: 'padded' },
};
