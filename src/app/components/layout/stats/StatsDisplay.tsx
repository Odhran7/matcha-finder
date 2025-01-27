import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Star, ArrowUp, Users, LucideIcon } from "lucide-react";
import { getHighestRatedPlace, getTopRatedPlaces } from '@/app/actions/matchaStatsActions';

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
}

const StatCardSkeleton = () => (
  <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-matchaGreen/10 rounded-lg animate-pulse">
    <div className="h-6 w-6 bg-matchaGreen/20 rounded" />
    <div className="space-y-2">
      <div className="h-4 w-20 bg-matchaGreen/20 rounded" />
      <div className="h-6 w-32 bg-matchaGreen/20 rounded" />
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, subValue }: StatItem) => (
  <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-matchaGreen/10 rounded-lg hover:bg-matchaGreen/20 transition-colors">
    <Icon className="h-6 w-6 text-matchaGreen" />
    <div>
      <p className="text-sm text-matchaGreen/70">{label}</p>
      <p className="text-lg font-bold text-matchaGreen">{value}</p>
      {subValue && (
        <p className="text-xs text-matchaGreen/60">{subValue}</p>
      )}
    </div>
  </div>
);

const StatsDisplay = async () => {
  const highestRated = await getHighestRatedPlace();
  const topPlaces = await getTopRatedPlaces(3);
  const stats: StatItem[] = [
    {
      icon: Star,
      label: "Highest Rated",
      value: highestRated?.name || "No ratings yet",
      subValue: highestRated ? `${highestRated.overallRating.toFixed(1)}/10` : undefined
    },
    {
      icon: Users,
      label: "Most Reviewed",
      value: topPlaces?.[0]?.name || "No reviews yet",
      subValue: topPlaces?.[0] ? `${topPlaces[0].reviewCount} reviews` : undefined
    },
    {
      icon: ArrowUp,
      label: "Trending",
      value: topPlaces?.[1]?.name || "Not enough data",
      subValue: topPlaces?.[1] ? `${topPlaces[1].overallRating.toFixed(1)}/10` : undefined
    }
  ];

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

export function StatsDisplayLoading() {
  return (
    <aside className="hidden lg:block w-full p-4 border-t border-matchaGreen/20">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    </aside>
  );
}

export default StatsDisplay;
