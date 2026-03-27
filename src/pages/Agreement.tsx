import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { FEES } from "@/config/fees";
import { saveOnboardingProgress, hasCompletedStep, getOnboardingProgress, getStepPath } from "@/hooks/use-onboarding-progress";

const Agreement = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCompletedStep("agreement")) {
      const progress = getOnboardingProgress();
      if (progress) navigate(getStepPath(progress.currentStep), { replace: true });
    }
  }, [navigate]);

  const handleAgree = () => {
    saveOnboardingProgress({ currentStep: "signature", agreedAt: new Date().toISOString() });
    navigate("/signature");
  };

  return (
    <PageLayout>
      <section className="section-padding max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Legal</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            GQuant Treasury Engine — Client Agreement
          </h1>

          <div className="border border-border rounded p-6 md:p-10 max-h-[60vh] overflow-y-auto space-y-6 text-sm leading-relaxed text-muted-foreground bg-surface-elevated">
            <h3 className="font-display text-foreground font-semibold text-base">1. Service Description</h3>
            <p>
              G-Quant ("Company") provides automated, rule-based quantitative trading strategies deployed on the client's brokerage account. The Company manages strategy selection, deployment, and execution on behalf of the client.
            </p>

            <h3 className="font-display text-foreground font-semibold text-base">2. Fee Structure</h3>
            <p>
              <strong>Monthly Service Fee:</strong> ${FEES.monthlyService} per month, billed at the start of each service period.
            </p>
            <p>
              <strong>Profit Share:</strong> Client retains {FEES.profitSplit.client}% of net trading profits. G-Quant retains {FEES.profitSplit.gquant}%.
            </p>
            <p>
              Profit sharing begins after the first full calendar month of active trading.
            </p>
            {FEES.setupFee > 0 && (
              <p>
                <strong>Setup Fee:</strong> A one-time fee of ${FEES.setupFee} is required to activate your account.
              </p>
            )}

            <h3 className="font-display text-foreground font-semibold text-base">3. Strategy Deployment</h3>
            <p>
              Once the client's account is funded and activated, G-Quant will deploy its newest and highest-performing bots and strategies.
            </p>

            <h3 className="font-display text-foreground font-semibold text-base">4. Risk Disclosure</h3>
            <p>
              Trading financial instruments carries a high level of risk. Losses may include the full amount of the account balance. Past performance does not guarantee future results. G-Quant is not responsible for trading losses incurred through the use of its strategies.
            </p>
            <p>
              Clients should only allocate capital they can afford to lose. Markets are unpredictable, and no automated system can eliminate risk entirely.
            </p>

            <h3 className="font-display text-foreground font-semibold text-base">5. Client Acknowledgement</h3>
            <div className="border border-border rounded p-4 space-y-3">
              <p><strong>YES</strong> — I understand that trading involves significant risk and that losses may include the full account balance.</p>
              <p><strong>YES</strong> — I understand that past performance does not guarantee future results.</p>
              <p><strong>YES</strong> — I acknowledge that G-Quant is not responsible for trading losses.</p>
              <p><strong>YES</strong> — I agree to the fee structure outlined above.</p>
              <p><strong>NO</strong> — G-Quant does not guarantee profits or specific returns.</p>
              <p><strong>NO</strong> — G-Quant does not provide financial advice.</p>
            </div>

            <h3 className="font-display text-foreground font-semibold text-base">6. Termination</h3>
            <p>
              Either party may terminate this agreement with written notice. Upon termination, all active strategies will be deactivated and no further fees will be charged beyond the current billing period.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-foreground"
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                I have read and understood the GQuant Treasury Engine Client Agreement, including all terms, fees, and risk disclosures.
              </span>
            </label>

            <button
              disabled={!agreed}
              onClick={handleAgree}
              className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              I Agree & Continue
            </button>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
};

export default Agreement;
