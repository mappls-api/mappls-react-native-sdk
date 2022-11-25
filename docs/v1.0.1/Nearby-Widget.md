[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Nearby Widget React Native

## Getting started

`npm i mappls-nearby-widget-react-native`

* Install peerDependencies 
~~~javascript
npm i mappls-map-react-native
~~~


* If using React-native<0.60

` react-native link mappls-nearby-widget-react-native`


### Installation


### Android

* Add followling line in `android/build.gradle` file:-

```diff
allprojects {
   repositories {
            mavenLocal()
            maven {
// All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
           url("$rootDir/../node_modules/react-native/android")
            }
           maven {
 // Android JSC is installed from npm
    url("$rootDir/../node_modules/jsc-android/dist")
          }

  
+       maven { url 'https://maven.mappls.com/repository/mappls/'}

           google()
           jcenter()
           maven { url 'https://www.jitpack.io' }

         }

}
```

* Add followling line in `android/app/build.gradle` file:-


```diff
defaultConfig {

applicationId "com.example"

minSdkVersion rootProject.ext.minSdkVersion

targetSdkVersion rootProject.ext.targetSdkVersion

versionCode 1

versionName "1.0"

+ multiDexEnabled true

}
+ dataBinding {
+    enabled true
+   }
```

### ios

* run **pod install** from ios folder

## Usage

#### Step 1: Import 
```javascript
import MapplsNearbyWidget from "mappls-nearby-widget-react-native";
import  MapplsGL  from  'mappls-map-react-native';
```

#### Step 2.  Initialization
Initialize the SDK with your keys.
~~~javascript
// for map sdk
MapplsGL.setMapSDKKey(mapSDKKey);//place your mapsdkKey
MapplsGL.setRestAPIKey(restAPIKey);//your restApiKey
MapplsGL.setAtlasClientId(atlasClientId);//your atlasClientId key
MapplsGL.setAtlasClientSecret(atlasClientSecret); //your atlasClientSecret key
~~~

#### Step 3:  Open MapplsNearbyWidget 

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




<div align="center">@ Copyright 2022 CE Info Systems Ltd. All Rights Reserved.</div>

<div align="center"> <a href="https://about.mappls.com/api/terms-&-conditions">Terms & Conditions</a> | <a href="https://about.mappls.com/about/privacy-policy">Privacy Policy</a> | <a href="https://about.mappls.com/pdf/mapmyIndia-sustainability-policy-healt-labour-rules-supplir-sustainability.pdf">Supplier Sustainability Policy</a> | <a href="https://about.mappls.com/pdf/Health-Safety-Management.pdf">Health & Safety Policy</a> | <a href="https://about.mappls.com/pdf/Environment-Sustainability-Policy-CSR-Report.pdf">Environmental Policy & CSR Report</a>

<div align="center">Customer Care: +91-9999333223</div>
