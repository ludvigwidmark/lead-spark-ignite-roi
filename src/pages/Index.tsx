
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadCapture from "@/components/LeadCapture";
import LeadDashboard from "@/components/LeadDashboard";
import VoiceOutreach from "@/components/VoiceOutreach";
import ROICalculator from "@/components/ROICalculator";
import Analytics from "@/components/Analytics";
import { Users, Phone, Calculator, BarChart3, Target, TrendingUp } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">LeadFlow AI</h1>
            </div>
            <div className="text-sm text-gray-500">
              AI-Powered Lead Management Platform
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="capture" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Capture</span>
            </TabsTrigger>
            <TabsTrigger value="outreach" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Outreach</span>
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">ROI</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
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

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
