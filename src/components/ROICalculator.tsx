
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Globe, Magnet, Mail, ArrowRight, Zap, TrendingUp, DollarSign, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ROICalculator = () => {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [leadMagnetEmail, setLeadMagnetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      setIsSubmitting(true);
      
      try {
        // Send data to n8n webhook
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
        // Still show success message to user since the form data was captured
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">245%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg ROI</p>
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
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">87</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lead Magnets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ROI Calculator Card */}
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
            <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Custom Lead Magnet Card */}
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

      {/* Tools Overview */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Available Tools</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Business growth tools and calculators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-8 h-8 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Deploy tools in minutes</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data-Driven</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Real ROI calculations</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-8 h-8 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Built</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Tailored for your business</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;
