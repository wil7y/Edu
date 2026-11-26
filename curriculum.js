const CURRICULUM = {
  elec:{
    name:'Électricité',icon:'#ico-elec',color:'orange',
    modules:[
      {id:'m1',title:'Fondamentaux',chapters:[
        {id:'ch1',title:'Grandeurs électriques (U, I, R, P)',ico:'#ico-bolt',
         lesson:{
           disc:'Électricité',mod:'Module 1 — Fondamentaux',
           sections:[
             {type:'text',title:'Les quatre grandeurs fondamentales',body:`En électricité, quatre grandeurs sont indissociables : la <strong>tension U</strong> (ou différence de potentiel), le <strong>courant I</strong>, la <strong>résistance R</strong> et la <strong>puissance P</strong>. Comprendre ces grandeurs, leurs unités et leurs relations est la base absolue de tout technicien en électrotechnique.`},
             {type:'table',title:'Tableau des grandeurs',rows:[
               ['Grandeur','Symbole','Unité SI','Instrument de mesure'],
               ['Tension','U ou V','Volt (V)','Voltmètre (en parallèle)'],
               ['Courant','I','Ampère (A)','Ampèremètre (en série)'],
               ['Résistance','R','Ohm (Ω)','Ohmmètre (circuit hors tension)'],
               ['Puissance','P','Watt (W)','Wattmètre'],
             ]},
             {type:'formula',formula:'P = U × I',legend:'Puissance (W) = Tension (V) × Courant (A)'},
             {type:'text',body:`La <strong>tension U</strong> représente la force électromotrice qui « pousse » les électrons dans le circuit — comme la pression dans un tuyau d'eau. Le <strong>courant I</strong> est le débit de charges électriques traversant une section du conducteur par unité de temps. La <strong>résistance R</strong> s'oppose au passage du courant.`},
             {type:'list',items:['1 Ampère = 1 Coulomb par seconde (1 A = 1 C/s)','La tension est toujours mesurée entre deux points d\'un circuit','La résistance dépend du matériau, de la longueur et de la section du conducteur','La puissance dissipée dans une résistance devient de la chaleur (effet Joule)']},
             {type:'norme',text:'<strong>CEI 60050-131</strong> : Vocabulaire électrotechnique international — définit officiellement les grandeurs électriques et leurs symboles utilisés dans toute la réglementation européenne.'},
             {type:'tip',text:'<strong>Astuce mémo :</strong> Pensez à l\'analogie hydraulique — U est la pression, I est le débit, R est la résistance de la canalisation. Plus la résistance est grande, moins le débit est important pour une même pression.'},
           ]
         },
         quiz:[
           {q:'Quelle est l\'unité SI du courant électrique ?',sub:'Symbole I dans la notation internationale.',choices:['Volt (V)','Ohm (Ω)','Ampère (A)','Watt (W)'],answer:2,expl:'L\'Ampère (A) est l\'unité du courant électrique. 1 A = 1 Coulomb par seconde. C\'est l\'une des 7 unités de base du système SI.'},
           {q:'Comment mesure-t-on la tension U dans un circuit ?',sub:'Quelle est la bonne connexion de l\'appareil de mesure ?',choices:['En série, le circuit ouvert','En parallèle aux bornes du dipôle','En série, circuit fermé','En parallèle avec l\'ampèremètre'],answer:1,expl:'Le voltmètre se branche toujours en parallèle aux bornes du composant à mesurer, sans couper le circuit. Sa résistance interne très élevée ne perturbe pas le circuit.'},
           {q:'Un moteur est alimenté sous 230 V et absorbe 5 A. Quelle est sa puissance ?',sub:'Applique la formule de puissance électrique.',choices:['46 W','235 W','1 150 W','46 kW'],answer:2,expl:'P = U × I = 230 × 5 = 1 150 W = 1,15 kW. Cette puissance est la puissance électrique absorbée par le moteur.'},
           {q:'Quelle grandeur s\'oppose au passage du courant dans un conducteur ?',sub:'Elle dépend du matériau et de la géométrie du conducteur.',choices:['La tension','La puissance','Le courant','La résistance'],answer:3,expl:'La résistance R, exprimée en Ohm (Ω), s\'oppose au passage du courant. Elle dépend de la résistivité du matériau (ρ), de la longueur (L) et de la section (S) : R = ρL/S.'},
           {q:'Quelle norme définit le vocabulaire électrotechnique international ?',sub:'Standard fondamental de la CEI.',choices:['NF C 15-100','CEI 60050-131','ISO 9001','EN 60079'],answer:1,expl:'La CEI 60050-131 (Vocabulaire Électrotechnique International) définit officiellement toutes les grandeurs, symboles et unités électriques utilisés dans la réglementation européenne et internationale.'},
         ]},
        {id:'ch2',title:'Loi d\'Ohm & lois de Kirchhoff',ico:'#ico-resistor',
         lesson:{
           disc:'Électricité',mod:'Module 1 — Fondamentaux',
           sections:[
             {type:'text',title:'La loi d\'Ohm',body:`Formulée par Georg Simon Ohm en 1827, la loi d'Ohm établit une relation linéaire entre la tension aux bornes d'un dipôle résistif et le courant qui le traverse. Elle est valable pour tous les <strong>conducteurs ohmiques</strong> (métaux à température constante).`},
             {type:'formula',formula:'U = R × I',legend:'U en Volts, R en Ohms, I en Ampères'},
             {type:'text',title:'Les lois de Kirchhoff',body:`Pour analyser des circuits complexes, on utilise les deux lois de Kirchhoff. La <strong>loi des nœuds</strong> (1ère loi) et la <strong>loi des mailles</strong> (2ème loi) permettent d'écrire un système d'équations et de résoudre tout circuit linéaire.`},
             {type:'list',items:['<strong>Loi des nœuds (LKN) :</strong> La somme algébrique des courants en un nœud est nulle : ΣI = 0','<strong>Loi des mailles (LKM) :</strong> La somme algébrique des tensions dans une maille fermée est nulle : ΣU = 0','Un nœud est un point de jonction d\'au moins 3 conducteurs','Une maille est un chemin fermé dans le circuit']},
             {type:'formula',formula:'ΣI entrants = ΣI sortants',legend:'Loi des nœuds — Conservation du courant'},
             {type:'norme',text:'<strong>CEI 60050-131</strong> : La loi d\'Ohm s\'applique aux conducteurs ohmiques. Attention : elle n\'est pas applicable aux semi-conducteurs (diodes, transistors) ni aux sources de tension.'},
             {type:'tip',text:'<strong>Triangle d\'Ohm :</strong> Couvrez la grandeur à trouver — si vous couvrez U, vous voyez R × I. Si vous couvrez I, vous voyez U/R. Si vous couvrez R, vous voyez U/I.'},
           ]
         },
         quiz:[
           {q:'Un circuit a R = 47 Ω et I = 200 mA. Quelle est la tension U ?',sub:'Applique la loi d\'Ohm directement.',choices:['0,235 V','4,7 V','9,4 V','235 V'],answer:2,expl:'U = R × I = 47 × 0,2 = 9,4 V. Attention à convertir 200 mA en 0,2 A avant de calculer.'},
           {q:'Quelle est la formule de la loi d\'Ohm pour trouver la résistance R ?',sub:'Reformule l\'équation.',choices:['R = U + I','R = U × I','R = U / I','R = I / U'],answer:2,expl:'En isolant R dans U = R × I, on obtient R = U / I. Soit Ohms = Volts ÷ Ampères.'},
           {q:'Au nœud A, arrivent les courants I1 = 3 A et I2 = 2 A. Quel est le courant I3 sortant ?',sub:'Applique la loi des nœuds de Kirchhoff.',choices:['1 A','3 A','5 A','6 A'],answer:2,expl:'Loi des nœuds : ΣI entrants = ΣI sortants. Donc I3 = I1 + I2 = 3 + 2 = 5 A. La somme des courants entrant en un nœud est égale à la somme des courants sortants.'},
           {q:'Une maille contient une source de 12 V et deux résistances R1 = 4 Ω et R2 = 2 Ω. Quel est le courant I ?',sub:'Applique la loi des mailles.',choices:['1 A','2 A','3 A','6 A'],answer:1,expl:'Loi des mailles : E = R1×I + R2×I = (R1+R2)×I. Donc I = 12 / (4+2) = 12/6 = 2 A.'},
           {q:'Qui a formulé la loi éponyme reliant U, R et I en 1827 ?',sub:'Un physicien allemand fondamental.',choices:['Alessandro Volta','André-Marie Ampère','Georg Simon Ohm','Michael Faraday'],answer:2,expl:'Georg Simon Ohm (1789-1854), physicien allemand, publia en 1827 la relation linéaire entre tension et courant dans son ouvrage « Die galvanische Kette, mathematisch bearbeitet ».'},
         ]},
        {id:'ch3',title:'Circuits série / parallèle / mixte',ico:'#ico-circuit2',
         lesson:{
           disc:'Électricité',mod:'Module 1 — Fondamentaux',
           sections:[
             {type:'text',title:'Association de résistances',body:`Les résistances peuvent être connectées de deux façons fondamentales : <strong>en série</strong> (bout à bout, le même courant les traverse) ou <strong>en parallèle</strong> (côte à côte, la même tension est à leurs bornes). Les circuits réels sont souvent mixtes, combinant les deux.`},
             {type:'formula',formula:'R_série = R1 + R2 + R3 + …',legend:'En série : les résistances s\'additionnent'},
             {type:'formula',formula:'1/R_para = 1/R1 + 1/R2 + …',legend:'En parallèle : les inverses s\'additionnent'},
             {type:'text',title:'Propriétés à retenir',body:`En <strong>série</strong> : le courant est identique dans tous les composants. Les tensions s'additionnent. La résistance équivalente est toujours supérieure à la plus grande des résistances. En <strong>parallèle</strong> : la tension est identique aux bornes de tous les composants. Les courants s'additionnent. La résistance équivalente est toujours inférieure à la plus petite des résistances.`},
             {type:'list',items:['<strong>Série :</strong> I = même partout · U = U1+U2+U3 · Réq > R_max','<strong>Parallèle :</strong> U = même partout · I = I1+I2+I3 · Réq < R_min','Diviseur de tension (pont résistif) : U2 = E × R2/(R1+R2)','Diviseur de courant : I2 = I_total × R1/(R1+R2)']},
             {type:'norme',text:'<strong>Application NF C 15-100 :</strong> Les circuits d\'éclairage résidentiel sont câblés en parallèle — chaque luminaire reçoit la même tension (230 V) et peut être commandé indépendamment.'},
             {type:'tip',text:'<strong>Cas particulier :</strong> Pour deux résistances en parallèle uniquement, utilisez la formule simplifiée : Réq = (R1 × R2) / (R1 + R2). C\'est beaucoup plus rapide que la formule générale.'},
           ]
         },
         quiz:[
           {q:'Trois résistances de 10 Ω, 20 Ω et 30 Ω sont en série. Quelle est la résistance équivalente ?',sub:'Association en série.',choices:['6 Ω','18 Ω','60 Ω','180 Ω'],answer:2,expl:'En série : Réq = R1 + R2 + R3 = 10 + 20 + 30 = 60 Ω. Les résistances en série s\'additionnent directement.'},
           {q:'Deux résistances de 6 Ω et 12 Ω sont en parallèle. Quelle est la résistance équivalente ?',sub:'Utilise la formule pour deux résistances en parallèle.',choices:['2 Ω','4 Ω','9 Ω','18 Ω'],answer:1,expl:'Réq = (R1 × R2)/(R1 + R2) = (6 × 12)/(6 + 12) = 72/18 = 4 Ω. En parallèle, la résistance équivalente est toujours inférieure à la plus petite (ici 6 Ω).'},
           {q:'Dans un circuit série, que peut-on dire du courant ?',sub:'Propriété fondamentale du circuit série.',choices:['Il est différent dans chaque résistance','Il est identique dans tous les composants','Il est nul si une résistance est grande','Il dépend de la tension de chaque résistance'],answer:1,expl:'Dans un circuit série, le même courant traverse tous les composants : I = U_total / R_total. C\'est la définition même du circuit série.'},
           {q:'Un diviseur de tension : E = 12 V, R1 = 8 Ω, R2 = 4 Ω. Quelle est la tension aux bornes de R2 ?',sub:'Formule du pont résistif.',choices:['3 V','4 V','6 V','8 V'],answer:1,expl:'U2 = E × R2/(R1+R2) = 12 × 4/(8+4) = 12 × 4/12 = 4 V. Le diviseur de tension est fondamental pour alimenter différents étages d\'un circuit.'},
           {q:'Quelle est la particularité d\'un circuit parallèle concernant la tension ?',sub:'Propriété caractéristique du montage en parallèle.',choices:['La tension s\'additionne','La tension est nulle','La tension est identique aux bornes de chaque branche','La tension est inversement proportionnelle à la résistance'],answer:2,expl:'En parallèle, tous les composants sont soumis à la même tension. C\'est pourquoi les prises électriques d\'une maison sont toutes en parallèle : elles reçoivent toutes 230 V.'},
         ]},
        {id:'ch4',title:'Puissance & énergie électrique',ico:'#ico-plug',
         lesson:{
           disc:'Électricité',mod:'Module 1 — Fondamentaux',
           sections:[
             {type:'text',title:'Puissance électrique',body:`La <strong>puissance électrique P</strong> représente la quantité d'énergie transférée ou convertie par unité de temps. Elle se mesure en Watts (W). Pour un dipôle soumis à une tension U et traversé par un courant I, on a P = U × I. Dans le cas d'une résistance, cette puissance est entièrement dissipée sous forme de chaleur (<strong>effet Joule</strong>).`},
             {type:'formula',formula:'P = U × I = R × I² = U²/R',legend:'Trois formes équivalentes de la puissance'},
             {type:'text',title:'Énergie électrique',body:`L'<strong>énergie électrique W</strong> est la puissance multipliée par le temps durant lequel elle est consommée. L'unité SI est le Joule (J), mais en pratique on utilise le <strong>kilowattheure (kWh)</strong> sur les compteurs électriques. 1 kWh = 3 600 000 J = 3,6 MJ.`},
             {type:'formula',formula:'W = P × t',legend:'W en Joules (J) ou kWh · P en Watts · t en secondes ou heures'},
             {type:'list',items:['<strong>Effet Joule :</strong> P = R × I² — toute résistance dissipe de la chaleur','<strong>Compteur EDF :</strong> mesure en kWh l\'énergie consommée','<strong>Rendement η :</strong> η = P_utile / P_absorbée (toujours < 1)','<strong>1 kWh</strong> = énergie d\'un appareil de 1 000 W fonctionnant 1 heure = 3,6 MJ']},
             {type:'norme',text:'<strong>NF EN 50160</strong> : Caractéristiques de la tension fournie par les réseaux publics de distribution — fixe la tension nominale à 230 V / 50 Hz en résidentiel. La facturation est basée sur l\'énergie active en kWh.'},
             {type:'tip',text:'<strong>Calcul de facture :</strong> Un four à 2 000 W (2 kW) utilisé 30 min/jour pendant 30 jours consomme : 2 × 0,5 × 30 = 30 kWh. Au tarif de 0,20 €/kWh, cela représente 6 € par mois.'},
           ]
         },
         quiz:[
           {q:'Un radiateur de 1 000 Ω est alimenté sous 230 V. Quelle est sa puissance ?',sub:'Utilise P = U²/R.',choices:['0,23 W','23 W','52,9 W','230 W'],answer:2,expl:'P = U²/R = 230²/1000 = 52 900/1000 = 52,9 W. Cette formule est utile quand on connaît U et R mais pas directement le courant I.'},
           {q:'Quelle est la consommation en kWh d\'un moteur de 2,5 kW fonctionnant 8 h ?',sub:'Calcule l\'énergie électrique.',choices:['0,3125 kWh','2,5 kWh','8 kWh','20 kWh'],answer:3,expl:'W = P × t = 2,5 kW × 8 h = 20 kWh. L\'énergie est le produit de la puissance par la durée.'},
           {q:'Combien de Joules y a-t-il dans 1 kWh ?',sub:'Conversion d\'unités d\'énergie.',choices:['1 000 J','3 600 J','36 000 J','3 600 000 J'],answer:3,expl:'1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6 MJ. C\'est une conversion fondamentale : 1 h = 3 600 s.'},
           {q:'L\'effet Joule désigne la dissipation d\'énergie électrique sous forme de :',sub:'Phénomène observé dans toute résistance traversée par un courant.',choices:['Lumière','Chaleur','Magnétisme','Mouvement'],answer:1,expl:'L\'effet Joule est la conversion d\'énergie électrique en chaleur dans une résistance. P_joule = R × I². C\'est ce principe qui est utilisé dans les résistances chauffantes, grille-pains, chauffe-eau électriques, etc.'},
           {q:'Un four à 2 kW tourne 30 min/jour pendant 30 jours. Quelle énergie consomme-t-il ?',sub:'Calcule la consommation mensuelle en kWh.',choices:['1 kWh','30 kWh','60 kWh','900 kWh'],answer:1,expl:'W = P × t = 2 kW × (0,5 h/jour × 30 jours) = 2 × 15 = 30 kWh. Attention : 30 min = 0,5 h.'},
         ]},
      ]},
      {id:'m2',title:'Courant alternatif',chapters:[
        {id:'ch1',title:'Signaux sinusoïdaux, fréquence, période',ico:'#ico-wave',
         lesson:{disc:'Électricité',mod:'Module 2 — Courant alternatif',sections:[
           {type:'text',title:'Le courant alternatif sinusoïdal',body:`Le <strong>courant alternatif (AC)</strong> est un courant dont le sens et l'intensité varient périodiquement dans le temps. La forme la plus courante est le signal <strong>sinusoïdal</strong>, produit par les alternateurs. C'est le type de courant distribué sur les réseaux électriques (230 V / 50 Hz en Europe).`},
           {type:'formula',formula:'u(t) = Û × sin(2πft + φ)',legend:'u : tension instantanée · Û : valeur crête · f : fréquence · φ : phase initiale'},
           {type:'table',title:'Grandeurs caractéristiques',rows:[
             ['Grandeur','Symbole','Unité','Définition'],
             ['Période','T','seconde (s)','Durée d\'un cycle complet'],
             ['Fréquence','f','Hertz (Hz)','Nombre de cycles par seconde'],
             ['Pulsation','ω','rad/s','ω = 2πf'],
             ['Amplitude crête','Û','Volt (V)','Valeur maximale du signal'],
           ]},
           {type:'formula',formula:'T = 1/f   ·   f = 1/T',legend:'Relation fréquence–période'},
           {type:'norme',text:'<strong>NF EN 50160</strong> : En Europe, la fréquence du réseau est 50 Hz (T = 20 ms) et la tension nominale est 230 V efficace. Aux États-Unis : 60 Hz, 120 V.'},
           {type:'tip',text:'<strong>Mémo oscilloscope :</strong> Sur un oscilloscope, la période T se lit horizontalement (axe du temps) et l\'amplitude Û se lit verticalement. La fréquence f = 1/T se calcule ensuite.'},
         ]},
         quiz:[
           {q:'La fréquence du réseau électrique européen est :',sub:'Standard EDF / réseau public.',choices:['25 Hz','50 Hz','60 Hz','100 Hz'],answer:1,expl:'En Europe, le réseau est à 50 Hz (T = 20 ms). Aux USA/Canada, c\'est 60 Hz. Cette fréquence est maintenue très précisément par les opérateurs du réseau.'},
           {q:'Quelle est la période d\'un signal de 50 Hz ?',sub:'Applique la relation T = 1/f.',choices:['2 ms','20 ms','200 ms','2 s'],answer:1,expl:'T = 1/f = 1/50 = 0,02 s = 20 ms. La période est la durée d\'un cycle complet du signal sinusoïdal.'},
           {q:'La pulsation ω d\'un signal 50 Hz vaut :',sub:'ω = 2πf',choices:['50 rad/s','100 rad/s','314 rad/s','628 rad/s'],answer:2,expl:'ω = 2πf = 2 × π × 50 ≈ 314 rad/s. La pulsation s\'exprime en radians par seconde et est utilisée dans les équations différentielles des circuits AC.'},
           {q:'Dans l\'équation u(t) = Û×sin(2πft), que représente Û ?',sub:'Identification des paramètres du signal.',choices:['La valeur efficace','La fréquence','La valeur crête (amplitude)','La période'],answer:2,expl:'Û (ou Um) est la valeur crête, c\'est-à-dire la valeur maximale atteinte par la tension. Elle correspond à l\'amplitude du signal sinusoïdal sur un oscilloscope.'},
           {q:'Un signal a une période T = 10 ms. Quelle est sa fréquence ?',sub:'f = 1/T',choices:['10 Hz','50 Hz','100 Hz','1 000 Hz'],answer:2,expl:'f = 1/T = 1/0,01 = 100 Hz. Un signal de 10 ms de période effectue 100 cycles par seconde.'},
         ]},
        {id:'ch2',title:'Valeurs efficaces et crêtes',ico:'#ico-wave',
         lesson:{disc:'Électricité',mod:'Module 2 — Courant alternatif',sections:[
           {type:'text',title:'Valeur efficace (RMS)',body:`La <strong>valeur efficace</strong> (ou RMS, Root Mean Square) est la valeur d'un courant continu qui produirait le même effet thermique (effet Joule) qu'un courant alternatif. C'est la grandeur indiquée sur les voltmètres et les prises domestiques. En France, 230 V est la valeur efficace — la valeur crête est bien plus élevée.`},
           {type:'formula',formula:'U_eff = Û / √2 ≈ Û × 0,707',legend:'Pour un signal sinusoïdal pur'},
           {type:'formula',formula:'Û = U_eff × √2 ≈ U_eff × 1,414',legend:'Valeur crête à partir de la valeur efficace'},
           {type:'list',items:['Le réseau 230 V (efficace) a une crête à 230 × √2 ≈ <strong>325 V</strong>','Les multimètres mesurent la valeur efficace (sauf mention "TRMS")','Valeur moyenne d\'un signal sinusoïdal sur une demi-période : U_moy = Û × 2/π ≈ 0,637 × Û','Le facteur de forme = U_eff / U_moy = π/(2√2) ≈ 1,11']},
           {type:'norme',text:'<strong>IEC 60050</strong> : La valeur efficace (RMS) est la racine carrée de la moyenne du carré du signal sur une période complète. Cette définition est valable pour tout signal périodique, pas seulement sinusoïdal.'},
           {type:'tip',text:'<strong>Danger :</strong> Bien que les prises affichent 230 V, la tension de crête atteint ≈ 325 V. Les condensateurs et composants électroniques doivent être dimensionnés en tenant compte de cette valeur crête, pas de la valeur efficace.'},
         ]},
         quiz:[
           {q:'Le réseau 230 V (efficace) a une tension crête de :',sub:'Û = Ueff × √2',choices:['163 V','230 V','280 V','325 V'],answer:3,expl:'Û = 230 × √2 = 230 × 1,414 ≈ 325 V. La tension de crête est ce que "voit" réellement un condensateur branché sur le réseau. C\'est pourquoi ils sont souvent dimensionnés à 400 V.'},
           {q:'Un voltmètre affiche 100 V sur un réseau AC. Quelle est la valeur crête ?',sub:'Passage valeur efficace → crête.',choices:['70,7 V','100 V','141,4 V','200 V'],answer:2,expl:'Û = Ueff × √2 = 100 × 1,414 = 141,4 V. Le voltmètre mesure toujours la valeur efficace pour un signal sinusoïdal.'},
           {q:'La valeur efficace d\'un signal sinusoïdal de crête 311 V est :',sub:'Ueff = Û / √2',choices:['155 V','220 V','311 V','440 V'],answer:1,expl:'Ueff = 311 / √2 = 311 / 1,414 ≈ 220 V. C\'est l\'ancienne valeur standard du réseau européen (maintenant 230 V depuis 1995).'},
           {q:'Que mesure un voltmètre AC classique ?',sub:'Grandeur indiquée par les appareils de mesure standard.',choices:['La valeur crête','La valeur moyenne','La valeur efficace (RMS)','La valeur instantanée'],answer:2,expl:'Les voltmètres et multimètres AC standard affichent la valeur efficace (RMS). Certains modèles "True RMS" mesurent la vraie valeur efficace pour les signaux non sinusoïdaux (harmoniques).'},
           {q:'Pourquoi dimensionner les condensateurs sur le réseau à 400 V minimum ?',sub:'Choix du calibre de tension des composants.',choices:['Par sécurité arbitraire','Parce que la tension crête atteint ≈ 325 V','Parce que la norme l\'exige','Parce que la valeur moyenne est 400 V'],answer:1,expl:'La tension crête du réseau 230 V est ≈ 325 V. Pour assurer une marge de sécurité, on choisit des condensateurs avec une tension nominale ≥ 400 V (voire 450 V).'},
         ]},
        {id:'ch3',title:'Déphasage & impédance',ico:'#ico-circuit2',
         lesson:{disc:'Électricité',mod:'Module 2 — Courant alternatif',sections:[
           {type:'text',title:'Déphasage entre tension et courant',body:`En courant alternatif, la tension et le courant ne sont pas toujours en phase. Un <strong>déphasage φ</strong> (phi) peut exister entre eux. Dans une résistance pure, φ = 0 (en phase). Dans une inductance, le courant est en <strong>retard</strong> de 90° sur la tension. Dans un condensateur, le courant est en <strong>avance</strong> de 90° sur la tension.`},
           {type:'table',title:'Comportement des dipôles en AC',rows:[
             ['Composant','Symbole','Impédance Z','Déphasage φ'],
             ['Résistance','R','Z = R','0° (en phase)'],
             ['Inductance','L','Z = Lω = jLω','90° (I en retard)'],
             ['Condensateur','C','Z = 1/(Cω)','−90° (I en avance)'],
           ]},
           {type:'formula',formula:'Z = √(R² + X²)',legend:'Impédance totale · X = réactance (XL = Lω · XC = 1/Cω)'},
           {type:'list',items:['L\'impédance Z est la généralisation de la résistance en AC (en Ohms Ω)','La loi d\'Ohm en AC : U = Z × I','<strong>Résonance série :</strong> XL = XC → Z = R (minimum), courant maximal','Fréquence de résonance : f₀ = 1/(2π√LC)']},
           {type:'norme',text:'<strong>CEI 60050</strong> : L\'impédance est un nombre complexe Z = R + jX où R est la résistance et X la réactance. Le module |Z| = √(R² + X²) est l\'impédance scalaire utilisée en calcul.'},
           {type:'tip',text:'<strong>Astuce mémo :</strong> "ELI the ICE man" — En anglais : dans une bobine (L), E (tension) précède I (courant) ; dans un condensateur (C), I précède E. Soit en français : bobine → U en avance · condensateur → I en avance.'},
         ]},
         quiz:[
           {q:'Dans une inductance pure (bobine idéale), le déphasage du courant par rapport à la tension est :',sub:'Comportement inductif en AC.',choices:['0°','−90° (retard)','90° (avance)','180°'],answer:1,expl:'Dans une inductance pure, le courant est en retard de 90° sur la tension. Cela est dû à la loi de Faraday : u = L × di/dt, le courant ne peut pas varier instantanément.'},
           {q:'La réactance d\'un condensateur de 100 µF à 50 Hz est :',sub:'XC = 1/(Cω) = 1/(2πfC)',choices:['0,031 Ω','31,8 Ω','3 180 Ω','31 800 Ω'],answer:1,expl:'XC = 1/(2πfC) = 1/(2π × 50 × 100×10⁻⁶) = 1/(0,0314) ≈ 31,8 Ω. Les condensateurs ont une réactance qui diminue quand la fréquence augmente.'},
           {q:'Une impédance a R = 3 Ω et XL = 4 Ω. Son module Z est :',sub:'Z = √(R² + X²)',choices:['1 Ω','5 Ω','7 Ω','12 Ω'],answer:1,expl:'Z = √(3² + 4²) = √(9 + 16) = √25 = 5 Ω. C\'est le théorème de Pythagore appliqué au triangle des impédances.'},
           {q:'À la résonance d\'un circuit RLC série, l\'impédance vaut :',sub:'Condition de résonance XL = XC.',choices:['0 Ω','Z = R uniquement','Z = XL + XC','Z = ∞'],answer:1,expl:'À la résonance (XL = XC), les réactances se compensent. L\'impédance totale Z = R (minimum). Le courant est alors maximal et en phase avec la tension.'},
           {q:'La réactance d\'une bobine L = 100 mH à 50 Hz est :',sub:'XL = Lω = L × 2πf',choices:['5 Ω','31,4 Ω','50 Ω','314 Ω'],answer:1,expl:'XL = L × 2πf = 0,1 × 2π × 50 = 0,1 × 314 = 31,4 Ω. La réactance inductive est proportionnelle à la fréquence : plus la fréquence est élevée, plus la bobine s\'oppose au courant.'},
         ]},
        {id:'ch4',title:'Puissance en AC (cos φ)',ico:'#ico-bolt',
         lesson:{disc:'Électricité',mod:'Module 2 — Courant alternatif',sections:[
           {type:'text',title:'Les trois puissances en AC',body:`En courant alternatif, la puissance se décompose en trois grandeurs. La <strong>puissance active P</strong> (Watts) représente l'énergie réellement consommée et transformée. La <strong>puissance réactive Q</strong> (VAr) est échangée avec les bobines et condensateurs sans être consommée. La <strong>puissance apparente S</strong> (VA) est la puissance totale fournie par le réseau.`},
           {type:'table',title:'Triangle des puissances',rows:[
             ['Grandeur','Formule','Unité','Rôle'],
             ['Puissance active P','P = U×I×cosφ','Watt (W)','Énergie consommée (utile)'],
             ['Puissance réactive Q','Q = U×I×sinφ','VAr','Énergie stockée/restituée'],
             ['Puissance apparente S','S = U×I','VA (volt-ampère)','Puissance totale du réseau'],
           ]},
           {type:'formula',formula:'S² = P² + Q²   ·   cosφ = P/S',legend:'Triangle de Puissances · cosφ = facteur de puissance'},
           {type:'list',items:['cosφ = 1 : charge purement résistive (ampoule, radiateur) — idéal','cosφ < 1 : charge inductive ou capacitive (moteur, transformateur)','<strong>Pénalité tarifaire</strong> en industrie si cosφ < 0,92','<strong>Compensation :</strong> condensateurs en parallèle pour relever cosφ']},
           {type:'norme',text:'<strong>NF C 13-200</strong> : Les distributeurs d\'énergie imposent un facteur de puissance cosφ ≥ 0,86 (parfois 0,92) pour les installations industrielles HTA. En dessous, des pénalités sur la facture d\'énergie réactive sont appliquées.'},
           {type:'tip',text:'<strong>Exemple industriel :</strong> Un moteur de 10 kW avec cosφ = 0,8 consomme 10 kW actifs mais le réseau doit fournir S = P/cosφ = 10/0,8 = 12,5 kVA. Les câbles et transformateurs doivent être dimensionnés sur 12,5 kVA, pas 10 kW.'},
         ]},
         quiz:[
           {q:'Un moteur absorbe 10 kVA avec cosφ = 0,8. Sa puissance active est :',sub:'P = S × cosφ',choices:['8 kW','10 kW','12,5 kW','80 kW'],answer:0,expl:'P = S × cosφ = 10 × 0,8 = 8 kW. Les 2 kVA restants correspondent à la puissance réactive Q stockée dans les bobinages du moteur.'},
           {q:'Un facteur de puissance cosφ = 1 signifie que :',sub:'Interprétation du facteur de puissance.',choices:['La charge est purement inductive','La charge est purement résistive (P = S)','Il y a un fort décalage de phase','La puissance réactive est maximale'],answer:1,expl:'cosφ = 1 signifie φ = 0° : la tension et le courant sont en phase. C\'est le cas d\'une charge purement résistive (radiateur, four). Toute la puissance apparente est de la puissance active utile.'},
           {q:'Comment relever le facteur de puissance d\'une installation industrielle ?',sub:'Technique de compensation du cosφ.',choices:['Augmenter la tension d\'alimentation','Ajouter des résistances en série','Installer des condensateurs en parallèle','Installer des bobines en série'],answer:2,expl:'Les condensateurs produisent de la puissance réactive capacitive qui compense la puissance réactive inductive des moteurs. Ils sont souvent regroupés en "batteries de condensateurs" sur le TGBT.'},
           {q:'S = 15 kVA et P = 12 kW. Quelle est la puissance réactive Q ?',sub:'Triangle des puissances : S² = P² + Q²',choices:['3 kVAr','6 kVAr','9 kVAr','27 kVAr'],answer:2,expl:'Q = √(S² − P²) = √(15² − 12²) = √(225 − 144) = √81 = 9 kVAr. Le triangle des puissances est un triangle rectangle (Pythagore).'},
           {q:'Pourquoi les câbles d\'alimentation sont-ils dimensionnés sur la puissance apparente S ?',sub:'Impact du cosφ sur le câblage.',choices:['Par convention normative uniquement','Car S détermine le courant réel circulant dans les câbles','Car P est toujours inconnue','Car Q est toujours nulle'],answer:1,expl:'Le courant I = S/U. Les câbles sont parcourus par ce courant total (actif + réactif). Un cosφ faible impose un courant plus grand pour la même puissance utile, d\'où un câblage plus important et des pertes par effet Joule supérieures.'},
         ]},
      ]},
      {id:'m3',title:'Installations BT (NF C 15-100)',chapters:[
        {id:'ch1',title:'Structure des installations BT',ico:'#ico-plug',
         lesson:{disc:'Électricité',mod:'Module 3 — Installations BT',sections:[
           {type:'text',title:'Architecture d\'une installation basse tension',body:`Une installation BT (Basse Tension, < 1 000 V AC) est organisée en niveaux. Elle part du réseau de distribution (ENEDIS), traverse le compteur, puis le <strong>Tableau Général Basse Tension (TGBT)</strong>, avant d'alimenter les <strong>tableaux divisionnaires</strong> et enfin les circuits terminaux. Cette architecture arborescente garantit la sélectivité des protections.`},
           {type:'table',title:'Niveaux d\'une installation résidentielle',rows:[
             ['Niveau','Élément','Rôle'],
             ['1','Réseau ENEDIS + coffret de coupure','Alimentation et coupure générale'],
             ['2','Compteur Linky','Mesure de consommation'],
             ['3','Tableau principal (TGBT)','Disjoncteur général + protection différentielle'],
             ['4','Circuits terminaux','Prises, éclairage, appareils'],
           ]},
           {type:'list',items:['<strong>Disjoncteur de branchement :</strong> protège contre les surintensités au niveau du compteur','<strong>Disjoncteur différentiel 30 mA :</strong> obligatoire sur chaque circuit terminal (NF C 15-100)','<strong>Sections standard :</strong> 1,5 mm² éclairage · 2,5 mm² prises · 4–6 mm² cuisinière/chauffe-eau','<strong>Sélectivité :</strong> le disjoncteur le plus proche du défaut doit déclencher en premier']},
           {type:'norme',text:'<strong>NF C 15-100</strong> (édition 2002, amendements 2008 et 2015) : norme française des installations électriques basse tension dans les bâtiments d\'habitation. Elle impose notamment le nombre de circuits, les sections, les prises et les protections obligatoires.'},
           {type:'tip',text:'<strong>Nombre minimum de circuits (NF C 15-100) :</strong> éclairage (1 par tranche de 5 pièces), prises 16 A (1 par tranche de 4 pièces), circuits spéciaux (four, lave-linge, lave-vaisselle, chauffe-eau). Chaque circuit a son propre disjoncteur et sa protection différentielle.'},
         ]},
         quiz:[
           {q:'Que signifie l\'acronyme TGBT ?',sub:'Tableau électrique principal d\'une installation.',choices:['Très Grande Batterie de Transformateurs','Tableau Général Basse Tension','Transformateur Général Basse Tension','Tableau de Gestion des Batteries de Tension'],answer:1,expl:'TGBT = Tableau Général Basse Tension. C\'est le tableau électrique principal qui reçoit l\'alimentation du réseau et distribue l\'énergie vers tous les circuits de l\'installation.'},
           {q:'Quelle section minimale de câble est imposée pour les circuits d\'éclairage résidentiel ?',sub:'NF C 15-100 — sections de conducteurs.',choices:['0,75 mm²','1,5 mm²','2,5 mm²','4 mm²'],answer:1,expl:'La NF C 15-100 impose 1,5 mm² minimum pour les circuits d\'éclairage (protégés par disjoncteur 10 A). Les circuits de prises utilisent 2,5 mm² (disjoncteur 16 A).'},
           {q:'Pourquoi une installation est-elle organisée en arborescence ?',sub:'Principe de sélectivité.',choices:['Pour économiser du câble','Pour garantir la sélectivité des protections','Pour faciliter le comptage','Pour réduire la tension'],answer:1,expl:'L\'architecture arborescente permet la sélectivité : en cas de défaut, seul le disjoncteur le plus proche (et le moins calibré) déclenche, sans couper toute l\'installation. C\'est un critère de continuité de service.'},
           {q:'La protection différentielle 30 mA en résidentiel protège contre :',sub:'Rôle du disjoncteur différentiel.',choices:['Les courts-circuits entre phases','Les contacts indirects (risque d\'électrocution)','Les surtensions du réseau','Les harmoniques'],answer:1,expl:'Le différentiel 30 mA détecte une fuite de courant (contact indirect avec une masse mise à la terre ou contact direct) et déclenche en < 30 ms. C\'est la protection principale contre l\'électrocution.'},
           {q:'Combien de circuits d\'éclairage minimum pour un appartement de 8 pièces ?',sub:'NF C 15-100 — règle de dimensionnement.',choices:['1 circuit','2 circuits','3 circuits','4 circuits'],answer:1,expl:'1 circuit d\'éclairage par tranche de 5 pièces (arrondi au supérieur). Pour 8 pièces : 8/5 = 1,6 → 2 circuits minimum. Cette règle évite de couper tout l\'éclairage en cas de défaut.'},
         ]},
        {id:'ch2',title:'Protection des circuits',ico:'#ico-shield',
         lesson:{disc:'Électricité',mod:'Module 3 — Installations BT',sections:[
           {type:'text',title:'Protections contre les surintensités',body:`Les protections électriques ont pour rôle de déconnecter automatiquement un circuit en cas d'anomalie. Les deux principaux défauts sont la <strong>surcharge</strong> (courant légèrement supérieur au nominal sur une longue durée) et le <strong>court-circuit</strong> (courant très élevé de façon instantanée). Ces deux défauts nécessitent des protections aux caractéristiques différentes.`},
           {type:'table',title:'Types de protections',rows:[
             ['Dispositif','Protège contre','Principe','Avantage'],
             ['Fusible','Court-circuit + surcharge','Fusion d\'un filament','Simple, économique'],
             ['Disjoncteur magnéto-thermique','Court-circuit + surcharge','Bi-métal + électro-aimant','Réarmable, réglable'],
             ['Différentiel 30 mA','Contact indirect','Détection Ifuite','Sécurité personne'],
             ['Disjoncteur différentiel','Tout défaut','Combiné magnéto-th. + diff.','Solution complète'],
           ]},
           {type:'formula',formula:'In ≤ Iz   ·   If ≤ 1,45 × Iz',legend:'Conditions de coordination protection/câble (NF C 15-100)'},
           {type:'norme',text:'<strong>NF C 15-100 §433</strong> : Le courant nominal du dispositif de protection doit être ≤ à la capacité ampérique du câble Iz. Le courant de fusion If doit être ≤ 1,45 × Iz pour garantir la protection thermique effective du conducteur.'},
           {type:'tip',text:'<strong>Déclenchement magnétique vs thermique :</strong> Le déclencheur thermique (bi-métal) réagit aux surcharges (courant modéré mais prolongé, durée de quelques secondes à minutes). Le déclencheur magnétique réagit aux courts-circuits (courant très élevé, déclenchement instantané en < 10 ms).'},
         ]},
         quiz:[
           {q:'Quelle est la différence entre une surcharge et un court-circuit ?',sub:'Deux types de défauts électriques.',choices:['La surcharge est plus dangereuse','Un court-circuit = courant très élevé instantanément ; une surcharge = courant modérément trop élevé','Ils sont identiques','La surcharge affecte la tension'],answer:1,expl:'Surcharge : courant légèrement supérieur à In (ex : trop d\'appareils branchés). Court-circuit : courant très élevé soudainement (câbles en contact direct). Le disjoncteur réagit différemment : lentement pour surcharge (thermique), instantanément pour CC (magnétique).'},
           {q:'Un câble 2,5 mm² supporte 20 A (Iz=20 A). Quel disjoncteur choisir ?',sub:'Condition In ≤ Iz.',choices:['10 A','16 A','20 A','25 A'],answer:1,expl:'On choisit In ≤ Iz = 20 A. Un disjoncteur 16 A est le choix standard pour les circuits de prises (2,5 mm²). Un 20 A serait acceptable mais le 16 A est la pratique courante recommandée par la NF C 15-100.'},
           {q:'Le déclencheur magnétique d\'un disjoncteur protège contre :',sub:'Principe du déclencheur magnétique.',choices:['Les surcharges prolongées','Les courts-circuits (courant très élevé)','Les surtensions','Les défauts à la terre'],answer:1,expl:'Le déclencheur magnétique (électro-aimant) détecte les courants de court-circuit très élevés et déclenche le disjoncteur instantanément (< 10 ms). Le bi-métal thermique gère les surcharges lentes.'},
           {q:'Pourquoi le différentiel 30 mA est-il appelé "protection des personnes" ?',sub:'Rôle physiologique du seuil 30 mA.',choices:['Car il est réglé sur 30 mA par convention','Car 30 mA est le seuil de fibrillation ventriculaire','Car 30 mA est en dessous du seuil de sensation','Car il déclenche en 300 ms'],answer:1,expl:'30 mA est le courant en dessous duquel le risque de fibrillation ventriculaire est très faible. Le déclenchement est rapide (< 30 ms) pour limiter l\'exposition. C\'est le compromis sécurité/sensibilité pour éviter les déclenchements intempestifs.'},
           {q:'Un disjoncteur magnéto-thermique présente l\'avantage d\'être :',sub:'Avantage par rapport au fusible.',choices:['Moins cher qu\'un fusible','Réarmable après déclenchement','Protège uniquement contre le court-circuit','À usage unique'],answer:1,expl:'Après un déclenchement, le disjoncteur se réarme simplement en relevant le levier. Le fusible, lui, doit être remplacé à chaque déclenchement. Le disjoncteur est également réglable et facilement identifiable visuellement (position ouverte/fermée).'},
         ]},
        {id:'ch3',title:'Mise à la terre et schémas TT/TN/IT',ico:'#ico-info',
         lesson:{disc:'Électricité',mod:'Module 3 — Installations BT',sections:[
           {type:'text',title:'Rôle de la mise à la terre',body:`La <strong>mise à la terre (PE)</strong> relie les masses métalliques des appareils électriques au sol (potentiel nul). En cas de défaut d'isolement, le courant de fuite s'écoule vers la terre plutôt que vers un utilisateur. La mise à la terre est la base de la sécurité électrique et est associée aux dispositifs différentiels.`},
           {type:'table',title:'Schémas de liaison à la terre (SLT)',rows:[
             ['Schéma','Signification','Neutre','Masses','Usage typique'],
             ['TT','Terre-Terre','Neutre mis à la terre au poste','Masses reliées à une prise de terre distincte','Résidentiel France'],
             ['TN','Terre-Neutre','Neutre mis à la terre au poste','Masses reliées au neutre (PE = N)','Industrie, tertiaire'],
             ['IT','Isolé-Terre','Neutre isolé ou impédant','Masses reliées à la terre','Hôpitaux, haute dispo.'],
           ]},
           {type:'list',items:['<strong>Schéma TT :</strong> protection obligatoirement par différentiel (30 mA résidentiel, 300 mA pour sélectivité)','<strong>Schéma TN-S :</strong> neutre N et protection PE séparés — le plus sûr','<strong>Schéma TN-C :</strong> neutre et protection confondus (PEN) — interdit en résidentiel','<strong>Schéma IT :</strong> 1er défaut non dangereux, alarme de contrôle d\'isolement (CPI)']},
           {type:'norme',text:'<strong>NF C 15-100 §312</strong> : En France, le schéma TT est le schéma de référence pour les installations résidentielles alimentées par le réseau de distribution publique ENEDIS. Il impose l\'utilisation de dispositifs différentiels à courant résiduel (DDR).'},
           {type:'tip',text:'<strong>Mémo SLT :</strong> La première lettre = liaison du neutre à la terre côté source (T = Terre, I = Isolé). La deuxième lettre = liaison des masses côté installation (T = Terre distincte, N = Neutre).'},
         ]},
         quiz:[
           {q:'En France résidentielle, quel schéma de liaison à la terre est utilisé ?',sub:'Standard ENEDIS réseau public.',choices:['IT','TN-C','TN-S','TT'],answer:3,expl:'Le schéma TT est le schéma standard en France pour les installations résidentielles alimentées par le réseau ENEDIS. Il implique une prise de terre distincte côté installation et impose la protection par différentiel.'},
           {q:'Dans le schéma TT, que signifient les deux lettres T ?',sub:'Décodage de la nomenclature SLT.',choices:['Terre : neutre mis à la terre au poste · Terre : masses à une prise de terre distincte','Triphasé · Triphasé','Transformateur · Terminal','Tension · Triphasé'],answer:0,expl:'T = Terre (mise à la terre). 1ère T : le neutre est mis à la terre côté source (au poste HTA/BT). 2ème T : les masses de l\'installation sont reliées à une prise de terre distincte (et non au neutre).'},
           {q:'Pourquoi le schéma IT est-il utilisé dans les hôpitaux ?',sub:'Avantage de l\'isolation du neutre.',choices:['Car il coûte moins cher','Car le 1er défaut ne coupe pas l\'alimentation (continuité de service)','Car il n\'y a pas de mise à la terre','Car il est moins sensible aux surintensités'],answer:1,expl:'En IT, le premier défaut d\'isolement ne provoque pas de coupure (le courant de défaut est très faible). Une alarme CPI (Contrôleur Permanent d\'Isolement) prévient le technicien. C\'est vital dans un bloc opératoire où une coupure serait dangereuse.'},
           {q:'Quelle est la différence entre TN-S et TN-C ?',sub:'Variantes du schéma TN.',choices:['TN-S : neutre et PE confondus · TN-C : neutre et PE séparés','TN-S : neutre et PE séparés · TN-C : neutre et PE confondus (PEN)','TN-S est interdit en France · TN-C est résidentiel','Aucune différence'],answer:1,expl:'TN-S : conducteur N (neutre) et PE (protection) séparés sur tout le trajet — le plus sûr. TN-C : N et PE confondus en un seul conducteur PEN — interdit dans les installations résidentielles neuves (risque si le PEN est coupé).'},
           {q:'La résistance de la prise de terre d\'une installation TT doit être telle que :',sub:'Condition de protection en schéma TT.',choices:['RT < 1 Ω','RT × IΔn ≤ 50 V (tension de contact)','RT > 1 MΩ','RT est sans importance'],answer:1,expl:'En schéma TT, la tension de contact UC = RT × IΔn ≤ 50 V (norme). Pour un DDR 30 mA : RT ≤ 50/0,03 = 1 667 Ω. Dans la pratique, on vise RT < 100 Ω pour assurer une bonne protection.'},
         ]},
        {id:'ch4',title:'Section des conducteurs',ico:'#ico-info',
         lesson:{disc:'Électricité',mod:'Module 3 — Installations BT',sections:[
           {type:'text',title:'Choix de la section des conducteurs',body:`La section d'un conducteur électrique s'exprime en mm² et détermine sa <strong>capacité ampérique Iz</strong> (courant maximal admissible). Un conducteur trop petit surchauffe (risque d'incendie), trop gros est coûteux inutilement. La NF C 15-100 impose des règles de calcul tenant compte du type de câble, de la pose et du courant à transporter.`},
           {type:'table',title:'Sections courantes résidentiel (NF C 15-100)',rows:[
             ['Circuit','Section','Disjoncteur','Usage'],
             ['Éclairage','1,5 mm²','10 A','Luminaires'],
             ['Prises de courant','2,5 mm²','16 A','Prises 16 A'],
             ['Lave-linge / Lave-vaisselle','2,5 mm²','20 A','Appareils cuisine'],
             ['Cuisinière / Four','6 mm²','32 A','Gros électroménager'],
             ['Chauffe-eau','2,5 mm²','20 A','Résistance 2,4 kW'],
             ['Tableau — colonne montante','10–35 mm²','Selon puissance','Alimentation générale'],
           ]},
           {type:'formula',formula:'S = ρ × L × I / (ΔU_max)',legend:'Section minimale pour limiter la chute de tension · ρ = résistivité · L = longueur'},
           {type:'norme',text:'<strong>NF C 15-100 §523</strong> : Les capacités ampériques des câbles dépendent de la méthode de pose (sous conduit, en apparent, en dalle), du regroupement de câbles, et de la température ambiante. Des facteurs de correction sont appliqués.'},
           {type:'tip',text:'<strong>Chute de tension :</strong> La NF C 15-100 limite la chute de tension à 3% pour l\'éclairage et 5% pour les prises depuis le tableau. Un câble trop long ou trop fin provoque une chute de tension excessive qui se traduit par des appareils qui fonctionnent mal (moteurs qui chauffent, éclairage qui vacille).'},
         ]},
         quiz:[
           {q:'Quelle section est imposée pour un circuit de prises de courant 16 A résidentiel ?',sub:'NF C 15-100 — tableau des sections.',choices:['1,5 mm²','2,5 mm²','4 mm²','6 mm²'],answer:1,expl:'2,5 mm² est la section standard pour les circuits de prises 16 A, avec un disjoncteur 16 A. Cette section offre une Iz ≈ 20–24 A (selon la pose), compatible avec la protection 16 A.'},
           {q:'Une cuisinière électrique de 7,2 kW sous 230 V nécessite un câble de :',sub:'I = P/U → choisir la section adaptée.',choices:['2,5 mm²','4 mm²','6 mm²','10 mm²'],answer:2,expl:'I = P/U = 7200/230 ≈ 31,3 A. Un câble 6 mm² (Iz ≈ 36 A avec disjoncteur 32 A) convient. La NF C 15-100 impose 6 mm² pour la cuisinière avec un disjoncteur bipolaire 32 A.'},
           {q:'Pourquoi la chute de tension est-elle limitée à 3% pour l\'éclairage ?',sub:'Impact pratique de la chute de tension.',choices:['Pour économiser de l\'énergie','Pour éviter le scintillement des lampes et préserver leur durée de vie','Par convention arbitraire','Pour protéger les disjoncteurs'],answer:1,expl:'Une chute de tension excessive fait varier la luminosité, provoque le scintillement des lampes et réduit leur durée de vie (surtout les incandescentes). Pour les prises, la limite est 5% : les appareils tolèrent mieux une tension légèrement basse.'},
           {q:'Quel facteur fait diminuer la capacité ampérique Iz d\'un câble ?',sub:'Facteurs de correction de la capacité.',choices:['Une température ambiante basse','Un câble posé seul en apparent','Un regroupement de plusieurs câbles dans un conduit','Une grande section du conducteur'],answer:2,expl:'Plusieurs câbles dans un même conduit s\'échauffent mutuellement et ne peuvent pas évacuer la chaleur facilement. Des facteurs de réduction (< 1) sont appliqués : par ex. 0,7 pour 5 circuits dans un même conduit.'},
           {q:'La résistivité du cuivre est ρ = 0,0172 Ω·mm²/m. Un câble Cu 2,5 mm² de 50 m a une résistance de :',sub:'R = ρ × L / S',choices:['0,34 Ω','0,69 Ω','1,72 Ω','3,44 Ω'],answer:1,expl:'R = ρ × L / S = 0,0172 × 50 / 2,5 = 0,344 Ω pour un conducteur. En aller-retour (longueur double) : R_totale = 0,688 Ω ≈ 0,69 Ω. Cette résistance détermine la chute de tension ΔU = R × I.'},
         ]},
      ]},
      {id:'m4',title:'Protection & sécurité',chapters:[
        {id:'ch1',title:'Risques électriques & effets sur le corps',ico:'#ico-shield',
         lesson:{disc:'Électricité',mod:'Module 4 — Protection & sécurité',sections:[
           {type:'text',title:'Effets du courant électrique sur le corps humain',body:`Le courant électrique traversant le corps humain provoque des effets qui dépendent de son <strong>intensité</strong>, de sa <strong>durée</strong> et de son <strong>trajet</strong>. La résistance du corps humain varie de 1 000 Ω (peau humide) à 100 000 Ω (peau sèche). La tension de contact dangereuse est fixée conventionnellement à <strong>50 V AC</strong> (25 V en milieu humide).`},
           {type:'table',title:'Effets du courant selon l\'intensité (50 Hz)',rows:[
             ['Courant (mA)','Effets physiologiques','Danger'],
             ['< 1 mA','Imperceptible','Nul'],
             ['1 – 10 mA','Sensation, picotements, crampes légères','Faible'],
             ['10 – 30 mA','Contractions musculaires, lâcher difficile','Modéré'],
             ['30 – 100 mA','Tétanisation, arrêt respiratoire','Grave'],
             ['> 100 mA','Fibrillation ventriculaire, mort possible','Mortel'],
           ]},
           {type:'list',items:['<strong>Electrisation :</strong> passage du courant dans le corps','<strong>Electrocution :</strong> électrisation mortelle','<strong>Contact direct :</strong> toucher une pièce normalement sous tension','<strong>Contact indirect :</strong> toucher une masse mise accidentellement sous tension (défaut d\'isolement)']},
           {type:'norme',text:'<strong>Publication CEI 60479-1</strong> : Effets du courant électrique sur l\'être humain. La zone AC-4 (> 100 mA sur > 100 ms) correspond au risque de fibrillation ventriculaire. Cette publication fonde le choix du seuil 30 mA pour les DDR.'},
           {type:'tip',text:'<strong>Résistance du corps humain :</strong> En conditions sèches, Rcorps ≈ 2 000 Ω. Sous 230 V : I = 230/2000 = 115 mA → zone dangereuse. En conditions humides (salle de bain), Rcorps peut descendre à 500 Ω : I = 230/500 = 460 mA → mortel. D\'où les règles strictes pour les IPXX en salle de bain.'},
         ]},
         quiz:[
           {q:'À partir de quel courant le risque de fibrillation ventriculaire apparaît-il ?',sub:'Effets physiologiques du courant électrique.',choices:['1 mA','10 mA','30 mA','100 mA'],answer:3,expl:'> 100 mA sur une durée > 100 ms provoque la zone AC-4 (CEI 60479-1) : risque de fibrillation ventriculaire, arrêt cardiaque possible. C\'est pourquoi le DDR 30 mA déclenche largement en dessous de ce seuil.'},
           {q:'Quelle est la tension de contact limite en milieu ordinaire (local sec) ?',sub:'Tension conventionnelle limite (NF C 15-100).',choices:['12 V','25 V','50 V','110 V'],answer:2,expl:'50 V AC est la tension limite conventionnelle en milieu ordinaire (NF C 15-100 §411). En milieu humide (salle de bain, piscine), la limite descend à 25 V. Ces valeurs tiennent compte de la résistance du corps et du sol.'},
           {q:'Quelle est la différence entre électrisation et électrocution ?',sub:'Terminologie de la sécurité électrique.',choices:['Ce sont deux mots identiques','Electrisation = passage du courant · Electrocution = électrisation mortelle','Electrocution = passage du courant · Electrisation = électrisation mortelle','Electrisation concerne le courant AC, électrocution le courant DC'],answer:1,expl:'Électrisation : accident dû au passage du courant dans le corps (peut être bénin). Électrocution : électrisation ayant entraîné la mort. Cette distinction est importante dans les rapports d\'accident et les statistiques de sécurité.'},
           {q:'Pourquoi la résistance du corps humain diminue-t-elle en milieu humide ?',sub:'Impact de l\'humidité sur la résistance cutanée.',choices:['L\'eau augmente la résistance','L\'humidité de la peau réduit la résistance de contact (peau moins résistante)','L\'eau isole le corps du sol','L\'humidité n\'a aucun effet'],answer:1,expl:'La peau sèche offre une forte résistance (20 000 Ω ou plus). En présence d\'humidité ou de sueur, la résistance de la peau descend à 1 000 Ω ou moins. Pour la même tension, l\'intensité traversant le corps est alors bien plus dangereuse.'},
           {q:'Un contact indirect correspond à :',sub:'Classification des types de contacts électriques.',choices:['Toucher directement un conducteur nu sous tension','Toucher une masse métallique mise sous tension par un défaut d\'isolement','Être à proximité d\'un arc électrique','Un contact entre deux conducteurs de phases différentes'],answer:1,expl:'Contact indirect : toucher une masse (boîtier métallique d\'un appareil) qui est passée sous tension suite à un défaut d\'isolement interne. La protection différentielle et la mise à la terre permettent de détecter ce défaut et de couper le circuit avant tout accident.'},
         ]},
        {id:'ch2',title:'Habilitation électrique',ico:'#ico-shield',
         lesson:{disc:'Électricité',mod:'Module 4 — Protection & sécurité',sections:[
           {type:'text',title:'Qu\'est-ce que l\'habilitation électrique ?',body:`L'<strong>habilitation électrique</strong> est la reconnaissance par l'employeur de la capacité d'un travailleur à effectuer des travaux ou des opérations dans un environnement électrique. Elle est définie par la norme <strong>NF C 18-510</strong> (anciennement UTE C 18-510). Ce n'est pas un diplôme ou une certification permanente, mais une autorisation nominative et limitée dans le temps.`},
           {type:'table',title:'Principaux niveaux d\'habilitation',rows:[
             ['Symbole','Domaine','Rôle'],
             ['B0 / H0','BT / HT','Non-électricien : travaux mécaniques au voisinage'],
             ['B1 / H1','BT / HT','Exécutant électricien : réalise les travaux'],
             ['B2 / H2','BT / HT','Chargé de travaux : dirige et surveille'],
             ['BR','BT','Chargé d\'intervention : dépannage, essais'],
             ['BC / HC','BT / HT','Chargé de consignation'],
           ]},
           {type:'list',items:['<strong>Consignation :</strong> procédure de mise en sécurité (séparer, condamner, vérifier l\'absence de tension, mettre à la terre)','<strong>VAT :</strong> Vérification d\'Absence de Tension — obligatoire avant tout travail hors tension','<strong>EPI :</strong> Équipements de Protection Individuelle adaptés au niveau de risque','<strong>Validité :</strong> l\'habilitation est réévaluée périodiquement (généralement 1 à 3 ans)']},
           {type:'norme',text:'<strong>NF C 18-510</strong> (2012) : Opérations sur les ouvrages et installations électriques et dans un environnement électrique — Prévention du risque électrique. Elle remplace l\'ancienne UTE C 18-510 et introduit les notions de zones de travail et de distances limites.'},
           {type:'tip',text:'<strong>Règle d\'or des 5 étapes de consignation :</strong> 1) Séparer (ouvrir le circuit) · 2) Condamner (cadenas) · 3) Identifier (s\'assurer du bon circuit) · 4) Vérifier l\'Absence de Tension (VAT) · 5) Mettre à la terre et en court-circuit (si nécessaire). Ne jamais sauter une étape.'},
         ]},
         quiz:[
           {q:'L\'habilitation électrique BR autorise :',sub:'Domaine et rôle de l\'habilitation BR.',choices:['Travailler en HT','Les travaux mécaniques au voisinage seulement','Le dépannage et interventions générales en BT','La consignation des ouvrages HT'],answer:2,expl:'BR = Chargé d\'intervention BT. Cette habilitation autorise le dépannage, le remplacement à l\'identique et les essais en Basse Tension. C\'est l\'habilitation de base des électriciens d\'entretien.'},
           {q:'Que signifie VAT dans les procédures électriques ?',sub:'Étape obligatoire avant travaux hors tension.',choices:['Valeur Approuvée de Tension','Vérification d\'Absence de Tension','Vérificateur Agréé de Tension','Voltage Alternatif de Test'],answer:1,expl:'VAT = Vérification d\'Absence de Tension. Elle est obligatoire avant tout travail sur un circuit supposé hors tension. On utilise un VAT (vérificateur) ou un multimètre adapté, jamais par simple confiance.'},
           {q:'Combien d\'étapes comporte la procédure de consignation ?',sub:'Règle d\'or de la consignation.',choices:['2','3','4','5'],answer:3,expl:'Les 5 étapes : 1-Séparer · 2-Condamner · 3-Identifier · 4-VAT · 5-Mise à la terre et court-circuit. La mise à la terre (étape 5) est nécessaire en HT et recommandée en BT pour se protéger contre les remises en tension accidentelles.'},
           {q:'L\'habilitation B0 autorise à :',sub:'Niveau de base de l\'habilitation.',choices:['Réaliser des travaux électriques en BT','Travailler au voisinage de pièces nues sous tension sans y toucher','Consigner les installations BT','Dépanner les circuits électriques'],answer:1,expl:'B0 : habilitation de base pour les non-électriciens qui interviennent mécaniquement au voisinage d\'une installation électrique (peintre, maçon...). Ils ne sont pas autorisés à toucher les parties sous tension ni à intervenir sur les circuits électriques.'},
           {q:'L\'habilitation électrique est accordée par :',sub:'Qui délivre l\'habilitation ?',choices:['L\'État (préfecture)','Un organisme de certification indépendant','L\'employeur','La CPAM'],answer:2,expl:'L\'habilitation est accordée par l\'employeur après formation du travailleur et évaluation de ses compétences. Ce n\'est pas un diplôme : elle est nominative, spécifique à un domaine et peut être retirée ou modifiée par l\'employeur à tout moment.'},
         ]},
        {id:'ch3',title:'Dispositifs de protection différentielle',ico:'#ico-shield',
         lesson:{disc:'Électricité',mod:'Module 4 — Protection & sécurité',sections:[
           {type:'text',title:'Principe du courant différentiel résiduel',body:`Un <strong>dispositif différentiel à courant résiduel (DDR)</strong> compare les courants entrant et sortant d'un circuit. En fonctionnement normal, leur somme est nulle. En cas de fuite (défaut d'isolement ou contact avec une masse), un courant résiduel apparaît. Si ce courant dépasse le seuil de déclenchement IΔn, le DDR coupe le circuit en < 25 ms.`},
           {type:'formula',formula:'IΔ = I_aller − I_retour',legend:'Courant différentiel résiduel · Déclenchement si IΔ ≥ IΔn'},
           {type:'table',title:'Types de DDR selon la sensibilité',rows:[
             ['IΔn','Application','Protection'],
             ['10 mA','Prise rasoir, local médical','Très haute sensibilité'],
             ['30 mA','Résidentiel, prises, éclairage','Personnes (contact direct/indirect)'],
             ['100 mA','Tableau divisionnaire (sélectivité)','Incendie + sélectivité'],
             ['300 mA','Tableau principal (sélectivité)','Incendie uniquement'],
             ['500 mA – 1 A','Industrie (sélectivité aval)','Protection incendie amont'],
           ]},
           {type:'norme',text:'<strong>NF C 15-100 §531</strong> : En installation résidentielle, chaque circuit terminal doit être protégé par un DDR 30 mA maximum. Des DDR 300 mA ou 500 mA en tête permettent la sélectivité avec les DDR aval.'},
           {type:'tip',text:'<strong>Test mensuel :</strong> Chaque DDR possède un bouton TEST (T). Un appui doit provoquer le déclenchement immédiat. Ce test mensuel est recommandé pour vérifier le bon fonctionnement. Un DDR qui ne déclenche pas au test doit être remplacé.'},
         ]},
         quiz:[
           {q:'Un DDR détecte une différence de courant entre l\'aller et le retour. Que signifie une différence de 50 mA sur un DDR 30 mA ?',sub:'Principe de déclenchement différentiel.',choices:['Rien, le DDR ne réagit pas','Le DDR déclenche car 50 mA > 30 mA (IΔn)','Le DDR affiche une alarme sans couper','Le DDR attend 1 minute avant de couper'],answer:1,expl:'50 mA > IΔn = 30 mA : le DDR déclenche immédiatement (< 25 ms). Ce courant de fuite signifie que 50 mA ne revient pas par le conducteur neutre — il s\'écoule par un autre chemin (masse, corps humain, défaut d\'isolement).'},
           {q:'Un DDR 300 mA en tête de tableau avec des DDR 30 mA sur les circuits terminaux : c\'est la notion de :',sub:'Architecture de protection.',choices:['Redondance','Sélectivité ampèremétrique','Sélectivité différentielle','Compensation de puissance réactive'],answer:2,expl:'Sélectivité différentielle : le DDR de tête (300 mA) ne déclenche pas si un circuit terminal fuit 50 mA (< 300 mA), laissant le DDR 30 mA aval déclencher seul. L\'installation reste partiellement alimentée — c\'est la continuité de service.'},
           {q:'Quel DDR choisir pour protéger une prise rasoir en salle de bain ?',sub:'Choix de la sensibilité selon le risque.',choices:['30 mA','100 mA','300 mA','10 mA'],answer:3,expl:'10 mA en salle de bain pour les prises rasoir, car le risque est maximal (humidité, contact possible avec eau). La NF C 15-100 et les normes de sécurité imposent cette sensibilité élevée dans les zones à risque augmenté d\'électrocution.'},
           {q:'À quelle fréquence doit-on tester un DDR en résidentiel ?',sub:'Maintenance préventive des DDR.',choices:['Tous les jours','Toutes les semaines','Tous les mois','Tous les ans seulement'],answer:2,expl:'Le test mensuel par appui sur le bouton T est recommandé par les fabricants et les normes. Un DDR qui ne déclenche pas au test doit être remplacé immédiatement : il ne protège plus.'},
           {q:'Un DDR de type AC fonctionne uniquement avec :',sub:'Types de courants détectés.',choices:['Courant continu (DC) pur','Courant alternatif sinusoïdal','Tous types de courants','Courant pulsé uniquement'],answer:1,expl:'Un DDR type AC détecte les courants de fuite sinusoïdaux (50 Hz). Pour les variateurs de vitesse, chargeurs et appareils à électronique, il faut un DDR type A (AC + DC pulsé) ou type B (tous courants). C\'est précisé sur l\'étiquette du DDR.'},
         ]},
        {id:'ch4',title:'Vérification des installations',ico:'#ico-check',
         lesson:{disc:'Électricité',mod:'Module 4 — Protection & sécurité',sections:[
           {type:'text',title:'Vérification initiale et périodique',body:`Toute installation électrique doit faire l'objet d'une <strong>vérification initiale</strong> avant sa mise en service, pour s'assurer qu'elle est conforme aux normes. Des <strong>vérifications périodiques</strong> sont ensuite obligatoires dans les établissements recevant du public (ERP) et l'industrie. En résidentiel, un diagnostic électrique est obligatoire lors de la vente d'un bien de plus de 15 ans.`},
           {type:'table',title:'Mesures réalisées lors d\'une vérification',rows:[
             ['Mesure','Instrument','Valeur attendue'],
             ['Résistance d\'isolement','Mégohmmètre (500V DC)','> 1 MΩ entre conducteurs'],
             ['Résistance de continuité PE','Ohmmètre / contrôleur de boucle','< 1 Ω (câblage correct)'],
             ['Résistance de terre','Tellurohmmètre','< 100 Ω (TT résidentiel)'],
             ['Impédance de boucle de défaut','Contrôleur de boucle','Selon calibre du disjoncteur'],
             ['DDR : temps et courant','Testeur DDR','IΔ ≤ IΔn · t ≤ 300 ms'],
           ]},
           {type:'list',items:['<strong>Mégohmmètre :</strong> mesure l\'isolement entre conducteurs (500 V DC pour BT). Un isolement < 1 MΩ signale un câble dégradé','<strong>Continuité PE :</strong> vérifie que toutes les masses sont bien reliées à la terre','<strong>Boucle de défaut :</strong> vérifie que le courant de court-circuit sera suffisant pour faire déclencher le disjoncteur','<strong>Rapport de vérification :</strong> établi par un organisme agréé (CONSUEL en France)']},
           {type:'norme',text:'<strong>NF C 15-100 §6</strong> + <strong>Arrêté du 26 mars 2004</strong> : Les vérifications périodiques des ERP et des installations de travail sont obligatoires (fréquence selon la catégorie). Le CONSUEL (Comité National pour la Sécurité des Usagers de l\'Électricité) délivre l\'attestation de conformité.'},
           {type:'tip',text:'<strong>Diagnostic immobilier électrique (DIE) :</strong> Obligatoire depuis 2009 lors de la vente d\'un logement dont l\'installation a plus de 15 ans. Il est réalisé par un diagnostiqueur certifié. Sa durée de validité est de 3 ans. Il informe l\'acheteur sur l\'état de l\'installation sans imposer de travaux.'},
         ]},
         quiz:[
           {q:'Quel instrument mesure la résistance d\'isolement d\'une installation ?',sub:'Instrument de mesure de l\'isolement électrique.',choices:['Multimètre classique','Mégohmmètre (500 V DC)','Oscilloscope','Wattmètre'],answer:1,expl:'Le mégohmmètre (ou megger) applique une tension DC élevée (500 V pour BT, 1000 V pour HT) et mesure la résistance d\'isolement. Un multimètre ordinaire n\'a pas la résolution ni la tension nécessaires pour ce type de mesure.'},
           {q:'Quelle valeur minimale d\'isolement est requise entre conducteurs actifs en BT ?',sub:'NF C 15-100 — isolement minimum.',choices:['> 100 Ω','> 10 kΩ','> 1 MΩ','> 100 MΩ'],answer:2,expl:'> 1 MΩ entre chaque conducteur actif et la terre, et entre conducteurs, est la valeur minimale requise par la NF C 15-100. En dessous, l\'isolement est dégradé et le câble ou l\'appareil doit être remplacé.'},
           {q:'Que certifie le CONSUEL ?',sub:'Rôle de l\'organisme de vérification.',choices:['La qualité des appareils électriques vendus','La conformité d\'une installation électrique neuve ou rénovée','La formation des électriciens','L\'homologation des disjoncteurs'],answer:1,expl:'Le CONSUEL délivre une attestation de conformité pour les installations électriques neuves ou rénovées. Sans cette attestation, ENEDIS ne raccorde pas l\'installation au réseau. C\'est l\'organisme officiel de contrôle en France.'},
           {q:'Le diagnostic électrique immobilier (DIE) est obligatoire lors de :',sub:'Obligation légale de vérification.',choices:['La construction d\'un logement neuf','La location d\'un appartement meublé','La vente d\'un bien de + de 15 ans d\'installation','Tous les 5 ans systématiquement'],answer:2,expl:'Depuis 2009, le DIE est obligatoire lors de la vente d\'un logement dont l\'installation électrique a plus de 15 ans. Sa durée de validité est de 3 ans. Il informe l\'acheteur sur les risques éventuels mais n\'impose pas de travaux.'},
           {q:'La mesure d\'impédance de boucle de défaut sert à vérifier :',sub:'Objectif de la mesure de boucle.',choices:['La résistance des câbles d\'alimentation','Que le courant de court-circuit sera suffisant pour déclencher la protection','Le facteur de puissance de l\'installation','La section des conducteurs neutres'],answer:1,expl:'L\'impédance de boucle Zs détermine le courant de défaut If = U/Zs. Ce courant doit être suffisant pour déclencher le disjoncteur en temps requis. Si Zs est trop élevée (câble long, mauvais raccordement), le disjoncteur peut ne pas déclencher en cas de défaut.'},
         ]},
      ]},
      {id:'m5',title:'Machines électriques',chapters:[
        {id:'ch1',title:'Transformateurs monophasés & triphasés',ico:'#ico-motor',
         lesson:{disc:'Électricité',mod:'Module 5 — Machines électriques',sections:[
           {type:'text',title:'Principe du transformateur',body:`Le <strong>transformateur</strong> est une machine statique qui transforme une tension alternative en une autre tension alternative de même fréquence, par <strong>induction électromagnétique</strong>. Il est constitué d'un circuit magnétique (noyau en fer feuilleté) et de deux bobinages : le <strong>primaire</strong> (entrée) et le <strong>secondaire</strong> (sortie).`},
           {type:'formula',formula:'U1/U2 = N1/N2 = m',legend:'Rapport de transformation m · N = nombre de spires'},
           {type:'formula',formula:'U1 × I1 = U2 × I2 (transformateur idéal)',legend:'Conservation de la puissance apparente'},
           {type:'table',title:'Types de transformateurs',rows:[
             ['Type','Usage','Particularité'],
             ['Monophasé','Résidentiel, électronique','Simple, 1 primaire + 1 secondaire'],
             ['Triphasé','Industrie, réseau de distribution','3 bobinages, couplage étoile ou triangle'],
             ['Autotransformateur','Démarrage moteur, variac','Primaire et secondaire en commun'],
             ['Transformateur de mesure (TI/TT)','Instrumentation HT','Réduit pour mesure sûre'],
           ]},
           {type:'norme',text:'<strong>NF EN 60076</strong> : Norme internationale des transformateurs de puissance. Elle définit les essais, les classes d\'échauffement et les pertes (pertes à vide = pertes fer ; pertes en charge = pertes cuivre Joule).'},
           {type:'tip',text:'<strong>Élévateur ou abaisseur ?</strong> Si N1 > N2 : transformateur abaisseur (U2 < U1). Si N1 < N2 : élévateur. Le réseau de transport fonctionne à très haute tension (400 kV) pour réduire les pertes par effet Joule (P = R×I²) : moins de courant = moins de pertes.'},
         ]},
         quiz:[
           {q:'Un transformateur a N1 = 1 000 spires et N2 = 100 spires. Si U1 = 230 V, quelle est U2 ?',sub:'Rapport de transformation.',choices:['23 V','230 V','2 300 V','23 000 V'],answer:0,expl:'U2 = U1 × (N2/N1) = 230 × (100/1000) = 23 V. C\'est un transformateur abaisseur (m = 0,1). Exemple : alimentation de sonnettes, luminaires 12 V (N2/N1 ≈ 0,05).'},
           {q:'Un transformateur idéal 230 V / 24 V alimente une charge de 48 W. Quel est le courant primaire I1 ?',sub:'Conservation de la puissance : U1×I1 = U2×I2',choices:['0,21 A','2 A','4,8 A','48 A'],answer:0,expl:'P = 48 W. I2 = P/U2 = 48/24 = 2 A. Par conservation : I1 = P/U1 = 48/230 ≈ 0,21 A. Les courants sont inversement proportionnels aux tensions (et aux nombres de spires).'},
           {q:'Dans un transformateur, les pertes à vide correspondent aux :',sub:'Classification des pertes dans un transformateur.',choices:['Pertes dans les conducteurs (effet Joule)','Pertes dans le circuit magnétique (fer)','Pertes par rayonnement','Pertes mécaniques par frottement'],answer:1,expl:'Pertes à vide (fer) = pertes dans le noyau magnétique par hystérésis et courants de Foucault. Elles existent même sans charge. Pertes en charge (cuivre) = R×I² dans les bobinages. Ces pertes augmentent avec la charge.'},
           {q:'Quel est l\'avantage de transporter l\'électricité à très haute tension (400 kV) ?',sub:'Physique du transport de l\'électricité.',choices:['Réduire les pertes par effet Joule dans les câbles','Augmenter la puissance transmissible uniquement','Éviter les transformateurs','Diminuer la section des câbles haute tension'],answer:0,expl:'P_pertes = R × I². À puissance transmise P = U×I constante, augmenter U réduit I. Des courants faibles produisent moins de pertes Joule dans les câbles. C\'est pourquoi le réseau de transport utilise des tensions très élevées (225 kV, 400 kV).'},
           {q:'Quel est le couplage standard d\'un transformateur triphasé de distribution HTA/BT ?',sub:'Couplage normalisé des transformateurs de distribution.',choices:['Triangle/Triangle (Dd)','Étoile/Étoile (Yy)','Triangle/Étoile (Dy ou Yd)','Étoile/Triangle (Yn)'],answer:2,expl:'Les transformateurs de distribution HTA/BT ont généralement un couplage Triangle/Étoile (Dyn11). Le secondaire étoile avec neutre sorti permet d\'obtenir les tensions 230 V (phase/neutre) et 400 V (phase/phase) du réseau BT.'},
         ]},
        {id:'ch2',title:'Moteurs asynchrones triphasés',ico:'#ico-motor',
         lesson:{disc:'Électricité',mod:'Module 5 — Machines électriques',sections:[
           {type:'text',title:'Principe du moteur asynchrone',body:`Le <strong>moteur asynchrone triphasé (MAS)</strong> est la machine électrique la plus utilisée dans l'industrie. Son principe repose sur la création d'un <strong>champ magnétique tournant</strong> par les trois enroulements statoriques alimentés en triphasé. Ce champ induit des courants dans le rotor (en court-circuit), créant un couple moteur.`},
           {type:'formula',formula:'ns = f × 60 / p',legend:'Vitesse de synchronisme ns (tr/min) · f = fréquence · p = nombre de paires de pôles'},
           {type:'formula',formula:'g = (ns − n) / ns',legend:'Glissement g · n = vitesse réelle du rotor · g ≈ 2 à 8 % en charge nominale'},
           {type:'table',title:'Données nominales d\'un MAS',rows:[
             ['Paramètre','Symbole','Exemple'],
             ['Puissance utile','Pn','7,5 kW'],
             ['Tension','Un','400 V (étoile) / 230 V (triangle)'],
             ['Courant nominal','In','16,2 A (étoile)'],
             ['Vitesse nominale','nn','1 440 tr/min (4 pôles, g ≈ 4%)'],
             ['Rendement','η','88 %'],
             ['Facteur de puissance','cosφn','0,82'],
           ]},
           {type:'norme',text:'<strong>NF EN 60034</strong> (IEC 60034) : Machines tournantes — définit les classes de rendement IE1 (standard), IE2 (haut rendement), IE3 (premium), IE4 (super premium). Depuis 2021, les moteurs ≥ 0,75 kW doivent être IE3 minimum (directive ErP).'},
           {type:'tip',text:'<strong>Couplage étoile/triangle :</strong> Un moteur 230/400 V peut fonctionner en triangle (Δ) sur réseau 230 V (prises monophasées non recommandées) ou en étoile (Y) sur réseau 400 V (standard industriel). Le démarrage étoile-triangle réduit le courant de démarrage d\'un facteur 3.'},
         ]},
         quiz:[
           {q:'Un MAS 4 pôles (2 paires de pôles) alimenté à 50 Hz. Sa vitesse de synchronisme est :',sub:'ns = f × 60 / p',choices:['750 tr/min','1 000 tr/min','1 500 tr/min','3 000 tr/min'],answer:2,expl:'ns = f × 60 / p = 50 × 60 / 2 = 1 500 tr/min. La vitesse réelle avec glissement de 4% : n = ns × (1 − g) = 1 500 × 0,96 = 1 440 tr/min. C\'est la vitesse nominale la plus courante en industrie européenne.'},
           {q:'Le glissement d\'un MAS est de 5% à charge nominale. Si ns = 1 500 tr/min, quelle est la vitesse réelle ?',sub:'n = ns × (1 − g)',choices:['1 350 tr/min','1 425 tr/min','1 500 tr/min','1 575 tr/min'],answer:1,expl:'n = ns × (1 − g) = 1 500 × (1 − 0,05) = 1 500 × 0,95 = 1 425 tr/min. Le moteur asynchrone tourne toujours légèrement en dessous de la vitesse de synchronisme — d\'où son nom "asynchrone".'},
           {q:'Quel est l\'avantage du démarrage étoile-triangle pour un MAS ?',sub:'Technique de démarrage industrielle.',choices:['Il augmente la vitesse de démarrage','Il divise par 3 le courant de démarrage et le couple de démarrage','Il double le couple moteur','Il est utilisé pour les moteurs monophasés uniquement'],answer:1,expl:'Démarrage en étoile : chaque bobinage reçoit U/√3 (tension réduite). Le courant et le couple sont divisés par 3. Après accélération, on bascule en triangle (pleine tension). C\'est le démarrage industriel le plus courant pour les moteurs > 5,5 kW.'},
           {q:'La classe de rendement IE3 d\'un moteur signifie :',sub:'Directive ErP / NF EN 60034.',choices:['Rendement standard (ancienne norme)','Rendement Premium — obligatoire depuis 2021 pour ≥ 0,75 kW','Rendement Inférieur à 70%','Isolement renforcé'],answer:1,expl:'IE3 = Premium efficiency. La directive ErP impose IE3 pour les moteurs de 0,75 kW à 1 000 kW depuis juillet 2021. IE4 (super premium) sera progressivement imposé. Ces classes visent à réduire la consommation industrielle d\'énergie.'},
           {q:'Un MAS fonctionne à vide (sans charge). Son glissement est alors :',sub:'Comportement à vide du moteur asynchrone.',choices:['0% (il tourne exactement à ns)','Très faible (0,1 à 0,5%)','5% comme en charge','100% (moteur arrêté)'],answer:1,expl:'À vide, le moteur tourne presque à la vitesse de synchronisme (g ≈ 0,1 à 0,5%). Il suffit d\'un très faible glissement pour induire le courant nécessaire à vaincre les seules pertes mécaniques et magnétiques. Le glissement augmente avec la charge.'},
         ]},
        {id:'ch3',title:'Variateurs de vitesse',ico:'#ico-motor'},
        {id:'ch4',title:'Génératrices & alternateurs',ico:'#ico-bolt'},
      ]},
    ]
  },
  electro:{
    name:'Électronique',icon:'#ico-circuit',color:'blue',
    modules:[
      {id:'m1',title:'Composants passifs',chapters:[
        {id:'ch1',title:'Résistances : valeurs, codes couleurs',ico:'#ico-resistor',
         lesson:{disc:'Électronique',mod:'Module 1 — Composants passifs',sections:[
           {type:'text',title:'La résistance électrique',body:`La <strong>résistance</strong> est le composant électronique le plus courant. Elle s'oppose au passage du courant (loi d'Ohm : U = R×I) et dissipe de l'énergie sous forme de chaleur. Les résistances se caractérisent par leur <strong>valeur</strong> en Ohms, leur <strong>puissance maximale</strong> en Watts, leur <strong>tolérance</strong> et leur <strong>coefficient de température</strong>.`},
           {type:'table',title:'Code couleur des résistances (4 anneaux)',rows:[
             ['Couleur','Chiffre','Multiplicateur','Tolérance'],
             ['Noir','0','×1','—'],
             ['Marron','1','×10','±1%'],
             ['Rouge','2','×100','±2%'],
             ['Orange','3','×1 k','—'],
             ['Jaune','4','×10 k','—'],
             ['Vert','5','×100 k','±0,5%'],
             ['Bleu','6','×1 M','±0,25%'],
             ['Violet','7','×10 M','±0,1%'],
             ['Gris','8','—','±0,05%'],
             ['Blanc','9','—','—'],
             ['Or','—','×0,1','±5%'],
             ['Argent','—','×0,01','±10%'],
           ]},
           {type:'list',items:['<strong>Lecture 4 anneaux :</strong> anneau 1 et 2 = chiffres · anneau 3 = multiplicateur · anneau 4 = tolérance','<strong>Exemple :</strong> Jaune-Violet-Rouge-Or = 4,7 × 100 ± 5% = 4 700 Ω ± 5% (4,7 kΩ)','<strong>Séries normalisées :</strong> E12 (tolérance 10%), E24 (5%), E96 (1%) — pas toutes les valeurs existent','<strong>Puissance dissipée :</strong> P = R × I² → choisir puissance nominale > P_max']},
           {type:'norme',text:'<strong>IEC 60062</strong> : Code couleur des résistances et condensateurs. La <strong>série E</strong> (E12, E24, E48, E96) définit les valeurs normalisées disponibles dans le commerce, calculées pour que la tolérance de chaque valeur se recouvre avec la suivante.'},
           {type:'tip',text:'<strong>Mémo couleurs :</strong> "Ne Mange Rien Ou Jaune Va Bien Voilà Gris Blanc" → Noir Marron Rouge Orange Jaune Vert Bleu Violet Gris Blanc (0 à 9). Le dernier anneau (or/argent) vers la droite indique la tolérance.'},
         ]},
         quiz:[
           {q:'Une résistance a les anneaux : Jaune – Violet – Orange – Or. Sa valeur est :',sub:'Lecture du code couleur 4 anneaux.',choices:['470 Ω ± 5%','4,7 kΩ ± 5%','47 kΩ ± 5%','470 kΩ ± 5%'],answer:2,expl:'Jaune = 4, Violet = 7, Orange = ×1000. Valeur = 47 × 1000 = 47 000 Ω = 47 kΩ. Or = ±5%. Si on lit 4-7 × 10³ = 47 kΩ ±5%.'},
           {q:'Une résistance de 100 Ω dissipe un courant de 50 mA. Quelle puissance doit-elle supporter ?',sub:'P = R × I²',choices:['0,25 W','0,5 W','1 W','5 W'],answer:0,expl:'P = R × I² = 100 × (0,05)² = 100 × 0,0025 = 0,25 W. On choisira au minimum une résistance 1/4 W (0,25 W), avec une marge de sécurité une résistance 1/2 W ou 1 W est préférable.'},
           {q:'Que signifie la série E24 ?',sub:'Séries normalisées de résistances.',choices:['24 couleurs possibles','24 valeurs disponibles par décade (tolérance 5%)','24 Ohms de valeur','Résistances de 24 W'],answer:1,expl:'La série E24 comprend 24 valeurs par décade (par rapport de 10), calculées pour que les tolérances ±5% se recouvrent. Par ex. dans la décade 1-10 : 1,0 · 1,1 · 1,2 · 1,3 · ... · 8,2 · 9,1 kΩ. La série E96 donne 96 valeurs (tolérance 1%).'},
           {q:'Une résistance marron-noir-rouge-or a pour valeur :',sub:'Décodage du code couleur.',choices:['102 Ω','1 000 Ω','1 200 Ω','10 200 Ω'],answer:1,expl:'Marron = 1, Noir = 0, Rouge = ×100, Or = ±5%. Valeur = 10 × 100 = 1 000 Ω = 1 kΩ ±5%. C\'est l\'une des résistances les plus courantes en électronique.'},
           {q:'Comment limiter la puissance dissipée dans une résistance ?',sub:'Dimensionnement thermique.',choices:['Augmenter la résistance','Réduire le courant qui la traverse','Augmenter la tension','Utiliser une résistance de plus faible valeur'],answer:1,expl:'P = R × I² : la puissance varie avec le carré du courant. Réduire I de moitié divise la puissance par 4. On peut aussi augmenter R (P = U²/R diminue si U reste constant) ou choisir une résistance de plus grande puissance nominale.'},
         ]},
        {id:'ch2',title:'Condensateurs : charge, décharge, filtrage',ico:'#ico-circuit2',
         lesson:{disc:'Électronique',mod:'Module 1 — Composants passifs',sections:[
           {type:'text',title:'Le condensateur',body:`Le <strong>condensateur</strong> est un composant qui <strong>stocke de l'énergie sous forme de champ électrique</strong> entre deux armatures conductrices séparées par un diélectrique. Sa caractéristique principale est la <strong>capacité C</strong>, exprimée en Farads (F). En pratique, on utilise des µF (microfarads) ou des nF (nanofarads). Un condensateur laisse passer le courant alternatif mais bloque le courant continu.`},
           {type:'formula',formula:'τ = R × C',legend:'Constante de temps τ (s) · R en Ohms · C en Farads'},
           {type:'formula',formula:'uc(t) = E × (1 − e^(−t/τ))',legend:'Charge : tension aux bornes du condensateur'},
           {type:'list',items:['Après 5τ : condensateur considéré comme chargé à 100% (réellement 99,3%)','À t = τ : uc = 63,2% de E','<strong>Filtrage :</strong> condensateur en parallèle sur une alimentation → lisse les ondulations','<strong>Découplage :</strong> condensateur de 100 nF sur alimentation des circuits intégrés','<strong>Condensateur polarisé (électrolytique) :</strong> à brancher dans le bon sens (borne +)']},
           {type:'table',title:'Types de condensateurs',rows:[
             ['Type','Capacité','Usage','Particularité'],
             ['Céramique (CMS)','1 pF – 100 nF','Découplage, HF','Non polarisé, petit'],
             ['Électrolytique','1 µF – 100 000 µF','Filtrage alimentation','Polarisé, grande capacité'],
             ['Film polyester','1 nF – 10 µF','Filtrage, couplage','Non polarisé, stable'],
             ['Tantale','0,1 µF – 1 000 µF','CMS, petite taille','Polarisé, attention à la polarité'],
           ]},
           {type:'norme',text:'<strong>IEC 60384</strong> : Condensateurs fixes pour usage dans les équipements électroniques. Les condensateurs électrolytiques ont une tension de service maximale à ne jamais dépasser (en tenant compte de la valeur crête pour les AC).'},
           {type:'tip',text:'<strong>Filtrage d\'alimentation :</strong> On associe généralement un grand condensateur électrolytique (1000 µF à quelques mF) pour filtrer les basses fréquences, et un petit céramique (100 nF) en parallèle pour filtrer les hautes fréquences (harmoniques). La combinaison couvre un large spectre.'},
         ]},
         quiz:[
           {q:'Un circuit RC a R = 10 kΩ et C = 100 µF. Sa constante de temps τ est :',sub:'τ = R × C',choices:['1 ms','100 ms','1 s','10 s'],answer:2,expl:'τ = R × C = 10 000 × 100×10⁻⁶ = 10 000 × 0,0001 = 1 s. Après 5τ = 5 s, le condensateur est pratiquement chargé à 100%.'},
           {q:'Après combien de constantes de temps τ considère-t-on un condensateur comme "chargé" ?',sub:'Règle pratique du circuit RC.',choices:['1τ (63%)','2τ (86%)','3τ (95%)','5τ (99,3%)'],answer:3,expl:'Après 5τ, uc = E × (1 − e⁻⁵) = 99,3% de E. Par convention, le condensateur est considéré chargé à 100%. Après 1τ, il est chargé à seulement 63,2%.'},
           {q:'Quelle est la valeur de la réactance capacitive d\'un condensateur de 10 µF à 100 Hz ?',sub:'XC = 1/(2πfC)',choices:['1,6 Ω','16 Ω','159 Ω','1 592 Ω'],answer:2,expl:'XC = 1/(2πfC) = 1/(2π × 100 × 10×10⁻⁶) = 1/(0,00628) ≈ 159 Ω. Plus la fréquence est élevée, plus XC est faible : le condensateur laisse mieux passer les hautes fréquences.'},
           {q:'Un condensateur électrolytique mal branché (polarité inversée) :',sub:'Risque d\'un branchement incorrect.',choices:['Fonctionne en sens inverse avec moins de capacité','Peut être détruit, exploser ou s\'échauffer dangereusement','Ne fait rien de particulier','Voit sa capacité doublée'],answer:1,expl:'Un condensateur électrolytique inversé voit son diélectrique se dégrader rapidement. Il peut gonfler, fuir ou exploser dans les secondes qui suivent. Toujours respecter la polarité (+ et − marqués sur le boîtier ou par la patte la plus longue).'},
           {q:'Pourquoi place-t-on un condensateur de 100 nF à proximité de chaque circuit intégré ?',sub:'Rôle du condensateur de découplage.',choices:['Pour augmenter la tension d\'alimentation','Pour filtrer les parasites haute fréquence sur la ligne d\'alimentation du CI','Pour mémoriser les données du CI','Pour réduire la consommation du CI'],answer:1,expl:'Les CI commutent rapidement et génèrent des appels de courant brefs mais intenses qui créent des parasites HF sur la ligne VCC. Un condensateur de découplage 100 nF (câblé le plus près possible du CI) fournit localement la charge nécessaire et filtre ces parasites.'},
         ]},
        {id:'ch3',title:'Inductances & transformateurs HF',ico:'#ico-wave'},
        {id:'ch4',title:'Circuits RC, RL, RLC',ico:'#ico-circuit2'},
      ]},
      {id:'m2',title:'Semi-conducteurs & diodes',chapters:[
        {id:'ch1',title:'Jonction PN & diodes de redressement',ico:'#ico-diode',
         lesson:{disc:'Électronique',mod:'Module 2 — Semi-conducteurs & diodes',sections:[
           {type:'text',title:'La jonction PN',body:`Les <strong>semi-conducteurs</strong> (silicium, germanium) ont une conductivité intermédiaire entre conducteurs et isolants. En dopant le silicium avec des impuretés, on crée des zones de type <strong>N</strong> (excès d'électrons) et de type <strong>P</strong> (excès de trous). La jonction entre ces deux zones est la base de tous les composants à semi-conducteurs.`},
           {type:'list',items:['<strong>Zone de déplétion :</strong> zone sans porteurs libres à la jonction PN — crée une barrière de potentiel','<strong>Polarisation directe :</strong> anode (+) → cathode (−) · barrière réduite → courant passe','<strong>Polarisation inverse :</strong> anode (−) → cathode (+) · barrière renforcée → courant bloqué (sauf courant inverse nul Is)','<strong>Tension de seuil :</strong> ≈ 0,6–0,7 V pour le silicium · ≈ 0,2 V pour le germanium']},
           {type:'formula',formula:'I = Is × (e^(U/Ut) − 1)',legend:'Équation de la diode idéale · Ut ≈ 26 mV à 25°C (tension thermique)'},
           {type:'table',title:'Caractéristiques d\'une diode 1N4007',rows:[
             ['Paramètre','Valeur'],
             ['Tension inverse maximale (VRRM)','1 000 V'],
             ['Courant moyen (IF)','1 A'],
             ['Tension de seuil directe (VF)','0,7 V @ 1A'],
             ['Courant inverse de fuite (IR)','5 µA @ 25°C'],
             ['Courant de pointe (IFSM)','30 A (1 cycle)'],
           ]},
           {type:'norme',text:'<strong>JEDEC JESD77</strong> : Nomenclature des semi-conducteurs. Les diodes de redressement 1Nxxxx sont les plus courantes : 1N4001 (50 V) à 1N4007 (1 000 V), courant 1 A. Les diodes Schottky (1N5817-1N5819) ont une chute de tension de seulement 0,3 V.'},
           {type:'tip',text:'<strong>Identification de la cathode :</strong> Sur une diode, l\'anneau (bague) sur le boîtier marque la cathode (−). Sur un schéma, la pointe du triangle pointe vers la cathode. En polarisation directe, le courant va de l\'anode (A) vers la cathode (K).'},
         ]},
         quiz:[
           {q:'La tension de seuil typique d\'une diode au silicium en polarisation directe est :',sub:'Caractéristique tension-courant de la diode Si.',choices:['0,2 V','0,7 V','1,2 V','5 V'],answer:1,expl:'0,6 à 0,7 V est la tension de seuil d\'une diode silicium (1N4007, 1N914...). Pour le germanium : ≈ 0,2 V. Pour une diode Schottky : ≈ 0,3 V. En polarisation directe, la tension reste approximativement constante.'},
           {q:'En polarisation inverse, une diode idéale :',sub:'Comportement en polarisation inverse.',choices:['Conduit normalement','Bloque le courant (I ≈ 0)','Se comporte comme une résistance variable','Émet de la lumière'],answer:1,expl:'En inverse, la barrière de potentiel est renforcée et pratiquement aucun courant ne passe (seul un très faible courant de saturation Is ≈ quelques µA, négligeable). C\'est le principe du redressement.'},
           {q:'Comment identifier la cathode d\'une diode dans un circuit ?',sub:'Repérage des bornes d\'une diode.',choices:['C\'est toujours la patte la plus longue','C\'est la patte avec l\'anneau (bague) sur le corps de la diode','C\'est la borne marquée A','Peu importe, les deux bornes sont équivalentes'],answer:1,expl:'L\'anneau (bague) sur le corps cylindrique de la diode marque la cathode (K ou −). Sur un schéma, la cathode est côté barre du symbole diode (côté pointe du triangle). La patte la plus longue marque l\'anode sur les LED, pas nécessairement sur les diodes standard.'},
           {q:'Une diode 1N4007 supporte une tension inverse maximale de :',sub:'Paramètre VRRM de la diode.',choices:['50 V','200 V','400 V','1 000 V'],answer:3,expl:'La 1N4007 supporte 1 000 V en inverse (VRRM = 1 kV), courant moyen 1 A. C\'est la plus résistante de la série 1N400x : 1N4001 = 50 V, 1N4002 = 100 V ... 1N4007 = 1 000 V. Toutes ont le même courant 1 A.'},
           {q:'Quel est l\'avantage de la diode Schottky par rapport à la diode PN classique ?',sub:'Comparaison diode Schottky vs PN.',choices:['Elle supporte des tensions inverses plus élevées','Sa tension de seuil est plus faible (≈ 0,3 V) et elle est plus rapide','Elle résiste mieux aux températures élevées','Elle peut conduire en sens inverse'],answer:1,expl:'La diode Schottky (jonction métal-semiconducteur, pas PN) a une chute de tension de ≈ 0,3 V (vs 0,7 V pour Si), et un temps de rétablissement inverse quasi nul. Avantage : meilleures performances pour les alimentations à découpage (SMPS) et circuits HF.'},
         ]},
        {id:'ch2',title:'Montages redresseurs',ico:'#ico-circuit2',
         lesson:{disc:'Électronique',mod:'Module 2 — Semi-conducteurs & diodes',sections:[
           {type:'text',title:'Redressement mono et double alternance',body:`Le <strong>redressement</strong> est la conversion d'un signal alternatif (AC) en signal continu (DC). Un montage redresseur utilise une ou plusieurs diodes pour ne laisser passer que les alternances positives (ou les deux). Le signal redressé est ensuite filtré par un condensateur pour obtenir une tension continue lissée.`},
           {type:'table',title:'Comparaison des montages redresseurs',rows:[
             ['Montage','Diodes','Fréquence ondulation','Tension moy. sortie','Usage'],
             ['Demi-onde','1','f réseau (50 Hz)','0,318 × Û','Faible puissance'],
             ['Double alternance pont (Graetz)','4','2f (100 Hz)','0,636 × Û','Standard'],
             ['Double alternance centre','2','2f (100 Hz)','0,636 × Û','Prise de milieu transfo.'],
           ]},
           {type:'formula',formula:'U_moy = 0,636 × Û = 0,9 × U_eff',legend:'Tension moyenne redressée double alternance (sans filtrage)'},
           {type:'list',items:['<strong>Pont de Graetz :</strong> 4 diodes en pont — le montage le plus courant dans les alimentations','<strong>Condensateur de filtrage :</strong> C = I_charge / (2f × ΔU) — réduit l\'ondulation résiduelle','<strong>Ondulation résiduelle (ripple) :</strong> tension alternative superposée à la DC — exprimée en % ou en Vpp','<strong>Facteur de ripple :</strong> rapport de l\'ondulation sur la tension DC — doit être < 5-10% typiquement']},
           {type:'norme',text:'<strong>IEC 61558</strong> : Transformateurs de sécurité et d\'isolation. Les alimentations avec pont de Graetz doivent respecter les normes de CEM (compatibilité électromagnétique) car elles génèrent des harmoniques. L\'IEC 61000-3-2 limite les courants harmoniques injectés sur le réseau.'},
           {type:'tip',text:'<strong>Calcul du condensateur de filtrage :</strong> Pour une ondulation ΔU = 1 V avec un courant de charge I = 500 mA sur secteur 50 Hz (double alternance = 100 Hz) : C = 0,5 / (100 × 1) = 5 000 µF. Dans la pratique, on arrondit à 4 700 µF ou 6 800 µF (valeurs E12).'},
         ]},
         quiz:[
           {q:'Combien de diodes utilise un pont de Graetz (redresseur double alternance) ?',sub:'Architecture du pont de Graetz.',choices:['1','2','3','4'],answer:3,expl:'Le pont de Graetz utilise 4 diodes en configuration pont. À chaque alternance, 2 diodes conduisent : D1 et D3 pour l\'alternance positive, D2 et D4 pour la négative. Le courant dans la charge garde toujours le même sens.'},
           {q:'La fréquence d\'ondulation d\'un redresseur double alternance sur réseau 50 Hz est :',sub:'Fréquence du signal redressé.',choices:['25 Hz','50 Hz','100 Hz','200 Hz'],answer:2,expl:'En double alternance, les deux demi-cycles positifs et négatifs sont redressés. On obtient 2 impulsions par période de 50 Hz, soit 100 impulsions par seconde = 100 Hz. Le condensateur de filtrage doit être dimensionné pour cette fréquence.'},
           {q:'La tension moyenne en sortie d\'un redresseur double alternance (Û = 325 V) est :',sub:'U_moy = 0,636 × Û',choices:['163 V','207 V','230 V','325 V'],answer:1,expl:'U_moy = 0,636 × 325 ≈ 207 V. Après filtrage par condensateur, la tension DC sera proche de Û = 325 V (légèrement en dessous selon la charge). C\'est pourquoi les alimentations non régulées sont dimensionnées en valeur crête.'},
           {q:'Comment réduire l\'ondulation résiduelle (ripple) d\'une alimentation redressée ?',sub:'Amélioration du filtrage.',choices:['Augmenter la fréquence du réseau','Augmenter la valeur du condensateur de filtrage','Diminuer le courant de charge','Supprimer une diode du pont'],answer:1,expl:'ΔU = I / (f × C). Augmenter C réduit ΔU proportionnellement. On peut aussi augmenter f (alimentations à découpage) ou réduire I (moins de charge). Un régulateur de tension (7805...) élimine complètement le ripple résiduel.'},
           {q:'Une alimentation redressée non régulée alimente un circuit sensible. Quel composant ajouter ?',sub:'Stabilisation de la tension DC.',choices:['Un transformateur supplémentaire','Un régulateur de tension linéaire (ex: 7805)','Un pont de diodes en plus','Un fusible sur la sortie'],answer:1,expl:'Un régulateur de tension linéaire (78xx pour tension positive, 79xx pour négative) stabilise la tension de sortie quelle que soit la charge ou les variations réseau. Exemple : 7805 → 5 V fixe, 7812 → 12 V. Il élimine l\'ondulation et les variations de tension.'},
         ]},
        {id:'ch3',title:'Diodes Zener, LED, photodiodes',ico:'#ico-lightbulb'},
        {id:'ch4',title:'Thyristors & triacs',ico:'#ico-bolt'},
      ]},
      {id:'m3',title:'Transistors & amplification',chapters:[
        {id:'ch1',title:'Transistor bipolaire BJT',ico:'#ico-transistor'},
        {id:'ch2',title:'Transistor MOS-FET',ico:'#ico-transistor'},
        {id:'ch3',title:'Amplificateurs opérationnels (AOP)',ico:'#ico-circuit2'},
        {id:'ch4',title:'Montages AOP : comparateur, intégrateur',ico:'#ico-circuit2'},
      ]},
      {id:'m4',title:'Circuits intégrés',chapters:[
        {id:'ch1',title:'Portes logiques & familles CMOS/TTL',ico:'#ico-logic'},
        {id:'ch2',title:'Bascules, registres, compteurs',ico:'#ico-logic'},
        {id:'ch3',title:'CAN / CNA : conversion A/N',ico:'#ico-circuit2'},
        {id:'ch4',title:'Bus SPI, I²C, UART',ico:'#ico-network'},
      ]},
    ]
  },
  auto:{
    name:'Automatisme',icon:'#ico-robot',color:'purple',
    modules:[
      {id:'m1',title:'Logique combinatoire',chapters:[
        {id:'ch1',title:'Variables logiques & tables de vérité',ico:'#ico-logic',
         lesson:{disc:'Automatisme',mod:'Module 1 — Logique combinatoire',sections:[
           {type:'text',title:'La logique binaire',body:`En <strong>logique combinatoire</strong>, les signaux ne prennent que deux états : <strong>0</strong> (faux, Low, 0 V) et <strong>1</strong> (vrai, High, +5 V ou +3,3 V). Un système combinatoire est entièrement défini par sa <strong>table de vérité</strong> : pour chaque combinaison d'entrées, la ou les sorties sont déterminées. Il n'y a pas de mémoire d'état.`},
           {type:'table',title:'Les portes logiques de base',rows:[
             ['Porte','Symbole','Équation','Description'],
             ['ET (AND)','A ⋅ B ou AB','S = A AND B','S = 1 si A ET B = 1'],
             ['OU (OR)','A + B','S = A OR B','S = 1 si A OU B = 1'],
             ['NON (NOT)','Ā ou /A','S = NOT A','Inversion'],
             ['NON-ET (NAND)','AB̄','S = NOT(A AND B)','Universelle'],
             ['NON-OU (NOR)','A+B̄','S = NOT(A OR B)','Universelle'],
             ['OU-EX (XOR)','A ⊕ B','S = A XOR B','S = 1 si A ≠ B'],
           ]},
           {type:'list',items:['Une table de vérité à n entrées a 2ⁿ lignes (2 entrées → 4 lignes, 3 → 8, etc.)','Les portes NAND et NOR sont dites <strong>universelles</strong> car elles permettent de réaliser toutes les autres fonctions','En technologie CMOS, 0 V = niveau bas (0) et VDD (3,3 V ou 5 V) = niveau haut (1)','Les sorties s\'expriment sous forme de <strong>somme de produits (SDP)</strong> ou <strong>produit de sommes (PDS)</strong>']},
           {type:'norme',text:'<strong>IEC 60617-12</strong> : Symboles graphiques pour les schémas — portes logiques. La norme IEEE 91/ANSI Y32.14 définit une notation rectangulaire alternative (& pour AND, ≥1 pour OR, =1 pour XOR) utilisée en Europe industrielle.'},
           {type:'tip',text:'<strong>Astuce table de vérité :</strong> Pour remplir la colonne des entrées, comptez en binaire : 00, 01, 10, 11 pour 2 entrées. Pour 3 entrées : 000, 001, 010, 011, 100, 101, 110, 111. Cette méthode systématique évite les oublis.'},
         ]},
         quiz:[
           {q:'Une porte AND à 2 entrées : A = 1, B = 0. La sortie S est :',sub:'Table de vérité de la porte AND.',choices:['S = 0','S = 1','S = indéterminée','S = A + B = 1'],answer:0,expl:'AND : S = 1 uniquement si A = 1 ET B = 1. Ici B = 0, donc S = 1 × 0 = 0. Table de vérité AND : 00→0, 01→0, 10→0, 11→1.'},
           {q:'Combien de lignes a la table de vérité d\'une porte à 3 entrées ?',sub:'2^n lignes pour n entrées.',choices:['3','6','8','16'],answer:2,expl:'2³ = 8 lignes pour 3 entrées (A, B, C). En comptant de 000 à 111 en binaire, on obtient bien 8 combinaisons. Pour n entrées : 2ⁿ lignes.'},
           {q:'Une porte NOR à 2 entrées donne S = 1 quand :',sub:'Comportement de la porte NOR.',choices:['A = 1 ET B = 1','A = 1 OU B = 1','A = 0 ET B = 0','A ≠ B'],answer:2,expl:'NOR = NOT(A OR B). S = 1 uniquement si A = 0 ET B = 0 (car 0 OR 0 = 0, et NOT 0 = 1). Dès qu\'une entrée est à 1, S = 0. Table NOR : 00→1, 01→0, 10→0, 11→0.'},
           {q:'Une porte XOR donne S = 1 quand :',sub:'Fonction OU exclusif.',choices:['A = 1 ET B = 1','A = 0 ET B = 0','A et B ont des valeurs différentes (A ≠ B)','A et B ont des valeurs identiques (A = B)'],answer:2,expl:'XOR (OU exclusif) : S = 1 uniquement si A ≠ B. Table : 00→0, 01→1, 10→1, 11→0. Application : détecteur de parité, additionneur binaire (bit de somme).'},
           {q:'Pourquoi les portes NAND sont-elles dites "universelles" ?',sub:'Propriété des portes NAND et NOR.',choices:['Car elles sont les plus rapides','Car on peut réaliser ANY fonction logique uniquement avec des portes NAND','Car elles ont le plus grand nombre d\'entrées','Car elles existent dans toutes les familles logiques'],answer:1,expl:'Avec des NAND uniquement, on peut créer : NOT (1 NAND) · AND (NAND + NOT) · OR (DeMorgan) · etc. C\'est très utile en conception VLSI car on optimise un seul type de cellule. La porte NOR est également universelle.'},
         ]},
        {id:'ch2',title:'Algèbre de Boole & De Morgan',ico:'#ico-logic',
         lesson:{disc:'Automatisme',mod:'Module 1 — Logique combinatoire',sections:[
           {type:'text',title:'L\'algèbre de Boole',body:`L'<strong>algèbre de Boole</strong> (George Boole, 1854) fournit les outils mathématiques pour manipuler les expressions logiques. Elle permet de simplifier une fonction booléenne en réduisant le nombre de portes nécessaires, et donc le coût et la consommation du circuit.`},
           {type:'table',title:'Théorèmes fondamentaux de l\'algèbre de Boole',rows:[
             ['Théorème','Expression','Dual'],
             ['Identité','A + 0 = A','A · 1 = A'],
             ['Nul','A + 1 = 1','A · 0 = 0'],
             ['Idempotence','A + A = A','A · A = A'],
             ['Complément','A + Ā = 1','A · Ā = 0'],
             ['Involution','Ā̄ = A','—'],
             ['Absorption','A + AB = A','A(A + B) = A'],
           ]},
           {type:'text',title:'Théorèmes de De Morgan',body:`Les <strong>théorèmes de De Morgan</strong> permettent de transformer une expression AND en OR (et vice-versa) en inversant toutes les variables. Ils sont essentiels pour convertir une expression en utilisant uniquement des portes NAND ou NOR.`},
           {type:'formula',formula:'A̅B̅ = Ā + B̄   ·   A̅+̅B̅ = Ā · B̄',legend:'De Morgan : complémentaire d\'un AND = OR des complémentaires (et vice-versa)'},
           {type:'list',items:['<strong>Simplification :</strong> S = AB + AB̄ = A(B + B̄) = A × 1 = A','<strong>Forme SDP :</strong> Somme De Produits — OR de termes AND (mintermes)','<strong>Forme PDS :</strong> Produit De Sommes — AND de termes OR (maxtermes)','La forme SDP est la plus utilisée pour l\'implémentation avec des portes NAND']},
           {type:'norme',text:'<strong>IEC 60050-721</strong> : Algèbre de commutation — définit formellement les opérateurs booléens. L\'algèbre de Boole est à la base de tout le design numérique (FPGA, ASIC, microcontrôleurs, CPL).'},
           {type:'tip',text:'<strong>Méthode de simplification :</strong> 1) Écrire la table de vérité · 2) Écrire la somme des mintermes (SDP) · 3) Factoriser avec les théorèmes booléens · 4) Vérifier avec la table de vérité · 5) Dessiner le schéma logique minimal.'},
         ]},
         quiz:[
           {q:'D\'après les théorèmes de De Morgan : NOT(A AND B) est équivalent à :',sub:'Premier théorème de De Morgan.',choices:['NOT(A) AND NOT(B)','NOT(A) OR NOT(B)','A OR B','NOT(A) AND B'],answer:1,expl:'De Morgan 1 : NOT(A · B) = Ā + B̄. Le complément d\'un produit = somme des complémentaires. C\'est ce que réalise une porte NAND : son équivalent est deux NOT + un OR.'},
           {q:'Simplifiez S = A · B + A · B̄ :',sub:'Factorisation avec les théorèmes booléens.',choices:['S = A + B','S = A','S = B','S = A · B'],answer:1,expl:'S = A·B + A·B̄ = A(B + B̄) = A × 1 = A. On utilise la distributivité (factorisation de A) puis le complément (B + B̄ = 1). La sortie ne dépend que de A, indépendamment de B.'},
           {q:'Quel théorème booléen exprime que A + A = A ?',sub:'Théorèmes de l\'algèbre de Boole.',choices:['Idempotence','Absorption','Complément','Involution'],answer:0,expl:'L\'idempotence : A + A = A et A · A = A. En logique booléenne (contrairement à l\'arithmétique), ajouter la même variable à elle-même ne change pas la valeur. Cela permet d\'éliminer des doublons dans une expression.'},
           {q:'L\'expression S = AB + AC peut être factorisée en :',sub:'Distributivité booléenne.',choices:['S = A + BC','S = A(B + C)','S = AB · AC','S = (A+B)(A+C)'],answer:1,expl:'Factorisation : S = AB + AC = A(B + C). C\'est la propriété de distributivité de l\'AND sur l\'OR. Cette simplification réduit le nombre de portes : on passe de 3 AND + 1 OR à 1 OR + 1 AND.'},
           {q:'De Morgan : NOT(A OR B) est équivalent à :',sub:'Second théorème de De Morgan.',choices:['NOT(A) OR NOT(B)','NOT(A) AND NOT(B)','A AND B','NOT(A) OR B'],answer:1,expl:'De Morgan 2 : NOT(A + B) = Ā · B̄. Le complément d\'une somme = produit des complémentaires. C\'est ce que réalise une porte NOR : son équivalent est deux NOT + un AND.'},
         ]},
        {id:'ch3',title:'Tableaux de Karnaugh',ico:'#ico-logic'},
        {id:'ch4',title:'Multiplexeurs, décodeurs, comparateurs',ico:'#ico-logic'},
      ]},
      {id:'m2',title:'Logique séquentielle & Grafcet',chapters:[
        {id:'ch1',title:'Bascules RS, JK, D, T',ico:'#ico-circuit2'},
        {id:'ch2',title:'Grafcet : étapes, transitions, actions',ico:'#ico-draw',
         lesson:{disc:'Automatisme',mod:'Module 2 — Logique séquentielle & Grafcet',sections:[
           {type:'text',title:'Le Grafcet',body:`Le <strong>Grafcet</strong> (GRAphe Fonctionnel de Commande Étape/Transition) est un outil graphique normalisé pour décrire le comportement séquentiel d'un automatisme. Il est défini par la norme <strong>IEC 60848</strong> (et son équivalent français NF C 03-190). C'est l'outil de base du programmeur d'automates.`},
           {type:'table',title:'Éléments du Grafcet',rows:[
             ['Élément','Représentation','Rôle'],
             ['Étape','Rectangle numéroté (étape initiale = double trait)','État stable du système'],
             ['Action','Rectangle attaché à l\'étape (droite)','Ce que fait le système dans cet état'],
             ['Transition','Trait horizontal entre étapes','Condition de passage à l\'étape suivante'],
             ['Arc orienté','Flèche entre étape et transition','Liaisons (sens descendant par défaut)'],
           ]},
           {type:'list',items:['<strong>Activation :</strong> une étape est active si ses étapes précédentes étaient actives ET sa transition est vraie','<strong>Désactivation :</strong> une étape est désactivée quand toutes les étapes suivantes sont activées','<strong>Réceptivité :</strong> la transition peut être un signal capteur, un bouton, un temporisateur, une comparaison','<strong>Actions continues :</strong> actives tant que l\'étape est active · <strong>Actions impulsionnelles :</strong> actives seulement à l\'activation']},
           {type:'formula',formula:'Xi active ← Xi−1 active ET Ti vraie',legend:'Condition d\'activation d\'une étape · X = étape · T = transition'},
           {type:'norme',text:'<strong>IEC 60848</strong> (2013) : Langage de spécification GRAFCET pour séquences de commande. Cette norme internationale définit formellement la syntaxe et la sémantique du Grafcet, sa mise en équations booléennes et sa traduction en langages IEC 61131-3.'},
           {type:'tip',text:'<strong>Méthode de lecture :</strong> 1) Identifier l\'étape initiale (double trait) · 2) Lire les actions de chaque étape · 3) Identifier les réceptivités des transitions · 4) Tracer le chemin d\'évolution. Un Grafcet bien conçu se lit comme une story : "Le système fait X, puis quand Y est vrai, il passe à Z..."'},
         ]},
         quiz:[
           {q:'Dans un Grafcet, que représente une transition ?',sub:'Éléments constitutifs du Grafcet.',choices:['Une action à réaliser','La condition de passage d\'une étape à la suivante','Un état stable du système','Un capteur physique'],answer:1,expl:'La transition (trait horizontal ou oblique) porte une réceptivité (condition booléenne). Quand l\'étape précédente est active ET la réceptivité est vraie, le système franchit la transition et active l\'étape suivante.'},
           {q:'L\'étape initiale d\'un Grafcet est représentée par :',sub:'Représentation graphique du Grafcet.',choices:['Un cercle','Un rectangle à double trait','Un losange','Un rectangle avec une étoile'],answer:1,expl:'L\'étape initiale (étape active au démarrage, généralement numérotée 0 ou 1) est un rectangle à double trait (ou double contour). Elle symbolise l\'état de repos du système avant tout démarrage.'},
           {q:'Une action continue dans une étape Grafcet est active :',sub:'Types d\'actions dans le Grafcet.',choices:['Une seule fois à l\'activation de l\'étape','Tant que l\'étape est active','Seulement à la désactivation de l\'étape','Indépendamment de l\'état de l\'étape'],answer:1,expl:'Action continue : active pendant toute la durée où l\'étape est active. Dès que l\'étape est désactivée, l\'action s\'arrête. Exemple : si l\'étape 3 commande un moteur M en continu, M s\'arrête dès que l\'étape 3 est désactivée.'},
           {q:'Quelle norme internationale définit formellement le Grafcet ?',sub:'Référence normative du Grafcet.',choices:['CEI 61131-3','NF C 15-100','IEC 60848','ISO 9001'],answer:2,expl:'L\'IEC 60848 (2013) définit formellement le langage GRAFCET pour les séquences de commande. L\'IEC 61131-3 définit les 5 langages de programmation des automates (dont le SFC qui est une implémentation informatique du Grafcet).'},
           {q:'Dans un Grafcet, qu\'est-ce qu\'une réceptivité ?',sub:'Terminologie du Grafcet.',choices:['La liste des actions d\'une étape','La condition logique associée à une transition','Le numéro de l\'étape active','La durée de l\'étape'],answer:1,expl:'La réceptivité est la condition booléenne attachée à une transition. Elle peut être : un capteur (a1 = 1), un bouton (m = 1), une temporisation (t/3/s), une combinaison logique (a AND b), ou toujours vraie (= 1). La transition n\'est franchissable que si la réceptivité est vraie.'},
         ]},
        {id:'ch3',title:'Grafcet : structures de base',ico:'#ico-draw'},
        {id:'ch4',title:'Point de vue système vs partie opérative',ico:'#ico-info'},
      ]},
      {id:'m3',title:'API / PLC (CEI 61131-3)',chapters:[
        {id:'ch1',title:'Architecture d\'un automate programmable',ico:'#ico-plc'},
        {id:'ch2',title:'Langages IEC : LD, FBD, ST, SFC',ico:'#ico-plc'},
        {id:'ch3',title:'Programmation en langage Ladder (LD)',ico:'#ico-plc'},
        {id:'ch4',title:'Entrées/sorties & câblage API',ico:'#ico-plug'},
      ]},
      {id:'m4',title:'Capteurs & actionneurs',chapters:[
        {id:'ch1',title:'Capteurs de position & proximité',ico:'#ico-sensor'},
        {id:'ch2',title:'Capteurs de pression, température, débit',ico:'#ico-sensor'},
        {id:'ch3',title:'Actionneurs électropneumatiques',ico:'#ico-gear'},
        {id:'ch4',title:'Vérins hydrauliques & servo-moteurs',ico:'#ico-gear'},
      ]},
    ]
  },
  info:{
    name:'Informatique',icon:'#ico-monitor',color:'green',
    modules:[
      {id:'m1',title:'Systèmes & réseaux',chapters:[
        {id:'ch1',title:'Systèmes d\'exploitation : Windows, Linux',ico:'#ico-monitor'},
        {id:'ch2',title:'Modèle OSI & TCP/IP',ico:'#ico-network'},
        {id:'ch3',title:'Adressage IPv4, masques, CIDR',ico:'#ico-network'},
        {id:'ch4',title:'Commutation, routage, VLAN',ico:'#ico-network'},
      ]},
      {id:'m2',title:'Algorithmique & bases',chapters:[
        {id:'ch1',title:'Variables, types, opérateurs',ico:'#ico-info'},
        {id:'ch2',title:'Structures de contrôle : if, boucles',ico:'#ico-circuit2'},
        {id:'ch3',title:'Tableaux, fonctions, récursivité',ico:'#ico-info'},
        {id:'ch4',title:'Introduction Python & bases de données',ico:'#ico-monitor'},
      ]},
      {id:'m3',title:'Microcontrôleurs',chapters:[
        {id:'ch1',title:'Architecture microcontrôleur ARM/AVR',ico:'#ico-micro'},
        {id:'ch2',title:'GPIO, timers & interruptions',ico:'#ico-micro'},
        {id:'ch3',title:'Communication UART, SPI, I²C',ico:'#ico-micro'},
        {id:'ch4',title:'Arduino / STM32 : projet complet',ico:'#ico-micro'},
      ]},
    ]
  },
  meca:{
    name:'Mécanique',icon:'#ico-gear',color:'red',
    modules:[
      {id:'m1',title:'Statique & résistance des matériaux',chapters:[
        {id:'ch1',title:'Statique des solides : équilibre, pivot',ico:'#ico-balance'},
        {id:'ch2',title:'Efforts internes : traction, flexion, torsion',ico:'#ico-info'},
        {id:'ch3',title:'Contraintes & déformations (σ, ε)',ico:'#ico-info'},
        {id:'ch4',title:'Critère de Von Mises & sécurité',ico:'#ico-shield'},
      ]},
      {id:'m2',title:'Cinématique & dynamique',chapters:[
        {id:'ch1',title:'Cinématique du solide indéformable',ico:'#ico-motor'},
        {id:'ch2',title:'Lois de Newton & principe fondamental',ico:'#ico-balance'},
        {id:'ch3',title:'Liaisons mécaniques : glissière, pivot',ico:'#ico-gear'},
        {id:'ch4',title:'Énergie cinétique & travaux',ico:'#ico-bolt'},
      ]},
      {id:'m3',title:'Dessin technique & cotation',chapters:[
        {id:'ch1',title:'Vues orthogonales & coupes',ico:'#ico-draw'},
        {id:'ch2',title:'Cotation fonctionnelle ISO',ico:'#ico-draw'},
        {id:'ch3',title:'Tolérances géométriques (GD&T)',ico:'#ico-draw'},
        {id:'ch4',title:'Lecture de plans industriels',ico:'#ico-draw'},
      ]},
    ]
  },

  /* ══════════════════════════════════════
     MATHÉMATIQUES POUR L'INGÉNIEUR
  ══════════════════════════════════════ */
  math:{
    name:'Mathématiques',icon:'#ico-info',color:'indigo',
    modules:[
      {id:'m1',title:'Algèbre linéaire',chapters:[
        {id:'ch1',title:'Vecteurs, matrices & opérations',ico:'#ico-info',
         lesson:{
           disc:'Mathématiques',mod:'Module 1 — Algèbre linéaire',
           sections:[
             {type:'text',title:'Matrices et vecteurs',body:`Une <strong>matrice</strong> est un tableau rectangulaire de nombres disposés en lignes et colonnes. Un <strong>vecteur</strong> est une matrice à une seule colonne (vecteur colonne) ou une seule ligne (vecteur ligne). Les matrices sont fondamentales en ingénierie : systèmes d'équations, transformations géométriques, traitement du signal.`},
             {type:'table',title:'Opérations matricielles',rows:[
               ['Opération','Condition','Résultat'],
               ['Addition A + B','A et B de même taille','Matrice de même taille'],
               ['Produit A × B','colonnes(A) = lignes(B)','Matrice m×p si A est m×n et B est n×p'],
               ['Transposée Aᵀ','Toujours possible','Lignes ↔ Colonnes'],
               ['Inverse A⁻¹','A carrée et det(A) ≠ 0','Matrice carrée de même taille'],
             ]},
             {type:'formula',formula:'(A × B)ᵀ = Bᵀ × Aᵀ',legend:'Propriété de la transposée d\'un produit'},
             {type:'tip',text:'<strong>Mnémotechnique :</strong> Le produit matriciel n\'est pas commutatif : A×B ≠ B×A en général. Toujours vérifier les dimensions avant de multiplier.'},
             {type:'norme',text:'<strong>Notation standard ISO 80000-2 :</strong> Les matrices sont notées en majuscules grasses (<strong>A</strong>), les vecteurs en minuscules grasses (<strong>v</strong>), les scalaires en italique (a).'},
           ]
         },
         quiz:[
           {q:'Quelle condition faut-il pour multiplier deux matrices A (m×n) et B (p×q) ?',sub:'Vérification de compatibilité dimensionnelle.',choices:['m = p','n = p','m = q','n = q'],answer:1,expl:'Pour que le produit A×B soit défini, le nombre de colonnes de A doit égaler le nombre de lignes de B : n = p. Le résultat est une matrice m×q.'},
           {q:'Une matrice A est 3×4 et B est 4×2. Quelle est la taille de A×B ?',sub:'Calcul des dimensions du produit.',choices:['4×4','3×2','4×2','3×4'],answer:1,expl:'A(3×4) × B(4×2) → le produit a les dimensions (lignes de A) × (colonnes de B) = 3×2. Les dimensions internes (4) se "consument".'},
           {q:'Quelle est la propriété de la transposée d\'un produit (A×B)ᵀ ?',sub:'Règle algébrique fondamentale.',choices:['Aᵀ × Bᵀ','Bᵀ × Aᵀ','(A×B)','B × A'],answer:1,expl:'(A×B)ᵀ = Bᵀ × Aᵀ — attention à l\'inversion de l\'ordre ! Cette propriété est essentielle dans de nombreuses démonstrations.'},
           {q:'Une matrice carrée A a une inverse A⁻¹ si et seulement si :',sub:'Condition d\'inversibilité.',choices:['A est symétrique','det(A) ≠ 0','A est diagonale','Toutes ses valeurs sont positives'],answer:1,expl:'Une matrice carrée est inversible (non singulière) si et seulement si son déterminant est non nul. Si det(A) = 0, la matrice est singulière et n\'a pas d\'inverse.'},
           {q:'Le produit matriciel est-il commutatif ?',sub:'Propriété fondamentale.',choices:['Oui, toujours','Non, jamais','Oui, si les matrices sont carrées','Non, sauf si A×B = B×A pour ces matrices particulières'],answer:3,expl:'Le produit matriciel n\'est pas commutatif en général. Cependant, certaines paires particulières commutent (ex : une matrice avec son inverse, ou deux matrices diagonales). On ne peut donc pas supposer A×B = B×A.'},
         ]},
        {id:'ch2',title:'Systèmes d\'équations linéaires (Gauss)',ico:'#ico-info'},
        {id:'ch3',title:'Déterminants & valeurs propres',ico:'#ico-info'},
        {id:'ch4',title:'Espaces vectoriels & applications',ico:'#ico-info'},
      ]},
      {id:'m2',title:'Analyse & calcul différentiel',chapters:[
        {id:'ch1',title:'Dérivées & règles de dérivation',ico:'#ico-wave'},
        {id:'ch2',title:'Intégrales définies & indéfinies',ico:'#ico-wave'},
        {id:'ch3',title:'Équations différentielles du 1er ordre',ico:'#ico-wave'},
        {id:'ch4',title:'Équations différentielles du 2ème ordre',ico:'#ico-wave'},
      ]},
      {id:'m3',title:'Transformées & signaux',chapters:[
        {id:'ch1',title:'Transformée de Laplace',ico:'#ico-wave'},
        {id:'ch2',title:'Transformée de Fourier',ico:'#ico-wave'},
        {id:'ch3',title:'Transformée en Z (signaux discrets)',ico:'#ico-circuit2'},
        {id:'ch4',title:'Fonctions de transfert & stabilité',ico:'#ico-circuit2'},
      ]},
      {id:'m4',title:'Probabilités & statistiques',chapters:[
        {id:'ch1',title:'Probabilités : lois classiques',ico:'#ico-info'},
        {id:'ch2',title:'Variables aléatoires continues',ico:'#ico-wave'},
        {id:'ch3',title:'Statistiques descriptives',ico:'#ico-info'},
        {id:'ch4',title:'Tests d\'hypothèses & régression',ico:'#ico-info'},
      ]},
    ]
  },

  /* ══════════════════════════════════════
     HYDRAULIQUE & PNEUMATIQUE
  ══════════════════════════════════════ */
  hydro:{
    name:'Hydraulique / Pneumatique',icon:'#ico-gear',color:'cyan',
    modules:[
      {id:'m1',title:'Mécanique des fluides',chapters:[
        {id:'ch1',title:'Propriétés des fluides (viscosité, densité)',ico:'#ico-info',
         lesson:{
           disc:'Hydraulique / Pneumatique',mod:'Module 1 — Mécanique des fluides',
           sections:[
             {type:'text',title:'Propriétés fondamentales des fluides',body:`Un <strong>fluide</strong> est une substance qui se déforme continûment sous l'action d'une contrainte tangentielle, aussi petite soit-elle. Les fluides regroupent les liquides (quasi-incompressibles) et les gaz (compressibles). En hydraulique industrielle, on utilise principalement des huiles minérales ; en pneumatique, de l'air comprimé.`},
             {type:'table',title:'Grandeurs caractéristiques',rows:[
               ['Grandeur','Symbole','Unité','Définition'],
               ['Masse volumique','ρ (rho)','kg/m³','Masse par unité de volume'],
               ['Densité','d','sans unité','ρ_fluide / ρ_eau (eau = 1 000 kg/m³)'],
               ['Viscosité dynamique','μ (mu)','Pa·s','Résistance à l\'écoulement'],
               ['Viscosité cinématique','ν (nu)','m²/s ou cSt','ν = μ / ρ'],
               ['Pression','P','Pa ou bar','Force par unité de surface'],
             ]},
             {type:'formula',formula:'ρ = m / V',legend:'Masse volumique : masse (kg) / volume (m³)'},
             {type:'norme',text:'<strong>ISO VG (Viscosity Grade) :</strong> Classification internationale des huiles hydrauliques. VG 46 signifie une viscosité cinématique de 46 cSt à 40°C. Les huiles les plus courantes en hydraulique industrielle sont VG 32, VG 46 et VG 68.'},
             {type:'tip',text:'<strong>Conversion utile :</strong> 1 bar = 100 000 Pa = 10,2 m de colonne d\'eau. 1 cSt (centistokes) = 10⁻⁶ m²/s. L\'huile hydraulique standard VG 46 a une densité d\'environ 0,875.'},
           ]
         },
         quiz:[
           {q:'Quelle est la masse volumique de l\'eau à 4°C (référence) ?',sub:'Valeur de référence fondamentale.',choices:['100 kg/m³','1 000 kg/m³','10 000 kg/m³','1 kg/m³'],answer:1,expl:'L\'eau à 4°C a une masse volumique de 1 000 kg/m³ = 1 kg/litre. C\'est la valeur de référence pour calculer la densité des autres fluides.'},
           {q:'Quelle est la différence entre viscosité dynamique et viscosité cinématique ?',sub:'Relation entre les deux grandeurs.',choices:['Ce sont deux noms pour la même chose','ν = μ / ρ','μ = ν / ρ','ν = μ × ρ'],answer:1,expl:'ν = μ / ρ. La viscosité cinématique ν (nu) est la viscosité dynamique μ divisée par la masse volumique ρ. Elle s\'exprime en m²/s ou en cSt (centistokes).'},
           {q:'Une huile ISO VG 46 a une viscosité cinématique de :',sub:'Classification ISO des huiles hydrauliques.',choices:['46 Pa·s à 20°C','46 cSt à 40°C','46 bar à 20°C','46 kg/m³'],answer:1,expl:'Dans la classification ISO VG, le chiffre correspond à la viscosité cinématique en cSt (centistokes) à 40°C ± 10%. VG 46 → 46 cSt à 40°C.'},
           {q:'Quelle conversion est correcte ?',sub:'1 bar = ? Pa',choices:['1 bar = 1 000 Pa','1 bar = 10 000 Pa','1 bar = 100 000 Pa','1 bar = 1 000 000 Pa'],answer:2,expl:'1 bar = 10⁵ Pa = 100 000 Pa. 1 bar ≈ 10,2 m de colonne d\'eau ≈ 0,987 atm. La pression atmosphérique normale est d\'environ 1,013 bar.'},
           {q:'Qu\'est-ce qu\'un fluide incompressible ?',sub:'Comportement sous pression.',choices:['Un fluide sans viscosité','Un fluide dont le volume ne varie pas avec la pression','Un fluide qui ne s\'écoule pas','Un fluide solide'],answer:1,expl:'Un fluide incompressible est un fluide dont la masse volumique reste constante quelle que soit la pression appliquée. Les liquides (eau, huile) sont quasi-incompressibles. Les gaz sont compressibles.'},
         ]},
        {id:'ch2',title:'Loi de Bernoulli & équation de continuité',ico:'#ico-wave'},
        {id:'ch3',title:'Pertes de charge (régimes laminaire/turbulent)',ico:'#ico-info'},
        {id:'ch4',title:'Nombre de Reynolds',ico:'#ico-info'},
      ]},
      {id:'m2',title:'Circuits hydrauliques',chapters:[
        {id:'ch1',title:'Pompes hydrauliques (engrenages, pistons)',ico:'#ico-gear'},
        {id:'ch2',title:'Distributeurs & vannes de régulation',ico:'#ico-gear'},
        {id:'ch3',title:'Vérins hydrauliques & calcul de force',ico:'#ico-bolt'},
        {id:'ch4',title:'Accumulateurs & filtration',ico:'#ico-shield'},
      ]},
      {id:'m3',title:'Circuits pneumatiques',chapters:[
        {id:'ch1',title:'Production & traitement de l\'air comprimé',ico:'#ico-gear'},
        {id:'ch2',title:'Distributeurs pneumatiques',ico:'#ico-gear'},
        {id:'ch3',title:'Vérins pneumatiques & calcul',ico:'#ico-bolt'},
        {id:'ch4',title:'Schémas pneumatiques (ISO 1219)',ico:'#ico-draw'},
      ]},
      {id:'m4',title:'Lecture & conception de schémas',chapters:[
        {id:'ch1',title:'Symboles hydrauliques ISO 1219',ico:'#ico-draw'},
        {id:'ch2',title:'Lecture de circuits industriels',ico:'#ico-draw'},
        {id:'ch3',title:'Dimensionnement d\'un circuit',ico:'#ico-info'},
        {id:'ch4',title:'Maintenance & diagnostic de pannes',ico:'#ico-shield'},
      ]},
    ]
  },

  /* ══════════════════════════════════════
     THERMODYNAMIQUE
  ══════════════════════════════════════ */
  thermo:{
    name:'Thermodynamique',icon:'#ico-bolt',color:'red',
    modules:[
      {id:'m1',title:'Principes fondamentaux',chapters:[
        {id:'ch1',title:'Systèmes thermodynamiques & état',ico:'#ico-info',
         lesson:{
           disc:'Thermodynamique',mod:'Module 1 — Principes fondamentaux',
           sections:[
             {type:'text',title:'Systèmes et grandeurs d\'état',body:`La thermodynamique étudie les échanges d'<strong>énergie</strong> entre les systèmes. Un <strong>système thermodynamique</strong> est une portion de l'univers délimitée par une frontière. Selon les échanges possibles avec l'extérieur, on distingue différents types de systèmes.`},
             {type:'table',title:'Types de systèmes',rows:[
               ['Type','Échange de matière','Échange d\'énergie','Exemple'],
               ['Isolé','Non','Non','Thermos idéal'],
               ['Fermé','Non','Oui','Piston-cylindre'],
               ['Ouvert','Oui','Oui','Turbine, compresseur'],
             ]},
             {type:'text',title:'Variables d\'état',body:`L'état d'un système est défini par ses <strong>variables d'état</strong> : pression P, volume V, température T, et quantité de matière n. Pour un gaz parfait, ces variables sont liées par l'équation d'état des gaz parfaits.`},
             {type:'formula',formula:'P × V = n × R × T',legend:'Loi des gaz parfaits — R = 8,314 J/(mol·K)'},
             {type:'list',items:['<strong>Température T</strong> : en Kelvin (K) — T(K) = T(°C) + 273,15','<strong>Pression P</strong> : en Pascal (Pa) — 1 atm = 101 325 Pa','<strong>Processus isotherme :</strong> T = cste → P×V = cste (loi de Boyle)','<strong>Processus isobare :</strong> P = cste → V/T = cste (loi de Charles)','<strong>Processus isochore :</strong> V = cste → P/T = cste (loi de Gay-Lussac)']},
             {type:'norme',text:'<strong>SI :</strong> La température thermodynamique se mesure en Kelvin (K), unité de base du SI. 0 K = zéro absolu = −273,15°C. Toujours utiliser les Kelvin dans les équations thermodynamiques.'},
             {type:'tip',text:'<strong>Astuce :</strong> Pour mémoriser les trois lois des gaz : « à T fixe → P×V constant ; à P fixe → V/T constant ; à V fixe → P/T constant ». Ou retenir la loi générale PV = nRT et fixer la variable constante.'},
           ]
         },
         quiz:[
           {q:'Quelle est la température en Kelvin correspondant à 25°C ?',sub:'Conversion °C → K.',choices:['25 K','248 K','298 K','373 K'],answer:2,expl:'T(K) = T(°C) + 273,15 = 25 + 273,15 ≈ 298 K. 25°C est la "température ambiante standard" souvent utilisée en thermodynamique.'},
           {q:'Un système fermé échange de l\'énergie avec l\'extérieur mais pas de matière. Exemple typique ?',sub:'Classification des systèmes.',choices:['Thermos idéal','Piston-cylindre','Turbine à vapeur','Cheminée'],answer:1,expl:'Un piston-cylindre est un système fermé : la masse de fluide est constante (pas d\'échange de matière), mais de la chaleur et du travail peuvent traverser les parois.'},
           {q:'À température constante (isotherme), un gaz parfait est comprimé de V1 = 2 L à V2 = 1 L à P1 = 1 bar. Quelle est P2 ?',sub:'Loi de Boyle-Mariotte : P×V = cste.',choices:['0,5 bar','1 bar','2 bar','4 bar'],answer:2,expl:'Isotherme : P1×V1 = P2×V2. Donc P2 = P1×V1/V2 = 1×2/1 = 2 bar. Quand le volume est divisé par 2, la pression double.'},
           {q:'La constante des gaz parfaits R vaut :',sub:'Valeur numérique exacte.',choices:['R = 0,082 J/(mol·K)','R = 8,314 J/(mol·K)','R = 22,4 J/(mol·K)','R = 1,38 J/(mol·K)'],answer:1,expl:'R = 8,314 J/(mol·K) est la constante universelle des gaz parfaits. À noter : 22,4 L/mol est le volume molaire à 0°C et 1 atm (conditions normales).'},
           {q:'Quel processus thermodynamique se déroule à pression constante ?',sub:'Nomenclature des processus.',choices:['Isotherme','Isochore','Isobare','Adiabatique'],answer:2,expl:'Isobare = pression constante (iso = même, bare = pression en grec). Isotherme = température constante. Isochore = volume constant. Adiabatique = sans échange de chaleur.'},
         ]},
        {id:'ch2',title:'1er principe : énergie interne & enthalpie',ico:'#ico-bolt'},
        {id:'ch3',title:'2ème principe : entropie & rendement',ico:'#ico-info'},
        {id:'ch4',title:'Cycles thermiques (Carnot, Rankine)',ico:'#ico-wave'},
      ]},
      {id:'m2',title:'Transferts thermiques',chapters:[
        {id:'ch1',title:'Conduction thermique (loi de Fourier)',ico:'#ico-wave'},
        {id:'ch2',title:'Convection forcée & naturelle',ico:'#ico-wave'},
        {id:'ch3',title:'Rayonnement thermique (loi de Stefan)',ico:'#ico-bolt'},
        {id:'ch4',title:'Échangeurs de chaleur',ico:'#ico-gear'},
      ]},
      {id:'m3',title:'Machines thermiques',chapters:[
        {id:'ch1',title:'Moteurs à combustion interne (Otto, Diesel)',ico:'#ico-gear'},
        {id:'ch2',title:'Turbines à gaz & cycle Brayton',ico:'#ico-gear'},
        {id:'ch3',title:'Machines frigorifiques & pompes à chaleur',ico:'#ico-bolt'},
        {id:'ch4',title:'Cogénération & efficacité énergétique',ico:'#ico-shield'},
      ]},
    ]
  },

  /* ══════════════════════════════════════
     GÉNIE CIVIL
  ══════════════════════════════════════ */
  genie_civil:{
    name:'Génie civil',icon:'#ico-balance',color:'brown',
    modules:[
      {id:'m1',title:'Matériaux de construction',chapters:[
        {id:'ch1',title:'Béton : composition, dosage & résistance',ico:'#ico-info',
         lesson:{
           disc:'Génie civil',mod:'Module 1 — Matériaux de construction',
           sections:[
             {type:'text',title:'Composition du béton',body:`Le <strong>béton</strong> est un matériau composite obtenu par mélange de <strong>ciment</strong>, de <strong>granulats</strong> (sable + gravier), d'<strong>eau</strong> et d'éventuels <strong>adjuvants</strong>. Après hydratation du ciment, le béton durcit et acquiert ses propriétés mécaniques. C'est le matériau de construction le plus utilisé dans le monde.`},
             {type:'table',title:'Constituants du béton (pour 1 m³)',rows:[
               ['Constituant','Rôle','Quantité typique'],
               ['Ciment CEM I','Liant hydraulique (prise)','350 kg'],
               ['Sable 0/4 mm','Granulat fin (remplissage)','700 kg'],
               ['Gravier 4/20 mm','Granulat grossier (squelette)','1 050 kg'],
               ['Eau de gâchage','Hydratation du ciment','175 L'],
               ['Adjuvants','Plastifiant, retardateur…','< 2 %'],
             ]},
             {type:'formula',formula:'E/C = rapport eau/ciment',legend:'Plus E/C est faible, plus le béton est résistant et durable (E/C optimal : 0,4–0,5)'},
             {type:'list',items:['<strong>Résistance caractéristique fc28 :</strong> résistance en compression à 28 jours (en MPa)','<strong>Béton C25/30 :</strong> fc cylindrique = 25 MPa, fc cubique = 30 MPa','<strong>Béton armé :</strong> association béton (compression) + acier (traction)','<strong>Béton précontraint :</strong> aciers précontraints pour compenser la traction']},
             {type:'norme',text:'<strong>EN 206 / NF EN 206 :</strong> Norme européenne du béton. Définit les classes d\'exposition (XC, XS, XF…), les classes de résistance (C12/15 à C100/115) et les exigences de durabilité.'},
             {type:'tip',text:'<strong>Règle pratique :</strong> La résistance du béton augmente dans le temps : environ 70% de fc28 à 7 jours, 100% à 28 jours, 120% à 90 jours. Le coffrage peut souvent être décoffré après 7 jours pour éléments courants.'},
           ]
         },
         quiz:[
           {q:'Que représente la désignation "C25/30" pour un béton ?',sub:'Classification européenne EN 206.',choices:['25 MPa cubique et 30 MPa cylindrique','25 MPa cylindrique et 30 MPa cubique','25 kg/m³ de ciment et 30 L d\'eau','Résistance à 25°C et 30 jours'],answer:1,expl:'C25/30 : C = béton de structure, 25 = résistance caractéristique sur éprouvette cylindrique (fc,cyl = 25 MPa), 30 = résistance sur éprouvette cubique (fc,cube = 30 MPa) à 28 jours.'},
           {q:'Quel est le rôle du rapport E/C dans la fabrication du béton ?',sub:'Paramètre clé de la formulation.',choices:['Plus E/C est élevé, plus le béton est résistant','Plus E/C est faible, plus le béton est résistant','E/C n\'a pas d\'influence sur la résistance','E/C doit toujours être supérieur à 1'],answer:1,expl:'La loi de Féret : plus le rapport E/C est faible, plus la résistance est élevée. Un excès d\'eau crée des porosités capillaires qui affaiblissent le béton. Valeur optimale : 0,4 à 0,5.'},
           {q:'À quel pourcentage de sa résistance à 28 jours le béton atteint-il à 7 jours ?',sub:'Évolution de la résistance dans le temps.',choices:['30%','50%','70%','90%'],answer:2,expl:'À 7 jours, le béton ordinaire CEM I atteint environ 70% de sa résistance à 28 jours (fc28). Ce seuil est souvent utilisé pour autoriser le décoffrage et la mise en charge partielle.'},
           {q:'Pourquoi associe-t-on du béton et de l\'acier dans le béton armé ?',sub:'Complémentarité des matériaux.',choices:['Pour réduire le coût','Le béton résiste bien en traction, l\'acier en compression','Le béton résiste bien en compression, l\'acier en traction','Pour faciliter la mise en œuvre'],answer:2,expl:'Le béton a une excellente résistance en compression (25–50 MPa) mais très faible en traction (~3 MPa). L\'acier, lui, résiste très bien en traction (~500 MPa). L\'association des deux crée un matériau performant sous toutes les sollicitations.'},
           {q:'Quelle norme européenne régit la composition et les spécifications du béton ?',sub:'Référence normative béton.',choices:['NF EN 206','NF P 06-001','Eurocode 2','ISO 9001'],answer:0,expl:'La norme NF EN 206 (harmonisée en Europe) définit les exigences pour le béton : classes d\'exposition, résistances, durabilité, composition et essais. L\'Eurocode 2 (EN 1992), lui, traite du calcul des structures en béton armé.'},
         ]},
        {id:'ch2',title:'Aciers de construction & profils',ico:'#ico-info'},
        {id:'ch3',title:'Bois de structure & matériaux composites',ico:'#ico-info'},
        {id:'ch4',title:'Sols & fondations : types et portance',ico:'#ico-balance'},
      ]},
      {id:'m2',title:'Résistance des matériaux (RdM)',chapters:[
        {id:'ch1',title:'Statique des structures : réactions d\'appui',ico:'#ico-balance'},
        {id:'ch2',title:'Efforts internes : N, V, M',ico:'#ico-info'},
        {id:'ch3',title:'Dimensionnement des poutres (flexion)',ico:'#ico-draw'},
        {id:'ch4',title:'Flambement & stabilité des colonnes',ico:'#ico-shield'},
      ]},
      {id:'m3',title:'Eurocodes & calcul de structures',chapters:[
        {id:'ch1',title:'Eurocodes : présentation & chargements (EC1)',ico:'#ico-info'},
        {id:'ch2',title:'Calcul béton armé (Eurocode 2)',ico:'#ico-balance'},
        {id:'ch3',title:'Calcul charpentes métalliques (Eurocode 3)',ico:'#ico-balance'},
        {id:'ch4',title:'Fondations & géotechnique (Eurocode 7)',ico:'#ico-shield'},
      ]},
      {id:'m4',title:'Topographie & métrés',chapters:[
        {id:'ch1',title:'Lecture et établissement de plans',ico:'#ico-draw'},
        {id:'ch2',title:'Métrés : surfaces, volumes, cubatures',ico:'#ico-info'},
        {id:'ch3',title:'Implantation de chantier & nivellement',ico:'#ico-balance'},
        {id:'ch4',title:'Devis descriptif & quantitatif',ico:'#ico-info'},
      ]},
    ]
  },

  /* ══════════════════════════════════════
     COMPTABILITÉ
  ══════════════════════════════════════ */
  compta:{
    name:'Comptabilité',icon:'#ico-info',color:'teal',
    modules:[
      {id:'m1',title:'Comptabilité générale',chapters:[
        {id:'ch1',title:'Bilan & compte de résultat',ico:'#ico-info',
         lesson:{
           disc:'Comptabilité',mod:'Module 1 — Comptabilité générale',
           sections:[
             {type:'text',title:'Les deux états financiers fondamentaux',body:`La comptabilité repose sur deux documents essentiels : le <strong>bilan</strong>, qui photographie la situation financière à un instant T, et le <strong>compte de résultat</strong>, qui mesure la performance sur une période. Ces deux documents sont liés : le résultat du compte de résultat vient s'ajouter aux capitaux propres du bilan.`},
             {type:'table',title:'Structure du bilan',rows:[
               ['ACTIF (Emplois)','PASSIF (Ressources)'],
               ['Actif immobilisé (immos corpo, incorpo, financières)','Capitaux propres (capital + réserves + résultat)'],
               ['Actif circulant (stocks, créances clients)','Dettes financières (emprunts bancaires)'],
               ['Trésorerie actif (banque, caisse)','Dettes d\'exploitation (fournisseurs, fiscales)'],
               ['Total Actif','Total Passif'],
             ]},
             {type:'formula',formula:'Résultat = Produits − Charges',legend:'Bénéfice si positif, perte si négatif'},
             {type:'norme',text:'<strong>PCG (Plan Comptable Général) :</strong> Référentiel comptable français obligatoire pour toutes les entreprises. Les comptes sont classés en 7 classes : 1 (capitaux), 2 (immobilisations), 3 (stocks), 4 (tiers), 5 (financiers), 6 (charges), 7 (produits).'},
             {type:'tip',text:'<strong>Équilibre fondamental :</strong> Total Actif = Total Passif, toujours. Si cette égalité n\'est pas vérifiée, il y a une erreur de comptabilisation. L\'actif représente ce que l\'entreprise possède, le passif ce qu\'elle doit et ce que les actionnaires ont apporté.'},
           ]
         },
         quiz:[
           {q:'Le bilan d\'une entreprise représente :',sub:'Définition du bilan comptable.',choices:['Les charges et produits de l\'exercice','La situation financière à un instant T','Les flux de trésorerie de l\'année','Le détail des salaires versés'],answer:1,expl:'Le bilan est une photographie du patrimoine de l\'entreprise à une date donnée (généralement le 31/12). Il présente à l\'actif ce que l\'entreprise possède, et au passif la façon dont ces actifs sont financés.'},
           {q:'L\'équation fondamentale de la comptabilité est :',sub:'Équilibre bilan.',choices:['Actif = Passif','Produits = Charges','Actif = Capitaux propres','Résultat = Chiffre d\'affaires'],answer:0,expl:'Total Actif = Total Passif, toujours et nécessairement. L\'actif (emplois) est toujours financé par le passif (ressources). C\'est le principe de la partie double.'},
           {q:'Une entreprise a des produits de 500 000 € et des charges de 420 000 €. Son résultat est :',sub:'Calcul du résultat.',choices:['Perte de 80 000 €','Bénéfice de 80 000 €','Bénéfice de 500 000 €','Perte de 420 000 €'],answer:1,expl:'Résultat = Produits − Charges = 500 000 − 420 000 = 80 000 € de bénéfice. Un résultat positif est un bénéfice, négatif est une perte.'},
           {q:'Dans le Plan Comptable Général (PCG), les charges appartiennent à la classe :',sub:'Classification PCG.',choices:['Classe 2','Classe 4','Classe 6','Classe 7'],answer:2,expl:'Classe 6 = Charges (achats, frais de personnel, dotations aux amortissements…). Classe 7 = Produits (ventes, produits financiers…). Classe 1 à 5 = comptes de bilan.'},
           {q:'Les capitaux propres comprennent :',sub:'Composition du passif permanent.',choices:['Les dettes fournisseurs uniquement','Capital social, réserves et résultat de l\'exercice','Les emprunts bancaires','Les dettes fiscales'],answer:1,expl:'Les capitaux propres = capital social (apports des associés) + réserves (bénéfices antérieurs non distribués) + résultat de l\'exercice. Ils représentent les ressources propres de l\'entreprise, sans obligation de remboursement.'},
         ]},
        {id:'ch2',title:'Mécanisme de la partie double',ico:'#ico-info'},
        {id:'ch3',title:'Amortissements & provisions',ico:'#ico-info'},
        {id:'ch4',title:'Clôture des comptes & écritures d\'inventaire',ico:'#ico-info'},
      ]},
      {id:'m2',title:'Comptabilité analytique',chapters:[
        {id:'ch1',title:'Charges directes & indirectes',ico:'#ico-info'},
        {id:'ch2',title:'Coût de revient & marges',ico:'#ico-info'},
        {id:'ch3',title:'Méthodes ABC & sections homogènes',ico:'#ico-info'},
        {id:'ch4',title:'Seuil de rentabilité & levier opérationnel',ico:'#ico-wave'},
      ]},
      {id:'m3',title:'Fiscalité de l\'entreprise',chapters:[
        {id:'ch1',title:'TVA : calcul, déclaration, déductibilité',ico:'#ico-info'},
        {id:'ch2',title:'Impôt sur les sociétés (IS)',ico:'#ico-info'},
        {id:'ch3',title:'Cotisations sociales & paie',ico:'#ico-info'},
        {id:'ch4',title:'Liasse fiscale & obligations légales',ico:'#ico-shield'},
      ]},
    ]
  },

  /* ══════════════════════════════════════
     GESTION
  ══════════════════════════════════════ */
  gestion:{
    name:'Gestion d\'entreprise',icon:'#ico-network',color:'emerald',
    modules:[
      {id:'m1',title:'Gestion financière',chapters:[
        {id:'ch1',title:'Analyse financière : ratios & indicateurs',ico:'#ico-info',
         lesson:{
           disc:'Gestion d\'entreprise',mod:'Module 1 — Gestion financière',
           sections:[
             {type:'text',title:'Les ratios financiers clés',body:`L'analyse financière permet d'évaluer la santé d'une entreprise à travers des <strong>ratios</strong> calculés à partir du bilan et du compte de résultat. Ces indicateurs permettent de comparer l'entreprise à elle-même dans le temps, ou à ses concurrents du même secteur.`},
             {type:'table',title:'Ratios fondamentaux',rows:[
               ['Ratio','Formule','Interprétation'],
               ['Rentabilité économique (ROA)','Résultat net / Total actif','Efficacité de l\'utilisation des actifs'],
               ['Rentabilité financière (ROE)','Résultat net / Capitaux propres','Rendement pour les actionnaires'],
               ['Taux de marge brute','Marge brute / CA × 100','Part du CA restant après le coût des ventes'],
               ['Ratio de liquidité générale','Actif circulant / Dettes court terme','Capacité à payer les dettes < 1 an'],
               ['Taux d\'endettement','Dettes financières / Capitaux propres','Niveau de risque financier'],
             ]},
             {type:'formula',formula:'BFR = Stocks + Créances clients − Dettes fournisseurs',legend:'Besoin en Fonds de Roulement — besoin de financement du cycle d\'exploitation'},
             {type:'norme',text:'<strong>IFRS (International Financial Reporting Standards) :</strong> Normes comptables internationales utilisées par les sociétés cotées en Europe. Les PME utilisent généralement le Plan Comptable Général (PCG) français.'},
             {type:'tip',text:'<strong>Interprétation :</strong> Un ratio de liquidité générale > 1 signifie que l\'entreprise peut théoriquement rembourser ses dettes court terme. Un BFR positif signifie que l\'entreprise doit financer son cycle d\'exploitation (situation courante en industrie). Un BFR négatif est un avantage (situation des grandes surfaces).'},
           ]
         },
         quiz:[
           {q:'Que mesure le ROE (Return on Equity) ?',sub:'Ratio de rentabilité financière.',choices:['L\'efficacité des actifs totaux','Le rendement pour les actionnaires (résultat/CP)','La marge bénéficiaire sur ventes','Le ratio d\'endettement'],answer:1,expl:'ROE = Résultat net / Capitaux propres. Il mesure la rentabilité du point de vue des actionnaires : combien l\'entreprise génère-t-elle de bénéfice pour chaque euro de capital investi par les associés.'},
           {q:'Le Besoin en Fonds de Roulement (BFR) est calculé comme :',sub:'Formule du BFR.',choices:['Produits − Charges','Stocks + Créances − Dettes fournisseurs','Actif − Passif','CA − Coûts variables'],answer:1,expl:'BFR = Stocks + Créances clients − Dettes fournisseurs. Il représente le besoin de financement lié au décalage temporel entre les encaissements (clients) et les décaissements (fournisseurs, stocks).'},
           {q:'Un ratio de liquidité générale de 0,8 signifie que :',sub:'Interprétation du ratio de liquidité.',choices:['L\'entreprise est très rentable','L\'entreprise ne peut pas couvrir ses dettes à court terme avec son actif circulant','L\'entreprise a trop de liquidités','L\'endettement est faible'],answer:1,expl:'Un ratio < 1 signifie que l\'actif circulant ne suffit pas à couvrir les dettes court terme. C\'est un signal d\'alerte potentiel sur la liquidité, même si cela peut être normal dans certains secteurs (grande distribution avec BFR négatif).'},
           {q:'Quel document sert de base au calcul des ratios financiers ?',sub:'Sources de l\'analyse financière.',choices:['Le budget prévisionnel','Le bilan et le compte de résultat','Le plan de trésorerie','Le tableau de bord RH'],answer:1,expl:'Les ratios financiers sont calculés à partir des états financiers : le bilan (pour les actifs, passifs, capitaux propres) et le compte de résultat (pour le CA, les marges, le résultat). Ces documents sont publiés annuellement.'},
           {q:'Une entreprise a un résultat net de 100 000 € et des capitaux propres de 500 000 €. Son ROE est :',sub:'Application numérique.',choices:['5%','20%','50%','500%'],answer:1,expl:'ROE = Résultat net / Capitaux propres = 100 000 / 500 000 = 0,20 = 20%. Cela signifie que chaque euro de capital propre génère 20 centimes de bénéfice net.'},
         ]},
        {id:'ch2',title:'Trésorerie & financement',ico:'#ico-info'},
        {id:'ch3',title:'Investissement & calcul de rentabilité (VAN, TRI)',ico:'#ico-wave'},
        {id:'ch4',title:'Budget prévisionnel & contrôle budgétaire',ico:'#ico-info'},
      ]},
      {id:'m2',title:'Gestion de projet',chapters:[
        {id:'ch1',title:'Planification : WBS, Gantt, jalons',ico:'#ico-draw'},
        {id:'ch2',title:'Méthode du chemin critique (CPM/PERT)',ico:'#ico-draw'},
        {id:'ch3',title:'Gestion des risques projet',ico:'#ico-shield'},
        {id:'ch4',title:'Coût, délai, qualité : le triangle d\'or',ico:'#ico-info'},
      ]},
      {id:'m3',title:'Management & organisation',chapters:[
        {id:'ch1',title:'Structures organisationnelles',ico:'#ico-network'},
        {id:'ch2',title:'Gestion des ressources humaines (GRH)',ico:'#ico-info'},
        {id:'ch3',title:'Qualité totale : ISO 9001, Lean, 5S',ico:'#ico-shield'},
        {id:'ch4',title:'Stratégie d\'entreprise (SWOT, Porter)',ico:'#ico-info'},
      ]},
    ]
  },
};