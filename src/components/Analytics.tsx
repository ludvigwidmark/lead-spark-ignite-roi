
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </CardTitle>
          <CardDescription>
            Advanced analytics and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-8">Coming soon...</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
