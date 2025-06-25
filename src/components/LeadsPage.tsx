import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare, Plug, RotateCcw, Upload, Eye } from "lucide-react";
import LeadDetailsModal from "./LeadDetailsModal";

interface LeadsPageProps {
  initialLeads?: any[];
}

const LeadsPage = ({ initialLeads = [] }: LeadsPageProps) => {
  const { toast } = useToast();
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  // Initialize leads with any passed initial leads
  useEffect(() => {
    if (initialLeads.length > 0) {
      setLeads(initialLeads);
    }
  }, [initialLeads]);

  const handleConnectSources = () => {
    toast({
      title: "Lead Sources Integration",
      description: "Connect your CRM, forms, and other lead sources to start capturing leads automatically."
    });
  };

  const handleReactivateOldCustomers = () => {
    toast({
      title: "Reactivate Old Customers",
      description: "AI will analyze your old customers and leads to identify reactivation opportunities."
    });
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const normalizeColumnName = (header) => {
    const normalized = header.toLowerCase().trim();
    
    // Map various name variations to our standard fields
    if (normalized.includes('first') && normalized.includes('name')) return 'firstName';
    if (normalized.includes('last') && normalized.includes('name')) return 'lastName';
    if (normalized === 'name' || normalized === 'full name' || normalized === 'fullname') return 'name';
    if (normalized === 'email' || normalized === 'email address') return 'email';
    if (normalized === 'phone' || normalized === 'phone number' || normalized === 'mobile') return 'phone';
    if (normalized === 'company' || normalized === 'organization' || normalized === 'employer') return 'company';
    if (normalized === 'position' || normalized === 'title' || normalized === 'job title' || normalized === 'role') return 'position';
    
    // Return original header for custom columns
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

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const normalizedHeaders = headers.map(normalizeColumnName);
      
      // Check if we have at least one way to identify a person (name or email)
      const hasName = normalizedHeaders.some(h => ['name', 'firstName', 'lastName'].includes(h));
      const hasEmail = normalizedHeaders.includes('email');
      
      if (!hasName && !hasEmail) {
        toast({
          title: "Invalid CSV Format",
          description: "CSV must contain at least a Name column or Email column to identify leads.",
          variant: "destructive"
        });
        return;
      }

      const newLeads = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const leadData: any = {};
        const customData: any = {};
        
        // Process each column
        headers.forEach((header, index) => {
          const normalizedHeader = normalizedHeaders[index];
          const value = values[index] || '';
          
          // Handle standard fields
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
              // Store as custom data
              if (value) {
                customData[header] = value;
              }
          }
        });

        // Construct the name if we have firstName/lastName but no name
        if (!leadData.name && (leadData.firstName || leadData.lastName)) {
          leadData.name = `${leadData.firstName || ''} ${leadData.lastName || ''}`.trim();
        }

        // Only add lead if we have a name or email
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
        setLeads(prev => [...prev, ...newLeads]);
        toast({
          title: "CSV Uploaded Successfully",
          description: `Added ${newLeads.length} new leads to your pipeline.`
        });
      } else {
        toast({
          title: "No Valid Leads Found",
          description: "Please check your CSV format and ensure it contains name or email columns.",
          variant: "destructive"
        });
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-sm";
      case "warm":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm";
      case "cold":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-sm";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 font-bold";
    if (score >= 70) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{leads.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calls Made</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Pipeline */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Leads</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Manage your lead pipeline
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSV
                </Button>
              </div>
              <Button onClick={handleReactivateOldCustomers} variant="outline" className="border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reactivate old customers/leads
              </Button>
              <Button onClick={handleConnectSources} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plug className="w-4 h-4 mr-2" />
                Connect Lead Sources
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No leads yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by uploading a CSV file or connecting your lead sources.</p>
              <div className="flex justify-center gap-4">
                <div className="relative">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CSV
                  </Button>
                </div>
                <Button onClick={handleConnectSources} variant="outline">
                  <Plug className="w-4 h-4 mr-2" />
                  Connect Sources
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{lead.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lead.position} at {lead.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last contact: {lead.lastContact}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.nextAction}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleViewDetails(lead)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <LeadDetailsModal 
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LeadsPage;
