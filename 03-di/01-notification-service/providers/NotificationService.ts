import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SenderEmail } from "../transport/sender-email";
import { SmsGateway } from "../transport/sms-gateway";
import { LoggerService } from "./logger.service";

export const SENDER_EMAIL = "SENDER_EMAIL";
export const SMS_GATEWAY = "SMS_GATEWAY";

/**
 * Здесь кажется сомнительно выбрасывать exception ,тк ошибка всплывает до контролера
 * и на методы создания и обновления будет возвращено 400. Фактически отсутствие этих полей
 * как будто не должно влиять на бизнес-логику процесса создания и обновления таски
 * Наверное по-хорошему ,мы должны показывать юзеру в веб-интерфейсе ,что у него не указаны
 * необходимые данные для каналов оповещений и просто отключить ему их ,не аффектив эти запросы
 */
@Injectable()
export class NotificationService {
  constructor(
    @Inject(SENDER_EMAIL) private readonly senderEmail: SenderEmail,
    @Inject(SMS_GATEWAY) private readonly smsGateway: SmsGateway,
    private readonly loggerService: LoggerService,
  ) {}

  sendEmail(to: string, subject: string, message: string) {
    if (!to) throw new BadRequestException("Email пользователя не задан!");
    this.senderEmail.send(to, subject, message);
    this.loggerService.log(message);
  }

  sendSMS(to: string, message: string) {
    if (!to) throw new BadRequestException("Телефон пользователя не задан!");
    // Если message пустой ,значит изменений не было
    if (message) this.smsGateway.send(to, message);
    this.loggerService.log(message);
  }
}
