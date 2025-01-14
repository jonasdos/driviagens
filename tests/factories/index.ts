import { faker } from "@faker-js/faker";
import { AffiliateStatus, Location, ServiceClass, Trip } from "protocols";


export function createCoordenates() {
  const coords1: Location = {lat: faker.location.latitude(),long: faker.location.longitude()}
  const coords2: Location = {lat: faker.location.latitude(),long: faker.location.longitude()}
  const coordenates = {coords1, coords2}
  return coordenates
}

export function createTrip(propriedades: Partial<Trip> = {}): Trip {
  const {coords1, coords2} = createCoordenates()
  
  return {
    code: faker.string.uuid(),
    origin: coords1,
    destination: coords2,
    miles: false,
    plane: faker.airline.airplane().name,
    service: getRandomEnumValue(ServiceClass),
    affiliate: getRandomEnumValue(AffiliateStatus),
    date: faker.date.future().toDateString(),
    ...propriedades
  };
}

function getRandomEnumValue<T>(objeto: T): T[keyof T] {
  const values = Object.values(objeto)
  const indexAleatorio = Math.floor(Math.random() * values.length)
  return values[indexAleatorio]
}