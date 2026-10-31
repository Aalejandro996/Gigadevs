import React, { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, LogIn, UserPlus, Smartphone, Wallet, HandCoins, CalendarCheck, PiggyBank, MessagesSquare, ClipboardList, Wrench, LifeBuoy, Store, Briefcase, Stethoscope, Rocket, ChevronDown, Building2, Landmark, ServerCog, Sparkles, FileSignature, Workflow, History, ShieldCheck, BarChart3, ClipboardCheck, PenLine, Receipt, Package, FileSpreadsheet, Users } from 'lucide-react';

// Quincena VE es el producto propio de Gigadevs. Los enlaces llevan utm para que Quincena VE sepa cuántas cuentas llegan desde aquí.
export const QUINCENA_URL = 'https://control-financiero-wrm5.onrender.com';
export const quincenaLink = (path = '/', campaign = 'web') => `${QUINCENA_URL}${path}${path.includes('?') ? '&' : '?'}utm_source=gigadevs&utm_campaign=${campaign}`;

const QuincenaIcon = ({ size = 56 }) => (
  <img src="/quincena-icon.png" alt="" width={size} height={size} className="rounded-2xl shadow-lg" />
);

// Mosaico de productos al estilo de la portada de apple.com: cada producto con sus colores.
const Tile = ({ className = '', eyebrow, title, sub, children, links, d = 0, dark = true }) => (
  <article className={`reveal tile relative overflow-hidden rounded-[2rem] text-center flex flex-col items-center pt-12 md:pt-14 px-6 min-h-[540px] md:min-h-[600px] ${className}`} style={{ '--d': `${d}ms` }}>
    {eyebrow}
    <h3 className="display text-4xl md:text-5xl mt-2">{title}</h3>
    <p className={`text-lg md:text-xl mt-3 max-w-md ${dark ? 'opacity-90' : 'opacity-80'}`}>{sub}</p>
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5 text-base md:text-lg">{links}</div>
    <div className="art mt-auto w-full max-w-sm pt-8">{children}</div>
  </article>
);

