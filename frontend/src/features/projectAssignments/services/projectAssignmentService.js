import directus from "@/shared/utils/apiInterface";
import { aggregate, readItems } from "@directus/sdk";

const DEFAULT_FIELDS = [
  "*",
  "USER_ID.id",
  "USER_ID.first_name",
  "USER_ID.last_name",
  "USER_ID.email",
  "PROJECT_ID.PROJECT_ID",
  "PROJECT_ID.NAME",
  "PROJECT_ID.PROJECT_CODE",
  "ASSIGNMENT_TYPE_ID.PROJECT_ASSIGNMENT_TYPE_ID",
  "ASSIGNMENT_TYPE_ID.ASSIGNMENT_TYPE",
];

const projectAssignmentsApi = async ({
  fields = DEFAULT_FIELDS,
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
    readItems("PROJECT_ASSIGNMENT", {
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

const projectAssignmentsCountApi = async ({ filter, search } = {}) => {
  const result = await directus.request(
    aggregate("PROJECT_ASSIGNMENT", {
      aggregate: { count: "*" },
      query: { filter, search },
    }),
  );
  return Number(result?.[0]?.count?.["*"] ?? 0);
};

export { projectAssignmentsApi, projectAssignmentsCountApi, DEFAULT_FIELDS };
