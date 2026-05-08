import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProjectsTable from "@/features/projects/components/ProjectsTable";
import { projectsRequest } from "@/features/projects/store/projectSlice";

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

const buildApiQuery = ({ search, sortField, sortDir, limit, page, filterActive, filterBillable, fields }, customerId) => {
  const sort = [`${sortDir === "desc" ? "-" : ""}${sortField}`];
  const filter = { CUSTOMER_ID: { _eq: customerId } };
  if (filterActive !== "all") filter.ACTIVE = { _eq: filterActive === "true" };
  if (filterBillable !== "all") filter.BILLABLE = { _eq: filterBillable === "true" };
  return {
    fields,
    search: search || undefined,
    sort,
    limit,
    offset: (page - 1) * limit,
    filter,
  };
};

const CustomerProjectsPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, total } = useSelector((state) => state.projects);
  const customers = useSelector((state) => state.customers.data);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  const customer = customers.find((c) => c.CUSTOMER_ID === customerId);

  useEffect(() => {
    dispatch(projectsRequest(buildApiQuery(query, customerId)));
  }, [query, customerId, dispatch]);

  const handleQueryChange = useCallback((changes) => {
    setQuery((prev) => ({ ...prev, ...changes }));
  }, []);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/customers")}
        className="flex items-center gap-1.5 text-sm text-[#717171] hover:text-[#222222] transition-colors mb-5"
      >
        <ChevronLeft size={15} />
        Back to Customers
      </button>
      <h1 className="text-xl font-semibold text-[#484848] mb-1">
        {customer?.NAME ?? "Customer"} — Projects
      </h1>
      <p className="text-sm text-[#717171] mb-6">
        Showing all projects for this customer
      </p>
      <ProjectsTable
        data={data}
        loading={loading}
        total={total}
        query={query}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default CustomerProjectsPage;
