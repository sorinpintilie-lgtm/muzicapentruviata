import React from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

const translations = {
  ro: {
    h1: 'Politica de confidențialitate și protecție a datelor',
    h2: 'NOTĂ DE INFORMARE privind prelucrarea datelor cu caracter personal',
    p1:
      'Campania Muzică pentru Viață, organizată de Radio România Reșița în parteneriat cu Asociația OncoHelp Timișoara, respectă confidențialitatea și protecția datelor cu caracter personal ale vizitatorilor și donatorilor.',
    operatorH3: 'Identitatea și datele de contact ale operatorului',
    operatorP1:
      'Campania Muzică pentru Viață este organizată de Radio România Reșița în parteneriat cu Asociația OncoHelp Timișoara – Centrul de Oncologie Oncohelp, cu sediul în Timișoara, Str. Ciprian Porumbescu, Nr. 59, înființată prin Încheierea civilă nr. 306/27.05.2005, având CIF: 17802939, tel: 0356/460995, fax: 0356/460996, reprezentată legal de către domnul manager Borugă Valeriu Ioan.',
    operatorP2: 'Datele de contact ale responsabilului cu protecția datelor: e-mail: dpo@oncohelp.ro, tel: 0744581764.',
    purposeH3: 'Scopul și baza legală a prelucrărilor',
    purposeP1:
      'Scopul colectării și utilizării datelor personale în cadrul campaniei Muzică pentru Viață se circumscrie asigurării procesului de donații și comunicării cu donatorii. Datele cu caracter personal vor fi colectate și utilizate doar în scopul și în legătură cu procesarea donațiilor și comunicarea informațiilor despre campanie.',
    purposeP2:
      'Campania Muzică pentru Viață prelucrează datele cu caracter personal în vederea furnizării informațiilor despre campanie și procesarea donațiilor.',
    typesH3: 'Tipuri de date cu caracter personal pe care le prelucrăm',
    typesIntro:
      'În cadrul campaniei Muzică pentru Viață, colectăm numai datele personale necesare pentru procesarea donațiilor și comunicare. Acestea pot include:',
    types: [
      'Numele și prenumele (opțional pentru donații)',
      'Adresa de email (opțională pentru donații)',
      'Datele de contact pentru comunicare',
      'Informații despre donație (sumă, dată, etc.)',
    ],
    storageH3: 'Stocarea datelor cu caracter personal',
    storageP1:
      'Stocarea datelor cu caracter personal se efectuează în condiții de securitate. Datele sunt protejate împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii.',
    recipientsH3: 'Destinația sau categoriile de destinatari ai datelor cu caracter personal',
    recipientsP1:
      'Datele cu caracter personal sunt colectate și prelucrate de către organizatorii campaniei Muzică pentru Viață. Aceste date nu sunt partajate cu terțe părți fără consimțământul explicit al persoanei vizate, cu excepția cazurilor prevăzute de lege.',
    rightsH3: 'Drepturile persoanelor vizate cu privire la prelucrarea datelor cu caracter personal',
    rightsIntro: 'În calitate de persoană vizată, aveți următoarele drepturi:',
    rights: [
      'Dreptul la informare și acces la datele dumneavoastră cu caracter personal;',
      'Dreptul de a obține, la cerere și în mod gratuit, confirmarea faptului că datele dumneavoastră sunt prelucrate;',
      'Dreptul la rectificare – aveți dreptul de a corecta datele pe care le deținem în legătură cu dumneavoastră, care sunt inexacte sau incomplete;',
      'Dreptul de a fi uitat (ștergerea datelor);',
      'Dreptul la restricționarea prelucrării – în anumite condiții, aveți dreptul de a restrânge prelucrarea datelor dumneavoastră personale;',
      'Dreptul la portabilitatea datelor;',
      'Dreptul de a vă opune în orice moment;',
      'Dreptul de a formula obiecții;',
      'Dreptul de a adresa o plângere legată de procesarea datelor cu caracter personal;',
      'Dreptul de a înainta plângere către autoritatea de supraveghere în situația în care considerați că datele dumneavoastră nu au fost prelucrate conform legii;',
      'Dreptul de a vă adresa justiției în situația în care ați suferit un prejudiciu în urma prelucrării datelor cu caracter personal.',
    ],
    responsibilityH3: 'Responsabilitate',
    responsibilityP1:
      'Furnizarea datelor cu caracter personal în cadrul campaniei Muzică pentru Viață este voluntară. Datele colectate sunt utilizate exclusiv în scopul procesării donațiilor și comunicării cu donatorii.',
    securityH3: 'Securitate',
    securityP1:
      'Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră cu caracter personal împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii. Toate tranzacțiile de donații sunt procesate prin intermediul platformei securizate EuPlătesc.ro.',
    contactH3: 'Contact',
    contactIntro:
      'Pentru orice întrebări sau informații suplimentare privind protecția datelor cu caracter personal, vă rugăm să ne contactați la:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Telefon', value: '0255 210 100' },
      { label: 'Adresă', value: 'Str. Ciprian Porumbescu, Nr. 59, Timișoara' },
    ],
    rightsExercise:
      'Pentru exercitarea drepturilor dumneavoastră privind protecția datelor, vă puteți adresa responsabilului cu protecția datelor la adresa de email: dpo@oncohelp.ro sau la următoarea adresă de corespondență: str. Ciprian Porumbescu nr. 59, Localitatea Timișoara, Județul Timiș.',
    moreInfo: 'Alte informații se pot găsi la adresa: https://www.dataprotection.ro/',
    thanks:
      'Vă mulțumim că susțineți campania Muzică pentru Viață și construcția primului spital oncologic din Reșița!',
  },

  en: {
    h1: 'Privacy Policy and Data Protection',
    h2: 'INFORMATION NOTICE on the processing of personal data',
    p1:
      'The Muzică pentru Viață campaign, organized by Radio România Reșița in partnership with the OncoHelp Association (Timișoara), respects the privacy and protection of personal data of visitors and donors.',
    operatorH3: 'Identity and contact details of the data controller',
    operatorP1:
      'The Muzică pentru Viață campaign is organized by Radio România Reșița in partnership with the OncoHelp Association (Timișoara) – OncoHelp Oncology Center, headquartered in Timișoara, Str. Ciprian Porumbescu, No. 59, established by Civil Ruling no. 306/27.05.2005, VAT/CIF: 17802939, tel: 0356/460995, fax: 0356/460996, legally represented by manager Borugă Valeriu Ioan.',
    operatorP2: 'Data protection officer contact details: email: dpo@oncohelp.ro, tel: 0744581764.',
    purposeH3: 'Purpose and legal basis of processing',
    purposeP1:
      'The purpose of collecting and using personal data within the Muzică pentru Viață campaign is to ensure the donation process and communication with donors. Personal data will be collected and used only for and in connection with donation processing and communicating campaign information.',
    purposeP2: 'The campaign processes personal data to provide campaign information and to process donations.',
    typesH3: 'Types of personal data we process',
    typesIntro:
      'Within the Muzică pentru Viață campaign, we collect only the personal data necessary for processing donations and communication. This may include:',
    types: [
      'Name and surname (optional for donations)',
      'Email address (optional for donations)',
      'Contact details for communication',
      'Donation information (amount, date, etc.)',
    ],
    storageH3: 'Storage of personal data',
    storageP1:
      'Personal data is stored under secure conditions. Data is protected against unauthorized access, modification, disclosure or destruction.',
    recipientsH3: 'Recipients or categories of recipients of personal data',
    recipientsP1:
      'Personal data is collected and processed by the organizers of the Muzică pentru Viață campaign. This data is not shared with third parties without the explicit consent of the data subject, except where required by law.',
    rightsH3: 'Rights of data subjects regarding personal data processing',
    rightsIntro: 'As a data subject, you have the following rights:',
    rights: [
      'Right to information and access to your personal data;',
      'Right to obtain, upon request and free of charge, confirmation that your data is being processed;',
      'Right to rectification – to correct inaccurate or incomplete data we hold about you;',
      'Right to be forgotten (erasure);',
      'Right to restriction of processing – under certain conditions;',
      'Right to data portability;',
      'Right to object at any time;',
      'Right to lodge objections;',
      'Right to lodge a complaint related to the processing of personal data;',
      'Right to lodge a complaint with the supervisory authority if you consider your data was not processed lawfully;',
      'Right to seek judicial remedy if you have suffered damage as a result of personal data processing.',
    ],
    responsibilityH3: 'Responsibility',
    responsibilityP1:
      'Providing personal data within the Muzică pentru Viață campaign is voluntary. The collected data is used exclusively for processing donations and communicating with donors.',
    securityH3: 'Security',
    securityP1:
      'We implement appropriate technical and organizational measures to protect personal data against unauthorized access, modification, disclosure or destruction. All donation transactions are processed through the secure EuPlătesc.ro platform.',
    contactH3: 'Contact',
    contactIntro: 'For any questions or additional information regarding personal data protection, please contact us at:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Phone', value: '0255 210 100' },
      { label: 'Address', value: 'Str. Ciprian Porumbescu, No. 59, Timișoara' },
    ],
    rightsExercise:
      'To exercise your data protection rights, you may contact the data protection officer at dpo@oncohelp.ro or by mail at: Str. Ciprian Porumbescu no. 59, Timișoara, Timiș County.',
    moreInfo: 'More information can be found at: https://www.dataprotection.ro/',
    thanks:
      'Thank you for supporting the Muzică pentru Viață campaign and the construction of the first oncology hospital in Reșița!',
  },

  de: {
    h1: 'Datenschutzerklärung',
    h2: 'INFORMATION zur Verarbeitung personenbezogener Daten',
    p1:
      'Die Kampagne Muzică pentru Viață, organisiert von Radio România Reșița in Partnerschaft mit der OncoHelp-Vereinigung (Timișoara), respektiert die Vertraulichkeit und den Schutz personenbezogener Daten von Besucher:innen und Spender:innen.',
    operatorH3: 'Identität und Kontaktdaten des Verantwortlichen',
    operatorP1:
      'Die Kampagne wird von Radio România Reșița in Partnerschaft mit der OncoHelp-Vereinigung (Timișoara) – OncoHelp Oncology Center – organisiert. Sitz: Timișoara, Str. Ciprian Porumbescu, Nr. 59; gegründet durch Zivilbeschluss Nr. 306/27.05.2005; CIF: 17802939; Tel.: 0356/460995; Fax: 0356/460996; gesetzlich vertreten durch Manager Borugă Valeriu Ioan.',
    operatorP2: 'Kontaktdaten des Datenschutzbeauftragten: E-Mail: dpo@oncohelp.ro, Tel.: 0744581764.',
    purposeH3: 'Zweck und Rechtsgrundlage der Verarbeitung',
    purposeP1:
      'Zweck der Erhebung und Nutzung personenbezogener Daten ist die Abwicklung des Spendenprozesses sowie die Kommunikation mit Spender:innen. Daten werden nur in diesem Zusammenhang erhoben und verwendet.',
    purposeP2: 'Die Kampagne verarbeitet personenbezogene Daten zur Bereitstellung von Informationen und zur Abwicklung von Spenden.',
    typesH3: 'Arten personenbezogener Daten',
    typesIntro:
      'Wir erheben nur die für Spendenabwicklung und Kommunikation erforderlichen Daten. Dazu können gehören:',
    types: ['Name und Vorname (optional)', 'E-Mail-Adresse (optional)', 'Kontaktdaten für Kommunikation', 'Spendeninformationen (Betrag, Datum usw.)'],
    storageH3: 'Speicherung',
    storageP1:
      'Die Speicherung erfolgt unter sicheren Bedingungen. Daten werden vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung geschützt.',
    recipientsH3: 'Empfänger',
    recipientsP1:
      'Personenbezogene Daten werden von den Organisatoren der Kampagne erhoben und verarbeitet. Eine Weitergabe an Dritte erfolgt ohne ausdrückliche Einwilligung nicht, außer in gesetzlich vorgesehenen Fällen.',
    rightsH3: 'Rechte der betroffenen Personen',
    rightsIntro: 'Als betroffene Person haben Sie folgende Rechte:',
    rights: [
      'Auskunft und Zugang zu Ihren Daten;',
      'Bestätigung der Verarbeitung (kostenfrei, auf Anfrage);',
      'Berichtigung unrichtiger/unvollständiger Daten;',
      'Löschung (Recht auf Vergessenwerden);',
      'Einschränkung der Verarbeitung;',
      'Datenübertragbarkeit;',
      'Widerspruch jederzeit;',
      'Einwände vorbringen;',
      'Beschwerde bzgl. Datenverarbeitung;',
      'Beschwerde bei der Aufsichtsbehörde;',
      'Gerichtlicher Rechtsbehelf bei Schaden.',
    ],
    responsibilityH3: 'Verantwortung',
    responsibilityP1:
      'Die Bereitstellung personenbezogener Daten ist freiwillig. Die Daten werden ausschließlich zur Spendenabwicklung und Kommunikation verwendet.',
    securityH3: 'Sicherheit',
    securityP1:
      'Wir setzen geeignete technische und organisatorische Maßnahmen zum Schutz Ihrer Daten ein. Spenden-Zahlungen werden über die sichere Plattform EuPlătesc.ro verarbeitet.',
    contactH3: 'Kontakt',
    contactIntro: 'Für Fragen zum Datenschutz kontaktieren Sie uns bitte unter:',
    contact: [
      { label: 'E-Mail', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Telefon', value: '0255 210 100' },
      { label: 'Adresse', value: 'Str. Ciprian Porumbescu, Nr. 59, Timișoara' },
    ],
    rightsExercise:
      'Zur Ausübung Ihrer Rechte können Sie den Datenschutzbeauftragten unter dpo@oncohelp.ro kontaktieren oder per Post an: Str. Ciprian Porumbescu Nr. 59, Timișoara, Kreis Timiș.',
    moreInfo: 'Weitere Informationen: https://www.dataprotection.ro/',
    thanks: 'Vielen Dank für Ihre Unterstützung!',
  },

  fr: {
    h1: 'Politique de confidentialité',
    h2: "NOTE D’INFORMATION sur le traitement des données personnelles",
    p1:
      'La campagne Muzică pentru Viață, organisée par Radio România Reșița en partenariat avec l’Association OncoHelp (Timișoara), respecte la confidentialité et la protection des données personnelles des visiteurs et donateurs.',
    operatorH3: "Identité et coordonnées du responsable du traitement",
    operatorP1:
      'La campagne est organisée par Radio România Reșița en partenariat avec l’Association OncoHelp (Timișoara) – Centre d’oncologie OncoHelp – siège: Timișoara, Str. Ciprian Porumbescu, n° 59; décision civile n° 306/27.05.2005; CIF: 17802939; tél.: 0356/460995; fax: 0356/460996; représentée légalement par le manager Borugă Valeriu Ioan.',
    operatorP2: 'Coordonnées du DPO: e-mail: dpo@oncohelp.ro, tél.: 0744581764.',
    purposeH3: 'Finalité et base légale',
    purposeP1:
      'La collecte et l’utilisation des données personnelles visent à assurer le processus de don et la communication avec les donateurs. Les données sont collectées et utilisées uniquement à ces fins.',
    purposeP2: 'La campagne traite les données pour fournir des informations et traiter les dons.',
    typesH3: 'Types de données traitées',
    typesIntro:
      'Nous collectons uniquement les données nécessaires au traitement des dons et à la communication, notamment :',
    types: ['Nom et prénom (facultatif)', 'Adresse e-mail (facultatif)', 'Coordonnées de contact', 'Informations sur le don (montant, date, etc.)'],
    storageH3: 'Stockage',
    storageP1: 'Les données sont stockées dans des conditions de sécurité et protégées contre tout accès non autorisé.',
    recipientsH3: 'Destinataires',
    recipientsP1:
      'Les données personnelles sont collectées et traitées par les organisateurs de la campagne. Elles ne sont pas partagées avec des tiers sans consentement explicite, sauf obligation légale.',
    rightsH3: 'Droits des personnes concernées',
    rightsIntro: 'Vous disposez notamment des droits suivants :',
    rights: [
      'Accès et information;',
      'Confirmation du traitement;',
      'Rectification;',
      'Effacement;',
      'Limitation;',
      'Portabilité;',
      'Opposition;',
      'Objections;',
      'Réclamation;',
      'Plainte auprès de l’autorité;',
      'Recours judiciaire.',
    ],
    responsibilityH3: 'Responsabilité',
    responsibilityP1:
      'La fourniture des données est volontaire. Les données sont utilisées exclusivement pour traiter les dons et communiquer avec les donateurs.',
    securityH3: 'Sécurité',
    securityP1:
      'Nous appliquons des mesures techniques et organisationnelles appropriées. Les transactions de don sont traitées via la plateforme sécurisée EuPlătesc.ro.',
    contactH3: 'Contact',
    contactIntro: 'Pour toute question relative à la protection des données, contactez-nous :',
    contact: [
      { label: 'E-mail', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Téléphone', value: '0255 210 100' },
      { label: 'Adresse', value: 'Str. Ciprian Porumbescu, n° 59, Timișoara' },
    ],
    rightsExercise:
      'Pour exercer vos droits, vous pouvez contacter le DPO à dpo@oncohelp.ro ou par courrier à: Str. Ciprian Porumbescu n° 59, Timișoara, județ de Timiș.',
    moreInfo: 'Plus d’informations: https://www.dataprotection.ro/',
    thanks: 'Merci pour votre soutien !',
  },

  it: {
    h1: 'Informativa sulla privacy',
    h2: 'NOTA INFORMATIVA sul trattamento dei dati personali',
    p1:
      'La campagna Muzică pentru Viață, organizzata da Radio România Reșița in partnership con l’Associazione OncoHelp (Timișoara), rispetta la riservatezza e la protezione dei dati personali di visitatori e donatori.',
    operatorH3: 'Titolare del trattamento e contatti',
    operatorP1:
      'La campagna è organizzata da Radio România Reșița in partnership con l’Associazione OncoHelp (Timișoara) – Centro di Oncologia OncoHelp, con sede a Timișoara, Str. Ciprian Porumbescu, n. 59; decisione civile n. 306/27.05.2005; CIF: 17802939; tel: 0356/460995; fax: 0356/460996; rappresentata legalmente dal manager Borugă Valeriu Ioan.',
    operatorP2: 'Contatti DPO: email: dpo@oncohelp.ro, tel: 0744581764.',
    purposeH3: 'Finalità e base giuridica',
    purposeP1:
      'La raccolta e l’uso dei dati personali sono finalizzati a garantire il processo di donazione e la comunicazione con i donatori. I dati vengono raccolti e utilizzati solo per tali scopi.',
    purposeP2: 'La campagna tratta i dati per fornire informazioni e processare le donazioni.',
    typesH3: 'Tipi di dati trattati',
    typesIntro: 'Raccogliamo solo i dati necessari per le donazioni e la comunicazione, ad esempio:',
    types: ['Nome e cognome (facoltativo)', 'Email (facoltativa)', 'Dati di contatto', 'Informazioni sulla donazione (importo, data, ecc.)'],
    storageH3: 'Conservazione',
    storageP1: 'I dati sono conservati in condizioni di sicurezza e protetti da accessi non autorizzati.',
    recipientsH3: 'Destinatari',
    recipientsP1:
      'I dati personali sono raccolti e trattati dagli organizzatori della campagna e non vengono condivisi con terzi senza consenso esplicito, salvo obblighi di legge.',
    rightsH3: 'Diritti degli interessati',
    rightsIntro: 'In qualità di interessato, hai i seguenti diritti:',
    rights: [
      'Accesso e informazione;',
      'Conferma del trattamento;',
      'Rettifica;',
      'Cancellazione;',
      'Limitazione;',
      'Portabilità;',
      'Opposizione;',
      'Obiezioni;',
      'Reclamo;',
      'Reclamo all’autorità;',
      'Tutela giudiziaria.',
    ],
    responsibilityH3: 'Responsabilità',
    responsibilityP1: 'Il conferimento dei dati è volontario e i dati sono usati esclusivamente per donazioni e comunicazione.',
    securityH3: 'Sicurezza',
    securityP1: 'Adottiamo misure tecniche e organizzative adeguate. Le transazioni sono processate tramite EuPlătesc.ro.',
    contactH3: 'Contatti',
    contactIntro: 'Per domande sulla protezione dei dati personali, contattaci a:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Telefono', value: '0255 210 100' },
      { label: 'Indirizzo', value: 'Str. Ciprian Porumbescu, n. 59, Timișoara' },
    ],
    rightsExercise:
      'Per esercitare i tuoi diritti puoi contattare il DPO a dpo@oncohelp.ro o per posta a: Str. Ciprian Porumbescu n. 59, Timișoara, Județul Timiș.',
    moreInfo: 'Altre informazioni: https://www.dataprotection.ro/',
    thanks: 'Grazie per il tuo sostegno!',
  },

  es: {
    h1: 'Política de privacidad y protección de datos',
    h2: 'NOTA INFORMATIVA sobre el tratamiento de datos personales',
    p1:
      'La campaña Muzică pentru Viață, organizada por Radio România Reșița en colaboración con la Asociación OncoHelp (Timișoara), respeta la confidencialidad y la protección de los datos personales de visitantes y donantes.',
    operatorH3: 'Identidad y datos de contacto del responsable',
    operatorP1:
      'La campaña Muzică pentru Viață está organizada por Radio România Reșița en colaboración con la Asociación OncoHelp (Timișoara) – Centro de Oncología OncoHelp, con sede en Timișoara, Str. Ciprian Porumbescu, N.º 59, establecida por Resolución civil n.º 306/27.05.2005, CIF: 17802939, tel: 0356/460995, fax: 0356/460996, representada legalmente por el gerente Borugă Valeriu Ioan.',
    operatorP2: 'Datos de contacto del Delegado de Protección de Datos: email: dpo@oncohelp.ro, tel: 0744581764.',
    purposeH3: 'Finalidad y base legal del tratamiento',
    purposeP1:
      'La finalidad de la recopilación y uso de los datos personales en el marco de la campaña es garantizar el proceso de donaciones y la comunicación con los donantes. Los datos se recopilan y utilizan únicamente para el procesamiento de donaciones y la comunicación de información sobre la campaña.',
    purposeP2: 'La campaña trata datos personales para proporcionar información y procesar donaciones.',
    typesH3: 'Tipos de datos personales que tratamos',
    typesIntro:
      'Recopilamos únicamente los datos necesarios para el procesamiento de donaciones y la comunicación. Esto puede incluir:',
    types: [
      'Nombre y apellidos (opcional para donaciones)',
      'Dirección de email (opcional para donaciones)',
      'Datos de contacto para comunicación',
      'Información sobre la donación (importe, fecha, etc.)',
    ],
    storageH3: 'Conservación de datos personales',
    storageP1:
      'Los datos personales se almacenan en condiciones de seguridad y están protegidos frente a accesos no autorizados, modificación, divulgación o destrucción.',
    recipientsH3: 'Destinatarios o categorías de destinatarios',
    recipientsP1:
      'Los datos personales son recopilados y tratados por los organizadores de la campaña Muzică pentru Viață. No se comparten con terceros sin el consentimiento explícito del interesado, salvo en los casos previstos por la ley.',
    rightsH3: 'Derechos de los interesados',
    rightsIntro: 'Como interesado, tienes los siguientes derechos:',
    rights: [
      'Derecho de información y acceso;',
      'Derecho a obtener confirmación del tratamiento;',
      'Derecho de rectificación;',
      'Derecho de supresión;',
      'Derecho a la limitación del tratamiento;',
      'Derecho a la portabilidad;',
      'Derecho de oposición;',
      'Derecho a formular objeciones;',
      'Derecho a presentar una reclamación;',
      'Derecho a reclamar ante la autoridad de control;',
      'Derecho a acudir a la vía judicial en caso de perjuicio.',
    ],
    responsibilityH3: 'Responsabilidad',
    responsibilityP1:
      'La aportación de datos personales es voluntaria. Los datos recopilados se utilizan exclusivamente para el procesamiento de donaciones y la comunicación con los donantes.',
    securityH3: 'Seguridad',
    securityP1:
      'Aplicamos medidas técnicas y organizativas adecuadas para proteger los datos personales. Todas las transacciones de donación se procesan a través de la plataforma segura EuPlătesc.ro.',
    contactH3: 'Contacto',
    contactIntro: 'Para cualquier pregunta o información adicional sobre protección de datos, contáctanos en:',
    contact: [
      { label: 'Email', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'Teléfono', value: '0255 210 100' },
      { label: 'Dirección', value: 'Str. Ciprian Porumbescu, Nr. 59, Timișoara' },
    ],
    rightsExercise:
      'Para ejercer tus derechos puedes dirigirte al Delegado de Protección de Datos en dpo@oncohelp.ro o por correo a: Str. Ciprian Porumbescu n.º 59, Timișoara, Județul Timiș.',
    moreInfo: 'Más información en: https://www.dataprotection.ro/',
    thanks: '¡Gracias por tu apoyo!',
  },

  ar: {
    h1: 'سياسة الخصوصية وحماية البيانات',
    h2: 'إشعار معلومات حول معالجة البيانات الشخصية',
    p1:
      'تحترم حملة Muzică pentru Viață، التي تنظمها Radio România Reșița بالشراكة مع جمعية OncoHelp (تيميشوارا)، خصوصية وحماية البيانات الشخصية للزوار والمتبرعين.',
    operatorH3: 'هوية جهة التحكم وبيانات الاتصال',
    operatorP1:
      'تُنظَّم الحملة من قبل Radio România Reșița بالشراكة مع جمعية OncoHelp (تيميشوارا) – مركز OncoHelp للأورام – ومقره: Timișoara, Str. Ciprian Porumbescu رقم 59؛ قرار مدني رقم 306/27.05.2005؛ CIF: 17802939؛ هاتف: 0356/460995؛ فاكس: 0356/460996؛ ويمثلها قانونيًا المدير Borugă Valeriu Ioan.',
    operatorP2: 'بيانات مسؤول حماية البيانات: البريد الإلكتروني dpo@oncohelp.ro، هاتف 0744581764.',
    purposeH3: 'الغرض والأساس القانوني',
    purposeP1:
      'الغرض من جمع واستخدام البيانات الشخصية هو ضمان عملية التبرع والتواصل مع المتبرعين. تُجمع البيانات وتُستخدم فقط لهذه الأغراض.',
    purposeP2: 'تتم معالجة البيانات لتقديم معلومات عن الحملة ومعالجة التبرعات.',
    typesH3: 'أنواع البيانات التي نعالجها',
    typesIntro: 'نجمع فقط البيانات اللازمة للتبرعات والتواصل، وقد تشمل:',
    types: ['الاسم واللقب (اختياري)', 'البريد الإلكتروني (اختياري)', 'بيانات الاتصال', 'معلومات التبرع (المبلغ، التاريخ، إلخ)'],
    storageH3: 'تخزين البيانات',
    storageP1: 'يتم التخزين في ظروف آمنة وحماية البيانات من الوصول غير المصرح به أو التعديل أو الإفشاء أو الإتلاف.',
    recipientsH3: 'الجهات المستلمة للبيانات',
    recipientsP1:
      'تُجمع البيانات وتُعالج من قبل منظمي الحملة ولا تُشارك مع أطراف ثالثة دون موافقة صريحة إلا إذا كان ذلك مطلوبًا قانونًا.',
    rightsH3: 'حقوق أصحاب البيانات',
    rightsIntro: 'لديك الحقوق التالية:',
    rights: ['الاطلاع والوصول', 'تأكيد المعالجة', 'التصحيح', 'المحو', 'تقييد المعالجة', 'قابلية نقل البيانات', 'الاعتراض', 'تقديم اعتراضات', 'تقديم شكوى', 'شكوى لدى الجهة الرقابية', 'اللجوء للقضاء'],
    responsibilityH3: 'المسؤولية',
    responsibilityP1: 'تقديم البيانات طوعي وتستخدم البيانات حصريًا لمعالجة التبرعات والتواصل.',
    securityH3: 'الأمان',
    securityP1: 'نطبق إجراءات تقنية وتنظيمية مناسبة، وتتم معالجة معاملات التبرع عبر منصة EuPlătesc.ro الآمنة.',
    contactH3: 'التواصل',
    contactIntro: 'لأي أسئلة حول حماية البيانات، يرجى التواصل معنا عبر:',
    contact: [
      { label: 'البريد الإلكتروني', value: 'contact@radioromania.ro', href: 'mailto:contact@radioromania.ro' },
      { label: 'الهاتف', value: '0255 210 100' },
      { label: 'العنوان', value: 'Str. Ciprian Porumbescu, Nr. 59, Timișoara' },
    ],
    rightsExercise:
      'لممارسة حقوقك يمكنك مراسلة مسؤول حماية البيانات على dpo@oncohelp.ro أو عبر البريد إلى: Str. Ciprian Porumbescu رقم 59، Timișoara، Județul Timiș.',
    moreInfo: 'مزيد من المعلومات: https://www.dataprotection.ro/',
    thanks: 'شكرًا لدعمكم!',
  },
};

