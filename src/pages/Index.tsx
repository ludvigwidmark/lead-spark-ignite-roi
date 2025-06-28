
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeadsPage from "@/components/LeadsPage";
import VoiceOutreach from "@/components/VoiceOutreach";
import ClyoLogo from "@/components/ClyoLogo";
import { Users, Bell, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="font-work-sans min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm border-b border-titanium-300 dark:border-titanium-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <ClyoLogo size="md" className="text-black dark:text-white" />
              <h1 className="text-xl font-semibold text-black dark:text-white">Clyo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-titanium-600 dark:text-titanium-400 font-medium">
                AI-Powered Lead Management Platform
              </div>
              {user && (
                <div className="text-sm text-titanium-600 dark:text-titanium-400">
                  {user.email}
                </div>
              )}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleDarkMode} 
                className="border-titanium-300 dark:border-titanium-600 hover:bg-titanium-100 dark:hover:bg-titanium-800 text-black dark:text-white"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSignOut}
                className="border-titanium-300 dark:border-titanium-600 hover:bg-titanium-100 dark:hover:bg-titanium-800 text-black dark:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 bg-white dark:bg-black w-fit border border-titanium-300 dark:border-titanium-600">
              <TabsTrigger 
                value="leads" 
                className="flex items-center space-x-2 data-[state=active]:bg-titanium-100 dark:data-[state=active]:bg-titanium-800 px-6 font-medium text-black dark:text-white hover:bg-titanium-50 dark:hover:bg-titanium-900"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Leads</span>
              </TabsTrigger>
              <TabsTrigger 
                value="outreach" 
                className="flex items-center space-x-2 data-[state=active]:bg-titanium-100 dark:data-[state=active]:bg-titanium-800 px-6 font-medium text-black dark:text-white hover:bg-titanium-50 dark:hover:bg-titanium-900"
              >
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
  );
};

export default Index;
