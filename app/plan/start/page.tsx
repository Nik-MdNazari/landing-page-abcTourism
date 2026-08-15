import type { Metadata } from "next";
import QuestionsClient from "./QuestionsClient";

export const metadata: Metadata = {
  title: "Plan Your Trip | Dengarlah",
  description: "A few quick questions so we can curate Ipoh packages for you.",
};

export default function StartPage() {
  return <QuestionsClient />;
}
