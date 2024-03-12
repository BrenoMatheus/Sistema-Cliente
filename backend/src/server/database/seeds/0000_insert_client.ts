import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.client).count<[{ count: number }]>(
    "* as count"
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const clientToInsert = client.map((client) => ({
    name: client.name,
    email: client.email,
    telephone: client.telephone,
    longitude: client.longitude,
    latitude: client.latitude,
  }));
  await knex(ETableNames.client).insert(clientToInsert);
};

const client = [
  {
    name: "Hotel Unique",
    email: "test@mail.com",
    telephone: 11111111,
    longitude: -46.666710382056614,
    latitude: -23.58117977252106
  },
  {
    name: "Esporte Clube Pinheiros - ECP",
    email: "test1@mail.com",
    telephone: 33333333,
    longitude: -46.68571377992852,
    latitude: -23.57749333790238
  },
  {
    name: "Shopping Frei Caneca",
    email: "test2@mail.com",
    telephone: 22222222,
    longitude: -46.65094387264352,
    latitude: -23.553554085696746
  },
  {
    name: "ETEC Prof° Basilides de Godoy",
    email: "test3@mail.com",
    telephone: 44444444,
    longitude: -46.727765047275646, 
    latitude: -23.520671017257072
  },
];
const clientes = [{
  "name": "ETEC Prof° Basilides de Godoy",
  "email": "test3@mail.com",
  "telephone": 44444444,
  "longitude": -46.727765047275646,
  "latitude": -23.520671017257072
},
{
  "name": "Shopping Frei Caneca",
  "email": "test2@mail.com",
  "telephone": 22222222,
  "longitude": -46.65094387264352,
  "latitude": -23.553554085696746
},
{
  "name": "Esporte Clube Pinheiros - ECP",
  "email": "test1@mail.com",
  "telephone": 33333333,
  "longitude": -46.68571377992852,
  "latitude": -23.57749333790238
},
{
  "name": "Hotel Unique",
  "email": "test@mail.com",
  "telephone": 11111111,
  "longitude": -46.666710382056614,
  "latitude": -23.58117977252106
}];










