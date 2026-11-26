/* TechnoEdu — curriculum-extra-v2.js
   Remplace curriculum-extra.js : complète TOUS les chapitres vides
   et ajoute le mélange des choix au retentative.
   Types : (QCM défaut) | 'tf' | 'num' | 'fill' | 'order' | 'match'
*/

/* ══════════════════════════════════════════════════════════
   HELPER
══════════════════════════════════════════════════════════ */
function patchChapter(disc,modId,chId,lesson,quiz){
  const mod=CURRICULUM[disc].modules.find(m=>m.id===modId);
  if(!mod){console.warn('patchChapter: module not found',disc,modId);return;}
  const ch=mod.chapters.find(c=>c.id===chId);
  if(!ch){console.warn('patchChapter: chapter not found',disc,modId,chId);return;}
  if(lesson){
    lesson.disc=CURRICULUM[disc].name;
    lesson.mod='Module '+modId.slice(1)+' — '+mod.title;
    ch.lesson=lesson;
  }
  if(quiz) ch.quiz=quiz;
}

/* ══════════════════════════════════════════════════════════
   SHUFFLE DES CHOIX À CHAQUE TENTATIVE
   Modifie startQuiz pour mélanger les choices sans changer la logique answer
══════════════════════════════════════════════════════════ */
(function patchStartQuiz(){
  const _orig = window.startQuiz || null;
  // On surcharge après le chargement complet
  document.addEventListener('DOMContentLoaded', function(){
    const origFn = window.startQuiz;
    if(!origFn) return;
    window.startQuiz = function(ch){
      if(ch && ch.quiz){
        ch.quiz = ch.quiz.map(q => {
          if(q.type && q.type !== 'tf') return q; // num/fill/order/match : pas de shuffle choices
          if(!q.choices || q.choices.length < 2) return q;
          // Associe index original → texte
          const indexed = q.choices.map((c,i)=>({c,i}));
          // Shuffle
          for(let j=indexed.length-1;j>0;j--){
            const k=Math.floor(Math.random()*(j+1));
            [indexed[j],indexed[k]]=[indexed[k],indexed[j]];
          }
          const newChoices = indexed.map(x=>x.c);
          // Recalcule answer : trouve où est passé l'ancien index correct
          const newAnswer = indexed.findIndex(x=>x.i===q.answer);
          return {...q, choices:newChoices, answer:newAnswer};
        });
      }
      origFn(ch);
    };
  });
})();

/* ══════════════════════════════════════════════════════════
   ÉLECTRICITÉ
══════════════════════════════════════════════════════════ */

// elec m2 ch2 — Courant triphasé
patchChapter('elec','m2','ch2',{sections:[
  {type:'text',title:'Le système triphasé',body:`Le <strong>courant triphasé</strong> est composé de trois tensions sinusoïdales déphasées de 120° les unes par rapport aux autres. Il est utilisé dans la quasi-totalité des réseaux industriels (380 V / 400 V) car il permet de transporter plus de puissance avec moins de cuivre et de faire tourner les moteurs asynchrones.`},
  {type:'formula',formula:'U = √3 × V',legend:'U : tension entre phases (V) · V : tension simple phase-neutre (V) · √3 ≈ 1,732'},
  {type:'table',title:'Tensions triphasées en France',rows:[
    ['','Tension','Application'],
    ['Tension simple (V)','230 V','Phase – Neutre (prise résidentielle)'],
    ['Tension composée (U)','400 V','Phase – Phase (moteurs, industrie)'],
  ]},
  {type:'list',items:['<strong>Montage étoile (Y) :</strong> neutre disponible · V = U/√3 · courant de ligne = courant de phase','<strong>Montage triangle (Δ) :</strong> pas de neutre · courant de ligne = √3 × courant de phase','<strong>Puissance triphasée :</strong> P = √3 × U × I × cos φ','<strong>Déphasage :</strong> 120° entre chaque phase (2π/3 rad)']},
  {type:'tip',text:'Mémo : 230 × √3 ≈ 400 V. En étoile, la tension composée vaut toujours √3 fois la tension simple.'}
]},[
  {q:'Quelle est la relation entre tension composée U et tension simple V en triphasé ?',sub:'Montage étoile.',choices:['U = V / √3','U = √3 × V','U = 3V','U = V'],answer:1,expl:'En étoile : U = √3 × V ≈ 1,732 × 230 ≈ 400 V. Les deux tensions existent dans le réseau : 230 V entre phase et neutre, 400 V entre deux phases.'},
  {type:'num',q:'La tension entre phases est 400 V. Quelle est la tension simple (phase-neutre) ?',sub:'V = U / √3, arrondi à 1 V',answer:231,tol:1,unit:'V',expl:'V = 400 / √3 ≈ 231 V ≈ 230 V (valeur nominale).'},
  {type:'tf',q:'En montage triangle, le courant de ligne est égal au courant de phase.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. En triangle : I_ligne = √3 × I_phase. En étoile, les deux sont égaux.'},
  {type:'order',q:'Remets les étapes de calcul de la puissance triphasée',sub:'P = √3 × U × I × cos φ',items:['Relever U (tension composée)','Relever I (courant de ligne)','Mesurer cos φ','Calculer P = √3 × U × I × cos φ'],expl:'On mesure d\'abord les trois grandeurs, puis on applique la formule.'},
  {type:'match',q:'Associe chaque montage à sa caractéristique',sub:'Triphasé étoile / triangle',pairs:[['Étoile (Y)','Neutre disponible'],['Triangle (Δ)','Courant ligne = √3 × I_phase'],['Les deux','P = √3 × U × I × cos φ']],expl:'L\'étoile a un neutre ; le triangle amplifie le courant ; la formule de puissance s\'applique aux deux.'}
]);

// elec m2 ch3 — Puissance réactive / cos φ
patchChapter('elec','m2','ch3',{sections:[
  {type:'text',title:'Puissance active, réactive, apparente',body:`En courant alternatif, la puissance se décompose en trois composantes : la <strong>puissance active P</strong> (kW, travail utile), la <strong>puissance réactive Q</strong> (kVAr, énergie stockée/restituée par L et C) et la <strong>puissance apparente S</strong> (kVA, ce que fournit le réseau).`},
  {type:'formula',formula:'S² = P² + Q²   ·   cos φ = P / S',legend:'Triangle des puissances · cos φ = facteur de puissance'},
  {type:'tip',text:'Un cos φ bas (< 0,8) augmente I sans augmenter P utile → pertes dans les câbles et pénalités EDF. On le corrige avec des condensateurs qui fournissent la réactive Q capacitive.'}
]},[
  {q:'Quelle puissance est consommée par la résistance mécanique d\'un moteur ?',sub:'Triangle des puissances.',choices:['Puissance réactive Q','Puissance apparente S','Puissance active P','Puissance déformante'],answer:2,expl:'La puissance active P (en Watts) est la puissance utile convertie en travail ou chaleur. Q est échangée avec le réseau sans être consommée ; S est le produit U×I.'},
  {type:'num',q:'P = 6 kW, Q = 8 kVAr. Quelle est la puissance apparente S ?',sub:'S² = P² + Q²',answer:10,unit:'kVA',expl:'S = √(6²+8²) = √(36+64) = √100 = 10 kVA.'},
  {type:'num',q:'P = 10 kW, S = 12,5 kVA. Calculez cos φ (arrondi 0,01).',sub:'cos φ = P/S',answer:0.80,tol:0.01,expl:'cos φ = 10/12,5 = 0,80.'},
  {type:'tf',q:'Des condensateurs de compensation réduisent la puissance active P.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Les condensateurs fournissent de la puissance réactive Q capacitive pour compenser Q inductif, ce qui améliore cos φ sans changer P.'},
  {type:'fill',q:'L\'unité de la puissance réactive Q est le kilo_______.',sub:'Complète',answer:['VAr','var','voltampèreréactif'],expl:'Q se mesure en VAr (voltampère-réactif) ou kVAr.'}
]);

// elec m3 — Installations & protection
patchChapter('elec','m3','ch1',{sections:[
  {type:'text',title:'La NF C 15-100',body:`La norme <strong>NF C 15-100</strong> régit les installations électriques basse tension des bâtiments en France. Elle fixe les règles de sécurité : sections de câbles, protection différentielle, disjoncteurs, prises de terre, tableaux…`},
  {type:'list',items:['<strong>Section des câbles :</strong> minimum 1,5 mm² éclairage · 2,5 mm² prises · 6 mm² cuisinière','<strong>Disjoncteur différentiel 30 mA :</strong> obligatoire pour salle de bain, cuisine, extérieur','<strong>Prise de terre :</strong> résistance ≤ 100 Ω (Norme). Obligatoire pour les prises 2P+T','<strong>Tableau électrique :</strong> disjoncteur général + disjoncteurs divisionnaires par circuit']},
  {type:'norme',text:'<strong>NF C 15-100 (édition 2015 + amendements) :</strong> Installations électriques à basse tension. Applicable aux bâtiments résidentiels et tertiaires. Remplacée en partie par la UTE C 15-100 pour les ERP.'},
  {type:'tip',text:'Règle d\'or : toujours couper le courant au tableau AVANT d\'intervenir sur un circuit. Vérifier l\'absence de tension avec un VAT (Vérificateur d\'Absence de Tension).'}
]},[
  {q:'Quelle section minimale utilise-t-on pour les circuits de prises de courant (NF C 15-100) ?',sub:'Section des conducteurs.',choices:['1,5 mm²','2,5 mm²','4 mm²','6 mm²'],answer:1,expl:'2,5 mm² est la section minimale pour les circuits de prises 16 A. 1,5 mm² est réservé à l\'éclairage. 6 mm² pour les gros appareils (cuisinière, chauffe-eau).'},
  {type:'tf',q:'Un disjoncteur différentiel 300 mA suffit pour protéger une salle de bain.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. La salle de bain exige obligatoirement un 30 mA (haute sensibilité) pour la protection contre les contacts indirects. 300 mA est utilisé en tête de tableau pour protection incendie.'},
  {type:'num',q:'La résistance de prise de terre ne doit pas dépasser ___Ω selon la norme.',sub:'Valeur réglementaire NF C 15-100',answer:100,tol:0,unit:'Ω',expl:'La NF C 15-100 impose une résistance de prise de terre ≤ 100 Ω. En pratique, on vise moins de 50 Ω pour une meilleure sécurité.'},
  {type:'fill',q:'Avant toute intervention électrique, on vérifie l\'absence de tension avec un ___.',sub:'Instrument de sécurité obligatoire',answer:['VAT','vérificateur d\'absence de tension'],expl:'Le VAT (Vérificateur d\'Absence de Tension) est l\'outil de sécurité indispensable avant toute intervention électrique.'},
  {type:'match',q:'Associe chaque usage à la section de câble appropriée',sub:'NF C 15-100',pairs:[['Éclairage','1,5 mm²'],['Prises de courant','2,5 mm²'],['Cuisinière électrique','6 mm²']],expl:'Ces sections assurent que le câble ne chauffe pas dangereusement sous le courant nominal du circuit.'}
]);

