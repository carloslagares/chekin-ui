import type { Meta, StoryObj } from '@storybook/react';
import { StatusCluster } from '@chekin/ui';

const meta: Meta<typeof StatusCluster> = {
  title: 'Data display/StatusCluster',
  component: StatusCluster,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof StatusCluster>;

export const CheckInPipeline: Story = {
  render: () => (
    <StatusCluster
      items={[
        { label: 'Guest data received', status: 'ok' },
        { label: 'ID verified', status: 'ok' },
        { label: 'Contract signed', status: 'pending' },
        { label: 'Police report sent', status: 'idle' },
      ]}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <StatusCluster
      items={[
        { label: 'Booking confirmed', status: 'ok' },
        { label: 'Payment captured', status: 'ok' },
        { label: 'Tax ID missing', status: 'error' },
        { label: 'Check-in email queued', status: 'idle' },
      ]}
    />
  ),
};
