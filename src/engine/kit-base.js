/* Icônes : UI (outils) + bibliothèque réseau (symboles SVG réutilisables) */
const UI = {home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',eyeoff:'<path d="M3 3l18 18"/><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6C3.9 8.3 2 12 2 12s3.5 7 10 7c1.9 0 3.6-.6 5-1.4"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  prev:'<path d="M15 5l-7 7 7 7"/>',
  next:'<path d="M9 5l7 7-7 7"/>',
  pointer:'<path d="M5 3l14 7-6 2-2 6z"/>',
  laser:'<circle cx="12" cy="12" r="3.2" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19"/>',
  pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
  hl:'<path d="M9 15l-4 4h5l2-2"/><path d="M8 13l7-9 5 5-9 7z"/>',
  arrow:'<path d="M5 19L19 5"/><path d="M10 5h9v9"/>',
  rect:'<rect x="4" y="6" width="16" height="12" rx="2"/>',
  ellipse:'<ellipse cx="12" cy="12" rx="9" ry="6.5"/>',
  text:'<path d="M5 6V4h14v2M12 4v16M9 20h6"/>',
  eraser:'<path d="M16 3l5 5-11 11H5l-2-2z"/><path d="M10 19h10"/>',
  undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
  clear:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  spot:'<circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>',
  zoom:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6"/>',
  board:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21l4-4 4 4M7 9h4M7 12h7"/>',
  orig:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l5-5 5 5 3-3 5 5"/><circle cx="16" cy="9" r="1.5"/>',
  notes:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4M12 17v.5"/>',
  link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  moon:'<path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z"/>',
  play:'<path d="M7 4l13 8-13 8z"/>',
  restart:'<path d="M4 12a8 8 0 108-8H8"/><path d="M11 1L8 4l3 3"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  save:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7M8 21v-7h8v7"/>',
  zone:'<rect x="3" y="5" width="18" height="14" rx="4" stroke-dasharray="3 2.5"/>',
  note:'<path d="M5 4h14v11l-5 5H5z"/><path d="M14 20v-5h5"/>',
  dot:'<circle cx="12" cy="12" r="4" fill="currentColor"/>'
};
function ui(n){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${UI[n]||''}</svg>`}

/* ---- bibliothèque réseau 64x64 ---- */
const NET = {
 fw:{l:'Firewall NGFW',s:`<rect x="4" y="10" width="56" height="44" rx="9" fill="#1B2A41"/><g fill="#FA582D"><rect x="10" y="17" width="20" height="8" rx="2"/><rect x="34" y="17" width="20" height="8" rx="2"/><rect x="10" y="29" width="10" height="8" rx="2"/><rect x="23" y="29" width="18" height="8" rx="2"/><rect x="44" y="29" width="10" height="8" rx="2"/><rect x="10" y="41" width="20" height="8" rx="2"/><rect x="34" y="41" width="20" height="8" rx="2"/></g><rect x="4" y="10" width="56" height="44" rx="9" fill="none" stroke="#FF8A3D" stroke-opacity=".5" stroke-width="2"/>`},
 pa:{l:'PA-Series',s:`<path d="M6 26l26-12 26 12v16L32 54 6 42z" fill="#1B2A41"/><path d="M6 26l26 12 26-12" fill="none" stroke="#33445E" stroke-width="2"/><path d="M32 38v16" stroke="#33445E" stroke-width="2"/><path d="M6 26l26-12 26 12-26 12z" fill="#2A3B57"/><g fill="#FA582D"><path d="M22 23l6-3 4 2-6 3z"/><path d="M30 27l6-3 4 2-6 3z"/></g><g fill="#38BDF8"><circle cx="12" cy="36" r="1.6"/><circle cx="17" cy="38.5" r="1.6"/><circle cx="22" cy="41" r="1.6"/></g>`},
 vm:{l:'VM-Series',s:`<path d="M32 6l24 13v26L32 58 8 45V19z" fill="#0284C7"/><path d="M32 6l24 13-24 13L8 19z" fill="#38BDF8"/><path d="M32 32v26" stroke="#0C4A6E" stroke-width="2"/><g fill="#fff"><rect x="24" y="15" width="16" height="7" rx="2" transform="skewX(-20) translate(6 0)"/></g><text x="32" y="48" font-size="11" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">VM</text>`},
 cn:{l:'CN-Series',s:`<path d="M32 5l23 13v28L32 59 9 46V18z" fill="#7C3AED"/><path d="M32 5l23 13-23 13L9 18z" fill="#A78BFA"/><circle cx="32" cy="38" r="9" fill="none" stroke="#fff" stroke-width="3"/><g stroke="#fff" stroke-width="3"><path d="M32 26v4M32 46v4M20 38h4M40 38h4"/></g>`},
 pano:{l:'Panorama',s:`<rect x="5" y="9" width="54" height="36" rx="5" fill="#1B2A41"/><rect x="9" y="13" width="46" height="28" rx="2" fill="#0B1220"/><path d="M13 35l8-8 6 5 9-11 7 7 7-6" fill="none" stroke="#FA582D" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><g fill="#38BDF8"><rect x="13" y="16" width="10" height="3" rx="1"/><rect x="26" y="16" width="6" height="3" rx="1"/></g><path d="M24 45h16l3 9H21z" fill="#33445E"/><rect x="17" y="53" width="30" height="3" rx="1.5" fill="#33445E"/>`},
 server:{l:'Serveur',s:`<g><rect x="12" y="6" width="40" height="15" rx="4" fill="#33445E"/><rect x="12" y="24" width="40" height="15" rx="4" fill="#33445E"/><rect x="12" y="42" width="40" height="15" rx="4" fill="#33445E"/></g><g fill="#22C55E"><circle cx="44" cy="13.5" r="2.4"/><circle cx="44" cy="31.5" r="2.4"/><circle cx="44" cy="49.5" r="2.4"/></g><g fill="#94A3B8"><rect x="17" y="12" width="16" height="3" rx="1.5"/><rect x="17" y="30" width="16" height="3" rx="1.5"/><rect x="17" y="48" width="16" height="3" rx="1.5"/></g>`},
 user:{l:'Utilisateur',s:`<circle cx="32" cy="21" r="11" fill="#FA582D"/><path d="M11 56c0-12 9-20 21-20s21 8 21 20z" fill="#FA582D"/><circle cx="32" cy="21" r="11" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`},
 users:{l:'Utilisateurs',s:`<circle cx="22" cy="22" r="9" fill="#FF8A3D"/><path d="M5 52c0-10 7-17 17-17s17 7 17 17z" fill="#FF8A3D"/><circle cx="40" cy="20" r="10" fill="#FA582D"/><path d="M22 56c0-11 8-19 18-19s18 8 18 19z" fill="#FA582D"/>`},
 laptop:{l:'Poste client',s:`<rect x="12" y="12" width="40" height="28" rx="3" fill="#1B2A41"/><rect x="15" y="15" width="34" height="22" rx="1.5" fill="#38BDF8"/><path d="M15 33l9-8 6 5 8-9 11 12z" fill="#0EA5E9"/><path d="M5 44h54l-4 7H9z" fill="#64748B"/>`},
 cloud:{l:'Cloud',s:`<path d="M18 50h30a11 11 0 001-22 15 15 0 00-29-3A12 12 0 0018 50z" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="3"/>`},
 internet:{l:'Internet',s:`<circle cx="32" cy="32" r="24" fill="#0EA5E9"/><g fill="none" stroke="#E0F2FE" stroke-width="2.4"><ellipse cx="32" cy="32" rx="10" ry="24"/><path d="M8 32h48M12 20h40M12 44h40M32 8v48"/></g>`},
 router:{l:'Routeur',s:`<ellipse cx="32" cy="42" rx="24" ry="9" fill="#1E40AF"/><rect x="8" y="26" width="48" height="16" fill="#2563EB"/><ellipse cx="32" cy="26" rx="24" ry="9" fill="#60A5FA"/><g fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M22 23l-6 3 6 3M42 23l6 3-6 3M29 22l-3 8M38 22l-3 8"/></g>`},
 switch:{l:'Switch',s:`<path d="M6 30l10-10h42l-10 10z" fill="#60A5FA"/><rect x="6" y="30" width="42" height="14" fill="#2563EB"/><path d="M48 30l10-10v14l-10 10z" fill="#1E40AF"/><g stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M18 24h12l-3-2M44 26H32l3 2"/></g>`},
 db:{l:'Base de données',s:`<ellipse cx="32" cy="14" rx="20" ry="7" fill="#14B8A6"/><path d="M12 14v36c0 4 9 7 20 7s20-3 20-7V14c0 4-9 7-20 7s-20-3-20-7z" fill="#0F766E"/><path d="M12 27c0 4 9 7 20 7s20-3 20-7M12 39c0 4 9 7 20 7s20-3 20-7" fill="none" stroke="#5EEAD4" stroke-width="2"/>`},
 branch:{l:'Agence',s:`<path d="M8 28L32 12l24 16v28H8z" fill="#FFB37A"/><path d="M8 28L32 12l24 16" fill="none" stroke="#FA582D" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="40" width="12" height="16" fill="#C9381A"/><g fill="#fff"><rect x="14" y="34" width="8" height="8" rx="1"/><rect x="42" y="34" width="8" height="8" rx="1"/></g>`},
 hq:{l:'Siège / HQ',s:`<rect x="14" y="6" width="36" height="52" rx="3" fill="#33445E"/><g fill="#7DD3FC"><rect x="20" y="12" width="7" height="6"/><rect x="31" y="12" width="7" height="6"/><rect x="42" y="12" width="3" height="6"/><rect x="20" y="22" width="7" height="6"/><rect x="31" y="22" width="7" height="6"/><rect x="20" y="32" width="7" height="6"/><rect x="31" y="32" width="7" height="6"/></g><rect x="27" y="44" width="10" height="14" fill="#FA582D"/>`},
 dc:{l:'Datacenter',s:`<g><rect x="6" y="10" width="15" height="46" rx="3" fill="#1B2A41"/><rect x="24.5" y="10" width="15" height="46" rx="3" fill="#1B2A41"/><rect x="43" y="10" width="15" height="46" rx="3" fill="#1B2A41"/></g><g fill="#38BDF8"><rect x="9" y="15" width="9" height="2.5"/><rect x="9" y="21" width="9" height="2.5"/><rect x="9" y="27" width="9" height="2.5"/><rect x="27.5" y="15" width="9" height="2.5"/><rect x="27.5" y="21" width="9" height="2.5"/><rect x="46" y="15" width="9" height="2.5"/><rect x="46" y="21" width="9" height="2.5"/><rect x="46" y="27" width="9" height="2.5"/></g><g fill="#22C55E"><circle cx="13.5" cy="48" r="2"/><circle cx="32" cy="48" r="2"/><circle cx="50.5" cy="48" r="2"/></g>`},
 hacker:{l:'Attaquant',s:`<path d="M12 58c0-14 8-22 20-22s20 8 20 22z" fill="#111827"/><path d="M14 30C14 15 22 6 32 6s18 9 18 24c0 8-6 12-18 12S14 38 14 30z" fill="#1F2937"/><path d="M21 31c0-7 5-12 11-12s11 5 11 12c0 5-4 7-11 7s-11-2-11-7z" fill="#000"/><g fill="#EF4444"><circle cx="27" cy="29" r="2.6"/><circle cx="37" cy="29" r="2.6"/></g>`},
 lock:{l:'Cadenas',s:`<path d="M20 28v-8a12 12 0 0124 0v8" fill="none" stroke="#33445E" stroke-width="6"/><rect x="12" y="28" width="40" height="30" rx="6" fill="#FA582D"/><circle cx="32" cy="41" r="4" fill="#fff"/><rect x="30.5" y="43" width="3" height="8" rx="1.5" fill="#fff"/>`},
 shield:{l:'Protection',s:`<path d="M32 4l22 8v16c0 15-9 26-22 32C19 54 10 43 10 28V12z" fill="#FA582D"/><path d="M32 10l16 6v12c0 11-6 19-16 24z" fill="#FF8A3D"/><path d="M22 31l7 7 13-14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`},
 mobile:{l:'Mobile',s:`<rect x="18" y="4" width="28" height="56" rx="6" fill="#1B2A41"/><rect x="21" y="10" width="22" height="40" rx="2" fill="#38BDF8"/><circle cx="32" cy="55" r="2.4" fill="#94A3B8"/>`},
 iot:{l:'IoT / OT',s:`<rect x="16" y="16" width="32" height="32" rx="5" fill="#0F766E"/><rect x="24" y="24" width="16" height="16" rx="2" fill="#5EEAD4"/><g stroke="#0F766E" stroke-width="4" stroke-linecap="round"><path d="M24 6v10M32 6v10M40 6v10M24 48v10M32 48v10M40 48v10M6 24h10M6 32h10M6 40h10M48 24h10M48 32h10M48 40h10"/></g>`},
 saas:{l:'SaaS',s:`<path d="M16 46h32a10 10 0 001-20 14 14 0 00-27-3 11 11 0 00-6 23z" fill="#A78BFA"/><g fill="#fff"><rect x="22" y="30" width="6" height="6" rx="1.5"/><rect x="30" y="30" width="6" height="6" rx="1.5"/><rect x="38" y="30" width="6" height="6" rx="1.5"/><rect x="26" y="38" width="6" height="6" rx="1.5" opacity=".7"/><rect x="34" y="38" width="6" height="6" rx="1.5" opacity=".7"/></g>`},
 app:{l:'Application',s:`<rect x="8" y="10" width="48" height="44" rx="8" fill="#0EA5E9"/><rect x="8" y="10" width="48" height="11" rx="8" fill="#0284C7"/><g fill="#fff"><circle cx="15" cy="15.5" r="2"/><circle cx="22" cy="15.5" r="2"/><rect x="15" y="28" width="34" height="5" rx="2.5"/><rect x="15" y="37" width="24" height="5" rx="2.5" opacity=".7"/></g>`},
 file:{l:'Fichier XML',s:`<path d="M14 4h26l12 12v44H14z" fill="#fff" stroke="#33445E" stroke-width="3"/><path d="M40 4v12h12" fill="#E2E8F0" stroke="#33445E" stroke-width="3" stroke-linejoin="round"/><text x="33" y="44" font-family="monospace" font-size="12" font-weight="800" fill="#FA582D" text-anchor="middle">.xml</text>`},
 admin:{l:'Administrateur',s:`<circle cx="30" cy="20" r="11" fill="#33445E"/><path d="M8 56c0-12 9-20 22-20 6 0 11 2 15 5" fill="#33445E"/><circle cx="46" cy="46" r="11" fill="#FA582D"/><path d="M46 40v12M40 46h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`},
 ai:{l:'IA / GenAI',s:`<rect x="10" y="10" width="44" height="44" rx="12" fill="#7C3AED"/><path d="M32 18l3.5 9.5L45 31l-9.5 3.5L32 44l-3.5-9.5L19 31l9.5-3.5z" fill="#fff"/><circle cx="45" cy="19" r="3" fill="#FDE68A"/>`},
 alert:{l:'Menace',s:`<path d="M32 6l28 50H4z" fill="#DC2626"/><path d="M32 24v14" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="46" r="3.4" fill="#fff"/>`},
 sase:{l:'Prisma Access',s:`<path d="M14 44h36a11 11 0 001-22 16 16 0 00-30-4 12 12 0 00-7 26z" fill="#FA582D"/><path d="M26 36l6-12 6 12M28.5 31h7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 44v12M22 56h20" stroke="#33445E" stroke-width="3" stroke-linecap="round"/>`},
 browser:{l:'Navigateur',s:`<rect x="6" y="10" width="52" height="44" rx="7" fill="#fff" stroke="#33445E" stroke-width="3"/><path d="M6 21h52" stroke="#33445E" stroke-width="3"/><g fill="#FA582D"><circle cx="13" cy="15.5" r="2"/><circle cx="19" cy="15.5" r="2"/></g><circle cx="32" cy="37" r="9" fill="none" stroke="#FA582D" stroke-width="3.5"/><path d="M32 28v9l6 4" stroke="#FA582D" stroke-width="3" fill="none" stroke-linecap="round"/>`},
 key:{l:'Licence / Clé',s:`<circle cx="22" cy="32" r="13" fill="none" stroke="#F5B301" stroke-width="7"/><path d="M34 32h24M50 32v9M43 32v6" stroke="#F5B301" stroke-width="7" stroke-linecap="round"/>`},
 console:{l:'Console',s:`<rect x="6" y="10" width="52" height="40" rx="6" fill="#0B1220"/><path d="M15 23l7 6-7 6" fill="none" stroke="#86EFAC" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 37h14" stroke="#FA582D" stroke-width="3.4" stroke-linecap="round"/><rect x="24" y="52" width="16" height="4" rx="2" fill="#33445E"/>`}
};
function netSprite(){
  return '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0" aria-hidden="true"><defs>'+
    Object.entries(NET).map(([k,v])=>`<symbol id="i-${k}" viewBox="0 0 64 64">${v.s}</symbol>`).join('')+
    `<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="context-stroke"/></marker>
     <marker id="ahO" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#FA582D"/></marker>
     <marker id="ahK" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#1B2A41"/></marker>
     <marker id="ahB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#0EA5E9"/></marker>
     <marker id="ahG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#16A34A"/></marker>
     <marker id="ahW" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#fff"/></marker>
     <filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
     <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0E1726" flood-opacity=".22"/></filter>
     <linearGradient id="gO" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FA582D"/><stop offset="1" stop-color="#FF8A3D"/></linearGradient>
     <linearGradient id="gK" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2A41"/><stop offset="1" stop-color="#33445E"/></linearGradient>
     <linearGradient id="gB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0284C7"/><stop offset="1" stop-color="#38BDF8"/></linearGradient>
     <linearGradient id="gV" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6D28D9"/><stop offset="1" stop-color="#A78BFA"/></linearGradient>
     <linearGradient id="gT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F766E"/><stop offset="1" stop-color="#2DD4BF"/></linearGradient>
     <linearGradient id="gG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#15803D"/><stop offset="1" stop-color="#4ADE80"/></linearGradient>
     <linearGradient id="gR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B91C1C"/><stop offset="1" stop-color="#F87171"/></linearGradient>
     <radialGradient id="pk"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#FFB37A"/><stop offset="1" stop-color="#FA582D" stop-opacity="0"/></radialGradient>
    </defs></svg>`;
}
/* raccourci pour placer une icône dans un SVG : I('fw',x,y,taille) */
function I(k,x,y,s=64,extra=''){return `<use href="#i-${k}" x="${x}" y="${y}" width="${s}" height="${s}" ${extra}/>`}
/* logo Office Academy */
function LOGO(cls=''){return `<span class="logo ${cls}"><svg viewBox="0 0 40 24"><rect x="1" y="3" width="11" height="18" rx="3" fill="#185ABD"/><rect x="14" y="3" width="11" height="18" rx="3" fill="#107C41"/><rect x="27" y="3" width="11" height="18" rx="3" fill="#C43E1C"/></svg>office<b style="font-weight:900;color:#FA582D">academy</b></span>`}

