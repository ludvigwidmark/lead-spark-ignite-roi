
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plug, Target, ArrowRight, Users, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onLeadsUploaded: (leads: any[]) => void;
  onConnectSources: () => void;
}

const LandingPage = ({ onLeadsUploaded, onConnectSources }: LandingPageProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Clyo</h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              AI-Powered Lead Management Platform
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your Leads Into Revenue
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Upload your leads or connect your sources to get started with AI-powered lead management
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10,000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Leads Managed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85%</h3>
              <p className="text-gray-600 dark:text-gray-400">Conversion Rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3x</h3>
              <p className="text-gray-600 dark:text-gray-400">Faster Outreach</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload CSV Card */}
          <Card className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Upload CSV File</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Upload your existing leads from a CSV file and get started immediately
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-full"
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
                      Choose CSV File
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Supports Name, Email, Phone, Company, Position columns
              </p>
            </CardContent>
          </Card>

          {/* Connect Sources Card */}
          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plug className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Connect Lead Sources</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Connect your CRM, forms, and other lead sources for automatic sync
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={onConnectSources}
                variant="outline" 
                className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 w-full"
              >
                <Plug className="w-4 h-4 mr-2" />
                Connect Sources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Supports CRM, forms, webhooks, and more
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to supercharge your lead management?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Upload your leads or connect your sources to get started - you'll create your account next
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
