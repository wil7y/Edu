/* TechnoEdu — cours supplémentaires + exercices variés.
   Chargé APRÈS curriculum.js : remplit les chapitres vides (par ids) sans toucher au reste.
   Types d'exercices : (QCM par défaut) 'tf' 'num' 'fill' 'order' 'match' */
function patchChapter(disc,modId,chId,lesson,quiz){
  const mod=CURRICULUM[disc].modules.find(m=>m.id===modId);
  const ch=mod.chapters.find(c=>c.id===chId);
  lesson.disc=CURRICULUM[disc].name; lesson.mod='Module '+modId.slice(1)+' — '+mod.title;
  ch.lesson=lesson; ch.quiz=quiz;
}

patchChapter('elec','m5','ch3',{sections:[
  {type:'text',title:'Pourquoi varier la vitesse ?',body:`Branché directement sur le réseau, un moteur asynchrone tourne à vitesse quasi fixe. Un <strong>variateur de vitesse</strong> (convertisseur de fréquence) lui fournit une tension et une fréquence réglables : démarrage en douceur, économies d'énergie, vitesse adaptée au besoin.`},
  {type:'formula',formula:'n<sub>s</sub> = 60 × f / p',legend:'ns : vitesse de synchronisme (tr/min) · f : fréquence (Hz) · p : nombre de paires de pôles'},
  {type:'list',items:['<strong>Redresseur</strong> : transforme l\'alternatif en continu','<strong>Bus continu</strong> : condensateurs qui lissent la tension','<strong>Onduleur</strong> : recrée un alternatif de fréquence variable']},
  {type:'tip',text:'Pour garder un couple constant, le variateur maintient le rapport U/f constant.'}
]},[
  {q:"Quel étage crée un alternatif de fréquence variable ?",sub:'Structure d\'un variateur',choices:['Le redresseur','Le bus continu','L\'onduleur','Le filtre CEM'],answer:2,expl:"L'onduleur découpe la tension continue pour recréer un alternatif réglable."},
  {type:'tf',q:"Un variateur permet un démarrage progressif du moteur.",sub:'Vrai ou faux ?',answer:0,expl:"Il fait monter la fréquence progressivement, ce qui limite l'appel de courant."},
  {type:'num',q:"Un moteur à 2 paires de pôles est alimenté à 50 Hz. Quelle est sa vitesse de synchronisme ?",sub:'ns = 60 × f / p',answer:1500,unit:'tr/min',expl:'ns = 60 × 50 / 2 = 1500 tr/min.'},
  {type:'order',q:"Remets dans l'ordre le trajet de l'énergie",sub:'Du réseau à l\'arbre moteur',items:['Réseau','Redresseur','Bus continu','Onduleur','Moteur'],expl:"Alternatif → continu → lissage → alternatif variable → moteur."}
]);

patchChapter('electro','m1','ch3',{sections:[
  {type:'text',title:'La bobine',body:`Une <strong>inductance</strong> emmagasine de l'énergie sous forme de champ magnétique et s'oppose aux variations du courant. Son unité est le <strong>henry (H)</strong>.`},
  {type:'formula',formula:'X<sub>L</sub> = 2π × f × L',legend:'XL : réactance (Ω) · f : fréquence (Hz) · L : inductance (H)'},
  {type:'list',items:['Filtrage des parasites','Stockage d\'énergie dans les alimentations à découpage','Transformateurs et antennes']},
  {type:'tip',text:'En continu (f = 0), une bobine idéale se comporte comme un fil. Plus la fréquence monte, plus elle bloque le courant.'}
]},[
  {q:"Quelle est l'unité de l'inductance ?",sub:'Unités',choices:['Farad','Henry','Ohm','Weber'],answer:1,expl:"L'inductance se mesure en henry (H)."},
  {type:'num',q:"Calcule XL pour L = 10 mH et f = 1 kHz.",sub:'Arrondis à 0,1 près',answer:62.83,tol:1,unit:'Ω',expl:'XL = 2π × 1000 × 0,01 ≈ 62,83 Ω.'},
  {type:'tf',q:"Une bobine laisse mieux passer les hautes fréquences que les basses.",sub:'Vrai ou faux ?',answer:1,expl:"Faux : XL augmente avec f, elle bloque davantage les hautes fréquences."},
  {type:'match',q:"Associe chaque composant à son unité",sub:'Un choix par ligne',pairs:[['Résistance','Ohm (Ω)'],['Condensateur','Farad (F)'],['Inductance','Henry (H)']],expl:'R en ohm, C en farad, L en henry.'}
]);

patchChapter('auto','m1','ch3',{sections:[
  {type:'text',title:'Simplifier sans calculer',body:`Le <strong>tableau de Karnaugh</strong> simplifie une fonction logique de façon graphique. Les cases suivent le <strong>code Gray</strong> : une seule variable change entre deux cases voisines.`},
  {type:'list',items:['Regrouper les 1 en rectangles de 1, 2, 4 ou 8 cases','Prendre les groupes les plus grands possible','Les bords du tableau se touchent (il « s\'enroule »)','Chaque 1 doit être couvert au moins une fois']},
  {type:'tip',text:'Dans un groupe, on ne garde que les variables qui ne changent pas.'}
]},[
  {q:"Combien de cases a un tableau de Karnaugh à 3 variables ?",sub:'2 puissance n',choices:['4','6','8','16'],answer:2,expl:'2³ = 8 cases.'},
  {type:'num',q:"Combien de cases pour 4 variables ?",sub:'2 puissance n',answer:16,tol:0,expl:'2⁴ = 16 cases.'},
  {type:'fill',q:"Entre deux cases voisines, une seule variable change : c'est le code ___.",sub:'Complète',answer:['Gray'],expl:'Le code Gray garantit un seul changement entre voisins.'},
  {type:'tf',q:"Un groupe de 3 cases est autorisé.",sub:'Vrai ou faux ?',answer:1,expl:'Faux : les groupes ont 1, 2, 4 ou 8 cases (puissances de 2).'}
]);

