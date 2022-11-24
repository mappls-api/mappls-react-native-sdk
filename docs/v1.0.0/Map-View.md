[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# MapView
## MapplsGL.MapView

### props
| Prop | Type | Default | Required | Description |
| ---- | :--: | :-----: | :------: | :----------: |
| contentInset | `union` | `none` | `false` | The distance from the edges of the map view’s frame to the edges of the map view’s logical viewport. |
| preferredFramesPerSecond | `number` | `none` | `false` | iOS: The preferred frame rate at which the map view is rendered.<br/>The default value for this property is MGLMapViewPreferredFramesPerSecondDefault,<br/>which will adaptively set the preferred frame rate based on the capability of<br/>the user’s device to maintain a smooth experience. This property can be set to arbitrary integer values.<br/><br/>Android: The maximum frame rate at which the map view is rendered, but it can't excess the ability of device hardware.<br/>This property can be set to arbitrary integer values. |
| zoomEnabled | `bool` | `none` | `false` | Enable/Disable zoom on the map |
| scrollEnabled | `bool` | `true` | `false` | Enable/Disable scroll on the map |
| pitchEnabled | `bool` | `true` | `false` | Enable/Disable pitch on map |
| rotateEnabled | `bool` | `true` | `false` | Enable/Disable rotation on map |
| compassEnabled | `bool` | `none` | `false` | Enable/Disable the compass from appearing on the map |
| compassViewPosition | `string` | `none` | `false` | Position the compass on a corner of the map |
| compassViewMargins | `object` | `none` | `false` | Add margins to the compass with x and y values |
| surfaceView | `bool` | `false` | `false` | [Android only] Enable/Disable use of GLSurfaceView insted of TextureView. |
| mapplsStyle | `string` | `none` | `false` |  Set Mappls Style. |
| onPress | `func` | `none` | `false` | Map press listener, gets called when a user presses the map |
| onLongPress | `func` | `none` | `false` | Map long press listener, gets called when a user long presses the map |
| onRegionWillChange | `func` | `none` | `false` | This event is triggered whenever the currently displayed map region is about to change. |
| onRegionIsChanging | `func` | `none` | `false` | This event is triggered whenever the currently displayed map region is changing. |
| onRegionDidChange | `func` | `none` | `false` | This event is triggered whenever the currently displayed map region finished changing |
| onWillStartLoadingMap | `func` | `none` | `false` | This event is triggered when the map is about to start loading a new map style. |
| onDidFinishLoadingMap | `func` | `none` | `false` | This is triggered when the map has successfully loaded a new map style. |
| onDidFailLoadingMap | `func` | `none` | `false` | This event is triggered when the map has failed to load a new map style. |
| onWillStartRenderingFrame | `func` | `none` | `false` | This event is triggered when the map will start rendering a frame. |
| onDidFinishRenderingFrame | `func` | `none` | `false` | This event is triggered when the map finished rendering a frame. |
| onDidFinishRenderingFrameFully | `func` | `none` | `false` | This event is triggered when the map fully finished rendering a frame. |
| onWillStartRenderingMap | `func` | `none` | `false` | This event is triggered when the map will start rendering the map. |
| onDidFinishRenderingMap | `func` | `none` | `false` | This event is triggered when the map finished rendering the map. |
| onDidFinishRenderingMapFully | `func` | `none` | `false` | This event is triggered when the map fully finished rendering the map. |
| onUserLocationUpdate | `func` | `none` | `false` | This event is triggered when the user location is updated. |
| onDidFinishLoadingStyle | `func` | `none` | `false` | This event is triggered when a style has finished loading. |
| regionWillChangeDebounceTime | `number` | `10` | `false` | The emitted frequency of regionwillchange events |
| regionDidChangeDebounceTime | `number` | `500` | `false` | The emitted frequency of regiondidchange events |
| didLoadedMapplsMapsStyles | `func` | `none` | `false` | Provide list of Available Mappls Style |
| onMapError| `func` | `none` | `false` | This event is triggered when some error occurred during map loading.[For Details](https://github.com/mappls-api/mappls-android-sdk/blob/main/docs/v1.0.1/SDK-Error-code.md) | 

### methods
#### getPointInView(coordinate)

Converts a geographic coordinate to a point in the given view’s coordinate system.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `coordinate` | `Array` | `Yes` | A point expressed in the map view's coordinate system. |

```javascript
const pointInView = await this._map.getPointInView([-37.817070, 144.949901]);
```


#### getCoordinateFromView(point)

Converts a point in the given view’s coordinate system to a geographic coordinate.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `point` | `Array` | `Yes` | A point expressed in the given view’s coordinate system. |

```javascript
const coordinate = await this._map.getCoordinateFromView([100, 100]);
```


#### getVisibleBounds()

The coordinate bounds(ne, sw) visible in the users’s viewport.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |

```javascript
const visibleBounds = await this._map.getVisibleBounds();
```


#### queryRenderedFeaturesAtPoint(coordinate[, filter][, layerIDs])

Returns an array of rendered map features that intersect with a given point.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `coordinate` | `Array` | `Yes` | A point expressed in the map view’s coordinate system. |
| `filter` | `Array` | `No` | A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array. |
| `layerIDs` | `Array` | `No` | A array of layer id's to filter the features by |

```javascript
this._map.queryRenderedFeaturesAtPoint([30, 40], ['==', 'type', 'Point'], ['id1', 'id2'])
```


#### queryRenderedFeaturesInRect(bbox[, filter][, layerIDs])

Returns an array of rendered map features that intersect with the given rectangle,<br/>restricted to the given style layers and filtered by the given predicate.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `bbox` | `Array` | `Yes` | A rectangle expressed in the map view’s coordinate system. |
| `filter` | `Array` | `No` | A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array. |
| `layerIDs` | `Array` | `No` |  A array of layer id's to filter the features by |

```javascript
this._map.queryRenderedFeaturesInRect([30, 40, 20, 10], ['==', 'type', 'Point'], ['id1', 'id2'])
```


#### setCamera()

Map camera will perform updates based on provided config. Deprecated use Camera#setCamera.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |



#### takeSnap(writeToDisk)

Takes snapshot of map with current tiles and returns a URI to the image

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `writeToDisk` | `Boolean` | `Yes` | If true will create a temp file, otherwise it is in base64 |


#### getZoom()

Returns the current zoom of the map view.

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |

```javascript
const zoom = await this._map.getZoom();
```


#### getCenter()

Returns the map's geographical centerpoint

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |

```javascript
const center = await this._map.getCenter();
```


#### setSourceVisibility(visible, sourceId[, sourceLayerId])

Sets the visibility of all the layers referencing the specified `sourceLayerId` and/or `sourceId`

##### arguments
| Name | Type | Required | Description  |
| ---- | :--: | :------: | :----------: |
| `visible` | `boolean` | `Yes` | Visibility of the layers |
| `sourceId` | `String` | `Yes` | Identifier of the target source (e.g. 'composite') |
| `sourceLayerId` | `String` | `No` | Identifier of the target source-layer (e.g. 'building') |

```javascript
await this._map.setSourceVisibility(false, 'composite', 'building')
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

