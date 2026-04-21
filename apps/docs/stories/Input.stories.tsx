import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@chekin/ui';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Property name',
    placeholder: 'e.g. Casa Azul',
    supportingText: 'This name is visible to guests.',
  },
  argTypes: {
    state: {
      control: 'inline-radio',
      options: ['empty', 'filled', 'autocompleted', 'error'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Empty: Story = {
  args: { state: 'empty' },
};

export const Filled: Story = {
  args: { state: 'filled', defaultValue: 'Villa Marbella' },
};

export const Autocompleted: Story = {
  args: { state: 'autocompleted', defaultValue: 'Calle Serrano 12, Madrid' },
};

export const WithError: Story = {
  args: {
    state: 'error',
    defaultValue: 'inv@lid',
    errorText: 'Please enter a valid email.',
    supportingText: undefined,
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Read-only value' },
};

export const NoLabel: Story = {
  args: { label: undefined, supportingText: undefined },
};

export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-4 p-chekin-4">
      <Input label="Empty" placeholder="Type here…" supportingText="Empty state" />
      <Input label="Filled" defaultValue="Villa Marbella" supportingText="Filled state" />
      <Input
        label="Autocompleted"
        defaultValue="Calle Serrano 12, Madrid"
        supportingText="Autocompleted by browser"
      />
      <Input
        label="Error"
        defaultValue="inv@lid"
        errorText="Please enter a valid email."
      />
      <Input label="Disabled" defaultValue="Locked" disabled />
    </div>
  ),
  parameters: { layout: 'padded' },
};
