import React from 'react';
import { motion } from 'framer-motion';

const OnboardingLayout = ({ children, step, totalSteps }) => {
    const progress = ((step + 1) / totalSteps) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-blue-50 p-4 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-200/30 rounded-full blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative z-10 border border-white/50"
            >
                {/* Progress Bar (Only show if not first or last step ideally, but keeping simple for now) */}
                {step > 0 && step < totalSteps - 1 && (
                    <div className="h-1.5 w-full bg-slate-100">
                        <motion.div
                            className="h-full bg-brand-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                )}

                <div className="p-8">
                    {children}
                </div>
            </motion.div>

            {/* Footer Branding */}
            <div className="absolute bottom-6 text-slate-400 text-sm font-medium">
                Powered by Modulus Sell
            </div>
        </div>
    );
};

export default OnboardingLayout;
