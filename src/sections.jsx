import React from 'react';
import { CheckCircle, ArrowRight, LogIn, UserPlus, Smartphone, Wallet, HandCoins, CalendarCheck, PiggyBank, MessagesSquare, ClipboardList, Wrench, LifeBuoy, Store, Briefcase, Stethoscope, Rocket, ChevronDown, Building2, Landmark, ServerCog, Sparkles, FileSignature, Workflow, History, ShieldCheck, BarChart3, ClipboardCheck, PenLine } from 'lucide-react';

// Quincena VE es el producto propio de Gigadevs. Los enlaces llevan utm para que Quincena VE sepa cuántas cuentas llegan desde aquí.
export const QUINCENA_URL = 'https://control-financiero-wrm5.onrender.com';
export const quincenaLink = (path = '/', campaign = 'web') => `${QUINCENA_URL}${path}${path.includes('?') ? '&' : '?'}utm_source=gigadevs&utm_campaign=${campaign}`;

const QuincenaIcon = ({ size = 56 }) => (
  <img src="/quincena-icon.png" alt="" width={size} height={size} className="rounded-2xl shadow-lg" />
);

export const QuincenaSection = () => (
  <section id="quincena" className="py-12 md:py-16 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white relative overflow-hidden" aria-labelledby="t-quincena">
    <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-white/5 rounded-full"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-100">
            Producto propio de Gigadevs · Gratis
          </span>
          <div className="flex items-center gap-4 mt-4 mb-3">
            <QuincenaIcon size={48} />
            <h2 id="t-quincena" className="text-3xl md:text-4xl font-black">Quincena VE 🇻🇪</h2>
          </div>
          <p className="text-xl md:text-2xl font-bold text-emerald-100 mb-3 leading-snug">La app para controlar tu quincena en dólares y en bolívares.</p>
          <p className="text-emerald-50/90 leading-relaxed mb-5 max-w-2xl">
            App gratis de finanzas personales para quien cobra cada 15 días o cada semana: gastos en dólares o moneda local con la tasa del día,
            pagos, deudas y cuánto te queda hasta el próximo cobro. Web y Android, en Venezuela, Colombia, Chile, Perú, México y Argentina.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-emerald-50 mb-6">
            {[[Wallet, 'Dólares y moneda local con la tasa del día'], [CalendarCheck, 'Pagos fijos con avisos antes de vencer'], [HandCoins, 'Lleva la cuenta de quién te debe'], [PiggyBank, 'Plan para salir de deudas'], [Smartphone, 'Web y app para Android'], [CheckCircle, 'Sin publicidad: tus datos son solo tuyos']].map(([Icon, t]) => (
              <li key={t} className="flex items-start gap-2"><Icon size={17} className="text-emerald-200 flex-shrink-0 mt-0.5" /> {t}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={quincenaLink('/app', 'registro') + '#registro'} className="px-6 py-3.5 bg-white text-emerald-800 font-extrabold rounded-2xl shadow-xl hover:bg-emerald-50 transition flex items-center justify-center gap-2">
              <UserPlus size={20} /> Crear cuenta gratis
            </a>
            <a href={quincenaLink('/app', 'entrar')} className="px-6 py-3.5 bg-emerald-950/30 border border-white/40 text-white font-bold rounded-2xl hover:bg-emerald-950/50 transition flex items-center justify-center gap-2">
              <LogIn size={20} /> Entrar a Quincena VE
            </a>
            <a href={quincenaLink('/', 'conocer')} className="px-4 py-3 text-white font-bold rounded-2xl hover:underline flex items-center justify-center gap-2">
              Conocer más <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="hidden sm:block bg-white text-gray-900 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto" role="img" aria-label="Ejemplo de la pantalla de inicio de Quincena VE">
            <div className="text-sm font-semibold text-gray-500">Te queda esta quincena</div>
            <div className="text-4xl font-black my-2">$148,20</div>
            <div className="h-3 rounded-full bg-emerald-100 overflow-hidden mb-3"><div className="h-full w-[62%] bg-emerald-700"></div></div>
            {[['Alquiler', '$120,00'], ['Mercado', 'Bs. 3.400,00'], ['Carlos te debe · el 15', '$25,00']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>
            ))}
            <div className="text-xs text-gray-400 mt-1">Montos de ejemplo</div>
          </div>
          <details className="group bg-white/10 border border-white/15 rounded-2xl p-4 max-w-sm mx-auto">
            <summary className="flex justify-between items-center gap-3 font-bold cursor-pointer list-none text-sm">
              Cómo funciona y para quién es<ChevronDown size={18} className="transition-transform group-open:rotate-180 flex-shrink-0" />
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-emerald-50/90">
              <li><strong className="text-white">1. Crea tu cuenta y elige tu país.</strong> Usa tu moneda y su tipo de cambio oficial, que se actualiza solo. En Venezuela, la tasa BCV y, si quieres, la USDT.</li>
              <li><strong className="text-white">2. Anota tus gastos en segundos.</strong> En Android, compártelos desde el mensaje del banco o del pago móvil: el monto ya viene escrito.</li>
              <li><strong className="text-white">3. Mira cuánto te queda.</strong> Descuenta lo fijo y te avisa de los pagos que vienen.</li>
            </ol>
            <p className="mt-3 text-sm text-emerald-50/90">Para trabajadores con sueldo quincenal o semanal, familias que no quieren que se les pase un pago, y freelancers que cobran en dólares y gastan en bolívares o pesos.</p>
          </details>
        </div>
      </div>
    </div>
  </section>
);

// Para quién y cómo trabajamos van en una sola sección para acortar la página.
export const ComoTrabajamos = ({ onCotizar }) => (
  <section id="como-trabajamos" className="py-12 md:py-16 bg-white border-t border-gray-100" aria-labelledby="t-como">
    <div className="container mx-auto px-4">
      <div id="para-quien" className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-yellow-600 font-bold text-xs tracking-wider uppercase bg-yellow-50 px-3 py-1 rounded-full">Para quién y cómo trabajamos</span>
        <h2 id="t-como" className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-3 mb-3">Software a la medida, de la idea al sistema funcionando</h2>
        <p className="text-gray-600">Para negocios de Venezuela y Latinoamérica, con precio cerrado en dólares o en bolívares a tasa BCV y soporte después de la entrega.</p>
      </div>
      <div className="rail md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          [Store, 'Comercios y tiendas', 'Facturación, inventario multialmacén y ventas en dólares y bolívares con la tasa del día.'],
          [Briefcase, 'Pymes y empresas', 'ERP contable, control de roles y permisos, auditoría y respaldos en la nube.'],
          [Stethoscope, 'Clínicas y profesionales', 'Agendas de citas, historias y sistemas con privacidad para los datos de tus clientes.'],
          [Rocket, 'Emprendedores', 'Tu página web, tienda en línea o app móvil para empezar a vender con una imagen profesional.'],
        ].map(([Icon, t, d]) => (
          <div key={t} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
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
          <li key={t} className="flex gap-3 items-start bg-blue-950 text-white rounded-2xl p-4">
            <span className="w-9 h-9 bg-yellow-500 text-blue-950 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={18} /></span>
            <div><div className="font-bold text-sm">{i + 1}. {t}</div><p className="text-blue-200 text-xs leading-relaxed">{d}</p></div>
          </li>
        ))}
      </ol>
      <div className="text-center mt-6">
        <button onClick={onCotizar} className="px-7 py-3.5 bg-yellow-500 text-blue-950 font-extrabold rounded-2xl shadow-lg hover:bg-yellow-400 transition inline-flex items-center gap-2">
          Empezar mi proyecto <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
);

