
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, X, Flag, Calendar } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface CaptainsOrdersProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const CaptainsOrders: React.FC<CaptainsOrdersProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) => {
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask({
        title: newTask,
        completed: false,
        priority: 'medium'
      });
      setNewTask('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg shadow-lg transform -rotate-1">
          <h2 className="text-2xl font-bold tracking-wider">CAPTAIN'S ORDERS</h2>
        </div>
        <div className="text-yellow-400 text-4xl mt-2">👒</div>
      </div>

      {/* Task Input */}
      <Card className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-yellow-600 shadow-lg">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Log a New Bounty..."
              className="flex-1 bg-white/80 border-yellow-400 focus:border-yellow-600"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <Button
              onClick={handleAddTask}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-6"
            >
              <Plus className="h-4 w-4" />
              Add Bounty
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? "default" : "outline"}
            onClick={() => setFilter(filterType as any)}
            className={`capitalize ${
              filter === filterType 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-white border-blue-400 hover:bg-blue-600/20'
            }`}
          >
            {filterType}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`bg-gradient-to-r from-amber-100 to-yellow-100 border border-yellow-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ${
              task.completed ? 'opacity-70' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                
                <div className="flex-1">
                  <span className={`${task.completed ? 'line-through text-gray-600' : 'text-gray-800'} font-medium`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority}
                  </Badge>
                  
                  {task.dueDate && (
                    <Badge variant="outline" className="text-blue-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {task.dueDate}
                    </Badge>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredTasks.length === 0 && (
          <Card className="bg-white/10 border-dashed border-2 border-gray-400">
            <CardContent className="p-8 text-center">
              <p className="text-gray-300 text-lg">No bounties to hunt!</p>
              <p className="text-gray-400 text-sm mt-2">Chart a new course, Captain!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CaptainsOrders;
