import { AffiliateStatus, ServiceClass } from "protocols";
import { calculateDistance } from "services/distances-calculator-service";
import { createTrip } from "../factories";

jest.mock("../factories", () => ({
  createTrip: jest.fn(() => ({
    code: "test-code",
    origin: { lat: -23.5489, long: -46.6388 }, 
    destination: { lat: 40.6643, long: -73.9385 }, 
    miles: false,
    plane: "Test Plane",
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.BRONZE,
    date: "2025-05-15",
  }))
}))
describe("calculate Distance", () => {
  it("should calculate distance in kilometers between São Paulo x New York", () => {
    const trip = createTrip()
    const distance = calculateDistance(trip.origin, trip.destination, false);
    expect(distance).toBe(7678);
    
  });

  it("should calculate distance in miles between São Paulo x New York", () => {
    const trip = createTrip()
    const distance = calculateDistance(trip.origin, trip.destination, true);
    expect(distance).toBe(4771);
  });

});
