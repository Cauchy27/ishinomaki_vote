// components/InputField.tsx
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#FFC0CB', // フォーカス時のラベルカラー（ベビーピンク）
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ADD8E6', // フォーカス時のアンダーラインカラー（ライトブルー）
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFC0CB', // 通常時のアウトラインカラー（ベビーピンク）
    },
    '&:hover fieldset': {
      borderColor: '#ADD8E6', // ホバー時のアウトラインカラー（ライトブルー）
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFC0CB', // フォーカス時のアウトラインカラー（ベビーピンク）
    },
  },
});

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text', value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <CustomTextField
      label={label}
      placeholder={placeholder}
      type={type === 'password' && showPassword ? 'text' : type}
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        marginTop: '1rem',
        '& .MuiInputBase-input': {
          fontSize: '1rem',
          padding: '12px 14px',
        },
        '& .MuiInputLabel-root': {
          fontSize: '1rem',
        },
      }}
    />
  );
};

export default InputField;
