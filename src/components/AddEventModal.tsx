
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'event' | 'reminder';
  location?: string;
  description?: string;
}

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'event' as const,
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.time) {
      onAddEvent({
        title: formData.title,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        location: formData.location || undefined,
        description: formData.description || undefined
      });
      setFormData({
        title: '',
        date: '',
        time: '',
        type: 'event',
        location: '',
        description: ''
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400">
        <DialogHeader>
          <DialogTitle className="text-blue-900 text-xl font-bold">🔭 Log New Sighting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-blue-800 font-semibold">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title..."
              className="border-blue-300"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-blue-800 font-semibold">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-blue-300"
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-blue-800 font-semibold">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border-blue-300"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-blue-800 font-semibold">Event Type</Label>
            <Select value={formData.type} onValueChange={(value: 'meeting' | 'deadline' | 'event' | 'reminder') => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="border-blue-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">🍺 Meeting</SelectItem>
                <SelectItem value="deadline">💀 Deadline</SelectItem>
                <SelectItem value="event">🎉 Event</SelectItem>
                <SelectItem value="reminder">🦜 Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location" className="text-blue-800 font-semibold">Location (Optional)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter location..."
              className="border-blue-300"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-blue-800 font-semibold">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description..."
              className="border-blue-300"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Log Sighting
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="border-blue-300">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
