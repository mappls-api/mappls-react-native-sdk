
[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)
# Mappls Maps SDK for React Native

**Easy To Integrate Maps & Location APIs & SDKs For Android Applications**

Powered with India's most comprehensive and robust mapping functionalities.

1. You can get your api key to be used in this document here: [https://about.mappls.com/api/signup](https://about.mappls.com/api/signup)

2. The sample code is provided to help you understand the basic functionality of Mappls maps & REST APIs working on **Android** native development platform.

3. Explore through [200+ countries & territories](https://github.com/MapmyIndia/mapmyindia-rest-api/blob/master/docs/countryISO.md) with **Global Search, Routing and Mapping APIs & SDKs** by Mappls.


## Version History
| Version | Last Updated | Author |
| ---- | ---- | ---- |
| 1.0.5 | 02 May 2023 |Mappls API Team|
| 1.0.4 | 12 April 2023 |Mappls API Team|
| 1.0.3 | 24 November 2022 |Mappls API Team|
| 1.0.2 | 19 October 2022 |Mappls API Team|
| 1.0.1 | 08 September 2022 |Mappls API Team|
| 1.0.0 | 24 August 2022 |Mappls API Team|


## [API Usage](#api-usage)

Your Mappls Maps SDK usage needs a set of license keys (get them  [here](https://apis.mappls.com/console/)) and is governed by the API  [terms and conditions](https://about.mappls.com/api/terms-&-conditions). As part of the terms and conditions,  **you cannot remove or hide the Mappls logo and copyright information** in your project.

The allowed SDK hits are described on the user [dashboard](https://apis.mappls.com/console) page. Note that your usage is shared between platforms, so the API hits you make from a web application, Android app or an iOS app all add up to your allowed daily limit.

## Installation
**Dependencies**
* [node](https://nodejs.org)
* [npm](https://www.npmjs.com/)
* [React Native](https://facebook.github.io/react-native/):  recommended version 0.60 or greater
**npm**
```
 npm install mappls-map-react-native --save
```

## How to Add a MapView
~~~javascript
import React, { Component } from "react";
import {View } from "react-native";
import  MapplsGL  from  'mappls-map-react-native';
MapplsGL.setMapSDKKey("");//place your mapsdkKey
MapplsGL.setRestAPIKey("");//your restApiKey
MapplsGL.setAtlasClientId("");//your atlasClientId key
MapplsGL.setAtlasClientSecret(""); //your atlasClientSecret key
MapplsGL.setAtlasGrantType("");
export default class App extends Component {
 render() {
 return (
 <View style={{flex:1}}>
 <MapplsGL.MapView style={{flex:1}} >
	 <MapplsGL.Camera
		 ref={c  => (this.camera = c)}
		 zoomLevel={12}
		 minZoomLevel={4}
		 maxZoomLevel={22}
		 centerCoordinate={[77.231409,28.6162]}
	 />
 </MapplsGL.MapView>
 </View>
 );
 }
}
~~~


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
