
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Globe, Magnet, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ROICalculator = () => {
  const [domain, setDomain] = useState("");
  const [leadMagnetEmail, setLeadMagnetEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      toast({
        title: "Thanks for your interest!",
        description: `We'll notify you at ${domain} when the ROI calculator is ready.`,
      });
      setDomain("");
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>ROI Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate the potential return on investment
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-8">Get yours now</h3>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <Label htmlFor="domain" className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4" />
                <span>Enter your domain to get your ROI calculator</span>
              </Label>
              <Input
                id="domain"
                type="url"
                placeholder="https://yourdomain.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="text-center"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!domain}>
              Get My ROI Calculator
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Magnet className="w-5 h-5 text-purple-600" />
            <span>Custom Lead Magnet</span>
          </CardTitle>
          <CardDescription>
            Get a professionally designed lead magnet built for your business
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Custom Lead Magnet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              We'll create a high-converting lead magnet tailored to your industry and audience
            </p>
          </div>
          
          <form onSubmit={handleLeadMagnetSubmit} className="w-full max-w-md space-y-4">
            <div>
              <Label htmlFor="leadMagnetEmail" className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4" />
                <span>Enter your email to get your custom lead magnet</span>
              </Label>
              <Input
                id="leadMagnetEmail"
                type="email"
                placeholder="your@email.com"
                value={leadMagnetEmail}
                onChange={(e) => setLeadMagnetEmail(e.target.value)}
                className="text-center"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
              disabled={!leadMagnetEmail}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get My Custom Lead Magnet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;
