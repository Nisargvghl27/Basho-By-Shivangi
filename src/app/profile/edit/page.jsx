"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { ArrowLeft, User, Phone, Mail, Camera, Loader2, MapPin, Home, Globe } from "lucide-react";
import Header from "../../../components/Header";
import toast from "react-hot-toast";

const inputClass =
  "w-full pl-10 pr-4 py-3 bg-charcoal/50 border border-clay/20 focus:border-clay rounded-lg text-rice-paper focus:outline-none focus:ring-1 focus:ring-clay text-sm transition-all font-sans placeholder:text-stone-warm/30";
const inputClassNoIcon =
  "w-full px-4 py-3 bg-charcoal/50 border border-clay/20 focus:border-clay rounded-lg text-rice-paper focus:outline-none focus:ring-1 focus:ring-clay text-sm transition-all font-sans placeholder:text-stone-warm/30";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-clay font-sans mb-2";

export default function EditProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photoURL: "",
  });

  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setFormData({
          name: user.displayName || "",
          phone: "",
          photoURL: user.photoURL || "",
        });
        setImagePreview(user.photoURL || "");

        try {
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setFormData((prev) => ({
              ...prev,
              name: data.name || user.displayName || "",
              phone: data.phone && data.phone !== "N/A" ? data.phone : "",
              photoURL: data.photoURL || user.photoURL || "",
            }));
            if (data.photoURL) setImagePreview(data.photoURL);
            if (data.defaultAddress) {
              setAddress({
                street: data.defaultAddress.street || "",
                apartment: data.defaultAddress.apartment || "",
                city: data.defaultAddress.city || "",
                state: data.defaultAddress.state || "",
                pincode: data.defaultAddress.pincode || "",
                country: data.defaultAddress.country || "India",
              });
            }
          }
        } catch (e) {
          console.error("Error loading user profile:", e);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn("Cloudinary not configured. Skipping image upload.");
      return null;
    }

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);
    uploadData.append("folder", "basho-user-avatars");

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Cloudinary upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name field is required.");
      return;
    }

    setSaving(true);
    try {
      let finalPhotoURL = formData.photoURL;

      if (imageFile) {
        try {
          const uploadedUrl = await uploadToCloudinary(imageFile);
          if (uploadedUrl) finalPhotoURL = uploadedUrl;
        } catch (err) {
          console.error("Image upload error:", err);
          toast.error("Image upload failed. Saving other changes.");
        }
      }

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL: finalPhotoURL,
      });

      // Build address object — only save if at least street is provided
      const defaultAddress = address.street.trim()
        ? {
          street: address.street.trim(),
          apartment: address.apartment.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          pincode: address.pincode.trim(),
          country: address.country.trim() || "India",
        }
        : null;

      // Update Firestore user document
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userDocRef);
      const updatePayload = {
        name: formData.name,
        phone: formData.phone || "N/A",
        photoURL: finalPhotoURL,
        ...(defaultAddress !== null && { defaultAddress }),
      };

      if (userSnap.exists()) {
        await updateDoc(userDocRef, updatePayload);
      } else {
        await setDoc(userDocRef, {
          uid: auth.currentUser.uid,
          name: formData.name,
          email: auth.currentUser.email,
          role: "Customer",
          status: "Active",
          joinDate: new Date(),
          lastLogin: new Date(),
          totalOrders: 0,
          totalSpent: 0,
          ...updatePayload,
        });
      }

      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile details:", error);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal">
        <Header />
        <div className="flex h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-clay animate-spin" />
            <p className="text-stone-warm">Loading profile details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-rice-paper">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-fade-in-up">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-rice-paper">Edit Profile</h1>
              <p className="text-stone-warm/75 text-sm mt-1">
                Update your personal information and profile picture.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 md:py-3 bg-clay hover:bg-clay/90 text-charcoal font-bold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-sm"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>

          {/* ── Avatar ── */}
          <div className="bg-charcoal-light border border-clay/20 rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="grain-texture opacity-5" />
            <div className="flex flex-col items-center sm:flex-row gap-6 relative z-10">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-clay/40 bg-charcoal flex items-center justify-center shadow-inner">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-clay/10 flex items-center justify-center">
                      <span className="text-clay text-3xl font-bold font-serif uppercase">
                        {formData.name?.charAt(0) || currentUser?.email?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-clay text-charcoal rounded-full cursor-pointer hover:scale-105 hover:bg-clay/90 transition-all shadow-md flex items-center justify-center"
                >
                  <Camera className="w-4 h-4" />
                  <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="font-semibold text-rice-paper">Profile Image</h3>
                <p className="text-stone-warm/60 text-xs max-w-sm font-sans">
                  Choose a picture to personalize your account. Supported formats: JPG, PNG, WEBP.
                </p>
                {imageFile && (
                  <p className="text-clay text-xs font-semibold mt-1 font-sans">
                    Selected: {imageFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Personal Info ── */}
          <div className="bg-charcoal-light border border-clay/20 rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="grain-texture opacity-5" />
            <div className="relative z-10 space-y-5">
              <h2 className="text-lg font-serif text-rice-paper border-b border-clay/10 pb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-clay" /> Personal Information
              </h2>

              {/* Full Name */}
              <div>
                <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-warm/50" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className={labelClass}>Email Address <span className="text-stone-warm/40 font-normal normal-case tracking-normal">(read only)</span></label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-warm/30" />
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || ""}
                    className="w-full pl-10 pr-4 py-3 bg-charcoal/30 border border-clay/10 rounded-lg text-stone-warm/50 text-sm cursor-not-allowed select-none outline-none font-sans"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-warm/50" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Default Address (Optional) ── */}
          <div className="bg-charcoal-light border border-clay/20 rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="grain-texture opacity-5" />
            <div className="relative z-10 space-y-5">
              <div className="border-b border-clay/10 pb-4">
                <h2 className="text-lg font-serif text-rice-paper flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-clay" /> Default Address
                </h2>
                <p className="text-stone-warm/50 text-xs mt-1">Optional — pre-fill your checkout address.</p>
              </div>

              {/* Street */}
              <div>
                <label className={labelClass}>Street / House No.</label>
                <div className="relative">
                  <Home className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-warm/50" />
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. 42, Pottery Lane"
                  />
                </div>
              </div>

              {/* Apartment */}
              <div>
                <label className={labelClass}>Apartment / Floor / Landmark <span className="text-stone-warm/40 font-normal normal-case tracking-normal">(optional)</span></label>
                <input
                  type="text"
                  value={address.apartment}
                  onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                  className={inputClassNoIcon}
                  placeholder="e.g. Flat 2B, Near City Mall"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className={inputClassNoIcon}
                    placeholder="e.g. Mumbai"
                  />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className={inputClassNoIcon}
                    placeholder="e.g. Maharashtra"
                  />
                </div>
              </div>

              {/* Pincode & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>PIN Code</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className={inputClassNoIcon}
                    placeholder="e.g. 400001"
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <div className="relative">
                    <Globe className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-warm/50" />
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className={inputClass}
                      placeholder="India"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/profile"
              className="px-6 py-3 border border-clay/35 hover:border-clay text-clay hover:text-rice-paper rounded-lg transition-all duration-150 text-sm font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-clay hover:bg-clay/90 text-charcoal font-bold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
