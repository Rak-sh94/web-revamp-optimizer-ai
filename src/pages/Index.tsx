import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import CaptainsOrders from "@/components/CaptainsOrders";
import VoyageProgress from "@/components/VoyageProgress";
import HorizonEvents from "@/components/HorizonEvents";
import AddEventModal from "@/components/AddEventModal";
import AddProjectModal from "@/components/AddProjectModal";

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

  // Modal state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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
    setIsProjectModalOpen(true);
  };

  const handleAddEvent = () => {
    setIsEventModalOpen(true);
  };

  // New handlers for actual adding
  const handleAddNewProject = (newProject: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString()
    };
    setProjects([...projects, project]);
    toast({
      title: "New Voyage Plotted!",
      description: `"${project.title}" has been added to your adventures.`,
    });
  };

  const handleAddNewEvent = (newEvent: Omit<Event, 'id'>) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString()
    };
    setEvents([...events, event]);
    toast({
      title: "New Sighting Logged!",
      description: `"${event.title}" has been added to the horizon.`,
    });
  };

  // Delete handlers
  const handleDeleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setProjects(projects.filter(project => project.id !== id));
    if (project) {
      toast({
        title: "Voyage Abandoned",
        description: `"${project.title}" has been removed from your adventures.`,
        variant: "destructive"
      });
    }
  };

  const handleDeleteEvent = (id: string) => {
    const event = events.find(e => e.id === id);
    setEvents(events.filter(event => event.id !== id));
    if (event) {
      toast({
        title: "Sighting Removed",
        description: `"${event.title}" has been cleared from the horizon.`,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(1deg); }
            66% { transform: translateY(-10px) rotate(-1deg); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-3deg); }
            75% { transform: rotate(3deg); }
          }
          @keyframes slide-in-left {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slide-in-right {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes glow-pulse {
            0%, 100% { text-shadow: 0 0 5px rgba(239, 68, 68, 0.5); }
            50% { text-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.6); }
          }
          @keyframes treasure-bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-8px) scale(1.1); }
          }
          @keyframes wave-motion {
            0% { transform: translateX(0px) translateY(0px); }
            25% { transform: translateX(5px) translateY(-3px); }
            50% { transform: translateX(0px) translateY(-5px); }
            75% { transform: translateX(-5px) translateY(-3px); }
            100% { transform: translateX(0px) translateY(0px); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          @keyframes header-glow {
            0%, 100% { 
              text-shadow: 
                0 0 10px rgba(255, 215, 0, 0.8),
                0 0 20px rgba(255, 215, 0, 0.6),
                0 0 30px rgba(255, 215, 0, 0.4),
                3px 3px 0px #000,
                -3px -3px 0px #000,
                3px -3px 0px #000,
                -3px 3px 0px #000;
            }
            50% { 
              text-shadow: 
                0 0 20px rgba(255, 215, 0, 1),
                0 0 30px rgba(255, 215, 0, 0.8),
                0 0 40px rgba(255, 215, 0, 0.6),
                3px 3px 0px #000,
                -3px -3px 0px #000,
                3px -3px 0px #000,
                -3px 3px 0px #000;
            }
          }
          @keyframes clouds-move {
            0% { transform: translateX(-50px); }
            100% { transform: translateX(50px); }
          }
          @keyframes mist-float {
            0%, 100% { 
              transform: translateX(0px) translateY(0px);
              opacity: 0.2;
            }
            50% { 
              transform: translateX(30px) translateY(-10px);
              opacity: 0.4;
            }
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out;
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out;
          }
          .animate-glow-pulse {
            animation: glow-pulse 2s ease-in-out infinite;
          }
          .animate-treasure-bounce {
            animation: treasure-bounce 3s ease-in-out infinite;
          }
          .animate-wave-motion {
            animation: wave-motion 4s ease-in-out infinite;
          }
          .animate-sparkle {
            animation: sparkle 2s ease-in-out infinite;
          }
          .animate-header-glow {
            animation: header-glow 3s ease-in-out infinite;
          }
          .animate-clouds-move {
            animation: clouds-move 20s ease-in-out infinite;
          }
          .animate-mist-float {
            animation: mist-float 15s ease-in-out infinite;
          }
          .text-stroke-header {
            color: #ffd700;
            text-shadow: 
              3px 3px 0px #000,
              -3px -3px 0px #000,
              3px -3px 0px #000,
              -3px 3px 0px #000,
              0 0 10px rgba(255, 215, 0, 0.5);
          }
          .pirate-ship-bg {
            background-image: url('/lovable-uploads/e60fdb28-1ac9-42dd-894b-3ec42d23d4c0.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
          .dark-overlay {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.7) 70%,
              rgba(0, 0, 0, 0.9) 100%
            );
          }
        `
      }} />
      
      <div className="min-h-screen relative overflow-hidden pirate-ship-bg">
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 dark-overlay"></div>

        {/* Floating Mist/Fog Effects */}
        <div className="absolute top-20 left-1/4 w-64 h-32 bg-white rounded-full blur-3xl opacity-5 animate-mist-float"></div>
        <div className="absolute top-40 right-1/3 w-48 h-24 bg-gray-300 rounded-full blur-3xl opacity-10 animate-mist-float delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-28 bg-white rounded-full blur-3xl opacity-5 animate-mist-float delay-2000"></div>

        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute top-20 left-10 text-6xl animate-wave-motion text-yellow-400">🌊</div>
          <div className="absolute top-40 right-20 text-4xl animate-sparkle text-yellow-300">⭐</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-treasure-bounce text-yellow-500">🏴‍☠️</div>
          <div className="absolute bottom-20 right-10 text-3xl animate-treasure-bounce delay-500 text-yellow-400">💎</div>
          <div className="absolute top-60 left-1/4 text-3xl animate-spin duration-[8s] text-yellow-500">⚓</div>
          <div className="absolute bottom-40 right-1/3 text-4xl animate-float text-yellow-400">🗺️</div>
          <div className="absolute top-80 right-1/4 text-2xl animate-sparkle delay-300 text-yellow-500">💰</div>
          <div className="absolute top-32 left-1/2 text-2xl animate-wiggle text-yellow-400">🦜</div>
          <div className="absolute top-16 right-1/3 text-3xl animate-bounce delay-700 text-yellow-500">⚔️</div>
          <div className="absolute bottom-16 left-1/3 text-2xl animate-pulse delay-1000 text-yellow-400">🍖</div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-10 left-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-1/3 left-10 w-5 h-5 bg-yellow-600 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-700"></div>
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-800"></div>
        </div>

        <div className="relative z-20 p-6">
          {/* Enhanced Header - Pirate theme with gold accents */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {/* Anchor decorations */}
              <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-4xl text-yellow-400 animate-float">⚓</div>
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-4xl text-yellow-400 animate-float delay-500">⚓</div>
              
              {/* Main Header Text */}
              <h1 className="text-6xl md:text-7xl font-black text-stroke-header animate-header-glow tracking-wider mb-4">
                CAPTAIN RAKESH'S FLEET
              </h1>
              
              {/* Subtitle Quote */}
              <div className="text-lg md:text-xl text-yellow-100 font-semibold italic mb-4 drop-shadow-lg">
                "Experience is not the number of years we spent, it's the number of situations we faced."
              </div>
              
              {/* Decorative Icons */}
              <div className="flex justify-center space-x-8 text-2xl">
                <span className="text-yellow-500 animate-bounce">⚔️</span>
                <span className="text-yellow-400 animate-sparkle">✖️</span>
                <span className="text-yellow-500 animate-pulse">💎</span>
              </div>
            </div>
          </div>

          {/* Three Column Layout with Enhanced Animations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in delay-300">
            {/* Left Column: Captain's Orders */}
            <div className="lg:col-span-1 animate-slide-in-left">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/40 shadow-2xl h-full hover:bg-black/85 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:border-yellow-400/60">
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
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/40 shadow-2xl h-full hover:bg-black/85 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:border-yellow-400/60">
                <VoyageProgress
                  projects={projects}
                  onAddProject={handleAddProject}
                  onDeleteProject={handleDeleteProject}
                />
              </div>
            </div>

            {/* Right Column: Horizon Events */}
            <div className="lg:col-span-1 animate-slide-in-right">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/40 shadow-2xl h-full hover:bg-black/85 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:border-yellow-400/60">
                <HorizonEvents
                  events={events}
                  onAddEvent={handleAddEvent}
                  onDeleteEvent={handleDeleteEvent}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Footer Quote */}
          <div className="text-center mt-12 animate-fade-in delay-700">
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-yellow-500/40">
              <div className="flex justify-center items-center space-x-4 mb-2">
                <span className="text-2xl animate-bounce text-yellow-500">⚔️</span>
                <div className="text-yellow-300 text-xl font-bold animate-glow-pulse">
                  "THE SEA IS CALLING... SET SAIL TOWARDS YOUR DREAMS!"
                </div>
                <span className="text-2xl animate-bounce delay-300 text-yellow-500">🏴‍☠️</span>
              </div>
              <div className="text-yellow-100 text-lg mt-2 animate-pulse">
                - CAPTAIN JACK SPARROW
              </div>
              <div className="text-yellow-200 text-sm mt-3 animate-fade-in delay-1000">
                <span className="animate-wiggle inline-block text-yellow-500">🌊</span>
                Navigate the treacherous waters of productivity with Captain Rakesh's legendary fleet management system!
                <span className="animate-wiggle inline-block text-yellow-500">🌊</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onAddEvent={handleAddNewEvent}
      />
      <AddProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onAddProject={handleAddNewProject}
      />
    </>
  );
};

export default Index;
