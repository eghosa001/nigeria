import type { Service } from "@/lib/types";
import { getStepDetails } from "@/lib/step-details";

export function ServiceSteps({ service }: { service: Service }) {
  const steps = getStepDetails(service);

  return (
    <section id="steps">
      <span className="section-number" aria-hidden="true">02</span>
      <h2>How to complete {service.shortTitle} step by step</h2>
      <p className="guide-section-intro">
        Follow the documented instructions in order. Prepare the items listed in Requirements above; we only add step-specific cautions where relevant.
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
              {step.prepare.length ? <div><strong>Have ready for this step</strong><ul>{step.prepare.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
              {step.checkpoint ? <div><strong>Check before moving on</strong><p>{step.checkpoint}</p></div> : null}
              {step.keep ? <div><strong>Keep as evidence</strong><p>{step.keep}</p></div> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
