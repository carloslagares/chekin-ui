import type { Meta, StoryObj } from '@storybook/react';
import {
  AppShell,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  EmptyState,
  ExternalLink,
  HelpTooltip,
  IconButton,
  KpiTile,
  ListRow,
  SetupChecklist,
  SetupStep,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Tag,
  TopBar,
} from '@chekin/ui';

/**
 * Dashboard Home — V1 "Original" — composed entirely from @chekin/ui primitives.
 *
 * Reference layout: https://carloslagares.github.io/chekin-dashboard-preview/
 * (V1 Original tab)
 *
 * Rule of thumb for this story: no arbitrary `<div className="bg-[#...]">` — if
 * a section can't be assembled from existing kit pieces, that's the signal
 * we're missing a primitive and should promote it into `packages/ui/src/`.
 */
const meta: Meta = {
  title: 'Examples/Dashboard/Home',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dashboard' },
  },
};
export default meta;
type Story = StoryObj;

// ──────────────── Inline-SVG helper ────────────────
function I({ d, size = 20, strokeWidth = 1.6 }: { d: string; size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  // Sidebar
  home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  book: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  building: '<path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  inbox: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  upsell: '<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
  legal: '<path d="M12 2 4 5v7c0 5 3.5 8 8 10 4.5-2 8-5 8-10V5z"/>',
  tax: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M6 14h4"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  // Top bar
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>',
  sparkle: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="15" cy="11" r="1" fill="currentColor"/><path d="M9 15c1 1 4 1 6 0"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4M12 17h.01"/>',
  // Setup
  shield: '<path d="M12 2 4 5v7c0 5 3.5 8 8 10 4.5-2 8-5 8-10V5z"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  fileShield: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 14l2 2 4-4"/>',
  envelope: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  // KPI
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  // Guides / resources
  shieldCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  card: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M6 14h4"/>',
  trendUp: '<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',
  bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  play: '<polygon points="10 8 16 12 10 16 10 8"/><circle cx="12" cy="12" r="10"/>',
  // Empty state
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
};

// ──────────────── Canonical navy sidebar ────────────────
function CanonicalSidebar({ active = 'home' }: { active?: string }) {
  return (
    <Sidebar
      tone="dark"
      brand={
        <div className="flex items-center gap-chekin-1">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>
          <span className="font-sans font-bold text-[18px] tracking-[-0.02em] text-white">chekin</span>
        </div>
      }
      footer={
        <button
          type="button"
          className="w-full flex items-center gap-chekin-1 h-14 px-chekin-1 rounded-chekin-standard text-left hover:bg-white/5 outline-none focus-visible:shadow-chekin-focus"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-chekin-blue text-white font-bold text-[13px] shrink-0">SM</span>
          <span className="flex-1 min-w-0 flex flex-col">
            <span className="font-sans font-semibold text-[14px] leading-[1.1] text-white truncate">Sonder Madrid</span>
            <span className="font-sans text-[12px] leading-[1.2] text-chekin-gray-2 truncate">madrid@email.com</span>
          </span>
          <span className="text-chekin-gray-2"><I d={ICON.chev} size={16} /></span>
        </button>
      }
    >
      <SidebarItem active={active === 'home'} icon={<I d={ICON.home} />}>Home</SidebarItem>
      <SidebarItem active={active === 'bookings'} icon={<I d={ICON.book} />}>Bookings</SidebarItem>
      <SidebarItem active={active === 'properties'} icon={<I d={ICON.building} />}>Properties</SidebarItem>
      <SidebarItem active={active === 'inbox'} icon={<I d={ICON.inbox} />}>Inbox</SidebarItem>
      <SidebarItem active={active === 'upsell'} icon={<I d={ICON.upsell} />}>Upselling</SidebarItem>
      <SidebarItem active={active === 'doc'} icon={<I d={ICON.doc} />}>Documents</SidebarItem>
      <SidebarSection label="Compliance">
        <SidebarItem active={active === 'legal'} icon={<I d={ICON.legal} />}>Legal &amp; Police</SidebarItem>
        <SidebarItem active={active === 'tax'} icon={<I d={ICON.tax} />}>Tourist tax</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );
}

// Bell with an unread dot — the IconButton primitive doesn't expose a dot slot
// yet (worth promoting if we see this pattern repeat across the app).
function BellWithDot() {
  return (
    <span className="relative inline-flex">
      <IconButton label="Notifications" variant="secondary"><I d={ICON.bell} size={18} /></IconButton>
      <span aria-hidden="true" className="absolute top-[8px] right-[8px] w-2 h-2 rounded-full bg-chekin-red ring-2 ring-white" />
    </span>
  );
}

// Section eyebrow heading ("AT A GLANCE", "RESOURCES") — typographic pattern,
// not its own primitive.
function SectionHead({ title, aside }: { title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-baseline mb-chekin-2">
      <h2 className="font-sans font-semibold text-[15px] text-chekin-navy m-0 uppercase tracking-[0.04em]">{title}</h2>
      {aside}
    </div>
  );
}

const GuideClock = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-[4px]">
    <I d={ICON.clock} size={12} strokeWidth={2} />
    {children}
  </span>
);

