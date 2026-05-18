import directus from "@/shared/utils/apiInterface";
import { aggregate, readItem, readItems } from "@directus/sdk";

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

const customerApi = async (customerId) => {
  return await directus.request(
    readItem("CUSTOMER", customerId, { fields: ["*.*"] }),
  );
};

export { customersApi, customersCountApi, customerApi };
