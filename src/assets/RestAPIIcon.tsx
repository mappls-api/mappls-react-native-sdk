import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function RestAPIIcon(props:SvgProps) {
  return (
   <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M7.8 16.8L3 12l4.8-4.8 1.867 1.9-2.9 2.9 2.9 2.9L7.8 16.8zm9.067 0L15 14.9l2.9-2.9L15 9.1l1.867-1.9 4.8 4.8-4.8 4.8zM3 24a2.568 2.568 0 01-1.883-.783 2.568 2.568 0 01-.784-1.884V16H3v5.333h5.333V24H3zm13.333 0v-2.667h5.334V16h2.666v5.333c0 .734-.26 1.361-.783 1.884a2.568 2.568 0 01-1.883.783h-5.334zm-16-16V2.667c0-.734.261-1.361.784-1.884A2.568 2.568 0 013 0h5.333v2.667H3V8H.333zm21.334 0V2.667h-5.334V0h5.334c.733 0 1.36.261 1.883.783.522.523.783 1.15.783 1.884V8h-2.666z"
        fill="#21D0B2"
      />
    </Svg>
  )
}


