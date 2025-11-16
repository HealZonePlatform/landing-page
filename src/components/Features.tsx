'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  SlidersHorizontal,
  UserCheck,
  LineChart,
  ShoppingBag,
  HeartPulse,
} from 'lucide-react';

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: FeatureCard[] = [
  {
    title: 'Phân tích da bằng AI',
    description:
      'Thuật toán thị giác tiên tiến đọc hiểu từng chi tiết trên làn da của bạn để tạo ra chẩn đoán nhanh và chính xác.',
    icon: BrainCircuit,
  },
  {
    title: 'Quy trình cá nhân hóa',
    description:
      'Lộ trình chăm sóc được thiết kế theo loại da, lối sống và mục tiêu riêng của bạn để dễ dàng tuân thủ hằng ngày.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Tư vấn chuyên gia',
    description:
      'Kết nối với chuyên gia da liễu và đội ngũ coach để nhận lời khuyên chuẩn y khoa ngay bên trong ứng dụng.',
    icon: UserCheck,
  },
  {
    title: 'Theo dõi tiến trình',
    description:
      'Biểu đồ diễn tiến nhắc bạn so sánh trước – sau, đánh dấu các cột mốc và điều chỉnh kế hoạch kịp thời.',
    icon: LineChart,
  },
  {
    title: 'Gợi ý sản phẩm',
    description:
      'Danh sách sản phẩm được tuyển chọn kỹ dựa trên thành phần và ngân sách giúp bạn mua sắm đúng nhu cầu.',
    icon: ShoppingBag,
  },
  {
    title: 'Thông tin sức khỏe da',
    description:
      'Cẩm nang kiến thức cập nhật liên tục với mẹo dinh dưỡng, ngủ nghỉ và chăm sóc từ dữ liệu cá nhân của bạn.',
    icon: HeartPulse,
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Những <span className="text-primary-600">tính năng</span> mạnh mẽ cho làn da khỏe mạnh hơn
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nền tảng AI của chúng tôi cung cấp giải pháp chăm sóc da toàn diện được thiết kế riêng cho nhu cầu của bạn.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="bg-white/95 p-6 rounded-2xl shadow-lg border border-brand-taupe/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="text-xl font-bold text-brand-ink mb-2">{feature.title}</h3>
                <p className="text-brand-ink/80">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
