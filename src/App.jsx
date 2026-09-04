import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, Server, ShieldCheck, Database, Smartphone, Globe, Code, CreditCard, Bitcoin, Send, ChevronRight, Activity, Users, Zap, MessageCircle, Cpu, FileText, DollarSign, Download, ExternalLink, Lock } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = useState('pagomovil');
  const [bcvRate, setBcvRate] = useState(801.17);
  const [loadingRate, setLoadingRate] = useState(true);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBCVRate = async () => {
      try {
        const response = await fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?monitor=bcv');
        const data = await response.json();
        if (data && data.price) {
          setBcvRate(data.price);
        }
      } catch (error) {
        console.log("Usando tasa BCV estándar de respaldo.");
      } finally {
        setLoadingRate(false);
      }
    };
    fetchBCVRate();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleOpenModal = (planName, basePrice, cycle = 'mensual') => {
    setSelectedPlan(planName);
    setPlanPriceUSD(basePrice);
    setBillingCycle(cycle);
    setInvoiceGenerated(false);
    setInvoiceData(null);
    setModalOpen(true);
  };

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Por favor completa tu nombre y correo electrónico.');
      return;
    }

    const totalVES = (planPriceUSD * bcvRate).toFixed(2);
    const invoiceNum = 'GIGA-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString();

    const data = {
      invoiceNum,
      dateStr,
      clientName,
      clientEmail,
      clientBusiness: clientBusiness || 'N/A',
      selectedPlan,
      billingCycle,
      planPriceUSD,
      bcvRate,
      totalVES,
      paymentMethod
    };

    setInvoiceData(data);
    setInvoiceGenerated(true);
  };

  const downloadPDFText = () => {
    if (!invoiceData) return;
    const content = `
========================================
       GIGA DEVS - PLANILLA DE PAGO
========================================
Nro de Factura: ${invoiceData.invoiceNum}
Fecha: ${invoiceData.dateStr}
----------------------------------------
CLIENTE:
Nombre: ${invoiceData.clientName}
Correo: ${invoiceData.clientEmail}
Empresa/Negocio: ${invoiceData.clientBusiness}
----------------------------------------
DETALLE DEL SERVICIO:
Plan / Sistema: ${invoiceData.selectedPlan}
Modalidad: ${invoiceData.billingCycle.toUpperCase()}
Monto en USD: $${invoiceData.planPriceUSD}
Tasa BCV Aplicada: Bs. ${invoiceData.bcvRate}
TOTAL A PAGAR EN VES: Bs. ${invoiceData.totalVES}
Método de Pago Seleccionado: ${invoiceData.paymentMethod.toUpperCase()}
----------------------------------------
¡Gracias por confiar en GIGA DEVS!
========================================
    `;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Factura_${invoiceData.invoiceNum}.txt`;
    link.click();
  };

  const getWhatsAppLink = () => {
    if (!invoiceData) return '#';
    const phone = '584120000000'; 
    const text = encodeURIComponent(
      `Hola GIGA DEVS! 👋 Acabo de generar mi planilla de pago Nro *${invoiceData.invoiceNum}*.\n\n` +
      `*Cliente:* ${invoiceData.clientName}\n` +
      `*Plan Solicitado:* ${invoiceData.selectedPlan} (${invoiceData.billingCycle})\n` +
      `*Total USD:* $${invoiceData.planPriceUSD} | *Total VES:* Bs. ${invoiceData.totalVES} (Tasa BCV: ${invoiceData.bcvRate})\n` +
      `*Método de Pago:* ${invoiceData.paymentMethod.toUpperCase()}\n\n` +
      `Adjunto mi comprobante de pago para la entrega inmediata del sistema. 🚀`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-blue-950">
      
      {/* --- BOTÓN FLOTANTE WHATSAPP --- */}
      <a 
        href="https://wa.me/584120000000?text=Hola,%20estoy%20interesado%20en%20los%20servicios%20y%20sistemas%20de%20GIGA%20DEVS" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-16 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¡Chatea con nosotros! 💬
        </span>
      </a>

      {/* --- HEADER / NAVBAR --- */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-blue-950/95 backdrop-blur-md py-3 shadow-xl border-b border-blue-900/50' : 'bg-blue-950 py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-11 w-11 bg-yellow-500 text-blue-950 font-black rounded-full flex items-center justify-center text-xl border-2 border-yellow-400 shadow-md">GD</div>
            <span className="text-2xl font-black tracking-wider text-white"><span className="text-yellow-500">GIGA</span> DEVS</span>
          </div>

          <nav className="hidden lg:flex space-x-8 font-medium text-white text-sm tracking-wide">
            <button onClick={() => scrollToSection('soluciones')} className="hover:text-yellow-400 transition-colors">Sistemas & Software</button>
            <button onClick={() => scrollToSection('detalles')} className="hover:text-yellow-400 transition-colors">Especificaciones</button>
            <button onClick={() => scrollToSection('servicios')} className="hover:text-yellow-400 transition-colors">Web & Apps</button>
            <button onClick={() => scrollToSection('proyectos')} className="hover:text-yellow-400 transition-colors">Casos de Éxito</button>
            <button onClick={() => scrollToSection('planes')} className="hover:text-yellow-400 transition-colors">Planes y Precios</button>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-xs text-yellow-400 bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-800 font-mono flex items-center space-x-1">
              <Lock size={12} className="text-green-400" />
              <span>Tasa BCV: Bs. {loadingRate ? '...' : bcvRate} 📊</span>
            </div>
            <button onClick={() => scrollToSection('contacto')} className="bg-yellow-500 text-blue-950 px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-md font-bold text-sm">
              Solicitar Cotización
            </button>
          </div>

          <button className="lg:hidden text-yellow-500 focus:outline-none p-2" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`lg:hidden absolute w-full bg-blue-950 shadow-2xl transition-all duration-300 ease-in-out border-b border-blue-900 ${isMenuOpen ? 'max-h-[480px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
          <div className="px-6 space-y-3">
            <div className="text-xs text-yellow-400 bg-blue-900/80 px-3 py-2 rounded-xl border border-blue-800 font-mono text-center">
              Tasa BCV Actual: Bs. {loadingRate ? '...' : bcvRate} 📊
            </div>
            <button onClick={() => scrollToSection('soluciones')} className="block w-full text-left text-white hover:text-yellow-400 py-2 font-medium border-b border-blue-900/50">Sistemas & Software</button>
            <button onClick={() => scrollToSection('detalles')} className="block w-full text-left text-white hover:text-yellow-400 py-2 font-medium border-b border-blue-900/50">Especificaciones Técnicas</button>
            <button onClick={() => scrollToSection('servicios')} className="block w-full text-left text-white hover:text-yellow-400 py-2 font-medium border-b border-blue-900/50">Web & Apps Móviles</button>
            <button onClick={() => scrollToSection('proyectos')} className="block w-full text-left text-white hover:text-yellow-400 py-2 font-medium border-b border-blue-900/50">Casos de Éxito</button>
            <button onClick={() => scrollToSection('planes')} className="block w-full text-left text-white hover:text-yellow-400 py-2 font-medium border-b border-blue-900/50">Planes y Precios</button>
            <button onClick={() => scrollToSection('contacto')} className="block w-full text-center bg-yellow-500 text-blue-950 font-bold py-3 rounded-xl mt-4 shadow-lg">Solicitar Cotización</button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="relative pt-36 pb-24 md:pt-48 md:pb-36 flex items-center bg-blue-950 overflow-hidden text-white">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-blue-950 to-blue-950 opacity-90"></div>
         <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-yellow-500 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-900/80 rounded-full border border-blue-700/50 text-yellow-400 font-semibold mb-6 backdrop-blur-sm text-sm">
                <Zap size={16} className="text-yellow-400 animate-bounce" />
                <span>Infraestructura Segura con Base de Datos Cifrada</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Sistematiza, Protege y Escala con <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">GIGA DEVS</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
                Diseñamos software de alto rendimiento: ERPs fiscales protegidos contra inyecciones SQL y XSS, auditoría de redes, páginas web y apps móviles con licencias seguras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => scrollToSection('planes')} className="px-8 py-4 bg-yellow-500 text-blue-950 font-extrabold rounded-2xl shadow-xl hover:bg-yellow-400 hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center">
                  Ver Planes y Precios <ChevronRight className="ml-2" size={20}/>
                </button>
                <button onClick={() => scrollToSection('soluciones')} className="px-8 py-4 bg-blue-900/60 border border-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800/80 transition-all flex items-center justify-center backdrop-blur-sm">
                   Explorar Sistemas
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-blue-900/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-yellow-400">+120</div>
                  <div className="text-xs md:text-sm text-blue-300">Empresas Activas</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">100%</div>
                  <div className="text-xs md:text-sm text-blue-300">Seguridad SSL/TLS</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-yellow-400">24/7</div>
                  <div className="text-xs md:text-sm text-blue-300">Monitoreo y Soporte</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-3xl border border-blue-800 shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-800/80">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-blue-300 font-mono">RENDER_PROD // SECURE_DB</span>
                </div>
                
                <div className="space-y-4 font-mono text-xs">
                  <div className="bg-blue-950 p-3 rounded-xl border border-blue-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-blue-200">
                      <Lock className="text-green-400" size={18} />
                      <span>PostgreSQL: SSL Mode Enforced</span>
                    </div>
                    <span className="text-green-400 font-bold bg-green-950/50 px-2 py-0.5 rounded">PROTECTED</span>
                  </div>

                  <div className="bg-blue-950 p-3 rounded-xl border border-blue-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-blue-200">
                      <ShieldCheck className="text-blue-400" size={18} />
                      <span>Rate Limiting: 100 req/15min</span>
                    </div>
                    <span className="text-blue-400 font-bold bg-blue-900/50 px-2 py-0.5 rounded">ACTIVE</span>
                  </div>

                  <div className="bg-blue-950 p-3 rounded-xl border border-blue-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-blue-200">
                      <Cpu className="text-yellow-400" size={18} />
                      <span>Tasa BCV Diaria: Bs. {bcvRate}</span>
                    </div>
                    <span className="text-yellow-400 font-bold bg-yellow-950/50 px-2 py-0.5 rounded">SYNCED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTOS ESTRELLA --- */}
      <section id="soluciones" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Sistemas Propietarios</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-6">Nuestras Soluciones Principales</h2>
            <p className="text-gray-600 text-lg">Tecnología de punta diseñada con arquitectura modular segura para garantizar control absoluto y escalabilidad empresarial.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-full -z-10 transition-transform group-hover:scale-125"></div>
              <div>
                <div className="w-16 h-16 bg-yellow-500 text-blue-950 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Database size={32} />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">Sistema ERP_Contable</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Centraliza y automatiza la administración de tu empresa con cifrado de datos sensibles en base de datos.</p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-700">
                  <li className="flex items-center"><CheckCircle size={18} className="text-yellow-500 mr-2.5 flex-shrink-0" /> Facturación Electrónica Fiscal</li>
                  <li className="flex items-center"><CheckCircle size={18} className="text-yellow-500 mr-2.5 flex-shrink-0" /> Control Multialmacén y Stock</li>
                  <li className="flex items-center"><CheckCircle size={18} className="text-yellow-500 mr-2.5 flex-shrink-0" /> Seguridad de datos con Bcrypt y JWT</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection('detalles')} className="w-full py-3 bg-blue-50 text-blue-900 font-bold rounded-xl hover:bg-blue-100 transition text-sm">
                Ver especificaciones
              </button>
            </div>

            <div className="group bg-blue-950 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900 rounded-bl-full -z-10 transition-transform group-hover:scale-125"></div>
              <div>
                <div className="w-16 h-16 bg-blue-900 text-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-blue-800">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3">NetGuard (Auditor de Red)</h3>
                <p className="text-blue-200 mb-6 leading-relaxed">Blindaje y monitoreo perimetral. Detección de intrusos y control estricto de accesos a la red.</p>
                
                <ul className="space-y-3 mb-8 text-sm text-blue-100">
                  <li className="flex items-center"><CheckCircle size={18} className="text-yellow-400 mr-2.5 flex-shrink-0" /> Detección de Intrusos (IDS / IPS)</li>
                  <li className="flex items-center"><CheckCircle size={18} className="text-yellow-400 mr-2.5 flex-shrink-0" /> Control de Ancho de Banda y Tráfico</li>
                  <li className="flex items-center"><CheckCircle size={18} className="text-yellow-400 mr-2.5 flex-shrink-0" /> Autenticación Multi-Factor (MFA)</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection('detalles')} className="w-full py-3 bg-blue-900 text-yellow-400 font-bold rounded-xl hover:bg-blue-800 transition text-sm border border-blue-800">
                Ver especificaciones
              </button>
            </div>

            <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full -z-10 transition-transform group-hover:scale-125"></div>
              <div>
                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Server size={32} />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">Agente Endpoint PC & Servidores</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Visibilidad total del hardware y software con transmisión cifrada de telemetría hacia el servidor central.</p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-700">
                  <li className="flex items-center"><CheckCircle size={18} className="text-indigo-600 mr-2.5 flex-shrink-0" /> Monitoreo de Hardware (CPU, RAM, Disco)</li>
                  <li className="flex items-center"><CheckCircle size={18} className="text-indigo-600 mr-2.5 flex-shrink-0" /> Inventario automatizado seguro</li>
                  <li className="flex items-center"><CheckCircle size={18} className="text-indigo-600 mr-2.5 flex-shrink-0" /> Ejecución remota validada por tokens</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection('detalles')} className="w-full py-3 bg-blue-50 text-blue-900 font-bold rounded-xl hover:bg-blue-100 transition text-sm">
                Ver especificaciones
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ESPECIFICACIONES TÉCNICAS INTERACTIVAS --- */}
      <section id="detalles" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">Arquitectura & Seguridad</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-4">Especificaciones Detalladas</h2>
            <p className="text-gray-400">Selecciona un sistema para conocer sus módulos internos y medidas de seguridad implementadas.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveTab('erp')} 
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeTab === 'erp' ? 'bg-yellow-500 text-blue-950 shadow-lg scale-105' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <Database size={18} /> <span>GIGA ERP_Contable</span>
            </button>
            <button 
              onClick={() => setActiveTab('netguard')} 
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeTab === 'netguard' ? 'bg-yellow-500 text-blue-950 shadow-lg scale-105' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <ShieldCheck size={18} /> <span>NetGuard Redes</span>
            </button>
            <button 
              onClick={() => setActiveTab('endpoint')} 
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeTab === 'endpoint' ? 'bg-yellow-500 text-blue-950 shadow-lg scale-105' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <Server size={18} /> <span>Agente Endpoint</span>
            </button>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            {activeTab === 'erp' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-gray-800">
                  <div className="p-4 bg-yellow-500/10 text-yellow-400 rounded-2xl"><Database size={36} /></div>
                  <div>
                    <h3 className="text-2xl font-bold">Módulos Internos - GIGA ERP_Contable</h3>
                    <p className="text-gray-400 text-sm">Base de datos PostgreSQL optimizada con políticas RLS (Row Level Security).</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                    <h4 className="font-bold text-yellow-400 mb-2 flex items-center"><CheckCircle size={16} className="mr-2" /> Seguridad de Datos</h4>
                    <p className="text-gray-400">Protección contra inyección SQL mediante consultas parametrizadas y hashing de contraseñas con bcrypt.</p>
                  </div>
                  <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                    <h4 className="font-bold text-yellow-400 mb-2 flex items-center"><CheckCircle size={16} className="mr-2" /> Ventas y Facturación</h4>
                    <p className="text-gray-400">Emisión de facturas con trazabilidad cifrada y respaldos automáticos diarios en la nube.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'netguard' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-gray-800">
                  <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl"><ShieldCheck size={36} /></div>
                  <div>
                    <h3 className="text-2xl font-bold">NetGuard - Auditor de Red</h3>
                    <p className="text-gray-400 text-sm">Monitoreo perimetral con cabeceras HTTP seguras y CORS estricto.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center"><CheckCircle size={16} className="mr-2" /> Packet Inspection (DPI)</h4>
                    <p className="text-gray-400">Inspección de tráfico cifrado TLS 1.3 para prevenir ataques de intermediarios (MitM).</p>
                  </div>
                  <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center"><CheckCircle size={16} className="mr-2" /> Control de Accesos</h4>
                    <p className="text-gray-400">Bloqueo automático de IP tras múltiples intentos fallidos de autenticación (Rate limiting).</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'endpoint' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-gray-800">
                  <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl"><Server size={36} /></div>
                  <div>
                    <h3 className="text-2xl font-bold">Agente Endpoint PC & Servidores</h3>
                    <p className="text-gray-400 text-sm">Comunicación segura mediante WebSockets con certificados SSL firmados.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                    <h4 className="font-bold text-indigo-400 mb-2 flex items-center"><CheckCircle size={16} className="mr-2" /> Telemetría Protegida</h4>
                    <p className="text-gray-400">Envío cifrado de métricas de hardware sin exponer datos corporativos confidenciales.</p>
                  </div>
                  <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                    <h4 className="font-bold text-indigo-400 mb-2 flex items-center"><CheckCircle size={16} className="mr-2" /> Integridad de Software</h4>
                    <p className="text-gray-400">Verificación de hashes SHA-256 para evitar la ejecución de binarios alterados.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- DESARROLLO WEB Y APPS (AGENCIA) --- */}
       <section id="servicios" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase bg-blue-100/50 px-3 py-1 rounded-full">Agencia Digital GIGA</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-6">Presencia Web & Apps a Medida</h2>
            <p className="text-gray-600 text-lg">Construimos la cara digital de tu negocio con altos estándares de seguridad OWASP Top 10.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition">
              <div>
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe size={32} />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">Páginas Web & E-commerce</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">Sitios ultrarrápidos con protección anti-XSS, sanitización de inputs y certificados SSL incluidos.</p>
                <ul className="space-y-2.5 text-sm text-gray-700 mb-8">
                  <li className="flex items-center"><CheckCircle size={16} className="text-blue-600 mr-2" /> Paneles autogestionables seguros</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-blue-600 mr-2" /> Pasarelas cifradas</li>
                </ul>
              </div>
              <button onClick={() => handleOpenModal('Página Web / E-commerce (Pago Único)', 299, 'único')} className="w-full py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition text-sm">
                Cotizar Web ($299)
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition">
              <div>
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">Apps Móviles (iOS & Android)</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">Aplicaciones móviles con almacenamiento seguro de tokens y comunicación HTTPS estricta.</p>
                <ul className="space-y-2.5 text-sm text-gray-700 mb-8">
                  <li className="flex items-center"><CheckCircle size={16} className="text-yellow-600 mr-2" /> Autenticación Biométrica</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-yellow-600 mr-2" /> Cifrado en dispositivo</li>
                </ul>
              </div>
              <button onClick={() => handleOpenModal('App Móvil iOS & Android (Pago Único)', 799, 'único')} className="w-full py-3 bg-yellow-500 text-blue-950 font-bold rounded-xl hover:bg-yellow-400 transition text-sm shadow">
                Cotizar App Móvil ($799)
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition">
              <div>
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Code size={32} />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">Sistemas de Contabilidad / Facturación</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">Software contable protegido con control de roles y permisos granulares por usuario.</p>
                <ul className="space-y-2.5 text-sm text-gray-700 mb-8">
                  <li className="flex items-center"><CheckCircle size={16} className="text-indigo-600 mr-2" /> Auditoría de accesos y logs</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-indigo-600 mr-2" /> Roles y permisos (RBAC)</li>
                </ul>
              </div>
              <button onClick={() => handleOpenModal('Sistema a Medida Contabilidad/Facturación', 599, 'único')} className="w-full py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition text-sm">
                Cotizar Sistema ($599)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CASOS DE ÉXITO --- */}
      <section id="proyectos" className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-yellow-600 font-bold text-sm tracking-wider uppercase bg-yellow-50 px-3 py-1 rounded-full">Portafolio</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mt-4 mb-4">Otros Proyectos Exitosos</h2>
            <p className="text-gray-600">Algunas de las soluciones especializadas implementadas con alta seguridad en producción.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between">
              <div className="p-3 bg-blue-800 rounded-2xl w-fit mb-4 text-yellow-400"><Activity size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">Sistema de Citas Médicas</h4>
                <p className="text-blue-200 text-xs leading-relaxed">SaaS clínico con cumplimiento de normativas de privacidad de datos de pacientes.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between">
              <div className="p-3 bg-blue-800 rounded-2xl w-fit mb-4 text-yellow-400"><Globe size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">E-commerce de Autopartes</h4>
                <p className="text-blue-200 text-xs leading-relaxed">Tienda online con pasarelas auditadas PCI-DSS y multimoneda segura.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between">
              <div className="p-3 bg-blue-800 rounded-2xl w-fit mb-4 text-yellow-400"><Smartphone size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">App de Delivery Local</h4>
                <p className="text-blue-200 text-xs leading-relaxed">App con geolocalización segura y pasarela Binance Pay integrada sin vulnerabilidades.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between">
              <div className="p-3 bg-blue-800 rounded-2xl w-fit mb-4 text-yellow-400"><Server size={24} /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">Dashboard IoT Industrial</h4>
                <p className="text-blue-200 text-xs leading-relaxed">Monitoreo de sensores con túneles VPN cifrados punto a punto.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PLANES Y PRECIOS COMPLETOS --- */}
      <section id="planes" className="py-24 bg-blue-950 relative overflow-hidden text-white">
         <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase bg-blue-900 px-3 py-1 rounded-full border border-blue-800">Catálogo de Planes y Licencias</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">Soluciones Flexibles para tu Negocio</h2>
            <p className="text-blue-200 text-lg">Elige entre suscripciones mensuales, anuales o licencias vitalicias con soporte anual de seguridad incluido.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="inline-block p-3 bg-blue-100 text-blue-900 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Suscripción Software</div>
                <h3 className="text-2xl font-bold text-blue-950 mb-2">GIGA Suite Pro</h3>
                <p className="text-gray-500 mb-6 text-sm">ERP Contable + Auditor de Red y PC.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-black text-blue-950">$49</span>
                  <span className="text-lg text-gray-500 ml-2 font-medium">/ mes</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-700">
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> ERP Contable seguro</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> NetGuard Auditor de Red</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> Parches de seguridad automáticos</li>
                </ul>
              </div>
              <div className="space-y-2">
                <button onClick={() => handleOpenModal('GIGA Suite Pro (Mensual)', 49, 'mensual')} className="w-full py-2.5 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition text-xs shadow">
                  Plan Mensual ($49)
                </button>
                <button onClick={() => handleOpenModal('GIGA Suite Pro (Anual)', 470, 'anual')} className="w-full py-2.5 bg-yellow-500 text-blue-950 font-bold rounded-xl hover:bg-yellow-400 transition text-xs shadow">
                  Plan Anual ($470)
                </button>
              </div>
            </div>

            <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="inline-block p-3 bg-indigo-100 text-indigo-900 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Desarrollo Web</div>
                <h3 className="text-2xl font-bold text-blue-950 mb-2">Web & E-commerce</h3>
                <p className="text-gray-500 mb-6 text-sm">Diseño profesional protegido contra ataques web.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-black text-blue-950">$299</span>
                  <span className="text-lg text-gray-500 ml-2 font-medium">/ único</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-700">
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> Seguridad OWASP y SSL</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> Pasarela cifrada integrada</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> <strong>Licencia vitalicia + 1 año soporte</strong></li>
                </ul>
              </div>
              <button onClick={() => handleOpenModal('Página Web / E-commerce', 299, 'único')} className="w-full py-3 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition text-xs shadow">
                Comprar Licencia Vitalicia ($299)
              </button>
            </div>

            <div className="bg-gradient-to-b from-yellow-400 to-amber-500 text-blue-950 p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-3 right-6 bg-blue-950 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow">MÁS SEGURO</div>
              <div>
                <div className="inline-block p-3 bg-blue-950/10 text-blue-950 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Sistemas Dedicados</div>
                <h3 className="text-2xl font-black text-blue-950 mb-2">Contabilidad & Facturación</h3>
                <p className="text-blue-950/80 mb-6 text-sm font-medium">Software con base de datos blindada para tu empresa.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-black text-blue-950">$599</span>
                  <span className="text-lg text-blue-950/80 ml-2 font-medium">/ proyecto</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm font-semibold text-blue-950">
                  <li className="flex items-center"><CheckCircle size={16} className="text-blue-950 mr-2 flex-shrink-0" /> Base de datos PostgreSQL cifrada</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-blue-950 mr-2 flex-shrink-0" /> Facturación fiscal protegida</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-blue-950 mr-2 flex-shrink-0" /> <strong>Licencia vitalicia + soporte anual</strong></li>
                </ul>
              </div>
              <button onClick={() => handleOpenModal('Sistema a Medida Contabilidad/Facturación', 599, 'único')} className="w-full py-3 bg-blue-950 text-white font-extrabold rounded-xl hover:bg-blue-900 transition text-xs shadow-xl">
                Solicitar Sistema Vitalicio ($599)
              </button>
            </div>

            <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="inline-block p-3 bg-green-100 text-green-900 rounded-2xl mb-4 font-bold text-xs uppercase tracking-wider">Apps Móviles</div>
                <h3 className="text-2xl font-bold text-blue-950 mb-2">Apps iOS & Android</h3>
                <p className="text-gray-500 mb-6 text-sm">Aplicaciones móviles con cifrado de almacenamiento local.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-black text-blue-950">$799</span>
                  <span className="text-lg text-gray-500 ml-2 font-medium">/ proyecto</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-700">
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> Seguridad en conexiones API</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> Publicación en tiendas oficiales</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" /> <strong>Licencia vitalicia + soporte anual</strong></li>
                </ul>
              </div>
              <button onClick={() => handleOpenModal('App Móvil iOS & Android', 799, 'único')} className="w-full py-3 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition text-xs shadow">
                Cotizar App Vitalicia ($799)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PASARELA DE PAGO CON CONVERSIÓN BCV --- */}
      <section className="py-20 bg-white border-b border-gray-100">
         <div className="container mx-auto px-4 text-center">
             <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-3">
               Tasa BCV del Día: Bs. {bcvRate} (Actualización Automática Diaria)
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mt-2 mb-4">Pasarela de Pagos Segura en Producción</h2>
             <p className="text-gray-600 mb-10 max-w-2xl mx-auto">Selecciona cualquier plan o servicio para generar tu planilla de pago con cálculo automático en VES e integración directa con WhatsApp.</p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center space-y-3 hover:shadow-lg transition group">
                  <Bitcoin className="w-10 h-10 text-yellow-500 group-hover:scale-110 transition" />
                  <span className="font-bold text-gray-800 text-sm">Binance Pay (Cripto)</span>
                </div>
                 <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center space-y-3 hover:shadow-lg transition group">
                  <CreditCard className="w-10 h-10 text-blue-600 group-hover:scale-110 transition" />
                  <span className="font-bold text-gray-800 text-sm">PayPal / Tarjetas</span>
                </div>
                 <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center space-y-3 hover:shadow-lg transition group">
                  <Smartphone className="w-10 h-10 text-green-600 group-hover:scale-110 transition" />
                  <span className="font-bold text-gray-800 text-sm">Pago Móvil Nacional</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center space-y-3 hover:shadow-lg transition group">
                  <Server className="w-10 h-10 text-indigo-600 group-hover:scale-110 transition" />
                  <span className="font-bold text-gray-800 text-sm">Transferencia Bancaria</span>
                </div>
             </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-blue-950 text-blue-300 py-16 border-t border-blue-900/50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
           <div className="md:col-span-2">
             <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="h-10 w-10 bg-yellow-500 text-blue-950 font-black rounded-full flex items-center justify-center border border-yellow-400">GD</div>
                <span className="text-2xl font-bold text-white"><span className="text-yellow-500">GIGA</span> DEVS</span>
              </div>
             <p className="text-blue-200 max-w-sm text-sm leading-relaxed">Expertos en desarrollo de software seguro, automatización empresarial y despliegue en producción en Render.</p>
           </div>
           <div>
             <h4 className="text-white font-bold mb-4">Contacto Seguro</h4>
              <ul className="space-y-2.5 text-sm text-blue-200">
               <li>gigadesvc@gmail.com</li>
               <li>+58 (412) 000-0000</li>
             </ul>
           </div>
        </div>
        <div className="border-t border-blue-900 container mx-auto px-4 pt-8 text-center text-xs text-blue-400">
          <p>© {new Date().getFullYear()} GIGA DEVS Corp. Todos los derechos reservados. Base de Datos Protegida.</p>
        </div>
      </footer>

      {/* MODAL DE PASARELA DE PAGO Y FACTURA */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full">
              <X size={20} />
            </button>
            
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-yellow-100 text-yellow-700 rounded-2xl"><DollarSign size={24} /></div>
              <div>
                <h3 className="text-2xl font-black text-blue-950">Pasarela de Pago Segura</h3>
                <p className="text-gray-500 text-xs">Conversión automática con Tasa BCV Oficial (Bs. {bcvRate})</p>
              </div>
            </div>

            {!invoiceGenerated ? (
              <form onSubmit={handleGenerateInvoice} className="space-y-4 mt-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                  <div className="text-xs text-blue-700 font-bold uppercase">Servicio Seleccionado</div>
                  <div className="text-lg font-bold text-blue-950">{selectedPlan}</div>
                  <div className="text-sm font-semibold text-gray-700 mt-1">
                    Precio USD: <span className="text-blue-900 font-bold">${planPriceUSD}</span> ({billingCycle})
                  </div>
                  <div className="text-base font-extrabold text-green-700 mt-1">
                    Total a pagar en Bolívares (VES): Bs. {(planPriceUSD * bcvRate).toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Nombre y Apellido *</label>
                  <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Tu nombre" className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Correo *</label>
                    <input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="tu@correo.com" className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Empresa</label>
                    <input type="text" value={clientBusiness} onChange={(e) => setClientBusiness(e.target.value)} placeholder="Tu negocio" className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Método de Pago</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none text-gray-700 font-medium">
                    <option value="pagomovil">Pago Móvil Nacional (VES)</option>
                    <option value="transferencia">Transferencia Bancaria (VES)</option>
                    <option value="binance">Binance Pay (USDT)</option>
                    <option value="paypal">PayPal / Tarjeta (USD)</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 bg-yellow-500 text-blue-950 font-extrabold rounded-xl hover:bg-yellow-400 transition shadow-lg text-sm mt-4 flex items-center justify-center">
                  <FileText className="mr-2" size={18} /> Generar Planilla de Pago y Factura
                </button>
              </form>
            ) : (
              <div className="space-y-6 mt-6">
                <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center">
                  <CheckCircle className="mx-auto text-green-600 mb-2" size={40} />
                  <h4 className="font-extrabold text-green-900 text-lg">¡Planilla Generada con Éxito!</h4>
                  <p className="text-gray-600 text-xs mt-1">Nro de Factura: <strong className="text-blue-900">{invoiceData.invoiceNum}</strong></p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border text-xs space-y-2 font-mono">
                  <div className="flex justify-between"><span>Cliente:</span> <strong>{invoiceData.clientName}</strong></div>
                  <div className="flex justify-between"><span>Servicio:</span> <strong>{invoiceData.selectedPlan}</strong></div>
                  <div className="flex justify-between"><span>Monto USD:</span> <strong>${invoiceData.planPriceUSD}</strong></div>
                  <div className="flex justify-between"><span>Tasa BCV:</span> <strong>Bs. {invoiceData.bcvRate}</strong></div>
                  <div className="flex justify-between border-t pt-2 text-sm text-green-700 font-bold"><span>Total VES:</span> <span>Bs. {invoiceData.totalVES}</span></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={downloadPDFText} className="flex-1 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition text-sm flex items-center justify-center shadow">
                    <Download className="mr-2" size={16} /> Descargar Factura (TXT)
                  </button>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition text-sm flex items-center justify-center shadow">
                    <ExternalLink className="mr-2" size={16} /> Enviar por WhatsApp
                  </a>
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