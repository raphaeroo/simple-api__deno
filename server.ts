import { Application } from "https://deno.land/x/oak/mod.ts";

import { PORT } from './config.ts'
import Router from "./router.ts";

const app = new Application();

app.use(Router.routes());
app.use(Router.allowedMethods());

console.log(`Server running on port ${PORT}`);

await app.listen(`localhost:${PORT}`);
