import type { Meta, StoryObj } from '@storybook/react';
import { AIPanel, Button, Chip, Input } from '@chekin/ui';

const meta: Meta<typeof AIPanel> = {
  title: 'Layouts/AIPanel',
  component: AIPanel,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof AIPanel>;

function MessageBubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  return (
    <div
      className={
        role === 'user'
          ? 'self-end bg-chekin-blue text-white max-w-[85%] px-chekin-2 py-chekin-1 rounded-chekin-card rounded-br-sm font-sans text-[13px] leading-5'
          : 'self-start bg-chekin-surface-input-empty text-chekin-navy max-w-[85%] px-chekin-2 py-chekin-1 rounded-chekin-card rounded-bl-sm font-sans text-[13px] leading-5'
      }
    >
      {children}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div style={{ height: 680, display: 'flex', justifyContent: 'flex-end', background: '#FDFDFF' }}>
      <div style={{ borderLeft: '1px solid #DEDEEB' }}>
        <AIPanel
          onClose={() => {}}
          suggestions={
            <>
              <Chip onClick={() => {}}>Who's checking in today?</Chip>
              <Chip onClick={() => {}}>Any IDs still missing?</Chip>
              <Chip onClick={() => {}}>Draft a late check-out reply</Chip>
            </>
          }
          composer={
            <Input placeholder="Ask anything about your properties" aria-label="Message" />
          }
        >
          <MessageBubble role="assistant">
            Good morning! You have 3 arrivals today. One guest (Matteo Leone at Villa Serena)
            still hasn't submitted their ID — I can resend the link if you want.
          </MessageBubble>
          <MessageBubble role="user">Yes, resend it.</MessageBubble>
          <MessageBubble role="assistant">
            Done. Link sent to matteo@example.com. I'll flag it again in 2 hours if it's still pending.
          </MessageBubble>
          <Button variant="secondary" size="s">View today's agenda</Button>
        </AIPanel>
      </div>
    </div>
  ),
};
