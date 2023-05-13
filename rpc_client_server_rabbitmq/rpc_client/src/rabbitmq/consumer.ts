import { Channel, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";

export default class Consumer {
  constructor(
    private channel: Channel,
    private replyQueueName: string,
    private eventEmitter: EventEmitter
  ) {}

  async consumeMessages() {
    console.log("from consumer : system is ready to consume messages ...");

    this.channel.consume(
      this.replyQueueName,
      (msg: ConsumeMessage) => {
        console.log("reply is .. ", JSON.parse(msg.content.toString()));
        this.eventEmitter.emit(msg.properties.correlationId.toString(), msg);
      },
      { noAck: true }
    );
  }
}
