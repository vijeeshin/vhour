import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectsTable from "../components/ProjectsTable";
import { projectsRequest } from "../store/projectSlice";

const DEFAULT_QUERY = {
  search: "",
  sortField: "NAME",
  sortDir: "asc",
  limit: 10,
  page: 1,
  filterActive: "all",
  filterBillable: "all",
  fields: ["*", "PROJECT_MANAGER_ID.id", "PROJECT_MANAGER_ID.first_name", "PROJECT_MANAGER_ID.last_name", "PROJECT_MANAGER_ID.email"],
};

const buildApiQuery = ({ search, sortField, sortDir, limit, page, filterActive, filterBillable, fields }) => {
  const sort = [`${sortDir === "desc" ? "-" : ""}${sortField}`];
  const filter = {};
  if (filterActive !== "all") filter.ACTIVE = { _eq: filterActive === "true" };
  if (filterBillable !== "all") filter.BILLABLE = { _eq: filterBillable === "true" };
  return {
    fields,
    search: search || undefined,
    sort,
    limit,
    offset: (page - 1) * limit,
    filter: Object.keys(filter).length ? filter : undefined,
  };
};

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, total } = useSelector((state) => state.projects);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useEffect(() => {
    dispatch(projectsRequest(buildApiQuery(query)));
  }, [query, dispatch]);

  const handleQueryChange = useCallback((changes) => {
    setQuery((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleView = useCallback((row) => {
    navigate(`/projects/${row.PROJECT_ID}`);
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#484848] mb-6">Projects</h1>
      <ProjectsTable
        data={data}
        loading={loading}
        total={total}
        query={query}
        onQueryChange={handleQueryChange}
        onView={handleView}
      />
    </div>
  );
};

export default ProjectsPage;