patchChapter('elec','m3','ch2',{sections:[
  {type:'text',title:'Protections électriques',body:`Les dispositifs de protection servent à couper le circuit en cas de défaut : <strong>disjoncteur</strong> (surcharge et court-circuit), <strong>fusible</strong> (fusion par excès de courant), <strong>différentiel</strong> (défaut d'isolement).`},
  {type:'table',title:'Comparatif des protections',rows:[
    ['Dispositif','Rôle','Réarmable ?'],
    ['Fusible','Court-circuit + surcharge','Non (à remplacer)'],
    ['Disjoncteur magnéto-thermique','Surcharge (thermique) + CC (magnétique)','Oui'],
    ['Différentiel 30 mA','Défaut d\'isolement / contact','Oui (après correction)'],
    ['Parafoudre','Surtension transitoire (foudre)','Oui'],
  ]},
  {type:'tip',text:'Un disjoncteur qui saute immédiatement après réarmement → court-circuit dans le circuit. S\'il saute après quelques minutes → surcharge (trop de consommateurs).'}
]},[
  {q:'Un disjoncteur magnéto-thermique protège contre :',sub:'Double protection.',choices:['Uniquement les courts-circuits','Uniquement les surcharges','Les surcharges ET les courts-circuits','Les défauts d\'isolement'],answer:2,expl:'Le déclencheur thermique (bilame) protège contre les surcharges lentes. Le déclencheur magnétique protège contre les courts-circuits instantanés. Le différentiel gère les défauts d\'isolement.'},
  {type:'tf',q:'Un fusible grillé peut être réarmé en appuyant sur un bouton.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Un fusible grillé doit être physiquement remplacé. Seul le disjoncteur se réarme en relevant le levier.'},
  {type:'fill',q:'Le déclencheur ___ d\'un disjoncteur réagit instantanément aux courts-circuits.',sub:'Complète',answer:['magnétique','magnéto'],expl:'Le déclencheur magnétique réagit en quelques millisecondes aux courts-circuits grâce à l\'effet électromagnétique du courant élevé.'},
  {type:'num',q:'Un différentiel "haute sensibilité" a un seuil de déclenchement de __ mA.',sub:'Valeur standard pour salle de bain',answer:30,tol:0,unit:'mA',expl:'30 mA est le seuil haute sensibilité, obligatoire dans les salles de bain et pour les circuits extérieurs. 300 mA est moyenne sensibilité (protection incendie en tête de tableau).'},
  {type:'order',q:'Remets dans l\'ordre les étapes de recherche d\'un défaut électrique',sub:'Méthode de dépannage',items:['Couper le disjoncteur défaillant','Identifier les consommateurs du circuit','Débrancher tous les appareils','Réarmer et rebrancher un par un'],expl:'On isole d\'abord, puis on identifie les appareils, on vide le circuit et on rebranch progressivement pour trouver le fautif.'}
]);

// elec m4 — Machines électriques ch3 (variateur) déjà dans extra original + ch1,ch2,ch4
patchChapter('elec','m4','ch1',{sections:[
  {type:'text',title:'Moteur asynchrone triphasé',body:`Le <strong>moteur asynchrone triphasé</strong> (ou moteur à induction) est le moteur industriel le plus répandu. Le stator crée un champ tournant qui induit des courants dans le rotor (en court-circuit). Le rotor tourne légèrement moins vite que le champ : c'est le <strong>glissement g</strong>.`},
  {type:'formula',formula:'g = (ns − n) / ns',legend:'g : glissement · ns : vitesse de synchronisme · n : vitesse réelle (tr/min)'},
  {type:'list',items:['<strong>Couple de démarrage :</strong> élevé mais courant de démarrage 5 à 7 × In','<strong>Couplage étoile/triangle :</strong> réduit le courant de démarrage × 3','<strong>Plaque signalétique :</strong> Y 400V / Δ 230V = brancher en étoile sur 400V ou triangle sur 230V','<strong>Classes rendement IE :</strong> IE1 → IE4, IE3 obligatoire depuis 2015 (CE)']},
  {type:'norme',text:'<strong>IEC 60034-1 :</strong> Machines tournantes — caractéristiques assignées et performances. <strong>IEC 60034-30 :</strong> Classes de rendement des moteurs (IE1 à IE4).'}
]},[
  {q:'Qu\'est-ce que le glissement d\'un moteur asynchrone ?',sub:'Paramètre fondamental.',choices:['La différence de tension entre stator et rotor','L\'écart relatif entre la vitesse de synchronisme et la vitesse réelle','Le courant absorbé au démarrage','Le bruit mécanique du moteur'],answer:1,expl:'g = (ns − n) / ns. À vide, g ≈ 0,5–3%. En charge nominale, g ≈ 3–8%. Si g = 0, le rotor tourne à la même vitesse que le champ → aucune induction → aucun couple !'},
  {type:'num',q:'ns = 1 500 tr/min, n = 1 440 tr/min. Quel est le glissement en % ?',sub:'g = (ns−n)/ns × 100',answer:4,unit:'%',expl:'g = (1500−1440)/1500 = 60/1500 = 0,04 = 4%.'},
  {type:'tf',q:'Le couplage étoile/triangle divise le courant de démarrage par 3.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai : le démarrage étoile réduit la tension par √3 → courant divisé par 3. C\'est l\'avantage du démarrage étoile/triangle.'},
  {type:'fill',q:'La norme définissant les classes de rendement des moteurs est l\'IEC ___.',sub:'Numéro de norme',answer:['60034-30','IEC 60034-30'],expl:'IEC 60034-30 définit les classes IE1 (Standard), IE2 (Haut Rendement), IE3 (Premium), IE4 (Super Premium).'},
  {type:'match',q:'Associe chaque couplage à la tension d\'alimentation',sub:'Plaque signalétique moteur Y/Δ',pairs:[['Étoile (Y)','400 V'],['Triangle (Δ)','230 V']],expl:'Un moteur étiqueté Y400/Δ230 se branche en étoile sur un réseau 400V ou en triangle sur 230V.'}
]);

patchChapter('elec','m4','ch2',{sections:[
  {type:'text',title:'Transformateur monophasé',body:`Le <strong>transformateur</strong> est un dispositif statique (sans pièces mobiles) qui transforme une tension alternative en une autre tension alternative de même fréquence, grâce à l'induction mutuelle entre deux enroulements couplés magnétiquement.`},
  {type:'formula',formula:'U2/U1 = N2/N1 = m',legend:'m : rapport de transformation · U : tensions · N : nombre de spires'},
  {type:'list',items:['<strong>Transformateur élévateur :</strong> m > 1 (N2 > N1)','<strong>Transformateur abaisseur :</strong> m < 1 (N2 < N1)','<strong>Conservation de la puissance (idéal) :</strong> P1 = P2 → U1×I1 = U2×I2','<strong>Pertes réelles :</strong> fer (hystérésis + courants de Foucault) + cuivre (effet Joule)']},
  {type:'tip',text:'Mémo : si la tension double (m=2), le courant est divisé par 2. L\'énergie est conservée (moins les pertes).'}
]},[
  {q:'Un transformateur a N1=100 spires et N2=500 spires. U1=230V. Quelle est U2 ?',sub:'U2 = U1 × N2/N1',choices:['46 V','115 V','1 150 V','2 300 V'],answer:2,expl:'U2 = 230 × 500/100 = 230 × 5 = 1 150 V. Le rapport de transformation m = 5 : c\'est un transformateur élévateur.'},
  {type:'tf',q:'Un transformateur fonctionne en courant continu.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Le transformateur repose sur l\'induction électromagnétique, qui nécessite un champ magnétique variable → courant alternatif uniquement. En DC, le flux est constant → pas d\'induction.'},
  {type:'num',q:'U1=400V, I1=5A, U2=200V. Quel est I2 ? (transformateur idéal)',sub:'U1×I1 = U2×I2',answer:10,unit:'A',expl:'Conservation de la puissance : I2 = U1×I1/U2 = 400×5/200 = 10 A. La tension est divisée par 2, le courant est multiplié par 2.'},
  {type:'fill',q:'Les pertes magnétiques dans le noyau du transformateur sont appelées pertes ___.',sub:'Type de pertes',answer:['fer','dans le fer'],expl:'Les pertes fer comprennent les pertes par hystérésis et les pertes par courants de Foucault dans le circuit magnétique. Les pertes cuivre sont dues à la résistance des enroulements.'},
  {type:'order',q:'Classe les tensions du réseau électrique français du plus bas au plus haut',sub:'HTB, HTA, BT',items:['Très Basse Tension < 50 V','Basse Tension 230/400 V','Haute Tension A (HTA) 20 kV','Haute Tension B (HTB) 63–400 kV'],expl:'TBT < BT < HTA < HTB. EDF transporte en HTB, distribue en HTA, livre en BT aux clients résidentiels.'}
]);

patchChapter('elec','m4','ch3',{sections:[
  {type:'text',title:'Variateur de vitesse',body:`Un <strong>variateur de vitesse</strong> (ou convertisseur de fréquence) aliemente un moteur asynchrone avec une tension et une fréquence réglables. Il permet démarrage en douceur, économies d'énergie, et adaptation de la vitesse au besoin.`},
  {type:'formula',formula:'n_s = 60 × f / p',legend:'ns : vitesse de synchronisme (tr/min) · f : fréquence (Hz) · p : nombre de paires de pôles'},
  {type:'list',items:['<strong>Redresseur :</strong> transforme l\'alternatif réseau en continu','<strong>Bus continu :</strong> condensateurs lissent la tension DC','<strong>Onduleur IGBT :</strong> recrée un alternatif à fréquence variable','<strong>Rapport U/f constant :</strong> maintient le couple à toutes les vitesses']},
  {type:'tip',text:'Pour garder un couple constant, le variateur maintient le rapport U/f constant (commande scalaire U/f).'}
]},[
  {q:"Quel étage du variateur crée un alternatif de fréquence variable ?",sub:"Structure d'un variateur",choices:["Le redresseur","Le bus continu","L'onduleur","Le filtre CEM"],answer:2,expl:"L'onduleur (à transistors IGBT) découpe la tension continue pour recréer un alternatif à fréquence réglable."},
  {type:'tf',q:"Un variateur permet un démarrage progressif du moteur.",sub:'Vrai ou faux ?',answer:0,expl:"Vrai : il fait monter la fréquence progressivement, ce qui limite l'appel de courant au démarrage."},
  {type:'num',q:"Un moteur à 2 paires de pôles est alimenté à 50 Hz. Vitesse de synchronisme ?",sub:'ns = 60 × f / p',answer:1500,unit:'tr/min',expl:'ns = 60 × 50 / 2 = 1500 tr/min.'},
  {type:'order',q:"Remets dans l'ordre le trajet de l'énergie dans un variateur",sub:'Du réseau à l\'arbre moteur',items:['Réseau 400V AC','Redresseur','Bus continu DC','Onduleur','Moteur asynchrone'],expl:"Alternatif réseau → continu → lissage → alternatif variable → moteur."},
  {type:'fill',q:'Dans la commande scalaire, le rapport ___ est maintenu constant.',sub:'Rapport du variateur',answer:['U/f','U sur f'],expl:'Le rapport U/f constant garantit un flux constant dans le moteur et donc un couple disponible constant quelle que soit la fréquence.'}
]);

patchChapter('elec','m5','ch3',{sections:[
  {type:'text',title:'Variateur de vitesse (approfondissement)',body:`Le variateur de vitesse permet une maîtrise complète de la vitesse et du couple du moteur asynchrone. La commande vectorielle (FOC) est plus précise que la scalaire U/f.`},
  {type:'formula',formula:'n_s = 60 × f / p',legend:'ns : vitesse de synchronisme (tr/min) · f : fréquence (Hz) · p : nombre de paires de pôles'},
  {type:'list',items:['<strong>Redresseur</strong> : transforme l\'alternatif en continu','<strong>Bus continu</strong> : condensateurs qui lissent la tension','<strong>Onduleur</strong> : recrée un alternatif de fréquence variable']},
  {type:'tip',text:'Pour garder un couple constant, le variateur maintient le rapport U/f constant.'}
]},[
  {q:"Quel étage crée un alternatif de fréquence variable ?",sub:"Structure d'un variateur",choices:["Le redresseur","Le bus continu","L'onduleur","Le filtre CEM"],answer:2,expl:"L'onduleur découpe la tension continue pour recréer un alternatif réglable."},
  {type:'tf',q:"Un variateur permet un démarrage progressif du moteur.",sub:'Vrai ou faux ?',answer:0,expl:"Il fait monter la fréquence progressivement, ce qui limite l'appel de courant."},
  {type:'num',q:"Un moteur à 2 paires de pôles est alimenté à 50 Hz. Vitesse de synchronisme ?",sub:'ns = 60 × f / p',answer:1500,unit:'tr/min',expl:'ns = 60 × 50 / 2 = 1500 tr/min.'},
  {type:'order',q:"Remets dans l'ordre le trajet de l'énergie",sub:'Du réseau à l\'arbre moteur',items:['Réseau','Redresseur','Bus continu','Onduleur','Moteur'],expl:"Alternatif → continu → lissage → alternatif variable → moteur."}
]);

