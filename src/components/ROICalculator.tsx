
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Clock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ROICalculator = () => {
  const [domain, setDomain] = useState("");
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
          <Clock className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Coming Soon...</h3>
          <p className="text-gray-500 dark:text-gray-500 text-center max-w-md mb-8">
            We're working on an advanced ROI calculator that will help you project the potential returns 
            from your lead generation investments.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <Label htmlFor="domain" className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4" />
                <span>Enter your domain to get notified</span>
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
              Notify Me When Ready
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;
