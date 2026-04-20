import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@chekin/ui';

const meta: Meta<typeof Textarea> = {
  title: 'Dashboard/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Property description',
    placeholder: 'Tell guests about the place…',
    supportingText: 'Shown on the guest check-in portal.',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Empty: Story = {};
export const Filled: Story = {
  args: {
    defaultValue:
      'A sunlit two-bedroom apartment in the heart of Madrid, two blocks from the Retiro.',
  },
};
export const WithError: Story = {
  args: {
    defaultValue: '',
    errorText: 'Description is required.',
    supportingText: undefined,
  },
};
export const Disabled: Story = {
  args: { defaultValue: 'Locked for editing.', disabled: true },
};
