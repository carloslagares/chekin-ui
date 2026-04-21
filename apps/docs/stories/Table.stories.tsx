import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Badge,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Data display/Table',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const rows = [
  { id: 1, guest: 'Marta Sanz',    property: 'Casa Azul',      checkin: 'Apr 22',   nights: 3, amount: 420, status: 'confirmed'   as const },
  { id: 2, guest: 'Javier Ortega', property: 'Villa Marbella', checkin: 'Apr 22',   nights: 7, amount: 1260, status: 'pending'    as const },
  { id: 3, guest: 'Ana Lopez',     property: 'Cabo Mar',       checkin: 'Apr 24',   nights: 4, amount: 680, status: 'confirmed'   as const },
  { id: 4, guest: 'Pablo Ruiz',    property: 'Los Alamos',     checkin: 'Apr 25',   nights: 2, amount: 210, status: 'cancelled'   as const },
  { id: 5, guest: 'Clara Diaz',    property: 'Casa Azul',      checkin: 'Apr 28',   nights: 5, amount: 700, status: 'confirmed'   as const },
];

const statusMap = {
  confirmed: { tone: 'success' as const, label: 'Confirmed' },
  pending:   { tone: 'warn' as const,    label: 'Pending'   },
  cancelled: { tone: 'error' as const,   label: 'Cancelled' },
};

export const BookingsTable: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' }>({ key: 'checkin', dir: 'asc' });
    const toggle = (id: number) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
    const onSort = (key: string) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox
                checked={selected.size === rows.length ? true : selected.size === 0 ? false : 'indeterminate'}
                onCheckedChange={() => setSelected(selected.size === rows.length ? new Set() : new Set(rows.map((r) => r.id)))}
              />
            </TableHead>
            <TableHead sortable sortDirection={sort.key === 'guest' ? sort.dir : null} onSort={() => onSort('guest')}>Guest</TableHead>
            <TableHead>Property</TableHead>
            <TableHead sortable sortDirection={sort.key === 'checkin' ? sort.dir : null} onSort={() => onSort('checkin')}>Check-in</TableHead>
            <TableHead align="right" sortable sortDirection={sort.key === 'nights' ? sort.dir : null} onSort={() => onSort('nights')}>Nights</TableHead>
            <TableHead align="right" sortable sortDirection={sort.key === 'amount' ? sort.dir : null} onSort={() => onSort('amount')}>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} interactive selected={selected.has(r.id)}>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-chekin-1">
                  <Avatar name={r.guest} size="s" />
                  <span className="font-sans font-medium">{r.guest}</span>
                </div>
              </TableCell>
              <TableCell className="text-chekin-gray-1">{r.property}</TableCell>
              <TableCell>{r.checkin}</TableCell>
              <TableCell align="right" className="tabular-nums">{r.nights}</TableCell>
              <TableCell align="right" className="tabular-nums font-semibold">EUR {r.amount}</TableCell>
              <TableCell>
                <Badge tone={statusMap[r.status].tone} appearance="soft" dot size="s">
                  {statusMap[r.status].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};
