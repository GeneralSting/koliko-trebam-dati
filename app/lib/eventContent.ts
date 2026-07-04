// Per-event summary paragraph: plain-language "what the occasion is + roughly
// how much money is given" with the actual amount tiers from results.ts. Shown
// visibly on each event page AND reused as the FAQ answer, so the structured
// data always matches on-page content (Google's FAQ guideline). This is what
// answers the dominant broad query ("koliko novca dati za X") in one place.
export const EVENT_SUMMARIES: Record<string, string> = {
  // Obiteljska slavlja i sakramenti
  vjencanje:
    "Vjenčanje (svadba) jedno je od najvećih slavlja u Hrvatskoj, gdje se novčani dar tradicionalno predaje u kuverti. Uzvanici i prijatelji najčešće daruju 100 – 300 €, rodbina 150 – 400 €, a kumovi i najbliži i 500 – 1.000 €.",
  "rodenje-djeteta":
    "Rođenje djeteta (babinje) slavi se darom novim roditeljima, često uz opremu za bebu. Bake i djedovi obično daruju 150 - 300 €, kumovi 100 - 250 €, a ostala rodbina i prijatelji 50 - 150 €.",
  krstenje:
    "Krštenje je sakrament kojim dijete postaje član Crkve, a slavlje prati novčani dar u čestitki. Kumovi i najbliža obitelj daruju 150 - 300 €, uža rodbina 100 - 200 €, a šira rodbina i prijatelji 50 - 100 €.",
  "prva-pricest":
    "Prva pričest velik je dan za dijete i cijelu obitelj. Kumovi i bake / djedovi najčešće daruju 100 - 200 €, ostala rodbina 50 - 100 €, a prijatelji 30 - 50 €.",
  krizma:
    "Krizma (sveta potvrda) sakrament je kršćanske zrelosti i jedan od najdarežljivijih obiteljskih blagdana u Hrvatskoj. Krizmani kum najčešće daruje 200 - 500 €, uža obitelj (bake, djedovi, tetke, stričevi) 100 - 200 €, a šira rodbina i prijatelji 30 - 100 €.",
  "mlada-misa":
    "Mlada misa prva je svečana misa novozaređenog svećenika i velik događaj za cijelu župu, po opsegu sličan vjenčanju. Roditelji i najbliži daruju 150 - 300 €, rodbina i prijatelji 50 - 100 €, a poznanici i mještani 20 - 50 €.",
  zaruke:
    "Zaruke su uvod u vjenčanje i slave se skromnije, češće poklonom nego novcem. Roditelji ipak znaju darovati 100 - 200 € ili nakit, dok rodbina i prijatelji biraju poklon uz simboličnih 30 - 100 €.",
  "useljenje-partnera":
    "Useljenje s partnerom trenutak je kad par počinje živjeti zajedno, pa se umjesto novca najčešće daruje oprema za dom. Roditelji ipak pomažu s 100 - 300 € ili kućanskim aparatom, a braća i sestre poklon-bonom (50 - 150 €).",

  // Rođendani, godišnjice i ljubav
  rodendan:
    "Za rođendan odrasle osobe u Hrvatskoj se bliskima rijetko daruje čista gotovina; partneru i roditeljima radije se poklanja iskustvo ili nakit. Rodbina i prijatelji najčešće daju 20 - 50 €, a kolege skupno kupe zajednički poklon.",
  "rodendan-djecji":
    "Dječji rođendan slavi se poklonima, a ne novcem (osim za dječju štednju). Bake, djedovi i kumovi znaju dati 20 - 100 €, dok prijatelji i rodbina biraju igračke i kreativne setove u vrijednosti 15 - 50 €.",
  "prvi-rodendan":
    "Prvi rođendan u Hrvatskoj važan je događaj koji se slavi raskošno. Roditelji i najbliži često otvaraju štednju ili daruju zlato, bake i djedovi 20 - 100 €, a rodbina i prijatelji 20 - 50 €.",
  "godisnjica-braka":
    "Godišnjica braka traži osobnu pažnju, a ne kuvertu - partneri biraju putovanje, večeru ili nakit. Za velike jubileje (srebrni ili zlatni pir) djeca zajednički daruju 100 - 300 €, dok rodbina i prijatelji donose vino ili uspomenu.",
  "godisnjica-veze":
    "Godišnjica veze slavi se intimno i bez novca. Partneri jedno drugom daruju iskustvo ili poklon u vrijednosti 50 - 150 € - večeru, koncert, parfem ili zajednički izlet.",
  valentinovo:
    "Valentinovo je praznik zaljubljenih gdje se cijeni isključivo pažnja i romantika, a novac se ne daruje. Uobičajen poklon partneru (večera, cvijeće, čokolada, kozmetika) kreće se oko 30 - 100 €.",
  bozic:
    "Za Božić se u Hrvatskoj daruje poklonom ispod bora, rijetko čistim novcem. Partneru, djeci i roditeljima biraju se darovi u vrijednosti 30 - 150 €, a široj rodbini bazičan znak pažnje (kava, bombonijera, vino) 10 - 30 €.",
  uskrs:
    "Uskrs se slavi darivanjem djece i unučadi. Bake, djedovi i roditelji spremaju 'gnijezdo' s čokoladnim jajima i manjim novčanim iznosom (20 - 50 €), dok se domaćinima donosi simboličan blagdanski dar (pinca, šunka, cvijeće).",

  // Obrazovanje i posao
  "zavrsetak-osnovne":
    "Završetak osnovne škole prva je velika obrazovna prekretnica. Roditelji i bake / djedovi nagrađuju dijete s 30 - 100 €, a kumovi te starija braća i sestre prigodnim džeparcem (20 - 50 €).",
  "zavrsetak-srednje":
    "Završetak srednje škole obilježava se većim darovima. Roditelji izdvajaju 100 - 250 € (za vozački, laptop ili putovanje), a bake, djedovi, kumovi te braća i sestre 50 - 150 €.",
  "maturalna-zabava":
    "Maturalna zabava (maturalac) traži budžet za odijelo ili haljinu, frizuru i ulaznicu. Roditelji pokrivaju 100 - 300 €, bake i djedovi pomažu s 30 - 100 €, a braća i sestre daruju džeparac (20 - 50 €).",
  "upis-fakultet":
    "Upis na fakultet donosi ponos, ali i velike troškove (dom, literatura). Roditelji daruju 100 - 300 €, bake, djedovi i kumovi 50 - 150 €, a rodbina 30 - 100 € za početak studentskog života.",
  diploma:
    "Diploma se u Hrvatskoj najčešće čestita novcem u kuverti kao nagrada za trud. Roditelji daruju 150 - 500 €, braća i sestre 100 - 200 €, a bake, djedovi, kumovi i rodbina 50 - 150 €.",
  promaknuce:
    "Promaknuće se ne slavi kuvertom nego gestom. Partner ili prijatelji časte večerom ili simboličnim poklonom, a na poslu je običaj da promaknuta osoba počasti tim.",
  umirovljenje:
    "Odlazak u mirovinu slavi se prigodnim poklonom za buduće slobodno vrijeme. Uža obitelj daruje 50 - 150 €, prijatelji 20 - 50 €, a kolege na poslu skupljaju za zajednički poklon.",

  // Zahvalnice, prekretnice i ostalo
  "selidba-inozemstvo":
    "Odlazak u inozemstvo emotivan je trenutak koji se obilježava praktičnim ili sentimentalnim poklonom. Roditelji daruju 100 - 300 € džeparca za prve dane, a braća, sestre i prijatelji poklon uz 30 - 100 €.",
  "kupnja-nekretnine":
    "Kupnja prve nekretnine jedna je od najvećih životnih investicija, pa su i darovi izdašni. Roditelji tradicionalno daruju 500 - 2.000 €+, bake i djedovi 100 - 500 €, a braća i sestre 100 - 300 € (često za konkretan uređaj).",
  "useljenje-doma":
    "Za useljenje u novi dom donose se praktični pokloni ili novac za opremanje. Roditelji daruju 100 - 250 €, braća i sestre 50 - 150 €, a rodbina, prijatelji i kolege 20 - 100 € (uz tradicijski kruh i sol za dobrodošlicu).",
  "blagoslov-kuce":
    "Blagoslov kuće ili stana (najčešće oko blagdana Sveta tri kralja) uzvraća se dobrovoljnim novčanim prilogom - milodarom - koji se svećeniku predaje u kuverti. Uobičajeno je 10 - 50 € ovisno o veličini kućanstva, uz 5 - 10 € ministrantima u pratnji.",
  "zahvala-uciteljici":
    "Zahvala učiteljici ili profesoru na kraju školske godine u Hrvatskoj se organizira zajednički. Roditelji u razredu skupljaju 5 - 15 € po učeniku (ukupno 150 - 300 €); zakon pritom brani pojedinačne darove vrjednije od 66 €.",
  ostalo:
    "Za sve ostale prigode iznos novčanog dara prilagodite bliskosti s primateljem i formatu druženja. Za obiteljska slavlja uobičajeno je 30 - 100 €, a za prijatelje i kolege manji znak pažnje (10 - 30 €).",
};

