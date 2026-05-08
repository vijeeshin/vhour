import directus from "@/shared/utils/apiInterface";
import { aggregate, readItems } from "@directus/sdk";

const customersApi = async ({
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
    readItems("CUSTOMER", {
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

const customersCountApi = async ({ filter, search } = {}) => {
  const result = await directus.request(
    aggregate("CUSTOMER", {
      aggregate: { count: "*" },
      query: { filter, search },
    }),
  );
  return Number(result?.[0]?.count?.["*"] ?? 0);
};

export { customersApi, customersCountApi };
