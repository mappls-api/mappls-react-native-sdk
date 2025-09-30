[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Tracking Widget React Native

## Introduction

This advanced tracking plugin, offered by Mappls plugins for react native, allows one to track the path traveled with **smooth animation** along the route. The smooth animation by plugin directly depend upon the frequency of the provided information on the current location, time, and speed of the vehicle being tracked to the plugin. _More the Merrier!_

## [Version History]()
| Version | Last Updated      | Author | Release Note                                                                                                                                                                                         | 
|---------|-------------------| ---- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v1.0.0  | 19 Aug, 2025     | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) | - Authentication and authorization mechanisms have been revised. </br> - Updated minimum Android version to 21. </br> - Added Support for 16 KB Page Sizes </br> - Added SPM(Swift Package Manager Support) for IOS.                                                                                     |

## Installation
* First install `mappls-tracking-react-native`:
```command
npm install mappls-tracking-react-native
```

* Install peerDependencies 
```command
npm install mappls-map-react-native
```

### Android Setup
[Click Here](./Add-Mappls-SDK.md#android-setup) for Android Setup

### IOS Setup
- [Click Here](./Add-Mappls-SDK.md#ios-setup) for IOS Setup
- On iOS it's necessary to add $MAPPLS_TRACKING_WIDGET.post_install(installer) to the post_install block in the ios/Podfile is necessary:
     ```pods
     post_install do |installer|
     # Other post install hooks...
     + $MAPPLS_TRACKING_WIDGET.post_install(installer)
     end
     ```

## Usage

#### Step 1: Import 
```javascript
import MapplsTracking from "mappls-tracking-react-native";
import  MapplsGL  from  'mappls-map-react-native';
```


#### Step 2:  Open MapplsTrackingWidget 

```javascript
        <MapplsTracking.MapplsTrackingWidget
          ref={trackingWidgetRef}
          originPoint='77.26890561043258,28.550947419414012'
          destinationPoint='77.25988209737588,28.55373960502866'
          speedInMillis={3000}
          resource='route_eta'
          profile='driving'
          routeChangeBuffer={50}
          trackingIcon={carIcon}
          latentViz='jump'
          polylineRefresh={false}
          cameraZoomLevel={14}
          routePolylineStyle={layerStyle.routePolylineStyle}
          destinationIconStyle={layerStyle.destinationIconStyle}
          dashRoutePolylineStyle={layerStyle.dashRoutePolylineStyle}
          OriginIconStyle={layerStyle.OriginOutletIconStyle}
          destinationRouteConnectorStyle={layerStyle.connectorPolylineStyle}
          enableDestinationRouteConnector={true}
          fitBoundsPadding={80}
          fitBoundsDuration={1000}
          latentVizRadius={100}
          trackingSegmentCompleteCallback={(event:any) => {
          }}
           trackingEventCallback={(eventName:any,eventValue:any) =>{
          }}
        />
```
### Mandatory Request Properties
  - `originPoint` : route start location . For eg -  { geoposition: "28.63124010064198,77.46734619140625" }
  - `destinationPoint` : route end location . For eg -   { geoposition: "28.631541442089226,77.37808227539064" }
  - `routePolylineStyle` : To set a style for route draw.
  
~~~javascript
    const layerStyle = {
        routePolylineStyle: {
        lineColor: '#314ccd',
        lineWidth: 6,
        lineOpacity: 0.75,
        lineCap: 'round',
        lineJoin: 'round',
    } as StyleProp<SymbolLayerStyle>,
    }
~~~
- `destinationIconStyle` : To set a style for destination icon set.
~~~javascript
  const layerStyle = {
    destinationIconStyle: {
    iconImage: marker,
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
    iconSize: 0.2,

  } as StyleProp<SymbolLayerStyle>,
}
~~~
  - `dashRoutePolylineStyle` : To set a style for an initial route showcase.
~~~javascript
  const layerStyle = {
        dashRoutePolylineStyle: {
        lineColor: '#314ccd',  // Set polyline color
        lineWidth: 4,  // Set polyline width
        lineOpacity: 0.75,  // Set polyline opacity
        lineCap: 'round',
        lineJoin: 'round',
        lineDasharray: [2, 4],  // Dash pattern: [Dash length, Gap length]
        } as StyleProp<SymbolLayerStyle>
    }
~~~
- `OriginIconStyle` : To set a style for start point showcase
~~~javascript
    const layerStyle = {
        OriginIconStyle: {
        iconImage: marker,
        iconAllowOverlap: true,
        iconAnchor: 'bottom',
        iconSize: 0.2,

    } as StyleProp<SymbolLayerStyle>,
  }
~~~
  - `destinationRouteConnectorStyle` : To set a style for draw a connector line from the last point of a route on the road to the actual input destination coordinate.
   ~~~javascript
  const layerStyle = {
   destinationRouteConnectorStyle: {
    lineColor: '#787878',
    lineWidth: 4,
    lineOpacity: 0.75,
    lineCap: 'round',
    lineJoin: 'round',
    lineDasharray: [2, 4],
  } as StyleProp<SymbolLayerStyle>,
  }
  ~~~
    

### Optional Parameters
1.  `speedInMillis(number)`: To set the animation speed in milliseconds.
2.  `resource(string)`: To set the route resource. Default to "route_eta".
3.  `profile(string)`: To set the profile for the route. Default to "driving".
4.  `trackingIcon(string)`: To set the tracking icon (like a RiderIcon) in the north-up direction on a map.
5.  `trackingIconSize(number)`: To set the tracking icon size.
  
6.  `routeChangeBuffer(number)`: The distance defined for call reroute for the provided current location.
7.  `polylineRefresh(boolean)`: To remove the route at the same time as the rider progresses along the route.
8.  `latentViz(string)`: To set the string value for smooth visualization when rider suddenly jumps off-route. Incurs an additional routing call.// [Acceptable values for this is : jump,fly & route]
9. `latentVizRadius(number)`:
10.  `cameraZoomLevel(number)`: To set the camera zoom level.
11.  `fitBoundsPadding (number)`: To set the padding for the fitbound.// default 80
12.  `fitBoundsDuration(number)`: To set the duration for the fitbound.// default 1000 millis
13.  `enableDestinationRouteConnector (boolean)`:  To set boolean value for hide/show connector line from the last route point on road to actual input destination coordinate // default false
14. `trackingSegmentCompleteCallback(trackingData: TrackingData)` : retrieve the remaining distance, you can access the relevant data within the trackingData object that the callback provides. For example...
    ```js
    trackingSegmentCompleteCallback={(event:any) => {
    // for complete event details
                console.log("remainingDistance", JSON.stringify(event))
    // for specific events
                Console.log("remainingDistance", JSON.stringify(event.distance))
                Console.log("eta", JSON.stringify(event.duration))
               Console.log("lastRiderLocation", JSON.stringify(event.lastRiderLocation))
              }}
    ```
15. `enableSim` (boolean): enable or disable rider simulation when rider location is inconsistent.
16. `maxSimDis` (number): maximum distance till which simulation will be active after the last location injected into the widget.
17. `simSpeed` (number): This value is speed in metres/sec at which the rider simulation will be started at. The ride simulation will be slowed at a defined rate below this speed after every few metres to enable a very smooth and slow animation till the time a fresh active location is injected tot the widget or max simulation distance is reached.
18. `lastRiderLocation`(number[array]): This parameter is used to pass the last known location (long,lat) coordinates of the rider.
19. `orderId` (string): This parameter is used to add some unique id related to tracking
20. `trackingEventCallback (eventName:string,eventValue:string)` : attributes to be returned for each event in real-time on occurrence of each event.
      - `aerialDistance` : displacement from last location to new location
      - `roadDistance` : from last location to new location (if and only if new location is within routeChangeBuffer distance of route polyline)
      - `latentViz` : A boolean flag indicating if crow-fly/jump happened from old location to new location. When crowFly is false, it indicates that the new location is route adherent.
      - `routeRecompute` : A flag in string that indicates success/failure of route-recompute when tracking SDK internally calculates new route. This will happen when crowFly is true, and new location's distance from route polyline is greater than buffer distance.
          
    ```javascript
     trackingEventCallback={(eventName:any,eventValue:any) =>{
            console.log("trackingEventCallback",eventName + ":::::::" + eventValue)
          }}
    ```
    ```
Note : Event names & its important values: 
- updateWithinBuffer : 
~~~javascript
{
    "activity_name": "updateWithinBuffer",
    //& other key-val pairs
    },
    "url": {
      "roadDistanceInMeter": 128.9532915267954,
      "aerial": 128.86231315761427
    }
  }
~~~
- updateOutsideBuffer : 
   ~~~javascript
   {
    "activity_name": "updateOutsideBuffer",
    // & other key-val pairs
    },
    "url": {
      "latentViz": "jump",
      "aerialDistance": 288.5067313683827,
      "routeRecompute": "Route calculated successfully"
    }
  }
   ~~~
    ```
###  Method calls :- 

- #### For Start Tracking
~~~javascript
  const newSourcePoint:MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: [77.26757150555511, 28.551569415823124]
        }
    trackingWidgetRef.current.startTracking(newSourcePoint); 
~~~
- #### For Removing Curved Line
~~~javascript
 if (trackingWidgetRef.current) {
    trackingWidgetRef.current.removeCurveLine(true);
 }
~~~
- #### For Hide/Show Polyline
~~~javascript
 if (trackingWidgetRef.current) {
   trackingWidgetRef.current.isVisibleRoutePolyline(true);
 }
~~~

- #### For Enable/Disable DestinationConnectorLine
~~~javascript
 if (trackingWidgetRef.current) {
  trackingWidgetRef.current.enableDestinationConnectorLine(true)
 }
~~~
- #### For Enable/Disable FitBound Route
~~~javascript
 if (trackingWidgetRef.current) {
    trackingWidgetRef.current.enableFitBounds(true);
 }
~~~
- #### For Enable/Disable Logo Click
~~~javascript 
 <MapplsGL.MapView style={{ flex: 1 }}
        ref={mapRef}
        logoClickEnabled={false}        // disable logo click
        renderToHardwareTextureAndroid={true}
        mapplsStyle="sublime_grey_tracking"
        onMapError={error => console.log(error)}/>
~~~
<br><br><br>

For any queries and support, please contact: 

[<img src="https://about.mappls.com/images/mappls-logo.svg" height="40"/> </p>](https://about.mappls.com/api/)
Email us at [apisupport@mappls.com](mailto:apisupport@mappls.com)


![](https://www.mapmyindia.com/api/img/icons/support.png)
[Support](https://about.mappls.com/contact/)
Need support? contact us!

<br></br>
<br></br>

[<p align="center"> <img src="https://www.mapmyindia.com/api/img/icons/stack-overflow.png"/> ](https://stackoverflow.com/questions/tagged/mappls-api)[![](https://www.mapmyindia.com/api/img/icons/blog.png)](https://about.mappls.com/blog/)[![](https://www.mapmyindia.com/api/img/icons/gethub.png)](https://github.com/Mappls-api)[<img src="https://mmi-api-team.s3.ap-south-1.amazonaws.com/API-Team/npm-logo.one-third%5B1%5D.png" height="40"/> </p>](https://www.npmjs.com/org/mapmyindia) 



[<p align="center"> <img src="https://www.mapmyindia.com/june-newsletter/icon4.png"/> ](https://www.facebook.com/Mapplsofficial)[![](https://www.mapmyindia.com/june-newsletter/icon2.png)](https://twitter.com/mappls)[![](https://www.mapmyindia.com/newsletter/2017/aug/llinkedin.png)](https://www.linkedin.com/company/mappls/)[![](https://www.mapmyindia.com/june-newsletter/icon3.png)](https://www.youtube.com/channel/UCAWvWsh-dZLLeUU7_J9HiOA)




<div align="center">@ Copyright 2025 CE Info Systems Ltd. All Rights Reserved.</div>

<div align="center"> <a href="https://about.mappls.com/api/terms-&-conditions">Terms & Conditions</a> | <a href="https://about.mappls.com/about/privacy-policy">Privacy Policy</a> | <a href="https://about.mappls.com/pdf/mapmyIndia-sustainability-policy-healt-labour-rules-supplir-sustainability.pdf">Supplier Sustainability Policy</a> | <a href="https://about.mappls.com/pdf/Health-Safety-Management.pdf">Health & Safety Policy</a> | <a href="https://about.mappls.com/pdf/Environment-Sustainability-Policy-CSR-Report.pdf">Environmental Policy & CSR Report</a>

<div align="center">Customer Care: +91-9999333223</div>