/* ══════════════════════════════════════════════════════════
   ÉLECTRONIQUE
══════════════════════════════════════════════════════════ */

patchChapter('electro','m1','ch3',{sections:[
  {type:'text',title:'La bobine (inductance)',body:`Une <strong>inductance</strong> emmagasine de l'énergie sous forme de champ magnétique et s'oppose aux variations du courant. Son unité est le <strong>henry (H)</strong>. Plus la fréquence est haute, plus la bobine bloque le courant.`},
  {type:'formula',formula:'X_L = 2π × f × L',legend:'XL : réactance inductive (Ω) · f : fréquence (Hz) · L : inductance (H)'},
  {type:'list',items:['Filtrage des parasites haute fréquence','Stockage d\'énergie dans les alimentations à découpage','Transformateurs et antennes']},
  {type:'tip',text:'En continu (f = 0), une bobine idéale se comporte comme un fil. Plus la fréquence monte, plus elle bloque le courant.'}
]},[
  {q:"Quelle est l'unité de l'inductance ?",sub:'Unités',choices:['Farad','Henry','Ohm','Weber'],answer:1,expl:"L'inductance se mesure en henry (H)."},
  {type:'num',q:"Calcule XL pour L = 10 mH et f = 1 kHz. Arrondi à 0,1 Ω.",sub:'XL = 2π × f × L',answer:62.8,tol:0.5,unit:'Ω',expl:'XL = 2π × 1000 × 0,01 ≈ 62,8 Ω.'},
  {type:'tf',q:"Une bobine laisse mieux passer les hautes fréquences.",sub:'Vrai ou faux ?',answer:1,expl:"Faux : XL augmente avec f, elle bloque davantage les hautes fréquences (passe-bas pour l'inductance)."},
  {type:'match',q:"Associe chaque composant à son unité",sub:'Un choix par ligne',pairs:[['Résistance','Ohm (Ω)'],['Condensateur','Farad (F)'],['Inductance','Henry (H)']],expl:'R en ohm, C en farad, L en henry.'},
  {type:'order',q:"Range les composants du plus bloquant au moins bloquant pour les HF",sub:'Effet à haute fréquence',items:['Inductance (bloque HF)','Résistance (neutre)','Condensateur (laisse passer HF)'],expl:'L bloque, R est neutre, C laisse passer les hautes fréquences.'}
]);

// Diodes Zener / LED
patchChapter('electro','m2','ch3',{sections:[
  {type:'text',title:'Diodes spéciales',body:`La <strong>diode Zener</strong> conduit en inverse au-delà de sa tension de claquage Vz, qu'elle maintient constante : elle sert de référence de tension ou de limiteur. La <strong>LED</strong> (diode électroluminescente) émet de la lumière quand elle conduit en direct.`},
  {type:'table',title:'Comparatif diodes spéciales',rows:[
    ['Type','Tension seuil directe','Rôle principal'],
    ['Silicium (1N4007)','0,7 V','Redressement'],
    ['Schottky (1N5819)','0,3 V','HF, faibles pertes'],
    ['Zener (BZX55)','Vz fixe (claquage)','Régulation de tension'],
    ['LED rouge','1,8–2,2 V','Signalisation lumineuse'],
    ['LED bleue/blanche','3,0–3,5 V','Éclairage'],
  ]},
  {type:'tip',text:'La LED doit toujours avoir une résistance de limitation en série : R = (Vcc − Vled) / I_led. Pour I=20 mA, Vcc=5V, Vled=2V : R = (5−2)/0,02 = 150 Ω.'}
]},[
  {q:'Une diode Zener est utilisée principalement en :',sub:'Polarisation de la Zener.',choices:['Polarisation directe comme régulateur','Polarisation inverse pour maintenir Vz constant','Les deux sens selon la tension','Elle ne conduit jamais'],answer:1,expl:'La Zener conduit normalement en direct (comme toute diode Si). Mais son intérêt est en inverse : au-delà de Vz (tension Zener), elle maintient une tension constante, utile pour les références de tension.'},
  {type:'num',q:'Vcc = 9V, Vled = 2V, I_led = 20 mA. Calculez la résistance de limitation.',sub:'R = (Vcc − Vled) / I_led',answer:350,unit:'Ω',expl:'R = (9−2)/0,020 = 350 Ω. En pratique on choisit 330 Ω ou 390 Ω (valeurs E12).'},
  {type:'tf',q:'La couleur d\'une LED dépend du matériau semi-conducteur utilisé.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Rouge : AlGaAs ; vert : GaP ; bleu/blanc : InGaN. La longueur d\'onde (couleur) dépend du gap du matériau.'},
  {type:'fill',q:'La tension à laquelle une Zener conduit en inverse s\'appelle tension de ___.',sub:'Terminologie',answer:['claquage','Zener'],expl:'La tension Zener (ou tension de claquage Vz) est la tension inverse à partir de laquelle la Zener conduit et régule.'},
  {type:'match',q:'Associe chaque type de diode à sa tension seuil directe typique',sub:'Caractéristiques des diodes',pairs:[['Germanium','0,2 V'],['Schottky','0,3 V'],['Silicium','0,7 V']],expl:'Ge ≈ 0,2 V, Schottky ≈ 0,3 V, Si ≈ 0,7 V. Ces valeurs sont approximatives et varient selon le courant et la température.'}
]);

// Transistors BJT
patchChapter('electro','m3','ch1',{sections:[
  {type:'text',title:'Transistor bipolaire BJT',body:`Le <strong>transistor bipolaire</strong> (BJT) est un composant à trois électrodes : <strong>Base (B)</strong>, <strong>Collecteur (C)</strong> et <strong>Émetteur (E)</strong>. Il existe en deux types : NPN et PNP. Il fonctionne comme un amplificateur de courant contrôlé par la base.`},
  {type:'formula',formula:'I_C = β × I_B',legend:'β (bêta) : gain en courant (hFE) · I_C : courant collecteur · I_B : courant base'},
  {type:'list',items:['<strong>Région active :</strong> amplification — B-E polarisé direct, B-C polarisé inverse','<strong>Saturation :</strong> transistor bloqué en ON (switch fermé) — VCEsat ≈ 0,2 V','<strong>Blocage :</strong> IB ≈ 0 → IC ≈ 0 (switch ouvert)','<strong>β typique :</strong> 50 à 500 selon le transistor']},
  {type:'tip',text:'En commutation numérique, on choisit entre blocage (IB=0, switch ouvert) et saturation (IB > IC/β, switch fermé). En amplification, on polarise en région active.'}
]},[
  {q:'Dans un transistor NPN en région active, quel courant contrôle IC ?',sub:'Fonctionnement du BJT.',choices:['La tension VCE','Le courant de collecteur lui-même','Le courant de base IB','La tension VCC'],answer:2,expl:'IC = β × IB. Un petit courant de base IB contrôle un grand courant collecteur IC. C\'est le principe d\'amplification : β = hFE, typiquement 100 à 300.'},
  {type:'num',q:'β = 200, IB = 0,05 mA. Quelle est IC ?',sub:'IC = β × IB',answer:10,unit:'mA',expl:'IC = 200 × 0,05 = 10 mA.'},
  {type:'tf',q:'En saturation, le transistor se comporte comme un interrupteur ouvert.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. En saturation, VCE ≈ 0,2 V et le transistor se comporte comme un interrupteur FERMÉ (passant). En blocage (IB ≈ 0), il est ouvert.'},
  {type:'fill',q:'Le gain en courant d\'un BJT est noté β ou ___.',sub:'Paramètre du transistor',answer:['hFE','h21e'],expl:'β (bêta) = hFE est le gain en courant statique : ratio IC/IB. Sur les datasheets, il est souvent noté hFE.'},
  {type:'match',q:'Associe chaque région de fonctionnement à son état',sub:'Régions du transistor BJT',pairs:[['Blocage','IB ≈ 0, IC ≈ 0 (interrupteur ouvert)'],['Région active','Amplification, IC = β × IB'],['Saturation','VCE ≈ 0,2 V (interrupteur fermé)']],expl:'Les trois régions déterminent le fonctionnement : amplification ou commutation.'}
]);

// MOSFET
patchChapter('electro','m3','ch2',{sections:[
  {type:'text',title:'Transistor MOSFET',body:`Le <strong>MOSFET</strong> (Metal-Oxide-Semiconductor Field-Effect Transistor) est un transistor à effet de champ commandé en <strong>tension</strong> (et non en courant comme le BJT). Il est utilisé dans les microprocesseurs, les alimentations à découpage et les circuits de puissance.`},
  {type:'table',title:'Comparatif BJT vs MOSFET',rows:[
    ['Paramètre','BJT','MOSFET'],
    ['Commande','Courant (IB)','Tension (VGS)'],
    ['Courant entrée','Faible mais ≠ 0','≈ 0 (gate capacitif)'],
    ['Vitesse commutation','Moyenne','Très rapide'],
    ['Usage type','Amplification audio','Alimentation, MCU'],
  ]},
  {type:'tip',text:'Le MOSFET est commandé par la tension grille-source VGS. Tant que VGS < Vth (tension de seuil), le canal est fermé. Au-delà, le canal s\'ouvre et le courant drain-source ID circule.'}
]},[
  {q:'La principale différence entre MOSFET et BJT est que le MOSFET est commandé par :',sub:'Comparaison BJT/MOSFET.',choices:['Un courant de base','Une tension de grille VGS','Un courant de drain','Une résistance variable'],answer:1,expl:'Le MOSFET est commandé en tension (VGS). Son courant de grille est quasi nul (gate capacitif), ce qui simplifie la commande et augmente la rapidité.'},
  {type:'tf',q:'La résistance d\'entrée d\'un MOSFET est très faible.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. La résistance d\'entrée d\'un MOSFET est quasi infinie (gate isolé par l\'oxyde de grille). C\'est l\'un de ses avantages par rapport au BJT.'},
  {type:'fill',q:'La tension minimale à appliquer sur la grille pour ouvrir le canal s\'appelle tension de ___ Vth.',sub:'Paramètre MOSFET',answer:['seuil','threshold'],expl:'La tension de seuil Vth (threshold voltage) est la VGS minimale pour créer le canal conducteur. Typiquement 1–5 V pour les MOSFETs logique.'},
  {type:'match',q:'Associe chaque broche du MOSFET à son équivalent BJT',sub:'Nomenclature des transistors',pairs:[['Grille (G)','Base (B)'],['Drain (D)','Collecteur (C)'],['Source (S)','Émetteur (E)']],expl:'Les deux transistors ont des rôles similaires mais des modes de commande différents.'},
  {type:'order',q:'Remets dans l\'ordre les étapes de commutation d\'un MOSFET N (passage ouvert → fermé)',sub:'Canal N en commutation',items:['VGS < Vth : canal fermé, ID ≈ 0','VGS atteint Vth : canal commence à s\'ouvrir','VGS > Vth : canal complètement ouvert','ID circule librement (RDS_on faible)'],expl:'Le MOSFET passe progressivement de blocage à saturation à mesure que VGS dépasse Vth.'}
]);

