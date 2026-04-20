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
  parameters: {
    docs: {
      description: {
        component:
          'Dialog is the overlay primitive. The button that opens it is a regular `<Button>` (any variant) wired as `<DialogTrigger>`. ' +
          'The stories below show both states — with a trigger (click to open) and open-by-default (so you see the full content without clicking).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const confirmBody = (
  <>
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
  </>
);

export const WithTrigger: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Open dialog</Button>
      </DialogTrigger>
      <DialogContent size="s">{confirmBody}</DialogContent>
    </Dialog>
  ),
  parameters: { layout: 'centered' },
};

export const OpenByDefault: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent size="s">{confirmBody}</DialogContent>
    </Dialog>
  ),
  parameters: { layout: 'centered' },
};