/* Helpers de mise en page pour les diapos */
let _uid=0;
function H(title,kick='',right=''){return `<div class="hdr"><span class="kick">${kick}</span><h1>${title}</h1>${right?`<div style="margin-left:auto">${right}</div>`:''}</div>`}
function PATH(p){p=p.replace(/<([^<>]*)>/g,'‹$1›');return `<span class="path">${p.split('>').map(x=>x.trim()).map((x,i,a)=>i===a.length-1?`<b>${x}</b>`:x).join(' <span style="opacity:.5">›</span> ')}</span>`}
/* Capture d'écran animée avec hotspots */
function SHOT(o){
  const id='sh'+(++_uid); const meta=IMGI[o.img]||{w:16,h:9}; const bar=o.bar!==false;
  const w=o.w, ih=o.h? (o.h-(bar?34:0)) : Math.round(w*meta.h/meta.w); const h=ih+(bar?34:0);
  const from=o.from||1; const st=[];
  const hs=(o.hs||[]).map((s,j)=>{ let r=s.r; if(s.sr){ const m=IMGI[o.img]; r=[(s.sr[0]-m.x)/m.cw,(s.sr[1]-m.y)/m.ch,s.sr[2]/m.cw,s.sr[3]/m.ch]; }
    const p=s.pad??.006; r=[r[0]-p,r[1]-p*1.6,r[2]+2*p,r[3]+3.2*p]; st.push(s.s||from+j);
    return {r,z:s.z,t:s.t}; });
  const capId=o.cap? id+'c':''; const rc=(o.recap===false||!st.length)?0:Math.max(...st)+1;
  const html=`<div class="shot ${bar?'':'nobar'} ${o.cls||''}" style="left:${o.x}px;top:${o.y}px;width:${w}px;height:${h}px;${o.style||''}" data-st='${JSON.stringify(st)}' data-rc="${rc}" data-vw="${w}" data-vh="${ih}" data-az="${o.zoom===false?0:1}" ${capId?`data-cap="${capId}"`:''}>
    ${bar?`<div class="bar"><i></i><i></i><i></i><span>${o.url||'https://192.168.1.1'}</span></div>`:''}
    <div class="vp"><div class="zm"><img src="${IMG[o.img]}" alt="">${hs.map((s,j)=>`<div class="hs" data-r='${JSON.stringify(s.r)}' ${s.z?`data-z="${s.z}"`:''} style="left:${s.r[0]*100}%;top:${s.r[1]*100}%;width:${s.r[2]*100}%;height:${s.r[3]*100}%"><span class="b">${j+1}</span></div>`).join('')}</div><div class="ring"><span class="b"></span></div></div></div>`;
  const cap=o.cap? `<div class="shot-cap" id="${capId}" style="left:${o.cap.x}px;top:${o.cap.y}px;width:${o.cap.w}px">${hs.map((s,j)=>`<div class="c"><span class="num-badge">${j+1}</span><div>${s.t}</div></div>`).join('')}</div>`:'';
  return html+cap;
}
function TITLE(o){ /* {mod, title, sub, agenda:[], art:svg} */
  return `<div class="t-art">${o.art||''}</div>
  <div class="t-mod a l" style="--d:.1s">${o.mod}</div>
  <h1 class="a" style="--d:.25s">${o.title}</h1>
  <div class="t-sub a" style="--d:.5s">${o.sub||''}</div>
  <div class="t-agenda" data-stg=".12" data-d0=".8">${(o.agenda||[]).map((a,i)=>`<span><b>0${i+1}</b>${a}</span>`).join('')}</div>
  <div class="t-ver a fade" style="--d:1.2s">OFFICE ACADEMY · MICROSOFT 365 · ${o.ver||'FORMATION WORD · EXCEL · POWERPOINT'}</div>`;
}
function SEC(items,curI){
  return `${secArt()}<div class="secs">${items.map((t,i)=>`<div class="${i===curI?'cur':i<curI?'done':''} a l" style="--d:${.15+i*.15}s"><span class="n">${i<curI?'✓':i+1}</span>${t}</div>`).join('')}</div>`;
}
function secArt(){
  return `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%">
   <g opacity=".5">${Array.from({length:7},(_,i)=>`<path d="M${1000+i*90} -50 L${1300+i*90} 450 L${1000+i*90} 950" fill="none" stroke="url(#gO)" stroke-width="${2+i*.6}" stroke-opacity="${.08+i*.06}" class="draw" pathLength="1" style="--d:${i*.1}s"/>`).join('')}</g>
   <g class="float"><path d="M1180 330 L1330 450 L1180 570 L1230 450 Z" fill="url(#gO)" opacity=".95" class="a pop" style="--d:.4s" filter="url(#gl)"/></g>
  </svg>`;
}
function OBJ(list,title='Objectifs pédagogiques',kick='À la fin de ce module, vous saurez…'){
  return `${H(title,kick)}
  <div class="body" style="right:520px"><div class="obj">${list.map((t,i)=>`<div class="o f left" data-s="${i+1}"><span class="num-badge">${i+1}</span><span>${t}</span></div>`).join('')}</div></div>
  <svg viewBox="0 0 440 440" style="position:absolute;right:70px;top:210px;width:420px;height:420px">
    <circle cx="220" cy="220" r="190" fill="none" stroke="#FA582D" stroke-opacity=".15" stroke-width="2" stroke-dasharray="6 10" class="spin"/>
    <circle cx="220" cy="220" r="150" fill="none" stroke="#FA582D" stroke-opacity=".25" stroke-width="2"/>
    <circle cx="220" cy="220" r="110" fill="none" stroke="#FA582D" stroke-opacity=".45" stroke-width="2"/>
    <circle cx="220" cy="220" r="70" fill="url(#gO)" class="a pop" style="--d:.3s"/>
    <circle cx="220" cy="220" r="26" fill="#fff"/>
    <path d="M220 220 L400 60" stroke="#1B2A41" stroke-width="6" stroke-linecap="round" class="draw" pathLength="1" style="--d:.8s"/>
    <path d="M400 60 l-30 -6 M400 60 l6 -30" stroke="#1B2A41" stroke-width="6" stroke-linecap="round" class="a fade" style="--d:1.9s"/>
    <circle cx="220" cy="220" r="70" fill="none" stroke="#FA582D" stroke-width="3" class="a" style="animation:ring 2.4s 2s ease-out infinite;transform-origin:220px 220px"/>
  </svg>`;
}
function QUIZ(){ return `${H('Questions de révision','Quiz interactif · testez vos connaissances')}<div class="quiz interactive"></div>`; }
function END(){
  return `<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%">
   ${Array.from({length:9},(_,i)=>`<path d="M-100 ${520+i*28} C 300 ${300+i*40}, 700 ${820-i*20}, 1100 ${420+i*24}" fill="none" stroke="url(#gO)" stroke-width="${1.5+i*.4}" stroke-opacity="${.15+i*.07}" class="draw" pathLength="1" style="--d:${i*.08}s"/>`).join('')}
  </svg><h1 class="a r" style="--d:.6s">Travailler mieux,<br>plus vite,<br><span class="grad">ensemble.</span></h1>
  <div class="a fade" style="--d:1.2s;position:absolute;right:124px;bottom:120px">${LOGO('w')}</div>`;
}
function LABTOPO_MINI(o={}){ /* Client-A — MGT — Firewall-A */
  return `<svg viewBox="0 0 900 560" style="width:100%;height:100%">
    <rect x="120" y="40" width="660" height="130" rx="22" fill="url(#gK)" filter="url(#sh)" class="a pop" style="--d:.2s"/>
    <text x="450" y="95" fill="#fff" font-size="30" font-weight="800" text-anchor="middle">Firewall-A</text>
    <text x="450" y="130" fill="#FF8A3D" font-size="20" font-weight="700" text-anchor="middle">PA-VM · PAN-OS 11.0</text>
    <rect x="150" y="150" width="90" height="44" rx="10" fill="#fff" stroke="#16A34A" stroke-width="3" class="a pop" style="--d:.6s"/><text x="195" y="179" font-size="20" font-weight="800" text-anchor="middle" fill="#0E1726">MGT</text>
    <path d="M195 194 V 330" stroke="#16A34A" stroke-width="5" stroke-dasharray="10 8" class="flow"/>
    <text x="215" y="250" font-size="22" font-weight="700" fill="#0E1726">192.168.1.254</text>
    <path d="M60 330 H 520" stroke="#16A34A" stroke-width="6" class="draw" pathLength="1" style="--d:.9s"/>
    <text x="300" y="318" font-size="20" fill="#16A34A" font-weight="700">192.168.1.0/24</text>
    <path d="M195 330 V 410" stroke="#16A34A" stroke-width="5" class="draw" pathLength="1" style="--d:1.3s"/>
    <g class="a pop" style="--d:1.5s">${I('laptop',145,400,100)}</g>
    <text x="195" y="525" font-size="22" font-weight="800" text-anchor="middle" fill="#0E1726">Client-A</text>
    <text x="195" y="552" font-size="19" text-anchor="middle" fill="#6B7A90">192.168.1.20</text>
    <circle r="9" fill="#FA582D" filter="url(#gl)"><animateMotion dur="2.4s" repeatCount="indefinite" path="M195 420 V330 V194"/></circle>
    ${o.extra||''}
  </svg>`;
}

