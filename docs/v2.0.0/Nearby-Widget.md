[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Nearby Widget React Native

## Getting started
The Mappls Nearby Widget makes it easy to integrate the functionality to search nearby POIs for selected categories in your React Native application. The Nearby Search widget provided as a means to enable radially search for Nearby Places on Mappls Maps.

The widget offers the following basic functionalities:

- Ability to search for nearby places directly with Mappls Maps visual interface.

- A single method to initiate nearby search across all categories of places available on Mappls.

- Ability to get information from Mappls Nearby Search widget through a callback.


## [Version History]()
| Version | Last Updated      | Author | Release Note                                                                                                                                                                                         | 
|---------|-------------------| ---- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v2.0.0  | 19 Aug, 2025     | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) | - Authentication and authorization mechanisms have been revised. </br> - Updated minimum Android version to 21. </br> - Added Support for 16 KB Page Sizes </br> - Added SPM(Swift Package Manager Support) for IOS.                                                                                     |

## Installation
* First install `mappls-nearby-widget-react-native`:
```command
npm install mappls-nearby-widget-react-native
```

* Install peerDependencies 
```command
npm install mappls-map-react-native
```

### Android Setup
[Click Here](./Add-Mappls-SDK.md#android-setup) for Android Setup

### IOS Setup
- [Click Here](./Add-Mappls-SDK.md#ios-setup) for IOS Setup
- On iOS it's necessary to add $MAPPLS_NEARBY_WIDGETS.post_install(installer) to the post_install block in the ios/Podfile is necessary:
     ```pods
     post_install do |installer|
     # Other post install hooks...
     + $MAPPLS_NEARBY_WIDGETS.post_install(installer)
     end
     ```

## Usage

#### Import 
```javascript
import MapplsNearbyWidget from "mappls-nearby-widget-react-native";
import  MapplsGL  from  'mappls-map-react-native';
```

#### Open MapplsNearbyWidget 

```javascript
try {
  const  data = await MapplsNearbyWidget.openNearbyWidget({});
  console.log(JSON.stringify(data));
  } catch (e) {
 //error log
  }
```
#### Request  Props
*  **nearbyOptions**(Object): You can use  `nearbyOptions`  to set the following properties:

1.  `radius(number)`: provides the range of distance to search over(default: 1000, min: 500, max: 10000)
2.  `sortBy(Enum)`: provides configured sorting operations for the client on cloud.**Below are the available sorts:**

-   **NearbyCriteria.DISTANCE_ASCENDING**
-   **NearbyCriteria.DISTANCE_DESCENDING**  will sort the data on distance basis.
-   **NearbyCriteria.NAME_ASCENDING**
-   **NearbyCriteria.NAME_DESCENDING**  will sort the data on alphabetically basis.

3.  `searchBy(Enum)`: provides configurable search operations for the client on cloud.  **Below are the available sorts:​**

-   **NearbyCriteria.DISTANCE**
-   **NearbyCriteria.IMPORTANCE**  - will search data in order of prominence of the place.

4.  `bounds(String)`: Allows the developer to send in map bounds to provide a nearby search within the bounds.  
    {e.g. (bounds(“28.56812,77.240519;28.532790,77.290854”))
5.  `pod(Enum)`: it takes in the place type code which helps in restricting the results to certain chosen type. Access to this parameter is controlled from the backend. This parameter if provided will override any values provided in  `keywords`  request param.  
    **Below mentioned are the codes for the pod**

    -   NearbyCriteria.POD_SUB_LOCALITY
    -   NearbyCriteria.POD_LOCALITY
    -   NearbyCriteria.POD_CITY
    -   NearbyCriteria.POD_STATE

6.  `filter(String)`: This parameter helps you get a specific type of EV charging Station
    -   `filter`  = model:(string);brandId:(string);plugType:(string)
7.  `richData(Boolean)`: Rich Data related to POI
8.  `userName(String)`: Use to set the user name
 * **categoryCodes**(Array[Object]): You can set array of `categoryCodes` with following  parameters:
 1.  `category (String)`: Name of the category that display on a view
2.  `icon(image)`: To show icon of category, example:- icon:Image.resolveAssetSource(require('./coffee.png'))
3.  `categoryCode (Array<String>)`: List of category codes
4.  `markerIcon (image)`: Marker icon to display on a map , example:- icon:Image.resolveAssetSource(require('./marker.png'))

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
