import Link from "next/link";
import type { Service } from "@/lib/types";
import { getServiceJourney } from "@/lib/journey";

export function ServiceAftercare({ service }: { service: Service }) {
  const journey = getServiceJourney(service);

  return (
    <section className="aftercare-section" id="after-submit">
      <span className="eyebrow">After you submit</span>
      <h2>What happens next?</h2>

      <div className="aftercare-grid">
        <div>
          <span className="aftercare-number" aria-hidden="true">01</span>
          <strong>Keep your evidence</strong>
          <p>Save the application reference, payment receipt, acknowledgement, transaction slip or confirmation page the official process gives you.</p>
        </div>

        <div>
          <span className="aftercare-number" aria-hidden="true">02</span>
          <strong>Complete the remaining stage</strong>
          <p>
            {journey.physicalStatus === "required"
              ? "This service still has an in-person, biometric, collection or institution-assisted stage. Follow the appointment or office instructions in the official process."
              : journey.physicalStatus === "may-be-required"
                ? "Watch for any instruction asking you to visit an office, institution or accredited centre. Not every applicant necessarily follows the same assisted step."
                : "Use the official portal or status route for the next instruction. Our current sources do not state a compulsory physical stage for the standard route."}
          </p>
        </div>

        <div>
          <span className="aftercare-number" aria-hidden="true">03</span>
          <strong>Know when to follow up</strong>
          <p>
            {service.timeline
              ? service.timeline
              : "The current official sources do not publish a reliable fixed completion time for this service. Treat unofficial promised timelines as estimates, not official commitments."}
          </p>
        </div>

        <div>
          <span className="aftercare-number" aria-hidden="true">04</span>
          <strong>If something goes wrong</strong>
          <p>Re-check the official source and your application details first. If the process still fails, use the responsible agency's official support or office route.</p>
          <Link className="text-link" href="/offices">Official office/centre finders →</Link>
        </div>
      </div>
    </section>
  );
}
