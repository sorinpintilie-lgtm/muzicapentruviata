import React from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function AboutResitaPage() {
  const { lang } = useI18n();

  const copy = React.useMemo(
    () =>
      ({
        ro: {
          overline: 'Despre Reșița',
          title: 'Reșița – Orașul care și-a transformat forța în solidaritate',
          pill: 'Dăruiește. Donează. Pentru viață.',
          p1:
            'Situat în sud-vestul României, Reșița este un oraș cu aproape 80.000 de oameni, așezat pe malurile Bârzavei și crescut între dealuri care i-au modelat identitatea. Timp de peste un secol, Reșița a fost inima industrială a țării, locul unde s-au construit locomotive, s-au aprins furnale și s-a scris istorie tehnică pentru întreaga Europă.',
          p2:
            'Astăzi, Reșița nu mai este orașul oțelului. Este orașul renașterii. Al oamenilor care se ridică împreună, care cred în comunitate, în cultură, în educație și în puterea gesturilor mici ce schimbă destine.',
          p3:
            'Aici, în Reșița, s-a născut Muzică pentru Viață – o inițiativă care a adunat în jurul ei mii de oameni, familii, copii, artiști, voluntari și inimile tuturor celor care își doresc un viitor în care bolnavii de cancer să nu mai fie nevoiți să plece departe pentru tratament.',
          p4:
            'Reșița este mai mult decât un oraș. Este o promisiune. Este o comunitate care nu stă deoparte, ci construiește – pas cu pas – speranță.',
          img1Alt: 'Peisaj urban din Reșița cu clădiri istorice',
          feature1Title: 'Patrimoniu Industrial',
          feature1Text:
            'Reșița păstrează urme ale epocii de glorie industriale, cu fabrici istorice și clădiri care amintesc de perioada când orașul era un centru feroviar important.',
          feature1Alt: 'Arhitectură industrială din Reșița',
          feature2Title: 'Instituții de Învățământ',
          feature2Text1:
            'Orașul este gazda Universității Eftimie Murgu, una dintre cele mai importante instituții de învățământ superior din regiunea Banatului.',
          feature2Text2: 'Centrul Universitar Universitatea „Babeș-Bolyai” Reșița',
          feature2Alt: 'Instituții culturale din Reșița',
          feature3Title: 'Spirit Comunitar',
          feature3Text:
            'Reșița are o comunitate puternică și implicată în proiecte sociale, culturale și caritabile, inclusiv inițiative pentru sănătatea publică.',
          feature3Alt: 'Comunitate activă din Reșița',
          whyTitle: 'De ce Reșița?',
          why1:
            'Reșița reprezintă spiritul Banatului: oameni harnici, comunități unite și dorința de a construi un viitor mai bun. Aici, fiecare proiect are impact real asupra vieților oamenilor.',
          why2:
            'Construirea primului spital oncologic din Reșița înseamnă nu doar infrastructură medicală modernă, ci și speranță pentru mii de oameni din regiune.',
          p5:
            'Reșița este un oraș care demonstrează că tradiția industrială poate coexista cu inovația modernă. De la fabricile care au pus orașul pe harta industrială europeană până la proiectele contemporane de dezvoltare, Reșița continuă să fie un exemplu de reziliență și progres.',
          p6:
            'Prin proiectul Muzică pentru Viață, Reșița își consolidează rolul de centru medical regional, oferind locuitorilor săi acces la îngrijiri oncologice de ultimă generație, chiar în orașul natal.',
        },
        en: {
          overline: 'About Reșița',
          title: 'Reșița – The city that turned strength into solidarity',
          pill: 'Give. Donate. For life.',
          p1:
            'Located in south-west Romania, Reșița is a city of nearly 80,000 people, set on the banks of the Bârzava River and shaped by the surrounding hills. For more than a century, Reșița was the country’s industrial heart—where locomotives were built, furnaces burned and technical history was written for all of Europe.',
          p2:
            'Today, Reșița is no longer the city of steel. It is the city of renewal—of people who rise together, who believe in community, culture, education and the power of small gestures that change destinies.',
          p3:
            'Here, in Reșița, Muzică pentru Viață was born—an initiative that gathered thousands of people, families, children, artists and volunteers around a shared dream: a future where cancer patients no longer have to travel far away for treatment.',
          p4:
            'Reșița is more than a city. It is a promise. It is a community that does not stand aside, but builds—step by step—hope.',
          img1Alt: 'Urban landscape in Reșița with historic buildings',
          feature1Title: 'Industrial Heritage',
          feature1Text:
            'Reșița preserves traces of its industrial golden age, with historic factories and buildings that recall the time when the city was an important railway hub.',
          feature1Alt: 'Industrial architecture in Reșița',
          feature2Title: 'Education',
          feature2Text1:
            'The city hosts Eftimie Murgu University, one of the most important higher-education institutions in the Banat region.',
          feature2Text2: 'University Center “Babeș-Bolyai” University Reșița.',
          feature2Alt: 'Educational institutions in Reșița',
          feature3Title: 'Community Spirit',
          feature3Text:
            'Reșița has a strong community involved in social, cultural and charitable projects, including public health initiatives.',
          feature3Alt: 'Active community in Reșița',
          whyTitle: 'Why Reșița?',
          why1:
            'Reșița represents the spirit of Banat: hardworking people, united communities and the desire to build a better future. Here, every project has a real impact on people’s lives.',
          why2:
            'Building the first oncology hospital in Reșița means not only modern medical infrastructure, but also hope for thousands of people in the region.',
          p5:
            'Reșița proves that industrial tradition can coexist with modern innovation. From the factories that put the city on Europe’s industrial map to today’s development projects, Reșița remains an example of resilience and progress.',
          p6:
            'Through Muzică pentru Viață, Reșița strengthens its role as a regional medical hub, giving residents access to state-of-the-art oncology care—right at home.',
        },
        de: {
          overline: 'Über Reșița',
          title: 'Reșița – Die Stadt, die Stärke in Solidarität verwandelt hat',
          pill: 'Geben. Spenden. Für das Leben.',
          p1:
            'Im Südwesten Rumäniens gelegen, ist Reșița eine Stadt mit fast 80.000 Einwohnern, am Fluss Bârzava und umgeben von Hügeln, die ihre Identität geprägt haben. Über ein Jahrhundert lang war Reșița das industrielle Herz des Landes – hier wurden Lokomotiven gebaut, Hochöfen betrieben und technische Geschichte für ganz Europa geschrieben.',
          p2:
            'Heute ist Reșița nicht mehr die Stadt des Stahls. Sie ist die Stadt der Erneuerung – der Menschen, die gemeinsam aufstehen, an Gemeinschaft, Kultur, Bildung und die Kraft kleiner Gesten glauben, die Schicksale verändern.',
          p3:
            'Hier, in Reșița, entstand Muzică pentru Viață – eine Initiative, die Tausende von Menschen, Familien, Kinder, Künstler und Freiwillige vereint hat. Für eine Zukunft, in der Krebspatienten nicht mehr weit weg reisen müssen, um behandelt zu werden.',
          p4:
            'Reșița ist mehr als eine Stadt. Sie ist ein Versprechen. Eine Gemeinschaft, die nicht abseits steht, sondern Schritt für Schritt Hoffnung aufbaut.',
          img1Alt: 'Stadtansicht von Reșița mit historischen Gebäuden',
          feature1Title: 'Industriekulturerbe',
          feature1Text:
            'Reșița bewahrt Spuren seiner industriellen Blütezeit – mit historischen Fabriken und Gebäuden, die an die Zeit erinnern, als die Stadt ein bedeutendes Eisenbahnzentrum war.',
          feature1Alt: 'Industriearchitektur in Reșița',
          feature2Title: 'Bildungseinrichtungen',
          feature2Text1:
            'Die Stadt beherbergt die Universität Eftimie Murgu, eine der wichtigsten Hochschulen in der Region Banat.',
          feature2Text2: 'Universitätszentrum der „Babeș-Bolyai“-Universität Reșița.',
          feature2Alt: 'Bildungseinrichtungen in Reșița',
          feature3Title: 'Gemeinschaftsgeist',
          feature3Text:
            'Reșița hat eine starke Gemeinschaft, die sich in sozialen, kulturellen und karitativen Projekten engagiert – einschließlich Initiativen für die öffentliche Gesundheit.',
          feature3Alt: 'Aktive Gemeinschaft in Reșița',
          whyTitle: 'Warum Reșița?',
          why1:
            'Reșița steht für den Geist des Banat: fleißige Menschen, vereinte Gemeinschaften und den Wunsch nach einer besseren Zukunft. Hier hat jedes Projekt echte Auswirkungen auf das Leben der Menschen.',
          why2:
            'Der Bau des ersten Onkologie-Krankenhauses in Reșița bedeutet nicht nur moderne medizinische Infrastruktur, sondern auch Hoffnung für Tausende von Menschen in der Region.',
          p5:
            'Reșița zeigt, dass industrielle Tradition und moderne Innovation zusammengehen können. Von den Fabriken, die die Stadt auf die europäische Industriekarte gesetzt haben, bis zu heutigen Entwicklungsprojekten bleibt Reșița ein Beispiel für Resilienz und Fortschritt.',
          p6:
            'Durch das Projekt Muzică pentru Viață stärkt Reșița seine Rolle als regionales medizinisches Zentrum und ermöglicht den Bewohnern Zugang zu modernster Onkologieversorgung – in der eigenen Stadt.',
        },
        fr: {
          overline: 'À propos de Reșița',
          title: 'Reșița – La ville qui a transformé sa force en solidarité',
          pill: 'Donner. Faire un don. Pour la vie.',
          p1:
            "Située dans le sud-ouest de la Roumanie, Reșița est une ville d’environ 80 000 habitants, posée sur les rives de la Bârzava et entourée de collines qui ont façonné son identité. Pendant plus d’un siècle, Reșița a été le cœur industriel du pays : on y a construit des locomotives, fait brûler des hauts fourneaux et écrit une histoire technique pour toute l’Europe.",
          p2:
            "Aujourd’hui, Reșița n’est plus la ville de l’acier. C’est la ville de la renaissance : des gens qui se relèvent ensemble, qui croient en la communauté, la culture, l’éducation et la force des petits gestes qui changent des destins.",
          p3:
            "C’est ici, à Reșița, qu’est née Muzică pentru Viață – une initiative qui a réuni des milliers de personnes, familles, enfants, artistes et bénévoles autour d’un même rêve : un avenir où les patients atteints de cancer n’auront plus à partir loin pour se soigner.",
          p4:
            'Reșița est plus qu’une ville. C’est une promesse. C’est une communauté qui ne reste pas à l’écart, mais qui construit – pas à pas – l’espoir.',
          img1Alt: 'Paysage urbain de Reșița avec des bâtiments historiques',
          feature1Title: 'Patrimoine industriel',
          feature1Text:
            "Reșița conserve des traces de son âge d’or industriel, avec des usines historiques et des bâtiments qui rappellent l’époque où la ville était un centre ferroviaire important.",
          feature1Alt: 'Architecture industrielle à Reșița',
          feature2Title: "Institutions d’enseignement",
          feature2Text1:
            'La ville accueille l’Université Eftimie Murgu, l’une des plus importantes institutions d’enseignement supérieur de la région du Banat.',
          feature2Text2: 'Centre universitaire de l’Université « Babeș-Bolyai » Reșița.',
          feature2Alt: "Institutions d’enseignement à Reșița",
          feature3Title: 'Esprit communautaire',
          feature3Text:
            'Reșița dispose d’une communauté forte, impliquée dans des projets sociaux, culturels et caritatifs, y compris des initiatives de santé publique.',
          feature3Alt: 'Communauté active à Reșița',
          whyTitle: 'Pourquoi Reșița ?',
          why1:
            'Reșița incarne l’esprit du Banat : des gens travailleurs, des communautés unies et la volonté de construire un avenir meilleur. Ici, chaque projet a un impact réel sur la vie des gens.',
          why2:
            'Construire le premier hôpital d’oncologie à Reșița, c’est non seulement une infrastructure médicale moderne, mais aussi de l’espoir pour des milliers de personnes dans la région.',
          p5:
            "Reșița démontre que la tradition industrielle peut coexister avec l’innovation moderne. Des usines qui ont placé la ville sur la carte industrielle européenne aux projets de développement contemporains, Reșița reste un exemple de résilience et de progrès.",
          p6:
            "Grâce au projet Muzică pentru Viață, Reșița consolide son rôle de centre médical régional, offrant à ses habitants un accès à des soins oncologiques de pointe, chez eux, dans leur ville.",
        },
        it: {
          overline: 'Su Reșița',
          title: 'Reșița – La città che ha trasformato la forza in solidarietà',
          pill: 'Dona. Contribuisci. Per la vita.',
          p1:
            'Situata nel sud-ovest della Romania, Reșița è una città di circa 80.000 abitanti, sulle rive del fiume Bârzava e circondata da colline che ne hanno modellato l’identità. Per oltre un secolo Reșița è stata il cuore industriale del Paese: qui si costruivano locomotive, si accendevano forni e si scriveva storia tecnica per tutta l’Europa.',
          p2:
            'Oggi Reșița non è più la città dell’acciaio. È la città della rinascita: persone che si rialzano insieme, che credono nella comunità, nella cultura, nell’educazione e nel potere dei piccoli gesti che cambiano i destini.',
          p3:
            'Qui, a Reșița, è nata Muzică pentru Viață – un’iniziativa che ha riunito migliaia di persone, famiglie, bambini, artisti e volontari attorno a un sogno: un futuro in cui i pazienti oncologici non debbano più andare lontano per curarsi.',
          p4:
            'Reșița è più di una città. È una promessa. È una comunità che non resta a guardare, ma costruisce – passo dopo passo – speranza.',
          img1Alt: 'Paesaggio urbano di Reșița con edifici storici',
          feature1Title: 'Patrimonio industriale',
          feature1Text:
            'Reșița conserva tracce della sua epoca d’oro industriale, con fabbriche storiche ed edifici che ricordano quando la città era un importante centro ferroviario.',
          feature1Alt: 'Architettura industriale a Reșița',
          feature2Title: "Istituzioni educative",
          feature2Text1:
            'La città ospita l’Università Eftimie Murgu, una delle più importanti istituzioni di istruzione superiore nella regione del Banat.',
          feature2Text2: 'Centro Universitario dell’Università “Babeș-Bolyai” Reșița.',
          feature2Alt: "Istituzioni educative a Reșița",
          feature3Title: 'Spirito comunitario',
          feature3Text:
            'Reșița ha una comunità forte e coinvolta in progetti sociali, culturali e caritativi, incluse iniziative di salute pubblica.',
          feature3Alt: 'Comunità attiva a Reșița',
          whyTitle: 'Perché Reșița?',
          why1:
            'Reșița rappresenta lo spirito del Banat: persone laboriose, comunità unite e il desiderio di costruire un futuro migliore. Qui, ogni progetto ha un impatto reale sulla vita delle persone.',
          why2:
            'Costruire il primo ospedale oncologico a Reșița significa non solo infrastrutture mediche moderne, ma anche speranza per migliaia di persone nella regione.',
          p5:
            'Reșița dimostra che la tradizione industriale può convivere con l’innovazione moderna. Dalle fabbriche che hanno messo la città sulla mappa industriale europea ai progetti contemporanei di sviluppo, Reșița continua a essere un esempio di resilienza e progresso.',
          p6:
            'Con il progetto Muzică pentru Viață, Reșița consolida il suo ruolo di centro medico regionale, offrendo ai residenti accesso a cure oncologiche di ultima generazione, nella propria città.',
        },
        es: {
          overline: 'Sobre Reșița',
          title: 'Reșița – La ciudad que transformó su fuerza en solidaridad',
          pill: 'Da. Dona. Por la vida.',
          p1:
            'Situada en el suroeste de Rumanía, Reșița es una ciudad de casi 80.000 habitantes, a orillas del río Bârzava y rodeada de colinas que han moldeado su identidad. Durante más de un siglo, Reșița fue el corazón industrial del país: aquí se construyeron locomotoras, se encendieron hornos y se escribió historia técnica para toda Europa.',
          p2:
            'Hoy Reșița ya no es la ciudad del acero. Es la ciudad del renacer: de la gente que se levanta unida, que cree en la comunidad, la cultura, la educación y el poder de los pequeños gestos que cambian destinos.',
          p3:
            'Aquí, en Reșița, nació Muzică pentru Viață: una iniciativa que reunió a miles de personas, familias, niños, artistas y voluntarios en torno a un sueño común: un futuro en el que los pacientes con cáncer no tengan que viajar lejos para recibir tratamiento.',
          p4:
            'Reșița es más que una ciudad. Es una promesa. Es una comunidad que no se queda al margen, sino que construye —paso a paso— esperanza.',
          img1Alt: 'Paisaje urbano de Reșița con edificios históricos',
          feature1Title: 'Patrimonio industrial',
          feature1Text:
            'Reșița conserva huellas de su época dorada industrial, con fábricas históricas y edificios que recuerdan cuando la ciudad era un importante centro ferroviario.',
          feature1Alt: 'Arquitectura industrial en Reșița',
          feature2Title: 'Instituciones educativas',
          feature2Text1:
            'La ciudad alberga la Universidad Eftimie Murgu, una de las instituciones de educación superior más importantes de la región de Banat.',
          feature2Text2: 'Centro Universitario de la Universidad “Babeș-Bolyai” Reșița.',
          feature2Alt: 'Instituciones educativas en Reșița',
          feature3Title: 'Espíritu comunitario',
          feature3Text:
            'Reșița tiene una comunidad fuerte e implicada en proyectos sociales, culturales y solidarios, incluidas iniciativas de salud pública.',
          feature3Alt: 'Comunidad activa en Reșița',
          whyTitle: '¿Por qué Reșița?',
          why1:
            'Reșița representa el espíritu de Banat: gente trabajadora, comunidades unidas y el deseo de construir un futuro mejor. Aquí, cada proyecto tiene un impacto real en la vida de las personas.',
          why2:
            'Construir el primer hospital oncológico en Reșița significa no solo infraestructura médica moderna, sino también esperanza para miles de personas en la región.',
          p5:
            'Reșița demuestra que la tradición industrial puede coexistir con la innovación moderna. Desde las fábricas que pusieron a la ciudad en el mapa industrial europeo hasta los proyectos contemporáneos de desarrollo, Reșița sigue siendo un ejemplo de resiliencia y progreso.',
          p6:
            'A través del proyecto Muzică pentru Viață, Reșița consolida su papel como centro médico regional, ofreciendo a sus habitantes acceso a cuidados oncológicos de última generación, en su propia ciudad.',
        },
        ar: {
          overline: 'حول ريشيتسا',
          title: 'ريشيتسا – مدينة حوّلت قوتها إلى تضامن',
          pill: 'قدّم. تبرّع. من أجل الحياة.',
          p1:
            'تقع ريشيتسا في جنوب غرب رومانيا، وهي مدينة يبلغ عدد سكانها قرابة 80 ألف نسمة على ضفاف نهر بارزافا وبين تلال شكّلت هويتها. لأكثر من قرن كانت ريشيتسا قلب الصناعة في البلاد؛ حيث صُنعت القاطرات، واشتعلت الأفران، وكُتبت صفحات من التاريخ التقني لأوروبا كلها.',
          p2:
            'اليوم لم تعد ريشيتسا مدينة الفولاذ. إنها مدينة التجدد: مدينة أناس ينهضون معًا ويؤمنون بالمجتمع والثقافة والتعليم وبقوة اللفتات الصغيرة التي تغيّر المصائر.',
          p3:
            'هنا، في ريشيتسا، وُلدت حملة Muzică pentru Viață – مبادرة جمعت آلاف الأشخاص والعائلات والأطفال والفنانين والمتطوعين حول حلمٍ واحد: مستقبل لا يضطر فيه مرضى السرطان إلى السفر بعيدًا للعلاج.',
          p4:
            'ريشيتسا أكثر من مجرد مدينة. إنها وعدٌ. إنها مجتمع لا يقف متفرجًا بل يبني – خطوة بخطوة – الأمل.',
          img1Alt: 'منظر حضري في ريشيتسا مع مبانٍ تاريخية',
          feature1Title: 'تراث صناعي',
          feature1Text:
            'تحافظ ريشيتسا على آثار عصرها الصناعي الذهبي من خلال مصانع تاريخية ومبانٍ تذكّر بالفترة التي كانت فيها المدينة مركزًا مهمًا للسكك الحديدية.',
          feature1Alt: 'عمارة صناعية في ريشيتسا',
          feature2Title: 'مؤسسات تعليمية',
          feature2Text1:
            'تستضيف المدينة جامعة إفتيميه مورغو، إحدى أهم مؤسسات التعليم العالي في منطقة بانَات.',
          feature2Text2: 'مركز جامعة “بابيش-بولياي” في ريشيتسا.',
          feature2Alt: 'مؤسسات تعليمية في ريشيتسا',
          feature3Title: 'روح المجتمع',
          feature3Text:
            'لدى ريشيتسا مجتمع قوي ومنخرط في مشاريع اجتماعية وثقافية وخيرية، بما في ذلك مبادرات للصحة العامة.',
          feature3Alt: 'مجتمع نشط في ريشيتسا',
          whyTitle: 'لماذا ريشيتسا؟',
          why1:
            'تمثل ريشيتسا روح بانَات: أناس مجتهدون، مجتمعات متحدة ورغبة في بناء مستقبل أفضل. هنا لكل مشروع أثرٌ حقيقي على حياة الناس.',
          why2:
            'إن بناء أول مستشفى للأورام في ريشيتسا لا يعني بنية طبية حديثة فحسب، بل يعني أيضًا الأمل لآلاف الأشخاص في المنطقة.',
          p5:
            'تُظهر ريشيتسا أن التقليد الصناعي يمكن أن يتعايش مع الابتكار الحديث. من المصانع التي وضعت المدينة على الخريطة الصناعية الأوروبية إلى مشاريع التطوير المعاصرة، تظل ريشيتسا مثالًا على المرونة والتقدم.',
          p6:
            'من خلال مشروع Muzică pentru Viață تعزز ريشيتسا دورها كمركز طبي إقليمي، وتوفر لسكانها وصولًا إلى رعاية أورام متقدمة – في مدينتهم.',
        },
      }[lang] || {}),
    [lang]
  );

  return (
    <div className="app-content">
      <section className="app-section about-section" aria-labelledby="resita-title">
        <div className="app-section-header">
          <span className="app-section-overline">{copy.overline}</span>
          <h1 id="resita-title" className="app-section-title">
            {copy.title}
          </h1>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <span className="about-pill">
              {copy.pill}
            </span>
            <p>
              {copy.p1}
            </p>
            <p>
              {copy.p2}
            </p>
            <p>
              {copy.p3}
            </p>
            <p>
              {copy.p4}
            </p>
          </div>
          <div className="about-image-card">
            <img
              src="/resita.jpg"
              alt={copy.img1Alt}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="resita-features-grid">
          <div className="feature-card feature-card-compact">
            <div className="feature-image">
              <img
                src="/tmk-resita-4-1200x675.jpg"
                alt={copy.feature1Alt}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3>{copy.feature1Title}</h3>
            <p>
              {copy.feature1Text}
            </p>
          </div>

          <div className="feature-card feature-card-compact">
            <div className="feature-image">
              <img
                src="/ubb-resita.jpg"
                alt={copy.feature2Alt}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3>{copy.feature2Title}</h3>
            <p>
              {copy.feature2Text1}
              {copy.feature2Text2 ? (
                <>
                  <br />
                  {copy.feature2Text2}
                </>
              ) : null}
            </p>
          </div>

          <div className="feature-card feature-card-wide">
            <div className="feature-image">
              <img
                src="/resita populatie.jpg"
                alt={copy.feature3Alt}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3>{copy.feature3Title}</h3>
            <p>
              {copy.feature3Text}
            </p>
          </div>
        </div>

        <div className="about-grid">
          <aside className="about-side-card">
            <strong>{copy.whyTitle}</strong>
            <span>
              {copy.why1}
            </span>
            <span>
              {copy.why2}
            </span>
          </aside>
          <div className="about-text">
            <p>
              {copy.p5}
            </p>
            <p>
              {copy.p6}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
