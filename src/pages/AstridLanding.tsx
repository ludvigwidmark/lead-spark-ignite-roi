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

  // Animated Background Shapes
  const AnimatedShapes = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-titanium-300 opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-titanium-400 opacity-40 rotate-45 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-10 h-10 bg-titanium-300 opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute top-60 left-1/2 w-4 h-4 bg-titanium-400 opacity-50 rotate-45 animate-bounce"></div>
      <div className="absolute bottom-60 right-10 w-12 h-4 bg-titanium-300 opacity-30 animate-pulse"></div>
      <div className="absolute top-32 right-1/3 w-6 h-6 bg-titanium-400 opacity-40 animate-bounce"></div>
      
      {/* Larger background shapes */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-titanium-200 opacity-20 rotate-12 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-titanium-200 opacity-15 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 w-24 h-24 bg-titanium-300 opacity-20 rotate-45 animate-bounce"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-work-sans relative">
      <AnimatedShapes />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4 py-20">
          {/* Logo Header */}
          <div className="text-center mb-12">
            <GeometricLogo className="w-16 h-16 mx-auto mb-4 text-foreground" />
            <h2 className="text-2xl font-semibold text-foreground">Astrid</h2>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-work-sans">
              Make Every Interaction <span className="text-primary">Instantly Valuable</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-work-sans">
              Astrid AI calls your leads instantly, speaks like your best SDR, and never forgets to follow up. 
              Join the AI revolution that's delivering 10X ROI for every euro invested.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-4 font-work-sans" onClick={handleNavigateToAuth}>
                Start Your 30-Min Setup
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 font-work-sans" onClick={handleNavigateToAuth}>
                Try Astrid Now →
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                10X ROI Guarantee
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                30-minute setup
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <Card className="max-w-2xl mx-auto border-titanium-300">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2 font-work-sans">Experience Astrid in Action</CardTitle>
            <p className="text-muted-foreground">Enter your number and watch Astrid convert you</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2 font-work-sans">Company</label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company Name"
                className="text-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2 font-work-sans">Phone Number</label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+46 70 123 4567"
                className="text-lg"
              />
            </div>
            <Button 
              onClick={handleTryAstrid}
              disabled={loading}
              className="w-full text-lg py-6 font-work-sans"
            >
              {loading ? 'Requesting Call...' : 'Get Instant Call from Astrid'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2 font-work-sans">391%</div>
              <p className="text-muted-foreground">Higher conversion when calling within 1 minute¹</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2 font-work-sans">21x</div>
              <p className="text-muted-foreground">More likely to qualify leads in 5 minutes vs 30²</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2 font-work-sans">€8,000</div>
              <p className="text-muted-foreground">Monthly savings vs human SDR³</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6 font-work-sans">Why Leading Companies Choose Astrid</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop losing leads to slow response times. Astrid ensures every lead gets the attention they deserve, instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-work-sans">2-Minute Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                While your competitors take 17 hours on average, Astrid connects with leads in under 2 minutes, capturing them at peak interest.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-work-sans">Human-Like Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Powered by advanced AI, Astrid handles objections, answers questions, and books meetings just like your top-performing SDR.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <RotateCcw className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-work-sans">Infinite Follow-Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Never lose a lead to forgotten follow-ups. Astrid automatically nurtures leads with perfect timing until they're ready to buy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-work-sans">Real-Time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track every conversation, identify winning patterns, and continuously optimize your sales approach with AI-powered insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-work-sans">24/7 Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Astrid never sleeps, never takes vacation, and speaks multiple languages. Your leads get premium service around the clock.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Link className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-work-sans">Seamless Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with your existing CRM, calendar, and sales tools. Astrid fits perfectly into your workflow from day one.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ROI Section - Replace with Calculator */}
      <ROICalculator />

      {/* Process Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6 font-work-sans">From Setup to Success in 30 Minutes</h2>
          <p className="text-xl text-muted-foreground">
            Faster solution adoption accelerates value creation, making everyone's life better
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4 font-work-sans">1</div>
              <CardTitle className="font-work-sans">Quick Onboarding Call</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our team learns about your business, ideal customers, and sales process. We configure Astrid to speak your language and embody your brand values.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4 font-work-sans">2</div>
              <CardTitle className="font-work-sans">Instant Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect your CRM, calendar, and lead sources. Astrid automatically syncs with your existing workflow—no technical expertise required.
              </p>
            </CardContent>
          </Card>

          <Card className="border-titanium-300 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4 font-work-sans">3</div>
              <CardTitle className="font-work-sans">Launch & Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Astrid starts calling leads immediately. Watch as meetings fill your calendar and conversion rates soar. Scale up or down instantly based on demand.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/30 py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6 font-work-sans">Ready to Transform Your Sales?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join innovative companies already experiencing the power of instant lead response
          </p>
          
          <Button size="lg" className="text-lg px-8 py-4 mb-4 font-work-sans" onClick={handleNavigateToAuth}>
            Start Your Free Trial
          </Button>
          
          <p className="text-sm text-muted-foreground">
            30-minute setup • 10X ROI guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default AstridLanding;
