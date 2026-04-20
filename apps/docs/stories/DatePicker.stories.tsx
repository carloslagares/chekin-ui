import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@chekin/ui';

const meta: Meta<typeof DatePicker> = {
  title: 'Dashboard/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <DatePicker
        label="Arrival date"
        value={value}
        onChange={setValue}
        supportingText="Local property time zone."
      />
    );
  },
  parameters: { layout: 'padded' },
};

export const WithError: Story = {
  render: () => (
    <DatePicker label="Arrival date" errorText="Please pick a date." />
  ),
  parameters: { layout: 'padded' },
};
