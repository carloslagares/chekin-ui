import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@chekin/ui';

const meta: Meta<typeof Tag> = {
  title: 'Dashboard/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'Needs review' },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};
export const Removable: Story = { args: { onRemove: () => alert('removed') } };
export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-chekin-1">
      <Tag>English</Tag>
      <Tag>Spanish</Tag>
      <Tag onRemove={() => {}}>Italian</Tag>
      <Tag onRemove={() => {}}>French</Tag>
    </div>
  ),
};
