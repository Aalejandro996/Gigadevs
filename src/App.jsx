import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, CheckCircle, Server, ShieldCheck, Database, Smartphone, Globe, CreditCard, Bitcoin, ChevronRight, Activity, MessageCircle, FileText, DollarSign, Download, ExternalLink, Lock, Mail, Send, Receipt, Package, TrendingUp, ArrowRight } from 'lucide-react';
import { QuincenaSection, ComoTrabajamos, ParaQuien, Faq, quincenaLink } from './sections.jsx';

const WHATSAPP = '584242588321';
const EMAIL = 'gigadesvc@gmail.com';
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const NAV = [
  ['servicios', 'Servicios'],
  ['quincena', 'Quincena'],
  ['como-trabajamos', 'Cómo trabajamos'],
  ['planes', 'Planes y precios'],
  ['preguntas', 'Preguntas'],
  ['contacto', 'Contacto'],
];

const SERVICES = [
  {
    icon: Database, title: 'Sistemas administrativos', tone: 'yellow',
    text: 'Ordena ventas, inventario y cuentas en un solo sistema hecho para tu negocio.',
    items: ['Facturación y control de ventas', 'Inventario en varios almacenes', 'Usuarios con roles y permisos', 'Respaldos automáticos en la nube'],
  },
  {
    icon: Globe, title: 'Páginas web y tiendas en línea', tone: 'blue',
    text: 'Tu negocio visible en Google, con una web rápida que se ve bien en el teléfono.',
    items: ['Diseño profesional a tu medida', 'Catálogo y pedidos en línea', 'Panel para actualizar tus productos', 'Certificado de seguridad (HTTPS)'],
  },
  {
    icon: Smartphone, title: 'Apps móviles', tone: 'green',
    text: 'Apps para Android e iOS para tus clientes o para tu equipo de trabajo.',
    items: ['Entrada con huella o rostro', 'Notificaciones y avisos', 'Conectadas a tu sistema', 'Publicación en las tiendas oficiales'],
  },
  {
    icon: ShieldCheck, title: 'Seguridad informática', tone: 'indigo',
    text: 'Protege la red y los equipos de tu empresa y entérate a tiempo si algo falla.',
    items: ['Monitoreo de red y accesos', 'Inventario de equipos y servidores', 'Alertas ante intrusos', 'Acceso con doble verificación'],
  },
];
const TONES = {
  yellow: 'bg-yellow-100 text-yellow-700', blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700', indigo: 'bg-indigo-100 text-indigo-700',
};

const SPECS = {
  erp: {
    icon: Database, color: 'text-yellow-400', label: 'Sistema administrativo (ERP)',
    title: 'GIGA ERP_Contable', sub: 'Base de datos PostgreSQL con permisos por fila: cada usuario ve solo lo que le toca.',
    blocks: [['Datos protegidos', 'Contraseñas cifradas con bcrypt y consultas que impiden la inyección de código (SQL).'], ['Ventas y facturación', 'Cada venta queda registrada con su historial y se respalda automáticamente cada día.']],
  },
  netguard: {
    icon: ShieldCheck, color: 'text-blue-400', label: 'NetGuard (red)',
    title: 'NetGuard: auditor de red', sub: 'Vigila quién entra a la red de tu empresa y qué tráfico pasa por ella.',
    blocks: [['Detección de intrusos', 'Analiza el tráfico (incluido el cifrado con TLS 1.3) para detectar ataques y conexiones sospechosas.'], ['Control de accesos', 'Bloquea automáticamente una IP después de varios intentos fallidos de acceso.']],
  },
  endpoint: {
    icon: Server, color: 'text-indigo-400', label: 'Agente para equipos',
    title: 'Agente para PC y servidores', sub: 'Un programa liviano que reporta el estado de tus equipos por un canal cifrado.',
    blocks: [['Estado de los equipos', 'Uso de procesador, memoria y disco de cada equipo, sin exponer datos de la empresa.'], ['Software confiable', 'Verifica las huellas SHA-256 de los programas para evitar ejecutar archivos alterados.']],
  },
};

