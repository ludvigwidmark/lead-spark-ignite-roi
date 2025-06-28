
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    sdrSalary: 10000,
    sdrToolsCost: 2000,
    sdrTrainingCost: 3000,
    sdrMeetingsPerMonth: 15,
    avgDealValue: 5000,
    conversionRate: 20,
    currentResponseTime: 17 // hours
  });

  // Astrid constants (from our end)
  const astridCost = 2490;
  const astridToolsCost = 0;
  const astridSetupTime = 0.5; // hours (30 minutes)
  const astridMeetingsPerMonth = 100;
  const astridResponseTime = 0.033; // hours (2 minutes)

  // Calculate improvement factors based on response time
  const responseTimeImprovement = inputs.currentResponseTime / astridResponseTime;
  const conversionBoost = Math.min(responseTimeImprovement * 0.1, 3.91); // Cap at 391%
  const improvedConversionRate = inputs.conversionRate * (1 + conversionBoost);

  // Monthly calculations
  const sdrMonthlyCost = inputs.sdrSalary + inputs.sdrToolsCost;
  const sdrMonthlyRevenue = inputs.sdrMeetingsPerMonth * (inputs.conversionRate / 100) * inputs.avgDealValue;
  const astridMonthlyRevenue = astridMeetingsPerMonth * (improvedConversionRate / 100) * inputs.avgDealValue;

  // Annual calculations
  const sdrAnnualCost = sdrMonthlyCost * 12 + inputs.sdrTrainingCost;
  const astridAnnualCost = astridCost * 12;
  const sdrAnnualRevenue = sdrMonthlyRevenue * 12;
  const astridAnnualRevenue = astridMonthlyRevenue * 12;

  // ROI calculations
  const sdrROI = ((sdrAnnualRevenue - sdrAnnualCost) / sdrAnnualCost) * 100;
  const astridROI = ((astridAnnualRevenue - astridAnnualCost) / astridAnnualCost) * 100;
  const roiImprovement = astridROI / sdrROI;

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="bg-primary text-primary-foreground py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 font-work-sans">ROI Calculator</h2>
          <h3 className="text-2xl mb-4 font-work-sans">See Your Potential Returns</h3>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Enter your current sales metrics to see how Astrid can transform your ROI
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="bg-background/10 border-primary-foreground/20 mb-8">
            <CardHeader>
              <CardTitle className="text-primary-foreground font-work-sans text-center">Your Current Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-primary-foreground">SDR Monthly Salary (€)</Label>
                <Input
                  type="number"
                  value={inputs.sdrSalary}
                  onChange={(e) => handleInputChange('sdrSalary', e.target.value)}
                  className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-primary-foreground">Monthly Tools Cost (€)</Label>
                <Input
                  type="number"
                  value={inputs.sdrToolsCost}
                  onChange={(e) => handleInputChange('sdrToolsCost', e.target.value)}
                  className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-primary-foreground">Training Cost (€)</Label>
                <Input
                  type="number"
                  value={inputs.sdrTrainingCost}
                  onChange={(e) => handleInputChange('sdrTrainingCost', e.target.value)}
                  className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-primary-foreground">Meetings/Month</Label>
                <Input
                  type="number"
                  value={inputs.sdrMeetingsPerMonth}
                  onChange={(e) => handleInputChange('sdrMeetingsPerMonth', e.target.value)}
                  className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-primary-foreground">Average Deal Value (€)</Label>
                <Input
                  type="number"
                  value={inputs.avgDealValue}
                  onChange={(e) => handleInputChange('avgDealValue', e.target.value)}
                  className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-primary-foreground">Conversion Rate (%)</Label>
                <Input
                  type="number"
                  value={inputs.conversionRate}
                  onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                  className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-background/10 border-primary-foreground/20">
              <CardHeader>
                <CardTitle className="text-primary-foreground font-work-sans">Traditional SDR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-primary-foreground/90">
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-bold">€{sdrMonthlyCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Cost:</span>
                  <span className="font-bold">€{sdrAnnualCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue:</span>
                  <span className="font-bold">€{sdrMonthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Revenue:</span>
                  <span className="font-bold">€{sdrAnnualRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-primary-foreground/20 pt-4">
                  <span>Annual ROI:</span>
                  <span className="font-bold text-xl">{sdrROI.toFixed(0)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/10 border-primary-foreground/20">
              <CardHeader>
                <CardTitle className="text-primary-foreground font-work-sans">With Astrid AI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-primary-foreground/90">
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-bold">€{astridCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Cost:</span>
                  <span className="font-bold">€{astridAnnualCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue:</span>
                  <span className="font-bold">€{astridMonthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Revenue:</span>
                  <span className="font-bold">€{astridAnnualRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-primary-foreground/20 pt-4">
                  <span>Annual ROI:</span>
                  <span className="font-bold text-xl">{astridROI.toFixed(0)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card className="bg-background/10 border-primary-foreground/20">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4 font-work-sans">
                  {roiImprovement.toFixed(1)}X
                </div>
                <p className="text-2xl mb-2">ROI Improvement</p>
                <p className="text-lg opacity-90">
                  Save €{(sdrAnnualCost - astridAnnualCost).toLocaleString()} annually while generating 
                  €{(astridAnnualRevenue - sdrAnnualRevenue).toLocaleString()} more revenue
                </p>
                <div className="mt-6 text-sm opacity-75">
                  <p>* Calculations based on improved response time from {inputs.currentResponseTime}h to 2 minutes</p>
                  <p>* Conversion improvement factor: {(conversionBoost * 100).toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
