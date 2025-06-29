
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Magnet, Settings2, HelpCircle, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConfigurationPage = () => {
  const [leadMagnetEnabled, setLeadMagnetEnabled] = useState(false);
  const [retentionEnabled, setRetentionEnabled] = useState(false);
  const [workEmail, setWorkEmail] = useState("");
  const [pricingHints, setPricingHints] = useState("");
  const [customerOutcomes, setCustomerOutcomes] = useState("");
  const [caseStudies, setCaseStudies] = useState("");
  const [averageDealSize, setAverageDealSize] = useState("");
  const [currency, setCurrency] = useState("");
  const [roiTimeframe, setRoiTimeframe] = useState("");
  const { toast } = useToast();

  const handleGenerateLeadMagnet = () => {
    // This will be connected to backend later
    console.log("Generating Lead Magnet with:", {
      workEmail,
      pricingHints,
      customerOutcomes,
      caseStudies,
      averageDealSize,
      currency,
      roiTimeframe
    });
  };

  const handleSetupHelp = () => {
    // This will be connected to backend later
    console.log("Requesting setup help for Lead Magnet");
  };

  const handleRetentionSetupHelp = () => {
    toast({
      title: "Coming Soon",
      description: "PostHog integration and retention setup help is coming soon! Stay tuned for updates."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Configuration</h2>
          <p className="text-muted-foreground">Manage your platform settings and features</p>
        </div>
      </div>

      {/* Lead Magnet Feature Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Magnet className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Lead Magnet</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Create high-value lead magnets that convert prospects into engaged customers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="lead-magnet-toggle" className="text-sm">
                Enable
              </Label>
              <Switch
                id="lead-magnet-toggle"
                checked={leadMagnetEnabled}
                onCheckedChange={setLeadMagnetEnabled}
              />
            </div>
          </div>
        </CardHeader>

        {leadMagnetEnabled && (
          <CardContent className="pt-0">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Get a custom lead magnet for your offer in minutes
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-4">
                  We'll create value-driven content that attracts your ideal prospects. Our AI analyzes your business, builds compelling lead magnets, and automates the entire process for both new leads and existing customers.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>What we'll set up:</strong> High-converting lead magnets, automated nurture sequences, value-first content that builds trust, and seamless integration with your existing customer journey. Perfect for capturing quality leads and re-engaging existing customers with fresh value.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Work Email */}
                <div className="space-y-2">
                  <Label htmlFor="work-email" className="font-medium">
                    Work Email
                  </Label>
                  <Input
                    id="work-email"
                    type="email"
                    placeholder="you@company.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="max-w-md"
                  />
                </div>

                {/* Toggle Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Switch 
                      id="additional-info-toggle"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="additional-info-toggle" className="text-sm font-medium">
                        If pricing hints, customer outcomes, case studies, average deal size, currency, or ROI timeframe aren't available on the website linked to your company email, please add them here for the best results
                      </Label>
                    </div>
                  </div>

                  {/* Additional Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricing-hints" className="font-medium">
                        Pricing Hints
                      </Label>
                      <Textarea
                        id="pricing-hints"
                        placeholder="Describe your pricing structure..."
                        value={pricingHints}
                        onChange={(e) => setPricingHints(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-outcomes" className="font-medium">
                        Customer Outcomes
                      </Label>
                      <Textarea
                        id="customer-outcomes"
                        placeholder="What results do customers achieve?"
                        value={customerOutcomes}
                        onChange={(e) => setCustomerOutcomes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="case-studies" className="font-medium">
                        Case Studies
                      </Label>
                      <Textarea
                        id="case-studies"
                        placeholder="Share success stories or case studies..."
                        value={caseStudies}
                        onChange={(e) => setCaseStudies(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="average-deal-size" className="font-medium">
                        Average Deal Size
                      </Label>
                      <Input
                        id="average-deal-size"
                        placeholder="e.g., $5,000"
                        value={averageDealSize}
                        onChange={(e) => setAverageDealSize(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency" className="font-medium">
                        Currency
                      </Label>
                      <Input
                        id="currency"
                        placeholder="e.g., USD, EUR, GBP"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roi-timeframe" className="font-medium">
                        ROI Timeframe
                      </Label>
                      <Input
                        id="roi-timeframe"
                        placeholder="e.g., 3 months, 1 year"
                        value={roiTimeframe}
                        onChange={(e) => setRoiTimeframe(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleGenerateLeadMagnet}
                    className="flex-1 sm:flex-none px-8 py-3"
                    disabled={!workEmail.trim()}
                  >
                    <Magnet className="w-4 h-4 mr-2" />
                    Generate Lead Magnet
                  </Button>
                  <Button 
                    onClick={handleSetupHelp}
                    variant="outline"
                    className="flex-1 sm:flex-none px-6 py-3"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Get help with setup
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Retention Feature Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Retention</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Keep customers engaged longer with data-driven insights and automated retention strategies
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="retention-toggle" className="text-sm">
                Enable
              </Label>
              <Switch
                id="retention-toggle"
                checked={retentionEnabled}
                onCheckedChange={setRetentionEnabled}
              />
            </div>
          </div>
        </CardHeader>

        {retentionEnabled && (
          <CardContent className="pt-0">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Boost customer retention with AI-powered insights
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-4">
                  Integrate with PostHog to track user behavior, identify at-risk customers, and automatically trigger retention campaigns to keep your customers engaged longer.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>What we'll set up:</strong> PostHog integration for behavioral tracking, automated retention campaigns, churn prediction models, personalized re-engagement sequences, and customer health scoring to maximize lifetime value.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">Coming Soon</h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    PostHog integration and retention features are currently in development. 
                    Get notified when it's ready and receive help setting it up.
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 flex justify-center">
                  <Button 
                    onClick={handleRetentionSetupHelp}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Get help with PostHog setup
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Other Configuration Options */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Settings2 className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>General Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Additional platform configuration options
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Settings2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>More configuration options coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationPage;
