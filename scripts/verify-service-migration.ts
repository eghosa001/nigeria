import serviceRecords from "../data/services.json" with { type: "json" };
import privateServiceRecords from "../data/services-private-extended.json" with { type: "json" };
import { validateServiceCatalog } from "../lib/service-records";

const services = validateServiceCatalog([...serviceRecords, ...privateServiceRecords]);
const publicServices = services.filter((service) => service.status !== "review");

if (services.length !== 628) {
  throw new Error("Expected 628 total guides, found " + services.length + ".");
}
if (publicServices.length !== 628) {
  throw new Error("Expected 628 public guides, found " + publicServices.length + ".");
}

console.log("Validated", services.length, "service records with", publicServices.length, "public guides.");
