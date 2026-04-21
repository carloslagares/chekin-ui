import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FramedIcon, SelectableCard } from '@chekin/ui';

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4 6v7c0 4.5 3.5 7.5 8 8 4.5-.5 8-3.5 8-8V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const meta: Meta<typeof SelectableCard> = {
  title: 'Forms/SelectableCard',
  component: SelectableCard,
  tags: ['autodocs'],
  args: {
    title: 'Standard',
    description: 'Up to EUR 500 per booking. Covers accidental damage and minor theft.',
    price: 'EUR 2.90 / booking',
    icon: <FramedIcon tone="info"><ShieldIcon /></FramedIcon>,
  },
};
export default meta;
type Story = StoryObj<typeof SelectableCard>;

export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true } };

export const PlanPicker: Story = {
  render: () => {
    const [selected, setSelected] = useState('standard');
    const plans = [
      { id: 'basic', title: 'Basic', description: 'Up to EUR 100 per booking. Essential protection.', price: 'EUR 1.00' },
      { id: 'standard', title: 'Standard', description: 'Up to EUR 500 per booking. Covers damage and minor theft.', price: 'EUR 2.90' },
      { id: 'premium', title: 'Premium', description: 'Up to EUR 2,000 per booking. Full protection + 24/7 support.', price: 'EUR 5.90' },
    ];
    return (
      <div className="grid grid-cols-3 gap-chekin-2 p-chekin-4 max-w-[1200px]">
        {plans.map((plan) => (
          <SelectableCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            price={`${plan.price} / booking`}
            icon={<FramedIcon tone={selected === plan.id ? 'info' : 'neutral'}><ShieldIcon /></FramedIcon>}
            selected={selected === plan.id}
            onChange={() => setSelected(plan.id)}
          />
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
