
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Linkedin, Phone, Sparkles } from "lucide-react";

const VoiceOutreach = () => {
  const { toast } = useToast();

  const campaigns = [
    {
      id: 1,
      name: "Q1 Enterprise Outreach",
      status: "active",
      leads: 45,
      calls: 127,
      emails: 89,
      linkedin: 34,
      conversion: "18%"
    },
    {
      id: 2,
      name: "SMB Follow-up Campaign",
      status: "paused",
      leads: 23,
      calls: 67,
      emails: 156,
      linkedin: 12,
      conversion: "12%"
    }
  ];

  const handleGetLuna = () => {
    toast({
      title: "Luna Coming Soon!",
      description: "Our AI voice agent Luna will be available soon. Stay tuned for updates!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Multi-channel Campaigns with Meet Luna in corner */}
      <Card className="relative">
        {/* Meet Luna Box - positioned in top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <Card className="w-64 bg-white/95 backdrop-blur-sm shadow-lg border border-purple-200">
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Meet Luna</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Your AI-powered voice assistant for outreach
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <Button 
                onClick={handleGetLuna} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm"
                size="sm"
              >
                <Sparkles className="w-3 h-3 mr-2" />
                Get your Luna
              </Button>
            </CardContent>
          </Card>
        </div>

        <CardHeader className="pr-72">
          <CardTitle>Multi-channel Outreach Campaigns</CardTitle>
          <CardDescription>
            Coordinate voice, email, and social media outreach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold">{campaign.name}</h4>
                    <Badge className={campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>{campaign.calls} calls</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span>{campaign.emails} emails</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span>{campaign.linkedin} LinkedIn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{campaign.leads} leads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-green-600">{campaign.conversion} conversion</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceOutreach;