export const FAQS = [
  ['¿Qué hace Gigadevs?', 'Desarrollamos software a la medida: sistemas administrativos y contables, páginas web y tiendas en línea, apps móviles para Android y iOS, y soluciones de seguridad para redes y equipos. También creamos productos propios como Quincena VE y SICAS.'],
  ['¿Cómo puedo pagar?', 'En dólares o en bolívares a la tasa BCV del día, por pago móvil, transferencia bancaria, Binance Pay o PayPal. Al elegir un plan generas tu planilla de pago y la envías por WhatsApp.'],
  ['¿Cuánto tarda un proyecto?', 'Depende del alcance. En la propuesta te damos las fechas de entrega antes de empezar, y te mostramos avances durante el desarrollo.'],
  ['¿El sistema queda siendo mío?', 'Con las licencias vitalicias pagas una sola vez y el sistema es tuyo para siempre, con un año de soporte incluido. Con la suscripción pagas mes a mes o una vez al año.'],
  ['¿Trabajan con negocios fuera de Venezuela?', 'Sí. Trabajamos a distancia con clientes de Venezuela y otros países de Latinoamérica.'],
  ['¿Qué es Quincena VE?', 'Es nuestra app gratis de finanzas personales para quien cobra por quincena o por semana: registra gastos en dólares y moneda local con la tasa del día, controla pagos y deudas, y muestra cuánto te queda hasta el próximo cobro. Funciona en la web y en Android.'],
  ['¿Qué es SICAS?', 'Es nuestro Sistema Integral de Control y Auditoría para contralorías y unidades de auditoría interna: gestiona auditorías administrativas, financieras y de sistemas, redacta los hallazgos con su propio motor de reglas y lleva el informe final por la aprobación del Jefe, el Gerente y el Contralor hasta la firma electrónica. Se instala en la infraestructura de tu organización; escríbenos para una demostración.'],
  ['¿Cómo entro a mi cuenta de Quincena VE?', 'Desde el botón "Entrar a Quincena VE" de esta página o directamente en la app de Android. Si aún no tienes cuenta, puedes crearla gratis.'],
];