// AOP
patchChapter('electro','m3','ch3',{sections:[
  {type:'text',title:'Amplificateur Opérationnel (AOP)',body:`Un <strong>AOP idéal</strong> a un gain en boucle ouverte infini, une impédance d'entrée infinie et une impédance de sortie nulle. En pratique (LM741, TL071, LM358), il fonctionne en boucle fermée (avec contre-réaction) pour des applications précises.`},
  {type:'formula',formula:'G = −R2/R1',legend:'Gain d\'un amplificateur inverseur · R2 : résistance de contre-réaction · R1 : résistance d\'entrée'},
  {type:'list',items:['<strong>Entrée (+) :</strong> non-inverseuse · <strong>Entrée (−) :</strong> inverseuse','<strong>Règle d\'or :</strong> V+ = V− (court-circuit virtuel en boucle fermée)','<strong>Inverseur :</strong> G = −R2/R1 · <strong>Non-inverseur :</strong> G = 1 + R2/R1','<strong>Suiveur (buffer) :</strong> G = 1, haute impédance d\'entrée, faible de sortie']},
  {type:'tip',text:'Mémo du suiveur : sortie reliée directement à l\'entrée (−). V_out = V_in. Rôle : adaptation d\'impédance.'}
]},[
  {q:'Dans un AOP en boucle fermée, la règle d\'or stipule que :',sub:'Propriété fondamentale de l\'AOP.',choices:['La sortie est toujours à la saturation','V+ et V− sont virtuellement égaux','Le courant d\'entrée est maximal','Le gain est toujours 1'],answer:1,expl:'Règle d\'or : V+ = V−. Cette égalité (et le courant d\'entrée nul) permet de calculer simplement tout circuit AOP en boucle fermée.'},
  {type:'num',q:'Montage inverseur, R1 = 10 kΩ, R2 = 100 kΩ. Calculez le gain.',sub:'G = −R2/R1',answer:-10,expl:'G = −100k/10k = −10. Le signe (−) indique l\'inversion de phase.'},
  {type:'tf',q:'Un suiveur (voltage follower) a un gain de 10.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Un suiveur a un gain de 1. Son utilité est l\'adaptation d\'impédance : il présente une très haute impédance à l\'entrée et une très faible à la sortie.'},
  {type:'match',q:'Associe chaque montage AOP à son gain',sub:'Formules des montages AOP',pairs:[['Inverseur','G = −R2/R1'],['Non-inverseur','G = 1 + R2/R1'],['Suiveur','G = 1']],expl:'Ces trois configurations de base couvrent la majorité des applications AOP analogiques.'},
  {type:'fill',q:'L\'entrée (+) de l\'AOP est appelée entrée ___.',sub:'Nomenclature AOP',answer:['non-inverseuse','non inverseuse'],expl:'L\'entrée (+) est non-inverseuse (le signal de sortie est en phase avec le signal appliqué sur (+)). L\'entrée (−) est inverseuse.'}
]);

// Montages AOP
patchChapter('electro','m3','ch4',{sections:[
  {type:'text',title:'Montages AOP avancés',body:`Outre les montages amplificateurs, l'AOP réalise des fonctions mathématiques : <strong>comparateur</strong>, <strong>intégrateur</strong>, <strong>dérivateur</strong>, <strong>soustracteur</strong>, <strong>additionneur</strong>. Ces montages sont à la base du traitement analogique du signal.`},
  {type:'table',title:'Montages AOP courants',rows:[
    ['Montage','Fonction','Formule de sortie'],
    ['Comparateur','Compare V+ et V−','Vout = ±Vsat selon V+>V−'],
    ['Inverseur','Amplifie et inverse','Vout = −(R2/R1) × Vin'],
    ['Intégrateur','Intègre le signal','Vout = −1/(RC) ∫ Vin dt'],
    ['Additionneur','Somme pondérée','Vout = −Rf(V1/R1 + V2/R2 + ...)'],
  ]},
  {type:'tip',text:'Le comparateur est un AOP en boucle OUVERTE (sans contre-réaction). La sortie sature à ±Vsat. Ne pas le confondre avec l\'amplificateur (boucle fermée).'}
]},[
  {q:'Un comparateur AOP est utilisé en :',sub:'Boucle ouverte ou fermée ?',choices:['Boucle fermée avec R2/R1','Boucle ouverte (sans contre-réaction)','Montage suiveur','Montage intégrateur'],answer:1,expl:'Le comparateur utilise l\'AOP en boucle ouverte. Le gain infini fait saturer la sortie à +Vsat ou −Vsat selon que V+ > V− ou V+ < V−.'},
  {type:'tf',q:'L\'intégrateur AOP a un condensateur dans la branche de contre-réaction.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. L\'intégrateur utilise un condensateur C en contre-réaction (au lieu de R2). Vout = −1/(R1C) × ∫Vin dt.'},
  {type:'fill',q:'Dans un additionneur inverseur AOP, chaque entrée est connectée via une résistance à l\'entrée ___ de l\'AOP.',sub:'Entrée concernée',answer:['inverseuse','−','moins'],expl:'L\'additionneur inverseur somme les courants sur l\'entrée (−) : chaque Vin/Ri se cumule, et la résistance de contre-réaction Rf convertit cette somme de courants en tension de sortie.'},
  {type:'num',q:'Intégrateur : R=10kΩ, C=1µF. Si Vin=1V constant depuis t=0, Vout à t=1s ?',sub:'Vout = −1/(RC) × Vin × t',answer:-10,unit:'V',expl:'Vout = −1/(10k × 1µ) × 1 × 1 = −1/0,01 × 1 = −10 V (si l\'AOP ne sature pas).'},
  {type:'match',q:'Associe chaque montage à sa fonction',sub:'Montages AOP',pairs:[['Comparateur','Bascule la sortie selon V+ vs V−'],['Intégrateur','Calcule l\'intégrale du signal'],['Additionneur','Somme plusieurs entrées']],expl:'Ces montages constituent les briques de base du traitement analogique du signal.'}
]);

/* ══════════════════════════════════════════════════════════
   AUTOMATISME
══════════════════════════════════════════════════════════ */

patchChapter('auto','m1','ch3',{sections:[
  {type:'text',title:'Tableau de Karnaugh',body:`Le <strong>tableau de Karnaugh</strong> simplifie une fonction logique de façon graphique. Les cases suivent le <strong>code Gray</strong> : une seule variable change entre deux cases voisines.`},
  {type:'list',items:['Regrouper les 1 en rectangles de 1, 2, 4 ou 8 cases','Prendre les groupes les plus grands possible','Les bords du tableau se touchent (il « s\'enroule »)','Chaque 1 doit être couvert au moins une fois']},
  {type:'tip',text:'Dans un groupe, on ne garde que les variables qui ne changent pas.'}
]},[
  {q:"Combien de cases a un tableau de Karnaugh à 3 variables ?",sub:'2 puissance n',choices:['4','6','8','16'],answer:2,expl:'2³ = 8 cases.'},
  {type:'num',q:"Combien de cases pour 4 variables ?",sub:'2 puissance n',answer:16,tol:0,expl:'2⁴ = 16 cases.'},
  {type:'fill',q:"Entre deux cases voisines, une seule variable change : c'est le code ___.",sub:'Complète',answer:['Gray'],expl:'Le code Gray garantit un seul changement entre voisins.'},
  {type:'tf',q:"Un groupe de 3 cases est autorisé dans un Karnaugh.",sub:'Vrai ou faux ?',answer:1,expl:'Faux : les groupes ont 1, 2, 4 ou 8 cases (puissances de 2 uniquement).'},
  {type:'order',q:"Remets dans l'ordre les étapes de simplification par Karnaugh",sub:'Méthode complète',items:['Dresser la table de vérité','Remplir le tableau de Karnaugh','Identifier les plus grands groupes de 1','Écrire l\'expression simplifiée'],expl:'Table de vérité → Karnaugh → regroupements → expression minimale.'}
]);

// Multiplexeurs
patchChapter('auto','m1','ch4',{sections:[
  {type:'text',title:'Multiplexeurs et décodeurs',body:`Un <strong>multiplexeur (MUX)</strong> sélectionne une parmi N entrées et la connecte à la sortie, via des bits de sélection. Un <strong>décodeur</strong> active une sortie parmi 2^n selon le code binaire en entrée. Un <strong>comparateur</strong> compare deux mots binaires.`},
  {type:'table',title:'Composants MSI courants',rows:[
    ['Composant','Entrées','Sorties','Fonction'],
    ['MUX 4:1','4 données + 2 sel','1','Sélectionne 1/4 entrée'],
    ['DMUX 1:4','1 données + 2 sel','4','Distribue vers 1/4 sortie'],
    ['Décodeur 2:4','2 adresses + enable','4 (1 active)','Active la sortie sélectionnée'],
    ['Comparateur 4 bits','A[3:0], B[3:0]','A>B, A=B, A<B','Compare deux mots de 4 bits'],
  ]},
  {type:'tip',text:'Un MUX 2^n:1 a n bits de sélection. MUX 4:1 → 2 bits sel, MUX 8:1 → 3 bits sel, MUX 16:1 → 4 bits sel.'}
]},[
  {q:'Un MUX 8:1 a combien de bits de sélection ?',sub:'2^n = 8.',choices:['1','2','3','4'],answer:2,expl:'2³ = 8 : il faut 3 bits de sélection pour choisir 1 parmi 8 entrées.'},
  {type:'tf',q:'Un décodeur 3:8 active exactement une sortie à la fois.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Le décodeur 3:8 reçoit un code 3 bits (0 à 7) et active la sortie correspondante. Les 7 autres restent inactives.'},
  {type:'fill',q:'L\'opération inverse du multiplexeur est le ___.',sub:'Composant complémentaire',answer:['démultiplexeur','DMUX','demultiplexeur'],expl:'Le DMUX (démultiplexeur) distribue une entrée vers l\'une de ses N sorties selon le code de sélection.'},
  {type:'num',q:'Un décodeur 4:16 a combien de sorties ?',sub:'2^n sorties',answer:16,tol:0,expl:'Un décodeur n:2^n avec n=4 a 2⁴ = 16 sorties.'},
  {type:'match',q:'Associe chaque composant à sa fonction',sub:'MSI logique',pairs:[['MUX','Sélectionne 1 parmi N entrées'],['Décodeur','Active 1 sortie parmi 2^n'],['Comparateur','Compare A et B, sort A>B, A=B, A<B']],expl:'Ces trois composants sont les briques de base des circuits de routage et de contrôle numérique.'}
]);

