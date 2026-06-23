"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AuthMethodSelect } from "./AuthMethodSelect";
import { PhoneStep } from "./PhoneStep";
import { EmailStep } from "./EmailStep";
import { OTPStep } from "./OTPStep";
import { AgeGateModal } from "./AgeGateModal";
import { ParentContactForm } from "./ParentContactForm";
import { ConsentSent } from "./ConsentSent";
import { UsernameStep } from "./UsernameStep";
import { useAuthSteps } from "@/lib/useAuthSteps";

export function AuthFlow() {
  const { state, setState, mode, goTo, backMap, stepLabel, getOTPLabel, handleGoogleAuth, handleOTPComplete, handleUsernameComplete } = useAuthSteps();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="brut-card w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {backMap[state.step] && (
              <button
                onClick={backMap[state.step]!}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2 hover:bg-surface-alt rounded-bruted transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-ink" />
              </button>
            )}
            <span className="font-display text-xl font-bold text-ink">
              VOYAQ
            </span>
          </div>
          <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">
            {stepLabel[state.step]}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {state.step === "auth-method" && (
            <AuthMethodSelect
              key="auth-method"
              onSelect={(method) => {
                setState((prev) => ({ ...prev, authMethod: method }));
                if (method === "google") {
                  handleGoogleAuth();
                } else {
                  goTo(method);
                }
              }}
              mode={mode}
            />
          )}

          {state.step === "phone" && (
            <PhoneStep
              key="phone"
              onNext={(phone) => {
                setState((prev) => ({ ...prev, phone }));
                goTo("otp");
              }}
            />
          )}

          {state.step === "email" && (
            <EmailStep
              key="email"
              onNext={(email) => {
                setState((prev) => ({ ...prev, email }));
                goTo("otp");
              }}
            />
          )}

          {state.step === "otp" && (
            <OTPStep
              key="otp"
              {...getOTPLabel()}
              onNext={() => handleOTPComplete()}
            />
          )}

          {state.step === "age-gate" && (
            <AgeGateModal
              key="age-gate"
              onAdult={() => goTo("username")}
              onMinor={() => goTo("parent-contact")}
            />
          )}

          {state.step === "parent-contact" && (
            <ParentContactForm
              key="parent-contact"
              onSent={(contact) => {
                setState((prev) => ({ ...prev, parentContact: contact }));
                goTo("consent-sent");
              }}
            />
          )}

          {state.step === "consent-sent" && state.parentContact && (
            <ConsentSent
              key="consent-sent"
              contact={state.parentContact}
              onNext={() => goTo("username")}
            />
          )}

          {state.step === "username" && (
            <UsernameStep
              key="username"
              onNext={(username) => handleUsernameComplete(username)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
