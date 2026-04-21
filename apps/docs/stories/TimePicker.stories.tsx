import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '@chekin/ui';

const meta: Meta<typeof TimePicker> = {
  title: 'Forms/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof TimePicker>;

export const CheckInTime: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('15:00');
    return <TimePicker label="Check-in time" value={value} onChange={setValue} />;
  },
};

export const FifteenMinuteSteps: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <TimePicker label="Cleaning slot" value={value} onChange={setValue} step={15} />;
  },
};
