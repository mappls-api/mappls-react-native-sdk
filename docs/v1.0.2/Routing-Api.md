[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)
# Routes & Navigation API

## [Routing API](#routing-api)
Routing and displaying driving directions on map, including instructions for navigation, distance to destination, traffic etc. are few of the most important parts of developing a map based application. This REST API calculates driving routes between specified locations including via points based on route type(fastest or shortest), includes delays for traffic congestion , and is capable of handling additional route parameters like: type of roads to avoid, travelling vehicle type etc.

~~~javascript
MapplsGL.RestApi.direction({
    origin: this.state.sourceCoordinates,
    destination: this.state.destinationCoordinates,
    profile: setProfile,
    overview: MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL,
}).then(response => {
    // Handle Response
}).catch(error => {
    // Handle Error
});
~~~

### Request Parameter
#### Mandatory Parameter
1. `origin(string)`: pass the origin point
    - origin can also takes mappls pin in parameter eg., origin("17ZUL7") 
2. `destination(string)`: pass the destination point
    - destination can also takes mappls pin in parameter eg., destination("MMI000")   -

#### Optional Parameter
1. `waypoints(Array<string>)`: pass list of waypoints
2. `excludes(Array<string>)`: Additive list of road classes to avoid, order does not matter. **Below are the available value:**
    - MapplsGL.RestApi.DirectionsCriteria.EXCLUDE_FERRY
    - MapplsGL.RestApi.DirectionsCriteria.EXCLUDE_MOTORWAY
    - MapplsGL.RestApi.DirectionsCriteria.EXCLUDE_TOLL
3. `overview(string)`: Add overview geometry either full, simplified according to highest zoom level it could be display on, or not at all. Below are the available value:
    - MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL
    - MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FALSE
    - MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_SIMPLIFIED
4. `steps(boolean)`: Return route steps for each route leg. Possible values are true/false. By default it will be used as false.
5. `alternatives(boolean)`: Search for alternative routes.
6. `geometries(string)`: This parameter used to change the route geometry format/density (influences overview and per step). **Below are the available value:**
    - MapplsGL.RestApi.DirectionsCriteria.GEOMETRY_POLYLINE: with 5 digit precision
    - MapplsGL.RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6 (Default): with 6 digit precision
7. `profile(string)`: **Below are the available profile:**
    - MapplsGL.RestApi.DirectionsCriteria.PROFILE_DRIVING (Default):Meant for car routing
    - MapplsGL.RestApi.DirectionsCriteria.PROFILE_WALKING: Meant for pedestrian routing. Routing with this profile is restricted to route_adv only. region & rtype request parameters are not supported in pedestrian routing
    - MapplsGL.RestApi.DirectionsCriteria.PROFILE_BIKING:Meant for two-wheeler routing. Routing with this profile is restricted to route_adv only. region & rtype request parameters are not supported in two-wheeler routing.
    - MapplsGL.RestApi.DirectionsCriteria.PROFILE_TRUCKING:Meant for Truck routing. Routing with this profile is restricted to route_adv only. region & rtype request parameters are not supported in truck routing.
8. `resource(string)`: **Below are the available resource:**
    - MapplsGL.RestApi.DirectionsCriteria.RESOURCE_ROUTE (Default): to calculate a route & its duration without considering traffic conditions.
    - MapplsGL.RestApi.DirectionsCriteria.RESOURCE_ROUTE_ETA get the updated duration of a route considering live traffic; Applicable for India only "region=ind" and "rtype=1" is not supported. This is different from route_traffic; since this doesn't search for a route considering traffic, it only applies delays to the default route.
    - MapplsGL.RestApi.DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC: to search for routes considering live traffic; Applicable for India only “region=ind” and “rtype=1” is not supported

### Reponse Parameter
1. `code(string)`: if request is successful, response is .ok.. Else, see the service dependent and general status codes. In case of error, .NoRoute. code is supported (in addition to the general ones) which means no route found.
2. `routes(Array<DirectionsRoute>)`: A list of DirectionsRoute objects, each having potentially multiple via points
3. `waypoints(Array<DirectionsWaypoint>)`: Array of DirectionsWaypoint objects representing all waypoints in order

#### DirectionsRoute Response parameter
1. `distance(number)`: The distance travelled by the route; unit is meter.
2. `duration(number)`: The estimated travel time; unit is second.
3. `geometry(string)`: returns the whole geometry of the route as per given parameter .geometries. default is encoded .polyline6. with 6 digit accuracy for positional coordinates.
4. `legs(Array<RouteLeg>)`: The legs between the given waypoints, representing an array of RouteLeg between two waypoints.

#### RouteLeg Response parameter:
1. `distance(number)`: The distance of travel to the subsequent legs, in meters
2. `duration(number)`: The estimated travel time, in seconds
3. `steps(List<LegStep>)`: Return route steps for each route leg depending upon steps parameter.

