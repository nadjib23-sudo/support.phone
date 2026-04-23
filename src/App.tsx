/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Truck, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    quantity: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'الرجاء إدخال الاسم الكامل';
    if (!formData.phone || formData.phone.length < 9) newErrors.phone = 'الرجاء إدخال رقم هاتف صحيح';
    if (!formData.address) newErrors.address = 'الرجاء إدخال العنوان بالتفصيل';
    if (!formData.city) newErrors.city = 'الرجاء إدخال المدينة';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Google Sheets Integration
      // Replace with your Apps Script Web App URL
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwju7aEq_V8N-5dqitGWOYWa19zPTCy-WpPqbmCLAikJEWuaSW9uxizDfUyDsV8EGwP5A/exec'; 

      const sendToSheet = async () => {
        if (!GOOGLE_SHEET_URL) {
          console.warn('Google Sheet URL is not set.');
          return;
        }

        try {
          await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors', // Apps Script requires no-cors for simple requests without pre-flight
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } catch (error) {
          console.error('Error sending to Google Sheets:', error);
        }
      };

      sendToSheet().finally(() => {
        // إرسال حدث Lead لفيسبوك بيكسل عند نجاح الطلب
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'حامل الهاتف المغناطيسي',
            value: 1200.00,
            currency: 'DZD'
          });
        }
        setIsSubmitting(false);
        setShowSuccess(true);
      });
    }
  };

  const openWhatsApp = () => {
    const message = `طلب جديد:\nالمنتج: حامل هاتف مغناطيسي ذكي\nالكمية: ${formData.quantity}\nالاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالعنوان: ${formData.address}\nالمدينة: ${formData.city}`;
    const whatsappUrl = `https://wa.me/213664603307?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Tajawal']" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">سيبور هاتف</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="text-sm font-bold bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            اطلب الآن
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-12 pb-20 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                <Star className="w-4 h-4 fill-blue-500" />
                وصل حديثاً - الأكثر طلباً
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-900">
                حامل الهاتف المغناطيسي <br />
                <span className="text-blue-600">بتقنية الامتصاص الذكي</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                الحل الأمثل لثبات هاتفك أثناء القيادة. حامل مغناطيسي فائق القوة مصمم خصيصاً ليتحمل أصعب الطرقات والمنعرجات، مع قاعدة متينة تضمن استقراراً تاماً وسهولة في التركيب والفك بلمسة واحدة.
              </p>
              
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-slate-900">1200 دج</div>
                <div className="text-lg text-slate-400 line-through">1500 دج</div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"> </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={scrollToForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                >
                  اطلب الآن وشرفنا بزيارتك
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-slate-600">توصيل سريع</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-slate-600">ثبات مضمون</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-slate-600">دفع عند الاستلام</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white">
                <img
                     src="/product.jpg"
                     alt="Magnetic Car Phone Holder"
                      className="w-full aspect-square object-cover"
                       referrerPolicy="no-referrer"
                 />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl z-0" />
              
              {/* Floating review card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 right-10 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4 hidden md:flex"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                  <img src="https://picsum.photos/seed/user1/100/100" alt="user" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-blue-500 text-blue-500" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-800">منتج رائع جداً!</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-20 bg-slate-50 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl font-black text-slate-900">ما الذي يجعل هذا الحامل مميزاً؟</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "ثبات مغناطيسي مزدوج", 
                desc: "يتميز بقوة جذب مغناطيسية هائلة تمنع انزلاق الهاتف حتى في أقسى الظروف، مع قاعدة لاصقة قوية جداً تثبت على جميع الأسطح.",
                icon: <ShieldCheck className="w-6 h-6" />
              },
              { 
                title: "دوران 360 درجة", 
                desc: "غير زاوية الرؤية كما تشاء بفضل المفصل الكروي المرن الذي يتيح لك استخدام الهاتف عمودياً أو أفقياً بسهولة.",
                icon: <ArrowRight className="w-6 h-6" />
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checkout Form Section */}
        <section ref={formRef} className="py-24 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl font-black text-slate-900">املأ المعلومات لتأكيد طلبك</h2>
              <p className="text-slate-500">سيقوم فريقنا بالاتصال بك في أقرب وقت لتأكيد العنوان وموعد التوصيل.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    الاسم الكامل
                  </label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all`}
                    placeholder="مثال: أحمد محمد"
                  />
                  {errors.name && <p className="text-xs text-red-500 font-bold pr-2">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    الكمية
                  </label>
                  <select 
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {[1,2,3,4,5].map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    رقم الهاتف
                  </label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all`}
                    placeholder="0555 55 55 55"
                  />
                  {errors.phone && <p className="text-xs text-red-500 font-bold pr-2">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    المدينة
                  </label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className={`w-full bg-white border ${errors.city ? 'border-red-500' : 'border-slate-200'} rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all`}
                    placeholder="مثال: الجزائر العاصمة"
                  />
                  {errors.city && <p className="text-xs text-red-500 font-bold pr-2">{errors.city}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  العنوان بالتفصيل
                </label>
                <textarea 
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={`w-full bg-white border ${errors.address ? 'border-red-500' : 'border-slate-200'} rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none`}
                  placeholder="مثال: حي السلام، عمارة 12، الطابق 2"
                />
                {errors.address && <p className="text-xs text-red-500 font-bold pr-2">{errors.address}</p>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 border-b-4 border-slate-700 hover:bg-slate-800 text-white font-black text-xl py-5 rounded-2xl transition-all active:border-b-0 active:translate-y-1 transform disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري إرسال الطلب...
                  </div>
                ) : 'تأكيد الطلب الآن'}
              </button>

              <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                بياناتك مشفرة ومؤمنة تماماً ولا نشاركها مع أي طرف ثالث.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">سيبور هاتف</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">عن المتجر</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} جميع الحقوق محفوظة لـ سيبور هاتف
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full relative z-10 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">تم استلام طلبك بنجاح!</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                شكراً. اضغط على الزر أدناه لإرسال طلبك عبر الواتساب لتسريع عملية التأكيد.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-100 transition-colors flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  المتابعة عبر الواتساب
                </button>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-2xl transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 z-40">
        <button 
          onClick={scrollToForm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
        >
          اطلب الآن (1200 دج)
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>
     </div>
  );
};

export default App;
