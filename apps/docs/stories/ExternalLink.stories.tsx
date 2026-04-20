import type { Meta, StoryObj } from '@storybook/react';
import { ExternalLink } from '@chekin/ui';

const meta: Meta<typeof ExternalLink> = {
  title: 'Dashboard/ExternalLink',
  component: ExternalLink,
  tags: ['autodocs'],
  args: { href: 'https://chekin.com', children: 'Read the help article' },
};
export default meta;
type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {};
export const WithoutIcon: Story = { args: { showIcon: false } };