function labGuide(){ return `${H('Structure du guide de lab','Deux chemins possibles')}
<svg viewBox="0 0 1460 640" style="position:absolute;left:70px;top:160px;width:1460px;height:640px">
 <g class="a pop" style="--d:.2s">${I('user',690,10,80)}</g>
 <path d="M730 100 C730 160, 380 140, 380 200" fill="none" stroke="#0EA5E9" stroke-width="6" class="draw" pathLength="1" style="--d:.5s"/>
 <path d="M730 100 C730 160, 1080 140, 1080 200" fill="none" stroke="#94A3B8" stroke-width="6" class="draw" pathLength="1" style="--d:.5s"/>
 <circle r="10" fill="#0EA5E9" filter="url(#gl)"><animateMotion dur="2s" repeatCount="indefinite" path="M730 100 C730 160, 380 140, 380 200"/></circle>
</svg>
<div class="card f left" data-s="1" style="position:absolute;left:110px;top:370px;width:640px;background:#E0F7FF;border:2px solid #7DD3FC">
 <div style="font-size:30px;font-weight:800;color:#0369A1">📘 Detailed Lab Steps</div>
 <ul class="lst sm" style="margin-top:14px"><li>Étapes guidées + captures d'écran</li><li>Jamais utilisé Panorama / le firewall ? Prenez celle-ci</li><li>Prenez le temps de comprendre — <b>ce n'est pas une course</b></li></ul>
</div>
<div class="card f right" data-s="2" style="position:absolute;right:110px;top:370px;width:640px;background:#F1F5F9;border:2px solid #CBD5E1">
 <div style="font-size:30px;font-weight:800;color:#33445E">🧭 High-Level Lab Steps</div>
 <ul class="lst sm" style="margin-top:14px"><li>Consignes générales, <b>plus exigeant</b></li><li>Pour ceux qui connaissent déjà les firewalls</li><li>Bloqué ? Basculez sur la version détaillée</li></ul>
</div>
<div class="ask f" data-s="3" style="position:absolute;left:110px;right:110px;bottom:70px;justify-content:center"><span class="q">!</span><span>Utilisez l'une <b>OU</b> l'autre (pas les deux !) · Surveillez le temps en High-Level.</span></div>`; }
function labTasks(title,tasks){ return `${H(title,'Tâches du lab')}
<div style="position:absolute;left:70px;right:70px;top:170px;display:grid;grid-template-columns:1fr 1fr;gap:16px 40px">
 ${tasks.map((t,i)=>`<div class="card f left" data-s="${i+1}" style="display:flex;gap:18px;align-items:center;padding:16px 22px"><span class="num-badge or">${i+1}</span><span style="font-size:22px;font-weight:600">${t}</span><svg viewBox="0 0 30 30" style="width:34px;height:34px;margin-left:auto"><circle cx="15" cy="15" r="13" fill="#ECFDF3" stroke="#16A34A" stroke-width="2"/><path d="M8 15l5 5 9-10" stroke="#16A34A" stroke-width="3.5" fill="none" stroke-linecap="round" class="draw" pathLength="1" style="--d:.4s"/></svg></div>`).join('')}
</div>`; }

