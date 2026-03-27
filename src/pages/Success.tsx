import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2 } from "lucide-react";

const Success = () => (
  <PageLayout>
    <section className="section-padding min-h-[70vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <CheckCircle2 className="w-12 h-12 mx-auto mb-6 text-foreground" strokeWidth={1} />
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Registration Complete</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Your onboarding details have been received. Our team will contact you with the next steps.
        </p>
        <p className="text-xs text-text-tertiary mb-10">
          You will be contacted directly for secure account activation instructions.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium rounded hover:bg-secondary transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  </PageLayout>
);

export default Success;
