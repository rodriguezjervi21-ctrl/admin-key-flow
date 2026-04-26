import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { ArrowLeft, Check, Clock, Infinity as InfinityIcon } from "lucide-react";
import PaypalButton from "@/components/PaypalButton";

type DurationOption = {
  id: "1d" | "7d" | "30d" | "perm";
  label: string;
  price: number;
  duration: string;
  durationMs: number;
};

const OPTIONS: DurationOption[] = [
  { id: "1d", label: "1 día", price: 1, duration: "1 día", durationMs: 24 * 60 * 60 * 1000 },
  { id: "7d", label: "7 días", price: 3, duration: "7 días", durationMs: 7 * 24 * 60 * 60 * 1000 },
  { id: "30d", label: "30 días", price: 5, duration: "30 días", durationMs: 30 * 24 * 60 * 60 * 1000 },
  { id: "perm", label: "Permanente", price: 10, duration: "Permanente", durationMs: 100 * 365 * 24 * 60 * 60 * 1000 },
];

const BuyKey = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<DurationOption | null>(null);

  const handleSelect = (opt: DurationOption) => {
    setSelected(opt);
    sessionStorage.setItem("pending_purchase", JSON.stringify(opt));
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
              Selecciona la duración
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {OPTIONS.map((opt) => {
              const isActive = selected?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className={`relative p-3 rounded-lg border transition-all text-left ${
                    isActive
                      ? "bg-foreground/10 border-foreground/60"
                      : "bg-secondary/40 border-border/40 hover:border-border"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {opt.id === "perm" ? (
                      <InfinityIcon className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span className="text-xs font-semibold text-foreground">{opt.label}</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">${opt.price}</div>
                  <div className="text-[9px] text-muted-foreground uppercase tracking-wider">USD</div>
                </button>
              );
            })}
          </div>

          {selected ? (
            <div className="space-y-3">
              <div className="bg-secondary/30 border border-border/40 rounded-lg p-3 text-center">
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Total a pagar</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">${selected.price} USD</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Key {selected.label}</p>
              </div>
              <PaypalButton />
              <p className="text-[9px] text-muted-foreground/60 text-center leading-relaxed">
                Tras el pago serás redirigido para recibir tu key automáticamente.
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground/60 text-center py-4 border border-dashed border-border/40 rounded-lg">
              Selecciona una duración para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyKey;