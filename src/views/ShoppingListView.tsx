import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Printer, 
  UtensilsCrossed, 
  Check
} from 'lucide-react';
import { ShoppingListItem } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ShoppingListView: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState<number>(1);
  const [newItemUnit, setNewItemUnit] = useState('item');
  const [newItemCategory, setNewItemCategory] = useState('Pantry & Spices');

  const categories = ['Produce', 'Dairy & Cheeses', 'Grains & Pasta', 'Pantry & Spices', 'Protein', 'Other'];

  const fetchList = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const list = await api.getShoppingList(user.id);
      setItems(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [user]);

  const handleToggle = async (id: string) => {
    if (!user) return;
    // Optimistic update
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    try {
      await api.toggleShoppingItem(user.id, id);
    } catch (e) {
      fetchList();
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    setItems(prev => prev.filter(i => i.id !== id));
    try {
      await api.deleteShoppingItem(user.id, id);
    } catch (e) {
      fetchList();
    }
  };

  const handleClearCompleted = async () => {
    if (!user) return;
    setItems(prev => prev.filter(i => !i.completed));
    try {
      await api.clearCompletedShopping(user.id);
    } catch (e) {
      fetchList();
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !user) return;
    try {
      const added = await api.addShoppingItem(user.id, {
        ingredient: newItemName.trim(),
        quantity: newItemQty || 1,
        unit: newItemUnit || 'item',
        category: newItemCategory
      });
      setItems(prev => [...prev, added]);
      setNewItemName('');
      setNewItemQty(1);
    } catch (e) {
      console.error(e);
    }
  };

  // Group by category
  const grouped: Record<string, ShoppingListItem[]> = {};
  for (const item of items) {
    const cat = item.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  const completedCount = items.filter(i => i.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShoppingBag className="w-8 h-8 text-amber-600" />
            <span>{t.shoppingList}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {items.length} items total • {completedCount} checked off
          </p>
        </div>

        {completedCount > 0 && (
          <button
            id="shopping-clear-completed-btn"
            onClick={handleClearCompleted}
            className="px-3.5 py-2 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50/70 border border-rose-200/80 bg-white/70 backdrop-blur-md shadow-2xs flex items-center gap-1.5 transition-colors self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Completed ({completedCount})</span>
          </button>
        )}
      </div>

      {/* Add New Item Bar */}
      <form onSubmit={handleAddItem} className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] flex flex-wrap sm:flex-nowrap gap-2 items-center">
        <input
          id="shopping-item-name-input"
          type="text"
          required
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item name (e.g. Greek Yogurt, Cilantro, Garam Masala)..."
          className="glass-input flex-1 min-w-[180px] px-3.5 py-2 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="flex items-center gap-2">
          <input
            id="shopping-item-qty-input"
            type="number"
            min="0.1"
            step="any"
            value={newItemQty}
            onChange={(e) => setNewItemQty(parseFloat(e.target.value) || 1)}
            className="glass-input w-16 px-2.5 py-2 text-xs text-center rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            id="shopping-item-unit-input"
            type="text"
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            placeholder="unit"
            className="glass-input w-16 px-2.5 py-2 text-xs text-center rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <select
            id="shopping-item-category-select"
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="glass-input px-2.5 py-2 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            id="shopping-add-btn"
            type="submit"
            className="px-4 py-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center gap-1 transition-all border border-white/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Categorized List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 rounded-3xl glass-panel animate-pulse"></div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catItems]) => (
            <div key={category} className="glass-panel rounded-3xl p-5 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
              <div className="flex items-center justify-between border-b border-white/60 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  {category} ({catItems.length})
                </h3>
              </div>

              <div className="space-y-2">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border backdrop-blur-xs transition-all flex items-center justify-between gap-3 ${
                      item.completed 
                        ? 'bg-white/40 border-white/60 opacity-60' 
                        : 'bg-white/70 border-white/80 hover:bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggle(item.id)}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <span className={`text-xs font-bold text-slate-900 block truncate ${item.completed ? 'line-through text-slate-400' : ''}`}>
                          {item.ingredient}
                        </span>
                        {item.recipeName && (
                          <span className="text-[10px] text-amber-800 font-medium">
                            For: {item.recipeName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-semibold text-slate-700 bg-white/80 border border-white/80 px-2.5 py-0.5 rounded-lg shadow-2xs">
                        {item.quantity} {item.unit}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/80 p-12 text-center space-y-3">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Your Shopping List is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add items manually using the form above or click "Add to Shopping List" from any recipe or What Can I Cook search.
          </p>
        </div>
      )}
    </div>
  );
};
