import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Star, ArrowUp, Users } from "lucide-react";

const StatsDisplay = ({ stats = [
  { icon: Star, label: "Highest Rated", value: "Matcha House" },
  { icon: Users, label: "Most Visited", value: "Green Tea Bar" },
  { icon: ArrowUp, label: "Trending", value: "Tea Time Cafe" }
]}: any) => {
  const StatCard = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center gap-4 p-4 bg-matchaGreen/10 rounded-lg hover:bg-matchaGreen/20 transition-colors">
      <Icon className="h-8 w-8 text-matchaGreen" />
      <div>
        <p className="text-sm text-matchaGreen/70">{label}</p>
        <p className="text-2xl font-bold text-matchaGreen">{value}</p>
      </div>
    </div>
  );

  const StatContent = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-matchaGreen">Quick Stats</h2>
      <div className="grid gap-4">
        {stats.map((stat: any, index: number) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-80 p-6 border-l border-matchaGreen/20">
        <StatContent />
      </aside>

      <Sheet>
        <SheetTrigger asChild className="lg:hidden fixed bottom-20 right-4 z-50">
          <Button className="bg-matchaGreen hover:bg-matchaGreen/90 text-white">View Stats</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[40vh] border-t border-matchaGreen/20">
          <StatContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StatsDisplay;