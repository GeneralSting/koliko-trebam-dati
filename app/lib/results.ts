import { GiftResult } from "@/app/types";

/**
 * Standardized Relation IDs used across the application:
 * - partner: Spouses, dating partners, significant others
 * - roditelj: Parents, step-parents
 * - baka-djed: Grandparents (Bake i djedovi)
 * - dijete: Sons, daughters (Djeca)
 * - unuce: Grandchildren (Unučad)
 * - brat-sestra: Siblings (Braća, sestre), including close aunts/uncles
 * - kum: Godparents (vjenčani kumovi, krsni, krizmani kumovi)
 * - rodak: Cousins, extended family (Rodbina)
 * - prijatelj: Friends, close friends (Prijatelji, solo ili parovi)
 * - kolega: Co-workers, business partners, team members
 * - susjed: Neighbors
 * - poznanik: Acquaintances, former colleagues
 * - skupno-razred: Whole class/parents pooled contribution (e.g. for teachers)
 */

export const RESULTS: Record<string, Record<string, GiftResult>> = {
  // =========================================================================
  // 1. OBITELJSKA SLAVLJA I SAKRAMENTI (Main Group: obitelj-sakramenti)
  // =========================================================================
  vjencanje: {
    kum: {
      amount: "500 – 1.000 €",
      notes: [
        "Uloga vjenčanog kuma ili kume nosi najveću tradicijsku i financijsku odgovornost u Hrvatskoj.",
        "Iznos od 500 € do 800 € predstavlja realni standard za većinu kumova u urbanim sredinama.",
        "U Slavoniji i Zagorju običaji nalažu raskošnije darivanje koje nerijetko doseže i 1.000 €, dok Dalmacija naginje donjoj granici tog raspona.",
        "Uz novac, preporučuje se darovati i sitnu personaliziranu uspomenu za mladence.",
      ],
    },
    roditelj: {
      amount: "300 – 500 €",
      notes: [
        "Roditelji često preuzimaju na sebe financiranje same dvorane, glazbe ili drugih velikih troškova.",
        "Ako ne sudjelujete izravno u pokrivanju troškova organizacije, ovaj iznos je uobičajeni osobni dar u kuverti za početak zajedničkog života mladenaca.",
      ],
    },
    "brat-sestra": {
      amount: "250 – 400 €",
      notes: [
        "Dar brata ili sestre izražava iznimnu obiteljsku bliskost i pozicionira se odmah iza roditeljskog dara.",
        "Iznos prilagodite ovisno o tome dolazite li sami ili s vlastitom obitelji/partnerom (ako dolazite u paru s obitelji, ciljajte na gornju granicu).",
      ],
    },
    "baka-djed": {
      amount: "150 – 300 €",
      notes: [
        "Bake i djedovi s ponosom daruju unuke za vjenčanje.",
        "Iznos se prilagođava mogućnostima mirovine, no često se kombinira s nekim tradicijskim obiteljskim nakitom ili uspomenom.",
      ],
    },
    rodak: {
      amount: "150 – 250 €",
      notes: [
        "Za rodbinu je ključno u potpunosti pokriti trošak vlastite stolice te osigurati lijep preostali neto iznos mladencima.",
        "U Zagrebu i na obali bazična cijena stolice penje se na 90 – 120 €, stoga je ovaj raspon optimalan za pristojan dar.",
        "Ukoliko dolazite u paru ili s djecom, preporučuje se pomicanje iznosa prema gornjoj granici.",
      ],
    },
    prijatelj: {
      amount: "120 – 300 €",
      notes: [
        "Ako na vjenčanje dolazite sami kao prijatelj, standardni iznos u kuverti je 120 – 150 € kako biste pokrili stolicu i ostavili dar.",
        "Ako na vjenčanje dolazite u paru, preporučuje se pomicanje iznosa prema gornjoj granici.",
      ],
    },
    kolega: {
      amount: "100 – 150 €",
      notes: [
        "Kao kolega s posla, darom prvenstveno pokrivate troškove vlastitog sudjelovanja na večeri.",
        "Ukoliko idete bez pratnje, 100 € je sasvim korektan i prihvatljiv iznos, dok se za bliže kolege izdvaja 150 €.",
      ],
    },
    susjed: {
      amount: "50 – 100 €",
      notes: [
        "Za susjede kod kojih niste u najužem krugu uzvanika, dar se prilagođava formatu proslave.",
        "Ako ste pozvani samo na primanje kod kuće ili u crkvu bez odlaska na večeru u restoran, 50 € je potpuno primjereno.",
      ],
    },
  },

  "rodenje-djeteta": {
    roditelj: {
      amount: "150 – 300 €",
      notes: [
        "Djedovi i bake u Hrvatskoj iznimno raskošno slave rođenje unučadi.",
        "Često ovaj novčani iznos daju roditeljima kako bi pomogli u kupnji kapitalne opreme (kolica, krevetić, autosjedalica).",
        "Pri prvom posjetu bebi ('babinje') novac se tradicionalno stavlja 'pod glavu', uz prvu praktičnu opremu.",
      ],
    },
    kum: {
      amount: "100 – 250 €",
      notes: [
        "Ako ste izabrani za budućeg krsnog kuma djeteta, vaš dar povodom rođenja postavlja temelje za buduću duhovnu ulogu.",
        "Uz novac, kumovi često već u ovoj fazi daruju prigodne trajne uspomene ili zlatnik.",
      ],
    },
    "brat-sestra": {
      amount: "100 – 150 €",
      notes: [
        "Kao ujak, stric ili tetka, vaš dar za rođenje nećaka ili nećakinje odražava veliku obiteljsku bliskost.",
        "Pri prvom posjetu bebi ('babinje') uz novac je običaj donijeti i paket pelena, robicu te slastice za novu majku.",
      ],
    },
    rodak: {
      amount: "50 – 100 €",
      notes: [
        "Standardan dar rodbine povodom rođenja novog člana obitelji.",
        "Tradicionalni običaj stavljanja novca 'pod glavu' (babinje) danas se prakticira u ovom rasponu, uz igračku ili odjeću.",
      ],
    },
    prijatelj: {
      amount: "50 – 100 €",
      notes: [
        "Izvrsna alternativa čistom novcu su personalizirani darovi za dječju sobu.",
      ],
    },
    kolega: {
      amount: "20 – 30 €",
      notes: [
        "Ako posjećujete kolegu privatno kući povodom rođenja djeteta, manji novčani iznos uz paket pelena ili kozmetiku za bebe je najčešći izbor.",
        "U uredima se uobičajeno skuplja zajednički doprinos za kupnju jednog većeg poklona.",
      ],
    },
  },

  krstenje: {
    kum: {
      amount: "150 – 300 €",
      notes: [
        "Krsni kum ili kuma imaju najvažniju ulogu na krštenju djeteta.",
        "Minimalni standard za kuma je 150 €, a tradicijski se daruje poklon kao trajna uspomena.",
      ],
    },
    "baka-djed": {
      amount: "150 – 300 €",
      notes: [
        "Bake i djedovi često u potpunosti financiraju obiteljski ručak nakon krštenja ili daruju veći iznos koji roditelji stavljaju na dječju štednju.",
      ],
    },
    "brat-sestra": {
      amount: "100 – 200 €",
      notes: [
        "Kao bliska obitelj (stric, ujak, tetka), preporučuje se iznos koji podržava roditelje u pokrivanju troškova slavlja.",
        "Dar se najčešće stavlja u prigodnu čestitku.",
      ],
    },
    rodak: {
      amount: "50 – 100 €",
      notes: [
        "Za širu rodbinu, iznos od 50 € smatra se prikladnim ako se radi o manjem, intimnijem slavlju, dok se kod većih restoranskih proslava penje prema 100 €.",
      ],
    },
    prijatelj: {
      amount: "50 – 100 €",
      notes: [
        "Za prijatelje obitelji koji su pozvani na slavlje krštenja, 50 € je uobičajen bazični iznos za kuvertu.",
      ],
    },
  },

  "prva-pricest": {
    kum: {
      amount: "100 – 200 €",
      notes: [
        "Iako je prva pričest duhovni sakrament, kumovi tradicionalno izdvajaju veći iznos.",
        "Uz novčani iznos u čestitki, izrazito je cijenjeno darovanje Biblije s posvetom, srebrnog nakita ili personaliziranih uspomena.",
      ],
    },
    "baka-djed": {
      amount: "100 – 200 €",
      notes: [
        "Bake i djedovi daruju novac izravno djetetu, često kako bi mu otvorili prvu dječju štednju ili kupili željeni trajniji dar.",
      ],
    },
    "brat-sestra": {
      amount: "50 – 100 €",
      notes: [
        "Ujaci, stričevi i tetke obično izdvajaju oko 100 € ako se proslava organizira u restoranu, ili 50 € za kućno obiteljsko okupljanje.",
      ],
    },
    rodak: {
      amount: "50 – 100 €",
      notes: [
        "Rodbina se u većini slučajeva odlučuje za okrugli iznos od 50 € u čestitki, što se u Hrvatskoj smatra zlatnim standardom za prvu pričest djeteta.",
      ],
    },
    prijatelj: {
      amount: "30 – 50 €",
      notes: [
        "Prijatelji obitelji ne moraju izdvajati velike iznose. 50 € je gornja granica.",
        "Mnogi se odlučuju za kreativne poklone umjesto novca.",
      ],
    },
  },

  krizma: {
    kum: {
      amount: "200 – 500 €",
      notes: [
        "Sakrament krizme bilježi najveći rast očekivanih iznosa u Hrvatskoj.",
        "Krizmani kumovi u urbanim sredinama rijetko daruju manje od 200 do 300 €, dok u nekim regijama ti iznosi dosežu i 500 €.",
        "Preporučena strategija je podjela budžeta: 50% u gotovini za djetetove potrebe, a 50% u trajnom obliku (npr. kvalitetan ručni sat, srebrni nakit...).",
      ],
    },
    "baka-djed": {
      amount: "100 – 200 €",
      notes: [
        "Bake i djedovi daruju novčanu potporu adolescentu, svjesni da u tim godinama krizmanici već sami planiraju potrošnju i cijene financijsku samostalnost.",
      ],
    },
    "brat-sestra": {
      amount: "100 – 200 €",
      notes: [
        "Tetke, ujaci i stričevi prate bliski obiteljski standard te daruju iznose koji djetetu omogućuju kupnju željene tehničke opreme (mobitel, laptop, konzole) ili sportske opreme.",
      ],
    },
    rodak: {
      amount: "50 – 100 €",
      notes: [
        "Za rodbinu koja nije u najužem krugu, 50 € je sasvim prihvatljivo, dok se za bliže bratiće i sestrične izdvaja 100 €.",
      ],
    },
    prijatelj: {
      amount: "30 – 50 €",
      notes: [
        "Obiteljski prijatelji se drže umjerenih iznosa. Poklon od 50 € uz prigodnu čestitku smatra se izrazito korektnim.",
      ],
    },
  },

  "mlada-misa": {
    roditelj: {
      amount: "150 – 300 €",
      notes: [
        "Mlada misa (prva misa novozaređenog svećenika) u Hrvatskoj je ogroman, tradicionalan događaj koji po veličini slavlja često podsjeća na vjenčanje.",
        "Roditelji u potpunosti podržavaju mladomisnika u organizaciji ove zahtjevne proslave i daruju osobni doprinos.",
      ],
    },
    "baka-djed": {
      amount: "100 – 250 €",
      notes: [
        "Mlada misa je za bake i djedove jedan od najvažnijih i najemotivnijih događaja u životu, pa su njihovi darovi izuzetno velikodušni.",
        "Uz novac, tradicionalno poklanjaju i duboko osobne vjerske obiteljske uspomene (npr. stari obiteljski krunic, bibliju ili zlatni lančić).",
      ],
    },
    "brat-sestra": {
      amount: "100 – 200 €",
      notes: [
        "Braća i sestre aktivno sudjeluju u organizaciji i daruju značajne priloge u gotovini za početak pastoralnog rada mladomisnika.",
      ],
    },
    rodak: {
      amount: "50 – 100 €",
      notes: [
        "Rodbina daruje novčane kuverte mladomisniku kao pomoć pri opremanju njegove buduće župe ili osobnih potreba za rad.",
        "Obavezno se prilaže i čestitka s duhovnim citatom.",
      ],
    },
    prijatelj: {
      amount: "50 – 100 €",
      notes: [
        "Za prijatelje koji su pozvani na svečani ručak mlade mise, iznosom se pokrivaju troškovi stolice.",
      ],
    },
    susjed: {
      amount: "30 – 50 €",
      notes: [
        "Susjedi u tradicionalnim sredinama često pomažu pri uređenju mjesta i proslave, te u čestitki predaju manji novčani dar.",
      ],
    },
    poznanik: {
      amount: "20 – 30 €",
      notes: [
        "Za poznanike i mještane koji dolaze samo na samu ceremoniju mise bez odlaska na svečani ručak, simboličan dar u čestitki je lijepa gesta.",
      ],
    },
  },

  zaruke: {
    roditelj: {
      amount: "Poklon / 100 – 200 €",
      notes: [
        "Zaruke u Hrvatskoj predstavljaju uvod u vjenčanje. Roditelji s obje strane često daruju nakit (poput tradicijskih zlatnih naušnica) ili novčani dar u ovoj vrijednosti.",
        "Cilj je olakšati prve organizacijske korake oko predstojećeg vjenčanja.",
      ],
    },
    "brat-sestra": {
      amount: "Poklon / 50 – 100 €",
      notes: [
        "Braća i sestre zaručnika rado daruju maštovite i osobne poklone.",
        "Knjiga planer za vjenčanja, personalizirani uokvireni kolaž fotografija para ili boca vrhunskog šampanjca s kristalnim čašama uobičajen su i cijenjen dar.",
      ],
    },
    rodak: {
      amount: "Poklon / 50 €",
      notes: [
        "Rodbina na zaruke rijetko donosi kuvertu s velikim iznosima.",
        "Standard je donijeti bocu dobrog vina, cvijeće za zaručnicu i prigodan poklon za zajednički dom.",
      ],
    },
    prijatelj: {
      amount: "Poklon / 30 – 50 €",
      notes: [
        "Prijatelji se odlučuju za kreativne i zabavne darove koji slave ljubav para.",
        "Izvrsna opcija su i šaljive knjige o braku, romantični setovi za opuštanje ili uokvirena fotografija s njihova zajedničkog putovanja.",
      ],
    },
  },

  "useljenje-partnera": {
    partner: {
      amount: "Poklon / Iskustvo",
      notes: [
        "Trenutak kada partneri odluče početi živjeti zajedno pod istim krovom.",
        "Novac se ovdje nikako ne poklanja. Fokus je na zajedničkom opremanju doma, uplaćivanju romantičnog wellness vikenda ili kupnji personaliziranog ključa s ugraviranim datumom.",
      ],
    },
    roditelj: {
      amount: "100 – 300 € / Vrijedan kućanski aparat",
      notes: [
        "Roditelji u Hrvatskoj ovaj korak shvaćaju vrlo ozbiljno i žele pomoći djetetu da stane na noge.",
        "Često daju veći novčani iznos u kuverti za prvu stanarinu/polog ili u potpunosti financiraju ključne kućanske aparate (perilica rublja, hladnjak, set posuđa).",
      ],
    },
    "brat-sestra": {
      amount: "50 – 150 € / Poklon bon",
      notes: [
        "Braća i sestre najčešće daruju praktične stvari koje par sam izabere.",
        "Često kupuju poklon bonove za trgovine namještajem i home-dekorom (IKEA, Emmezeta, Lesnina) ili daruju male kućanske aparate poput aparata za kavu, miksera ili tostera.",
      ],
    },
    prijatelj: {
      amount: "Poklon",
      notes: [
        "Prijatelji koji dolaze na prvo druženje u zajednički stan obično donose simboličan poklone za useljenje: bocu pića, mirisne svijeće, ukrasnu biljku (poput kaktusa ili sanseverije) ili set čaša.",
      ],
    },
  },

  // =========================================================================
  // 2. ROĐENDANI, GODIŠNJICE I LJUBAV (Main Group: rodendani-ljubav)
  // =========================================================================
  rodendan: {
    partner: {
      amount: "100 – 250 € (Iskustvo / Nakit)",
      notes: [
        "Za rođendan bračnog ili izvanbračnog partnera novčana kuverta se ne prakticira jer se smatra hladnom i neosobnom.",
        "Preporučuje se investiranje ovog budžeta u zajedničko iskustvo (wellness vikend, privatna tura, romantična večera) ili u kvalitetan komad nakita ili tehnike.",
      ],
    },
    roditelj: {
      amount: "50 – 150 €",
      notes: [
        "Roditelji svojoj odrasloj djeci za rođendan često daruju novac u kuverti kako bi si sami kupili ono što im je najpotrebnije, ili im financiraju konkretan trošak (npr. registraciju auta).",
      ],
    },
    dijete: {
      amount: "50 – 150 €",
      notes: [
        "Odrasla djeca svojim roditeljima obično daruju praktične i korisne stvari, ili kuvertu ako znaju da roditelji štede za neku veću želju.",
        "Uz dar obavezno ide i bogat buket cvijeća ili kvalitetno vino.",
      ],
    },
    "baka-djed": {
      amount: "30 – 100 €",
      notes: [
        "Bake i djedovi unucima rado daruju novac 'za džeparac', posebno ako su unuci studenti ili srednjoškolci.",
        "Iznos se u potpunosti prilagođava mogućnostima i visini mirovine.",
      ],
    },

    "brat-sestra": {
      amount: "20 – 80 €",
      notes: [
        "Brat ili sestra obično biraju kombinaciju manjeg novčanog iznosa i nečega što slavljenik osobno priželjkuje (npr. kozmetički set ili bon u omiljenoj trgovini).",
      ],
    },
    rodak: {
      amount: "20 – 50 €",
      notes: [
        "Rodbina se za uobičajene rođendane najčešće odlučuje za praktičan poklon u ovoj vrijednosti ili poklon-bon u nekoj od većih trgovina odjećom ili kozmetikom.",
      ],
    },
    prijatelj: {
      amount: "20 – 50 €",
      notes: [
        "Za uobičajene rođendane prijatelja, darovi u vrijednosti od 30 do 50 € su apsolutni standard.",
        "Umjesto gotovine, radije odaberite personalizirani dar koji pokazuje da ste uložili pažnju i vrijeme.",
      ],
    },
    kolega: {
      amount: "10 – 20 € (Skupno)",
      notes: [
        "Kolege na poslu obično ne daju pojedinačne kuverte.",
        "Praksa je da se u uredu skuplja simboličan iznos (3 do 5 € po osobi) kako bi se kupio jedan zajednički poklon ili bon.",
      ],
    },
  },

  "rodendan-djecji": {
    roditelj: {
      amount: "Poklon",
      notes: [
        "Roditelji djeci za rođendan kupuju konkretne igračke, sportske rekvizite (bicikl, role) ili konzole.",
        "Izbjegavajte davanje samog novca djeci mlađoj od 12 godina jer ona nemaju razvijenu kognitivnu percepciju apstraktne vrijednosti novca.",
      ],
    },
    "baka-djed": {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Bake i djedovi daruju dječje rođendane s velikom pažnjom, često kombinirajući novac za dječju štednju i omiljene igračke i slatkiše.",
      ],
    },
    "brat-sestra": {
      amount: "20 – 80 €",
      notes: [
        "Tetke, ujaci i stričevi najradije kupuju veće, atraktivne igračke ili opremu u dogovoru s roditeljima.",
        "Ako roditelji štede za djetetove buduće potrebe, kuverta s ovim iznosom je također vrlo dobrodošla.",
      ],
    },
    kum: {
      amount: "20 – 100 €",
      notes: [
        "Krsni ili krizmani kumovi za dječje rođendane često daruju novac ili točno određeni, veći poklon koji dijete želi.",
        "Uvijek se preporučuje kombinirati novac s prigodnim slatkim paketom.",
      ],
    },
    rodak: {
      amount: "20 – 50 €",
      notes: [
        "Rodbina djetetu donosi darove u vrijednosti od 20 do 50 €, prilagođene njegovom uzrastu (npr. slikovnice, društvene igre ili setovi za crtanje).",
      ],
    },
    prijatelj: {
      amount: "15 – 30 €",
      notes: [
        "Najpopularnije su kreativne kutije, Lego setovi, društvene igre ili personalizirani setovi s imenom djeteta.",
      ],
    },
  },

  "prvi-rodendan": {
    roditelj: {
      amount: "Poklon (uspomena) / 50 – 200 €",
      notes: [
        "Prvi rođendan u Hrvatskoj je povijesno iznimno važan događaj koji se slavi raskošno, često uz veća obiteljska okupljanja.",
        "Roditelji djetetu pripremaju veliku proslavu, a osobni dar je često trajan (poput otvaranja dugoročne štednje ili kupnje investicijskog zlata).",
      ],
    },
    "baka-djed": {
      amount: "20 – 100 €",
      notes: [
        "Djedovi i bake za prvi rođendan unuka izdvajaju veće iznose.",
        "Ovaj novčani dar služi za djetetov fond, a često se kombinira s nekim sentimentalnim zlatnim nakitom koji se čuva za punoljetnost.",
      ],
    },
    "brat-sestra": {
      amount: "Poklon / 20 – 100 €",
      notes: [
        "Tetke, ujaci i stričevi za prvi rođendan nećaka izdvajaju više nego za uobičajene rođendane.",
        "Novac se predaje roditeljima, a djetetu se donosi velika plišana igračka ili prva guralica.",
      ],
    },
    kum: {
      amount: "50 – 100 €",
      notes: [
        "Krsni kum ima posebnu ulogu na prvom rođendanu kumčeta. Njegov dar je izdašan i postavlja standard za sve buduće rođendane.",
        "Često se daruje gotovina u kombinaciji s personaliziranim okvirom s podacima o rođenju.",
      ],
    },
    rodak: {
      amount: "20 – 50 €",
      notes: [
        "Bliska rodbina donosi kuvertu u ovom rasponu kako bi podržala roditelje u organizaciji prve velike proslave djeteta.",
      ],
    },
    prijatelj: {
      amount: "20 – 30 €",
      notes: [
        "Prijatelji obitelji donose darove u ovoj vrijednosti. Gotovina je najčešći izbor, no personalizirani poklon-setovi su znatno maštovitije rješenje.",
      ],
    },
  },

  "godisnjica-braka": {
    partner: {
      amount: "Poklon / Putovanje (100 – 300 €)",
      notes: [
        "Godišnjica braka zahtijeva osobnu pažnju, a ne kuvertu s gotovinom.",
        "Investirajte u zajedničko putovanje, romantičnu večeru na neobičnoj lokaciji ili u nakit koji simbolizira godine provedene zajedno.",
      ],
    },
    dijete: {
      amount: "100 – 300 €",
      notes: [
        "Djeca svojim roditeljima za velike, okrugle jubileje (25. srebrni pir ili 50. zlatni pir) često organiziraju obiteljski ručak ili im uplaćuju zajedničko putovanje.",
        "U tim situacijama, ovaj novčani raspon služi kao zajednički obiteljski doprinos proslavi.",
      ],
    },
    rodak: {
      amount: "Poklon (Vino / Uspomena)",
      notes: [
        "Rodbini se za godišnjicu braka ne poklanja novac. To se u Hrvatskoj smatra neobičnim i hladnim činom.",
        "Donosi se kvalitetno arhivsko vino, prigodna bombonijera ili personalizirani drveni ukras s ugraviranim datumom vjenčanja.",
      ],
    },
    prijatelj: {
      amount: "Poklon (Vino / Buket)",
      notes: [
        "Prijateljima se za godišnjicu braka daruju isključivo fizički i pažljivo odabrani pokloni.",
        "Prikladan izbor je buket od dugotrajnih satenskih ili sapunskih ruža te boca finog likera.",
      ],
    },
  },

  "godisnjica-veze": {
    partner: {
      amount: "Poklon / Iskustvo (50 – 150 €)",
      notes: [
        "Godišnjica veze slavi se intimno.",
        "Standard je darovati romantičnu večeru, ulaznice za koncert omiljenog benda, kvalitetan parfem ili zajednički izlet izvan grada.",
      ],
    },
  },

  valentinovo: {
    partner: {
      amount: "Poklon / Večera (30 – 100 €)",
      notes: [
        "Valentinovo je praznik zaljubljenih gdje se cijeni isključivo pažnja i romantika.",
        "Novčani darovi su strogo isključeni. Standardan poklon je večera u ugodnom restoranu, buket svježeg cvijeća, čokoladne delicije ili sitni kozmetički set.",
      ],
    },
  },

  bozic: {
    partner: {
      amount: "Poklon / 50 – 150 €",
      notes: [
        "Božićni pokloni za partnera biraju se s ljubavlju i unaprijed.",
        "Ovaj budžet se troši na toplu zimsku odjeću, tehničke sitnice, knjige koje partner želi ili na kozmetičke setove.",
      ],
    },
    dijete: {
      amount: "Poklon / 30 – 80 €",
      notes: [
        "Roditeljima se pod bor donose praktični darovi koji im uljepšavaju blagdane: kvalitetna kava, blagdanske delikatese, topli šalovi ili kućni ogrtači.",
      ],
    },
    roditelj: {
      amount: "Poklon / 30 – 100 €",
      notes: [
        "Djeca se najviše vesele božićnim poklonima.",
        "Budžet se troši na igračke, slikovnice, društvene igre ili sportske artikle koje su djeca poželjela u svojim pismima Djed Božićnjaku.",
      ],
    },
    "baka-djed": {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Bake i djedovi unučad rado daruju slatkim paketima, igračkama ili prigodnim novčanim iznosom u čestitki koji unučad koristi za zimske praznike.",
      ],
    },
    "brat-sestra": {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Za braću i sestre pod bor se stavljaju sitnice koje odražavaju njihove hobije, knjige, društvene igre za obiteljska blagdanska druženja ili kozmetika.",
      ],
    },
    rodak: {
      amount: "Poklon / 10 – 30 €",
      notes: [
        "Za širu rodbinu s kojom se susrećete tijekom blagdana, donosi se bazičan znak pažnje: kava, bombonijera, blagdanska svijeća ili prigodno vino.",
      ],
    },
  },

  uskrs: {
    "baka-djed": {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Uskrsni običaji u Hrvatskoj uključuju darivanje djece i unučadi.",
        "Bake i djedovi unucima daruju čokoladna jaja, slatkiše te manji novčani iznos u uskrsnoj čestitki za proljetni džeparac.",
      ],
    },
    roditelj: {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Roditelji djeci za Uskrs pripremaju 'gnijezdo' ispunjeno čokoladnim jajima, proljetnom robicom ili manjim igračkama za igru na otvorenom.",
      ],
    },
    dijete: {
      amount: "Simboličan Poklon",
      notes: [
        "Roditeljima se za Uskrs tradicionalno donosi bazičan znak pažnje: uskrsna pinca (sirnica), domaća šunka, kava ili proljetno cvijeće za blagdanski stol.",
      ],
    },
  },

  // =========================================================================
  // 3. OBRAZOVANJE, POSAO I PREKRETNICE (Main Group: obrazovanje-karijera)
  // =========================================================================
  "zavrsetak-osnovne": {
    roditelj: {
      amount: "Poklon / 50 – 100 €",
      notes: ["Završetak osnovne škole je prva velika obrazovna prekretnica."],
    },
    "baka-djed": {
      amount: "30 – 100 €",
      notes: [
        "Bake i djedovi s ponosom nagrađuju unuka za uspješan završetak osnovne škole i upis u željenu srednju školu.",
        "Novčani dar se predaje izravno djetetu u prigodnoj čestitki.",
      ],
    },
    "brat-sestra": {
      amount: "Poklon / 30 – 50 €",
      notes: [
        "Starija braća i sestre daruju mlađima sitnice koje će im koristiti u srednjoj školi (modni dodaci, ruksak) ili ih vode na prigodno slavlje.",
      ],
    },
    kum: {
      amount: "20 – 50 €",
      notes: [
        "Kao krsni ili krizmani kum, prigodno je nagraditi trud djeteta prigodnim džeparcem za nadolazeće ljetne praznike.",
      ],
    },
  },

  "zavrsetak-srednje": {
    roditelj: {
      amount: "Poklon / 100 – 250 €",
      notes: [
        "Završetak srednje škole roditelji obilježavaju većim darovima.",
        "Ovaj budžet se često usmjerava na sufinanciranje vozačkog ispita, kupnju prvog prijenosnog računala za faks ili prvo samostalno ljetovanje s društvom.",
      ],
    },
    "baka-djed": {
      amount: "50 – 150 €",
      notes: [
        "Bake i djedovi daruju unucima značajniju financijsku potporu, svjesni da predstoje veliki troškovi priprema za državnu maturu i upis na fakultet.",
      ],
    },
    "brat-sestra": {
      amount: "50 – 100 €",
      notes: [
        "Brat ili sestra daruju iznos koji maturantu pomaže u pokrivanju ljetnih troškova ili kupnji odjeće za nadolazeće razdoblje života.",
      ],
    },
    kum: {
      amount: "100 – 200 €",
      notes: [
        "Kumovi tradicionalno izdašno nagrađuju maturante. Novčana kuverta u ovom rasponu smatra se izrazito pristojnim i primjerenim darom.",
      ],
    },
  },

  "maturalna-zabava": {
    roditelj: {
      amount: "100 – 300 €",
      notes: [
        "Ovaj iznos pokriva isključivo izravne troškove same maturalne večeri.",
        "Uključuje kupnju svečanog odijela ili haljine, frizuru, šminku, te samu ulaznicu za dvoranu koja je posljednjih godina pod utjecajem inflacije znatno poskupjela.",
      ],
    },
    "baka-djed": {
      amount: "30 – 100 €",
      notes: [
        "Bake i djedovi rado uskaču kao financijska pomoć roditeljima kako bi se maturantu osigurala najbolja garderoba i džeparac za samu maturalnu večer.",
      ],
    },
    "brat-sestra": {
      amount: "20 – 50 €",
      notes: [
        "Simboličan doprinos džeparcu za maturalnu večer kako bi se osiguralo nesmetano slavlje i plaćanje taksija nakon zabave.",
      ],
    },
  },

  "upis-fakultet": {
    roditelj: {
      amount: "100 – 300 €",
      notes: [
        "Upis na fakultet roditeljima donosi ponos, ali i velike logističke troškove (useljenje u studentski dom ili stan, kupnja stručne literature).",
        "Ovaj novčani iznos služi kao bazični fond za prve tjedne studentskog života.",
      ],
    },
    "baka-djed": {
      amount: "50 – 150 €",
      notes: [
        "Djedovi i bake unucima pružaju važnu financijsku potporu za lakši početak života u novom studentskom gradu.",
      ],
    },
    kum: {
      amount: "50 – 150 €",
      notes: [
        "Kumovi rado čestitaju upis na fakultet novčanom kuvertom koja studentu jamči mirniji početak akademske godine.",
      ],
    },
    rodak: {
      amount: "30 – 100 €",
      notes: [
        "Rodbina daruje prigodan novčani iznos u čestitki koji studentu služi za kupnju potrebnog pribora ili opremanje studentske sobe.",
      ],
    },
  },

  diploma: {
    kum: {
      amount: "50 – 150 €",
      notes: [
        "Kao kum ili kuma, vaš dar za završetak fakulteta ima karakter nagrade za trud.",
        "Uz novac, prigodno je pokloniti i kvalitetno gravirano nalivpero ili stručnu knjigu s osobnom posvetom.",
      ],
    },
    roditelj: {
      amount: "150 – 500 €",
      notes: [
        "Roditelji često daruju najveće iznose za diplomu, tretirajući to kao kapitalnu pomoć djetetu za prve samostalne korake i traženje posla.",
        "Ponekad se novac zamjenjuje za kupnju profesionalnog prijenosnog računala.",
      ],
    },
    "brat-sestra": {
      amount: "100 – 200 €",
      notes: [
        "Brat ili sestra daruju iznos koji diplomantu olakšava tranziciju s fakulteta na posao (npr. za kupnju prvog poslovnog odijela ili garderobe).",
      ],
    },
    "baka-djed": {
      amount: "50 – 150 €",
      notes: [
        "Bake i djedovi s ponosom nagrađuju unuke prigodnim novčanim darom, često u okviru svojih financijskih mogućnosti i mirovine.",
      ],
    },
    rodak: {
      amount: "50 – 150 €",
      notes: [
        "Rodbina daruje novac u kuverti jer se to u Hrvatskoj smatra najpraktičnijim načinom čestitanja diplome.",
      ],
    },
    prijatelj: {
      amount: "30 – 50 €",
      notes: [
        "Prijatelji obično ne daruju velike iznose novca.",
        "Mnogo je popularnije pokloniti dizajnersku platnenu torbu (tote bag) s unikatnim ilustracijama ili organizirati zajednički izlazak na piće.",
      ],
    },
  },

  "novi-posao": {
    partner: {
      amount: "Čašćenje / Poklon",
      notes: [
        "Dobivanje novog posla slavi se zajedničkom večerom ili bocom dobrog pjenušca.",
        "Partner obično daruje sitnicu za novi ured (npr. personaliziranu termosicu ili kožni planer).",
      ],
    },
    prijatelj: {
      amount: "Simboličan Poklon / Cuga",
      notes: [
        "Prijatelju se čestita na novom poslu zajedničkim odlaskom na piće koje vi plaćate, ili mu se poklanja planer, šalica s duhovitim natpisom ili čokolada.",
      ],
    },
    roditelj: {
      amount: "Čestitka / Sitnica",
      notes: [
        "Roditelji djetetu čestitaju na novom poslu svečanim obiteljskim ručkom i toplom čestitkom s podrškom za novi početak.",
      ],
    },
  },

  promaknuce: {
    partner: {
      amount: "Čašćenje / Večera",
      notes: [
        "Za promaknuće partnera gotovinske kuverte nisu prikladne.",
        "Najbolja gesta je priprema svečane večere kod kuće ili odlazak u omiljeni restoran radi proslave uspjeha na poslovnom planu.",
      ],
    },
    prijatelj: {
      amount: "Simboličan Poklon",
      notes: [
        "Prijatelju se čestita promaknuće simboličnim darom poput boce kvalitetnog pića, prigodne čokolade ili sitnice za radni stol.",
      ],
    },
    kolega: {
      amount: "Čašćenje tima",
      notes: [
        "U radnim kolektivima u Hrvatskoj običaj je da promaknuta osoba počasti tim (gablec, kolači ili piće).",
        "Kolege iz tima mogu uzvratiti kupnjom zajedničkog planera ili sitnice za radni stol s potpisima cijelog tima.",
      ],
    },
  },

  umirovljenje: {
    dijete: {
      amount: "Poklon (50 – 150 €)",
      notes: [
        "Uža obitelj slavi roditeljev odlazak u mirovinu prigodnim obiteljskim okupljanjem i darivanjem praktičnog poklona za buduće slobodno vrijeme (npr. oprema za hobije, knjige ili wellness bon).",
      ],
    },
    kolega: {
      amount: "10 – 20 € (Skupno u uredu)",
      notes: [
        "U većini hrvatskih tvrtki, odlazak u mirovinu prati skupljanje doprinosa u uredu (3 do 5 € po osobi).",
        "Zajednički prikupljeni iznos koristi se za kupnju kvalitetnog ručnog sata, umjetničke slike ili poklon-bona za putovanje.",
      ],
    },
    prijatelj: {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Prijatelju koji odlazi u mirovinu daruje se nešto što odražava njegove interese (vrtlarenje, ribolov, čitanje) ili prigodna boca vrhunskog pića.",
      ],
    },
  },

  // =========================================================================
  // 4. ZAHVALE I DRUŠTVENI DOGAĐAJI (Main Group: zahvale-drustvo)
  // =========================================================================

  "selidba-inozemstvo": {
    roditelj: {
      amount: "Poklon / Džeparac (100 – 300 €)",
      notes: [
        "Odlazak djeteta u inozemstvo roditeljima je emotivno težak.",
        "Daruju mu praktične stvari za put ili kuvertu s gotovinom (džeparac) kako bi mu olakšali prve dane u novoj državi.",
      ],
    },
    "brat-sestra": {
      amount: "Poklon / 50 – 100 €",
      notes: [
        "Braća i sestre daruju personalizirane poklone koji će iseljenika podsjećati na dom (npr. uokvirena obiteljska slika ili retro drveni transfer zajedničke fotografije).",
      ],
    },
    prijatelj: {
      amount: "Poklon / 30 – 50 €",
      notes: [
        "Prijatelji organiziraju oproštajnu zabavu i daruju predmete koji ne zauzimaju puno mjesta u koferu, a imaju veliku sentimentalnu vrijednost.",
      ],
    },
    kolega: {
      amount: "Zajednički Poklon (10 – 20 €)",
      notes: [
        "Kolege s posla skupljaju simboličan iznos u uredu za zajednički poklon povodom oproštaja (npr. kvalitetan putni kovčeg ili kožni novčanik).",
      ],
    },
  },

  "kupnja-nekretnine": {
    roditelj: {
      amount: "500 – 2.000 €+",
      notes: [
        "Kupnja prve nekretnine (stana ili kuće) jedna je od najvećih životnih investicija.",
        "Roditelji u Hrvatskoj tradicionalno izdvajaju golema financijska sredstva kao dugoročnu potporu djetetu za polog, plaćanje poreza ili kupnju osnovnog namještaja.",
      ],
    },
    "baka-djed": {
      amount: "100 – 500 €",
      notes: [
        "Bake i djedovi daruju unucima značajan dio svoje ušteđevine kako bi im pomogli u opremanju prve vlastite nekretnine.",
      ],
    },
    "brat-sestra": {
      amount: "100 – 300 €",
      notes: [
        "Braća i sestre daruju iznose koji su najčešće usmjereni na kupnju točno određenog uređaja za novi dom (npr. televizor ili mikrovalna pećnica).",
      ],
    },
  },

  "useljenje-doma": {
    roditelj: {
      amount: "Poklon / 100 – 250 €",
      notes: [
        "Roditelji često pomažu opremanje novog doma kupnjom skupljih kućanskih aparata (perilica, hladnjak) u dogovoru s mladom obitelji.",
      ],
    },
    "brat-sestra": {
      amount: "Poklon / 50 – 150 €",
      notes: [
        "Brat ili sestra donose praktične darove za dom (set kvalitetnih noževa, posteljina, mali kućanski aparati) ili daruju novac ako su slavljenici još uvijek u procesu skupe renovacije.",
      ],
    },
    rodak: {
      amount: "Poklon / 30 – 100 €",
      notes: [
        "Rodbina se za 'babinje kuće' najčešće odlučuje za praktične predmete poput ukrasnog posuđa, kućnog tekstila ili prigodnog poklon-bona u trgovinama namještajem.",
      ],
    },
    prijatelj: {
      amount: "Poklon / 30 – 100 €",
      notes: [
        "Prijatelji najčešće donose kreativne i estetske predmete za kućanstvo (npr. unikatni tanjuri, mirisne svijeće od sojinog voska, dekorativni tanjuri od gipsa).",
        "Iznos se prilagođava ovisno o tome dolazite li na veliku zabavu useljenja ili u opušteni privatni posjet.",
      ],
    },
    kolega: {
      amount: "Poklon / 20 – 50 €",
      notes: [
        "Za useljenje kolege s posla najčešće se donosi boca finog likera, kava, ukrasna biljka za dom ili prigodni set čaša.",
      ],
    },
    susjed: {
      amount: "Poklon / 15 – 30 €",
      notes: [
        "Novi susjedi se tradicionalno daruju manjim znakom pažnje (npr. domaći kolači, sol i kruh kao tradicijski simbol blagostanja i dobrodošlice u susjedstvo).",
      ],
    },
  },

  "zahvala-uciteljici": {
    "skupno-razred": {
      amount: "5 – 15 € (Po učeniku)",
      notes: [
        "Zajednički pokloni učiteljicama na kraju 4. ili 8. razreda osnovne škole, odnosno na kraju srednje škole, uobičajena su praksa u Hrvatskoj.",
        "Svi roditelji u razredu skupljaju po 5 do 15 € kako bi se formirao proračun od 150 do 300 €.",
        "Zakon o sprječavanju sukoba interesa i etički kodeksi javnih službi brane javnim djelatnicima (uključujući učitelje i profesore) primanje pojedinačnih darova velike vrijednosti (zakonski limit za pojedinačni dar je do 66,36 € / 500 HRK).",
        "Zajednički prikupljeni proračun koristi se za kupnju bonova (npr. za wellness ili omiljenu trgovinu), kvalitetnog kožnog novčanika, ručnog sata ili uokvirenog albuma s porukama i crtežima djece.",
      ],
    },
    dijete: {
      amount: "Simboličan Poklon",
      notes: [
        "Ako dijete želi samostalno zahvaliti učiteljici, odgojiteljici u vrtiću ili profesoru, poklon mora biti isključivo simbolične vrijednosti.",
        "Domaći kolači, ručno nacrtana čestitka, jedna ruža, čokolada ili knjiga s posvetom djeteta najtopliji su i društveno najprihvatljiviji darovi zbog kojih se nitko neće osjećati neugodno.",
      ],
    },
  },

  sprovod: {
    roditelj: {
      amount: "100 – 200 €",
      notes: [
        "Uža obitelj pokojnika izdvaja veće iznose radi solidarnog pokrivanja iznimno visokih troškova pogrebnih usluga u Hrvatskoj.",
        "Novčani prilog predaje se diskretno u kuverti prije ili nakon samog pokopa.",
      ],
    },
    "brat-sestra": {
      amount: "100 – 150 €",
      notes: [
        "Bliska rodbina izravno pomaže obitelji pokojnika, često preuzimajući na sebe troškove karmina (daće) ili nabavu cvjetnih aranžmana.",
      ],
    },
    rodak: {
      amount: "50 – 100 €",
      notes: [
        "Za rodbinu je uobičajeno predati kuvertu s novcem obitelji pokojnika.",
        "Ova gesta zamjenjuje kupnju skupih vijenaca koji brzo propadaju te se smatra izrazito praktičnim činom uzajamne solidarnosti.",
      ],
    },
    prijatelj: {
      amount: "30 – 100 €",
      notes: [
        "Bliski prijatelji obitelji donose kuvertu s novcem (najčešće u vrijednosti vijenca koji bi inače kupili) uz izražavanje sućuti.",
        "Za sprovode daljih poznanika, dovoljno je donijeti jednu ružu ili zapaliti svijeću (lampaš).",
      ],
    },
    kolega: {
      amount: "20 – 50 €",
      notes: [
        "U uredima je uobičajeno skupljanje zajedničkog priloga za vijenac ili za kuvertu pomoći obitelji kolege koji je doživio smrtni slučaj u užoj obitelji.",
      ],
    },
    susjed: {
      amount: "10 – 30 €",
      notes: [
        "Susjedi predaju manji novčani prilog u kuverti kao znak pažnje i lokalne solidarnosti, posebno u manjim sredinama gdje se organiziraju i karmine.",
      ],
    },
  },

  ostalo: {
    obitelj: {
      amount: "30 – 100 €",
      notes: [
        "Za sve ostale nedefinirane obiteljske prigode, iznos prilagodite stupnju bliskosti i formatu druženja.",
      ],
    },
    prijatelj: {
      amount: "20 – 30 €",
      notes: [
        "Za neformalna slavlja i manje važne prigode, manji znak pažnje ili simbolična sitnica su uvijek bolji izbor od same gotovine.",
      ],
    },
    kolega: {
      amount: "10 – 20 €",
      notes: [
        "Za općenite uredske prigode skupljaju se minimalni simbolični iznosi radi održavanja kolegijalnosti.",
      ],
    },
  },
};

const DEFAULT_RESULT: GiftResult = {
  amount: "30 – 50 €",
  notes: [
    "Iznos prilagodite konkretnoj prigodi, lokaciji održavanja i stupnju bliskosti s primateljem.",
  ],
};

/**
 * Look up the recommended result for a given event + relationship combination.
 * This function returns specific data for valid pairs, falling back to a default
 * object only if the combination is not defined.
 */
export function getResult(eventId: string, relationId: string): GiftResult {
  return RESULTS[eventId]?.[relationId] ?? DEFAULT_RESULT;
}
