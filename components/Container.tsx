import type { ReactNode } from "react";

/**
 * Wrapper standard per i contenuti: centrato, max-width 1200px, padding laterale.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
