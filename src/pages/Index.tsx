import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useGamification } from "@/hooks/useGamification";
import CaptainsOrders from "@/components/CaptainsOrders";
import VoyageProgress from "@/components/VoyageProgress";
import HorizonEvents from "@/components/HorizonEvents";
import AddEventModal from "@/components/AddEventModal";
import AddProjectModal from "@/components/AddProjectModal";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import MainTitle from "@/components/MainTitle";
import FooterQuote from "@/components/FooterQuote";

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
  const { captainLevel, experiencePoints, pirateCoins, addExperience } = useGamification();

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

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Modal state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Task handlers
  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks(prev => [...prev, newTask]);
    addExperience(10);
    toast({
      title: "⚓ New Bounty Added!",
      description: `${task.title} has been logged in the ship's records.`,
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          addExperience(15);
          toast({
            title: "🏴‍☠️ Bounty Claimed!",
            description: `${task.title} has been completed!`,
          });
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "🗑️ Bounty Removed",
      description: "Task has been struck from the records.",
    });
  };

  // Project handlers
  const handleAddProject = () => {
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast({
      title: "🚢 Voyage Cancelled",
      description: "Project has been removed from the fleet.",
    });
  };

  const handleAddNewProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
    addExperience(25);
    toast({
      title: "🗺️ New Voyage Planned!",
      description: `${project.title} has been charted for the fleet.`,
    });
    setIsProjectModalOpen(false);
  };

  // Event handlers
  const handleAddEvent = () => {
    setIsEventModalOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast({
      title: "🔭 Sighting Removed",
      description: "Event has been cleared from the horizon.",
    });
  };

  const handleAddNewEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
    addExperience(5);
    toast({
      title: "🦜 New Sighting Logged!",
      description: `${event.title} has been spotted on the horizon.`,
    });
    setIsEventModalOpen(false);
  };

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

  useEffect(() => {
    localStorage.setItem('captainLevel', captainLevel.toString());
    localStorage.setItem('experiencePoints', experiencePoints.toString());
    localStorage.setItem('pirateCoins', pirateCoins.toString());
  }, [captainLevel, experiencePoints, pirateCoins]);

  const exportData = () => {
    const data = { tasks, projects, events, captainLevel, experiencePoints, pirateCoins };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captain-fleet-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "📜 Logbook Exported!",
      description: "Your fleet data has been saved to your device.",
    });
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
          @keyframes hover-glow {
            from { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
            to { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4); }
          }
          @keyframes button-bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes coin-flip {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
            100% { transform: rotateY(360deg); }
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
          .animate-hover-glow:hover {
            animation: hover-glow 0.3s ease-out forwards;
          }
          .animate-button-bounce:hover {
            animation: button-bounce 0.5s ease-in-out;
          }
          .animate-coin-flip {
            animation: coin-flip 2s ease-in-out infinite;
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
          .text-enhanced {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            font-weight: 600;
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
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.7) 30%,
              rgba(0, 0, 0, 0.75) 70%,
              rgba(0, 0, 0, 0.9) 100%
            );
          }
          .glass-panel {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 215, 0, 0.4);
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          .enhanced-button {
            transition: all 0.3s ease;
            background: linear-gradient(45deg, #1e3a8a, #3b82f6);
            border: 2px solid #60a5fa;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          }
          .enhanced-button:hover {
            background: linear-gradient(45deg, #1e40af, #2563eb);
            box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
          }
        `
      }} />
      
      <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'pirate-ship-bg' : 'bg-gradient-to-br from-blue-200 via-cyan-200 to-blue-300'}`}>
        {/* Dark Overlay for Better Text Readability */}
        {isDarkMode && <div className="absolute inset-0 dark-overlay"></div>}

        {/* Header Component */}
        <Header
          captainLevel={captainLevel}
          experiencePoints={experiencePoints}
          pirateCoins={pirateCoins}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onExportData={exportData}
        />

        {/* Background Effects Component */}
        <BackgroundEffects />

        <div className="relative z-20 p-4 md:p-6">
          {/* Main Title Component */}
          <MainTitle />

          {/* Three Column Layout with Enhanced Animations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto animate-fade-in delay-300">
            {/* Left Column: Captain's Orders */}
            <div className="lg:col-span-1 animate-slide-in-left">
              <div className="glass-panel rounded-xl p-4 md:p-6 shadow-2xl h-full hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-hover-glow">
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
              <div className="glass-panel rounded-xl p-4 md:p-6 shadow-2xl h-full hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-hover-glow">
                <VoyageProgress
                  projects={projects}
                  onAddProject={handleAddProject}
                  onDeleteProject={handleDeleteProject}
                />
              </div>
            </div>

            {/* Right Column: Horizon Events */}
            <div className="lg:col-span-1 animate-slide-in-right">
              <div className="glass-panel rounded-xl p-4 md:p-6 shadow-2xl h-full hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-hover-glow">
                <HorizonEvents
                  events={events}
                  onAddEvent={handleAddEvent}
                  onDeleteEvent={handleDeleteEvent}
                />
              </div>
            </div>
          </div>

          {/* Footer Quote Component */}
          <FooterQuote />
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
