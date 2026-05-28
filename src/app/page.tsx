export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-body)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-blue-100 bg-white/80 backdrop-blur sticky top-0 z-10">
        <span style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-blue-700 tracking-widest">
          DataVoice
        </span>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            📅 Réserver un créneau →
          </a>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20DataVoice%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-4">Business Intelligence · Langage Naturel</p>
        <h1 style={{ fontFamily: "var(--font-display)" }} className="text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-6">
          Posez une question.<br />Obtenez un insight.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          DataVoice transforme vos données brutes en réponses claires — sans SQL, sans dashboards complexes. Parlez à vos données comme à un analyste.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-blue-700 transition shadow-lg">
            📅 Réserver un créneau →
          </a>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20DataVoice%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-blue-700 transition shadow-lg" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </section>

      {/* Conversation Mockup */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-blue-600 px-6 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-300 opacity-60" />
            <div className="w-3 h-3 rounded-full bg-blue-300 opacity-60" />
            <div className="w-3 h-3 rounded-full bg-blue-300 opacity-60" />
            <span className="ml-2 text-white text-sm font-medium">DataVoice — Console analytique</span>
          </div>
          <div className="p-6 space-y-5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-sm text-sm">
                Quel était notre CA par région en Q2 ?
              </div>
            </div>
            {/* AI response */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-xs">DV</div>
              <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-5 py-4 max-w-md text-sm text-slate-700 space-y-3">
                <p className="font-semibold text-blue-800">Voici le CA par région — T2 2024</p>
                {/* Chart mockup */}
                <div className="space-y-2">
                  {[["Île-de-France", 78, "1.24M€"], ["Auvergne-Rhône-Alpes", 55, "0.87M€"], ["PACA", 40, "0.63M€"], ["Occitanie", 28, "0.44M€"]].map(([region, pct, val]) => (
                    <div key={region as string}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{region}</span><span className="font-semibold text-blue-700">{val}</span>
                      </div>
                      <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 pt-1">
                  L&rsquo;Île-de-France représente 39% du CA total. Croissance +12% vs T2 2023.
                </p>
              </div>
            </div>
            {/* SQL badge */}
            <div className="flex gap-2 items-center text-xs text-slate-400 pl-11">
              <span className="bg-slate-100 rounded px-2 py-1 font-mono">SQL généré automatiquement</span>
              <span className="bg-slate-100 rounded px-2 py-1">20+ sources connectées</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-blue-900 text-center mb-12">
          L&rsquo;intelligence de vos données, enfin accessible
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "💬", title: "Langage naturel", desc: "Posez vos questions comme à un collègue. DataVoice comprend le contexte et l'intention, pas seulement les mots-clés." },
            { icon: "⚡", title: "SQL auto-généré", desc: "Chaque question génère une requête SQL optimisée, exécutée en temps réel. Auditez, modifiez, réutilisez." },
            { icon: "🔗", title: "20+ sources de données", desc: "PostgreSQL, BigQuery, Snowflake, Salesforce, HubSpot, Google Analytics — connecté en quelques clics." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)" }} className="font-bold text-blue-900 text-lg mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center px-6">
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-white mb-4">
          Prêt à interroger vos données ?
        </h2>
        <p className="text-blue-100 mb-8 max-w-md mx-auto">Déployez DataVoice sur votre infrastructure en moins d&rsquo;une journée.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow">
            📅 Réserver un créneau →
          </a>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20DataVoice%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-slate-400 text-sm bg-white border-t border-blue-50">
        <p>&copy; 2025 DataVoice — Un produit Wikolabs</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs text-slate-400">
          <a href="mailto:team@wikolabs.com" className="hover:text-slate-600 transition-colors">team@wikolabs.com</a>
          <span>·</span>
          <a href="tel:+261386626100" className="hover:text-slate-600 transition-colors">+261 38 66 261 00</a>
          <span>·</span>
          <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Prendre RDV</a>
        </div>
      </footer>
    </main>
  );
}
