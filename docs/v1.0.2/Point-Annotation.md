[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)
# PointAnnotation
## MapplsGL.PointAnnotation

PointAnnotation represents a one-dimensional shape located at a single geographical coordinate.

### props
| Prop | Type | Default | Required | Description |
| ---- | :--: | :-----: | :------: | :----------: |
| id | `string` | `none` | `true` | A string that uniquely identifies the annotation |
| title | `string` | `none` | `false` | The string containing the annotation’s title. Note this is required to be set if you want to see a callout appear on iOS. |
| snippet | `string` | `none` | `false` | The string containing the annotation’s snippet(subtitle). Not displayed in the default callout. |
| selected | `bool` | `none` | `false` | Manually selects/deselects annotation<br/>@type {[type]} |
| draggable | `bool` | `false` | `false` | Enable or disable dragging. Defaults to false. |
| mapplsPin| `string` | `none` | `false` | The center point (specified as a mapplsPin string) of the annotation. |
| coordinate | `array` | `none` | `true` | The center point (specified as a map coordinate) of the annotation. |
| anchor | `shape` | `{x: 0.5, y: 0.5}` | `false` | Specifies the anchor being set on a particular point of the annotation.<br/>The anchor point is specified in the continuous space [0.0, 1.0] x [0.0, 1.0],<br/>where (0, 0) is the top-left corner of the image, and (1, 1) is the bottom-right corner.<br/>Note this is only for custom annotations not the default pin view.<br/>Defaults to the center of the view. |
| onSelected | `func` | `none` | `false` | This callback is fired once this annotation is selected. Returns a Feature as the first param. |
| onDeselected | `func` | `none` | `false` | This callback is fired once this annotation is deselected. |
| onDragStart | `func` | `none` | `false` | This callback is fired once this annotation has started being dragged. |
| onDragEnd | `func` | `none` | `false` | This callback is fired once this annotation has stopped being dragged. |


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


