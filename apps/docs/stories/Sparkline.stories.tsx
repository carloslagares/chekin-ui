import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from '@chekin/ui';

const meta: Meta<typeof Sparkline> = {
  title: 'Charts/Sparkline',
  component: Sparkline,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['flat', 'rise', 'fall', 'dashed'] },
    color: { control: 'color' },
    height: { control: { type: 'range', min: 16, max: 80, step: 4 } },
  },
};
export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Rise: Story = {
  args: { variant: 'rise', height: 40, width: 240 },
};

export const Flat: Story = {
  args: { variant: 'flat', height: 40, width: 240 },
};

export const Fall: Story = {
  args: { variant: 'fall', height: 40, width: 240 },
};

export const Dashed: Story = {
  args: { variant: 'dashed', height: 40, width: 240 },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-chekin-3 w-[480px]">
      {(['rise', 'flat', 'fall', 'dashed'] as const).map((v) => (
        <div key={v} className="p-chekin-3 bg-white border border-chekin-gray-3 rounded-chekin-card shadow-chekin-card flex flex-col gap-chekin-1">
          <span className="font-sans text-[12px] uppercase tracking-wide text-chekin-gray-1">{v}</span>
          <Sparkline variant={v} height={36} />
        </div>
      ))}
    </div>
  ),
};