/* Écran de démo / capture plein cadre basée sur la diapo originale */
function SCREEN(n,o={}){
  const img=(typeof ORIG!=='undefined'&&ORIG[n-1])||'';
  const w=o.w||1040, h=Math.round(w*9/16);
  return `${H(o.title||'',o.kick||'',o.right||'')}
  <div class="shot a" style="--d:.2s;left:${o.x??70}px;top:${o.y??160}px;width:${w}px;height:${h+34}px">
   <div class="bar"><i></i><i></i><i></i><span>${o.url||'https://www.office.com'}</span></div>
   <div class="vp"><img src="${img}" style="width:100%;height:100%;object-fit:cover;animation:kb 14s ease-in-out infinite alternate;transform-origin:${o.origin||'60% 40%'}"></div></div>
  ${o.points?`<div class="col" style="position:absolute;left:${(o.x??70)+w+30}px;right:60px;top:170px">${o.points.map((p,i)=>`<div class="card f right" data-s="${i+1}" style="padding:14px 18px;font-size:19px;display:flex;gap:12px;align-items:flex-start"><span class="num-badge or" style="width:34px;height:34px;font-size:16px">${i+1}</span><div>${p}</div></div>`).join('')}</div>`:''}
  ${o.extra||''}`;
}

/* Diapo "capture GUI" : titre + chemin + capture à hotspots + légendes à droite */
function GUI(o){
  const w=o.w||960, capx=70+w+40;
  return `${H(o.t,o.k||'Interface Web',o.p?PATH(o.p):'')}
  ${SHOT({img:o.img,x:70,y:o.y||165,w,h:o.h,bar:o.bar===true,url:o.url,hs:o.hs||[],zoom:o.zoom,recap:o.recap,cap:(o.hs&&o.hs.some(h=>h.t))?{x:capx,y:(o.y||165)+10,w:1600-capx-60}:null})}
  ${o.extra||''}`;
}
/* petite carte image qui apparaît (pop-up) */
function POP(img,x,y,w,s,extra=''){return `<div class="f zoom" data-s="${s}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;${extra}"><img src="${IMG[img]}" style="width:100%;border-radius:12px;box-shadow:0 0 0 3px #FA582D,0 30px 60px -20px rgba(0,0,0,.5)"></div>`}
/* Liste de puces simple */
function UL(items,o={}){return `<ul class="lst ${o.sm?'sm':''}" style="${o.style||''}">${items.map((t,i)=>{ if(Array.isArray(t)) return `<li class="f" data-s="${(o.s0||1)+i}">${t[0]}<ul class="lst sub">${t[1].map(x=>`<li>${x}</li>`).join('')}</ul></li>`; return `<li class="f" data-s="${(o.s0||1)+i}">${t}</li>`}).join('')}</ul>`}
/* Carte texte qui apparaît */
function CARD(html,s,style='',cls='right'){return `<div class="card f ${cls}" data-s="${s}" style="padding:14px 18px;font-size:19px;${style}">${html}</div>`}
function resources(img,q){ return `${H('Ressources complémentaires','Pour aller plus loin')}
<div class="body" style="display:flex;gap:60px;align-items:center">
 <img src="${IMG[img]}" class="a l" style="--d:.2s;width:620px;border-radius:20px;box-shadow:var(--sh)">
 <div class="col"><div class="a" style="--d:.4s;font-size:28px">Pour aller plus loin, cherchez sur <b>Microsoft Learn</b> / support Microsoft :</div>
 <div class="a pop" style="--d:.7s;font-size:36px;font-weight:800"><span class="grad">« ${q} »</span></div>
 <div class="chip dark a" style="--d:1s;align-self:flex-start;font-size:18px">learn.microsoft.com · support.microsoft.com</div></div></div>`; }

