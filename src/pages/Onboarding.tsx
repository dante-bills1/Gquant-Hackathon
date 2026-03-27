import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  broker: string;
  accountId: string;
  tradingPassword: string;
  server: string;
  accountType: string;
  notes: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefillName = (location.state as any)?.fullName ?? "";

  const [form, setForm] = useState<FormData>({
    fullName: prefillName,
    email: "",
    phone: "",
    broker: "",
    accountId: "",
    tradingPassword: "",
    server: "",
    accountType: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const required: (keyof FormData)[] = ["fullName", "email", "phone", "broker", "accountId", "tradingPassword", "server", "accountType"];
  const canSubmit = required.every((k) => form[k].trim().length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    try {
      // TODO: Replace with actual backend call
      // This would store data securely and trigger Telegram notification
      console.log("Onboarding submitted:", { ...form });
      toast.success("Onboarding submitted successfully!");
      navigate("/success");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-border rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20";

  return (
    <PageLayout>
      <section className="section-padding max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Step 4</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">Account Onboarding</h1>
          <p className="text-muted-foreground mb-10">
            Submit your broker and account details securely. Do not enter any account passwords here.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full Name" value={form.fullName} onChange={update("fullName")} inputClass={inputClass} />
              <Field label="Email" value={form.email} onChange={update("email")} type="email" inputClass={inputClass} />
              <Field label="Phone Number" value={form.phone} onChange={update("phone")} type="tel" inputClass={inputClass} />
              <Field label="Broker Name" value={form.broker} onChange={update("broker")} inputClass={inputClass} />
              <Field label="MT4 / MT5 Account ID" value={form.accountId} onChange={update("accountId")} inputClass={inputClass} />
              <Field label="Trading Password" value={form.tradingPassword} onChange={update("tradingPassword")} type="password" inputClass={inputClass} />
              <Field label="Server Name" value={form.server} onChange={update("server")} inputClass={inputClass} />
            </div>

            <p className="text-xs text-muted-foreground -mt-2">
              <strong>Note:</strong> The trading password is used solely to connect our bots to your account. This is not your account login or deposit password.
            </p>

            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Account Type</label>
              <select value={form.accountType} onChange={update("accountType")} className={inputClass}>
                <option value="">Select type</option>
                <option value="MT4">MT4</option>
                <option value="MT5">MT5</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Notes (Optional)</label>
              <textarea
                value={form.notes}
                onChange={update("notes")}
                rows={3}
                className={inputClass + " resize-none"}
                placeholder="Any additional information..."
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Onboarding"}
            </button>
          </form>
        </motion.div>
      </section>
    </PageLayout>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  inputClass,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  inputClass: string;
}) => (
  <div>
    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">{label}</label>
    <input type={type} value={value} onChange={onChange} className={inputClass} required />
  </div>
);

export default Onboarding;
