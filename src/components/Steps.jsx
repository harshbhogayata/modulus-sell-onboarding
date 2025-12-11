import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Store, Smartphone, ShieldCheck, MapPin, ShoppingBag, Utensils, Laptop, Shirt, Home, MoreHorizontal } from 'lucide-react';

// --- Reusable UI Components ---

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
    const baseStyle = "w-full py-3.5 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";
    const variants = {
        primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed",
        outline: "border-2 border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-600 bg-transparent",
        ghost: "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
};

const Input = ({ label, value, onChange, placeholder, type = "text", icon: Icon, autoFocus = false }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">{label}</label>}
        <div className="relative group">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium placeholder:text-slate-400 ${Icon ? 'pl-11' : ''}`}
            />
        </div>
    </div>
);

// --- Steps ---

export const StepWelcome = ({ onNext }) => (
    <div className="text-center space-y-8 py-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-brand-100 rounded-3xl mx-auto flex items-center justify-center text-brand-600 shadow-inner"
        >
            <Store size={48} strokeWidth={1.5} />
        </motion.div>
        <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Modulus Sell</h1>
            <p className="text-slate-500 text-lg leading-relaxed">Everything you need to manage your store, billing, and inventory in one place.</p>
        </div>
        <div className="pt-4">
            <Button onClick={onNext}>Get Started <ArrowRight size={20} /></Button>
            <p className="text-xs text-slate-400 mt-4">Takes less than 2 minutes</p>
        </div>
    </div>
);

export const StepPhone = ({ onNext, data, updateData }) => (
    <div className="py-2">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">What's your number?</h2>
            <p className="text-slate-500">We'll text you a code to verify your account.</p>
        </div>

        <Input
            type="tel"
            placeholder="Enter mobile number"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            icon={Smartphone}
            autoFocus
            label="Mobile Number"
        />

        <div className="mt-8">
            <Button onClick={onNext} disabled={data.phone.length < 10}>
                Send Code <ArrowRight size={20} />
            </Button>
        </div>
    </div>
);

export const StepOTP = ({ onNext, onBack, data, updateData }) => (
    <div className="py-2">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify it's you</h2>
            <p className="text-slate-500">Enter the 4-digit code sent to <span className="font-semibold text-slate-900">{data.phone}</span></p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
            {[0, 1, 2, 3].map((i) => (
                <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-14 h-16 text-center text-2xl font-bold rounded-2xl border-2 border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all caret-brand-500"
                    value={data.otp?.[i] || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = data.otp ? data.otp.split('') : ['', '', '', ''];
                        newOtp[i] = val;
                        updateData({ otp: newOtp.join('') });
                        if (val && e.target.nextElementSibling) e.target.nextElementSibling.focus();
                    }}
                />
            ))}
        </div>

        <div className="space-y-4">
            <Button onClick={onNext} disabled={!data.otp || data.otp.length < 4}>Verify & Continue</Button>
            <Button variant="ghost" onClick={onBack} className="text-sm">Wrong number?</Button>
        </div>
    </div>
);

export const StepStoreDetails = ({ onNext, data, updateData }) => {
    const categories = [
        { id: 'grocery', name: 'Grocery', icon: ShoppingBag },
        { id: 'restaurant', name: 'Food', icon: Utensils },
        { id: 'electronics', name: 'Electronics', icon: Laptop },
        { id: 'fashion', name: 'Fashion', icon: Shirt },
        { id: 'home', name: 'Decor', icon: Home },
        { id: 'other', name: 'Other', icon: MoreHorizontal },
    ];

    return (
        <div className="py-2">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about your store</h2>
                <p className="text-slate-500">This helps us customize your experience.</p>
            </div>

            <Input
                label="Store Name"
                placeholder="e.g. Gupta General Store"
                value={data.storeName}
                onChange={(e) => updateData({ storeName: e.target.value })}
                icon={Store}
                autoFocus
            />

            <div className="mb-2 ml-1">
                <label className="text-sm font-medium text-slate-700">Business Category</label>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-8">
                {categories.map((cat) => {
                    const isSelected = data.category === cat.id;
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => updateData({ category: cat.id })}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 ${isSelected ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500' : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                            <Icon size={24} className={isSelected ? 'text-brand-600' : 'text-slate-400'} />
                            <span className="text-xs font-medium">{cat.name}</span>
                        </button>
                    )
                })}
            </div>

            <Button onClick={onNext} disabled={!data.storeName || !data.category}>Continue</Button>
        </div>
    );
}

export const StepLocation = ({ onNext, data, updateData }) => (
    <div className="py-2">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Where are you located?</h2>
            <p className="text-slate-500">Customers in your area will act on this.</p>
        </div>

        <div className="space-y-4 mb-8">
            <button
                className="w-full py-4 px-4 bg-blue-50 text-blue-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                onClick={() => {
                    // Mock geolocation
                    updateData({ city: 'Mumbai', pincode: '400001' });
                }}
            >
                <MapPin size={20} /> Use Current Location
            </button>

            <div className="relative flex items-center gap-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-slate-400 text-sm">OR</span>
                <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <Input
                label="City"
                placeholder="e.g. Mumbai"
                value={data.city}
                onChange={(e) => updateData({ city: e.target.value })}
            />
            <Input
                label="Pincode"
                placeholder="e.g. 400001"
                value={data.pincode}
                onChange={(e) => updateData({ pincode: e.target.value })}
            />
        </div>

        <Button onClick={onNext} disabled={!data.city || !data.pincode}>Complete Setup</Button>
    </div>
);


export const StepSuccess = () => (
    <div className="text-center py-8">
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 mb-6"
        >
            <Check size={48} strokeWidth={3} />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">You're all set!</h2>
        <p className="text-slate-500 text-lg mb-8">Your store is now online. Let's make your first sale.</p>

        <Button className="bg-slate-900 hover:bg-black shadow-slate-900/20 text-white">Go to Dashboard <ArrowRight size={20} /></Button>
    </div>
)
