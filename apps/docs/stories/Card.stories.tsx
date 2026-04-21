import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@chekin/ui';

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[520px]">
      <CardHeader>
        <div>
          <CardTitle>Property protection</CardTitle>
          <CardDescription>Covers accidental damage during the stay.</CardDescription>
        </div>
      </CardHeader>
      <p className="font-sans text-[13px] leading-5 text-chekin-gray-1">
        Enable Property Protection to secure your listings against accidental damage and minor theft.
        Claims are processed within 48h of the check-out.
      </p>
      <CardFooter>
        <Button variant="secondary" size="s">Learn more</Button>
        <Button size="s">Activate</Button>
      </CardFooter>
    </Card>
  ),
};
