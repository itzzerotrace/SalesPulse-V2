import {
  Building2,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

interface ProfileSettingsProps {
  name: string;
  email?: string | null;
  role: string;
  store?: string | null;
  city?: string | null;
}

function formatRole(
  role: string
) {
  if (!role) {
    return "Not Assigned";
  }

  return role
    .split("_")
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase() +
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
      value:
        name ||
        "Not Available",
      icon: UserRound,
    },
    {
      label: "Email",
      value:
        email ||
        "Not Available",
      icon: Mail,
    },
    {
      label: "Role",
      value:
        formatRole(role),
      icon: ShieldCheck,
    },
    {
      label:
        "Active Store",
      value:
        store ||
        "Not Assigned",
      icon: Building2,
    },
    {
      label: "Location",
      value:
        city ||
        "Not Available",
      icon: MapPin,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map(
        (field) => {
          const Icon =
            field.icon;

          return (
            <div
              key={
                field.label
              }
              className="rounded-2xl border border-slate-100 bg-[#F8F7FC] p-4"
            >
              <div className="flex items-center gap-2 text-purple-600">
                <Icon
                  size={15}
                />

                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                  {
                    field.label
                  }
                </p>
              </div>

              <p className="mt-2 break-words text-sm font-black text-[#17102F] sm:text-base">
                {
                  field.value
                }
              </p>
            </div>
          );
        }
      )}
    </div>
  );
}
