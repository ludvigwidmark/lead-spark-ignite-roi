
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeadsPage from "@/components/LeadsPage";
import VoiceOutreach from "@/components/VoiceOutreach";
import ClyoLogo from "@/components/ClyoLogo";
import { Users, Bell, Moon, Sun } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return <div className={`font-work-sans ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-titanium-100 to-titanium-300 dark:from-titanium-900 dark:to-black">
        {/* Header */}
        <header className="bg-white dark:bg-titanium-900 shadow-sm border-b border-titanium-200 dark:border-titanium-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <ClyoLogo size="md" className="text-titanium-800 dark:text-titanium-200" />
                <h1 className="text-xl font-semibold text-titanium-900 dark:text-white">Clyo</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-titanium-600 dark:text-titanium-400 font-medium">
                  AI-Powered Lead Management Platform
                </div>
                <Button variant="outline" size="icon" onClick={toggleDarkMode} className="border-titanium-300 dark:border-titanium-600 hover:bg-titanium-100 dark:hover:bg-titanium-800">
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 bg-white dark:bg-titanium-800 w-fit border border-titanium-200 dark:border-titanium-700">
                <TabsTrigger value="leads" className="flex items-center space-x-2 data-[state=active]:bg-titanium-200 dark:data-[state=active]:bg-titanium-700 px-6 font-medium text-titanium-700 dark:text-titanium-300">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Leads</span>
                </TabsTrigger>
                <TabsTrigger value="outreach" className="flex items-center space-x-2 data-[state=active]:bg-titanium-200 dark:data-[state=active]:bg-titanium-700 px-6 font-medium text-titanium-700 dark:text-titanium-300">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Outreach</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="leads">
              <LeadsPage />
            </TabsContent>

            <TabsContent value="outreach">
              <VoiceOutreach />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>;
};

export default Index;