export const ProductTiles = ({ erpDemo, sicasDemo, go }) => (
  <section id="productos" className="bg-white p-3 md:p-4" aria-label="Nuestros productos">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
      <Tile className="bg-gradient-to-b from-emerald-700 to-emerald-900 text-white" d={0}
        eyebrow={<img src="/quincena-icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" />}
        title="Quincena VE" sub="Tu quincena, en dólares y en bolívares. Gratis."
        links={<><a href={quincenaLink('/app', 'tile') + '#registro'} className="chev text-white">Crear cuenta gratis</a><a href="#quincena" onClick={(e) => { e.preventDefault(); go('quincena'); }} className="chev text-emerald-200">Más información</a></>}>
        <div className="bg-white text-gray-900 rounded-t-[2rem] p-6 text-left shadow-2xl">
          <div className="text-sm font-semibold text-gray-500">Te queda esta quincena</div>
          <div className="text-4xl font-black my-1 text-emerald-800">$148,20</div>
          <div className="h-2.5 rounded-full bg-emerald-100 overflow-hidden mb-2"><div className="h-full w-[62%] bg-emerald-700"></div></div>
          {[['Alquiler', '$120,00'], ['Carlos te debe · el 15', '$25,00']].map(([k, v]) => <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>)}
        </div>
      </Tile>

      <Tile className="bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-950" dark={false} d={90}
        eyebrow={<span className="text-xs font-bold uppercase tracking-widest bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full">Nuevo</span>}
        title="Quincena VE para tu negocio" sub="Ventas, fiado y caja en $ y en Bs. Gratis."
        links={<><a href={quincenaLink('/app', 'tile-negocio') + '#negocio'} className="chev text-emerald-800">Crear la cuenta del negocio</a><a href="#quincena-negocio" onClick={(e) => { e.preventDefault(); go('quincena-negocio'); }} className="chev text-emerald-700">Más información</a></>}>
        <div className="bg-white text-gray-900 rounded-t-[2rem] p-6 text-left shadow-2xl border border-emerald-200">
          <div className="flex justify-between items-center"><span className="text-sm font-semibold text-gray-500">Vendiste hoy</span><span className="text-xs font-bold bg-emerald-700 text-white px-2 py-0.5 rounded-full">Hoy</span></div>
          <div className="text-4xl font-black my-1 text-emerald-800">$128,50</div>
          {[['Pago móvil', '$65,00', ''], ['Fiado · María', '$12,00', 'text-orange-600']].map(([k, v, c]) => <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong className={c}>{v}</strong></div>)}
        </div>
      </Tile>

      <Tile className="bg-[#191919] text-white" d={0}
        eyebrow={<img src="/contax-icon.png" alt="" width={56} height={56} className="rounded-2xl shadow-lg" />}
        title="Contax" sub={<>Tu empresa en orden. <span className="text-[#87e64b]">Tu fisco al día.</span></>}
        links={<><a href={erpDemo} target="_blank" rel="noopener noreferrer" className="chev text-[#87e64b]">Probar gratis 72 h</a><a href="https://erp-web-jaby.onrender.com/" target="_blank" rel="noopener noreferrer" className="chev text-white">Conocer Contax</a></>}>
        <div className="bg-white text-gray-900 rounded-t-[2rem] p-6 text-left shadow-2xl">
          <div className="flex justify-between items-start gap-2"><span className="text-sm font-semibold text-gray-500">Factura A00000128</span><span className="text-[10px] font-bold border-2 border-gray-900 rounded-md px-1.5">Control 00-00000128</span></div>
          <div className="text-3xl font-black my-2">Bs. 4.234,00</div>
          {[['IVA 16 %', 'Bs. 584,00'], ['IGTF 3 % (divisas)', 'Bs. 109,50']].map(([k, v]) => <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>)}
        </div>
      </Tile>

      <Tile className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white" d={90}
        eyebrow={<div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg"><ClipboardCheck size={30} /></div>}
        title="SICAS" sub="Control y auditoría, de la planificación al informe firmado."
        links={<><a href={sicasDemo} target="_blank" rel="noopener noreferrer" className="chev text-indigo-200">Pedir una demostración</a><a href="#sicas" onClick={(e) => { e.preventDefault(); go('sicas'); }} className="chev text-white">Más información</a></>}>
        <div className="bg-white text-gray-900 rounded-t-[2rem] p-6 text-left shadow-2xl">
          <div className="font-bold text-indigo-950 text-sm">Auditoría financiera · Cuentas por pagar</div>
          {[['ALTO', 'Pagos sin orden aprobada', 'bg-red-100 text-red-700'], ['MEDIO', 'Auxiliar no conciliado', 'bg-amber-100 text-amber-800']].map(([r, x, c]) => <div key={x} className="flex items-center gap-3 py-2 border-t border-gray-100 mt-1"><span className={`text-[10px] font-black px-2 py-1 rounded-md ${c}`}>{r}</span><span className="text-sm">{x}</span></div>)}
          <div className="flex justify-between text-[11px] font-semibold mt-2 pt-2 border-t border-gray-100">{['Auditor', 'Jefe', 'Gerente'].map((n) => <span key={n} className="text-emerald-700 flex items-center gap-1"><CheckCircle size={13} />{n}</span>)}<span className="text-gray-400 flex items-center gap-1"><PenLine size={13} />Contralor</span></div>
        </div>
      </Tile>
    </div>
  </section>
);

// Frase grande que se ilumina palabra por palabra mientras se baja (como en las páginas de producto de Apple).
const STATEMENT = 'Hacemos software seguro, hecho en Venezuela, para que tu negocio venda más, cobre a tiempo y cumpla con el fisco.';
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
    <section className="bg-white py-24 md:py-40" aria-label="Lo que hacemos">
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
  <section id="quincena" className="py-20 md:py-28 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white relative overflow-hidden" aria-labelledby="t-quincena">
    <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-white/5 rounded-full"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center max-w-4xl mx-auto mb-14 reveal">
        <QuincenaIcon size={72} />
        <p className="eyebrow text-emerald-200 mt-5 mb-3">Producto propio de Gigadevs · Gratis · Web y Android</p>
        <h2 id="t-quincena" className="display text-5xl md:text-7xl">Quincena VE 🇻🇪</h2>
        <p className="text-xl md:text-3xl font-semibold text-emerald-100 mt-4 leading-snug">Para tu quincena. Y ahora, para tu negocio.</p>
      </div>

      {/* Personal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 reveal">
          <p className="eyebrow text-emerald-200 mb-2">Personal</p>
          <h3 className="display text-3xl md:text-5xl mb-4">Controla tu quincena, en dólares y en bolívares.</h3>
          <p className="text-emerald-50/90 text-lg leading-relaxed mb-6 max-w-2xl">
            Para quien cobra cada 15 días o cada semana: gastos en dólares o moneda local con la tasa del día, pagos, deudas y cuánto te queda
            hasta el próximo cobro. En Venezuela, Colombia, Chile, Perú, México y Argentina.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-emerald-50 mb-7">
            {[[Wallet, 'Dólares y moneda local con la tasa del día'], [CalendarCheck, 'Pagos fijos con avisos antes de vencer'], [HandCoins, 'Lleva la cuenta de quién te debe'], [PiggyBank, 'Plan para salir de deudas'], [Smartphone, 'Web y app para Android'], [CheckCircle, 'Sin publicidad: tus datos son solo tuyos']].map(([Icon, x]) => (
              <li key={x} className="flex items-start gap-2"><Icon size={18} className="text-emerald-200 flex-shrink-0 mt-0.5" /> {x}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <a href={quincenaLink('/app', 'registro') + '#registro'} className="pill bg-white text-emerald-800 hover:bg-emerald-50 shadow-xl"><UserPlus size={20} /> Crear cuenta gratis</a>
            <a href={quincenaLink('/app', 'entrar')} className="pill border border-white/50 text-white hover:bg-white/10"><LogIn size={20} /> Entrar a Quincena VE</a>
            <a href={quincenaLink('/', 'conocer')} className="chev text-white px-2">Conocer más</a>
          </div>
        </div>
        <div className="lg:col-span-5 reveal" style={{ '--d': '120ms' }}>
          <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-2xl max-w-sm mx-auto" role="img" aria-label="Ejemplo de la pantalla de inicio de Quincena VE">
            <div className="text-sm font-semibold text-gray-500">Te queda esta quincena</div>
            <div className="text-5xl font-black my-2">$148,20</div>
            <div className="h-3 rounded-full bg-emerald-100 overflow-hidden mb-3"><div className="h-full w-[62%] bg-emerald-700"></div></div>
            {[['Alquiler', '$120,00'], ['Mercado', 'Bs. 3.400,00'], ['Carlos te debe · el 15', '$25,00']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>
            ))}
            <div className="text-xs text-gray-400 mt-1">Montos de ejemplo</div>
          </div>
        </div>
      </div>

      {/* Negocio */}
      <div id="quincena-negocio" className="mt-20 md:mt-28 bg-white text-emerald-950 rounded-[2.5rem] p-6 md:p-12 shadow-2xl scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            <span className="text-xs font-bold uppercase tracking-widest bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full">Nuevo · Ya disponible</span>
            <h3 className="display text-3xl md:text-5xl mt-4 mb-4">Quincena VE para tu negocio.</h3>
            <p className="text-lg text-emerald-900/80 leading-relaxed mb-6">
              Ventas, fiado y caja en $ y en Bs. Para bodegas, comida, belleza, venta por Instagram y cualquier emprendimiento que cobra por pago móvil,
              en efectivo o en dólares. Va aparte de tu quincena personal, en la misma cuenta. <strong>Gratis.</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {NEGOCIO.map(([Icon, x, dd], i) => (
                <div key={x} className="reveal bg-emerald-50 rounded-2xl p-4" style={{ '--d': `${i * 90}ms` }}>
                  <Icon size={22} className="text-emerald-700 mb-2" />
                  <div className="font-bold mb-1">{x}</div>
                  <p className="text-sm text-emerald-900/75 leading-relaxed">{dd}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-900 text-white rounded-2xl p-5 mb-6">
              <div className="font-bold text-yellow-300 mb-2">¿Necesitas más? Negocio Plus</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-emerald-50">
                {NEGOCIO_PLUS.map(([Icon, x]) => <li key={x} className="flex items-center gap-2"><Icon size={16} className="text-emerald-300" /> {x}</li>)}
              </ul>
              <p className="text-xs text-emerald-200 mt-3">Plan de pago: se pide por WhatsApp.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <a href={quincenaLink('/app', 'negocio') + '#negocio'} className="pill bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg"><Store size={20} /> Crear la cuenta de mi negocio</a>
              <span className="text-sm text-emerald-900/70">¿Ya usas la app? Actívalo en <strong>Más › Mi negocio</strong>.</span>
            </div>
            <p className="text-xs text-emerald-900/60 mt-4">Quincena VE lleva tus cuentas; no emite facturas fiscales. Para facturar según el SENIAT, mira Contax.</p>
          </div>
          <div className="lg:col-span-5 reveal" style={{ '--d': '120ms' }}>
            <div className="bg-[#F3F6F2] border-[12px] border-emerald-950 rounded-[2.75rem] p-6 shadow-2xl max-w-xs mx-auto" role="img" aria-label="Ejemplo de Quincena VE para tu negocio">
              <div className="flex justify-between items-center text-emerald-800 font-bold text-sm"><span>Mi negocio</span><span className="bg-emerald-700 text-white text-xs px-2 py-0.5 rounded-full">Hoy</span></div>
              <div className="text-sm text-gray-500 mt-4">Vendiste hoy</div>
              <div className="text-5xl font-black text-emerald-800">$128,50</div>
              <div className="text-xs text-gray-500 mb-3">con la tasa BCV del día</div>
              {[['Pago móvil', '$65,00', ''], ['Efectivo $', '$40,00', ''], ['Fiado · María', '$12,00', 'text-orange-600']].map(([k, v, c]) => (
                <div key={k} className="flex justify-between bg-white rounded-xl px-3 py-2.5 mt-2 text-sm"><span>{k}</span><strong className={c}>{v}</strong></div>
              ))}
              <div className="bg-emerald-700 text-white text-center font-bold rounded-xl py-2.5 mt-3 text-sm">+ Registrar venta</div>
              <div className="text-[10px] text-gray-400 text-center mt-2">Montos de ejemplo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Para quién y cómo trabajamos van en una sola sección para acortar la página.
export const ComoTrabajamos = ({ onCotizar }) => (
  <section id="como-trabajamos" className="py-20 md:py-28 bg-white border-t border-gray-100" aria-labelledby="t-como">
    <div className="container mx-auto px-4">
      <div id="para-quien" className="text-center max-w-3xl mx-auto mb-12 reveal">
        <p className="eyebrow text-yellow-600 mb-3">Para quién y cómo trabajamos</p>
        <h2 id="t-como" className="display text-4xl md:text-6xl text-blue-950 mb-4">De la idea al sistema funcionando.</h2>
        <p className="text-gray-600">Para negocios de Venezuela y Latinoamérica, con precio cerrado en dólares o en bolívares a tasa BCV y soporte después de la entrega.</p>
      </div>
      <div className="rail md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          [Store, 'Comercios y tiendas', 'Facturación, inventario multialmacén y ventas en dólares y bolívares con la tasa del día.'],
          [Briefcase, 'Pymes y empresas', 'Contax: facturación, contabilidad y compras, con roles, auditoría y respaldos en la nube.'],
          [Stethoscope, 'Clínicas y profesionales', 'Agendas de citas, historias y sistemas con privacidad para los datos de tus clientes.'],
          [Rocket, 'Emprendedores', 'Tu página web, tienda en línea o app móvil para empezar a vender con una imagen profesional.'],
        ].map(([Icon, t, d], i) => (
          <div key={t} className="reveal tile bg-gray-50 rounded-3xl p-6" style={{ '--d': `${i * 90}ms` }}>
            <h3 className="font-bold text-blue-950 mb-1.5 flex items-center gap-2"><span className="w-9 h-9 bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={19} /></span>{t}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          [MessagesSquare, 'Conversamos', 'Nos cuentas por WhatsApp o correo qué necesita tu negocio.'],
          [ClipboardList, 'Propuesta y precio', 'Alcance, tiempos y precio; generas tu planilla con la tasa BCV del día.'],
          [Wrench, 'Desarrollo', 'Con buenas prácticas de seguridad y avances para que opines antes de la entrega.'],
          [LifeBuoy, 'Entrega y soporte', 'Lo publicamos, te enseñamos a usarlo y te acompañamos con soporte.'],
        ].map(([Icon, t, d], i) => (
          <li key={t} className="reveal flex gap-3 items-start bg-blue-950 text-white rounded-3xl p-5" style={{ '--d': `${i * 90}ms` }}>
            <span className="w-9 h-9 bg-yellow-500 text-blue-950 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={18} /></span>
            <div><div className="font-bold text-sm">{i + 1}. {t}</div><p className="text-blue-200 text-xs leading-relaxed">{d}</p></div>
          </li>
        ))}
      </ol>
      <div className="text-center mt-6">
        <button onClick={onCotizar} className="pill bg-yellow-500 text-blue-950 hover:bg-yellow-400 shadow-lg px-8">
          Empezar mi proyecto <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
);

export const FAQS = [
  ['¿Qué hace Gigadevs?', 'Desarrollamos software a la medida: sistemas administrativos y contables, páginas web y tiendas en línea, apps móviles para Android y iOS, y soluciones de seguridad para redes y equipos. También creamos productos propios: Quincena VE (personal y para tu negocio), Contax y SICAS.'],
  ['¿Cómo puedo pagar?', 'En dólares o en bolívares a la tasa BCV del día, por pago móvil, transferencia bancaria, Binance Pay o PayPal. Al elegir un plan generas tu planilla de pago y la envías por WhatsApp.'],
  ['¿Cuánto tarda un proyecto?', 'Depende del alcance. En la propuesta te damos las fechas de entrega antes de empezar, y te mostramos avances durante el desarrollo.'],
  ['¿El sistema queda siendo mío?', 'Con las licencias vitalicias pagas una sola vez y el sistema es tuyo para siempre, con un año de soporte incluido. Con la suscripción pagas mes a mes o una vez al año.'],
  ['¿Trabajan con negocios fuera de Venezuela?', 'Sí. Trabajamos a distancia con clientes de Venezuela y otros países de Latinoamérica.'],
  ['¿Qué es Quincena VE?', 'Es nuestra app gratis de finanzas personales para quien cobra por quincena o por semana: registra gastos en dólares y moneda local con la tasa del día, controla pagos y deudas, y muestra cuánto te queda hasta el próximo cobro. Funciona en la web y en Android.'],
  ['¿Quincena VE sirve para mi negocio?', 'Sí. Con Quincena VE para tu negocio, gratis, anotas ventas en bolívares y dólares con la tasa del día, el fiado de tus clientes, los gastos del negocio y el cierre de caja, aparte de tu quincena personal. Negocio Plus (inventario, recibos, Excel para el contador y vendedores) es un plan de pago. Quincena VE no emite facturas fiscales.'],
  ['¿Qué es Contax?', 'Contax® (antes «ERP») es nuestra plataforma web de gestión empresarial: facturación según la Providencia SNAT/2011/00071 en bolívares o divisas con la tasa BCV, contabilidad VEN-NIF, libros de compras y ventas que cuadran con la contabilidad, órdenes de compra, inventario, cuentas por cobrar y pagar, y un bot de WhatsApp que toma pedidos y lee órdenes de compra en PDF. Migra tus datos desde Galac, Profit Plus o Excel. Planes Contax Contable, Cash, Contax Administrativo, All in One o un combo a tu medida, mensual o anual; pruébalo gratis 72 horas.'],
  ['¿Qué es SICAS?', 'Es nuestro Sistema Integral de Control y Auditoría para contralorías y unidades de auditoría interna: gestiona auditorías administrativas, financieras y de sistemas, redacta los hallazgos con su propio motor de reglas y lleva el informe final por la aprobación del Jefe, el Gerente y el Contralor hasta la firma electrónica. Se instala en la infraestructura de tu organización; escríbenos para una demostración.'],
  ['¿Cómo entro a mi cuenta de Quincena VE?', 'Desde el botón "Entrar a Quincena VE" de esta página o directamente en la app de Android. Si aún no tienes cuenta, puedes crearla gratis.'],
];

export const Faq = () => (
  <section id="preguntas" className="py-20 md:py-28 bg-white border-t border-gray-100" aria-labelledby="t-faq">
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

// SICAS es un producto propio de Gigadevs para contralorías y auditoría interna. Se instala en la
// infraestructura de cada organización: esta página solo lo presenta y no enlaza a ninguna instalación.
const SICAS_TYPES = [
  [Building2, 'Auditoría administrativa', 'Unidades administrativas y procesos: normas y procedimientos, gobierno de la unidad, gestión documental, gastos y control interno.'],
  [Landmark, 'Auditoría financiera', 'Cuentas por pagar y por cobrar: soportes, aprobaciones, conciliaciones con el mayor, antigüedad de saldos, retenciones y cobranza.'],
  [ServerCog, 'Auditoría de sistemas', 'Cuestionarios de TI por dominio (accesos, respaldos, cambios, redes, ciberseguridad) en cuatro fases, con criterios de ISO/IEC 27001, COBIT 2019 y CIS Controls.'],
];

const SICAS_FEATURES = [
  [Sparkles, 'Hallazgos redactados por su propio motor de reglas', 'Condición, criterio, causa, efecto y recomendación a partir de las cédulas. Sin IA externa: la información no sale del servidor.'],
  [FileSignature, 'Informe final con firma electrónica', 'PDF de hasta 15 páginas con codificación institucional, aprobado por etapas y firmado con certificado digital y firma escaneada.'],
  [Workflow, 'Flujo Auditor → Jefe → Gerente → Contralor', 'Los revisores devuelven con puntos a corregir y cada decisión queda registrada. Suplencias temporales cuando alguien no está.'],
  [History, 'Trazabilidad completa', 'Bitácora de solo inserción con usuario, fecha y motivo de cada cambio, historial de calificaciones por fase y revisiones del informe.'],
  [ShieldCheck, 'Seguridad de nivel corporativo', 'Doble factor (MFA), segregación de funciones, doble control en lo crítico, cifrado AES-256 y bloqueo fuera del horario laboral.'],
  [BarChart3, 'Tablero para el Contralor', 'Duración de auditorías, cuellos de botella por fase y carga de cada auditor, medidos en días y horas hábiles con los feriados nacionales.'],
];

export const SicasSection = ({ demoHref, onCotizar }) => (
  <section id="sicas" className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden" aria-labelledby="t-sicas">
    <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 reveal">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-100">
            Producto propio de Gigadevs · Para contralorías y auditoría interna
          </span>
          <div className="flex items-center gap-4 mt-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg"><ClipboardCheck size={26} /></div>
            <div>
              <h2 id="t-sicas" className="display text-5xl md:text-7xl leading-none">SICAS</h2>
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
          <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-2xl max-w-md mx-auto" role="img" aria-label="Ejemplo de una auditoría financiera en SICAS">
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

      <div className="rail md:grid-cols-3 mt-8">
        {SICAS_TYPES.map(([Icon, t, d], i) => (
          <div key={t} className="reveal tile bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-sm" style={{ '--d': `${i * 90}ms` }}>
            <h3 className="font-bold mb-1.5 flex items-center gap-2"><span className="w-9 h-9 rounded-xl bg-white text-indigo-900 flex items-center justify-center flex-shrink-0"><Icon size={19} /></span>{t}</h3>
            <p className="text-indigo-50/85 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <div className="rail md:grid-cols-2 lg:grid-cols-3 mt-4">
        {SICAS_FEATURES.map(([Icon, t, d], i) => (
          <div key={t} className="reveal bg-white/5 border border-white/10 rounded-3xl p-5 flex gap-3" style={{ '--d': `${(i % 3) * 90}ms` }}>
            <Icon size={20} className="text-indigo-300 flex-shrink-0 mt-0.5" />
            <div><h3 className="font-bold text-sm mb-1">{t}</h3><p className="text-indigo-50/80 text-xs leading-relaxed">{d}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Contax® (antes «ERP») es un producto PRIVADO de Gigadevs: aquí solo se presenta. Sin enlaces a la plataforma, al repositorio
// ni a ninguna API; quien se interese pide la demo de 72 h, una demostración o una cotización.
const CONTAX_PLANES = [
  ['Contax Contable', 'Contabilidad VEN-NIF, ISLR, retenciones, libros fiscales, administración y auditoría.', 'desde $45/mes'],
  ['Cash', 'Facturación con número de control, notas de crédito y débito, cobros e inventario.', 'desde $25/mes'],
  ['Contax Administrativo', 'Cuentas por cobrar y pagar, bancos, órdenes de compra, libro de compras e inventario.', 'desde $23/mes'],
  ['All in One', 'Todo lo anterior en una sola licencia.', 'desde $69/mes'],
  ['Combo a tu medida', 'Elige solo los módulos que usas, con pago mensual o anual (el anual te regala 2 meses).', 'según lo que incluya'],
];
const CONTAX_NOVEDADES = [
  [Sparkles, 'Arranca guiado', 'Un tutorial te lleva paso a paso: tu empresa con su logo, los módulos que vas a usar y tus órdenes de compra.'],
  [FileSpreadsheet, 'Trae tus datos', 'Migra clientes, proveedores, inventario y saldos desde Galac, Profit Plus o Excel. Tú validas antes de cargar.'],
  [MessagesSquare, 'Vende por WhatsApp', 'Un bot atiende a tus clientes: catálogo y pedidos. Si te envían su orden de compra en PDF, la lee y te deja la factura lista.'],
  [Package, 'Compras en orden', 'Órdenes de compra con tu logo y tus datos, enviadas por correo o WhatsApp; tu proveedor las confirma desde el chat.'],
  [BarChart3, 'Libros que cuadran', 'Ventas, compras, inventario y cuentas por cobrar y pagar contra la contabilidad, con un clic para contabilizar lo pendiente.'],
  [ShieldCheck, 'Pruébalo 72 horas', 'Demo gratis de Facturación e Inventario, sin tarjeta. Si te gusta, compras tu licencia en USDT o bolívares.'],
];

export const ErpSection = ({ demoHref, onCotizar }) => (
  <section id="contax" className="py-20 md:py-28 bg-[#191919] text-white relative overflow-hidden" aria-labelledby="t-contax">
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
            Facturas con número de control según la Providencia SNAT/2011/00071, en bolívares o divisas con la tasa BCV del día e IVA e IGTF calculados.
            Libros de compras y ventas que cuadran con la contabilidad VEN-NIF, órdenes de compra, cuentas por cobrar y pagar, auditoría financiera y un bot
            de WhatsApp que toma pedidos. Cada empresa trabaja aislada y segura, y paga solo por los módulos que usa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={demoHref} target="_blank" rel="noopener noreferrer" className="pill bg-[#87e64b] text-[#1a4200] hover:bg-[#7ad63f] shadow-xl">
              <MessagesSquare size={20} /> Probar gratis 72 horas
            </a>
            <a href="https://erp-web-jaby.onrender.com/" target="_blank" rel="noopener noreferrer" className="pill border border-white/40 text-white hover:bg-white/10">
              Conocer Contax <ArrowRight size={18} />
            </a>
            <button onClick={onCotizar} className="pill border border-white/20 text-gray-300 hover:bg-white/10">
              Cotizar para mi empresa
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 hidden sm:block reveal" style={{ '--d': '120ms' }}>
          <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-2xl max-w-sm mx-auto" role="img" aria-label="Ejemplo de factura emitida en Contax">
            <div className="flex justify-between items-start gap-2">
              <div className="text-sm font-semibold text-gray-500">Factura A00000128</div>
              <div className="text-xs font-bold border-2 border-gray-900 rounded-lg px-2 py-0.5">Control 00-00000128</div>
            </div>
            <div className="text-4xl font-black my-3">Bs. 4.234,00</div>
            {[['Base imponible 16 %', 'Bs. 3.650,00'], ['IVA 16 %', 'Bs. 584,00'], ['Equivalente', '116,00 USD'], ['IGTF 3 % (pago en divisas)', 'Bs. 109,50']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>
            ))}
            <div className="text-xs text-gray-400 mt-2">Montos de ejemplo · tasa BCV 36,50</div>
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
        {CONTAX_PLANES.map(([t, d, precio], i) => (
          <div key={t} className="reveal tile bg-white/5 border border-white/15 rounded-3xl p-6" style={{ '--d': `${i * 90}ms` }}>
            <h4 className="font-bold mb-1.5 text-white">{t}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">{d}</p>
            <p className="text-[#87e64b] font-bold text-sm">{precio}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">Precios de referencia en USD; pago en USDT (Binance Pay) o en bolívares a la tasa BCV del día. Plan anual = 10 meses.</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 text-sm text-gray-200">
        {['Verificación en dos pasos obligatoria', 'Varias empresas y tu equipo, con roles', 'Bitácora inalterable de cada operación', 'Contax® es una marca registrada de Gigadevs Corp'].map((t) => (
          <li key={t} className="flex items-start gap-2"><CheckCircle size={18} className="text-[#87e64b] flex-shrink-0 mt-0.5" /> {t}</li>
        ))}
      </ul>
    </div>
  </section>
);
