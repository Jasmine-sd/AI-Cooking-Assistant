import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

const PANI_PURI_IMG = '/images/pani_puri.jpg';
const ROYAL_BESAN_LADDU_IMG = '/images/royal_besan_laddu.jpg';
const CRISPY_MASALA_DOSA_IMG = '/images/crispy_masala_dosa.jpg';
const SOFT_GULAB_JAMUN_IMG = '/images/soft_gulab_jamun.jpg';
const WHITE_RASGULLA_IMG = '/images/white_rasgulla.jpg';

interface FoodImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
  cuisine?: string;
  aspectRatio?: string;
}

// Curated high-resolution culinary images by dish, category, and cuisine
const DISH_IMAGE_MAP: Array<{ match: (text: string) => boolean; url: string }> = [
  // 1. Egg Curry
  {
    match: (t) => t.includes('egg curry') || t.includes('anda curry') || t.includes('egg masala') || t.includes('boiled egg') || t.includes('గుడ్డు') || t.includes('అండా'),
    url: '/images/dhaba_egg_curry.jpg'
  },
  // 2. Aloo / Potato Curries
  {
    match: (t) => t.includes('aloo') || t.includes('potato curry') || t.includes('dum aloo') || t.includes('aloo matar') || t.includes('aloo gobi') || t.includes('ఆలూ') || t.includes('బంగాళాదుంప'),
    url: '/images/aloo_curry.jpg'
  },
  // 3. Sweets & Desserts
  {
    match: (t) => t.includes('rasgulla') || t.includes('rosogolla') || t.includes('రసగుల్లా') || t.includes('रसगुल्ला') || t.includes('white rasgulla'),
    url: WHITE_RASGULLA_IMG
  },
  {
    match: (t) => t.includes('gulab jamun') || t.includes('గులాబ్ జామున్') || t.includes('गुलाब जामुन') || (t.includes('jamun') && !t.includes('kala jamun tree')),
    url: SOFT_GULAB_JAMUN_IMG
  },
  {
    match: (t) => t.includes('dosa') || t.includes('దోస') || t.includes('डोसा') || t.includes('dosai'),
    url: CRISPY_MASALA_DOSA_IMG
  },
  {
    match: (t) => t.includes('idli') || t.includes('idly') || t.includes('ఇడ్లీ') || t.includes('इडली'),
    url: '/images/steamed_idlis.jpg'
  },
  {
    match: (t) => t.includes('pani puri') || t.includes('golgappa') || t.includes('panipuri') || t.includes('పానీపూరి') || t.includes('पानी पूरी') || t.includes('gupchup') || t.includes('puchka'),
    url: PANI_PURI_IMG
  },
  {
    match: (t) => t.includes('royal besan') || t.includes('besan laddu') || t.includes('besan ladoo') || t.includes('బేసన్ లడ్డూ') || t.includes('శనగపిండి లడ్డూ') || t.includes('లడ్డూ') || t.includes('बेसन के लड्डू'),
    url: ROYAL_BESAN_LADDU_IMG
  },
  // 4. Palak Paneer & Samosa
  {
    match: (t) => t.includes('palak paneer') || t.includes('saag paneer') || t.includes('పాలక్ పన్నీర్') || t.includes('పాలకూర పన్నీర్') || t.includes('पालक पनीर') || (t.includes('palak') && t.includes('paneer')),
    url: '/images/palak_paneer.jpg'
  },
  {
    match: (t) => t.includes('samosa') || t.includes('సమోసా') || t.includes('समोसा'),
    url: '/images/crispy_samosa.jpg'
  },
  // 5. Paneer Specialties
  {
    match: (t) => t.includes('paneer butter') || t.includes('shahi paneer') || t.includes('paneer makhani') || t.includes('పన్నీర్ బటర్') || t.includes('पनीर बटर'),
    url: '/images/paneer_butter_masala.jpg'
  },
  {
    match: (t) => (t.includes('paneer tikka') || t.includes('tikka') || t.includes('పన్నీర్ టిక్కా')) && !t.includes('palak') && !t.includes('saag'),
    url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => (t.includes('paneer') || t.includes('పన్నీర్')) && !t.includes('palak') && !t.includes('saag'),
    url: '/images/paneer_butter_masala.jpg'
  },
  // 6. Dal & Legumes
  {
    match: (t) => t.includes('chole') || t.includes('bhature') || t.includes('bhatura'),
    url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('dal makhani') || t.includes('makhani dal'),
    url: '/images/dal_makhani_pot.jpg'
  },
  {
    match: (t) => t.includes('dal tadka') || t.includes('yellow dal') || t.includes('dal fry'),
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80'
  },
  // 7. Rice, Biryani & Global
  {
    match: (t) => t.includes('fried rice') || t.includes('ఫ్రైడ్ రైస్') || t.includes('फ्राइड राइस'),
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('biryani') || t.includes('బిర్యానీ') || t.includes('बिरयानी'),
    url: '/images/hyderabadi_biryani.jpg'
  },
  {
    match: (t) => t.includes('butter chicken') || t.includes('ముర్గ్ మఖని'),
    url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('pav bhaji') || t.includes('పావ్ భాజీ'),
    url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('pasta') || t.includes('penne') || t.includes('పాస్తా') || t.includes('garlic tomato'),
    url: '/images/garlic_tomato_penne.jpg'
  },
  {
    match: (t) => t.includes('pad thai') || t.includes('పాడ్ థాయ్'),
    url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('taco') || t.includes('టాకో'),
    url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('tofu') || t.includes('kung pao') || t.includes('కుంగ్ పావో'),
    url: '/images/tofu_szechuan.jpg'
  },
  {
    match: (t) => t.includes('avocado') || t.includes('toast') || t.includes('అవకాడో'),
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('quinoa') || t.includes('buddha bowl') || t.includes('క్వినోవా'),
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    match: (t) => t.includes('lava cake') || t.includes('cake') || t.includes('లావా కేక్') || t.includes('కేక్'),
    url: '/images/molten_lava_baked.jpg'
  }
];

