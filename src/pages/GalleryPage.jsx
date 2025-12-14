import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useI18n } from '../i18n/I18nProvider.jsx';

const timelineBase = [
  { year: '2015', image: '/2015.jpg', position: 'left' },
  { year: '2016', image: '/2016.jpg', position: 'right' },
  { year: '2017', image: '/2017.jpg', position: 'left' },
  { year: '2018', image: '/2018.jpg', position: 'right' },
  { year: '2019', image: '/2019.jpg', position: 'left' },
  { year: '2020', image: '/2020.jpg', position: 'right' },
  { year: '2021', image: '/2021.jpg', position: 'left' },
  { year: '2022', image: '/2022.jpg', position: 'right' },
  { year: '2023', image: '/2023.jpg', position: 'left' },
  { year: '2024', image: '/2024.jpg', position: 'right' },
  { year: '2025', image: '/2025.png', position: 'left' },
];

const timelineI18n = {
  ro: {
    headerOverline: 'Cronologia Campaniei',
    headerTitle: 'Muzică pentru viață, pentru oameni, pentru un spital oncologic la Reșița.',
    headerLead1: 'O comunitate, o țară, iar acum… o lume întreagă.',
    headerLead2:
      'Efortul colectiv este dovada că se poate, mai ales atunci când se dorește. Muzică Pentru Viață împlinește zece ani. Zece ani de unitate si luptă, zece ani în care oamenii se alătură, dăruiesc și susțin cu stoicism o cauză nobilă: construirea primului spital oncologic la Reșița.',
    headerLead3: 'Acum suntem tot mai aproape, iar spitalul are deja o clădire.',
    events: [
      {
        title: 'Începuturi',
        description:
          'Radio România Reșița dă startul unei campanii care avea, prin gesturi mici, să schimbe o comunitate întreagă. Muzică Pentru Viață ia naștere între 2015 și 2016. În scurt timp, primul strop de speranță își face loc în inimile oamenilor din Banat.',
        alt: 'Imagine din anul 2015 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Sprijin',
        description:
          'Campania prinde rădăcini puternice și sprijină centrul oncologic de la Slatina Nera. Muzică pentru viață devine un concept îndrăgit și așteptat cu nerăbdare în fiecare an.',
        alt: 'Imagine din anul 2016 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Dăruință',
        description:
          'Muzică Pentru Viață oferă ajutor centrului Cristian Șerban. Un centru de evaluare și recuperare pentru copii și tineri cu diabet și hemofilie situat în Buziaș.',
        alt: 'Imagine din anul 2017 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Speranță',
        description:
          'În acest an, Muzică Pentru Viață a adus speranţă pentru copii cu nevoi speciale de la Centrul Primăvara. Căsuța de sticlă a devenit locul unde visele chiar se împlinesc.',
        alt: 'Imagine din anul 2018 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Lupta continuă',
        description:
          'Implicări active în sprijinerea pacienților bolnavi de cancer prin colaborări cu OncoHelp, clinici de tratament și diverse instituții. Povestea merge mai departe și prinde un nou sens. Alături de Asociația OncoHelp, ne unim forțele pentru un scop comun: să oferim o șansă reală pacienților care luptă cu cancerul.',
        alt: 'Imagine din anul 2019 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Mobilizarea Comunității',
        description:
          'Muzică Pentru Viață a devenit o tradiție urbană. Glasul, dăruința și implicările comunității au evoluat și au răspândit ușor conceptul nostru în întreaga Românie.',
        alt: 'Imagine din anul 2020 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Misiunea merge mai departe',
        description:
          'Muzică Pentru Viață sprijină Asociaţia Patricia Popa, care de mai bine de 20 de ani ajută Spitalul Louis Ţurcanu din Timişoara cu medicamente, aparatură şi materiale sanitare.',
        alt: 'Imagine din anul 2021 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Alianțe',
        description:
          'Atât pe plan local, cât și național, campania începe să rezoneze tot mai mult cu inimile oamenilor, dar și ale instituțiilor. Apar parteneri dornici să se alăture nobilei cauze.',
        alt: 'Imagine din anul 2022 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Împreună chiar se poate',
        description:
          'Căsuța de sticlă strânge 35.000 EUR – o contribuție semnificativă pentru începerea proiectului OncoHelp la Reșița.',
        alt: 'Imagine din anul 2023 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Cine salvează o viață, salvează lumea',
        description:
          'Ca în fiecare an, mesajul continuă, iar căsuța de sticlă construiește pas cu pas drumul spre a le oferi pacienților bolnavi de cancer o șansă la tratament chiar la ei acasă.',
        alt: 'Imagine din anul 2024 pentru campania Muzică Pentru Viață',
      },
      {
        title: 'Un vis devenit realitate!',
        description:
          'Întreaga lume se alătură campaniei Muzică Pentru Viață, iar visul unui spital oncologic la Reșița devine, pas cu pas, realitate.',
        alt: 'Imagine din anul 2025 pentru campania Muzică Pentru Viață',
      },
    ],
  },
  en: {
    headerOverline: 'Campaign timeline',
    headerTitle: 'Music for life, for people, for an oncology hospital in Reșița.',
    headerLead1: 'A community, a country—and now… the whole world.',
    headerLead2:
      'Collective effort proves it can be done—especially when people truly want it. Muzică Pentru Viață turns ten. Ten years of unity and struggle, ten years in which people join, give and support a noble cause: building the first oncology hospital in Reșița.',
    headerLead3: 'We are closer than ever, and the hospital already has a building.',
    events: [
      {
        title: 'Beginnings',
        description:
          'Radio România Reșița launches a campaign that, through small gestures, would change an entire community. Muzică Pentru Viață is born between 2015 and 2016. Soon, the first drop of hope finds its way into the hearts of people in Banat.',
        alt: 'Image from 2015 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Support',
        description:
          'The campaign takes strong roots and supports the oncology center in Slatina Nera. Muzică pentru Viață becomes a beloved idea, awaited with excitement every year.',
        alt: 'Image from 2016 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Dedication',
        description:
          'Muzică Pentru Viață helps the Cristian Șerban center—an assessment and rehabilitation center for children and young people with diabetes and hemophilia, located in Buziaș.',
        alt: 'Image from 2017 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Hope',
        description:
          'This year, Muzică Pentru Viață brought hope to children with special needs at the Primăvara Center. The glass booth became the place where dreams truly come true.',
        alt: 'Image from 2018 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'The fight continues',
        description:
          'Active involvement in supporting cancer patients through collaborations with OncoHelp, treatment clinics and institutions. The story continues with new meaning: together with OncoHelp we unite our forces to offer a real chance to patients fighting cancer.',
        alt: 'Image from 2019 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Community mobilization',
        description:
          'Muzică Pentru Viață becomes an urban tradition. The community’s voice, generosity and involvement evolved and spread our concept across Romania.',
        alt: 'Image from 2020 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'The mission goes on',
        description:
          'Muzică Pentru Viață supports the Patricia Popa Association, which for over 20 years has helped the Louis Țurcanu Hospital in Timișoara with medication, equipment and sanitary supplies.',
        alt: 'Image from 2021 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Alliances',
        description:
          'Locally and nationally, the campaign resonates more and more with people and institutions. Partners appear, eager to join the noble cause.',
        alt: 'Image from 2022 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Together, it’s possible',
        description:
          'The glass booth raises 35,000 EUR—a significant contribution toward starting the OncoHelp project in Reșița.',
        alt: 'Image from 2023 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'Who saves a life, saves the world',
        description:
          'As every year, the message continues, and the glass booth builds step by step a path to offer cancer patients a real chance for treatment closer to home.',
        alt: 'Image from 2024 for the Muzică Pentru Viață campaign',
      },
      {
        title: 'A dream becoming reality!',
        description:
          'The whole world joins Muzică Pentru Viață, and the dream of an oncology hospital in Reșița becomes reality—step by step.',
        alt: 'Image from 2025 for the Muzică Pentru Viață campaign',
      },
    ],
  },
  de: {
    headerOverline: 'Chronik der Kampagne',
    headerTitle: 'Musik für das Leben – für Menschen – für ein Onkologie-Krankenhaus in Reșița.',
    headerLead1: 'Eine Gemeinschaft, ein Land – und jetzt… die ganze Welt.',
    headerLead2:
      'Gemeinsame Anstrengung ist der Beweis, dass es möglich ist – besonders wenn man es wirklich will. Muzică Pentru Viață wird zehn Jahre alt. Zehn Jahre Einheit und Kampf, zehn Jahre, in denen Menschen sich anschließen, geben und eine noble Sache unterstützen: den Bau des ersten Onkologie-Krankenhauses in Reșița.',
    headerLead3: 'Wir sind näher denn je, und das Krankenhaus hat bereits ein Gebäude.',
    events: [
      {
        title: 'Anfänge',
        description:
          'Radio România Reșița startet eine Kampagne, die mit kleinen Gesten eine ganze Gemeinschaft verändern sollte. Muzică Pentru Viață entsteht zwischen 2015 und 2016. Schon bald findet der erste Tropfen Hoffnung seinen Weg in die Herzen der Menschen im Banat.',
        alt: 'Bild aus dem Jahr 2015 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Unterstützung',
        description:
          'Die Kampagne schlägt starke Wurzeln und unterstützt das Onkologiezentrum in Slatina Nera. Muzică pentru Viață wird zu einem beliebten Konzept, auf das man sich jedes Jahr freut.',
        alt: 'Bild aus dem Jahr 2016 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Hingabe',
        description:
          'Muzică Pentru Viață hilft dem Cristian-Șerban-Zentrum – einem Evaluations- und Rehabilitationszentrum für Kinder und Jugendliche mit Diabetes und Hämophilie in Buziaș.',
        alt: 'Bild aus dem Jahr 2017 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Hoffnung',
        description:
          'In diesem Jahr brachte Muzică Pentru Viață Hoffnung für Kinder mit besonderen Bedürfnissen aus dem Primăvara-Zentrum. Die Glasbox wurde zum Ort, an dem Träume wirklich wahr werden.',
        alt: 'Bild aus dem Jahr 2018 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Der Kampf geht weiter',
        description:
          'Aktives Engagement zur Unterstützung von Krebspatienten durch Kooperationen mit OncoHelp, Behandlungskliniken und Institutionen. Die Geschichte geht weiter und bekommt neue Bedeutung: Gemeinsam mit OncoHelp bündeln wir unsere Kräfte, um Patienten im Kampf gegen Krebs eine echte Chance zu geben.',
        alt: 'Bild aus dem Jahr 2019 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Mobilisierung der Gemeinschaft',
        description:
          'Muzică Pentru Viață wird zur urbanen Tradition. Stimme, Großzügigkeit und Engagement der Gemeinschaft entwickelten sich weiter und verbreiteten unser Konzept in ganz Rumänien.',
        alt: 'Bild aus dem Jahr 2020 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Die Mission geht weiter',
        description:
          'Muzică Pentru Viață unterstützt die Patricia-Popa-Vereinigung, die seit über 20 Jahren das Louis-Țurcanu-Krankenhaus in Timișoara mit Medikamenten, Geräten und Sanitärmaterialien hilft.',
        alt: 'Bild aus dem Jahr 2021 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Allianzen',
        description:
          'Lokal wie national findet die Kampagne zunehmend Resonanz – bei Menschen wie bei Institutionen. Partner schließen sich an, bereit, die noble Sache zu unterstützen.',
        alt: 'Bild aus dem Jahr 2022 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Gemeinsam geht es',
        description:
          'Die Glasbox sammelt 35.000 EUR – ein bedeutender Beitrag zum Start des OncoHelp-Projekts in Reșița.',
        alt: 'Bild aus dem Jahr 2023 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Wer ein Leben rettet, rettet die Welt',
        description:
          'Wie jedes Jahr geht die Botschaft weiter, und die Glasbox baut Schritt für Schritt den Weg, um Krebspatienten eine Chance auf Behandlung näher an ihrem Zuhause zu geben.',
        alt: 'Bild aus dem Jahr 2024 für die Kampagne Muzică Pentru Viață',
      },
      {
        title: 'Ein Traum wird Wirklichkeit!',
        description:
          'Die ganze Welt schließt sich Muzică Pentru Viață an, und der Traum von einem Onkologie-Krankenhaus in Reșița wird Schritt für Schritt Wirklichkeit.',
        alt: 'Bild aus dem Jahr 2025 für die Kampagne Muzică Pentru Viață',
      },
    ],
  },
  fr: {
    headerOverline: 'Chronologie de la campagne',
    headerTitle: "De la musique pour la vie, pour les gens, pour un hôpital d’oncologie à Reșița.",
    headerLead1: 'Une communauté, un pays, et maintenant… le monde entier.',
    headerLead2:
      'L’effort collectif est la preuve que c’est possible, surtout quand on le veut vraiment. Muzică Pentru Viață fête ses dix ans : dix ans d’unité et de lutte, dix ans durant lesquels les gens se rassemblent, donnent et soutiennent une cause noble : construire le premier hôpital d’oncologie à Reșița.',
    headerLead3: "Nous sommes plus proches que jamais, et l’hôpital a déjà un bâtiment.",
    events: [
      {
        title: 'Les débuts',
        description:
          'Radio România Reșița lance une campagne qui, par de petits gestes, allait changer toute une communauté. Muzică Pentru Viață naît entre 2015 et 2016. Très vite, la première goutte d’espoir trouve sa place dans le cœur des habitants du Banat.',
        alt: 'Image de 2015 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Soutien',
        description:
          'La campagne s’enracine solidement et soutient le centre d’oncologie de Slatina Nera. Muzică pentru Viață devient un concept apprécié, attendu chaque année.',
        alt: 'Image de 2016 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Dévouement',
        description:
          'Muzică Pentru Viață apporte son aide au centre Cristian Șerban, un centre d’évaluation et de rééducation pour enfants et jeunes atteints de diabète et d’hémophilie, situé à Buziaș.',
        alt: 'Image de 2017 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Espoir',
        description:
          'Cette année, Muzică Pentru Viață apporte de l’espoir aux enfants à besoins spécifiques du Centre Primăvara. La cabine de verre devient le lieu où les rêves se réalisent.',
        alt: 'Image de 2018 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Le combat continue',
        description:
          'Engagement actif pour soutenir les patients atteints de cancer via des collaborations avec OncoHelp, des cliniques et des institutions. L’histoire continue et prend un nouveau sens : aux côtés d’OncoHelp, nous unissons nos forces pour offrir une vraie chance aux patients qui luttent contre le cancer.',
        alt: 'Image de 2019 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Mobilisation de la communauté',
        description:
          'Muzică Pentru Viață devient une tradition urbaine. La voix, la générosité et l’implication de la communauté évoluent et diffusent notre concept dans toute la Roumanie.',
        alt: 'Image de 2020 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'La mission continue',
        description:
          'Muzică Pentru Viață soutient l’Association Patricia Popa, qui aide depuis plus de 20 ans l’hôpital Louis Țurcanu de Timișoara avec des médicaments, du matériel et des fournitures sanitaires.',
        alt: 'Image de 2021 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Alliances',
        description:
          'Au niveau local et national, la campagne résonne de plus en plus auprès des personnes et des institutions. Des partenaires apparaissent, désireux de rejoindre cette noble cause.',
        alt: 'Image de 2022 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Ensemble, tout est possible',
        description:
          'La cabine de verre récolte 35 000 EUR – une contribution significative pour lancer le projet OncoHelp à Reșița.',
        alt: 'Image de 2023 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Qui sauve une vie sauve le monde',
        description:
          'Comme chaque année, le message continue, et la cabine de verre construit pas à pas le chemin pour offrir aux patients atteints de cancer une chance de traitement plus près de chez eux.',
        alt: 'Image de 2024 pour la campagne Muzică Pentru Viață',
      },
      {
        title: 'Un rêve qui devient réalité !',
        description:
          'Le monde entier rejoint Muzică Pentru Viață, et le rêve d’un hôpital d’oncologie à Reșița devient réalité, pas à pas.',
        alt: 'Image de 2025 pour la campagne Muzică Pentru Viață',
      },
    ],
  },
  it: {
    headerOverline: 'Cronologia della campagna',
    headerTitle: 'Musica per la vita, per le persone, per un ospedale oncologico a Reșița.',
    headerLead1: 'Una comunità, un Paese, e ora… il mondo intero.',
    headerLead2:
      'Lo sforzo collettivo è la prova che si può fare, soprattutto quando lo si desidera davvero. Muzică Pentru Viață compie dieci anni: dieci anni di unità e lotta, dieci anni in cui le persone si uniscono, donano e sostengono con determinazione una causa nobile: costruire il primo ospedale oncologico a Reșița.',
    headerLead3: 'Ora siamo sempre più vicini, e l’ospedale ha già un edificio.',
    events: [
      {
        title: 'Inizi',
        description:
          'Radio România Reșița dà il via a una campagna che, con piccoli gesti, avrebbe cambiato un’intera comunità. Muzică Pentru Viață nasce tra il 2015 e il 2016. In poco tempo, la prima goccia di speranza si fa strada nei cuori delle persone del Banat.',
        alt: 'Immagine del 2015 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Sostegno',
        description:
          'La campagna mette radici solide e sostiene il centro oncologico di Slatina Nera. Muzică pentru Viață diventa un concetto amato e atteso ogni anno.',
        alt: 'Immagine del 2016 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Dedizione',
        description:
          'Muzică Pentru Viață aiuta il centro Cristian Șerban, un centro di valutazione e recupero per bambini e giovani con diabete ed emofilia, situato a Buziaș.',
        alt: 'Immagine del 2017 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Speranza',
        description:
          'Quest’anno, Muzică Pentru Viață ha portato speranza ai bambini con bisogni speciali del Centro Primăvara. La casa di vetro è diventata il luogo dove i sogni si realizzano davvero.',
        alt: 'Immagine del 2018 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'La lotta continua',
        description:
          'Impegno attivo nel supporto ai pazienti oncologici attraverso collaborazioni con OncoHelp, cliniche e istituzioni. La storia continua e assume un nuovo significato: insieme a OncoHelp uniamo le forze per offrire una reale possibilità a chi combatte contro il cancro.',
        alt: 'Immagine del 2019 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Mobilitazione della comunità',
        description:
          'Muzică Pentru Viață diventa una tradizione urbana. La voce, la generosità e l’impegno della comunità si sono evoluti e hanno diffuso il nostro concetto in tutta la Romania.',
        alt: 'Immagine del 2020 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'La missione continua',
        description:
          'Muzică Pentru Viață sostiene l’Associazione Patricia Popa, che da oltre 20 anni aiuta l’Ospedale Louis Țurcanu di Timișoara con farmaci, attrezzature e materiali sanitari.',
        alt: 'Immagine del 2021 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Alleanze',
        description:
          'A livello locale e nazionale, la campagna risuona sempre più nei cuori delle persone e delle istituzioni. Arrivano partner desiderosi di unirsi a questa nobile causa.',
        alt: 'Immagine del 2022 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Insieme si può',
        description:
          'La casa di vetro raccoglie 35.000 EUR – un contributo significativo per avviare il progetto OncoHelp a Reșița.',
        alt: 'Immagine del 2023 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Chi salva una vita salva il mondo',
        description:
          'Come ogni anno, il messaggio continua e la casa di vetro costruisce passo dopo passo il percorso per offrire ai pazienti oncologici una chance di trattamento più vicina a casa.',
        alt: 'Immagine del 2024 per la campagna Muzică Pentru Viață',
      },
      {
        title: 'Un sogno che diventa realtà!',
        description:
          'Il mondo intero si unisce a Muzică Pentru Viață e il sogno di un ospedale oncologico a Reșița diventa realtà, passo dopo passo.',
        alt: 'Immagine del 2025 per la campagna Muzică Pentru Viață',
      },
    ],
  },
  es: {
    headerOverline: 'Cronología de la campaña',
    headerTitle: 'Música para la vida, para las personas, para un hospital oncológico en Reșița.',
    headerLead1: 'Una comunidad, un país y ahora… el mundo entero.',
    headerLead2:
      'El esfuerzo colectivo demuestra que se puede, especialmente cuando se quiere de verdad. Muzică Pentru Viață cumple diez años: diez años de unidad y lucha, diez años en los que la gente se une, dona y apoya una causa noble: construir el primer hospital oncológico en Reșița.',
    headerLead3: 'Ahora estamos más cerca que nunca y el hospital ya tiene un edificio.',
    events: [
      {
        title: 'Comienzos',
        description:
          'Radio România Reșița inicia una campaña que, con pequeños gestos, cambiaría una comunidad entera. Muzică Pentru Viață nace entre 2015 y 2016. Pronto, la primera gota de esperanza llega a los corazones de la gente en Banat.',
        alt: 'Imagen de 2015 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Apoyo',
        description:
          'La campaña echa raíces fuertes y apoya el centro oncológico de Slatina Nera. Muzică pentru Viață se convierte en un concepto querido y esperado cada año.',
        alt: 'Imagen de 2016 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Entrega',
        description:
          'Muzică Pentru Viață ayuda al centro Cristian Șerban, un centro de evaluación y recuperación para niños y jóvenes con diabetes y hemofilia en Buziaș.',
        alt: 'Imagen de 2017 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Esperanza',
        description:
          'Este año, Muzică Pentru Viață llevó esperanza a niños con necesidades especiales del Centro Primăvara. La cabina de cristal se convirtió en el lugar donde los sueños se hacen realidad.',
        alt: 'Imagen de 2018 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'La lucha continúa',
        description:
          'Implicación activa en el apoyo a pacientes con cáncer mediante colaboraciones con OncoHelp, clínicas e instituciones. La historia continúa con un nuevo sentido: junto a OncoHelp unimos fuerzas para ofrecer una oportunidad real a quienes luchan contra el cáncer.',
        alt: 'Imagen de 2019 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Movilización de la comunidad',
        description:
          'Muzică Pentru Viață se convierte en una tradición urbana. La voz, la generosidad y la implicación de la comunidad evolucionan y difunden nuestro concepto en toda Rumanía.',
        alt: 'Imagen de 2020 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'La misión continúa',
        description:
          'Muzică Pentru Viață apoya a la Asociación Patricia Popa, que desde hace más de 20 años ayuda al Hospital Louis Țurcanu de Timișoara con medicamentos, equipos y materiales sanitarios.',
        alt: 'Imagen de 2021 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Alianzas',
        description:
          'A nivel local y nacional, la campaña resuena cada vez más con la gente y las instituciones. Surgen socios deseosos de unirse a la noble causa.',
        alt: 'Imagen de 2022 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Juntos se puede',
        description:
          'La cabina de cristal reúne 35.000 EUR, una contribución significativa para iniciar el proyecto OncoHelp en Reșița.',
        alt: 'Imagen de 2023 para la campaña Muzică Pentru Viață',
      },
      {
        title: 'Quien salva una vida, salva el mundo',
        description:
          'Como cada año, el mensaje continúa y la cabina de cristal construye paso a paso el camino para ofrecer a los pacientes con cáncer una oportunidad de tratamiento más cerca de casa.',
        alt: 'Imagen de 2024 para la campaña Muzică Pentru Viață',
      },
      {
        title: '¡Un sueño hecho realidad!',
        description:
          'El mundo entero se une a Muzică Pentru Viață, y el sueño de un hospital oncológico en Reșița se convierte, paso a paso, en realidad.',
        alt: 'Imagen de 2025 para la campaña Muzică Pentru Viață',
      },
    ],
  },
  ar: {
    headerOverline: 'الخط الزمني للحملة',
    headerTitle: 'موسيقى من أجل الحياة، من أجل الناس، ومن أجل مستشفى للأورام في ريشيتسا.',
    headerLead1: 'مجتمع، دولة، والآن… العالم كله.',
    headerLead2:
      'الجهد الجماعي دليل على أن الأمر ممكن، خصوصًا عندما نريده حقًا. Muzică Pentru Viață تحتفل بعشر سنوات: عشر سنوات من الوحدة والنضال، عشر سنوات ينضم فيها الناس ويتبرعون ويدعمون قضية نبيلة: بناء أول مستشفى للأورام في ريشيتسا.',
    headerLead3: 'نحن أقرب من أي وقت مضى، وللمستشفى بالفعل مبنى.',
    events: [
      {
        title: 'البدايات',
        description:
          'تطلق إذاعة Radio România Reșița حملة كان من شأنها، عبر لفتات صغيرة، أن تغيّر مجتمعًا كاملًا. وُلدت Muzică Pentru Viață بين عامي 2015 و2016. وسرعان ما وجدت أول قطرة أمل طريقها إلى قلوب الناس في بانَات.',
        alt: 'صورة من عام 2015 لحملة Muzică Pentru Viață',
      },
      {
        title: 'الدعم',
        description:
          'ترسّخت الحملة بقوة ودعمت مركز الأورام في Slatina Nera. أصبحت Muzică pentru Viață فكرة محبوبة ومُنتظرة بشغف كل عام.',
        alt: 'صورة من عام 2016 لحملة Muzică Pentru Viață',
      },
      {
        title: 'العطاء',
        description:
          'قدمت Muzică Pentru Viață الدعم لمركز Cristian Șerban، وهو مركز تقييم وإعادة تأهيل للأطفال والشباب المصابين بالسكري والهيموفيليا في Buziaș.',
        alt: 'صورة من عام 2017 لحملة Muzică Pentru Viață',
      },
      {
        title: 'الأمل',
        description:
          'هذا العام جلبت Muzică Pentru Viață الأمل للأطفال ذوي الاحتياجات الخاصة في مركز Primăvara. أصبحت “الكابينة الزجاجية” المكان الذي تتحقق فيه الأحلام بالفعل.',
        alt: 'صورة من عام 2018 لحملة Muzică Pentru Viață',
      },
      {
        title: 'المعركة مستمرة',
        description:
          'انخراط فعّال في دعم مرضى السرطان عبر تعاونات مع OncoHelp وعيادات علاج ومؤسسات مختلفة. تستمر القصة بمعنى جديد: إلى جانب OncoHelp نوحّد جهودنا لمنح فرصة حقيقية للمرضى الذين يقاتلون السرطان.',
        alt: 'صورة من عام 2019 لحملة Muzică Pentru Viață',
      },
      {
        title: 'تعبئة المجتمع',
        description:
          'أصبحت Muzică Pentru Viață تقليدًا حضريًا. تطور صوت المجتمع وكرمه ومشاركته وانتشر مفهومنا في جميع أنحاء رومانيا.',
        alt: 'صورة من عام 2020 لحملة Muzică Pentru Viață',
      },
      {
        title: 'المهمة مستمرة',
        description:
          'تدعم Muzică Pentru Viață جمعية Patricia Popa التي تساعد منذ أكثر من 20 عامًا مستشفى Louis Țurcanu في Timișoara بالأدوية والمعدات والمواد الصحية.',
        alt: 'صورة من عام 2021 لحملة Muzică Pentru Viață',
      },
      {
        title: 'تحالفات',
        description:
          'محليًا ووطنيًا بدأت الحملة تلامس قلوب الناس والمؤسسات أكثر فأكثر. وظهر شركاء يرغبون في الانضمام إلى هذه القضية النبيلة.',
        alt: 'صورة من عام 2022 لحملة Muzică Pentru Viață',
      },
      {
        title: 'معًا يمكننا',
        description:
          'جمعت “الكابينة الزجاجية” 35,000 يورو – مساهمة مهمة لبدء مشروع OncoHelp في ريشيتسا.',
        alt: 'صورة من عام 2023 لحملة Muzică Pentru Viață',
      },
      {
        title: 'من ينقذ حياة ينقذ العالم',
        description:
          'كما في كل عام، تستمر الرسالة، وتبني “الكابينة الزجاجية” خطوة بخطوة طريقًا لمنح مرضى السرطان فرصة علاج أقرب إلى منازلهم.',
        alt: 'صورة من عام 2024 لحملة Muzică Pentru Viață',
      },
      {
        title: 'حلم يصبح واقعًا!',
        description:
          'ينضم العالم كله إلى Muzică Pentru Viață، ويصبح حلم مستشفى للأورام في ريشيتسا حقيقةً خطوة بخطوة.',
        alt: 'صورة من عام 2025 لحملة Muzică Pentru Viață',
      },
    ],
  },
};

