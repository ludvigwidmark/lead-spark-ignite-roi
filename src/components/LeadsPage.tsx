
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare, UserPlus, Sparkles } from "lucide-react";

const LeadsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    industry: "",
    notes: ""
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60;
      
      toast({
        title: "Lead Captured Successfully!",
        description: `${formData.firstName} ${formData.lastName} scored ${score}/100 and has been added to your pipeline.`,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        position: "",
        phone: "",
        industry: "",
        notes: ""
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Capture Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Add New Lead</span>
            </CardTitle>
            <CardDescription>
              Capture new leads with real-time validation and scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional information about this lead..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Processing & Scoring Lead...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Capture Lead
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Real-time Enrichment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Enrichment</CardTitle>
            <CardDescription>
              AI-powered lead scoring and data enrichment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How it works:</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Real-time email validation and verification</li>
                <li>• Company data enrichment from public sources</li>
                <li>• Social media profile matching</li>
                <li>• Lead scoring based on 50+ data points</li>
                <li>• Intent signals and buying behavior analysis</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Scoring Factors:</h4>
              <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <div className="flex justify-between">
                  <span>Company Size</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Industry Match</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Job Title Relevance</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Email Verification</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Social Presence</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Intent Signals</span>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Pipeline */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">High-Priority Leads</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            AI-scored leads ready for outreach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="border dark:border-gray-600 rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-700">
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsPage;
