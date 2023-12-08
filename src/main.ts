import { createApp } from "vue";
import PrimeVue from "primevue/config";

import "./style/tailwind.css";
import "primevue/resources/themes/mdc-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

import PostFeed from "./pages/PostFeed.vue";
import { IApiFeedServiceKey } from "./services/IApiFeedService";
import { ApiFeedService } from "./services/ApiFeedService";

const app = createApp(PostFeed);
app.use(PrimeVue, { ripple: true });
app.provide(IApiFeedServiceKey, new ApiFeedService);
app.mount("#app");
