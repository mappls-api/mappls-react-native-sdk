import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function MapLayerIcon(props:SvgProps) {
  return (
   <Svg
      width={30}
      height={28}
      viewBox="0 0 30 28"
      fill="none"
      {...props}
    >
      <Path
        d="M15 16.667l-14.667-8L15 .667l14.667 8-14.667 8zM15 22L1.1 14.433 3.9 12.9 15 18.967 26.1 12.9l2.8 1.533L15 22zm0 5.333L1.1 19.767l2.8-1.534L15 24.3l11.1-6.067 2.8 1.534L15 27.333zm0-13.7l9.1-4.966L15 3.7 5.9 8.667l9.1 4.966z"
        fill="#21D0B2"
      />
    </Svg>
  )
}


