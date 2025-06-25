
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lightbulb, 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  Zap,
  Activity,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdoptionPage = () => {
  const [clientName, setClientName] = useState("");
  const [sdgGoal, setSdgGoal] = useState("");
  const [usageData, setUsageData] = useState("");
  const { toast } = useToast();

  const handleROIReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "ROI Report Generated",
      description: `Retention report sent to ${clientName} highlighting their impact on ${sdgGoal}`,
    });
    setClientName("");
    setSdgGoal("");
  };

  const handleUsageAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Usage Analysis Complete",
      description: "Identified drop-off points and generated adoption recommendations",
    });
    setUsageData("");
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Adoption Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">SDG Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">234%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Output Increase</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ROI Report Generator */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  ROI Report Generator
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Send automated retention reports to clients
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleROIReportSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-gray-700 dark:text-gray-300">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  placeholder="Enter client company name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sdgGoal" className="text-gray-700 dark:text-gray-300">
                  SDG Goal Focus
                </Label>
                <Input
                  id="sdgGoal"
                  placeholder="e.g., Clean Energy, Quality Education"
                  value={sdgGoal}
                  onChange={(e) => setSdgGoal(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                disabled={!clientName || !sdgGoal}
              >
                <div className="flex items-center space-x-2">
                  <span>Generate ROI Report</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Usage Analysis */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Usage Analysis
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Identify drop-off points and improve adoption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUsageAnalysis} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usageData" className="text-gray-700 dark:text-gray-300">
                  Usage Data / Feedback
                </Label>
                <Textarea
                  id="usageData"
                  placeholder="Paste usage analytics or describe where users are dropping off..."
                  value={usageData}
                  onChange={(e) => setUsageData(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-32"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                disabled={!usageData}
              >
                <div className="flex items-center space-x-2">
                  <span>Analyze Usage</span>
                  <Zap className="w-4 h-4" />
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Adoption Insights */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">AI Adoption Insights</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Help AI companies improve customer success and retention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Impact Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Monitor SDG goal progress and quantify real-world impact
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="w-8 h-8 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Retention Boost</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automated reports showing value increase retention rates
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <div className="w-8 h-8 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Early Warning</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Identify at-risk clients before they churn
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdoptionPage;
