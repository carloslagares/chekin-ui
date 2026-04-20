import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/Dialog',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const CancelBooking: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Cancel booking</Button>
      </DialogTrigger>
      <DialogContent size="s">
        <DialogHeader>
          <DialogTitle>Cancel reservation?</DialogTitle>
          <DialogDescription>
            This will notify the guest and release the property for the selected dates.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>The guest will receive an automatic email in their language. You cannot undo this.</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="secondary" size="s">Keep it</Button>
          <Button variant="destructive" size="s">Cancel booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: { layout: 'centered' },
};
