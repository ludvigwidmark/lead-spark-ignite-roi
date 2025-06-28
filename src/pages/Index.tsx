
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

  return (
    <div className={`font-work-sans ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <ClyoLogo size="md" className="text-foreground" />
                <h1 className="text-xl font-semibold text-foreground">Clyo</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground font-medium">
                  AI-Powered Lead Management Platform
                </div>
                <Button variant="outline" size="icon" onClick={toggleDarkMode} className="border-border hover:bg-accent">
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
              <TabsList className="grid grid-cols-2 bg-card w-fit border border-border">
                <TabsTrigger value="leads" className="flex items-center space-x-2 data-[state=active]:bg-accent px-6 font-medium text-foreground">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Leads</span>
                </TabsTrigger>
                <TabsTrigger value="outreach" className="flex items-center space-x-2 data-[state=active]:bg-accent px-6 font-medium text-foreground">
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
    </div>
  );
};

export default Index;
