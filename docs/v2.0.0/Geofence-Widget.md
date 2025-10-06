[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Geofence Widget

## Getting started
A ready to use UI Widget to create/edit GeoFence in a React Native application.

## [Version History]()
| Version | Last Updated      | Author | Release Note                                                                                                                                                                                         | 
|---------|-------------------| ---- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v2.0.0  | 06 Oct, 2025     | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) | - Authentication and authorization mechanisms have been revised. </br> - Updated minimum Android version to 21. </br> - Added Support for 16 KB Page Sizes </br> - Added SPM(Swift Package Manager Support) for IOS.                                                                                     |

## Installation
* First install `mappls-geofence-widget-react-native`:
```command
npm install mappls-geofence-widget-react-native
```

* Install peerDependencies 
```command
npm install mappls-map-react-native
```

### Android Setup
[Click Here](./Add-Mappls-SDK.md#android-setup) for Android Setup

### IOS Setup
- [Click Here](./Add-Mappls-SDK.md#ios-setup) for IOS Setup
- On iOS it's necessary to add $MAPPLS_GEOFENCE_WIDGETS.post_install(installer) to the post_install block in the ios/Podfile is necessary:
     ```pods
     post_install do |installer|
     # Other post install hooks...
     + $MAPPLS_GEOFENCE_WIDGETS.post_install(installer)
     end
     ```

## Usage

#### Import 
```javascript
import  MapplsGeoFence  from  'mappls-geofence-widget-react-native';
```
#### Open MapplsGeoFence Widget  

```javascript
MapplsGeoFence.openGeoFenceWidget({minRadius: 2000,  maxRadius: 10000})
.then(e  =>  {console.log(e)})
.catch(err  =>  console.log("error catch search:",  err.message))
```
#### Request  Props
1.  **circleFillColor(string):**  To change Circle Fill colors
2. **circleFillOutlineColor(string):** To change circle Outline color
3. **circleOutlineWidth(number):** To change the circle outline width
4. **draggingLineColor(string):** To change the dragging line of Polygon edges and circle radius changing line.
5. **maxRadius(number):** To set maximum radius of circle
6. **minRadius(number):** To set minimum radius of circle.
7. **polygonDrawingBackgroundColor(string):**  To change the color of Polygon drawing board color.
8. **polygonDrawingLineColor(string):** To set the polygon sketch drawing line.
9. **polygonFillColor(String):** To change fill color of polygon
10. **polygonFillOutlineColor(string):** To change outline color of polygon
11. **polygonOutlineWidth(number):**  To set the polygon outline width
12.  **radiusInterval(number):**   To set the step size of radius changing 
13. **seekbarCornerRadius(number):** To change seekbar corner radius
14. **polygonCreationMode(number):** To change the creation mode of polygon. **Below mentioned are the values:**
    * MapplsGeoFence.POLYGON_CREATION_MODE_DRAW:User can draw on screen to create polygon
    *  MapplsGeoFence.POLYGON_CREATION_MODE_TAP : User can tap on the screen to create polygon
15. **toolbarTitle(string):** To change the title of toolbar .
16. **toolbarColor(string):** To change the color of toolbar
17.  **toolbarTintColor(string): ** To change done button tint color.
18. [ **initialiseGeoFence(GeoFence):** ](#Geofence)Set initial properties for Geofence. Takes GeoFence Object as parameter.
19. **simplifyOnIntersection(boolean):** To auto correct self intersecting polygon
20. **maxEdgesInPolygon(number):** To  restrict number of points in a polygon
21.  **convertPointsToClockWise(string):** To  get Polygon points in clockwise/anti-clockwise directions. **Below mentioned are the values:**
     * MapplsGeoFence.CONVERT_POINTS_ORIENTATION_NONE
     * MapplsGeoFence.CONVERT_POINTS_ORIENTATION_ANTICLOCKWISE
     * MapplsGeoFence.CONVERT_POINTS_ORIENTATION_CLOCKWISE
22. **doneButtonColor(string):** To change done button color.
23.  **doneButtonTintColor(string):** To change done button tint color.

### Geofence 
1. **isPolygon (boolean):** To set if polygon or circle.
2.  **circleRadius(number):** To set the radius of circle.
3.   **circleCenter(Array<number>)**: To set the center of circle.
4.   **polygon(Array<Array<Array<number>>>)** : To set the polygon points.
5.   **polygonType(String)** : To set the type of polygon. **Below mentioned are the values:**
     * MapplsGeoFence.POLYGON_TYPE_NORMAL
     * MapplsGeoFence.POLYGON_TYPE_QUADRILATERAL


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
