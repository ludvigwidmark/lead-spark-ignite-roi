
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare } from "lucide-react";

const LeadDashboard = () => {
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
      lastContact: "4 hours ago",
      nextAction: "LinkedIn Message Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "bg-red-100 text-red-800";
      case "warm": return "bg-yellow-100 text-yellow-800";
      case "cold": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-gray-600">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">34</p>
                <p className="text-sm text-gray-600">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-gray-600">Calls Made</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">18%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>High-Priority Leads</CardTitle>
          <CardDescription>
            AI-scored leads ready for outreach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold">{lead.name}</h4>
                      <p className="text-sm text-gray-600">{lead.position} at {lead.company}</p>
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

                <div className="flex items-center justify-between text-sm text-gray-600">
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
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{lead.nextAction}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Lead Score</span>
                    <span>{lead.score}%</span>
                  </div>
                  <Progress value={lead.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDashboard;
