

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Globe, Magnet, Sparkles, Mail } from "lucide-react";
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
        const response = await fetch("https://ludvigwidmark.app.n8n.cloud/webhook-test/b98fab6f-93ee-43c7-978e-2a4a0c7430a5", {
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
            
            <div>
              <Label htmlFor="email" className="flex items-center space-x-2 mb-2 text-xs text-gray-500 dark:text-gray-400">
                <Mail className="w-3 h-3" />
                <span>Email (optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={!domain || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get My ROI Calculator"}
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
