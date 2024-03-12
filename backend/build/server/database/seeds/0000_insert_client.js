"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const ETableNames_1 = require("../ETableNames");
const seed = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    const [{ count }] = yield knex(ETableNames_1.ETableNames.client).count("* as count");
    if (!Number.isInteger(count) || Number(count) > 0)
        return;
    const clientToInsert = client.map((client) => ({
        name: client.name,
        email: client.email,
        telephone: client.telephone,
        coordinateX: client.coordinateX,
        coordinateY: client.coordinateY,
    }));
    yield knex(ETableNames_1.ETableNames.client).insert(clientToInsert);
});
exports.seed = seed;
const client = [
    {
        name: "Hotel Unique",
        email: "test@mail.com",
        telephone: 11111111,
        coordinateX: -23.520001213400032,
        coordinateY: -46.72736545907406,
    },
    {
        name: "Hospital Municipal e Maternidade Prof. Mario Degni",
        email: "test1@mail.com",
        telephone: 33333333,
        coordinateX: -23.54850009219597,
        coordinateY: -46.77164426349795
    },
    {
        name: "Bradesco Universitário",
        email: "test2@mail.com",
        telephone: 22222222,
        coordinateX: -23.576030811478923,
        coordinateY: -46.76492076767088
    },
    {
        name: "ETEC Prof° Basilides de Godoy",
        email: "test3@mail.com",
        telephone: 44444444,
        coordinateX: -23.578580192166374,
        coordinateY: -46.66723617380327
    },
];
