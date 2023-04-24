import { Adapter, BroadcastOptions, Room } from "socket.io-adapter";
export interface ClusterAdapterOptions {
    /**
     * after this timeout the adapter will stop waiting from responses to request
     * @default 5000
     */
    requestsTimeout: number;
}
/**
 * Returns a function that will create a ClusterAdapter instance.
 *
 * @param opts - additional options
 *
 * @public
 */
export declare function createAdapter(opts?: Partial<ClusterAdapterOptions>): (nsp: any) => ClusterAdapter;
export declare class ClusterAdapter extends Adapter {
    requestsTimeout: number;
    private workerIds;
    private requests;
    private ackRequests;
    /**
     * Adapter constructor.
     *
     * @param nsp - the namespace
     * @param opts - additional options
     *
     * @public
     */
    constructor(nsp: any, opts?: Partial<ClusterAdapterOptions>);
    onMessage(message: any): Promise<void>;
    private publish;
    /**
     * Transform ES6 Set into plain arrays.
     *
     * Note: we manually serialize ES6 Sets so that using `serialization: "advanced"` is not needed when using plaintext
     * packets (reference: https://nodejs.org/api/child_process.html#child_process_advanced_serialization)
     */
    private static serializeOptions;
    private static deserializeOptions;
    broadcast(packet: any, opts: BroadcastOptions): void;
    broadcastWithAck(packet: any, opts: BroadcastOptions, clientCountCallback: (clientCount: number) => void, ack: (...args: any[]) => void): void;
    serverCount(): Promise<number>;
    addSockets(opts: BroadcastOptions, rooms: Room[]): void;
    delSockets(opts: BroadcastOptions, rooms: Room[]): void;
    disconnectSockets(opts: BroadcastOptions, close: boolean): void;
    private getExpectedResponseCount;
    fetchSockets(opts: BroadcastOptions): Promise<any[]>;
    serverSideEmit(packet: any[]): void;
    private serverSideEmitWithAck;
}
export declare function setupPrimary(): void;
