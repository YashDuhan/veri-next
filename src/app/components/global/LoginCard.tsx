import React from 'react';
import { SignIn } from '@clerk/nextjs';

interface LoginCardProps {
  onClose: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onClose }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <SignIn fallbackRedirectUrl="/Home" />
    </div>
  );
};

export default LoginCard; 