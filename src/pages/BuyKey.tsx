import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { ArrowLeft, Check, Clock, Loader2, AlertTriangle, Upload, Mail, ExternalLink, ShieldCheck, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PlanId = "1d" | "7d" | "30d";
type Plan = { id: PlanId; label: string; price: number; tag?: string };

const PLANS: Plan[] = [
  { id: "1d", label: "1 Día", price: 4 },
  { id: "7d", label: "7 Días", price: 7 },
  { id: "30d", label: "30 Días", price: 15, tag: "Mejor valor" },
];

const PAYPAL_URL = "https://www.paypal.me/ModifaxffLopez";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Step = "select" | "warning" | "upload" | "submitting" | "status";
type OrderStatus = "PENDING" | "AI_REJECTED" | "APPROVED" | "REJECTED";

const BuyKey = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Plan>(PLANS[0]);
  const [step, setStep] = useState<Step>("select");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [statusData, setStatusData] = useState<any>(null);
  const pollRef = useRef<number | null>(null);

  const stopPolling = () => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => () => stopPolling(), []);

  const startPolling = (id: string) => {
    stopPolling();
    const tick = async () => {
      try {
        const url = `https://snwuzldwstggcnlhiifi.supabase.co/functions/v1/get-order-status?id=${encodeURIComponent(id)}`;
        const r = await fetch(url, {
          headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string },
        });
        if (!r.ok) return;
        const data = await r.json();
        setStatus(data.status);
        setStatusData(data);
        if (data.status === "APPROVED" || data.status === "REJECTED" || data.status === "AI_REJECTED") {
          stopPolling();
        }
      } catch (e) {
        console.error(e);
      }
    };
    tick();
    pollRef.current = window.setInterval(tick, 5000);
  };

  const handleConfirmPayment = () => {
    setError("");
    setStep("upload");
  };

  const handleSubmit = async () => {
    setError("");
    if (!EMAIL_RE.test(email)) {
      setError("Ingresa un correo válido.");
      return;
    }
    if (!file) {
      setError("Sube la captura del comprobante.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen es demasiado grande (máx 5MB).");
      return;
    }

    setStep("submitting");
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("payment-receipts").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (up.error) throw up.error;

      const { data: pub } = supabase.storage.from("payment-receipts").getPublicUrl(path);
      const receiptUrl = pub.publicUrl;

      const { data, error: invErr } = await supabase.functions.invoke("submit-payment-proof", {
        body: { email: email.trim().toLowerCase(), planId: selected.id, receiptUrl },
      });
      if (invErr) throw invErr;
      if (!data?.orderId) throw new Error(data?.error || "Error al enviar");

      setOrderId(data.orderId);
      setStatus(data.status);
      setStep("status");

      if (data.status === "AI_REJECTED") {
        setStatusData({ rejection_reason: data.reason });
      } else {
        startPolling(data.orderId);
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Error al enviar comprobante.");
      setStep("upload");
    }
  };

  const resetForRetry = () => {
    setOrderId(null);
    setStatus(null);
    setStatusData(null);
    setFile(null);
    setError("");
    stopPolling();
    setStep("upload");
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
              Pago vía PayPal · Verificación con IA
            </p>
          </div>

          {step === "select" && (
            <>
              <div className="grid grid-cols-3 gap-2 mb-5">
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
                        <span className="absolute -top-2 left-1 text-[7px] font-bold bg-emerald-500 text-background px-1 py-0.5 rounded uppercase">
                          {opt.tag}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-2 h-2 text-background" />
                        </div>
                      )}
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] font-semibold text-foreground">{opt.label}</span>
                      </div>
                      <div className="text-base font-bold text-foreground">${opt.price}</div>
                      <div className="text-[8px] text-muted-foreground uppercase">USD</div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep("warning")}
                className="w-full bg-foreground text-background font-semibold py-3 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Continuar — ${selected.price} USD
              </button>
            </>
          )}

          {step === "warning" && (
            <>
              <div className="bg-amber-500/10 border border-amber-500/40 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    Debes realizar el pago en PayPal y tomar captura del envío. Si no envías comprobante válido, el pedido será anulado y no recibirás tu key.
                  </p>
                </div>
              </div>
              <div className="bg-secondary/30 border border-border/40 rounded-lg p-3 mb-4 text-center">
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Monto exacto</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">${selected.price} USD</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Plan {selected.label}</p>
              </div>
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0070ba] text-white font-semibold py-3 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-2"
              >
                <ExternalLink className="w-4 h-4" /> Ir a PayPal
              </a>
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-foreground text-background font-semibold py-3 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Ya pagué — Subir comprobante
              </button>
            </>
          )}

          {step === "upload" && (
            <>
              <p className="text-[11px] text-muted-foreground mb-3">
                Plan: <span className="text-foreground font-semibold">{selected.label} — ${selected.price} USD</span>
              </p>

              <div className="mb-3">
                <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                  Tu correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                  Comprobante de PayPal
                </label>
                <label className="flex flex-col items-center gap-2 bg-secondary/40 border border-dashed border-border/60 rounded-lg p-4 cursor-pointer hover:border-border transition-all">
                  <Upload className="w-5 h-5 text-muted-foreground/70" />
                  <span className="text-xs text-muted-foreground text-center">
                    {file ? file.name : "Toca para subir captura (JPG/PNG, máx 5MB)"}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
              </div>

              {error && (
                <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 mb-3">
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-foreground text-background font-semibold py-3 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Enviar comprobante
              </button>
            </>
          )}

          {step === "submitting" && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-foreground" />
              <p className="text-sm text-muted-foreground">Subiendo y validando con IA...</p>
            </div>
          )}

          {step === "status" && (
            <div className="text-center py-4">
              {status === "PENDING" && (
                <>
                  <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-amber-400" />
                  <h2 className="text-base font-bold text-foreground mb-1">Comprobante enviado</h2>
                  <p className="text-xs text-muted-foreground mb-4">
                    Tu pago fue validado por la IA y enviado al administrador. Recibirás tu key por correo cuando sea aprobado.
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mb-3 font-mono break-all">ID: {orderId}</p>
                </>
              )}
              {status === "AI_REJECTED" && (
                <>
                  <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-destructive" />
                  <h2 className="text-base font-bold text-foreground mb-1">Comprobante rechazado</h2>
                  <p className="text-xs text-muted-foreground mb-2">{statusData?.rejection_reason || "No pasó la verificación automática."}</p>
                  <p className="text-[11px] text-muted-foreground mb-4">Verifica el monto, el receptor y vuelve a intentar.</p>
                  <button onClick={resetForRetry} className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm">
                    Reenviar comprobante
                  </button>
                </>
              )}
              {status === "REJECTED" && (
                <>
                  <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-destructive" />
                  <h2 className="text-base font-bold text-foreground mb-1">Pago rechazado</h2>
                  <p className="text-xs text-muted-foreground mb-4">{statusData?.rejection_reason || "El administrador rechazó tu pago."}</p>
                  <button onClick={resetForRetry} className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm">
                    Reenviar comprobante
                  </button>
                </>
              )}
              {status === "APPROVED" && (
                <>
                  <KeyRound className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                  <h2 className="text-base font-bold text-foreground mb-1">Pago aprobado</h2>
                  <p className="text-xs text-muted-foreground mb-3">Tu key fue enviada a tu correo electrónico.</p>
                  {statusData?.assigned_key && (
                    <div className="bg-secondary/40 border border-border/60 rounded-lg p-3 font-mono text-sm text-foreground break-all mb-4">
                      {statusData.assigned_key}
                    </div>
                  )}
                  <button onClick={() => navigate("/")} className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm">
                    Ir al login
                  </button>
                </>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-muted-foreground/70">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Validación con IA · Entrega automática por correo
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyKey;
