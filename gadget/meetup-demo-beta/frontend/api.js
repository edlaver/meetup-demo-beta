import { Client } from "@gadget-client/meetup-demo-beta";

export const api = new Client({ environment: window.gadgetConfig.environment });
