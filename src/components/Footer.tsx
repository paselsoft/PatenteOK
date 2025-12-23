
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appVersion = "2.2.0"; // Idealmente letto da package.json o env

  return (
    // Aggiunto pb-32 per compensare l'altezza del bottone fisso in basso e l'area sicura
    <footer className="w-full pt-8 pb-32 mt-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center transition-colors">
      <div className="max-w-2xl mx-auto px-4 flex flex-col gap-4">

        {/* Links (Placeholder per futuro routing) */}
        <div className="flex justify-center gap-6 text-xs font-medium text-slate-500">
          <button className="hover:text-primary transition-colors cursor-pointer" onClick={() => alert("Pagina Privacy Policy")}>Privacy</button>
          <button className="hover:text-primary transition-colors cursor-pointer" onClick={() => alert("Pagina Termini di Servizio")}>Termini</button>
          <button className="hover:text-primary transition-colors cursor-pointer" onClick={() => alert("Pagina Credits")}>Credits</button>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-slate-400">
            © {currentYear} PatenteOK. Tutti i diritti riservati.
          </p>
          <p className="text-[10px] text-slate-300 font-mono">
            v{appVersion}-beta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