// ──────────────── V1 · Original ────────────────
export const V1Original: Story = {
  name: 'V1 · Original',
  render: () => (
    <AppShell sidebar={<CanonicalSidebar active="home" />}>
      <TopBar>
        <span className="font-sans font-semibold text-[14px] text-chekin-navy">Home</span>
        <span className="flex-1" />
        <Button variant="secondary" size="s" leftIcon={<span className="text-chekin-blue"><I d={ICON.sparkle} size={16} /></span>}>
          Ask Chek
        </Button>
        <IconButton label="Support" variant="secondary"><I d={ICON.help} size={18} /></IconButton>
        <BellWithDot />
      </TopBar>

      <div className="px-chekin-5 py-chekin-5 pb-chekin-6 max-w-[1240px] w-full mx-auto flex flex-col gap-chekin-4">
        {/* Page head */}
        <div className="flex items-start justify-between gap-chekin-3">
          <div>
            <h1 className="font-sans font-semibold text-[26px] leading-8 text-chekin-navy m-0 tracking-[-0.005em]">
              Welcome, Maria <span className="inline-block ml-[2px]">👋</span>
            </h1>
            <p className="font-sans text-[15px] leading-[22px] text-chekin-gray-1 mt-[6px] max-w-[620px]">
              You&apos;re all set. Here&apos;s what&apos;s waiting for you and where to go next to get your first automated check-in live.
            </p>
          </div>
          <Tag>
            <I d={ICON.cal} size={14} strokeWidth={2} />
            Friday, 18 April 2026
          </Tag>
        </div>

        {/* Setup checklist */}
        <SetupChecklist
          title="Finish setting up Chekin"
          badge={<Badge tone="info" appearance="soft" size="s">2 of 5 done</Badge>}
          description="Complete these steps to unlock automated online check-in and police reporting."
          progress={40}
          estimateLabel={<><b className="text-chekin-navy">40%</b> · about 8 minutes left</>}
        >
          <SetupStep state="done"   icon={<I d={ICON.shield} />}     title="Create workspace"         description="Sonder Madrid · set up" cta="Completed" />
          <SetupStep state="done"   icon={<I d={ICON.shield} />}     title="Add your first property"  description="Puerta del Sol · Madrid, ES" cta="Completed" />
          <SetupStep state="active" icon={<I d={ICON.layers} />}     title="Connect a channel or PMS" description="Import bookings automatically from Booking.com, Guesty, Hostaway and 120+ more." cta="Connect" />
          <SetupStep state="todo"   icon={<I d={ICON.fileShield} />} title="Set up police reporting"  description="Choose the regulation that applies to your property. SES.HOSPEDAJES for Spain, Alloggiati for Italy…" cta="Set up" />
          <SetupStep state="todo"   icon={<I d={ICON.envelope} />}   title="Test the guest flow"      description="Send yourself a sample check-in link to see exactly what guests experience." cta="Preview" />
        </SetupChecklist>

        {/* KPI row */}
        <section>
          <SectionHead
            title="At a glance"
            aside={
              <button type="button" className="inline-flex items-center gap-[6px] font-sans font-medium text-[13px] text-chekin-gray-1 hover:text-chekin-navy">
                Last 7 days
                <I d={ICON.chev} size={12} strokeWidth={2} />
              </button>
            }
          />
          <div className="grid grid-cols-4 gap-chekin-2">
            <KpiTile
              label="Properties"
              helpIcon={<HelpTooltip content="Total active properties on this account." />}
              value="1"
              delta="Add another to centralise ops"
              deltaIcon="flat"
              spark="flat"
            />
            <KpiTile
              label="Bookings imported"
              value="12"
              delta="First sync today"
              deltaIcon="up"
              deltaTone="positive"
              spark="rise"
            />
            <KpiTile
              label="Check-ins completed"
              value={<>0 <span className="font-semibold text-[15px] text-chekin-gray-1 ml-1">of 12</span></>}
              delta="Links go out 48h before arrival"
              deltaTone="muted"
              spark="dashed"
            />
            <KpiTile
              label="Reports submitted"
              value="—"
              delta="Finish setup to enable"
              deltaTone="muted"
              spark="dashed"
            />
          </div>
        </section>

        {/* Two-col: guides + recent activity */}
        <div className="grid grid-cols-[1.4fr_1fr] gap-chekin-2">
          <Card appearance="elevated">
            <CardHeader>
              <CardTitle>Get more out of Chekin</CardTitle>
              <ExternalLink href="#" showIcon={false}>See all guides →</ExternalLink>
            </CardHeader>
            <div className="flex flex-col gap-[2px]">
              <ListRow
                icon={<I d={ICON.shieldCheck} />}
                title="Turn on identity verification"
                description="NFC + document OCR + liveness. Average completion under 90 seconds."
                meta={<GuideClock>3 min</GuideClock>}
              />
              <ListRow
                icon={<I d={ICON.card} />}
                title="Enable deposit holds"
                description="Pre-authorise a security deposit via Stripe; release on check-out."
                meta={<GuideClock>5 min</GuideClock>}
              />
              <ListRow
                icon={<I d={ICON.trendUp} />}
                title="Try upselling at check-in"
                description="Offer early check-in, late check-out and extras right inside the guest flow."
                meta={<GuideClock>4 min</GuideClock>}
              />
            </div>
          </Card>

          <Card appearance="elevated">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <EmptyState
              icon={<I d={ICON.chat} size={28} />}
              title="No activity yet"
              description="Once your first guest opens their check-in link, you'll see updates appear here."
              action={
                <Button variant="secondary" size="s" leftIcon={<I d={ICON.chat} size={14} strokeWidth={1.8} />}>
                  Send a test check-in
                </Button>
              }
            />
          </Card>
        </div>

        {/* Resources */}
        <section>
          <SectionHead title="Resources" />
          <div className="grid grid-cols-3 gap-chekin-2">
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
              description="Watch a quick walkthrough of the Chekin operator dashboard."
              trailing={false}
            />
            <ListRow
              appearance="card"
              iconSize="s"
              icon={<I d={ICON.help} size={18} />}
              title="Help center"
              description="Search articles or chat with our team — we answer in under 5 minutes."
              trailing={false}
            />
          </div>
        </section>
      </div>
    </AppShell>
  ),
};