#### LegStep Response parameters:
1. `distance(number)`:The distance of travel to the subsequent step, in meters
2. `duration(number)`: The estimated travel time, in seconds
3. `geometry(string)`: The un-simplified geometry of the route segment, depends on the given geometries parameter.
4. `name(string)`: The name of the way along which travel proceeds.
5. `mode(string)`: signifies the mode of transportation; driving as default.
6. `maneuver(StepManeuver)`: A StepManeuver object representing a maneuver
7. `driving_side(string)`: Left. (default) for India, Sri Lanka, Nepal, Bangladesh & Bhutan.
8. `intersections(Array<StepIntersection>)`: A list of StepIntersection objects that are passed along the segment, the very first belonging to the StepManeuver

#### StepManeuver Response parameters:
1. `location(Array<number>)`: A Point describing the location of the turn
2. `bearing_before(number)`: The clockwise angle from true north to the direction of travel immediately before the maneuver.
3. `bearing_after(number)`: The clockwise angle from true north to the direction of travel immediately after the maneuver.
4. `type(string)`: An optional string indicating the direction change of the maneuver.
5. `modifier(string)`: A string indicating the type of maneuver. New identifiers might be introduced without API change. Types unknown to the client should be handled like the .turn. type, the existence of correct modifier values is guaranteed.

#### StepIntersection Response parameters:
1. `location(Array<number>)`: point describing the location of the turn.
2. `bearings(Array<number>)`: A list of bearing values (e.g. [0,90,180,270]) thxat are available at the intersection. The bearings describe all available roads at the intersection.
3. `classes(Array<string>)`: Categorised types of road segments e.g. Motorway
4. `entry(Array<Boolean>)`: A list of entry flags, corresponding in a 1:1 relationship to the bearings. A value of true indicates that the respective road could be entered on a valid route. false indicates that the turn onto the respective road would violate a restriction.
5. `in(number)`: index into bearings/entry array. Used to calculate the bearing just before the turn. Namely, the clockwise angle from true north to the direction of travel immediately before the maneuver/passing the intersection. Bearings are given relative to the intersection. To get the bearing in the direction of driving, the bearing has to be rotated by a value of 180. The value is not supplied for depart maneuvers.
6. `out(number)`: index into the bearings/entry array. Used to extract the bearing just after the turn. Namely, The clockwise angle from true north to the direction of travel immediately after the maneuver/passing the intersection. The value is not supplied for arrive maneuvers.
7. `lanes(Array<IntersectionLanes>)`: Array of IntersectionLanes objects that denote the available turn lanes at the intersection. If no lane information is available for an intersection, the lanes property will not be present.):
    - `valid(boolean)`: verifying lane info.
    - `indications(Array<String>)`: Indicating a sign of directions like Straight, Slight Left, Right, etc.
    
#### DirectionsWaypoint Response parameters:
1. `name(string)`: Name of the street the coordinate snapped to.
2. `location(Array<number>)`: Point describing the snapped location of the waypoint.

## [Driving Distance Matrix API](#driving-distance-matrix-api)
Adding driving directions API would help to add predicted travel time & duration from a given origin point to a number of points. The Driving Distance Matrix API provides driving distance and estimated time to go from a start point to multiple destination points, based on recommended routes from Mappls Maps and traffic flow conditions

Get driving time and distance between a center point and up to 10 destination points using Mappls Maps Distance API.

~~~javascript
MapplsGL.RestApi.distance({
    coordinates: [sourceData, destinationData],
}).then(response => {
    // Handle Response
}).catch(error => {
    // Handle Error
});
~~~

### Request Parameter
#### Mandatory Parameter
1. `coordinates(Array<string>)`: A List full of points which define the points to perform the matrix.

#### Optional Parameter
1. `profile(string)`: Only supports MapplsGL.RestApi.DirectionsCriteria.PROFILE_DRIVING.
2. `resource(string)`: **Below are the available value:**
    - MapplsGL.RestApi.DirectionsCriteria.RESOURCE_DISTANCE (Default): to calculate the route & duration without considering traffic conditions.
    - MapplsGL.RestApi.DirectionsCriteria.RESOURCE_DISTANCE_ETA: to get the updated duration considering live traffic; Applicable for India only “region=ind” and “rtype=1” is not supported. This is different from distance_matrix_traffic; since this doesn't search for a route considering traffic, it only applies delays to the default route.
    - MapplsGL.RestApi.DirectionsCriteria.RESOURCE_DISTANCE_TRAFFIC: to search for routes considering live traffic; Applicable for India only “region=ind” and “rtype=1” is not supported

### Response Parameters
1. `responseCode(number)`: Response codes of the api.
2. `version(string)`: Version of the Api.
3. `results(DistanceResults)`: Array of results, each consisting of the following parameters

#### DistanceResults Response Result Parameters
1. `code(string)`: if the request was successful, code is ok.
2. `durations(Array<Array<number>>)`: Duration in seconds for source to source (default 0), 1st, 2nd, 3rd secondary locations... from source.
3. `distances(Array<Array<number>>)`: Distance in meters for source to source (default 0), 1st, 2nd, 3rd secondary locations... from source.


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
