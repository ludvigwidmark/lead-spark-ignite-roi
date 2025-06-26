
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plug, ArrowRight, Users, TrendingUp, Target } from "lucide-react";
import GeometricLogo from "./GeometricLogo";

interface LandingPageProps {
  onLeadsUploaded: (leads: any[]) => void;
  onConnectSources: () => void;
}

const LandingPage = ({ onLeadsUploaded, onConnectSources }: LandingPageProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  console.log("LandingPage is rendering");

  const normalizeColumnName = (header: string) => {
    const normalized = header.toLowerCase().trim();
    
    if (normalized.includes('first') && normalized.includes('name')) return 'firstName';
    if (normalized.includes('last') && normalized.includes('name')) return 'lastName';
    if (normalized === 'name' || normalized === 'full name' || normalized === 'fullname') return 'name';
    if (normalized === 'email' || normalized === 'email address') return 'email';
    if (normalized === 'phone' || normalized === 'phone number' || normalized === 'mobile') return 'phone';
    if (normalized === 'company' || normalized === 'organization' || normalized === 'employer') return 'company';
    if (normalized === 'position' || normalized === 'title' || normalized === 'job title' || normalized === 'role') return 'position';
    
    return header.trim();
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const normalizedHeaders = headers.map(normalizeColumnName);
      
      const hasName = normalizedHeaders.some(h => ['name', 'firstName', 'lastName'].includes(h));
      const hasEmail = normalizedHeaders.includes('email');
      
      if (!hasName && !hasEmail) {
        toast({
          title: "Invalid CSV Format",
          description: "CSV must contain at least a Name column or Email column to identify leads.",
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }

      const newLeads = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const leadData: any = {};
        const customData: any = {};
        
        headers.forEach((header, index) => {
          const normalizedHeader = normalizedHeaders[index];
          const value = values[index] || '';
          
          switch (normalizedHeader) {
            case 'firstName':
              leadData.firstName = value;
              break;
            case 'lastName':
              leadData.lastName = value;
              break;
            case 'name':
              leadData.name = value;
              break;
            case 'email':
              leadData.email = value;
              break;
            case 'phone':
              leadData.phone = value;
              break;
            case 'company':
              leadData.company = value;
              break;
            case 'position':
              leadData.position = value;
              break;
            default:
              if (value) {
                customData[header] = value;
              }
          }
        });

        if (!leadData.name && (leadData.firstName || leadData.lastName)) {
          leadData.name = `${leadData.firstName || ''} ${leadData.lastName || ''}`.trim();
        }

        if (leadData.name || leadData.email) {
          newLeads.push({
            id: Date.now() + i,
            name: leadData.name || 'Unknown Name',
            company: leadData.company || 'Unknown Company',
            position: leadData.position || 'Unknown Position',
            email: leadData.email || 'N/A',
            phone: leadData.phone || 'N/A',
            lastContact: 'Just added',
            nextAction: 'Initial Contact Needed',
            customData
          });
        }
      }

      if (newLeads.length > 0) {
        onLeadsUploaded(newLeads);
        toast({
          title: "Success!",
          description: `Uploaded ${newLeads.length} leads. Please create an account to continue.`
        });
      } else {
        toast({
          title: "No Valid Leads Found",
          description: "Please check your CSV format and ensure it contains name or email columns.",
          variant: "destructive"
        });
      }
      setIsUploading(false);
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="min-h-screen font-work" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GeometricLogo size="sm" className="text-white" />
              <h1 className="text-xl font-bold text-white">Clyo</h1>
            </div>
            <div className="text-sm text-white/80">
              AI-Powered Lead Management Platform
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center mb-16">
          <div className="mb-8">
            <GeometricLogo size="lg" className="text-white mx-auto mb-6" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Build something
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Lovable</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Create apps and websites by chatting with AI
          </p>
          
          {/* Main Input Area */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-16 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload CSV Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-black transition-colors bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-900 text-lg">Upload CSV File</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    Upload your existing leads from a CSV file
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white w-full"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Supports Name, Email, Phone, Company columns
                  </p>
                </CardContent>
              </Card>

              {/* Connect Sources Card */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Plug className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-900 text-lg">Connect Sources</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    Connect your CRM and other lead sources
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={onConnectSources}
                    variant="outline" 
                    className="border-black text-black hover:bg-black hover:text-white w-full"
                  >
                    <Plug className="w-4 h-4 mr-2" />
                    Connect
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    CRM, forms, webhooks supported
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-center mt-6">
              <span className="text-gray-400 text-sm mr-2">🌐</span>
              <span className="text-gray-600 text-sm">Public</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">10,000+</h3>
              <p className="text-white/80">Leads Managed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">85%</h3>
              <p className="text-white/80">Conversion Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Target className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">3x</h3>
              <p className="text-white/80">Faster Outreach</p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-white/80 text-sm">
            Upload your leads or connect your sources to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
