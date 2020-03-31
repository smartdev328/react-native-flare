//
//  LogManager.h
//  GetFlare
//
//  Created by Kevin Schildhorn on 3/31/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#import "GCDAsyncSocket.h" // for TCP
#import "GCDAsyncUdpSocket.h" // for UDP

NS_ASSUME_NONNULL_BEGIN
@interface LogManager : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