function TimelineItem({ event, onImageClick }) {
  const [ref, isVisible] = useScrollAnimation(0.2, '0px 0px -60px 0px');
  const isLeft = event.position === 'left';
  const hideDetails = event.hideContent;

  const wrapperClasses = [
    'timeline-item-inner',
    'animate-on-scroll',
    isLeft ? 'animate-slide-left' : 'animate-slide-right',
    isVisible ? 'animate-fade-in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={`timeline-item timeline-item--${isLeft ? 'left' : 'right'}`}>
      <div className="timeline-item-marker" aria-hidden="true" />
      <div ref={ref} className={wrapperClasses}>
        {event.image && (
          <figure className="timeline-item-media">
            <img src={event.image} alt={event.alt} loading="lazy" onClick={() => onImageClick(event.image)} style={{ cursor: 'pointer' }} />
          </figure>
        )}
        <div className="timeline-item-content">
          <p className="timeline-item-year">{event.year}</p>
          {!hideDetails && (
            <>
              <h2 className="timeline-item-title">{event.title}</h2>
              <p className="timeline-item-text">{event.description}</p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default function TimelinePage() {
  const { lang } = useI18n();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lineRef, lineVisible] = useScrollAnimation(0.1, '-10% 0px -40% 0px');

  const i18n = timelineI18n[lang] || timelineI18n.ro;
  const timelineEvents = React.useMemo(
    () =>
      timelineBase.map((base, idx) => ({
        ...base,
        ...(i18n.events[idx] || timelineI18n.ro.events[idx]),
      })),
    [i18n]
  );

  const lineClasses = [
    'timeline-line',
    lineVisible ? 'timeline-line--visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="app-content">
      <section className="app-section timeline-section" aria-labelledby="timeline-title">
        <div className="app-section-header">
          <span className="app-section-overline">{i18n.headerOverline}</span>
          <h1 id="timeline-title" className="app-section-title">
            {i18n.headerTitle}
          </h1>
          <p className="app-section-lead">
            {i18n.headerLead1}
          </p>
          <p className="app-section-lead">
            {i18n.headerLead2}
          </p>
          <p className="app-section-lead">
            {i18n.headerLead3}
          </p>
        </div>

        <div className="timeline-container">
          <div ref={lineRef} className={lineClasses} aria-hidden="true" />

          <div className="timeline-items">
            {timelineEvents.map((event) => (
              <TimelineItem key={event.year} event={event} onImageClick={setSelectedImage} />
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" />
        </div>
      )}
    </div>
  );
}
