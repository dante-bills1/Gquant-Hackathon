import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { FEES } from "@/config/fees";
import { saveOnboardingProgress, getOnboardingProgress } from "@/hooks/use-onboarding-progress";

const PAYMENT_ACTIVE = false; // Set true when Interswitch is ready

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const progress = getOnboardingProgress();
  const fullName = (location.state as any)?.fullName ?? progress?.fullName ?? "";

  useEffect(() => {
    if (!progress || !progress.signedAt) {
      navigate("/agreement", { replace: true });
    }
  }, [navigate, progress]);

  const handleContinueToOnboarding = () => {
    saveOnboardingProgress({ currentStep: "onboarding" });
    navigate("/onboarding", { state: { fullName } });
  };

  const lineItems = [
    { label: "Monthly Service Fee", amount: `$${FEES.monthlyService}/mo` },
    ...(FEES.setupFee > 0 ? [{ label: "One-Time Setup Fee", amount: `$${FEES.setupFee}` }] : []),
  ];

  return (
    <PageLayout>
      <section className="section-padding max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Step 3</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">Payment</h1>
          <p className="text-muted-foreground mb-10">Review the fee summary below and proceed to payment.</p>

          <div className="border border-border rounded p-6 md:p-8 space-y-4">
            {lineItems.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.amount}</span>
              </div>
            ))}
            <div className="border-t border-border pt-4 flex justify-between text-sm font-semibold">
              <span>Profit Share</span>
              <span>{FEES.profitSplit.client}% Client / {FEES.profitSplit.gquant}% GQuant</span>
            </div>
          </div>

          {PAYMENT_ACTIVE ? (
            <button
              onClick={() => {
                // TODO: Interswitch integration
                handleContinueToOnboarding();
              }}
              className="mt-8 w-full bg-primary text-primary-foreground py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Continue to Interswitch
            </button>
          ) : (
            <div className="mt-8 border border-border rounded p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Payment gateway is currently in setup. Please check back shortly.
              </p>
              <button
                onClick={handleContinueToOnboarding}
                className="text-sm underline underline-offset-4 text-foreground hover:opacity-70 transition-opacity"
              >
                Continue to Onboarding (Temporary)
              </button>
            </div>
          )}
        </motion.div>
      </section>
    </PageLayout>
  );
};

export default Payment;
