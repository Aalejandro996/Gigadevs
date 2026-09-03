import React, { useState } from 'react';
import { Menu, X, CheckCircle, Server, ShieldCheck, Database, Smartphone, Globe, Code, CreditCard, Bitcoin, Send, ChevronRight } from 'lucide-react';

// Colores de marca aproximados basados en el logo:
// Azul principal: bg-blue-900 (aprox #1e3a8a)
// Amarillo/Naranja acento: text-yellow-500 (aprox #eab308)

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 antialiased">
      {/* --- HEADER / NAVBAR --- */}
      <header className="bg-blue-900 text-white fixed w-full z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo y Nombre */}
          <div className="flex items-center space-x-3">
            <img 
              src="Captura de pantalla 2026-09-01 a las 10.13.39 p. m..jpg" 
              alt="GIGA DEVS Logo" 
              className="h-12 w-auto rounded-full border-2 border-yellow-500"
            />
            <span className="text-2xl font-bold tracking-wider"><span className="text-yellow-500">GIGA</span> DEVS</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 font-medium">
            <button onClick={() => scrollToSection('soluciones')} className="hover:text-yellow-400 transition">Soluciones</button>
            <button onClick={() => scrollToSection('servicios')} className="hover:text-yellow-400 transition">Servicios</button>
            <button onClick={() => scrollToSection('planes')} className="hover:text-yellow-400 transition">Planes</button>
            <button onClick={() => scrollToSection('contacto')} className="hover:text-yellow-400 transition">Contacto</button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-yellow-500 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {}
        {/* Mobile Nav Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 py-4 px-4 space-y-4">
            <button onClick={() => scrollToSection('soluciones')} className="block w-full text-left hover:text-yellow-400">Soluciones</button>
            <button onClick={() => scrollToSection('servicios')} className="block w-full text-left hover:text-yellow-400">Servicios</button>
            <button onClick={() => scrollToSection('planes')} className="block w-full text-left hover:text-yellow-400">Planes</button>
            <button onClick={() => scrollToSection('contacto')} className="block w-full text-left hover:text-yellow-400">Contacto</button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="relative pt-24 pb-20 md:pt-40 md:pb-32 flex items-center bg-blue-900 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-90"></div>
         {/* Decorative elements */}
         <div className="absolute top-20 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Impulsamos el Futuro Digital de <span className="text-yellow-500">Pymes y Emprendedores</span>.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Desarrollamos software a medida, sistemas ERP contables y herramientas avanzadas de auditoría para proteger y hacer crecer tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => scrollToSection('planes')} className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1 flex items-center justify-center">
                Ver Planes <ChevronRight className="ml-2" size={20}/>
              </button>
              <button onClick={() => scrollToSection('contacto')} className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow hover:bg-white/10 transition flex items-center justify-center">
                 Solicitar Proyecto
              </button>
            </div>
          </div>
        </div>
      </section>

      {}
      {/* --- PRODUCTOS ESTRELLA --- */}
      <section id="soluciones" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Nuestras Soluciones Principales</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Herramientas robustas diseñadas para la eficiencia y seguridad de tu empresa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ERP Contable */}
            <div className="bg-blue-50 p-8 rounded-2xl shadow-sm border-t-4 border-yellow-500 hover:shadow-md transition">
              <Database className="w-12 h-12 text-blue-900 mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Sistema ERP_Contable</h3>
              <p className="text-gray-700 mb-6">Gestión integral para tu negocio. Controla finanzas, inventario, facturación y recursos humanos en una sola plataforma intuitiva.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600"><CheckCircle size={16} className="text-yellow-500 mr-2" /> Facturación Electrónica</li>
                <li className="flex items-center text-gray-600"><CheckCircle size={16} className="text-yellow-500 mr-2" /> Control de Stock en tiempo real</li>
              </ul>
            </div>

            {/* Auditor de Red */}
            <div className="bg-blue-50 p-8 rounded-2xl shadow-sm border-t-4 border-blue-600 hover:shadow-md transition">
              <ShieldCheck className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Auditor de Red</h3>
              <p className="text-gray-700 mb-6">Seguridad y monitoreo proactivo. Detecta vulnerabilidades, optimiza el tráfico y asegura tu infraestructura de red contra intrusiones.</p>
               <ul className="space-y-2">
                <li className="flex items-center text-gray-600"><CheckCircle size={16} className="text-blue-600 mr-2" /> Detección de intrusos</li>
                <li className="flex items-center text-gray-600"><CheckCircle size={16} className="text-blue-600 mr-2" /> Análisis de tráfico</li>
              </ul>
            </div>

            {/* Agente Auditor PC/Servidores */}
            <div className="bg-blue-50 p-8 rounded-2xl shadow-sm border-t-4 border-indigo-600 hover:shadow-md transition">
              <Server className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Agente Auditor PC y Servidores</h3>
              <p className="text-gray-700 mb-6">Control total de tus activos críticos. Monitoreo de rendimiento, estado del hardware y cumplimiento de seguridad en cada endpoint.</p>
               <ul className="space-y-2">
                <li className="flex items-center text-gray-600"><CheckCircle size={16} className="text-indigo-600 mr-2" /> Monitoreo de recursos (CPU/RAM)</li>
                <li className="flex items-center text-gray-600"><CheckCircle size={16} className="text-indigo-600 mr-2" /> Alertas preventivas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {}
      {/* --- OTROS SERVICIOS Y PROYECTOS --- */}
       <section id="servicios" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Servicios a Medida para Emprendedores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Más allá de nuestros productos, creamos lo que tu idea necesite.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow flex items-start space-x-4">
              <Globe className="text-yellow-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-bold text-blue-900">Diseño Web Moderno</h4>
                <p className="text-gray-600 mt-2">Sitios web responsivos, rápidos y optimizados para SEO que convierten visitantes en clientes.</p>
              </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow flex items-start space-x-4">
              <Smartphone className="text-yellow-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-bold text-blue-900">Apps Móviles</h4>
                <p className="text-gray-600 mt-2">Desarrollo de aplicaciones nativas o híbridas para iOS y Android. Lleva tu negocio al bolsillo de tu cliente.</p>
              </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow flex items-start space-x-4">
              <Code className="text-yellow-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-bold text-blue-900">Sistemas Personalizados</h4>
                <p className="text-gray-600 mt-2">¿Tienes un proceso único? Desarrollamos software a la medida exacta de tus flujos de trabajo.</p>
              </div>
            </div>
          </div>

          {/* Pequeña sección de portafolio/proyectos pasados */}
           <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-8">Otros Proyectos Exitosos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70">
                  {/* Placeholders visuales para proyectos */}
                  <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-center p-2">Sistema de Citas Médicas</div>
                  <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-center p-2">E-commerce Autopartes</div>
                  <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-center p-2">App de Delivery Local</div>
                  <div className="bg-gray-300 h-32 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-center p-2">Dashboard IoT Industrial</div>
              </div>
          </div>
        </div>
      </section>

      {}
      {/* --- PLANES ASEQUIBLES (Mensual/Anual) --- */}
      <section id="planes" className="py-20 bg-white relative overflow-hidden">
         {/* Decorative background shape */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-900 skew-y-3 transform origin-top-left -z-1"></div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Suscripciones para tu Negocio</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">Elige la modalidad que mejor se adapte a tu flujo de caja.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Plan Mensual */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Suscripción Mensual</h3>
              <p className="text-gray-500 mb-6">Flexibilidad total sin compromisos a largo plazo.</p>
              
              <div className="text-4xl font-extrabold text-blue-900 mb-6">
                $49 <span className="text-lg font-medium text-gray-500">/ mes</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span className="text-gray-700">Acceso completo al <strong>Sistema ERP_Contable</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span className="text-gray-700">Licencia para <strong>Agente Auditor (Red/PC)</strong> (hasta 5 dispositivos)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span className="text-gray-700">Soporte técnico estándar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span className="text-gray-700">Actualizaciones de software incluidas</span>
                </li>
              </ul>
              
              <button onClick={() => scrollToSection('contacto')} className="w-full py-3 bg-blue-100 text-blue-900 font-bold rounded-lg hover:bg-blue-200 transition">
                Comenzar Mensual
              </button>
            </div>

            {/* Plan Anual (Destacado) */}
            <div className="bg-blue-900 p-8 rounded-2xl shadow-xl border-2 border-yellow-500 transform md:-translate-y-4 flex flex-col relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-blue-900 text-xs font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-lg uppercase shadow-sm">
                Ahorra 20%
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Suscripción Anual</h3>
              <p className="text-blue-200 mb-6">La mejor opción para pymes consolidadas y máximo ahorro.</p>
              
              <div className="text-4xl font-extrabold text-white mb-2 text-yellow-400">
                $470 <span className="text-lg font-medium text-blue-200">/ año</span>
              </div>
              <p className="text-sm text-blue-300 mb-6 line-through decoration-red-400 decoration-2">Equivalente a $588 si pagaras mensual</p>
              
              <ul className="space-y-4 mb-8 flex-grow text-white">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-400 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span>Todo lo del plan mensual incluido</span>
                </li>
                 <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-400 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span>Licencia de Auditor <strong>Ilimitada</strong> (dispositivos ilimitados)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-400 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span><strong>Soporte Prioritario 24/7</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-yellow-400 mr-3 flex-shrink-0 mt-0.5" /> 
                  <span>Asesoría mensual gratuita (1 hora)</span>
                </li>
              </ul>
              
              <button onClick={() => scrollToSection('contacto')} className="w-full py-3 bg-yellow-500 text-blue-900 font-bold rounded-lg hover:bg-yellow-400 transition shadow-md">
                Ahorrar con el Plan Anual
              </button>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* --- PASARELA DE PAGO --- */}
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4 text-center">
             <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">Múltiples Métodos de Pago Seguros</h2>
             <p className="text-gray-600 mb-10">Facilitamos tu inversión con las plataformas más confiables.</p>
             
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-300">
                {/* Representación visual de las pasarelas */}
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="bg-white p-4 rounded-full shadow-md group-hover:shadow-lg transition">
                     <Bitcoin className="w-10 h-10 text-yellow-500" />
                  </div>
                  <span className="font-semibold text-gray-700">Binance Pay (Cripto)</span>
                </div>

                 <div className="flex flex-col items-center space-y-2 group">
                  <div className="bg-white p-4 rounded-full shadow-md group-hover:shadow-lg transition">
                     <CreditCard className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-700">PayPal / Tarjetas</span>
                </div>

                 <div className="flex flex-col items-center space-y-2 group">
                  <div className="bg-white p-4 rounded-full shadow-md group-hover:shadow-lg transition">
                     <Smartphone className="w-10 h-10 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-700">Pago Móvil</span>
                </div>

                <div className="flex flex-col items-center space-y-2 group">
                  <div className="bg-white p-4 rounded-full shadow-md group-hover:shadow-lg transition">
                     <Server className="w-10 h-10 text-indigo-600" />
                  </div>
                  <span className="font-semibold text-gray-700">Transferencia Bancaria</span>
                </div>
             </div>
             <p className="text-sm text-gray-500 mt-8">* Todas las transacciones son seguras y verificadas.</p>
         </div>
      </section>

      {}
      {/* --- CONTACTO Y SOLICITUD DE PROYECTO --- */}
      <section id="contacto" className="py-20 bg-blue-900 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para digitalizar tu negocio?</h2>
              <p className="text-blue-200 text-lg mb-8">
                Ya sea que necesites uno de nuestros planes estándar o un desarrollo completamente personalizado, estamos aquí para ayudarte. Cuéntanos tu idea.
              </p>
              <div className="flex items-center space-x-4 text-yellow-500 mb-4">
                <CheckCircle /> <span className="text-white font-medium">Atención personalizada para Pymes</span>
              </div>
              <div className="flex items-center space-x-4 text-yellow-500">
                <CheckCircle /> <span className="text-white font-medium">Presupuestos claros y sin sorpresas</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Solicita tu Proyecto o Plan</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nombre completo" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none" />
                   <input type="email" placeholder="Correo electrónico" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none" />
                </div>
                <input type="text" placeholder="Empresa / Nombre del Negocio" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none" />
                
                <select defaultValue="" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-gray-600">
                  <option value="" disabled>¿Qué tipo de servicio te interesa?</option>
                  <option value="suscripcion-mensual">Suscripción Mensual (ERP + Auditor)</option>
                  <option value="suscripcion-anual">Suscripción Anual (Ahorro 20%)</option>
                  <option value="desarrollo-web">Desarrollo Web a Medida</option>
                  <option value="app">Desarrollo de App Móvil</option>
                  <option value="medida">Sistema Personalizado / Otro</option>
                </select>

                <textarea placeholder="Describe brevemente tu proyecto o necesidades..." rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"></textarea>
                
                <button type="button" className="w-full py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg shadow-md hover:bg-yellow-400 transition flex items-center justify-center">
                  Enviar Solicitud <Send className="ml-2" size={20}/>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">Te contactaremos en menos de 24 horas.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-blue-950 text-blue-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
           <div className="flex flex-col items-start">
             <div className="flex items-center space-x-2 mb-4">
                {/* Usamos el logo subido aquí también */}
                <img 
                  src="Captura de pantalla 2026-09-01 a las 10.13.39 p. m..jpg" 
                  alt="GIGA DEVS Logo Mini" 
                  className="h-8 w-auto rounded-full border border-yellow-500"
                />
                <span className="text-xl font-bold text-white"><span className="text-yellow-500">GIGA</span> DEVS</span>
              </div>
             <p className="text-sm">Desarrollo de software y soluciones tecnológicas enfocadas en el crecimiento de Pymes y emprendedores.</p>
           </div>
           
           <div>
             <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
             <ul className="space-y-2 text-sm">
               <li><button onClick={() => scrollToSection('soluciones')} className="hover:text-yellow-500 transition">Productos (ERP/Auditores)</button></li>
               <li><button onClick={() => scrollToSection('servicios')} className="hover:text-yellow-500 transition">Desarrollo a Medida</button></li>
               <li><button onClick={() => scrollToSection('planes')} className="hover:text-yellow-500 transition">Suscripciones</button></li>
             </ul>
           </div>

           <div>
             <h4 className="text-white font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
               <li>info@gigadevs.com</li>
               <li>+58 (XXX) XXX-XXXX</li>
               <li className="flex items-center space-x-2 pt-2">
                 {/* Placeholder Social Icons */}
                 <a href="#" className="text-blue-300 hover:text-yellow-500"><Globe size={20}/></a>
               </li>
             </ul>
           </div>
        </div>
        <div className="border-t border-blue-900 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} GIGA DEVS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;