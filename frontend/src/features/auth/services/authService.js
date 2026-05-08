import directus from "@/shared/utils/apiInterface";
import { login } from "@directus/sdk";

const loginApi = async ({ username, password }) => {
  const response = await directus.request(login({ email: username, password }));
  return response;
};

export { loginApi };
