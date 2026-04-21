import type { Meta, StoryObj } from '@storybook/react';
import { Badge, SetupChecklist, SetupStep } from '@chekin/ui';

const meta: Meta<typeof SetupChecklist> = {
  title: 'Patterns/SetupChecklist',
  component: SetupChecklist,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof SetupChecklist>;

function I({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  shield: '<path d="M12 2 4 5v7c0 5 3.5 8 8 10 4.5-2 8-5 8-10V5z"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  fileShield: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 14l2 2 4-4"/>',
  envelope: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
};

export const Default: Story = {
  render: () => (
    <div className="p-chekin-4 bg-chekin-surface-input-empty">
      <SetupChecklist
        title="Finish setting up Chekin"
        badge={<Badge tone="info" appearance="soft" size="s">2 of 5 done</Badge>}
        description="Complete these steps to unlock automated online check-in and police reporting."
        progress={40}
        estimateLabel={<><b className="text-chekin-navy">40%</b> · about 8 minutes left</>}
      >
        <SetupStep state="done"   icon={<I d={ICON.shield} />}     title="Create workspace"        description="Sonder Madrid · set up" cta="Completed" />
        <SetupStep state="done"   icon={<I d={ICON.shield} />}     title="Add your first property" description="Puerta del Sol · Madrid, ES" cta="Completed" />
        <SetupStep state="active" icon={<I d={ICON.layers} />}     title="Connect a channel or PMS" description="Import bookings automatically from Booking.com, Guesty, Hostaway and 120+ more." cta="Connect" />
        <SetupStep state="todo"   icon={<I d={ICON.fileShield} />} title="Set up police reporting" description="Choose the regulation that applies to your property." cta="Set up" />
        <SetupStep state="todo"   icon={<I d={ICON.envelope} />}   title="Test the guest flow"     description="Send yourself a sample check-in link to see what guests experience." cta="Preview" />
      </SetupChecklist>
    </div>
  ),
};
