
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Settings, Moon, Sun, Download } from "lucide-react";

interface HeaderProps {
  captainLevel: number;
  experiencePoints: number;
  pirateCoins: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onExportData: () => void;
}

const Header: React.FC<HeaderProps> = ({
  captainLevel,
  experiencePoints,
  pirateCoins,
  isDarkMode,
  onToggleDarkMode,
  onExportData
}) => {
  const getCaptainRank = (level: number) => {
    if (level >= 20) return { rank: 'Admiral', color: 'text-purple-400', icon: '👑' };
    if (level >= 10) return { rank: 'Captain', color: 'text-yellow-400', icon: '⚓' };
    if (level >= 5) return { rank: 'First Mate', color: 'text-blue-400', icon: '🗡️' };
    return { rank: 'Cadet', color: 'text-green-400', icon: '🦜' };
  };

  const currentRank = getCaptainRank(captainLevel);

  return (
    <div className="relative z-30 bg-black/90 backdrop-blur-sm border-b-2 border-yellow-500/50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Captain Stats */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentRank.icon}</span>
            <div>
              <div className={`font-bold text-lg ${currentRank.color} text-enhanced`}>
                {currentRank.rank} Rakesh
              </div>
              <div className="text-yellow-300 text-sm font-semibold">Level {captainLevel}</div>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="flex items-center space-x-3">
            <div className="text-blue-300 font-semibold">XP:</div>
            <div className="w-32">
              <Progress 
                value={(experiencePoints % 100)} 
                className="h-3 bg-gray-700"
              />
            </div>
            <div className="text-blue-200 text-sm font-bold">
              {experiencePoints % 100}/100
            </div>
          </div>
          
          {/* Pirate Coins */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl animate-coin-flip">🪙</span>
            <span className="text-yellow-400 font-bold text-lg text-enhanced">
              {pirateCoins}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={onExportData}
            variant="outline"
            size="sm"
            className="enhanced-button animate-button-bounce text-white border-blue-400 hover:bg-blue-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            onClick={onToggleDarkMode}
            variant="outline"
            size="sm"
            className="enhanced-button animate-button-bounce text-white border-yellow-400 hover:bg-yellow-600"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="enhanced-button animate-button-bounce text-white border-purple-400 hover:bg-purple-600"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
