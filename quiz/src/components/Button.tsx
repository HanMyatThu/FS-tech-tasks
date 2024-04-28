import React from 'react';
import { Button } from 'react-native';

interface ButtonProps {
  id?: string,
  title: string,
  color: string,
  onClick: () => void,
  disabled?: boolean,
  label?: string
}

const CustomButton: React.FC<ButtonProps> = ({
  id,
  title,
  color,
  label,
  onClick,
  disabled,
  ...props
}) => {
  return (
    <Button
      testID={id}
      onPress={onClick}
      title={title}
      color={color}
      accessibilityLabel={label}
      disabled={disabled}
      {...props}
    />
  )
}

export {
  CustomButton
}