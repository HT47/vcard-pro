"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft size={16} />
          Retour
        </Link>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black mb-6">V</div>

        <h1 className="text-3xl font-black mb-2">Politique de Confidentialité</h1>
        <p className="text-zinc-500 text-sm mb-10">Dernière mise à jour : 24 juin 2026 · <strong className="text-zinc-400">VCard Pro</strong> · hosyardigital.com</p>

        <div className="prose prose-invert max-w-none space-y-8 text-sm text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Informations collectées</h2>
            <p>VCard Pro collecte uniquement les informations nécessaires au fonctionnement du service :</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-zinc-400">
              <li><strong className="text-zinc-300">Compte</strong> : adresse email, mot de passe (hashé via Supabase Auth), nom d'utilisateur choisi.</li>
              <li><strong className="text-zinc-300">Contenu vCard</strong> : nom, poste, entreprise, téléphone, email, site web, réseaux sociaux — uniquement ceux que vous renseignez volontairement.</li>
              <li><strong className="text-zinc-300">Photos</strong> : photo de profil et de couverture uploadées par l'utilisateur.</li>
              <li><strong className="text-zinc-300">Données techniques</strong> : logs de connexion (adresse IP, navigateur/OS) via Supabase Auth.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Comment nous utilisons vos données</h2>
            <ul className="list-disc pl-6 space-y-1 text-zinc-400">
              <li>Afficher votre vCard publiquement à l'URL <code className="text-blue-400">hosyardigital.com/u/[username]</code></li>
              <li>Vous authentifier et sécuriser votre compte</li>
              <li>Générer votre QR Code et lien de partage</li>
              <li>Nous n'utilisons pas vos données à des fins publicitaires</li>
              <li>Nous ne vendons jamais vos données à des tiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. Partage de données</h2>
            <p>Vos données de vCard sont <strong className="text-white">publiquement accessibles</strong> via votre lien unique — c'est la nature même du service. Aucune autre donnée (email, mot de passe) n'est partagée publiquement.</p>
            <p className="mt-2">Nous utilisons <strong className="text-white">Supabase</strong> (base de données et authentification) hébergé en Europe.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Sécurité</h2>
            <ul className="list-disc pl-6 space-y-1 text-zinc-400">
              <li>Mots de passe hashés (bcrypt) — jamais stockés en clair</li>
              <li>Connexions HTTPS uniquement</li>
              <li>Row Level Security (RLS) activé sur Supabase</li>
              <li>Tokens JWT signés avec rotation automatique</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-zinc-400">
              <li><strong className="text-zinc-300">Accès</strong> : consulter toutes vos données depuis le dashboard</li>
              <li><strong className="text-zinc-300">Rectification</strong> : modifier vos informations à tout moment</li>
              <li><strong className="text-zinc-300">Suppression</strong> : supprimer votre compte et toutes vos données depuis Paramètres</li>
              <li><strong className="text-zinc-300">Portabilité</strong> : exporter vos données en format .vcf</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Cookies</h2>
            <p>VCard Pro utilise uniquement des cookies de session pour maintenir votre connexion. Aucun cookie de tracking ou publicitaire n'est utilisé.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Enfants</h2>
            <p>VCard Pro n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données personnelles d'enfants.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Contact</h2>
            <p>Pour toute question concernant vos données personnelles :</p>
            <p className="mt-2">
              <strong className="text-white">Email</strong> : <a href="mailto:privacy@hosyardigital.com" className="text-blue-400 hover:underline">privacy@hosyardigital.com</a><br />
              <strong className="text-white">Site</strong> : <a href="https://hosyardigital.com" className="text-blue-400 hover:underline">hosyardigital.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Modifications</h2>
            <p>Cette politique peut être mise à jour. En cas de changement significatif, nous vous notifierons par email. La date de dernière mise à jour est indiquée en haut de cette page.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">← Retour à l'accueil</Link>
          <span className="text-xs text-zinc-700">© 2026 VCard Pro · hosyardigital.com</span>
        </div>
      </div>
    </div>
  );
}
