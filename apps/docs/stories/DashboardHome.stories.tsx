import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  CardDescription,
  CardFooter,
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
  LineChart,
  ProgressBar,
  RatingStars,
  StatCard,
  Tooltip,
} from '@chekin/ui';

/**
 * Comprehensive Dashboard Home example. Exercises most of the v0.2
 * components in a realistic host-operator landing layout, all styled
 * with the canonical visual vocabulary: off-white canvas, white cards
 * with subtle blue-tinted shadows, Main Blue as the only accent.
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

// ---- Inline icons (Lucide-style, 20 / 16 px, 1.75 stroke) ----
function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const I = {
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  euro: '<path d="M4 10h12M4 14h9"/><path d="M18 20a8 8 0 1 1 0-16"/>',
  tag: '<path d="M12.586 2.586a2 2 0 0 0-2.828 0L2 10.343V17a5 5 0 0 0 5 5h6.657l7.757-7.757a2 2 0 0 0 0-2.829z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>',
  userCheck: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/><path d="m16 11 2 2 4-4"/>',
  home: '<path d="m3 10 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  more: '<circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>',
  sparkle: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
  shield: '<path d="M12 3 4 6v7c0 4.5 3.5 7.5 8 8 4.5-.5 8-3.5 8-8V6z"/>',
};

const revenueData = [
  { x: 'Jan', y: 118000 }, { x: 'Feb', y: 124300 }, { x: 'Mar', y: 141000 },
  { x: 'Apr', y: 136500 }, { x: 'May', y: 158200 }, { x: 'Jun', y: 172000 },
  { x: 'Jul', y: 189400 }, { x: 'Aug', y: 201200 }, { x: 'Sep', y: 184230 },
  { x: 'Oct', y: 176800 }, { x: 'Nov', y: 162100 }, { x: 'Dec', y: 149600 },
];

const tasks = [
  { id: 1, name: 'Marta Sanz',     property: 'Casa Azul',      action: 'Check-in in 2h',   status: 'urgent' as const },
  { id: 2, name: 'Javier Ortega',  property: 'Villa Marbella', action: 'ID verification',  status: 'pending' as const },
  { id: 3, name: 'Ana Lopez',      property: 'Cabo Mar',       action: 'Late check-out',   status: 'pending' as const },
  { id: 4, name: 'Pablo Ruiz',     property: 'Los Alamos',     action: 'Damage deposit',   status: 'done' as const },
  { id: 5, name: 'Clara Diaz',     property: 'Casa Azul',      action: 'Signed contract',  status: 'done' as const },
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
      <div className="min-h-screen bg-[#FDFDFF] p-chekin-5">
        <div className="mx-auto max-w-[1320px] flex flex-col gap-chekin-4">
          {/* Header */}
          <header className="flex items-end justify-between gap-chekin-3">
            <div>
              <p className="font-sans text-[13px] leading-4 text-chekin-gray-1 mb-[4px]">
                Good morning, Marta
              </p>
              <h1 className="font-sans font-semibold text-[22px] leading-7 text-chekin-navy">
                Portfolio overview
              </h1>
            </div>
            <div className="flex items-center gap-chekin-1">
              <DateRangePicker value={range} onChange={setRange} containerClassName="w-[320px]" label={undefined} />
              <Tooltip content="Notifications">
                <IconButton label="Notifications" variant="secondary">
                  <Icon d={I.bell} size={16} />
                </IconButton>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton label="More actions" variant="secondary">
                    <Icon d={I.more} size={16} />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
                  <DropdownMenuItem>Export CSV</DropdownMenuItem>
                  <DropdownMenuItem>Invite team member</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Account settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Filter row */}
          <div className="flex flex-wrap gap-chekin-1">
            {[
              ['all', 'All bookings', 124],
              ['today', 'Arriving today', 6],
              ['tomorrow', 'Arriving tomorrow', 12],
              ['pending', 'Pending check-in', 18],
              ['attention', 'Needs attention', 3],
            ].map(([k, label, count]) => (
              <Chip
                key={k as string}
                selected={filter === k}
                onClick={() => setFilter(k as string)}
                count={count as number}
              >
                {label as string}
              </Chip>
            ))}
          </div>

          {/* Overview metrics */}
          <section className="grid grid-cols-5 gap-chekin-2">
            <StatCard icon={<Icon d={I.calendar} />} label="Total bookings" value="2,481" trend={12.4} caption="vs. last month" />
            <StatCard icon={<Icon d={I.euro} />}     label="Revenue"       value="EUR 184K" trend={8.6} caption="vs. last month" />
            <StatCard icon={<Icon d={I.tag} />}      label="Avg nightly rate" value="EUR 142" trend={-1.2} caption="vs. last month" />
            <StatCard icon={<Icon d={I.userCheck} />} label="Check-in rate" value="94.8%" trend={0.4} caption="vs. last month" />
            <StatCard icon={<Icon d={I.home} />}     label="Occupancy"     value="78%" trend={-2.1} caption="vs. last month" />
          </section>

          {/* Setup progress */}
          <Card appearance="elevated">
            <div className="flex items-center gap-chekin-3">
              <FramedIcon tone="info" size="l">
                <Icon d={I.shield} />
              </FramedIcon>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-chekin-1 mb-[2px]">
                  <h3 className="font-sans font-semibold text-[15px] leading-5 text-chekin-navy">
                    Property setup
                  </h3>
                  <HelpTooltip content="Complete setup unlocks all automation features: legal, check-in, payments, and Vela." />
                </div>
                <p className="font-sans text-[13px] leading-4 text-chekin-gray-1 mb-chekin-2">
                  12 of 16 properties are production-ready. Finish the last four to get 100% automation coverage.
                </p>
                <ProgressBar value={75} showValue />
              </div>
              <Button variant="secondary" size="s">Continue setup</Button>
            </div>
          </Card>

          {/* Chart + tasks row */}
          <section className="grid grid-cols-[1.6fr_1fr] gap-chekin-2">
            <Card appearance="elevated">
              <CardHeader>
                <div>
                  <CardTitle>Total revenue</CardTitle>
                  <CardDescription>Last 12 months</CardDescription>
                </div>
                <Badge tone="success" appearance="soft" dot>
                  +8.6% vs. last year
                </Badge>
              </CardHeader>
              <LineChart
                data={revenueData}
                height={280}
                valueFormatter={(v) => `EUR ${Math.round(v / 1000)}K`}
              />
            </Card>

            <Card appearance="elevated">
              <CardHeader>
                <div>
                  <CardTitle>Today's tasks</CardTitle>
                  <CardDescription>5 items</CardDescription>
                </div>
                <ExternalLink href="#" showIcon>
                  View all
                </ExternalLink>
              </CardHeader>
              <ul className="flex flex-col divide-y divide-chekin-gray-3">
                {tasks.map((t) => {
                  const s = statusTone[t.status];
                  return (
                    <li key={t.id} className="flex items-center gap-chekin-2 py-chekin-1">
                      <Avatar name={t.name} size="s" />
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-medium text-[13px] leading-4 text-chekin-navy truncate">
                          {t.name}
                        </p>
                        <p className="font-sans text-[12px] leading-4 text-chekin-gray-1 truncate">
                          {t.property} · {t.action}
                        </p>
                      </div>
                      <Badge tone={s.tone} appearance="soft" size="s">{s.label}</Badge>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </section>

          {/* Reviews + Vela callout */}
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
                  <span className="font-sans font-semibold text-[32px] leading-9 text-chekin-navy tabular-nums">
                    4.7
                  </span>
                  <RatingStars value={4.7} />
                  <span className="font-sans text-[12px] leading-4 text-chekin-gray-1">
                    125 reviews this month
                  </span>
                </div>
                <Divider orientation="vertical" className="h-[90px]" />
                <div className="flex-1 flex flex-col gap-[6px]">
                  {[
                    ['5★', 84],
                    ['4★', 28],
                    ['3★', 8],
                    ['2★', 3],
                    ['1★', 2],
                  ].map(([label, count]) => (
                    <div key={label as string} className="flex items-center gap-chekin-1">
                      <span className="w-[24px] font-sans font-medium text-[12px] text-chekin-gray-1">
                        {label}
                      </span>
                      <ProgressBar value={(count as number) / 125 * 100} size="s" />
                      <span className="w-[24px] text-right font-sans font-medium text-[12px] text-chekin-gray-1 tabular-nums">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Callout tone="note" title="Vela can help" icon={<Icon d={I.sparkle} />}>
              <p className="mb-chekin-1">
                Based on today's 12 messages, Vela suggests: <b>late check-out approval for Cabo Mar</b>, <b>draft reply to Ana's question about parking</b>, and <b>auto-confirm the Airbnb cleaning task for Casa Azul</b>.
              </p>
              <Button size="s" shape="pill">Review 3 suggestions</Button>
            </Callout>
          </section>
        </div>
      </div>
    );
  },
};

export const EmptyInbox: Story = {
  render: () => (
    <div className="min-h-screen bg-[#FDFDFF] p-chekin-5">
      <div className="mx-auto max-w-[720px]">
        <Card appearance="elevated" className="py-chekin-6">
          <EmptyState
            icon={<Icon d={I.mail} size={28} />}
            title="Inbox zero"
            description="No pending guest messages. Vela replied to 12 messages automatically this morning."
            action={
              <Button variant="secondary" size="s">View Vela activity</Button>
            }
          />
        </Card>
      </div>
    </div>
  ),
};
