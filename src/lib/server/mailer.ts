import nodemailer from 'nodemailer';

type MailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

type MailerInstance = {
  transporter: nodemailer.Transporter;
  isTestAccount: boolean;
  testAccountUser?: string;
};

let transporterPromise: Promise<MailerInstance | null> | null = null;

const getTransporter = async (): Promise<MailerInstance | null> => {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const host = process.env.SMTP_HOST;
      const port = Number(process.env.SMTP_PORT || 587);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      if (!host || !user || !pass) {
        const testAccount = await nodemailer.createTestAccount();
        console.warn(
          '[mailer] SMTP credentials are missing. Using Ethereal test SMTP account instead. Provide SMTP_HOST, SMTP_USER, SMTP_PASS (and optionally SMTP_PORT, SMTP_SECURE) to send real emails.',
        );

        const transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        return {
          transporter,
          isTestAccount: true,
          testAccountUser: testAccount.user,
        };
      }

      const secure =
        process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1' || port === 465;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });

      return {
        transporter,
        isTestAccount: false,
      };
    })();
  }

  return transporterPromise;
};

export const sendMail = async ({ to, subject, html, text }: MailOptions): Promise<void> => {
  const instance = await getTransporter();

  if (!instance) {
    console.warn('[mailer] Skipping email send because transporter is not configured.', {
      to,
      subject,
    });
    return;
  }

  const { transporter, isTestAccount, testAccountUser } = instance;
  const from =
    process.env.MAIL_FROM || process.env.SMTP_USER || (isTestAccount ? testAccountUser : undefined);

  if (!from) {
    console.warn('[mailer] Missing MAIL_FROM / SMTP_USER. Email was not sent.', { to, subject });
    return;
  }

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });

  if (isTestAccount) {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.info('[mailer] Email preview (Ethereal):', previewUrl);
    }
  }
};
