import { LandingHeader } from "@/components/landing/LandingHeader";
import { FeaturesHeader } from "@/components/features/FeaturesHeader";
import { CreateSquadSection } from "@/components/features/CreateSquadSection";
import { VotingSection } from "@/components/features/VotingSection";
import { BudgetSection } from "@/components/features/BudgetSection";
import { DateFinderSection } from "@/components/features/DateFinderSection";
import { AITripBuilderSection } from "@/components/features/AITripBuilderSection";
import { UnifiedDashboardSection } from "@/components/features/UnifiedDashboardSection";
import { ComparisonSection } from "@/components/features/ComparisonSection";
import { PromiseSection } from "@/components/features/PromiseSection";
import { FinalCTASection } from "@/components/features/FinalCTASection";

export default function FeaturesPage() {
  return (
    <>
      <div className="px-4 pt-4 max-w-[1200px] mx-auto w-full">
        <LandingHeader />
      </div>
      <FeaturesHeader />
      <CreateSquadSection />
      <VotingSection />
      <BudgetSection />
      <DateFinderSection />
      <AITripBuilderSection />
      <UnifiedDashboardSection />
      <ComparisonSection />
      <PromiseSection />
      <FinalCTASection />
    </>
  );
}
