import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { data, loading, total } = useSelector((state) => state.customers);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useEffect(() => {
    dispatch(customersRequest(buildApiQuery(query)));
  }, [query, dispatch]);

  const handleQueryChange = useCallback((changes) => {
    setQuery((prev) => ({ ...prev, ...changes }));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#484848] mb-6">Customers</h1>
      <CustomersTable
        data={data}
        loading={loading}
        total={total}
        query={query}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default CustomersPage;
