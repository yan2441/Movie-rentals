/* import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing"; */

function init() {
  /* Sentry.init({
    dsn: "https://6baff745edbb48b4bba37bd112c2274d@o649328.ingest.sentry.io/5760212",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  }); */
}

function log(error) {
  console.log(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log
}