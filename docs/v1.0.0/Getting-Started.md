
[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls React Native SDK

**Easy To Integrate Maps & Location APIs & SDKs For Android Applications**

Powered with India's most comprehensive and robust mapping functionalities.

1. You can get your api key to be used in this document here: [https://about.mappls.com/api/signup](https://about.mappls.com/api/signup)

2. The sample code is provided to help you understand the basic functionality of Mappls maps & REST APIs working on **Android** native development platform.

4. Explore through [200+ countries & territories](https://github.com/MapmyIndia/mapmyindia-rest-api/blob/master/docs/countryISO.md) with **Global Search, Routing and Mapping APIs & SDKs** by Mappls.

## [Getting Started](#getting-started)

### [Installation](#installation)

**Dependencies**

* [node](https://nodejs.org)
* [npm](https://www.npmjs.com/)
* [React Native](https://facebook.github.io/react-native/):  recommended version 0.60 or greater

**npm**
~~~
npm install mappls-map-react-native --save
~~~

#### IOS Installation
**React-Native >=  `0.60.0`**

If you are using autolinking feature introduced in React-Native  `0.60.0`  you do not need any additional steps.
Just run  `pod install`  and rebuild your project.

**React-Native < `0.60.0`**

##### Using CocoaPods
To install with CocoaPods, add the following to your  `Podfile`:
```
  # Mappls
  pod 'mappls-map-react-native', :path => '../node_modules/mappls-map-react-native'

  # Make also sure you have use_frameworks! enabled
  use_frameworks!

```

Then run  `pod install`  and rebuild your project.

If you cannot use  `use_frameworks!`  for some reason, please see our workaround -  [https://github.com/react-native-mapbox-gl/maps/pull/714](https://github.com/react-native-mapbox-gl/maps/pull/714)

#### Android Installation
**React-Native >=  `0.60.0`**
If you are using autolinking feature introduced in React-Native  `0.60.0`   have to add only following lines in `android/build.gradle` file:-

* We need to add an additional repository in order to get our dependencies.
```diff
allprojects {
    repositories {
        mavenLocal()
        google()
        jcenter()
        maven { url "https://jitpack.io" }
+       maven { url 'https://maven.mappls.com/repository/mappls/'}
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```

**React-Native < `0.60.0`**

`react-native link` should get you almost there,  
however we need to add some additional lines to `build.gradle`.

    
## 1. `android/build.gradle`
We need to add an additional repository in order to get our dependencies.

* `https://jitpack.io`
* `https://maven.mappls.com/repository/mappls/ `
```diff
allprojects {
    repositories {
        mavenLocal()
        google()
        jcenter()
+       maven { url "https://jitpack.io" }
+       maven { url 'https://maven.mappls.com/repository/mappls/'}
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```

Make sure that your `buildscript > ext` settings are correct.
We want to be on `28` or higher:

```
buildscript {
    ext {
        buildToolsVersion = "28.0.3"
        compileSdkVersion = 28
        targetSdkVersion = 28
    }
}
```

Everything below should've been covered by `react-native link`,   
however it never hurts to make sure it actually did what it was supposed to

---


## 2. `android/app/build.gradle`

Add project under `dependencies`

```diff
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"  // From node_modules
+   implementation project(':mappls-map-react-native')
}
```

You can set the Support Library version or the okhttp version if you use other modules that depend on them:
* `supportLibVersion "28.0.0"`
* `okhttpVersion "3.12.1"`


## 3. `android/settings.gradle`

Include project, so gradle knows where to find the project

```diff
rootProject.name = <YOUR_PROJECT_NAME>

+include ':mappls-map-react-native'
+project(':mappls-map-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/mappls-map-react-native/android/rctmgl')

include ':app'¬
```

## 4. `android/app/src/main/java/com/PROJECT_NAME/MainApplication.java`

We need to register our package

Add `import com.mappls.sdk.maps.rctmgl.RCTMGLPackage;`  
as an import statement and  
`new RCTMGLPackage()` within the `getPackages()` method

```diff
package <YOUR_PROJECT_NAME>;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
+import com.mappls.sdk.maps.rctmgl.RCTMGLPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
+         new RCTMGLPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

```


### [Added Import](#added-import)
~~~javascript
import MapplsGL from 'mappls-map-react-native';
~~~

### [Add your API keys to the SDK](#add-your-api-keys-to-the-sdk)
*Add your API keys to the SDK before using map*
~~~javascript
MapplsGL.setMapSDKKey(mapSDKKey); //place your mapsdkKey
MapplsGL.setRestAPIKey(restAPIKey); //your restApiKey
MapplsGL.setAtlasClientId(atlasClientId); //your atlasClientId key
MapplsGL.setAtlasClientSecret(atlasClientSecret); //your atlasClientSecret key
~~~

*You cannot use the Mappls Map React Native SDK without these function calls. You will find your keys in your API Dashboard.*

### [Add a Mappls Map to your application](#add-a-mappls-map-to-your-application)
~~~javascript
<MapplsGL.MapView
  onMapError={error => console.log(error.code + ' ' + error.message)}
  style={{flex: 1}}>
    <MapplsGL.Camera
      zoomLevel={12}
      centerCoordinate={DEFAULT_CENTER_COORDINATE}
    />
</MapplsGL.MapView>
~~~

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
