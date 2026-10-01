/**
 * Deterministic mathematical ingredient calculation
 */

export function calculateIngredientQuantity(
  baseQuantity: number,
  baseServings: number,
  targetServings: number
): number {
  if (!baseQuantity || baseServings <= 0 || targetServings <= 0) return baseQuantity;
  const raw = (baseQuantity / baseServings) * targetServings;
  
  // Format neatly: if close to integer, return integer; otherwise round to 1 or 2 decimals
  if (Math.abs(raw - Math.round(raw)) < 0.01) {
    return Math.round(raw);
  }
  return Math.round(raw * 10) / 10;
}

export function formatQuantityWithFraction(qty: number, unit: string): string {
  if (qty === 0) return 'to taste';

  // Common fractions representation
  const whole = Math.floor(qty);
  const remainder = Math.round((qty - whole) * 100) / 100;

  let fraction = '';
  if (remainder >= 0.2 && remainder <= 0.29) fraction = '¼';
  else if (remainder >= 0.3 && remainder <= 0.38) fraction = '⅓';
  else if (remainder >= 0.45 && remainder <= 0.55) fraction = '½';
  else if (remainder >= 0.63 && remainder <= 0.7) fraction = '⅔';
  else if (remainder >= 0.72 && remainder <= 0.8) fraction = '¾';

  let display = '';
  if (fraction) {
    display = whole > 0 ? `${whole} ${fraction}` : fraction;
  } else {
    display = qty % 1 === 0 ? qty.toString() : qty.toFixed(1).replace(/\.0$/, '');
  }

  return `${display} ${unit}`.trim();
}
