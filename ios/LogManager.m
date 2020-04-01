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
  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];

  NSDateFormatter *dateFormatterFirst = [[NSDateFormatter alloc] init];
  [dateFormatterFirst setLocale:enUSPOSIXLocale];
  [dateFormatterFirst setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
  
  NSDateFormatter *dateFormatterSecond = [[NSDateFormatter alloc] init];
  [dateFormatterSecond setLocale:enUSPOSIXLocale];
  [dateFormatterSecond setDateFormat:@"MM/dd/yyyy hh:mm:ss Z"];
  
  NSDate *date = [NSDate date];
  NSData *data = [
    [NSString stringWithFormat:@"<22>1 %@ Mobile logger - - - [%@] %@: %@",
     [dateFormatterFirst stringFromDate:date],
     [dateFormatterSecond stringFromDate:date],
     logType,
     log]
    dataUsingEncoding:NSUTF8StringEncoding
  ];
  
  GCDAsyncUdpSocket *udpSocket;
  udpSocket = [[GCDAsyncUdpSocket alloc] initWithSocketQueue:dispatch_get_main_queue()];
  [udpSocket sendData:data toHost:@"logs6.papertrailapp.com" port:14765 withTimeout:-1 tag:1];
}

@end
