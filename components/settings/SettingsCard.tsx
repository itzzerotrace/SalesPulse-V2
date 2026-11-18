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
    <section className="overflow-hidden rounded-[28px] border border-violet-300/20 bg-[#170D29] shadow-[0_18px_50px_rgba(5,2,15,0.3)]">
      <div className="border-b border-violet-300/15 bg-gradient-to-r from-violet-700/15 to-transparent px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
              {icon}
            </div>
          )}

          <div>
            <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs font-medium leading-5 text-violet-100/65 sm:text-sm">
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
