import React from 'react';
import { View,Text ,StyleSheet} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

 export default class RadioGroups extends React.Component{



    render(){
        return (
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ flex: 1, ...style.label }}>{this.props.label}</Text>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignContent: 'flex-end',
              }}
            >
              <RadioButtonRN
                box={false}
                data={this.props.data}
                initial={this.props.index}
                selectedBtn={this.props.callback}
              />
            </View>
          </View>
        );
    }


}

const style = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});