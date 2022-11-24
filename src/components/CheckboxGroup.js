
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default class CheckboxGroup extends React.Component {

  state = {
    activeItemList: this.props.selectedItems,
    selectedItems: this.props.selectedItems
  }


  componentWillUnmount() {
    this.setState({
      activeItemList: [],
      selectedItems: []
    })
  }
  render() {

    const renderItem = ({ item }) => (
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Text>{item.label}</Text>
        <CheckBox
          disabled={false}
          value={this.state.selectedItems.includes(item.value)}
          onValueChange={(newValue) => {

            let arr = this.state.activeItemList
            if (item.value != undefined) {
              if (newValue === true) {
                if (!arr.includes(item.value)) {
                  arr = [...arr, item.value]
                }
              } else {
                if (arr.includes(item.value)) {
                  arr = arr.filter(items => items !== item.value)
                }
              }
            }
            this.setState({
              selectedItems:arr,
              activeItemList: arr
            })

            this.props.callback(arr)


          }}
        />
      </View>

    );

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
          <FlatList
            data={this.props.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {/* <SelectMultiple
            items={this.props.data}
            selectedItems={this.props.selectedItems}
            onSelectionsChange={this.props.callback}
          /> */}
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
