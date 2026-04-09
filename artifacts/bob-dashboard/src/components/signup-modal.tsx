import { useState } from "react";
import { X, Check, Loader2, ArrowRight } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
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
      setSubmitted(false);
      setError(null);
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          {submitted ? (
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
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-900 mb-1">Get Started{planName ? ` — ${planName}` : ""}</h2>
                <p className="text-gray-500 text-sm">
                  Fill in the details below and we'll get your AI Review Autopilot set up.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
                  style={{ backgroundColor: accentColor }}
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    <>Get Started <ArrowRight className="h-4 w-4" /></>
                  )}
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
