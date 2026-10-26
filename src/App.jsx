import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardCheck, Menu, X, CheckCircle, Server, ShieldCheck, Database, Smartphone, Globe, CreditCard, Bitcoin, ChevronRight, MessageCircle, FileText, DollarSign, Download, ExternalLink, Lock, Mail, Send, Receipt, Package, TrendingUp, Landmark, BadgeCheck, HelpCircle, Clock, KeyRound, Gamepad2, Tractor, Code2, ArrowRight } from 'lucide-react';
import { QuincenaSection, SicasSection, ErpSection, ComoTrabajamos, Faq, quincenaLink } from './sections.jsx';

const WHATSAPP = '584242588321';
const EMAIL = 'gigadevsc@gmail.com';
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const NAV = [
  ['servicios', 'Servicios'],
  ['quincena', 'Quincena VE'],
  ['sicas', 'SICAS'],
  ['erp', 'ERP'],
  ['proyectos', 'Proyectos'],
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
  sicas: {
    icon: ClipboardCheck, color: 'text-indigo-400', label: 'Auditoría (SICAS)',
    title: 'SICAS: control y auditoría', sub: 'Auditorías administrativas, financieras y de sistemas con trazabilidad de punta a punta.',
    blocks: [['Hallazgos sin IA externa', 'Un motor de reglas propio redacta condición, criterio, causa, efecto y recomendación. La información no sale del servidor.'], ['Firma y trazabilidad', 'Aprobación por niveles con MFA, firma electrónica PAdES con sellado, bitácora de solo inserción y doble control en lo crítico.']],
  },
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

// Proyectos reales (repositorios de Aalejandro996 en GitHub). Solo se enlazan los que tienen una página pública.
const PROJECTS = [
  {
    icon: TrendingUp, name: 'Quincena VE', tag: 'Producto propio', stack: ['Kotlin', 'Python · Flask', 'PWA'],
    text: 'Finanzas personales por quincena en dólares y moneda local, con tasa BCV automática. Web instalable y app nativa para Android con actualizaciones automáticas.',
    href: quincenaLink('/', 'proyectos'), cta: 'Conocer Quincena VE',
  },
  {
    icon: ClipboardCheck, name: 'SICAS', tag: 'Producto propio', stack: ['Python · Flask', 'PostgreSQL', 'Firma PAdES'],
    text: 'Sistema Integral de Control y Auditoría: auditorías administrativas, financieras y de sistemas, hallazgos redactados por un motor de reglas propio, informe con aprobación por niveles y firma electrónica.',
    href: '#sicas', cta: 'Conocer SICAS',
  },
  {
    icon: Tractor, name: 'Sistema administrativo para finca', stack: ['Python · Flask', 'PostgreSQL'],
    text: 'Inventario, compras y ventas con facturas y notas de débito y crédito, libros de IVA, cuentas por cobrar y por pagar, personal, ISLR e IGTF. Exporta a Excel y lee facturas desde PDF o imagen.',
  },
  {
    icon: Clock, name: 'Control de horas y tareas', stack: ['Python · Flask', 'PostgreSQL'],
    text: 'Registro de horas por actividad con roles de administrador y auditor, panel de horas en horario laboral y bitácora de auditoría de cada cambio.',
  },
  {
    icon: KeyRound, name: 'Servidor de licencias para ERP', stack: ['Python · Flask', 'Turso (libSQL)'],
    text: 'Activa y valida licencias de software por equipo: límite de equipos por licencia, activar o suspender licencias y protección contra intentos abusivos.',
  },
  {
    icon: Gamepad2, name: 'DomusHack', stack: ['Node.js · Express', 'SQLite', 'IA'],
    text: 'Ventas, servicio técnico, inventario y alquiler de consolas, con un asistente de IA (Claude o Gemini) que sugiere horarios de torneos e ideas de fidelización.',
  },
  {
    icon: Code2, name: 'Portafolio personal', stack: ['HTML', 'CSS', 'JavaScript'],
    text: 'Sitio de una sola página escrito a mano, sin frameworks: proyectos de auditoría, seguridad y software a la medida.',
    href: 'https://portafolio-adrian-munoz.onrender.com/', cta: 'Ver sitio',
  },
];

// Planes. Cada precio sale de un solo lugar: la tarjeta, el botón y la solicitud muestran lo mismo.
const PLANS = [
  {
    id: 'suite', kind: 'Suscripción', name: 'GIGA Suite Pro', desc: 'Sistema, página web y app para gestionar tu empresa en una sola suscripción.',
    monthly: 49, annual: 470,
    features: ['Sistema administrativo a tu medida', 'Página web profesional', 'App móvil o de escritorio'],
  },
  {
    id: 'web', kind: 'Pago único', name: 'Web y tienda en línea', desc: 'Tu negocio en Google con una web rápida, segura y fácil de actualizar.',
    price: 250, lifetime: true,
    features: ['Diseño a tu medida y adaptado al teléfono', 'Pagos en línea integrados', 'Seguridad OWASP y certificado HTTPS'],
  },
  {
    id: 'sistema', kind: 'Pago único', name: 'Sistema a la medida', desc: 'Facturación, inventario y ventas en un sistema hecho para tu empresa.',
    price: 300, lifetime: true, featured: true,
    features: ['Facturación, ventas e inventario', 'Base de datos PostgreSQL protegida', 'Usuarios con roles y permisos'],
  },
  {
    id: 'app', kind: 'Pago único', name: 'App iOS y Android', desc: 'Una app para tus clientes o tu equipo, conectada a tu sistema.',
    price: 400, lifetime: true,
    features: ['Android e iOS', 'Conexión segura con tu sistema', 'Publicación en las tiendas oficiales'],
  },
];

const PAYMENTS = [
  { icon: Smartphone, name: 'Pago Móvil', currency: 'Bolívares', text: 'Desde la app de tu banco, con el monto a la tasa BCV del día.', color: 'bg-green-100 text-green-700' },
  { icon: Landmark, name: 'Transferencia bancaria', currency: 'Bolívares', text: 'Desde cualquier banco nacional. Ideal para empresas y montos mayores.', color: 'bg-indigo-100 text-indigo-700' },
  { icon: Bitcoin, name: 'Binance Pay', currency: 'USDT', text: 'Paga en dólares digitales desde tu cuenta de Binance.', color: 'bg-yellow-100 text-yellow-700' },
  { icon: CreditCard, name: 'PayPal o tarjeta', currency: 'Dólares', text: 'Con tu cuenta PayPal o una tarjeta internacional.', color: 'bg-blue-100 text-blue-700' },
];

const Logo = ({ size = 48 }) => (
  <img src="/logo-gigadevs.png" alt="" width={size} height={size} className="flex-shrink-0" />
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('erp');
  const [annual, setAnnual] = useState(false);

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
              <button key={id} onClick={() => scrollToSection(id)} className={`hover:text-yellow-400 transition-colors ${id === 'quincena' ? 'text-emerald-300 font-semibold' : id === 'sicas' ? 'text-indigo-300 font-semibold' : ''}`}>{label}</button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 whitespace-nowrap">
            <div className="hidden 2xl:flex text-xs text-yellow-400 bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-800 font-mono items-center gap-1" title="Tasa oficial del Banco Central de Venezuela">
              <Lock size={12} className="text-green-400" /> BCV: Bs. {rate}
            </div>
            <a href={quincenaLink('/app', 'menu')} className="text-white border border-emerald-400/60 px-4 py-2.5 rounded-xl hover:bg-emerald-500/20 transition font-bold text-sm">Entrar a Quincena VE</a>
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
              <button key={id} onClick={() => scrollToSection(id)} className={`block w-full text-left py-2.5 font-medium border-b border-blue-900/50 ${id === 'quincena' ? 'text-emerald-300' : id === 'sicas' ? 'text-indigo-300' : 'text-white'}`}>{label}</button>
            ))}
            <a href={quincenaLink('/app', 'menu-movil')} className="block w-full text-center border border-emerald-400/60 text-white font-bold py-3 rounded-xl mt-4">Entrar a Quincena VE</a>
            <button onClick={() => scrollToSection('contacto')} className="block w-full text-center bg-yellow-500 text-blue-950 font-bold py-3 rounded-xl mt-2 shadow-lg">Cotizar gratis</button>
          </div>
        </div>
      </header>

      <main>
        {/* --- PORTADA --- */}
        <section id="inicio" className="relative pt-24 pb-10 md:pt-32 md:pb-16 bg-blue-950 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-blue-950 to-blue-950 opacity-90"></div>
          <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-yellow-500 rounded-full mix-blend-screen filter blur-[120px] opacity-15 motion-safe:animate-pulse"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/80 rounded-full border border-blue-700/50 text-yellow-400 font-semibold mb-4 text-xs">
                  Software a la medida · Hecho en Venezuela
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
                  Software que ordena tu negocio y te ayuda a <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">vender más</span>
                </h1>
                <p className="text-base md:text-xl text-blue-100 mb-6 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Creamos sistemas administrativos con facturación e inventario, páginas web, tiendas en línea y apps móviles.
                  Precio cerrado en dólares o en bolívares a tasa BCV, y soporte después de la entrega.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href={waLink('Hola GIGA DEVS, quiero cotizar un proyecto')} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 bg-yellow-500 text-blue-950 font-extrabold rounded-2xl shadow-xl hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                    <MessageCircle size={20} /> Cotizar por WhatsApp
                  </a>
                  <button onClick={() => scrollToSection('planes')} className="px-7 py-3.5 bg-blue-900/60 border border-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800/80 transition flex items-center justify-center gap-2">
                    Ver planes y precios <ChevronRight size={20} />
                  </button>
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 pt-5 border-t border-blue-900/80 max-w-xl mx-auto lg:mx-0 text-sm text-blue-100 text-left">
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
        <section id="servicios" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Servicios</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-3 mb-3">Todo lo digital que tu negocio necesita</h2>
              <p className="text-gray-600">Desde el sistema con el que facturas hasta la web donde te encuentran tus clientes.</p>
            </div>
            <div className="rail md:grid-cols-2 xl:grid-cols-4">
              {SERVICES.map(({ icon: Icon, title, text, items, tone }) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                  <h3 className="text-lg font-bold text-blue-950 mb-2 flex items-center gap-3"><span className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${TONES[tone]}`}><Icon size={22} /></span>{title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{text}</p>
                  <ul className="space-y-1.5 text-sm text-gray-700 mb-4 flex-1">
                    {items.map((i) => <li key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" /> {i}</li>)}
                  </ul>
                  <button onClick={() => scrollToSection('planes')} className="w-full py-2.5 bg-blue-50 text-blue-900 font-bold rounded-xl hover:bg-blue-100 transition text-sm">Ver precios</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- QUINCENA: PRODUCTO PROPIO --- */}
        <QuincenaSection />

        {/* --- SICAS: PRODUCTO PROPIO (sin enlace a ninguna instalación) --- */}
        <SicasSection demoHref={waLink('Hola GIGA DEVS 👋 Quiero una demostración de SICAS, el sistema de control y auditoría.')} onCotizar={() => scrollToSection('contacto')} />

        {/* --- ERP: PRODUCTO PROPIO (privado: solo presentación, sin acceso a la plataforma) --- */}
        <ErpSection demoHref={waLink('Hola GIGA DEVS 👋 Quiero una demostración del ERP (facturación y contabilidad).')} onCotizar={() => scrollToSection('contacto')} />

        <ComoTrabajamos onCotizar={() => scrollToSection('contacto')} />

        {/* --- CÓMO ESTÁN HECHOS --- */}
        <section id="detalles" className="py-12 md:py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <span className="text-yellow-400 font-mono text-xs tracking-widest uppercase">Seguridad y tecnología</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3">Así están hechos nuestros sistemas</h2>
              <p className="text-gray-400">Elige un sistema para ver qué hace y cómo protege tu información.</p>
            </div>
            <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-2 mb-6 -mx-4 px-4 pb-1" role="tablist" aria-label="Sistemas">
              {Object.entries(SPECS).map(([key, { icon: Icon, label }]) => (
                <button key={key} role="tab" aria-selected={activeTab === key} onClick={() => setActiveTab(key)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap flex-shrink-0 transition flex items-center gap-2 ${activeTab === key ? 'bg-yellow-500 text-blue-950 shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                  <Icon size={18} /> {label}
                </button>
              ))}
            </div>
            {(() => {
              const s = SPECS[activeTab];
              const Icon = s.icon;
              return (
                <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl" role="tabpanel">
                  <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-800">
                    <div className={`p-3 bg-white/5 rounded-2xl ${s.color}`}><Icon size={28} /></div>
                    <div><h3 className="text-2xl font-bold">{s.title}</h3><p className="text-gray-400 text-sm">{s.sub}</p></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {s.blocks.map(([t, d]) => (
                      <div key={t} className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
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
        <section id="proyectos" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-yellow-600 font-bold text-xs tracking-wider uppercase bg-yellow-50 px-3 py-1 rounded-full">Proyectos</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-3 mb-3">Lo que hemos construido</h2>
              <p className="text-gray-600">Sistemas reales que hemos desarrollado: administración, auditoría, licencias, comercio y finanzas personales.</p>
            </div>
            <div className="rail md:grid-cols-2 lg:grid-cols-4">
              {PROJECTS.map(({ icon: Icon, name, tag, stack, text, href, cta }) => (
                <article key={name} className={`rounded-2xl p-5 flex flex-col border transition hover:-translate-y-1 hover:shadow-2xl ${tag ? 'bg-gradient-to-br from-emerald-700 to-emerald-900 text-white border-emerald-600 shadow-xl' : 'bg-gray-50 border-gray-200 shadow-md'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tag ? 'bg-white/15 text-white' : 'bg-blue-950 text-yellow-400'}`}><Icon size={20} /></div>
                    {tag && <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-emerald-800 px-2 py-1 rounded-full">{tag}</span>}
                  </div>
                  <h3 className={`text-lg font-bold mb-1.5 ${tag ? '' : 'text-blue-950'}`}>{name}</h3>
                  <p className={`text-sm leading-relaxed mb-3 flex-1 ${tag ? 'text-emerald-50' : 'text-gray-600'}`}>{text}</p>
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {stack.map((t) => <span key={t} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tag ? 'bg-white/15 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>{t}</span>)}
                  </div>
                  {href && (
                    <a href={href} target={href.startsWith('http') && !href.includes('control-financiero') ? '_blank' : undefined} rel="noopener noreferrer"
                      className={`mt-3 inline-flex items-center gap-1.5 font-bold text-sm ${tag ? 'text-yellow-300 hover:text-yellow-200' : 'text-blue-700 hover:text-blue-900'}`}>
                      {cta} <ArrowRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
            <div className="text-center mt-6">
              <button onClick={() => scrollToSection('contacto')} className="px-7 py-3.5 bg-blue-950 text-white font-bold rounded-2xl hover:bg-blue-900 transition inline-flex items-center gap-2">
                Tu proyecto puede ser el siguiente <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* --- PLANES Y PRECIOS --- */}
        <section id="planes" className="py-12 md:py-16 bg-blue-950 relative overflow-hidden text-white">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-4">
              <span className="text-yellow-400 font-bold text-xs tracking-widest uppercase bg-blue-900 px-3 py-1 rounded-full border border-blue-800">Planes y precios</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-3">Precios claros, sin sorpresas</h2>
              <p className="text-blue-200">Paga en dólares o en bolívares a la tasa BCV de hoy: <strong className="text-yellow-400">Bs. {rate}</strong> por dólar.</p>
            </div>

            <div className="rail md:grid-cols-2 xl:grid-cols-4 items-stretch pt-4">
              {PLANS.map((plan) => {
                const price = plan.monthly ? (annual ? plan.annual : plan.monthly) : plan.price;
                const cycle = plan.monthly ? (annual ? 'anual' : 'mensual') : 'único';
                const label = plan.monthly ? `${plan.name} (${annual ? 'Anual' : 'Mensual'})` : plan.name;
                const dark = plan.featured;
                return (
                  <article key={plan.id} className={`relative rounded-3xl p-5 flex flex-col shadow-2xl transition hover:-translate-y-1 ${dark ? 'bg-gradient-to-b from-yellow-400 to-amber-500 text-blue-950 ring-4 ring-yellow-300/40' : 'bg-white text-gray-900'}`}>
                    {dark && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-950 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow whitespace-nowrap">⭐ Recomendado</div>}
                    <div className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-blue-950/70' : 'text-blue-600'}`}>{plan.kind}</div>
                    <h3 className="text-xl font-extrabold mb-1">{plan.name}</h3>
                    <p className={`text-sm mb-3 ${dark ? 'text-blue-950/80' : 'text-gray-500'}`}>{plan.desc}</p>

                    {plan.monthly && (
                      <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 mb-3 text-sm font-bold" role="group" aria-label="Forma de pago de la suscripción">
                        {[[false, 'Mensual'], [true, 'Anual']].map(([value, text]) => (
                          <button key={text} type="button" aria-pressed={annual === value} onClick={() => setAnnual(value)}
                            className={`py-1.5 rounded-lg transition ${annual === value ? 'bg-blue-950 text-white shadow' : 'text-gray-600 hover:text-blue-950'}`}>{text}</button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tight">${price}</span>
                      <span className={`font-medium ${dark ? 'text-blue-950/70' : 'text-gray-500'}`}>{plan.monthly ? (annual ? '/ año' : '/ mes') : 'pago único'}</span>
                    </div>
                    <div className={`text-sm mt-1 mb-1 ${dark ? 'text-blue-950/80' : 'text-gray-600'}`}>≈ Bs. {ves(price)}</div>
                    <div className={`text-xs font-semibold mb-3 min-h-[1rem] ${dark ? 'text-blue-950' : 'text-green-700'}`}>
                      {plan.monthly ? (annual ? `Ahorras $${plan.monthly * 12 - plan.annual} al año` : `O $${plan.annual} al año y ahorras $${plan.monthly * 12 - plan.annual}`) : 'Licencia vitalicia + 1 año de soporte'}
                    </div>

                    <ul className={`space-y-1.5 text-sm mb-4 flex-1 ${dark ? 'font-semibold' : 'text-gray-700'}`}>
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2"><CheckCircle size={17} className={`mt-0.5 flex-shrink-0 ${dark ? 'text-blue-950' : 'text-green-500'}`} /> {f}</li>
                      ))}
                    </ul>

                    <button onClick={() => handleOpenModal(label, price, cycle)} className={`w-full py-3 font-extrabold rounded-xl transition shadow ${dark ? 'bg-blue-950 text-white hover:bg-blue-900' : 'bg-blue-950 text-white hover:bg-blue-900'}`}>
                      Elegir este plan
                    </button>
                    <a href={waLink(`Hola GIGA DEVS, tengo una pregunta sobre el plan "${label}" ($${price}).`)} target="_blank" rel="noopener noreferrer"
                      className={`mt-2 text-sm font-semibold text-center inline-flex items-center justify-center gap-1.5 ${dark ? 'text-blue-950 hover:underline' : 'text-blue-700 hover:underline'}`}>
                      <HelpCircle size={15} /> Tengo una pregunta
                    </a>
                  </article>
                );
              })}
            </div>

            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 max-w-5xl mx-auto text-sm text-blue-100">
              {['Precio cerrado antes de empezar', 'Factura al confirmar tu pago', 'Soporte incluido', 'Cotización gratis y sin compromiso'].map((t) => (
                <li key={t} className="flex items-center gap-2 justify-center text-center"><BadgeCheck size={18} className="text-yellow-400 flex-shrink-0" /> {t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- CÓMO PAGAR --- */}
        <section id="pagos" className="py-12 md:py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Formas de pago</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-3 mb-3">Paga como te quede más cómodo</h2>
              <p className="text-gray-600">En dólares o en bolívares. La tasa BCV se actualiza sola: hoy es <strong className="text-blue-950">Bs. {rate}</strong>.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto mb-6">
              {PAYMENTS.map(({ icon: Icon, name, currency, text, color }) => (
                <div key={name} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-gray-300 transition flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon size={20} /></div>
                    <span className="text-[11px] font-bold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{currency}</span>
                  </div>
                  <h3 className="font-bold text-blue-950 text-sm sm:text-base mb-1">{name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="max-w-5xl mx-auto bg-blue-950 text-white rounded-3xl p-5 md:p-6">
              <h3 className="text-lg font-bold mb-4 text-center">Así de fácil</h3>
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ['Elige tu plan', 'Pulsa "Elegir este plan" y genera tu solicitud con el monto en dólares y en bolívares.'],
                  ['Paga', 'Usa el medio que prefieras. Te enviamos los datos de pago por WhatsApp.'],
                  ['Envía el comprobante', 'Confirmamos tu pago, te enviamos la factura y empezamos tu proyecto.'],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-9 h-9 rounded-full bg-yellow-500 text-blue-950 font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <div><div className="font-bold mb-1">{t}</div><p className="text-blue-200 text-sm leading-relaxed">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Faq />

        {/* --- CONTACTO --- */}
        <section id="contacto" className="py-12 md:py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
              <div>
                <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Contacto</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-3 mb-3">Cuéntanos tu proyecto</h2>
                <p className="text-gray-600 mb-5">Te respondemos por WhatsApp con una propuesta y un precio cerrado. La cotización es gratis y sin compromiso.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <a href={waLink('Hola GIGA DEVS, quiero cotizar un proyecto')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 hover:border-green-400 transition">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center"><MessageCircle size={24} /></div>
                    <div><div className="font-bold text-blue-950">WhatsApp</div><div className="text-gray-600 text-sm">+58 (424) 258-8321</div></div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 hover:border-blue-400 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center"><Mail size={24} /></div>
                    <div><div className="font-bold text-blue-950">Correo</div><div className="text-gray-600 text-sm">{EMAIL}</div></div>
                  </a>
                </div>
              </div>

              <form onSubmit={contactWhatsApp} className="bg-white rounded-3xl p-5 md:p-6 shadow-xl border border-gray-100 space-y-3">
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
                  <textarea id="c-msg" rows={3} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} className={field} />
                </div>
                <button type="submit" className="w-full py-3.5 bg-green-500 text-white font-extrabold rounded-xl hover:bg-green-600 transition shadow-lg flex items-center justify-center gap-2">
                  <Send size={18} /> Enviar por WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center">Se abrirá WhatsApp con tu mensaje listo. Esta página no guarda tus datos.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* --- PIE --- */}
      <footer className="bg-blue-950 text-blue-300 py-8 md:py-10 border-t border-blue-900/50">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Logo size={40} />
              <span className="text-2xl font-bold text-white"><span className="text-yellow-500">GIGA</span> DEVS</span>
            </div>
            <p className="text-blue-200 max-w-sm text-sm leading-relaxed">Desarrollo de software seguro a la medida en Venezuela: sistemas administrativos, sistemas de auditoría, páginas web y apps móviles. Creadores de Quincena VE y SICAS.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Productos</h3>
            <ul className="space-y-1.5 text-sm text-blue-200">
              <li><a href={quincenaLink('/', 'footer')} className="hover:text-yellow-400">Quincena VE · finanzas personales</a></li>
              <li><a href={quincenaLink('/app', 'footer')} className="hover:text-yellow-400">Entrar a Quincena VE</a></li>
              <li><a href={quincenaLink('/app', 'footer-registro') + '#registro'} className="hover:text-yellow-400">Crear cuenta gratis</a></li>
              <li><a href="#sicas" onClick={(e) => { e.preventDefault(); scrollToSection('sicas'); }} className="hover:text-yellow-400">SICAS · control y auditoría</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Contacto</h3>
            <ul className="space-y-1.5 text-sm text-blue-200">
              <li><a href={`mailto:${EMAIL}`} className="hover:text-yellow-400">{EMAIL}</a></li>
              <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">WhatsApp: +58 (424) 258-8321</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 container mx-auto px-4 pt-5 text-center text-xs text-blue-400">
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