const DEFAULT_SUMMARY =
  "Iznos novčanog dara prilagodite prigodi, vašem odnosu s primateljem i formatu proslave. U nastavku pogledajte preporuku za svaki odnos.";

/** Visible summary + FAQ answer for an event page. */
export function eventSummary(eventId: string): string {
  return EVENT_SUMMARIES[eventId] ?? DEFAULT_SUMMARY;
}

// Accusative form for the phrase "Koliko novca dati za ___?" - Croatian declines
// after "za" (krizma → krizmu, svadba → svadbu), and it's the exact form people
// search. Lowercase (holidays keep their capital). Titles/blog crumbs elsewhere
// still use the nominative event title.
export const EVENT_ACCUSATIVE: Record<string, string> = {
  // "svadba" outsearches "vjenčanje" ~6:1, so the synonym rides along in every
  // title/H1/description/FAQ (accusative "svadbu" matches "koliko dati za svadbu").
  // The URL and breadcrumb stay the correct main word, "vjenčanje".
  vjencanje: "vjenčanje (svadbu)",
  "rodenje-djeteta": "rođenje djeteta",
  krstenje: "krštenje",
  "prva-pricest": "prvu pričest",
  krizma: "krizmu",
  "mlada-misa": "mladu misu",
  zaruke: "zaruke",
  "useljenje-partnera": "useljenje s partnerom",
  rodendan: "rođendan",
  "rodendan-djecji": "dječji rođendan",
  "prvi-rodendan": "prvi rođendan",
  "godisnjica-braka": "godišnjicu braka",
  "godisnjica-veze": "godišnjicu veze",
  valentinovo: "Valentinovo",
  bozic: "Božić",
  uskrs: "Uskrs",
  "zavrsetak-osnovne": "završetak osnovne škole",
  "zavrsetak-srednje": "završetak srednje škole",
  "maturalna-zabava": "maturalnu zabavu",
  "upis-fakultet": "upis na fakultet",
  diploma: "diplomu",
  promaknuce: "promaknuće",
  umirovljenje: "umirovljenje",
  "selidba-inozemstvo": "selidbu u inozemstvo",
  "kupnja-nekretnine": "kupnju nekretnine",
  "useljenje-doma": "useljenje u novi dom",
  "blagoslov-kuce": "blagoslov kuće",
  "zahvala-uciteljici": "zahvalu učiteljici",
  sprovod: "sprovod",
  ostalo: "ostalo",
};

/** Accusative event name for "Koliko novca dati za ___?"; falls back to the id-title. */
export function eventAccusative(
  eventId: string,
  fallbackTitle: string,
): string {
  return EVENT_ACCUSATIVE[eventId] ?? fallbackTitle;
}
