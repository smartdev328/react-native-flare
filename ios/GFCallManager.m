//
//  GFCallManager.m
//  GetFlare
//
//  Created by Mike Castleman on 12/23/19.
//  Copyright © 2019 Flare. All rights reserved.
//

#import "GFCallManager.h"

@implementation GFCallManager {
  bool hasListeners;
  CXCallObserver *callObserver;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"CallStatus"];
}

- (void)startObserving
{
  hasListeners = YES;
  callObserver = [[CXCallObserver alloc] init];
  [callObserver setDelegate:self queue:nil];
}

- (void)stopObserving
{
  hasListeners = NO;
  callObserver = nil;
}

- (void)callObserver:(nonnull CXCallObserver *)callObserver callChanged:(nonnull CXCall *)call {
  if (hasListeners) {
    [self sendEventWithName:@"CallStatus" body:@{
      @"hasConnected": @(call.hasConnected),
      @"hasEnded": @(call.hasEnded),
      @"onHold": @(call.onHold),
      @"outgoing": @(call.outgoing)
    }];
  }
}

@end
