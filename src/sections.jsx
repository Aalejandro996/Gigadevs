import React, { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, LogIn, UserPlus, Smartphone, Wallet, HandCoins, CalendarCheck, PiggyBank, MessagesSquare, ClipboardList, Wrench, LifeBuoy, Store, Briefcase, Stethoscope, Rocket, ChevronDown, Building2, Landmark, ServerCog, Sparkles, FileSignature, Workflow, History, ShieldCheck, BarChart3, ClipboardCheck, PenLine, Receipt, Package, FileSpreadsheet, Users } from 'lucide-react';

// Quincena VE es el producto propio de Gigadevs. Los enlaces llevan utm para que Quincena VE sepa cuántas cuentas llegan desde aquí.
export const QUINCENA_URL = 'https://quincena.gigadevscorp.com';
export const quincenaLink = (path = '/', campaign = 'web') => `${QUINCENA_URL}${path}${path.includes('?') ? '&' : '?'}utm_source=gigadevs&utm_campaign=${campaign}`;

const QuincenaIcon = ({ size = 56 }) => (
  <img src="/quincena-icon.png" alt="" width={size} height={size} className="rounded-2xl shadow-lg mx-auto block" />
);

// Surtia™: asistente de ventas por WhatsApp (producto propio). Marca ™ hasta el registro ante el SAPI.
const SurtiaMark = ({ size = 56 }) => (
  <img src="/marketing/surtia/logo-icono.png" width={size} height={size} alt="" className="flex-shrink-0" />
);
const SurtiaChat = ({ compact = false }) => (
  <div className={`bg-[#0B2530] text-white rounded-[2rem] p-5 shadow-2xl text-left ${compact ? '' : 'max-w-md mx-auto ring-1 ring-white/10'}`} role="img" aria-label="Ejemplo de una conversación de WhatsApp atendida por Surtia">
    <div className="flex justify-end"><div className="bg-[#1f3f4d] rounded-2xl rounded-br-sm px-4 py-2 text-sm">¿Tienen harina?</div></div>
    <div className="flex justify-start mt-3"><div className="bg-[#16C79A] text-[#0B2530] rounded-2xl rounded-bl-sm px-4 py-3 text-sm font-semibold max-w-[88%]">Sí. Harina Pan 1 kg: precio en Bs del día y en existencia. ¿Cuántas quieres?</div></div>
    <div className="flex justify-end mt-3"><div className="bg-[#1f3f4d] rounded-2xl rounded-br-sm px-4 py-2 text-sm">Quiero 3</div></div>
    <div className="flex justify-start mt-3"><div className="bg-[#FF7A45] text-[#0B2530] rounded-2xl rounded-bl-sm px-4 py-2 text-sm font-bold">Pedido recibido ✓ Listo para facturar</div></div>
    <div className="text-[11px] text-white/50 mt-3">Ejemplo ilustrativo</div>
  </div>
);

// Mosaico de productos al estilo de la portada de apple.com: cada producto con sus colores.
const Tile = ({ className = '', style = {}, eyebrow, title, sub, children, links, d = 0, dark = true }) => (
  <article className={`reveal tile relative overflow-hidden rounded-[2rem] text-center flex flex-col items-center pt-10 md:pt-12 px-6 min-h-[360px] md:min-h-[400px] ${className}`} style={{ ...style, '--d': `${d}ms` }}>
    {eyebrow}
    <h3 className="display text-4xl md:text-5xl mt-2">{title}</h3>
    <p className={`text-lg md:text-xl mt-3 max-w-md ${dark ? 'opacity-90' : 'opacity-80'}`}>{sub}</p>
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5 text-base md:text-lg">{links}</div>
    <div className="art mt-auto w-full max-w-sm pt-6">{children}</div>
  </article>
);

