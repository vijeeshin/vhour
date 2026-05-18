import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomersTable from "../components/CustomersTable";
import { customersRequest } from "../store/customerSlice";

const DEFAULT_QUERY = {
  search: "",
  sortField: "NAME",
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

const CustomersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, total } = useSelector((state) => state.customers);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useEffect(() => {
    dispatch(customersRequest(buildApiQuery(query)));
  }, [query, dispatch]);

  const handleQueryChange = useCallback((changes) => {
    setQuery((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleView = useCallback((row) => {
    navigate(`/customers/${row.CUSTOMER_ID}`);
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#484848] mb-6">Customers</h1>
      <CustomersTable
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

export default CustomersPage;
