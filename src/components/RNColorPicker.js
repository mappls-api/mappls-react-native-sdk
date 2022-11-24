import React from 'react';
import { View,Modal,StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

class RNColorPicker extends React.Component {

    
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ColorPicker
              onColorSelected={this.props.onColorSelected}
              defaultColor={this.props.defaultColor}
              style={{ flex: 1, width: 300 }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RNColorPicker;
