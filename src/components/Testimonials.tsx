'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Lương Đăng Doanh",
    role: "Chuyên viên kiêm kĩ sư AI",
    content: "Là chuyên gia với hơn 5 năm kinh nghiệm về AI, tôi nhận thấy healzone ứng dụng AI rất tốt, đúng kĩ thuật với độ chính xác cao, đưa ra được lời khuyên chi tiết và thân thiên với người dùng.",
    avatar: "/picture/doanh.jpeg",
    rating: 5,
    caseStudyLink: "/case-studies/dermatologist-results",
    verified: true
  },
  {
    id: 2,
    name: "Nguyễn Hạnh Duyên",
    role: "Nhân viên văn phòng",
    content: "Tôi đã vật lộn với mụn trong nhiều năm. Sau 8 tuần sử dụng nền tảng AI, làn da của tôi sạch hơn so với lúc mới đi làm và stress vì deadline. Tính năng đưa ra lộ trình cụ thể và lời khuyên giúp tôi luôn giữ được động lực trong suốt hành trình.",
    avatar: "/picture/duyen.jpeg",
    rating: 5,
    caseStudyLink: "/case-studies/engineer-acne-journey",
    verified: true
  },
  {
    id: 3,
    name: "Nguyễn Thị Tường Vy",
    role: "Dancer & tiktoker",
    content: "Tôi đã thử hàng chục ứng dụng chăm sóc da, nhưng nền tảng AI này thực sự nổi bật. Là người dùng mạng xã hội là chủ yếu, tôi ưu tiên việc chăm sóc sắc đẹp và gương mặt của mình, healzone luôn gợi ý cho tôi những sản phẩm rất tốt và phù hợp với bản thân, tôi muốn quảng cáo về nền tảng này cho nhiều người biết hơn.",
    avatar: "/picture/vy.jpeg",
    rating: 5,
    caseStudyLink: "/case-studies/influencer-skincare-results",
    verified: true
  },
  {
    id: 4,
    name: "Nguyễn Lý Minh Kỳ",
    role: "Rapper",
    content: "Tôi được người quen giới thiệu nền tảng này để duy trì chăm sóc da hàng ngày. Tôi thấy healzone để xuất khá là chi tiết đầy đủ từng bước 1. Tuy nhiên tôi không có kiến thức về khía cạnh này, cũng mới trải nghiệm được vài ngày, da mặt có cái thiện nhưng để lâu dài hơn tôi mới có thể đưa ra nhận xét khách quan nhất được.",
    avatar: "/picture/ky.jpeg",
    rating: 4,
    caseStudyLink: "/case-studies/cosmetic-surgeon-perspective",
    verified: true
  },
  {
    id: 5,
    name: "Nguyễn Thị Ngọc Trâm",
    role: "Sinh viên FPT",
    content: "Là một sinh viên có ngân sách hạn hẹp, tôi không thể thường xuyên đi khám bác sĩ da liễu. Ứng dụng này đã giúp tôi hiểu được loại da của mình và tìm được những sản phẩm phù hợp với giá cả. Chỉ sau 4 tuần, làn da của tôi đã cải thiện rõ rệt mà không tốn nhiều chi phí. Tôi sẽ giới thiệu cho bạn bè cùng sử dụng.",
    avatar: "/picture/tram.jpeg",
    rating: 5,
    caseStudyLink: "/case-studies/student-budget-skincare",
    verified: true
  },
  {
    id: 6,
    name: "Khanh Tran",
    role: "Người mẹ đi làm",
    content: "Với lịch trình bận rộn, tôi cần một giải pháp chăm sóc da hiệu quả. Nền tảng AI đã tạo ra một quy trình 5 phút phù hợp với lối sống của tôi. Chỉ sau 6 tuần, làn da mệt mỏi của tôi đã trở nên tươi tắn và trẻ trung hơn.",
    avatar: "/picture/khanh-tran.jpg",
    rating: 5,
    caseStudyLink: "/case-studies/busy-mother-skincare",
    verified: true
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Đánh Giá Từ <span className="text-primary-600">Người Dùng</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tham gia cùng hàng nghìn người dùng hài lòng đã cải thiện làn da của họ với nền tảng AI của chúng tôi
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-xl shadow-sm h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.58 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {testimonial.verified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Đã xác thực
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-6 italic flex-grow">"{testimonial.content}"</p>
              <div className="mt-auto">
                <div className="flex items-center mb-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                {testimonial.caseStudyLink && (
                  <a 
                    href={testimonial.caseStudyLink} 
                    className="inline-block text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors duration-300"
                  >
                    Xem nghiên cứu chi tiết →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
