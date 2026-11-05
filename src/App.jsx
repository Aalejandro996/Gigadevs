import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Menu, X, CheckCircle, Server, ShieldCheck, Database, Smartphone, Globe, ChevronRight, MessageCircle, Lock, Mail, Send, Receipt, Package, TrendingUp, BadgeCheck, Clock, KeyRound, Gamepad2, Tractor, Code2, ArrowRight } from 'lucide-react';
import { QuincenaSection, CriterisegSection, ErpSection, ComoTrabajamos, Faq, ProductTiles, Statement, quincenaLink } from './sections.jsx';
import { useReveal, useScrollProgress } from './motion.js';

const WHATSAPP = '584242588321';
const EMAIL = 'gigadevsc@gmail.com';
const FACEBOOK = 'https://www.facebook.com/221834717674610';
const INSTAGRAM = 'https://www.instagram.com/gigadevsc/';
const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" /></svg>
);
const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
);
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const NAV = [
  ['productos', 'Productos'],
  ['quincena', 'Quincena VE'],
  ['contax', 'Contax'],
  ['criteriseg', 'Criteriseg'],
  ['cotizar', 'Cotizar'],
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
  criteriseg: {
    icon: ClipboardCheck, color: 'text-indigo-400', label: 'Auditoría (Criteriseg)',
    title: 'Criteriseg: control y auditoría', sub: 'Auditorías administrativas, financieras y de sistemas con trazabilidad de punta a punta.',
    blocks: [['Hallazgos sin IA externa', 'Un motor de reglas propio redacta condición, criterio, causa, efecto y recomendación. La información no sale del servidor.'], ['Firma y trazabilidad', 'Aprobación por niveles con MFA, firma electrónica PAdES con sellado, bitácora de solo inserción y doble control en lo crítico.']],
  },
  contax: {
    icon: Database, color: 'text-yellow-400', label: 'Sistema administrativo (Contax)',
    title: 'Contax: facturación y contabilidad', sub: 'Base de datos PostgreSQL con seguridad por fila: cada empresa ve solo lo suyo.',
    blocks: [['Datos protegidos', 'Doble factor (MFA) obligatorio, contraseñas cifradas y consultas que impiden la inyección de código (SQL).'], ['Bitácora inalterable', 'Cada factura y cada asiento quedan registrados con su usuario y su fecha, sin poder borrarse.']],
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
    text: 'Finanzas personales por quincena y, ahora, para tu negocio: ventas, fiado y caja en dólares y bolívares con tasa BCV automática. Web instalable y app nativa para Android.',
    href: quincenaLink('/', 'proyectos'), cta: 'Conocer Quincena VE',
  },
  {
    icon: ClipboardCheck, name: 'Criteriseg', tag: 'Producto propio', stack: ['Python · Flask', 'PostgreSQL', 'Firma PAdES'],
    text: 'Sistema Integral de Control y Auditoría: auditorías administrativas, financieras y de sistemas, hallazgos redactados por un motor de reglas propio, informe con aprobación por niveles y firma electrónica.',
    href: '#criteriseg', cta: 'Conocer Criteriseg',
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
    icon: KeyRound, name: 'Servidor de licencias para Contax', stack: ['Python · Flask', 'Turso (libSQL)'],
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

// Cada sistema es personalizado: no se publican precios, se cotiza según el alcance de cada cliente.
const SOLUTIONS = [
  {
    id: 'sistema', name: 'Sistema a la medida', desc: 'Facturación, inventario y ventas en un sistema hecho para tu empresa.', featured: true,
    features: ['Facturación, ventas e inventario', 'Base de datos PostgreSQL protegida', 'Usuarios con roles y permisos'],
  },
  {
    id: 'web', name: 'Web y tienda en línea', desc: 'Tu negocio en Google con una web rápida, segura y fácil de actualizar.',
    features: ['Diseño a tu medida y adaptado al teléfono', 'Pagos en línea integrados', 'Seguridad OWASP y certificado HTTPS'],
  },
  {
    id: 'app', name: 'App iOS y Android', desc: 'Una app para tus clientes o tu equipo, conectada a tu sistema.',
    features: ['Android e iOS', 'Conexión segura con tu sistema', 'Publicación en las tiendas oficiales'],
  },
  {
    id: 'suite', name: 'Solución integral', desc: 'Sistema, página web y app trabajando juntos para gestionar tu empresa.',
    features: ['Sistema administrativo a tu medida', 'Página web profesional', 'App móvil o de escritorio'],
  },
];

const Logo = ({ size = 48 }) => (
  <img src="/logo-gigadevs.png" alt="" width={size} height={size} className="flex-shrink-0" />
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('contax');
  const [bcvRate, setBcvRate] = useState(801.17);
  const [loadingRate, setLoadingRate] = useState(true);

  const [contact, setContact] = useState({ name: '', business: '', need: 'Un sistema administrativo', message: '' });

  useReveal();
  useScrollProgress();

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
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-blue-950/80 glass py-2 border-b border-white/10' : 'bg-blue-950 py-3.5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center gap-4">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3" aria-label="GIGA DEVS, inicio">
            <Logo size={48} />
            <span className="text-xl sm:text-2xl font-black tracking-wider text-white whitespace-nowrap"><span className="text-yellow-500">GIGA</span> DEVS</span>
          </a>

          <nav className="hidden xl:flex gap-6 font-medium text-white text-sm whitespace-nowrap" aria-label="Secciones">
            {NAV.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className={`hover:text-yellow-400 transition-colors ${id === 'quincena' ? 'text-emerald-300 font-semibold' : id === 'criteriseg' ? 'text-indigo-300 font-semibold' : ''}`}>{label}</button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 whitespace-nowrap">
            <div className="hidden 2xl:flex text-xs text-yellow-400 bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-800 font-mono items-center gap-1" title="Tasa oficial del Banco Central de Venezuela">
              <Lock size={12} className="text-green-400" /> BCV: Bs. {rate}
            </div>
            <a href={quincenaLink('/app', 'menu')} className="pill !px-4 !py-2 text-white border border-emerald-400/60 hover:bg-emerald-500/20 text-sm">Entrar a Quincena VE</a>
            <button onClick={() => scrollToSection('contacto')} className="pill !px-5 !py-2 bg-yellow-500 text-blue-950 hover:bg-yellow-400 text-sm">Cotizar gratis</button>
          </div>

          <button className="lg:hidden text-yellow-500 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMenuOpen} aria-controls="menu-movil">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div id="menu-movil" className={`lg:hidden absolute w-full bg-blue-950 shadow-2xl transition-all duration-300 border-b border-blue-900 ${isMenuOpen ? 'max-h-[640px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
          <div className="px-6 space-y-1">
            <div className="text-xs text-yellow-400 bg-blue-900/80 px-3 py-2 rounded-xl border border-blue-800 font-mono text-center mb-2">Tasa BCV de hoy: Bs. {rate}</div>
            {NAV.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className={`block w-full text-left py-2.5 font-medium border-b border-blue-900/50 ${id === 'quincena' ? 'text-emerald-300' : id === 'criteriseg' ? 'text-indigo-300' : 'text-white'}`}>{label}</button>
            ))}
            <a href={quincenaLink('/app', 'menu-movil')} className="block w-full text-center border border-emerald-400/60 text-white font-bold py-3 rounded-xl mt-4">Entrar a Quincena VE</a>
            <button onClick={() => scrollToSection('contacto')} className="block w-full text-center bg-yellow-500 text-blue-950 font-bold py-3 rounded-xl mt-2 shadow-lg">Cotizar gratis</button>
          </div>
        </div>
      </header>

      <main>
        {/* --- PORTADA: titular grande y panel que se endereza al bajar (estilo apple.com) --- */}
        <section id="inicio" data-scroll="hero" className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-blue-950 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900 via-blue-950 to-blue-950"></div>
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[760px] h-[420px] bg-yellow-500 rounded-full mix-blend-screen filter blur-[140px] opacity-[0.12]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="hero-copy text-center max-w-4xl mx-auto">
              <p className="eyebrow text-yellow-400 mb-4 reveal">Software a la medida · Hecho en Venezuela</p>
              <h1 className="display text-5xl sm:text-6xl lg:text-8xl mb-6 reveal" style={{ '--d': '80ms' }}>
                Ordena tu negocio.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">Vende más.</span>
              </h1>
              <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8 reveal" style={{ '--d': '160ms' }}>
                Sistemas administrativos, páginas web y apps móviles. Y nuestros productos: Quincena VE, Contax y Criteriseg.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center reveal" style={{ '--d': '240ms' }}>
                <a href={waLink('Hola GIGA DEVS, quiero cotizar un proyecto')} target="_blank" rel="noopener noreferrer" className="pill bg-yellow-500 text-blue-950 hover:bg-yellow-400 text-lg px-8">
                  <MessageCircle size={20} /> Cotizar por WhatsApp
                </a>
                <button onClick={() => scrollToSection('productos')} className="chev text-yellow-400 text-lg">Ver nuestros productos</button>
              </div>
            </div>

            <div className="hero-device mt-10 md:mt-12 max-w-4xl mx-auto" aria-hidden="true">
              <div className="bg-white text-gray-900 rounded-[2rem] p-5 md:p-8 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-400"></span><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="w-3 h-3 rounded-full bg-green-400"></span><span className="ml-3 font-bold text-blue-950">Panel de tu negocio</span></div>
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">En línea</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-2xl p-4"><div className="text-xs text-gray-500 font-semibold">Ventas de hoy</div><div className="text-2xl md:text-3xl font-black text-blue-950">$1.284</div><div className="text-xs text-green-600 font-bold">+12% vs. ayer</div></div>
                  <div className="bg-yellow-50 rounded-2xl p-4"><div className="text-xs text-gray-500 font-semibold">En bolívares</div><div className="text-lg sm:text-2xl md:text-3xl font-black text-blue-950 whitespace-nowrap">Bs. {ves(1284).split(',')[0]}</div><div className="text-xs text-gray-500">Tasa BCV del día</div></div>
                  <div className="bg-emerald-50 rounded-2xl p-4 hidden md:block"><div className="text-xs text-gray-500 font-semibold">Fiado por cobrar</div><div className="text-3xl font-black text-blue-950">$86</div><div className="text-xs text-gray-500">4 clientes</div></div>
                  <div className="bg-indigo-50 rounded-2xl p-4 hidden md:block"><div className="text-xs text-gray-500 font-semibold">Facturas del mes</div><div className="text-3xl font-black text-blue-950">128</div><div className="text-xs text-gray-500">Con número de control</div></div>
                </div>
                <div className="grid md:grid-cols-3 gap-x-6">
                  {[[Receipt, 'Venta #000128 registrada', 'hace 2 min'], [Package, 'Stock bajo: 3 productos', 'Almacén principal'], [TrendingUp, 'Cierre de caja listo', 'Turno de la tarde']].map(([Icon, tt, s]) => (
                    <div key={tt} className="flex items-center gap-3 py-3 border-t border-gray-100">
                      <div className="w-9 h-9 rounded-xl bg-blue-950 text-yellow-400 flex items-center justify-center flex-shrink-0"><Icon size={18} /></div>
                      <div><div className="text-sm font-semibold">{tt}</div><div className="text-xs text-gray-500">{s}</div></div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-2">Datos de ejemplo</div>
              </div>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto text-sm text-blue-100">
              {['Precio cerrado antes de empezar', 'Pago en $ o Bs. a tasa BCV', 'Soporte y actualizaciones', 'Seguridad desde el primer día'].map((x, i) => (
                <li key={x} className="flex items-center justify-center gap-2 text-center reveal" style={{ '--d': `${i * 80}ms` }}><CheckCircle size={16} className="text-yellow-400 flex-shrink-0" /> {x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- PRODUCTOS: mosaico como la portada de apple.com --- */}
        <ProductTiles
          erpDemo={waLink('Hola GIGA DEVS 👋 Quiero probar Contax gratis 72 horas (facturación e inventario).')}
          criterisegDemo={waLink('Hola GIGA DEVS 👋 Quiero una demostración de Criteriseg, el sistema de control y auditoría.')}
          go={scrollToSection}
        />

        <Statement />

        {/* --- QUINCENA: PRODUCTO PROPIO --- */}
        <QuincenaSection />

        {/* --- Criteriseg: PRODUCTO PROPIO (sin enlace a ninguna instalación) --- */}
        <CriterisegSection demoHref={waLink('Hola GIGA DEVS 👋 Quiero una demostración de Criteriseg, el sistema de control y auditoría.')} onCotizar={() => scrollToSection('contacto')} />

        {/* --- CONTAX (antes ERP): PRODUCTO PROPIO (privado: solo presentación, sin acceso a la plataforma) --- */}
        <ErpSection demoHref={waLink('Hola GIGA DEVS 👋 Quiero probar Contax gratis 72 horas (facturación e inventario).')} onCotizar={() => scrollToSection('contacto')} />

        <ComoTrabajamos onCotizar={() => scrollToSection('contacto')} />

        {/* --- COTIZAR: cada sistema es personalizado, sin precios publicados --- */}
        <section id="cotizar" className="py-14 md:py-20 bg-blue-950 relative overflow-hidden text-white">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8 reveal">
              <p className="eyebrow text-yellow-400 mb-3">Cotiza tu proyecto</p>
              <h2 className="display text-4xl md:text-6xl mb-4">Cada sistema es único.</h2>
              <p className="text-blue-200 text-lg">Por eso no tenemos precios fijos: cada sistema se diseña según lo que tu negocio necesita. Cuéntanos tu proyecto y te enviamos una cotización gratis, en dólares o en bolívares a la tasa BCV del día.</p>
            </div>

            <div className="rail md:grid-cols-2 xl:grid-cols-4 items-stretch pt-4">
              {SOLUTIONS.map((s, i) => {
                const dark = s.featured;
                return (
                  <article key={s.id} style={{ '--d': `${i * 90}ms` }} className={`reveal tile relative rounded-3xl p-6 flex flex-col shadow-2xl ${dark ? 'bg-gradient-to-b from-yellow-400 to-amber-500 text-blue-950 ring-4 ring-yellow-300/40' : 'bg-white text-gray-900'}`}>
                    {dark && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-950 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow whitespace-nowrap">⭐ Lo más pedido</div>}
                    <div className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-blue-950/70' : 'text-blue-600'}`}>Personalizado</div>
                    <h3 className="text-xl font-extrabold mb-1">{s.name}</h3>
                    <p className={`text-sm mb-4 ${dark ? 'text-blue-950/80' : 'text-gray-500'}`}>{s.desc}</p>
                    <ul className={`space-y-1.5 text-sm mb-5 flex-1 ${dark ? 'font-semibold' : 'text-gray-700'}`}>
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2"><CheckCircle size={17} className={`mt-0.5 flex-shrink-0 ${dark ? 'text-blue-950' : 'text-green-500'}`} /> {f}</li>
                      ))}
                    </ul>
                    <a href={waLink(`Hola GIGA DEVS 👋 Quiero cotizar: ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="pill w-full bg-blue-950 text-white hover:bg-blue-900 shadow">
                      <MessageCircle size={18} /> Cotizar por WhatsApp
                    </a>
                  </article>
                );
              })}
            </div>

            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 max-w-5xl mx-auto text-sm text-blue-100">
              {['Cotización gratis y sin compromiso', 'Precio cerrado antes de empezar', 'Factura al confirmar tu pago', 'Soporte incluido'].map((t) => (
                <li key={t} className="flex items-center gap-2 justify-center text-center"><BadgeCheck size={18} className="text-yellow-400 flex-shrink-0" /> {t}</li>
              ))}
            </ul>
          </div>
        </section>

        <Faq />

        {/* --- CONTACTO --- */}
        <section id="contacto" className="py-14 md:py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
              <div className="reveal">
                <p className="eyebrow text-blue-600 mb-3">Contacto</p>
                <h2 className="display text-4xl md:text-6xl text-blue-950 mb-4">Cuéntanos tu proyecto.</h2>
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
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 hover:border-pink-400 transition">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center"><InstagramIcon size={24} /></div>
                    <div><div className="font-bold text-blue-950">Instagram</div><div className="text-gray-600 text-sm">@gigadevsc</div></div>
                  </a>
                  <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 hover:border-blue-400 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center"><FacebookIcon size={24} /></div>
                    <div><div className="font-bold text-blue-950">Facebook</div><div className="text-gray-600 text-sm">Gigadevs Corp</div></div>
                  </a>
                </div>
              </div>

              <form onSubmit={contactWhatsApp} className="reveal bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 space-y-3" style={{ '--d': '120ms' }}>
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
                <button type="submit" className="pill w-full py-3.5 bg-green-500 text-white hover:bg-green-600 shadow-lg">
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
            <p className="text-blue-200 max-w-sm text-sm leading-relaxed">Desarrollo de software seguro a la medida en Venezuela: sistemas administrativos, sistemas de auditoría, páginas web y apps móviles. Creadores de Quincena VE, ERP y Criteriseg.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Productos</h3>
            <ul className="space-y-1.5 text-sm text-blue-200">
              <li><a href={quincenaLink('/', 'footer')} className="hover:text-yellow-400">Quincena VE · finanzas personales</a></li>
              <li><a href={quincenaLink('/app', 'footer')} className="hover:text-yellow-400">Entrar a Quincena VE</a></li>
              <li><a href={quincenaLink('/app', 'footer-registro') + '#registro'} className="hover:text-yellow-400">Crear cuenta gratis</a></li>
              <li><a href={quincenaLink('/app', 'footer-negocio') + '#negocio'} className="hover:text-yellow-400">Quincena VE para tu negocio</a></li>
              <li><a href="https://erp-web-jaby.onrender.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Contax® · facturación y contabilidad</a></li>
              <li><a href="#criteriseg" onClick={(e) => { e.preventDefault(); scrollToSection('criteriseg'); }} className="hover:text-yellow-400">Criteriseg · control y auditoría</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Contacto</h3>
            <ul className="space-y-1.5 text-sm text-blue-200">
              <li><a href={`mailto:${EMAIL}`} className="hover:text-yellow-400">{EMAIL}</a></li>
              <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">WhatsApp: +58 (424) 258-8321</a></li>
            </ul>
            <div className="flex gap-2 mt-3">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Gigadevs" className="w-9 h-9 rounded-lg bg-blue-900 text-blue-200 hover:text-yellow-400 hover:bg-blue-800 flex items-center justify-center transition"><InstagramIcon size={18} /></a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Gigadevs" className="w-9 h-9 rounded-lg bg-blue-900 text-blue-200 hover:text-yellow-400 hover:bg-blue-800 flex items-center justify-center transition"><FacebookIcon size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-900 container mx-auto px-4 pt-5 text-center text-xs text-blue-400">
          <p>© {new Date().getFullYear()} GIGA DEVS Corp. Todos los derechos reservados. Contax® es una marca registrada de Gigadevs Corp.</p>
          <p className="mt-2 flex justify-center gap-4 flex-wrap">
            {[['terminos', 'Términos y condiciones'], ['privacidad', 'Política de privacidad'], ['cookies', 'Política de cookies']].map(([k, t]) => (
              <a key={k} href={`https://erp-web-jaby.onrender.com/legal/${k}`} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 underline">{t}</a>
            ))}
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;
