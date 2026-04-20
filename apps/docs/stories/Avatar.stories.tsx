import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@chekin/ui';

const meta: Meta<typeof Avatar> = {
  title: 'Dashboard/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Marta Sanz' },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 's', 'm', 'l'] } },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-2">
      <Avatar size="xs" name="Ana Lopez" />
      <Avatar size="s" name="Pablo Ruiz" />
      <Avatar size="m" name="Marta Sanz" />
      <Avatar size="l" name="Javier Ortega" />
    </div>
  ),
};
export const Stack: Story = {
  render: () => (
    <div className="flex -space-x-2">
      {['Ana Lopez', 'Pablo Ruiz', 'Marta Sanz', 'Javier Ortega', 'Clara Diaz'].map((n) => (
        <span key={n} className="ring-2 ring-white rounded-full">
          <Avatar name={n} />
        </span>
      ))}
    </div>
  ),
};
