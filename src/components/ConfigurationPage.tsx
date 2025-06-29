import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calculator, Settings2 } from "lucide-react";

const ConfigurationPage = () => {
  const [roiCalculatorEnabled, setRoiCalculatorEnabled] = useState(false);
  const [workEmail, setWorkEmail] = useState("");
  const [pricingHints, setPricingHints] = useState("");
  const [customerOutcomes, setCustomerOutcomes] = useState("");
  const [caseStudies, setCaseStudies] = useState("");
  const [averageDealSize, setAverageDealSize] = useState("");
  const [currency, setCurrency] = useState("");
  const [roiTimeframe, setRoiTimeframe] = useState("");

  const handleGenerateCalculator = () => {
    // This will be connected to backend later
    console.log("Generating ROI Calculator with:", {
      workEmail,
      pricingHints,
      customerOutcomes,
      caseStudies,
      averageDealSize,
      currency,
      roiTimeframe
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

      {/* ROI Calculator Feature Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>AI Built ROI Calculator</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Generate a custom ROI calculator for your offer in minutes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="roi-calculator-toggle" className="text-sm">
                Enable
              </Label>
              <Switch
                id="roi-calculator-toggle"
                checked={roiCalculatorEnabled}
                onCheckedChange={setRoiCalculatorEnabled}
              />
            </div>
          </div>
        </CardHeader>

        {roiCalculatorEnabled && (
          <CardContent className="pt-0">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Get an AI Built ROI Calculator for your offer in minutes
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                  Drop your company email. Our custom software AI scans your site, captures pricing, proof, branding and everything that matters. A conversion ready calculator lands in your inbox before your coffee cools.
                </p>
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

                {/* Generate Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleGenerateCalculator}
                    className="w-full sm:w-auto px-8 py-3"
                    disabled={!workEmail.trim()}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Generate ROI Calculator
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
