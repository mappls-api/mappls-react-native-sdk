require 'json'

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'


Pod::Spec.new do |s|
  s.name		= "mappls-map-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.homepage    	= "https://github.com/mappls-api/mappls-react-native-sdk"
  s.source      	= { :git => "https://github.com/mappls-api/mappls-react-native-sdk" }
  s.platform    	= :ios, "8.0"

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency 'MapplsAPICore', '1.0.16'
  s.dependency 'MapplsAPIKit/Base', '2.0.30'
  s.dependency 'MapplsMap/Base', '5.13.16'
  s.dependency 'MapplsLMS/Base', '1.0.6'
  s.dependency 'MapplsAnnotationExtension/Base', '1.0.2'
  s.dependency 'MapplsGeoanalytics/Base', '1.0.0'
  s.dependency 'MapplsFeedbackKit/Base', '2.0.0'

   # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"

    # Don't install the dependencies when we run `pod install` in the old architecture.
    if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig    = {
          "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
          "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
          "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }
      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
    end
  end
end
