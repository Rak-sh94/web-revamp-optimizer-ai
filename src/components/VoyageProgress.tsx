
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Clock, MapPin } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  teamMembers: string[];
  milestones: { id: string; title: string; completed: boolean }[];
}

interface VoyageProgressProps {
  projects: Project[];
  onAddProject: () => void;
}

const VoyageProgress: React.FC<VoyageProgressProps> = ({ projects, onAddProject }) => {
  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg shadow-lg transform rotate-1">
          <h2 className="text-2xl font-bold tracking-wider">VOYAGE PROGRESS</h2>
        </div>
        <div className="text-yellow-400 text-4xl mt-2">⚓</div>
      </div>

      {/* Project Cards */}
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-2 border-blue-400 shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
                🗺️ {project.title}
              </CardTitle>
              {project.description && (
                <p className="text-blue-700 text-sm">{project.description}</p>
              )}
            </CardHeader>
            
            <CardContent>
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-800">Progress</span>
                  <span className="text-sm font-bold text-blue-900">{project.progress}% Plundered!</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={project.progress} 
                    className="h-3 bg-blue-200"
                  />
                  <div className="absolute right-0 top-0 h-3 w-6 flex items-center justify-center">
                    🚢
                  </div>
                </div>
              </div>

              {/* Milestones */}
              {project.milestones.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Key Milestones:</h4>
                  <div className="space-y-1">
                    {project.milestones.slice(0, 3).map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-2 text-sm">
                        <span className={milestone.completed ? '✓' : '📍'} />
                        <span className={milestone.completed ? 'line-through text-green-600' : 'text-blue-700'}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team and Deadline */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1 text-blue-700">
                  <Users className="h-4 w-4" />
                  <span>{project.teamMembers.length} Crew</span>
                </div>
                <div className="flex items-center gap-1 text-blue-700">
                  <Clock className="h-4 w-4" />
                  <span>{project.deadline}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card className="bg-white/10 border-dashed border-2 border-gray-400">
            <CardContent className="p-8 text-center">
              <p className="text-gray-300 text-lg">No active voyages!</p>
              <p className="text-gray-400 text-sm mt-2">Plot a new course for adventure!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add New Project Button */}
      <div className="mt-6">
        <Button
          onClick={onAddProject}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Plot New Course
        </Button>
      </div>
    </div>
  );
};

export default VoyageProgress;
