import type { Meta, StoryObj } from '@storybook/react';
import {
  AppShell,
  Avatar,
  Rail,
  RailItem,
  Sidebar,
  SidebarItem,
  SidebarSection,
  TopBar,
} from '@chekin/ui';

const meta: Meta<typeof AppShell> = {
  title: 'Layouts/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

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
};

const Content = () => (
  <>
    <TopBar>
      <span className="font-sans font-semibold text-[14px] text-chekin-navy">Page title</span>
    </TopBar>
    <div className="p-chekin-4">
      <div className="h-[600px] rounded-chekin-card bg-white border border-chekin-gray-3 grid place-items-center text-chekin-gray-1 font-sans">
        Main content scrolls independently from the shells.
      </div>
    </div>
  </>
);

/** Canonical Dashboard: navy single-sidebar + main. */
export const DashboardSingleSidebar: Story = {
  render: () => (
    <AppShell
      sidebar={
        <Sidebar tone="dark" brand={<span className="font-sans font-bold text-white">chekin</span>}>
          <SidebarItem active icon={<I d={ICON.home} />}>Home</SidebarItem>
          <SidebarItem icon={<I d={ICON.book} />}>Bookings</SidebarItem>
          <SidebarItem icon={<I d={ICON.building} />}>Properties</SidebarItem>
        </Sidebar>
      }
    >
      <Content />
    </AppShell>
  ),
};

/** Rail + section Sidebar (for section-nav-heavy surfaces like Settings). */
export const RailPlusSidebar: Story = {
  render: () => (
    <AppShell
      rail={
        <Rail
          logo={<span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>}
          footer={<Avatar name="Marta Sanz" size="s" />}
        >
          <RailItem label="Home" active><I d={ICON.home} /></RailItem>
          <RailItem label="Bookings"><I d={ICON.book} /></RailItem>
          <RailItem label="Properties"><I d={ICON.building} /></RailItem>
        </Rail>
      }
      sidebar={
        <Sidebar heading="Settings" subheading="Your workspace">
          <SidebarSection label="Account">
            <SidebarItem active>Profile</SidebarItem>
            <SidebarItem>Billing</SidebarItem>
            <SidebarItem>Team</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Integrations">
            <SidebarItem>Channel managers</SidebarItem>
            <SidebarItem>Payments</SidebarItem>
          </SidebarSection>
        </Sidebar>
      }
    >
      <Content />
    </AppShell>
  ),
};

/** Main only — for auth screens or very focused flows. */
export const MainOnly: Story = {
  render: () => (
    <AppShell>
      <Content />
    </AppShell>
  ),
};
