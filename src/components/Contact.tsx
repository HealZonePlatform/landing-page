'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, PhoneCall, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Họ và tên là bắt buộc';
        } else if (value.trim().length < 2) {
          return 'Họ và tên phải có ít nhất 2 ký tự';
        }
        return '';
      case 'email':
        if (!value.trim()) {
          return 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Vui lòng nhập địa chỉ email hợp lệ';
        }
        return '';
      case 'message':
        if (!value.trim()) {
          return 'Tin nhắn là bắt buộc';
        } else if (value.trim().length < 10) {
          return 'Tin nhắn phải có ít nhất 10 ký tự';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    const newErrors = { ...errors };
    
    for (const field in formData) {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        isValid = false;
        newErrors[field as keyof typeof newErrors] = error;
      }
    }
    
    setErrors(newErrors);
    
    if (!isValid) {
      return;
    }
    
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Có lỗi xảy ra khi gửi tin nhắn.');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Liên hệ với <span className="text-primary-600">chúng tôi</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Bạn có câu hỏi về nền tảng chăm sóc da AI của chúng tôi? Hãy liên hệ với đội ngũ Horizon và chúng tôi sẽ phản hồi sớm nhất có thể.
            </motion.p>
          </div>

          <div className="rounded-3xl bg-brand-cream/90 p-10 shadow-xl border border-brand-taupe/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="rounded-2xl bg-brand-taupe/10 p-6">
                <h3 className="text-2xl font-heading font-bold text-brand-ink mb-6">Thông tin liên hệ</h3>
                <div className="space-y-6 text-brand-ink/90">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-lg bg-primary-600/10 p-3">
                      <PhoneCall className="h-6 w-6 text-primary-600" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-brand-ink">Điện thoại</h4>
                      <p className="text-brand-forest/80">0365265739</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 rounded-lg bg-primary-600/10 p-3">
                      <Mail className="h-6 w-6 text-primary-600" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-brand-ink">Email</h4>
                      <p className="text-brand-forest/80">contact@horizon-skincare.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 rounded-lg bg-primary-600/10 p-3">
                      <Users className="h-6 w-6 text-primary-600" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-brand-ink">Đội ngũ</h4>
                      <p className="text-brand-forest/80">Horizon Team</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-lg bg-primary-600/10 p-3">
                      <MapPin className="h-6 w-6 text-primary-600" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-brand-ink">Văn phòng</h4>
                      <p className="text-brand-forest/80">FPT University, Thành phố Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>
              </div>
            
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block font-heading text-brand-ink mb-2">Họ và tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full rounded-lg border px-4 py-3 bg-brand-background/10 text-brand-ink placeholder:text-brand-forest/60 shadow-sm transition focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-brand-taupe/40'
                      }`}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block font-heading text-brand-ink mb-2">Địa chỉ Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full rounded-lg border px-4 py-3 bg-brand-background/10 text-brand-ink placeholder:text-brand-forest/60 shadow-sm transition focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-brand-taupe/40'
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block font-heading text-brand-ink mb-2">Tin nhắn</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      rows={4}
                      className={`w-full rounded-lg border px-4 py-3 bg-brand-background/10 text-brand-ink placeholder:text-brand-forest/60 shadow-sm transition focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
                        errors.message ? 'border-red-500' : 'border-brand-taupe/40'
                      }`}
                      placeholder="Chúng tôi có thể giúp gì cho bạn?"
                    ></textarea>
                    {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full btn-primary ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {formStatus === 'submitting' ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </button>
                  
                  {formStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                      Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm nhất có thể.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                      Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
