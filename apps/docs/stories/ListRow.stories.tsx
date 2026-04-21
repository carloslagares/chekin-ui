import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from '@chekin/ui';

const meta: Meta<typeof ListRow> = {
  title: 'Data display/ListRow',
  component: ListRow,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ListRow>;

function I({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  shieldCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  card:        '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M6 14h4"/>',
  trendUp:     '<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>',
  bookOpen:    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  play:        '<polygon points="10 8 16 12 10 16 10 8"/><circle cx="12" cy="12" r="10"/>',
  help:        '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4M12 17h.01"/>',
  clock:       '<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',
};

const ClockMeta = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-[4px]">
    <I d={ICON.clock} size={12} />
    {children}
  </span>
);

export const RowAppearance: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="p-chekin-4 bg-chekin-surface-input-empty w-[760px]">
      <div className="bg-white border border-chekin-gray-3 rounded-chekin-card shadow-chekin-card p-chekin-3 flex flex-col gap-chekin-1">
        <h3 className="font-sans font-semibold text-[16px] text-chekin-navy mb-chekin-2">Get more out of Chekin</h3>
        <ListRow
          icon={<I d={ICON.shieldCheck} />}
          title="Turn on identity verification"
          description="NFC + document OCR + liveness. Average completion under 90 seconds."
          meta={<ClockMeta>3 min</ClockMeta>}
        />
        <ListRow
          icon={<I d={ICON.card} />}
          title="Enable deposit holds"
          description="Pre-authorise a security deposit via Stripe; release on check-out."
          meta={<ClockMeta>5 min</ClockMeta>}
        />
        <ListRow
          icon={<I d={ICON.trendUp} />}
          title="Try upselling at check-in"
          description="Offer early check-in, late check-out and extras right inside the guest flow."
          meta={<ClockMeta>4 min</ClockMeta>}
        />
      </div>
    </div>
  ),
};

export const CardAppearance: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="p-chekin-4 bg-chekin-surface-input-empty">
      <div className="grid grid-cols-3 gap-chekin-2 max-w-[900px]">
        <ListRow
          appearance="card"
          iconSize="s"
          icon={<I d={ICON.bookOpen} size={18} />}
          title="Compliance guide"
          description="What each EU country requires and how Chekin handles it."
          trailing={false}
        />
        <ListRow
          appearance="card"
          iconSize="s"
          icon={<I d={ICON.play} size={18} />}
          title="2-minute product tour"
          description="Watch a quick walkthrough of the operator dashboard."
          trailing={false}
        />
        <ListRow
          appearance="card"
          iconSize="s"
          icon={<I d={ICON.help} size={18} />}
          title="Help center"
          description="Search articles or chat — we answer in under 5 minutes."
          trailing={false}
        />
      </div>
    </div>
  ),
};
