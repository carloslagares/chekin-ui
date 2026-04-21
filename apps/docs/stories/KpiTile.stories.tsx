import type { Meta, StoryObj } from '@storybook/react';
import { KpiTile, HelpTooltip } from '@chekin/ui';

const meta: Meta<typeof KpiTile> = {
  title: 'Data display/KpiTile',
  component: KpiTile,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof KpiTile>;

export const Default: Story = {
  args: {
    label: 'Bookings imported',
    value: '12',
    delta: 'First sync today',
    deltaIcon: 'up',
    deltaTone: 'positive',
    spark: 'rise',
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <div className="w-[280px]"><KpiTile {...args} /></div>
  ),
};

export const Muted: Story = {
  args: {
    label: 'Reports submitted',
    value: '—',
    delta: 'Finish setup to enable',
    deltaTone: 'muted',
    spark: 'dashed',
  },
  render: (args) => (
    <div className="w-[280px]"><KpiTile {...args} /></div>
  ),
};

export const WithHelp: Story = {
  args: {
    label: 'Properties',
    helpIcon: <HelpTooltip content="Total active properties on this account." />,
    value: '1',
    delta: 'Add another to centralise ops',
    deltaIcon: 'flat',
    spark: 'flat',
  },
  render: (args) => (
    <div className="w-[280px]"><KpiTile {...args} /></div>
  ),
};

export const Grid: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="p-chekin-4 bg-chekin-surface-input-empty">
      <div className="grid grid-cols-4 gap-chekin-2 max-w-[1100px]">
        <KpiTile
          label="Properties"
          value="1"
          helpIcon={<HelpTooltip content="Total active properties." />}
          delta="Add another to centralise ops"
          deltaIcon="flat"
          spark="flat"
        />
        <KpiTile
          label="Bookings imported"
          value="12"
          delta="First sync today"
          deltaIcon="up"
          deltaTone="positive"
          spark="rise"
        />
        <KpiTile
          label="Check-ins completed"
          value={<>0 <span className="font-semibold text-[15px] text-chekin-gray-1 ml-1">of 12</span></>}
          delta="Links go out 48h before arrival"
          deltaTone="muted"
          spark="dashed"
        />
        <KpiTile
          label="Reports submitted"
          value="—"
          delta="Finish setup to enable"
          deltaTone="muted"
          spark="dashed"
        />
      </div>
    </div>
  ),
};
