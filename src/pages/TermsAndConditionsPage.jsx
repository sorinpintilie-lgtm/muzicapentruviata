import React from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

const translations = {
  ro: {
    h1: 'Termeni și condiții',
    intro:
      'Utilizarea acestui site de către dumneavoastră este condiționată de respectarea termenilor și condițiilor generale de mai jos. Dacă alegeți să vizitați site-ul și să accesați secțiunea „Donează” pusă la dispoziție prin intermediul site-ului, vă asumați cunoașterea și acceptarea în totalitate a acestor termeni și condiții.',
    aboutH2: 'Despre Muzică pentru Viață',
    aboutP1:
      'Website-ul este un proiect caritabil organizat de Radio România Reșița în parteneriat cu Asociația OncoHelp Timișoara, cu sediul în Timișoara, Str. Ciprian Porumbescu, Nr. 57-59, înființată prin Încheierea civilă nr. 306/27.05.2005, având CIF: 17802939.',
    aboutP2:
      'Muzică pentru Viață este o campanie anuală care are ca scop strângerea de fonduri pentru construcția primului spital oncologic din Reșița, Banat. Toate donațiile colectate prin intermediul acestui site sunt direcționate către Asociația OncoHelp Timișoara, care este înregistrată în Registrul entităților pentru care se acordă deduceri fiscale în baza Deciziei ANAF nr. 1/05.04.2019.',
    defsH2: 'Definiții',
    defsIntro: 'În cuprinsul acestor termeni și condiții, următorii termeni se traduc astfel:',
    defs: [
      {
        term: 'site',
        text:
          'portalul aparținând campaniei Muzică pentru Viață, prin intermediul căruia utilizatorul are acces la informații privind campania și poate face donații online, disponibil la adresa:',
      },
      {
        term: 'conținutul site-ului',
        text: 'orice material, orice informație, publicate pe site sub orice formă – text, fotografii, etc.',
      },
      {
        term: 'utilizator',
        text: 'persoana care accesează site-ul și care a acceptat termenii și condițiile de utilizare ale prezentului site.',
      },
      {
        term: 'utilizare abuzivă',
        text:
          'utilizarea site-ului într-un mod contrar practicii în domeniu, a reglementărilor și legislației în vigoare sau în orice alt mod care poate aduce prejudicii campaniei Muzică pentru Viață.',
      },
    ],
    rightsH2: 'Drepturi și responsabilități',
    rightsP1:
      'Organizatorii campaniei Muzică pentru Viață își rezervă dreptul de a remedia în orice modalitate permisă de lege orice violare a acestor termeni și condiții, precum și de a modifica în orice moment conținutul site-ului, inclusiv termenii și condițiile de utilizare ale acestuia. Folosirea în continuare a site-ului înseamnă acceptarea noilor termeni și condiții.',
    rightsP2:
      'Organizatorii campaniei Muzică pentru Viață nu răspund pentru consecințele, de orice natură, ce decurg din utilizarea site-ului, inclusiv folosirea necorespunzătoare, improprie sau frauduloasă a acestuia.',
    rightsP3:
      'Organizatorii campaniei Muzică pentru Viață nu garantează și nu își asumă responsabilitatea pentru orice contaminare cu viruși sau orice altă contaminare care are proprietăți distructive. Organizatorii nu garantează pentru vreo necontaminare în acest sens.',
    donationsH2: 'Donații',
    donationsP1:
      'Prin intermediul site-ului campaniei Muzică pentru Viață se pot face donații online. Donatorul are posibilitatea să selecteze suma pe care dorește să o doneze. Suma donată se retrage de pe cardul bancar indicat de utilizator.',
    donationsP2:
      'Toate donațiile sunt procesate prin intermediul platformei securizate EuPlătesc.ro și sunt direcționate integral către Asociația OncoHelp Timișoara pentru construcția spitalului oncologic din Reșița.',
    donationsP3:
      'Donatorul este responsabil pentru asigurarea că are fondurile necesare și că cardul bancar folosit este valabil și autorizat pentru tranzacții online.',
    complaintsH2: 'Reclamații',
    complaintsP1:
      'Orice nemulțumire legată de accesarea, utilizarea, înregistrarea pe site-ul nostru, sau donația efectuată ne va fi comunicată direct, prin email la adresa contact@radioromania.ro.',
    complaintsP2:
      'Nemulțumirea dvs. va fi înregistrată și veți primi un răspuns în scris, pe adresa de email menționată cu ocazia aducerii la cunoștința noastră a nemulțumirii dvs., în termen de cel mult 72 ore, raportate la o zi lucrătoare.',
    complaintsP3:
      'Utilizatorul declară că este de acord să nu facă publice aceste nemulțumiri (pe rețelele de socializare, media, sau în orice altă modalitate) sub rezerva suportării daunelor cauzate pentru prejudiciul de imagine adus campaniei Muzică pentru Viață prin aceste acțiuni.',
    complaintsP4: 'Orice reclamație se depune în termen de maxim o lună de la data sesizării situației reclamate.',
    personalDataH2: 'Prelucrarea datelor cu caracter personal',
    personalDataP1:
      'Pentru detalii referitoare la prelucrarea datelor cu caracter personal, identitatea operatorului și alte asemenea, consultați secțiunea „Politica de confidențialitate și protecție a datelor” de pe site-ul nostru.',
    changesH2: 'Modificări și întreruperi',
    changesP1:
      'Organizatorii campaniei Muzică pentru Viață își rezervă dreptul de a modifica structura și interfața oricărei pagini sau subpagini a site-ului în orice moment și la orice interval de timp liber ales, având dreptul de a întrerupe temporar, parțial sau în totalitate funcționalitatea acestui site fără vreo notificare prealabilă individuală sau generală.',
    lawH2: 'Legislație aplicabilă',
    lawP1:
      'Prezenții Termeni și condiții se completează cu aspecte/prevederi speciale cuprinse la descrierea evenimentelor disponibile pe site și sunt guvernate de legea română. Orice litigii decurgând din utilizarea site-ului sau în legătură cu acesta vor fi supuse în primă fază unei proceduri prealabile de soluționare pe cale amiabilă, iar în caz de eșec vor fi investite instanțele judecătorești de pe raza municipiului Timișoara.',
    contactH2: 'Contact',
    contactIntro: 'Pentru orice întrebări sau informații suplimentare, vă rugăm să ne contactați la:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Telefon', value: '0255 210 100' },
      { label: 'Adresă', value: 'Str. Ciprian Porumbescu, Nr. 57-59, Timișoara' },
    ],
    thanks:
      'Vă mulțumim că susțineți campania Muzică pentru Viață și construcția primului spital oncologic din Reșița!',
  },

  en: {
    h1: 'Terms and Conditions',
    intro:
      'Your use of this website is subject to compliance with the general terms and conditions below. By visiting the website and accessing the “Donate” section made available through it, you acknowledge that you have read and fully accept these terms and conditions.',
    aboutH2: 'About Muzică pentru Viață',
    aboutP1:
      'This website is a charitable project organized by Radio România Reșița in partnership with the OncoHelp Association (Timișoara), headquartered in Timișoara, Str. Ciprian Porumbescu, No. 57-59, established by Civil Ruling no. 306/27.05.2005, VAT/CIF: 17802939.',
    aboutP2:
      'Muzică pentru Viață is an annual campaign aiming to raise funds to build the first oncology hospital in Reșița, Banat. All donations collected through this website are directed to the OncoHelp Association (Timișoara), registered in the Romanian register of entities eligible for tax deductions under ANAF Decision no. 1/05.04.2019.',
    defsH2: 'Definitions',
    defsIntro: 'Within these terms and conditions, the following terms have the meanings below:',
    defs: [
      {
        term: 'website',
        text:
          'the portal of the Muzică pentru Viață campaign, through which the user can access campaign information and make online donations, available at:',
      },
      {
        term: 'website content',
        text: 'any material or information published on the website in any form – text, photographs, etc.',
      },
      {
        term: 'user',
        text: 'the person who accesses the website and has accepted these terms and conditions.',
      },
      {
        term: 'abusive use',
        text:
          'using the website contrary to industry practices, applicable regulations and laws, or in any way that may harm the Muzică pentru Viață campaign.',
      },
    ],
    rightsH2: 'Rights and responsibilities',
    rightsP1:
      'The campaign organizers reserve the right to remedy, in any manner permitted by law, any breach of these terms and conditions, as well as to modify at any time the website content, including these terms and conditions. Continued use of the website constitutes acceptance of the updated terms.',
    rightsP2:
      'The campaign organizers are not liable for consequences of any kind arising from the use of the website, including improper or fraudulent use.',
    rightsP3:
      'The campaign organizers do not guarantee and assume no responsibility for infection with viruses or any other contamination with destructive properties, and do not guarantee the absence of such contamination.',
    donationsH2: 'Donations',
    donationsP1:
      'Online donations can be made via the Muzică pentru Viață campaign website. The donor can select the amount they wish to donate. The donated amount is charged to the bank card indicated by the user.',
    donationsP2:
      'All donations are processed through the secure EuPlătesc.ro platform and are directed entirely to the OncoHelp Association (Timișoara) for building the oncology hospital in Reșița.',
    donationsP3:
      'The donor is responsible for ensuring they have sufficient funds and that the bank card used is valid and authorized for online transactions.',
    complaintsH2: 'Complaints',
    complaintsP1:
      'Any dissatisfaction regarding access, use, registration on our website, or the donation made will be communicated directly by email to contact@radioromania.ro.',
    complaintsP2:
      'Your complaint will be recorded and you will receive a written response to the email address provided, within no more than 72 hours, calculated on a working day basis.',
    complaintsP3:
      'The user agrees not to make these complaints public (on social networks, media or otherwise), under penalty of covering damages caused by any reputational harm to the Muzică pentru Viață campaign.',
    complaintsP4: 'Any complaint must be submitted within a maximum of one month from the date of notification of the complained situation.',
    personalDataH2: 'Personal data processing',
    personalDataP1:
      'For details regarding personal data processing, the identity of the data controller and other related information, please consult the “Privacy Policy and Data Protection” section of our website.',
    changesH2: 'Changes and interruptions',
    changesP1:
      'The campaign organizers reserve the right to modify the structure and interface of any page or subpage of the website at any time and at any interval, and to temporarily or permanently interrupt, partially or totally, the functionality of this website without prior notice.',
    lawH2: 'Applicable law',
    lawP1:
      'These Terms and Conditions are supplemented by any special provisions included in the descriptions of events available on the website and are governed by Romanian law. Any disputes arising from or related to the use of the website will first be subject to an amicable settlement procedure; if unsuccessful, they will be brought before the courts in the municipality of Timișoara.',
    contactH2: 'Contact',
    contactIntro: 'For any questions or additional information, please contact us at:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Phone', value: '0255 210 100' },
      { label: 'Address', value: 'Str. Ciprian Porumbescu, No. 57-59, Timișoara' },
    ],
    thanks:
      'Thank you for supporting the Muzică pentru Viață campaign and the construction of the first oncology hospital in Reșița!',
  },

  de: {
    h1: 'Allgemeine Geschäftsbedingungen',
    intro:
      'Die Nutzung dieser Website setzt die Einhaltung der nachstehenden allgemeinen Bedingungen voraus. Wenn Sie die Website besuchen und den Bereich „Spenden“ nutzen, bestätigen Sie, dass Sie diese Bedingungen kennen und vollständig akzeptieren.',
    aboutH2: 'Über Muzică pentru Viață',
    aboutP1:
      'Diese Website ist ein karitatives Projekt, organisiert von Radio România Reșița in Partnerschaft mit der OncoHelp-Vereinigung (Timișoara), mit Sitz in Timișoara, Str. Ciprian Porumbescu, Nr. 57-59, gegründet durch Zivilbeschluss Nr. 306/27.05.2005, CIF: 17802939.',
    aboutP2:
      'Muzică pentru Viață ist eine jährliche Kampagne zur Sammlung von Spenden für den Bau des ersten Onkologie-Krankenhauses in Reșița (Banat). Alle Spenden, die über diese Website gesammelt werden, gehen an die OncoHelp-Vereinigung (Timișoara), die gemäß ANAF-Entscheidung Nr. 1/05.04.2019 im Register der steuerlich begünstigten Einrichtungen eingetragen ist.',
    defsH2: 'Definitionen',
    defsIntro: 'In diesen Bedingungen haben die folgenden Begriffe die nachstehende Bedeutung:',
    defs: [
      {
        term: 'Website',
        text:
          'das Portal der Kampagne Muzică pentru Viață, über das Nutzer Informationen erhalten und online spenden können, verfügbar unter:',
      },
      {
        term: 'Website-Inhalt',
        text: 'jegliches Material bzw. jede Information, die in beliebiger Form veröffentlicht wird – Text, Fotos usw.',
      },
      {
        term: 'Nutzer',
        text: 'die Person, die die Website aufruft und diese Bedingungen akzeptiert hat.',
      },
      {
        term: 'missbräuchliche Nutzung',
        text:
          'jede Nutzung der Website entgegen Branchenpraxis, geltenden Vorschriften und Gesetzen oder in sonstiger Weise, die der Kampagne Muzică pentru Viață schaden kann.',
      },
    ],
    rightsH2: 'Rechte und Pflichten',
    rightsP1:
      'Die Organisatoren behalten sich das Recht vor, jede Verletzung dieser Bedingungen in jeder gesetzlich zulässigen Weise zu beheben sowie den Inhalt der Website (einschließlich dieser Bedingungen) jederzeit zu ändern. Die fortgesetzte Nutzung der Website gilt als Annahme der geänderten Bedingungen.',
    rightsP2:
      'Die Organisatoren haften nicht für Folgen jeglicher Art, die sich aus der Nutzung der Website ergeben, einschließlich unsachgemäßer oder betrügerischer Nutzung.',
    rightsP3:
      'Die Organisatoren übernehmen keine Gewähr für Virenfreiheit oder sonstige schädliche Kontaminationen und übernehmen hierfür keine Verantwortung.',
    donationsH2: 'Spenden',
    donationsP1:
      'Über die Website der Kampagne können Online-Spenden getätigt werden. Der Spender kann den gewünschten Betrag auswählen. Der Betrag wird von der angegebenen Bankkarte abgebucht.',
    donationsP2:
      'Alle Spenden werden über die sichere Plattform EuPlătesc.ro verarbeitet und vollständig an die OncoHelp-Vereinigung (Timișoara) für den Bau des Onkologie-Krankenhauses in Reșița weitergeleitet.',
    donationsP3:
      'Der Spender ist dafür verantwortlich, über ausreichende Mittel zu verfügen und dass die verwendete Bankkarte gültig und für Online-Transaktionen autorisiert ist.',
    complaintsH2: 'Beschwerden',
    complaintsP1:
      'Jede Unzufriedenheit im Zusammenhang mit Zugriff, Nutzung, Registrierung oder der getätigten Spende ist per E-Mail an contact@radioromania.ro mitzuteilen.',
    complaintsP2:
      'Ihre Beschwerde wird registriert und Sie erhalten innerhalb von höchstens 72 Stunden (Werktage) eine schriftliche Antwort an die angegebene E-Mail-Adresse.',
    complaintsP3:
      'Der Nutzer erklärt sich damit einverstanden, diese Beschwerden nicht öffentlich zu machen (soziale Netzwerke, Medien oder anderweitig), andernfalls können Schadensersatzansprüche wegen Reputationsschäden entstehen.',
    complaintsP4: 'Beschwerden sind spätestens innerhalb eines Monats ab Feststellung der beanstandeten Situation einzureichen.',
    personalDataH2: 'Verarbeitung personenbezogener Daten',
    personalDataP1:
      'Für Details zur Verarbeitung personenbezogener Daten konsultieren Sie bitte den Abschnitt „Datenschutzerklärung“ auf unserer Website.',
    changesH2: 'Änderungen und Unterbrechungen',
    changesP1:
      'Die Organisatoren behalten sich das Recht vor, Struktur und Oberfläche jeder Seite jederzeit zu ändern und die Funktionalität dieser Website vorübergehend oder dauerhaft teilweise oder vollständig ohne vorherige Ankündigung zu unterbrechen.',
    lawH2: 'Anwendbares Recht',
    lawP1:
      'Diese Bedingungen unterliegen rumänischem Recht. Streitigkeiten werden zunächst gütlich zu lösen versucht; bei Scheitern sind die zuständigen Gerichte in Timișoara zuständig.',
    contactH2: 'Kontakt',
    contactIntro: 'Für Fragen oder weitere Informationen kontaktieren Sie uns bitte unter:',
    contact: [
      { label: 'E-Mail', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Telefon', value: '0255 210 100' },
      { label: 'Adresse', value: 'Str. Ciprian Porumbescu, Nr. 57-59, Timișoara' },
    ],
    thanks:
      'Vielen Dank für Ihre Unterstützung der Kampagne Muzică pentru Viață und des Baus des ersten Onkologie-Krankenhauses in Reșița!',
  },

  fr: {
    h1: 'Conditions générales',
    intro:
      'L’utilisation de ce site est subordonnée au respect des conditions générales ci-dessous. En visitant le site et en accédant à la section « Faire un don », vous reconnaissez avoir pris connaissance et accepter pleinement ces conditions.',
    aboutH2: 'À propos de Muzică pentru Viață',
    aboutP1:
      'Ce site est un projet caritatif organisé par Radio România Reșița en partenariat avec l’Association OncoHelp (Timișoara), dont le siège est à Timișoara, Str. Ciprian Porumbescu, n° 57-59, créée par décision civile n° 306/27.05.2005, CIF : 17802939.',
    aboutP2:
      'Muzică pentru Viață est une campagne annuelle visant à collecter des fonds pour construire le premier hôpital d’oncologie à Reșița (Banat). Tous les dons collectés via ce site sont dirigés vers l’Association OncoHelp (Timișoara), inscrite au registre des entités ouvrant droit à des déductions fiscales conformément à la décision ANAF n° 1/05.04.2019.',
    defsH2: 'Définitions',
    defsIntro: 'Dans les présentes conditions, les termes suivants ont la signification suivante :',
    defs: [
      {
        term: 'site',
        text:
          'le portail de la campagne Muzică pentru Viață, permettant d’accéder aux informations et d’effectuer des dons en ligne, disponible à l’adresse :',
      },
      {
        term: 'contenu du site',
        text: 'tout matériel ou information publié sous toute forme – texte, photographies, etc.',
      },
      {
        term: 'utilisateur',
        text: 'la personne qui accède au site et accepte les présentes conditions.',
      },
      {
        term: 'utilisation abusive',
        text:
          'toute utilisation du site contraire aux pratiques du domaine, aux réglementations et lois en vigueur, ou susceptible de porter préjudice à la campagne Muzică pentru Viață.',
      },
    ],
    rightsH2: 'Droits et responsabilités',
    rightsP1:
      'Les organisateurs se réservent le droit de remédier à toute violation des présentes conditions par tout moyen autorisé par la loi, ainsi que de modifier à tout moment le contenu du site, y compris les conditions d’utilisation. La poursuite de l’utilisation du site vaut acceptation des nouvelles conditions.',
    rightsP2:
      'Les organisateurs ne sont pas responsables des conséquences, de quelque nature que ce soit, découlant de l’utilisation du site, y compris une utilisation inappropriée ou frauduleuse.',
    rightsP3:
      'Les organisateurs ne garantissent pas l’absence de virus ou toute autre contamination destructrice et n’assument aucune responsabilité à cet égard.',
    donationsH2: 'Dons',
    donationsP1:
      'Des dons en ligne peuvent être effectués via le site de la campagne. Le donateur peut sélectionner le montant qu’il souhaite donner. Le montant est débité de la carte bancaire indiquée.',
    donationsP2:
      'Tous les dons sont traités via la plateforme sécurisée EuPlătesc.ro et sont intégralement dirigés vers l’Association OncoHelp (Timișoara) pour la construction de l’hôpital d’oncologie à Reșița.',
    donationsP3:
      'Le donateur est responsable de s’assurer qu’il dispose des fonds nécessaires et que la carte utilisée est valide et autorisée pour les transactions en ligne.',
    complaintsH2: 'Réclamations',
    complaintsP1:
      'Toute réclamation concernant l’accès, l’utilisation, l’inscription sur notre site ou le don effectué doit être communiquée par e-mail à contact@radioromania.ro.',
    complaintsP2:
      'Votre réclamation sera enregistrée et vous recevrez une réponse écrite à l’adresse e-mail fournie, dans un délai maximum de 72 heures (jours ouvrables).',
    complaintsP3:
      'L’utilisateur s’engage à ne pas rendre ces réclamations publiques (réseaux sociaux, médias ou autre), sous peine d’engager sa responsabilité pour tout préjudice d’image causé.',
    complaintsP4: 'Toute réclamation doit être déposée au plus tard dans un délai d’un mois à compter de la date de constatation.',
    personalDataH2: 'Traitement des données personnelles',
    personalDataP1:
      'Pour plus de détails sur le traitement des données personnelles, veuillez consulter la section « Politique de confidentialité » de notre site.',
    changesH2: 'Modifications et interruptions',
    changesP1:
      'Les organisateurs se réservent le droit de modifier à tout moment la structure et l’interface de toute page et d’interrompre temporairement ou définitivement, partiellement ou totalement, le fonctionnement du site sans préavis.',
    lawH2: 'Droit applicable',
    lawP1:
      'Les présentes conditions sont régies par le droit roumain. Tout litige sera d’abord soumis à une procédure amiable; en cas d’échec, il relèvera des tribunaux compétents de Timișoara.',
    contactH2: 'Contact',
    contactIntro: 'Pour toute question ou information supplémentaire, veuillez nous contacter :',
    contact: [
      { label: 'E-mail', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Téléphone', value: '0255 210 100' },
      { label: 'Adresse', value: 'Str. Ciprian Porumbescu, n° 57-59, Timișoara' },
    ],
    thanks:
      'Merci de soutenir la campagne Muzică pentru Viață et la construction du premier hôpital d’oncologie à Reșița !',
  },

  es: {
    h1: 'Términos y condiciones',
    intro:
      'El uso de este sitio web está condicionado al cumplimiento de los términos y condiciones generales que se indican a continuación. Si visitas el sitio y accedes a la sección “Donar”, reconoces que conoces y aceptas plenamente estos términos y condiciones.',
    aboutH2: 'Sobre Muzică pentru Viață',
    aboutP1:
      'Este sitio web es un proyecto benéfico organizado por Radio România Reșița en colaboración con la Asociación OncoHelp (Timișoara), con sede en Timișoara, Str. Ciprian Porumbescu, N.º 57-59, establecida por Resolución civil n.º 306/27.05.2005, CIF: 17802939.',
    aboutP2:
      'Muzică pentru Viață es una campaña anual cuyo objetivo es recaudar fondos para construir el primer hospital oncológico en Reșița, Banat. Todas las donaciones recaudadas a través de este sitio se dirigen a la Asociación OncoHelp (Timișoara), registrada como entidad elegible para deducciones fiscales según la Decisión ANAF n.º 1/05.04.2019.',
    defsH2: 'Definiciones',
    defsIntro: 'En estos términos y condiciones, los siguientes términos tienen el significado siguiente:',
    defs: [
      {
        term: 'sitio',
        text:
          'el portal de la campaña Muzică pentru Viață, mediante el cual el usuario puede acceder a información y realizar donaciones online, disponible en:',
      },
      { term: 'contenido del sitio', text: 'cualquier material o información publicada – texto, fotografías, etc.' },
      { term: 'usuario', text: 'la persona que accede al sitio y ha aceptado estos términos y condiciones.' },
      {
        term: 'uso abusivo',
        text:
          'el uso del sitio de forma contraria a las prácticas del sector, a la normativa vigente o de cualquier manera que pueda perjudicar la campaña Muzică pentru Viață.',
      },
    ],
    rightsH2: 'Derechos y responsabilidades',
    rightsP1:
      'Los organizadores se reservan el derecho de subsanar cualquier infracción de estos términos por cualquier medio permitido por la ley, así como de modificar en cualquier momento el contenido del sitio, incluidos estos términos. El uso continuado del sitio implica la aceptación de los nuevos términos.',
    rightsP2:
      'Los organizadores no responden por las consecuencias derivadas del uso del sitio, incluido el uso inadecuado o fraudulento.',
    rightsP3:
      'Los organizadores no garantizan la ausencia de virus u otras contaminaciones destructivas y no asumen responsabilidad por ello.',
    donationsH2: 'Donaciones',
    donationsP1:
      'Se pueden realizar donaciones online a través del sitio. El donante puede seleccionar la cantidad a donar. El importe se carga en la tarjeta bancaria indicada por el usuario.',
    donationsP2:
      'Todas las donaciones se procesan mediante la plataforma segura EuPlătesc.ro y se dirigen íntegramente a la Asociación OncoHelp (Timișoara) para la construcción del hospital oncológico en Reșița.',
    donationsP3:
      'El donante es responsable de asegurarse de que dispone de fondos suficientes y de que la tarjeta utilizada es válida y está autorizada para transacciones online.',
    complaintsH2: 'Reclamaciones',
    complaintsP1:
      'Cualquier reclamación relacionada con el acceso, uso, registro o la donación realizada debe comunicarse por email a contact@radioromania.ro.',
    complaintsP2:
      'La reclamación se registrará y recibirás una respuesta por escrito al email indicado en un plazo máximo de 72 horas (días laborables).',
    complaintsP3:
      'El usuario acepta no hacer públicas estas reclamaciones (redes sociales, medios u otros), bajo la responsabilidad por posibles daños de imagen causados a la campaña.',
    complaintsP4: 'Cualquier reclamación debe presentarse en un plazo máximo de un mes desde la fecha de notificación.',
    personalDataH2: 'Tratamiento de datos personales',
    personalDataP1:
      'Para más detalles sobre el tratamiento de datos personales, consulta la sección “Política de privacidad” en nuestro sitio.',
    changesH2: 'Modificaciones e interrupciones',
    changesP1:
      'Los organizadores se reservan el derecho de modificar la estructura e interfaz de cualquier página en cualquier momento y de interrumpir temporal o permanentemente, parcial o totalmente, la funcionalidad del sitio sin aviso previo.',
    lawH2: 'Legislación aplicable',
    lawP1:
      'Estos términos se rigen por la ley rumana. Cualquier disputa se intentará resolver primero de forma amistosa; en caso de fracaso, será sometida a los tribunales competentes de Timișoara.',
    contactH2: 'Contacto',
    contactIntro: 'Para cualquier pregunta o información adicional, contáctanos en:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Teléfono', value: '0255 210 100' },
      { label: 'Dirección', value: 'Str. Ciprian Porumbescu, Nr. 57-59, Timișoara' },
    ],
    thanks: '¡Gracias por apoyar la campaña Muzică pentru Viață y la construcción del primer hospital oncológico en Reșița!',
  },

  it: {
    h1: 'Termini e condizioni',
    intro:
      'L’utilizzo di questo sito è subordinato al rispetto dei termini e condizioni generali di seguito riportati. Accedendo al sito e alla sezione “Dona”, dichiari di conoscere e accettare integralmente questi termini e condizioni.',
    aboutH2: 'Su Muzică pentru Viață',
    aboutP1:
      'Questo sito è un progetto benefico organizzato da Radio România Reșița in partnership con l’Associazione OncoHelp (Timișoara), con sede a Timișoara, Str. Ciprian Porumbescu, n. 57-59, costituita con decisione civile n. 306/27.05.2005, CIF: 17802939.',
    aboutP2:
      'Muzică pentru Viață è una campagna annuale finalizzata alla raccolta fondi per la costruzione del primo ospedale oncologico a Reșița (Banat). Tutte le donazioni raccolte tramite questo sito sono destinate all’Associazione OncoHelp (Timișoara), iscritta nel registro delle entità che beneficiano di deduzioni fiscali in base alla decisione ANAF n. 1/05.04.2019.',
    defsH2: 'Definizioni',
    defsIntro: 'Nei presenti termini e condizioni, i seguenti termini hanno il significato indicato:',
    defs: [
      {
        term: 'sito',
        text:
          'il portale della campagna Muzică pentru Viață, tramite il quale l’utente può accedere alle informazioni e fare donazioni online, disponibile all’indirizzo:',
      },
      { term: 'contenuto del sito', text: 'qualsiasi materiale o informazione pubblicata – testo, fotografie, ecc.' },
      { term: 'utente', text: 'la persona che accede al sito e che ha accettato i presenti termini e condizioni.' },
      {
        term: 'uso improprio',
        text:
          'qualsiasi utilizzo del sito contrario alle pratiche del settore, alle norme e alle leggi vigenti o che possa arrecare pregiudizio alla campagna Muzică pentru Viață.',
      },
    ],
    rightsH2: 'Diritti e responsabilità',
    rightsP1:
      'Gli organizzatori si riservano il diritto di rimediare, con qualsiasi mezzo consentito dalla legge, a eventuali violazioni dei presenti termini e condizioni, nonché di modificare in qualsiasi momento i contenuti del sito, inclusi i termini d’uso. L’uso continuato del sito implica l’accettazione dei nuovi termini.',
    rightsP2:
      'Gli organizzatori non sono responsabili per le conseguenze derivanti dall’uso del sito, inclusi usi impropri o fraudolenti.',
    rightsP3:
      'Gli organizzatori non garantiscono l’assenza di virus o altre contaminazioni distruttive e non si assumono responsabilità a tal riguardo.',
    donationsH2: 'Donazioni',
    donationsP1:
      'È possibile effettuare donazioni online tramite il sito della campagna. Il donatore può selezionare l’importo da donare. L’importo sarà addebitato sulla carta bancaria indicata.',
    donationsP2:
      'Tutte le donazioni sono elaborate tramite la piattaforma sicura EuPlătesc.ro e destinate integralmente all’Associazione OncoHelp (Timișoara) per la costruzione dell’ospedale oncologico a Reșița.',
    donationsP3:
      'Il donatore è responsabile di assicurarsi di avere fondi sufficienti e che la carta utilizzata sia valida e autorizzata per transazioni online.',
    complaintsH2: 'Reclami',
    complaintsP1:
      'Qualsiasi reclamo relativo all’accesso, all’utilizzo, alla registrazione sul sito o alla donazione effettuata deve essere comunicato via email a contact@radioromania.ro.',
    complaintsP2:
      'Il reclamo sarà registrato e riceverai una risposta scritta all’indirizzo email indicato entro un massimo di 72 ore (giorni lavorativi).',
    complaintsP3:
      'L’utente accetta di non rendere pubblici tali reclami (social media, media o altro) pena il risarcimento dei danni d’immagine arrecati alla campagna Muzică pentru Viață.',
    complaintsP4: 'Qualsiasi reclamo deve essere presentato entro un massimo di un mese dalla data della segnalazione.',
    personalDataH2: 'Trattamento dei dati personali',
    personalDataP1:
      'Per dettagli sul trattamento dei dati personali, consulta la sezione “Informativa sulla privacy” del nostro sito.',
    changesH2: 'Modifiche e interruzioni',
    changesP1:
      'Gli organizzatori si riservano il diritto di modificare la struttura e l’interfaccia di qualsiasi pagina in qualsiasi momento e di interrompere temporaneamente o definitivamente, parzialmente o totalmente, la funzionalità del sito senza preavviso.',
    lawH2: 'Legge applicabile',
    lawP1:
      'I presenti Termini e condizioni sono regolati dalla legge rumena. Eventuali controversie saranno prima oggetto di una procedura di risoluzione amichevole; in caso di insuccesso, saranno deferite ai tribunali competenti di Timișoara.',
    contactH2: 'Contatti',
    contactIntro: 'Per qualsiasi domanda o informazione aggiuntiva, contattaci a:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Telefono', value: '0255 210 100' },
      { label: 'Indirizzo', value: 'Str. Ciprian Porumbescu, n. 57-59, Timișoara' },
    ],
    thanks:
      'Grazie per sostenere la campagna Muzică pentru Viață e la costruzione del primo ospedale oncologico a Reșița!',
  },

  ar: {
    h1: 'الشروط والأحكام',
    intro:
      'يخضع استخدامك لهذا الموقع للالتزام بالشروط والأحكام العامة أدناه. بدخولك إلى الموقع واستخدام قسم “التبرع”، فإنك تقرّ بأنك اطّلعت على هذه الشروط وتقبلها بالكامل.',
    aboutH2: 'حول Muzică pentru Viață',
    aboutP1:
      'هذا الموقع مشروع خيري تنظمه Radio România Reșița بالشراكة مع جمعية OncoHelp (تيميشوارا)، ومقرها تيميشوارا، شارع Ciprian Porumbescu رقم 57-59، تأسست بموجب القرار المدني رقم 306/27.05.2005، رقم التعريف الضريبي CIF: 17802939.',
    aboutP2:
      'Muzică pentru Viață هي حملة سنوية تهدف إلى جمع التبرعات لبناء أول مستشفى للأورام في ريشيتسا (بانَات). تُحوّل جميع التبرعات التي يتم جمعها عبر هذا الموقع إلى جمعية OncoHelp (تيميشوارا) المسجلة ضمن سجل الجهات المؤهلة للخصومات الضريبية وفق قرار ANAF رقم 1/05.04.2019.',
    defsH2: 'تعريفات',
    defsIntro: 'في هذه الشروط والأحكام، يكون للمصطلحات التالية المعاني الآتية:',
    defs: [
      {
        term: 'الموقع',
        text:
          'بوابة حملة Muzică pentru Viață التي تتيح للمستخدم الوصول إلى معلومات الحملة وإجراء التبرعات عبر الإنترنت، والمتاحة على العنوان:',
      },
      { term: 'محتوى الموقع', text: 'أي مادة أو معلومات منشورة بأي شكل – نصوص، صور، إلخ.' },
      { term: 'المستخدم', text: 'الشخص الذي يصل إلى الموقع وقد قبل هذه الشروط والأحكام.' },
      {
        term: 'استخدام مسيء',
        text:
          'استخدام الموقع بطريقة تخالف الممارسات المتعارف عليها أو القوانين واللوائح السارية أو بأي طريقة قد تضر بحملة Muzică pentru Viață.',
      },
    ],
    rightsH2: 'الحقوق والمسؤوليات',
    rightsP1:
      'يحتفظ منظمو الحملة بالحق في معالجة أي خرق لهذه الشروط بأي طريقة يسمح بها القانون، وكذلك تعديل محتوى الموقع بما في ذلك هذه الشروط في أي وقت. استمرار استخدام الموقع يعني قبول الشروط المحدّثة.',
    rightsP2:
      'لا يتحمل منظمو الحملة مسؤولية أي عواقب ناتجة عن استخدام الموقع، بما في ذلك الاستخدام غير السليم أو الاحتيالي.',
    rightsP3:
      'لا يضمن منظمو الحملة خلوّ الموقع من الفيروسات أو أي تلوث ضار ولا يتحملون المسؤولية عن ذلك.',
    donationsH2: 'التبرعات',
    donationsP1:
      'يمكن إجراء تبرعات عبر الإنترنت من خلال موقع الحملة. يمكن للمتبرع اختيار المبلغ الذي يرغب في التبرع به، وسيتم خصم المبلغ من البطاقة البنكية المحددة.',
    donationsP2:
      'تُعالج جميع التبرعات عبر منصة EuPlătesc.ro الآمنة وتُحوّل بالكامل إلى جمعية OncoHelp (تيميشوارا) لبناء مستشفى الأورام في ريشيتسا.',
    donationsP3:
      'المتبرع مسؤول عن التأكد من توفر الرصيد الكافي وأن البطاقة المستخدمة صالحة ومصرح بها للمدفوعات عبر الإنترنت.',
    complaintsH2: 'الشكاوى',
    complaintsP1:
      'أي ملاحظة أو شكوى تتعلق بالوصول أو الاستخدام أو التسجيل أو التبرع يجب إرسالها عبر البريد الإلكتروني إلى contact@radioromania.ro.',
    complaintsP2:
      'سيتم تسجيل الشكوى وستتلقى ردًا كتابيًا على البريد الإلكتروني المقدم خلال مدة لا تتجاوز 72 ساعة (أيام عمل).',
    complaintsP3:
      'يوافق المستخدم على عدم نشر هذه الشكاوى علنًا (على وسائل التواصل أو الإعلام أو غير ذلك) وإلا قد يتحمل المسؤولية عن الأضرار المعنوية التي قد تلحق بالحملة.',
    complaintsP4: 'يجب تقديم أي شكوى خلال مدة أقصاها شهر واحد من تاريخ الإبلاغ عن الحالة المعنية.',
    personalDataH2: 'معالجة البيانات الشخصية',
    personalDataP1: 'لمزيد من التفاصيل حول معالجة البيانات الشخصية، يرجى الرجوع إلى قسم “سياسة الخصوصية” على موقعنا.',
    changesH2: 'التعديلات والانقطاعات',
    changesP1:
      'يحتفظ المنظمون بالحق في تعديل بنية وواجهة أي صفحة في أي وقت، ولهم الحق في إيقاف عمل الموقع مؤقتًا أو جزئيًا أو كليًا دون إشعار مسبق.',
    lawH2: 'القانون المطبق',
    lawP1:
      'تخضع هذه الشروط للقانون الروماني. تُحل النزاعات أولًا وديًا؛ وفي حال الفشل تُحال إلى المحاكم المختصة في تيميشوارا.',
    contactH2: 'التواصل',
    contactIntro: 'لأي أسئلة أو معلومات إضافية، يرجى التواصل معنا عبر:',
    contact: [
      { label: 'البريد الإلكتروني', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'الهاتف', value: '0255 210 100' },
      { label: 'العنوان', value: 'Str. Ciprian Porumbescu, Nr. 57-59, Timișoara' },
    ],
    thanks: 'شكرًا لدعمكم حملة Muzică pentru Viață وبناء أول مستشفى للأورام في ريشيتسا!',
  },
};

