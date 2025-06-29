
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeadsPage from "@/components/LeadsPage";
import VoiceOutreach from "@/components/VoiceOutreach";
import ConfigurationPage from "@/components/ConfigurationPage";
import ClyoLogo from "@/components/ClyoLogo";
import { Users, Bell, Settings, Moon, Sun, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
      <header className="bg-white dark:bg-black shadow-sm border-b border-titanium-300 dark:border-titanium-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ClyoLogo size={isMobile ? "sm" : "md"} className="text-black dark:text-white" />
              <h1 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Clyo</h1>
            </div>
            
            {/* Mobile-friendly header content */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {!isMobile && (
                <div className="text-xs sm:text-sm text-titanium-600 dark:text-titanium-400 font-medium hidden md:block">
                  AI-Powered Lead Management Platform
                </div>
              )}
              {user && !isMobile && (
                <div className="text-xs sm:text-sm text-titanium-600 dark:text-titanium-400 hidden sm:block">
                  {user.email}
                </div>
              )}
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "icon"}
                onClick={toggleDarkMode} 
                className="border-titanium-300 dark:border-titanium-600 hover:bg-titanium-100 dark:hover:bg-titanium-800 text-black dark:text-white"
              >
                {isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "icon"}
                onClick={handleSignOut}
                className="border-titanium-300 dark:border-titanium-600 hover:bg-titanium-100 dark:hover:bg-titanium-800 text-black dark:text-white"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="flex justify-center w-full">
            <TabsList className="grid grid-cols-3 bg-white dark:bg-black border border-titanium-300 dark:border-titanium-600 mx-auto">
              <TabsTrigger 
                value="leads" 
                className="flex items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-titanium-100 dark:data-[state=active]:bg-titanium-800 px-3 sm:px-6 py-2 sm:py-3 font-medium text-black dark:text-white hover:bg-titanium-50 dark:hover:bg-titanium-900 text-sm sm:text-base"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Leads</span>
              </TabsTrigger>
              <TabsTrigger 
                value="outreach" 
                className="flex items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-titanium-100 dark:data-[state=active]:bg-titanium-800 px-3 sm:px-6 py-2 sm:py-3 font-medium text-black dark:text-white hover:bg-titanium-50 dark:hover:bg-titanium-900 text-sm sm:text-base"
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Outreach</span>
              </TabsTrigger>
              <TabsTrigger 
                value="configuration" 
                className="flex items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-titanium-100 dark:data-[state=active]:bg-titanium-800 px-3 sm:px-6 py-2 sm:py-3 font-medium text-black dark:text-white hover:bg-titanium-50 dark:hover:bg-titanium-900 text-sm sm:text-base"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Configuration</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="leads" className="mt-4 sm:mt-6">
            <LeadsPage />
          </TabsContent>

          <TabsContent value="outreach" className="mt-4 sm:mt-6">
            <VoiceOutreach />
          </TabsContent>

          <TabsContent value="configuration" className="mt-4 sm:mt-6">
            <ConfigurationPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
