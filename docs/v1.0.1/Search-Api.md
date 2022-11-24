[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Search API
The following search services are available as part of the SDK bundled by default –

## [Auto Suggest](#auto-suggest)
The Autosuggest API helps users to complete queries faster by adding intelligent search capabilities to your web or mobile app. This API returns a list of results as well as suggested queries as the user types in the search field.
~~~javascript
MapplsGL.RestApi.autoSuggest({
    query: text,
}).then(response => {
    //Handle Response
}).catche(error => {
    //Handle Error
});
~~~
### Request Parameter
#### Mandatory Parameter
1. `query(String)`: e.g. Shoes, Coffee, Versace, Gucci, H&M, Adidas, Starbucks, B130 {POI, House Number, keyword, tag}.

#### Optional Parameter
1. `filter(String)`:This parameter helps you restrict the result either by mentioning a bounded area or to certain mapplspin (6 digit code to any poi, locality, city, etc.) below mentioned are the various types:
    - filter = bounds: lat1, lng1; lat2, lng2 (latitude, longitude) {e.g. filter: "bounds:28.598882,77.212407;28.467375,77.353513"}
    - filter = cop: {mapplspin} (string) {e.g. filter: "cop:YMCZ0J"}
2. `pod(String)`: it takes in the place type code which helps in restricting the results to certain chosen type. **Below mentioned are the codes for the pod**
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_SUB_LOCALITY: Sublocality
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_LOCALITY: Locality
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_CITY: City
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_VILLAGE: Village
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_SUB_DISTRICT: Subdistrict
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_DISTRICT: District
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_STATE: State
    - MapplsGL.RestApi.AutoSuggestCriteria.POD_SUB_SUB_LOCALITY: Subsublocality
3. `location(Location)`: e.g. location: {latitude: 28.454, longitude: 77.435}
4. `tokenizeAddress(boolean)`: provides the different address attributes in a structured object.
5. `zoom(double)`: takes the zoom level of the current scope of the map (min: 4, max: 18).
6. `hyperLocal(boolean)`: This parameter lets the search give results that are hyper-localized to the reference location passed in the location parameter. This means that nearby results are given a higher ranking than results far from the reference location. Highly prominent results will still appear in the search results, however they will be lower in the list of results. This parameter will work ONLY in conjunction with the location parameter.

### Response Parameter
1. `suggestedLocations(Array<ELocation>`: A List of the suggested location
2. `userAddedLocations(Array<ELocation>)`: List of usr added locations
3. `suggestedSearches(Array<SuggestedSearchAtlas>)`: List of suggestion related to your search.

#### ELocation Response Result Parameter
1. `mapplsPin(String)`: Mappls Pin of the location 6-char alphanumeric.
2. `placeAddress(String)`:Address of the location.
3. `latitude(number)`: Latitude of the location.
4. `longitude(number)`: longitude of the location.
5. `type(String)`: type of location POI or Country or City
6. `placeName(string)`: Name of the location.
7. `addressTokens(AddressTokens)`
8. `orderIndex(number)`: the order where this result should be placed
9. `distance(number)`: aerial distance in meters from reference location

#### AddressTokens Response Result parameter
1. `houseNumber(string)`: house number of the location.
2. `houseName(string)`: house name of the location.
3. `poi(string)`: name of the POI (if applicable)
4. `street(string)`: name of the street. (if applicable)
5. `subSubLocality(string)`: the sub-sub-locality to which the location belongs. (if applicable)
6. `subLocality(string)`: the sub-locality to which the location belongs. (if applicable)
7. `locality(string)`: the locality to which the location belongs. (if applicable)
8. `village(string)`: the village to which the location belongs. (if applicable)
9. `subDistrict(string)`: the sub-district to which the location belongs. (if applicable)   
10. `district(string)`: the district to which the location belongs. (if applicable)
11. `city(string)`: the city to which the location belongs. (if applicable)
12. `state(string)`: the state to which the location belongs. (if applicable)
13. `pincode(string)`: the PIN code to which the location belongs. (if applicable)

#### SuggestedSearchAtlas Result Response parameter
1. `keyword(string)`: what the user typed in.
2. `identifier(string)`: what did the API use for it to qualify it as a suggested search request
3. `location(string)`: the name of the location to which the nearby will run in context to.
4. `hyperLink(string)`: the ready-made link for the nearby API pre-initialized with all default parameters and location with code to search for.


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
