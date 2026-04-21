import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@chekin/ui';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Forms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const AirbnbStyle: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>();
    return (
      <DateRangePicker
        label="Stay dates"
        value={value}
        onChange={setValue}
        supportingText="Two months shown side-by-side for easy range selection."
      />
    );
  },
  parameters: { layout: 'padded' },
};

export const Prefilled: Story = {
  render: () => {
    const today = new Date();
    const [value, setValue] = useState<DateRange | undefined>({
      from: today,
      to: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
    });
    return <DateRangePicker label="Stay dates" value={value} onChange={setValue} />;
  },
  parameters: { layout: 'padded' },
};
