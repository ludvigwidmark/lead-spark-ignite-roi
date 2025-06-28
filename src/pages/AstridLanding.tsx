
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Zap, Brain, RotateCcw, BarChart3, Globe, Link } from 'lucide-react';

const AstridLanding = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Convert Leads in <span className="text-primary">2 Minutes</span>, Not 47 Hours
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Astrid AI calls your leads instantly, speaks like your best SDR, and never forgets to follow up. 
              Join the AI revolution that's delivering 10X ROI for every euro invested.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Your 30-Min Setup
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
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
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Experience Astrid in Action</CardTitle>
            <p className="text-muted-foreground">Enter your number and watch Astrid convert you</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Company</label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company Name"
                className="text-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
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
              className="w-full text-lg py-6"
            >
              {loading ? 'Requesting Call...' : 'Get Instant Call from Astrid'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">391%</div>
              <p className="text-muted-foreground">Higher conversion when calling within 1 minute¹</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">21x</div>
              <p className="text-muted-foreground">More likely to qualify leads in 5 minutes vs 30²</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">€8,000</div>
              <p className="text-muted-foreground">Monthly savings vs human SDR³</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Why Leading Companies Choose Astrid</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop losing leads to slow response times. Astrid ensures every lead gets the attention they deserve, instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>2-Minute Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                While your competitors take 17 hours on average, Astrid connects with leads in under 2 minutes, capturing them at peak interest.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Human-Like Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Powered by advanced AI, Astrid handles objections, answers questions, and books meetings just like your top-performing SDR.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <RotateCcw className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Infinite Follow-Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Never lose a lead to forgotten follow-ups. Astrid automatically nurtures leads with perfect timing until they're ready to buy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-Time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track every conversation, identify winning patterns, and continuously optimize your sales approach with AI-powered insights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-4" />
              <CardTitle>24/7 Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Astrid never sleeps, never takes vacation, and speaks multiple languages. Your leads get premium service around the clock.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Link className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Seamless Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with your existing CRM, calendar, and sales tools. Astrid fits perfectly into your workflow from day one.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ROI Section */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">10X ROI GUARANTEE</h2>
            <h3 className="text-2xl mb-4">The Math is Simple</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Companies using AI automation see 10-20% sales ROI boost⁴. With Astrid, you're not just saving costs—you're multiplying revenue.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-center mb-12">Your Potential Returns</h4>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-background/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Traditional SDR Costs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-primary-foreground/90">
                  <div>€10,000/month - Salary & benefits</div>
                  <div>€2,000/month - Tools & software</div>
                  <div>€3,000 - Training & onboarding</div>
                  <div>15 meetings/month - Average output</div>
                </CardContent>
              </Card>

              <Card className="bg-background/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">With Astrid AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-primary-foreground/90">
                  <div>€2,490/month - All inclusive</div>
                  <div>€0 - Tools included</div>
                  <div>30 minutes - Setup time</div>
                  <div>100+ meetings/month - Guaranteed output</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">From Setup to Success in 30 Minutes</h2>
          <p className="text-xl text-muted-foreground">
            Faster solution adoption accelerates value creation, making everyone's life better
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <CardTitle>Quick Onboarding Call</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our team learns about your business, ideal customers, and sales process. We configure Astrid to speak your language and embody your brand values.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <CardTitle>Instant Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect your CRM, calendar, and lead sources. Astrid automatically syncs with your existing workflow—no technical expertise required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <CardTitle>Launch & Scale</CardTitle>
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
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Transform Your Sales?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join innovative companies already experiencing the power of instant lead response
          </p>
          
          <Button size="lg" className="text-lg px-8 py-4 mb-4">
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
