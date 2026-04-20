import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@chekin/ui';

const meta: Meta<typeof ProgressBar> = {
  title: 'Dashboard/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { value: 42 },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = { args: { label: 'Property setup', showValue: true } };
export const Thin: Story = { args: { size: 's', value: 65 } };
export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-2 w-[320px]">
      <ProgressBar label="Brand" value={62} tone="brand" showValue />
      <ProgressBar label="Success" value={94} tone="success" showValue />
      <ProgressBar label="Warn" value={48} tone="warn" showValue />
      <ProgressBar label="Error" value={22} tone="error" showValue />
    </div>
  ),
};
