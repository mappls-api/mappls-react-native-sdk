import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function LocationIcon(props:SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M23.333 0l-.213.04L16 2.8 8 0 .48 2.533a.672.672 0 00-.48.64v20.16A.66.66 0 00.667 24l.213-.04L8 21.2l8 2.8 7.52-2.533a.672.672 0 00.48-.64V.667A.66.66 0 0023.333 0zm-14 3.293l5.334 1.867v15.547L9.333 18.84V3.293zm-6.666 1.32l4-1.346v15.6l-4 1.546v-15.8zm18.666 14.774l-4 1.346V5.147l4-1.547v15.787z"
        fill="#21D0B2"
      />
    </Svg>
  )
}


