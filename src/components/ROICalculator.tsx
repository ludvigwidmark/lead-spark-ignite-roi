
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Clock } from "lucide-react";

const ROICalculator = () => {
  return (
    <div className="space-y-6">
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
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Clock className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Coming Soon...</h3>
          <p className="text-gray-500 dark:text-gray-500 text-center max-w-md">
            We're working on an advanced ROI calculator that will help you project the potential returns 
            from your lead generation investments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;
