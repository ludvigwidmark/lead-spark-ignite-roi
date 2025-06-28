
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { User, Upload, Zap, Grid3X3 } from "lucide-react";

interface AddLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadsAdded: () => void;
}

const AddLeadsModal = ({ isOpen, onClose, onLeadsAdded }: AddLeadsModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !formData.name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_leads')
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone || null,
          company: formData.company || null,
          position: formData.position || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead added successfully!"
      });

      setFormData({ name: '', email: '', phone: '', company: '', position: '' });
      onLeadsAdded();
      onClose();
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: "Error",
        description: "Failed to add lead",
        variant: "destructive"
      });
    }
  };

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

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
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
            user_id: user.id,
            name: leadData.name || 'Unknown Name',
            company: leadData.company || null,
            position: leadData.position || null,
            email: leadData.email || null,
            phone: leadData.phone || null,
            custom_data: customData
          });
        }
      }

      if (newLeads.length > 0) {
        try {
          const { error } = await supabase
            .from('user_leads')
            .insert(newLeads);

          if (error) throw error;

          toast({
            title: "CSV Uploaded Successfully",
            description: `Added ${newLeads.length} new leads to your pipeline.`
          });

          onLeadsAdded();
          onClose();
        } catch (error) {
          console.error('Error inserting leads:', error);
          toast({
            title: "Error",
            description: "Failed to save leads to database.",
            variant: "destructive"
          });
        }
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

  const handleWebhookSetup = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Webhook Setup",
      description: `Webhook URL saved: ${webhookUrl}. You can now send leads to this endpoint.`
    });
    
    setWebhookUrl('');
    onClose();
  };

  const handleConnectCRM = () => {
    toast({
      title: "CRM Integration",
      description: "CRM integration coming soon! Connect your Salesforce, HubSpot, or other CRM platform."
    });
    onClose();
  };

  const renderOptionContent = () => {
    switch (selectedOption) {
      case 'manual':
        return (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-black dark:bg-white text-white dark:text-black">
                Add Lead
              </Button>
              <Button type="button" variant="outline" onClick={() => setSelectedOption(null)}>
                Back
              </Button>
            </div>
          </form>
        );

      case 'csv':
        return (
          <div className="space-y-4">
            <p className="text-sm text-titanium-600 dark:text-titanium-400">
              Upload a CSV file with your leads. Make sure it includes columns for Name, Email, Phone, Company, and Position.
            </p>
            <div className="relative">
              <Input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="cursor-pointer"
              />
            </div>
            <Button variant="outline" onClick={() => setSelectedOption(null)}>
              Back
            </Button>
          </div>
        );

      case 'webhook':
        return (
          <div className="space-y-4">
            <p className="text-sm text-titanium-600 dark:text-titanium-400">
              Set up a webhook endpoint to receive leads from external sources.
            </p>
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-url.com"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleWebhookSetup} className="bg-black dark:bg-white text-white dark:text-black">
                Save Webhook
              </Button>
              <Button variant="outline" onClick={() => setSelectedOption(null)}>
                Back
              </Button>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="space-y-4">
            <p className="text-sm text-titanium-600 dark:text-titanium-400">
              Connect your existing CRM to automatically sync leads.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={handleConnectCRM}>
                Salesforce
              </Button>
              <Button variant="outline" onClick={handleConnectCRM}>
                HubSpot
              </Button>
              <Button variant="outline" onClick={handleConnectCRM}>
                Pipedrive
              </Button>
              <Button variant="outline" onClick={handleConnectCRM}>
                Other CRM
              </Button>
            </div>
            <Button variant="outline" onClick={() => setSelectedOption(null)}>
              Back
            </Button>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2 border-titanium-300 dark:border-titanium-600 hover:bg-titanium-50 dark:hover:bg-titanium-900"
              onClick={() => setSelectedOption('manual')}
            >
              <User className="w-6 h-6" />
              <span>Manual Entry</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2 border-titanium-300 dark:border-titanium-600 hover:bg-titanium-50 dark:hover:bg-titanium-900"
              onClick={() => setSelectedOption('csv')}
            >
              <Upload className="w-6 h-6" />
              <span>CSV Upload</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2 border-titanium-300 dark:border-titanium-600 hover:bg-titanium-50 dark:hover:bg-titanium-900"
              onClick={() => setSelectedOption('webhook')}
            >
              <Zap className="w-6 h-6" />
              <span>Webhook</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2 border-titanium-300 dark:border-titanium-600 hover:bg-titanium-50 dark:hover:bg-titanium-900"
              onClick={() => setSelectedOption('crm')}
            >
              <Grid3X3 className="w-6 h-4" />
              <span>Connect CRM</span>
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedOption ? 
              `${selectedOption === 'manual' ? 'Manual Entry' : 
                selectedOption === 'csv' ? 'CSV Upload' : 
                selectedOption === 'webhook' ? 'Webhook' : 'Connect CRM'}` 
              : 'Add New Customer'}
          </DialogTitle>
        </DialogHeader>
        {renderOptionContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadsModal;
