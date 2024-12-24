import { ClassProvider, DynamicModule, Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import {
  NotificationService,
  SENDER_EMAIL,
  SMS_GATEWAY,
} from "../providers/NotificationService";
import { SenderEmail } from "../transport/sender-email";
import { SmsGateway } from "../transport/sms-gateway";
import { LoggerService } from "../providers/logger.service";

interface TaskModuleOptions {
  smsGateway?: SmsGateway;
  senderEmail?: SenderEmail;
  deps?: any[];
}

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    NotificationService,
    LoggerService,
    {
      provide: SENDER_EMAIL,
      useClass: SenderEmail,
    },
    {
      provide: SMS_GATEWAY,
      useClass: SmsGateway,
    },
  ],
})
export class TasksModule {
  static register(options: TaskModuleOptions = {}): DynamicModule {
    return {
      module: TasksModule,
      providers: [
        {
          provide: SENDER_EMAIL,
          useClass: options.senderEmail || SenderEmail,
          inject: options.deps || [],
        } as ClassProvider<SenderEmail>,
        {
          provide: SMS_GATEWAY,
          useClass: options.smsGateway || SmsGateway,
          inject: options.deps || [],
        } as ClassProvider<SmsGateway>,
      ],
    };
  }
}
