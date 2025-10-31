'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BellRing, BrainCircuit, FileText, ListChecks, MessageCircleQuestion, ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';

type Technology = {
  name: string;
  description: string;
  icon: ReactNode;
};

const technologies: Technology[] = [
  {
    name: 'Trí tuệ nhân tạo hiểu làn da',
    description: 'AI phân tích ảnh chụp để nhận diện dầu, mụn, sắc tố và độ đàn hồi chỉ trong vài giây.',
    icon: <BrainCircuit className="h-12 w-12 text-primary-600" strokeWidth={1.5} />,
  },
  {
    name: 'Bộ câu hỏi đời thường',
    description: 'Các câu hỏi về giấc ngủ, uống nước và môi trường sống giúp healzone hiểu bạn như người thân.',
    icon: <MessageCircleQuestion className="h-12 w-12 text-secondary-600" strokeWidth={1.5} />,
  },
  {
    name: 'Báo cáo dễ đọc',
    description: 'Biểu đồ và chú thích rõ ràng, diễn giải tình trạng da bằng ngôn ngữ gần gũi thay vì thuật ngữ khó hiểu.',
    icon: <FileText className="h-12 w-12 text-indigo-500" strokeWidth={1.5} />,
  },
  {
    name: 'Hướng dẫn từng bước',
    description: 'Checklist tự đánh dấu giúp bạn biết rõ đã làm đến đâu, không quên bất kỳ bước chăm da nào.',
    icon: <ListChecks className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />,
  },
  {
    name: 'Nhắc lịch linh hoạt',
    description: 'Thông báo qua app và email được lên lịch theo thói quen của bạn để không bỏ lỡ lịch chăm da.',
    icon: <BellRing className="h-12 w-12 text-amber-500" strokeWidth={1.5} />,
  },
  {
    name: 'Gợi ý sản phẩm quen thuộc',
    description: 'Đề xuất các sản phẩm dễ mua tại siêu thị, nhà thuốc để bạn yên tâm bắt đầu và duy trì.',
    icon: <ShoppingBag className="h-12 w-12 text-rose-500" strokeWidth={1.5} />,
  },
];

const TechnologyStack = () => {
  return (
    <section id="technology" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Đặc điểm của healzone
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Chúng tôi giữ lại những trải nghiệm thân thuộc giúp ai cũng dễ dàng áp dụng và duy trì thói quen chăm da.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4">{tech.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/cong-nghe-chuyen-sau"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            Xem thêm
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