/* Topologie lab standard : Internet (1/1), Users_Net (1/2), Extranet (1/3) */
function LAB3(o={}){ return `<svg viewBox="0 0 1300 640" style="position:absolute;left:150px;top:160px;width:1300px;height:640px">
 <g class="a pop"><path d="M380 70c-40 0-50-55 0-62 10-38 85-45 105-8 40-18 95 2 85 42 40 8 35 55-8 58z" fill="#FCE7E7" stroke="#DC2626" stroke-width="2"/>${I('router',420,10,60)}<text x="560" y="40" font-size="17" font-weight="700">203.0.113.1</text><text x="300" y="40" font-size="18" font-style="italic" fill="#B91C1C">Internet Zone</text></g>
 <path d="M450 80 V 230" stroke="#DC2626" stroke-width="6" class="draw" pathLength="1"/><text x="320" y="215" font-size="16" font-weight="700">203.0.113.20</text>
 <g class="a pop" style="--d:.2s"><rect x="150" y="230" width="900" height="120" rx="16" fill="#7F9CD1" stroke="#33445E" stroke-width="2"/><text x="900" y="275" font-size="22" font-weight="900">Firewall-A</text><circle cx="600" cy="290" r="40" fill="url(#gO)"/><text x="600" y="297" font-size="18" font-weight="900" fill="#fff" text-anchor="middle">VR-1</text>
  ${[['1/1',420,232],['1/2',250,318],['1/3',720,318]].map(([t,x,y])=>`<rect x="${x}" y="${y}" width="60" height="34" rx="6" fill="#fff" stroke="#33445E" stroke-width="2"/><text x="${x+30}" y="${y+23}" font-size="16" font-weight="800" text-anchor="middle">${t}</text>`).join('')}
  <rect x="1060" y="270" width="70" height="40" rx="6" fill="#fff" stroke="#16A34A" stroke-width="3"/><text x="1095" y="296" font-size="15" font-weight="800" text-anchor="middle">MGT</text></g>
 <g class="a" style="--d:.5s"><rect x="90" y="370" width="390" height="250" rx="22" fill="#ECFDF3" stroke="#16A34A" stroke-width="2"/><path d="M280 352 V 460 M120 460 H 440 M280 460 V 520" stroke="#16A34A" stroke-width="5"/><text x="295" y="400" font-size="16" font-weight="700">192.168.1.1</text><text x="130" y="450" font-size="15" fill="#16A34A">192.168.1.0/24</text><rect x="220" y="520" width="120" height="50" rx="8" fill="#16A34A"/><text x="280" y="552" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">Client-A</text><text x="280" y="598" font-size="16" font-weight="700" text-anchor="middle">192.168.1.20</text><text x="420" y="600" font-size="17" font-style="italic" fill="#15803D" text-anchor="middle">Users_Net</text></g>
 <g class="a" style="--d:.7s"><rect x="610" y="370" width="380" height="260" rx="22" fill="#FFF1E7" stroke="#FA582D" stroke-width="2"/><path d="M750 352 V 440 M640 440 H 960" stroke="#FA582D" stroke-width="5"/><text x="765" y="400" font-size="16" font-weight="700">192.168.50.1</text><text x="790" y="465" font-size="15" fill="#C9381A">192.168.50.0/24</text>${[0,1,2].map(i=>`<path d="M${680+i*40} 440 V ${490+i*40}" stroke="#FA582D" stroke-width="4"/><rect x="${650+i*40}" y="${490+i*40}" width="100" height="40" rx="6" fill="#FA582D" stroke="#fff"/><text x="${700+i*40}" y="${516+i*40}" font-size="16" font-weight="800" fill="#fff" text-anchor="middle">Server</text>`).join('')}<text x="930" y="600" font-size="17" font-style="italic" fill="#C9381A" text-anchor="middle">Extranet</text></g>
 ${o.extra||''}
 <g class="f" data-s="${o.s||1}"><circle r="9" fill="#FA582D" filter="url(#gl)"><animateMotion dur="3s" repeatCount="indefinite" path="M280 520 V 460 V 300 H 600 H 450 V 80"/></circle><circle r="9" fill="#0EA5E9" filter="url(#gl)"><animateMotion dur="3s" begin="1.2s" repeatCount="indefinite" path="M280 520 V 460 V 300 H 600 H 750 V 440 H 700 V 490"/></circle></g>
</svg>`; }

