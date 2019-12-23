//
//  GFCallManager.h
//  GetFlare
//
//  Created by Mike Castleman on 12/23/19.
//  Copyright © 2019 Flare. All rights reserved.
//

#ifndef GFCallManager_h
#define GFCallManager_h

@import CallKit;
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface GFCallManager : RCTEventEmitter<RCTBridgeModule, CXCallObserverDelegate>

@end

#endif /* GFCallManager_h */
