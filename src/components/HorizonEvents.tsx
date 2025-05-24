
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, MapPin, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'event' | 'reminder';
  location?: string;
  description?: string;
}

interface HorizonEventsProps {
  events: Event[];
  onAddEvent: () => void;
}

const HorizonEvents: React.FC<HorizonEventsProps> = ({ events, onAddEvent }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '🍺';
      case 'deadline': return '💀';
      case 'event': return '🎉';
      case 'reminder': return '🦜';
      default: return '⚓';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'deadline': return 'bg-red-500';
      case 'event': return 'bg-green-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg shadow-lg transform -rotate-1">
          <h2 className="text-2xl font-bold tracking-wider">HORIZON EVENTS</h2>
        </div>
        <div className="text-yellow-400 text-4xl mt-2">🔭</div>
      </div>

      {/* Mini Calendar Preview */}
      <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-blue-100 border-2 border-blue-400">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-900 mb-2">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center font-semibold text-blue-700 p-1">
                  {day}
                </div>
              ))}
              {/* Simplified calendar grid */}
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`text-center p-1 text-blue-700 ${
                    events.some(event => new Date(event.date).getDate() === i + 1)
                      ? 'bg-yellow-400 rounded-full font-bold'
                      : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
        {sortedEvents.map((event) => (
          <Card
            key={event.id}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-blue-300 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getEventIcon(event.type)}</div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">{event.title}</h3>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-blue-700">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-blue-600">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  {event.description && (
                    <p className="text-sm text-blue-600 mt-2">{event.description}</p>
                  )}
                </div>

                <Badge className={`${getEventColor(event.type)} text-white capitalize`}>
                  {event.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedEvents.length === 0 && (
          <Card className="bg-white/10 border-dashed border-2 border-gray-400">
            <CardContent className="p-8 text-center">
              <p className="text-gray-300 text-lg">No sightings on the horizon!</p>
              <p className="text-gray-400 text-sm mt-2">Keep watch for new adventures!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add New Event Button */}
      <Button
        onClick={onAddEvent}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
      >
        <Plus className="h-4 w-4 mr-2" />
        Log New Sighting
      </Button>
    </div>
  );
};

export default HorizonEvents;
