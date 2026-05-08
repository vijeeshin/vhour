import { useSelector } from "react-redux";
import { Camera, Mail, MapPin, Briefcase, User, Shield, Building2 } from "lucide-react";

const Avatar = ({ user }) => {
  const initials = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="relative inline-block">
      <div className="w-24 h-24 rounded-full bg-[#FF5A5F] flex items-center justify-center text-white text-3xl font-extrabold select-none">
        {initials}
      </div>
      <button
        className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#484848] hover:text-[#FF5A5F] transition-colors"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        title="Change avatar"
      >
        <Camera size={14} />
      </button>
    </div>
  );
};

const Field = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 w-8 h-8 rounded-xl bg-[#F7F7F7] flex items-center justify-center shrink-0">
      <Icon size={15} className="text-[#767676]" />
    </div>
    <div>
      <p className="text-[11px] font-semibold text-[#767676] uppercase tracking-wide">{label}</p>
      <p className="text-[14px] text-[#222222] mt-0.5 font-medium">
        {value || <span className="text-[#B0B0B0] font-normal">Not set</span>}
      </p>
    </div>
  </div>
);

const Card = ({ title, children }) => (
  <div
    className="bg-white rounded-2xl p-6"
    style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.06)" }}
  >
    {title && (
      <h2 className="text-[13px] font-bold text-[#222222] uppercase tracking-widest mb-5">
        {title}
      </h2>
    )}
    {children}
  </div>
);

const ProfilePage = () => {
  const user = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF5A5F] border-t-transparent animate-spin" />
      </div>
    );
  }

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "—";

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header card */}
      <Card>
        <div className="flex items-center gap-5">
          <Avatar user={user} />
          <div>
            <h1 className="text-2xl font-extrabold text-[#222222] leading-tight">{fullName}</h1>
            {user?.DEPARTMENT && (
              <p className="text-[14px] text-[#767676] mt-0.5 font-medium">{user.DEPARTMENT}</p>
            )}
            {user?.role?.name && (
              <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-[#FFF0F0] text-[#FF5A5F] text-[11px] font-semibold">
                <Shield size={10} />
                {user.role.name}
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card title="Personal Info">
        <div className="space-y-5">
          <Field icon={User} label="Full Name" value={fullName} />
          <Field icon={Mail} label="Email" value={user?.email} />
          <Field icon={Building2} label="Department" value={user?.DEPARTMENT} />
          <Field icon={MapPin} label="Location" value={user?.location} />
          <Field icon={Briefcase} label="Job Title" value={user?.title} />
        </div>
      </Card>

      {/* About */}
      <Card title="About">
        {user?.description ? (
          <p className="text-[14px] text-[#484848] leading-relaxed">{user.description}</p>
        ) : (
          <p className="text-[14px] text-[#B0B0B0]">No bio added yet.</p>
        )}
      </Card>

      {/* Account */}
      <Card title="Account">
        <div className="space-y-0">
          {[
            {
              label: "Status",
              value: (
                <span
                  className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                    user?.status === "active"
                      ? "bg-[#E6F9F0] text-[#00A699]"
                      : "bg-[#F7F7F7] text-[#767676]"
                  }`}
                >
                  {user?.status ?? "—"}
                </span>
              ),
            },
            {
              label: "Sign-in Provider",
              value: (
                <span className="text-[13px] font-medium text-[#484848] capitalize">
                  {user?.provider ?? "—"}
                </span>
              ),
            },
            {
              label: "Email Notifications",
              value: (
                <span
                  className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                    user?.email_notifications
                      ? "bg-[#E6F9F0] text-[#00A699]"
                      : "bg-[#F7F7F7] text-[#767676]"
                  }`}
                >
                  {user?.email_notifications ? "Enabled" : "Disabled"}
                </span>
              ),
            },
            {
              label: "Last Access",
              value: (
                <span className="text-[13px] font-medium text-[#484848]">
                  {user?.last_access
                    ? new Date(user.last_access).toLocaleString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </span>
              ),
            },
          ].map(({ label, value }, i, arr) => (
            <div
              key={label}
              className="flex items-center justify-between py-3"
              style={i < arr.length - 1 ? { borderBottom: "1px solid #F0F0F0" } : {}}
            >
              <span className="text-[13px] text-[#767676] font-medium">{label}</span>
              {value}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
