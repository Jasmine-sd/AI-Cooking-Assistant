import { Recipe } from '../src/types';

export const CULINARY_KNOWLEDGE_BASE: Recipe[] = [
  {
    id: 'royal-gulab-jamun',
    name: 'Soft Royal Gulab Jamun (Rose-Cardamom Syrup)',
    nameTranslations: {
      te: 'సాఫ్ట్ రాయల్ గులాబ్ జామున్',
      hi: 'सॉफ्ट शाही गुलाब जामुन (केसर-इलायची)',
      es: 'Gulab Jamun Real al Cardamomo'
    },
    description: 'Melt-in-the-mouth golden fried milk dumplings infused with green cardamom and soaked in warm, fragrant rose-saffron syrup. Garnished with slivered emerald pistachios.',
    descriptionTranslations: {
      te: 'నోట్లో వేస్తే కరిగిపోయే గులాబ్ జామున్లు, యాలకుల సువాసనతో కూడిన గులాబీ-కుంకుమపువ్వు జీరాలో నానబెట్టి వడ్డిస్తారు.',
      hi: 'मुलायम और रसीले गुलाब जामुन, सुगंधित इलायची-गुलाब की चाशनी में भीगे हुए।',
      es: 'Deliciosos buñuelos de leche fritos, bañados en almíbar templado de rosas, azafrán y cardamomo.'
    },
    cuisine: 'Indian',
    tasteProfile: 'Sweet',
    category: 'Desserts',
    image: '/images/soft_gulab_jamun.jpg',
    imageUrl: '/images/soft_gulab_jamun.jpg',
    baseServings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    totalTimeMinutes: 45,
    difficulty: 'Medium',
    spiceLevel: 'None',
    dietaryTags: ['Vegetarian', 'Egg-free'],
    budget: '$',
    rating: 4.98,
    reviewsCount: 890,
    author: 'Halwai Master Chef',
    authenticStyleNotes: 'Traditional halwai recipe using unsweetened dairy mawa (khoya) and chenna with a pinch of maida, slow-fried in pure desi ghee over lowest flame so centers cook through evenly.',
    homestyleNotes: 'Instant homestyle version made with whole milk powder, touch of ghee, and warm milk for velvety crack-free texture.',
    ingredients: [
      { id: 'gj1', name: 'Milk Powder (or Fresh Khoya/Mawa)', nameTranslations: { te: 'మిల్క్ పౌడర్ లేదా కోవా' }, baseQuantity: 1, unit: 'cup', category: 'Dairy & Refrigerated' },
      { id: 'gj2', name: 'All-Purpose Flour (Maida)', nameTranslations: { te: 'మైదా పిండి' }, baseQuantity: 0.25, unit: 'cup', category: 'Grains & Pasta' },
      { id: 'gj3', name: 'Pure Desi Ghee (melted)', nameTranslations: { te: 'స్వచ్ఛమైన నెయ్యి' }, baseQuantity: 2, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'gj4', name: 'Baking Soda', nameTranslations: { te: 'వంట సోడా' }, baseQuantity: 0.25, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'gj5', name: 'Warm Milk (for kneading)', nameTranslations: { te: 'గోరువెచ్చని పాలు' }, baseQuantity: 4, unit: 'tbsp', category: 'Dairy & Refrigerated' },
      { id: 'gj6', name: 'Sugar (for syrup)', nameTranslations: { te: 'పంచదార' }, baseQuantity: 1.5, unit: 'cups', category: 'Pantry & Spices' },
      { id: 'gj7', name: 'Water (for syrup)', nameTranslations: { te: 'నీళ్లు' }, baseQuantity: 1.5, unit: 'cups', category: 'Pantry & Spices' },
      { id: 'gj8', name: 'Crushed Green Cardamom & Saffron', nameTranslations: { te: 'యాలకులు మరియు కుంకుమపువ్వు' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'gj9', name: 'Rose Water & Slivered Pistachios', nameTranslations: { te: 'గులాబీ నీరు మరియు పిస్తా' }, baseQuantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'gj10', name: 'Ghee or Neutral Oil (for deep frying)', nameTranslations: { te: 'వేయించడానికి నెయ్యి లేదా నూనె' }, baseQuantity: 2, unit: 'cups', category: 'Oils & Condiments' }
    ],
    steps: [
      {
        id: 'gjs1',
        stepNumber: 1,
        title: 'Prepare Rose-Cardamom Sugar Syrup (Chasni)',
        instruction: 'In a wide pan, combine 1.5 cups sugar with 1.5 cups water. Boil on medium heat for 6-8 minutes until slightly sticky (half-string consistency). Stir in crushed cardamom, saffron strands, and 1 tsp rose water. Turn off heat and keep syrup warm.',
        instructionTranslations: {
          te: 'గిన్నెలో పంచదార మరియు నీళ్లు పోసి తీగ పాకం వచ్చే వరకు మరిగించండి. యాలకుల పొడి, కుంకుమపువ్వు, గులాబీ నీరు వేసి పాకం గోరువెచ్చగా ఉంచండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/jamun_syrup.jpg',
        chefTip: 'Keep syrup warm, never boiling hot when dropping the fried jamuns, so they absorb syrup without peeling!'
      },
      {
        id: 'gjs2',
        stepNumber: 2,
        title: 'Knead Soft Dough & Shape Crack-Free Spheres',
        instruction: 'In a mixing bowl, combine milk powder, maida, and baking soda. Mix in 2 tbsp melted ghee. Add warm milk 1 tablespoon at a time and gently bring together into a soft, smooth dough without over-kneading. Roll into small, completely smooth crack-free balls between greased palms.',
        instructionTranslations: {
          te: 'గిన్నెలో మిల్క్ పౌడర్, మైదా, వంట సోడా, నెయ్యి వేసి కలపండి. కొద్దిగా పాలు పోసి మృదువైన పిండిలా కలపండి. ఎక్కడా పగుళ్లు లేకుండా గుండ్రంగా చిన్న ఉండలుగా చుట్టండి.'
        },
        durationMinutes: 12,
        temperatureOrHeat: 'Low',
        image: '/images/jamun_balls.jpg',
        chefTip: 'Do not knead harshly like chapati dough; gentle mixing keeps the dumplings airy and tender inside.'
      },
      {
        id: 'gjs3',
        stepNumber: 3,
        title: 'Slow Fry in Ghee on Gentle Low Flame',
        instruction: 'Heat ghee or oil in a deep kadai over low-medium heat. Test temperature with a tiny dough piece—it should gently rise without browning immediately. Slide in the shaped balls in batches and gently swirl the oil around them. Fry patiently on low heat for 8-10 minutes until evenly dark golden brown on all sides.',
        instructionTranslations: {
          te: 'కడాయిలో నెయ్యి లేదా నూనెను తక్కువ మంటపై వేడి చేయండి. గులాబ్ జామున్లను నెమ్మదిగా వేసి, తక్కువ మంటపై 8-10 నిమిషాలు బంగారు రంగు వచ్చేవరకు వేయించండి.'
        },
        durationMinutes: 10,
        temperatureOrHeat: 'Low',
        image: '/images/jamun_frying.jpg',
        chefTip: 'Constant gentle stirring of the hot ghee ensures uniform deep mahogany golden color on all sides.'
      },
      {
        id: 'gjs4',
        stepNumber: 4,
        title: 'Soak in Warm Syrup & Garnish',
        instruction: 'Drain the fried golden jamuns and drop them directly into the warm sugar syrup. Let them soak undisturbed for at least 30 to 45 minutes until they swell, become soft, and absorb the aromatic syrup. Garnish with slivered emerald pistachios and serve warm or chilled!',
        instructionTranslations: {
          te: 'వేయించిన జామున్లను గోరువెచ్చని పంచదార పాకంలో వేసి 45 నిమిషాలు నాననివ్వండి. పిస్తా పలుకులతో అలంకరించి సర్వ్ చేయండి!'
        },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: '/images/soft_gulab_jamun.jpg',
        chefTip: 'For the ultimate restaurant presentation, serve warm with a scoop of creamy vanilla bean ice cream.'
      }
    ],
    nutrition: {
      calories: 290,
      protein: 5,
      carbohydrates: 46,
      fat: 10,
      fiber: 1
    },
    substitutions: [
      { original: 'Milk Powder', substitute: 'Fresh Unsweetened Khoya (Mawa)', ratio: '1:1', notes: 'Authentic halwai texture' },
      { original: 'Ghee Frying', substitute: 'Sunflower or Canola Oil', ratio: '1:1', notes: 'Light everyday alternative' }
    ]
  },
  {
    id: 'chole-bhature-special',
    name: 'Amritsari Chole Bhature (Spiced Chickpea Curry & Puffed Bread)',
    nameTranslations: {
      te: 'అమృతసర్ చోలే భటూరే',
      hi: 'अमृतसरी छोले भटूरे',
      es: 'Chole Bhature de Amritsar'
    },
    description: 'Piping hot, dark spiced Punjabi chickpeas simmered with anardana, tea liquor, and roasted garam masala, served with giant balloon-puffed crispy bhaturas.',
    descriptionTranslations: {
      te: 'ఘుమఘుమలాడే అమృతసరి చోలే కర్రీ మరియు పొంగిన వేడి వేడి భటూరే.',
      hi: 'मसालेदार चटपटे छोले और फूले हुए गरमा-गरम भटूरे।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Spicy',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1200&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1200&q=80',
    baseServings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    totalTimeMinutes: 55,
    difficulty: 'Medium',
    spiceLevel: 'Spicy',
    dietaryTags: ['Vegetarian'],
    budget: '$',
    rating: 4.97,
    reviewsCount: 650,
    author: 'Chef Gurpreet Singh',
    authenticStyleNotes: 'Chickpeas boiled with whole black cardamom, dried amla, and tea bag for the signature deep dark color and robust tang.',
    homestyleNotes: 'Can be made with canned chickpeas and baking powder leavened flour for quick 30-minute cooking.',
    ingredients: [
      { id: 'cb1', name: 'Kabuli Chana (Chickpeas, soaked)', nameTranslations: { te: 'నానబెట్టిన కాబూలీ శనగలు' }, baseQuantity: 2, unit: 'cups', category: 'Grains & Pasta' },
      { id: 'cb2', name: 'All-Purpose Flour (Maida, for Bhature)', nameTranslations: { te: 'మైదా పిండి' }, baseQuantity: 2, unit: 'cups', category: 'Grains & Pasta' },
      { id: 'cb3', name: 'Yogurt / Curd (for dough)', nameTranslations: { te: 'పెరుగు' }, baseQuantity: 0.5, unit: 'cup', category: 'Dairy & Refrigerated' },
      { id: 'cb4', name: 'Onions, Ginger & Garlic Paste', nameTranslations: { te: 'ఉల్లిపాయ, అల్లం వెల్లుల్లి పేస్ట్' }, baseQuantity: 1, unit: 'cup', category: 'Produce' },
      { id: 'cb5', name: 'Chole Masala & Anardana (Pomegranate powder)', nameTranslations: { te: 'చోలే మసాలా' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'cb6', name: 'Pure Desi Ghee / Mustard Oil', nameTranslations: { te: 'నెయ్యి లేదా ఆవనూనె' }, baseQuantity: 3, unit: 'tbsp', category: 'Oils & Condiments' }
    ],
    steps: [
      {
        id: 'cbs1',
        stepNumber: 1,
        title: 'Pressure Cook Chickpeas with Whole Spices',
        instruction: 'Cook soaked chickpeas with black cardamom, cloves, cinnamon, and a tea bag for 5-6 whistles until melt-in-the-mouth soft.',
        durationMinutes: 20,
        temperatureOrHeat: 'Medium-High',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cbs2',
        stepNumber: 2,
        title: 'Simmer Rich Spiced Gravy',
        instruction: 'Sauté ginger-garlic and onions in ghee. Add tomato puree, chole masala, roasted cumin, and anardana. Add cooked chickpeas and simmer on low for 15 minutes.',
        durationMinutes: 15,
        temperatureOrHeat: 'Medium',
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cbs3',
        stepNumber: 3,
        title: 'Knead, Roll & Fry Balloon Bhature',
        instruction: 'Knead flour with curd, semolina, and pinch of baking soda. Rest 30 mins. Roll into ovals and deep fry in smoking hot oil until puffed into golden balloons!',
        durationMinutes: 10,
        temperatureOrHeat: 'High',
        image: '/images/bhature_frying.jpg'
      }
    ],
    nutrition: { calories: 450, protein: 14, carbohydrates: 68, fat: 14, fiber: 9 },
    substitutions: []
  },
  {
    id: 'dal-makhani-restaurant',
    name: 'Creamy Restaurant Dal Makhani (Slow-Cooked Black Lentils)',
    nameTranslations: {
      te: 'క్రీమీ దాల్ మఖానీ',
      hi: 'क्रीमी दाल मखनी',
      es: 'Dal Makhani Cremoso'
    },
    description: 'Silky 24-hour slow-cooked whole black urad lentils and kidney beans simmered with rich white butter, fresh dairy cream, and kasuri methi.',
    descriptionTranslations: {
      te: 'వెన్న, మీగడతో నెమ్మదిగా ఉడికించిన అసలైన పంజాబీ దాల్ మఖానీ.',
      hi: 'मक्खन और मलाई के साथ धीमी आंच पर पकी हुई शाही दाल मखनी।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Savory',
    category: 'Main Course',
    image: '/images/dal_makhani_pot.jpg',
    imageUrl: '/images/dal_makhani_pot.jpg',
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    totalTimeMinutes: 60,
    difficulty: 'Medium',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegetarian', 'Gluten-free'],
    budget: '$',
    rating: 4.96,
    reviewsCount: 780,
    author: 'Chef Sanjeev',
    authenticStyleNotes: 'Slow-simmered over charcoal embers with continuous stirring to release natural lentil starches for the glossiest texture.',
    homestyleNotes: 'Pressure-cook lentils first, then finish with butter and cream in a heavy-bottomed pot.',
    ingredients: [
      { id: 'dm1', name: 'Whole Black Urad Dal & Rajma', nameTranslations: { te: 'మినపప్పు మరియు రాజ్మా' }, baseQuantity: 1.5, unit: 'cups', category: 'Grains & Pasta' },
      { id: 'dm2', name: 'Pure White Butter / Makhan', nameTranslations: { te: 'వెన్న' }, baseQuantity: 4, unit: 'tbsp', category: 'Dairy & Refrigerated' },
      { id: 'dm3', name: 'Heavy Fresh Cream', nameTranslations: { te: 'ఫ్రెష్ క్రీమ్' }, baseQuantity: 0.5, unit: 'cup', category: 'Dairy & Refrigerated' },
      { id: 'dm4', name: 'Tomato Puree & Degi Mirch', nameTranslations: { te: 'టొమాటో ప్యూరీ మరియు కారం' }, baseQuantity: 1, unit: 'cup', category: 'Produce' }
    ],
    steps: [
      {
        id: 'dms1',
        stepNumber: 1,
        title: 'Slow Simmer Cooked Dal',
        instruction: 'Combine cooked black lentils and rajma with tomato puree, ginger juliennes, and Kashmiri chili powder. Simmer on low flame for 30 minutes.',
        durationMinutes: 30,
        temperatureOrHeat: 'Low',
        image: '/images/dal_makhani_pot.jpg'
      },
      {
        id: 'dms2',
        stepNumber: 2,
        title: 'Whisk in Butter & Cream',
        instruction: 'Gradually incorporate generous cubes of cold butter and fresh cream, stirring continuously until velvety and aromatic. Sprinkle crushed roasted kasuri methi.',
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: { calories: 380, protein: 12, carbohydrates: 36, fat: 22, fiber: 7 },
    substitutions: []
  },
  {
    id: 'paneer-butter-masala',
    name: 'Shahi Paneer Butter Masala (Cottage Cheese in Velvety Gravy)',
    nameTranslations: {
      te: 'షాహీ పన్నీర్ బటర్ మసాలా',
      hi: 'शाही पनीर बटर मसाला',
      es: 'Paneer Butter Masala'
    },
    description: 'Succulent cubes of fresh cottage cheese simmered in a silky, rich cashew-tomato makhani gravy infused with butter, cream, and green cardamom.',
    descriptionTranslations: {
      te: 'తాజా పన్నీర్ ముక్కలు, జీడిపప్పు-టొమాటో గ్రేవీ మరియు వెన్నతో తయారు చేసిన అద్భుతమైన వంటకం.',
      hi: 'काजू और टमाटर की मखमली ग्रेवी में पका हुआ लाजवाब पनीर बटर मसाला।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Mild',
    category: 'Main Course',
    image: '/images/paneer_butter_masala.jpg',
    imageUrl: '/images/paneer_butter_masala.jpg',
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    dietaryTags: ['Vegetarian', 'Gluten-free'],
    budget: '$$',
    rating: 4.95,
    reviewsCount: 920,
    author: 'Chef Kapoor',
    authenticStyleNotes: 'Straining the boiled tomato-cashew base creates the signature mirror-smooth restaurant gravy.',
    homestyleNotes: 'Blend tomatoes, soaked cashews, and ginger directly for an easy one-pan gravy.',
    ingredients: [
      { id: 'pb1', name: 'Fresh Paneer (Cottage Cheese, cubed)', nameTranslations: { te: 'పన్నీర్ ముక్కలు' }, baseQuantity: 300, unit: 'g', category: 'Dairy & Refrigerated' },
      { id: 'pb2', name: 'Cashews & Ripe Tomatoes (pureed)', nameTranslations: { te: 'జీడిపప్పు మరియు టొమాటోలు' }, baseQuantity: 1.5, unit: 'cups', category: 'Produce' },
      { id: 'pb3', name: 'Butter & Heavy Cream', nameTranslations: { te: 'వెన్న మరియు మీగడ' }, baseQuantity: 3, unit: 'tbsp', category: 'Dairy & Refrigerated' },
      { id: 'pb4', name: 'Kasuri Methi & Garam Masala', nameTranslations: { te: 'కసూరి మేథి' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'pbs1',
        stepNumber: 1,
        title: 'Cook Makhani Base Gravy',
        instruction: 'Sauté whole spices in butter, add strained tomato-cashew puree, Kashmiri chili powder, and salt. Simmer for 12 minutes until oil separates gently.',
        durationMinutes: 12,
        temperatureOrHeat: 'Medium',
        image: '/images/paneer_butter_masala.jpg'
      },
      {
        id: 'pbs2',
        stepNumber: 2,
        title: 'Add Paneer Cubes & Finish with Cream',
        instruction: 'Gently slide in fresh soft paneer cubes. Simmer for 3 minutes. Finish with crushed kasuri methi, honey/sugar pinch, and a swirl of rich cream.',
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: '/images/paneer_simmer.jpg'
      }
    ],
    nutrition: { calories: 360, protein: 16, carbohydrates: 18, fat: 26, fiber: 3 },
    substitutions: []
  },
  {
    id: 'mumbai-pav-bhaji',
    name: 'Iconic Mumbai Pav Bhaji (Spiced Vegetable Mash & Toasted Pav)',
    nameTranslations: {
      te: 'ముంబై పావ్ భాజీ',
      hi: 'मुंबई स्टाइल पाव भाजी',
      es: 'Pav Bhaji de Mumbai'
    },
    description: 'Mashed medley of cauliflower, potatoes, peas, and bell peppers spiced with fragrant pav bhaji masala, topped with butter and served with golden pan-toasted pav buns.',
    descriptionTranslations: {
      te: 'ముంబై ప్రసిద్ధ పావ్ భాజీ - కమ్మని వెన్న, నిమ్మరసం మరియు వేడి వేడి పావ్‌లతో.',
      hi: 'मक्खन से भरपूर चटपटी पाव भाजी, कुरकुरे पाव और नींबू-प्याज के साथ।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Tangy',
    category: 'Street Food',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80',
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegetarian'],
    budget: '$',
    rating: 4.94,
    reviewsCount: 610,
    author: 'Chowpatty Master',
    authenticStyleNotes: 'Cooked and smashed continuously on a massive iron tawa with splashing ladles of butter.',
    homestyleNotes: 'Pressure-cook vegetables together and mash with standard potato masher in a broad pan.',
    ingredients: [
      { id: 'pbv1', name: 'Boiled Potatoes, Cauliflower & Green Peas', nameTranslations: { te: 'బంగాళాదుంపలు, కాలీఫ్లవర్ మరియు బఠానీలు' }, baseQuantity: 3, unit: 'cups', category: 'Produce' },
      { id: 'pbv2', name: 'Finely Chopped Onions, Capsicum & Tomatoes', nameTranslations: { te: 'ఉల్లిపాయ, క్యాప్సికమ్, టొమాటో ముక్కలు' }, baseQuantity: 2, unit: 'cups', category: 'Produce' },
      { id: 'pbv3', name: 'Amul Salted Butter', nameTranslations: { te: 'వెన్న' }, baseQuantity: 4, unit: 'tbsp', category: 'Dairy & Refrigerated' },
      { id: 'pbv4', name: 'Pav Bhaji Masala & Kasuri Methi', nameTranslations: { te: 'పావ్ భాజీ మసాలా' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'pbv5', name: 'Fresh Soft Pav Buns', nameTranslations: { te: 'పావ్ బన్స్' }, baseQuantity: 8, unit: 'pieces', category: 'Grains & Pasta' }
    ],
    steps: [
      {
        id: 'pbvs1',
        stepNumber: 1,
        title: 'Sauté Aromatics & Mash Veggies',
        instruction: 'Sauté onions and capsicum in 2 tbsp butter. Add tomatoes and pav bhaji masala. Add boiled vegetables and mash vigorously with a potato masher until thick and luscious.',
        durationMinutes: 12,
        temperatureOrHeat: 'Medium',
        image: '/images/pav_bhaji_mash.jpg'
      },
      {
        id: 'pbvs2',
        durationMinutes: 5,
        temperatureOrHeat: 'Medium',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80'
      }
    ],
    nutrition: { calories: 390, protein: 9, carbohydrates: 54, fat: 16, fiber: 8 },
    substitutions: []
  },
  {
    id: 'authentic-palak-paneer',
    name: 'Dhaba-Style Palak Paneer (Cottage Cheese in Spiced Spinach Gravy)',
    nameTranslations: {
      te: 'పాలక్ పన్నీర్ (పాలకూర పన్నీర్ కర్రీ)',
      hi: 'ढाबा स्टाइल पालक पनीर',
      es: 'Palak Paneer Tradicional'
    },
    description: 'Tender cubes of fresh paneer simmered in a vibrant, velvety smooth spiced spinach gravy infused with garlic, cumin, garam masala, and a dollop of fresh butter.',
    descriptionTranslations: {
      te: 'తాజా పాలకూర ప్యూరీ, వెల్లుల్లి, జీలకర్ర మరియు సుగంధ ద్రవ్యాలలో ఉడికించిన మెత్తని పన్నీర్ ముక్కలు.',
      hi: 'लहसुन और गरम मसालों से भरपूर ताज़ा पालक की मखमली प्यूरी में पके हुए पनीर के टुकड़े।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Savory',
    category: 'Main Course',
    image: '/images/palak_paneer.jpg',
    imageUrl: '/images/palak_paneer.jpg',
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegetarian', 'Gluten-free', 'Egg-free'],
    budget: '$',
    rating: 4.96,
    reviewsCount: 780,
    author: 'Chef Sanjeev',
    authenticStyleNotes: 'Blanch spinach leaves in boiling salted water for exactly 2 minutes and immediately shock in ice water to lock in the bright emerald green color.',
    homestyleNotes: 'Puree blanched spinach with green chilies and ginger; sauté with onions and tomatoes in one pot.',
    ingredients: [
      { id: 'pp1', name: 'Fresh Spinach Leaves (Palak, washed)', nameTranslations: { te: 'తాజా పాలకూర' }, baseQuantity: 500, unit: 'g', category: 'Produce' },
      { id: 'pp2', name: 'Fresh Paneer (cubed)', nameTranslations: { te: 'తాజా పన్నీర్' }, baseQuantity: 250, unit: 'g', category: 'Dairy & Refrigerated', homestyleSubstitute: { name: 'Extra Firm Tofu', quantityRatio: 1, unit: 'g', note: 'Makes it vegan and dairy-free' } },
      { id: 'pp3', name: 'Finely Chopped Garlic & Ginger', nameTranslations: { te: 'వెల్లుల్లి మరియు అల్లం' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
      { id: 'pp4', name: 'Finely Chopped Onions & Green Chilies', nameTranslations: { te: 'ఉల్లిపాయలు మరియు పచ్చిమిర్చి' }, baseQuantity: 1, unit: 'cup', category: 'Produce' },
      { id: 'pp5', name: 'Cumin Seeds, Turmeric & Garam Masala', nameTranslations: { te: 'జీలకర్ర, పసుపు, గరం మసాలా' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'pp6', name: 'Butter, Ghee or Mustard Oil', nameTranslations: { te: 'వెన్న లేదా నెయ్యి' }, baseQuantity: 2, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'pp7', name: 'Fresh Cream / Malai', nameTranslations: { te: 'ఫ్రెష్ క్రీమ్' }, baseQuantity: 2, unit: 'tbsp', category: 'Dairy & Refrigerated', optional: true },
      { id: 'pp8', name: 'Kasuri Methi (Dried Fenugreek)', nameTranslations: { te: 'కసూరి మేథి' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'pps1',
        stepNumber: 1,
        title: 'Blanch & Puree Fresh Spinach (Palak)',
        instruction: 'Bring a pot of salted water to a rolling boil. Add washed spinach leaves and blanch for 2 minutes. Immediately transfer to an ice-water bath. Blend blanched spinach with green chilies and ginger into a smooth emerald puree.',
        instructionTranslations: {
          te: 'మరుగుతున్న నీటిలో పాలకూరను 2 నిమిషాలు ఉడికించి వెంటనే చన్నీళ్లలో వేయండి. పచ్చిమిర్చి, అల్లంతో కలిపి మెత్తగా పేస్ట్ చేయండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'High',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        chefTip: 'The ice-water shock stops cooking instantly and preserves that gorgeous restaurant green color!'
      },
      {
        id: 'pps2',
        stepNumber: 2,
        title: 'Sauté Garlic, Cumin & Spiced Aromatics',
        instruction: 'Heat ghee or butter in a kadai. Splutter cumin seeds, then add generous minced garlic and chopped onions. Sauté until lightly golden. Add turmeric and garam masala.',
        instructionTranslations: {
          te: 'బాణలిలో నెయ్యి లేదా వెన్న వేసి జీలకర్ర, వెల్లుల్లి, ఉల్లిపాయలు వేసి దోరగా వేయించండి.'
        },
        durationMinutes: 6,
        temperatureOrHeat: 'Medium',
        image: '/images/paneer_simmer.jpg'
      },
      {
        id: 'pps3',
        stepNumber: 3,
        title: 'Simmer Spinach Puree with Fresh Paneer',
        instruction: 'Pour the spinach puree into the sautéed aromatics. Simmer gently on low heat for 5 minutes. Gently slide in soft fresh paneer cubes and let them absorb the flavors for 3 minutes.',
        instructionTranslations: {
          te: 'పాలకూర ప్యూరీని వేసి 5 నిమిషాలు ఉడికించండి. తరువాత పన్నీర్ ముక్కలు వేసి నెమ్మదిగా కలపండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: '/images/palak_paneer.jpg'
      },
      {
        id: 'pps4',
        stepNumber: 4,
        title: 'Finish with Cream, Kasuri Methi & Butter Swirl',
        instruction: 'Crush kasuri methi between your palms and sprinkle over the gravy. Swirl in fresh cream and a pat of butter. Serve piping hot with garlic naan or basmati rice!',
        instructionTranslations: {
          te: 'కసూరి మేథి, ఫ్రెష్ క్రీమ్ మరియు వెన్న వేసి వేడి వేడి నాన్ లేదా అన్నంతో వడ్డించండి!'
        },
        durationMinutes: 2,
        temperatureOrHeat: 'Low',
        image: '/images/palak_paneer.jpg'
      }
    ],
    nutrition: { calories: 310, protein: 18, carbohydrates: 12, fat: 22, fiber: 6 },
    substitutions: [
      { original: 'Paneer', substitute: 'Extra Firm Tofu or Boiled Potatoes (Aloo Palak)', ratio: '1:1', notes: 'Great vegan or pantry-friendly alternatives' },
      { original: 'Butter/Cream', substitute: 'Coconut Cream or Olive Oil', ratio: '1:1', notes: 'Lighter vegan alternative' }
    ]
  },
  {
    id: 'crispy-punjabi-samosa',
    name: 'Crispy Golden Punjabi Samosa (Spiced Potato-Pea Pastry)',
    nameTranslations: {
      te: 'పంజాబీ క్రిస్పీ సమోసా',
      hi: 'कुरकुरा पंजाबी समोसा',
      es: 'Samosa Crujiente de la India'
    },
    description: 'Flaky, golden pastry pockets stuffed with a piping hot spiced filling of chunky potatoes, green peas, toasted cashews, raisins, and roasted coriander-cumin spices.',
    descriptionTranslations: {
      te: 'కరకరలాడే సమోసా - లోపల ఘుమఘుమలాడే ఆలూ మరియు బఠానీల మసాలా నింపి నూనెలో వేయించిన ప్రసిద్ధ స్నాక్.',
      hi: 'खस्ता और कुरकुरी पट्टी में भरी हुई चटपटी आलू-मटर की फिलिंग, हरी चटनी और मीठी चटनी के साथ।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Spicy',
    category: 'Street Food',
    image: '/images/crispy_samosa.jpg',
    imageUrl: '/images/crispy_samosa.jpg',
    baseServings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    totalTimeMinutes: 45,
    difficulty: 'Medium',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegan', 'Vegetarian', 'Dairy-free', 'Egg-free'],
    budget: '$',
    rating: 4.97,
    reviewsCount: 890,
    author: 'Chef Sanjeev & Street Masters',
    authenticStyleNotes: 'Moyen (rubbing ghee into flour until it resembles breadcrumbs) guarantees the signature crisp, non-oily crust.',
    homestyleNotes: 'Can be air-fried or baked at 190°C (375°F) for 20 minutes brushing lightly with oil.',
    ingredients: [
      { id: 'sm1', name: 'All-Purpose Flour (Maida)', nameTranslations: { te: 'మైదా పిండి' }, baseQuantity: 2, unit: 'cups', category: 'Grains & Pasta' },
      { id: 'sm2', name: 'Boiled Potatoes (coarsely crushed)', nameTranslations: { te: 'ఉడకబెట్టిన బంగాళాదుంపలు' }, baseQuantity: 4, unit: 'pieces', category: 'Produce' },
      { id: 'sm3', name: 'Green Peas (Matar)', nameTranslations: { te: 'పచ్చి బఠానీలు' }, baseQuantity: 0.5, unit: 'cup', category: 'Produce' },
      { id: 'sm4', name: 'Ajwain (Carom Seeds) & Cumin', nameTranslations: { te: 'వాము మరియు జీలకర్ర' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'sm5', name: 'Ghee or Warm Oil (for dough moyan)', nameTranslations: { te: 'నెయ్యి లేదా నూనె' }, baseQuantity: 4, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'sm6', name: 'Garam Masala, Amchur & Crushed Coriander Seeds', nameTranslations: { te: 'గరం మసాలా మరియు ఆమ్‌చూర్' }, baseQuantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'sm7', name: 'Oil for deep frying', nameTranslations: { te: 'వేయించడానికి నూనె' }, baseQuantity: 2, unit: 'cups', category: 'Oils & Condiments' }
    ],
    steps: [
      {
        id: 'sms1',
        stepNumber: 1,
        title: 'Knead Firm Samosa Dough',
        instruction: 'Mix maida, ajwain, salt, and warm ghee. Rub with fingertips until sandy. Add cold water in small splashes to knead a very firm, tight dough. Cover and rest for 20 minutes.',
        instructionTranslations: {
          te: 'మైదా, వాము, ఉప్పు మరియు నెయ్యి కలపండి. కొద్దిగా చన్నీళ్లు పోసి గట్టి పిండిలా కలపి 20 నిమిషాలు నాననివ్వండి.'
        },
        durationMinutes: 10,
        temperatureOrHeat: 'Low',
        image: '/images/chole_dough_knead.jpg'
      },
      {
        id: 'sms2',
        stepNumber: 2,
        title: 'Sauté Spiced Potato-Pea Filling',
        instruction: 'Heat 1 tbsp oil in a pan. Splutter crushed coriander and cumin seeds. Add green peas, crushed potatoes, garam masala, amchur powder, and salt. Sauté for 5 minutes. Cool completely.',
        instructionTranslations: {
          te: 'బాణలిలో జీలకర్ర, ధనియాలు, బఠానీలు, ఆలూ ముక్కలు, మసాలాలు వేసి 5 నిమిషాలు వేయించి చల్లారనివ్వండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/dosa_aloo_masala.jpg'
      },
      {
        id: 'sms3',
        stepNumber: 3,
        title: 'Roll, Shape Cones & Fill Samosas',
        instruction: 'Divide dough into balls. Roll each into an oval, cut in half. Form each half into a cone, brush edges with water, stuff with potato filling, and pinch seams firmly shut.',
        instructionTranslations: {
          te: 'పిండిని కోన్ లాగా మడిచి లోపల ఆలూ మసాలా నింపి అంచులను గట్టిగా మూసివేయండి.'
        },
        durationMinutes: 12,
        temperatureOrHeat: 'Low',
        image: '/images/crispy_samosa.jpg'
      },
      {
        id: 'sms4',
        stepNumber: 4,
        title: 'Slow Fry to Golden Crisp Perfection',
        instruction: 'Slide samosas into moderately warm oil on low-medium heat. Fry patiently for 12-15 minutes until perfectly crisp and deep golden blonde. Serve with mint and tamarind chutneys!',
        instructionTranslations: {
          te: 'సమోసాలను తక్కువ మంటపై 12-15 నిమిషాలు బంగారు రంగు వచ్చేవరకు వేయించి చట్నీలతో వడ్డించండి!'
        },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: '/images/crispy_samosa.jpg'
      }
    ],
    nutrition: { calories: 260, protein: 5, carbohydrates: 32, fat: 13, fiber: 3 },
    substitutions: [
      { original: 'Potatoes', substitute: 'Sweet Potatoes, Cauliflower or Minced Paneer', ratio: '1:1', notes: 'Delicious variety fillings' }
    ]
  },
  {
    id: 'authentic-egg-curry',
    name: 'Dhaba-Style Spiced Egg Curry (Tari Wali Anda Curry)',
    nameTranslations: {
      te: 'గుడ్డు కూర (స్పైసీ ఎగ్ కర్రీ)',
      hi: 'ढाबा स्टाइल अंडा करी',
      es: 'Curry de Huevo con Especias'
    },
    description: 'Golden shallow-fried hard-boiled eggs simmered in a robust, aromatic gravy of caramelized onions, ripe tomatoes, ginger, garlic, and freshly ground whole spices.',
    descriptionTranslations: {
      te: 'వేపిన కోడిగుడ్లు, ఉల్లిపాయలు, టొమాటోలు మరియు ఘాటైన మసాలా గ్రేవీతో చేసిన రుచికరమైన ఎగ్ కర్రీ.',
      hi: 'सुनहरे तले हुए उबले अंडे, गाढ़ी मसालेदार प्याज-टमाटर की तरी में पके हुए।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Spicy',
    category: 'Main Course',
    image: '/images/dhaba_egg_curry.jpg',
    imageUrl: '/images/dhaba_egg_curry.jpg',
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    totalTimeMinutes: 40,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['High-Protein', 'Gluten-free', 'Dairy-free'],
    budget: '$',
    rating: 4.95,
    reviewsCount: 420,
    author: 'Chef Highway Dhaba Special',
    authenticStyleNotes: 'Pricking the boiled eggs and shallow-frying them with a pinch of turmeric and red chili creates a golden blistered crust that absorbs rich gravy flavors.',
    homestyleNotes: 'Can be made quickly using sliced boiled eggs or dropping poached eggs directly into the bubbling gravy.',
    ingredients: [
      { id: 'eg1', name: 'Fresh Farm Eggs (hard-boiled & peeled)', nameTranslations: { te: 'ఉడకబెట్టిన గుడ్లు' }, baseQuantity: 6, unit: 'pieces', category: 'Meat & Seafood' },
      { id: 'eg2', name: 'Onions (finely chopped or pureed)', nameTranslations: { te: 'ఉల్లిపాయలు' }, baseQuantity: 2, unit: 'pieces', category: 'Produce' },
      { id: 'eg3', name: 'Tomatoes (pureed)', nameTranslations: { te: 'టొమాటో గుజ్జు' }, baseQuantity: 3, unit: 'pieces', category: 'Produce' },
      { id: 'eg4', name: 'Fresh Ginger-Garlic Paste', nameTranslations: { te: 'అల్లం వెల్లుల్లి పేస్ట్' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'eg5', name: 'Kashmiri Red Chili & Turmeric Powder', nameTranslations: { te: 'కారం మరియు పసుపు' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'eg6', name: 'Garam Masala & Coriander Powder', nameTranslations: { te: 'గరం మసాలా మరియు ధనియాల పొడి' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'eg7', name: 'Mustard Seeds & Cumin Seeds', nameTranslations: { te: 'ఆవాలు మరియు జీలకర్ర' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'eg8', name: 'Cooking Oil or Mustard Oil', nameTranslations: { te: 'నూనె' }, baseQuantity: 3, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'eg9', name: 'Kasuri Methi & Fresh Cilantro', nameTranslations: { te: 'కొత్తిమీర మరియు కసూరీ మేథీ' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
      { id: 'eg10', name: 'Salt', nameTranslations: { te: 'ఉప్పు' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'egs1',
        stepNumber: 1,
        title: 'Prick & Sear Boiled Eggs',
        instruction: 'Prick hard-boiled eggs gently with a fork. Heat 1 tbsp oil in a pan with a pinch of turmeric, red chili, and salt. Sear the eggs for 3 minutes over medium heat until golden and blistered. Set aside.',
        instructionTranslations: {
          te: 'ఉడకబెట్టిన గుడ్లకు చిన్న గాట్లు పెట్టి, పసుపు, కారం వేసిన నూనెలో 3 నిమిషాలు బంగారు రంగు వచ్చేవరకు వేయించి పక్కన పెట్టండి.'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Medium',
        image: '/images/dhaba_egg_curry.jpg',
        chefTip: 'Pricking prevents eggs from bursting and lets the curry soak into the whites.'
      },
      {
        id: 'egs2',
        stepNumber: 2,
        title: 'Sauté Aromatics & Caramelize Onions',
        instruction: 'In the same pan, add remaining oil and crackle cumin and mustard seeds. Add finely chopped onions and sauté over medium heat for 7-8 minutes until deep golden brown. Stir in ginger-garlic paste for 1 minute.',
        instructionTranslations: {
          te: 'బాణలిలో జీలకర్ర, ఆవాలు వేసి ఉల్లిపాయ ముక్కలను బంగారు రంగు వచ్చేవరకు వేయించండి. అల్లం వెల్లుల్లి పేస్ట్ వేసి కలపండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/paneer_simmer.jpg'
      },
      {
        id: 'egs3',
        stepNumber: 3,
        title: 'Cook Tomato Masala Gravy',
        instruction: 'Add pureed tomatoes, turmeric, Kashmiri chili powder, coriander powder, and salt. Cook for 6-8 minutes until the gravy thickens and oil releases from the edges. Pour in 1 cup warm water and bring to a simmer.',
        instructionTranslations: {
          te: 'టొమాటో గుజ్జు, కారం, ధనియాల పొడి, ఉప్పు వేసి నూనె పైకి తేలేవరకు ఉడికించండి. 1 కప్పు నీళ్లు పోసి మరగనివ్వండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/dal_makhani_pot.jpg'
      },
      {
        id: 'egs4',
        stepNumber: 4,
        title: 'Simmer Eggs in Gravy & Garnish',
        instruction: 'Gently add the seared eggs into the bubbling gravy. Simmer on low heat for 5 minutes so eggs absorb the spiced flavors. Sprinkle garam masala, crushed kasuri methi, and fresh coriander. Serve hot with steamed rice or roti!',
        instructionTranslations: {
          te: 'వేయించిన గుడ్లను గ్రేవీలో వేసి 5 నిమిషాలు చిన్న మంటపై ఉడికించండి. గరం మసాలా, కొత్తిమీర చల్లి వేడివేడిగా సర్వ్ చేయండి!'
        },
        durationMinutes: 5,
        temperatureOrHeat: 'Low',
        image: '/images/dhaba_egg_curry.jpg'
      }
    ],
    nutrition: { calories: 290, protein: 16, carbohydrates: 10, fat: 20, fiber: 3 },
    substitutions: [
      { original: 'Eggs', substitute: 'Paneer Cubes or Tofu (Vegetarian/Vegan)', ratio: '1:1', notes: 'Transforms easily into spicy paneer or tofu curry' }
    ]
  },
  {
    id: 'authentic-aloo-curry',
    name: 'Dhaba-Style Aloo Masala Curry (Spiced Potato Stew)',
    nameTranslations: {
      te: 'ఆలూ మసాలా కూర (బంగాళాదుంప కర్రీ)',
      hi: 'ढाबा स्टाइल दम आलू करी',
      es: 'Curry de Patatas con Especias (Aloo Curry)'
    },
    description: 'Chunky tender potatoes simmered in a fragrant, tangy tomato-onion gravy infused with ginger, green chilies, roasted cumin, and aromatic dried fenugreek.',
    descriptionTranslations: {
      te: 'మెత్తగా ఉడికించిన బంగాళాదుంప ముక్కలు, టొమాటో గ్రేవీ, జీలకర్ర మరియు సుగంధ మసాలాలతో చేసిన రుచికరమైన ఆలూ కర్రీ.',
      hi: 'మసాసేదార్ చట్పటీ ఆలూ కీ తరీ వాలీ సబ్జీ, పూరీ యా పరాఠే కే సాథ్।'
    },
    cuisine: 'Indian',
    tasteProfile: 'Spicy',
    category: 'Main Course',
    image: '/images/aloo_curry.jpg',
    imageUrl: '/images/aloo_curry.jpg',
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Egg-free'],
    budget: '$',
    rating: 4.92,
    reviewsCount: 380,
    author: 'Chef Punjabi Rasoi',
    authenticStyleNotes: 'Coarsely crushing half the boiled potatoes with your hands into the sauce thickens the gravy naturally with potato starch without needing cornstarch or flour.',
    homestyleNotes: 'Can be cooked directly in a pressure cooker with raw cubed potatoes in 2 whistles for super quick 15-minute preparation.',
    ingredients: [
      { id: 'al1', name: 'Boiled Potatoes (peeled & roughly crushed)', nameTranslations: { te: 'ఉడకబెట్టిన బంగాళాదుంపలు' }, baseQuantity: 5, unit: 'pieces', category: 'Produce' },
      { id: 'al2', name: 'Onions (finely chopped)', nameTranslations: { te: 'ఉల్లిపాయలు' }, baseQuantity: 2, unit: 'pieces', category: 'Produce' },
      { id: 'al3', name: 'Tomatoes (finely chopped or pureed)', nameTranslations: { te: 'టొమాటోలు' }, baseQuantity: 3, unit: 'pieces', category: 'Produce' },
      { id: 'al4', name: 'Ginger-Garlic Paste & Slit Green Chilies', nameTranslations: { te: 'అల్లం వెల్లుల్లి మరియు పచ్చిమిర్చి' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'al5', name: 'Cumin Seeds & Mustard Seeds', nameTranslations: { te: 'జీలకర్ర మరియు ఆవాలు' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'al6', name: 'Turmeric, Red Chili & Coriander Powder', nameTranslations: { te: 'పసుపు, కారం, ధనియాల పొడి' }, baseQuantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'al7', name: 'Garam Masala & Amchur (Dry Mango Powder)', nameTranslations: { te: 'గరం మసాలా మరియు ఆమ్‌చూర్' }, baseQuantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'al8', name: 'Mustard Oil or Vegetable Oil', nameTranslations: { te: 'నూనె' }, baseQuantity: 2.5, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'al9', name: 'Kasuri Methi & Fresh Cilantro Leaves', nameTranslations: { te: 'కసూరీ మేథీ మరియు కొత్తిమీర' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
      { id: 'al10', name: 'Salt', nameTranslations: { te: 'ఉప్పు' }, baseQuantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        id: 'als1',
        stepNumber: 1,
        title: 'Bloom Whole Spices & Aromatics',
        instruction: 'Heat oil in a kadai or pan over medium heat. Crackle cumin and mustard seeds. Add slit green chilies and chopped onions, sautéing for 6 minutes until translucent and light golden. Stir in ginger-garlic paste for 1 minute.',
        instructionTranslations: {
          te: 'కడాయిలో నూనె వేడి చేసి జీలకర్ర, ఆవాలు, పచ్చిమిర్చి, ఉల్లిపాయ ముక్కలు వేసి వేయించండి. అల్లం వెల్లుల్లి పేస్ట్ వేసి కలపండి.'
        },
        durationMinutes: 7,
        temperatureOrHeat: 'Medium',
        image: '/images/paneer_simmer.jpg'
      },
      {
        id: 'als2',
        stepNumber: 2,
        title: 'Sauté Spiced Tomato Base',
        instruction: 'Add chopped tomatoes, turmeric, red chili powder, coriander powder, and salt. Cook for 5-6 minutes until tomatoes turn soft, jammy, and release fragrant oil.',
        instructionTranslations: {
          te: 'టొమాటో ముక్కలు, పసుపు, కారం, ధనియాల పొడి, ఉప్పు వేసి టొమాటోలు మెత్తబడే వరకు మగ్గనివ్వండి.'
        },
        durationMinutes: 6,
        temperatureOrHeat: 'Medium',
        image: '/images/dal_makhani_pot.jpg'
      },
      {
        id: 'als3',
        stepNumber: 3,
        title: 'Add Chunky Potatoes & Simmer Gravy',
        instruction: 'Add boiled potatoes, breaking some pieces by hand to thicken the sauce. Pour in 1.5 cups warm water, mix well, and bring to a gentle boil. Cover and simmer on low heat for 8 minutes so potatoes absorb the rich masala.',
        instructionTranslations: {
          te: 'ఉడికించిన ఆలూ ముక్కలు, 1.5 కప్పుల నీళ్లు పోసి కలపండి. మూతపెట్టి 8 నిమిషాలు చిన్న మంటపై ఉడికించండి.'
        },
        durationMinutes: 8,
        temperatureOrHeat: 'Low',
        image: '/images/dosa_aloo_masala.jpg'
      },
      {
        id: 'als4',
        stepNumber: 4,
        title: 'Finish with Amchur, Kasuri Methi & Cilantro',
        instruction: 'Remove lid, stir in garam masala, amchur powder for a touch of tanginess, crushed kasuri methi, and fresh chopped cilantro. Serve hot with fluffy puris, parathas, or jeera rice!',
        instructionTranslations: {
          te: 'గరం మసాలా, ఆమ్‌చూర్, కసూరీ మేథీ, కొత్తిమీర వేసి కలపండి. వేడివేడి పూరీలు లేదా పరోటాలతో వడ్డించండి!'
        },
        durationMinutes: 3,
        temperatureOrHeat: 'Low',
        image: '/images/aloo_curry.jpg'
      }
    ],
    nutrition: { calories: 230, protein: 4, carbohydrates: 38, fat: 8, fiber: 5 },
    substitutions: [
      { original: 'Potatoes', substitute: 'Cauliflower + Green Peas (Aloo Gobi Matar) or Paneer', ratio: '1:1', notes: 'Adds hearty crunch and protein' }
    ]
  }
];

