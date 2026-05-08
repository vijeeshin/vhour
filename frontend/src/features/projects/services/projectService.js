import directus from "@/shared/utils/apiInterface";
import { aggregate, readItem, readItems } from "@directus/sdk";

const projectsApi = async ({
  fields,
  filter,
  search,
  sort,
  limit,
  offset,
  page,
  deep,
  alias,
} = {}) => {
  return await directus.request(
    readItems("PROJECT", {
      fields,
      filter,
      search,
      sort,
      limit,
      offset,
      page,
      deep,
      alias,
    }),
  );
};

const customersApi = async () => {
  return await directus.request(
    readItems("CUSTOMER", { fields: ["CUSTOMER_ID", "NAME"], limit: -1 }),
  );
};

const projectApi = async (projectId) => {
  return await directus.request(
    readItem("PROJECT", projectId, { fields: ["*.*"] }),
  );
};

const projectsCountApi = async ({ filter, search } = {}) => {
  const result = await directus.request(
    aggregate("PROJECT", {
      aggregate: { count: "*" },
      query: { filter, search },
    }),
  );
  return Number(result?.[0]?.count?.["*"] ?? 0);
};

export { projectsApi, projectsCountApi, customersApi, projectApi };
