import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Layers, User } from "lucide-react";
import { assignmentTypeRequest } from "@/features/assignmentTypes/store/assignmentTypeSlice";

const Badge = ({ value, trueLabel, falseLabel }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
      value ? "bg-[#FFF0F1] text-[#FF5A5F]" : "bg-[#F7F7F7] text-[#717171]"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${value ? "bg-[#FF5A5F]" : "bg-[#b0b0b0]"}`} />
    {value ? trueLabel : falseLabel}
  </span>
);

const Field = ({ label, children }) => (
  <div>
    <p className="text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider mb-1">{label}</p>
    <div className="text-sm text-[#222222]">{children ?? <span className="text-[#b0b0b0]">—</span>}</div>
  </div>
);

const Card = ({ title, icon: Icon, children }) => (
  <div className="rounded-2xl border border-[#DDDDDD] shadow-sm bg-white p-5">
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F7F7F7]">
      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FFF0F1] text-[#FF5A5F]">
        <Icon size={14} />
      </div>
      <h2 className="text-sm font-semibold text-[#484848]">{title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">{children}</div>
  </div>
);

const SkeletonCard = ({ rows = 4 }) => (
  <div className="rounded-2xl border border-[#DDDDDD] shadow-sm bg-white p-5 animate-pulse">
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F7F7F7]">
      <div className="w-7 h-7 bg-[#F7F7F7] rounded-lg" />
      <div className="h-3.5 bg-[#F7F7F7] rounded-full w-28" />
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-2 bg-[#F7F7F7] rounded-full w-16" />
          <div className="h-3.5 bg-[#F7F7F7] rounded-full w-32" />
        </div>
      ))}
    </div>
  </div>
);

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

const AssignmentTypePage = () => {
  const { assignmentTypeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignmentType: at, assignmentTypeLoading, assignmentTypeError } = useSelector(
    (state) => state.assignmentTypes
  );

  useEffect(() => {
    if (assignmentTypeId) dispatch(assignmentTypeRequest(assignmentTypeId));
  }, [assignmentTypeId, dispatch]);

  const createdBy = at?.user_created;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/assignment-types")}
        className="flex items-center gap-1.5 text-sm text-[#717171] hover:text-[#222222] transition-colors mb-5"
      >
        <ChevronLeft size={15} />
        Back to Assignment Types
      </button>

      {assignmentTypeError ? (
        <div className="rounded-2xl border border-[#DDDDDD] bg-white p-8 text-center text-sm text-[#FF5A5F]">
          Failed to load assignment type: {assignmentTypeError}
        </div>
      ) : (
        <>
          {/* Page header */}
          <div className="mb-6">
            {assignmentTypeLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-6 bg-[#F7F7F7] rounded-full w-64" />
                <div className="h-3.5 bg-[#F7F7F7] rounded-full w-36" />
              </div>
            ) : (
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-semibold text-[#484848]">
                  {at?.ASSIGNMENT_TYPE ?? "Assignment Type"}
                </h1>
                <Badge value={at?.ACTIVE} trueLabel="Active" falseLabel="Inactive" />
              </div>
            )}
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              {assignmentTypeLoading ? (
                <SkeletonCard rows={4} />
              ) : (
                <Card title="Assignment Type Details" icon={Layers}>
                  <Field label="Name">{at?.ASSIGNMENT_TYPE}</Field>
                  <Field label="Status">
                    <Badge value={at?.ACTIVE} trueLabel="Active" falseLabel="Inactive" />
                  </Field>
                  {at?.DESCRIPTION && (
                    <div className="col-span-2">
                      <Field label="Description">
                        <p className="text-[#717171] leading-relaxed">{at.DESCRIPTION}</p>
                      </Field>
                    </div>
                  )}
                  <Field label="Created">{fmt(at?.date_created)}</Field>
                  <Field label="Last Updated">{fmt(at?.date_updated)}</Field>
                </Card>
              )}
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {assignmentTypeLoading ? (
                <SkeletonCard rows={2} />
              ) : createdBy ? (
                <Card title="Created By" icon={User}>
                  <Field label="Name">
                    {`${createdBy.first_name ?? ""} ${createdBy.last_name ?? ""}`.trim() || "—"}
                  </Field>
                  <Field label="Email">{createdBy.email}</Field>
                  {createdBy.DEPARTMENT && (
                    <Field label="Department">{createdBy.DEPARTMENT}</Field>
                  )}
                </Card>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentTypePage;
