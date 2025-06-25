
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Building, User, Calendar, Target, Star } from "lucide-react";

interface LeadDetailsModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailsModal = ({ lead, isOpen, onClose }: LeadDetailsModalProps) => {
  if (!lead) return null;

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
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const hasCustomData = lead.customData && Object.keys(lead.customData).length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold">{lead.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lead.position} at {lead.company}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status and Score */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(lead.status)}>
              {lead.status.toUpperCase()} - Stage {lead.stage}
            </Badge>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className={`text-xl font-bold ${getScoreColor(lead.score)}`}>
                {lead.score}/100
              </span>
            </div>
          </div>

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
                <strong>Last Contact:</strong> {lead.lastContact}
              </div>
              <div className="text-sm">
                <strong>Next Action:</strong> {lead.nextAction}
              </div>
            </div>
          </div>

          {/* Custom Data */}
          {hasCustomData && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(lead.customData).map(([key, value]) => (
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
            <Button className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Lead
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
