
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

  const handleAddProject = () => {
    toast({
      title: "Plot New Course",
      description: "Feature coming soon! Chart your next great adventure.",
    });
  };

  const handleAddEvent = () => {
    toast({
      title: "Log New Sighting",
      description: "Feature coming soon! Keep watch on the horizon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl animate-bounce">🌊</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">⭐</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce delay-1000">🏴‍☠️</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-pulse delay-500">💎</div>
        <div className="absolute top-60 left-1/4 text-3xl animate-spin duration-[8s]">⚓</div>
        <div className="absolute bottom-40 right-1/3 text-4xl animate-bounce delay-700">🗺️</div>
        <div className="absolute top-80 right-1/4 text-2xl animate-pulse delay-300">💰</div>
      </div>

      {/* Floating Elements with Advanced Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 left-10 w-5 h-5 bg-red-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping delay-700"></div>
      </div>

      {/* Animated Ship Silhouette */}
      <div className="absolute bottom-0 right-0 opacity-5 text-9xl animate-[float_6s_ease-in-out_infinite]">🚢</div>

      <div className="relative z-10 p-6">
        {/* Enhanced Main Header with One Piece Logo Style */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Main Logo Container with One Piece Style */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-8 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white">
              {/* Skull and Crossbones Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-blue-600 animate-bounce">
                <span className="text-2xl">💀</span>
              </div>
              
              {/* Main Text with One Piece Styling */}
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider relative">
                <span className="relative inline-block">
                  <span className="absolute inset-0 text-yellow-400 transform translate-x-1 translate-y-1">
                    RAKESH'S
                  </span>
                  <span className="relative text-white stroke-2 stroke-black">
                    RAKESH'S
                  </span>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute inset-0 text-yellow-400 transform translate-x-1 translate-y-1">
                    DASHBOARD
                  </span>
                  <span className="relative text-white stroke-2 stroke-black">
                    DASHBOARD
                  </span>
                </span>
              </h1>
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
            </div>
            
            {/* Rope Decoration */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-orange-600 to-transparent rounded-full opacity-60"></div>
          </div>
          
          {/* Enhanced Subtitle with Animations */}
          <div className="mt-6 space-y-2">
            <p className="text-xl text-yellow-200 font-medium animate-fade-in">
              🏴‍☠️ <span className="animate-pulse">Navigate Your Adventures Like a True Pirate King!</span> 🏴‍☠️
            </p>
            <div className="text-yellow-300 text-lg mt-2 animate-bounce delay-500">
              <span className="inline-block animate-[wiggle_2s_ease-in-out_infinite]">"</span>
              <span className="animate-pulse">The sea of productivity awaits, Captain Rakesh!</span>
              <span className="inline-block animate-[wiggle_2s_ease-in-out_infinite]">"</span>
            </div>
          </div>
        </div>

        {/* Enhanced Three Column Layout with Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in delay-300">
          {/* Left Column: Captain's Orders */}
          <div className="lg:col-span-1 animate-slide-in-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl h-full hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
              <CaptainsOrders
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>

          {/* Center Column: Voyage Progress */}
          <div className="lg:col-span-1 animate-fade-in delay-500">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl h-full hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
              <VoyageProgress
                projects={projects}
                onAddProject={handleAddProject}
              />
            </div>
          </div>

          {/* Right Column: Horizon Events */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl h-full hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
              <HorizonEvents
                events={events}
                onAddEvent={handleAddEvent}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Footer with Animations */}
        <div className="text-center mt-12 animate-fade-in delay-700">
          <div className="text-yellow-200 text-lg font-medium animate-pulse">
            ⚓ <span className="animate-bounce inline-block">"Chart your course through the Grand Line of productivity!"</span> ⚓
          </div>
          <div className="text-blue-200 text-sm mt-2 animate-fade-in delay-1000">
            <span className="animate-pulse">Set sail with Captain Rakesh's legendary crew management system!</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
