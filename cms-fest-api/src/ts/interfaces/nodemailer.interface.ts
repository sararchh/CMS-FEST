export interface MailConfig {
  host: string;
  port: string;
  secure: boolean;
  auth: {
      user: string;
      pass: string;
  };
  default: {
      from: string;
  };
}
