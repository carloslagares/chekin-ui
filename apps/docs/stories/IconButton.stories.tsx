import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@chekin/ui';

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

const meta: Meta<typeof IconButton> = {
  title: 'Dashboard/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { label: 'Notifications', children: <BellIcon /> },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    shape: { control: 'inline-radio', options: ['rounded', 'circle'] },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-1">
      <IconButton label="Primary" variant="primary"><BellIcon /></IconButton>
      <IconButton label="Secondary" variant="secondary"><BellIcon /></IconButton>
      <IconButton label="Ghost" variant="ghost"><BellIcon /></IconButton>
      <IconButton label="Danger" variant="danger"><BellIcon /></IconButton>
    </div>
  ),
};
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-1">
      <IconButton label="Rounded" shape="rounded"><BellIcon /></IconButton>
      <IconButton label="Circle" shape="circle"><BellIcon /></IconButton>
    </div>
  ),
};
