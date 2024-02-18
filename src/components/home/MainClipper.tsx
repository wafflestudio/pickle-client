import styled from "@emotion/styled";

type Props = {
  isBlendLayer: boolean;
};

// TODO: export 다시
export default function MainClipper({ isBlendLayer }: Props) {
  const x = isBlendLayer ? { fill: "white" } : {};
  return (
    <>
      <Front />
      <svg
        width="390"
        height="480"
        viewBox="0 0 390 480"
        {...x}
        xmlns="http://www.w3.org/2000/svg"
        css={{ mixBlendMode: isBlendLayer ? "soft-light" : undefined }}
      >
        {isBlendLayer ? (
          <g>
            <path d="M125.41 0H0V232.84L125.312 305.189L125.41 0Z" />
            <path
              d="M0 457.663V232.63L194.812 345.188L0 457.663Z"
              fillOpacity={isBlendLayer ? 0.8 : 1}
            />
            <path
              d="M264.205 480H0V457.426L264.205 305V480Z"
              fillOpacity={isBlendLayer ? 0.6 : 1}
            />
            <path
              d="M389.999 297.503V480H264.012L264.094 224.811L389.999 297.503Z"
              fillOpacity={isBlendLayer ? 0.4 : 1}
            />
            <path
              d="M390 297.712V71.9937L194.594 184.811L390 297.712Z"
              fillOpacity={isBlendLayer ? 0.2 : 1}
            />
            <path
              d="M390 72.2337V0H125.205V225L390 72.2337Z"
              fill-opacity={isBlendLayer ? 0 : 1}
            />
          </g>
        ) : (
          <clipPath id="clipper">
            {" "}
            <path d="M125.41 0H0V232.84L125.312 305.189L125.41 0Z" />
            <path d="M0 457.663V232.63L194.812 345.188L0 457.663Z" />
            <path d="M264.205 480H0V457.426L264.205 305V480Z" />
            <path d="M389.999 297.503V480H264.012L264.094 224.811L389.999 297.503Z" />
            <path d="M390 297.712V71.9937L194.594 184.811L390 297.712Z" />
            <path d="M390 72.2337V0H125.205V225L390 72.2337Z" />
          </clipPath>
        )}
      </svg>
    </>
  );
}

const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      83.36% 63.12% at 50% 55.83%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    ),
    #34685d;
  clip-path: url("#clipper");
`;
