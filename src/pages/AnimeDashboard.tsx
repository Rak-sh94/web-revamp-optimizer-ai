
import React, { useState } from 'react';
import CaptainsOrders from "@/components/CaptainsOrders";
import HorizonEvents from "@/components/HorizonEvents";
import BackgroundEffects from "@/components/BackgroundEffects";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
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

const AnimeDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete anime character design',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Watch latest episode of One Piece',
      completed: true,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Practice drawing manga panels',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-20'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Anime Convention',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'event',
      location: 'Convention Center',
      description: 'Annual anime and manga convention'
    },
    {
      id: '2',
      title: 'Manga Reading Club',
      date: '2024-01-18',
      time: '7:00 PM',
      type: 'meeting',
      location: 'Local Library',
      description: 'Weekly manga discussion group'
    },
    {
      id: '3',
      title: 'Art Submission Deadline',
      date: '2024-01-30',
      time: '11:59 PM',
      type: 'deadline',
      description: 'Submit artwork for anime art contest'
    }
  ]);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, task]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleAddEvent = () => {
    // For now, just add a sample event - could be expanded with a modal
    const newEvent: Event = {
      id: Date.now().toString(),
      title: 'New Anime Event',
      date: new Date().toISOString().split('T')[0],
      time: '12:00 PM',
      type: 'event',
      description: 'A new anime-related event'
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Anime Background Effects */}
      <BackgroundEffects />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-pulse">
              ANIME QUEST
            </h1>
          </div>
          <p className="text-white/80 text-xl">Your Personal Otaku Dashboard</p>
          <div className="flex justify-center space-x-4 mt-4 text-4xl">
            <span className="animate-bounce">🌸</span>
            <span className="animate-bounce delay-100">⚡</span>
            <span className="animate-bounce delay-200">🗾</span>
            <span className="animate-bounce delay-300">🎌</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Captain's Orders (To-Do Tasks) */}
          <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 backdrop-blur-lg rounded-3xl p-8 border border-yellow-500/30 shadow-2xl">
            <CaptainsOrders
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>

          {/* Horizon Events */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-500/30 shadow-2xl">
            <HorizonEvents
              events={events}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">{tasks.filter(t => t.completed).length}</div>
              <div className="text-white/70 text-sm">Quests Complete</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{tasks.filter(t => !t.completed).length}</div>
              <div className="text-white/70 text-sm">Active Missions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">{events.length}</div>
              <div className="text-white/70 text-sm">Upcoming Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">∞</div>
              <div className="text-white/70 text-sm">Anime Love</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDashboard;
