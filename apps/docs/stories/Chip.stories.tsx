import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@chekin/ui';

const meta: Meta<typeof Chip> = {
  title: 'Dashboard/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Confirmed' },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const WithCount: Story = { args: { count: 24 } };

export const FilterRow: Story = {
  render: () => {
    const [filters, setFilters] = useState<Set<string>>(new Set(['confirmed']));
    const toggle = (k: string) => setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });
    return (
      <div className="flex flex-wrap gap-chekin-1">
        {[
          ['confirmed', 'Confirmed', 124],
          ['pending', 'Pending', 32],
          ['arriving', 'Arriving today', 6],
          ['cancelled', 'Cancelled', 3],
        ].map(([k, label, count]) => (
          <Chip
            key={k as string}
            selected={filters.has(k as string)}
            onClick={() => toggle(k as string)}
            count={count as number}
          >
            {label as string}
          </Chip>
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
