
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare, Plug, RotateCcw } from "lucide-react";

const LeadsPage = () => {
  const { toast } = useToast();

  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp Inc",
      position: "VP of Sales",
      email: "sarah@techcorp.com",
      phone: "+1 (555) 123-4567",
      score: 92,
      status: "hot",
      stage: Math.floor(Math.random() * 10) + 1,
      lastContact: "2 hours ago",
      nextAction: "AI Voice Call Scheduled"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "DataFlow Systems",
      position: "CTO",
      email: "m.chen@dataflow.com",
      phone: "+1 (555) 987-6543",
      score: 78,
      status: "warm",
      stage: Math.floor(Math.random() * 10) + 1,
      lastContact: "1 day ago",
      nextAction: "Follow-up Email Sent"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "CloudVision",
      position: "Marketing Director",
      email: "emily@cloudvision.com",
      phone: "+1 (555) 456-7890",
      score: 85,
      status: "hot",
      stage: Math.floor(Math.random() * 10) + 1,
      lastContact: "4 hours ago",
      nextAction: "LinkedIn Message Pending"
    }
  ];

  const handleConnectSources = () => {
    toast({
      title: "Lead Sources Integration",
      description: "Connect your CRM, forms, and other lead sources to start capturing leads automatically."
    });
  };

  const handleReactivateOldCustomers = () => {
    toast({
      title: "Reactivate Old Customers",
      description: "AI will analyze your old customers and leads to identify reactivation opportunities."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-sm";
      case "warm":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm";
      case "cold":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-sm";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 font-bold";
    if (score >= 70) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  return (
    <div className="space-y-6">
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

      {/* Lead Pipeline */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Leads</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                AI-scored leads ready for outreach
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReactivateOldCustomers} variant="outline" className="border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reactivate old customers/leads
              </Button>
              <Button onClick={handleConnectSources} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plug className="w-4 h-4 mr-2" />
                Connect Lead Sources
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{lead.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{lead.position} at {lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.toUpperCase()} - Stage {lead.stage}
                    </Badge>
                    <div className="text-right">
                      <span className={`text-lg ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </span>
                      <span className="text-gray-400 text-sm">/100</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last contact: {lead.lastContact}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.nextAction}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm">
                      View Details
                    </Button>
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

export default LeadsPage;
