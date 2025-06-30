
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Linkedin, Phone, Sparkles, Plus, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const VoiceOutreach = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleGetSetupHelp = () => {
    toast({
      title: "Setup Help Request",
      description: "We'll help you set up your follow up campaigns. Our team will reach out to you soon!",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Multi-channel Campaigns with integrated setup help section */}
      <Card className="border-titanium-300 dark:border-titanium-600">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl text-black dark:text-white">Multi-channel Outreach Campaigns</CardTitle>
                <CardDescription className="text-sm sm:text-base text-titanium-600 dark:text-titanium-400">
                  Coordinate voice, email, and social media outreach
                </CardDescription>
              </div>
            </div>
            
            {/* Setup Help Section - Mobile optimized */}
            <div className="bg-titanium-50 dark:bg-titanium-900 border border-titanium-300 dark:border-titanium-700 rounded-xl p-3 sm:p-4">
              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center justify-between'}`}>
                <div className={`flex items-center ${isMobile ? 'space-x-3' : 'space-x-4'}`}>
                  <div className={`flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-black dark:bg-white rounded-full flex-shrink-0`}>
                    <HelpCircle className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white dark:text-black`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} text-black dark:text-white`}>Get Setup Help</h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-titanium-600 dark:text-titanium-400`}>
                      We'll help you set up your follow up campaigns manually
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleGetSetupHelp} 
                  size={isMobile ? "sm" : "default"}
                  className={`bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200 shadow-lg hover:shadow-xl transition-all duration-200 ${isMobile ? 'w-full' : 'flex-shrink-0'}`}
                >
                  <HelpCircle className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                  Get Help
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {/* Empty State */}
          <div className="text-center py-8 sm:py-12">
            <div className={`flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-titanium-100 dark:bg-titanium-800 rounded-full mx-auto mb-3 sm:mb-4`}>
              <MessageSquare className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-titanium-600 dark:text-titanium-400`} />
            </div>
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-black dark:text-white mb-2`}>No campaigns yet</h3>
            <p className={`text-titanium-600 dark:text-titanium-400 mb-4 sm:mb-6 max-w-md mx-auto ${isMobile ? 'text-sm px-4' : 'text-base'}`}>
              Your multi-channel outreach campaigns will appear here once we help you set them up. Each customer setup is unique, so we handle this manually to ensure the best results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceOutreach;
