import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/DropdownMenu',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="p-chekin-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="s">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Booking</DropdownMenuLabel>
          <DropdownMenuItem>Send check-in link</DropdownMenuItem>
          <DropdownMenuItem>Edit guest</DropdownMenuItem>
          <DropdownMenuItem>Download PDF</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-chekin-red data-[highlighted]:text-chekin-red">
            Cancel booking
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: { layout: 'padded' },
};
