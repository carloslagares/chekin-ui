import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem, SidebarSection } from '@chekin/ui';

const meta: Meta<typeof Sidebar> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

function I({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  book: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  building: '<path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  inbox: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  legal: '<path d="M12 2 4 5v7c0 5 3.5 8 8 10 4.5-2 8-5 8-10V5z"/>',
  tax: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M6 14h4"/>',
};

/** Canonical Dashboard nav — dark, 280px, with brand + account footer. */
export const DarkCanonical: Story = {
  render: () => (
    <div style={{ height: 640 }}>
      <Sidebar
        tone="dark"
        brand={
          <div className="flex items-center gap-chekin-1">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>
            <span className="font-sans font-bold text-[18px] tracking-[-0.02em] text-white">chekin</span>
          </div>
        }
        footer={
          <button type="button" className="w-full flex items-center gap-chekin-1 h-14 px-chekin-1 rounded-chekin-standard text-left hover:bg-white/5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-chekin-blue text-white font-bold text-[13px]">SM</span>
            <span className="flex-1 min-w-0 flex flex-col">
              <span className="font-sans font-semibold text-[14px] leading-[1.1] text-white truncate">Sonder Madrid</span>
              <span className="font-sans text-[12px] leading-[1.2] text-chekin-gray-2 truncate">madrid@email.com</span>
            </span>
          </button>
        }
      >
        <SidebarItem active icon={<I d={ICON.home} />}>Home</SidebarItem>
        <SidebarItem icon={<I d={ICON.book} />}>Bookings</SidebarItem>
        <SidebarItem icon={<I d={ICON.building} />}>Properties</SidebarItem>
        <SidebarItem icon={<I d={ICON.inbox} />}>Inbox</SidebarItem>
        <SidebarSection label="Compliance">
          <SidebarItem icon={<I d={ICON.legal} />}>Legal &amp; Police</SidebarItem>
          <SidebarItem icon={<I d={ICON.tax} />}>Tourist tax</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};

/** Light section-scoped nav — 264px, used inside a page (e.g. Settings, Property detail). */
export const LightSection: Story = {
  render: () => (
    <div style={{ height: 640 }}>
      <Sidebar heading="Settings" subheading="Your workspace">
        <SidebarSection label="Account">
          <SidebarItem active>Profile</SidebarItem>
          <SidebarItem>Billing</SidebarItem>
          <SidebarItem>Team</SidebarItem>
        </SidebarSection>
        <SidebarSection label="Integrations">
          <SidebarItem>Channel managers</SidebarItem>
          <SidebarItem>Payments</SidebarItem>
          <SidebarItem>Webhooks</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};
