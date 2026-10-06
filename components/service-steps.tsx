import type { Service } from "@/lib/types";
import { getStepDetails } from "@/lib/step-details";

export function ServiceSteps({ service }: { service: Service }) {
  const steps = getStepDetails(service);

  return (
    <section id="steps">
      <span className="section-number" aria-hidden="true">02</span>
      <h2>How to complete {service.shortTitle} step by step</h2>
      <p className="guide-section-intro">
        Follow the verified {service.shortTitle} process in order. Each step also shows what to have ready, what to check before continuing and what evidence to keep.
        Where the agency does not publish an extra requirement, this guide does not invent one.
      </p>

      <div className="detailed-steps">
        {steps.map((step, index) => (
          <article className="detailed-step" key={step.instruction}>
            <div className="detailed-step-heading">
              <span className="detailed-step-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className="detailed-step-stage">{step.stage}</span>
                <h3>{step.instruction}</h3>
              </div>
            </div>

            <div className="detailed-step-grid">
              <div>
                <strong>Have ready for this step</strong>
                {step.prepare.length ? (
                  <ul>{step.prepare.map((item) => <li key={item}>{item}</li>)}</ul>
                ) : (
                  <p>No additional document is specifically tied to this step in the verified guide. Use the full checklist above and follow the official prompt.</p>
                )}
              </div>
              <div>
                <strong>Check before moving on</strong>
                <p>{step.checkpoint}</p>
              </div>
              <div>
                <strong>Keep as evidence</strong>
                <p>{step.keep}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
