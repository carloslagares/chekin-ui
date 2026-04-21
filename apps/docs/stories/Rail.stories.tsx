import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Rail, RailItem } from '@chekin/ui';

const meta: Meta<typeof Rail> = {
  title: 'Layouts/Rail',
  component: Rail,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Rail>;

function I({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  book: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  building: '<path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  inbox: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
};

export const Default: Story = {
  render: () => (
    <div style={{ height: 640 }}>
      <Rail
        logo={<span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>}
        footer={<Avatar name="Marta Sanz" size="s" />}
      >
        <RailItem label="Home" active><I d={ICON.home} /></RailItem>
        <RailItem label="Bookings"><I d={ICON.book} /></RailItem>
        <RailItem label="Properties"><I d={ICON.building} /></RailItem>
        <RailItem label="Inbox" badge={<span className="inline-block w-[7px] h-[7px] rounded-full bg-chekin-red" />}>
          <I d={ICON.inbox} />
        </RailItem>
        <RailItem label="Communications"><I d={ICON.message} /></RailItem>
      </Rail>
    </div>
  ),
};
