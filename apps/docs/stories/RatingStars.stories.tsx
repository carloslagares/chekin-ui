import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RatingStars } from '@chekin/ui';

const meta: Meta<typeof RatingStars> = {
  title: 'Data display/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  args: { value: 4.5 },
};

export default meta;
type Story = StoryObj<typeof RatingStars>;

export const Default: Story = {};
export const FullStars: Story = { args: { value: 5 } };
export const HalfStar: Story = { args: { value: 3.5 } };
export const NoRating: Story = { args: { value: 0 } };
export const WithLabel: Story = {
  args: { value: 4.5, label: '125 reviews' },
};
export const Larger: Story = { args: { value: 4, size: 24 } };

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div className="flex flex-col gap-chekin-1">
        <RatingStars value={value} onChange={setValue} size={24} />
        <p className="text-chekin-gray-1 text-[12px] font-medium">
          Selected: {value} / 5
        </p>
      </div>
    );
  },
};
