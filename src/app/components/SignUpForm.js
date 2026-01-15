'use client';

import { useState } from 'react';
import WaiverText from './WaiverText';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalConditions: '',
    waiverAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    } else if (!/^[\d\s\-\(\)\+]+$/.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = 'Please enter a valid phone number';
    }

    if (!formData.waiverAgreed) {
      newErrors.waiverAgreed = 'You must agree to the waiver to sign up';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', emergencyContactName: '', emergencyContactPhone: '', medicalConditions: '', waiverAgreed: false });
      } else {
        const data = await response.json();
        setSubmitStatus('error');
        console.error('Submission error:', data);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Sign Up for Pints & Pilates</h1>
        <p className="text-lg">Saturday 11:00am - Yoga + Pilates</p>
        <p className="text-sm opacity-70 mt-2">Pour Taproom, 207 W Jackson Ave Knoxville, TN 37902</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-sm font-semibold">Full Name *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${errors.name ? 'border-red-500' : 'border-gray-600 bg-gray-800'}`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <div className="mt-1">
              <span className="text-xs text-red-500">{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-sm font-semibold">Email Address *</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-gray-600 bg-gray-800'}`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="mt-1">
              <span className="text-xs text-red-500">{errors.email}</span>
            </div>
          )}
        </div>

        {/* Emergency Contact Section */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-background text-sm">Emergency Contact Information</span>
          </div>
        </div>

        {/* Emergency Contact Name */}
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-sm font-semibold">Emergency Contact Name *</span>
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${errors.emergencyContactName ? 'border-red-500' : 'border-gray-600 bg-gray-800'}`}
            placeholder="Full name of emergency contact"
            disabled={isSubmitting}
          />
          {errors.emergencyContactName && (
            <div className="mt-1">
              <span className="text-xs text-red-500">{errors.emergencyContactName}</span>
            </div>
          )}
        </div>

        {/* Emergency Contact Phone */}
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-sm font-semibold">Emergency Contact Phone *</span>
          </label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-600 bg-gray-800'}`}
            placeholder="(555) 123-4567"
            disabled={isSubmitting}
          />
          {errors.emergencyContactPhone && (
            <div className="mt-1">
              <span className="text-xs text-red-500">{errors.emergencyContactPhone}</span>
            </div>
          )}
        </div>

        {/* Medical Conditions */}
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-sm font-semibold">Medical Conditions or Injuries</span>
            <span className="text-xs opacity-70 ml-2">Optional</span>
          </label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="w-full h-24 px-4 py-2 border border-gray-600 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            placeholder="Please list any medical conditions, injuries, or physical limitations we should be aware of..."
            disabled={isSubmitting}
          />
          <div className="mt-1">
            <span className="text-xs opacity-70">This information helps the instructor provide appropriate modifications</span>
          </div>
        </div>

        {/* Waiver Section */}
        <div className="space-y-4">
          <WaiverText />

          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="waiverAgreed"
                checked={formData.waiverAgreed}
                onChange={handleChange}
                className={`mt-1 w-4 h-4 rounded border-2 ${errors.waiverAgreed ? 'border-red-500' : 'border-purple-500'} focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={isSubmitting}
              />
              <span className="text-sm">
                I have read and agree to the Liability Waiver and Release *
              </span>
            </label>
            {errors.waiverAgreed && (
              <div className="mt-1 ml-7">
                <span className="text-xs text-red-500">{errors.waiverAgreed}</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Sign-Up'
            )}
          </button>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Thank you for signing up! You will receive a confirmation email shortly.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>There was an error submitting your sign-up. Please try again.</span>
          </div>
        )}
      </form>
    </div>
  );
}
