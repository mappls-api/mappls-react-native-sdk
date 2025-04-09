import React from 'react';
import PropTypes from 'prop-types';
import {NativeModules, requireNativeComponent} from 'react-native';

import {viewPropTypes,isFunction} from '../utils';
import {GeoAnalyticsLayerProp} from '../utils/styleMap';
import AbstractLayer from './AbstractLayer';

export const NATIVE_MODULE_NAME = 'RCTMGLGeoAnalytics';

/**
 * GeoAnalytics is a style layer that renders one or more GeoAnalytics on the map.
 */
class GeoAnalyticsLayer extends AbstractLayer {


  constructor(props){
    super(props);
    //this._onPress = this._onPress.bind(this);
  }

  static propTypes = {
    ...viewPropTypes,

     showGeoAnalytics: PropTypes.oneOf([0,1,2,3,4,5,6,7,8,9,10,11,12]),
    // geoBound:PropTypes.array.isRequired,
     geoboundType:PropTypes.string.isRequired,
     layerRequest:PropTypes.array.isRequired,
     
    //  propertyNames:PropTypes.array.isRequired,
    //  attribute:PropTypes.string,

    //  /**
    //   * isRequired if attribute is provided.
    //   */
    //  query:PropTypes.string,
  
    // /**
    //  * Customizable style attributes
    //  */
    // styles: GeoAnalyticsLayerProp,
  };

  // _onPress(e) {
  //   if (isFunction(this.props.onPress)) {
  //     this.props.onPress(e.nativeEvent.payload);
  //   }
  // }

  render() {
    // const callbacks = {
    //   onPress: this._onPress,
    // };

    const props = {
      ...this.baseProps,
      sourceLayerID: this.props.sourceLayerID,
    };
    return <RCTMGLGeoAnalyticsLayer ref="nativeLayer" {...props} />;
  }
}

const RCTMGLGeoAnalyticsLayer = requireNativeComponent(NATIVE_MODULE_NAME, GeoAnalyticsLayer, {
  nativeOnly: {reactStyle: true},
});

GeoAnalyticsLayer.MapplsGeoAnalyticsType = {
  STATE: 0,
  DISTRICT: 1,
  SUB_DISTRICT: 2,
  TOWN: 3,
  CITY: 4,
  PINCODE: 5,
  WARD: 6,
  LOCALITY: 7,
  PANCHAYAT: 8,
  BLOCK: 9,
  VILLAGE: 10,
  SUB_LOCALITY: 11,
  SUB_SUB_LOCALITY: 12,
};


export default GeoAnalyticsLayer;
