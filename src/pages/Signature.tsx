import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { saveOnboardingProgress, getOnboardingProgress } from "@/hooks/use-onboarding-progress";

const Signature = () => {
  const navigate = useNavigate();
  const progress = getOnboardingProgress();
  const [fullName, setFullName] = useState(progress?.fullName ?? "");
  const [consent, setConsent] = useState(false);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const canContinue = fullName.trim().length > 2 && consent;

  useEffect(() => {
    if (!progress || !progress.agreedAt) {
      navigate("/agreement", { replace: true });
    }
  }, [navigate, progress]);

  const handleContinue = () => {
    saveOnboardingProgress({ currentStep: "payment", fullName, signedAt: new Date().toISOString() });
    navigate("/payment", { state: { fullName } });
  };

  return (
    <PageLayout>
      <section className="section-padding max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Step 2</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">Electronic Signature</h1>
          <p className="text-muted-foreground mb-10">Please enter your full legal name as your electronic signature.</p>

          <div className="border border-border rounded p-6 md:p-10 space-y-8">
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border border-border rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Date</label>
              <p className="text-sm border border-border rounded px-4 py-3 bg-secondary/50">{today}</p>
            </div>

            {fullName.trim().length > 2 && (
              <div className="border-t border-border pt-6">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Signature Preview</p>
                <p className="font-display text-2xl italic">{fullName}</p>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 accent-foreground"
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                I consent to using my typed name as a legally binding electronic signature.
              </span>
            </label>
          </div>

          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className="mt-8 w-full bg-primary text-primary-foreground py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </motion.div>
      </section>
    </PageLayout>
  );
};

export default Signature;
