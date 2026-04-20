import type { Meta, StoryObj } from '@storybook/react';
import { Button, Toolbar } from '@chekin/ui';

const meta: Meta<typeof Toolbar> = {
  title: 'Dashboard/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Toolbar>;

export const BulkActions: Story = {
  render: () => (
    <Toolbar
      selectedCount={3}
      onClose={() => {}}
      actions={
        <>
          <button className="h-8 px-[12px] rounded-chekin-input bg-white/10 text-white font-sans font-semibold text-[13px] hover:bg-white/20">
            Send check-in link
          </button>
          <button className="h-8 px-[12px] rounded-chekin-input bg-white/10 text-white font-sans font-semibold text-[13px] hover:bg-white/20">
            Export
          </button>
          <button className="h-8 px-[12px] rounded-chekin-input bg-white/10 text-white font-sans font-semibold text-[13px] hover:bg-white/20">
            Cancel
          </button>
        </>
      }
    />
  ),
};
