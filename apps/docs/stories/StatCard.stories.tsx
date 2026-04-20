import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '@chekin/ui';

const meta: Meta<typeof StatCard> = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: {
    label: 'Total bookings',
    value: '2,481',
    icon: <CalendarCheckIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};
export const WithTrendUp: Story = { args: { trend: 12.4, caption: 'vs. last month' } };
export const WithTrendDown: Story = { args: { trend: -3.2, caption: 'vs. last month' } };
export const NoIcon: Story = { args: { icon: undefined } };
export const WithHelp: Story = {
  args: {
    label: 'Check-in conversion',
    value: '92.1%',
    trend: 0.4,
    caption: 'vs. last month',
    helpIcon: <HelpDot />,
  },
};

export const Row: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-chekin-2 p-chekin-4 w-[1280px] bg-[#FDFDFF]">
      <StatCard label="Total bookings" value="2,481" trend={12.4} caption="vs. last month" icon={<CalendarCheckIcon />} />
      <StatCard label="Revenue" value="€184K" trend={8.6} caption="vs. last month" icon={<EuroIcon />} />
      <StatCard label="Avg nightly rate" value="€142" trend={-1.2} caption="vs. last month" icon={<TagIcon />} />
      <StatCard label="Check-in rate" value="94.8%" trend={0.4} caption="vs. last month" icon={<UserCheckIcon />} />
      <StatCard label="Occupancy" value="78%" trend={-2.1} caption="vs. last month" icon={<HomeIcon />} />
    </div>
  ),
  parameters: { layout: 'padded' },
};

// Lucide-style inline icons (1.75px stroke, 20×20)

function CalendarCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function EuroIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12M4 14h9" />
      <path d="M18 20a8 8 0 1 1 0-16" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.586 2.586a2 2 0 0 0-2.828 0L2 10.343V17a5 5 0 0 0 5 5h6.657l7.757-7.757a2 2 0 0 0 0-2.829z" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function UserCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
      <path d="m16 11 2 2 4-4" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 10 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function HelpDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-chekin-gray-2" aria-hidden="true">
      <circle cx="7" cy="7" r="6" />
      <path d="M5.5 5.5a1.5 1.5 0 0 1 2.9 .5c0 .8-1 1.1-1.4 1.5-.2.2-.3.4-.3.7" strokeLinecap="round" />
      <circle cx="7" cy="10.3" r="0.6" fill="currentColor" />
    </svg>
  );
}

export { CalendarCheckIcon, EuroIcon, TagIcon, UserCheckIcon, HomeIcon };
