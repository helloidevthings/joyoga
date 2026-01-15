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
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Full Name *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.name}</span>
            </label>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email Address *</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.email}</span>
            </label>
          )}
        </div>

        {/* Emergency Contact Section */}
        <div className="divider">Emergency Contact Information</div>

        {/* Emergency Contact Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Emergency Contact Name *</span>
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.emergencyContactName ? 'input-error' : ''}`}
            placeholder="Full name of emergency contact"
            disabled={isSubmitting}
          />
          {errors.emergencyContactName && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.emergencyContactName}</span>
            </label>
          )}
        </div>

        {/* Emergency Contact Phone */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Emergency Contact Phone *</span>
          </label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.emergencyContactPhone ? 'input-error' : ''}`}
            placeholder="(555) 123-4567"
            disabled={isSubmitting}
          />
          {errors.emergencyContactPhone && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.emergencyContactPhone}</span>
            </label>
          )}
        </div>

        {/* Medical Conditions */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Medical Conditions or Injuries</span>
            <span className="label-text-alt opacity-70">Optional</span>
          </label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Please list any medical conditions, injuries, or physical limitations we should be aware of..."
            disabled={isSubmitting}
          />
          <label className="label">
            <span className="label-text-alt opacity-70">This information helps the instructor provide appropriate modifications</span>
          </label>
        </div>

        {/* Waiver Section */}
        <div className="space-y-4">
          <WaiverText />

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                name="waiverAgreed"
                checked={formData.waiverAgreed}
                onChange={handleChange}
                className={`checkbox ${errors.waiverAgreed ? 'checkbox-error' : 'checkbox-primary'}`}
                disabled={isSubmitting}
              />
              <span className="label-text">
                I have read and agree to the Liability Waiver and Release *
              </span>
            </label>
            {errors.waiverAgreed && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.waiverAgreed}</span>
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit Sign-Up'
            )}
          </button>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Thank you for signing up! You'll receive a confirmation email shortly.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>There was an error submitting your sign-up. Please try again.</span>
          </div>
        )}
      </form>
    </div>
  );
}
