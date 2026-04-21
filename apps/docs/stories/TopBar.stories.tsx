import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  IconButton,
  Input,
  TopBar,
} from '@chekin/ui';

const meta: Meta<typeof TopBar> = {
  title: 'Layouts/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof TopBar>;

function I({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4M12 17h.01"/>',
  sparkle: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="15" cy="11" r="1" fill="currentColor"/><path d="M9 15c1 1 4 1 6 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

/** Minimal TopBar — breadcrumb + agent trigger + icon cluster. */
export const Minimal: Story = {
  render: () => (
    <div className="bg-chekin-surface-input-empty h-[120px]">
      <TopBar>
        <span className="font-sans font-semibold text-[14px] text-chekin-navy">Home</span>
        <span className="flex-1" />
        <Button variant="secondary" size="s" leftIcon={<span className="text-chekin-blue"><I d={ICON.sparkle} size={16} /></span>}>
          Ask Chek
        </Button>
        <IconButton label="Support" variant="secondary"><I d={ICON.help} /></IconButton>
        <IconButton label="Notifications" variant="secondary"><I d={ICON.bell} /></IconButton>
      </TopBar>
    </div>
  ),
};

/** Breadcrumb + search + primary action. */
export const WithSearchAndAction: Story = {
  render: () => (
    <div className="bg-chekin-surface-input-empty h-[120px]">
      <TopBar>
        <Breadcrumb>
          <BreadcrumbItem href="#">Portfolio</BreadcrumbItem>
          <BreadcrumbItem current>Properties</BreadcrumbItem>
        </Breadcrumb>
        <span className="flex-1" />
        <div className="relative w-[280px]">
          <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-chekin-gray-1 pointer-events-none">
            <I d={ICON.search} size={14} />
          </span>
          <Input containerClassName="w-full" placeholder="Search properties" className="pl-[34px]" aria-label="Search" />
        </div>
        <Button leftIcon={<I d={ICON.plus} size={14} />}>Add property</Button>
      </TopBar>
    </div>
  ),
};
