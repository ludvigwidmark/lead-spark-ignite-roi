
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Zap, Brain, RotateCcw, BarChart3, Globe, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ROICalculator from '@/components/ROICalculator';

const AstridLanding = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTryAstrid = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to get a call from Astrid",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Send lead data to webhook
      const response = await fetch('https://ludvigwidmark.app.n8n.cloud/webhook/lovable-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'demo_call',
          lead: {
            phone: phoneNumber,
            company: company || 'Demo Request',
          },
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Call Requested!",
          description: "Astrid will call you within 2 minutes to demonstrate her capabilities.",
        });
        setPhoneNumber('');
        setCompany('');
      } else {
        throw new Error('Failed to request call');
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToAuth = () => {
    navigate('/app');
  };

  // Geometric Logo Component - Updated to match the uploaded design
  const GeometricLogo = ({ className = "w-12 h-12" }) => (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main L shape - vertical part */}
        <rect x="15" y="20" width="25" height="45" fill="currentColor" />
        {/* Bottom horizontal part of L */}
        <rect x="15" y="45" width="40" height="20" fill="currentColor" />
        {/* Tilted square in upper right */}
        <rect x="60" y="15" width="20" height="20" fill="currentColor" transform="rotate(45 70 25)" />
      </svg>
    </div>
  );

  // Animated Background Shapes - Mobile optimized
  const AnimatedShapes = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Reduced number of shapes and made them smaller for mobile */}
      <div className="absolute top-20 left-4 w-4 h-4 sm:w-8 sm:h-8 bg-titanium-300 opacity-20 sm:opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-4 w-3 h-3 sm:w-6 sm:h-6 bg-titanium-400 opacity-30 sm:opacity-40 rotate-45 animate-bounce"></div>
      <div className="absolute bottom-40 left-4 w-6 h-6 sm:w-10 sm:h-10 bg-titanium-300 opacity-20 sm:opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute top-60 left-1/2 w-2 h-2 sm:w-4 sm:h-4 bg-titanium-400 opacity-40 sm:opacity-50 rotate-45 animate-bounce"></div>
      <div className="absolute bottom-60 right-4 w-8 h-2 sm:w-12 sm:h-4 bg-titanium-300 opacity-20 sm:opacity-30 animate-pulse"></div>
      
      {/* Larger background shapes - hidden on mobile */}
      <div className="hidden sm:block absolute -top-10 -right-10 w-32 h-32 bg-titanium-200 opacity-20 rotate-12 animate-pulse"></div>
      <div className="hidden sm:block absolute -bottom-10 -left-10 w-40 h-40 bg-titanium-200 opacity-15 rounded-full animate-pulse"></div>
      <div className="hidden sm:block absolute top-1/2 -right-20 w-24 h-24 bg-titanium-300 opacity-20 rotate-45 animate-bounce"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-work-sans relative">
      <AnimatedShapes />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4 py-12 sm:py-20">
          {/* Logo Header */}
          <div className="text-center mb-8 sm:mb-12">
            <GeometricLogo className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-foreground" />
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Astrid</h2>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-work-sans leading-tight">
              <span className="text-primary">Every Lead Counts. Make It Count Instantly.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto font-work-sans px-4">
              Astrid AI converts leads instantly and never lets potential slip through the cracks.
            </p>
            
            <div className="flex flex-col gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-work-sans w-full sm:w-auto" onClick={handleNavigateToAuth}>
                Start Your 30-Min Setup
              </Button>
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-work-sans w-full sm:w-auto" onClick={handleNavigateToAuth}>
                Try Astrid Now →
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground px-4">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                10X ROI Guarantee
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                30-minute setup
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20 relative">
        <Card className="max-w-2xl mx-auto border-titanium-300">
          <CardHeader className="text-center px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl mb-2 font-work-sans">Experience Astrid in Action</CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">Enter your number and watch Astrid convert you</p>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2 font-work-sans">Company</label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company Name"
                className="text-base sm:text-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2 font-work-sans">Phone Number</label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+46 70 123 4567"
                className="text-base sm:text-lg"
              />
            </div>
            <Button 
              onClick={handleTryAstrid}
              disabled={loading}
              className="w-full text-base sm:text-lg py-4 sm:py-6 font-work-sans"
            >
              {loading ? 'Requesting Call...' : 'Get Instant Call from Astrid'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 py-12 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-work-sans">391%</div>
              <p className="text-sm sm:text-base text-muted-foreground">Higher conversion when calling within 1 minute¹</p>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-work-sans">21x</div>
              <p className="text-sm sm:text-base text-muted-foreground">More likely to qualify leads in 5 minutes vs 30²</p>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-work-sans">€8,000</div>
              <p className="text-sm sm:text-base text-muted-foreground">Monthly savings vs human SDR³</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-work-sans px-4">Why Leading Companies Choose Astrid</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Stop losing leads to slow response times. Astrid ensures every lead gets the attention they deserve, instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <CardTitle className="font-work-sans text-lg sm:text-xl">2-Minute Response Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                While your competitors take 17 hours on average, Astrid connects with leads in under 2 minutes, capturing them at peak interest.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <CardTitle className="font-work-sans text-lg sm:text-xl">Human-Like Conversations</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Powered by advanced AI, Astrid handles objections, answers questions, and books meetings just like your top-performing SDR.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <RotateCcw className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <CardTitle className="font-work-sans text-lg sm:text-xl">Infinite Follow-Up</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Never lose a lead to forgotten follow-ups. Astrid automatically nurtures leads with perfect timing until they're ready to buy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <CardTitle className="font-work-sans text-lg sm:text-xl">Real-Time Analytics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Track every conversation, identify winning patterns, and continuously optimize your sales approach with AI-powered insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <CardTitle className="font-work-sans text-lg sm:text-xl">24/7 Global Coverage</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Astrid never sleeps, never takes vacation, and speaks multiple languages. Your leads get premium service around the clock.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <Link className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
              <CardTitle className="font-work-sans text-lg sm:text-xl">Seamless Integration</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Connect with your existing CRM, calendar, and sales tools. Astrid fits perfectly into your workflow from day one.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ROI Section - Replace with Calculator */}
      <ROICalculator />

      {/* Process Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-work-sans px-4">From Setup to Success in 30 Minutes</h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
            Faster solution adoption accelerates value creation, making everyone's life better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-work-sans">1</div>
              <CardTitle className="font-work-sans text-lg sm:text-xl">Quick Onboarding Call</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Our team learns about your business, ideal customers, and sales process. We configure Astrid to speak your language and embody your brand values.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-work-sans">2</div>
              <CardTitle className="font-work-sans text-lg sm:text-xl">Instant Integration</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Connect your CRM, calendar, and lead sources. Astrid automatically syncs with your existing workflow—no technical expertise required.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-work-sans">3</div>
              <CardTitle className="font-work-sans text-lg sm:text-xl">Launch & Scale</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">
                Astrid starts calling leads immediately. Watch as meetings fill your calendar and conversion rates soar. Scale up or down instantly based on demand.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/30 py-12 sm:py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-work-sans px-4">Ready to Transform Your Sales?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
            Join innovative companies already experiencing the power of instant lead response
          </p>
          
          <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 mb-4 font-work-sans w-full sm:w-auto" onClick={handleNavigateToAuth}>
            Start Your Free Trial
          </Button>
          
          <p className="text-sm text-muted-foreground px-4">
            30-minute setup • 10X ROI guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default AstridLanding;
