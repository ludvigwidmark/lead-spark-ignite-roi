
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    sdrSalary: 10000,
    sdrMeetingsPerMonth: 15,
    avgDealValue: 5000,
    conversionRate: 20,
  });

  // Astrid constants
  const astridCost = 2490;
  const astridMeetingsPerMonth = 100;
  const astridResponseTime = 0.033; // 2 minutes
  const currentResponseTime = 17; // hours

  // Calculate improvement
  const responseTimeImprovement = currentResponseTime / astridResponseTime;
  const conversionBoost = Math.min(responseTimeImprovement * 0.1, 3.91);
  const improvedConversionRate = inputs.conversionRate * (1 + conversionBoost);

  // Monthly calculations
  const sdrMonthlyRevenue = inputs.sdrMeetingsPerMonth * (inputs.conversionRate / 100) * inputs.avgDealValue;
  const astridMonthlyRevenue = astridMeetingsPerMonth * (improvedConversionRate / 100) * inputs.avgDealValue;

  // Annual calculations
  const sdrAnnualCost = inputs.sdrSalary * 12;
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
    <div className="bg-muted/30 py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 font-work-sans">ROI Calculator</CardTitle>
              <p className="text-gray-600 text-sm">See your potential returns with Astrid AI</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Input Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">SDR Monthly Salary (€)</Label>
                  <Input
                    type="number"
                    value={inputs.sdrSalary}
                    onChange={(e) => handleInputChange('sdrSalary', e.target.value)}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Meetings/Month</Label>
                  <Input
                    type="number"
                    value={inputs.sdrMeetingsPerMonth}
                    onChange={(e) => handleInputChange('sdrMeetingsPerMonth', e.target.value)}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Average Deal Value (€)</Label>
                  <Input
                    type="number"
                    value={inputs.avgDealValue}
                    onChange={(e) => handleInputChange('avgDealValue', e.target.value)}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Conversion Rate (%)</Label>
                  <Input
                    type="number"
                    value={inputs.conversionRate}
                    onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                    className="border-gray-300 focus:border-primary"
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Traditional SDR</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{sdrROI.toFixed(0)}%</div>
                  <div className="text-xs text-gray-500">Annual ROI</div>
                </div>

                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">With Astrid AI</div>
                  <div className="text-2xl font-bold text-primary mb-1">{astridROI.toFixed(0)}%</div>
                  <div className="text-xs text-gray-500">Annual ROI</div>
                </div>
              </div>

              {/* Summary */}
              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-3xl font-bold text-primary mb-2 font-work-sans">
                  {roiImprovement.toFixed(1)}X
                </div>
                <p className="text-lg font-medium text-gray-900 mb-1">ROI Improvement</p>
                <p className="text-sm text-gray-600">
                  Save €{(sdrAnnualCost - astridAnnualCost).toLocaleString()} annually while generating 
                  €{(astridAnnualRevenue - sdrAnnualRevenue).toLocaleString()} more revenue
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
