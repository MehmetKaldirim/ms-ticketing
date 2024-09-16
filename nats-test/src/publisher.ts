import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);

  publisher.publish({
    id: "12345",
    title: "concerto",
    price: 200,
  });

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});