export const Faq = () => (
  <section id="preguntas" className="py-12 md:py-16 bg-white border-t border-gray-100" aria-labelledby="t-faq">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-6">
        <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Preguntas frecuentes</span>
        <h2 id="t-faq" className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-3">Lo que más nos preguntan</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {FAQS.map(([q, a]) => (
          <details key={q} className="group bg-gray-50 border border-gray-200 rounded-2xl p-4">
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
  <section id="sicas" className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden" aria-labelledby="t-sicas">
    <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-100">
            Producto propio de Gigadevs · Para contralorías y auditoría interna
          </span>
          <div className="flex items-center gap-4 mt-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg"><ClipboardCheck size={26} /></div>
            <div>
              <h2 id="t-sicas" className="text-3xl md:text-4xl font-black leading-none">SICAS</h2>
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
            <a href={demoHref} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 bg-white text-indigo-900 font-extrabold rounded-2xl shadow-xl hover:bg-indigo-50 transition flex items-center justify-center gap-2">
              <MessagesSquare size={20} /> Solicitar una demostración
            </a>
            <button onClick={onCotizar} className="px-6 py-3.5 bg-indigo-950/40 border border-white/40 text-white font-bold rounded-2xl hover:bg-indigo-950/60 transition flex items-center justify-center gap-2">
              Cotizar para mi organización <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 hidden sm:block">
          <div className="bg-white text-gray-900 rounded-3xl p-5 shadow-2xl max-w-md mx-auto" role="img" aria-label="Ejemplo de una auditoría financiera en SICAS">
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
        {SICAS_TYPES.map(([Icon, t, d]) => (
          <div key={t} className="bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="font-bold mb-1.5 flex items-center gap-2"><span className="w-9 h-9 rounded-xl bg-white text-indigo-900 flex items-center justify-center flex-shrink-0"><Icon size={19} /></span>{t}</h3>
            <p className="text-indigo-50/85 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <div className="rail md:grid-cols-2 lg:grid-cols-3 mt-4">
        {SICAS_FEATURES.map(([Icon, t, d]) => (
          <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3">
            <Icon size={20} className="text-indigo-300 flex-shrink-0 mt-0.5" />
            <div><h3 className="font-bold text-sm mb-1">{t}</h3><p className="text-indigo-50/80 text-xs leading-relaxed">{d}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
