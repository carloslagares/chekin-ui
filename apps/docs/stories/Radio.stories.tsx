import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@chekin/ui';

const meta: Meta<typeof RadioGroup> = {
  title: 'Dashboard/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="week">
      <Radio value="day" label="Last 24 hours" />
      <Radio value="week" label="Last 7 days" />
      <Radio value="month" label="Last 30 days" />
      <Radio value="year" label="Last year" />
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="auto">
      <Radio
        value="auto"
        label="Automatic"
        description="Send check-in link the moment a booking arrives."
      />
      <Radio
        value="scheduled"
        label="Scheduled"
        description="Send 48 hours before the guest's arrival."
      />
      <Radio
        value="manual"
        label="Manual"
        description="You'll send the link yourself from the booking detail."
      />
    </RadioGroup>
  ),
  parameters: { layout: 'padded' },
};
