import serviceRecords from "../data/services.json" with { type: "json" };
import { validateServiceCatalog } from "../lib/service-records";

const services = validateServiceCatalog(serviceRecords);
const publicServices = services.filter((service) => service.status !== "review");

if (services.length !== 300) {
  throw new Error("Expected 300 total guides, found " + services.length + ".");
}
if (publicServices.length !== 300) {
  throw new Error("Expected 300 public guides, found " + publicServices.length + ".");
}

console.log("Validated", services.length, "service records with", publicServices.length, "public guides.");
