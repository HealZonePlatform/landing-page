'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Tải ảnh lên',
    description:
      'Chụp hoặc tải ảnh khuôn mặt với ánh sáng tốt để chúng tôi ghi nhận tình trạng da chính xác nhất.',
    number: '01',
  },
  {
    title: 'Phân tích AI',
    description:
      'Thuật toán AI nhận diện loại da, kết cấu, độ ẩm, lỗ chân lông, nếp nhăn và các chỉ số cốt lõi chỉ trong vài giây.',
    number: '02',
  },
  {
    title: 'Nhận kết quả',
    description:
      'Báo cáo trực quan trình bày điểm số, vùng cần cải thiện và ưu tiên hành động theo thứ tự rõ ràng.',
    number: '03',
  },
  {
    title: 'Kế hoạch cá nhân',
    description:
      'Nhận checklist từng bước, mẹo sinh hoạt và khuyến nghị sản phẩm phù hợp để duy trì làn da khỏe.',
    number: '04',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Cách thức <span className="text-primary-600">hoạt động</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nhận tư vấn chăm sóc da cá nhân hóa thật đơn giản với nền tảng AI của chúng tôi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-brand-cream p-6 rounded-2xl shadow-lg relative overflow-hidden border border-brand-taupe/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-forest/70" />
              <div className="absolute -left-4 -top-4">
                <div className="h-14 w-14 rounded-2xl border-2 border-brand-forest/80 bg-brand-forest/10 flex items-center justify-center shadow-sm">
                  <span className="text-xl font-semibold text-brand-accent">{step.number}</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-brand-ink mb-3">{step.title}</h3>
                <p className="text-brand-ink/80">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
