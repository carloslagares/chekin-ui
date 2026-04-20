import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AppShell,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Chip,
  FramedIcon,
  IconButton,
  Input,
  Pagination,
  ProgressBar,
  Rail,
  RailItem,
  Sidebar,
  SidebarItem,
  SidebarSection,
  TopBar,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Examples/Properties page',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dashboard' } },
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
  more: '<circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  bed: '<path d="M2 18V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9M2 14h20M6 9v4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
};

type Property = {
  id: string;
  name: string;
  city: string;
  country: string;
  bedrooms: number;
  maxGuests: number;
  setup: number;
  status: 'live' | 'draft' | 'paused';
};

const PROPERTIES: Property[] = [
  { id: 'p1', name: 'Casa Azul',      city: 'Madrid',     country: 'Spain',   bedrooms: 2, maxGuests: 4, setup: 100, status: 'live' },
  { id: 'p2', name: 'Villa Marbella', city: 'Marbella',   country: 'Spain',   bedrooms: 5, maxGuests: 10, setup: 100, status: 'live' },
  { id: 'p3', name: 'Cabo Mar',       city: 'Tenerife',   country: 'Spain',   bedrooms: 3, maxGuests: 6, setup: 82,  status: 'live' },
  { id: 'p4', name: 'Los Alamos',     city: 'Barcelona',  country: 'Spain',   bedrooms: 2, maxGuests: 4, setup: 65,  status: 'draft' },
  { id: 'p5', name: 'Torre del Mar',  city: 'Valencia',   country: 'Spain',   bedrooms: 1, maxGuests: 2, setup: 45,  status: 'draft' },
  { id: 'p6', name: 'Il Rustico',     city: 'Florence',   country: 'Italy',   bedrooms: 4, maxGuests: 8, setup: 90,  status: 'live' },
  { id: 'p7', name: 'La Cañada',      city: 'Seville',    country: 'Spain',   bedrooms: 3, maxGuests: 6, setup: 100, status: 'paused' },
  { id: 'p8', name: 'Mar Blau',       city: 'Ibiza',      country: 'Spain',   bedrooms: 6, maxGuests: 12, setup: 100, status: 'live' },
];

const statusBadge = {
  live:   { tone: 'success' as const, label: 'Live' },
  draft:  { tone: 'neutral' as const, label: 'Draft' },
  paused: { tone: 'warn'    as const, label: 'Paused' },
};

export const Default: Story = {
  render: () => {
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);

    const filtered = filter === 'all' ? PROPERTIES
      : filter === 'draft' ? PROPERTIES.filter((p) => p.status === 'draft')
      : filter === 'live' ? PROPERTIES.filter((p) => p.status === 'live')
      : PROPERTIES.filter((p) => p.setup < 100);

    return (
      <AppShell
        rail={
          <Rail
            logo={<span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>}
            footer={<Avatar name="Marta Sanz" size="s" />}
          >
            <RailItem label="Home"><I d={ICON.home} /></RailItem>
            <RailItem label="Bookings"><I d={ICON.book} /></RailItem>
            <RailItem label="Properties" active><I d={ICON.building} /></RailItem>
            <RailItem label="Inbox"><I d={ICON.inbox} /></RailItem>
            <RailItem label="Communications"><I d={ICON.message} /></RailItem>
          </Rail>
        }
        sidebar={
          <Sidebar heading="Properties" subheading="16 total">
            <SidebarSection label="Views">
              <SidebarItem active>All properties</SidebarItem>
              <SidebarItem>By city</SidebarItem>
              <SidebarItem>By channel</SidebarItem>
              <SidebarItem>Incomplete setup</SidebarItem>
            </SidebarSection>
            <SidebarSection label="Countries">
              <SidebarItem>Spain · 14</SidebarItem>
              <SidebarItem>Italy · 2</SidebarItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <TopBar>
          <div className="flex items-center flex-1">
            <Breadcrumb>
              <BreadcrumbItem href="#">Portfolio</BreadcrumbItem>
              <BreadcrumbItem current>Properties</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="relative w-[320px]">
            <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-chekin-gray-1 pointer-events-none">
              <I d={ICON.search} size={14} />
            </span>
            <Input containerClassName="w-full" placeholder="Search properties" className="pl-[34px]" aria-label="Search properties" />
          </div>
          <Button leftIcon={<I d={ICON.plus} size={14} />}>Add property</Button>
        </TopBar>

        <div className="p-chekin-3 flex flex-col gap-chekin-3">
          <div className="flex flex-wrap gap-chekin-1">
            {[
              ['all', 'All', PROPERTIES.length],
              ['live', 'Live', PROPERTIES.filter((p) => p.status === 'live').length],
              ['draft', 'Draft', PROPERTIES.filter((p) => p.status === 'draft').length],
              ['incomplete', 'Incomplete setup', PROPERTIES.filter((p) => p.setup < 100).length],
            ].map(([k, label, count]) => (
              <Chip key={k as string} selected={filter === k} onClick={() => setFilter(k as string)} count={count as number}>
                {label as string}
              </Chip>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-chekin-2">
            {filtered.map((p) => (
              <Card key={p.id} appearance="elevated" className="flex flex-col gap-chekin-2">
                <div className="aspect-[16/9] rounded-chekin-input bg-gradient-to-br from-chekin-surface-pressed to-chekin-surface-card flex items-center justify-center text-chekin-blue">
                  <FramedIcon tone="info" size="l" shape="circle"><I d={ICON.building} /></FramedIcon>
                </div>
                <div className="flex items-start justify-between gap-chekin-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-[15px] leading-5 text-chekin-navy truncate">{p.name}</h3>
                    <p className="font-sans text-[12px] leading-4 text-chekin-gray-1 truncate inline-flex items-center gap-[4px]">
                      <I d={ICON.mapPin} size={12} />
                      {p.city} · {p.country}
                    </p>
                  </div>
                  <Badge tone={statusBadge[p.status].tone} appearance="soft" dot size="s">{statusBadge[p.status].label}</Badge>
                </div>
                <div className="flex items-center gap-chekin-2 text-chekin-gray-1 font-sans text-[12px]">
                  <span className="inline-flex items-center gap-[4px]"><I d={ICON.bed} size={14} /> {p.bedrooms} BR</span>
                  <span className="inline-flex items-center gap-[4px]"><I d={ICON.users} size={14} /> up to {p.maxGuests}</span>
                </div>
                {p.setup < 100 && (
                  <ProgressBar value={p.setup} size="s" label="Setup" showValue />
                )}
                <div className="flex items-center justify-end gap-chekin-1 pt-chekin-1 mt-auto border-t border-chekin-gray-3">
                  <Button size="s" variant="secondary">Open</Button>
                  <IconButton label="More actions" size="s" variant="ghost"><I d={ICON.more} size={14} /></IconButton>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-sans text-[13px] text-chekin-gray-1">
              Showing {filtered.length} of {PROPERTIES.length}
            </span>
            <Pagination page={page} pageCount={3} onChange={setPage} />
          </div>
        </div>
      </AppShell>
    );
  },
};
