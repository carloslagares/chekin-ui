import type { Meta, StoryObj } from '@storybook/react';
import { Button, Popover, PopoverContent, PopoverTrigger, Checkbox } from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/Popover',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const FilterPanel: Story = {
  render: () => (
    <div className="p-chekin-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="s">Filters</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-chekin-3">
          <div className="flex flex-col gap-chekin-2">
            <span className="font-sans font-semibold text-[13px] leading-5 text-chekin-navy">Status</span>
            <Checkbox label="Confirmed" defaultChecked />
            <Checkbox label="Pending" />
            <Checkbox label="Arriving today" />
            <Checkbox label="Cancelled" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: { layout: 'padded' },
};
