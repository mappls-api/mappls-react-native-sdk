import React, {Component, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import GeoFenceSettings from '../singletons/GeoFenceSettings';
import {ColorPicker} from 'react-native-color-picker';
import CheckBox from '@react-native-community/checkbox';
import MapplsGeoFence from 'mappls-geofence-widget-react-native';

const GeofenceSettingsComponent = () => {
  const [circleWidthOutline, setCircleWidthOutline] = useState(
    GeoFenceSettings.getInstance().circleOutlineWidth.toString(),
  );
  const [circleFillColor, setCircleFillColor] = useState(
    GeoFenceSettings.getInstance().circleFillColor,
  );
  const [circleFillOutlineColor, setCircleFillOutlineColor] = useState(
    GeoFenceSettings.getInstance().circleFillOutlineColor,
  );
  const [draggingLineColor, setDraggingLineColor] = useState(
    GeoFenceSettings.getInstance().draggingLineColor,
  );
  const [isShowDraggingLineColor, showDraggingLineColor] = useState(false);
  const [isShowcCircleFillColorPicker, showCircleFillColorPicker] = useState(
    false,
  );
  const [
    isShowcCircleFillOutlineColorPicker,
    showCircleFillOutlineColorPicker,
  ] = useState(false);
  const [maxRadius, setMaxRadius] = useState(
    GeoFenceSettings.getInstance().maxRadius.toString(),
  );
  const [minRadius, setMinRadius] = useState(
    GeoFenceSettings.getInstance().minRadius.toString(),
  );
  const [polygonDrawingLineColor, setPolygonDrawingLineColor] = useState(
    GeoFenceSettings.getInstance().polygonDrawingLineColor,
  );
  const [isShowPolygonDrawingLineColor, showPolygonDrawingLineColor] = useState(
    false,
  );
  const [polygonFillColor, setPolygonFillColor] = useState(
    GeoFenceSettings.getInstance().polygonFillColor,
  );
  const [isShowPolygonFillColor, showPolygonFillColor] = useState(false);
  const [polygonFillOutlineColor, setPolygonFillOutlineColor] = useState(
    GeoFenceSettings.getInstance().polygonFillOutlineColor,
  );
  const [isShowPolygonFillOutlineColor, showPolygonFillOutlineColor] = useState(
    false,
  );
  const [polygonWidthOutline, setPolygonWidthOutline] = useState(
    GeoFenceSettings.getInstance().polygonOutlineWidth.toString(),
  );
  const [isTapMode, setTapMode] = useState(
    GeoFenceSettings.getInstance().polygonCreationMode ==
    MapplsGeoFence.POLYGON_CREATION_MODE_TAP,
  );
  const [isDrawMode, setDrawMode] = useState(
    GeoFenceSettings.getInstance().polygonCreationMode !=
    MapplsGeoFence.POLYGON_CREATION_MODE_TAP,
  );
  const [toolbarTitle, setToolbarTitle] = useState(
    GeoFenceSettings.getInstance().toolbarTitle,
  );
  const [toolbarColor, setToolbarColor] = useState(
    GeoFenceSettings.getInstance().toolbarColor,
  );
  const [isShowToolbarColor, showToolbarColor] = useState(false);
  const [toolbarTintColor, setToolbarTintColor] = useState(
    GeoFenceSettings.getInstance().toolbarTintColor,
  );
  const [isShowToolbarTintColor, showToolbarTintColor] = useState(false);
  const [isSimplifyOnIntersection, simplifyOnIntersection] = useState(
    GeoFenceSettings.getInstance().simplifyOnIntersection,
  );
  const [isUpdateType, updateType] = useState(
    GeoFenceSettings.getInstance().initialiseGeoFence.isPolygon,
  );

  const Picker = (showPicker, color, callback) =>
    showPicker ? (
      <ColorPicker
        defaultColor={color}
        onColorSelected={callback}
        style={{height: 200}}
      />
    ) : null;

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 20, marginTop: 10}}>
          Circle Outline width:{' '}
        </Text>
        <TextInput
          style={{height: 20, marginLeft: 10}}
          placeholder="Circle Outline Width"
          keyboardType="number-pad"
          placeholderTextColor="#a9a9a9"
          style={{color: 'black'}}
          maxLength={1}
          onChangeText={text => {
            if (text != '') {
              GeoFenceSettings.getInstance().circleOutlineWidth = parseInt(
                text,
              );
            }
            setCircleWidthOutline(text);
          }}
          defaultValue={circleWidthOutline}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Circle Fill Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showCircleFillColorPicker(true);
          }}>
          <Text>{circleFillColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowcCircleFillColorPicker,
        GeoFenceSettings.getInstance().circleFillColor,
        color => {
          showCircleFillColorPicker(false),
            (GeoFenceSettings.getInstance().circleFillColor = color),
            setCircleFillColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Circle Fill Outline Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showCircleFillOutlineColorPicker(true);
          }}>
          <Text>{circleFillOutlineColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowcCircleFillOutlineColorPicker,
        GeoFenceSettings.getInstance().circleFillOutlineColor,
        color => {
          showCircleFillOutlineColorPicker(false),
            (GeoFenceSettings.getInstance().circleFillOutlineColor = color),
            setCircleFillOutlineColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Dragging Line Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showDraggingLineColor(true);
          }}>
          <Text>{draggingLineColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowDraggingLineColor,
        GeoFenceSettings.getInstance().draggingLineColor,
        color => {
          showDraggingLineColor(false),
            (GeoFenceSettings.getInstance().draggingLineColor = color),
            setDraggingLineColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 20, marginTop: 10}}>Max Radius: </Text>
        <TextInput
          style={{height: 20, marginLeft: 10}}
          placeholder="Max Radius"
          keyboardType="number-pad"
          placeholderTextColor="#a9a9a9"
          style={{color: 'black'}}
          maxLength={5}
          onChangeText={text => {
            if (text != '') {
              GeoFenceSettings.getInstance().maxRadius = parseInt(text);
            }
            setMaxRadius(text);
          }}
          defaultValue={maxRadius}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 20, marginTop: 10}}>Min Radius: </Text>
        <TextInput
          style={{height: 20, marginLeft: 10}}
          placeholder="Min Radius"
          keyboardType="number-pad"
          placeholderTextColor="#a9a9a9"
          style={{color: 'black'}}
          maxLength={5}
          onChangeText={text => {
            if (text != '') {
              GeoFenceSettings.getInstance().minRadius = parseInt(text);
            }
            setMinRadius(text);
          }}
          defaultValue={minRadius}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Polygon Drawing Line Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showPolygonDrawingLineColor(true);
          }}>
          <Text>{polygonDrawingLineColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowPolygonDrawingLineColor,
        GeoFenceSettings.getInstance().polygonDrawingLineColor,
        color => {
          showPolygonDrawingLineColor(false),
            (GeoFenceSettings.getInstance().polygonDrawingLineColor = color),
            setPolygonDrawingLineColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Polygon Fill Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showPolygonFillColor(true);
          }}>
          <Text>{polygonFillColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowPolygonFillColor,
        GeoFenceSettings.getInstance().polygonFillColor,
        color => {
          showPolygonFillColor(false),
            (GeoFenceSettings.getInstance().polygonFillColor = color),
            setPolygonFillColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Polygon Fill Outline Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showPolygonFillOutlineColor(true);
          }}>
          <Text>{polygonFillOutlineColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowPolygonFillOutlineColor,
        GeoFenceSettings.getInstance().polygonFillOutlineColor,
        color => {
          showPolygonFillOutlineColor(false),
            (GeoFenceSettings.getInstance().polygonFillOutlineColor = color),
            setPolygonFillOutlineColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 20, marginTop: 10}}>
          Polygon Outline width:{' '}
        </Text>
        <TextInput
          style={{height: 20, marginLeft: 10}}
          placeholder="Polygon Outline Width"
          keyboardType="number-pad"
          placeholderTextColor="#a9a9a9"
          style={{color: 'black'}}
          maxLength={1}
          onChangeText={text => {
            if (text != '') {
              GeoFenceSettings.getInstance().polygonOutlineWidth = parseInt(
                text,
              );
            }
            setPolygonWidthOutline(text);
          }}
          defaultValue={polygonWidthOutline}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 20, alignItems: 'center'}}>
          Polygon Creation Mode:{' '}
        </Text>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              value={isDrawMode}
              onValueChange={value => {
                setDrawMode(value);
                GeoFenceSettings.getInstance().polygonCreationMode =
                  MapplsGeoFence.POLYGON_CREATION_MODE_DRAW;
                setTapMode(!value);
              }}
            />
            <View style={{width: 4}} />
            <Text>Draw</Text>
          </View>
          <View style={{height: 5}} />
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              value={isTapMode}
              onValueChange={value => {
                setDrawMode(!value);
                GeoFenceSettings.getInstance().polygonCreationMode =
                  MapplsGeoFence.POLYGON_CREATION_MODE_TAP;
                setTapMode(value);
              }}
            />
            <View style={{width: 4}} />
            <Text>Tap</Text>
          </View>
        </View>
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 20, marginTop: 10}}>Toolbar Title: </Text>
        <TextInput
          style={{height: 20, marginLeft: 10}}
          placeholder="Toolbar Title"
          placeholderTextColor="#a9a9a9"
          style={{color: 'black'}}
          onChangeText={text => {
            if (text != '') {
              GeoFenceSettings.getInstance().toolbarTitle = text;
            }
            setToolbarTitle(text);
          }}
          defaultValue={toolbarTitle}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Toolbar Background Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showToolbarColor(true);
          }}>
          <Text>{toolbarColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowToolbarColor,
        GeoFenceSettings.getInstance().toolbarColor,
        color => {
          showToolbarColor(false),
            (GeoFenceSettings.getInstance().toolbarColor = color),
            setToolbarColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text style={{height: 40, alignItems: 'center'}}>
          Toolbar Title Text Color:{' '}
        </Text>
        <TouchableOpacity
          style={{height: 40, marginLeft: 10}}
          onPress={() => {
            showToolbarTintColor(true);
          }}>
          <Text>{toolbarTintColor}</Text>
        </TouchableOpacity>
      </View>

      {Picker(
        isShowToolbarTintColor,
        GeoFenceSettings.getInstance().toolbarTintColor,
        color => {
          showToolbarTintColor(false),
            (GeoFenceSettings.getInstance().toolbarTintColor = color),
            setToolbarTintColor(color);
        },
      )}
      <View style={{height: 2, backgroundColor: 'black'}} />

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text>Simplify Polygon On Intersection: </Text>
        <CheckBox
          value={isSimplifyOnIntersection}
          onValueChange={value => {
            simplifyOnIntersection(value);
            GeoFenceSettings.getInstance().simplifyOnIntersection = value;
          }}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />

      <Text style={{margin: 10}}>Select Initial Geofence Type</Text>

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          margin: 5,
        }}>
        <Text>Polygon: </Text>
        <CheckBox
          value={isUpdateType}
          onValueChange={value => {
            updateType(value);
            GeoFenceSettings.getInstance().initialiseGeoFence = {
              isPolygon: value,
            };
          }}
        />
      </View>
      <View style={{height: 2, backgroundColor: 'black'}} />
    </ScrollView>
  );
};
export default GeofenceSettingsComponent;
