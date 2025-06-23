
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeadCapture from "@/components/LeadCapture";
import LeadDashboard from "@/components/LeadDashboard";
import VoiceOutreach from "@/components/VoiceOutreach";
import ROICalculator from "@/components/ROICalculator";
import { Users, Phone, Calculator, Target, TrendingUp, Moon, Sun } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  AI-Powered Lead Management Platform
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">LeadFlow AI</h1>
              </div>
              
              <div className="flex items-center justify-end min-w-0 flex-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="border-gray-300 dark:border-gray-600"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-white dark:bg-gray-800">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="capture" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Capture</span>
              </TabsTrigger>
              <TabsTrigger value="outreach" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Outreach</span>
              </TabsTrigger>
              <TabsTrigger value="roi" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">ROI</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <LeadDashboard />
            </TabsContent>

            <TabsContent value="capture">
              <LeadCapture />
            </TabsContent>

            <TabsContent value="outreach">
              <VoiceOutreach />
            </TabsContent>

            <TabsContent value="roi">
              <ROICalculator />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
