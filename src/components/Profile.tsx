import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const GENDER_OPTIONS = ["Male", "Female", "Non-Binary", "Prefer not to say"];
const OCCUPATION_OPTIONS = [
  "Student",
  "Working Professional",
  "Homemaker",
  "Retired",
  "Other"
];

const labelClass = "font-bold text-lg text-gray-900 mb-1 block";
const inputClass = "w-full rounded-xl border-2 border-teal-400 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-lg font-medium text-gray-800 placeholder-gray-400";
const valueClass = "text-lg text-gray-800 font-semibold";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 1: Basic Info
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occupationOther, setOccupationOther] = useState("");

  // Step 2-5 state (placeholders for now)
  const [emotionalWellness, setEmotionalWellness] = useState("");
  const [wellnessPreferences, setWellnessPreferences] = useState("");
  const [therapyDetails, setTherapyDetails] = useState("");
  const [marketplacePreferences, setMarketplacePreferences] = useState("");

  // TODO: Add state for all other steps

  // Load user details from localStorage
  useEffect(() => {
    if (!user) return;
    
    // Load saved profile data from localStorage
    const savedProfile = localStorage.getItem(`profile_${user.id}`);
    if (savedProfile) {
      try {
        const data = JSON.parse(savedProfile);
        setPhone(data.phone || "");
        setAge(data.age || "");
        setGender(data.gender || "");
        setLocation(data.location || "");
        setOccupation(data.occupation || "");
        setOccupationOther(data.occupationOther || "");
        setEmotionalWellness(data.emotionalWellness || "");
        setWellnessPreferences(data.wellnessPreferences || "");
        setTherapyDetails(data.therapyDetails || "");
        setMarketplacePreferences(data.marketplacePreferences || "");
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEdit = () => {
    setEditing(true);
    setError("");
    setSuccess("");
    setStep(1);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      if (user) {
        // Save profile data to localStorage
        const profileData = {
          email: user.email,
          name,
          phone,
          age,
          gender,
          location,
          occupation,
          occupationOther,
          emotionalWellness,
          wellnessPreferences,
          therapyDetails,
          marketplacePreferences
        };
        
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
        
        // Update user name in auth context
        const updatedUser = { ...user, name };
        // Note: You would need to add an updateUser method to AuthContext to persist this change
        
        setSuccess("Profile updated successfully!");
        setEditing(false);
      }
    } catch (error) {
      setError("Failed to save profile. Please try again.");
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-white to-purple-200">
        <div className="bg-white/80 p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Not signed in</h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow hover:from-teal-600 hover:to-purple-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-white to-purple-200">
        <div className="bg-white/80 p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
          <div className="text-lg text-gray-700">Loading profile...</div>
        </div>
      </div>
    );
  }

  // Stepper UI
  const steps = [
    "Basic Information",
    "Emotional & Mental Wellness",
    "Wellness Preferences",
    "Therapy-Specific Details",
    "Marketplace & Event Preferences"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-white to-purple-200">
      <div className="bg-white/80 p-6 sm:p-16 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-6xl mt-24 border border-teal-200">
        <h2 className="text-3xl font-bold mb-6">Your Profile</h2>
        {/* Stepper */}
        {editing && (
          <div className="flex items-center justify-center mb-8 w-full">
            {steps.map((label, idx) => (
              <div key={label} className="flex items-center">
                <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg ${step === idx + 1 ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{idx + 1}</div>
                {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-2" />}
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSave} className="w-full flex flex-col gap-8">
          {/* Always show all details in view mode */}
          {!editing && (
            <>
              {/* Step 1: Basic Information */}
              <div className="bg-white/90 rounded-2xl p-6 border border-teal-100 shadow mb-4">
                <h3 className="text-xl font-semibold mb-4 text-teal-700 flex items-center gap-2">🧑 Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-1"><label className={labelClass}>Full Name:</label><div className={valueClass}>{name}</div></div>
                  <div className="md:col-span-2"><label className={labelClass}>Email Address:</label><div className="w-full rounded-xl border-2 border-gray-300 p-4 bg-gray-100 text-lg font-medium text-gray-700 select-text cursor-not-allowed opacity-90">{user.email}</div></div>
                  <div className="md:col-span-1"><label className={labelClass}>Phone Number (optional):</label><div className={valueClass}>{phone || <span className="text-gray-400">-</span>}</div></div>
                  <div className="md:col-span-1"><label className={labelClass}>Age:</label><div className={valueClass}>{age || <span className="text-gray-400">-</span>}</div></div>
                  <div className="md:col-span-1"><label className={labelClass}>Gender:</label><div className={valueClass}>{gender || <span className="text-gray-400">-</span>}</div></div>
                  <div className="md:col-span-1"><label className={labelClass}>Location:</label><div className={valueClass}>{location || <span className="text-gray-400">-</span>}</div></div>
                  <div className="md:col-span-3"><label className={labelClass}>Occupation/Education Status:</label><div className={valueClass}>{occupation === "Other" ? occupationOther : occupation || <span className="text-gray-400">-</span>}</div></div>
                </div>
              </div>
              {/* Step 2: Emotional & Mental Wellness */}
              <div className="bg-white/90 rounded-2xl p-6 border border-purple-100 shadow mb-4">
                <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">🧠 Emotional & Mental Wellness</h3>
                <div className="text-lg text-gray-800">{emotionalWellness || <span className="text-gray-400">Not provided</span>}</div>
              </div>
              {/* Step 3: Wellness Preferences */}
              <div className="bg-white/90 rounded-2xl p-6 border border-pink-100 shadow mb-4">
                <h3 className="text-xl font-semibold mb-4 text-pink-700 flex items-center gap-2">🌱 Wellness Preferences</h3>
                <div className="text-lg text-gray-800">{wellnessPreferences || <span className="text-gray-400">Not provided</span>}</div>
              </div>
              {/* Step 4: Therapy-Specific Details */}
              <div className="bg-white/90 rounded-2xl p-6 border border-blue-100 shadow mb-4">
                <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">🩺 Therapy-Specific Details</h3>
                <div className="text-lg text-gray-800">{therapyDetails || <span className="text-gray-400">Not provided</span>}</div>
              </div>
              {/* Step 5: Marketplace & Event Preferences */}
              <div className="bg-white/90 rounded-2xl p-6 border border-green-100 shadow">
                <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">🛒 Marketplace & Event Preferences</h3>
                <div className="text-lg text-gray-800">{marketplacePreferences || <span className="text-gray-400">Not provided</span>}</div>
              </div>
            </>
          )}
          {/* In edit mode, show only the current step's content in the slider */}
          {editing && step === 1 && (
            <div className="bg-white/90 rounded-2xl p-6 border border-teal-100 shadow">
              <h3 className="text-xl font-semibold mb-4 text-teal-700 flex items-center gap-2">🧑 Step 1: Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <label className={labelClass}>Full Name:</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Email Address:</label>
                  <div className="w-full rounded-xl border-2 border-gray-300 p-4 bg-gray-100 text-lg font-medium text-gray-700 select-text cursor-not-allowed opacity-90">
                    {user.email}
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className={labelClass}>Phone Number (optional):</label>
                  <input
                    type="tel"
                    className={inputClass}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className={labelClass}>Age:</label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className={labelClass}>Gender:</label>
                  <select
                    className={inputClass}
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-1">
                  <label className={labelClass}>Location:</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className={labelClass}>Occupation/Education Status:</label>
                  <div className="flex flex-wrap gap-4">
                    {OCCUPATION_OPTIONS.map((o) => (
                      <label key={o} className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-full border-2 transition text-lg font-semibold shadow-sm
                        ${occupation === o ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white border-teal-500 scale-105' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-teal-100'}
                      `} style={{ minWidth: '200px', justifyContent: 'center' }}>
                        <input
                          type="radio"
                          name="occupation"
                          value={o}
                          checked={occupation === o}
                          onChange={e => setOccupation(e.target.value)}
                          className="w-6 h-6 accent-teal-500 mr-2"
                        />
                        {o}
                      </label>
                    ))}
                    {occupation === "Other" && (
                      <input
                        type="text"
                        className={inputClass + ' mt-2'}
                        placeholder="Other..."
                        value={occupationOther}
                        onChange={e => setOccupationOther(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {editing && step === 2 && (
            <div className="bg-white/90 rounded-2xl p-6 border border-purple-100 shadow">
              <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">🧠 Step 2: Emotional & Mental Wellness</h3>
              <textarea
                className={inputClass}
                value={emotionalWellness}
                onChange={e => setEmotionalWellness(e.target.value)}
                placeholder="Describe your current emotional and mental wellness, challenges, or goals..."
                rows={5}
              />
            </div>
          )}
          {editing && step === 3 && (
            <div className="bg-white/90 rounded-2xl p-6 border border-pink-100 shadow">
              <h3 className="text-xl font-semibold mb-4 text-pink-700 flex items-center gap-2">🌱 Step 3: Wellness Preferences</h3>
              <textarea
                className={inputClass}
                value={wellnessPreferences}
                onChange={e => setWellnessPreferences(e.target.value)}
                placeholder="Share your wellness preferences, interests, or preferred activities..."
                rows={5}
              />
            </div>
          )}
          {editing && step === 4 && (
            <div className="bg-white/90 rounded-2xl p-6 border border-blue-100 shadow">
              <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">🩺 Step 4: Therapy-Specific Details</h3>
              <textarea
                className={inputClass}
                value={therapyDetails}
                onChange={e => setTherapyDetails(e.target.value)}
                placeholder="Provide any therapy-specific details, diagnoses, or preferences..."
                rows={5}
              />
            </div>
          )}
          {editing && step === 5 && (
            <div className="bg-white/90 rounded-2xl p-6 border border-green-100 shadow">
              <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">🛒 Step 5: Marketplace & Event Preferences</h3>
              <textarea
                className={inputClass}
                value={marketplacePreferences}
                onChange={e => setMarketplacePreferences(e.target.value)}
                placeholder="Share your interests in marketplace offerings or events..."
                rows={5}
              />
            </div>
          )}
          {/* Actions */}
          {error && <div className="text-red-500 text-base text-center">{error}</div>}
          {success && <div className="text-green-600 text-base text-center">{success}</div>}
          <div className="flex gap-4 mt-4 justify-end">
            {editing ? (
              <>
                {step > 1 && (
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 rounded-full py-2 px-6 font-semibold shadow hover:bg-gray-400 transition text-lg"
                    onClick={() => setStep(step - 1)}
                    disabled={saving}
                  >
                    Back
                  </button>
                )}
                {step < steps.length ? (
                  <button
                    type="button"
                    className="bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full py-2 px-6 font-semibold shadow hover:from-teal-600 hover:to-purple-600 transition text-lg"
                    onClick={() => setStep(step + 1)}
                    disabled={saving}
                  >
                    Next
                  </button>
                ) : null}
                {step === steps.length && (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full py-2 px-6 font-semibold shadow hover:from-teal-600 hover:to-purple-600 transition text-lg"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                )}
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 rounded-full py-2 px-6 font-semibold shadow hover:bg-gray-400 transition text-lg"
                  onClick={() => { setEditing(false); setStep(1); }}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full py-2 px-6 font-semibold shadow hover:from-teal-600 hover:to-purple-600 transition text-lg"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-500 text-white rounded-full py-2 px-6 font-semibold shadow hover:bg-red-600 transition text-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 