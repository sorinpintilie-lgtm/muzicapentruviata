import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase.js';

const DonorContext = createContext(undefined);

const STORAGE_KEY = 'mpv_donors_v1';

// All donor names from various countries - will be randomized
const ALL_NAMES = [
  // Romanian names
  'Andrei Popescu', 'Maria Ionescu', 'Alexandru Marinescu', 'Ioana Dumitrescu', 'Mihai Stan', 'Elena Voinea', 'Cristian Moldovan', 'Ana Radu', 'Florin Petrescu', 'Bianca Pavel', 'Daniel Ene', 'Gabriela Neagu', 'Robert Matei', 'Andreea Dobre', 'Sorin Vlaicu', 'Cristina Badea', 'Vlad Georgescu', 'Irina Mihalache', 'Paul Tudor', 'Oana Sima', 'Radu Grosu', 'Monica Bucur', 'Adrian Marinescu', 'Laura Pârvu', 'Ștefan Bălan', 'Nicoleta Iacob', 'Călin Chiriac', 'Alina Moise', 'Dorin Sava', 'Carmen Nistor', 'Dragoș Sîrbu', 'Daniela Toma', 'Claudiu Barbu', 'Simona Gherman', 'Raul Stoica', 'Anca Mureșan', 'Bogdan Teodorescu', 'Roxana Pașcu', 'Costin Damian', 'Violeta Cristea', 'Rareș Oprea', 'Loredana Mărginean', 'Emil Lupu', 'Georgiana Panait', 'Cătălin Moraru', 'Mihaela Varga', 'Lucian Rusu', 'Adelina Popa', 'Ilie Voicu', 'Denisa Marinescu', 'Tudor Botez', 'Andra Chivu', 'Silviu Dima', 'Laura Iliescu', 'Horia Lazăr', 'Diana Moga', 'Petru Borcea', 'Raluca Țurcanu', 'Cosmin Tănase', 'Mihaela Feraru', 'Laurențiu Mirea', 'Claudia Bercea', 'Marcel Ganea', 'Delia Luca', 'Ionuț Ceban', 'Sabina Pintea', 'Nicolae Haidu', 'Alexandra Lupescu', 'Valentin Mirițescu', 'Adela Rizea', 'Felix Toderici', 'Livia Cornea', 'Marian Zamfir', 'Sorina Rădoi', 'Gabriel Preda', 'Mirela Ghinea', 'Ovidiu Todor', 'Carmen Trofin', 'Damian Boștină', 'Ana-Maria Zugravu', 'Virgil Caraman', 'Patricia Voinescu', 'Ioan Scurtu', 'Teodora Lup', 'Cristian Bordeianu', 'Corina Mihăescu', 'Lucian Bărbulescu', 'Andrada Toader', 'Dorin Miclea', 'Ioana Aldea', 'Ciprian Timofte', 'Sabina Năstase', 'Emil Boeriu', 'Teodora Mureșanu', 'Constantin Plopeanu', 'Adina Scurtu', 'Gelu Moga', 'Magda Cherecheș', 'Raul Bănuț', 'Lidia Nițu', 'Horea Chiorean', 'Denisa Onuțu', 'Iulian Pătrașcu', 'Delia Fodor', 'Marcel Orban', 'Amalia Cernat', 'Sergiu Huruială', 'Medeea Bota', 'Victor Mănescu', 'Vasilica Drăghici', 'Teodor Busuioc', 'Ioana Pastramă', 'Răzvan Păun', 'Miruna Voiculescu', 'Cătălin Cazacu', 'Ana Maria Ursache', 'Ovidiu Coman', 'Sabina Olaru', 'Paul Sângeorzan', 'Cristina Lascu', 'Matei Ilinca', 'Diana Mândru', 'Cosmin Barcău', 'Nicoleta Zecheru', 'Alexandru Vidrean', 'Bianca Duță', 'Liviu Harșia', 'Oana Băran', 'Augustin Răileanu', 'Sofia Plopeanu', 'Dorin Lăzărescu', 'Madalina Istrate', 'Petru Comșa', 'Valentina Moț', 'Gelu Lăpușan', 'Sorina Doroș', 'Dragoș Pinte', 'Cătălina Pușcaș', 'Ciprian Igna', 'Diana Frățilă', 'Rareș Mihon', 'Marina Iancu', 'Grigore Ardelean', 'Natalia Morar', 'Ionel Huțu', 'Ramona Sârbescu', 'Cosmin Oancea', 'Daniela Racoți', 'Vlad Lăzăroiu', 'Mara Țibichi', 'Darius Bechir', 'Florina Rugină', 'Șerban Pană', 'Laura Mănescu', 'Lucian Pocioianu', 'Miruna Dascălu', 'Dan Bilț', 'Anamaria Cîrstea', 'Ștefan Șuteu', 'Corina Pârvulescu', 'Eugen Câmpeanu', 'Mirela Fărcaș', 'Radu Roșca', 'Teodora Neacșu', 'Dragoș Meseșan', 'Ioana Rățoi', 'Horia Todoran', 'Marina Buzea', 'Victor Mărginean', 'Veronica Drumul', 'Marius Gârbovan', 'Cristina Arion', 'Sorin Păcurar', 'Loredana Hrițcu', 'Damian Aldea', 'Gabriela Moțoc', 'Petru Covaci', 'Diana Mirea', 'Costel Ursu', 'Andreea Fronea', 'Mircea Amzăr', 'Raluca Plopeanu', 'Denis Andreica', 'Ana Pop', 'Raul Hodor', 'Simona Coroiu', 'Constantin Mihu', 'Oana Scurtu', 'Dan Câmpean', 'Mara Zăvoianu', 'Ionuț Bălan', 'Nicoleta Ignat', 'Paul Zgârcea', 'Adela Radu', 'Alexandru Armean', 'Sabina Lup', 'Felix Teacă', 'Andrada Oaiță', 'Robert Niță', 'Cătălina Țurlea', 'Adrian Prundar', 'Livia Curea', 'Iulian Hristea', 'Mirela Coroi', 'Cosmin Bumb', 'Larisa Țopa', 'Dan Arnold', 'Paula Rusu', 'Horea Albu', 'Amalia Sfetcu', 'Victor Drăgoi', 'Eliza Ganea', 'Petru Bratu', 'Gabriela Păuș', 'Florin Plopeanu', 'Alina Avram', 'Călin Popa', 'Lorena Orășan', 'Lucian Videanu', 'Cristina Mărgărit', 'Cezar Pintea', 'Sabina Olteanu', 'Mihai Herlea', 'Denisa Petrean', 'Laurențiu Loghin', 'Ioana Țaga', 'Emil Rus', 'Laura Anghel', 'Darius Gal', 'Miruna Onea', 'Valentin Faur', 'Oana Micle', 'Raul Duma', 'Simona Dediu', 'Șerban Todea', 'Ana Zahar', 'Costin Rusu', 'Corina Dragoș', 'Răzvan Tirea', 'Anca Lupuleț', 'Dorin Belu', 'Cătălina Cojan', 'Gelu Țurcanu', 'Mirela Munteanu', 'Sergiu Bănică', 'Magda Roman', 'Paul Șova', 'Delia Vasile', 'Marius Țintea', 'Ioana Mădularu', 'Cristi Gârlea', 'Veronica Ciobanu', 'Denis Popa', 'Adriana Muntean', 'Vasile Buzatu', 'Teodora Borcea', 'Alexandru Popovici', 'Ana Moț', 'Lucian Pădureanu', 'Andrada Buha', 'Petru Suciu', 'Irina Vlaicu', 'Daniel Mihai', 'Daniela Răduț', 'Costin Rațiu', 'Iulia Cioroianu', 'Vlad Năsui', 'Raluca Doboș', 'Horia Zamfirescu', 'Livia Petcu', 'Andrei Crișan', 'Denisa Fieraru', 'Radu Țeglaș', 'Simona Fetic', 'Ovidiu Moldoveanu', 'Amalia Dragoș', 'Felix Panțuru', 'Andreea Vâlcea', 'Marin Avramescu', 'Claudia Mitrea', 'Mircea Fodor', 'Ioana Pop', 'Șerban Nistor', 'Diana Toia', 'Cosmin Cernescu', 'Natalia Olar', 'Raul Șoș', 'Cătălina Petcă', 'Claudiu Trif', 'Alina Dobre', 'Dan Păstrăguș', 'Teodora Mititelu', 'Răzvan Voinescu', 'Oana Ene', 'Darius Zachiu', 'Magdalena Moțoc', 'Nicu Brașov', 'Amelia Teodorescu', 'Gelu Geambașu', 'Sabina Cadăr', 'Vlad Petron', 'Cristina Cârjan', 'Sergiu Oană', 'Gabriela Pascu', 'Dan Tomescu', 'Teodora Tănăsie', 'Ionuț Avarvari', 'Mirela Donciu', 'Petru Dascălu', 'Andra Ienciu', 'Radu Voicu', 'Alina Bejenaru', 'Flaviu Prundeanu', 'Anca Tiron', 'Alexandru Fara', 'Magda Silion', 'Dorin Trandafir', 'Cătălina Nenciu', 'Viorel Bârsan', 'Cristina Popov', 'Dan Măzăreanu', 'Laura Negrilă', 'Silviu Anghel', 'Diana Chelaru', 'Costel Neagu', 'Denisa Brâncuși', 'Vlad Plopeanu', 'Ioana Burtan', 'Mihai Lăpuș', 'Anamaria Vodă', 'Claudiu Neacșu', 'Oana Mădălin', 'Eugen Suciu', 'Ana Sârbu', 'Călin Tincu', 'Simona Fodor', 'Sergiu Târnovan', 'Gabriela Șuteu', 'Cristi Marin', 'Teodora Lupulescu', 'Raul Pavelescu', 'Loredana Pârvan', 'Dorin Ulea', 'Nicoleta Brăduț', 'Filip Barcan', 'Alina Iuga', 'Marius Opriș', 'Elena Dulgheru', 'Radu Cernat', 'Carla Sinescu', 'Ștefan Dorobanțu', 'Mirela Lăpuște', 'Horia Sasu', 'Delia Poenaru', 'Adrian Burcea', 'Daniela Țucudean', 'Petru Rațiu', 'Larisa Dochița', 'Florin Vasilache', 'Ioana Cîrstean', 'Cezar Dumitriu', 'Sorina Albu', 'Cristian Stupu', 'Irina Tache', 'Robert Iorgulescu', 'Amalia Sitar', 'Denis Clinciu', 'Anca Lăzărescu', 'Gelu Dumitraș', 'Natalia Canea', 'Răzvan Botezan', 'Livia Tomșa', 'Sorin Crăciun', 'Teodora Paicu', 'Cosmin Grama', 'Oana Sălăgean', 'Petru Meliță', 'Laura Scurtu', 'Sergiu Gherasim', 'Gabriela Găină', 'Damian Mărgărit', 'Daniela Aldea', 'Viorel Gruia', 'Andreea Moșneag', 'Dan Lăpușneanu', 'Eliza Drăghici', 'Victor Coman', 'Mara Urdăreanu', 'Paul Răducu', 'Ioana Ghiță', 'Bogdan Rusu', 'Lavinia Ionescu', 'Mihnea Ilie', 'Cătălina Țîrlea', 'Laurențiu Hodor', 'Miruna Danci', 'Sorin Ținteanu', 'Marina Dobre', 'Felix Trifan', 'Andrada Mureșean', 'Raul Oneț', 'Paula Zicu', 'Iulian Dragomir', 'Oana Bularca', 'Șerban Popa', 'Diana Ciutac', 'Vasile Țandără', 'Delia Perju', 'Nicolae Văduva', 'Gabriela Vlăduț', 'Cornel Gligor', 'Andra Ursuleanu', 'Eduard Roșianu', 'Mirela Toderaș', 'Sorin Nedelcu', 'Simona Herta', 'Cristi Fulga', 'Adriana Țuclea', 'Petru Hurdugaci', 'Teodora Mihon', 'Lucian Boroș', 'Anca Vețeleanu', 'Dan Manolache', 'Ioana Stanciu', 'Călin Brândușan', 'Miruna Cîrja', 'Victor Florea', 'Loredana Chira', 'Sergiu Pănet', 'Denisa Huja', 'Octavian Oprișan', 'Sabina Costachie', 'Andrei Bumbac', 'Carmen Șerbu', 'Marius Vodă', 'Amalia Doboș', 'Vlad Bistreanu', 'Eliza Harșia', 'Robert Serea', 'Mara Lungu', 'Gelu Micle', 'Marina Pavel', 'Raul Șerban', 'Adriana Negru', 'Dan Mititelu', 'Sabina Hodor', 'Paul Dărăban', 'Ioana Baraghin', 'Costel Mihai', 'Livia Ursu', 'Cătălin Zimbru', 'Ana Rusu', 'Vlad Bădulescu', 'Andreea Vlad', 'Răzvan Oancea', 'Simona Mălinaș', 'Florin Toderici', 'Daniela Crețu', 'Horia Șerbu', 'Larisa Boboc', 'Cosmin Parasca', 'Eliza Mihu', 'Emil Nedelcu', 'Laura Hoțopan', 'Cristian Ganea', 'Gabriela Drugan', 'Mihai Rusu', 'Sabina Doroftei', 'Valentin Moga', 'Oana Lung', 'Robert Ploieșteanu', 'Diana Deleanu', 'Marius Prodan', 'Alina Pruna', 'Sergiu Țopa', 'Corina Tofan', 'Dan Bogza', 'Mara Goran', 'Paul Vrînceanu', 'Ioana Crasnea', 'Lucian Andrei', 'Adriana Silaghi', 'Petru Bătrân', 'Loredana Cioveie', 'Denis Damian', 'Daniela Varga', 'Cristian Olaru', 'Gabriela Fulop', 'Rareș Radu', 'Anca Plopeanu', 'Ștefan Curelea', 'Elena Pop', 'Cătălin Balint', 'Teodora Popovici', 'Raul Drăgoi', 'Andrada Moraru', 'Ionuț Păvăluț', 'Larisa Miclea', 'Sorin Trandafir', 'Irina Țurcanu',

  // German names
  'Lukas Schneider', 'Anna Müller', 'Jonas Weber', 'Marie Fischer', 'Felix Braun', 'Sophie Hoffmann', 'Tim Becker', 'Laura Schmitt', 'Nico Wagner', 'Klara Schäfer', 'Paul Richter', 'Lena Koch', 'Julian Vogel', 'Mia Bauer', 'Tobias Keller', 'Hannah Frank', 'Leonhardt Wolf', 'Sarah Günther', 'David Hartmann', 'Nina Busch', 'Fabian Kraus', 'Julia Peters', 'Matthias König', 'Lisa Winkler', 'Erik Lehmann', 'Amelie Weiß', 'Stefan Brandt', 'Isabell Kaiser', 'Daniel Fuchs', 'Caroline Otto', 'Andre Lorenz', 'Maren Böhm', 'Johann Krüger', 'Luisa Schäfer', 'Michael Albrecht', 'Hildegard Seidel', 'Patrick Vogt', 'Anne Kirchner', 'Benedikt Graf', 'Sabrina Dietz', 'Karl Sommer', 'Marlene Roth', 'Niklas Bürger', 'Franziska Jäger', 'Sebastian Arnold', 'Nadine Kuhn', 'Kurt Steiner', 'Theresa Engel', 'Ralf Hermann',

  // Italian names
  'Luca Rossi', 'Giulia Bianchi', 'Matteo Romano', 'Francesca Conti', 'Alessandro Costa', 'Chiara Moretti', 'Marco Esposito', 'Sara Ricci', 'Giorgio Greco', 'Elena Galli', 'Davide Ferrara', 'Marta Silvestri', 'Simone Rinaldi', 'Alessia Marchetti', 'Fabio De Luca', 'Giada Bellini', 'Paolo Caruso', 'Valentina Leone', 'Riccardo Sartori', 'Ilaria Ferretti', 'Stefano Lombardi', 'Arianna Fontana', 'Daniele Vitale', 'Silvia Benedetti', 'Enrico Giuliani', 'Claudia Ferri', 'Roberto Palmieri', 'Elisa Barone', 'Carlo Santoro', 'Federica Milani', 'Antonio Romano', 'Beatrice Martini', 'Nicola Parisi', 'Martina Grassi', 'Gabriele Pellegrini', 'Vanessa Serra', 'Salvatore Ferraro', 'Noemi Valentini', 'Pietro Martinelli', 'Rosa Amato', 'Tommaso Guerra', 'Camilla De Angelis', 'Massimo Fiore', 'Lucia Gallo', 'Andrea Benedetti', 'Serena Marini', 'Gianluca Marchetti', 'Paola Sorrentino', 'Elio Ruggieri',

  // Spanish names
  'Carlos García', 'María Rodríguez', 'Alejandro Fernández', 'Lucía López', 'Javier González', 'Ana Sánchez', 'Diego Pérez', 'Isabel Martín', 'Pablo Gómez', 'Carmen Jiménez', 'Sergio Ruiz', 'Beatriz Hernández', 'Raúl Moreno', 'Laura Iglesias', 'Fernando Ortega', 'Natalia Domínguez', 'Hugo Castro', 'Marina Vázquez', 'Luis Márquez', 'Cristina Santos', 'Manuel Navarro', 'Rocío Montes', 'Andrés Rubio', 'Elena Reyes', 'Daniel Cabrera', 'Paula Esteban', 'Jorge Molina', 'Sara Lozano', 'Adrián Pastor', 'Claudia Rivas', 'Ricardo Campos', 'Lidia Soler', 'Iván Blanco', 'Patricia Gallardo', 'Óscar Vidal', 'Carolina Bravo', 'Rafael Benítez', 'Inés Salas', 'Mario Pardo', 'Alicia Serrano', 'Víctor Calderón', 'Julia Carretero', 'Álvaro Quesada', 'Nerea Zamora', 'Miguel Vera', 'Ainhoa Soria', 'Gabriel Cordero', 'Eva Cuesta', 'Tomás Villalba',

  // English names
  'James Smith', 'Emily Johnson', 'Michael Brown', 'Sophie Taylor', 'William Jones', 'Charlotte Williams', 'Oliver Davies', 'Amelia Wilson', 'Henry Clarke', 'Olivia Harris', 'Thomas Scott', 'Grace Lewis', 'Harry Hughes', 'Chloe Walker', 'Benjamin Hall', 'Emma Young', 'George King', 'Holly Allen', 'Daniel Wright', 'Ella Hill', 'Samuel Green', 'Lucy Cooper', 'Christopher Adams', 'Megan Turner', 'Edward Baker', 'Isla Mitchell', 'Joseph Parker', 'Molly Carter', 'Nathan Morris', 'Phoebe Ward', 'Matthew Wood', 'Katie Rogers', 'Luke Foster', 'Abigail Morgan', 'Jack Murray', 'Bethany Reed', 'Ryan Howard', 'Freya Simmons', 'David Jenkins', 'Ruby Price', 'Andrew Butler', 'Lily Russell', 'Jonathan Barrett', 'Rosie Walsh', 'Patrick Doyle', 'Georgia Mills', 'Adam Spencer', 'Lauren Bishop', 'Nicholas Payne', 'Hannah Gill',

  // Dutch names
  'Daan van Dijk', 'Sanne de Vries', 'Lars Janssen', 'Emma Bakker', 'Bram Visser', 'Tess Mulder', 'Joris de Boer', 'Lotte Willems', 'Niels Vermeulen', 'Eva Scholten', 'Finn Smit', 'Sophie Peeters', 'Ruben de Graaf', 'Noor van Leeuwen', 'Gijs Hendriks', 'Fleur van der Meer', 'Hugo Meijer', 'Mila Jonker', 'Koen Post', 'Roos Koster', 'Tom van Dam', 'Nina Hoekstra', 'Sander Blom', 'Yara Kuiper', 'Pim de Lange', 'Ilse Brouwer', 'Timo van den Berg', 'Maud Prins', 'Jelle Vos', 'Iris Kooij', 'Thijs Gerritsen', 'Sara van Vliet', 'Jur van der Linden', 'Anne Klooster', 'Olaf Hoeks', 'Merel Schouten', 'Kasper van Wijk', 'Lois Meulman', 'Mark van Loon', 'Daphne Broers', 'Wout Kramer', 'Isabelle Keizer', 'Rick de Groot', 'Femke van der Heijden', 'Olivier Kok', 'Bo Jansen', 'Vincent Huizinga', 'Marit Meijerhof', 'Stefan Koenders',

  // French names
  'Julien Laurent', 'Camille Dupont', 'Mathieu Moreau', 'Élise Lambert', 'Hugo Lefèvre', 'Chloé Fontaine', 'Antoine Girard', 'Manon Dubois', 'Lucas Bernard', 'Émilie Roche', 'Théo Marchand', 'Amélie Garnier', 'Nicolas Perrin', 'Clara Roussel', 'Bastien Marechal', 'Lucie Roux', 'Jules Caron', 'Anaïs Fleury', 'Adrien Colin', 'Marion Barbier', 'Romain Pelletier', 'Victoria Allard', 'Guillaume Blanchet', 'Élodie Charpentier', 'Maxime Renault', 'Sophie Bourdon', 'Alexandre Chevalier', 'Aline Didier', 'Yann Gosselin', 'Maëlle Picard', 'Cédric Morin', 'Laura Pasquier', 'Quentin Fabre', 'Hélène Lefort', 'Raphaël Collin', 'Cécile Masse', 'Damien Rolland', 'Sandrine Boucher', 'Florian Poirier', 'Aurélie Dupuis', 'Vincent Breton', 'Nathalie Mercier', 'Simon Giraud', 'Claire Marion', 'Thomas Barreau', 'Mireille Pommier', 'Olivier Dumas', 'Adèle Perrot', 'François Rochefort'
];

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create randomized donors with varying amounts
const shuffledNames = shuffleArray(ALL_NAMES);

