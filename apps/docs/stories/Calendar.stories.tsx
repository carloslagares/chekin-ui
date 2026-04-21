import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from '@chekin/ui';

const meta: Meta<typeof Calendar> = {
  title: 'Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={value} onSelect={setValue} />;
  },
  parameters: { layout: 'padded' },
};

export const RangeSingleMonth: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>();
    return <Calendar mode="range" selected={value} onSelect={setValue} />;
  },
  parameters: { layout: 'padded' },
};

export const RangeTwoMonths: Story = {
  render: () => {
    const today = new Date();
    const [value, setValue] = useState<DateRange | undefined>({
      from: today,
      to: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
    });
    return (
      <Calendar
        mode="range"
        numberOfMonths={2}
        pagedNavigation
        selected={value}
        onSelect={setValue}
      />
    );
  },
  parameters: { layout: 'padded' },
};
