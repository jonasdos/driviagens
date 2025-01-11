import { faker } from "@faker-js/faker";
import { Location } from "protocols";


export function createCoordenates() {
  const coords1: Location = {lat: faker.location.latitude(),long: faker.location.longitude()}
  const coords2: Location = {lat: faker.location.latitude(),long: faker.location.longitude()}
  const coordenates = {coords1, coords2}
  return coordenates
}