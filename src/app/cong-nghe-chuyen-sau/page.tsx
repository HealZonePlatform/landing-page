'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Box, Code2, Cpu, Flame, GitBranch, MonitorCheck, Network, Scan, ServerCog } from 'lucide-react';
import type { ReactNode } from 'react';

type AdvancedTechnology = {
  name: string;
  description: string;
  icon: ReactNode;
};

const advancedTechnologies: AdvancedTechnology[] = [
  {
    name: 'TensorFlow',
    description: 'Khung học máy được tối ưu để trích xuất đặc trưng da và huấn luyện các mô hình phân loại chi tiết.',
    icon: <Cpu className="h-12 w-12 text-primary-600" strokeWidth={1.5} />,
  },
  {
    name: 'PyTorch',
    description: 'Nền tảng deep learning linh hoạt giúp thử nghiệm nhanh các kiến trúc mạng phù hợp từng làn da.',
    icon: <Flame className="h-12 w-12 text-rose-500" strokeWidth={1.5} />,
  },
  {
    name: 'OpenCV',
    description: 'Thư viện thị giác máy tính dùng để cân bằng ánh sáng, lọc nhiễu và xác định vùng da cần chú ý.',
    icon: <Scan className="h-12 w-12 text-sky-500" strokeWidth={1.5} />,
  },
  {
    name: 'Next.js',
    description: 'Framework React giúp hiển thị nhanh, tối ưu SEO và tích hợp mượt các thành phần AI trên giao diện.',
    icon: <MonitorCheck className="h-12 w-12 text-gray-800" strokeWidth={1.5} />,
  },
  {
    name: 'Docker',
    description: 'Container hóa mọi dịch vụ AI để triển khai đồng nhất, dễ mở rộng và tự động kiểm soát phiên bản.',
    icon: <Box className="h-12 w-12 text-cyan-500" strokeWidth={1.5} />,
  },
  {
    name: 'Kubernetes',
    description: 'Điều phối cụm máy chủ, tự động phân bổ tài nguyên cho các tác vụ phân tích hàng nghìn ảnh mỗi ngày.',
    icon: <Network className="h-12 w-12 text-blue-600" strokeWidth={1.5} />,
  },
  {
    name: 'C# backend',
    description: 'Xây dựng dịch vụ lõi bằng C# để xử lý tác vụ tính toán nặng và kết nối an toàn với hạ tầng AI.',
    icon: <ServerCog className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />,
  },
  {
    name: 'TypeScript backend',
    description: 'Các API realtime viết bằng TypeScript bảo đảm dữ liệu đồng bộ và dễ dàng mở rộng cho ứng dụng web.',
    icon: <Code2 className="h-12 w-12 text-indigo-500" strokeWidth={1.5} />,
  },
  {
    name: 'Kiến trúc microservices',
    description: 'Chia nhỏ hệ thống thành dịch vụ độc lập để triển khai song song, theo dõi và bảo trì thuận tiện.',
    icon: <GitBranch className="h-12 w-12 text-secondary-600" strokeWidth={1.5} />,
  },
];

const CongNgheChuyenSauPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Công nghệ chuyên sâu</h1>
            <p className="text-lg text-gray-600">
              Lớp kỹ thuật nền tảng đứng sau healzone giúp chúng tôi tạo ra trải nghiệm chăm da thông minh và chính xác.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4">{tech.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{tech.name}</h2>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-600 px-6 py-3 font-semibold text-primary-600 transition hover:bg-primary-50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8m4 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CongNgheChuyenSauPage;
