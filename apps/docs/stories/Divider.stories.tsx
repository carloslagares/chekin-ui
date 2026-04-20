import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@chekin/ui';

const meta: Meta<typeof Divider> = {
  title: 'Dashboard/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[400px]">
      <p className="text-chekin-navy">Above</p>
      <Divider className="my-chekin-2" />
      <p className="text-chekin-navy">Below</p>
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div className="w-[400px]">
      <p className="text-chekin-navy">Above</p>
      <Divider variant="dashed" className="my-chekin-2" />
      <p className="text-chekin-navy">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-2 h-10">
      <span className="text-chekin-navy">Left</span>
      <Divider orientation="vertical" />
      <span className="text-chekin-navy">Right</span>
    </div>
  ),
};
