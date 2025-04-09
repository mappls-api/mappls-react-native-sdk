# iOS Installation

## React-Native > `0.60.0`

The following assumes, that you're using autolinking and installed

`mappls-map-react-native-beta` via `npm` or `yarn`.

<br>

The following is required for every following setup

Add the following to your `ios/Podfile`:

```ruby
  pre_install do |installer|
    $RNMBGL.pre_install(installer)
    ... other pre install hooks
  end
```

```ruby
  post_install do |installer|
    $RNMBGL.post_install(installer)
    ... other post install hooks
  end
```


```sh
# Go to the ios folder
cd ios

# Run Pod Install
pod install
```

You are good to go!

Read on if you want to edit your Mappls version or flavor.

<br>

## Mappls Maps SDK

It is possible to set a custom version of the Mappls SDK:

### New version - since `8.1rc5`

Add the following to you `ios/Podfile`:

```ruby
$ReactNativeMapboxGLIOSVersion = '~> 6.1'
```

Check the current version of the SDK [here](https://docs.mapbox.com/ios/maps/overview/).

### Mappls Maps SDK > `v6.0.0`

If you are using version `v1.0.0` of the SDK or later, you will need to authorize your download of the Maps SDK with a secret access token with the `DOWNLOADS:READ` scope. This [guide](https://docs.mapbox.com/ios/maps/guides/install/#configure-credentials) explains how to configure the secret token under section `Configure your secret token`.

<br>

## React-Native < `0.60.0`

### Using CocoaPods without autolink

To install with CocoaPods, add the following to your `Podfile`:

```ruby
  # Mapbox
  pod 'mappls-map-react-native', :path => '../node_modules/mappls-map-react-native-beta'

```

Then run `pod install` and rebuild your project.
