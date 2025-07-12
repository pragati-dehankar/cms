import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

const font = fetch(new URL("./Lato-BlackItalic.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export async function GET(request) {
  try {
    const {searchParams}=new URL(request.url)
        const title=searchParams.get('title').charAt(0).toUpperCase()+searchParams.get("title").slice(1) ||"cms"

    return new ImageResponse(
      (
        <div
        tw="flex text-white px-20 py-[70px] w-full h-full justify-between flex-col"
          style={{
            backgroundColor:"black"
          }}
        >
          {/* Inline Google Logo */}
          <svg
            width={70}
            height={70}
            viewBox="0 0 0.8 0.8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              fill="#4285F4"
              d="M0.745 0.408c0 -0.024 -0.002 -0.048 -0.006 -0.071h-0.332v0.135h0.19a0.162 0.162 0 0 1 -0.07 0.106v0.088h0.113c0.067 -0.061 0.105 -0.151 0.105 -0.258"
            />
            <path
              fill="#34A853"
              d="M0.407 0.75c0.095 0 0.175 -0.031 0.233 -0.085l-0.113 -0.087c-0.032 0.021 -0.072 0.033 -0.12 0.033 -0.092 0 -0.17 -0.062 -0.198 -0.144H0.093v0.09A0.352 0.352 0 0 0 0.407 0.75"
            />
            <path
              fill="#FBBC04"
              d="M0.209 0.467a0.209 0.209 0 0 1 0 -0.134V0.243H0.092a0.349 0.349 0 0 0 0 0.314z"
            />
            <path
              fill="#EA4335"
              d="M0.407 0.189a0.192 0.192 0 0 1 0.135 0.053l0.1 -0.1a0.34 0.34 0 0 0 -0.236 -0.091 0.352 0.352 0 0 0 -0.315 0.193L0.209 0.333c0.028 -0.083 0.106 -0.145 0.198 -0.145z"
            />
          </svg>

          {/* Title */}
          <h1
          tw="text-80px"
            style={{
              textShadow:'0 2px 2px #000',
              backgroundImage:"linear-gradient(90deg,#fff 40%, #aaa)",
              backgroundClip:"text",
            }}
          >
            {title}
          </h1>

          <h2>Powered by cms</h2>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Lato-BlackItalic",
            data: await font,
            style: "italic",
          },
        ],
      }
    );
  } catch (error) {
    console.error("OG generation failed:", error);
    return NextResponse.json(
      { message: "Failed to generate the OG image" },
      { status: 500 }
    );
  }
}
