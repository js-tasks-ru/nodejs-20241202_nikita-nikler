export class SenderEmail {
  send(to: string, subject: string, message: string) {
    console.log(`Email sent to ${to}: [${subject}] ${message}`);
  }
}
