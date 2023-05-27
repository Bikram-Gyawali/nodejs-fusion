import type { Route } from "@endpts/types";

export default {
  method: "GET",
  path: "/events",
  async handler() {
    let eventCount = 0;

    // create a stream that emits events every 500ms to simulate doing work
    // (e.g. polling a database for new data, fetching new data from an API, etc.)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue("data: stream started\n\n");
      },
      async pull(controller) {
        controller.enqueue(`id: ${eventCount}\n`);
        controller.enqueue(`data: event #${eventCount}\n\n`);

        eventCount++;
        return new Promise((r) => setTimeout(r, 500));
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  },
} satisfies Route;
