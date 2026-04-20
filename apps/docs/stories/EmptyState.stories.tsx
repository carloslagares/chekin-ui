import type { Meta, StoryObj } from '@storybook/react';
import { Button, EmptyState } from '@chekin/ui';

function InboxIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

const meta: Meta<typeof EmptyState> = {
  title: 'Dashboard/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    icon: <InboxIcon />,
    title: 'No bookings yet',
    description: 'When a reservation arrives, it will appear here. You can also add one manually.',
    action: <Button>Add booking</Button>,
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
