import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';

class Demo extends Component {
  setNavigationButton = routeName => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(routeName);
          }}>
          <Image
            style={{height: 25, width: 25, margin: 10}}
            source={require('../assets/settings.png')}
          />
        </TouchableOpacity>
      ),
    });
  };

  componentDidMount() {
    const {route} = this.props;
    switch (route.params.label) {
      case 'Direction Widget Example':
        this.setNavigationButton('Direction Settings');
        break;
      case 'Place Picker Example':
        this.setNavigationButton('PlacePicker Settings');
        break;
      case 'Geofence Example':
        this.setNavigationButton('Geofence Settings');
        break;
    }
  }
  render() {
    const {route} = this.props;
    const Compo = route.params?.Component;

    return <Compo />;
  }
}

export default Demo;
