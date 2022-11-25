[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Camera
## MapplsGL.Camera

  

### props
  | Prop | Type | Default | Required | Description |
| ---- | :--: | :-----: | :------: | :----------: |
| animationDuration | `number` | `2000` | `false` | The duration a camera update takes (in ms)|
| animationMode | `enum` | `'easeTo'` | `false` | The animationstyle when the camara updates. One of; `flyTo`, `easeTo`, `moveTo` |
| defaultSettings | `shape` | `none` | `false` | Default view settings applied on camera |
| &nbsp;&nbsp;heading | `number` | `none` | `false` | Heading on map |
| &nbsp;&nbsp;pitch | `number` | `none` | `false` | Pitch on map |
| &nbsp;&nbsp;bounds | `shape` | `none` | `false` | Represents a rectangle in geographical coordinates marking the visible area of the map. |
| &nbsp;&nbsp;&nbsp;&nbsp;ne | `array` | `none` | `true` | northEastCoordinates - North east coordinate of bound |
| &nbsp;&nbsp;&nbsp;&nbsp;sw | `array` | `none` | `true` | southWestCoordinates - North east coordinate of bound |
| &nbsp;&nbsp;&nbsp;&nbsp;paddingLeft | `number` | `none` | `false` | Left camera padding for bounds |
| &nbsp;&nbsp;&nbsp;&nbsp;paddingRight | `number` | `none` | `false` | Right camera padding for bounds |
| &nbsp;&nbsp;&nbsp;&nbsp;paddingTop | `number` | `none` | `false` | Top camera padding for bounds |
| &nbsp;&nbsp;&nbsp;&nbsp;paddingBottom | `number` | `none` | `false` | Bottom camera padding for bounds |
| &nbsp;&nbsp;zoomLevel | `number` | `none` | `false` | Zoom level of the map |
| centerCoordinate | `array` | `none` | `false` | Center coordinate on map [lng, lat] |
| centerMapplsPin| `string` | `none` | `false` | Center Mappls Pin on map  |
| zoomLevel | `number` | `none` | `false` | Zoom level of the map |
| minZoomLevel | `number` | `none` | `false` | Min Zoom Preference |
| maxZoomLevel | `number` | `none` | `false` | Maximum Zoom Preference |
| maxBounds | `shape` | `none` | `false` | Restrict map panning so that the center is within these bounds |
| &nbsp;&nbsp;ne | `array` | `none` | `true` | northEastCoordinates - North east coordinate of bound |
| &nbsp;&nbsp;sw | `array` | `none` | `true` | southWestCoordinates - South west coordinate of bound |
| followUserLocation | `bool` | `none` | `false` | Should the map orientation follow the user's. |
| followUserMode | `enum` | `none` | `false` | The mode used to track the user location on the map. One of; "normal", "compass", "course". Each mode string is also available as a member on the `MapmyIndiaGL.UserTrackingModes` object. `Follow` (normal), `FollowWithHeading` (compass), `FollowWithCourse` (course). NOTE: `followUserLocation` must be set to `true` for any of the modes to take effect|
| followZoomLevel | `number` | `none` | `false` | The zoomLevel on map while followUserLocation is set to `true` |
| followPitch | `number` | `none` | `false` | The pitch on map while followUserLocation is set to `true` |
| followHeading | `number` | `none` | `false` | The heading on map while followUserLocation is set to `true` |
| triggerKey | `any` | `none` | `false` | Manually update the camera - helpful for when props did not update, however you still want the camera to move |
| onUserTrackingModeChange | `func` | `none` | `false` | When tracking mode is changed | 

  

### methods

#### fitBounds(northEastCoordinates, southWestCoordinates[, padding][, animationDuration])

  

Map camera transitions to fit provided bounds

  

##### arguments


| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `northEastCoordinates` | `Array` | `Yes` | North east coordinate of bound |
| `southWestCoordinates` | `Array` | `Yes` | South west coordinate of bound |
| `padding` | `Number` | `No` | Camera padding for bound |
| `animationDuration` | `Number` | `No` | Duration of camera animation |

  
  
  

```javascript

this.camera.fitBounds([lng, lat], [lng, lat])

this.camera.fitBounds([lng, lat], [lng, lat], 20, 1000) // padding for all sides

this.camera.fitBounds([lng, lat], [lng, lat], [verticalPadding, horizontalPadding], 1000)

this.camera.fitBounds([lng, lat], [lng, lat], [top, right, bottom, left], 1000)

```

#### flyTo(coordinates, animationDuration])
Map camera will fly to new coordinate
##### arguments

| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `coordinates` | `Array` | `Yes` | Coordinates that map camera will jump too |
| `animationDuration` | `Number` | `No` | Duration of camera animation |

```javascript
this.camera.flyTo([lng, lat])
this.camera.flyTo([lng, lat], 12000)
```
#### flyWithMapplsPin(mapplsPin, animationDuration])
Map camera will fly to new coordinate
##### arguments

| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `mapplsPin` | `string` | `Yes` | Coordinates that map camera will jump too |
| `animationDuration` | `Number` | `No` | Duration of camera animation |

```javascript
this.camera.flyWithMapplsPin("MMI000")
this.camera.flyWithMapplsPin("MMI000", 12000)
```



#### moveTo(coordinates, animationDuration)

Map camera will move to new coordinate at the same zoom level
##### arguments


| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `coordinates` | `Array` | `Yes` | Coordinates that map camera will move too |
| `animationDuration` | `Number` | `No` | Duration of camera animation |
```javascript

this.camera.moveTo([lng, lat], 200) // eases camera to new location based on duration

this.camera.moveTo([lng, lat]) // snaps camera to new location without any easing

```
#### moveWithMapplsPin(mapplsPin, animationDuration)

Map camera will move to new coordinate at the same zoom level
##### arguments


| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `mapplsPin` | `string` | `Yes` | Coordinates that map camera will move too |
| `animationDuration` | `Number` | `No` | Duration of camera animation |
```javascript

this.camera.moveWithMapplsPin("MMI000", 200) // eases camera to new location based on duration

this.camera.moveWithMapplsPin("MMI000") // snaps camera to new location without any easing

```

#### zoomTo(zoomLevel[, animationDuration])

  

Map camera will zoom to specified level

  

##### arguments

| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `zoomLevel` | `Number` | `Yes` | Zoom level that the map camera will animate too |
| `animationDuration` | `Number` | `No` | Duration of camera animation |

  
  
  

```javascript

this.camera.zoomTo(16)

this.camera.zoomTo(16, 100)

```

  
  

#### setCamera(config)

  

Map camera will perform updates based on provided config. Advanced use only!

  

##### arguments

| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `config` | `Object` | `Yes` | Camera configuration |

  
  
  

```javascript

this.camera.setCamera({

centerCoordinate: [lng, lat],

zoomLevel: 16,

animationDuration: 2000,

})

  

this.camera.setCamera({

stops: [

{ pitch: 45, animationDuration: 200 },

{ heading: 180, animationDuration: 300 },

]

})

```

 
<br><br><br>

For any queries and support, please contact: 

[<img src="https://about.mappls.com/images/mappls-logo.svg" height="40"/> </p>](https://about.mappls.com/api/)
Email us at [apisupport@mappls.com](mailto:apisupport@mappls.com)


![](https://www.mapmyindia.com/api/img/icons/support.png)
[Support](https://about.mappls.com/contact/)
Need support? contact us!

<br></br>
<br></br>

[<p align="center"> <img src="https://www.mapmyindia.com/api/img/icons/stack-overflow.png"/> ](https://stackoverflow.com/questions/tagged/mappls-api)[![](https://www.mapmyindia.com/api/img/icons/blog.png)](https://about.mappls.com/blog/)[![](https://www.mapmyindia.com/api/img/icons/gethub.png)](https://github.com/Mappls-api)[<img src="https://mmi-api-team.s3.ap-south-1.amazonaws.com/API-Team/npm-logo.one-third%5B1%5D.png" height="40"/> </p>](https://www.npmjs.com/org/mapmyindia) 



[<p align="center"> <img src="https://www.mapmyindia.com/june-newsletter/icon4.png"/> ](https://www.facebook.com/Mapplsofficial)[![](https://www.mapmyindia.com/june-newsletter/icon2.png)](https://twitter.com/mappls)[![](https://www.mapmyindia.com/newsletter/2017/aug/llinkedin.png)](https://www.linkedin.com/company/mappls/)[![](https://www.mapmyindia.com/june-newsletter/icon3.png)](https://www.youtube.com/channel/UCAWvWsh-dZLLeUU7_J9HiOA)




<div align="center">@ Copyright 2022 CE Info Systems Ltd. All Rights Reserved.</div>

<div align="center"> <a href="https://about.mappls.com/api/terms-&-conditions">Terms & Conditions</a> | <a href="https://about.mappls.com/about/privacy-policy">Privacy Policy</a> | <a href="https://about.mappls.com/pdf/mapmyIndia-sustainability-policy-healt-labour-rules-supplir-sustainability.pdf">Supplier Sustainability Policy</a> | <a href="https://about.mappls.com/pdf/Health-Safety-Management.pdf">Health & Safety Policy</a> | <a href="https://about.mappls.com/pdf/Environment-Sustainability-Policy-CSR-Report.pdf">Environmental Policy & CSR Report</a>

<div align="center">Customer Care: +91-9999333223</div> 
  