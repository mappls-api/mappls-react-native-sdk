import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function MapEventIcon(props:SvgProps) {
  return (
   <Svg
      width={33}
      height={32}
      viewBox="0 0 33 32"
      fill="none"
      {...props}
    >
      <Path
        d="M16.333 22.667c.378 0 .695-.128.95-.384a1.29 1.29 0 00.384-.95 1.29 1.29 0 00-.384-.95 1.29 1.29 0 00-.95-.383 1.29 1.29 0 00-.95.383 1.29 1.29 0 00-.383.95c0 .378.128.695.383.95.256.256.573.384.95.384zM15 17.333h2.667v-8H15v8zM11.333 28l-7-7V11l7-7h10l7 7v10l-7 7h-10zm1.134-2.667H20.2l5.467-5.466v-7.734L20.2 6.667h-7.733L7 12.133v7.734l5.467 5.466z"
        fill="#21D0B2"
      />
    </Svg>
  )
}


