
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Phone, Play, Pause, Square, Mic, Mail, MessageSquare, Linkedin } from "lucide-react";

const VoiceOutreach = () => {
  const { toast } = useToast();
  const [isCallActive, setIsCallActive] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [callScript, setCallScript] = useState("Hi [Name], this is Alex from LeadFlow AI. I noticed your company [Company] has been exploring automation solutions. I'd love to show you how we've helped similar companies increase their lead conversion by 40%. Do you have 2 minutes to chat?");

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

  const handleStartCall = () => {
    if (!selectedVoice) {
      toast({
        title: "Voice Required",
        description: "Please select an AI voice before starting the call.",
        variant: "destructive",
      });
      return;
    }

    setIsCallActive(true);
    toast({
      title: "AI Call Started",
      description: "Voice AI is now making the call with the selected voice and script.",
    });
  };

  const handleStopCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call Ended",
      description: "Call summary and notes have been automatically generated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Voice Call Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>AI Voice Calling</span>
            </CardTitle>
            <CardDescription>
              Make intelligent voice calls with AI-powered conversations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="voice">Select AI Voice</Label>
              <Select onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a voice..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aria">Aria - Professional Female</SelectItem>
                  <SelectItem value="roger">Roger - Confident Male</SelectItem>
                  <SelectItem value="sarah">Sarah - Friendly Female</SelectItem>
                  <SelectItem value="charlie">Charlie - Energetic Male</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="script">Call Script</Label>
              <Textarea
                id="script"
                value={callScript}
                onChange={(e) => setCallScript(e.target.value)}
                rows={4}
                placeholder="Enter your AI call script..."
              />
            </div>

            <div className="flex space-x-2">
              {!isCallActive ? (
                <Button onClick={handleStartCall} className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Start AI Call
                </Button>
              ) : (
                <Button onClick={handleStopCall} variant="destructive" className="flex-1">
                  <Square className="w-4 h-4 mr-2" />
                  End Call
                </Button>
              )}
            </div>

            {isCallActive && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-800">Call in Progress</span>
                </div>
                <p className="text-sm text-green-700">
                  AI is speaking with Sarah Johnson from TechCorp Inc...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Analytics</CardTitle>
            <CardDescription>
              Real-time insights from your AI voice calls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-700">89%</p>
                <p className="text-sm text-blue-600">Connection Rate</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-700">3.2min</p>
                <p className="text-sm text-green-600">Avg Call Duration</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recent Call Results</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Michael Chen - DataFlow</span>
                  <Badge className="bg-green-100 text-green-800">Interested</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Emily Rodriguez - CloudVision</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Callback</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">David Park - InnovateLab</span>
                  <Badge className="bg-red-100 text-red-800">Not Interested</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Multi-channel Campaigns */}
      <Card>
        <CardHeader>
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
