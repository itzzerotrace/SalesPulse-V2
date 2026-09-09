interface ProfileSettingsProps {
  name: string;
  email?: string | null;
  role: string;
  store?: string | null;
  city?: string | null;
}

function formatRole(role: string) {
  if (!role) return "Not Assigned";

  return role
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export default function ProfileSettings({
  name,
  email,
  role,
  store,
  city,
}: ProfileSettingsProps) {
  const fields = [
    {
      label: "Name",
      value: name || "Not Available",
    },
    {
      label: "Email",
      value: email || "Not Available",
    },
    {
      label: "Role",
      value: formatRole(role),
    },
    {
      label: "Active Store",
      value: store || "Not Assigned",
    },
    {
      label: "Location",
      value: city || "Not Available",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.label}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {field.label}
          </p>

          <p className="mt-1 break-words text-base font-black text-slate-900 sm:text-lg">
            {field.value}
          </p>
        </div>
      ))}
    </div>
  );
}
