import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { CheckCircle2, Copy, Check, ArrowRight, KeyRound, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Verified = { key: string; duration: string; type: string };

const Success = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [verified, setVerified] = useState<Verified | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const verify = async () => {
    setError("");
    setLoading(true);
    try {
      const raw = sessionStorage.getItem("pending_purchase");
      const pending = raw ? JSON.parse(raw) : {};
      const planId = params.get("plan") ?? pending?.planId;
      const orderId = params.get("orderId") ?? pending?.orderId;

      if (!planId || !orderId) {
        setError("No se encontró información del pago. Si ya pagaste, contacta soporte con tu comprobante.");
        setLoading(false);
        return;
      }

      const { data, error: invokeErr } = await supabase.functions.invoke("square-verify-payment", {
        body: { orderId, planId },
      });

      if (invokeErr) throw invokeErr;
      if (data?.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (!data?.key) throw new Error("Respuesta inválida del servidor");

      setVerified({ key: data.key, duration: data.duration, type: data.type });
      sessionStorage.removeItem("pending_purchase");
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Error verificando el pago.");
    }
    setLoading(false);
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount]);

  const handleCopy = async () => {
    if (!verified) return;
    await navigator.clipboard.writeText(verified.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <VideoBackground />
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="glass-card p-6 glow-border text-center">
          {loading ? (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/40 border border-border/40 flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-foreground animate-spin" />
              </div>
              <h1 className="text-lg font-bold text-foreground mb-1">Verificando pago...</h1>
              <p className="text-xs text-muted-foreground">Confirmando con Square, esto toma unos segundos.</p>
            </>
          ) : verified ? (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>
              <h1 className="text-lg font-bold text-foreground mb-1">Pago confirmado</h1>
              <p className="text-xs text-muted-foreground mb-5">Tu key ha sido generada</p>

              <div className="bg-secondary/40 border border-border/40 rounded-lg p-4 mb-3 text-left">
                <div className="flex items-center gap-1.5 mb-2">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Tu key</span>
                </div>
                <p className="font-mono text-sm text-foreground break-all select-all">{verified.key}</p>
                <div className="flex justify-between mt-3 pt-3 border-t border-border/30 text-[10px] text-muted-foreground">
                  <span>Tipo: <span className="text-foreground font-medium">{verified.type}</span></span>
                  <span>Duración: <span className="text-foreground font-medium">{verified.duration}</span></span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-2"
              >
                {copied ? (<><Check className="w-4 h-4" /> Key copiada</>) : (<><Copy className="w-4 h-4" /> Copiar Key</>)}
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-secondary/60 border border-border/40 text-foreground font-semibold py-2.5 rounded-lg text-sm hover:bg-secondary active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Ir al login <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/15 border border-destructive/40 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="text-lg font-bold text-foreground mb-1">No se pudo verificar el pago</h1>
              <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 my-4">
                {error}
              </p>
              <button
                onClick={() => setRetryCount((c) => c + 1)}
                className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-2"
              >
                <RefreshCw className="w-4 h-4" /> Reintentar verificación
              </button>
              <button
                onClick={() => navigate("/buy")}
                className="w-full bg-secondary/60 border border-border/40 text-foreground font-semibold py-2.5 rounded-lg text-sm hover:bg-secondary active:scale-[0.98] transition-all"
              >
                Volver a comprar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
