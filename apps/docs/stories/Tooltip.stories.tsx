import type { Meta, StoryObj } from '@storybook/react';
import { Button, Tooltip } from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/Tooltip',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="p-chekin-5">
      <Tooltip content="Send a check-in link to the primary guest.">
        <Button>Send link</Button>
      </Tooltip>
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-chekin-4 p-chekin-5">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
          <Button variant="secondary" size="s">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};