function FLOWLOGIC(){ return `${H('Flow logic du firewall nouvelle génération','Le parcours d\'un paquet')}
<svg viewBox="0 0 1500 690" style="position:absolute;left:50px;top:150px;width:1500px;height:690px">
 <rect x="10" y="10" width="1480" height="300" rx="24" fill="#FFF7ED" stroke="#FA582D" stroke-width="2" class="a"/><text x="750" y="45" font-size="24" font-weight="900" fill="#C9381A" text-anchor="middle">SESSION SETUP</text>
 <g class="a pop" style="--d:.2s"><circle cx="110" cy="170" r="85" fill="url(#gO)"/><text x="110" y="150" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">Le trafic</text><text x="110" y="172" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">match une</text><text x="110" y="194" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">session ?</text></g>
 ${['Zone source','Zone / DoS Protection','Forwarding lookup (PBF)','Zone destination (+ check DNAT)','Security policy check (App-ID ignoré)','Session ID'].map((t,i)=>`<g class="f" data-s="1"><rect x="${250+i*205}" y="95" width="185" height="150" rx="16" fill="${i===4?'#7C3AED':i===5?'#16A34A':'#fff'}" stroke="#FA582D" stroke-width="2" filter="url(#sh)"/>${t.split(' ').reduce((a,w)=>{const l=a[a.length-1]; if((l+' '+w).length>13&&l) a.push(w); else a[a.length-1]=(l?l+' ':'')+w; return a;},['']).map((l,j,arr)=>`<text x="${342+i*205}" y="${175-(arr.length-1)*11+j*22}" font-size="17" font-weight="800" fill="${i>=4?'#fff':'#0E1726'}" text-anchor="middle">${l}</text>`).join('')}</g>`).join('')}
 <g class="f" data-s="1"><text x="215" y="160" font-size="18" font-weight="900" fill="#DC2626">Non</text><path d="M195 170 H 245" stroke="#33445E" stroke-width="4" marker-end="url(#ahK)"/>${[0,1,2,3,4].map(i=>`<path d="M${435+i*205} 170 H ${452+i*205}" stroke="#33445E" stroke-width="4" marker-end="url(#ahK)"/>`).join('')}
  <circle r="10" fill="#FA582D" filter="url(#gl)"><animateMotion dur="4s" repeatCount="indefinite" path="M195 170 H 1440"/></circle></g>
 <rect x="10" y="340" width="1480" height="340" rx="24" fill="#EFF6FF" stroke="#0EA5E9" stroke-width="2" class="a"/><text x="750" y="378" font-size="24" font-weight="900" fill="#0369A1" text-anchor="middle">INSPECTION & ENFORCEMENT</text>
 <g class="f" data-s="2"><path d="M110 255 V 470 H 160" stroke="#16A34A" stroke-width="5" fill="none" marker-end="url(#ahG)"/><text x="120" y="320" font-size="18" font-weight="900" fill="#16A34A">Oui</text>
  <rect x="170" y="400" width="300" height="250" rx="18" fill="url(#gG)"/><text x="320" y="440" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">INSPECTION</text><rect x="195" y="460" width="250" height="60" rx="12" fill="#fff"/><text x="320" y="498" font-size="22" font-weight="900" text-anchor="middle">App-ID</text><rect x="195" y="560" width="250" height="60" rx="12" fill="#fff"/><text x="320" y="598" font-size="22" font-weight="900" text-anchor="middle">Content-ID</text></g>
 <g class="f" data-s="3"><path d="M470 470 H 540" stroke="#33445E" stroke-width="4" marker-end="url(#ahK)"/><path d="M620 410 L690 470 L620 530 L550 470Z" fill="#33445E"/><text x="620" y="476" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">Chiffré ?</text>
  <path d="M620 530 V 570" stroke="#33445E" stroke-width="4" marker-end="url(#ahK)"/><text x="630" y="555" font-size="15" font-weight="800" fill="#16A34A">Oui</text><path d="M620 575 L690 625 L620 675 L550 625Z" fill="#7C3AED"/><text x="620" y="620" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">Politique</text><text x="620" y="638" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">decrypt ?</text>
  <path d="M550 625 H 470" stroke="#7C3AED" stroke-width="4" marker-end="url(#ah)"/><text x="480" y="660" font-size="14" font-weight="800" fill="#7C3AED">Oui → déchiffrer et ré-inspecter</text>
  <path d="M690 470 H 770" stroke="#33445E" stroke-width="4" marker-end="url(#ahK)"/><text x="700" y="460" font-size="15" font-weight="800" fill="#DC2626">Non</text></g>
 <g class="f" data-s="4"><rect x="780" y="400" width="320" height="250" rx="18" fill="url(#gB)"/><text x="940" y="440" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">ENFORCEMENT</text><rect x="805" y="460" width="270" height="60" rx="12" fill="#fff"/><text x="940" y="498" font-size="21" font-weight="900" text-anchor="middle">Security Policy*</text><rect x="805" y="560" width="270" height="60" rx="12" fill="#fff"/><text x="940" y="598" font-size="21" font-weight="900" text-anchor="middle">Security Profiles</text></g>
 <g class="f" data-s="5"><path d="M1100 525 H 1200" stroke="#33445E" stroke-width="5" marker-end="url(#ahK)" class="flow"/><circle cx="1290" cy="525" r="85" fill="url(#gO)" filter="url(#gl)"/><text x="1290" y="518" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">Forward</text><text x="1290" y="542" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">traffic</text><text x="1290" y="635" font-size="15" fill="#33445E" text-anchor="middle">(re-chiffré si déchiffré)</text>
  <circle r="10" fill="#FA582D" filter="url(#gl)"><animateMotion dur="4s" repeatCount="indefinite" path="M110 255 V 470 H 470 H 770 H 1200"/></circle></g>
</svg>
<div class="chip dark f" data-s="5" style="position:absolute;left:70px;bottom:50px">* La vérification de policy se base sur les adresses IP <b>pré-NAT</b></div>`; }

