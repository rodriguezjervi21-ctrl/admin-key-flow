import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { CheckCircle2, Copy, Check, ArrowRight, KeyRound } from "lucide-react";
import { generateKeys, type ProxyKey } from "@/lib/keys";

type Pending = {
  id: string;
  label: string;
  price: number;
  duration: string;
  durationMs: number;
};

const Success = () => {
  const navigate = useNavigate();
  const [generatedKey, setGeneratedKey] = useState<ProxyKey | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("pending_purchase");
    if (!raw) {
      setError("No se encontró información de la compra.");
      return;
    }
    const pending: Pending = JSON.parse(raw);

    (async () => {
      try {
        const type = pending.id === "perm" || pending.id === "30d" ? "Premium" : "Normal";
        const [k] = await generateKeys(1, type as ProxyKey["type"], pending.duration);
        setGeneratedKey(k);
        sessionStorage.removeItem("pending_purchase");
      } catch (e) {
        console.error(e);
        setError("Error generando tu key. Contacta al soporte.");
      }
    })();
  }, []);

  const handleCopy = async () => {
    if (!generatedKey) return;
    await navigator.clipboard.writeText(generatedKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <VideoBackground />
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="glass-card p-6 glow-border text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>

          <h1 className="text-lg font-bold text-foreground mb-1">Pago exitoso</h1>
          <p className="text-xs text-muted-foreground mb-5">Tu compra ha sido confirmada</p>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
              {error}
            </p>
          )}

          {generatedKey ? (
            <>
              <div className="bg-secondary/40 border border-border/40 rounded-lg p-4 mb-3 text-left">
                <div className="flex items-center gap-1.5 mb-2">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Tu key</span>
                </div>
                <p className="font-mono text-sm text-foreground break-all select-all">{generatedKey.key}</p>
                <div className="flex justify-between mt-3 pt-3 border-t border-border/30 text-[10px] text-muted-foreground">
                  <span>Tipo: <span className="text-foreground font-medium">{generatedKey.type}</span></span>
                  <span>Duración: <span className="text-foreground font-medium">{generatedKey.duration}</span></span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-2"
              >
                {copied ? (
                  <><Check className="w-4 h-4" /> Key copiada</>
                ) : (
                  <><Copy className="w-4 h-4" /> Copiar Key</>
                )}
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-secondary/60 border border-border/40 text-foreground font-semibold py-2.5 rounded-lg text-sm hover:bg-secondary active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Ir al login <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : !error ? (
            <div className="py-6 flex flex-col items-center gap-2">
              <span className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground">Generando tu key...</p>
            </div>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="w-full bg-secondary/60 border border-border/40 text-foreground font-semibold py-2.5 rounded-lg text-sm"
            >
              Volver al login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;