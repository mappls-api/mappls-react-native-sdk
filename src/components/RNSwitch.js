import React from 'react'
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class RNSwitch extends React.Component{

    render(){
        return (
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={style.label}>{this.props.label}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={this.props.value ? '#81b0ff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.props.onValueChange}
              value={this.props.value}
            />
          </View>
        );
    }
}

const style = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});
export default RNSwitch;