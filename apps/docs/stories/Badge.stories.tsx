import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@chekin/ui';

const meta: Meta<typeof Badge> = {
  title: 'Dashboard/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Completed', tone: 'success', appearance: 'soft' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warn', 'error'] },
    appearance: { control: 'inline-radio', options: ['soft', 'solid', 'outline'] },
    size: { control: 'inline-radio', options: ['s', 'm'] },
    dot: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const WithDot: Story = { args: { dot: true } };

export const ToneMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-2 p-chekin-4">
      {(['soft', 'solid', 'outline'] as const).map((appearance) => (
        <div key={appearance} className="flex items-center gap-chekin-1">
          <span className="w-[70px] font-sans text-[12px] text-chekin-gray-1 uppercase tracking-wide">{appearance}</span>
          <Badge tone="neutral" appearance={appearance}>Neutral</Badge>
          <Badge tone="info" appearance={appearance} dot>In progress</Badge>
          <Badge tone="success" appearance={appearance} dot>Completed</Badge>
          <Badge tone="warn" appearance={appearance} dot>Pending</Badge>
          <Badge tone="error" appearance={appearance} dot>Failed</Badge>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};
