import serviceRecords from "../data/services.json" with { type: "json" };
import scaleServiceRecords from "../data/services-scale-verified.json" with { type: "json" };
import privateServiceRecords from "../data/services-private-extended.json" with { type: "json" };
import growthServiceRecords from "../data/services-growth-wave-3.json" with { type: "json" };
import { validateServiceCatalog } from "../lib/service-records";

const services = validateServiceCatalog([...serviceRecords, ...scaleServiceRecords, ...privateServiceRecords, ...growthServiceRecords]);
const publicServices = services.filter((service) => service.status !== "review");

if (services.length !== 653) {
  throw new Error("Expected 653 total guides, found " + services.length + ".");
}
if (publicServices.length !== 653) {
  throw new Error("Expected 653 public guides, found " + publicServices.length + ".");
}

console.log("Validated", services.length, "service records with", publicServices.length, "public guides.");
