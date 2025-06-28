
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare, Plus, Eye, Trash2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import LeadDetailsModal from "./LeadDetailsModal";
import AddLeadsModal from "./AddLeadsModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LeadsPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddLeadsModalOpen, setIsAddLeadsModalOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads from database
  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('user_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        toast({
          title: "Error",
          description: "Failed to load leads.",
          variant: "destructive"
        });
      } else {
        setLeads(data || []);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCallLead = async (lead) => {
    try {
      const webhookUrl = 'https://ludvigwidmark.app.n8n.cloud/webhook-test/lovable-webhook';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'call_lead',
          lead: {
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            position: lead.position,
            last_contact: lead.last_contact,
            next_action: lead.next_action,
            custom_data: lead.custom_data
          },
          timestamp: new Date().toISOString(),
          user_id: user?.id
        })
      });

      if (response.ok) {
        toast({
          title: "Call Initiated",
          description: `Lead information for ${lead.name} has been sent to the webhook.`
        });
      } else {
        throw new Error('Webhook request failed');
      }
    } catch (error) {
      console.error('Error calling webhook:', error);
      toast({
        title: "Error",
        description: "Failed to initiate call. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const { error } = await supabase
        .from('user_leads')
        .delete()
        .eq('id', leadId);

      if (error) {
        console.error('Error deleting lead:', error);
        toast({
          title: "Error",
          description: "Failed to delete lead.",
          variant: "destructive"
        });
      } else {
        setLeads(leads.filter(lead => lead.id !== leadId));
        toast({
          title: "Success",
          description: "Lead deleted successfully."
        });
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Error",
        description: "Failed to delete lead.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAllLeads = async () => {
    try {
      const { error } = await supabase
        .from('user_leads')
        .delete()
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting all leads:', error);
        toast({
          title: "Error",
          description: "Failed to delete all leads.",
          variant: "destructive"
        });
      } else {
        setLeads([]);
        toast({
          title: "Success",
          description: "All leads deleted successfully."
        });
      }
    } catch (error) {
      console.error('Error deleting all leads:', error);
      toast({
        title: "Error",
        description: "Failed to delete all leads.",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-titanium-600 dark:text-titanium-400">Loading leads...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-titanium-600 dark:text-titanium-400" />
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">{leads.length}</p>
                <p className="text-sm text-titanium-600 dark:text-titanium-400">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-titanium-600 dark:text-titanium-400" />
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">0</p>
                <p className="text-sm text-titanium-600 dark:text-titanium-400">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-titanium-600 dark:text-titanium-400" />
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">0</p>
                <p className="text-sm text-titanium-600 dark:text-titanium-400">Calls Made</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-titanium-600 dark:text-titanium-400" />
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">0%</p>
                <p className="text-sm text-titanium-600 dark:text-titanium-400">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Pipeline */}
      <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-black dark:text-white">Leads</CardTitle>
              <CardDescription className="text-titanium-600 dark:text-titanium-400">
                Manage your lead pipeline
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              {leads.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                        Delete All Leads
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all {leads.length} leads from your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAllLeads}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete All Leads
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button 
                onClick={() => setIsAddLeadsModalOpen(true)}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Leads
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-titanium-400 dark:text-titanium-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black dark:text-white mb-2">No leads yet</h3>
              <p className="text-titanium-600 dark:text-titanium-400 mb-6">Get started by adding your first lead.</p>
              <Button 
                onClick={() => setIsAddLeadsModalOpen(true)}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Leads
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-titanium-50 dark:bg-titanium-900 rounded-xl p-4 border border-titanium-200 dark:border-titanium-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-semibold text-sm">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-black dark:text-white">{lead.name}</h4>
                        <p className="text-sm text-titanium-600 dark:text-titanium-400">{lead.position} at {lead.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-titanium-600 dark:text-titanium-400">Last contact: {lead.last_contact}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-titanium-600 dark:text-titanium-400" />
                      <span className="text-sm font-medium text-black dark:text-white">{lead.next_action}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCallLead(lead)}
                        className="border-titanium-300 dark:border-titanium-600 text-black dark:text-white hover:bg-titanium-100 dark:hover:bg-titanium-800"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="border-titanium-300 dark:border-titanium-600 text-black dark:text-white hover:bg-titanium-100 dark:hover:bg-titanium-800">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleViewDetails(lead)}
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center">
                              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                              Delete Lead
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {lead.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteLead(lead.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete Lead
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

      <AddLeadsModal
        isOpen={isAddLeadsModalOpen}
        onClose={() => setIsAddLeadsModalOpen(false)}
        onLeadsAdded={fetchLeads}
      />
    </div>
  );
};

export default LeadsPage;
