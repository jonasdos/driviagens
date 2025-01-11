import { calculateDistance } from "services/distances-calculator-service";
import { createCoordenates } from "../factories/coordenatesFactory";

describe("calculateDistance", () => {
  it("should calculate distance in kilometers", () => {
    const {coords1, coords2} = createCoordenates()
    const distance = calculateDistance(coords1, coords2, false);
    expect(distance).toBeGreaterThan(0);
  });

  it("should calculate distance in miles", () => {
    const {coords1, coords2} = createCoordenates()
    const distance = calculateDistance(coords1, coords2, true);
    expect(distance).toBeGreaterThan(0);
  });

});
