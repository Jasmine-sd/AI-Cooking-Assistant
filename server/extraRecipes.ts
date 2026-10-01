import { Recipe } from '../src/types';

export const PANIPURI_RECIPE: Recipe = {
  id: 'authentic-pani-puri',
  name: 'Crispy Street-Style Pani Puri (Golgappa)',
  nameTranslations: {
    te: 'స్ట్రీట్ స్టైల్ పానీపూరి (గోల్‌గప్పా)',
    hi: 'क्रिस्पी स्ट्रीट-स्टाइल पानी पूरी (गोलगप्पा)',
    es: 'Pani Puri Crujiente Callejero'
  },
  description: 'Crispy hollow puris filled with spicy-tangy mint-coriander water (teekha pani), sweet tamarind-date chutney (meetha pani), and warm spiced potato-chickpea filling.',
  descriptionTranslations: {
    te: 'కరకరలాడే పూరీలు, కారం-పులుపు పుదీనా నీళ్లు (తీఖా పానీ), తియ్యని చింతపండు చట్నీ మరియు ఆలూ-శనగల మసాలాతో కూడిన నోరూరించే పానీపూరి.',
    hi: 'कुरकुरी पूरियां, तीखा पुदीना पानी, खट्टा-मीठा इमली पानी और चटपटे आलू-चने की फिलिंग।',
    es: 'Puris crujientes rellenos de agua picante de menta y cilantro, chutney dulce de tamarindo y patatas sazonadas.'
  },
  cuisine: 'Indian',
  tasteProfile: 'Tangy',
  category: 'Street Food',
  image: '/images/pani_puri.jpg',
  imageUrl: '/images/pani_puri.jpg',
  baseServings: 4,
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  totalTimeMinutes: 35,
  difficulty: 'Easy',
  spiceLevel: 'Spicy',
  dietaryTags: ['Vegan', 'Vegetarian', 'Dairy-free', 'Egg-free'],
  budget: '$',
  rating: 4.98,
  reviewsCount: 680,
  author: 'Chef Street Food Master',
  authenticStyleNotes: 'Features stone-ground fresh mint, black salt (kala namak), roasted cumin powder, hing (asafoetida), and chilled ice water with deep-fried semolina-wheat crisp puris.',
  homestyleNotes: 'Uses store-bought ready-to-fry/baked puris, canned boiled chickpeas, and blender-made instant mint-tamarind water for lightning-quick 15-minute preparation.',
  ingredients: [
    { id: 'pp1', name: 'Crisp Puris (Semolina/Atta)', nameTranslations: { te: 'కరకరలాడే పూరీలు' }, baseQuantity: 30, unit: 'pieces', category: 'Bakery' },
    { id: 'pp2', name: 'Boiled Potatoes (mashed)', nameTranslations: { te: 'ఉడకబెట్టిన బంగాళాదుంపలు' }, baseQuantity: 3, unit: 'pieces', category: 'Produce' },
    { id: 'pp3', name: 'Boiled Chickpeas (Kala Chana or White)', nameTranslations: { te: 'ఉడకబెట్టిన శనగలు' }, baseQuantity: 150, unit: 'g', category: 'Pantry & Spices' },
    { id: 'pp4', name: 'Fresh Mint Leaves (Pudina)', nameTranslations: { te: 'తాజా పుదీనా ఆకులు' }, baseQuantity: 1.5, unit: 'cups', category: 'Produce' },
    { id: 'pp5', name: 'Fresh Coriander (Cilantro)', nameTranslations: { te: 'కొత్తిమీర' }, baseQuantity: 1, unit: 'cup', category: 'Produce' },
    { id: 'pp6', name: 'Green Chilies & Ginger', nameTranslations: { te: 'పచ్చిమిరపకాయలు మరియు అల్లం' }, baseQuantity: 3, unit: 'pieces', category: 'Produce' },
    { id: 'pp7', name: 'Tamarind Pulp (Imli)', nameTranslations: { te: 'చింతపండు గుజ్జు' }, baseQuantity: 4, unit: 'tbsp', category: 'Pantry & Spices' },
    { id: 'pp8', name: 'Jaggery / Brown Sugar', nameTranslations: { te: 'బెల్లం' }, baseQuantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
    { id: 'pp9', name: 'Black Salt (Kala Namak) & Chaat Masala', nameTranslations: { te: 'నల్ల ఉప్పు మరియు చాట్ మసాలా' }, baseQuantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
    { id: 'pp10', name: 'Roasted Cumin Powder (Bhuna Jeera)', nameTranslations: { te: 'జీలకర్ర పొడి' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
    { id: 'pp11', name: 'Chilled Water & Ice Cubes', nameTranslations: { te: 'చల్లటి నీరు' }, baseQuantity: 1, unit: 'liter', category: 'Produce' },
    { id: 'pp12', name: 'Crisp Boondi', nameTranslations: { te: 'కారపు బూందీ' }, baseQuantity: 40, unit: 'g', category: 'Pantry & Spices', optional: true }
  ],
  steps: [
    {
      id: 'pps1',
      stepNumber: 1,
      title: 'Blend Spicy Mint Water (Teekha Teekha Pani)',
      instruction: 'In a high-speed blender, combine fresh mint leaves, coriander, green chilies, 1-inch ginger, 1 tsp black salt, 1 tsp roasted cumin powder, 1 tsp chaat masala, and 1/2 cup cold water. Blend until silky smooth. Strain into a large jug and stir in 750ml chilled water and fresh lemon juice.',
      instructionTranslations: {
        te: 'బ్లెండర్ జార్‌లో పుదీనా ఆకులు, కొత్తిమీర, పచ్చిమిర్చి, అల్లం, నల్ల ఉప్పు, జీలకర్ర పొడి, చాట్ మసాలా మరియు కొద్దిగా చల్లటి నీళ్లు వేసి మెత్తగా పేస్ట్ చేయండి. దీనిని గిన్నెలో వడకట్టి 750 మి.లీ చల్లటి నీరు, నిమ్మరసం కలపండి.'
      },
      durationMinutes: 6,
      temperatureOrHeat: 'Low',
      image: '/images/pani_puri_teekha.jpg',
      chefTip: 'Adding ice cubes while blending prevents mint leaves from oxidizing, preserving that vivid emerald green color!'
    },
    {
      id: 'pps2',
      stepNumber: 2,
      title: 'Prepare Sweet Tamarind Water (Khatta Meetha Pani)',
      instruction: 'In a small bowl, dissolve tamarind pulp and jaggery in 1 cup warm water. Whisk in 1/2 tsp roasted cumin powder, 1/2 tsp black salt, and a pinch of red chili powder. Chill in refrigerator.',
      instructionTranslations: {
        te: 'ఒక గిన్నెలో చింతపండు గుజ్జు, బెల్లం వేసి 1 కప్పు గోరువెచ్చని నీటిలో కరిగించండి. జీలకర్ర పొడి, నల్ల ఉప్పు, కొద్దిగా కారం వేసి చల్లబరచండి.'
      },
      durationMinutes: 4,
      temperatureOrHeat: 'Low',
      image: '/images/pani_puri_meetha.jpg',
      chefTip: 'Balance the sweetness and tanginess according to your personal palate.'
    },
    {
      id: 'pps3',
      stepNumber: 3,
      title: 'Make Savory Potato-Chickpea Masala Filling',
      instruction: 'In a mixing bowl, lightly mash boiled potatoes with boiled chickpeas. Season with 1/2 tsp chaat masala, 1/2 tsp roasted cumin, finely chopped coriander, and a pinch of salt. Mix gently so chickpeas retain texture.',
      instructionTranslations: {
        te: 'గిన్నెలో ఉడికించిన బంగాళాదుంపలు, శనగలు వేసి మెత్తగా నొక్కండి. చాట్ మసాలా, జీలకర్ర పొడి, కొత్తిమీర మరియు ఉప్పు వేసి బాగా కలపండి.'
      },
      durationMinutes: 5,
      temperatureOrHeat: 'Low',
      image: '/images/pani_puri_filling.jpg',
    },
    {
      id: 'pps4',
      stepNumber: 4,
      title: 'Crack Puris & Fill with Potato Masala',
      instruction: 'Using your thumb, gently poke a hole in the center of each crispy puri. Spoon in 1 teaspoon of the savory potato-chickpea masala.',
      instructionTranslations: {
        te: 'బొటనవేలితో పూరీ మధ్యలో నెమ్మదిగా రంధ్రం చేసి, ఒక చెంచా ఆలూ-శనగల మిశ్రమాన్ని పూరీలో నింపండి.'
      },
      durationMinutes: 3,
      temperatureOrHeat: 'Low',
      image: '/images/pani_puri_stuffing.jpg',
    },
    {
      id: 'pps5',
      stepNumber: 5,
      title: 'Pour Flavored Waters, Top with Boondi & Enjoy!',
      instruction: 'Drizzle 1/2 tsp sweet tamarind chutney, fill to the brim with chilled spicy mint pani, top with crispy boondi, and eat immediately in a single bite!',
      instructionTranslations: {
        te: 'కొద్దిగా తియ్యని చింతపండు చట్నీ, నిండుగా చల్లటి తీపి-కారం పుదీనా పానీ పోసి, పైన బూందీ చల్లి వెంటనే ఒక్కసారిగా నోట్లో వేసుకోండి!'
      },
      durationMinutes: 2,
      temperatureOrHeat: 'Low',
      image: '/images/pani_puri.jpg',
      imageUrl: '/images/pani_puri.jpg',
    }
  ],
  nutrition: {
    calories: 220,
    protein: 5,
    carbohydrates: 42,
    fat: 4,
    fiber: 4
  },
  substitutions: [
    { original: 'Chickpeas', substitute: 'Sprouted Moong Beans or Ragda (white peas)', ratio: '1:1', notes: 'Sprouted moong makes it extra nutritious and crunchy' },
    { original: 'Puris', substitute: 'Baked whole wheat cups or tortilla chips', ratio: '1:1', notes: 'Healthier oven-baked alternative' }
  ]
};

export const FRIED_RICE_RECIPE: Recipe = {
  id: 'restaurant-style-fried-rice',
  name: 'Wok-Tossed Indo-Chinese Vegetable Fried Rice',
  nameTranslations: {
    te: 'రెస్టారెంట్ స్టైల్ వెజ్ ఫ్రైడ్ రైస్',
    hi: 'रेस्टोरेंट स्टाइल वेज फ्राइड राइस',
    es: 'Arroz Frito Vegetal al Wok'
  },
  description: 'Fragrant long-grain basmati or jasmine rice wok-tossed over screaming high heat with crunchy carrots, bell peppers, spring onions, garlic, and dark soy-sesame glaze.',
  descriptionTranslations: {
    te: 'క్యారెట్, క్యాప్సికమ్, వెల్లుల్లి, సోయా సాస్ మరియు ఉల్లికాడలతో ఎక్కువ మంటపై వేయించిన రుచికరమైన ఫ్రైడ్ రైస్.',
    hi: 'तेज़ आंच पर वॉक में भुने हुए खिले-खिले बासमती चावल, कुरकुरी सब्जियां और सोया सॉस।',
    es: 'Arroz basmati salteado a fuego alto en wok con verduras crujientes, ajo, cebollines y salsa de soya.'
  },
  cuisine: 'Asian',
  tasteProfile: 'Savory',
  category: 'Main Course',
  image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  baseServings: 3,
  prepTimeMinutes: 15,
  cookTimeMinutes: 10,
  totalTimeMinutes: 25,
  difficulty: 'Easy',
  spiceLevel: 'Medium',
  dietaryTags: ['Vegan', 'Vegetarian', 'Dairy-free', 'Egg-free'],
  budget: '$',
  rating: 4.95,
  reviewsCount: 520,
  author: 'Chef Chen & Sanjeev',
  authenticStyleNotes: 'Cooked in a smoking carbon-steel wok with day-old chilled rice, MSG/umami seasoning, white pepper, and toasted sesame oil for signature "wok hei" smoky aroma.',
  homestyleNotes: 'Uses freshly cooked rice cooled spread on a tray, regular pantry vegetables, and light soy sauce in a standard non-stick skillet.',
  ingredients: [
    { id: 'fr1', name: 'Cooked & Chilled Rice (Basmati / Jasmine)', nameTranslations: { te: 'ఉడికించి చల్లార్చిన అన్నం' }, baseQuantity: 3, unit: 'cups', category: 'Grains & Pasta' },
    { id: 'fr2', name: 'Finely Chopped Garlic & Ginger', nameTranslations: { te: 'వెల్లుల్లి మరియు అల్లం తరుగు' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
    { id: 'fr3', name: 'Carrots & Green Beans (finely diced)', nameTranslations: { te: 'క్యారెట్ మరియు బీన్స్ ముక్కలు' }, baseQuantity: 1, unit: 'cup', category: 'Produce' },
    { id: 'fr4', name: 'Bell Pepper / Capsicum (diced)', nameTranslations: { te: 'క్యాప్సికమ్ ముక్కలు' }, baseQuantity: 0.5, unit: 'cup', category: 'Produce' },
    { id: 'fr5', name: 'Spring Onions (white & greens separated)', nameTranslations: { te: 'ఉల్లికాడలు' }, baseQuantity: 0.5, unit: 'cup', category: 'Produce' },
    { id: 'fr6', name: 'Dark Soy Sauce & Vinegar', nameTranslations: { te: 'సోయా సాస్ మరియు వెనిగర్' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Oils & Condiments' },
    { id: 'fr7', name: 'Sesame or Cooking Oil', nameTranslations: { te: 'నూనె' }, baseQuantity: 2, unit: 'tbsp', category: 'Oils & Condiments' },
    { id: 'fr8', name: 'Crushed Black / White Pepper & Salt', nameTranslations: { te: 'మిరియాల పొడి మరియు ఉప్పు' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
  ],
  steps: [
    {
      id: 'frs1',
      stepNumber: 1,
      title: 'Heat Wok & Sizzle Aromatics',
      instruction: 'Heat oil in a wok or deep skillet over high heat until shimmering. Add finely chopped garlic, ginger, and the white parts of spring onions. Stir-fry rapidly for 30 seconds until aromatic.',
      instructionTranslations: {
        te: 'బాణలిలో నూనె వేడి చేసి ఎక్కువ మంటపై వెల్లుల్లి, అల్లం మరియు ఉల్లికాడల తెల్లటి భాగాన్ని 30 సెకన్లు వేయించండి.'
      },
      durationMinutes: 2,
      temperatureOrHeat: 'High',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'frs2',
      stepNumber: 2,
      title: 'Flash-Fry Diced Vegetables',
      instruction: 'Add diced carrots, beans, and bell peppers. Stir-fry continuously on maximum heat for 2 minutes so veggies stay crisp, crunchy, and vibrant.',
      instructionTranslations: {
        te: 'క్యారెట్, బీన్స్, క్యాప్సికమ్ ముక్కలు వేసి ఎక్కువ మంటపై 2 నిమిషాలు వేగంగా వేయించండి (కూరగాయలు మెత్తబడకుండా కరకరలాడాలి).'
      },
      durationMinutes: 2,
      temperatureOrHeat: 'High',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'frs3',
      stepNumber: 3,
      title: 'Add Chilled Rice & Seasonings',
      instruction: 'Toss in chilled cooked rice, breaking any clumps with a spatula. Pour soy sauce, vinegar, crushed pepper, and salt around the perimeter of the wok.',
      instructionTranslations: {
        te: 'చల్లార్చిన అన్నం వేసి ఉండలు లేకుండా కలపండి. బాణలి అంచుల చుట్టూ సోయా సాస్, వెనిగర్, మిరియాల పొడి మరియు ఉప్పు వేయండి.'
      },
      durationMinutes: 3,
      temperatureOrHeat: 'High',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'frs4',
      stepNumber: 4,
      title: 'Toss on High Heat & Garnish with Spring Greens',
      instruction: 'Toss everything together vigorously for 2 minutes until every grain of rice is coated and lightly toasted. Scatter fresh spring onion greens and serve piping hot!',
      instructionTranslations: {
        te: 'అన్నం అంతా మసాలాలతో కలిసేలా 2 నిమిషాలు బాగా టాస్ చేయండి. పైన ఉల్లికాడల ఆకులను చల్లి వేడివేడిగా సర్వ్ చేయండి!'
      },
      durationMinutes: 2,
      temperatureOrHeat: 'High',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
    }
  ],
  nutrition: {
    calories: 340,
    protein: 7,
    carbohydrates: 58,
    fat: 9,
    fiber: 4
  },
  substitutions: [
    { original: 'Rice', substitute: 'Quinoa, Brown Rice, or Cauliflower Rice', ratio: '1:1', notes: 'Cauliflower rice reduces carbs by 75%' },
    { original: 'Veggies', substitute: 'Scrambled Eggs or Paneer / Chicken Cubes', ratio: '1:1', notes: 'Great protein boost' }
  ]
};

export const LADDU_RECIPE: Recipe = {
  id: 'authentic-besan-laddu',
  name: 'Traditional Royal Besan Laddu (Ghee Sweet)',
  nameTranslations: {
    te: 'సాంప్రదాయ నెయ్యి శనగపిండి లడ్డూ (బేసన్ లడ్డూ)',
    hi: 'पारंपरिक दानेदार बेसन के लड्डू',
    es: 'Laddus Tradicionales de Harina de Garbanzo y Ghee'
  },
  description: 'Aromatic golden dessert balls made from slow-roasted coarse gram flour (besan) simmered in pure desi ghee, flavored with fragrant green cardamom, and studded with toasted cashew nuts.',
  descriptionTranslations: {
    te: 'స్వచ్ఛమైన దేశీ నెయ్యిలో దోరగా వేయించిన శనగపిండి, యాలకుల పొడి, జీడిపప్పు మరియు పంచదారతో చేసిన సువాసనభరితమైన నోరూరించే లడ్డూలు.',
    hi: 'शुद्ध देसी घी में धीमी आंच पर भूने हुए दानेदार बेसन, इलायची और काजू से बने स्वादिष्ट लड्डू।',
    es: 'Deliciosas esferas dulces tradicionales de la India hechas de harina de garbanzo tostada en ghee con cardamomo y nueces.'
  },
  cuisine: 'Indian',
  tasteProfile: 'Sweet',
  category: 'Desserts',
  image: '/images/royal_besan_laddu.jpg',
  imageUrl: '/images/royal_besan_laddu.jpg',
  baseServings: 6,
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  totalTimeMinutes: 30,
  difficulty: 'Easy',
  spiceLevel: 'None',
  dietaryTags: ['Vegetarian', 'Gluten-free', 'Egg-free'],
  budget: '$$',
  rating: 4.97,
  reviewsCount: 440,
  author: 'Chef Sanjeev R. & Amma',
  authenticStyleNotes: 'Slow-roasts coarse besan in pure grass-fed buffalo/cow ghee on gentle low heat for 20 minutes until nutty aroma fills the room, then uses bura/tagar sugar for authentic grainy texture.',
  homestyleNotes: 'Uses regular fine besan with 2 tbsp fine semolina (rava/sooji) added for texture, standard powdered sugar, and melted ghee.',
  ingredients: [
    { id: 'ld1', name: 'Gram Flour / Besan (coarse preferred)', nameTranslations: { te: 'శనగపిండి (బేసన్)' }, baseQuantity: 2, unit: 'cups', category: 'Grains & Pasta' },
    { id: 'ld2', name: 'Pure Desi Ghee', nameTranslations: { te: 'స్వచ్ఛమైన ఆవు నెయ్యి' }, baseQuantity: 0.5, unit: 'cup', category: 'Dairy & Refrigerated' },
    { id: 'ld3', name: 'Powdered Sugar or Bura / Tagar', nameTranslations: { te: 'చక్కెర పొడి' }, baseQuantity: 1, unit: 'cup', category: 'Pantry & Spices' },
    { id: 'ld4', name: 'Green Cardamom Powder (Elaichi)', nameTranslations: { te: 'యాలకుల పొడి' }, baseQuantity: 0.5, unit: 'tsp', category: 'Pantry & Spices' },
    { id: 'ld5', name: 'Cashew Nuts & Almonds (chopped)', nameTranslations: { te: 'జీడిపప్పు మరియు బాదం ముక్కలు' }, baseQuantity: 3, unit: 'tbsp', category: 'Pantry & Spices' }
  ],
  steps: [
    {
      id: 'lds1',
      stepNumber: 1,
      title: 'Toast Nuts in Warm Ghee',
      instruction: 'In a heavy-bottomed kadai or pan, melt 1 tbsp ghee over medium-low heat. Fry chopped cashews and almonds for 1-2 minutes until golden blonde. Transfer nuts to a plate.',
      instructionTranslations: {
        te: 'బాణలిలో ఒక చెంచా నెయ్యి వేసి జీడిపప్పు, బాదం ముక్కలను దోరగా వేయించి పక్కన పెట్టుకోండి.'
      },
      durationMinutes: 3,
      temperatureOrHeat: 'Low',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'lds2',
      stepNumber: 2,
      title: 'Slow Roast Besan in Ghee',
      instruction: 'Add remaining ghee to pan. Add sifted besan and roast over continuous low heat, stirring constantly for 15-18 minutes until it turns a deep golden color and releases an irresistible nutty aroma.',
      instructionTranslations: {
        te: 'మిగిలిన నెయ్యి వేసి, శనగపిండిని సన్నని మంటపై 15-18 నిమిషాలు ఆపకుండా కలుపుతూ మంచి సువాసన, బంగారు రంగు వచ్చేవరకు వేయించండి.'
      },
      durationMinutes: 18,
      temperatureOrHeat: 'Low',
      image: '/images/besan_roast_ghee.jpg',
      chefTip: 'Never rush on high heat — gentle low roasting prevents bitterness and develops the royal flavor!'
    },
    {
      id: 'lds3',
      stepNumber: 3,
      title: 'Cool Slightly & Fold in Sugar & Cardamom',
      instruction: 'Turn off the heat and let the mixture cool for 10-12 minutes until lukewarm to touch. Mix in powdered sugar, cardamom powder, and toasted nuts with your fingers.',
      instructionTranslations: {
        te: 'స్టవ్ ఆపి మిశ్రమాన్ని 10 నిమిషాలు గోరువెచ్చగా అయ్యేవరకు చల్లారనివ్వండి. తరువాత చక్కెర పొడి, యాలకుల పొడి, వేయించిన జీడిపప్పు వేసి కలపండి.'
      },
      durationMinutes: 10,
      temperatureOrHeat: 'Low',
      image: '/images/royal_besan_laddu.jpg'
    },
    {
      id: 'lds4',
      stepNumber: 4,
      title: 'Shape into Smooth Round Laddus',
      instruction: 'Take small portions of the warm mixture in your palms and press firmly into smooth, round spheres. Store in an airtight container for up to 3 weeks.',
      instructionTranslations: {
        te: 'చేతులతో కొద్దికొద్దిగా మిశ్రమాన్ని తీసుకుని గుండ్రని లడ్డూలుగా చుట్టండి. గాలి చొరబడని డబ్బాలో నిల్వ చేసుకోండి.'
      },
      durationMinutes: 5,
      temperatureOrHeat: 'Low',
      image: '/images/shaping_besan_laddu.jpg'
    }
  ],
  nutrition: {
    calories: 210,
    protein: 4,
    carbohydrates: 26,
    fat: 10,
    fiber: 2
  },
  substitutions: [
    { original: 'Sugar', substitute: 'Jaggery Powder or Coconut Sugar', ratio: '1:1', notes: 'Adds rich caramel undertone' }
  ]
};

export const DOSA_RECIPE: Recipe = {
  id: 'crispy-masala-dosa',
  name: 'Golden Crispy South Indian Masala Dosa',
  nameTranslations: {
    te: 'హోటల్ స్టైల్ క్రిస్పీ మసాలా దోస',
    hi: 'क्रंची साउथ इंडियन मसाला डोसा',
    es: 'Dosa Crujiente del Sur de la India'
  },
  description: 'Paper-thin, golden crepe made from naturally fermented rice and lentil batter, smeared with spiced red chutney, stuffed with comforting potato masala, served with coconut chutney & piping hot sambar.',
  descriptionTranslations: {
    te: 'బియ్యం, మినప్పప్పు పిండితో వేసిన కరకరలాడే దోస, లోపల నోరూరించే ఆలూ మసాలా, కొబ్బరి చట్నీ మరియు సాంబార్ తో తింటే అమృతం.',
    hi: 'किण्वित चावल-दाल के घोल से बना कुरकुरा डोसा, स्वादिष्ट आलू मसाला और नारियल की चटनी के साथ।',
    es: 'Crepe crujiente fermentado de arroz y lentejas, relleno de papas especiadas, servido con chutney de coco y sambar.'
  },
  cuisine: 'Indian',
  tasteProfile: 'Savory',
  category: 'Breakfast',
  image: '/images/crispy_masala_dosa.jpg',
  imageUrl: '/images/crispy_masala_dosa.jpg',
  baseServings: 3,
  prepTimeMinutes: 15,
  cookTimeMinutes: 15,
  totalTimeMinutes: 30,
  difficulty: 'Easy',
  spiceLevel: 'Medium',
  dietaryTags: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Egg-free'],
  budget: '$',
  rating: 4.96,
  reviewsCount: 710,
  author: 'Chef Udupi Master',
  authenticStyleNotes: 'Uses overnight stone-ground fermented parboiled rice and urad dal with a pinch of fenugreek seeds, cast-iron tawa seasoned with onion and sesame oil/ghee.',
  homestyleNotes: 'Uses store-bought fresh dosa batter and non-stick flat skillet for easy everyday turning.',
  ingredients: [
    { id: 'ds1', name: 'Fermented Dosa Batter', nameTranslations: { te: 'దోస పిండి' }, baseQuantity: 3, unit: 'cups', category: 'Grains & Pasta' },
    { id: 'ds2', name: 'Boiled Potatoes (mashed)', nameTranslations: { te: 'ఉడకబెట్టిన బంగాళాదుంపలు' }, baseQuantity: 3, unit: 'pieces', category: 'Produce' },
    { id: 'ds3', name: 'Sliced Onions & Green Chilies', nameTranslations: { te: 'ఉల్లిపాయ మరియు పచ్చిమిర్చి ముక్కలు' }, baseQuantity: 1, unit: 'cup', category: 'Produce' },
    { id: 'ds4', name: 'Mustard Seeds, Cumin & Curry Leaves', nameTranslations: { te: 'ఆవాలు, జీలకర్ర మరియు కరివేపాకు' }, baseQuantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
    { id: 'ds5', name: 'Turmeric Powder & Salt', nameTranslations: { te: 'పసుపు మరియు ఉప్పు' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
    { id: 'ds6', name: 'Ghee or Cooking Oil (for roasting)', nameTranslations: { te: 'నెయ్యి లేదా నూనె' }, baseQuantity: 3, unit: 'tbsp', category: 'Oils & Condiments' }
  ],
  steps: [
    {
      id: 'dss1',
      stepNumber: 1,
      title: 'Cook Spiced Potato Masala (Aloo Sabzi)',
      instruction: 'Heat 1 tbsp oil in a pan. Splutter mustard seeds, cumin, and fresh curry leaves. Add sliced onions and green chilies; sauté for 3 minutes. Add turmeric, salt, mashed potatoes, and 3 tbsp water. Simmer for 3 minutes and finish with fresh coriander.',
      instructionTranslations: {
        te: 'బాణలిలో నూనె వేడి చేసి ఆవాలు, జీలకర్ర, కరివేపాకు తాలింపు పెట్టండి. ఉల్లిపాయలు, పచ్చిమిర్చి వేసి 3 నిమిషాలు వేయించండి. పసుపు, ఉప్పు, బంగాళాదుంపలు వేసి కలిపి 3 నిమిషాలు ఉడికించండి.'
      },
      durationMinutes: 8,
      temperatureOrHeat: 'Medium',
      image: '/images/dosa_aloo_masala.jpg'
    },
    {
      id: 'dss2',
      stepNumber: 2,
      title: 'Spread Dosa Batter on Hot Tawa',
      instruction: 'Heat a flat tawa or skillet. Sprinkle a splash of water and wipe clean. Pour a ladleful of batter in the center and spread outward in a spiral motion into a thin, even circle.',
      instructionTranslations: {
        te: 'దోస పెనం వేడి చేసి, నీళ్లు చిలకరించి తుడవండి. గరిటెడు పిండి వేసి మధ్య నుండి గుండ్రంగా సన్నగా తిప్పండి.'
      },
      durationMinutes: 2,
      temperatureOrHeat: 'Medium-High',
      image: '/images/dosa_spread.jpg'
    },
    {
      id: 'dss3',
      stepNumber: 3,
      title: 'Roast with Ghee to Golden Crisp',
      instruction: 'Drizzle 1 tsp ghee or oil along the edges and over top. Cook on medium-high heat until the underside turns a gorgeous deep golden brown and releases effortlessly from the pan.',
      instructionTranslations: {
        te: 'అంచుల చుట్టూ నెయ్యి లేదా నూనె వేసి దోరగా బంగారు రంగు వచ్చేవరకు కాల్చండి.'
      },
      durationMinutes: 3,
      temperatureOrHeat: 'Medium-High',
      image: '/images/dosa_golden_roast.jpg'
    },
    {
      id: 'dss4',
      stepNumber: 4,
      title: 'Stuff with Potato Masala & Fold',
      instruction: 'Place a generous spoon of hot potato masala in the center. Fold the dosa into a cylinder or triangle. Serve immediately with fresh coconut chutney and hot sambar!',
      instructionTranslations: {
        te: 'మధ్యలో ఆలూ మసాలా పెట్టి దోసను మడవండి. కొబ్బరి చట్నీ మరియు సాంబార్‌తో వడ్డించండి!'
      },
      durationMinutes: 1,
      temperatureOrHeat: 'Low',
      image: '/images/crispy_masala_dosa.jpg'
    }
  ],
  nutrition: {
    calories: 280,
    protein: 6,
    carbohydrates: 48,
    fat: 8,
    fiber: 4
  },
  substitutions: [
    { original: 'Potato Masala', substitute: 'Paneer Bhurji or Mushroom Masala', ratio: '1:1', notes: 'Higher protein filling' }
  ]
};

export const WHITE_RASGULLA_RECIPE: Recipe = {
  id: 'kolkata-white-rasgulla',
  name: 'Traditional Spongy White Rasgulla (Kolkata Rosogolla)',
  nameTranslations: {
    te: 'సాఫ్ట్ స్పాంజ్ వైట్ రసగుల్లా (కోల్‌కతా రోషోగొల్లా)',
    hi: 'पारंपरिक स्पंजी वाइट रसगुल्ला (कोलकाता रोशोगोल्ला)',
    es: 'Rasgulla Blanco Esponjoso Tradicional'
  },
  description: 'Classic Bengal sweet made from freshly curdled soft cow-milk chenna, kneaded to silkiness, rolled into smooth crack-free spheres, and cooked in light cardamom sugar syrup until feather-light, spongy, and dripping with sweet nectar.',
  descriptionTranslations: {
    te: 'తాజా ఆవు పాల చెన్నాతో తయారుచేసిన స్వచ్ఛమైన తెల్లటి స్పాంజ్ రసగుల్లా. తేలికపాటి యాలకుల పంచదార పాకంలో ఉడికించి తయారుచేస్తారు.',
    hi: 'ताजे गाय के दूध के छेने से बनी रसीली और स्पंजी बंगाली मिठाई, जो इलायची की हल्की चाशनी में पकाई जाती है।',
    es: 'Famoso dulce bengalí de bolitas de queso fresco chenna, cocidas a fuego vivo en un almíbar ligero y aromático de cardamomo.'
  },
  cuisine: 'Indian',
  tasteProfile: 'Sweet',
  category: 'Desserts',
  image: '/images/white_rasgulla.jpg',
  imageUrl: '/images/white_rasgulla.jpg',
  baseServings: 6,
  prepTimeMinutes: 25,
  cookTimeMinutes: 20,
  totalTimeMinutes: 45,
  difficulty: 'Medium',
  spiceLevel: 'None',
  dietaryTags: ['Vegetarian', 'Gluten-free', 'Egg-free'],
  budget: '$',
  rating: 4.97,
  reviewsCount: 650,
  author: 'Chef Sanjeev R. & Kolkata Sweet Masters',
  authenticStyleNotes: 'Traditional halwai technique uses freshly curdled full-cream cow milk. Chenna is kneaded with the heel of the palm for 5-7 minutes until silky and crack-free, then boiled covered in rolling light sugar syrup (1:4 ratio) for 10-12 minutes to puff into buoyant, spongy clouds.',
  homestyleNotes: 'If chenna feels slightly wet, add 1/2 tsp of fine semolina (sooji) as a gentle binder. Drop in cold water after cooking to retain maximum springy bounce.',
  ingredients: [
    { id: 'wr1', name: 'Fresh Full Cream Cow Milk', nameTranslations: { te: 'తాజా ఆవు పాలు' }, baseQuantity: 1, unit: 'liter', category: 'Dairy & Refrigerated' },
    { id: 'wr2', name: 'Lemon Juice or White Vinegar (diluted in 2 tbsp water)', nameTranslations: { te: 'నిమ్మరసం' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
    { id: 'wr3', name: 'Granulated White Sugar (for light syrup)', nameTranslations: { te: 'పంచదార' }, baseQuantity: 1.25, unit: 'cups', category: 'Pantry & Spices' },
    { id: 'wr4', name: 'Water (for syrup)', nameTranslations: { te: 'నీళ్లు' }, baseQuantity: 5, unit: 'cups', category: 'Pantry & Spices' },
    { id: 'wr5', name: 'Crushed Green Cardamom Pods', nameTranslations: { te: 'యాలకులు' }, baseQuantity: 4, unit: 'pods', category: 'Pantry & Spices' },
    { id: 'wr6', name: 'Rose Water or Saffron Strands (for aroma)', nameTranslations: { te: 'గులాబీ నీరు లేదా కుంకుమపువ్వు' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices', optional: true },
    { id: 'wr7', name: 'Fine Semolina (Sooji, optional binder)', nameTranslations: { te: 'బొంబాయి రవ్వ' }, baseQuantity: 0.5, unit: 'tsp', category: 'Grains & Pasta', optional: true }
  ],
  steps: [
    {
      id: 'wrs1',
      stepNumber: 1,
      title: 'Boil Milk & Curdle into Chenna',
      instruction: 'Bring 1 liter fresh cow milk to a boil in a heavy-bottomed pot. Turn off the heat and let rest for 2 minutes. Slowly drizzle in diluted lemon juice while stirring gently until greenish whey separates completely and soft white chenna forms.',
      instructionTranslations: {
        te: 'గిన్నెలో పాలు మరిగించి స్టవ్ ఆపండి. రెండు నిమిషాల తర్వాత నిమ్మరసం పోస్తూ సున్నితంగా కలపండి, పాలు విరిగి చెన్నా ఏర్పడుతుంది.'
      },
      durationMinutes: 8,
      temperatureOrHeat: 'Medium',
      image: '/images/rasgulla_curdle.jpg',
      chefTip: 'Never add acid to fiercely boiling milk, otherwise the chenna becomes rubbery. Resting for 2 minutes keeps it velvety soft!'
    },
    {
      id: 'wrs2',
      stepNumber: 2,
      title: 'Strain, Rinse & Hang Chenna',
      instruction: 'Pour curds into a fine muslin or cheesecloth set over a colander. Rinse under cold running water for 30 seconds to wash away any lemony sourness. Squeeze out excess liquid gently and hang cloth for 25 minutes until moist but not dripping.',
      instructionTranslations: {
        te: 'తెల్లని కాటన్ వస్త్రంలో చెన్నాను వడకట్టి చన్నీటితో కడగండి. పులుపు పోయిన తర్వాత 25 నిమిషాలు వేలాడదీయండి.'
      },
      durationMinutes: 25,
      temperatureOrHeat: 'Low',
      image: '/images/rasgulla_curdle.jpg',
      chefTip: 'Do not squeeze too dry! Chenna needs just a hint of moisture to expand into a spongy honeycomb.'
    },
    {
      id: 'wrs3',
      stepNumber: 3,
      title: 'Knead to Silky Dough & Roll Spheres',
      instruction: 'Place chenna on a wide plate. Knead using the heel of your palm for 5 to 7 minutes until completely smooth, silky, and no grains remain. Divide into 12-14 equal portions and roll between gentle palms into pristine, crack-free smooth round balls.',
      instructionTranslations: {
        te: 'చేతి మడమతో చెన్నాను 5-7 నిమిషాలు మృదువుగా ఒత్తండి. ఎక్కడా పగుళ్లు లేకుండా నున్నటి గుండ్రని ఉండలుగా చుట్టండి.'
      },
      durationMinutes: 10,
      temperatureOrHeat: 'Low',
      image: '/images/white_rasgulla.jpg',
      chefTip: 'Inspect every ball closely under light; any surface crack will expand into a tear during high-pressure boiling.'
    },
    {
      id: 'wrs4',
      stepNumber: 4,
      title: 'Cook in Rolling Cardamom Sugar Syrup',
      instruction: 'In a wide pressure cooker or deep pot, bring 1.25 cups sugar, 5 cups water, and crushed cardamom to a rapid rolling boil. Gently drop in the chenna balls one by one into the boiling syrup. Cover tightly with a lid and boil on high heat for 10-12 minutes without opening.',
      instructionTranslations: {
        te: 'వెడల్పాటి పాత్రలో పంచదార, నీళ్లు, యాలకులు వేసి బాగా మరిగించండి. ఉండలను వేసి మూత పెట్టి హై ఫ్లేమ్‌పై 10-12 నిమిషాలు ఉడికించండి.'
      },
      durationMinutes: 12,
      temperatureOrHeat: 'High',
      image: '/images/rasgulla_boil.jpg',
      chefTip: 'The trapped steam forces the sweet syrup inside the porous chenna, expanding them to double their original size.'
    },
    {
      id: 'wrs5',
      stepNumber: 5,
      title: 'Chill in Syrup & Serve',
      instruction: 'Turn off the heat. The rasgullas will settle at the bottom, indicating they are fully cooked. Let cool to room temperature, stir in rose water, and refrigerate for at least 2 hours. Serve chilled with light cardamom syrup and saffron garnish.',
      instructionTranslations: {
        te: 'స్టవ్ ఆపి చల్లారనివ్వండి. ఫ్రిజ్ లో 2 గంటలు ఉంచి చల్లగా యాలకుల సిరప్ తో వడ్డించండి.'
      },
      durationMinutes: 15,
      temperatureOrHeat: 'Low',
      image: '/images/white_rasgulla.jpg',
      chefTip: 'When you press a cooked rasgulla with a spoon, it compresses and springs right back without collapsing — the hallmark of pure Kolkata craftsmanship!'
    }
  ],
  nutrition: {
    calories: 185,
    protein: 5,
    carbohydrates: 36,
    fat: 3,
    fiber: 0
  },
  substitutions: [
    { original: 'Cow Milk', substitute: 'Organic Full Cream Milk', ratio: '1:1', notes: 'Best curdling yield' },
    { original: 'Lemon Juice', substitute: 'Citric acid dissolved in water (1/4 tsp)', ratio: '1:1', notes: 'Clean neutral curdle' }
  ]
};

export const IDLI_SAMBAR_RECIPE: Recipe = {
  id: 'steamed-idli-sambar',
  name: 'Traditional Steamed South Indian Idli & Sambar',
  nameTranslations: {
    te: 'సాంప్రదాయ మెత్తని ఇడ్లీ మరియు సాంబార్',
    hi: 'सॉफ्ट स्टीम्ड इडली और सांभर',
    es: 'Idli al Vapor con Sambar del Sur de la India'
  },
  description: 'Pillow-soft, cloud-like steamed fermented rice-lentil cakes served with aromatic vegetable drumstick sambar and fresh ground coconut chutney.',
  descriptionTranslations: {
    te: 'మల్లెపూవు లాంటి మెత్తని ఇడ్లీలు, మునక్కాయ సాంబార్ మరియు తాజా కొబ్బరి చట్నీతో.',
    hi: 'रुई जैसी मुलायम भाप में पकी इडली, गरमा-गरम सांभर और नारियल चटनी के साथ।',
    es: 'Tiernos pasteles de arroz y lentejas cocidos al vapor, acompañados de sambar de verduras y chutney de coco.'
  },
  cuisine: 'Indian',
  tasteProfile: 'Savory',
  category: 'Breakfast',
  image: '/images/steamed_idlis.jpg',
  imageUrl: '/images/steamed_idlis.jpg',
  baseServings: 4,
  prepTimeMinutes: 10,
  cookTimeMinutes: 15,
  totalTimeMinutes: 25,
  difficulty: 'Easy',
  spiceLevel: 'Mild',
  dietaryTags: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Egg-free'],
  budget: '$',
  rating: 4.95,
  reviewsCount: 520,
  author: 'Chef Ramanathan',
  authenticStyleNotes: 'Batter aerated with stone-ground whole urad dal and idli rava, fermented naturally for 12 hours until double in volume.',
  homestyleNotes: 'Steamed in standard stovetop idli cooker or instant pot idli stand for 10-12 minutes.',
  ingredients: [
    { id: 'id1', name: 'Fermented Idli Batter', nameTranslations: { te: 'ఇడ్లీ పిండి' }, baseQuantity: 3, unit: 'cups', category: 'Grains & Pasta' },
    { id: 'id2', name: 'Sesame or Ghee (for greasing)', nameTranslations: { te: 'నువ్వుల నూనె' }, baseQuantity: 1, unit: 'tbsp', category: 'Oils & Condiments' },
    { id: 'id3', name: 'Toor Dal & Mixed Vegetables (for Sambar)', nameTranslations: { te: 'కందిపప్పు మరియు కూరగాయలు' }, baseQuantity: 2, unit: 'cups', category: 'Produce' },
    { id: 'id4', name: 'Sambar Powder & Tamarind', nameTranslations: { te: 'సాంబార్ పొడి మరియు చింతపండు' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' }
  ],
  steps: [
    {
      id: 'ids1',
      stepNumber: 1,
      title: 'Grease Idli Moulds',
      instruction: 'Lightly brush idli plates with sesame oil or ghee. Gently mix the fermented batter without beating out the air pockets.',
      instructionTranslations: {
        te: 'ఇడ్లీ రేకులకు నూనె రాయండి. పులిసిన పిండిని సున్నితంగా కలపండి.'
      },
      durationMinutes: 3,
      temperatureOrHeat: 'Low',
      image: '/images/steamed_idlis.jpg'
    },
    {
      id: 'ids2',
      stepNumber: 2,
      title: 'Steam on High Steam',
      instruction: 'Pour batter into moulds. Place in steamer with boiling water. Cover and steam on medium-high heat for 10-12 minutes until a toothpick comes out clean.',
      instructionTranslations: {
        te: 'ఇడ్లీ పాత్రలో పిండి వేసి 10-12 నిమిషాలు ఆవిరిపై ఉడికించండి.'
      },
      durationMinutes: 12,
      temperatureOrHeat: 'Medium-High',
      image: '/images/steamed_idlis.jpg'
    },
    {
      id: 'ids3',
      stepNumber: 3,
      title: 'Demould & Serve with Sambar & Chutney',
      instruction: 'Let rest for 2 minutes. Dip a wet spoon and gently scoop out feather-light idlis. Serve steaming hot drenched in fragrant vegetable sambar and fresh coconut chutney!',
      instructionTranslations: {
        te: 'రెండు నిమిషాల తర్వాత తడి చెంచాతో ఇడ్లీలను తీసి వేడి వేడి సాంబార్ మరియు చట్నీతో వడ్డించండి!'
      },
      durationMinutes: 2,
      temperatureOrHeat: 'Low',
      image: '/images/idli_sambar_serve.jpg'
    }
  ],
  nutrition: {
    calories: 220,
    protein: 7,
    carbohydrates: 42,
    fat: 2,
    fiber: 5
  },
  substitutions: []
};

export const ASIAN_CHEF_RECIPES: Recipe[] = [
  PANIPURI_RECIPE,
  DOSA_RECIPE,
  FRIED_RICE_RECIPE,
  WHITE_RASGULLA_RECIPE,
  IDLI_SAMBAR_RECIPE,
  LADDU_RECIPE
];
