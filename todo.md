<!--! NB -->

certaines configurations de html nécessaires pour les animes : cf projects.html, bas de page
Code commenté dans le html pour le lien vers le projet && pour les animations
Page note : la nav archive est sous les articles, pas logique sémantiquement
Donner un nom plus génériques aux css des cards de projet (utilisé dans la page notes aussi)

<!--% Pitch -->

The Beast : Qu'est-ce qui se passe si on mix : the floor is lava, le palais des glaces, des cartes random, une histoire ?

<!--+ insects -->

https://pixelodyssey.itch.io/100-bug-icons
https://megamicrobats.itch.io/beetlepack

<!--+ Liste de bug informatique pour insects  -->

Et oui, rasteriser = transformer le SVG, qui est un dessin vectoriel, en une image faite de pixels pour que Phaser puisse l’afficher dans le canvas.
-> chercher désespérément pourquoi ma speech bubble lucid est flou dans mon pixel art game

<!--+ next -->

page note, mettre les dialogues en <q> ou autre et indentation
Logo animé au changement de page ?
Equipe : motto/texte
logo animé en grand sur la page d'accueil ?
Liste de weird bugs : soit une nav avec juste un insect en page note (et plus tard un livre pour la bibli de Léon), soit dans le footer -> nouvelle page en mode tableau de chasse

Liens du footer : itch.io

✅ finir les textes
✅ vérifier le contraste, le focus clavier et les liens
✅ dernier passage "est-ce qu'il y a un pixel qui dépasse ?"

---

styles : Cormorant : les idées ("Transient Gold", slogans, citations, grands titres).
Inter : tout ce qui est navigation, descriptions, boutons, bios, UI.

Donc on a :
Transient Gold
Kindling insight (since 2026)
Et des status :
Pending transmutation : en pause
Chrysopoeia in progress : en cours de taf
Turned to lead : abandonné
Ignition : release
Tempering : correction
Jeu vivant : Strewing Golden Embers
Spark's seeds : à venir
Et peut-être une page de bordel Prima materia. J'aime le bordel :D
Donc ça ce serait la page studio et ensuite chaque jeu a un site perso avec son style

Pitch
🜂 The Human model : Surviving Capitalism, One Card at a Time
🜂 Xenoarchaeology Internship
🜂 Lost in Datasets.
🜂 Anatta : Disappearing Ego, Disappearing Protagonist.
🜂 Wool Islands
🜂 Living Through Static
🜂 Fat Life, A (Stair-)Climbing Simulator.
🜂 Library Puzzle Game.
🜂 Mutant Cows vs. Alien Exobiology.

btn
The Human Model → Enter the Simulation
Xenoarchaeology Internship → Join the Expedition
Lost in Datasets → Enter the Experiment
Anatta → Begin Your Journey
Wool Islands → Take Flight
Living Through Static → Tune In
Fat Life → Take the First Step
Library Puzzle Game → Explore the Archives
Mutant cows -> warp to the next planet

<!-- + anim project -->

Niveau 1 — L'icône
Un triangle plein blanc.
Pourquoi plein ?
Parce qu'à 32 px, un contour devient très fin et fragile.
Un triangle plein est une forme extrêmement solide.
Derrière, le feu d'artifice noir.
Une seule trajectoire est dorée.
C'est tout.

───

