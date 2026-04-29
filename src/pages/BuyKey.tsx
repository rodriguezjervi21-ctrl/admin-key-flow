import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { ArrowLeft, Check, Clock, Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PlanId = "7d" | "30d";
type Plan = { id: PlanId; label: string; price: number; duration: string; tag?: string };

const PLANS: Plan[] = [
  { id: "7d", label: "7 días", price: 200, duration: "7 días" },
  { id: "30d", label: "30 días", price: 400, duration: "30 días", tag: "Mejor valor" },
];

const BuyKey = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Plan>(PLANS[0]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setError("");
    if (!name.trim()) {
      setError("Ingresa tu nombre antes de continuar.");
      return;
    }
    setLoading(true);
    try {
      sessionStorage.setItem(
        "pending_purchase",
        JSON.stringify({ planId: selected.id, name: name.trim() }),
      );

      const { data, error: invokeErr } = await supabase.functions.invoke("square-create-checkout", {
        body: {
          planId: selected.id,
          customerName: name.trim(),
          origin: window.location.origin,
        },
      });

      if (invokeErr) throw invokeErr;
      if (!data?.url) throw new Error(data?.error ?? "No se pudo iniciar el pago");

      // Save the orderId so /success can verify it
      if (data.orderId) {
        sessionStorage.setItem(
          "pending_purchase",
          JSON.stringify({ planId: selected.id, name: name.trim(), orderId: data.orderId }),
        );
      }

      window.location.href = data.url;
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Error iniciando el pago. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <VideoBackground />
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al login
        </button>

        <div className="glass-card p-5 glow-border">
          <div className="mb-5 pb-3 border-b border-border/30">
            <h1 className="text-base font-bold text-foreground">Comprar Key</h1>
            <p className="text-[10px] text-muted-foreground/70 tracking-widest uppercase mt-0.5">
              Pago seguro con Square
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {PLANS.map((opt) => {
              const isActive = selected.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt)}
                  className={`relative p-3 rounded-lg border transition-all text-left ${
                    isActive
                      ? "bg-foreground/10 border-foreground/60"
                      : "bg-secondary/40 border-border/40 hover:border-border"
                  }`}
                >
                  {opt.tag && (
                    <span className="absolute -top-2 left-2 text-[8px] font-bold bg-emerald-500 text-background px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {opt.tag}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-foreground">{opt.label}</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">L {opt.price}</div>
                  <div className="text-[9px] text-muted-foreground uppercase tracking-wider">HNL</div>
                </button>
              );
            })}
          </div>

          <div className="mb-4">
            <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
              Tu nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Para registrar tu key"
              className="w-full bg-secondary/40 border border-border/50 rounded-lg px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all"
            />
          </div>

          <div className="bg-secondary/30 border border-border/40 rounded-lg p-3 text-center mb-3">
            <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Total a pagar</p>
            <p className="text-2xl font-bold text-foreground mt-0.5">L {selected.price} HNL</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Key {selected.label}</p>
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 mb-3">
              {error}
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-foreground text-background font-semibold py-3 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Redirigiendo...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" /> Pagar ${selected.price} con Square
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground/70">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Pago cifrado · Visa · Mastercard · Amex
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyKey;
