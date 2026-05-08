import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Building2,
  User,
  Calendar,
  Hash,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Layers,
} from "lucide-react";
import { projectRequest } from "@/features/projects/store/projectSlice";

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

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project: p, projectLoading, projectError } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (projectId) dispatch(projectRequest(projectId));
  }, [projectId, dispatch]);

  const manager = p?.PROJECT_MANAGER_ID;
  const customer = p?.CUSTOMER_ID;
  const createdBy = p?.user_created;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-1.5 text-sm text-[#717171] hover:text-[#222222] transition-colors mb-5"
      >
        <ChevronLeft size={15} />
        Back to Projects
      </button>

      {projectError ? (
        <div className="rounded-2xl border border-[#DDDDDD] bg-white p-8 text-center text-sm text-[#FF5A5F]">
          Failed to load project: {projectError}
        </div>
      ) : (
        <>
          {/* Page header */}
          <div className="mb-6">
            {projectLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-6 bg-[#F7F7F7] rounded-full w-64" />
                <div className="h-3.5 bg-[#F7F7F7] rounded-full w-36" />
              </div>
            ) : (
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-semibold text-[#484848]">{p?.NAME ?? "Project"}</h1>
                {p?.PROJECT_CODE && (
                  <span className="font-mono text-xs bg-[#F7F7F7] text-[#484848] px-2.5 py-1 rounded-lg">
                    {p.PROJECT_CODE}
                  </span>
                )}
                <Badge value={p?.ACTIVE} trueLabel="Active" falseLabel="Inactive" />
                <Badge value={p?.BILLABLE} trueLabel="Billable" falseLabel="Non-billable" />
              </div>
            )}
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              {projectLoading ? (
                <SkeletonCard rows={6} />
              ) : (
                <Card title="Project Details" icon={Layers}>
                  <Field label="Project Name">{p?.NAME}</Field>
                  <Field label="Project Code">{p?.PROJECT_CODE}</Field>
                  <Field label="Status">
                    <Badge value={p?.ACTIVE} trueLabel="Active" falseLabel="Inactive" />
                  </Field>
                  <Field label="Billing">
                    <Badge value={p?.BILLABLE} trueLabel="Billable" falseLabel="Non-billable" />
                  </Field>
                  {p?.CONTACT && <Field label="Contact">{p.CONTACT}</Field>}
                  {p?.DESCRIPTION && (
                    <div className="col-span-2">
                      <Field label="Description">
                        <p className="text-[#717171] leading-relaxed">{p.DESCRIPTION}</p>
                      </Field>
                    </div>
                  )}
                  <Field label="Created">{fmt(p?.date_created)}</Field>
                  <Field label="Last Updated">{fmt(p?.date_updated)}</Field>
                </Card>
              )}

              {/* Created By */}
              {projectLoading ? (
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

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Customer */}
              {projectLoading ? (
                <SkeletonCard rows={4} />
              ) : customer ? (
                <Card title="Customer" icon={Building2}>
                  <Field label="Name">{customer.NAME}</Field>
                  <Field label="Code">{customer.CODE}</Field>
                  <Field label="Email">{customer.EMAIL}</Field>
                  <Field label="Status">
                    <Badge value={customer.ACTIVE} trueLabel="Active" falseLabel="Inactive" />
                  </Field>
                  {customer.PHONE && <Field label="Phone">{customer.PHONE}</Field>}
                  {customer.DESCRIPTION && (
                    <div className="col-span-2">
                      <Field label="Description">{customer.DESCRIPTION}</Field>
                    </div>
                  )}
                </Card>
              ) : null}

              {/* Project Manager */}
              {projectLoading ? (
                <SkeletonCard rows={4} />
              ) : manager ? (
                <Card title="Project Manager" icon={Briefcase}>
                  <Field label="Name">
                    {`${manager.first_name ?? ""} ${manager.last_name ?? ""}`.trim() || "—"}
                  </Field>
                  <Field label="Email">{manager.email}</Field>
                  {manager.title && <Field label="Title">{manager.title}</Field>}
                  {manager.location && <Field label="Location">{manager.location}</Field>}
                  {manager.DEPARTMENT && <Field label="Department">{manager.DEPARTMENT}</Field>}
                  <Field label="Status">
                    <Badge value={manager.status === "active"} trueLabel="Active" falseLabel="Inactive" />
                  </Field>
                </Card>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectPage;
