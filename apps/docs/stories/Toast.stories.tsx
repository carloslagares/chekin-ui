import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/Toast',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const SuccessToast: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider swipeDirection="right">
        <div className="p-chekin-5">
          <Button
            onClick={() => {
              setOpen(false);
              setTimeout(() => setOpen(true), 60);
            }}
          >
            Show toast
          </Button>
        </div>
        <Toast open={open} onOpenChange={setOpen} tone="success" duration={4000}>
          <div className="flex-1">
            <ToastTitle>Check-in link sent</ToastTitle>
            <ToastDescription>The guest will receive it in the next minute.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
  parameters: { layout: 'padded' },
};
