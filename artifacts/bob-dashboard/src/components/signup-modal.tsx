import { useState } from "react";
import { X, Check, Loader2, ArrowRight, CreditCard, DollarSign, Copy, ArrowLeft } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  businessId?: number;
  accentColor?: string;
}

interface FormState {
  fullName: string;
  email: string;
  businessName: string;
  platforms: string[];
  googleListingUrl: string;
  yelpListingUrl: string;
}

type PaymentMethodType = "stripe" | "paypal" | "zelle";
type ModalStep = "details" | "payment" | "submitted" | "zelle-info";

const initialForm: FormState = {
  fullName: "",
  email: "",
  businessName: "",
  platforms: [],
  googleListingUrl: "",
  yelpListingUrl: "",
};

export function SignupModal({ isOpen, onClose, planName, businessId, accentColor = "#6366f1" }: SignupModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState<ModalStep>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zelleInfo, setZelleInfo] = useState<{ email: string; phone: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const togglePlatform = (platform: string) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setForm(initialForm);
      setStep("details");
      setError(null);
      setZelleInfo(null);
      setCopiedField(null);
      onClose();
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.email.trim() || !form.businessName.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.platforms.length === 0) {
      setError("Please select at least one platform to monitor.");
      return;
    }
    if (form.platforms.includes("Google") && !form.googleListingUrl.trim()) {
      setError("Please enter your Google Business listing URL.");
      return;
    }
    if (form.platforms.includes("Yelp") && !form.yelpListingUrl.trim()) {
      setError("Please enter your Yelp business listing URL.");
      return;
    }

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

      const response = await fetch(`${import.meta.env.BASE_URL}api/businesses/${businessId}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          businessName: form.businessName.trim(),
          platforms: form.platforms,
          googleListingUrl: form.googleListingUrl.trim() || undefined,
          yelpListingUrl: form.yelpListingUrl.trim() || undefined,
          planName: planName ?? undefined,
          paymentMethod: method,
        }),
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
            if (zelleRes.ok) {
              const info = await zelleRes.json();
              setZelleInfo(info);
            }
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
                Thanks, <strong>{form.fullName.split(" ")[0]}</strong>! We've received your information and will be in touch shortly.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Check your inbox at <strong>{form.email}</strong> for a welcome email with next steps.
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
                  After sending, we'll verify your payment and activate your account. You'll receive a confirmation email at <strong>{form.email}</strong>.
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
                <h2 className="text-2xl font-black text-gray-900 mb-1">Get Started{planName ? ` — ${planName}` : ""}</h2>
                <p className="text-gray-500 text-sm">
                  Fill in the details below and we'll get your AI Review Autopilot set up.
                </p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    style={{ ["--tw-ring-color" as string]: accentColor }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jane@yourbusiness.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={e => setForm(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Sunshine Bakery"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Platforms to Monitor <span className="text-red-500">*</span></label>
                  <div className="flex gap-3">
                    {["Google", "Yelp"].map(platform => {
                      const selected = form.platforms.includes(platform);
                      return (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => togglePlatform(platform)}
                          className={`flex-1 py-2.5 px-4 rounded-lg border-2 font-semibold text-sm transition-all ${
                            selected ? "text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                          style={selected ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                        >
                          {selected && <Check className="inline h-3.5 w-3.5 mr-1.5" />}
                          {platform} Reviews
                        </button>
                      );
                    })}
                  </div>
                </div>

                {form.platforms.includes("Google") && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Google Business Listing URL <span className="text-red-500">*</span></label>
                    <input
                      type="url"
                      value={form.googleListingUrl}
                      onChange={e => setForm(prev => ({ ...prev, googleListingUrl: e.target.value }))}
                      placeholder="https://maps.google.com/maps?..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                      required
                    />
                  </div>
                )}

                {form.platforms.includes("Yelp") && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Yelp Business Listing URL <span className="text-red-500">*</span></label>
                    <input
                      type="url"
                      value={form.yelpListingUrl}
                      onChange={e => setForm(prev => ({ ...prev, yelpListingUrl: e.target.value }))}
                      placeholder="https://www.yelp.com/biz/..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                      required
                    />
                  </div>
                )}

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
