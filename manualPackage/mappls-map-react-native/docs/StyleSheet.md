## StyleSheet

### Style functions

#### zoom based expressions (replaces camera(stops[, interpolationMode]))

This is a value function defining a style value that changes as the zoom level changes. The layout and paint attribute properties of the layer can be set to style function objects. Use a camera function to create the illusion of depth and control data density.

new:
```js
// color would change based on zoom level keys.
[
  'interpolate',
  ['exponential', 1.5],
  ['zoom'],
  0, 'blue',
  10, 'green',
  20, 'yellow'
];

// Example of use inside stylesheet
{
  fillColor: [
    'step',
    ['zoom'],
    'blue',
    20, 'green'
  ]
}
```

old:
```js
// color would change based on zoom level keys.
MapplsGL.StyleSheet.camera({
  0: 'blue',
  10: 'green',
  20: 'yellow',
}, MapplsGL.InterpolationMode.Exponential);

// Example of use inside stylesheet
MapplsGL.StyleSheet.create({
  fillColor: MapplsGL.StyleSheet.camera({
    15: 'blue',
    20: 'green',
  }, MapplsGL.InterpolationMode.Interval),
});
```

#### attribute based expressions (replaces source(stops, attributeName[, interpolationMode]))

This is a value function defining a style value that changes with its properties. The layout and paint attribute properties of the layer can be set to style function objects. Use source functions to visually differentate types of features within the same layer or create data visualizations.

new:
```js
// would color the layer based the property rating=[1, 5]
[
  'step',
  ['get', 'rating'],
  'red',
  2, 'orange',
  3, 'yellow',
  4, 'yellowgreen',
  5, 'green',
];

// Example of use inside stylesheet
{
  circleColor: [
    'step',
    ['get', 'rating'],
    'red',
    2, 'orange',
    3, 'yellow',
    4, 'yellowgreen',
    5, 'green',
  ],
}
```


old:
```js
// would color the layer based the property rating=[1, 5]
MapplsGL.StyleSheet.source([
  [1, 'red'],
  [2, 'orange'],
  [3, 'yellow'],
  [4, 'yellowgreen'],
  [5, 'green'],
], 'rating', MapplsGL.InterpolationMode.Categorical);

// Example of use inside stylesheet
MapplsGL.StyleSheet.create({
  circleColor: MapplsGL.StyleSheet.source([
    [1, 'red'],
    [2, 'orange'],
    [3, 'yellow'],
    [4, 'yellowgreen'],
    [5, 'green'],
  ], 'rating', MapplsGL.InterpolationMode.Categorical),
});
```

#### nested expressions (replaces composite(stops, attributeName[, interpolationMode]))

This is a value function defining a style value that changes with the feature attributes at each map zoom level. The layout and paint attribute properties of the layer can be set to style function objects. Use composite functions to allow the appearance of a map feature to change with both its attributes and the map zoom level. Note that support for composite functions is not yet complete in the Android/iOS SDK's.

new: 
```js
// would change based on the zoom level and rating value
// {zoom_level}: [{value}, {style_value}]
[
  'step',
  ['zoom'],
  [
    'step',
    ['get','rating'],
    0,
    5, 5
  ],
  20, [
    'step',
    ['get','rating'],
    0,
    5, 20
  ]
]

{
  circleRadius: [
    'step',
    ['zoom'],
    [ 'step',
      ['get','rating'],
      0,
      5, 5
    ],
    20, [ 'step',
          ['get','rating'],
          0,
          5, 20
        ],
]
};
```


old:
```js
// would change based on the zoom level and rating value
// {zoom_level}: [{value}, {style_value}]
MapplsGL.StyleSheet.composite({
  0: [0, 0],
  0: [5, 5],
  20: [0, 0],
  20: [5, 20],
}, 'rating', MapplsGL.InterpolationMode.Interval);

MapplsGL.StyleSheet.create({
  circleRadius: MapplsGL.StyleSheet.composite({
    0: [0, 0],
    0: [5, 5],
    20: [0, 0],
    20: [5, 20],
  }, 'rating', MapplsGL.InterpolationMode.Interval),
});
```

### Simple expressions 

#### ['get', attributeName] - replaces identity(attributeName)

This is just a source style function under the hood. For example say if you had a feature property with an attribute height. Identity means that it will just equal the attribute value, so there is no need to provide any stops

new: 
```js
{
  fillExtrusionHeight: ['get', 'height'],
}
```

old:

```js
MapplsGL.StyleSheet.create({
  fillExtrusionHeight: MapplsGL.StyleSheet.identity('height'),
});
```

### StyleSheet Examples


#### new:

```js
const styles = {
  buildings: {
    fillColor: 'blue',
  },
  street: {
    lineColor: 'green',
  }
};

...

<MapplsGL.FillLayer ... style={styles.buildings} />
<MapplsGL.FillLayer ... style={styles.street} />
```

