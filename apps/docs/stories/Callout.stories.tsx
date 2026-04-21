import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from '@chekin/ui';

const meta: Meta<typeof Callout> = {
  title: 'Feedback/Callout',
  component: Callout,
  tags: ['autodocs'],
  args: {
    tone: 'info',
    title: 'Heads up',
    children: 'Legal forms differ by country. We pre-fill the required fields once the guest picks a nationality.',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'tip', 'warn', 'error', 'note'] },
  },
};
export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {};
export const ToneMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-2 p-chekin-4 max-w-[700px]">
      <Callout tone="info" title="Info">Guest fields vary by country. Required fields auto-fill.</Callout>
      <Callout tone="tip" title="Tip">Use templates to send the check-in link 48h in advance.</Callout>
      <Callout tone="warn" title="Action needed">Upload your tax ID to activate payouts.</Callout>
      <Callout tone="error" title="Error">The last sync with Booking.com failed. Retry in 15 min.</Callout>
      <Callout tone="note" title="Note">Vela can draft replies in Spanish, English and Italian.</Callout>
    </div>
  ),
  parameters: { layout: 'padded' },
};
