import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectItem, SelectSeparator, SelectGroup, SelectLabel } from '@chekin/ui';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Property', placeholder: 'Select a property…' },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem value="casa-azul">Casa Azul · Madrid</SelectItem>
      <SelectItem value="villa-marbella">Villa Marbella · Marbella</SelectItem>
      <SelectItem value="cabo-mar">Cabo Mar · Tenerife</SelectItem>
      <SelectItem value="los-alamos">Los Álamos · Barcelona</SelectItem>
    </Select>
  ),
};

export const WithGroups: Story = {
  args: { label: 'Channel', placeholder: 'Any channel' },
  render: (args) => (
    <Select {...args}>
      <SelectGroup>
        <SelectLabel>OTA</SelectLabel>
        <SelectItem value="airbnb">Airbnb</SelectItem>
        <SelectItem value="booking">Booking.com</SelectItem>
        <SelectItem value="vrbo">VRBO</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Direct</SelectLabel>
        <SelectItem value="website">Own website</SelectItem>
        <SelectItem value="phone">Phone / walk-in</SelectItem>
      </SelectGroup>
    </Select>
  ),
};

export const WithSupportingText: Story = {
  args: {
    label: 'Time zone',
    placeholder: 'Europe/Madrid',
    supportingText: 'All timestamps in the dashboard use this zone.',
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="madrid">Europe/Madrid</SelectItem>
      <SelectItem value="london">Europe/London</SelectItem>
      <SelectItem value="paris">Europe/Paris</SelectItem>
    </Select>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Property',
    placeholder: 'Select a property…',
    errorText: 'Please pick a property before continuing.',
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="casa-azul">Casa Azul</SelectItem>
      <SelectItem value="villa-marbella">Villa Marbella</SelectItem>
    </Select>
  ),
};

export const Disabled: Story = {
  args: { label: 'Property', placeholder: 'Locked', disabled: true },
  render: (args) => (
    <Select {...args}>
      <SelectItem value="a">Option A</SelectItem>
    </Select>
  ),
};
