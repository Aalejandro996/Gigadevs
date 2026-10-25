import React from 'react';
import { CheckCircle, ArrowRight, LogIn, UserPlus, Smartphone, Wallet, HandCoins, CalendarCheck, PiggyBank, MessagesSquare, ClipboardList, Wrench, LifeBuoy, Store, Briefcase, Stethoscope, Rocket, ChevronDown } from 'lucide-react';

// Quincena es el producto propio de Gigadevs. Los enlaces llevan utm para que Quincena sepa cuántas cuentas llegan desde aquí.
export const QUINCENA_URL = 'https://control-financiero-wrm5.onrender.com';
export const quincenaLink = (path = '/', campaign = 'web') => `${QUINCENA_URL}${path}${path.includes('?') ? '&' : '?'}utm_source=gigadevs&utm_campaign=${campaign}`;

const QuincenaIcon = ({ size = 56 }) => (
  <img src="/quincena-icon.png" alt="" width={size} height={size} className="rounded-2xl shadow-lg" />
);

export const QuincenaSection = () => (
  <section id="quincena" className="py-24 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white relative overflow-hidden" aria-labelledby="t-quincena">
    <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-white/5 rounded-full"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold text-emerald-100">
            Producto propio de Gigadevs · Gratis
          </span>
          <div className="flex items-center gap-4 mt-6 mb-4">
            <QuincenaIcon />
            <h2 id="t-quincena" className="text-4xl md:text-5xl font-black">Quincena</h2>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-emerald-100 mb-4 leading-snug">La app para controlar tu quincena en dólares y en bolívares.</p>
          <p className="text-emerald-50/90 text-lg leading-relaxed mb-8 max-w-2xl">
            Quincena es una app gratis de finanzas personales para quien cobra cada 15 días o cada semana. Registras tus gastos en dólares o en
            moneda local con la tasa del día, controlas pagos, deudas y lo que te deben, y ves cuánto te queda hasta el próximo cobro.
            Funciona en la web y en Android, en Venezuela, Colombia, Chile, Perú, México y Argentina.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={quincenaLink('/app', 'registro') + '#registro'} className="px-7 py-4 bg-white text-emerald-800 font-extrabold rounded-2xl shadow-xl hover:bg-emerald-50 transition flex items-center justify-center gap-2">
              <UserPlus size={20} /> Crear cuenta gratis
            </a>
            <a href={quincenaLink('/app', 'entrar')} className="px-7 py-4 bg-emerald-950/30 border border-white/40 text-white font-bold rounded-2xl hover:bg-emerald-950/50 transition flex items-center justify-center gap-2">
              <LogIn size={20} /> Entrar a Quincena
            </a>
            <a href={quincenaLink('/', 'conocer')} className="px-7 py-4 text-white font-bold rounded-2xl hover:underline flex items-center justify-center gap-2">
              Conocer más <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white text-gray-900 rounded-3xl p-7 shadow-2xl max-w-sm mx-auto" role="img" aria-label="Ejemplo de la pantalla de inicio de Quincena">
            <div className="text-sm font-semibold text-gray-500">Te queda esta quincena</div>
            <div className="text-5xl font-black my-2">$148,20</div>
            <div className="h-3 rounded-full bg-emerald-100 overflow-hidden mb-4"><div className="h-full w-[62%] bg-emerald-700"></div></div>
            {[['Alquiler', '$120,00'], ['Mercado', 'Bs. 3.400,00'], ['Carlos te debe · el 15', '$25,00']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 border-t border-gray-100 text-sm"><span>{k}</span><strong>{v}</strong></div>
            ))}
            <div className="text-xs text-gray-400 mt-2">Montos de ejemplo</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {[
          { n: '1', t: 'Crea tu cuenta y elige tu país', d: 'Quincena usa tu moneda local y su tipo de cambio oficial, que se actualiza solo. En Venezuela, la tasa BCV y, si quieres, la USDT.' },
          { n: '2', t: 'Anota tus gastos en segundos', d: 'En dólares o en moneda local. En Android, compártelos desde el mensaje del banco o del pago móvil: el monto ya viene escrito.' },
          { n: '3', t: 'Mira cuánto te queda', d: 'Descuenta lo fijo, te avisa de los pagos que vienen y te muestra lo que realmente te queda hasta el próximo cobro.' },
        ].map((s) => (
          <div key={s.n} className="bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-white text-emerald-800 font-black flex items-center justify-center mb-4">{s.n}</div>
            <h3 className="text-xl font-bold mb-2">{s.t}</h3>
            <p className="text-emerald-50/85 text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white/10 border border-white/15 rounded-3xl p-6">
          <h3 className="text-xl font-bold mb-4">Qué puedes hacer</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-50">
            {[[Wallet, 'Dólares y moneda local con la tasa del día'], [CalendarCheck, 'Pagos fijos con avisos antes de vencer'], [HandCoins, 'Lleva la cuenta de quién te debe'], [PiggyBank, 'Plan para salir de deudas'], [Smartphone, 'Web y app para Android'], [CheckCircle, 'Sin publicidad: tus datos son solo tuyos']].map(([Icon, t]) => (
              <li key={t} className="flex items-start gap-2"><Icon size={18} className="text-emerald-200 flex-shrink-0 mt-0.5" /> {t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 border border-white/15 rounded-3xl p-6">
          <h3 className="text-xl font-bold mb-4">Para quién es</h3>
          <ul className="space-y-3 text-sm text-emerald-50">
            <li><strong className="text-white">Trabajadores con sueldo quincenal o semanal</strong> que quieren saber cuánto pueden gastar hoy.</li>
            <li><strong className="text-white">Familias</strong> que pagan colegio, alquiler y mercado y no quieren que se les pase un pago.</li>
            <li><strong className="text-white">Freelancers y emprendedores</strong> que cobran en dólares y gastan en bolívares o pesos.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export const ComoTrabajamos = ({ onCotizar }) => (
  <section id="como-trabajamos" className="py-24 bg-white border-t border-gray-100" aria-labelledby="t-como">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Cómo trabajamos</span>
        <h2 id="t-como" className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-6">De la idea al sistema funcionando</h2>
        <p className="text-gray-600 text-lg">Un proceso claro, con precio cerrado en dólares o en bolívares a tasa BCV, y soporte después de la entrega.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          [MessagesSquare, '1. Conversamos', 'Nos cuentas por WhatsApp o correo qué necesita tu negocio: ventas, inventario, citas, una web o una app.'],
          [ClipboardList, '2. Propuesta y precio', 'Te enviamos el alcance, los tiempos y el precio. Generas tu planilla de pago con la tasa BCV del día.'],
          [Wrench, '3. Desarrollo', 'Construimos tu sistema con buenas prácticas de seguridad y te mostramos avances para que opines antes de la entrega.'],
          [LifeBuoy, '4. Entrega y soporte', 'Lo publicamos, te enseñamos a usarlo y te acompañamos con soporte y actualizaciones de seguridad.'],
        ].map(([Icon, t, d]) => (
          <div key={t} className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
            <div className="w-14 h-14 bg-blue-950 text-yellow-400 rounded-2xl flex items-center justify-center mb-5"><Icon size={26} /></div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">{t}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={onCotizar} className="px-8 py-4 bg-yellow-500 text-blue-950 font-extrabold rounded-2xl shadow-lg hover:bg-yellow-400 transition inline-flex items-center gap-2">
          Empezar mi proyecto <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
);

export const ParaQuien = () => (
  <section id="para-quien" className="py-24 bg-gray-50 border-t border-gray-200" aria-labelledby="t-quien">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-yellow-600 font-bold text-sm tracking-wider uppercase bg-yellow-50 px-3 py-1 rounded-full">Para quién es Gigadevs</span>
        <h2 id="t-quien" className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-6">Software a la medida de tu negocio</h2>
        <p className="text-gray-600 text-lg">Trabajamos con negocios de Venezuela y Latinoamérica que necesitan ordenar su operación y vender por internet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          [Store, 'Comercios y tiendas', 'Facturación, inventario multialmacén y ventas en dólares y bolívares con la tasa del día.'],
          [Briefcase, 'Pymes y empresas', 'ERP contable, control de roles y permisos, auditoría y respaldos en la nube.'],
          [Stethoscope, 'Clínicas y profesionales', 'Agendas de citas, historias y sistemas con privacidad para los datos de tus clientes.'],
          [Rocket, 'Emprendedores', 'Tu página web, tienda en línea o app móvil para empezar a vender con una imagen profesional.'],
        ].map(([Icon, t, d]) => (
          <div key={t} className="bg-white rounded-3xl p-7 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center mb-5"><Icon size={26} /></div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">{t}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQS = [
  ['¿Qué hace Gigadevs?', 'Desarrollamos software a la medida: sistemas administrativos y contables, páginas web y tiendas en línea, apps móviles para Android y iOS, y soluciones de seguridad para redes y equipos. También creamos productos propios como Quincena.'],
  ['¿Cómo puedo pagar?', 'En dólares o en bolívares a la tasa BCV del día, por pago móvil, transferencia bancaria, Binance Pay o PayPal. Al elegir un plan generas tu planilla de pago y la envías por WhatsApp.'],
  ['¿Trabajan con negocios fuera de Venezuela?', 'Sí. Trabajamos a distancia con clientes de Venezuela y otros países de Latinoamérica.'],
  ['¿Qué es Quincena?', 'Es nuestra app gratis de finanzas personales para quien cobra por quincena o por semana: registra gastos en dólares y moneda local con la tasa del día, controla pagos y deudas, y muestra cuánto te queda hasta el próximo cobro. Funciona en la web y en Android.'],
  ['¿Cómo entro a mi cuenta de Quincena?', 'Desde el botón "Entrar a Quincena" de esta página o directamente en la app de Android. Si aún no tienes cuenta, puedes crearla gratis.'],
];

export const Faq = () => (
  <section id="preguntas" className="py-24 bg-white border-t border-gray-100" aria-labelledby="t-faq">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Preguntas frecuentes</span>
        <h2 id="t-faq" className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-4">Lo que más nos preguntan</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map(([q, a]) => (
          <details key={q} className="group bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <summary className="flex justify-between items-center gap-4 font-bold text-blue-950 cursor-pointer list-none">
              {q}<ChevronDown size={20} className="text-blue-600 transition-transform group-open:rotate-180 flex-shrink-0" />
            </summary>
            <p className="text-gray-600 mt-3 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
