[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Search Widget
## [Getting started](#getting-started)
`npm install mappls-search-widgets-react-native --save`

* Install peerDependencies 
~~~javascript
npm i mappls-map-react-native react-native-simple-toast @react-native-community/netinfo
~~~


* If using React-native<0.60

` react-native link mappls-search-widgets-react-native`


## Installation


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
```

### ios

* run **pod install** from ios folder

## Usage

#### Step 1: Import 
```javascript
import  MapplsUIWidgets  from  'mappls-search-widgets-react-native'
import  MapplsGL  from  'mappls-map-react-native-beta';
```

#### Step 2.  Initialization
Initialize the SDK with your keys.
```javascript
// for map sdk
MapplsGL.setMapSDKKey(mapSDKKey);//place your mapsdkKey
MapplsGL.setRestAPIKey(restAPIKey);//your restApiKey
MapplsGL.setAtlasClientId(atlasClientId);//your atlasClientId key
MapplsGL.setAtlasClientSecret(atlasClientSecret); //your atlasClientSecret key
```

### [PlacePicker](#placepicker)

```javascript
  <MapplsUIWidgets.PlacePicker
      center={plcePickerCenter}
      zoom={10}
      searchWidgetProps={{backgroundColor:'#F0FFF0'}}
      pickerImage={{uri:'http://maps.google.com/mapfiles/ms/micons/blue.png'}}
      resultCallback={(res) => 
      //Do something with result
         }
   />
```
#### Request  Props
1. **center** :(number) place picker center coordinate(optional)
***note***- if center is not provided map will zoom to current location of user.

2. **zoom**:(number) place picker map zoom level (optional)
3. **pickerImage** :place picker marker image. You can use static images or image urls.(optional)
4. [ **searchWidgetProps** ](#Search-Widget-Request-Properties):(object) custom configuration for search widget props inside place picker.(optional)
5. **resultCallback**:(function) returns result of place picker

### [Search Widget](#search-widget)
```javascript
try{
 const res = await MapplsUIWidgets.searchWidget({toolbarColor:'#F5F5F5'});
 //Do something with result
 }catch(e){
   //error logs
     console.log(e);
  }
```

#### Search Widget Request Properties
1. `location(Array)`: set location around which your search will appear. Ex. `[77.56,28.34]`
2. `filter(String)`: this parameter helps you restrict the result either by mentioning a bounded area or to certain eloc (6 digit code to any poi, locality, city, etc.), below mentioned are the both types:

       -   `filter`  = bounds: lat1, lng1; lat2, lng2 (latitude, longitude) {e.g. filter("bounds: 28.598882, 77.212407;    28.467375, 77.353513")
	   -   `filter`  = cop: {mapplsPin} (string) {e.g. filter("cop:YMCZ0J") 
   
3.  `historyCount(number)`: Maximum number of history results appear. **(Android )**
    
4.   `zoom(number)`: takes the zoom level of the current scope of the map (min: 4, max: 18).
    
5.  `saveHistory(Boolean)`: If it sets to  `true`  it shows the history selected data. **(Android )**
6.   `pod(String)`: 1. it takes in the place type code which helps in restricting the results to certain chosen type.**Below mentioned are the codes for the pod**
    
     -   MapplsUIWidgets.POD_SUB_LOCALITY
     -   MapplsUIWidgets.POD_LOCALITY
     -   MapplsUIWidgets.POD_CITY
     -   MapplsUIWidgets.POD_VILLAGE
     -   MapplsUIWidgets.POD_SUB_DISTRICT
     -   MapplsUIWidgets.POD_DISTRICT
     -   MapplsUIWidgets.POD_STATE
     -   MapplsUIWidgets.POD_SUB_SUB_LOCALITY
7.  `tokenizeAddress(Boolean)`: provides the different address attributes in a structured object.
    
8.   `backgroundColor(HexColor)`: to set the background color of the widget
    
9.   `toolbarColor(HexColor)`: to set the toolbar color of the widget.
    
10.   `hint(String)`: To set the hint on the Search view of the widget.

11. `hyperLocal(Boolean)`: This parameter lets the search give results that are hyper-localized to the reference location passed in the location parameter. This means that nearby results are given a higher ranking than results far from the reference location. Highly prominent results will still appear in the search results, however they will be lower in the list of results. This parameter will work ONLY in conjunction with the location parameter.

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
