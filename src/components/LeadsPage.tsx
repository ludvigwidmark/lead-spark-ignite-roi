import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare, Plug } from "lucide-react";
const LeadsPage = () => {
  const {
    toast
  } = useToast();
  const leads = [{
    id: 1,
    name: "Sarah Johnson",
    company: "TechCorp Inc",
    position: "VP of Sales",
    email: "sarah@techcorp.com",
    phone: "+1 (555) 123-4567",
    score: 92,
    status: "hot",
    lastContact: "2 hours ago",
    nextAction: "AI Voice Call Scheduled"
  }, {
    id: 2,
    name: "Michael Chen",
    company: "DataFlow Systems",
    position: "CTO",
    email: "m.chen@dataflow.com",
    phone: "+1 (555) 987-6543",
    score: 78,
    status: "warm",
    lastContact: "1 day ago",
    nextAction: "Follow-up Email Sent"
  }, {
    id: 3,
    name: "Emily Rodriguez",
    company: "CloudVision",
    position: "Marketing Director",
    email: "emily@cloudvision.com",
    phone: "+1 (555) 456-7890",
    score: 85,
    status: "hot",
    lastContact: "4 hours ago",
    nextAction: "LinkedIn Message Pending"
  }];
  const handleConnectSources = () => {
    toast({
      title: "Lead Sources Integration",
      description: "Connect your CRM, forms, and other lead sources to start capturing leads automatically."
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-100 text-red-800";
      case "warm":
        return "bg-yellow-100 text-yellow-800";
      case "cold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };
  return <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">34</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calls Made</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">18%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connect Lead Sources */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Plug className="w-5 h-5 text-blue-600" />
              <span>Connect Lead Sources</span>
            </CardTitle>
            <CardDescription>
              Integrate your CRM, forms, and marketing tools
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleConnectSources} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plug className="w-4 h-4 mr-2" />
              Connect Lead Sources
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lead Pipeline */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Leads</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            AI-scored leads ready for outreach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map(lead => <div key={lead.id} className="border dark:border-gray-600 rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{lead.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{lead.position} at {lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.toUpperCase()}
                    </Badge>
                    <span className={`font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}/100
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{lead.email}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{lead.phone}</span>
                    </span>
                  </div>
                  <span>Last contact: {lead.lastContact}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.nextAction}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Lead Score</span>
                    <span>{lead.score}%</span>
                  </div>
                  <Progress value={lead.score} className="h-2" />
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default LeadsPage;