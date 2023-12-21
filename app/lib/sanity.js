import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import * as env from './env';
export const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: env.useCdn,
    token: env.token,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
