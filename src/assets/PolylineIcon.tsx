import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function PolylineIcon(props:SvgProps) {
  return (
    <Svg
      width={33}
      height={32}
      viewBox="0 0 33 32"
      fill="none"
      {...props}
    >
      <Path
        d="M20.667 29.333V26l-9.334-4.667H4.667v-8H10.4L14 9.2V2.667h8v8h-5.733l-3.6 4.133V19l8 4v-1.667h8v8h-8zM16.667 8h2.666V5.333h-2.666V8zM7.333 18.667H10V16H7.333v2.667zm16 8H26V24h-2.667v2.667z"
        fill="#21D0B2"
      />
    </Svg>
  )
}


