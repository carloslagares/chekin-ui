import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import {
  AppShell,
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Chip,
  DateRangePicker,
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  ExternalLink,
  FramedIcon,
  HelpTooltip,
  IconButton,
  Input,
  LineChart,
  ProgressBar,
  Rail,
  RailItem,
  RatingStars,
  Sidebar,
  SidebarItem,
  SidebarSection,
  StatCard,
  Tooltip,
  TopBar,
} from '@chekin/ui';

/**
 * Dashboard Home -- mirrors the canonical V1 Original layout with the
 * Chekin shell (Rail + Sidebar + TopBar) around it. Matches the intent
 * of chekin-dashboard-preview/index.html (variant V1).
 */
const meta: Meta = {
  title: 'Examples/Dashboard Home',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dashboard' },
  },
};
export default meta;
type Story = StoryObj;

function I({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  home: '<path d="m3 10 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/>',
  book: '<path d="M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2-3 2z"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  settings: '<circle cx="12" cy="12" r="3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  more: '<circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>',
  sparkle: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
  shield: '<path d="M12 3 4 6v7c0 4.5 3.5 7.5 8 8 4.5-.5 8-3.5 8-8V6z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  euro: '<path d="M4 10h12M4 14h9"/><path d="M18 20a8 8 0 1 1 0-16"/>',
  tag: '<path d="M12.586 2.586a2 2 0 0 0-2.828 0L2 10.343V17a5 5 0 0 0 5 5h6.657l7.757-7.757a2 2 0 0 0 0-2.829z"/>',
  userCheck: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/><path d="m16 11 2 2 4-4"/>',
};

const revenueData = [
  { x: 'Jan', y: 118000 }, { x: 'Feb', y: 124300 }, { x: 'Mar', y: 141000 },
  { x: 'Apr', y: 136500 }, { x: 'May', y: 158200 }, { x: 'Jun', y: 172000 },
  { x: 'Jul', y: 189400 }, { x: 'Aug', y: 201200 }, { x: 'Sep', y: 184230 },
  { x: 'Oct', y: 176800 }, { x: 'Nov', y: 162100 }, { x: 'Dec', y: 149600 },
];

const tasks = [
  { id: 1, name: 'Marta Sanz',    property: 'Casa Azul',      action: 'Check-in in 2h',  status: 'urgent'  as const },
  { id: 2, name: 'Javier Ortega', property: 'Villa Marbella', action: 'ID verification', status: 'pending' as const },
  { id: 3, name: 'Ana Lopez',     property: 'Cabo Mar',       action: 'Late check-out',  status: 'pending' as const },
  { id: 4, name: 'Pablo Ruiz',    property: 'Los Alamos',     action: 'Damage deposit',  status: 'done'    as const },
  { id: 5, name: 'Clara Diaz',    property: 'Casa Azul',      action: 'Signed contract', status: 'done'    as const },
];

const statusTone = {
  urgent: { tone: 'error' as const, label: 'Urgent' },
  pending: { tone: 'warn' as const, label: 'Pending' },
  done: { tone: 'success' as const, label: 'Done' },
};

export const Default: Story = {
  render: () => {
    const today = new Date();
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(today.getFullYear(), today.getMonth(), 1),
      to: today,
    });
    const [filter, setFilter] = useState<string>('all');

    return (
      <AppShell
        rail={
          <Rail
            logo={<span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>}
            footer={<Avatar name="Marta Sanz" size="s" />}
          >
            <RailItem label="Home" active><I d={ICON.home} /></RailItem>
            <RailItem label="Bookings"><I d={ICON.book} /></RailItem>
            <RailItem label="Properties"><I d={ICON.building} /></RailItem>
            <RailItem label="Inbox" badge={<span className="w-[6px] h-[6px] rounded-full bg-chekin-red" />}><I d={ICON.inbox} /></RailItem>
            <RailItem label="Communications"><I d={ICON.message} /></RailItem>
            <RailItem label="Settings"><I d={ICON.settings} /></RailItem>
          </Rail>
        }
        sidebar={
          <Sidebar heading="Dashboard" subheading="Portfolio overview">
            <SidebarSection label="Today">
              <SidebarItem active icon={<I d={ICON.dashboard} size={16} />}>Overview</SidebarItem>
              <SidebarItem icon={<I d={ICON.calendar} size={16} />} badge={<Badge tone="info" appearance="soft" size="s">6</Badge>}>Arrivals</SidebarItem>
              <SidebarItem icon={<I d={ICON.check} size={16} />} badge={<Badge tone="warn" appearance="soft" size="s">3</Badge>}>Tasks</SidebarItem>
            </SidebarSection>
            <SidebarSection label="Performance">
              <SidebarItem icon={<I d={ICON.euro} size={16} />}>Revenue</SidebarItem>
              <SidebarItem icon={<I d={ICON.tag} size={16} />}>Pricing</SidebarItem>
              <SidebarItem icon={<I d={ICON.userCheck} size={16} />}>Check-in rate</SidebarItem>
            </SidebarSection>
            <SidebarSection label="Assistant">
              <SidebarItem icon={<I d={ICON.sparkle} size={16} />} badge={<Badge tone="info" appearance="soft" size="s">3</Badge>}>Ask Vela</SidebarItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <TopBar>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="font-sans text-[12px] leading-4 text-chekin-gray-1">Good morning, Marta</p>
            <h1 className="font-sans font-semibold text-[18px] leading-6 text-chekin-navy">Portfolio overview</h1>
          </div>
          <div className="relative w-[280px]">
            <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-chekin-gray-1 pointer-events-none">
              <I d={ICON.search} size={14} />
            </span>
            <Input containerClassName="w-full" placeholder="Search" className="pl-[34px]" aria-label="Search" />
          </div>
          <DateRangePicker value={range} onChange={setRange} containerClassName="w-[300px]" />
          <Tooltip content="Notifications">
            <IconButton label="Notifications" variant="secondary"><I d={ICON.bell} size={16} /></IconButton>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton label="More actions" variant="secondary"><I d={ICON.more} size={16} /></IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Invite team member</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Account settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TopBar>

        <div className="p-chekin-3 flex flex-col gap-chekin-3">
          <div className="flex flex-wrap gap-chekin-1">
            {[
              ['all', 'All bookings', 124],
              ['today', 'Arriving today', 6],
              ['tomorrow', 'Arriving tomorrow', 12],
              ['pending', 'Pending check-in', 18],
              ['attention', 'Needs attention', 3],
            ].map(([k, label, count]) => (
              <Chip key={k as string} selected={filter === k} onClick={() => setFilter(k as string)} count={count as number}>
                {label as string}
              </Chip>
            ))}
          </div>

          <section className="grid grid-cols-5 gap-chekin-2">
            <StatCard icon={<I d={ICON.calendar} />}  label="Total bookings"   value="2,481"    trend={12.4} caption="vs. last month" />
            <StatCard icon={<I d={ICON.euro} />}      label="Revenue"          value="EUR 184K" trend={8.6}  caption="vs. last month" />
            <StatCard icon={<I d={ICON.tag} />}       label="Avg nightly rate" value="EUR 142"  trend={-1.2} caption="vs. last month" />
            <StatCard icon={<I d={ICON.userCheck} />} label="Check-in rate"    value="94.8%"    trend={0.4}  caption="vs. last month" />
            <StatCard icon={<I d={ICON.building} />}  label="Occupancy"        value="78%"      trend={-2.1} caption="vs. last month" />
          </section>

          <Card appearance="elevated">
            <div className="flex items-center gap-chekin-3">
              <FramedIcon tone="info" size="l"><I d={ICON.shield} size={22} /></FramedIcon>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-chekin-1 mb-[2px]">
                  <h3 className="font-sans font-semibold text-[15px] leading-5 text-chekin-navy">Property setup</h3>
                  <HelpTooltip content="Complete setup unlocks all automation: legal, check-in, payments, Vela." />
                </div>
                <p className="font-sans text-[13px] leading-4 text-chekin-gray-1 mb-chekin-2">
                  12 of 16 properties are production-ready. Finish the last four for 100% coverage.
                </p>
                <ProgressBar value={75} showValue />
              </div>
              <Button variant="secondary" size="s">Continue setup</Button>
            </div>
          </Card>

          <section className="grid grid-cols-[1.6fr_1fr] gap-chekin-2">
            <Card appearance="elevated">
              <CardHeader>
                <div>
                  <CardTitle>Total revenue</CardTitle>
                  <CardDescription>Last 12 months</CardDescription>
                </div>
                <Badge tone="success" appearance="soft" dot>+8.6% vs. last year</Badge>
              </CardHeader>
              <LineChart data={revenueData} height={260} valueFormatter={(v) => `EUR ${Math.round(v / 1000)}K`} />
            </Card>
            <Card appearance="elevated">
              <CardHeader>
                <div>
                  <CardTitle>Today's tasks</CardTitle>
                  <CardDescription>{tasks.length} items</CardDescription>
                </div>
                <ExternalLink href="#">View all</ExternalLink>
              </CardHeader>
              <ul className="flex flex-col divide-y divide-chekin-gray-3 -mx-chekin-1">
                {tasks.map((t) => {
                  const s = statusTone[t.status];
                  return (
                    <li key={t.id} className="flex items-center gap-chekin-1 px-chekin-1 py-chekin-1">
                      <Avatar name={t.name} size="s" />
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-medium text-[13px] leading-4 text-chekin-navy truncate">{t.name}</p>
                        <p className="font-sans text-[12px] leading-4 text-chekin-gray-1 truncate">{t.property} · {t.action}</p>
                      </div>
                      <Badge tone={s.tone} appearance="soft" size="s">{s.label}</Badge>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </section>

          <section className="grid grid-cols-[1fr_1.2fr] gap-chekin-2">
            <Card appearance="elevated">
              <CardHeader>
                <div>
                  <CardTitle>Guest satisfaction</CardTitle>
                  <CardDescription>All properties combined</CardDescription>
                </div>
              </CardHeader>
              <div className="flex items-center gap-chekin-3">
                <div className="flex flex-col gap-[2px]">
                  <span className="font-sans font-semibold text-[28px] leading-8 text-chekin-navy tabular-nums">4.7</span>
                  <RatingStars value={4.7} />
                  <span className="font-sans text-[12px] leading-4 text-chekin-gray-1">125 reviews this month</span>
                </div>
                <Divider orientation="vertical" className="h-[90px]" />
                <div className="flex-1 flex flex-col gap-[6px]">
                  {[['5', 84], ['4', 28], ['3', 8], ['2', 3], ['1', 2]].map(([label, count]) => (
                    <div key={label as string} className="flex items-center gap-chekin-1">
                      <span className="w-[12px] font-sans font-medium text-[12px] text-chekin-gray-1">{label}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-chekin-blue shrink-0" aria-hidden="true">
                        <path d="M12 2.5 L14.9 8.4 L21.5 9.3 L16.7 13.9 L17.9 20.5 L12 17.4 L6.1 20.5 L7.3 13.9 L2.5 9.3 L9.1 8.4 Z" />
                      </svg>
                      <ProgressBar value={(count as number) / 125 * 100} size="s" />
                      <span className="w-[24px] text-right font-sans font-medium text-[12px] text-chekin-gray-1 tabular-nums">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Callout tone="note" title="Vela can help" icon={<I d={ICON.sparkle} size={16} />}>
              <p className="mb-chekin-1">
                Based on today's 12 messages, Vela suggests: <b>late check-out for Cabo Mar</b>, <b>draft reply to Ana about parking</b>, and <b>auto-confirm cleaning for Casa Azul</b>.
              </p>
              <Button size="s" shape="pill">Review 3 suggestions</Button>
            </Callout>
          </section>
        </div>
      </AppShell>
    );
  },
};

export const EmptyInbox: Story = {
  render: () => (
    <AppShell
      rail={
        <Rail
          logo={<span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>}
          footer={<Avatar name="Marta Sanz" size="s" />}
        >
          <RailItem label="Home"><I d={ICON.home} /></RailItem>
          <RailItem label="Inbox" active><I d={ICON.inbox} /></RailItem>
        </Rail>
      }
      sidebar={
        <Sidebar heading="Inbox" subheading="Guest messages">
          <SidebarItem active>All conversations</SidebarItem>
          <SidebarItem>Unread</SidebarItem>
          <SidebarItem>Vela replies</SidebarItem>
        </Sidebar>
      }
    >
      <TopBar>
        <h1 className="font-sans font-semibold text-[18px] leading-6 text-chekin-navy">Inbox</h1>
      </TopBar>
      <div className="flex items-center justify-center py-chekin-6">
        <Card appearance="elevated" className="py-chekin-6 w-[640px]">
          <EmptyState
            icon={<I d={ICON.mail} size={28} />}
            title="Inbox zero"
            description="No pending guest messages. Vela replied to 12 messages automatically this morning."
            action={<Button variant="secondary" size="s">View Vela activity</Button>}
          />
        </Card>
      </div>
    </AppShell>
  ),
};
