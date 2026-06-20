import { LandingHeader } from "@/components/landing/LandingHeader";
import { InteractiveDemo } from "@/components/demo/InteractiveDemo";

export default function HowItWorks() {
  return (
    <>
      <div className="pt-4 px-4 max-w-[1200px] mx-auto w-full">
        <LandingHeader />
      </div>
      <InteractiveDemo />
    </>
  );
}
