import type { Route } from "@endpts/types";

// HTML page to render the server-sent events
const pageHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>server-sent events - endpts</title>
  </head>
  <body>
    <h1>Server-sent events</h1>
    <button onclick="source.close()">Stop event stream</button>

    <ul id="events"></ul>

    <script>
      const events = document.getElementById("events");
      const source = new EventSource("/events");
      source.onmessage = (event) => {
        events.innerHTML += "<li>" + event.data + "</li>";
      };
    </script>
  </body>
</html>
`;

export default {
  method: "GET",
  path: "/",
  async handler() {
    return new Response(pageHtml, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
} satisfies Route;
