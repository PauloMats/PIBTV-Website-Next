"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastRecord = ToastInput & {
  id: number;
};

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "default";
};

type ConfirmState = ConfirmOptions & {
  resolve: (value: boolean) => void;
};

type FeedbackContextValue = {
  toast: (input: ToastInput) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

function getToastAccent(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return {
        icon: CheckCircle2,
        iconClassName: "text-emerald-300",
        borderClassName: "border-emerald-500/20",
        bgClassName: "bg-emerald-500/10",
      };
    case "error":
      return {
        icon: AlertCircle,
        iconClassName: "text-red-300",
        borderClassName: "border-red-500/20",
        bgClassName: "bg-red-500/10",
      };
    default:
      return {
        icon: LoaderCircle,
        iconClassName: "text-slate-200",
        borderClassName: "border-white/10",
        bgClassName: "bg-white/[0.06]",
      };
  }
}

export function FeedbackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const idRef = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = ++idRef.current;
      const record: ToastRecord = {
        id,
        variant: input.variant ?? "info",
        durationMs: input.durationMs ?? 4000,
        ...input,
      };

      setToasts((current) => [...current, record]);

      window.setTimeout(() => {
        dismissToast(id);
      }, record.durationMs);
    },
    [dismissToast],
  );

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({
        resolve,
        confirmLabel: "Confirmar",
        cancelLabel: "Cancelar",
        tone: "default",
        ...options,
      });
    });
  }, []);

  useEffect(() => {
    if (!confirmState) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        confirmState.resolve(false);
        setConfirmState(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [confirmState]);

  const value = useMemo(
    () => ({
      toast,
      confirm,
    }),
    [confirm, toast],
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-3 md:left-auto md:right-6 md:top-6 md:bottom-auto md:w-full md:max-w-sm">
        {toasts.map((item) => {
          const accent = getToastAccent(item.variant ?? "info");
          const Icon = accent.icon;

          return (
            <div
              key={item.id}
              className={`pointer-events-auto rounded-[1.5rem] border px-4 py-4 shadow-2xl backdrop-blur ${accent.borderClassName} ${accent.bgClassName}`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={`mt-0.5 h-5 w-5 ${
                    item.variant === "info" ? "animate-spin" : ""
                  } ${accent.iconClassName}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  {item.description ? (
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  onClick={() => dismissToast(item.id)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {confirmState ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0b111a] p-6 shadow-2xl md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Confirmação
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {confirmState.title}
            </h2>
            {confirmState.description ? (
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {confirmState.description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
                onClick={() => {
                  confirmState.resolve(false);
                  setConfirmState(null);
                }}
              >
                {confirmState.cancelLabel}
              </button>
              <button
                type="button"
                className={`rounded-full px-5 py-3 text-sm font-semibold text-white transition ${
                  confirmState.tone === "danger"
                    ? "bg-red-700 hover:bg-red-600"
                    : "bg-brand-red hover:bg-brand-red-strong"
                }`}
                onClick={() => {
                  confirmState.resolve(true);
                  setConfirmState(null);
                }}
              >
                {confirmState.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </FeedbackContext.Provider>
  );
}

export function useToast() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de FeedbackProvider.");
  }

  return context.toast;
}

export function useConfirm() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useConfirm deve ser usado dentro de FeedbackProvider.");
  }

  return context.confirm;
}
