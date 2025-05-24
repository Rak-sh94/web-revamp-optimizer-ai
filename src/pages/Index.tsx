
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import CaptainsOrders from "@/components/CaptainsOrders";
import VoyageProgress from "@/components/VoyageProgress";
import HorizonEvents from "@/components/HorizonEvents";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  teamMembers: string[];
  milestones: { id: string; title: string; completed: boolean }[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'event' | 'reminder';
  location?: string;
  description?: string;
}

const Index = () => {
  const { toast } = useToast();

  // Load data from localStorage or initialize with sample data
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('onePiece_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Find the One Piece', completed: false, priority: 'high', dueDate: '2024-12-31' },
      { id: '2', title: 'Master Gear 5', completed: false, priority: 'high' },
      { id: '3', title: 'Recruit Jinbe', completed: true, priority: 'medium' },
      { id: '4', title: 'Visit Elbaf', completed: false, priority: 'low' },
    ];
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('onePiece_projects');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Reach Laugh Tale',
        description: 'The final island where One Piece awaits',
        progress: 75,
        deadline: '2024-12-31',
        teamMembers: ['Luffy', 'Zoro', 'Nami', 'Sanji'],
        milestones: [
          { id: '1', title: 'Defeat Kaido', completed: true },
          { id: '2', title: 'Find Road Poneglyph', completed: true },
          { id: '3', title: 'Navigate Final Route', completed: false },
        ]
      },
      {
        id: '2',
        title: 'Liberate Wano',
        description: 'Free the people of Wano from tyranny',
        progress: 100,
        deadline: '2024-01-15',
        teamMembers: ['Luffy', 'Zoro', 'Law', 'Kid'],
        milestones: [
          { id: '1', title: 'Infiltrate Onigashima', completed: true },
          { id: '2', title: 'Defeat Kaido', completed: true },
          { id: '3', title: 'Restore Wano', completed: true },
        ]
      }
    ];
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('onePiece_events');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Crew Meeting',
        date: '2024-05-25',
        time: '10:00',
        type: 'meeting',
        location: 'Thousand Sunny',
        description: 'Plan next adventure route'
      },
      {
        id: '2',
        title: 'Training Session',
        date: '2024-05-26',
        time: '14:00',
        type: 'event',
        description: 'Haki training with Rayleigh'
      },
      {
        id: '3',
        title: 'Bounty Deadline',
        date: '2024-05-30',
        time: '23:59',
        type: 'deadline',
        description: 'Marines expect capture'
      }
    ];
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('onePiece_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('onePiece_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('onePiece_events', JSON.stringify(events));
  }, [events]);

  // Task handlers
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks([...tasks, task]);
    toast({
      title: "New Bounty Added!",
      description: `"${task.title}" has been added to your hunt list.`,
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Bounty Reopened!" : "Bounty Claimed!",
        description: `"${task.title}" ${task.completed ? 'is back on the hunt' : 'has been completed'}.`,
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    if (task) {
      toast({
        title: "Bounty Abandoned",
        description: `"${task.title}" has been removed from your list.`,
        variant: "destructive"
      });
    }
  };

  // Project handlers
  const handleAddProject = () => {
    toast({
      title: "Plot New Course",
      description: "Feature coming soon! Chart your next great adventure.",
    });
  };

  // Event handlers
  const handleAddEvent = () => {
    toast({
      title: "Log New Sighting",
      description: "Feature coming soon! Keep watch on the horizon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl animate-bounce">🌊</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">⭐</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce delay-1000">🏴‍☠️</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-pulse delay-500">💎</div>
      </div>

      {/* Faint Ship Silhouette */}
      <div className="absolute bottom-0 right-0 opacity-5 text-9xl">🚢</div>

      <div className="relative z-10 p-6">
        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black px-8 py-4 rounded-xl shadow-2xl transform -rotate-2 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider">
              ONE PIECE TO-DO TRACKER
            </h1>
          </div>
          <p className="text-xl text-yellow-200 font-medium mt-4">
            🏴‍☠️ Chart Your Course to Adventure! 🏴‍☠️
          </p>
          <div className="text-yellow-300 text-lg mt-2">
            "I'm gonna be the Pirate King!" - Monkey D. Luffy
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Captain's Orders */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl h-full">
              <CaptainsOrders
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>

          {/* Center Column: Voyage Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl h-full">
              <VoyageProgress
                projects={projects}
                onAddProject={handleAddProject}
              />
            </div>
          </div>

          {/* Right Column: Horizon Events */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl h-full">
              <HorizonEvents
                events={events}
                onAddEvent={handleAddEvent}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="text-yellow-200 text-lg font-medium">
            ⚓ "The sea is vast and full of adventure!" ⚓
          </div>
          <div className="text-blue-200 text-sm mt-2">
            Navigate your dreams with the spirit of the Grand Line!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
