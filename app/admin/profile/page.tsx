'use client';

import { useState, useEffect } from 'react';
import { User, Camera, Save, Eye, FileText, Plus, X, ExternalLink } from 'lucide-react';
import FileUpload from '../../../components/FileUpload';
import { socialIcons, getSocialIcon, SocialLink } from '../../../lib/socialIcons';

interface ProfileData {
  name: string;
  nickname: string;
  title: string;
  specialization: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  profileImage: string;
  cvUrl: string;
  socialLinks?: SocialLink[];
}

export default function ProfileManager() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Doe',
    nickname: 'Johnny',
    title: 'Software Engineer',
    specialization: 'Frontend & Backend Development',
    description: 'Experienced developer with a passion for building scalable web applications and mentoring junior engineers.',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '+1 (555) 987-6543',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    profileImage: '/example-profile.jpg',
    cvUrl: 'https://example.com/johndoe-cv.pdf',
    socialLinks: [
      {
        id: '1',
        name: 'Twitter',
        url: 'https://twitter.com/johndoe',
        icon: 'twitter'
      },
      {
        id: '2',
        name: 'Portfolio',
        url: 'https://johndoe.dev',
        icon: 'external'
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({
    id: '',
    name: '',
    url: '',
    icon: 'external'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const result = await response.json();
        if (result.success) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (url: string, fileName: string) => {
    setProfile(prev => ({
      ...prev,
      profileImage: url
    }));
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url) {
      const linkWithId = {
        ...newSocialLink,
        id: Date.now().toString()
      };
      setProfile(prev => ({
        ...prev,
        socialLinks: [...(prev.socialLinks || []), linkWithId]
      }));
      setNewSocialLink({ id: '', name: '', url: '', icon: 'external' });
    }
  };

  const handleRemoveSocialLink = (id: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter(link => link.id !== id) || []
    }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSocialLink(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.error('Failed to save profile:', result.message);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <User className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePreview}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Profile updated successfully!
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Camera className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Profile Picture</h2>
          </div>
          
          {/* Current Image Preview */}
          {profile.profileImage && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={profile.profileImage}
                  alt="Current profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <FileUpload
            uploadType="profile"
            onUploadComplete={handleImageUpload}
            currentImage={profile.profileImage}
          />
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nickname
              </label>
              <input
                type="text"
                name="nickname"
                value={profile.nickname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={profile.specialization}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder="+66628602714"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About Description</h2>
          
          <textarea
            name="description"
            value={profile.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write about yourself..."
          />
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <ExternalLink className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Social & Contact Links</h2>
          </div>
          
          <div className="space-y-4">
            {/* Add New Social Link */}
            <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newSocialLink.name}
                    onChange={handleSocialLinkChange}
                    placeholder="e.g., Twitter, Instagram, Portfolio"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={newSocialLink.url}
                    onChange={handleSocialLinkChange}
                    placeholder="https://..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    name="icon"
                    value={newSocialLink.icon}
                    onChange={(e) => setNewSocialLink(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {socialIcons.map((iconOption) => (
                      <option key={iconOption.key} value={iconOption.key}>
                        {iconOption.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  disabled={!newSocialLink.name || !newSocialLink.url}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </button>
              </div>
            </div>

            {/* Existing Social Links */}
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-md font-medium text-gray-800">Current Links</h3>
                {profile.socialLinks.map((link) => {
                  const iconConfig = getSocialIcon(link.icon);
                  const IconComponent = iconConfig?.icon || ExternalLink;
                  return (
                    <div key={link.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{link.name}</p>
                          <p className="text-sm text-gray-600 truncate max-w-md">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Open link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(link.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove link"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* CV Link */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">CV/Resume Link</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CV/Resume URL
              </label>
              <input
                type="url"
                name="cvUrl"
                value={profile.cvUrl}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/file/d/your-cv-file-id/view or any public CV link"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {profile.cvUrl && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current CV Link</p>
                      <p className="text-xs text-gray-500 truncate max-w-md">{profile.cvUrl}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={profile.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <Eye size={14} />
                      <span>Test Link</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p className="mb-2"><strong>Instructions:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Upload your CV to Google Drive, Dropbox, or any cloud storage</li>
              <li>Make sure the file is publicly accessible</li>
              <li>Copy the public/shareable link and paste it above</li>
              <li>For Google Drive: Right-click → Share → Copy link (make sure "Anyone with link" can view)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
