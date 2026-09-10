import type {
  ReactNode,
} from "react";

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function SettingsCard({
  title,
  description,
  icon,
  children,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(31,21,60,0.06)]">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
              {icon}
            </div>
          )}

          <div>
            <h2 className="text-lg font-black tracking-tight text-[#17102F] sm:text-xl">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs font-medium leading-5 text-slate-500 sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}
