import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AppShell,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Input,
  Pagination,
  Rail,
  RailItem,
  Sidebar,
  SidebarItem,
  SidebarSection,
  SplitButton,
  StatusCluster,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Toolbar,
  TopBar,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Examples/Bookings page',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dashboard' },
  },
};
export default meta;
type Story = StoryObj;

// Lucide-style inline icons
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
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5 17a4 4 0 0 1 8 0M14 9h5M14 13h5"/>',
  shield: '<path d="M12 3 4 6v7c0 4.5 3.5 7.5 8 8 4.5-.5 8-3.5 8-8V6z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  more: '<circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  download: '<path d="M12 3v14M5 12l7 7 7-7M5 21h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

// ---------- Sample data ----------
type Booking = {
  id: string;
  guest: string;
  property: string;
  checkin: string;
  nights: number;
  channel: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'arriving';
  pipeline: Array<'ok' | 'pending' | 'error' | 'idle'>;
};

const ALL_BOOKINGS: Booking[] = [
  { id: 'B-2481', guest: 'Marta Sanz',     property: 'Casa Azul · Madrid',     checkin: 'Apr 22', nights: 3, channel: 'Airbnb',   amount: 420,  status: 'confirmed', pipeline: ['ok','ok','pending','idle'] },
  { id: 'B-2480', guest: 'Javier Ortega',  property: 'Villa Marbella',         checkin: 'Apr 22', nights: 7, channel: 'Booking',  amount: 1260, status: 'arriving',  pipeline: ['ok','ok','ok','pending'] },
  { id: 'B-2479', guest: 'Ana Lopez',      property: 'Cabo Mar · Tenerife',    checkin: 'Apr 24', nights: 4, channel: 'Direct',   amount: 680,  status: 'confirmed', pipeline: ['ok','pending','idle','idle'] },
  { id: 'B-2478', guest: 'Pablo Ruiz',     property: 'Los Alamos · Barcelona', checkin: 'Apr 25', nights: 2, channel: 'Airbnb',   amount: 210,  status: 'pending',   pipeline: ['pending','idle','idle','idle'] },
  { id: 'B-2477', guest: 'Clara Diaz',     property: 'Casa Azul · Madrid',     checkin: 'Apr 28', nights: 5, channel: 'Booking',  amount: 700,  status: 'confirmed', pipeline: ['ok','ok','ok','ok'] },
  { id: 'B-2476', guest: 'Lucia Moreno',   property: 'Villa Marbella',         checkin: 'Apr 29', nights: 3, channel: 'VRBO',     amount: 540,  status: 'cancelled', pipeline: ['error','idle','idle','idle'] },
  { id: 'B-2475', guest: 'Tomas Garcia',   property: 'Cabo Mar · Tenerife',    checkin: 'May 2',  nights: 6, channel: 'Direct',   amount: 1020, status: 'confirmed', pipeline: ['ok','ok','pending','idle'] },
];

const statusBadge = {
  confirmed: { tone: 'success' as const, label: 'Confirmed' },
  pending:   { tone: 'warn'    as const, label: 'Pending'   },
  cancelled: { tone: 'error'   as const, label: 'Cancelled' },
  arriving:  { tone: 'info'    as const, label: 'Arriving today' },
};

const pipelineLabels = ['Guest data', 'ID verified', 'Contract signed', 'Police report'];