/* =========================================================
   MOTION KIT v2 — schémas de flux animés & récaps animés
   Toutes les coordonnées sont en px dans le repère du SVG (w × h).
   Les traits sont calculés à partir des centres des nœuds → toujours alignés.
   ========================================================= */
function _pts2d(P,r=16){ /* polyligne orthogonale → path avec coins arrondis */
  if(P.length<2) return '';
  let d=`M${P[0][0]} ${P[0][1]}`;
  for(let i=1;i<P.length-1;i++){
    const [x0,y0]=P[i-1],[x1,y1]=P[i],[x2,y2]=P[i+1];
    const l1=Math.hypot(x1-x0,y1-y0), l2=Math.hypot(x2-x1,y2-y1); const rr=Math.min(r,l1/2,l2/2);
    if(rr<1){ d+=` L${x1} ${y1}`; continue; }
    const ax=x1-(x1-x0)/l1*rr, ay=y1-(y1-y0)/l1*rr, bx=x1+(x2-x1)/l2*rr, by=y1+(y2-y1)/l2*rr;
    d+=` L${+ax.toFixed(1)} ${+ay.toFixed(1)} Q${x1} ${y1} ${+bx.toFixed(1)} ${+by.toFixed(1)}`;
  }
  const L=P[P.length-1]; return d+` L${L[0]} ${L[1]}`;
}
function _route(A,B,r){ /* r: h | v | hv | vh | hvh | vhv | d  (A,B = {x,y}) */
  const a=[A.x,A.y], b=[B.x,B.y];
  if(!r) r = A.y===B.y? 'h' : A.x===B.x? 'v' : 'hv';
  if(r==='h'||r==='v'||r==='d') return [a,b];
  if(r==='hv') return [a,[B.x,A.y],b];
  if(r==='vh') return [a,[A.x,B.y],b];
  if(r==='hvh'){ const mx=Math.round((A.x+B.x)/2); return [a,[mx,A.y],[mx,B.y],b]; }
  if(r==='vhv'){ const my=Math.round((A.y+B.y)/2); return [a,[A.x,my],[B.x,my],b]; }
  if(Array.isArray(r)) return [a,...r,b];
  return [a,b];
}
function FLOW(o){
  const id='fl'+(++_uid), N=o.n||{}, dark=!!o.dark;
  const W=o.w||1460, Hh=o.h||640, X=o.x??70, Y=o.y??170;
  const ink=dark?'#fff':'#0E1726', mut=dark?'rgba(255,255,255,.6)':'#6B7A90', plate=dark?'#111A2B':'#fff', pst=dark?'rgba(255,255,255,.14)':'#E3E8EF';
  const wrap=(s,inner,cls='f')=> s? `<g class="${cls}" data-s="${s}">${inner}</g>` : inner;
  const linkOf=(a,b)=>{ const L=(o.l||[]).find(l=>(l.a===a&&l.b===b)||(l.a===b&&l.b===a)); if(!L) return null; return L; };
  const hop=(a,b)=>{ const L=linkOf(a,b); let P=_route(N[a],N[b],L&&L.r); if(L&&L.a===b){ P=_route(N[b],N[a],L.r).reverse(); } return P; };
  const pathVia=(via)=>{ let P=[]; for(let i=0;i<via.length-1;i++){ const h=hop(via[i],via[i+1]); P = P.length? P.concat(h.slice(1)) : h; } return P; };
  let z=(o.z||[]).map((q,i)=>wrap(q.s,`<g class="${q.s?'':'a fade'}" style="--d:${.05*i}s"><rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" rx="${q.rx??26}" fill="${q.c}" fill-opacity="${q.fo??.07}" stroke="${q.c}" stroke-width="2.5" stroke-dasharray="${q.solid?'':'10 8'}"/>
     ${q.l?`<text x="${q.lx??q.x+22}" y="${q.ly??q.y+36}" font-size="${q.fs||20}" font-weight="800" fill="${q.c}" letter-spacing=".04em">${q.l}</text>`:''}</g>`,'f')).join('');
  let L=(o.l||[]).map((l,i)=>{ const P=_route(N[l.a],N[l.b],l.r); const d=_pts2d(P,l.rad??18); const c=l.c||(dark?'#64748B':'#94A3B8');
     const lab=l.lab?`<g><rect x="${l.lx-((l.lw||l.lab.length*9+24)/2)}" y="${l.ly-17}" width="${l.lw||l.lab.length*9+24}" height="34" rx="17" fill="${plate}" stroke="${c}" stroke-width="2"/><text x="${l.lx}" y="${l.ly+6}" text-anchor="middle" font-size="16" font-weight="700" fill="${ink}">${l.lab}</text></g>`:'';
     return wrap(l.s,`<path d="${d}" fill="none" stroke="${c}" stroke-width="${l.sw||5}" stroke-linecap="round" stroke-linejoin="round" ${l.dash?'stroke-dasharray="10 9"':''} class="draw" pathLength="1" style="--d:${(o.ld??.25)+i*.08}s"/>${l.flow?`<path d="${d}" fill="none" stroke="${l.fc||'#fff'}" stroke-opacity=".75" stroke-width="2" class="flow"/>`:''}${lab}`,'f'); }).join('');
  let nodes=Object.entries(N).map(([k,n],i)=>{ const s=n.sz||84, pw=n.pw||s+30, ph=n.ph||s+30, c=n.c||'#FA582D';
     const body= n.ic? I(n.ic,n.x-s/2,n.y-s/2,s) : (n.html||'');
     const lab = n.l? `<text x="${n.x}" y="${n.y+ph/2+28}" text-anchor="middle" font-size="${n.fs||20}" font-weight="800" fill="${ink}">${n.l}</text>`:'';
     const sub = n.sub? `<text x="${n.x}" y="${n.y+ph/2+(n.l?52:28)}" text-anchor="middle" font-size="16" font-weight="600" fill="${mut}">${n.sub}</text>`:'';
     const pl = n.plate===false? '' : `<rect x="${n.x-pw/2}" y="${n.y-ph/2}" width="${pw}" height="${ph}" rx="${n.rx??22}" fill="${n.fill||plate}" stroke="${n.stroke||pst}" stroke-width="2" filter="url(#sh)"/>${n.hot?`<rect x="${n.x-pw/2-6}" y="${n.y-ph/2-6}" width="${pw+12}" height="${ph+12}" rx="${(n.rx??22)+6}" fill="none" stroke="${c}" stroke-width="3" class="pulse"/>`:''}`;
     const inner=`<g ${n.s?'':`class="a pop" style="--d:${.1+i*.08}s"`}>${pl}${body}${lab}${sub}</g>`;
     return n.s? `<g class="f zoom" data-s="${n.s}">${inner}</g>` : inner; }).join('');
  let pk=(o.p||[]).map((p,pi)=>{ const segs=p.seg||[p]; const dur=p.dur||segs.reduce((a,s)=>a+(s.t||2.2),0)+ (p.pause??0.8);
     let t0=0; const sp=p.r??11;
     const g=segs.map(sg=>{ const P=sg.d? null: pathVia(sg.via); const d=sg.d||_pts2d(P,18); const t=(sg.t||2.2)/dur; const a=t0, b=t0+t; t0=b; const c=sg.c||p.c||'#FA582D';
        const kt=`0;${a.toFixed(3)};${b.toFixed(3)};1`, kp='0;0;1;1';
        const op=`<animate attributeName="opacity" dur="${dur}s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;${Math.max(0,a-.001).toFixed(3)};${(a+.002).toFixed(3)};${Math.max(a+.003,b-.002).toFixed(3)};${b.toFixed(3)};1" begin="${p.begin||0}s"/>`;
        const lw=sg.lw||(sg.lab? sg.lab.replace(/<[^>]+>/g,'').length*8.6+26:0);
        const lab=sg.lab?`<g transform="translate(0 -${sp+24})"><rect x="${-lw/2}" y="-16" width="${lw}" height="30" rx="15" fill="${c}"/><text y="5" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="var(--mono)">${sg.lab}</text></g>`:'';
        const blk=sg.block? (()=>{ const E=P? P[P.length-1] : [0,0]; return `<g transform="translate(${E[0]} ${E[1]})" opacity="0"><animate attributeName="opacity" dur="${dur}s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;${(b-.01).toFixed(3)};${Math.min(.999,b+.01).toFixed(3)};${Math.min(.999,b+.14).toFixed(3)};1" begin="${p.begin||0}s"/><circle r="30" fill="#DC2626" fill-opacity=".18" stroke="#DC2626" stroke-width="3"/><path d="M-12 -12L12 12M12 -12L-12 12" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/></g>`; })() : '';
        return `<g opacity="0">${op}<circle r="${sp}" fill="${c}" filter="url(#gl)"/><circle r="${sp*.45}" fill="#fff"/>${lab}<animateMotion dur="${dur}s" repeatCount="indefinite" path="${d}" keyPoints="${kp}" keyTimes="${kt}" calcMode="linear" begin="${p.begin||0}s"/></g>${blk}`; }).join('');
     if(p.s && !p.keep){ const e=p.until||p.s; return `<g class="pkc" data-cur="${p.s}-${e}">${g}</g>`; }
     return wrap(p.s,g,'f'); }).join('');
  const T=(o.t||[]).map(t=>wrap(t.s,`<text x="${t.x}" y="${t.y}" text-anchor="${t.a||'middle'}" font-size="${t.fs||18}" font-weight="${t.fw||700}" fill="${t.c||ink}" ${t.s?'':'class="a fade" style="--d:.6s"'}>${t.t}</text>`)).join('');
  return `<svg class="flowx" viewBox="0 0 ${W} ${Hh}" style="position:absolute;left:${X}px;top:${Y}px;width:${W}px;height:${Hh}px;overflow:visible">${o.pre||''}${z}${L}${o.mid||''}${pk}${nodes}${T}${o.svg||''}</svg>${o.html||''}`;
}

