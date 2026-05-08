import directus from "@/shared/utils/apiInterface";
import {  readUserPermissions, readMe } from "@directus/sdk";

const permissionsApi = async () => {
  const response = await directus.request(readUserPermissions());
  return response;
}

const profileApi = async () => {
const response = await directus.request(
  readMe({
    fields: ["*", "role.*"]
  })
);
  return response;
}
export { permissionsApi, profileApi };
