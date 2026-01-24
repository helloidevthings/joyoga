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
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', emergencyContactName: '', emergencyContactPhone: '', medicalConditions: '', waiverAgreed: false, marketingConsent: false });
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
    <div className="max-w-3xl mx-auto text-base-content">
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
                  {/* Marketing Consent */}
          <div className="form-control mt-4">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={isSubmitting}
              />
              <span className="label-text text-wrap">Optional:
                I would like to receive updates about upcoming classes and events
              </span>
            </label>
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
            <span className="label-text-alt">Optional</span>
          </label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-24 resize-none rounded-lg"
            placeholder="Please list any medical conditions, injuries, or physical limitations we should be aware of..."
            disabled={isSubmitting}
          />
          {/* <label className="label">
            <span className="label-text-alt break-words">This information helps the instructor provide appropriate modifications</span>
          </label> */}
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
              <span className="label-text text-wrap">
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
        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
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

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>There was an error submitting your sign-up. Please try again.</span>
          </div>
        )}
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Sign-Up Successful!</h3>
            <div className="alert alert-success mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Thank you for signing up! You will receive a confirmation email shortly.</span>
            </div>
            <p className="mb-4">Complete your registration by paying for the class:</p>
            <a
              href="https://venmo.com/u/Joyogaflow"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full mb-4"
            >
              Pay for Class on Venmo
            </a>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setShowSuccessModal(false)}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
