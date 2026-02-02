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

  const validateName = (name, fieldName) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return `${fieldName} is required`;
    }

    // Check for letters only (plus spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
    }

    // Block obvious fake names
    const fakePatternsRegex = /^(test|asdf|qwerty|abc|xyz|fake|none|na|n\/a|\d+|(.)\2{4,})$/i;
    if (fakePatternsRegex.test(trimmedName.replace(/\s/g, ''))) {
      return `Please enter a real ${fieldName.toLowerCase()}`;
    }

    // Check for minimum reasonable name length
    if (trimmedName.length < 2) {
      return `${fieldName} is too short`;
    }

    return null;
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return 'Emergency contact phone is required';
    }

    // Remove all non-digit characters to count actual numbers
    const digitsOnly = phone.replace(/\D/g, '');

    // Check for valid US format (10 digits, or 11 with country code)
    if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
      return 'Phone number must be 10 digits (or 11 with country code)';
    }

    // If 11 digits, must start with 1 (US country code)
    if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
      return 'Invalid country code for US number';
    }

    // Get the 10-digit portion (remove country code if present)
    const tenDigits = digitsOnly.length === 11 ? digitsOnly.slice(1) : digitsOnly;

    // Block repeated digits (like 1111111111)
    if (/^(\d)\1{9}$/.test(tenDigits)) {
      return 'Please enter a valid phone number';
    }

    // Block sequential numbers (like 1234567890 or 0123456789)
    const isSequential = (str) => {
      for (let i = 1; i < str.length; i++) {
        if (parseInt(str[i]) !== (parseInt(str[i-1]) + 1) % 10) {
          return false;
        }
      }
      return true;
    };
    if (isSequential(tenDigits)) {
      return 'Please enter a valid phone number';
    }

    // Check for valid phone number characters
    if (!/^[\d\s\-\(\)\+]+$/.test(phone)) {
      return 'Phone number contains invalid characters';
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    const nameError = validateName(formData.name, 'Name');
    if (nameError) {
      newErrors.name = nameError;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Validate emergency contact name
    const emergencyNameError = validateName(formData.emergencyContactName, 'Emergency contact name');
    if (emergencyNameError) {
      newErrors.emergencyContactName = emergencyNameError;
    }

    // Validate emergency contact phone
    const phoneError = validatePhone(formData.emergencyContactPhone);
    if (phoneError) {
      newErrors.emergencyContactPhone = phoneError;
    }

    // Validate waiver agreement
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

        {/* Validation Error Message */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Please fix the errors in the form before submitting.</span>
          </div>
        )}

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
            {/* <a
              href="https://venmo.com/u/Joyogaflow"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full mb-4"
            >
              Pay for Class on Venmo
            </a> */}
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
