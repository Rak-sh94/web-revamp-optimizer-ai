
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Compass, 
  Trophy, 
  Users, 
  MapPin, 
  Plus, 
  Search,
  Star,
  Zap,
  Anchor,
  Crown,
  Sword,
  Shield,
  Target,
  Clock
} from "lucide-react";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  level: number;
  bounty: number;
  status: 'active' | 'resting' | 'mission';
}

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  reward: number;
  progress: number;
  status: 'active' | 'completed' | 'locked';
}

interface Event {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'victory' | 'discovery' | 'danger' | 'treasure';
}

const Index = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');

  // Load data from localStorage or initialize with default data
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>(() => {
    const saved = localStorage.getItem('onePiece_crew');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Monkey D. Luffy', role: 'Captain', level: 85, bounty: 3000000000, status: 'active' },
      { id: '2', name: 'Roronoa Zoro', role: 'Swordsman', level: 82, bounty: 1111000000, status: 'active' },
      { id: '3', name: 'Nami', role: 'Navigator', level: 78, bounty: 366000000, status: 'mission' },
      { id: '4', name: 'Usopp', role: 'Sniper', level: 75, bounty: 500000000, status: 'resting' },
    ];
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('onePiece_quests');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Find the One Piece', description: 'The ultimate treasure awaits!', difficulty: 'Legendary', reward: 10000000, progress: 45, status: 'active' },
      { id: '2', title: 'Defeat a Yonko', description: 'Challenge one of the Four Emperors', difficulty: 'Hard', reward: 5000000, progress: 70, status: 'active' },
      { id: '3', title: 'Master Haki', description: 'Unlock the power within', difficulty: 'Medium', reward: 1000000, progress: 100, status: 'completed' },
      { id: '4', title: 'Recruit New Nakama', description: 'Expand your crew', difficulty: 'Easy', reward: 500000, progress: 30, status: 'active' },
    ];
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('onePiece_events');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Victory at Wano', description: 'Successfully defeated Kaido and liberated Wano Country!', timestamp: '2024-01-15T10:30:00Z', type: 'victory' },
      { id: '2', title: 'New Island Discovered', description: 'Found a mysterious island with ancient ruins', timestamp: '2024-01-14T15:45:00Z', type: 'discovery' },
      { id: '3', title: 'Marine Ambush', description: 'Encountered Vice Admiral patrol near Water 7', timestamp: '2024-01-13T08:20:00Z', type: 'danger' },
      { id: '4', title: 'Treasure Chest Found', description: 'Discovered 1,000,000 Berries in abandoned ship', timestamp: '2024-01-12T12:15:00Z', type: 'treasure' },
    ];
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('onePiece_crew', JSON.stringify(crewMembers));
  }, [crewMembers]);

  useEffect(() => {
    localStorage.setItem('onePiece_quests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem('onePiece_events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!newEventTitle.trim() || !newEventDescription.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in both title and description for the new event.",
        variant: "destructive"
      });
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDescription,
      timestamp: new Date().toISOString(),
      type: 'discovery'
    };

    setEvents([newEvent, ...events]);
    setNewEventTitle('');
    setNewEventDescription('');
    
    toast({
      title: "Event Added!",
      description: "Your new adventure has been logged in the ship's journal.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-orange-500';
      case 'Legendary': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'resting': return 'bg-gray-500';
      case 'mission': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'victory': return <Trophy className="h-4 w-4" />;
      case 'discovery': return <Compass className="h-4 w-4" />;
      case 'danger': return <Zap className="h-4 w-4" />;
      case 'treasure': return <Crown className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const totalBounty = crewMembers.reduce((sum, member) => sum + member.bounty, 0);
  const completedQuests = quests.filter(quest => quest.status === 'completed').length;
  const averageLevel = Math.round(crewMembers.reduce((sum, member) => sum + member.level, 0) / crewMembers.length);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-2xl">
          🏴‍☠️ Straw Hat Pirates Dashboard
        </h1>
        <p className="text-xl text-blue-200 font-medium">
          Adventure awaits on the Grand Line!
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: <Compass className="h-4 w-4" /> },
          { id: 'crew', label: 'Crew', icon: <Users className="h-4 w-4" /> },
          { id: 'quests', label: 'Quests', icon: <Target className="h-4 w-4" /> },
          { id: 'events', label: 'Events', icon: <Clock className="h-4 w-4" /> }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id 
              ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            } transition-all duration-300 transform hover:scale-105`}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bounty</CardTitle>
              <Crown className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₿{totalBounty.toLocaleString()}</div>
              <p className="text-xs opacity-80 mt-1">Berries earned by the crew</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-black border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Quests</CardTitle>
              <Trophy className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedQuests}</div>
              <p className="text-xs opacity-80 mt-1">Adventures completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-black border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Level</CardTitle>
              <Star className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageLevel}</div>
              <p className="text-xs opacity-80 mt-1">Crew strength level</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Crew Tab */}
      {activeTab === 'crew' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {crewMembers.map((member) => (
            <Card key={member.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-800">{member.name}</CardTitle>
                    <CardDescription className="text-gray-600 font-medium">{member.role}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(member.status)} text-white`}>
                    {member.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Level</span>
                    <span className="font-bold text-blue-600">{member.level}</span>
                  </div>
                  <div className="w-full">
                    <Progress value={(member.level / 100) * 100} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Bounty</span>
                    <span className="font-bold text-yellow-600">₿{member.bounty.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quests Tab */}
      {activeTab === 'quests' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {quests.map((quest) => (
            <Card key={quest.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">{quest.title}</CardTitle>
                    <CardDescription className="text-gray-600">{quest.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Badge className={`${getDifficultyColor(quest.difficulty)} text-white`}>
                      {quest.difficulty}
                    </Badge>
                    <Badge className={quest.status === 'completed' ? 'bg-green-500' : quest.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'}>
                      {quest.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="font-bold text-blue-600">{quest.progress}%</span>
                    </div>
                    <Progress value={quest.progress} className="h-3" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Reward</span>
                    <span className="font-bold text-yellow-600 text-lg">₿{quest.reward.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          {/* Search and Add Event */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search your adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Event title..."
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Event description..."
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  rows={2}
                />
                <Button 
                  onClick={addEvent}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Adventure
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        event.type === 'victory' ? 'bg-green-100 text-green-600' :
                        event.type === 'discovery' ? 'bg-blue-100 text-blue-600' :
                        event.type === 'danger' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800">{event.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-blue-200 text-lg font-medium">
          🌊 "I'm gonna be the Pirate King!" - Monkey D. Luffy 🌊
        </p>
      </div>
    </div>
  );
};

export default Index;
