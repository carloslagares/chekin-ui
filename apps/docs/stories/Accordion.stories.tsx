import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Dashboard/Accordion',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const LegalSteps: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="step-1" className="w-[720px] flex flex-col gap-chekin-1">
      <AccordionItem value="step-1">
        <AccordionTrigger>
          <span className="flex items-center gap-chekin-1">Step 1 · Pick nationality <Badge tone="info" appearance="soft" size="s">Spain</Badge></span>
        </AccordionTrigger>
        <AccordionContent>Guest nationality drives the required legal fields. Selection is persisted per property.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-2">
        <AccordionTrigger>Step 2 · Upload host ID</AccordionTrigger>
        <AccordionContent>PDF or photo. Scanned by the legal engine overnight; status shown here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-3">
        <AccordionTrigger>Step 3 · Connect police system</AccordionTrigger>
        <AccordionContent>OAuth with SES.Hospedajes. Test the connection after linking to validate the credentials.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
