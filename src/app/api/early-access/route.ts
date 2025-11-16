import { NextResponse } from 'next/server';
import { appendRow } from '@/lib/server/googleSheets';
import { sendMail } from '@/lib/server/mailer';

type EarlyAccessPayload = {
  name?: string;
  email?: string;
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
    const payload = (await request.json()) as EarlyAccessPayload;
    const name = payload.name?.trim();
    const email = payload.email?.trim();

    if (!email) {
      return NextResponse.json({ message: 'Email là bắt buộc.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Email không hợp lệ.' }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEETS_ID;
    if (!sheetId) {
      return NextResponse.json(
        { message: 'Thiếu biến môi trường GOOGLE_SHEETS_ID.' },
        { status: 500 },
      );
    }

    const range = process.env.GOOGLE_SHEETS_EARLY_ACCESS_RANGE || 'EarlyAccess!A:D';
    const timestamp = new Date().toISOString();

    await appendRow({
      sheetId,
      range,
      values: [timestamp, name || '', email, 'early-access'],
    });

    const productName = process.env.APP_BRAND_NAME || 'healzone';
    const landingUrl = process.env.APP_LANDING_URL || 'https://healzoneplatform.github.io/ai-skincare-platform/';

    const adminRecipients = getAdminRecipients();

    const safeName = name ? escapeHtml(name) : 'bạn';

    await Promise.all([
      sendMail({
        to: email,
        subject: `Chào mừng bạn đến với ${productName}!`,
        text: [
          `Xin chào ${name || 'bạn'},`,
          '',
          `Cảm ơn bạn đã đăng ký truy cập sớm ${productName}. Chúng tôi sẽ gửi thông tin cập nhật ngay khi phiên bản dùng thử sẵn sàng.`,
          '',
          `Trong lúc chờ đợi, bạn có thể tìm hiểu thêm tại ${landingUrl}.`,
          '',
          'Thân mến,',
          `Đội ngũ ${productName}`,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #fc95ae;">Chào mừng bạn đến với ${productName}!</h2>
            <p>Xin chào ${safeName},</p>
            <p>Cảm ơn bạn đã đăng ký truy cập sớm. Đội ngũ ${productName} đang hoàn thiện những bước cuối cùng để bạn có thể trải nghiệm nền tảng chăm da thông minh.</p>
            <p>Chúng tôi sẽ ưu tiên gửi lời mời dùng thử cho bạn ngay khi sẵn sàng. Trong lúc chờ đợi, bạn có thể khám phá thêm tại <a href="${landingUrl}" style="color: #fc95ae;">trang giới thiệu của ${productName}</a>.</p>
            <p>Thân mến,<br/>Đội ngũ ${productName}</p>
          </div>
        `,
      }),
      adminRecipients.length
        ? sendMail({
            to: adminRecipients,
            subject: `Đăng ký truy cập sớm mới: ${name || email}`,
            text: `Người dùng mới đăng ký truy cập sớm:\n- Tên: ${name || 'Chưa cung cấp'}\n- Email: ${email}\n- Thời gian: ${timestamp}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h3 style="color: #fc95ae;">Đăng ký truy cập sớm mới</h3>
                <ul>
                  <li><strong>Tên:</strong> ${name ? escapeHtml(name) : 'Chưa cung cấp'}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Thời gian:</strong> ${timestamp}</li>
                </ul>
              </div>
            `,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ message: 'Đăng ký truy cập sớm thành công.' });
  } catch (error) {
    console.error('Early access signup error:', error);
    const message =
      error instanceof Error
        ? error.message
        : 'Có lỗi xảy ra khi xử lý đăng ký truy cập sớm.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
