import ProjectContent from "@/components/Project/CardResultComponent/ProjectContentComponent";
import ProjectComponent from "@/components/Project/ProjectComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project - Inspectra",
  description:
    "Learn more about Inspectra, a white-box testing platform designed to review source code and identify security weaknesses. Discover our mission, values, and commitment to secure development.",
};
export default function page() {
  return (
    <main className="w-[90%] mx-auto">
      <ProjectComponent />
      <ProjectContent />
    </main>
  );
}
