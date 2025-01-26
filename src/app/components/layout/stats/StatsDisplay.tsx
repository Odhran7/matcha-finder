import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Star, ArrowUp, Users, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { icon: Star, label: "Highest Rated", value: "Matcha House" },
  { icon: Users, label: "Most Visited", value: "Green Tea Bar" },
  { icon: ArrowUp, label: "Trending", value: "Tea Time Cafe" }
];

const StatCard = ({ icon: Icon, label, value }: StatItem) => (
  <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-matchaGreen/10 rounded-lg hover:bg-matchaGreen/20 transition-colors">
    <Icon className="h-6 w-6 text-matchaGreen" />
    <div>
      <p className="text-sm text-matchaGreen/70">{label}</p>
      <p className="text-lg font-bold text-matchaGreen">{value}</p>
    </div>
  </div>
);


const StatsDisplay = () => {
  return (
    <>
      <aside className="hidden lg:block w-full p-4 border-t border-matchaGreen/20">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </aside>

      <Sheet>
        <SheetTrigger asChild className="lg:hidden fixed bottom-20 right-4 z-50">
          <Button className="bg-matchaGreen hover:bg-matchaGreen/90 text-white">View Stats</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[60vh] border-t border-matchaGreen/20 sm:h-[40vh]">
          <SheetTitle className="text-lg font-semibold text-matchaGreen">Quick Stats</SheetTitle>
          <div className="grid gap-3 mt-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StatsDisplay;
