//
//  LogManager.m
//  GetFlare
//
//  Created by Kevin Schildhorn on 3/31/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "LogManager.h"

@implementation LogManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(info:(NSString *)log logType:(NSString *)logType)
{
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
  [dateFormatter setLocale:enUSPOSIXLocale];
  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
  
  GCDAsyncUdpSocket *udpSocket;
  udpSocket = [[GCDAsyncUdpSocket alloc] initWithSocketQueue:dispatch_get_main_queue()];

  NSData *data = [
    [NSString stringWithFormat:@"<22>1 %@ Mobile logger - - - %@: %@",[dateFormatter stringFromDate:[NSDate date]],logType,log]
    dataUsingEncoding:NSUTF8StringEncoding
  ];
  [udpSocket sendData:data toHost:@"logs6.papertrailapp.com" port:14765 withTimeout:-1 tag:1];
}

@end