// Grafcet structures de base
patchChapter('auto','m2','ch3',{sections:[
  {type:'text',title:'Structures Grafcet',body:`Le Grafcet dispose de structures pour décrire les divergences, convergences et répétitions. Les deux principales sont la <strong>sélection de séquences</strong> (OU) et l'<strong>simultanéité</strong> (ET).`},
  {type:'table',title:'Structures Grafcet',rows:[
    ['Structure','Symbole','Signification'],
    ['Divergence en OU','Flèches simples','Une seule branche s\'active selon la condition'],
    ['Convergence en OU','Flèches simples','Quelle que soit la branche active, on rejoint'],
    ['Divergence en ET','Doubles traits','Toutes les branches s\'activent simultanément'],
    ['Convergence en ET','Doubles traits','On attend que toutes les branches soient finies'],
    ['Saut d\'étapes','Flèche qui saute','On passe directement à une étape ultérieure'],
  ]},
  {type:'tip',text:'Divergence en ET = parallélisme (plusieurs automates simultanés). Divergence en OU = choix exclusif (un seul chemin). La convergence en ET attend que TOUS les chemin soient terminés.'}
]},[
  {q:'Une divergence en ET dans un Grafcet signifie :',sub:'Structure Grafcet.',choices:['Choix exclusif entre plusieurs branches','Toutes les branches s\'activent simultanément','Fin de séquence','Reprise au début'],answer:1,expl:'La divergence en ET (double trait) active toutes les branches simultanément. C\'est le parallélisme : plusieurs étapes peuvent être actives en même temps.'},
  {type:'tf',q:'Dans une convergence en ET, on attend que TOUTES les branches soient terminées.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. La convergence en ET (double trait) synchronise les branches parallèles : on ne progresse que quand toutes ont atteint leur étape finale respective.'},
  {type:'fill',q:'La structure de choix exclusif entre plusieurs séquences est la divergence en ___.',sub:'Complète',answer:['OU','ou'],expl:'Divergence en OU = une seule branche s\'active, selon la réceptivité vraie. Les réceptivités doivent être mutuellement exclusives pour éviter les ambiguïtés.'},
  {type:'match',q:'Associe chaque structure à son rôle',sub:'Structures Grafcet',pairs:[['Divergence en ET','Parallélisme (branches simultanées)'],['Divergence en OU','Choix exclusif de séquence'],['Convergence en ET','Synchronisation des branches']],expl:'Ces structures permettent de modéliser tous les comportements séquentiels industriels.'},
  {type:'order',q:'Remets dans l\'ordre les éléments d\'un Grafcet simple de démarrage/arrêt',sub:'Lecture d\'un Grafcet',items:['Étape initiale 0 : repos','Transition : bouton démarrage','Étape 1 : moteur en marche','Transition : bouton arrêt'],expl:'Un Grafcet se lit du haut vers le bas : étape → transition → étape → ...'}
]);

// API / PLC
patchChapter('auto','m3','ch1',{sections:[
  {type:'text',title:'Architecture d\'un automate programmable (API)',body:`Un <strong>automate programmable industriel (API / PLC)</strong> est un calculateur industriel conçu pour commander des machines en temps réel. Il scrute en boucle les entrées, exécute le programme et met à jour les sorties.`},
  {type:'table',title:'Structure d\'un API',rows:[
    ['Module','Rôle'],
    ['CPU (processeur)','Exécute le programme (cycle de scrutation)'],
    ['Mémoire','Stocke programme (EEPROM) et données (RAM)'],
    ['Entrées TOR/ANA','Reçoit les signaux capteurs (0/1 ou 0–10V, 4–20mA)'],
    ['Sorties TOR/ANA','Commande actionneurs (relais, transistor, 0–10V)'],
    ['Bus de communication','Profibus, EtherNet/IP, Modbus...'],
  ]},
  {type:'formula',formula:'T_cycle = T_entrées + T_traitement + T_sorties',legend:'Temps de cycle API typique : 1 à 100 ms'},
  {type:'tip',text:'Un API fonctionne en cycle répétitif : lecture des entrées → traitement du programme → mise à jour des sorties. Ce cycle recommence en permanence, typiquement toutes les 1 à 20 ms.'}
]},[
  {q:'Quelle est la séquence d\'exécution d\'un cycle API ?',sub:'Cycle de scrutation.',choices:['Sorties → Traitement → Entrées','Entrées → Sorties → Traitement','Entrées → Traitement → Sorties','Traitement → Entrées → Sorties'],answer:2,expl:'Le cycle API : 1) Lecture des entrées → 2) Exécution du programme → 3) Mise à jour des sorties. Ce cycle se répète en boucle (scrutation cyclique).'},
  {type:'tf',q:'Un API peut exécuter plusieurs programmes en parallèle simultanément.',sub:'Vrai ou faux ?',answer:1,expl:'Faux (en général). Un API monoprocesseur exécute son programme séquentiellement en un cycle. Certains API multitâches peuvent gérer des tâches de priorités différentes, mais le programme principal reste séquentiel.'},
  {type:'num',q:'Un API a un temps de cycle de 10 ms. En 1 seconde, il effectue ___ cycles.',sub:'Nombre de cycles/seconde',answer:100,tol:0,expl:'1 s / 10 ms = 100 cycles par seconde.'},
  {type:'fill',q:'Les entrées analogiques d\'un API reçoivent typiquement des signaux en ___ à 20 mA.',sub:'Signal industriel standard',answer:['4','4 mA'],expl:'La boucle de courant 4-20 mA est le signal analogique industriel standard. 4 mA = minimum (0%), 20 mA = maximum (100%). L\'absence de courant (0 mA) signale une rupture de câble.'},
  {type:'match',q:'Associe chaque bus industriel à sa famille',sub:'Communication API',pairs:[['Profibus','Siemens / Industrial Ethernet'],['Modbus','Protocole série open-source'],['EtherNet/IP','Ethernet industriel CIP']],expl:'Ces protocoles permettent la communication entre l\'API et les périphériques ou autres automates.'}
]);

patchChapter('auto','m3','ch2',{sections:[
  {type:'text',title:'Langages IEC 61131-3',body:`La norme <strong>IEC 61131-3</strong> définit 5 langages de programmation pour les API, utilisables de manière interchangeable selon le besoin.`},
  {type:'table',title:'Les 5 langages IEC 61131-3',rows:[
    ['Langage','Abrév.','Type','Pour qui'],
    ['Ladder Diagram','LD','Graphique','Électriciens (contacteurs, relais)'],
    ['Function Block Diagram','FBD','Graphique','Automaticiens (blocs fonctionnels)'],
    ['Structured Text','ST','Textuel','Informaticiens (style Pascal)'],
    ['Instruction List','IL','Textuel','Bas niveau (style assembleur, déprécié)'],
    ['Sequential Function Chart','SFC','Graphique','Grafcet informatisé'],
  ]},
  {type:'tip',text:'Le SFC (Sequential Function Chart) est l\'implémentation informatique du Grafcet. LD est le plus répandu dans l\'industrie classique. ST est préféré pour les calculs complexes.'}
]},[
  {q:'Quel langage IEC 61131-3 est l\'équivalent informatique du Grafcet ?',sub:'Langage graphique séquentiel.',choices:['LD (Ladder)','FBD','SFC','IL'],answer:2,expl:'Le SFC (Sequential Function Chart) est la transposition du Grafcet en langage API selon IEC 61131-3. Il utilise les mêmes concepts : étapes, transitions, actions.'},
  {type:'tf',q:'Le langage ST (Structured Text) ressemble au langage Pascal.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Le ST utilise des structures IF/THEN/ELSE, FOR, WHILE, CASE similaires au Pascal ou au C. C\'est le langage textuel de haut niveau d\'IEC 61131-3.'},
  {type:'fill',q:'Le langage Ladder (LD) représente les circuits par des ___ et des bobines.',sub:'Symboles du Ladder',answer:['contacts','contacteurs'],expl:'Le Ladder utilise des contacts (entrées, conditions) et des bobines (sorties, actions) sur des "rails" horizontaux, comme un schéma de circuit à relais.'},
  {type:'match',q:'Associe chaque langage à son type',sub:'IEC 61131-3',pairs:[['LD','Graphique (contacts/bobines)'],['ST','Textuel (style Pascal)'],['SFC','Graphique séquentiel (Grafcet)']],expl:'IEC 61131-3 permet de combiner ces langages dans un même projet selon les tâches.'},
  {type:'order',q:'Remets dans l\'ordre du plus graphique au plus textuel',sub:'Langages IEC 61131-3',items:['SFC (Grafcet graphique)','FBD (blocs fonctionnels)','LD (contacts visuels)','ST (texte structuré)'],expl:'SFC et FBD sont purement graphiques, LD est semi-graphique, ST est purement textuel.'}
]);

patchChapter('auto','m3','ch3',{sections:[
  {type:'text',title:'Programmation Ladder (LD)',body:`Le <strong>langage Ladder</strong> représente le programme comme un réseau de schémas de contacts et bobines, similaire aux schémas de relais. Chaque rang (rung) contient des conditions (contacts) à gauche et des actions (bobines) à droite.`},
  {type:'table',title:'Symboles Ladder principaux',rows:[
    ['Symbole','Nom','Condition'],
    ['—| |—','Contact Normalement Ouvert (NO)','Vrai si bit = 1'],
    ['—|/|—','Contact Normalement Fermé (NF)','Vrai si bit = 0'],
    ['—( )—','Bobine de sortie','Met le bit à 1 si rung vrai'],
    ['—(/)—','Bobine inversée','Met le bit à 0 si rung vrai'],
    ['—[TON]—','Bloc temporisateur','Délai en montée'],
  ]},
  {type:'tip',text:'Lecture Ladder : de gauche à droite (conditions) puis de haut en bas (rungs). Si toutes les conditions d\'un rung sont vraies, la bobine est activée.'}
]},[
  {q:'Dans un rung Ladder, les contacts représentent :',sub:'Lecture du Ladder.',choices:['Les sorties à commander','Les conditions à vérifier (entrées)','Les blocs fonctionnels','Les temporisateurs'],answer:1,expl:'Les contacts (—| |— et —|/|—) représentent les conditions d\'entrée (capteurs, bits internes). Les bobines (—( )—) représentent les sorties ou les bits internes à commander.'},
  {type:'tf',q:'Un contact Normalement Fermé (NF) est vrai quand son bit vaut 1.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Un NF (—|/|—) est vrai quand son bit vaut 0 (état fermé au repos). Il s\'ouvre quand le bit passe à 1. C\'est l\'inverse du NO.'},
  {type:'fill',q:'Dans le Ladder, chaque ligne horizontale de conditions/actions s\'appelle un ___.',sub:'Terminologie Ladder',answer:['rung','échelon','rang'],expl:'Un rung (ou échelon) est une ligne du programme Ladder, similaire à un rang d\'une échelle (ladder = échelle en anglais).'},
  {type:'match',q:'Associe chaque symbole Ladder à son rôle',sub:'Symboles de base',pairs:[['—| |— (NO)','Condition vraie si bit=1'],['—|/|— (NF)','Condition vraie si bit=0'],['—( )— (bobine)','Active la sortie si rung vrai']],expl:'Ces trois symboles sont les briques fondamentales du Ladder.'},
  {type:'num',q:'Un rung contient 3 contacts NO en série. Combien doivent être vrais pour activer la bobine ?',sub:'Logique série',answer:3,tol:0,expl:'En série, TOUS les contacts doivent être vrais (logique AND). Si un seul est faux, la bobine reste inactivée.'}
]);

/* ══════════════════════════════════════════════════════════
   INFORMATIQUE
══════════════════════════════════════════════════════════ */

