import type { Meta, StoryObj } from '@storybook/react';
import { LineChart, StatCard } from '@chekin/ui';
import {
  CalendarCheckIcon,
  EuroIcon,
  HomeIcon,
  TagIcon,
  UserCheckIcon,
} from './StatCard.stories';

/**
 * Composed "dashboard-landing" page using the canonical vocabulary.
 * Structure borrowed from Figma (5-stat row + revenue chart panel).
 * Visual treatment entirely from the canonical preview — pale-blue icon chips,
 * Main Blue as the only accent, navy text, gray structure, no per-metric colors.
 */
const meta: Meta = {
  title: 'Examples/Dashboard/Overview',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dashboard' },
  },
};

export default meta;
type Story = StoryObj;

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
  render: () => (
    <div className="min-h-screen bg-[#FDFDFF] p-chekin-5">
      <div className="mx-auto max-w-[1280px] flex flex-col gap-chekin-4">
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="font-sans font-semibold text-[22px] leading-7 text-chekin-navy">
              Dashboard
            </h1>
            <p className="font-sans text-[14px] leading-5 text-chekin-gray-1 mt-[4px]">
              Overview of your portfolio performance
            </p>
          </div>
          <span className="font-sans font-medium text-[13px] leading-4 text-chekin-gray-1">
            Last 30 days
          </span>
        </header>

        {/* Overview metrics — 5 stats across */}
        <section className="grid grid-cols-5 gap-chekin-2">
          <StatCard
            icon={<CalendarCheckIcon />}
            label="Total bookings"
            value="2,481"
            trend={12.4}
            caption="vs. last month"
          />
          <StatCard
            icon={<EuroIcon />}
            label="Revenue"
            value="€184K"
            trend={8.6}
            caption="vs. last month"
          />
          <StatCard
            icon={<TagIcon />}
            label="Avg nightly rate"
            value="€142"
            trend={-1.2}
            caption="vs. last month"
          />
          <StatCard
            icon={<UserCheckIcon />}
            label="Check-in rate"
            value="94.8%"
            trend={0.4}
            caption="vs. last month"
          />
          <StatCard
            icon={<HomeIcon />}
            label="Occupancy"
            value="78%"
            trend={-2.1}
            caption="vs. last month"
          />
        </section>

        {/* Revenue chart — full width */}
        <section className="bg-white border border-chekin-gray-3 rounded-chekin-standard shadow-chekin-card p-chekin-3">
          <div className="flex items-baseline justify-between mb-chekin-2">
            <div>
              <h3 className="font-sans font-semibold text-[16px] leading-5 text-chekin-navy">
                Total revenue
              </h3>
              <p className="font-sans text-[13px] leading-4 text-chekin-gray-1 mt-[2px]">
                Last 12 months
              </p>
            </div>
            <span className="font-sans font-medium text-[13px] leading-4 text-chekin-gray-1">
              EUR
            </span>
          </div>
          <LineChart
            data={revenueData}
            height={320}
            valueFormatter={(v) => `€${Math.round(v / 1000)}K`}
          />
        </section>
      </div>
    </div>
  ),
};
