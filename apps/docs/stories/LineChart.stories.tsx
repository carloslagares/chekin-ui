import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '@chekin/ui';

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const revenueData = [
  { x: 'Jan', y: 118000 },
  { x: 'Feb', y: 124300 },
  { x: 'Mar', y: 141000 },
  { x: 'Apr', y: 136500 },
  { x: 'May', y: 158200 },
  { x: 'Jun', y: 172000 },
  { x: 'Jul', y: 189400 },
  { x: 'Aug', y: 201200 },
  { x: 'Sep', y: 184230 },
  { x: 'Oct', y: 176800 },
  { x: 'Nov', y: 162100 },
  { x: 'Dec', y: 149600 },
];

export const Default: Story = {
  args: {
    data: revenueData,
    valueFormatter: (v: number) => `€${Math.round(v / 1000)}K`,
  },
};

export const WithoutFill: Story = {
  args: {
    data: revenueData,
    showFill: false,
    valueFormatter: (v: number) => `€${Math.round(v / 1000)}K`,
  },
};

export const InPanel: Story = {
  render: () => (
    <div className="w-[820px] bg-white border border-chekin-gray-3 rounded-chekin-standard p-chekin-3">
      <div className="flex items-baseline justify-between mb-chekin-2">
        <div>
          <h3 className="font-sans font-semibold text-[16px] leading-5 text-chekin-navy">
            Total revenue
          </h3>
          <p className="font-sans text-[13px] leading-4 text-chekin-gray-1 mt-[4px]">
            Last 12 months
          </p>
        </div>
      </div>
      <LineChart
        data={revenueData}
        height={280}
        valueFormatter={(v) => `€${Math.round(v / 1000)}K`}
      />
    </div>
  ),
  parameters: { layout: 'padded' },
};
