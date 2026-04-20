import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/Tabs',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="info" className="w-[720px]">
      <TabsList>
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="legal">
          Legal <Badge tone="warn" appearance="soft" size="s">2</Badge>
        </TabsTrigger>
        <TabsTrigger value="protection">Protection</TabsTrigger>
        <TabsTrigger value="check-in">Online check-in</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <p className="text-chekin-navy">Property basics, address, photos, amenities.</p>
      </TabsContent>
      <TabsContent value="legal">
        <p className="text-chekin-navy">Police connection, guest signatures, contracts, privacy policy.</p>
      </TabsContent>
      <TabsContent value="protection">
        <p className="text-chekin-navy">Damage coverage tiers and claim settings.</p>
      </TabsContent>
      <TabsContent value="check-in">
        <p className="text-chekin-navy">Email templates, timing, required documents.</p>
      </TabsContent>
      <TabsContent value="branding">
        <p className="text-chekin-navy">Logo, brand color, custom domain.</p>
      </TabsContent>
    </Tabs>
  ),
};
