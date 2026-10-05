import serviceRecords from "../data/services.json" with { type: "json" };
import { validateServiceCatalog } from "../lib/service-records";

const services = validateServiceCatalog(serviceRecords);
const publicServices = services.filter((service) => service.status !== "review");

if (services.length !== 293) {
  throw new Error("Expected 293 total guides, found " + services.length + ".");
}
if (publicServices.length !== 293) {
  throw new Error("Expected 293 public guides, found " + publicServices.length + ".");
}

console.log("Validated", services.length, "service records with", publicServices.length, "public guides.");
