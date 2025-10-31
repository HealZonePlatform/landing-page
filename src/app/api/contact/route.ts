import { NextResponse } from 'next/server';
import { appendRow } from '@/lib/server/googleSheets';
import { sendMail } from '@/lib/server/mailer';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getAdminRecipients = (): string[] => {
  const raw = process.env.MAIL_ADMIN || process.env.MAIL_TO_ADMIN;
  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const message = payload.message?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ message: 'Vui lòng nhập tên của bạn.' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ message: 'Email là bắt buộc.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Email không hợp lệ.' }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ message: 'Tin nhắn cần ít nhất 10 ký tự.' }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!sheetId) {
      return NextResponse.json(
        { message: 'Thiếu biến môi trường GOOGLE_SHEETS_ID.' },
        { status: 500 },
      );
    }

    const range = process.env.GOOGLE_SHEETS_CONTACT_RANGE || 'Contact!A:D';
    const timestamp = new Date().toISOString();

    await appendRow({
      sheetId,
      range,
      values: [timestamp, name, email, message],
    });

    const productName = process.env.APP_BRAND_NAME || 'healzone';
    const adminRecipients = getAdminRecipients();

    const sanitizedName = escapeHtml(name);
    const sanitizedMessage = escapeHtml(message);

    const mailTasks: Array<Promise<void>> = [
      sendMail({
        to: email,
        subject: `Chúng tôi đã nhận được tin nhắn của bạn`,
        text: [
          `Xin chào ${name},`,
          '',
          `Cảm ơn bạn đã liên hệ với đội ngũ ${productName}. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.`,
          '',
          'Thông tin bạn đã gửi:',
          message,
          '',
          'Thân mến,',
          `Đội ngũ ${productName}`,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d7842c;">${productName} đã nhận được tin nhắn của bạn</h2>
            <p>Xin chào ${sanitizedName},</p>
            <p>Cảm ơn bạn đã chia sẻ. Đội ngũ ${productName} sẽ phản hồi trong thời gian sớm nhất.</p>
            <p><strong>Nội dung bạn gửi:</strong></p>
            <blockquote style="background: #f5f5f5; padding: 12px 16px; border-radius: 8px; color: #333;">
              ${sanitizedMessage.replace(/\n/g, '<br/>')}
            </blockquote>
            <p>Thân mến,<br/>Đội ngũ ${productName}</p>
          </div>
        `,
      }),
    ];

    if (adminRecipients.length) {
      mailTasks.push(
        sendMail({
          to: adminRecipients,
          subject: `Tin nhắn mới từ ${name}`,
          text: `Tin nhắn mới:\n- Tên: ${name}\n- Email: ${email}\n- Thời gian: ${timestamp}\n- Nội dung: ${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h3 style="color: #d7842c;">Tin nhắn mới từ khách hàng</h3>
              <ul>
                <li><strong>Tên:</strong> ${sanitizedName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Thời gian:</strong> ${timestamp}</li>
              </ul>
              <p><strong>Nội dung:</strong></p>
              <blockquote style="background: #f5f5f5; padding: 12px 16px; border-radius: 8px; color: #333;">
                ${sanitizedMessage.replace(/\n/g, '<br/>')}
              </blockquote>
            </div>
          `,
        }),
      );
    }

    await Promise.all(mailTasks);

    return NextResponse.json({ message: 'Đã nhận được tin nhắn của bạn.' });
  } catch (error) {
    console.error('Contact form error:', error);
    const message =
      error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
