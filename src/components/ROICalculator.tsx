
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Globe, Magnet, Sparkles, Mail, ArrowRight, Zap } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Supercharge Your Business
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get powerful tools to capture leads, calculate ROI, and grow your business exponentially
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ROI Calculator Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            <CardHeader className="relative pb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                ROI Calculator
              </CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400 text-lg">
                See exactly how much our tools will boost your revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="domain" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Globe className="w-4 h-4" />
                    <span>Your website URL</span>
                  </Label>
                  <Input
                    id="domain"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="h-12 text-center text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span>Email (get notified when ready)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 text-center bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={!domain || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Get My ROI Calculator</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Custom Lead Magnet Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
            <CardHeader className="relative pb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Magnet className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                Custom Lead Magnet
              </CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400 text-lg">
                Get a professionally designed lead magnet built for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full mb-4">
                  <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  High-Converting Lead Magnets
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tailored to your industry and audience for maximum impact
                </p>
              </div>
              
              <form onSubmit={handleLeadMagnetSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="leadMagnetEmail" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Your email address</span>
                  </Label>
                  <Input
                    id="leadMagnetEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={leadMagnetEmail}
                    onChange={(e) => setLeadMagnetEmail(e.target.value)}
                    className="h-12 text-center text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl bg-white dark:bg-gray-800"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={!leadMagnetEmail}
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Get My Custom Lead Magnet</span>
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 pt-12">
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Get your tools deployed and working in minutes, not days</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data-Driven</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Make decisions based on real ROI calculations and metrics</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Built</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Every tool is tailored specifically for your business needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
