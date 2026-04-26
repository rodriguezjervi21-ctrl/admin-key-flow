import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    paypal?: any;
  }
}

interface Props {
  amount: number;
  description: string;
  onSuccess: () => void;
}

let sdkLoadPromise: Promise<void> | null = null;

const loadPaypalSdk = (clientId: string): Promise<void> => {
  if (sdkLoadPromise) return sdkLoadPromise;
  sdkLoadPromise = new Promise((resolve, reject) => {
    if (window.paypal && window.paypal.Buttons) return resolve();
    const existing = document.querySelector('script[data-paypal-sdk="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("PayPal SDK failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&disable-funding=venmo,paylater`;
    script.async = true;
    script.dataset.paypalSdk = "true";
    script.onload = () => resolve();
    script.onerror = () => {
      sdkLoadPromise = null;
      reject(new Error("PayPal SDK failed to load"));
    };
    document.body.appendChild(script);
  });
  return sdkLoadPromise;
};

const PaypalButton = ({ amount, description, onSuccess }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    let buttonsInstance: any = null;

    const init = async () => {
      try {
        setStatus("loading");
        const { data, error } = await supabase.functions.invoke("paypal-config");
        if (error) throw error;
        const clientId = (data as any)?.clientId;
        if (!clientId) throw new Error("PayPal Client ID no configurado");

        await loadPaypalSdk(clientId);
        if (cancelled || !containerRef.current || !window.paypal) return;
        containerRef.current.innerHTML = "";

        buttonsInstance = window.paypal.Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 45,
          },
          createOrder: (_data: any, actions: any) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: description.slice(0, 127),
                  amount: {
                    currency_code: "USD",
                    value: amount.toFixed(2),
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
                brand_name: "Verified Proxy",
              },
            }),
          onApprove: async (_data: any, actions: any) => {
            try {
              await actions.order.capture();
            } catch (e) {
              console.error("Capture error", e);
            }
            onSuccess();
          },
          onError: (err: any) => {
            console.error("PayPal onError", err);
            setErrorMsg("Hubo un problema con PayPal. Intenta de nuevo o usa el botón de respaldo.");
          },
          onCancel: () => {
            console.log("Pago cancelado");
          },
        });

        if (!buttonsInstance.isEligible || buttonsInstance.isEligible()) {
          await buttonsInstance.render(containerRef.current);
          if (!cancelled) setStatus("ready");
        } else {
          setErrorMsg("PayPal no está disponible en este navegador.");
          setStatus("error");
        }
      } catch (e: any) {
        console.error("PayPal init error", e);
        if (!cancelled) {
          setErrorMsg(e?.message || "No se pudo cargar PayPal");
          setStatus("error");
        }
      }
    };

    init();

    return () => {
      cancelled = true;
      try {
        buttonsInstance?.close?.();
      } catch {}
    };
  }, [amount, description, onSuccess]);

  return (
    <div className="space-y-2">
      <div className="bg-white rounded-lg p-3 min-h-[60px] paypal-host relative">
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 text-xs text-gray-700 py-3">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Cargando PayPal...
          </div>
        )}
        <div ref={containerRef} />
      </div>
      {status === "error" && (
        <p className="text-[10px] text-red-300 text-center bg-red-500/10 border border-red-500/30 rounded p-2">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default PaypalButton;