Niveau 2 — La version illustrée
Même composition.
Mais cette fois :
• explosion en couleurs ;
• chaque trajectoire a sa personnalité ;
• la dorée est plus lumineuse, avec une texture différente (feuille d'or, peinture, paillettes...).

───

Niveau 3 — L'animation
Là, tu racontes enfin l'histoire.
Au début, on ne sait pas pourquoi ce triangle est là.
Puis :
✨ une étincelle monte.
Elle touche le triangle.
Elle explose.
Et une des trajectoires devient une comète dorée.
C'est à ce moment-là seulement que le spectateur comprend :
Ah... le triangle transforme quelque chose.
Tu n'as jamais eu besoin de représenter un rayon entrant dans le logo statique.
L'animation fait ce travail.

---

# Newsletter

# Polish

The main buckets I'd check are:

Accessibility — keyboard-only navigation, visible focus, sensible tab order, headings hierarchy, alt text, form labels, contrast, reduced-motion behavior, dialogs/overlays closing with Escape, links/buttons actually being the right HTML elements, mobile tap targets, and a quick screen-reader sanity check. Also zoom to 200% and make sure nothing becomes unusable.
SEO / discoverability — unique title + description, canonical URLs, sitemap, robots.txt, Search Console, then proper metadata for individual game pages.
Social sharing — our Open Graph image/title/description, but also Twitter/X-style card metadata because other services understand it too. Test the final transient-gold.com rather than GitHub Pages.
404s & navigation — deliberately visit a nonexistent URL, click every navigation/footer/project link, test external links, anchors and footnote return links. A custom 404.html would be nice on GitHub Pages and can remain extremely simple.
Forms / newsletter — once Kit exists: invalid email, valid email, double opt-in, duplicate subscription, project preferences, unsubscribe, manage preferences. Also a tiny privacy explanation near signup.
Legal/privacy — especially once we're collecting emails. We should do a proper France/EU pass rather than improvise this. At minimum, people need to know who's collecting what, why, and how to exercise their rights. Depending on what third-party services/analytics we add, cookie/privacy obligations can change.
Security / privacy plumbing — no API secrets in JS or the GitHub repo, external links using sensible attributes where appropriate, HTTPS on the custom domain. Newsletter API keys in particular must not end up in client-side code.
Performance — phone on mediocre connection, image sizes, fonts, JS errors, Lighthouse/PageSpeed. Our wandering bug already taught us why this deserves one pass. 😑
Compatibility — Firefox + Chrome/Chromium + ideally Safari/iPhone somehow; desktop + actual phone; portrait; narrow screen; very wide screen. We don't need pixel-identical rendering.
Content polish — spelling, unfinished placeholders, fake links, commented temporary stuff that matters, email address, project counts, copyright, lang="en", favicon, page titles. We've already caught things like sciptorium.
Maintenance/recovery — make sure the repo contains everything needed to rebuild the site, domain renewal is enabled/sane, and we know which external accounts control domain/newsletter/etc. No mysterious asset existing only on your laptop.

And there's one category I think is especially worth adding for Transient Gold: “works without cleverness.” Disable JavaScript once. The easter eggs can die, obviously, but the actual site should remain readable and navigable. Likewise, if an animation fails or an external service dies, nothing essential should disappear.

## SEO

I'd do roughly this:

Give every page a unique <title> and <meta name="description">. The Open Graph description we made for social sharing doesn't replace the normal SEO description.
Add a canonical URL to each page once transient-gold.com is connected.
Make sure navigation uses normal <a href> links and every important page is reachable from somewhere.
Add alt text where images convey information; decorative images should be handled appropriately.
Create a tiny sitemap.xml listing Home / Experiments / Team / Notes initially.
Create robots.txt saying essentially “yes, you may index this site” and pointing to the sitemap.
Register the domain with Google Search Console and probably Bing Webmaster Tools, then submit the sitemap. That also gives us useful diagnostics instead of guessing whether Google found the thing.
Later, when individual games get real pages, give each game its own meaningful title/description and actual textual content. That's vastly more useful than trying to stuff indie game indie games experimental game everywhere.

# Nom de domaine : raccorder

Ensuite on branche ton domaine Transient Gold dans Settings → Pages → Custom domain. GitHub Pages accepte bien les domaines racine du genre transient-gold.com ainsi que www.transient-gold.com.
Enfin on retourne chez ton registrar pour régler le DNS. Pour le domaine racine, GitHub donne actuellement ces quatre enregistrements A :
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

Et pour www, on met un CNAME vers ton adresse GitHub Pages (TON-USERNAME.github.io, sans le nom du repo). GitHub recommande de configurer à la fois l'apex et www; il pourra alors gérer la redirection entre les deux.

Je ferais de https://transient-gold.com l’adresse canonique, puisque c’est déjà celle qu’on a mise dans tes métadonnées Open Graph.

Il y a également une vérification de propriété du domaine via un enregistrement DNS TXT; GitHub la recommande pour éviter qu’un autre compte GitHub puisse revendiquer ton domaine pour Pages. On la fera aussi, mais ce n'est pas la peine de tout mélanger à la première étape.
