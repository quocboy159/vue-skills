import Vue from 'vue'
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

const sentry = {
  setup() {
    Sentry.init({
      //dsn: "https://6a452f06fba64f7abeb5fc7cf7bf9556@o481906.ingest.sentry.io/5531319",
      dsn: process.env.VUE_APP_SENTRY_DSN,
      integrations: [
        new VueIntegration({
          Vue,
          tracing: false,
        }),
        new Integrations.BrowserTracing(),
      ],

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      // Max value of 1.0 means 100% will be sampled.  A rate of 0.1 means 10% will be sampled.
      tracesSampleRate: 0.1,
    });
  }
}

export default sentry
