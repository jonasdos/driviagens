import { calculateMiles } from "services/miles-calculator-service";
import { Trip, AffiliateStatus, ServiceClass, Location } from "protocols";
import { createCoordenates } from "../factories/coordenatesFactory";

describe("Miles calculator service Unit Testing", () => {
  it("should calculate miles for a trip", () => {
    // Arange 
    const {coords1} = createCoordenates()
    const {coords2} = createCoordenates()
    const trip: Trip = {
      code: "ABC123",
      origin: coords1,
      destination: coords2,
      miles: false,
      plane: "Boeing 737",
      service: ServiceClass.EXECUTIVE,
      affiliate: AffiliateStatus.BRONZE,
      date: "2025-01-01",
    };

    const miles = calculateMiles(trip);
    console.log("Milha:" +miles)
    expect(miles).toBeGreaterThan(0);
  });

  it("should return 0 if trip was paid in miles", () => {
    const {coords1} = createCoordenates()
    const {coords2} = createCoordenates()
    const trip: Trip = {
      code: "XYZ789",
      origin: coords1,
      destination: coords2,
      miles: true,
      plane: "Airbus A320",
      service: ServiceClass.EXECUTIVE,
      affiliate: AffiliateStatus.BRONZE,
      date: "2025-01-01",
    };

    const miles = calculateMiles(trip);
    expect(miles).toBe(0);
  });
});