patchChapter('info','m1','ch2',{sections:[
  {type:'text',title:'Modèle OSI et TCP/IP',body:`Le <strong>modèle OSI</strong> (7 couches) et le modèle <strong>TCP/IP</strong> (4 couches) structurent les communications réseau. Chaque couche a un rôle précis et ne communique qu'avec les couches adjacentes.`},
  {type:'table',title:'Correspondance OSI / TCP/IP',rows:[
    ['Couche OSI','N°','TCP/IP','Protocoles'],
    ['Application','7','Application','HTTP, FTP, DNS, SMTP'],
    ['Présentation','6','Application','TLS/SSL, MIME'],
    ['Session','5','Application','NetBIOS, RPC'],
    ['Transport','4','Transport','TCP, UDP'],
    ['Réseau','3','Internet','IP, ICMP, ARP'],
    ['Liaison','2','Accès réseau','Ethernet, Wi-Fi, PPP'],
    ['Physique','1','Accès réseau','Câbles, radio, fibres'],
  ]},
  {type:'tip',text:'Mémo OSI (de 7 à 1) : « Application Présentée Se Transporte Réseau Logiquement Physiquement » (Application, Présentation, Session, Transport, Réseau, Liaison, Physique).'}
]},[
  {q:'À quelle couche OSI opère le protocole IP ?',sub:'Couches OSI du modèle TCP/IP.',choices:['Couche 2 (Liaison)','Couche 3 (Réseau)','Couche 4 (Transport)','Couche 7 (Application)'],answer:1,expl:'IP (Internet Protocol) opère à la couche 3 (Réseau). Il gère l\'adressage logique et le routage des paquets entre les réseaux.'},
  {type:'num',q:'Le modèle OSI a ___ couches.',sub:'Nombre de couches',answer:7,tol:0,expl:'OSI : 7 couches (1-Physique, 2-Liaison, 3-Réseau, 4-Transport, 5-Session, 6-Présentation, 7-Application). TCP/IP en a 4.'},
  {type:'tf',q:'TCP et UDP opèrent à la même couche OSI.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. TCP et UDP opèrent tous deux à la couche 4 (Transport). TCP est fiable (accusés de réception), UDP est rapide mais non fiable.'},
  {type:'fill',q:'Le protocole ___ résout les noms de domaine en adresses IP.',sub:'DNS',answer:['DNS','Domain Name System'],expl:'Le DNS (Domain Name System) est un service de résolution de noms. Il traduit www.google.com en son adresse IP. Il opère à la couche 7 (Application).'},
  {type:'match',q:'Associe chaque protocole à sa couche OSI',sub:'Protocoles et couches',pairs:[['HTTP','Couche 7 (Application)'],['TCP','Couche 4 (Transport)'],['IP','Couche 3 (Réseau)']],expl:'HTTP transporte des pages web, TCP assure la fiabilité, IP gère le routage.'}
]);

patchChapter('info','m1','ch3',{sections:[
  {type:'text',title:'Adressage IPv4 et CIDR',body:`Une adresse <strong>IPv4</strong> compte 32 bits en 4 octets (ex. 192.168.1.10). Le <strong>masque</strong> sépare la partie réseau de la partie machine. En notation <strong>CIDR</strong>, /24 signifie 24 bits pour le réseau.`},
  {type:'formula',formula:'Hôtes = 2^n − 2',legend:'n : bits de la partie machine · moins adresse réseau et broadcast'},
  {type:'table',title:'Sous-réseaux courants',rows:[
    ['CIDR','Masque','Hôtes utilisables'],
    ['/24','255.255.255.0','254'],
    ['/25','255.255.255.128','126'],
    ['/16','255.255.0.0','65 534'],
    ['/8','255.0.0.0','16 777 214'],
  ]},
  {type:'tip',text:'Adresses privées RFC 1918 : 10.x.x.x (/8) · 172.16–31.x.x (/12) · 192.168.x.x (/16). Ces adresses ne sont pas routées sur Internet.'}
]},[
  {type:'num',q:"Combien d'hôtes utilisables dans un réseau /24 ?",sub:'2^8 − 2',answer:254,tol:0,expl:'8 bits pour les machines : 2⁸ − 2 = 254.'},
  {q:"Quel est le masque d'un /24 ?",sub:'Notation décimale pointée',choices:['255.0.0.0','255.255.0.0','255.255.255.0','255.255.255.128'],answer:2,expl:'24 bits à 1 = trois octets à 255 : 255.255.255.0.'},
  {type:'match',q:"Associe chaque préfixe CIDR à son masque",sub:'Sous-réseaux IPv4',pairs:[['/8','255.0.0.0'],['/16','255.255.0.0'],['/24','255.255.255.0']],expl:'Chaque 8 bits à 1 donne un octet de 255.'},
  {type:'tf',q:"192.168.1.10 est une adresse IP publique.",sub:'Vrai ou faux ?',answer:1,expl:'Faux. 192.168.x.x est une plage privée (RFC 1918). Elle n\'est pas routable sur Internet et nécessite un NAT pour accéder au web.'},
  {type:'num',q:"Un réseau /25 a combien d'hôtes utilisables ?",sub:'2^(32-25) − 2',answer:126,tol:0,expl:'32−25 = 7 bits pour les hôtes. 2^7 − 2 = 128 − 2 = 126 hôtes.'}
]);

// Algorithmique
patchChapter('info','m2','ch1',{sections:[
  {type:'text',title:'Variables, types et opérateurs',body:`Un <strong>programme</strong> manipule des <strong>variables</strong> (cases mémoire nommées) de différents <strong>types</strong> (entier, réel, caractère, booléen). Les <strong>opérateurs</strong> permettent de combiner ces variables.`},
  {type:'table',title:'Types de données courants',rows:[
    ['Type','Taille typique','Exemple','Plage'],
    ['int (entier)','4 octets','42, −15','−2 147 483 648 à +2 147 483 647'],
    ['float (réel)','4 octets','3.14','±3,4 × 10³⁸'],
    ['bool (booléen)','1 bit/octet','True, False','0 ou 1'],
    ['char (caractère)','1 octet','A',  'ASCII 0–255'],
    ['string (chaîne)','variable','\"bonjour\"','Séquence de char'],
  ]},
  {type:'tip',text:'En Python, le type est dynamique (pas besoin de déclarer). En C/Java, il est statique (obligatoire). Division entière : 7//2 = 3 en Python, 7/2 = 3 en C (si int).'}
]},[
  {q:'Quelle est la taille typique d\'un entier (int) en 32 bits ?',sub:'Taille en octets.',choices:['1 octet','2 octets','4 octets','8 octets'],answer:2,expl:'Un int 32 bits occupe 4 octets = 32 bits. Plage : −2 147 483 648 à +2 147 483 647. En 64 bits (long), c\'est 8 octets.'},
  {type:'tf',q:'En Python, il faut déclarer le type d\'une variable avant de l\'utiliser.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Python utilise le typage dynamique : le type est déterminé à l\'exécution selon la valeur affectée. En C, Java, il faut déclarer (int x = 5;).'},
  {type:'fill',q:'L\'opérateur % renvoie le ___ d\'une division entière.',sub:'Modulo',answer:['reste','modulo'],expl:'% = modulo = reste de la division entière. 10 % 3 = 1 car 10 = 3×3 + 1. Utile pour tester la parité (n%2 == 0 → pair).'},
  {type:'num',q:'En Python, que vaut 7 // 2 ?',sub:'Division entière',answer:3,tol:0,expl:'// est la division entière en Python (floor division). 7 // 2 = 3 (le reste 1 est ignoré). En comparaison, 7/2 = 3.5.'},
  {type:'match',q:'Associe chaque opérateur Python à sa fonction',sub:'Opérateurs Python',pairs:[['//','Division entière'],['%','Modulo (reste)'],['**','Puissance']],expl:'Ces opérateurs spéciaux Python s\'ajoutent aux classiques +, −, ×, /.'}
]);

patchChapter('info','m2','ch2',{sections:[
  {type:'text',title:'Structures de contrôle',body:`Les <strong>structures de contrôle</strong> déterminent l'ordre d'exécution des instructions : <strong>conditions</strong> (if/elif/else) et <strong>boucles</strong> (for, while). Elles permettent de créer des programmes non-linéaires.`},
  {type:'table',title:'Structures en Python',rows:[
    ['Structure','Syntaxe Python','Usage'],
    ['Condition','if x > 0: ... elif: ... else:','Choix selon condition'],
    ['Boucle bornée','for i in range(n):','Répétition N fois'],
    ['Boucle non bornée','while condition:','Répétition tant que...'],
    ['Sortie anticipée','break','Quitte la boucle'],
    ['Suite anticipée','continue','Passe à l\'itération suivante'],
  ]},
  {type:'tip',text:'En Python, l\'indentation (4 espaces) est OBLIGATOIRE pour délimiter les blocs. Une erreur d\'indentation = IndentationError !'}
]},[
  {q:'En Python, quelle structure itère un nombre fixe de fois ?',sub:'Boucle bornée.',choices:['while True','for i in range(n)','if n > 0','do while'],answer:1,expl:'for i in range(n) exécute le bloc exactement n fois (i de 0 à n-1). while répète tant qu\'une condition est vraie (nombre de fois indéterminé). Python n\'a pas de do-while.'},
  {type:'tf',q:'En Python, l\'indentation est optionnelle et cosmétique.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. L\'indentation est syntaxiquement OBLIGATOIRE en Python. Elle délimite les blocs (if, for, while, def). Une mauvaise indentation provoque une IndentationError.'},
  {type:'fill',q:'L\'instruction ___ interrompt immédiatement une boucle.',sub:'Sortie de boucle',answer:['break'],expl:'break quitte immédiatement la boucle (for ou while). continue passe à l\'itération suivante sans quitter la boucle.'},
  {type:'order',q:'Remets dans l\'ordre les blocs d\'un if/elif/else Python',sub:'Structure conditionnelle',items:['if condition_1:','    bloc_1','elif condition_2:','    bloc_2','else:','    bloc_par_défaut'],expl:'if vient en premier, suivi de 0 ou plusieurs elif, et optionnellement d\'un else final.'},
  {type:'num',q:'range(5) génère les entiers de 0 à ___ (inclus).',sub:'Valeur maximale de range(5)',answer:4,tol:0,expl:'range(5) génère : 0, 1, 2, 3, 4 → 5 valeurs. range(a, b) génère de a à b-1.'}
]);

/* ══════════════════════════════════════════════════════════
   MÉCANIQUE
══════════════════════════════════════════════════════════ */

patchChapter('meca','m1','ch1',{sections:[
  {type:'text',title:'Équilibre d\'un solide',body:`La <strong>statique</strong> étudie les solides au repos. Un solide est en équilibre si la somme des forces est nulle <strong>et</strong> la somme des moments est nulle.`},
  {type:'formula',formula:'M = F × d',legend:'M : moment (N·m) · F : force (N) · d : bras de levier (m)'},
  {type:'list',items:['<strong>Pivot :</strong> autorise la rotation, bloque les translations','<strong>Appui simple :</strong> bloque une seule direction','<strong>Encastrement :</strong> bloque tous les mouvements']},
  {type:'tip',text:'Plus le bras de levier est grand, moins il faut de force : principe de la clé longue.'}
]},[
  {type:'num',q:"Une force de 200 N s'applique à 0,3 m d'un pivot. Moment ?",sub:'M = F × d',answer:60,unit:'N·m',expl:'M = 200 × 0,3 = 60 N·m.'},
  {q:"Condition d'équilibre d'un solide ?",sub:'Statique',choices:['ΣF = 0 seulement','ΣM = 0 seulement','ΣF = 0 et ΣM = 0','ΣF = ΣM'],answer:2,expl:'Équilibre : aucune translation (ΣF=0) ET aucune rotation (ΣM=0).'},
  {type:'fill',q:"Le moment se mesure en newton-___.",sub:'Unité du moment',answer:['mètre','metre','m'],expl:'Unité : N·m (newton-mètre).'},
  {type:'tf',q:"Doubler le bras de levier double le moment.",sub:'Vrai ou faux ?',answer:0,expl:'Vrai : M = F × d, donc M est proportionnel à d.'},
  {type:'match',q:'Associe chaque liaison à ses degrés de liberté bloqués',sub:'Liaisons mécaniques',pairs:[['Encastrement','Tous les mouvements bloqués'],['Pivot','Translations bloquées, rotation libre'],['Appui simple','1 translation bloquée seulement']],expl:'Les liaisons définissent quels mouvements sont autorisés ou bloqués entre deux solides.'}
]);

