import SignUpForm from '../components/SignUpForm';
import Link from 'next/link';

export const metadata = {
  title: 'Sign Up - Pour Taproom Class | Joyanna Hirst',
  description: 'Sign up for Saturday yoga and pilates classes at Pour Taproom with Joyanna Hirst',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen py-12 px-4 text-base-content">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="btn btn-ghost btn-sm mb-6">
          ← Back to Home
        </Link>

        {/* Class Title and Location */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign Up for Pints & Pilates</h1>
          <p className="text-lg">Saturday 11:00am - Yoga + Pilates</p>
          <p className="text-sm opacity-80 mt-2">Pour Taproom, 207 W Jackson Ave Knoxville, TN 37902</p>
        </div>

        {/* Class Information Section */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">About This Class</h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Joyanna is a licensed yoga instructor</strong> with experience in both yoga and pilates, she teaches at Crunch Fitness and received her 200hr Yoga Teacher Training from Yoga Six.
              </p>
            <p>
              <strong>Things To Remember</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Yoga mat</li>
              <li>Towel</li>
              <li>Water bottle</li>
              <li>Arrive 10-15 minutes early to set up and get settled</li>
            </ul>
            <p>
              <strong>Important Details</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Class cost: $10</li>
              <li>Pour will be open an hour before regular hours at 11am for those attending the class</li>
              <li>Drinks are available for purchase with multiple options including non-alcoholic beverages</li>
              <li>10% Discount on your entire tab for attending the class</li>
              <li>Parking: The sidestreet on the front of the building, the bridge or large parking lot are all available.</li>
            </ul>
          </div>
        </div>

        <SignUpForm />

        <div className="text-center mt-8 text-sm opacity-80">
          <p>Have questions? Contact Joyanna on Instagram
            <a
              href="https://www.instagram.com/joyannayoga/"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary ml-1"
            >
              @joyannayoga
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
