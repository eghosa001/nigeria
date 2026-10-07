import type { Metadata } from "next";
import { GuideAssistant } from "@/components/guide-assistant";

export const metadata: Metadata = {
  alternates: { canonical: "/assistant" },
  title: "GovGuide Assistant",
  description: "Describe a Nigerian government task in plain language and find the closest verified GovGuide service pages.",
};

export default function AssistantPage() {
  return (
    <section className="section page-top">
      <div className="container narrow-wide">
        <GuideAssistant />
      </div>
    </section>
  );
}
