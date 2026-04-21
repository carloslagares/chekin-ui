import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuItem, DropdownMenuSeparator, SplitButton } from '@chekin/ui';

const meta: Meta = {
  title: 'Actions/SplitButton',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <SplitButton
      menu={
        <>
          <DropdownMenuItem>Send via email</DropdownMenuItem>
          <DropdownMenuItem>Send via SMS</DropdownMenuItem>
          <DropdownMenuItem>Send via WhatsApp</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Schedule for later…</DropdownMenuItem>
        </>
      }
    >
      Send check-in link
    </SplitButton>
  ),
};
