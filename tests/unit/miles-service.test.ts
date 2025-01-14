import { AffiliateStatus, ServiceClass } from "protocols"
import { createTrip } from "../factories"
import { generateMilesForTrip, getMilesFromCode } from "services/miles-service"
import * as serviceRepository from "../../src/repositories/miles-repository"

jest.mock("../factories", () => ({
  createTrip: jest.fn(() => ({
    code: "teste",
    origin: { lat: 41.5518, long: -8.4229 }, 
    destination: { lat: -22.9035, long: -43.2096 }, 
    miles: false,
    plane: "Test Plane",
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.BRONZE,
    date: "2025-01-15",
  }))
}))


describe("Contacts Service Unit Testing", () => {

  it("Should return error throw a error for existingMiles ", async() => {
    jest.spyOn(serviceRepository, "findMiles").mockResolvedValueOnce({
      code: "teste", id: 1, miles: 10
    })
    jest.spyOn(serviceRepository, "saveMiles").mockResolvedValueOnce({
      code: "teste", id: 1, miles: 10
    })
    const trip = createTrip()
    await expect(generateMilesForTrip(trip)).rejects.toEqual({
      type: "conflict",
      message: `Miles already registered for code ${trip.code}`,
    });
    expect(serviceRepository.saveMiles).not.toHaveBeenCalled();
  })
  it("Should return a created miles", async() => {
    jest.spyOn(serviceRepository, "findMiles").mockResolvedValueOnce(null)
    const saveMilesMock = jest.spyOn(serviceRepository, "saveMiles").mockResolvedValueOnce({
      code: "teste", id: 1, miles: 8013
    })
    const trip = createTrip()
    const miles = await generateMilesForTrip(trip)
    expect(miles).toBe(8013)
    expect(saveMilesMock).toHaveBeenCalledWith(trip.code, miles)
  })
  it("Should return a error not found", async() => {
    jest.spyOn(serviceRepository, "findMiles").mockResolvedValueOnce(null)
    const trip = createTrip()
    await expect(getMilesFromCode(trip.code)).rejects.toEqual({
      type: "not_found",
      message: `Miles not found for code ${trip.code}`,
    });
  })
  it("Should return a miles", async() => {
    jest.spyOn(serviceRepository, "findMiles").mockResolvedValueOnce({
      code: "teste", id: 1, miles: 8013
    })
    const trip = createTrip()
    const result = await getMilesFromCode(trip.code)
    expect(result).toEqual({
      code: "teste", id: 1, miles: 8013
    });
  })
})