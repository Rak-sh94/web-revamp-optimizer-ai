
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  teamMembers: string[];
  milestones: { id: string; title: string; completed: boolean }[];
}

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<Project, 'id'>) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAddProject }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    teamMembers: '',
    milestones: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.deadline) {
      const teamArray = formData.teamMembers.split(',').map(member => member.trim()).filter(member => member);
      const milestoneArray = formData.milestones.split(',').map(milestone => milestone.trim()).filter(milestone => milestone);
      
      onAddProject({
        title: formData.title,
        description: formData.description,
        progress: 0,
        deadline: formData.deadline,
        teamMembers: teamArray,
        milestones: milestoneArray.map((title, index) => ({
          id: (index + 1).toString(),
          title,
          completed: false
        }))
      });
      
      setFormData({
        title: '',
        description: '',
        deadline: '',
        teamMembers: '',
        milestones: ''
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400">
        <DialogHeader>
          <DialogTitle className="text-blue-900 text-xl font-bold">🗺️ Plot New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-blue-800 font-semibold">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter project title..."
              className="border-blue-300"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-blue-800 font-semibold">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your voyage..."
              className="border-blue-300"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="deadline" className="text-blue-800 font-semibold">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="border-blue-300"
              required
            />
          </div>

          <div>
            <Label htmlFor="teamMembers" className="text-blue-800 font-semibold">Crew Members</Label>
            <Input
              id="teamMembers"
              value={formData.teamMembers}
              onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
              placeholder="Enter names separated by commas..."
              className="border-blue-300"
            />
          </div>

          <div>
            <Label htmlFor="milestones" className="text-blue-800 font-semibold">Key Milestones</Label>
            <Input
              id="milestones"
              value={formData.milestones}
              onChange={(e) => setFormData({ ...formData, milestones: e.target.value })}
              placeholder="Enter milestones separated by commas..."
              className="border-blue-300"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              Set Sail
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

export default AddProjectModal;
