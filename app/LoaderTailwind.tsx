import React from "react";

/**
 * Props:
 *  - size: 'sm' | 'md' | 'lg'  (defaults to 'md')
 *  - overlay: boolean (full screen)
 *  - text: optional label below spinner
 */
export default function LoaderTailwind({ size = "md", overlay = false, text = ""}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-4",
    lg: "h-10 w-10 border-4"
  };
  const spinnerClass = `animate-spin rounded-full border-t-transparent ${sizes} border-amber-500 border-gray-200`;

  const spinner = (
    <div className="flex flex-col items-center" role="status" aria-live="polite" aria-label={text || "Chargement"}>
      <div className={spinnerClass} />
      {text && <span className="mt-2 text-sm text-gray-600">{text}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/70 z-50 grid place-items-center">
        {spinner}
      </div>
    );
  }
  return spinner;
}
