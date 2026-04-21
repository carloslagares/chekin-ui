import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AppShell,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Callout,
  FramedIcon,
  HelpTooltip,
  Rail,
  RailItem,
  SelectableCard,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  TopBar,
} from '@chekin/ui';

const meta: Meta = {
  title: 'Examples/Dashboard/Property Legal',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dashboard' } },
};
export default meta;
type Story = StoryObj;

function I({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const ICON = {
  home: '<path d="m3 10 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/>',
  book: '<path d="M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2-3 2z"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
  shield: '<path d="M12 3 4 6v7c0 4.5 3.5 7.5 8 8 4.5-.5 8-3.5 8-8V6z"/>',
  police: '<circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  contract: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>',
};

export const Default: Story = {
  render: () => {
    const [plan, setPlan] = useState('standard');
    const [spaces, setSpaces] = useState(true);
    const [privacyToggle, setPrivacyToggle] = useState(true);

    return (
      <AppShell
        rail={
          <Rail logo={<span className="inline-flex items-center justify-center w-9 h-9 rounded-chekin-input bg-chekin-blue text-white font-bold text-[14px]">C</span>} footer={<Avatar name="Marta Sanz" size="s" />}>
            <RailItem label="Home"><I d={ICON.home} /></RailItem>
            <RailItem label="Bookings"><I d={ICON.book} /></RailItem>
            <RailItem label="Properties" active><I d={ICON.building} /></RailItem>
          </Rail>
        }
        sidebar={
          <Sidebar heading="Casa Azul" subheading="Calle Serrano 12, Madrid">
            <SidebarSection label="Setup">
              <SidebarItem>Property info</SidebarItem>
              <SidebarItem active>Legal</SidebarItem>
              <SidebarItem>Property protection</SidebarItem>
              <SidebarItem>Online check-in</SidebarItem>
              <SidebarItem>Branding</SidebarItem>
            </SidebarSection>
            <SidebarSection label="Automation">
              <SidebarItem>Communications</SidebarItem>
              <SidebarItem>Taxes</SidebarItem>
              <SidebarItem>Upselling</SidebarItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <TopBar>
          <Breadcrumb>
            <BreadcrumbItem href="#">Properties</BreadcrumbItem>
            <BreadcrumbItem href="#">Casa Azul</BreadcrumbItem>
            <BreadcrumbItem current>Legal</BreadcrumbItem>
          </Breadcrumb>
        </TopBar>

        <div className="p-chekin-3 flex flex-col gap-chekin-3 max-w-[960px] mx-auto w-full">
          <header className="flex items-start justify-between gap-chekin-2">
            <div>
              <div className="flex items-center gap-chekin-1">
                <h1 className="font-sans font-semibold text-[22px] leading-7 text-chekin-navy">Legal</h1>
                <Tag>Spain</Tag>
              </div>
              <p className="font-sans text-[13px] leading-4 text-chekin-gray-1 mt-[4px]">
                Required legal steps for hosting in Spain. Fields auto-fill based on the guest's nationality.
              </p>
            </div>
            <Button variant="secondary" size="s">Preview guest form</Button>
          </header>

          <Tabs defaultValue="setup">
            <TabsList>
              <TabsTrigger value="setup">Setup <Badge tone="warn" appearance="soft" size="s">2</Badge></TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="setup">
              <div className="flex flex-col gap-chekin-3 pt-chekin-1">
                <Callout tone="info" title="Heads up" icon={<I d={ICON.shield} size={16} />}>
                  Spain requires police registration, guest signatures, and a signed rental contract. We pre-fill everything once you've connected your police system.
                </Callout>

                {/* Section: Police Connection */}
                <section className="flex flex-col gap-chekin-2">
                  <div className="flex items-center gap-chekin-1">
                    <FramedIcon tone="info"><I d={ICON.police} size={18} /></FramedIcon>
                    <div>
                      <h2 className="font-sans font-semibold text-[15px] leading-5 text-chekin-navy">Police connection</h2>
                      <p className="font-sans text-[12px] leading-4 text-chekin-gray-1">
                        Required in Spain. We use SES.Hospedajes.
                      </p>
                    </div>
                    <HelpTooltip content="If your system is not supported, contact support and we'll add a manual fallback." className="ml-auto" />
                  </div>

                  <Accordion type="single" collapsible defaultValue="steps" className="flex flex-col gap-chekin-1">
                    <AccordionItem value="steps">
                      <AccordionTrigger>
                        <span className="flex items-center gap-chekin-1">
                          Connect to SES.Hospedajes
                          <Tag>7 steps</Tag>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal pl-chekin-3 space-y-[4px]">
                          <li>Request access credentials from your local policia office.</li>
                          <li>Receive user + password via secure email.</li>
                          <li>Upload your host ID (PDF or photo).</li>
                          <li>Paste credentials into the connection form.</li>
                          <li>Run the test connection — receives back a signed token.</li>
                          <li>Confirm the test booking appears in SES within 5 min.</li>
                          <li>Enable auto-registration for future bookings.</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex items-center gap-chekin-2 pt-chekin-1">
                    <Switch checked={spaces} onCheckedChange={setSpaces} label="Divide the property into spaces" />
                  </div>
                </section>

                {/* Section: Guest Signature */}
                <section className="flex flex-col gap-chekin-2 pt-chekin-2 border-t border-chekin-gray-3">
                  <div className="flex items-center gap-chekin-1">
                    <FramedIcon tone="info"><I d={ICON.contract} size={18} /></FramedIcon>
                    <div>
                      <h2 className="font-sans font-semibold text-[15px] leading-5 text-chekin-navy">Guest signature</h2>
                      <p className="font-sans text-[12px] leading-4 text-chekin-gray-1">
                        Legally binding digital signature captured during online check-in.
                      </p>
                    </div>
                  </div>
                  <Callout tone="tip">
                    Signatures are stored in the PDF archive alongside the contract and the police report.
                  </Callout>
                  <Switch checked={privacyToggle} onCheckedChange={setPrivacyToggle} label="Require signature before issuing the key" />
                </section>

                {/* Section: Contract tier */}
                <section className="flex flex-col gap-chekin-2 pt-chekin-2 border-t border-chekin-gray-3">
                  <div>
                    <h2 className="font-sans font-semibold text-[15px] leading-5 text-chekin-navy">Contract tier</h2>
                    <p className="font-sans text-[12px] leading-4 text-chekin-gray-1">
                      Pick the protection level the guest signs before the stay.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-chekin-2">
                    {[
                      { id: 'basic',    title: 'Basic',    description: 'Short rental contract. Standard legal boilerplate.', price: 'Free' },
                      { id: 'standard', title: 'Standard', description: 'Rental contract + house rules + cancellation policy.', price: 'EUR 2.90 / booking' },
                      { id: 'premium',  title: 'Premium',  description: 'Everything in Standard + custom clauses + legal review.', price: 'EUR 9.90 / booking' },
                    ].map((p) => (
                      <SelectableCard
                        key={p.id}
                        title={p.title}
                        description={p.description}
                        price={p.price}
                        selected={plan === p.id}
                        onChange={() => setPlan(p.id)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <p className="text-chekin-gray-1">No changes in the last 30 days.</p>
            </TabsContent>
            <TabsContent value="templates">
              <p className="text-chekin-gray-1">Contract templates library — coming soon.</p>
            </TabsContent>
          </Tabs>

          {/* Sticky Save bar */}
          <div className="sticky bottom-0 -mx-chekin-3 px-chekin-3 py-chekin-2 bg-white border-t border-chekin-gray-3 flex items-center justify-end gap-chekin-1 shadow-chekin-card">
            <Button variant="secondary" size="s">Discard</Button>
            <Button size="s">Save changes</Button>
          </div>
        </div>
      </AppShell>
    );
  },
};