```js
const layerStyles = {
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
  },

  clusteredPoints: {
    circleColor: [
      'interpolate',
      ['exponential', 1.5],
      ['get','point_count'],
      25, 'yellow',
      50, 'red',
      75, 'blue',
      100, 'orange',
      300, 'pink',
      750, 'white',
    ],

    circleRadius: [
      'interpolate',
      ['exponential', 1.5],
      ['get','point_count'],
      [0, 15],
      [100, 20],
      [750, 30],
    ],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: ['get', 'point_count'],
    textSize: 12,
  },
});

...

<MapplsGL.SymbolLayer
  id='pointCount'
  style={layerStyles.clusterCount} />

<MapplsGL.CircleLayer
  id='clusteredPoints'
  belowLayerID='pointCount'
  filter={['has', 'point_count']}
  style={layerStyles.clusteredPoints} />

<MapplsGL.CircleLayer
  id='singlePoint'
  filter={['!has', 'point_count']}
  style={layerStyles.singlePoint} />
```

```javascript
const layerStyles = MapplsGL.StyleSheet.create({
  building: {
    fillExtrusionOpacity: 1,
    fillExtrusionHeight: ['get', 'height'],
    fillExtrusionBase: ['get', 'min_height'],
    fillExtrusionColor: [
      'interpolate',
      ['exponential', 1.5],
      ['get', 'height'],
      [0, 'white'],
      [50, 'blue'],
      [100, 'red'],
     ],
    },
    fillExtrusionColorTransition: { duration: 2000, delay: 0 },
  },
  streets: {
    lineColor: 'blue',
    lineWidth: 2,
    lineOpacity: 0.50,
    lineJoin: MapplsGL.LineJoin.Round,
    lineCap: MapplsGL.LineCap.Round,
    lineDasharray: [2, 2],
  },
});

...

<MapplsGL.FillExtrusionLayer
  id='building3d'
  sourceLayerID='building'
  style={layerStyles.building} />

<MapplsGL.LineLayer
  id='streetLineColor'
  sourceLayerID='road'
  minZoomLevel={14}
  belowLayerID='building3d'
  style={layerStyles.streets} />
```

#### old:

```js
const styles = MapplsGL.StyleSheet.create({
  buildings: {
    fillColor: 'blue',
  },
  street: {
    lineColor: 'green',
  }
});

...

<MapplsGL.FillLayer ... style={styles.buildings} />
<MapplsGL.FillLayer ... style={styles.street} />
```

```js
const layerStyles = MapplsGL.StyleSheet.create({
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
  },

  clusteredPoints: {
    circleColor: MapplsGL.StyleSheet.source([
      [25, 'yellow'],
      [50, 'red'],
      [75, 'blue'],
      [100, 'orange'],
      [300, 'pink'],
      [750, 'white'],
    ], 'point_count', MapplsGL.InterpolationMode.Exponential),

    circleRadius: MapplsGL.StyleSheet.source([
      [0, 15],
      [100, 20],
      [750, 30],
    ], 'point_count', MapplsGL.InterpolationMode.Exponential),

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
  },
});

...

<MapplsGL.SymbolLayer
  id='pointCount'
  style={layerStyles.clusterCount} />

<MapplsGL.CircleLayer
  id='clusteredPoints'
  belowLayerID='pointCount'
  filter={['has', 'point_count']}
  style={layerStyles.clusteredPoints} />

<MapplsGL.CircleLayer
  id='singlePoint'
  filter={['!has', 'point_count']}
  style={layerStyles.singlePoint} />
```

```javascript
const layerStyles = MapplsGL.StyleSheet.create({
  building: {
    fillExtrusionOpacity: 1,
    fillExtrusionHeight: MapplsGL.StyleSheet.identity('height'),
    fillExtrusionBase: MapplsGL.StyleSheet.identity('min_height'),
    fillExtrusionColor: MapplsGL.StyleSheet.source([
      [0, 'white'],
      [50, 'blue'],
      [100, 'red'],
    ], 'height', MapplsGL.InterpolationMode.Exponential),
    fillExtrusionColorTransition: { duration: 2000, delay: 0 },
  },
  streets: {
    lineColor: 'blue',
    lineWidth: 2,
    lineOpacity: 0.50,
    lineJoin: MapplsGL.LineJoin.Round,
    lineCap: MapplsGL.LineCap.Round,
    lineDasharray: [2, 2],
  },
});

...

<MapplsGL.FillExtrusionLayer
  id='building3d'
  sourceLayerID='building'
  style={layerStyles.building} />

<MapplsGL.LineLayer
  id='streetLineColor'
  sourceLayerID='road'
  minZoomLevel={14}
  belowLayerID='building3d'
  style={layerStyles.streets} />
```

