// https://github.com/thoughtbot/react-native-settings-url/

#import "GFSettingsUrl.h"
#import <UIKit/UIKit.h>
@import Contacts;

@implementation GFSettingsUrl

RCT_EXPORT_MODULE();

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
@end
