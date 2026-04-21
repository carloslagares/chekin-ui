import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@chekin/ui';

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Add Property',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'tertiary', 'destructive'],
    },
    size: {
      control: 'inline-radio',
      options: ['m', 's', 'xs'],
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'pill'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const TertiaryOnDark: Story = {
  args: { variant: 'tertiary' },
  parameters: { backgrounds: { default: 'dark' } },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete reservation' },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-2">
      <Button size="m">Medium</Button>
      <Button size="s">Small</Button>
      <Button size="xs">XSmall</Button>
    </div>
  ),
};

export const PillShape: Story = {
  args: { variant: 'primary', shape: 'pill', children: 'Ask Vela' },
};

export const ShapeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-3 p-chekin-4">
      <div className="flex items-center gap-chekin-2">
        <Button shape="rounded">New booking</Button>
        <span className="text-chekin-gray-1 text-[12px]">
          rounded (6px) — Dashboard admin actions
        </span>
      </div>
      <div className="flex items-center gap-chekin-2">
        <Button shape="pill">Ask Vela</Button>
        <span className="text-chekin-gray-1 text-[12px]">
          pill — AI / conversational / special moments
        </span>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const VariantMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-chekin-3 p-chekin-4">
      <div className="flex items-center gap-chekin-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex items-center gap-chekin-2">
        <Button variant="primary" size="s">
          Primary S
        </Button>
        <Button variant="secondary" size="s">
          Secondary S
        </Button>
        <Button variant="primary" size="xs">
          Primary XS
        </Button>
      </div>
      <div className="flex items-center gap-chekin-2">
        <Button variant="primary" loading>
          Saving…
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
