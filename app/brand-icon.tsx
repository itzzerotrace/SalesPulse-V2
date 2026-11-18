import { ImageResponse } from "next/og";

export function renderSalesPulseIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8C24E6 0%, #A34CF0 55%, #B76CF5 100%)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="43%"
            height="43%"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.4 4.8 12.5 23.3c-1.8 2.3-.6 5.3 2.2 5.3h8.1l-3.1 14.1c-.5 2.3 2.1 3.6 3.7 1.7l13.7-18.6c1.7-2.3.5-5.1-2.2-5.1h-7.8l4-14.4c.7-2.7-2.1-3.9-3.7-1.5Z"
              stroke="white"
              strokeWidth="3.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