patchChapter('info','m1','ch3',{sections:[
  {type:'text',title:'Adresse et masque',body:`Une adresse <strong>IPv4</strong> compte 32 bits, écrits en 4 octets (ex. 192.168.1.10). Le <strong>masque</strong> sépare la partie réseau de la partie machine. En notation <strong>CIDR</strong>, /24 signifie 24 bits pour le réseau.`},
  {type:'formula',formula:'Hôtes = 2<sup>n</sup> − 2',legend:'n : bits de la partie machine · on retire l\'adresse réseau et l\'adresse de diffusion'},
  {type:'table',title:'À retenir',rows:[['CIDR','Masque','Hôtes utilisables'],['/24','255.255.255.0','254'],['/25','255.255.255.128','126'],['/16','255.255.0.0','65 534']]},
  {type:'tip',text:'Adresses privées : 10.x.x.x, 172.16 à 172.31.x.x et 192.168.x.x.'}
]},[
  {type:'num',q:"Combien d'hôtes utilisables dans un réseau /24 ?",sub:'2^8 − 2',answer:254,tol:0,expl:'8 bits pour les machines : 2⁸ − 2 = 254.'},
  {q:"Quel est le masque d'un /24 ?",sub:'Notation CIDR',choices:['255.0.0.0','255.255.0.0','255.255.255.0','255.255.255.128'],answer:2,expl:'24 bits à 1 = 255.255.255.0.'},
  {type:'match',q:"Associe chaque préfixe à son masque",sub:'Un choix par ligne',pairs:[['/8','255.0.0.0'],['/16','255.255.0.0'],['/24','255.255.255.0']],expl:'Chaque 8 bits à 1 donne un 255.'},
  {type:'tf',q:"192.168.1.10 est une adresse privée.",sub:'Vrai ou faux ?',answer:0,expl:'Oui, 192.168.x.x est réservé aux réseaux privés.'}
]);

patchChapter('meca','m1','ch1',{sections:[
  {type:'text',title:'Équilibre d\'un solide',body:`La <strong>statique</strong> étudie les solides au repos. Un solide est en équilibre si la somme des forces est nulle <strong>et</strong> la somme des moments est nulle.`},
  {type:'formula',formula:'M = F × d',legend:'M : moment (N·m) · F : force (N) · d : bras de levier (m), distance perpendiculaire à la force'},
  {type:'list',items:['<strong>Pivot</strong> : autorise la rotation, bloque les translations','<strong>Appui simple</strong> : bloque une seule direction','<strong>Encastrement</strong> : bloque tous les mouvements']},
  {type:'tip',text:'Plus le bras de levier est grand, moins il faut de force : c\'est le principe de la clé longue.'}
]},[
  {type:'num',q:"Une force de 200 N s'applique à 0,3 m d'un pivot. Quel est le moment ?",sub:'M = F × d',answer:60,unit:'N·m',expl:'M = 200 × 0,3 = 60 N·m.'},
  {q:"Quelle est la condition d'équilibre d'un solide ?",sub:'Statique',choices:['ΣF = 0 seulement','ΣM = 0 seulement','ΣF = 0 et ΣM = 0','ΣF = ΣM'],answer:2,expl:'Il faut à la fois aucune translation et aucune rotation.'},
  {type:'fill',q:"Le moment se mesure en newton-___.",sub:'Complète',answer:['mètre','metre'],expl:'Unité : N·m (newton-mètre).'},
  {type:'tf',q:"Doubler le bras de levier double le moment.",sub:'Vrai ou faux ?',answer:0,expl:'Oui : M est proportionnel à d.'}
]);

patchChapter('math','m1','ch2',{sections:[
  {type:'text',title:'Le pivot de Gauss',body:`Un système linéaire se résout par la méthode du <strong>pivot de Gauss</strong> : on combine les lignes pour obtenir un système triangulaire, puis on remonte pour trouver les inconnues.`},
  {type:'list',items:['Écrire la matrice augmentée','Choisir un pivot','Annuler les termes en dessous : Li ← Li − k·Lj','Remonter pour trouver les inconnues']},
  {type:'tip',text:'Échanger deux lignes ou multiplier une ligne par un nombre non nul ne change pas les solutions.'}
]},[
  {type:'num',q:"Résous x + y = 5 et x − y = 1. Combien vaut x ?",sub:'Additionne les deux lignes',answer:3,tol:0,expl:'2x = 6, donc x = 3 (et y = 2).'},
  {q:"Quelle opération est autorisée sur les lignes ?",sub:'Méthode de Gauss',choices:['Diviser une ligne par 0','Ajouter à une ligne un multiple d\'une autre','Supprimer une colonne','Mélanger les colonnes'],answer:1,expl:'Li ← Li + k·Lj conserve les solutions.'},
  {type:'order',q:"Remets les étapes de Gauss dans l'ordre",sub:'Du début à la fin',items:['Écrire la matrice augmentée','Éliminer sous le pivot','Obtenir une forme triangulaire','Remonter pour trouver les inconnues'],expl:'Élimination puis remontée.'},
  {type:'tf',q:"Un système linéaire peut avoir 0, 1 ou une infinité de solutions.",sub:'Vrai ou faux ?',answer:0,expl:'Oui : impossible, unique ou indéterminé.'}
]);
