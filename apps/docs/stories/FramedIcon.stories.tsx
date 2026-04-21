import type { Meta, StoryObj } from '@storybook/react';
import { FramedIcon } from '@chekin/ui';

function Sparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const meta: Meta<typeof FramedIcon> = {
  title: 'Feedback/FramedIcon',
  component: FramedIcon,
  tags: ['autodocs'],
  args: { children: <Sparkle /> },
};
export default meta;
type Story = StoryObj<typeof FramedIcon>;

export const ToneMatrix: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-2">
      {(['neutral', 'info', 'success', 'warn', 'error'] as const).map((tone) => (
        <FramedIcon key={tone} tone={tone}><Sparkle /></FramedIcon>
      ))}
    </div>
  ),
};
export const SizesAndShapes: Story = {
  render: () => (
    <div className="flex items-center gap-chekin-2">
      <FramedIcon size="s" shape="rounded"><Sparkle /></FramedIcon>
      <FramedIcon size="m" shape="rounded"><Sparkle /></FramedIcon>
      <FramedIcon size="l" shape="rounded"><Sparkle /></FramedIcon>
      <FramedIcon size="m" shape="circle"><Sparkle /></FramedIcon>
    </div>
  ),
};
