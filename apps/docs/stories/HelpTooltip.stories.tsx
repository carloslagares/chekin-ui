import type { Meta, StoryObj } from '@storybook/react';
import { HelpTooltip } from '@chekin/ui';

const meta: Meta<typeof HelpTooltip> = {
  title: 'Overlays/HelpTooltip',
  component: HelpTooltip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HelpTooltip>;

export const Inline: Story = {
  render: () => (
    <div className="inline-flex items-center gap-[6px] font-sans text-[14px] text-chekin-navy">
      Check-in rate
      <HelpTooltip content="Percentage of bookings where the guest completed the online check-in before arrival." />
    </div>
  ),
};
