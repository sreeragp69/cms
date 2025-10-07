import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroData {
  bannerImage: string;
  bannerAlt: string;
  heading: string;
  description: string;
}

interface ThreeImage {
  id: string;
  imageUrl: string;
  altTag: string;
  position: number;
}

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

interface TechStack {
  id: string;
  name: string;
  imageUrl: string;
  altTag: string;
}

const SOCIAL_PLATFORMS = [
  'Facebook',
  'LinkedIn',
  'Twitter',
  'Instagram',
  'YouTube',
  'TikTok',
  'GitHub',
  'Discord'
];

export default function HeroAdminSection() {
  const [heroData, setHeroData] = useState<HeroData>({
    bannerImage: '',
    bannerAlt: '',
    heading: '',
    description: ''
  });

  const [threeImages, setThreeImages] = useState<ThreeImage[]>([
    { id: '1', imageUrl: '', altTag: '', position: 1 },
    { id: '2', imageUrl: '', altTag: '', position: 2 },
    { id: '3', imageUrl: '', altTag: '', position: 3 }
  ]);

  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [newSocial, setNewSocial] = useState({ platform: 'Facebook', url: '' });
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);

  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [newTech, setNewTech] = useState({ name: '', imageUrl: '', altTag: '' });
  const [editingTechId, setEditingTechId] = useState<string | null>(null);

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addSocialMedia = () => {
    if (newSocial.url.trim()) {
      setSocialMedia([...socialMedia, { ...newSocial, id: Date.now().toString() }]);
      setNewSocial({ platform: 'Facebook', url: '' });
    }
  };

  const updateSocialMedia = (id: string) => {
    setSocialMedia(socialMedia.map(s => s.id === id ? { ...s, ...newSocial } : s));
    setEditingSocialId(null);
    setNewSocial({ platform: 'Facebook', url: '' });
  };

  const deleteSocialMedia = (id: string) => {
    setSocialMedia(socialMedia.filter(s => s.id !== id));
  };

  const startEditSocial = (social: SocialMedia) => {
    setEditingSocialId(social.id);
    setNewSocial({ platform: social.platform, url: social.url });
  };

  const addTechStack = () => {
    if (newTech.name.trim() && newTech.imageUrl.trim()) {
      setTechStack([...techStack, { ...newTech, id: Date.now().toString() }]);
      setNewTech({ name: '', imageUrl: '', altTag: '' });
    }
  };

  const updateTechStack = (id: string) => {
    setTechStack(techStack.map(t => t.id === id ? { ...t, ...newTech } : t));
    setEditingTechId(null);
    setNewTech({ name: '', imageUrl: '', altTag: '' });
  };

  const deleteTechStack = (id: string) => {
    setTechStack(techStack.filter(t => t.id !== id));
  };

  const startEditTech = (tech: TechStack) => {
    setEditingTechId(tech.id);
    setNewTech({ name: tech.name, imageUrl: tech.imageUrl, altTag: tech.altTag });
  };

  return (
    <div className=" w-full ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" mx-auto"
      >
      

        <div className="space-y-8 w-full">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl  "
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2">
              Hero Section
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, (url) =>
                        setHeroData({ ...heroData, bannerImage: url })
                      );
                    }
                  }}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                />
                {heroData.bannerImage && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={heroData.bannerImage}
                    alt={heroData.bannerAlt}
                    className="mt-4 rounded-lg shadow-md max-h-48 object-cover"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Banner Alt Tag
                </label>
                <input
                  type="text"
                  value={heroData.bannerAlt}
                  onChange={(e) => setHeroData({ ...heroData, bannerAlt: e.target.value })}
                  placeholder="Enter alt tag for banner image"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  value={heroData.heading}
                  onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
                  placeholder="Enter hero heading"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={heroData.description}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  placeholder="Enter hero description"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>
            </div>
          </motion.section>

          {/* 3 Images Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-1 border-green-500 pb-2">
              3 Images Section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {threeImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  whileHover={{ scale: 1.02 }}
                  className="space-y-4 p-4 border-2 border-slate-200 rounded-lg hover:border-green-400 transition-colors"
                >
                  <h3 className="font-semibold text-slate-700">Image {index + 1}</h3>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, (url) => {
                          const updated = [...threeImages];
                          updated[index] = { ...updated[index], imageUrl: url };
                          setThreeImages(updated);
                        });
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors"
                  />

                  {image.imageUrl && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={image.imageUrl}
                      alt={image.altTag}
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                  )}

                  <input
                    type="text"
                    value={image.altTag}
                    onChange={(e) => {
                      const updated = [...threeImages];
                      updated[index] = { ...updated[index], altTag: e.target.value };
                      setThreeImages(updated);
                    }}
                    placeholder="Alt tag"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Social Media Handles */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white  p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-orange-500 pb-2">
              Social Media Handles
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={newSocial.platform}
                  onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {SOCIAL_PLATFORMS.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>

                <input
                  type="url"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                  placeholder="Enter social media URL"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={editingSocialId ? () => updateSocialMedia(editingSocialId) : addSocialMedia}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  {editingSocialId ? 'Update' : 'Add'}
                </motion.button>

                {editingSocialId && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingSocialId(null);
                      setNewSocial({ platform: 'Facebook', url: '' });
                    }}
                    className="px-6 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {socialMedia.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    {socialMedia.map((social) => (
                      <motion.div
                        key={social.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex-1">
                          <span className="font-semibold text-slate-700">{social.platform}:</span>
                          <span className="ml-2 text-slate-600 text-sm">{social.url}</span>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEditSocial(social)}
                            className="px-4 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteSocialMedia(social.id)}
                            className="px-4 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white  p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-teal-500 pb-2">
              Tech Stack Section
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tech Stack Name
                  </label>
                  <input
                    type="text"
                    value={newTech.name}
                    onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                    placeholder="e.g., React, Node.js"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tech Stack Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, (url) =>
                          setNewTech({ ...newTech, imageUrl: url })
                        );
                      }
                    }}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Image Alt Tag
                  </label>
                  <input
                    type="text"
                    value={newTech.altTag}
                    onChange={(e) => setNewTech({ ...newTech, altTag: e.target.value })}
                    placeholder="Enter alt tag for tech stack image"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={editingTechId ? () => updateTechStack(editingTechId) : addTechStack}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                >
                  {editingTechId ? 'Update' : 'Add'}
                </motion.button>

                {editingTechId && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingTechId(null);
                      setNewTech({ name: '', imageUrl: '', altTag: '' });
                    }}
                    className="px-6 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {techStack.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {techStack.map((tech) => (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -5 }}
                        className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200 hover:border-teal-400 transition-colors"
                      >
                        {tech.imageUrl && (
                          <img
                            src={tech.imageUrl}
                            alt={tech.altTag}
                            className="w-full h-24 object-contain mb-3 rounded"
                          />
                        )}
                        <h3 className="font-semibold text-slate-800 mb-3">{tech.name}</h3>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startEditTech(tech)}
                            className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteTechStack(tech.id)}
                            className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