// Cinématique
patchChapter('meca','m2','ch1',{sections:[
  {type:'text',title:'Cinématique du solide',body:`La <strong>cinématique</strong> décrit le mouvement des solides sans s'intéresser aux causes (forces). Les grandeurs clés sont la <strong>position</strong>, la <strong>vitesse</strong> et l'<strong>accélération</strong>.`},
  {type:'formula',formula:'v = dr/dt   ·   a = dv/dt',legend:'v : vitesse (m/s) · a : accélération (m/s²) · r : position (m)'},
  {type:'table',title:'Mouvements de base',rows:[
    ['Mouvement','Vitesse','Accélération'],
    ['Uniforme (MU)','v = constante','a = 0'],
    ['Uniformément accéléré (MUA)','v = v₀ + at','a = constante'],
    ['Circulaire uniforme','||v|| = constante, direction change','Centripète : a = v²/R'],
  ]},
  {type:'tip',text:'En MUA : d = v₀t + ½at² et v² = v₀² + 2ad. Ces deux formules couvrent tous les problèmes de cinématique linéaire uniformément accélérée.'}
]},[
  {q:'Un mouvement uniformément accéléré a une accélération :',sub:'Définition du MUA.',choices:['Nulle','Variable','Constante','Périodique'],answer:2,expl:'Dans un MUA, l\'accélération est constante. La vitesse varie linéairement avec le temps : v = v₀ + at.'},
  {type:'num',q:'v₀ = 0, a = 2 m/s². Distance parcourue en 5 s ?',sub:'d = v₀t + ½at²',answer:25,unit:'m',expl:'d = 0×5 + ½×2×5² = 0 + 25 = 25 m.'},
  {type:'tf',q:'La vitesse en mouvement circulaire uniforme est constante.',sub:'Vrai ou faux ?',answer:1,expl:'Faux (nuancé). La valeur (norme) de la vitesse est constante, mais sa direction change en permanence. Il y a donc une accélération centripète a = v²/R, même si la vitesse "scalaire" ne varie pas.'},
  {type:'fill',q:'L\'accélération centripète dans un MCU vaut v² / ___.',sub:'Formule de l\'accélération centripète',answer:['R','r','rayon'],expl:'a_c = v²/R où R est le rayon de la trajectoire circulaire. Elle est toujours dirigée vers le centre.'},
  {type:'num',q:'v₀ = 10 m/s, a = −2 m/s². Vitesse à t = 3 s ?',sub:'v = v₀ + at',answer:4,unit:'m/s',expl:'v = 10 + (−2)×3 = 10 − 6 = 4 m/s. L\'objet ralentit.'}
]);

/* ══════════════════════════════════════════════════════════
   MATHÉMATIQUES
══════════════════════════════════════════════════════════ */

patchChapter('math','m1','ch2',{sections:[
  {type:'text',title:'Méthode du pivot de Gauss',body:`Un système linéaire se résout par la méthode du <strong>pivot de Gauss</strong> : on combine les lignes pour obtenir un système triangulaire, puis on remonte.`},
  {type:'list',items:['Écrire la matrice augmentée','Choisir un pivot (élément non nul)','Annuler les termes en dessous : Li ← Li − k·Lj','Remonter (back-substitution) pour trouver les inconnues']},
  {type:'tip',text:'Opérations élémentaires autorisées : échanger deux lignes, multiplier une ligne par une constante ≠ 0, ajouter un multiple d\'une ligne à une autre.'}
]},[
  {type:'num',q:"x + y = 5 et x − y = 1. Combien vaut x ?",sub:'Additionne les deux équations',answer:3,tol:0,expl:'2x = 6, donc x = 3 (et y = 2).'},
  {q:"Quelle opération est autorisée dans la méthode de Gauss ?",sub:'Opérations élémentaires',choices:['Diviser une ligne par 0','Ajouter à une ligne un multiple d\'une autre','Supprimer une colonne','Mélanger les colonnes'],answer:1,expl:'Li ← Li + k·Lj est l\'opération clé. Elle ne change pas les solutions du système.'},
  {type:'order',q:"Remets les étapes de Gauss dans l'ordre",sub:'Du début à la fin',items:['Écrire la matrice augmentée','Éliminer sous chaque pivot','Obtenir une forme triangulaire supérieure','Remonter (back-substitution)'],expl:'Élimination descendante puis remontée (back-substitution).'},
  {type:'tf',q:"Un système linéaire peut avoir 0, 1 ou une infinité de solutions.",sub:'Vrai ou faux ?',answer:0,expl:'Vrai : système impossible (0 solution), déterminé (1 solution unique), ou indéterminé (infinité si lignes dépendantes).'},
  {type:'fill',q:'La phase de remontée après triangularisation s\'appelle back-___.',sub:'Terminologie anglaise',answer:['substitution'],expl:'Back-substitution : on part de la dernière équation (1 inconnue) et on remonte en substituant.'}
]);

patchChapter('math','m1','ch3',{sections:[
  {type:'text',title:'Déterminants et valeurs propres',body:`Le <strong>déterminant</strong> d'une matrice carrée est un scalaire qui caractérise la matrice. Les <strong>valeurs propres</strong> λ et <strong>vecteurs propres</strong> v d'une matrice A vérifient Av = λv.`},
  {type:'formula',formula:'det(A−λI) = 0',legend:'Équation caractéristique — les racines λ sont les valeurs propres'},
  {type:'list',items:['<strong>det(A) ≠ 0</strong> → A inversible','<strong>det(A) = 0</strong> → A singulière, non inversible','<strong>Valeurs propres :</strong> racines du polynôme caractéristique','<strong>Applications :</strong> stabilité des systèmes, ACP, vibrations']},
  {type:'tip',text:'Pour une matrice 2×2 : det(A) = ad − bc. Pour 3×3, développer selon une ligne/colonne.'}
]},[
  {q:'det(A) = 0 signifie que la matrice A est :',sub:'Interprétation du déterminant.',choices:['Inversible','Diagonale','Singulière (non inversible)','Symétrique'],answer:2,expl:'det(A) = 0 ↔ A est singulière (non inversible). Géométriquement, la transformation écrase l\'espace dans une dimension inférieure.'},
  {type:'num',q:'Pour A = [[3,1],[2,4]], calculez det(A).',sub:'det = ad − bc',answer:10,tol:0,expl:'det = 3×4 − 1×2 = 12 − 2 = 10. det ≠ 0 → A est inversible.'},
  {type:'tf',q:'Les valeurs propres d\'une matrice symétrique réelle sont toujours réelles.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Les matrices symétriques réelles ont des valeurs propres réelles (théorème spectral). C\'est fondamental pour la mécanique des structures et l\'ACP.'},
  {type:'fill',q:'L\'équation des valeurs propres est det(A − ___ I) = 0.',sub:'Équation caractéristique',answer:['λ','lambda'],expl:'On cherche λ tel que (A − λI)v = 0 ait une solution non nulle, soit det(A − λI) = 0.'},
  {type:'match',q:'Associe chaque valeur de det(A) à sa signification',sub:'Interprétation du déterminant',pairs:[['det(A) > 0','A inversible, orientation conservée'],['det(A) = 0','A singulière, non inversible'],['det(A) < 0','A inversible, orientation inversée']],expl:'Le signe du déterminant indique si la transformation inverse l\'orientation de l\'espace.'}
]);

patchChapter('math','m2','ch1',{sections:[
  {type:'text',title:'Dérivées',body:`La <strong>dérivée</strong> f'(x) mesure le taux de variation instantané de f en x. Géométriquement, c'est la pente de la tangente à la courbe de f au point x.`},
  {type:'table',title:'Dérivées usuelles',rows:[
    ['f(x)','f′(x)'],
    ['xⁿ','n·xⁿ⁻¹'],
    ['eˣ','eˣ'],
    ['ln(x)','1/x'],
    ['sin(x)','cos(x)'],
    ['cos(x)','−sin(x)'],
    ['uv','u′v + uv′'],
    ['u/v','(u′v − uv′)/v²'],
  ]},
  {type:'tip',text:'Règle de la chaîne : [f(g(x))]′ = f′(g(x)) × g′(x). Ex : [sin(x²)]′ = cos(x²) × 2x.'}
]},[
  {q:'La dérivée de f(x) = x³ est :',sub:'Règle puissance.',choices:['3x²','x²','3x','x³'],answer:0,expl:'d/dx(xⁿ) = n·xⁿ⁻¹. Ici n=3 : (x³)′ = 3x².'},
  {q:'La dérivée de f(x) = eˣ est :',sub:'Fonction exponentielle.',choices:['xeˣ⁻¹','eˣ⁻¹','eˣ','1/eˣ'],answer:2,expl:'L\'exponentielle est sa propre dérivée : (eˣ)′ = eˣ. C\'est la propriété fondamentale de e.'},
  {type:'fill',q:'La dérivée de ln(x) est ___.',sub:'Logarithme naturel',answer:['1/x'],expl:'(ln x)′ = 1/x pour x > 0.'},
  {type:'tf',q:'La règle de la chaîne s\'applique aux fonctions composées.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. [f(g(x))]′ = f′(g(x)) × g′(x). Par exemple, [sin(3x)]′ = cos(3x) × 3.'},
  {type:'num',q:'f(x) = 5x² + 3x. Que vaut f′(2) ?',sub:'Calculer la dérivée puis l\'évaluer',answer:23,expl:'f′(x) = 10x + 3. f′(2) = 20 + 3 = 23.'}
]);

/* ══════════════════════════════════════════════════════════
   HYDRAULIQUE / PNEUMATIQUE
══════════════════════════════════════════════════════════ */

patchChapter('hydro','m1','ch2',{sections:[
  {type:'text',title:'Loi de Bernoulli',body:`La <strong>loi de Bernoulli</strong> exprime la conservation de l'énergie dans un fluide parfait en écoulement : la somme de la pression, de l'énergie cinétique et de l'énergie potentielle est constante le long d'une ligne de courant.`},
  {type:'formula',formula:'P + ½ρv² + ρgh = constante',legend:'P : pression (Pa) · ρ : masse volumique (kg/m³) · v : vitesse (m/s) · h : hauteur (m)'},
  {type:'list',items:['<strong>Équation de continuité :</strong> A₁v₁ = A₂v₂ (conservation du débit)','<strong>Effet Venturi :</strong> resserrement → vitesse ↑ → pression ↓','<strong>Tube de Pitot :</strong> mesure la vitesse par différence de pression']},
  {type:'tip',text:'Mémo Bernoulli : quand la vitesse augmente, la pression diminue (et vice-versa). C\'est pourquoi les avions volent (portance) et les atomiseurs fonctionnent.'}
]},[
  {q:'Selon Bernoulli, si la vitesse d\'un fluide augmente en un point, la pression :',sub:'Loi de Bernoulli.',choices:['Augmente aussi','Reste constante','Diminue','Double'],answer:2,expl:'Dans l\'équation de Bernoulli, P + ½ρv² = cste. Si v augmente, P diminue pour maintenir la somme constante. C\'est le fondement de la portance aérodynamique.'},
  {type:'fill',q:'La loi de continuité s\'écrit A₁v₁ = A₂v₂, où A est la section et v la ___.',sub:'Grandeur impliquée',answer:['vitesse'],expl:'A₁v₁ = A₂v₂ exprime la conservation du débit volumique Q = Av. Si la section rétrécit (A₂ < A₁), la vitesse augmente (v₂ > v₁).'},
  {type:'tf',q:'L\'effet Venturi montre que la pression augmente dans un rétrécissement.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Dans un rétrécissement, la vitesse augmente et la pression DIMINUE (Bernoulli). C\'est l\'effet Venturi, utilisé dans les carburateurs et les débitmètres.'},
  {type:'num',q:'Section A₁=0,04 m², v₁=2 m/s. Section A₂=0,02 m². Vitesse v₂ ?',sub:'Équation de continuité',answer:4,unit:'m/s',expl:'A₁v₁ = A₂v₂ → v₂ = A₁v₁/A₂ = 0,04×2/0,02 = 4 m/s.'},
  {type:'match',q:'Associe chaque instrument à ce qu\'il mesure',sub:'Instruments de mesure hydraulique',pairs:[['Tube de Pitot','Vitesse d\'écoulement'],['Manomètre','Pression statique'],['Débitmètre Venturi','Débit volumique']],expl:'Ces instruments utilisent les principes de la mécanique des fluides pour mesurer différentes grandeurs.'}
]);

