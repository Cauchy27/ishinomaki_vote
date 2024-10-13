// components/VoteButton.tsx
import React from 'react';
import { Button } from '@mui/material';

interface VoteButtonProps {
  color: 'babyPink' | 'lightBlue';
  label: string;
  onVote: () => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ color, label, onVote }) => {
  const bgColor = color === 'babyPink' ? '#FFC0CB' : '#ADD8E6';
  const hoverColor = color === 'babyPink' ? '#ffb6c1' : '#87cefa';

  return (
    <Button
      variant="contained"
      onClick={onVote}
      fullWidth
      className="py-4 text-lg font-semibold"
      sx={{
        backgroundColor: bgColor,
        color: '#fff',
        '&:hover': {
          backgroundColor: hoverColor,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default VoteButton;
