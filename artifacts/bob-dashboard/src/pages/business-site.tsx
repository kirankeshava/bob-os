import { useRoute } from "wouter";
import { useGetBusinessSitePublic, getGetBusinessSitePublicQueryKey, useGenerateBusinessSite } from "@workspace/api-client-react";
import { useState, useEffect } from "react";
import { Loader2, Mail, ArrowRight, Check, Star, Zap, Globe, ExternalLink } from "lucide-react";
import { SignupModal } from "../components/signup-modal";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 99, g: 102, b: 241 };
}

export default function BusinessSitePage() {
  const [, params] = useRoute("/sites/:businessId");
  const businessId = params?.businessId ? parseInt(params.businessId) : 0;

  const { data, isLoading, isError, refetch } = useGetBusinessSitePublic(businessId, {
    query: { enabled: !!businessId, queryKey: getGetBusinessSitePublicQueryKey(businessId) },
  });

  const generateSite = useGenerateBusinessSite();
  const [isGenerating, setIsGenerating] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const site = data?.site;
  const business = data?.business;

  const accent = site?.accentColor ?? "#6366f1";
  const rgb = hexToRgb(accent);
  const accentRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  const handleGenerate = () => {
    setIsGenerating(true);
    generateSite.mutate({ businessId }, {
      onSuccess: () => { setIsGenerating(false); refetch(); },
      onError: () => setIsGenerating(false),
    });
  };

  const openSignup = (planName?: string) => {
    setSelectedPlan(planName);
    setSignupOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: accent }} />
      </div>
    );
  }

  if (isError || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Business not found.</p>
        </div>
      </div>
    );
  }

  // If site hasn't been generated yet, show a generate prompt (admin only view)
  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center space-y-4 p-8">
          <Globe className="h-12 w-12 text-indigo-400 mx-auto" />
          <h2 className="text-white text-2xl font-bold">{business.name}</h2>
          <p className="text-slate-400">This business website hasn't been generated yet.</p>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors"
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {isGenerating ? "Generating site..." : "Generate Website"}
          </button>
        </div>
      </div>
    );
  }

  const services = (site.services as { title: string; description: string; icon?: string }[]) ?? [];
  const pricing = (site.pricing as { name: string; price: string; description: string; features: string[] }[]) ?? [];
  const howItWorks = (site.howItWorks as { step: number; title: string; description: string }[]) ?? [];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        planName={selectedPlan}
        businessId={businessId}
        accentColor={accent}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight" style={{ color: accent }}>{business.name.split(" ").slice(0,2).join(" ")}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
            {services.length > 0 && <a href="#services" className="hover:text-gray-900 transition-colors">Services</a>}
            {howItWorks.length > 0 && <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>}
            {pricing.length > 0 && <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>}
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
          <button
            onClick={() => openSignup()}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            <Mail className="h-4 w-4" /> Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgb(${accentRgb}) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgb(${accentRgb}) 0%, transparent 50%)` }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 border"
            style={{ color: accent, borderColor: `rgba(${accentRgb}, 0.25)`, backgroundColor: `rgba(${accentRgb}, 0.05)` }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            {site.tagline ?? business.platform}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
            {site.heroTitle ?? business.name}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            {site.heroSubtitle ?? business.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openSignup()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: accent, boxShadow: `0 10px 30px rgba(${accentRgb}, 0.35)` }}
            >
              Start Today <ArrowRight className="h-5 w-5" />
            </button>
            {pricing.length > 0 && (
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border-2 text-gray-700 hover:border-gray-300 transition-colors"
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
              >
                See Pricing
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">What We Offer</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">Everything you need, handled by our expert team.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                    style={{ backgroundColor: `rgba(${accentRgb}, 0.1)` }}
                  >
                    {service.icon ?? "✨"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {howItWorks.length > 0 && (
        <section id="how-it-works" className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-500 text-lg">Simple, fast, and effective.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gray-200" />
              <div className="grid md:grid-cols-3 gap-8">
                {howItWorks.map((step) => (
                  <div key={step.step} className="text-center relative">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-black mx-auto mb-6 shadow-lg"
                      style={{ backgroundColor: accent, boxShadow: `0 4px 15px rgba(${accentRgb}, 0.3)` }}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {pricing.length > 0 && (
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Simple Pricing</h2>
              <p className="text-gray-500 text-lg">No hidden fees. Cancel anytime.</p>
            </div>
            <div className={`grid gap-8 ${pricing.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} max-w-3xl mx-auto`}>
              {pricing.map((plan, i) => {
                const isPro = i === 1;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl p-8 relative ${isPro ? "text-white shadow-2xl scale-105" : "bg-white border border-gray-200"}`}
                    style={isPro ? { backgroundColor: accent } : {}}
                  >
                    {isPro && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3" /> Most Popular
                      </div>
                    )}
                    <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${isPro ? "text-white/70" : "text-gray-400"}`}>{plan.name}</p>
                    <p className={`text-5xl font-black mb-2 ${isPro ? "text-white" : "text-gray-900"}`}>{plan.price}</p>
                    <p className={`text-sm mb-6 ${isPro ? "text-white/70" : "text-gray-400"}`}>{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${isPro ? "text-white/80" : "text-green-500"}`} />
                          <span className={isPro ? "text-white/90" : "text-gray-600"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openSignup(plan.name)}
                      className={`block w-full text-center py-3 rounded-xl font-bold transition-all hover:opacity-90 ${
                        isPro ? "bg-white text-gray-900" : "text-white"
                      }`}
                      style={!isPro ? { backgroundColor: accent } : {}}
                    >
                      Get Started
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact / CTA */}
      <section id="contact" className="py-24" style={{ backgroundColor: accent }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-white/80 text-xl mb-8">Fill out our quick form and we'll have you set up within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => openSignup()}
              className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
              style={{ color: accent }}
            >
              <ArrowRight className="h-5 w-5" /> Get Started Now
            </button>
            {site.contactEmail && (
              <a
                href={`mailto:${site.contactEmail}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <Mail className="h-4 w-4" /> Or email us: {site.contactEmail}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">{business.name}</p>
            <p className="text-gray-500 text-sm mt-0.5">{site.tagline}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <span>Powered by</span>
            <span className="font-bold" style={{ color: accent }}>Bob AI</span>
          </div>
        </div>
      </footer>

      {/* Admin regenerate button (small, bottom right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-white text-xs rounded-lg shadow-lg backdrop-blur transition-colors"
          title="Regenerate site content"
        >
          {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
          {isGenerating ? "Regenerating..." : "Regenerate"}
        </button>
      </div>
    </div>
  );
}
