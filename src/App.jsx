import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OnboardingLayout from './components/OnboardingLayout';
import { StepWelcome, StepPhone, StepOTP, StepStoreDetails, StepLocation, StepSuccess } from './components/Steps';

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    phone: '',
    otp: '',
    storeName: '',
    category: '',
    city: '',
    pincode: ''
  });

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const steps = [
    <StepWelcome onNext={nextStep} />,
    <StepPhone onNext={nextStep} data={data} updateData={updateData} />,
    <StepOTP onNext={nextStep} onBack={prevStep} data={data} updateData={updateData} />,
    <StepStoreDetails onNext={nextStep} data={data} updateData={updateData} />,
    <StepLocation onNext={nextStep} data={data} updateData={updateData} />,
    <StepSuccess />
  ];

  return (
    <OnboardingLayout step={step} totalSteps={steps.length}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </OnboardingLayout>
  );
}

export default App;