const PROJECTS = [
  { icon: TrendingUp, title: 'Quincena', text: 'Nuestra app de finanzas personales: web y Android, multimoneda con tasa BCV automática.', href: quincenaLink('/', 'proyectos'), tag: 'Producto propio' },
  { icon: Activity, title: 'Sistema de citas médicas', text: 'Agenda en línea para clínicas, con datos de pacientes protegidos.' },
  { icon: Globe, title: 'Tienda de autopartes', text: 'Catálogo en línea con pagos en varias monedas.' },
  { icon: Smartphone, title: 'App de delivery local', text: 'Pedidos con ubicación en el mapa y pago con Binance Pay.' },
  { icon: Server, title: 'Panel para industria', text: 'Monitoreo de sensores en tiempo real conectado por VPN.' },
];

const PAYMENTS = [
  [Smartphone, 'Pago Móvil', 'text-green-600'], [Receipt, 'Transferencia bancaria', 'text-indigo-600'],
  [Bitcoin, 'Binance Pay (USDT)', 'text-yellow-500'], [CreditCard, 'PayPal o tarjeta', 'text-blue-600'],
];

const Logo = ({ size = 48 }) => (
  <img src="/logo-gigadevs.png" alt="" width={size} height={size} className="flex-shrink-0" />
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('erp');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [planPriceUSD, setPlanPriceUSD] = useState(0);
  const [billingCycle, setBillingCycle] = useState('mensual');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil (Bs.)');
  const [bcvRate, setBcvRate] = useState(801.17);
  const [loadingRate, setLoadingRate] = useState(true);
  const [orderGenerated, setOrderGenerated] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const [contact, setContact] = useState({ name: '', business: '', need: 'Un sistema administrativo', message: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBCVRate = async () => {
      try {
        const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        const data = await response.json();
        if (data && data.promedio) setBcvRate(data.promedio);
      } catch {
        // Sin conexión con la API: se usa la tasa de respaldo.
      } finally {
        setLoadingRate(false);
      }
    };
    fetchBCVRate();
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);
  useEffect(() => {
    if (!modalOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen, closeModal]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const money = (n) => n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const rate = loadingRate ? '…' : money(bcvRate);
  const ves = (usd) => money(usd * bcvRate);

  const handleOpenModal = (planName, basePrice, cycle = 'mensual') => {
    setSelectedPlan(planName);
    setPlanPriceUSD(basePrice);
    setBillingCycle(cycle);
    setOrderGenerated(false);
    setOrderData(null);
    setModalOpen(true);
  };

  // Solicitud de pedido: resume el plan y el monto en bolívares. No es una factura fiscal.
  const handleGenerateOrder = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setOrderData({
      orderNum: 'PED-' + Math.floor(100000 + Math.random() * 900000),
      dateStr: new Date().toLocaleDateString('es-VE'),
      clientName, clientEmail, clientBusiness: clientBusiness || 'N/A',
      selectedPlan, billingCycle, planPriceUSD, bcvRate: money(bcvRate), totalVES: ves(planPriceUSD), paymentMethod,
    });
    setOrderGenerated(true);
  };

  const downloadSummary = () => {
    if (!orderData) return;
    const content = [
      '========================================',
      '   GIGA DEVS - SOLICITUD DE PEDIDO',
      '========================================',
      `Nro de solicitud: ${orderData.orderNum}`,
      `Fecha: ${orderData.dateStr}`,
      '----------------------------------------',
      'CLIENTE',
      `Nombre: ${orderData.clientName}`,
      `Correo: ${orderData.clientEmail}`,
      `Empresa / negocio: ${orderData.clientBusiness}`,
      '----------------------------------------',
      'SERVICIO',
      `Plan: ${orderData.selectedPlan}`,
      `Modalidad: ${orderData.billingCycle}`,
      `Monto en USD: $${orderData.planPriceUSD}`,
      `Tasa BCV del día: Bs. ${orderData.bcvRate}`,
      `Total en bolívares: Bs. ${orderData.totalVES}`,
      `Forma de pago elegida: ${orderData.paymentMethod}`,
      '----------------------------------------',
      'Este documento es una solicitud de pedido, no una factura fiscal.',
      'La factura se emite al confirmar el pago.',
      '========================================',
    ].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `Solicitud_${orderData.orderNum}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const orderWhatsApp = () => orderData ? waLink(
    `Hola GIGA DEVS 👋 Generé la solicitud *${orderData.orderNum}*.\n\n` +
    `*Cliente:* ${orderData.clientName}\n*Plan:* ${orderData.selectedPlan} (${orderData.billingCycle})\n` +
    `*Total:* $${orderData.planPriceUSD} | Bs. ${orderData.totalVES} (tasa BCV ${orderData.bcvRate})\n` +
    `*Forma de pago:* ${orderData.paymentMethod}\n\nQuiero confirmar mi pedido.`
  ) : '#';

  const contactWhatsApp = (e) => {
    e.preventDefault();
    const text = `Hola GIGA DEVS 👋 Soy ${contact.name}${contact.business ? ` de ${contact.business}` : ''}.\n` +
      `Necesito: ${contact.need}.${contact.message ? `\n\n${contact.message}` : ''}`;
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  const field = 'w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500';
  const Check = ({ children, className = 'text-green-500' }) => (
    <li className="flex items-center"><CheckCircle size={16} className={`${className} mr-2 flex-shrink-0`} /> {children}</li>
  );

  return (
    <div className="font-sans text-gray-800 bg-gray-50 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-blue-950">

      {/* --- BOTÓN FLOTANTE WHATSAPP --- */}
      <a
        href={waLink('Hola, quiero información sobre los servicios de GIGA DEVS')}
        target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-40 hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle size={30} />
        <span className="absolute right-16 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¡Escríbenos! 💬
        </span>
      </a>

      {/* --- ENCABEZADO --- */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-blue-950/95 backdrop-blur-md py-2.5 shadow-xl border-b border-blue-900/50' : 'bg-blue-950 py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center gap-4">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3" aria-label="GIGA DEVS, inicio">
            <Logo size={48} />
            <span className="text-xl sm:text-2xl font-black tracking-wider text-white whitespace-nowrap"><span className="text-yellow-500">GIGA</span> DEVS</span>
          </a>

          <nav className="hidden xl:flex gap-6 font-medium text-white text-sm whitespace-nowrap" aria-label="Secciones">
            {NAV.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className={`hover:text-yellow-400 transition-colors ${id === 'quincena' ? 'text-emerald-300 font-semibold' : ''}`}>{label}</button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 whitespace-nowrap">
            <div className="hidden 2xl:flex text-xs text-yellow-400 bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-800 font-mono items-center gap-1" title="Tasa oficial del Banco Central de Venezuela">
              <Lock size={12} className="text-green-400" /> BCV: Bs. {rate}
            </div>
            <a href={quincenaLink('/app', 'menu')} className="text-white border border-emerald-400/60 px-4 py-2.5 rounded-xl hover:bg-emerald-500/20 transition font-bold text-sm">Entrar a Quincena</a>
            <button onClick={() => scrollToSection('contacto')} className="bg-yellow-500 text-blue-950 px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition shadow-md font-bold text-sm">Cotizar gratis</button>
          </div>

          <button className="lg:hidden text-yellow-500 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMenuOpen} aria-controls="menu-movil">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div id="menu-movil" className={`lg:hidden absolute w-full bg-blue-950 shadow-2xl transition-all duration-300 border-b border-blue-900 ${isMenuOpen ? 'max-h-[640px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
          <div className="px-6 space-y-1">
            <div className="text-xs text-yellow-400 bg-blue-900/80 px-3 py-2 rounded-xl border border-blue-800 font-mono text-center mb-2">Tasa BCV de hoy: Bs. {rate}</div>
            {NAV.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className={`block w-full text-left py-2.5 font-medium border-b border-blue-900/50 ${id === 'quincena' ? 'text-emerald-300' : 'text-white'}`}>{label}</button>
            ))}
            <a href={quincenaLink('/app', 'menu-movil')} className="block w-full text-center border border-emerald-400/60 text-white font-bold py-3 rounded-xl mt-4">Entrar a Quincena</a>
            <button onClick={() => scrollToSection('contacto')} className="block w-full text-center bg-yellow-500 text-blue-950 font-bold py-3 rounded-xl mt-2 shadow-lg">Cotizar gratis</button>
          </div>
        </div>
      </header>

      <main>
        {/* --- PORTADA --- */}
        <section id="inicio" className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-blue-950 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-blue-950 to-blue-950 opacity-90"></div>
          <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-yellow-500 rounded-full mix-blend-screen filter blur-[120px] opacity-15 motion-safe:animate-pulse"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/80 rounded-full border border-blue-700/50 text-yellow-400 font-semibold mb-6 text-sm">
                  Software a la medida · Hecho en Venezuela
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                  Software que ordena tu negocio y te ayuda a <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">vender más</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-9 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Creamos sistemas administrativos con facturación e inventario, páginas web, tiendas en línea y apps móviles.
                  Precio cerrado en dólares o en bolívares a tasa BCV, y soporte después de la entrega.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href={waLink('Hola GIGA DEVS, quiero cotizar un proyecto')} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-yellow-500 text-blue-950 font-extrabold rounded-2xl shadow-xl hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                    <MessageCircle size={20} /> Cotizar por WhatsApp
                  </a>
                  <button onClick={() => scrollToSection('planes')} className="px-8 py-4 bg-blue-900/60 border border-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800/80 transition flex items-center justify-center gap-2">
                    Ver planes y precios <ChevronRight size={20} />
                  </button>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-10 pt-8 border-t border-blue-900/80 max-w-xl mx-auto lg:mx-0 text-sm text-blue-100 text-left">
                  {['Precio cerrado antes de empezar', 'Pago en dólares o bolívares (tasa BCV)', 'Soporte y actualizaciones incluidos', 'Seguridad desde el primer día'].map((t) => (
                    <li key={t} className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 flex-shrink-0" /> {t}</li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 hidden lg:block" aria-hidden="true">
                <div className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl max-w-md ml-auto">
                  <div className="flex items-center justify-between mb-5">
                    <div className="font-bold text-blue-950">Panel de tu negocio</div>
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">En línea</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-2xl p-4"><div className="text-xs text-gray-500 font-semibold">Ventas de hoy</div><div className="text-2xl font-black text-blue-950">$1.284</div><div className="text-xs text-green-600 font-bold">+12% vs. ayer</div></div>
                    <div className="bg-yellow-50 rounded-2xl p-4"><div className="text-xs text-gray-500 font-semibold">En bolívares</div><div className="text-2xl font-black text-blue-950">Bs. {ves(1284).split(',')[0]}</div><div className="text-xs text-gray-500">Tasa BCV del día</div></div>
                  </div>
                  {[[Receipt, 'Venta #000128 registrada', 'hace 2 min'], [Package, 'Stock bajo: 3 productos', 'Almacén principal'], [TrendingUp, 'Cierre de caja listo', 'Turno de la tarde']].map(([Icon, t, s]) => (
                    <div key={t} className="flex items-center gap-3 py-3 border-t border-gray-100">
                      <div className="w-9 h-9 rounded-xl bg-blue-950 text-yellow-400 flex items-center justify-center"><Icon size={18} /></div>
                      <div><div className="text-sm font-semibold">{t}</div><div className="text-xs text-gray-500">{s}</div></div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-400 mt-2">Datos de ejemplo</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICIOS --- */}
        <section id="servicios" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Servicios</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-6">Todo lo digital que tu negocio necesita</h2>
              <p className="text-gray-600 text-lg">Desde el sistema con el que facturas hasta la web donde te encuentran tus clientes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {SERVICES.map(({ icon: Icon, title, text, items, tone }) => (
                <div key={title} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${TONES[tone]}`}><Icon size={28} /></div>
                  <h3 className="text-xl font-bold text-blue-950 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">{text}</p>
                  <ul className="space-y-2.5 text-sm text-gray-700 mb-6 flex-1">
                    {items.map((i) => <li key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" /> {i}</li>)}
                  </ul>
                  <button onClick={() => scrollToSection('planes')} className="w-full py-3 bg-blue-50 text-blue-900 font-bold rounded-xl hover:bg-blue-100 transition text-sm">Ver precios</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- QUINCENA: PRODUCTO PROPIO --- */}
        <QuincenaSection />

        <ParaQuien />
        <ComoTrabajamos onCotizar={() => scrollToSection('contacto')} />

        {/* --- CÓMO ESTÁN HECHOS --- */}
        <section id="detalles" className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">Seguridad y tecnología</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-4">Así están hechos nuestros sistemas</h2>
              <p className="text-gray-400">Elige un sistema para ver qué hace y cómo protege tu información.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Sistemas">
              {Object.entries(SPECS).map(([key, { icon: Icon, label }]) => (
                <button key={key} role="tab" aria-selected={activeTab === key} onClick={() => setActiveTab(key)}
                  className={`px-5 py-3 rounded-xl font-bold transition flex items-center gap-2 ${activeTab === key ? 'bg-yellow-500 text-blue-950 shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                  <Icon size={18} /> {label}
                </button>
              ))}
            </div>
            {(() => {
              const s = SPECS[activeTab];
              const Icon = s.icon;
              return (
                <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl" role="tabpanel">
                  <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-800">
                    <div className={`p-4 bg-white/5 rounded-2xl ${s.color}`}><Icon size={34} /></div>
                    <div><h3 className="text-2xl font-bold">{s.title}</h3><p className="text-gray-400 text-sm">{s.sub}</p></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                    {s.blocks.map(([t, d]) => (
                      <div key={t} className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                        <h4 className={`font-bold mb-2 flex items-center gap-2 ${s.color}`}><CheckCircle size={16} /> {t}</h4>
                        <p className="text-gray-400">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* --- PROYECTOS --- */}
        <section id="proyectos" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-yellow-600 font-bold text-sm tracking-wider uppercase bg-yellow-50 px-3 py-1 rounded-full">Proyectos</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-4">Lo que hemos construido</h2>
              <p className="text-gray-600">Productos propios y soluciones que desarrollamos para distintos sectores.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {PROJECTS.map(({ icon: Icon, title, text, href, tag }) => {
                const body = (
                  <>
                    <div className="p-3 bg-blue-800 rounded-2xl w-fit mb-4 text-yellow-400"><Icon size={24} /></div>
                    {tag && <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full w-fit mb-2">{tag}</span>}
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{text}</p>
                    {href && <span className="mt-4 text-yellow-400 text-sm font-bold inline-flex items-center gap-1">Conocer Quincena <ArrowRight size={16} /></span>}
                  </>
                );
                const cls = 'bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-3xl text-white shadow-lg flex flex-col';
                return href
                  ? <a key={title} href={href} className={`${cls} ring-2 ring-emerald-400/60 hover:ring-emerald-300 transition`}>{body}</a>
                  : <div key={title} className={cls}>{body}</div>;
              })}
            </div>
          </div>
        </section>

        {/* --- PLANES Y PRECIOS --- */}
        <section id="planes" className="py-24 bg-blue-950 relative overflow-hidden text-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase bg-blue-900 px-3 py-1 rounded-full border border-blue-800">Planes y precios</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">Precios claros, sin sorpresas</h2>
              <p className="text-blue-200 text-lg">Suscripción mensual o anual, o licencia vitalicia con un año de soporte incluido. También en bolívares a la tasa BCV del día (Bs. {rate}).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="inline-block p-3 bg-blue-100 text-blue-900 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Suscripción</div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-2">GIGA Suite Pro</h3>
                  <p className="text-gray-500 mb-6 text-sm">Solución integral para la gestión de tu empresa.</p>
                  <div className="flex items-baseline mb-1"><span className="text-4xl font-black text-blue-950">$49</span><span className="text-lg text-gray-500 ml-2 font-medium">/ mes</span></div>
                  <div className="text-xs text-gray-500 mb-6">≈ Bs. {ves(49)} al mes</div>
                  <ul className="space-y-3 mb-8 text-sm text-gray-700">
                    <Check>Sistema personalizado</Check><Check>Página web</Check><Check>App móvil o de escritorio</Check>
                  </ul>
                </div>
                <div className="space-y-2">
                  <button onClick={() => handleOpenModal('GIGA Suite Pro (Mensual)', 49, 'mensual')} className="w-full py-2.5 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition text-sm shadow">Plan mensual ($49)</button>
                  <button onClick={() => handleOpenModal('GIGA Suite Pro (Anual)', 470, 'anual')} className="w-full py-2.5 bg-yellow-500 text-blue-950 font-bold rounded-xl hover:bg-yellow-400 transition text-sm shadow">Plan anual ($470) · ahorra $118</button>
                </div>
              </div>

              <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="inline-block p-3 bg-indigo-100 text-indigo-900 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Desarrollo web</div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-2">Web y tienda en línea</h3>
                  <p className="text-gray-500 mb-6 text-sm">Diseño profesional, rápido y seguro.</p>
                  <div className="flex items-baseline mb-1"><span className="text-4xl font-black text-blue-950">$250</span><span className="text-lg text-gray-500 ml-2 font-medium">/ pago único</span></div>
                  <div className="text-xs text-gray-500 mb-6">≈ Bs. {ves(250)}</div>
                  <ul className="space-y-3 mb-8 text-sm text-gray-700">
                    <Check>Seguridad OWASP y HTTPS</Check><Check>Pagos en línea integrados</Check><Check><strong>Licencia vitalicia + 1 año de soporte</strong></Check>
                  </ul>
                </div>
                <button onClick={() => handleOpenModal('Página web / tienda en línea', 250, 'único')} className="w-full py-3 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition text-sm shadow">Pedir mi web ($250)</button>
              </div>

              <div className="bg-gradient-to-b from-yellow-400 to-amber-500 text-blue-950 p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative lg:-translate-y-2">
                <div className="absolute -top-3 right-6 bg-blue-950 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow">RECOMENDADO</div>
                <div>
                  <div className="inline-block p-3 bg-blue-950/10 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Sistema dedicado</div>
                  <h3 className="text-2xl font-black mb-2">Totalmente personalizado</h3>
                  <p className="text-blue-950/80 mb-6 text-sm font-medium">Un sistema hecho a la medida de tu empresa.</p>
                  <div className="flex items-baseline mb-1"><span className="text-4xl font-black">$300</span><span className="text-lg text-blue-950/80 ml-2 font-medium">/ proyecto</span></div>
                  <div className="text-xs text-blue-950/70 mb-6">≈ Bs. {ves(300)}</div>
                  <ul className="space-y-3 mb-8 text-sm font-semibold">
                    <Check className="text-blue-950">Base de datos PostgreSQL protegida</Check><Check className="text-blue-950">Facturación y ventas</Check><Check className="text-blue-950"><strong>Licencia vitalicia + soporte anual</strong></Check>
                  </ul>
                </div>
                <button onClick={() => handleOpenModal('Sistema a la medida', 300, 'único')} className="w-full py-3 bg-blue-950 text-white font-extrabold rounded-xl hover:bg-blue-900 transition text-sm shadow-xl">Pedir mi sistema ($300)</button>
              </div>

              <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="inline-block p-3 bg-green-100 text-green-900 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Apps móviles</div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-2">Apps iOS y Android</h3>
                  <p className="text-gray-500 mb-6 text-sm">Apps con datos protegidos en el teléfono.</p>
                  <div className="flex items-baseline mb-1"><span className="text-4xl font-black text-blue-950">$400</span><span className="text-lg text-gray-500 ml-2 font-medium">/ proyecto</span></div>
                  <div className="text-xs text-gray-500 mb-6">≈ Bs. {ves(400)}</div>
                  <ul className="space-y-3 mb-8 text-sm text-gray-700">
                    <Check>Conexión segura con tu sistema</Check><Check>Publicación en las tiendas oficiales</Check><Check><strong>Licencia vitalicia + soporte anual</strong></Check>
                  </ul>
                </div>
                <button onClick={() => handleOpenModal('App móvil iOS y Android', 399, 'único')} className="w-full py-3 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition text-sm shadow">Pedir mi app ($399)</button>
              </div>
            </div>
          </div>
        </section>

        {/* --- CÓMO PAGAR --- */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-3">Tasa BCV de hoy: Bs. {rate} (se actualiza sola)</div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mt-2 mb-4">Paga como te quede más cómodo</h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">Elige un plan, genera tu solicitud con el monto en dólares y en bolívares, y envíala por WhatsApp. Confirmamos tu pago y empezamos.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {PAYMENTS.map(([Icon, t, c]) => (
                <div key={t} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center gap-3">
                  <Icon className={`w-10 h-10 ${c}`} />
                  <span className="font-bold text-gray-800 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq />

        {/* --- CONTACTO --- */}
        <section id="contacto" className="py-24 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
              <div>
                <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Contacto</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-6">Cuéntanos tu proyecto</h2>
                <p className="text-gray-600 text-lg mb-8">Te respondemos por WhatsApp con una propuesta y un precio cerrado. La cotización es gratis y sin compromiso.</p>
                <div className="space-y-4">
                  <a href={waLink('Hola GIGA DEVS, quiero cotizar un proyecto')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-400 transition">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center"><MessageCircle size={24} /></div>
                    <div><div className="font-bold text-blue-950">WhatsApp</div><div className="text-gray-600 text-sm">+58 (424) 258-8321</div></div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-400 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center"><Mail size={24} /></div>
                    <div><div className="font-bold text-blue-950">Correo</div><div className="text-gray-600 text-sm">{EMAIL}</div></div>
                  </a>
                </div>
              </div>

              <form onSubmit={contactWhatsApp} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-4">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-bold text-gray-700 mb-1">Tu nombre</label>
                  <input id="c-name" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} autoComplete="name" className={field} />
                </div>
                <div>
                  <label htmlFor="c-business" className="block text-sm font-bold text-gray-700 mb-1">Tu negocio <span className="font-normal text-gray-400">(opcional)</span></label>
                  <input id="c-business" value={contact.business} onChange={(e) => setContact({ ...contact, business: e.target.value })} autoComplete="organization" className={field} />
                </div>
                <div>
                  <label htmlFor="c-need" className="block text-sm font-bold text-gray-700 mb-1">¿Qué necesitas?</label>
                  <select id="c-need" value={contact.need} onChange={(e) => setContact({ ...contact, need: e.target.value })} className={field}>
                    {['Un sistema administrativo', 'Una página web o tienda en línea', 'Una app móvil', 'Seguridad para mi red o equipos', 'Otra cosa'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-msg" className="block text-sm font-bold text-gray-700 mb-1">Cuéntanos un poco más <span className="font-normal text-gray-400">(opcional)</span></label>
                  <textarea id="c-msg" rows={4} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} className={field} />
                </div>
                <button type="submit" className="w-full py-4 bg-green-500 text-white font-extrabold rounded-xl hover:bg-green-600 transition shadow-lg flex items-center justify-center gap-2">
                  <Send size={18} /> Enviar por WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center">Se abrirá WhatsApp con tu mensaje listo. Esta página no guarda tus datos.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* --- PIE --- */}
      <footer className="bg-blue-950 text-blue-300 py-16 border-t border-blue-900/50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} />
              <span className="text-2xl font-bold text-white"><span className="text-yellow-500">GIGA</span> DEVS</span>
            </div>
            <p className="text-blue-200 max-w-sm text-sm leading-relaxed">Desarrollo de software seguro a la medida en Venezuela: sistemas administrativos, páginas web y apps móviles. Creadores de Quincena.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Productos</h3>
            <ul className="space-y-2.5 text-sm text-blue-200">
              <li><a href={quincenaLink('/', 'footer')} className="hover:text-yellow-400">Quincena · finanzas personales</a></li>
              <li><a href={quincenaLink('/app', 'footer')} className="hover:text-yellow-400">Entrar a Quincena</a></li>
              <li><a href={quincenaLink('/app', 'footer-registro') + '#registro'} className="hover:text-yellow-400">Crear cuenta gratis</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contacto</h3>
            <ul className="space-y-2.5 text-sm text-blue-200">
              <li><a href={`mailto:${EMAIL}`} className="hover:text-yellow-400">{EMAIL}</a></li>
              <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">WhatsApp: +58 (424) 258-8321</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 container mx-auto px-4 pt-8 text-center text-xs text-blue-400">
          <p>© {new Date().getFullYear()} GIGA DEVS Corp. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* --- SOLICITUD DE PEDIDO --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="pedido-titulo" className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} aria-label="Cerrar" className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 bg-gray-100 p-2 rounded-full"><X size={20} /></button>
            <div className="flex items-center gap-3 mb-2 pr-10">
              <div className="p-3 bg-yellow-100 text-yellow-700 rounded-2xl"><DollarSign size={24} /></div>
              <div>
                <h2 id="pedido-titulo" className="text-2xl font-black text-blue-950">Solicitud de pedido</h2>
                <p className="text-gray-500 text-xs">Monto en bolívares con la tasa BCV de hoy (Bs. {rate})</p>
              </div>
            </div>

            {!orderGenerated ? (
              <form onSubmit={handleGenerateOrder} className="space-y-4 mt-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                  <div className="text-xs text-blue-700 font-bold uppercase">Servicio elegido</div>
                  <div className="text-lg font-bold text-blue-950">{selectedPlan}</div>
                  <div className="text-sm font-semibold text-gray-700 mt-1">Precio: <span className="text-blue-900 font-bold">${planPriceUSD}</span> ({billingCycle})</div>
                  <div className="text-base font-extrabold text-green-700 mt-1">Total en bolívares: Bs. {ves(planPriceUSD)}</div>
                </div>
                <div>
                  <label htmlFor="p-name" className="block text-xs font-bold text-gray-600 mb-1 uppercase">Nombre y apellido *</label>
                  <input id="p-name" type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} autoComplete="name" className={`${field} text-sm`} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-email" className="block text-xs font-bold text-gray-600 mb-1 uppercase">Correo *</label>
                    <input id="p-email" type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} autoComplete="email" className={`${field} text-sm`} />
                  </div>
                  <div>
                    <label htmlFor="p-business" className="block text-xs font-bold text-gray-600 mb-1 uppercase">Empresa</label>
                    <input id="p-business" type="text" value={clientBusiness} onChange={(e) => setClientBusiness(e.target.value)} autoComplete="organization" className={`${field} text-sm`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="p-pay" className="block text-xs font-bold text-gray-600 mb-1 uppercase">Forma de pago</label>
                  <select id="p-pay" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className={`${field} text-sm text-gray-700 font-medium`}>
                    {['Pago Móvil (Bs.)', 'Transferencia bancaria (Bs.)', 'Binance Pay (USDT)', 'PayPal o tarjeta (USD)'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-yellow-500 text-blue-950 font-extrabold rounded-xl hover:bg-yellow-400 transition shadow-lg text-sm mt-2 flex items-center justify-center gap-2">
                  <FileText size={18} /> Generar solicitud
                </button>
              </form>
            ) : (
              <div className="space-y-6 mt-6">
                <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center">
                  <CheckCircle className="mx-auto text-green-600 mb-2" size={40} />
                  <h3 className="font-extrabold text-green-900 text-lg">¡Solicitud lista!</h3>
                  <p className="text-gray-600 text-xs mt-1">Número: <strong className="text-blue-900">{orderData.orderNum}</strong></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border text-xs space-y-2 font-mono">
                  <div className="flex justify-between gap-4"><span>Cliente:</span> <strong className="text-right">{orderData.clientName}</strong></div>
                  <div className="flex justify-between gap-4"><span>Servicio:</span> <strong className="text-right">{orderData.selectedPlan}</strong></div>
                  <div className="flex justify-between gap-4"><span>Monto USD:</span> <strong>${orderData.planPriceUSD}</strong></div>
                  <div className="flex justify-between gap-4"><span>Tasa BCV:</span> <strong>Bs. {orderData.bcvRate}</strong></div>
                  <div className="flex justify-between gap-4 border-t pt-2 text-sm text-green-700 font-bold"><span>Total en Bs.:</span> <span>Bs. {orderData.totalVES}</span></div>
                </div>
                <p className="text-xs text-gray-500 text-center">Es una solicitud de pedido, no una factura fiscal. La factura se emite al confirmar el pago.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={orderWhatsApp()} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition text-sm flex items-center justify-center gap-2 shadow">
                    <ExternalLink size={16} /> Enviar por WhatsApp
                  </a>
                  <button onClick={downloadSummary} className="flex-1 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition text-sm flex items-center justify-center gap-2 shadow">
                    <Download size={16} /> Descargar resumen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