export default function TermsAndConditionsPage() {
  const { lang } = useI18n();
  const t = translations[lang] || translations.ro;

  return (
    <div className="page-wrapper">
      <main className="page">
        <section className="terms-section">
          <div className="terms-container">
            <h1>{t.h1}</h1>

            <p>{t.intro}</p>

            <h2>{t.aboutH2}</h2>

            <p>
              {t.aboutP1}{' '}
              <a href="https://muzicapentruviata.ro">www.muzicapentruviata.ro</a>
            </p>

            <p>{t.aboutP2}</p>

            <h2>{t.defsH2}</h2>
            <p>{t.defsIntro}</p>
            <ul>
              {t.defs.map((d) => (
                <li key={d.term}>
                  <strong>{d.term}</strong>: {d.text}{' '}
                  {d.term === 'site' || d.term === 'website' || d.term === 'Website' || d.term === 'sito' || d.term === 'الموقع' ? (
                    <a href="https://muzicapentruviata.ro">www.muzicapentruviata.ro</a>
                  ) : null}
                </li>
              ))}
            </ul>

            <h2>{t.rightsH2}</h2>
            <p>{t.rightsP1}</p>
            <p>{t.rightsP2}</p>
            <p>{t.rightsP3}</p>

            <h2>{t.donationsH2}</h2>
            <p>{t.donationsP1}</p>
            <p>{t.donationsP2}</p>
            <p>{t.donationsP3}</p>

            <h2>{t.complaintsH2}</h2>
            <p>
              {t.complaintsP1}{' '}
              <a href="mailto:contact@radioromania.ro">contact@radioromania.ro</a>
              .
            </p>
            <p>{t.complaintsP2}</p>
            <p>{t.complaintsP3}</p>
            <p>{t.complaintsP4}</p>

            <h2>{t.personalDataH2}</h2>
            <p>{t.personalDataP1}</p>

            <h2>{t.changesH2}</h2>
            <p>{t.changesP1}</p>

            <h2>{t.lawH2}</h2>
            <p>{t.lawP1}</p>

            <h2>{t.contactH2}</h2>
            <p>{t.contactIntro}</p>
            <ul>
              {t.contact.map((c) => (
                <li key={c.label}>
                  {c.label}: {c.href ? <a href={c.href}>{c.value}</a> : c.value}
                </li>
              ))}
            </ul>

            <p>{t.thanks}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
