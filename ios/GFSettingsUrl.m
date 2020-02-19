// This module is slightly misnamed; it's sort of a dumping ground for small bits
// of native code that we want to have.

#import "GFSettingsUrl.h"
#import <UIKit/UIKit.h>
#import <sys/utsname.h>
@import Contacts;

@implementation GFSettingsUrl

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport {
  return @{
    @"deviceId": [self getDeviceId]
  };
}

// https://github.com/thoughtbot/react-native-settings-url/
RCT_REMAP_METHOD(getUrl,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(UIApplicationOpenSettingsURLString);
};

RCT_REMAP_METHOD(getContactsOrder,
                  getContactsResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  CNContactsUserDefaults* defaults = [CNContactsUserDefaults sharedDefaults];
  switch ([defaults sortOrder]) {
    case CNContactSortOrderNone:
      resolve(@"none");
      break;
    case CNContactSortOrderGivenName:
      resolve(@"given_name");
      break;
    case CNContactSortOrderFamilyName:
      resolve(@"family_name");
      break;
    case CNContactSortOrderUserDefault:
      resolve(@"user_default");
      break;
    default:
      reject(@"wtf", @"Unexpected Contacts Order", nil);
      break;
  }
}

// https://github.com/react-native-community/react-native-device-info/blob/master/ios/RNDeviceInfo/RNDeviceInfo.m
- (NSString *) getDeviceId {
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    if ([deviceId isEqualToString:@"i386"] || [deviceId isEqualToString:@"x86_64"] ) {
        deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
    }
    return deviceId;
}
@end
