import DashboardShell from "@/components/layout/DashboardShell";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import EmployeeRankingCard from "@/components/leaderboard/EmployeeRankingCard";

export default function Leaderboard() {
  return (
    <DashboardShell>
      <div className="space-y-6 sm:space-y-8">
        <LeaderboardHeader />

        <section className="space-y-3 sm:space-y-4">
          <EmployeeRankingCard
            rank={1}
            name="Bryce"
            score="92%"
          />

          <EmployeeRankingCard
            rank={2}
            name="Sarah"
            score="88%"
          />

          <EmployeeRankingCard
            rank={3}
            name="Mike"
            score="82%"
          />
        </section>
      </div>
    </DashboardShell>
  );
}
