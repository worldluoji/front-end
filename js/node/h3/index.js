import { H3, serve } from "h3";

const app = new H3().get("/", (event) => "Hello H3!");
serve(app, { port: 8094 });
