import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectAssignmentsTable from "../components/ProjectAssignmentsTable";
import { projectAssignmentsRequest } from "../store/projectAssignmentSlice";
import { DEFAULT_FIELDS } from "../services/projectAssignmentService";

const DEFAULT_QUERY = {
  search: "",
  sortField: "DATE_START",
  sortDir: "desc",
  limit: 10,
  page: 1,
  filterActive: "all",
  fields: DEFAULT_FIELDS,
};

const buildApiQuery = ({ search, sortField, sortDir, limit, page, filterActive, fields }) => {
  const sort = [`${sortDir === "desc" ? "-" : ""}${sortField}`];
  const filter = {};
  if (filterActive !== "all") filter.ACTIVE = { _eq: filterActive === "true" };
  return {
    fields,
    search: search || undefined,
    sort,
    limit,
    offset: (page - 1) * limit,
    filter: Object.keys(filter).length ? filter : undefined,
  };
};

const ProjectAssignmentsPage = () => {
  const dispatch = useDispatch();
  const { data, loading, total } = useSelector((state) => state.projectAssignments);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useEffect(() => {
    dispatch(projectAssignmentsRequest(buildApiQuery(query)));
  }, [query, dispatch]);

  const handleQueryChange = useCallback((changes) => {
    setQuery((prev) => ({ ...prev, ...changes }));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#484848] mb-6">Project Assignments</h1>
      <ProjectAssignmentsTable
        data={data}
        loading={loading}
        total={total}
        query={query}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default ProjectAssignmentsPage;
