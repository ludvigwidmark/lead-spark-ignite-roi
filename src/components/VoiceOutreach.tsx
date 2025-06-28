
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Linkedin, Phone, Sparkles, Plus } from "lucide-react";

const VoiceOutreach = () => {
  const { toast } = useToast();

  const handleGetLuna = () => {
    toast({
      title: "Luna Coming Soon!",
      description: "Our AI voice agent Luna will be available soon. Stay tuned for updates!",
    });
  };

  const handleCreateCampaign = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Campaign creation will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Multi-channel Campaigns with integrated Luna section */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle>Multi-channel Outreach Campaigns</CardTitle>
                <CardDescription>
                  Coordinate voice, email, and social media outreach
                </CardDescription>
              </div>
            </div>
            
            {/* Horizontal Luna Section */}
            <div className="bg-titanium-50 dark:bg-titanium-900 border border-titanium-300 dark:border-titanium-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-black dark:bg-white rounded-full">
                    <Sparkles className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black dark:text-white">Meet Luna</h3>
                    <p className="text-sm text-titanium-600 dark:text-titanium-400">Your AI-powered voice assistant for outreach campaigns</p>
                  </div>
                </div>
                <Button 
                  onClick={handleGetLuna} 
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Luna
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Empty State */}
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-titanium-100 dark:bg-titanium-800 rounded-full mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-titanium-600 dark:text-titanium-400" />
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">No campaigns yet</h3>
            <p className="text-titanium-600 dark:text-titanium-400 mb-6 max-w-md mx-auto">
              Create your first multi-channel outreach campaign to start engaging with your leads across voice, email, and social media.
            </p>
            <Button onClick={handleCreateCampaign} className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceOutreach;