// ---------- Story ----------
export const Default: Story = {
  render: () => {
    const [filter, setFilter] = useState<string>('all');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
      switch (filter) {
        case 'today': return ALL_BOOKINGS.filter((b) => b.status === 'arriving');
        case 'pending': return ALL_BOOKINGS.filter((b) => b.status === 'pending');
        case 'attention': return ALL_BOOKINGS.filter((b) => b.pipeline.includes('error'));
        default: return ALL_BOOKINGS;
      }
    }, [filter]);

    const allSelected = filtered.length > 0 && filtered.every((b) => selected.has(b.id));
    const someSelected = filtered.some((b) => selected.has(b.id));
    const toggleAll = () => {
      if (allSelected) {
        setSelected(new Set());
      } else {
        setSelected(new Set(filtered.map((b) => b.id)));
      }
    };
    const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

    return (
      <AppShell
        rail={
          <Rail
            logo={
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>
            }
            footer={<Avatar name="Marta Sanz" size="s" />}
          >
            <RailItem label="Home"><I d={ICON.home} /></RailItem>
            <RailItem label="Bookings" active><I d={ICON.book} /></RailItem>
            <RailItem label="Properties"><I d={ICON.building} /></RailItem>
            <RailItem label="Inbox" badge={<span className="w-[6px] h-[6px] rounded-full bg-chekin-red" />}><I d={ICON.inbox} /></RailItem>
            <RailItem label="Communications"><I d={ICON.message} /></RailItem>
            <RailItem label="Settings"><I d={ICON.settings} /></RailItem>
          </Rail>
        }
        sidebar={
          <Sidebar heading="Bookings" subheading="All properties">
            <SidebarSection label="Views">
              <SidebarItem active icon={<I d={ICON.calendar} size={16} />}>All bookings</SidebarItem>
              <SidebarItem icon={<I d={ICON.book} size={16} />}>Upcoming</SidebarItem>
              <SidebarItem icon={<I d={ICON.id} size={16} />}>Pending ID</SidebarItem>
              <SidebarItem icon={<I d={ICON.shield} size={16} />} badge={<Badge tone="warn" appearance="soft" size="s">3</Badge>}>Needs attention</SidebarItem>
            </SidebarSection>
            <SidebarSection label="Saved filters">
              <SidebarItem>Long stays ({">"} 7 nights)</SidebarItem>
              <SidebarItem>High-value ({">"} €1K)</SidebarItem>
              <SidebarItem>Cancelled this month</SidebarItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <TopBar>
          <div className="flex items-center gap-chekin-1 flex-1">
            <h1 className="font-sans font-semibold text-[18px] leading-6 text-chekin-navy">All bookings</h1>
            <Badge tone="neutral" appearance="soft" size="s">{ALL_BOOKINGS.length}</Badge>
          </div>
          <div className="relative w-[320px]">
            <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-chekin-gray-1 pointer-events-none">
              <I d={ICON.search} size={14} />
            </span>
            <Input containerClassName="w-full" placeholder="Search by guest, property, booking ID" className="pl-[34px]" aria-label="Search" />
          </div>
          <IconButton label="Notifications" variant="secondary"><I d={ICON.bell} size={16} /></IconButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton label="More actions" variant="secondary"><I d={ICON.more} size={16} /></IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export to CSV</DropdownMenuItem>
              <DropdownMenuItem>Import bookings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Account settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SplitButton
            menu={
              <>
                <DropdownMenuItem>From Airbnb link</DropdownMenuItem>
                <DropdownMenuItem>From Booking.com</DropdownMenuItem>
                <DropdownMenuItem>Manual entry</DropdownMenuItem>
              </>
            }
          >
            New booking
          </SplitButton>
        </TopBar>

        <div className="p-chekin-3 flex flex-col gap-chekin-2">
          <div className="flex flex-wrap gap-chekin-1">
            {[
              ['all', 'All', ALL_BOOKINGS.length],
              ['today', 'Arriving today', ALL_BOOKINGS.filter((b) => b.status === 'arriving').length],
              ['pending', 'Pending', ALL_BOOKINGS.filter((b) => b.status === 'pending').length],
              ['attention', 'Needs attention', ALL_BOOKINGS.filter((b) => b.pipeline.includes('error')).length],
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

          {someSelected && (
            <Toolbar
              selectedCount={selected.size}
              onClose={() => setSelected(new Set())}
              actions={
                <>
                  <Button size="s" variant="secondary">Send check-in link</Button>
                  <Button size="s" variant="secondary">Export</Button>
                  <Button size="s" variant="destructive">Cancel</Button>
                </>
              }
            />
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead sortable>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead align="right" sortable>Nights</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead align="right" sortable>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id} interactive selected={selected.has(b.id)}>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selected.has(b.id)} onCheckedChange={() => toggle(b.id)} />
                  </TableCell>
                  <TableCell className="font-mono text-chekin-gray-1 text-[12px]">{b.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-chekin-1">
                      <Avatar name={b.guest} size="s" />
                      <span className="font-sans font-medium">{b.guest}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-chekin-gray-1">{b.property}</TableCell>
                  <TableCell>{b.checkin}</TableCell>
                  <TableCell align="right" className="tabular-nums">{b.nights}</TableCell>
                  <TableCell className="text-chekin-gray-1">{b.channel}</TableCell>
                  <TableCell>
                    <StatusCluster
                      items={b.pipeline.map((p, i) => ({ label: pipelineLabels[i], status: p }))}
                      size={20}
                    />
                  </TableCell>
                  <TableCell align="right" className="tabular-nums font-semibold">EUR {b.amount}</TableCell>
                  <TableCell>
                    <Badge tone={statusBadge[b.status].tone} appearance="soft" dot size="s">
                      {statusBadge[b.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <IconButton label="Row actions" variant="ghost" size="s"><I d={ICON.more} size={14} /></IconButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open details</DropdownMenuItem>
                        <DropdownMenuItem>Send check-in link</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-chekin-red data-[highlighted]:text-chekin-red">Cancel booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between">
            <span className="font-sans text-[13px] text-chekin-gray-1">
              Showing 1–{filtered.length} of {ALL_BOOKINGS.length}
            </span>
            <Pagination page={page} pageCount={12} onChange={setPage} />
          </div>
        </div>
      </AppShell>
    );
  },
};
