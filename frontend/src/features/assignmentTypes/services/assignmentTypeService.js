import directus from "@/shared/utils/apiInterface";
import { aggregate, readItem, readItems } from "@directus/sdk";

const assignmentTypesApi = async ({
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
    readItems("PROJECT_ASSIGNMENT_TYPE", {
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

const assignmentTypesCountApi = async ({ filter, search } = {}) => {
  const result = await directus.request(
    aggregate("PROJECT_ASSIGNMENT_TYPE", {
      aggregate: { count: "*" },
      query: { filter, search },
    }),
  );
  return Number(result?.[0]?.count?.["*"] ?? 0);
};

const assignmentTypeApi = async (id) => {
  return await directus.request(
    readItem("PROJECT_ASSIGNMENT_TYPE", id, { fields: ["*.*"] }),
  );
};

export { assignmentTypesApi, assignmentTypesCountApi, assignmentTypeApi };
