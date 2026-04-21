import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@chekin/ui';

const meta: Meta<typeof Pagination> = {
  title: 'Data display/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="flex flex-col gap-chekin-2">
        <Pagination page={page} pageCount={12} onChange={setPage} />
        <span className="text-chekin-gray-1 text-[13px]">Page {page} of 12</span>
      </div>
    );
  },
};

export const Short: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} pageCount={4} onChange={setPage} />;
  },
};

export const LongWithGaps: Story = {
  render: () => {
    const [page, setPage] = useState(42);
    return <Pagination page={page} pageCount={98} onChange={setPage} />;
  },
};
