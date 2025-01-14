
import { AffiliateStatus, ServiceClass } from "protocols"
import { createTrip } from "../factories"
import { calculateMiles } from "services/miles-calculator-service"

jest.mock("../factories", () => ({
  createTrip: jest.fn(() => ({
    code: "test-code",
    origin: { lat: 41.5518, long: -8.4229 }, 
    destination: { lat: -22.9035, long: -43.2096 }, 
    miles: true,
    plane: "Test Plane",
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.BRONZE,
    date: "2025-01-15",
  }))
}))

describe("Calculate Miles",() => {
  it("Should return 0 if miles is true", () => {
    const trip = createTrip()
    const miles = calculateMiles(trip)
    expect(miles).toBe(0)
  })
  it("should return miles with no birthday bonus", () => {
    const trip = createTrip()
    trip.miles = false
    const miles = calculateMiles(trip)
    expect(miles).toBeCloseTo(Math.round(8013))
  })
  it("should return miles with birthday bonus", () => {
    const trip = createTrip()
    trip.date = "2025-05-20"
    trip.miles = false
    const miles = calculateMiles(trip)
    expect(miles).toBeCloseTo(Math.round(8013*1.10))
  })
  

})