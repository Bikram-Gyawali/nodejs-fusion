// filename: order.ts
import { EventEmitter } from 'events';

interface ISubscriber {
 subscribe(
  event: string,
  executor: (payload: any) => any | Promise<any>,
 ): this;
}

export type OrderEvent = 'order-created' | 'order-paid';

export class OrderPublisherSubscriber implements ISubscriber {
 constructor(private readonly emitter: EventEmitter) {}
 subscribe(event: string, executor: (payload: any) => any): this {
  this.emitter.on(event, executor);
  return this;
 }

 publish(event: OrderEvent | (string & {}), payload: any): this {
  this.emitter.emit(event, payload);
  return this;
 }
}

export class Order {
 constructor(
  private readonly _id: number,
  private readonly _name: string,
  private readonly _products: any[],
 ) {}

 get id() {
  return this._id;
 }

 get name() {
  return this._name;
 }

 get products() {
  return this._products;
 }
}

const executeOrder = () => {
 const emitter = new EventEmitter();
 const orderPubSub = new OrderPublisherSubscriber(emitter);

 orderPubSub
  .subscribe('order-created', (order: any) => {
   console.log('Order created', { ...order, status: 'created' });
   orderPubSub.publish('order-paid', order);
  })
  .subscribe('order-paid', (order: any) => {
   console.log('Order paid', { ...order, status: 'paid' });
   orderPubSub.publish('order-finished', order);
  })
  .subscribe('order-finished', (order: any) => {
   console.log('Order finished', { ...order, status: 'finished' });
  });

 const orders = Array(10)
  .fill(null)
  .map((_, index) => {
   const products = Array(3)
    .fill(null)
    .map((_, index) => {
     return {
      id: index,
      name: `Product ${index}`,
      price: Math.random() * 100,
     };
    });

   return new Order(index, `Order ${index}`, products);
  });

 orders.map((order) => orderPubSub.publish('order-created', order));
};

executeOrder();