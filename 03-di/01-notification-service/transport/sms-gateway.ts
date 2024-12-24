export class SmsGateway {
  send(to: string, message: string) {
    console.log(`SMS sent to ${to}: ${message}`);
  }
}
