import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Phone, Mail, Star, MessageSquare, Plus, Eye, Trash2, AlertTriangle, MoreVertical, Zap, Wand } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import LeadDetailsModal from "./LeadDetailsModal";
import AddLeadsModal from "./AddLeadsModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const LeadsPage = () => {
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddLeadsModalOpen, setIsAddLeadsModalOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [callingLeads, setCallingLeads] = useState<Set<string>>(new Set());

  // Fetch leads from database
  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);
  const fetchLeads = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('user_leads').select('*').order('created_at', {
        ascending: false
      });
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
  const handleCallLead = async lead => {
    try {
      setCallingLeads(prev => new Set([...prev, lead.id]));
      const webhookUrl = 'https://ludvigwidmark.app.n8n.cloud/webhook/lovable-webhook';
      const callbackUrl = `${window.location.origin}/api/vapi-callback`;
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'call_lead',
          rowId: lead.id,
          lead: {
            name: lead.name,
            email: lead.email,
            phone: lead.phone
          },
          callbackUrl: callbackUrl,
          timestamp: new Date().toISOString(),
          user_id: user?.id
        })
      });
      if (response.ok) {
        // Update lead status to 'calling' and increment call count
        const currentCallCount = lead.call_count || 0;
        await supabase.from('user_leads').update({
          status: 'calling',
          call_count: currentCallCount + 1
        }).eq('id', lead.id);

        // Refresh leads to show updated status
        fetchLeads();
        toast({
          title: "Call Initiated",
          description: `Call initiated for ${lead.name}. The lead status has been updated.`
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
    } finally {
      setCallingLeads(prev => {
        const newSet = new Set(prev);
        newSet.delete(lead.id);
        return newSet;
      });
    }
  };
  const handleSelectLead = (leadId: string, checked: boolean) => {
    const newSelectedLeads = new Set(selectedLeads);
    if (checked) {
      newSelectedLeads.add(leadId);
    } else {
      newSelectedLeads.delete(leadId);
    }
    setSelectedLeads(newSelectedLeads);
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(new Set(leads.map(lead => lead.id)));
    } else {
      setSelectedLeads(new Set());
    }
  };
  const handleBulkDelete = async () => {
    try {
      const selectedLeadIds = Array.from(selectedLeads) as string[];
      const {
        error
      } = await supabase.from('user_leads').delete().in('id', selectedLeadIds);
      if (error) {
        console.error('Error deleting leads:', error);
        toast({
          title: "Error",
          description: "Failed to delete selected leads.",
          variant: "destructive"
        });
      } else {
        setLeads(leads.filter(lead => !selectedLeads.has(lead.id)));
        setSelectedLeads(new Set());
        toast({
          title: "Success",
          description: `Successfully deleted ${selectedLeadIds.length} lead(s).`
        });
      }
    } catch (error) {
      console.error('Error deleting leads:', error);
      toast({
        title: "Error",
        description: "Failed to delete selected leads.",
        variant: "destructive"
      });
    }
  };
  const handleBulkCall = async () => {
    try {
      const selectedLeadData = leads.filter(lead => selectedLeads.has(lead.id));
      const selectedLeadIds = Array.from(selectedLeads);
      setCallingLeads(prev => new Set([...prev, ...selectedLeadIds]));
      const webhookUrl = 'https://ludvigwidmark.app.n8n.cloud/webhook/lovable-webhook';
      const callbackUrl = `${window.location.origin}/api/vapi-callback`;
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'bulk_call_leads',
          leads: selectedLeadData.map(lead => ({
            rowId: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone
          })),
          callbackUrl: callbackUrl,
          timestamp: new Date().toISOString(),
          user_id: user?.id
        })
      });
      if (response.ok) {
        // Update all selected leads status to 'calling'
        await supabase.from('user_leads').update({
          status: 'calling'
        }).in('id', selectedLeadIds);

        // Refresh leads to show updated status
        fetchLeads();
        toast({
          title: "Bulk Call Initiated",
          description: `Bulk call initiated for ${selectedLeadData.length} leads.`
        });
        setSelectedLeads(new Set());
      } else {
        throw new Error('Webhook request failed');
      }
    } catch (error) {
      console.error('Error initiating bulk call:', error);
      toast({
        title: "Error",
        description: "Failed to initiate bulk call. Please try again.",
        variant: "destructive"
      });
    } finally {
      const selectedLeadIds = Array.from(selectedLeads);
      setCallingLeads(prev => {
        const newSet = new Set(prev);
        selectedLeadIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  };
  const handleViewDetails = lead => {
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
  const handleRunLeadMagnet = () => {
    toast({
      title: "Lead Magnet",
      description: "Lead Magnet feature is coming soon! Stay tuned for updates."
    });
  };
  const getCallStatusBadge = lead => {
    if (lead.status === 'calling') {
      const stepNumber = (lead.call_count || 0) + 1;
      return;
    }
    if (lead.status === 'completed') {
      if (lead.qualified === true) {
        return <Badge className="bg-green-500 text-white">Qualified</Badge>;
      } else if (lead.qualified === false) {
        return <Badge className="bg-red-500 text-white">Not Qualified</Badge>;
      }
      return <Badge className="bg-blue-500 text-white">Call Completed</Badge>;
    }
    return null;
  };
  const handleGetMoreLeads = () => {
    toast({
      title: "Coming Soon",
      description: "AI-powered lead generation is coming soon! Stay tuned for updates."
    });
  };
  if (loading) {
    return <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-titanium-600 dark:text-titanium-400">Loading leads...</div>
        </div>
      </div>;
  }
  const isAllSelected = leads.length > 0 && selectedLeads.size === leads.length;
  const isIndeterminate = selectedLeads.size > 0 && selectedLeads.size < leads.length;
  return <div className="space-y-6">
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
                <p className="text-2xl font-bold text-black dark:text-white">
                  {leads.filter(lead => lead.qualified === true).length}
                </p>
                <p className="text-sm text-titanium-600 dark:text-titanium-400">Qualified Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-titanium-600 dark:text-titanium-400" />
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">
                  {leads.filter(lead => lead.status === 'completed').length}
                </p>
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
                <p className="text-2xl font-bold text-black dark:text-white">
                  {leads.filter(lead => lead.meeting_booked === true).length}
                </p>
                <p className="text-sm text-titanium-600 dark:text-titanium-400">Meetings Booked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Pipeline */}
      <Card className="bg-white dark:bg-black border-titanium-300 dark:border-titanium-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <div>
                <CardTitle className="text-black dark:text-white">Leads</CardTitle>
                <CardDescription className="text-titanium-600 dark:text-titanium-400 flex items-center space-x-4">
                  <span>Manage your lead pipeline</span>
                  {leads.length > 0 && <div className="flex items-center space-x-2">
                      <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} className="data-[state=indeterminate]:bg-titanium-600" />
                      <label className="text-sm font-medium text-black dark:text-white">
                        Select All ({leads.length})
                      </label>
                    </div>}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                {selectedLeads.size > 0 && <div className="flex space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border-titanium-300 dark:border-titanium-600">
                          <MoreVertical className="w-4 h-4 mr-2" />
                          Actions ({selectedLeads.size})
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleBulkCall}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call Selected
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleRunLeadMagnet}>
                          <Zap className="w-4 h-4 mr-2" />
                          Run Lead Magnet
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Selected
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center">
                                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                                Delete Selected Leads
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {selectedLeads.size} selected lead(s)? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700 text-white">
                                Delete Selected
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>}
                
                <Button onClick={() => setIsAddLeadsModalOpen(true)} className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Leads
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? <div className="text-center py-12">
              <Users className="w-16 h-16 text-titanium-400 dark:text-titanium-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black dark:text-white mb-2">No leads yet</h3>
              <p className="text-titanium-600 dark:text-titanium-400 mb-6">Get started by adding your first lead or let AI find leads for you.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleGetMoreLeads} variant="outline" className="border-titanium-300 dark:border-titanium-600 text-black dark:text-white hover:bg-titanium-100 dark:hover:bg-titanium-800">
                  <Wand className="w-4 h-4 mr-2" />
                  Get More Leads
                </Button>
                <Button onClick={() => setIsAddLeadsModalOpen(true)} className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Leads
                </Button>
              </div>
            </div> : <div className="space-y-3">
              {leads.map(lead => <div key={lead.id} className="bg-titanium-50 dark:bg-titanium-900 rounded-xl p-4 border border-titanium-200 dark:border-titanium-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox checked={selectedLeads.has(lead.id)} onCheckedChange={checked => handleSelectLead(lead.id, !!checked)} />
                      <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-semibold text-sm">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-black dark:text-white">{lead.name}</h4>
                        <p className="text-sm text-titanium-600 dark:text-titanium-400">{lead.position} at {lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getCallStatusBadge(lead)}
                      {lead.meeting_booked && <Badge className="bg-purple-500 text-white">Meeting Booked</Badge>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-titanium-600 dark:text-titanium-400">
                      Last contact: {lead.last_contact}
                      {lead.call_duration && <span className="ml-4">Call duration: {Math.round(lead.call_duration / 60)}min</span>}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-titanium-600 dark:text-titanium-400" />
                      <span className="text-sm font-medium text-black dark:text-white">{lead.next_action}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleCallLead(lead)} className="border-titanium-300 dark:border-titanium-600 text-black dark:text-white hover:bg-titanium-100 dark:hover:bg-titanium-800" disabled={callingLeads.has(lead.id)}>
                        <Phone className="w-4 h-4 mr-1" />
                        {callingLeads.has(lead.id) ? 'Calling...' : 'Call'}
                      </Button>
                      <Button variant="outline" size="sm" className="border-titanium-300 dark:border-titanium-600 text-black dark:text-white hover:bg-titanium-100 dark:hover:bg-titanium-800">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" onClick={() => handleViewDetails(lead)} className="bg-black dark:bg-white text-white dark:text-black hover:bg-titanium-800 dark:hover:bg-titanium-200">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>}
        </CardContent>
      </Card>

      <LeadDetailsModal lead={selectedLead} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AddLeadsModal isOpen={isAddLeadsModalOpen} onClose={() => setIsAddLeadsModalOpen(false)} onLeadsAdded={fetchLeads} />
    </div>;
};
export default LeadsPage;