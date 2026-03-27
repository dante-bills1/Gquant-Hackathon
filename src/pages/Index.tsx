import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { ArrowRight, Shield, Cpu, BarChart3, CheckCircle2, Layers } from "lucide-react";
import { getResumeStep, getStepPath } from "@/hooks/use-onboarding-progress";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  const resumeStep = getResumeStep();

  return (
    <PageLayout>
    {/* Hero */}
    <section className="section-padding min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto">
      <motion.div {...fade} className="max-w-3xl">
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-6">Treasury Engine</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          A Quantitative Capital Engine for Businesses
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
          Structured, rule-based market access designed to operate alongside your primary income or portfolio.
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          {resumeStep ? (
            <Link
              to={getStepPath(resumeStep)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Resume Sign Up <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/agreement"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <Link
            to="/agreement"
            className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium rounded hover:bg-secondary transition-colors"
          >
            View Agreement
          </Link>
        </div>
        <p className="text-xs tracking-wide text-muted-foreground">
          Automation · Risk Controls · Systematic Execution
        </p>
      </motion.div>
    </section>

    <div className="divider max-w-7xl mx-auto" />

    {/* Value Prop */}
    <section className="section-padding max-w-7xl mx-auto">
      <motion.div {...fade} className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">The Problem</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Capital Concentrated in One Engine
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Most capital sits in one of two places: inside the core business or in traditional passive allocations. GQuant offers a third path — a systematic execution engine built on automation and predefined logic.
          </p>
        </div>
        <div>
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">The Solution</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            A Second Financial Engine
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            GQuant Treasury Engine provides a structured way to access quantitative market strategies without requiring clients to become traders themselves.
          </p>
        </div>
      </motion.div>
    </section>

    {/* How It Works — Inverted */}
    <section className="section-invert section-padding">
      <motion.div {...fade} className="max-w-7xl mx-auto">
        <p className="text-sm tracking-widest uppercase text-text-tertiary mb-4">Process</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-12">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {["Agreement", "Signature", "Payment", "Onboarding", "Deployment"].map((step, i) => (
            <div key={step} className="border border-white/10 rounded p-5">
              <p className="font-display text-3xl font-bold text-white/20 mb-3">0{i + 1}</p>
              <p className="text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
        <p className="text-text-tertiary text-sm mt-8 max-w-2xl leading-relaxed">
          Clients complete a structured onboarding process, approve terms digitally, pay the setup fee, submit their account details securely, and are then activated for strategy deployment.
        </p>
      </motion.div>
    </section>

    {/* Why GQuant */}
    <section className="section-padding max-w-7xl mx-auto">
      <motion.div {...fade}>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Why GQuant</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Built for Discipline, Not Speculation
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "Rule-Based Execution", desc: "Predefined logic removes emotion from capital deployment." },
            { icon: Shield, title: "Risk-Managed Logic", desc: "Every strategy operates within strict, automated risk parameters." },
            { icon: BarChart3, title: "Automated Deployment", desc: "Strategies deploy and execute without manual intervention." },
            { icon: Layers, title: "Quantitative Infrastructure", desc: "Institutional-grade systems designed for consistent operation." },
            { icon: CheckCircle2, title: "Transparent Onboarding", desc: "Clear terms, secure processes, and full visibility." },
            { icon: ArrowRight, title: "Systematic Process", desc: "From agreement to deployment — structured at every step." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-border rounded p-6 hover:bg-secondary/50 transition-colors">
              <Icon className="w-5 h-5 mb-4 text-muted-foreground" strokeWidth={1.5} />
              <p className="font-display font-semibold mb-2">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    <div className="divider max-w-7xl mx-auto" />

    {/* Final CTA */}
    <section className="section-padding max-w-7xl mx-auto text-center">
      <motion.div {...fade}>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-2xl mx-auto">
          Add a Second Financial Engine to Your Capital Strategy
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
          Structured onboarding. Systematic deployment. Quantitative execution.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {resumeStep ? (
            <Link
              to={getStepPath(resumeStep)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Resume Sign Up <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/agreement"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <Link
            to="/agreement"
            className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium rounded hover:bg-secondary transition-colors"
          >
            View Agreement
          </Link>
        </div>
      </motion.div>
    </section>
  </PageLayout>
  );
};

export default Index;
