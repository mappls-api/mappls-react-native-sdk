import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function WidgetsIcon(props:SvgProps) {
  return (
  <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M.667 18.667v2.666h8v-2.666h-8zm0-16v2.666H14V2.667H.667zM14 24v-2.667h10.667v-2.666H14V16h-2.667v8H14zM6 8v2.667H.667v2.666H6V16h2.667V8H6zm18.667 5.333v-2.666H11.333v2.666h13.334zm-8-5.333h2.666V5.333h5.334V2.667h-5.334V0h-2.666v8z"
        fill="#21D0B2"
      />
    </Svg>
  )
}


