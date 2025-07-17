'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Star,
  Code,
  Database,
  Globe,
  Smartphone,
  Cpu
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Skill {
  id?: string;
  name: string;
  category: string;
  level: number; // 1-5 scale
  description?: string;
  icon?: string;
  order: number;
  yearsOfExperience?: number;
}

const categories = [
  { id: 'frontend', name: 'Frontend Development', icon: Globe },
  { id: 'backend', name: 'Backend Development', icon: Database },
  { id: 'mobile', name: 'Mobile Development', icon: Smartphone },
  { id: 'embedded', name: 'Embedded Systems', icon: Cpu },
  { id: 'tools', name: 'Tools & Others', icon: Code }
];

const skillLevels = [
  { value: 1, label: 'Beginner', color: 'bg-red-100 text-red-700' },
  { value: 2, label: 'Novice', color: 'bg-orange-100 text-orange-700' },
  { value: 3, label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' },
  { value: 4, label: 'Advanced', color: 'bg-blue-100 text-blue-700' },
  { value: 5, label: 'Expert', color: 'bg-green-100 text-green-700' }
];

export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/portfolio/skills');
      const data = await response.json();
      
      if (data.success) {
        setSkills(data.data || []);
      } else {
        toast.error('Failed to load skills');
      }
    } catch (error) {
      toast.error('Error loading skills');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
    } else {
      setEditingSkill({
        name: '',
        category: 'frontend',
        level: 3,
        description: '',
        order: skills.length,
        yearsOfExperience: 1
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSave = async () => {
    if (!editingSkill) return;

    // Validation
    if (!editingSkill.name.trim()) {
      toast.error('Skill name is required');
      return;
    }

    setIsSaving(true);
    try {
      const url = editingSkill.id 
        ? `/api/portfolio/skills/${editingSkill.id}`
        : '/api/portfolio/skills';
      
      const method = editingSkill.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingSkill),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingSkill.id ? 'Skill updated successfully' : 'Skill created successfully');
        closeModal();
        loadSkills();
      } else {
        toast.error(data.error || 'Failed to save skill');
      }
    } catch (error) {
      toast.error('Error saving skill');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (skillId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/portfolio/skills/${skillId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Skill deleted successfully');
        loadSkills();
      } else {
        toast.error(data.error || 'Failed to delete skill');
      }
    } catch (error) {
      toast.error('Error deleting skill');
    }
  };

  const updateEditingSkill = (field: keyof Skill, value: any) => {
    if (!editingSkill) return;
    
    setEditingSkill({
      ...editingSkill,
      [field]: value
    });
  };

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const groupedSkills = categories.reduce((acc, category) => {
    acc[category.id] = skills.filter(skill => skill.category === category.id);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skills Management</h2>
          <p className="text-gray-600">Manage your technical skills and expertise levels</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Skills ({skills.length})
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <category.icon size={16} />
            {category.name} ({groupedSkills[category.id]?.length || 0})
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => {
            const categoryInfo = categories.find(c => c.id === skill.category);
            const levelInfo = skillLevels.find(l => l.value === skill.level);
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {categoryInfo && <categoryInfo.icon size={20} className="text-primary-600" />}
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openModal(skill)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => skill.id && handleDelete(skill.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Skill Level */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Proficiency</span>
                    <span className={`text-xs px-2 py-1 rounded ${levelInfo?.color}`}>
                      {levelInfo?.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <Star
                        key={level}
                        size={16}
                        className={level <= skill.level ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>

                {/* Experience */}
                {skill.yearsOfExperience && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">
                      {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                    </span>
                  </div>
                )}

                {/* Description */}
                {skill.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{skill.description}</p>
                )}

                {/* Category Badge */}
                <div className="mt-3">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                    {categoryInfo?.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your technical skills and expertise.</p>
          <button
            onClick={() => openModal()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Add Your First Skill
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Skill Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) => updateEditingSkill('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., React, Python, Arduino"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) => updateEditingSkill('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Proficiency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => updateEditingSkill('level', level)}
                          className="p-1"
                        >
                          <Star
                            size={20}
                            className={level <= editingSkill.level ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {skillLevels.find(l => l.value === editingSkill.level)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={editingSkill.yearsOfExperience || ''}
                    onChange={(e) => updateEditingSkill('yearsOfExperience', parseInt(e.target.value) || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 3"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={editingSkill.description || ''}
                    onChange={(e) => updateEditingSkill('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Brief description of your experience with this skill"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {editingSkill.id ? 'Update' : 'Create'} Skill
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
