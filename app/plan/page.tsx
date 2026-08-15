import type { Metadata } from "next";
import { Suspense } from "react";
import PlanClient from "./PlanClient";

export const metadata: Metadata = {
  title: "Your Trip, Curated | Dengarlah",
  description: "AI-curated Ipoh trip packages, matched to your preferences.",
};

export default function PlanPage() {
  return (
    <Suspense fallback={null}>
      <PlanClient />
    </Suspense>
  );
}