/* Récap animé : hub + cartes reliées par des connecteurs calculés */
function RECAP(o){
  const it=o.items||[], n=it.length; const top=o.top||178, bot=o.bot||830, gap=16;
  const h=Math.min(o.ch||124,(bot-top-(n-1)*gap)/n); const tot=n*h+(n-1)*gap; const y0=top+((bot-top)-tot)/2;
  const cx=o.cx||330, cy=o.cy||510, R=150, cardX=o.cardX||660;
  const auto=o.steps===false;
  const cards=it.map((x,i)=>{ const y=y0+i*(h+gap); const s=i+1;
    const ic = x.ic? (NET[x.ic]? `<svg viewBox="0 0 64 64" style="width:54px;height:54px"><use href="#i-${x.ic}"/></svg>` : `<span style="font-size:38px;line-height:1">${x.ic}</span>`) : `<b style="font-size:26px">${i+1}</b>`;
    return `<div class="rc-card ${auto?'a r':'f right'}" ${auto?`style="--d:${.5+i*.22}s;top:${y}px;height:${h}px;left:${cardX}px"`:`data-s="${s}" style="top:${y}px;height:${h}px;left:${cardX}px"`}>
      <div class="rc-ic">${ic}</div><div class="rc-tx"><div class="rc-t">${x.t}</div>${x.d?`<div class="rc-d">${x.d}</div>`:''}</div>
      <svg class="rc-ck" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="none" stroke="#16A34A" stroke-width="3" class="draw" pathLength="1" style="--d:.25s"/><path d="M12 20.5l5.5 5.5L28.5 14" fill="none" stroke="#16A34A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="draw" pathLength="1" style="--d:.55s"/></svg></div>`; }).join('');
  const cons=it.map((x,i)=>{ const y=y0+i*(h+gap)+h/2; const ang=Math.atan2(y-cy,cardX-cx); const sx=cx+Math.cos(ang)*(R+8), sy=cy+Math.sin(ang)*(R+8);
    const d=`M${sx.toFixed(1)} ${sy.toFixed(1)} C ${(sx+(cardX-sx)*.55).toFixed(1)} ${sy.toFixed(1)}, ${(cardX-(cardX-sx)*.45).toFixed(1)} ${y}, ${cardX-6} ${y}`;
    const inner=`<path d="${d}" fill="none" stroke="url(#gO)" stroke-width="3" class="draw" pathLength="1" style="--d:.05s"/><circle cx="${cardX-6}" cy="${y}" r="6" fill="#FA582D"/><circle r="5" fill="#FFB37A" filter="url(#gl)"><animateMotion dur="2.2s" begin="${(i*.37).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`;
    return auto? `<g class="a fade" style="--d:${.4+i*.22}s">${inner}</g>` : `<g class="f" data-s="${i+1}">${inner}</g>`; }).join('');
  const hub=`<g transform="translate(${cx} ${cy})">
     <circle r="${R+70}" fill="none" stroke="#FA582D" stroke-opacity=".12" stroke-width="2" stroke-dasharray="4 12" class="spin"/>
     <circle r="${R+34}" fill="none" stroke="#FA582D" stroke-opacity=".22" stroke-width="2"/>
     <g class="spin" style="animation-duration:9s"><circle cx="${R+34}" cy="0" r="7" fill="#FA582D" filter="url(#gl)"/></g>
     <g class="spin" style="animation-duration:14s;animation-direction:reverse"><circle cx="0" cy="${-(R+70)}" r="5" fill="#0EA5E9" filter="url(#gl)"/></g>
     <circle r="${R}" fill="url(#gK)" class="a pop" style="--d:.15s" filter="url(#sh)"/>
     <circle r="${R-16}" fill="none" stroke="url(#gO)" stroke-width="10" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" class="draw" style="--d:.4s;animation-duration:2.2s" transform="rotate(-90)"/>
     <text y="-22" text-anchor="middle" font-size="18" font-weight="800" fill="#FF8A3D" letter-spacing=".22em">${o.hk||'À RETENIR'}</text>
     <text y="44" text-anchor="middle" font-size="${o.hfs||66}" font-weight="900" fill="#fff" letter-spacing="-.03em">${o.hub||''}</text>
     <text y="84" text-anchor="middle" font-size="17" font-weight="700" fill="rgba(255,255,255,.65)">${o.hsub||''}</text></g>`;
  return `${H(o.t||'À retenir',o.k||'Récap animé')}
  <svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:1600px;height:900px;pointer-events:none">${cons}${hub}</svg>${cards}`;
}