const CATEGORY_FALLBACKS: Record<string, string> = {
  'street food': PANI_PURI_IMG,
  'snacks': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
  'desserts': SOFT_GULAB_JAMUN_IMG,
  'breakfast': CRISPY_MASALA_DOSA_IMG,
  'main course': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80',
  'italian': '/images/garlic_tomato_penne.jpg',
  'indian': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  'asian': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'chinese': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'mexican': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80',
  'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
};

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  className = '',
  category = '',
  cuisine = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Determine the best authentic image source
  const getResolvedSrc = (): string => {
    const lowerAlt = (alt || '').toLowerCase();

    // If source exists and hasn't errored and is not a known mismatch, use it directly
    if (src && !imageError) {
      const isSoupPhoto = src.includes('photo-1559847844-5315695dadae');
      const isPadThai = lowerAlt.includes('pad thai') || lowerAlt.includes('పాడ్ థాయ్') || lowerAlt.includes('पैड थाई');
      if (isPadThai && isSoupPhoto) {
        return 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80';
      }
      const isSamosaPhoto = src.includes('photo-1601050690597-df0568f70950');
      const isPalakPaneer = lowerAlt.includes('palak') || lowerAlt.includes('saag') || lowerAlt.includes('పాలక్') || lowerAlt.includes('పాలకూర') || lowerAlt.includes('पालक');
      if (isPalakPaneer && isSamosaPhoto) {
        return 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=1200&q=80';
      }
      const isChickenPhoto = src.includes('photo-1603894584373-5ac82b2ae398');
      const isEggCurry = lowerAlt.includes('egg curry') || lowerAlt.includes('anda curry') || lowerAlt.includes('egg masala') || lowerAlt.includes('గుడ్డు') || lowerAlt.includes('అండా');
      if (isEggCurry && isChickenPhoto) {
        return 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80';
      }
      const isAlooCurry = lowerAlt.includes('aloo') || lowerAlt.includes('potato curry') || lowerAlt.includes('dum aloo') || lowerAlt.includes('ఆలూ') || lowerAlt.includes('బంగాళాదుంప');
      if (isAlooCurry && isChickenPhoto) {
        return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80';
      }
      const isPaneerCurry = (lowerAlt.includes('paneer') || lowerAlt.includes('పన్నీర్') || lowerAlt.includes('पनीर')) && !lowerAlt.includes('chicken');
      if (isPaneerCurry && isChickenPhoto) {
        return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80';
      }
      return src;
    }

    // 1. Strict dish guarantee: Pani Puri fallback
    const isPaniPuri = lowerAlt.includes('pani puri') || lowerAlt.includes('golgappa') || lowerAlt.includes('panipuri') || lowerAlt.includes('పానీపూరి') || lowerAlt.includes('पानी पूरी') || lowerAlt.includes('gupchup') || lowerAlt.includes('puchka');
    if (isPaniPuri) {
      return PANI_PURI_IMG;
    }

    // 2. Strict dish guarantee: Royal Besan Laddu fallback
    const isBesanLaddu = lowerAlt.includes('royal besan') || lowerAlt.includes('besan laddu') || lowerAlt.includes('besan ladoo') || lowerAlt.includes('బేసన్') || lowerAlt.includes('శనగపిండి లడ్డూ') || lowerAlt.includes('లడ్డూ') || lowerAlt.includes('बेसन') || lowerAlt.includes('लड्डू') || lowerAlt.includes('laddu') || lowerAlt.includes('ladoo');
    if (isBesanLaddu) {
      return ROYAL_BESAN_LADDU_IMG;
    }

    // Otherwise check dish map
    for (const item of DISH_IMAGE_MAP) {
      if (item.match(lowerAlt)) {
        return item.url;
      }
    }

    // Fallback to Category / Cuisine
    const catKey = category.toLowerCase().trim();
    const cuiKey = cuisine.toLowerCase().trim();
    if (CATEGORY_FALLBACKS[catKey]) return CATEGORY_FALLBACKS[catKey];
    if (CATEGORY_FALLBACKS[cuiKey]) return CATEGORY_FALLBACKS[cuiKey];
    return CATEGORY_FALLBACKS['default'];
  };

  const effectiveSrc = getResolvedSrc();

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-slate-400 animate-bounce" />
        </div>
      )}
      <img
        src={effectiveSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoading(false)}
        onError={() => {
          setImageError(true);
          setLoading(false);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
