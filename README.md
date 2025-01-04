[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls React Native SDK

**Easy To Integrate Maps & Location APIs & SDKs For Android & IOS Applications**

Powered with India's most comprehensive and robust mapping functionalities.

1. You can get your api key to be used in this document here: [https://about.mappls.com/api/signup](https://about.mappls.com/api/signup)

2. The sample code is provided to help you understand the basic functionality of Mappls maps & REST APIs working on **React Native** native development platform.

4. Explore through [200+ countries & territories](https://github.com/mappls-api/mappls-rest-apis/blob/main/docs/countryISO.md) with **Global Search, Routing and Mapping APIs & SDKs** by Mappls.

## [Documentation History](#Documentation-History)

| Version | Supported SDK Version |  
| ---- | ---- |    
| [v1.0.3](../v1.0.3/README.md) | - Map SDK v1.0.10 <br/> - Place Search Widget v1.3.0 <br/> - GeoFence Widget v1.0.0 <br/> - Direction Widget v1.1.0 <br/> - Nearby UI Widget v1.0.0 <br/> - Mappls Polyline v1.0.0 |  
| [v1.0.2](../v1.0.2/README.md) | - Map SDK v1.0.9 <br/> - Place Search Widget v1.2.0 <br/> - GeoFence Widget v1.0.0 <br/> - Direction Widget v1.1.0 <br/> - Nearby UI Widget v1.0.0 <br/> - Mappls Polyline v1.0.0 |  
| [v1.0.1](../v1.0.1/README.md) | - Map SDK v1.0.3 <br/> - Place Search Widget v1.0.1 <br/> - GeoFence Widget v1.0.0 <br/> - Direction Widget v1.0.0 <br/> - Nearby UI Widget v1.0.0 <br/> - Mappls Polyline v1.0.0 |

For more details of previous documentation versions , [click here](docs/v1.0.3/Doc-History.md)
  

## [Version History](#Version-History)

| Version | Last Updated | Author |  Release Note|  
| ---- | ---- | ---- | ---- |
| v1.0.10 | 19 December 2024 | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) |  - Added option to set Base url in Search and Routing Apis </br> - Added Fuel Cost Api </br> - Added Route Report Summary Api </br> - Added Category Master API  |
| v1.0.9 | 23 October 2024 | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) |  - Bug Fixes & Improvements  |
| v1.0.8 | 28 December 2023 | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) |  - Fix Multiple marker click issue in IOS   <br/>  - Bug Fixes & Improvements  |
| v1.0.7 | 04 December 2023 | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) |  - Security Improvements   <br/>  - Bug Fixes & Improvements  |
| v1.0.6 | 05 June 2023 | Mappls API Team ([MA](https://github.com/mdakram)) ([ST](https://github.com/saksham66)) |  - Added `Cost Estimation` Api <br/>  - Bug Fixes  |

For more details of previous versions , [click here](docs/v1.0.3/Version-History.md).

## [Table Of Content](#Table-Of-Content)
- [Vector Map](docs/v1.0.3/Getting-Started.md)
    * [Getting Started](docs/v1.0.3/Getting-Started.md#getting-started)
    * [Installation](docs/v1.0.3/Getting-Started.md#installation)
    * [Add Import](docs/v1.0.3/Getting-Started.md#added-import)
    * [Add your API keys to the SDK](docs/v1.0.3/Getting-Started.md#add-your-api-keys-to-the-sdk)
    * [Add a Mappls Map to your application](docs/v1.0.3/Getting-Started.md#add-a-mappls-map-to-your-application)
- Component
    * [MapView](docs/v1.0.3/Map-View.md)
    * [Light](docs/v1.0.3/Light.md)
    * [Point Annotation](docs/v1.0.3/Point-Annotation.md)
    * [Callout](docs/v1.0.3/Callout.md)
    * [Camera](docs/v1.0.3/Camera.md)
    * [User Location](docs/v1.0.3/User-Location.md)
    * [Images](docs/v1.0.3/Images.md)
- [Mappls Traffic Overlay](docs/v1.0.3/Traffic-Vector-Overlay.md)
- [Set Country Regions](docs/v1.0.3/Set-Regions.md)
- [Set Mappls Map Style](docs/v1.0.3/Set-Style.md)
    * [List of Available Styles](docs/v1.0.3/Set-Style.md#list-of-available-styles)
    * [Set Mappls Style](docs/v1.0.3/Set-Style.md#set-mappls-style)
    * [To enable/disable last selected style](docs/v1.0.3/Set-Style.md#to-enabledisable-last-selected-style)
- Rest API Kit
    * [Search API's](docs/v1.0.3/Search-Api.md)
        * [Auto Suggest](docs/v1.0.3/Search-Api.md#auto-suggest)
        * [Geocode](docs/v1.0.3/Search-Api.md#geocode)
        * [Reverse Geocode](docs/v1.0.3/Search-Api.md#reverse-geocode)
        * [Nearby Places](docs/v1.0.3/Search-Api.md#nearby-places)
        * [Place Detail](docs/v1.0.3/Search-Api.md#place-details)
        * [POI Along the Route](docs/v1.0.3/Search-Api.md#poi-along-the-route)
    * [Routes & Navigation API](docs/v1.0.3/Routing-Api.md)
        * [Routing API](docs/v1.0.3/Routing-Api.md#routing-api)
        * [Driving Distance Matrix API](docs/v1.0.3/Routing-Api.md#driving-distance-matrix-api)
    * [Weather Api](docs/v1.0.3/Weather-API.md)
    * [Nearby Reports](docs/v1.0.3/Nearby-Report.md)
- [Mappls Search Widget](docs/v1.0.3/Place-Autocomplete.md)
    * [Getting Started](docs/v1.0.3/Place-Autocomplete.md#getting-started)
    * [Place Picker](docs/v1.0.3/Place-Autocomplete.md#placepicker)
    * [Search Widget](docs/v1.0.3/Place-Autocomplete.md#search-widget)
- [Mappls Geofence Widget](docs/v1.0.3/Geofence-Widget.md)
- [Mappls Direction Widget](docs/v1.0.3/Direction-Widget.md)
- [Mappls Nearby Widget](docs/v1.0.3/Nearby-Widget.md)
- [SDK Error Codes](docs/v1.0.3/SDK-Error-code.md)
- [Version History](docs/v1.0.3/Version-History.md)
- [Country List](https://github.com/mappls-api/mappls-rest-apis/blob/main/docs/countryISO.md)

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
