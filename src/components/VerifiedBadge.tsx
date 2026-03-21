import React from "react";

const VerifiedBadge = React.forwardRef<SVGSVGElement, { className?: string }>(
  ({ className = "" }, ref) => (
    <svg
      ref={ref}
      className={className}
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0L12.24 2.27L15.28 1.62L15.93 4.66L18.9 5.74L17.82 8.71L19.51 11.23L17.24 13.23L17.32 16.36L14.24 16.56L12.5 19.21L10 17.69L7.5 19.21L5.76 16.56L2.68 16.36L2.76 13.23L0.49 11.23L2.18 8.71L1.1 5.74L4.07 4.66L4.72 1.62L7.76 2.27L10 0Z"
        fill="hsl(210, 100%, 56%)"
      />
      <path
        d="M8.5 12.5L6 10L7 9L8.5 10.5L13 6L14 7L8.5 12.5Z"
        fill="white"
      />
    </svg>
  )
);

VerifiedBadge.displayName = "VerifiedBadge";

export default VerifiedBadge;
