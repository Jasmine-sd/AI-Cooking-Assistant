import { Recipe } from '../types';
import { INITIAL_RECIPES } from '../../server/recipesData';

export { INITIAL_RECIPES };

export function filterLocalRecipes(recipes: Recipe[], params?: Record<string, string>): Recipe[] {
  if (!params) return recipes;
  let result = [...recipes];
  const { search, cuisine, category, dietary, spice, taste, difficulty, maxTime } = params;

  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    result = result.filter(r => {
      const rName = r.name.toLowerCase();
      const rTelugu = r.nameTranslations?.te?.toLowerCase() || '';
      const rHindi = r.nameTranslations?.hi?.toLowerCase() || '';
      if (rName.includes(s) || rTelugu.includes(s) || rHindi.includes(s) || r.id.toLowerCase().includes(s)) return true;

      if ((s.includes('egg curry') || s.includes('anda curry') || s.includes('egg masala') || s.includes('గుడ్డు')) && r.id.includes('egg-curry')) return true;
      if ((s.includes('aloo') || s.includes('potato curry') || s.includes('dum aloo') || s.includes('ఆలూ')) && r.id.includes('aloo-curry')) return true;
      if ((s.includes('palak') || s.includes('saag') || s.includes('పాలక్')) && r.id.includes('palak-paneer')) return true;
      if ((s.includes('samosa') || s.includes('సమోసా')) && r.id.includes('samosa')) return true;
      if ((s.includes('paneer butter') || s.includes('shahi paneer')) && r.id.includes('paneer-butter')) return true;
      if ((s.includes('rasgulla') || s.includes('rosogolla') || s.includes('rasg') || s.includes('రసగుల్లా') || s.includes('रसगुल्ला')) && r.id.includes('rasgulla')) return true;
      if ((s.includes('gulab') || s.includes('jamun') || s.includes('గులాబ్')) && r.id.includes('gulab-jamun')) return true;
      if ((s.includes('chole') || s.includes('bhatur') || s.includes('చోలే')) && r.id.includes('chole-bhature')) return true;
      if ((s.includes('dal makhani') || s.includes('makhani')) && r.id.includes('dal-makhani')) return true;
      if ((s.includes('pav bhaji') || s.includes('పావ్ భాజీ')) && r.id.includes('pav-bhaji')) return true;
      if ((s.includes('pani') || s.includes('puri') || s.includes('golgappa') || s.includes('puchka') || s.includes('పానీ')) && r.id.includes('pani-puri')) return true;
      if ((s.includes('laddu') || s.includes('ladoo') || s.includes('sweet') || s.includes('లడ్డూ')) && r.id.includes('laddu')) return true;
      if ((s.includes('dosa') || s.includes('dosai') || s.includes('దోస')) && r.id.includes('dosa')) return true;
      if ((s.includes('idli') || s.includes('iddly') || s.includes('ఇడ్లీ')) && r.id.includes('idli')) return true;
      if ((s.includes('biryani') || s.includes('బిర్యానీ')) && r.id.includes('biryani')) return true;
      if ((s.includes('butter chicken') || s.includes('murgh')) && r.id.includes('butter-chicken')) return true;
      if ((s.includes('pasta') || s.includes('penne') || s.includes('పాస్తా')) && r.id.includes('pasta')) return true;
      if ((s.includes('tofu') || s.includes('kung pao')) && r.id.includes('tofu')) return true;

      return (
        r.description.toLowerCase().includes(s) ||
        r.cuisine.toLowerCase().includes(s) ||
        (r.nameTranslations && Object.values(r.nameTranslations).some(v => v.toLowerCase().includes(s))) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(s))
      );
    });
  }

  if (cuisine && cuisine !== 'All') {
    const cLower = cuisine.toLowerCase();
    if (cLower === 'asian') {
      result = result.filter(r => ['asian', 'chinese', 'japanese', 'thai', 'korean', 'vietnamese'].includes(r.cuisine.toLowerCase()));
    } else {
      result = result.filter(r => r.cuisine.toLowerCase() === cLower);
    }
  }

  if (taste && taste !== 'All') {
    const tLower = taste.toLowerCase();
    result = result.filter(r => {
      if (r.tasteProfile) return r.tasteProfile.toLowerCase() === tLower;
      if (tLower === 'spicy') return r.spiceLevel === 'Spicy' || r.spiceLevel === 'Very Spicy';
      if (tLower === 'mild') return r.spiceLevel === 'Mild';
      if (tLower === 'sweet') return r.category === 'Desserts' || r.name.toLowerCase().includes('sweet');
      return true;
    });
  }

  if (category && category !== 'All') {
    result = result.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  if (dietary && dietary !== 'All') {
    const target = dietary.toLowerCase();
    result = result.filter(r => r.dietaryTags.some(tag => tag.toLowerCase() === target));
  }

  if (spice && spice !== 'All') {
    result = result.filter(r => r.spiceLevel.toLowerCase() === spice.toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    result = result.filter(r => r.difficulty === difficulty);
  }

  if (maxTime) {
    const t = parseInt(maxTime, 10);
    if (!isNaN(t)) {
      result = result.filter(r => r.totalTimeMinutes <= t);
    }
  }

  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  return result.filter(r => {
    if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
      return false;
    }
    const norm = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenIds.has(r.id) || seenNames.has(norm)) return false;
    seenIds.add(r.id);
    seenNames.add(norm);
    return true;
  });
}
