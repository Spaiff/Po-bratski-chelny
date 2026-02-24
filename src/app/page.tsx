"use client";

import { motion } from "framer-motion";
import { ParticleHero } from "@/components/3d/ParticleHero";
import { Button } from "@/components/ui/button";
import { Scissors, MapPin, Phone, Clock, CalendarDays, Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  { name: "Модельная", price: "960 ₽", duration: "35 мин" },
  { name: "Андеркат \"Undercut\"", price: "960 ₽", duration: "45 мин" },
  { name: "Кроп \"Crop\"", price: "960 ₽", duration: "45 мин" },
  { name: "Теннис", price: "860 ₽", duration: "25 мин" },
  { name: "Спортивная, бокс, полубокс", price: "810 ₽", duration: "25 мин" },
  { name: "Детская до 14 лет", price: "810 ₽", duration: "30 мин" },
  { name: "Оформление бороды", price: "710 ₽", duration: "25 мин" },
  { name: "Окантовка", price: "610 ₽", duration: "15 мин" },
];

const masters = [
  { name: "Алексей", role: "Топ-Барбер", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" },
  { name: "Рамиль", role: "Барбер", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
  { name: "Денис", role: "Барбер", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
];

const reviews = [
  { name: "Анастасия Гит", text: "Отлично постригли, хороший мастер Александр.", stars: 5 },
  { name: "Артур Николаев", text: "Александр, высший пилотаж. Спасибо!", stars: 5 },
  { name: "Роберт Рафаутдинов", text: "Спасибо большое Муроджону! Уютное, красивое место. Стрижка получилась супер 🔥", stars: 5 },
  { name: "Илья", text: "Отлично место! Приятный и общительный персонал, стригут прекрасно. Саня легенда)", stars: 5 },
  { name: "Иван Романов", text: "Был первый раз, очень понравилось, Александр мастер своего дела. Теперь буду ходить постоянно. 👍", stars: 5 },
  { name: "Рустам Рахимуллин", text: "Александр молодец! Хорошо подстриг, приятный собеседник!", stars: 5 },
  { name: "Игорь Яковлев", text: "Мастер Александр прекрасно стрижет, общительный светлый парень. Парикмахерской доволен, все советую посетить!", stars: 5 },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen relative bg-black text-white font-sans selection:bg-orange-500/30">

      {/* Sticky Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="#" className="flex items-center cursor-pointer">
            <img
              src="/header-logo.png"
              alt="По-Братски Логотип"
              className="h-[46px] w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="#about" className="hover:text-white transition-colors">О нас</Link>
            <Link href="#services" className="hover:text-white transition-colors">Услуги</Link>
            <Link href="#works" className="hover:text-white transition-colors">Работы</Link>
            <Link href="#reviews" className="hover:text-white transition-colors">Отзывы</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <Button
            asChild
            className="rounded-full bg-orange-500 hover:bg-orange-600 font-bold text-white"
          >
            <Link href="https://n1948845.yclients.com/company/1716931/personal/menu?o=" target="_blank">
              Записаться
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center px-4 overflow-hidden">
        <ParticleHero />
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto space-y-6 z-10 mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-black/40 backdrop-blur-md mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase">Набережные Челны</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter drop-shadow-2xl leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">БАРБЕРШОП</span><br />
            <span className="whitespace-nowrap">ПО-БРАТСКИ</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light pb-4">
            Здесь делают отличные стрижки. Быстро. Четко.<br className="hidden sm:block" /> Без лишних слов.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="h-16 px-10 text-xl font-bold rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <Link href="https://n1948845.yclients.com/company/1716931/personal/menu?o=" target="_blank">
                <CalendarDays className="mr-2 h-6 w-6" />
                Онлайн-запись
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-bold tracking-widest uppercase">Листай вниз</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black">Стрижем как <span className="text-orange-500">своих</span></h2>
            <div className="space-y-4 text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
              <p>
                Мы — сеть мужских парикмахерских с высоким стандартом качества за доступные деньги. Наша философия проста: никаких сложных терминов и переплат за "понты".
              </p>
              <p>
                Мы создаем простые и стильные мужские стрижки, делаем нашу работу хорошо и быстро. В стоимость каждой стрижки входит мытье головы и профессиональная укладка премиальной мужской косметикой Barbaro.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, scale: 0.9, filter: "grayscale(100%)" },
              visible: { opacity: 1, scale: 1, filter: "grayscale(0%)" }
            }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            <img
              src="/salon.png"
              alt="Наш Барбершоп"
              className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 bg-zinc-950 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Наши услуги</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">
              Мытье волос и укладка премиальной косметикой <strong className="text-white">бесплатно</strong>.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.1, 0.5) }}
                className="group p-4 sm:p-6 lg:p-8 rounded-3xl bg-black border border-white/10 hover:border-orange-500 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="text-base sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-orange-400 transition-colors leading-tight">
                    {service.name}
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-6 sm:mt-12 gap-3 sm:gap-0">
                  <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white">{service.price}</span>
                  <div className="flex items-center text-zinc-500 text-xs sm:text-sm font-medium bg-white/5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                    {service.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="works" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Наши работы</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">Стрижем так, что хочется вернуться. Посмотрите на результаты.</p>
          </motion.div>

          {/* Fallback image gallery, the user can replace these src URLs later */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "/work1.jpg",
              "/work2.jpg",
              "/work3.jpg",
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="w-full group"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  variants={{
                    hidden: { filter: "grayscale(100%)" },
                    visible: { filter: "grayscale(0%)" }
                  }}
                  className="aspect-[3/4] rounded-3xl overflow-hidden relative bg-zinc-900 border border-white/10"
                >
                  <img src={img} alt={`Наша работа ${idx + 1}`} className="object-cover w-full h-full transition-all duration-700 hover:scale-105" />
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none transition-opacity duration-700"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-32 px-4 bg-zinc-950 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">О нас говорят</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">Рейтинг <strong className="text-white">5.0</strong> в 2GIS.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black border border-white/10 p-4 sm:p-6 lg:p-8 rounded-3xl flex flex-col h-full"
              >
                <div className="flex text-orange-500 mb-4 sm:mb-6">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-zinc-300 mb-6 sm:mb-8 flex-grow select-none">"{review.text}"</p>
                <p className="text-xs sm:text-sm lg:text-base font-bold text-white">— {review.name}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="rounded-full border-white/20 hover:bg-white/5">
              <Link href="https://go.2gis.com/BZvWV" target="_blank">Все отзывы в 2GIS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Частые вопросы</h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-white/10 bg-zinc-950 px-6 rounded-2xl">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-orange-500 py-6">Нужно ли мыть голову перед стрижкой?</AccordionTrigger>
              <AccordionContent className="text-zinc-400 text-base pb-6">
                Нет, это не обязательно. В стоимость любой стрижки уже входит мытье головы с использованием премиального мужского шампуня.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-white/10 bg-zinc-950 px-6 rounded-2xl">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-orange-500 py-6">Сколько по времени занимает стрижка?</AccordionTrigger>
              <AccordionContent className="text-zinc-400 text-base pb-6">
                Обычно классическая мужская стрижка занимает от 30 до 45 минут в зависимости от сложности. Комплекс (стрижка + борода) занимает около 1 часа.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-white/10 bg-zinc-950 px-6 rounded-2xl">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-orange-500 py-6">Можно ли прийти без записи?</AccordionTrigger>
              <AccordionContent className="text-zinc-400 text-base pb-6">
                Мы рекомендуем записываться заранее онлайн, чтобы не ждать в очереди. Но если вы зайдете спонтанно и у мастера будет окно — мы с радостью вас подстрижем!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-32 px-4 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black mb-6"><span className="text-orange-500">Ждем</span> вас</h2>
                <p className="text-zinc-400 text-xl">Запишитесь онлайн в любое удобное время.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-orange-500 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Адрес</h3>
                    <p className="text-zinc-400 text-lg">Набережные Челны<br />ЖК Современный<br />Проспект Яшьлек, 8в</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="text-orange-500 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Телефон</h3>
                    <a href="tel:+79375830303" className="text-xl font-medium text-white hover:text-orange-500 transition-colors">
                      +7 (937) 583-03-03
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 block">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-16 px-10 text-xl font-bold rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                >
                  <Link href="https://n1948845.yclients.com/company/1716931/personal/menu?o=" target="_blank">
                    Записаться сейчас
                  </Link>
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-square bg-black rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl group">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />
              <iframe
                src="https://yandex.ru/map-widget/v1/?mode=search&oid=49820952953&ol=biz&z=17"
                width="100%"
                height="100%"
                frameBorder="0"
                className="filter grayscale-[80%] contrast-125 transition-all duration-700 group-hover:grayscale-0"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-zinc-600 text-sm bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base">© {new Date().getFullYear()} Барбершоп «По-братски». Все права защищены.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
          </div>
        </div>
      </footer>
    </main >
  );
}
