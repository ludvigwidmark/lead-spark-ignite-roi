

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Building, User, Calendar, Target, Clock, MessageSquare } from "lucide-react";

interface LeadDetailsModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailsModal = ({ lead, isOpen, onClose }: LeadDetailsModalProps) => {
  if (!lead) return null;

  const hasCustomData = lead.custom_data && Object.keys(lead.custom_data).length > 0;

  const getStatusBadge = () => {
    if (lead.status === 'calling') {
      return <Badge className="bg-yellow-500 text-white">Calling</Badge>;
    }
    if (lead.status === 'completed') {
      if (lead.qualified === true) {
        return <Badge className="bg-green-500 text-white">Qualified</Badge>;
      } else if (lead.qualified === false) {
        return <Badge className="bg-red-500 text-white">Not Qualified</Badge>;
      }
      return <Badge className="bg-blue-500 text-white">Call Completed</Badge>;
    }
    return <Badge className="bg-gray-500 text-white">Pending</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{lead.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{lead.position} at {lead.company}</p>
                </div>
                {getStatusBadge()}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Email:</strong> {lead.email}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Phone:</strong> {lead.phone}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Company:</strong> {lead.company}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Position:</strong> {lead.position}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Activity
            </h3>
            
            <div className="space-y-2">
              <div className="text-sm">
                <strong>Last Contact:</strong> {lead.last_contact}
              </div>
              <div className="text-sm">
                <strong>Next Action:</strong> {lead.next_action}
              </div>
              {lead.call_completed_at && (
                <div className="text-sm">
                  <strong>Last Call:</strong> {new Date(lead.call_completed_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Call Information */}
          {(lead.call_duration || lead.meeting_booked || lead.transcript) && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lead.call_duration && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Duration:</strong> {Math.round(lead.call_duration / 60)} minutes
                      </span>
                    </div>
                  )}
                  
                  {lead.meeting_booked !== null && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Meeting Booked:</strong> {lead.meeting_booked ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                </div>

                {lead.transcript && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Call Transcript
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm max-h-40 overflow-y-auto">
                      {lead.transcript}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Custom Data */}
          {hasCustomData && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(lead.custom_data).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <strong>{key}:</strong> {String(value)}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1" disabled={lead.status === 'calling'}>
              <Phone className="w-4 h-4 mr-2" />
              {lead.status === 'calling' ? 'Calling...' : 'Call Lead'}
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
