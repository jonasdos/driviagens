import { calculateDistance } from "services/distances-calculator-service"
import {faker} from '@faker-js/faker'

describe("Distances calculator service Unit Testing", () => {
  it("Should return a distance with two cordenates ", () => {
    const distance = calculateDistance({lat: faker.location.latitude(), long: faker.location.longitude()}, {lat: faker.location.latitude(), long: faker.location.longitude()}, false )
    console.log("Distância: "+distance)
    expect(distance).toBeGreaterThan(10)
  })
})