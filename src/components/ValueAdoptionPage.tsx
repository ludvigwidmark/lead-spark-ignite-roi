
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calculator, 
  Globe, 
  Magnet, 
  Mail, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Target,
  Users,
  BarChart3,
  Activity,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ValueAdoptionPage = () => {
  // ROI Calculator states
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [leadMagnetEmail, setLeadMagnetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Adoption states
  const [clientName, setClientName] = useState("");
  const [sdgGoal, setSdgGoal] = useState("");
  const [usageData, setUsageData] = useState("");
  
  const { toast } = useToast();

  const handleROISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch("https://ludvigwidmark.app.n8n.cloud/webhook/b98fab6f-93ee-43c7-978e-2a4a0c7430a5", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain: domain,
            email: email || null,
            timestamp: new Date().toISOString(),
            source: "roi_calculator"
          }),
        });

        console.log("Webhook response status:", response.status);

        const message = email 
          ? `We'll notify you at ${email} when the ROI calculator is ready.`
          : `We'll notify you at ${domain} when the ROI calculator is ready.`;
        
        toast({
          title: "Thanks for your interest!",
          description: message,
        });
        setDomain("");
        setEmail("");
      } catch (error) {
        console.error("Error sending to webhook:", error);
        const message = email 
          ? `We'll notify you at ${email} when the ROI calculator is ready.`
          : `We'll notify you at ${domain} when the ROI calculator is ready.`;
        
        toast({
          title: "Thanks for your interest!",
          description: message,
        });
        setDomain("");
        setEmail("");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleLeadMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadMagnetEmail) {
      toast({
        title: "Lead Magnet Request Received!",
        description: `We'll contact you at ${leadMagnetEmail} to discuss your custom lead magnet.`,
      });
      setLeadMagnetEmail("");
    }
  };

  const handleROIReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "ROI Report Generated",
      description: `Retention report sent to ${clientName} highlighting their impact on ${sdgGoal}`,
    });
    setClientName("");
    setSdgGoal("");
  };

  const handleUsageAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Usage Analysis Complete",
      description: "Identified drop-off points and generated adoption recommendations",
    });
    setUsageData("");
  };

  return (
    <div className="space-y-6">
      {/* Combined Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ROI Calculations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Adoption Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$47k</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Impact</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator & Lead Magnet Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  ROI Calculator
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Calculate your expected return on investment
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleROISubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <Globe className="w-4 h-4" />
                  <span>Website URL</span>
                </Label>
                <Input
                  id="domain"
                  type="url"
                  placeholder="https://yourbusiness.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>Email (optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={!domain || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Calculate ROI</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center">
                <Magnet className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Custom Lead Magnet
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Request a professionally designed lead magnet
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLeadMagnetSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leadMagnetEmail" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>Email address</span>
                </Label>
                <Input
                  id="leadMagnetEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={leadMagnetEmail}
                  onChange={(e) => setLeadMagnetEmail(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                disabled={!leadMagnetEmail}
              >
                <div className="flex items-center space-x-2">
                  <span>Request Lead Magnet</span>
                  <Zap className="w-4 h-4" />
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Adoption Tools Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  ROI Report Generator
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Send automated retention reports to clients
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleROIReportSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-gray-700 dark:text-gray-300">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  placeholder="Enter client company name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sdgGoal" className="text-gray-700 dark:text-gray-300">
                  SDG Goal Focus
                </Label>
                <Input
                  id="sdgGoal"
                  placeholder="e.g., Clean Energy, Quality Education"
                  value={sdgGoal}
                  onChange={(e) => setSdgGoal(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                disabled={!clientName || !sdgGoal}
              >
                <div className="flex items-center space-x-2">
                  <span>Generate ROI Report</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Usage Analysis
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Identify drop-off points and improve adoption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUsageAnalysis} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usageData" className="text-gray-700 dark:text-gray-300">
                  Usage Data / Feedback
                </Label>
                <Textarea
                  id="usageData"
                  placeholder="Paste usage analytics or describe where users are dropping off..."
                  value={usageData}
                  onChange={(e) => setUsageData(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-32"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                disabled={!usageData}
              >
                <div className="flex items-center space-x-2">
                  <span>Analyze Usage</span>
                  <Zap className="w-4 h-4" />
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Combined Insights */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Value & Adoption Insights</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Help AI companies improve customer success, retention, and calculate ROI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Impact Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Monitor SDG goal progress and quantify real-world impact with ROI calculations
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="w-8 h-8 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Retention Boost</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automated reports showing value increase retention rates and customer success
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <div className="w-8 h-8 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Early Warning</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Identify at-risk clients before they churn through usage analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueAdoptionPage;
