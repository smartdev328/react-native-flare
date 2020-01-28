
#import "GFPermissionWatcher.h"
@import CoreLocation;

@interface GFPermissionWatcher() <CLLocationManagerDelegate>
@property (nonatomic, strong) CLLocationManager *locationManager;
@end

@implementation GFPermissionWatcher {
  bool hasListeners;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"PermissionStatus"];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)startObserving
{
  hasListeners = YES;
  _locationManager = [CLLocationManager new];
  [_locationManager setDelegate:self];
}

- (void)stopObserving
{
  hasListeners = NO;

  [_locationManager setDelegate:nil];
  _locationManager = nil;
}

+ (NSString *)locationStatusToString:(CLAuthorizationStatus)status
{
  switch (status) {
    case kCLAuthorizationStatusAuthorizedAlways:
      return @"authorized_always";
    case kCLAuthorizationStatusAuthorizedWhenInUse:
      return @"authorized_when_in_use";
    case kCLAuthorizationStatusDenied:
      return @"denied";
    case kCLAuthorizationStatusRestricted:
      return @"restricted";
    case kCLAuthorizationStatusNotDetermined:
    default:
      return nil;
  }
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  NSString *str = [GFPermissionWatcher locationStatusToString:status];
  if (hasListeners && str != nil) {
    [self sendEventWithName:@"PermissionStatus" body:@{@"status": str}];
  }
}

@end
