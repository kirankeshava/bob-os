import { useState } from "react";
import { X, Check, Loader2, ArrowRight, CreditCard, DollarSign, Copy, ArrowLeft } from "lucide-react";
import { getOnboardingConfig, type OnboardingField } from "../lib/onboarding-configs";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  businessId?: number;
  accentColor?: string;
}

type PaymentMethodType = "stripe" | "paypal" | "zelle";
type ModalStep = "details" | "payment" | "submitted" | "zelle-info";

export function SignupModal({ isOpen, onClose, planName, businessId, accentColor = "#6366f1" }: SignupModalProps) {
  const [formData, setFormData] = useState<Record<string, string | string[]>>({
    fullName: "",
    email: "",
    businessName: "",
  });
  const [step, setStep] = useState<ModalStep>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zelleInfo, setZelleInfo] = useState<{ email: string; phone: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const config = businessId ? getOnboardingConfig(businessId) : null;

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ fullName: "", email: "", businessName: "" });
      setStep("details");
      setError(null);
      setZelleInfo(null);
      setCopiedField(null);
      onClose();
    }
  };

  const setField = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleCheckbox = (key: string, value: string) => {
    const current = (formData[key] as string[] | undefined) ?? [];
    setField(key, current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  };

  const isFieldVisible = (field: OnboardingField): boolean => {
    if (!field.conditionalOn) return true;
    const parentVal = formData[field.conditionalOn.field];
    if (Array.isArray(parentVal)) return parentVal.includes(field.conditionalOn.value);
    return parentVal === field.conditionalOn.value;
  };

  const validateDetails = (): string | null => {
    const name = (formData.fullName as string || "").trim();
    const email = (formData.email as string || "").trim();
    const biz = (formData.businessName as string || "").trim();
    if (!name || !email || !biz) return "Please fill in all required fields.";

    if (config) {
      for (const field of config.fields) {
        if (!field.required || !isFieldVisible(field)) continue;
        const val = formData[field.key];
        if (field.type === "checkbox-group") {
          if (!Array.isArray(val) || val.length === 0) return `Please select at least one option for "${field.label}".`;
        } else {
          if (!val || (typeof val === "string" && !val.trim())) return `"${field.label}" is required.`;
        }
      }
    }
    return null;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validateDetails();
    if (validationError) { setError(validationError); return; }
    setStep("payment");
  };

  const handlePaymentSelect = async (method: PaymentMethodType) => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (businessId == null) {
        setError("Unable to submit — business context is missing. Please refresh and try again.");
        setIsSubmitting(false);
        return;
      }

      const { fullName, email, businessName, ...rest } = formData;
      const metadata: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(rest)) {
        if (v !== undefined && v !== "" && (!Array.isArray(v) || v.length > 0)) metadata[k] = v;
      }

      const body: Record<string, unknown> = {
        fullName: (fullName as string).trim(),
        email: (email as string).trim(),
        businessName: (businessName as string).trim(),
        planName: planName ?? undefined,
        paymentMethod: method,
        metadata,
      };

      if (metadata.platforms) body.platforms = metadata.platforms;
      if (metadata.googleListingUrl) body.googleListingUrl = metadata.googleListingUrl;
      if (metadata.yelpListingUrl) body.yelpListingUrl = metadata.yelpListingUrl;

      const response = await fetch(`${import.meta.env.BASE_URL}api/businesses/${businessId}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      const result = await response.json() as {
        paymentData?: {
          billingPortalUrl?: string;
          paypalApprovalUrl?: string;
          zelleContactInfo?: { email: string; phone: string };
        };
      };

      if (method === "stripe" && result.paymentData?.billingPortalUrl) {
        window.open(result.paymentData.billingPortalUrl, "_blank");
        setStep("submitted");
      } else if (method === "paypal" && result.paymentData?.paypalApprovalUrl) {
        window.location.href = result.paymentData.paypalApprovalUrl;
      } else if (method === "zelle") {
        if (result.paymentData?.zelleContactInfo) {
          setZelleInfo(result.paymentData.zelleContactInfo);
        } else {
          try {
            const zelleRes = await fetch(`${import.meta.env.BASE_URL}api/customers/zelle/contact-info`);
            if (zelleRes.ok) setZelleInfo(await zelleRes.json());
          } catch {
            setZelleInfo({ email: "payments@example.com", phone: "(555) 123-4567" });
          }
        }
        setStep("zelle-info");
      } else {
        setStep("submitted");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const renderField = (field: OnboardingField) => {
    if (!isFieldVisible(field)) return null;

    const fieldKey = field.key;
    const val = formData[fieldKey];

    if (field.type === "checkbox-group") {
      const selected = (Array.isArray(val) ? val : []) as string[];
      return (
        <div key={fieldKey}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex flex-wrap gap-2">
            {field.options?.map(opt => {
              const isSelected = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleCheckbox(fieldKey, opt)}
                  className={`py-2 px-4 rounded-lg border-2 font-semibold text-sm transition-all ${
                    isSelected ? "text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                  style={isSelected ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                >
                  {isSelected && <Check className="inline h-3.5 w-3.5 mr-1.5" />}
                  {opt}
                </button>
              );
            })}
          </div>
          {field.helpText && <p className="text-xs text-gray-400 mt-1">{field.helpText}</p>}
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={fieldKey}>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={(val as string) ?? ""}
            onChange={e => setField(fieldKey, e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 bg-white focus:outline-none focus:ring-2 text-sm"
            required={field.required}
          >
            <option value="">Select...</option>
            {field.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {field.helpText && <p className="text-xs text-gray-400 mt-1">{field.helpText}</p>}
        </div>
      );
    }

    return (
      <div key={fieldKey}>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          value={(val as string) ?? ""}
          onChange={e => setField(fieldKey, e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
          required={field.required}
        />
        {field.helpText && <p className="text-xs text-gray-400 mt-1">{field.helpText}</p>}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          {step === "submitted" && (
            <div className="text-center py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `rgba(${hexToRgbString(accentColor)}, 0.1)` }}
              >
                <Check className="h-8 w-8" style={{ color: accentColor }} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">You're all set!</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-2">
                Thanks, <strong>{((formData.fullName as string) || "").split(" ")[0]}</strong>! We've received your information and will be in touch shortly.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Check your inbox at <strong>{formData.email as string}</strong> for a welcome email with next steps.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Close
              </button>
            </div>
          )}

          {step === "zelle-info" && (
            <div className="py-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: `rgba(${hexToRgbString(accentColor)}, 0.1)` }}
              >
                <DollarSign className="h-7 w-7" style={{ color: accentColor }} />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2 text-center">Pay with Zelle</h2>
              <p className="text-gray-500 text-sm text-center mb-6">
                Send your weekly payment of <strong>$97</strong> to the following Zelle account.
                Include your business name in the memo.
              </p>

              {zelleInfo && (
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">Zelle Email</p>
                      <p className="text-sm font-mono font-semibold text-gray-900">{zelleInfo.email}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(zelleInfo.email, "email")}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      title="Copy email"
                    >
                      {copiedField === "email" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">Zelle Phone</p>
                      <p className="text-sm font-mono font-semibold text-gray-900">{zelleInfo.phone}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(zelleInfo.phone, "phone")}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      title="Copy phone"
                    >
                      {copiedField === "phone" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6">
                <p className="text-xs text-blue-700">
                  After sending, we'll verify your payment and activate your account. You'll receive a confirmation email at <strong>{formData.email as string}</strong>.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Done
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="py-2">
              <button
                onClick={() => { setStep("details"); setError(null); }}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <h2 className="text-xl font-black text-gray-900 mb-1">Choose Payment Method</h2>
              <p className="text-gray-500 text-sm mb-6">
                Select how you'd like to pay after your 7-day free trial ends.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  disabled={isSubmitting}
                  onClick={() => handlePaymentSelect("stripe")}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-400 transition-all text-left group disabled:opacity-60"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
                    <CreditCard className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">Credit / Debit Card</p>
                    <p className="text-xs text-gray-500 mt-0.5">Secure payment via Stripe. Auto-renews weekly.</p>
                  </div>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin text-gray-400 mt-1" /> : <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500 transition-colors mt-1" />}
                </button>

                <button
                  disabled={isSubmitting}
                  onClick={() => handlePaymentSelect("paypal")}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all text-left group disabled:opacity-60"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                    <span className="text-blue-600 font-bold text-sm">PP</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">PayPal</p>
                    <p className="text-xs text-gray-500 mt-0.5">Pay with your PayPal account. Weekly subscription.</p>
                  </div>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin text-gray-400 mt-1" /> : <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors mt-1" />}
                </button>

                <button
                  disabled={isSubmitting}
                  onClick={() => handlePaymentSelect("zelle")}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-green-400 transition-all text-left group disabled:opacity-60"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">Zelle</p>
                    <p className="text-xs text-gray-500 mt-0.5">Send weekly payments manually via Zelle.</p>
                  </div>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin text-gray-400 mt-1" /> : <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-green-500 transition-colors mt-1" />}
                </button>
              </div>
            </div>
          )}

          {step === "details" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-900 mb-1">
                  Get Started{planName ? ` — ${planName}` : ""}
                </h2>
                <p className="text-gray-500 text-sm">
                  {config?.subtitle ?? "Fill in the details below and we'll get you set up."}
                </p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={(formData.fullName as string) ?? ""}
                    onChange={e => setField("fullName", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={(formData.email as string) ?? ""}
                    onChange={e => setField("email", e.target.value)}
                    placeholder="jane@yourbusiness.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {config?.businessNameLabel ?? "Business Name"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={(formData.businessName as string) ?? ""}
                    onChange={e => setField("businessName", e.target.value)}
                    placeholder={config?.businessNamePlaceholder ?? "Your Business"}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    required
                  />
                </div>

                {config?.fields.map(field => renderField(field))}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 mt-2"
                  style={{ backgroundColor: accentColor }}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function hexToRgbString(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "99, 102, 241";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
