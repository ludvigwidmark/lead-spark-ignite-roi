
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Calculator, FileText, Download, TrendingUp } from "lucide-react";

const ROICalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    currentLeads: 100,
    conversionRate: 5,
    avgDealValue: 50000,
    salesCycleWeeks: 12,
    salesTeamSize: 3,
    avgSalary: 80000
  });

  const [improvementRate, setImprovementRate] = useState([40]);

  // Calculations
  const currentRevenue = inputs.currentLeads * (inputs.conversionRate / 100) * inputs.avgDealValue;
  const improvedLeads = Math.round(inputs.currentLeads * (1 + improvementRate[0] / 100));
  const improvedRevenue = improvedLeads * (inputs.conversionRate / 100) * inputs.avgDealValue;
  const revenueIncrease = improvedRevenue - currentRevenue;
  const annualROI = revenueIncrease * (52 / inputs.salesCycleWeeks);
  const costSavings = inputs.salesTeamSize * inputs.avgSalary * 0.3; // 30% efficiency gain

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const generateProposal = () => {
    toast({
      title: "Proposal Generated!",
      description: "Your custom ROI proposal has been created and is ready for download.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>ROI Calculator</span>
            </CardTitle>
            <CardDescription>
              Calculate the potential return on investment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentLeads">Monthly Leads</Label>
                <Input
                  id="currentLeads"
                  type="number"
                  value={inputs.currentLeads}
                  onChange={(e) => handleInputChange("currentLeads", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                <Input
                  id="conversionRate"
                  type="number"
                  value={inputs.conversionRate}
                  onChange={(e) => handleInputChange("conversionRate", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="avgDealValue">Avg Deal Value ($)</Label>
                <Input
                  id="avgDealValue"
                  type="number"
                  value={inputs.avgDealValue}
                  onChange={(e) => handleInputChange("avgDealValue", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="salesCycleWeeks">Sales Cycle (weeks)</Label>
                <Input
                  id="salesCycleWeeks"
                  type="number"
                  value={inputs.salesCycleWeeks}
                  onChange={(e) => handleInputChange("salesCycleWeeks", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salesTeamSize">Sales Team Size</Label>
                <Input
                  id="salesTeamSize"
                  type="number"
                  value={inputs.salesTeamSize}
                  onChange={(e) => handleInputChange("salesTeamSize", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="avgSalary">Avg Salary ($)</Label>
                <Input
                  id="avgSalary"
                  type="number"
                  value={inputs.avgSalary}
                  onChange={(e) => handleInputChange("avgSalary", Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label>Expected Improvement Rate: {improvementRate[0]}%</Label>
              <Slider
                value={improvementRate}
                onValueChange={setImprovementRate}
                max={100}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>ROI Projection</span>
            </CardTitle>
            <CardDescription>
              Projected returns with LeadFlow AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Current Performance</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex justify-between">
                    <span>Monthly Leads:</span>
                    <span className="font-medium">{inputs.currentLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-medium">${currentRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">With LeadFlow AI</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <div className="flex justify-between">
                    <span>Improved Leads:</span>
                    <span className="font-medium">{improvedLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-medium">${improvedRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Increase:</span>
                    <span className="font-medium">${revenueIncrease.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Annual Impact</h4>
                <div className="space-y-1 text-sm text-yellow-700">
                  <div className="flex justify-between">
                    <span>Revenue Increase:</span>
                    <span className="font-medium">${annualROI.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Savings:</span>
                    <span className="font-medium">${costSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="font-semibold">Total ROI:</span>
                    <span className="font-bold text-lg">${(annualROI + costSavings).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button onClick={generateProposal} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Generate Proposal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposal Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Proposal Preview</CardTitle>
          <CardDescription>
            Customized proposal based on your ROI calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gray-50 rounded-lg space-y-4">
            <div className="text-center border-b pb-4">
              <h3 className="text-xl font-bold">LeadFlow AI Implementation Proposal</h3>
              <p className="text-gray-600">Prepared for: Your Company</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Executive Summary</h4>
              <p className="text-sm text-gray-700">
                Based on your current lead generation metrics, implementing LeadFlow AI is projected to deliver:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• {improvementRate[0]}% increase in qualified leads</li>
                <li>• ${revenueIncrease.toLocaleString()} additional monthly revenue</li>
                <li>• ${costSavings.toLocaleString()} annual cost savings through automation</li>
                <li>• {Math.round((annualROI + costSavings) / 120000 * 100)}% ROI within the first year</li>
              </ul>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Customize Proposal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;
