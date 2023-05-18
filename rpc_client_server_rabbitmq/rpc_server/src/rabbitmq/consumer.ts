import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "../messageHandler";

export default class Consumer {
  constructor(private channel: Channel, private rpcQueue: string) {}

  async consumeMessages() {
    console.log("Ready to consume messages...");

    this.channel.consume(
      this.rpcQueue,
      (msg: ConsumeMessage) => {
        const { correlationId, replyTo } = msg.properties;
        const operation = msg.properties.headers.function;
        if (!correlationId || !replyTo) {
          console.log("Missing some properties...");
        }
        console.log("Consumed", JSON.parse(msg.content.toString()));
        MessageHandler.handle(
          operation,
          JSON.parse(msg.content.toString()),
          correlationId,
          replyTo
        );
      },
      {
        noAck: true,
      }
    );
  }
}