/* ══════════════════════════════════════════════════════════
   THERMODYNAMIQUE
══════════════════════════════════════════════════════════ */

patchChapter('thermo','m1','ch2',{sections:[
  {type:'text',title:'1er principe de la thermodynamique',body:`Le <strong>1er principe</strong> exprime la conservation de l'énergie : l'énergie interne U d'un système varie de la somme du travail W et de la chaleur Q échangés avec l'extérieur.`},
  {type:'formula',formula:'ΔU = W + Q',legend:'ΔU : variation d\'énergie interne (J) · W : travail reçu · Q : chaleur reçue · Convention récepteur'},
  {type:'list',items:['<strong>Processus isotherme :</strong> T = cste → ΔU = 0 (gaz parfait) → Q = −W','<strong>Processus adiabatique :</strong> Q = 0 → ΔU = W','<strong>Enthalpie H :</strong> H = U + PV → ΔH = Qp (chaleur à pression constante)']},
  {type:'tip',text:'Convention : W et Q positifs quand REÇUS par le système. En thermodynamique industrielle, la convention source est parfois inversée (W et Q positifs quand fournis par le système).'}
]},[
  {q:'Le 1er principe de la thermodynamique exprime :',sub:'Conservation de l\'énergie.',choices:['La conservation de la masse','La conservation de l\'énergie','L\'entropie croissante','L\'état d\'équilibre'],answer:1,expl:'ΔU = W + Q. L\'énergie ne se crée ni ne se détruit, elle se transforme. Le 1er principe interdit les machines à mouvement perpétuel de 1ère espèce.'},
  {type:'tf',q:'Dans un processus adiabatique, aucune chaleur n\'est échangée (Q = 0).',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Adiabatique = sans échange de chaleur (du grec adiabatos = qu\'on ne peut traverser). Le 1er principe donne alors ΔU = W uniquement.'},
  {type:'fill',q:'L\'enthalpie est définie par H = U + ___.',sub:'Définition de H',answer:['PV','P×V'],expl:'H = U + PV. La variation d\'enthalpie ΔH = Qp est la chaleur échangée à pression constante. C\'est la grandeur clé pour les réactions chimiques et les turbines.'},
  {type:'num',q:'Un gaz reçoit W = 500 J de travail et perd Q = 200 J de chaleur. ΔU = ?',sub:'ΔU = W + Q (Q négatif si perdu)',answer:300,unit:'J',expl:'ΔU = W + Q = 500 + (−200) = 300 J. Le signe de Q est négatif car la chaleur est perdue (sortante).'},
  {type:'match',q:'Associe chaque processus à sa caractéristique',sub:'Processus thermodynamiques',pairs:[['Isotherme','T = constante → ΔU = 0 (gaz parfait)'],['Adiabatique','Q = 0 → ΔU = W'],['Isobare','P = constante → ΔH = Q']],expl:'Chaque processus simplifie l\'équation générale du 1er principe en annulant une grandeur.'}
]);

/* ══════════════════════════════════════════════════════════
   GÉNIE CIVIL
══════════════════════════════════════════════════════════ */

patchChapter('genie_civil','m1','ch2',{sections:[
  {type:'text',title:'Aciers de construction',body:`Les <strong>aciers de structure</strong> sont des alliages fer-carbone utilisés en charpente métallique et béton armé. Leurs propriétés mécaniques (limite élastique, résistance à rupture) définissent leur classement.`},
  {type:'table',title:'Aciers courants selon l\'Eurocode 3',rows:[
    ['Nuance','fy (MPa)','fu (MPa)','Usage'],
    ['S235','235','360','Charpente courante'],
    ['S275','275','430','Ponts, bâtiments'],
    ['S355','355','510','Structures lourdes, offshore'],
    ['S460','460','550','Structures à haute résistance'],
  ]},
  {type:'tip',text:'La nuance S355 signifie acier de structure (S) avec limite élastique fy = 355 MPa. Plus le chiffre est élevé, plus l\'acier est résistant mais aussi plus coûteux et difficile à souder.'}
]},[
  {q:'La nuance S355 d\'un acier de structure indique :',sub:'Nomenclature Eurocode.',choices:['La composition chimique en %','La limite élastique fy = 355 MPa','La résistance à rupture fu','Le numéro de norme'],answer:1,expl:'S = Structure, 355 = limite d\'élasticité fy en MPa. C\'est la contrainte à ne pas dépasser pour rester dans le domaine élastique (sans déformation permanente).'},
  {type:'tf',q:'Un acier S460 est plus résistant mais plus difficile à souder qu\'un S235.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Les aciers à haute limite élastique (S355, S460) demandent des précautions spéciales au soudage (préchauffage, procédés contrôlés) pour éviter les fissurations.'},
  {type:'num',q:'Un acier S275 a une limite élastique fy de ___ MPa.',sub:'Valeur de la nuance',answer:275,tol:0,unit:'MPa',expl:'Par convention de nomenclature Eurocode : S275 → fy = 275 MPa.'},
  {type:'fill',q:'Les profiles en H utilisés en charpente métallique sont appelés profils ___.',sub:'Type de profile',answer:['HEA','HEB','IPE','HEA/HEB/IPE','en H'],expl:'Les profiles IPE, HEA, HEB sont les profiles en H normalisés utilisés en charpente. IPE (poutre européenne) est le plus courant pour les poutres ; HEA/HEB pour les poteaux.'},
  {type:'match',q:'Associe chaque nuance à son domaine d\'usage typique',sub:'Choix de l\'acier',pairs:[['S235','Charpente courante, ossatures légères'],['S355','Structures lourdes, ponts'],['S460','Structures haute performance, offshore']],expl:'Le choix de la nuance est un compromis résistance/coût/soudabilité/disponibilité.'}
]);

/* ══════════════════════════════════════════════════════════
   COMPTABILITÉ
══════════════════════════════════════════════════════════ */

patchChapter('compta','m1','ch2',{sections:[
  {type:'text',title:'La partie double',body:`La <strong>comptabilité en partie double</strong> est le principe fondateur de la comptabilité. Chaque opération économique est enregistrée simultanément en <strong>débit</strong> et en <strong>crédit</strong> pour des montants égaux.`},
  {type:'table',title:'Conventions débit/crédit',rows:[
    ['Compte','Débit (D)','Crédit (C)'],
    ['Actif (classe 1-5)','Augmentation','Diminution'],
    ['Passif (classe 1-5)','Diminution','Augmentation'],
    ['Charges (classe 6)','Augmentation','Diminution'],
    ['Produits (classe 7)','Diminution','Augmentation'],
  ]},
  {type:'tip',text:'Mémo : un compte d\'actif est à gauche du bilan → il augmente au débit. Un compte de passif est à droite → il augmente au crédit. Toujours Débit = Crédit !'}
]},[
  {q:'En comptabilité, le principe de la partie double signifie :',sub:'Principe fondamental.',choices:['Chaque compte a deux colonnes','Toute opération est enregistrée en débit ET en crédit, pour le même montant','Chaque facture est saisie en double exemplaire','Le bilan est présenté en deux colonnes'],answer:1,expl:'Partie double : chaque écriture débite un compte et crédite un autre, pour le même montant. Total débits = Total crédits → toujours équilibre.'},
  {type:'tf',q:'Un achat de matières premières (charge) se débite au compte 60.',sub:'Vrai ou faux ?',answer:0,expl:'Vrai. Classe 6 = charges. L\'augmentation d\'une charge se porte au débit. 601 = achats de matières premières, 606 = achats de matières consommables.'},
  {type:'fill',q:'Le journal comptable enregistre les opérations dans l\'ordre ___.',sub:'Ordre de saisie',answer:['chronologique'],expl:'Le journal est un livre séquentiel : chaque opération est enregistrée par ordre de date. Le grand livre regroupe ensuite par compte.'},
  {type:'num',q:'Une entreprise achète du matériel à 10 000 € HT avec un taux de TVA de 20%. Montant TTC ?',sub:'TTC = HT × (1 + taux TVA)',answer:12000,unit:'€',expl:'TTC = 10 000 × 1,20 = 12 000 €. TVA collectée = 2 000 €.'},
  {type:'match',q:'Associe chaque type d\'opération à son écriture',sub:'Partie double',pairs:[['Vente de marchandises','D : 411 Clients / C : 707 Ventes'],['Achat de marchandises','D : 607 Achats / C : 401 Fournisseurs'],['Paiement fournisseur','D : 401 Fournisseurs / C : 512 Banque']],expl:'Ces trois écritures types couvrent le cycle d\'exploitation : achat → vente → encaissement.'}
]);

/* ══════════════════════════════════════════════════════════
   GESTION
══════════════════════════════════════════════════════════ */

patchChapter('gestion','m1','ch2',{sections:[
  {type:'text',title:'Trésorerie et financement',body:`La <strong>trésorerie</strong> est l'ensemble des liquidités disponibles (caisse + banque). Un plan de trésorerie anticipe les encaissements et décaissements mois par mois pour détecter les tensions de liquidité.`},
  {type:'formula',formula:'Trésorerie nette = FR − BFR',legend:'FR : Fonds de Roulement · BFR : Besoin en Fonds de Roulement'},
  {type:'list',items:['<strong>Trésorerie > 0 :</strong> excédent, à placer','<strong>Trésorerie < 0 :</strong> déficit, financer par découvert ou crédit','<strong>FR = Capitaux permanents − Actif immobilisé</strong>','<strong>BFR = Stocks + Créances − Dettes d\'exploitation</strong>']},
  {type:'tip',text:'Une entreprise rentable peut être en cessation de paiement si sa trésorerie est négative ! La rentabilité ne garantit pas la liquidité.'}
]},[
  {q:'Une trésorerie nette négative indique :',sub:'Interprétation de la trésorerie.',choices:['Une excellente rentabilité','Un besoin de financement à court terme','Un excédent de liquidités','Une forte croissance'],answer:1,expl:'Trésorerie < 0 : l\'entreprise manque de liquidités et doit recourir au découvert bancaire ou à un crédit court terme pour faire face à ses paiements immédiats.'},
  {type:'tf',q:'Une entreprise rentable ne peut jamais être en cessation de paiements.',sub:'Vrai ou faux ?',answer:1,expl:'Faux. Une entreprise peut être rentable (produits > charges) mais en cessation de paiements (trésorerie < 0) si ses clients paient tard et ses fournisseurs exigent un paiement rapide. C\'est le "credit crunch".'},
  {type:'fill',q:'La formule de la trésorerie nette est TR = FR − ___.',sub:'Équation de trésorerie',answer:['BFR','Besoin en Fonds de Roulement'],expl:'Trésorerie = FR − BFR. Si FR > BFR, l\'entreprise est à l\'aise en trésorerie. Si FR < BFR, elle doit se financer.'},
  {type:'num',q:'FR = 150 000 €, BFR = 180 000 €. Trésorerie nette ?',sub:'TR = FR − BFR',answer:-30000,unit:'€',expl:'TR = 150 000 − 180 000 = −30 000 €. L\'entreprise a un besoin de financement à court terme de 30 000 €.'},
  {type:'match',q:'Associe chaque financement à sa durée',sub:'Sources de financement',pairs:[['Découvert bancaire','Court terme (quelques jours/semaines)'],['Crédit de campagne','Court terme saisonnier'],['Emprunt bancaire','Moyen/long terme (2–15 ans)']],expl:'Le type de financement doit correspondre à la durée du besoin : ne pas financer de l\'actif immobilisé par du court terme.'}
]);

console.log('TechnoEdu curriculum-extra-v2.js chargé ✓');
