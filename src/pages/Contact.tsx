import { useState } from 'react';
import { motion } from 'framer-motion';
import TerminalInput from '../components/Contact/TerminalInput';
import TerminalOutput from '../components/Contact/TerminalOutput';
import { useSound } from '../hooks/useSound';
import { FormState, FormStatus } from '../types/form';
import SubmitButton from '../components/Contact/SubmitButton';
import PageTransition from '../components/UI/PageTransition';

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function Contact() {
  const { playSound } = useSound();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormState> = {};
    
    if (!formState.name) newErrors.name = 'Agent name is required';
    if (!formState.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formState.email)) newErrors.email = 'Invalid email format';
    if (!formState.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    if (!validateForm()) {
      playSound('error');
      setStatus({
        type: 'error',
        messages: [
          'ERROR: Invalid form data',
          'Please correct the highlighted fields.',
        ],
      });
      return;
    }

    setIsSubmitting(true);
    playSound('transition');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      playSound('success');
      setStatus({
        type: 'success',
        messages: [
          'Message transmitted successfully!',
          'Expect a response within 48 hours.',
          'Thank you for contacting HQ.',
        ],
      });

      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      playSound('error');
      setStatus({
        type: 'error',
        messages: [
          'ERROR: Transmission failed',
          'Please try again later.',
        ],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.h1
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="text-4xl md:text-6xl font-orbitron mb-8 text-neon-blue"
          >
            Contact HQ
          </motion.h1>

          <div className="space-y-6">
            <TerminalInput
              label="AGENT_NAME"
              value={formState.name}
              onChange={(value) => {
                setFormState({ ...formState, name: value });
                setErrors({ ...errors, name: undefined });
              }}
              required
              error={errors.name}
            />

            <TerminalInput
              label="AGENT_EMAIL"
              value={formState.email}
              onChange={(value) => {
                setFormState({ ...formState, email: value });
                setErrors({ ...errors, email: undefined });
              }}
              type="email"
              required
              error={errors.email}
            />

            <TerminalInput
              label="MISSION_SUBJECT"
              value={formState.subject}
              onChange={(value) => setFormState({ ...formState, subject: value })}
            />

            <TerminalInput
              label="MESSAGE"
              value={formState.message}
              onChange={(value) => {
                setFormState({ ...formState, message: value });
                setErrors({ ...errors, message: undefined });
              }}
              multiline
              required
              error={errors.message}
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
            />

            {status && (
              <TerminalOutput
                messages={status.messages}
                type={status.type}
              />
            )}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
} 
