
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useGamification = () => {
  const { toast } = useToast();

  const [captainLevel, setCaptainLevel] = useState(() => {
    const saved = localStorage.getItem('captainLevel');
    return saved ? parseInt(saved) : 1;
  });
  
  const [experiencePoints, setExperiencePoints] = useState(() => {
    const saved = localStorage.getItem('experiencePoints');
    return saved ? parseInt(saved) : 75;
  });

  const [pirateCoins, setPirateCoins] = useState(() => {
    const saved = localStorage.getItem('pirateCoins');
    return saved ? parseInt(saved) : 250;
  });

  useEffect(() => {
    localStorage.setItem('captainLevel', captainLevel.toString());
    localStorage.setItem('experiencePoints', experiencePoints.toString());
    localStorage.setItem('pirateCoins', pirateCoins.toString());
  }, [captainLevel, experiencePoints, pirateCoins]);

  const getCaptainRank = (level: number) => {
    if (level >= 20) return { rank: 'Admiral', color: 'text-purple-400', icon: '👑' };
    if (level >= 10) return { rank: 'Captain', color: 'text-yellow-400', icon: '⚓' };
    if (level >= 5) return { rank: 'First Mate', color: 'text-blue-400', icon: '🗡️' };
    return { rank: 'Cadet', color: 'text-green-400', icon: '🦜' };
  };

  const addExperience = (points: number) => {
    const newXP = experiencePoints + points;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    if (newLevel > captainLevel) {
      setCaptainLevel(newLevel);
      toast({
        title: "🎉 RANK UP!",
        description: `You've reached ${getCaptainRank(newLevel).rank} level ${newLevel}!`,
      });
    }
    
    setExperiencePoints(newXP);
    setPirateCoins(prev => prev + points);
  };

  return {
    captainLevel,
    experiencePoints,
    pirateCoins,
    addExperience,
    getCaptainRank
  };
};