const INITIAL_DONORS = shuffledNames.map((name, index) => ({
  id: (index + 1).toString(),
  name: name,
  amount: Math.floor(Math.random() * 3000) + 100, // Random amount between 100-3100
  message: '',
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
}));

function loadInitialDonors() {
  // Always use the current INITIAL_DONORS to ensure consistency
  // This prevents showing old cached data from localStorage
  console.log('Using current INITIAL_DONORS (ignoring localStorage)');
  return INITIAL_DONORS;
}

export function DonorProvider({ children }) {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Live Firestore subscription (realtime for everyone)
  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(collection(db, 'donations'), orderBy('created_at', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonors(data);
        setLoading(false);
      },
      (error) => {
        // Important: don't fall back to fake data for a live money counter.
        const info = {
          code: error?.code,
          message: error?.message,
        };
        console.error('Firestore subscription error:', info);

        setError(info);
        setDonors([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Removed localStorage saving to prevent caching issues

  async function addDonor({ name, amount, message }) {
    const trimmedName = (name || '').trim();
    const finalName = trimmedName || 'Anonim';

    const normalized = String(amount ?? '')
      .replace(',', '.')
      .trim();

    const parsed = normalized ? Number.parseFloat(normalized) : 0;
    const safeAmount = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    if (!safeAmount) return;

    const newDonor = {
      name: finalName,
      amount: safeAmount,
      message: (message || '').trim(),
      created_at: new Date().toISOString(),
    };

    // Add to database (Firestore subscription will update UI)
    try {
      await addDoc(collection(db, 'donations'), newDonor);
    } catch (error) {
      console.error('Error adding donor to Firestore:', {
        code: error?.code,
        message: error?.message,
      });
      // Could show a notification to user, but for now just log
    }
  }

  const value = useMemo(
    () => ({
      donors,
      addDonor,
      loading,
      error,
    }),
    [donors, loading, error]
  );

  return <DonorContext.Provider value={value}>{children}</DonorContext.Provider>;
}

export function useDonors() {
  const ctx = useContext(DonorContext);
  if (!ctx) {
    throw new Error('useDonors must be used within a DonorProvider');
  }
  return ctx;
}

export function getDonorSizeClass(amount) {
  if (!amount || amount <= 0) return 'donor-chip-xs';
  if (amount >= 5000) return 'donor-chip-5xl';
  if (amount >= 3000) return 'donor-chip-4xl';
  if (amount >= 2000) return 'donor-chip-3xl';
  if (amount >= 1500) return 'donor-chip-xxl';
  if (amount >= 1000) return 'donor-chip-xl';
  if (amount >= 750) return 'donor-chip-lg-plus';
  if (amount >= 500) return 'donor-chip-lg';
  if (amount >= 300) return 'donor-chip-md-plus';
  if (amount >= 200) return 'donor-chip-md';
  if (amount >= 100) return 'donor-chip-sm';
  if (amount >= 25) return 'donor-chip-xs-plus';
  return 'donor-chip-xs';
}

export function getPersonalizedWallUrl(donorName) {
  return `/multumiri/${encodeURIComponent(donorName)}`;
}
