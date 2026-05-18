import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AssignmentTypesTable from "../components/AssignmentTypesTable";
import { assignmentTypesRequest } from "../store/assignmentTypeSlice";

const DEFAULT_QUERY = {
  search: "",
  sortField: "ASSIGNMENT_TYPE",
  sortDir: "asc",
  limit: 10,
  page: 1,
  filterActive: "all",
  fields: ["*"],
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

const AssignmentTypesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, total } = useSelector((state) => state.assignmentTypes);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useEffect(() => {
    dispatch(assignmentTypesRequest(buildApiQuery(query)));
  }, [query, dispatch]);

  const handleQueryChange = useCallback((changes) => {
    setQuery((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleView = useCallback((row) => {
    navigate(`/assignment-types/${row.PROJECT_ASSIGNMENT_TYPE_ID}`);
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#484848] mb-6">Assignment Types</h1>
      <AssignmentTypesTable
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

export default AssignmentTypesPage;
