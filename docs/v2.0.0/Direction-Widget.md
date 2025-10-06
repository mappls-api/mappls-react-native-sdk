[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Direction Widget React Native

## Getting started
A ready to use Widget to show the Routes in a React Native platform. It offers the following basic functionalities:

1. Takes support of Mappls Place search for searching locations of origin, destinations and via points.
2. It allows to use origin and destinations in Mappls digital address (semicolon separated) mapplsPin or WGS 84 geographical coordinates both.
3.  The ability to set the vehicle profile like driving, and biking.
4. Easily set the resource for traffic and ETA information.

For more details, please contact apisupport@mappls.com.

## [Version History]()
| Version | Last Updated      | Author | Release Note                                                                                                                                                                                         | 
|---------|-------------------| ---- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v2.0.1  | 06 Oct, 2025     | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) | - Authentication and authorization mechanisms have been revised. </br> - Updated minimum Android version to 21. </br> - Added Support for 16 KB Page Sizes </br> - Added SPM(Swift Package Manager Support) for IOS.                                                                                     |

## Installation
* First install `mappls-direction-widget-react-native`:
```command
npm install mappls-direction-widget-react-native
```

* Install peerDependencies 
```command
npm install mappls-map-react-native
```

### Android Setup
[Click Here](./Add-Mappls-SDK.md#android-setup) for Android Setup

### IOS Setup
- [Click Here](./Add-Mappls-SDK.md#ios-setup) for IOS Setup
- On iOS it's necessary to add $MAPPLS_DIRECTION_WIDGETS.post_install(installer) to the post_install block in the ios/Podfile is necessary:
	```pods
	post_install do |installer|
	# Other post install hooks...
	+ $MAPPLS_DIRECTION_WIDGETS.post_install(installer)
	end
	```

## Usage
#### Import 
```javascript
import  MapplsDirectionWidget  from  "mappls-direction-widget-react-native"
```

#### Open MapplsDirectionWidget  

```javascript
 try {
  const  data = await  MapplsDirectionWidget.openDirectionWidget({});
  console.log(JSON.stringify(data));
  } catch (e) {
 //error log
  }
```
#### Request  Props
1.  resource(String)`:  **Below are the available resource:**
    -   DirectionsCriteria.RESOURCE_ROUTE  **(Default)**: to calculate a route & its duration without considering traffic conditions.
    -   DirectionsCriteria.RESOURCE_ROUTE_ETA get the updated duration of a route considering live traffic; Applicable for India only "region=ind" and "rtype=1" is not supported. This is different from route_traffic; since this doesn't search for a route considering traffic, it only applies delays to the default route.

    -   DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC:  
    to search for routes considering live traffic.

2.  `showAlternative(Boolean)`: Show alternative routes.
3.  `profile(String)`:  **Below are the available profile:**
    -   DirectionsCriteria.PROFILE_DRIVING  **(Default)**:Meant for car routing
    -   DirectionsCriteria.PROFILE_WALKING: Meant for pedestrian routing. Routing with this profile is restricted to route_adv only. region & rtype request parameters are not supported in pedestrian routing
    -   DirectionsCriteria.PROFILE_BIKING:Meant for two-wheeler routing. Routing with this profile is restricted to route_adv only. region & rtype request parameters are not supported in two-wheeler routing.
    -   DirectionsCriteria.PROFILE_TRUCKING:Meant for Truck routing. Routing with this profile is restricted to route_adv only. region & rtype request parameters are not supported in truck routing.
4.  `overview(String)`: Add overview geometry either full, simplified according to highest zoom level it could be display on, or not at all.  **Below are the available value:**
    -   DirectionsCriteria.OVERVIEW_FULL
    -   DirectionsCriteria.OVERVIEW_FALSE
    -   DirectionsCriteria.OVERVIEW_SIMPLIFIED
5.  `steps(Boolean)`: Return route steps for each route leg. Possible values are true/false. By default it will be used as false.
6.  `excludes(List<String>)`  : Additive list of road classes to avoid, order does not matter.  **Below are the available value:**
    -   DirectionsCriteria.EXCLUDE_FERRY
    -   DirectionsCriteria.EXCLUDE_MOTORWAY
    -   DirectionsCriteria.EXCLUDE_TOLL
7.  `showStartNavigation(Boolean)`: To show the Start Navigation button if the origin is current location.
8.  `destination`: You can use  this  to pass the destination in direction widget:
	    -   `destination:{longitude:77.56,latitude:28.67,name:"MapmyIndia",address:"Okhla,New Delhi"}`: It takes coordinate, place name and place address
    -   `destination:{mapplsPin:"MMI000",name:"MapmyIndia",address:"Okhla,New Delhi"}`: It takes mapplsPin, place name and place address
9.  `source`: You can use  this  to pass the source in direction widget(Only for IOS):
     -   `source:{longitude:77.56,latitude:28.67,name:"MapmyIndia",address:"Okhla,New Delhi"}`: It takes coordinate, place name and place address
    -   `source:{mapplsPin:"MMI000",name:"MapmyIndia",address:"Okhla,New Delhi"}`: It takes mapplsPin, place name and place address 
10.  `searchPlaceOption(PlaceOptions`): To set the properties of search widget


####  PlaceOptions
1. `location(Array)`: set location around which your search will appear. Ex. `[77.56,28.34]`
2. `filter(String)`: this parameter helps you restrict the result either by mentioning a bounded area or to certain mapplsPin (6 digit code to any poi, locality, city, etc.), below mentioned are the both types:

	  -   `filter`  = bounds: lat1, lng1; lat2, lng2 (latitude, longitude) {e.g. filter("bounds: 28.598882, 77.212407;    28.467375, 77.353513")
	   -   `filter`  = cop: {mapplsPin} (string) {e.g. filter("cop:YMCZ0J") 
   
3.  `historyCount(number)`: Maximum number of history results appear. **(Android )**
    
4.   `zoom(number)`: takes the zoom level of the current scope of the map (min: 4, max: 18).
    
5.  `saveHistory(Boolean)`: If it sets to  `true`  it shows the history selected data. **(Android )**
6.   `pod(String)`: 1. it takes in the place type code which helps in restricting the results to certain chosen type.**Below mentioned are the codes for the pod**
    
     -   PlaceOptionsConstants.POD_SUB_LOCALITY
     -   PlaceOptionsConstants.POD_LOCALITY
     -   PlaceOptionsConstants.POD_CITY
     -   PlaceOptionsConstants.POD_VILLAGE
     -   PlaceOptionsConstants.POD_SUB_DISTRICT
     -   PlaceOptionsConstants.POD_DISTRICT
     -   PlaceOptionsConstants.POD_STATE
     -   PlaceOptionsConstants.POD_SUB_SUB_LOCALITY
7.  `tokenizeAddress(Boolean)`: provides the different address attributes in a structured object.
    
8.   `backgroundColor(HexColor)`: to set the background color of the widget
    
9.   `toolbarColor(HexColor)`: to set the toolbar color of the widget.
    
10.   `hint(String)`: To set the hint on the Search view of the widget.**(Android)**
11. `attributionHorizontalAlignment(int)`: To set the vertical alignment for attribution.  **Below mentioned are the values:**
    
    -   PlaceOptionsConstants.GRAVITY_LEFT
    -   PlaceOptionsConstants.GRAVITY_CENTER
    -   PlaceOptionsConstants.GRAVITY_RIGHT
12.   `attributionVerticalAlignment(int)`: To set the horizontal alignment for attribution.  **Below mentioned are the values:**
    
    -   PlaceOptionsConstants.GRAVITY_TOP
    -   PlaceOptionsConstants.GRAVITY_BOTTOM'
13.    `logoSize(int)`: To set the logo size.  **Below mentioned are the values:**
    
    -   PlaceOptionsConstants.SIZE_SMALL
    -   PlaceOptionsConstants.SIZE_MEDIUM
    -   PlaceOptionsConstants.SIZE_LARGE

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
