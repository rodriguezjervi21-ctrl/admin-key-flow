import { useEffect, useRef } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

const HOSTED_BUTTON_ID = "XMHK6WZ7SCXQL";

const PaypalButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (renderedRef.current) return;

    const tryRender = () => {
      if (!containerRef.current) return false;
      if (!window.paypal || !window.paypal.HostedButtons) return false;
      try {
        containerRef.current.innerHTML = "";
        window.paypal
          .HostedButtons({ hostedButtonId: HOSTED_BUTTON_ID })
          .render(containerRef.current);
        renderedRef.current = true;
        return true;
      } catch (e) {
        console.error("PayPal render error", e);
        return false;
      }
    };

    if (tryRender()) return;

    const interval = setInterval(() => {
      if (tryRender()) clearInterval(interval);
    }, 250);

    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-3 min-h-[55px]">
      <div ref={containerRef} id={`paypal-container-${HOSTED_BUTTON_ID}`} />
    </div>
  );
};

export default PaypalButton;