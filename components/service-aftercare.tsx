import Link from "next/link";
import type { Service } from "@/lib/types";
import { getServiceJourney } from "@/lib/journey";

export function ServiceAftercare({ service }: { service: Service }) {
  const journey = getServiceJourney(service);

  return (
    <section className="aftercare-section">
      <span className="eyebrow">After you submit</span>
      <h2>What happens next?</h2>

      <div className="aftercare-grid">
        <div>
          <strong>1. Keep your evidence</strong>
          <p>
            Save the application reference, payment receipt, acknowledgement, transaction slip or confirmation page the official process gives you.
          </p>
        </div>

        <div>
          <strong>2. Complete the remaining stage</strong>
          <p>
            {journey.physicalStatus === "required"
              ? "This service still has an in-person, biometric, collection or institution-assisted stage. Follow the appointment/office instructions in the official process."
              : journey.physicalStatus === "may-be-required"
                ? "Watch for any instruction asking you to visit an office, institution or accredited centre. Not every applicant necessarily follows the same assisted step."
                : "Use the official portal/status route for the next instruction. Our current sources do not state a compulsory physical stage for the standard route."}
          </p>
        </div>

        <div>
          <strong>3. Know when to follow up</strong>
          <p>
            {service.timeline
              ? service.timeline
              : "The official sources we currently use do not give GovGuide a reliable fixed completion time for this service. Do not treat an unofficial agent's promised timeline as official."}
          </p>
        </div>

        <div>
          <strong>4. If something goes wrong</strong>
          <p>
            Re-check the official source and your application details first. If the portal or process still fails, use the responsible agency's official support or office route.
          </p>
          <Link className="text-link" href="/offices">Official office/centre finders →</Link>
        </div>
      </div>
    </section>
  );
}
