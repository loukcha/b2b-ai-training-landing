import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный формат телефона';
    }
    
    if (!formData.agree) {
      newErrors.agree = 'Необходимо согласие с политикой';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/0dda9b16-5710-45b1-a07c-ca0a458a0ed0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Спасибо! Ваша заявка успешно отправлена');
        setFormData({ name: '', email: '', phone: '', agree: false });
        setErrors({});
      } else {
        toast.error(data.error || 'Произошла ошибка при отправке');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Не удалось отправить заявку. Проверьте подключение к интернету');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Нейросети для B2B-продаж</div>
          <a href="tel:+79267318859" className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
            +7 926 731 88 59
          </a>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center gradient-bg text-white overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Нейросети — ускоритель для B2B продаж и КАМ
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100">
              Как искусственный интеллект снимает рутину и ускоряет сделки в B2B-командах
            </p>
            <p className="text-lg text-gray-200">
              Корпоративный тренинг: офлайн 1 день (6-7 часов) / онлайн 2 модуля × 2.5 часа
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 pulse-animation"
              >
                Оставить заявку на программу
              </Button>
              <Button
                onClick={scrollToForm}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              >
                Скачать программу тренинга
              </Button>
            </div>
          </div>
          
          <div className="animate-scale-in">
            <img
              src="https://cdn.poehali.dev/projects/ef60223c-4a9e-43e0-b23a-9fe748d10593/files/fe2b259e-3f3b-4bf7-8edd-fcf759b5c0c9.jpg"
              alt="AI Neural Network"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
            Менеджеры тратят до 40% времени на рутину
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: 'Database',
                title: 'Анализ CRM и тендерной документации',
                description: 'Часы уходят на обработку данных и поиск информации'
              },
              {
                icon: 'FileText',
                title: 'Подготовка КП и ответы на возражения',
                description: 'Однотипные задачи отнимают время от продаж'
              },
              {
                icon: 'Clock',
                title: 'Планирование и рутинные задачи',
                description: 'Ежедневная операционная работа снижает эффективность'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-primary">
              AI уже умеет делать это быстрее. Научим его думать, как ваш отдел продаж.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Для кого этот тренинг?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Users',
                title: 'РОПы и коммерческие директора',
                description: 'Управление командой с AI-инструментами для повышения KPI'
              },
              {
                icon: 'TrendingUp',
                title: 'КАМы и менеджеры по продажам',
                description: 'Рост личной эффективности и увеличение результатов'
              },
              {
                icon: 'Building2',
                title: 'B2B-команды',
                description: 'Корпоративный формат обучения под задачи бизнеса'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Что получает ваша команда за 1 день обучения
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '⏱', text: '–8–10 часов рутины в неделю на менеджера' },
              { emoji: '⚡', text: 'КП за 15 минут вместо 2 часов' },
              { emoji: '🎯', text: 'Навык создания промптов под любые задачи' },
              { emoji: '🛡', text: 'Решения для кризисных ситуаций с клиентами' }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <p className="text-lg font-semibold">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Реальные результаты наших клиентов
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Icon name="Factory" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Промышленный дистрибьютор</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p><strong>Проблема:</strong> КП готовились 2+ часа</p>
                <p><strong>Решение:</strong> Внедрили AI-промпты для КП</p>
                <p className="text-2xl font-bold text-secondary">Результат: 25 минут + 27% конверсия</p>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Monitor" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">IT-компания</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p><strong>Проблема:</strong> Рутина с CRM-отчетами</p>
                <p><strong>Решение:</strong> Автоматизация анализа данных</p>
                <p className="text-2xl font-bold text-primary">Результат: 3 часа экономии в неделю</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Программа тренинга: 5 ключевых модулей
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="module-1" className="bg-white rounded-lg px-6 border-2 border-primary/20">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <span className="text-primary mr-2">01.</span> ИИ для «умной» подготовки
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Анализ рынка и конкурентов, лидогенерация через AI, обогащение CRM, создание ICP
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="module-2" className="bg-white rounded-lg px-6 border-2 border-secondary/20">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <span className="text-secondary mr-2">02.</span> Промпт-инжиниринг для продавца
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Как правильно ставить задачи ИИ, создание библиотеки промптов, практические упражнения
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="module-3" className="bg-white rounded-lg px-6 border-2 border-accent/20">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <span className="text-accent mr-2">03.</span> ИИ в коммуникациях и КП
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Персонализация КП и презентаций, создание скриптов продаж, анализ звонков и переписок
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="module-4" className="bg-white rounded-lg px-6 border-2 border-primary/20">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <span className="text-primary mr-2">04.</span> ИИ для роста ключевых клиентов (КАМ)
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Карта развития клиента, прогнозирование потребностей, до- и кросс-продажи с AI
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="module-5" className="bg-white rounded-lg px-6 border-2 border-secondary/20">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <span className="text-secondary mr-2">05.</span> Интеграция ИИ в работу
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                План внедрения в компанию, преодоление барьеров, этика использования AI, персональный план действий
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Почему этот тренинг работает
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Zap',
                title: 'Практика на реальных задачах',
                description: 'Не теория, а применимые навыки'
              },
              {
                icon: 'Target',
                title: 'Корпоративный формат',
                description: 'Адаптация под ваш продукт и клиентов'
              },
              {
                icon: 'BookOpen',
                title: '20+ готовых промптов',
                description: 'Готовая библиотека для отдела продаж'
              },
              {
                icon: 'CheckCircle2',
                title: 'Измеримый результат',
                description: 'План внедрения на 30 дней'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
            Автор и ведущий программы
          </h2>
          
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <img
                    src="https://cdn.poehali.dev/files/5f9fb9bf-c2a4-4e66-809b-e5df09e39ded.png"
                    alt="Николай Лукша"
                    className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-3xl font-bold">Николай Лукша</h3>
                  <p className="text-xl text-gray-600">Бизнес-тренер по В2В-продажам и работе КАМ</p>
                  <p className="text-lg font-semibold text-primary">15 лет в B2B | 100+ компаний | 300+ тренингов</p>
                  <p className="text-gray-600">Международный опыт обучения B2B-команд</p>
                  
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-3">Клиенты:</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {['Сбер', 'MARS', 'МТС', 'Яндекс'].map((client) => (
                        <div key={client} className="px-4 py-2 bg-gray-100 rounded-lg font-semibold text-gray-700">
                          {client}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <a href="https://btbsales.ru/trainings/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Все программы →
                    </a>
                    <a href="https://vkvideo.ru/playlist/-228629411_2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Видео →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Форматы и стоимость
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-primary">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center">
                  <Icon name="MapPin" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Офлайн-интенсив</h3>
                <p className="text-gray-600">1 день (6-7 часов)</p>
                <div className="py-4">
                  <p className="text-4xl font-bold text-primary">от 150 000 ₽</p>
                </div>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Адаптация под ваш продукт</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Раздаточные материалы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Поддержка 7 дней</span>
                  </li>
                </ul>
                <Button onClick={scrollToForm} className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                  Оставить заявку
                </Button>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-secondary">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                  <Icon name="Video" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Онлайн-формат</h3>
                <p className="text-gray-600">2 модуля × 2.5 часа</p>
                <div className="py-4">
                  <p className="text-4xl font-bold text-secondary">от 180 000 ₽</p>
                </div>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                    <span>Адаптация под ваш продукт</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                    <span>Записи модулей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                    <span>Поддержка 7 дней</span>
                  </li>
                </ul>
                <Button onClick={scrollToForm} className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 text-lg">
                  Оставить заявку
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            Получите программу и коммерческое предложение
          </h2>
          <p className="text-center text-xl mb-12 text-gray-100">
            Оставьте заявку — мы вышлем детальную программу, кейсы и индивидуальный расчет
          </p>
          
          <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white text-lg mb-2 block">
                  Имя *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/90 text-gray-900 text-lg py-6"
                  placeholder="Ваше имя"
                />
                {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white text-lg mb-2 block">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/90 text-gray-900 text-lg py-6"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white text-lg mb-2 block">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/90 text-gray-900 text-lg py-6"
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="flex items-start gap-3">
                <Checkbox
                  id="agree"
                  checked={formData.agree}
                  onCheckedChange={(checked) => setFormData({ ...formData, agree: checked as boolean })}
                  className="mt-1 bg-white"
                />
                <Label htmlFor="agree" className="text-white text-sm cursor-pointer">
                  Согласен с политикой конфиденциальности и обработкой персональных данных *
                </Label>
              </div>
              {errors.agree && <p className="text-red-300 text-sm">{errors.agree}</p>}
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white text-xl py-7 pulse-animation"
              >
                {isSubmitting ? 'Отправка...' : 'Получить программу и КП'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">B2B Sales</div>
              <p className="text-gray-400">Нейросети для B2B-продаж</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>
                  Телефон: <a href="tel:+79267318859" className="hover:text-white transition-colors">+7 926 731 88 59</a>
                </p>
                <p>
                  Email: <a href="mailto:email@btbsales.ru" className="hover:text-white transition-colors">email@btbsales.ru</a>
                </p>
                <p>
                  Сайт: <a href="https://www.btbsales.ru" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.btbsales.ru</a>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ссылки</h4>
              <div className="space-y-2">
                <a href="https://btbsales.ru/trainings/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Программы обучения B2B продажам</a>
                <a href="https://btbsales.ru/stati/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Статьи о продажах</a>
                <a href="https://vkvideo.ru/playlist/-228629411_2" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Видео о продажах</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 B2B Sales. Все права защищены. <a href="/privacy" className="hover:text-white transition-colors underline">Политика конфиденциальности</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}