export default function PrivacyPolicyPage() {
  const { lang } = useI18n();
  const t = translations[lang] || translations.ro;

  return (
    <div className="page-wrapper">
      <main className="page">
        <section className="privacy-section">
          <div className="privacy-container">
            <h1>{t.h1}</h1>
            <h2>{t.h2}</h2>
            <p>{t.p1}</p>

            <h3>{t.operatorH3}</h3>
            <p>{t.operatorP1}</p>
            <p>{t.operatorP2}</p>

            <h3>{t.purposeH3}</h3>
            <p>{t.purposeP1}</p>
            <p>{t.purposeP2}</p>

            <h3>{t.typesH3}</h3>
            <p>{t.typesIntro}</p>
            <ul>
              {t.types.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <h3>{t.storageH3}</h3>
            <p>{t.storageP1}</p>

            <h3>{t.recipientsH3}</h3>
            <p>{t.recipientsP1}</p>

            <h3>{t.rightsH3}</h3>
            <p>{t.rightsIntro}</p>
            <ol>
              {t.rights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>

            <h3>{t.responsibilityH3}</h3>
            <p>{t.responsibilityP1}</p>

            <h3>{t.securityH3}</h3>
            <p>{t.securityP1}</p>

            <h3>{t.contactH3}</h3>
            <p>{t.contactIntro}</p>
            <ul>
              {t.contact.map((c) => (
                <li key={c.label}>
                  {c.label}: {c.href ? <a href={c.href}>{c.value}</a> : c.value}
                </li>
              ))}
            </ul>

            <p>
              {t.rightsExercise}{' '}
              <a href="mailto:dpo@oncohelp.ro">dpo@oncohelp.ro</a>
            </p>

            <p>
              {t.moreInfo}{' '}
              <a href="https://www.dataprotection.ro/" target="_blank" rel="noopener noreferrer">
                https://www.dataprotection.ro/
              </a>
            </p>

            <p>{t.thanks}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
