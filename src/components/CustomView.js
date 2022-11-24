import React from 'react';
import { View, Modal, StyleSheet, Text, TextInput, Button } from 'react-native';

class CustomView extends React.Component {
  state = {
    type: this.props.type,
    latitude: '',
    longitude: '',
    name: '',
    address: '',
    mapplsPin: '',
    showError: false,
  };

  render() {
    const locationView =
      this.props.type === 'mapplsPin' ? (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text>mapplsPin: </Text>
          <TextInput
            value={this.state.mapplsPin}
            onChangeText={(text) => this.setState({ mapplsPin: text })}
            style={{
              borderColor: 'grey',
              borderRadius: 10,
              borderWidth: 0.6,
              margin: 5,
              minWidth: 80,
            }}
            placeholder="mapplsPin"
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text>Location: </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              keyboardType="decimal-pad"
              value={this.state.longitude}
              onChangeText={(text) => this.setState({ longitude: text })}
              style={{
                borderColor: 'grey',
                borderRadius: 10,
                borderWidth: 0.6,
                margin: 5,
                minWidth: 80,
              }}
              placeholder="Longitude"
            />
            <TextInput
              keyboardType="decimal-pad"
              value={this.state.latitude}
              onChangeText={(text) => this.setState({ latitude: text })}
              style={{
                borderColor: 'grey',
                borderRadius: 10,
                borderWidth: 0.6,
                margin: 5,
                minWidth: 80,
              }}
              placeholder="Latitude"
            />
          </View>
        </View>
      );

    const errorView = this.state.showError ? (
      <Text style={{ color: 'red', textAlign: 'center' }}>
        All fields required.
      </Text>
    ) : null;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {locationView}
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text>Place Name: </Text>
                <TextInput
                  style={{
                    borderColor: 'grey',
                    borderRadius: 10,
                    borderWidth: 0.6,
                    margin: 5,
                    minWidth: 80,
                  }}
                  value={this.state.name}
                  onChangeText={(text) => this.setState({ name: text })}
                  placeholder="Name"
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text>Address: </Text>
                <TextInput
                  value={this.state.address}
                  onChangeText={(text) => this.setState({ address: text })}
                  style={{
                    borderColor: 'grey',
                    borderRadius: 10,
                    borderWidth: 0.6,
                    margin: 5,
                    minWidth: 80,
                  }}
                  placeholder="Address"
                />
              </View>
              <View style={{ margin: 10 }}>
                <Button
                  onPress={() => {
                    if (
                      this.state.mapplsPin != '' ||
                      (this.state.longitude != '' && this.state.latitude != '')
                    ) {
                      if (this.state.address != '' && this.state.name != '') {
                        this.setState({
                          showError: false,
                        });
                        this.props.onButtonPress(
                          this.props.type,
                          this.state.mapplsPin,
                          this.state.longitude,
                          this.state.latitude,
                          this.state.name,
                          this.state.address
                        );
                      } else {
                        this.setState({
                          showError: true,
                        });
                      }
                    } else {
                      this.setState({
                        showError: true,
                      });
                    }
                  }}
                  title="set"
                />
              </View>
              {errorView}
            </View>
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
export default CustomView;
