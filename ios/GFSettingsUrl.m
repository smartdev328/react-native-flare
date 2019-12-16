// https://github.com/thoughtbot/react-native-settings-url/

#import "GFSettingsUrl.h"
#import <UIKit/UIKit.h>

@implementation GFSettingsUrl

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getUrl,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(UIApplicationOpenSettingsURLString);
}

@end