export const ProductTiles = ({ erpDemo, criterisegDemo, go }) => (
  <section id="productos" className="bg-white p-3 md:p-4" aria-label="Nuestros productos">
    <div className="rail md:grid-cols-2 gap-3 md:gap-4">
      <Tile className="tile-brand" style={{ '--glow': '#F5C518' }} d={0}
        eyebrow={<img src="/quincena-icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" />}
        title="Quincena VE" sub="Tu quincena, en dólares y en bolívares. Gratis."
        links={<><a href={quincenaLink('/app', 'tile') + '#registro'} className="chev text-white">Crear cuenta gratis</a><a href="#quincena" onClick={(e) => { e.preventDefault(); go('quincena'); }} className="chev text-[#F5C518]">Más información</a></>}>
        <div className="lg-panel text-gray-900 rounded-t-[2rem] p-6 text-left">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Hoy puedes gastar</div>
          <div className="text-4xl font-black my-1 text-[#0B2347]">$9,85</div>
          <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden mb-2"><div className="h-full w-[62%] bg-gradient-to-r from-[#2E9A5E] to-[#57C08A]"></div></div>
          {[['Te queda esta quincena', '$148,20'], ['Alquiler · fijo', '$120,00']].map(([k, v]) => <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>)}
        </div>
      </Tile>

      <Tile className="tile-brand claro" style={{ '--glow': '#9CC8E0' }} dark={false} d={90}
        eyebrow={<div className="flex flex-col items-center gap-2"><img src="/quincena-negocio-icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" /><span className="text-xs font-bold uppercase tracking-widest bg-[#F5C518] text-[#0B2347] px-3 py-1 rounded-full">Nuevo</span></div>}
        title="Quincena Mi negocio" sub="Ventas, fiado y caja en $ y en Bs. Gratis."
        links={<><a href={quincenaLink('/app', 'tile-negocio') + '#negocio'} className="chev text-[#2F4A9A]">Crear la cuenta del negocio</a><a href="#quincena-negocio" onClick={(e) => { e.preventDefault(); go('quincena-negocio'); }} className="chev text-[#0B2347]">Más información</a></>}>
        <div className="lg-panel text-gray-900 rounded-t-[2rem] p-6 text-left">
          <div className="flex justify-between items-center"><span className="text-sm font-semibold text-gray-500">Vendiste hoy</span><span className="text-xs font-bold bg-[#F5C518] text-[#0B2347] px-2 py-0.5 rounded-full">Hoy</span></div>
          <div className="text-4xl font-black my-1 text-[#0B2347]">$128,50</div>
          {[['Pago móvil', '$65,00', ''], ['Fiado · María', '$12,00', 'text-orange-600']].map(([k, v, c]) => <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong className={c}>{v}</strong></div>)}
        </div>
      </Tile>

      <Tile className="tile-brand" style={{ '--glow': '#87e64b' }} d={0}
        eyebrow={<img src="/contax-icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" />}
        title="Contax" sub={<>Tu empresa en orden. <span className="text-[#87e64b]">Tu fisco al día.</span></>}
        links={<><a href={erpDemo} target="_blank" rel="noopener noreferrer" className="chev text-[#87e64b]">Probar gratis 72 h</a><a href="https://contax.gigadevscorp.com/" target="_blank" rel="noopener noreferrer" className="chev text-white">Conocer Contax</a></>}>
        <div className="lg-panel text-gray-900 rounded-t-[2rem] p-6 text-left">
          <div className="flex justify-between items-start gap-2"><span className="text-sm font-semibold text-gray-500">Factura A00000128</span><span className="text-[10px] font-bold border-2 border-gray-900 rounded-md px-1.5">Control 00-00000128</span></div>
          <div className="text-3xl font-black my-2">Bs. 4.234,00</div>
          {[['IVA 16 %', 'Bs. 584,00'], ['IGTF 3 % (divisas)', 'Bs. 109,50']].map(([k, v]) => <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>)}
        </div>
      </Tile>

      <Tile className="tile-brand" style={{ '--glow': '#16C79A' }} d={0}
        eyebrow={<img src="/marketing/surtia/logo-icono.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" />}
        title={<>Surt<span className="text-[#FF7A45]">i</span>a™</>} sub={<>Tu asistente de ventas <span className="text-[#16C79A]">por WhatsApp.</span></>}
        links={<><a href="https://surtia.gigadevscorp.com/" target="_blank" rel="noopener noreferrer" className="chev text-[#16C79A]">Conocer Surtia</a><a href="#surtia" onClick={(e) => { e.preventDefault(); go('surtia'); }} className="chev text-white">Más información</a></>}>
        <SurtiaChat compact />
      </Tile>

      <Tile className="md:col-span-2 tile-brand" style={{ '--glow': '#6FA8DC' }} d={90}
        eyebrow={<img src="/criteriseg-icono.svg" alt="" width={56} height={62} className="drop-shadow-lg" />}
        title="Criteriseg" sub="Control y auditoría, de la planificación al informe firmado."
        links={<><a href={criterisegDemo} target="_blank" rel="noopener noreferrer" className="chev text-[#9CC8E0]">Pedir una demostración</a><a href="#criteriseg" onClick={(e) => { e.preventDefault(); go('criteriseg'); }} className="chev text-white">Más información</a></>}>
        <div className="lg-panel text-gray-900 rounded-t-[2rem] p-6 text-left">
          <div className="font-bold text-[#17365D] text-sm">Auditoría financiera · Cuentas por pagar</div>
          {[['ALTO', 'Pagos sin orden aprobada', 'bg-red-100 text-red-700'], ['MEDIO', 'Auxiliar no conciliado', 'bg-amber-100 text-amber-800']].map(([r, x, c]) => <div key={x} className="flex items-center gap-3 py-2 border-t border-gray-100 mt-1"><span className={`text-[10px] font-black px-2 py-1 rounded-md ${c}`}>{r}</span><span className="text-sm">{x}</span></div>)}
          <div className="flex justify-between text-[11px] font-semibold mt-2 pt-2 border-t border-gray-100">{['Auditor', 'Jefe', 'Gerente'].map((n) => <span key={n} className="text-emerald-700 flex items-center gap-1"><CheckCircle size={13} />{n}</span>)}<span className="text-gray-400 flex items-center gap-1"><PenLine size={13} />Contralor</span></div>
        </div>
      </Tile>

    </div>
  </section>
);

// Frase grande que se ilumina palabra por palabra mientras se baja (como en las páginas de producto de Apple).
const STATEMENT = 'Hacemos software seguro, hecho en Venezuela por profesionales, para que tu negocio controle su inventario, facture sin errores, cobre a tiempo y cumpla con sus clientes.';
// Misión y visión de Gigadevs Corp (texto del equipo, nov 2026, editado para leerse en la web).
const PILARES = [
  [ShieldCheck, 'Seguridad desde el diseño', 'La protección de la información de nuestros clientes empieza en la primera línea de código, no al final.'],
  [Workflow, 'Procesos y normativa', 'Software a la medida y productos propios que ordenan facturación, inventario, cobranza y control, y cumplen las normas venezolanas.'],
  [LifeBuoy, 'Un aliado cercano', 'Consultoría especializada y soporte técnico de calidad para convertir los retos tecnológicos en ventajas que perduran.'],
];
export const MisionVision = () => (
  <section id="mision" className="tile-brand py-16 md:py-24" style={{ '--glow': '#2F4A9A' }} aria-labelledby="t-mision">
    <div className="container mx-auto px-4 max-w-6xl">
      <p className="eyebrow text-[#9CC8E0] text-center reveal">Quiénes somos</p>
      <h2 id="t-mision" className="display text-4xl md:text-6xl text-center mt-2 mb-12 reveal">Software seguro, <span className="text-[#F5C518]">hecho para durar.</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <article className="lg-panel text-[#0B2347] rounded-[2rem] p-7 md:p-9 reveal">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2F4A9A]">Misión</p>
          <h3 className="display text-2xl md:text-3xl mt-2 mb-4">Impulsar la transformación digital de las empresas con software seguro y a la medida.</h3>
          <p className="text-slate-600 leading-relaxed">
            Diseñamos y desarrollamos soluciones robustas que optimizan los procesos críticos de cada organización, crecen con ella y cumplen la
            normativa con altos estándares de calidad técnica. Protegemos los activos de información de nuestros clientes con prácticas de
            seguridad integradas desde el inicio del desarrollo, y los acompañamos con innovación constante, consultoría especializada y soporte
            técnico de excelencia: un aliado estratégico que convierte retos tecnológicos complejos en ventajas competitivas sostenibles.
          </p>
        </article>
        <article className="rounded-[2rem] p-7 md:p-9 reveal border border-white/15" style={{ '--d': '120ms', background: 'linear-gradient(115deg, rgba(255,255,255,.14), rgba(255,255,255,0) 45%), rgba(255,255,255,.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.3)' }}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5C518]">Visión 2030</p>
          <h3 className="display text-2xl md:text-3xl mt-2 mb-4">Ser la empresa de referencia en software seguro y consultoría tecnológica de Venezuela y la región.</h3>
          <p className="text-slate-200 leading-relaxed">
            Queremos ser reconocidos por la excelencia, la confiabilidad y la innovación de nuestras plataformas, e impulsar la madurez digital del
            sector empresarial e industrial. Nos adaptamos primero a las nuevas tecnologías y normativas para estar a la vanguardia de la ingeniería
            de software, y construimos relaciones de confianza a largo plazo, para que el sello Gigadevs sea sinónimo de garantía, seguridad y
            liderazgo tecnológico.
          </p>
        </article>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {PILARES.map(([Icon, t, d], i) => (
          <div key={t} className="reveal rounded-3xl p-6 border border-white/10" style={{ '--d': `${i * 90}ms`, background: 'rgba(255,255,255,.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}>
            <Icon size={26} className="text-[#F5C518] mb-3" />
            <div className="font-bold text-lg mb-1">{t}</div>
            <p className="text-sm text-slate-300 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Statement = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const words = [...el.querySelectorAll('span')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { words.forEach((w) => w.classList.add('on')); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < lit));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="bg-white py-10 md:py-14" aria-label="Lo que hacemos">
      <p ref={ref} className="lit display container mx-auto px-6 max-w-5xl text-4xl md:text-6xl lg:text-7xl text-center">
        {STATEMENT.split(' ').map((w, i) => <span key={i}>{w} </span>)}
      </p>
    </section>
  );
};

const NEGOCIO = [
  [Receipt, 'Ventas con la tasa del día', 'Anota cada venta en bolívares o dólares y mira cuánto vendiste hoy.'],
  [HandCoins, 'Fiado sin olvidos', 'Quién te debe, cuánto y desde cuándo, con recordatorio por WhatsApp.'],
  [Wallet, 'Caja y ganancia', 'Cierra la caja al final del día y mira tu ganancia del mes en dólares.'],
];
const NEGOCIO_PLUS = [[Package, 'Productos con inventario'], [Receipt, 'Recibos para WhatsApp'], [FileSpreadsheet, 'Excel para tu contador'], [Users, 'Vendedores desde su teléfono']];

export const QuincenaSection = () => (
  <section id="quincena" style={{ '--glow': '#F5C518' }} className="py-10 md:py-14 tile-brand text-white relative overflow-hidden" aria-labelledby="t-quincena">
    <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-white/5 rounded-full"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center max-w-4xl mx-auto mb-10 reveal">
        <QuincenaIcon size={72} />
        <p className="eyebrow text-[#F5C518] mt-5 mb-3">Producto propio de Gigadevs · Gratis · Web y Android</p>
        <h2 id="t-quincena" className="display text-5xl md:text-7xl">Quincena <span className="text-[#F5C518]">VE</span></h2>
        <p className="text-xl md:text-3xl font-semibold text-slate-200 mt-4 leading-snug">Para tu quincena. Tu dinero en orden, todos los días.</p>
      </div>

      {/* Personal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 reveal">
          <p className="eyebrow text-[#F5C518] mb-2">Personal</p>
          <h3 className="display text-3xl md:text-5xl mb-4">Controla tu quincena, en dólares y en bolívares.</h3>
          <p className="text-slate-200 text-lg leading-relaxed mb-6 max-w-2xl">
            Para quien cobra cada 15 días o cada semana: gastos en dólares o moneda local con la tasa del día, pagos, deudas y cuánto te queda
            hasta el próximo cobro. En Venezuela, Colombia, Chile, Perú, México y Argentina.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-slate-100 mb-7">
            {[[Wallet, 'Dólares y moneda local con la tasa del día'], [CalendarCheck, 'Pagos fijos con avisos antes de vencer'], [HandCoins, 'Lleva la cuenta de quién te debe'], [PiggyBank, 'Plan para salir de deudas'], [Smartphone, 'Web y app para Android'], [CheckCircle, 'Sin publicidad: tus datos son solo tuyos']].map(([Icon, x]) => (
              <li key={x} className="flex items-start gap-2"><Icon size={18} className="text-[#F5C518] flex-shrink-0 mt-0.5" /> {x}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <a href={quincenaLink('/app', 'registro') + '#registro'} className="pill bg-[#F5C518] text-[#0B2347] hover:brightness-105 shadow-xl"><UserPlus size={20} /> Crear cuenta gratis</a>
            <a href={quincenaLink('/app', 'entrar')} className="pill border border-white/50 text-white hover:bg-white/10"><LogIn size={20} /> Entrar a Quincena VE</a>
            <a href={quincenaLink('/', 'conocer')} className="chev text-white px-2">Conocer más</a>
          </div>
        </div>
        <div className="lg:col-span-5 reveal" style={{ '--d': '120ms' }} aria-hidden="true">
          <div className="lg-panel text-[#0B2347] rounded-[2rem] p-6 max-w-sm mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Hoy puedes gastar</div>
            <div className="text-5xl font-black my-1">$9,85</div>
            <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden mb-4"><div className="h-full w-[62%] bg-gradient-to-r from-[#2E9A5E] to-[#57C08A]"></div></div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white/80 rounded-2xl p-3"><div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Te queda</div><div className="text-xl font-black text-[#2E9A5E]">$148,20</div></div>
              <div className="bg-white/80 rounded-2xl p-3"><div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Por pagar</div><div className="text-xl font-black text-[#C8192F]">$120,00</div></div>
            </div>
            {[['Alquiler', '$120,00', 'Pronto', 'bg-[#FFF3C4] text-[#7A5A00]'], ['Fondo de emergencia', '48 %', 'Ahorro', 'bg-[#E3F1EA] text-[#1D6B44]']].map(([k, v, t, c]) => (
              <div key={k} className="flex items-center justify-between gap-3 py-2 border-t border-slate-200 text-sm"><span>{k}</span><span className="flex items-center gap-2"><strong>{v}</strong><span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${c}`}>{t}</span></span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Negocio */}
      <div id="quincena-negocio" className="mt-20 md:mt-28 bg-white text-[#0B2347] rounded-[2.5rem] p-6 md:p-12 shadow-2xl scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-3"><img src="/quincena-negocio-icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" /><span className="text-xs font-bold uppercase tracking-widest bg-[#F5C518] text-[#0B2347] px-3 py-1 rounded-full">Nuevo · Ya disponible</span></div>
            <h3 className="display text-3xl md:text-5xl mt-4 mb-4">Quincena Mi negocio.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Ventas, fiado y caja en $ y en Bs. Para bodegas, comida, belleza, venta por Instagram y cualquier emprendimiento que cobra por pago móvil,
              en efectivo o en dólares. Va aparte de tu quincena personal, en la misma cuenta. <strong>Gratis.</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {NEGOCIO.map(([Icon, x, dd], i) => (
                <div key={x} className="reveal bg-[#EEF3FB] rounded-2xl p-4" style={{ '--d': `${i * 90}ms` }}>
                  <Icon size={22} className="text-[#2F4A9A] mb-2" />
                  <div className="font-bold mb-1">{x}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{dd}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 mb-6"><strong>¿Necesitas más?</strong> Negocio Plus (inventario, recibos, Excel para tu contador y vendedores) se pide por WhatsApp.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <a href={quincenaLink('/app', 'negocio') + '#negocio'} className="pill bg-[#0B2347] text-white hover:bg-[#163A73] shadow-lg"><Store size={20} /> Crear la cuenta de mi negocio</a>
              <span className="text-sm text-slate-500">¿Ya usas la app? Actívalo en <strong>Más › Mi negocio</strong>.</span>
            </div>
            <p className="text-xs text-slate-500 mt-4">Quincena VE lleva tus cuentas; no emite facturas fiscales. Para facturar según el SENIAT, mira Contax.</p>
          </div>
          <div className="lg:col-span-5 reveal" style={{ '--d': '120ms' }} aria-hidden="true">
            <div className="rounded-[2rem] p-6 max-w-sm mx-auto text-white shadow-2xl" style={{ background: 'radial-gradient(80% 60% at 50% 0%, rgba(245,197,24,.22), transparent 70%), linear-gradient(180deg,#102c58,#0B2347)' }}>
              <div className="flex items-center gap-3 mb-4"><img src="/quincena-negocio-icon.png" alt="" width={40} height={40} className="rounded-xl" /><div><div className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Quincena Mi negocio</div><div className="font-bold">Bodega Ana</div></div></div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Vendiste hoy</div>
              <div className="text-5xl font-black my-1 text-[#F5C518]">$128,50</div>
              {[['Pago móvil', '$65,00', ''], ['Efectivo', '$51,50', ''], ['Fiado · María', '$12,00', 'text-[#FF9A6B]']].map(([k, v, c]) => (
                <div key={k} className="flex justify-between py-2 border-t border-white/10 text-sm"><span className="text-slate-200">{k}</span><strong className={c}>{v}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Para quién y cómo trabajamos van en una sola sección para acortar la página.
export const ComoTrabajamos = ({ onCotizar }) => (
  <section id="como-trabajamos" className="py-10 md:py-14 bg-white border-t border-gray-100" aria-labelledby="t-como">
    <div className="container mx-auto px-4">
      <div id="para-quien" className="text-center max-w-3xl mx-auto mb-8 reveal">
        <p className="eyebrow text-cyan-600 mb-3">Para quién y cómo trabajamos</p>
        <h2 id="t-como" className="display text-4xl md:text-6xl text-blue-950 mb-4">De la idea al sistema funcionando.</h2>
        <p className="text-gray-600">Para negocios de Venezuela y Latinoamérica, con precio cerrado en dólares o en bolívares a tasa BCV y soporte después de la entrega.</p>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          [MessagesSquare, 'Conversamos', 'Nos cuentas por WhatsApp o correo qué necesita tu negocio.'],
          [ClipboardList, 'Propuesta y cotización', 'Alcance, tiempos y precio cerrado según tu proyecto, en dólares o en bolívares a tasa BCV.'],
          [Wrench, 'Desarrollo', 'Con buenas prácticas de seguridad y avances para que opines antes de la entrega.'],
          [LifeBuoy, 'Entrega y soporte', 'Lo publicamos, te enseñamos a usarlo y te acompañamos con soporte.'],
        ].map(([Icon, t, d], i) => (
          <li key={t} className="reveal flex gap-3 items-start bg-blue-950 text-white rounded-3xl p-5" style={{ '--d': `${i * 90}ms` }}>
            <span className="w-9 h-9 bg-cyan-500 text-blue-950 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={18} /></span>
            <div><div className="font-bold text-sm">{i + 1}. {t}</div><p className="text-blue-200 text-xs leading-relaxed">{d}</p></div>
          </li>
        ))}
      </ol>
      <div className="text-center mt-6">
        <button onClick={onCotizar} className="pill bg-cyan-500 text-blue-950 hover:bg-cyan-400 shadow-lg px-8">
          Empezar mi proyecto <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
);

export const FAQS = [
  ['¿Qué hace Gigadevs?', 'Desarrollamos software a la medida: sistemas administrativos y contables, páginas web y tiendas en línea, apps móviles para Android y iOS, y soluciones de seguridad para redes y equipos. También creamos productos propios: Quincena VE (personal y para tu negocio), Contax y Criteriseg.'],
  ['¿Cómo puedo pagar?', 'En dólares o en bolívares a la tasa BCV del día, por pago móvil, transferencia bancaria, Binance Pay o PayPal. El monto lo acordamos en la cotización, antes de empezar.'],
  ['¿Cuánto tarda un proyecto?', 'Depende del alcance. En la propuesta te damos las fechas de entrega antes de empezar, y te mostramos avances durante el desarrollo.'],
  ['¿El sistema queda siendo mío?', 'Depende de lo que acordemos en la cotización: puede ser una licencia de pago único, con el sistema para siempre y un año de soporte incluido, o una suscripción mensual o anual.'],
  ['¿Trabajan con negocios fuera de Venezuela?', 'Sí. Trabajamos a distancia con clientes de Venezuela y otros países de Latinoamérica.'],
  ['¿Qué es Quincena VE?', 'Es nuestra app gratis de finanzas personales para quien cobra por quincena o por semana: registra gastos en dólares y moneda local con la tasa del día, controla pagos y deudas, y muestra cuánto te queda hasta el próximo cobro. Funciona en la web y en Android.'],
  ['¿Quincena VE sirve para mi negocio?', 'Sí. Con Quincena VE para tu negocio, gratis, anotas ventas en bolívares y dólares con la tasa del día, el fiado de tus clientes, los gastos del negocio y el cierre de caja, aparte de tu quincena personal. Negocio Plus (inventario, recibos, Excel para el contador y vendedores) es un plan de pago. Quincena VE no emite facturas fiscales.'],
  ['¿Qué es Contax?', 'Contax® (antes «ERP») es nuestra plataforma web de gestión empresarial: facturación según la Providencia SNAT/2011/00071 en bolívares o divisas con la tasa BCV, contabilidad VEN-NIF, libros de compras y ventas que cuadran con la contabilidad, órdenes de compra, inventario, cuentas por cobrar y pagar, y un bot de WhatsApp que toma pedidos y lee órdenes de compra en PDF. Migra tus datos desde Galac, Profit Plus o Excel. Elige solo los módulos que usas y te enviamos una cotización a tu medida; pruébalo gratis 72 horas.'],
  ['¿Qué es Criteriseg?', 'Es nuestro Sistema Integral de Control y Auditoría para contralorías y unidades de auditoría interna: gestiona auditorías administrativas, financieras y de sistemas, redacta los hallazgos con su propio motor de reglas y lleva el informe final por la aprobación del Jefe, el Gerente y el Contralor hasta la firma electrónica. Se instala en la infraestructura de tu organización; escríbenos para una demostración.'],
  ['¿Cómo entro a mi cuenta de Quincena VE?', 'Desde el botón "Entrar a Quincena VE" de esta página o directamente en la app de Android. Si aún no tienes cuenta, puedes crearla gratis.'],
];

export const Faq = () => (
  <section id="preguntas" className="py-10 md:py-14 bg-white border-t border-gray-100" aria-labelledby="t-faq">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10 reveal">
        <p className="eyebrow text-blue-600 mb-3">Preguntas frecuentes</p>
        <h2 id="t-faq" className="display text-4xl md:text-6xl text-blue-950">Lo que más nos preguntan.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {FAQS.map(([q, a]) => (
          <details key={q} className="reveal group bg-gray-50 rounded-2xl p-5">
            <summary className="flex justify-between items-center gap-4 font-bold text-blue-950 cursor-pointer list-none">
              {q}<ChevronDown size={20} className="text-blue-600 transition-transform group-open:rotate-180 flex-shrink-0" />
            </summary>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// Criteriseg es un producto propio de Gigadevs para contralorías y auditoría interna. Se instala en la
// infraestructura de cada organización: esta página solo lo presenta y no enlaza a ninguna instalación.
const Criteriseg_TYPES = [
  [Building2, 'Auditoría administrativa', 'Unidades administrativas y procesos: normas y procedimientos, gobierno de la unidad, gestión documental, gastos y control interno.'],
  [Landmark, 'Auditoría financiera', 'Cuentas por pagar y por cobrar: soportes, aprobaciones, conciliaciones con el mayor, antigüedad de saldos, retenciones y cobranza.'],
  [ServerCog, 'Auditoría de sistemas', 'Cuestionarios de TI por dominio (accesos, respaldos, cambios, redes, ciberseguridad) en cuatro fases, con criterios de ISO/IEC 27001, COBIT 2019 y CIS Controls.'],
];

const Criteriseg_FEATURES = [
  [Sparkles, 'Hallazgos redactados por su propio motor de reglas', 'Condición, criterio, causa, efecto y recomendación a partir de las cédulas. Sin IA externa: la información no sale del servidor.'],
  [FileSignature, 'Informe final con firma electrónica', 'PDF de hasta 15 páginas con codificación institucional, aprobado por etapas y firmado con certificado digital y firma escaneada.'],
  [Workflow, 'Flujo Auditor → Jefe → Gerente → Contralor', 'Los revisores devuelven con puntos a corregir y cada decisión queda registrada. Suplencias temporales cuando alguien no está.'],
  [History, 'Trazabilidad completa', 'Bitácora de solo inserción con usuario, fecha y motivo de cada cambio, historial de calificaciones por fase y revisiones del informe.'],
  [ShieldCheck, 'Seguridad de nivel corporativo', 'Doble factor (MFA), segregación de funciones, doble control en lo crítico, cifrado AES-256 y bloqueo fuera del horario laboral.'],
  [BarChart3, 'Tablero para el Contralor', 'Duración de auditorías, cuellos de botella por fase y carga de cada auditor, medidos en días y horas hábiles con los feriados nacionales.'],
];

export const CriterisegSection = ({ demoHref, onCotizar }) => (
  <section id="criteriseg" className="py-10 md:py-14 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden" aria-labelledby="t-criteriseg">
    <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 reveal">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-100">
            Producto propio de Gigadevs · Para contralorías y auditoría interna
          </span>
          <div className="flex items-center gap-4 mt-4 mb-3">
            <img src="/criteriseg-icono.svg" alt="" width={56} height={56} className="rounded-2xl bg-white p-1 shadow-lg" />
            <div>
              <h2 id="t-criteriseg" className="display text-5xl md:text-7xl leading-none">Criteri<span className="text-[#7DB3E8]">seg</span></h2>
              <p className="text-indigo-200 font-semibold text-sm mt-1">Sistema Integral de Control y Auditoría</p>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold text-indigo-100 mb-3 leading-snug">Auditorías administrativas, financieras y de sistemas, de la planificación al informe firmado.</p>
          <p className="text-indigo-50/90 leading-relaxed mb-5 max-w-2xl">
            Expedientes, cédulas de trabajo, hallazgos, calificación por fases e informe final con aprobación por niveles hasta la firma del Contralor.
            Cada paso queda registrado. Se instala en la infraestructura de tu organización, solo tu equipo tiene acceso y se adapta a tus tipos de
            auditoría, tu codificación de informes y tu normativa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={demoHref} target="_blank" rel="noopener noreferrer" className="pill bg-white text-indigo-900 hover:bg-indigo-50 shadow-xl">
              <MessagesSquare size={20} /> Solicitar una demostración
            </a>
            <button onClick={onCotizar} className="pill border border-white/40 text-white hover:bg-white/10">
              Cotizar para mi organización <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 hidden sm:block reveal" style={{ '--d': '120ms' }}>
          <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-2xl max-w-md mx-auto" role="img" aria-label="Ejemplo de una auditoría financiera en Criteriseg">
            <div className="flex items-center justify-between mb-1">
              <div className="font-bold text-indigo-950">Auditoría financiera · Cuentas por pagar</div>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded-full">En revisión</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">C-ADM-004-2026-A1 · Gerencia de Administración</div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              {[['Planificación', '100%'], ['Trabajo de campo', '78,4%'], ['Informe', '81,2%']].map(([p, v]) => (
                <div key={p} className="bg-indigo-50 rounded-xl p-2"><div className="text-[11px] text-gray-500 font-semibold">{p}</div><div className="text-lg font-black text-indigo-950">{v}</div></div>
              ))}
            </div>
            {[['ALTO', 'Pagos sin orden aprobada por firma autorizada', 'bg-red-100 text-red-700'], ['MEDIO', 'Auxiliar no conciliado con el mayor', 'bg-amber-100 text-amber-800'], ['BAJO', 'Expedientes de proveedores desactualizados', 'bg-emerald-100 text-emerald-700']].map(([r, t, c]) => (
              <div key={t} className="flex items-center gap-3 py-2 border-t border-gray-100">
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${c}`}>{r}</span>
                <span className="text-sm">{t}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-1 mt-3 pt-3 border-t border-gray-100 text-[11px] font-semibold">
              {[['Auditor', true], ['Jefe', true], ['Gerente', true], ['Contralor', false]].map(([n, ok]) => (
                <span key={n} className={`flex items-center gap-1 ${ok ? 'text-emerald-700' : 'text-gray-400'}`}>{ok ? <CheckCircle size={14} /> : <PenLine size={14} />} {n}</span>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">Datos de ejemplo</div>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export const SurtiaSection = ({ demoHref, onCotizar }) => (
  <section id="surtia" className="py-10 md:py-14 bg-[#0B2530] text-white relative overflow-hidden" aria-labelledby="t-surtia">
    <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-[#16C79A]/10 rounded-full blur-3xl"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 reveal">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-[#9ff0d6]">
            Producto propio de Gigadevs · Asistente de ventas por WhatsApp
          </span>
          <div className="flex items-center gap-4 mt-3 mb-3">
            <SurtiaMark size={56} />
            <h2 id="t-surtia" className="display text-5xl md:text-6xl leading-none">surt<span className="text-[#FF7A45]">i</span>a<sup className="text-[#16C79A] text-[0.35em] align-top ml-1">™</sup></h2>
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#c9f5e8] mb-3 leading-snug">¿Qué es Surtia™? Un asistente de ventas por WhatsApp para distribuidoras y comercios.</p>
          <p className="text-white/90 leading-relaxed mb-4 max-w-2xl">
            Responde a tus clientes con tu catálogo, tus precios y tu existencia reales, a cualquier hora. <b className="text-white">Así funciona:</b> el cliente escribe por WhatsApp,
            Surtia™ consulta el producto, el precio en bolívares con la tasa BCV del día y la existencia, arma el pedido y lo envía a tu panel listo para facturar.
            Si el cliente pide hablar con una persona, la conversación pasa al equipo.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 mb-4 text-sm">
            {['Atención 24/7 sin contratar más personal', 'Menos errores: usa el código y la existencia reales', 'Pedidos ordenados, listos para facturar', 'Panel web con pedidos, conversaciones y exportación a Excel'].map((x) => (
              <li key={x} className="flex items-start gap-2"><CheckCircle size={16} className="text-[#16C79A] flex-shrink-0 mt-0.5" /> {x}</li>
            ))}
          </ul>
          <p className="text-sm text-white/80 mb-5 max-w-2xl">
            Funciona con Profit Plus, en solo lectura: nunca modifica tu sistema. La conexión con tu sistema la hacemos nosotros: tú no instalas ni configuras nada.
            ¿Trabajas con Excel? También podemos cargar tu catálogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={demoHref} target="_blank" rel="noopener noreferrer" className="pill bg-[#16C79A] text-[#0B2530] hover:bg-[#3fd9ae] shadow-xl">
              <MessagesSquare size={20} /> Ver Surtia con mi catálogo
            </a>
            <button onClick={onCotizar} className="pill border border-white/40 text-white hover:bg-white/10">
              Cotizar para mi empresa <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 hidden sm:block reveal" style={{ '--d': '120ms' }}>
          <SurtiaChat />
        </div>
      </div>
    </div>
  </section>
);

// Contax® (antes «ERP») es un producto PRIVADO de Gigadevs: aquí solo se presenta. Sin enlaces a la plataforma, al repositorio
// ni a ninguna API; quien se interese pide la demo de 72 h, una demostración o una cotización.
const CONTAX_PLANES = [
  ['Contax Contable', 'Contabilidad VEN-NIF, ISLR, retenciones, libros fiscales, administración y auditoría.'],
  ['Cash', 'Facturación con número de control, notas de crédito y débito, cobros e inventario.'],
  ['Contax Administrativo', 'Cuentas por cobrar y pagar, bancos, órdenes de compra, libro de compras e inventario.'],
  ['All in One', 'Todo lo anterior en una sola licencia.'],
  ['Combo a tu medida', 'Elige solo los módulos que usas, con pago mensual o anual.'],
];
const CONTAX_NOVEDADES = [
  [FileSpreadsheet, 'Trae tus datos', 'Migra clientes, proveedores, inventario y saldos desde Galac, Profit Plus o Excel. Tú validas antes de cargar.'],
  [MessagesSquare, 'Vende por WhatsApp', 'Un bot atiende a tus clientes: catálogo y pedidos. Si te envían su orden de compra en PDF, la lee y te deja la factura lista.'],
  [BarChart3, 'Libros que cuadran', 'Ventas, compras, inventario y cuentas por cobrar y pagar contra la contabilidad, con un clic para contabilizar lo pendiente.'],
  [ShieldCheck, 'Pruébalo 72 horas', 'Demo gratis de Facturación e Inventario, sin tarjeta. Si te gusta, te cotizamos tu licencia en USDT o bolívares.'],
  [Receipt, 'Facturas de proveedores', 'Registra facturas y notas de tus proveedores con su cuenta contable, retenciones de IVA e ISLR y el comprobante por correo. Ves el asiento antes de contabilizar.'],
  [Users, 'Ficha de clientes y proveedores', 'Código, condición de pago, vendedor, cuenta contable y las retenciones que aplican a cada uno, según el Decreto 1.808.'],
  [ClipboardCheck, 'Reportes y consultas', 'Retenciones de IVA e ISLR en ventas, cuentas por cobrar por cliente o por vendedor con antigüedad, mayor analítico y estados financieros por mes.'],
  [PenLine, 'Asientos manuales', 'Apertura, conciliación, reclasificación, provisiones o depreciación, con número correlativo y reverso cuando haga falta.'],
];

export const ErpSection = ({ demoHref, onCotizar }) => (
  <section id="contax" className="py-10 md:py-14 bg-[#191919] text-white relative overflow-hidden" aria-labelledby="t-contax">
    <div className="absolute -top-44 -right-44 w-[260px] h-[260px] md:-top-40 md:-right-40 md:w-[420px] md:h-[420px] bg-[#87e64b] rounded-full opacity-90"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 reveal">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-[#c9f5a8]">
            Producto propio de Gigadevs · Antes «ERP» · Para empresas
          </span>
          <div className="flex items-center gap-4 mt-4 mb-3">
            <img src="/contax-icon.png" alt="" width={48} height={48} className="rounded-2xl shadow-lg" />
            <div>
              <h2 id="t-contax" className="display text-5xl md:text-7xl leading-none">Conta<span className="text-[#87e64b]">x</span><sup className="text-lg align-super">®</sup></h2>
              <p className="text-[#87e64b] font-semibold text-sm mt-1">Tu empresa en orden. Tu fisco al día.</p>
            </div>
          </div>
          <p className="text-xl md:text-3xl font-semibold text-white mb-3 leading-snug">Facturación, contabilidad, compras e inventario según la normativa venezolana. En la web y por WhatsApp.</p>
          <p className="text-gray-300 leading-relaxed mb-5 max-w-2xl">
            Facturas con el número de control de tu imprenta digital (Providencia SNAT/2024/000102 y, desde el 19 de abril de 2027, SNAT/2026/00093), en bolívares o divisas con la tasa BCV del día e IVA e IGTF calculados.
            Libros de compras y ventas que cuadran con la contabilidad VEN-NIF, órdenes de compra, cuentas por cobrar y pagar, auditoría financiera y un bot
            de WhatsApp que toma pedidos. Cada empresa trabaja aislada y segura, y paga solo por los módulos que usa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={demoHref} target="_blank" rel="noopener noreferrer" className="pill bg-[#87e64b] text-[#1a4200] hover:bg-[#7ad63f] shadow-xl">
              <MessagesSquare size={20} /> Probar gratis 72 horas
            </a>
            <a href="https://contax.gigadevscorp.com/" target="_blank" rel="noopener noreferrer" className="pill border border-white/40 text-white hover:bg-white/10">
              Conocer Contax <ArrowRight size={18} />
            </a>
            <button onClick={onCotizar} className="pill border border-white/20 text-gray-300 hover:bg-white/10">
              Cotizar para mi empresa
            </button>
          </div>
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mt-14 mb-5 reveal">Lo nuevo de Contax</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTAX_NOVEDADES.map(([Icono, t, d], i) => (
          <div key={t} className="reveal tile bg-white/5 border border-white/15 rounded-3xl p-6" style={{ '--d': `${i * 70}ms` }}>
            <Icono size={26} className="text-[#87e64b] mb-3" />
            <h4 className="font-bold mb-1.5 text-white">{t}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mt-14 mb-5 reveal">Planes</h3>
      <div className="rail md:grid-cols-2 lg:grid-cols-5">
        {CONTAX_PLANES.map(([t, d], i) => (
          <div key={t} className="reveal tile bg-white/5 border border-white/15 rounded-3xl p-6" style={{ '--d': `${i * 90}ms` }}>
            <h4 className="font-bold mb-1.5 text-white">{t}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">{d}</p>
            <button onClick={onCotizar} className="text-[#87e64b] font-bold text-sm hover:underline">Cotizar</button>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">Cada empresa es distinta: te cotizamos según los módulos, usuarios y empresas que necesites. Pago en USDT (Binance Pay) o en bolívares a la tasa BCV del día.</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 text-sm text-gray-200">
        {['Verificación en dos pasos obligatoria', 'Varias empresas y tu equipo, con roles', 'Bitácora inalterable de cada operación', 'Contax® es una marca registrada de Gigadevs Corp'].map((t) => (
          <li key={t} className="flex items-start gap-2"><CheckCircle size={18} className="text-[#87e64b] flex-shrink-0 mt-0.5" /> {t}</li>
        ))}
      </ul>
    </div>
  </section>
);
