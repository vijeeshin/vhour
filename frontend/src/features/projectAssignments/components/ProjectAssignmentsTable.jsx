import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Eye,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

const columns = [
  { key: "USER_ID", label: "User", sortable: false },
  { key: "PROJECT_ID", label: "Project", sortable: false },
  { key: "ASSIGNMENT_TYPE_ID", label: "Type", sortable: false },
  { key: "ROLE", label: "Role", sortable: true },
  { key: "DATE_START", label: "Start", sortable: true },
  { key: "DATE_END", label: "End", sortable: true },
  { key: "HOURLY_RATE", label: "Rate", sortable: true },
  { key: "ALLOTTED_HOURS", label: "Hours", sortable: true },
  { key: "ACTIVE", label: "Status", sortable: true },
];

const SortIcon = ({ field, sortField, sortDir }) => {
  if (sortField !== field)
    return <ChevronsUpDown size={13} className="text-[#b0b0b0]" />;
  return sortDir === "asc"
    ? <ChevronUp size={13} className="text-[#FF5A5F]" />
    : <ChevronDown size={13} className="text-[#FF5A5F]" />;
};

const StatusBadge = ({ value }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
      value ? "bg-[#FFF0F1] text-[#FF5A5F]" : "bg-[#F7F7F7] text-[#717171]"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${value ? "bg-[#FF5A5F]" : "bg-[#b0b0b0]"}`} />
    {value ? "Active" : "Inactive"}
  </span>
);

const formatDate = (val) =>
  val
    ? new Date(val).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "—";

const resolveUser = (user) => {
  if (!user) return "—";
  if (typeof user === "object") {
    return [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email || "—";
  }
  return user;
};

const resolveProject = (project) => {
  if (!project) return "—";
  if (typeof project === "object") return project.NAME ?? project.PROJECT_CODE ?? "—";
  return project;
};

const resolveAssignmentType = (type) => {
  if (!type) return "—";
  if (typeof type === "object") return type.ASSIGNMENT_TYPE ?? "—";
  return type;
};

const SKELETON_WIDTHS = ["55%", "60%", "45%", "50%", "40%", "40%", "35%", "35%", "45%"];

const SkeletonRow = () => (
  <tr>
    {columns.map((col, i) => (
      <td key={col.key} className="px-5 py-4">
        <div
          className="h-3.5 bg-[#F7F7F7] rounded-full animate-pulse"
          style={{ width: SKELETON_WIDTHS[i % SKELETON_WIDTHS.length] }}
        />
      </td>
    ))}
    <td className="px-5 py-4">
      <div className="h-3.5 w-16 bg-[#F7F7F7] rounded-full animate-pulse ml-auto" />
    </td>
  </tr>
);

const ProjectAssignmentsTable = ({
  data = [],
  loading = false,
  total = 0,
  query,
  onQueryChange,
  onView,
  onEdit,
  onDelete,
}) => {
  const { search, sortField, sortDir, limit, page, filterActive } = query;
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        onQueryChange({ search: searchInput, page: 1 });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, search, onQueryChange]);

  const handleSort = (field) => {
    if (sortField === field) {
      onQueryChange({ sortDir: sortDir === "asc" ? "desc" : "asc", page: 1 });
    } else {
      onQueryChange({ sortField: field, sortDir: "asc", page: 1 });
    }
  };

  const resolvedTotal = total || data.length;
  const totalPages = Math.max(1, Math.ceil(resolvedTotal / limit));
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex flex-col gap-5 font-['Circular',_'Helvetica_Neue',_Helvetica,_Arial,_sans-serif]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#717171]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2.5 text-sm text-[#222222] placeholder:text-[#b0b0b0] bg-white border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-[#222222] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#717171] font-medium">
            <SlidersHorizontal size={13} />
            <span>Filters:</span>
          </div>

          <select
            value={filterActive}
            onChange={(e) => onQueryChange({ filterActive: e.target.value, page: 1 })}
            className="text-sm text-[#222222] bg-white border border-[#DDDDDD] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#222222] transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select
            value={limit}
            onChange={(e) => onQueryChange({ limit: Number(e.target.value), page: 1 })}
            className="text-sm text-[#222222] bg-white border border-[#DDDDDD] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#222222] transition-colors appearance-none cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s} per page</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table card */}
      <div className="overflow-x-auto rounded-2xl border border-[#DDDDDD] shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EBEBEB]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-5 py-3.5 text-left text-xs font-semibold tracking-wider text-[#717171] uppercase whitespace-nowrap select-none ${
                    col.sortable ? "cursor-pointer hover:text-[#222222] transition-colors" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <SortIcon field={col.key} sortField={sortField} sortDir={sortDir} />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-[#717171] uppercase whitespace-nowrap select-none">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F7F7F7]">
            {loading ? (
              Array.from({ length: Math.min(limit, 5) }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">🔍</span>
                    <p className="text-[#222222] font-semibold">No assignments found</p>
                    <p className="text-[#717171] text-xs">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.PROJECT_ASSIGNMENT_ID}
                  className="group hover:bg-[#FAFAFA] transition-colors"
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <span className="font-semibold text-[#222222] group-hover:text-[#FF5A5F] transition-colors">
                      {resolveUser(row.USER_ID)}
                    </span>
                  </td>
                  {/* Project */}
                  <td className="px-5 py-4">
                    <span className="inline-block font-mono text-xs bg-[#F7F7F7] text-[#484848] px-2 py-1 rounded-lg">
                      {resolveProject(row.PROJECT_ID)}
                    </span>
                  </td>
                  {/* Assignment Type */}
                  <td className="px-5 py-4 text-[#717171] text-sm">
                    {resolveAssignmentType(row.ASSIGNMENT_TYPE_ID)}
                  </td>
                  {/* Role */}
                  <td className="px-5 py-4 text-[#717171] text-sm">{row.ROLE ?? "—"}</td>
                  {/* Date Start */}
                  <td className="px-5 py-4 text-[#717171] text-xs whitespace-nowrap">
                    {formatDate(row.DATE_START)}
                  </td>
                  {/* Date End */}
                  <td className="px-5 py-4 text-[#717171] text-xs whitespace-nowrap">
                    {formatDate(row.DATE_END)}
                  </td>
                  {/* Hourly Rate */}
                  <td className="px-5 py-4 text-[#717171] text-sm">
                    {row.HOURLY_RATE != null ? `$${Number(row.HOURLY_RATE).toFixed(2)}` : "—"}
                  </td>
                  {/* Allotted Hours */}
                  <td className="px-5 py-4 text-[#717171] text-sm">
                    {row.ALLOTTED_HOURS != null ? Number(row.ALLOTTED_HOURS).toLocaleString() : "—"}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge value={row.ACTIVE} />
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onView?.(row)}
                        title="View"
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-[#717171] hover:bg-[#F7F7F7] hover:text-[#222222] transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => onEdit?.(row)}
                        title="Edit"
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-[#717171] hover:bg-[#F7F7F7] hover:text-[#222222] transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete?.(row)}
                        title="Delete"
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-[#717171] hover:bg-[#FFF0F1] hover:text-[#FF5A5F] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-[#717171]">
        <span className="text-xs">
          {resolvedTotal === 0
            ? "No results"
            : `${(page - 1) * limit + 1}–${Math.min(page * limit, resolvedTotal)} of ${resolvedTotal} assignments`}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onQueryChange({ page: page - 1 })}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#DDDDDD] hover:border-[#222222] text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} />
          </button>

          {pageNumbers.map((item, idx) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-[#b0b0b0]">
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onQueryChange({ page: item })}
                className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-semibold transition-colors ${
                  page === item
                    ? "bg-[#222222] text-white border border-[#222222]"
                    : "border border-[#DDDDDD] text-[#222222] hover:border-[#222222]"
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            onClick={() => onQueryChange({ page: page + 1 })}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#DDDDDD] hover:border-[#222222] text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectAssignmentsTable;
