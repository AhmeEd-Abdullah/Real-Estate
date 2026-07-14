import apiRequest from "./apiRequestConfig";
import { Posts } from "./api-endpoints";

export const singlePageLoader = async ({ params }) => {
    const response = await apiRequest.get(`${Posts.postEndpoint}/${params.id}`);
    return response.data ?? null;
};

export const listPageLoader = async ({ request }) => {
    const searchQueries = request.url.split("?")[1] || "";
    const posts = apiRequest.get(`${Posts.postEndpoint}${searchQueries ? `?${searchQueries}` : ""}`);
    return { posts };
};

export const profilePostsLoader = async () => {
    const posts = apiRequest.get(`${Posts.postEndpoint}/user/profile`);
    return { posts };
};