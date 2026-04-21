import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from '@chekin/ui';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Properties</BreadcrumbItem>
      <BreadcrumbItem href="#">Casa Azul</BreadcrumbItem>
      <BreadcrumbItem current>Legal</BreadcrumbItem>
    </Breadcrumb>
  ),
};
