import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LeadsPage from "@/components/LeadsPage";
import VoiceOutreach from "@/components/VoiceOutreach";
import LandingPage from "@/components/LandingPage";
import AuthPage from "@/components/AuthPage";
import { Users, Bell, Target, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLeads } from "@/hooks/useLeads";

const Index = () => {
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  const { addLeads } = useLeads();
  const [activeTab, setActiveTab] = useState("leads");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'app'>('landing');
  const [tempLeads, setTempLeads] = useState<any[]>([]);

  // Handle authentication state changes
  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentView('app');
        // Save any temporary leads to the database
        if (tempLeads.length > 0) {
          handleSaveTempLeads();
        }
      } else if (tempLeads.length > 0) {
        setCurrentView('auth');
      } else {
        setCurrentView('landing');
      }
    }
  }, [user, loading, tempLeads]);

  const handleSaveTempLeads = async () => {
    if (tempLeads.length > 0) {
      const result = await addLeads(tempLeads);
      if (result?.error) {
        toast({
          title: "Error Saving Leads",
          description: "Failed to save your leads. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Leads Saved Successfully",
          description: `${tempLeads.length} leads have been added to your account.`
        });
        setTempLeads([]);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLeadsUploaded = (leads: any[]) => {
    setTempLeads(leads);
    if (user) {
      // User is already authenticated, save leads immediately
      addLeads(leads).then((result) => {
        if (!result?.error) {
          toast({
            title: "Leads Imported Successfully",
            description: `${leads.length} leads have been added to your account.`
          });
          setTempLeads([]);
        }
      });
    } else {
      // User needs to authenticate first
      setCurrentView('auth');
    }
  };

  const handleConnectSources = () => {
    toast({
      title: "Lead Sources Integration",
      description: "Connect your CRM, forms, and other lead sources to start capturing leads automatically."
    });
    if (!user) {
      setCurrentView('auth');
    }
  };

  const handleAuthComplete = () => {
    // The useEffect will handle the transition to 'app' view when user state changes
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setTempLeads([]);
      setCurrentView('landing');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setTempLeads([]);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Landing Page View
  if (currentView === 'landing') {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <LandingPage 
          onLeadsUploaded={handleLeadsUploaded}
          onConnectSources={handleConnectSources}
        />
      </div>
    );
  }

  // Auth Page View
  if (currentView === 'auth') {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <AuthPage 
          onAuthComplete={handleAuthComplete}
          onBack={handleBackToLanding}
          leadCount={tempLeads.length}
        />
      </div>
    );
  }

  // Main App View
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Clyo</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome, {user?.user_metadata?.name || user?.email}
                </div>
                <Button variant="outline" size="icon" onClick={toggleDarkMode} className="border-gray-300 dark:border-gray-600">
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="outline" onClick={handleLogout} className="border-gray-300 dark:border-gray-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 bg-white dark:bg-gray-800 w-fit">
                <TabsTrigger value="leads" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 px-6">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Leads</span>
                </TabsTrigger>
                <TabsTrigger value="outreach" className="flex items-center space-x-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 px-6">
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
