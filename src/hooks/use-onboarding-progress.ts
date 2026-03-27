const STORAGE_KEY = "gquant_onboarding";

export type OnboardingStep = "agreement" | "signature" | "payment" | "onboarding" | "success";

const STEP_ORDER: OnboardingStep[] = ["agreement", "signature", "payment", "onboarding", "success"];

interface OnboardingData {
  currentStep: OnboardingStep;
  fullName?: string;
  agreedAt?: string;
  signedAt?: string;
}

export function getOnboardingProgress(): OnboardingData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveOnboardingProgress(data: Partial<OnboardingData>) {
  const existing = getOnboardingProgress();
  const merged = { ...existing, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function clearOnboardingProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getStepPath(step: OnboardingStep): string {
  const paths: Record<OnboardingStep, string> = {
    agreement: "/agreement",
    signature: "/signature",
    payment: "/payment",
    onboarding: "/onboarding",
    success: "/success",
  };
  return paths[step];
}

export function hasCompletedStep(step: OnboardingStep): boolean {
  const progress = getOnboardingProgress();
  if (!progress) return false;
  const currentIdx = STEP_ORDER.indexOf(progress.currentStep);
  const checkIdx = STEP_ORDER.indexOf(step);
  return currentIdx > checkIdx;
}

export function getResumeStep(): OnboardingStep | null {
  const progress = getOnboardingProgress();
  if (!progress || progress.currentStep === "success") return null;
  return progress.currentStep;
}
