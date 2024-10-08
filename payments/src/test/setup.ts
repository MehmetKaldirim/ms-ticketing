import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  // Update the return type to handle the undefined case
  var signin: (id?: string) => string[];
}
//we are doing to simulate NAT client
jest.mock("../nats-wrapper.ts");
let mongo: MongoMemoryServer;

//"we should put originally key iot test it"
beforeAll(async () => {
  process.env.JWT_KEY = "somekey";

  //realistischer Test
  // process.env.STRIPE_KEY = process.env.STRIPE_KEY! || "sk_test_yourtestkey"; // Ensure STRIPE_KEY is defined in tests

  // if (!process.env.STRIPE_KEY) {
  //   throw new Error("STRIPE_KEY must be defined");
  // }

  // console.log("STRIPE_KEY in test environment:", process.env.STRIPE_KEY);

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db!.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
