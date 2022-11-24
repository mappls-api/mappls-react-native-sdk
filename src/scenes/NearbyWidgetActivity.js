import React from 'react';
import { Button, View } from 'react-native';
import MapplsNearbyWidget from 'mappls-nearby-widget-react-native'

class NearbyWidgetActivity extends React.Component {

    openNearby = async () => {
        try {
            const data = await MapplsNearbyWidget.openNearbyWidget({})

        } catch( e ){
            console.log(e)
        }
    }

    render() {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
              title="Open Nearby Widget"
              onPress={() => this.openNearby()}
            />
          </View>
        );
      }
}
export default NearbyWidgetActivity;