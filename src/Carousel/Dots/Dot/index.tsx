import React from 'react';

export interface IDotProps {
  active: boolean;
  index: number;
  handleClick?: (index: number) => void;
  activeColor?: string;
  defaultColor?: string;
}

const Dot: React.FC<IDotProps> = ({
  active,
  index,
  handleClick,
  activeColor,
  defaultColor,
}: IDotProps) => {
  return (
    <span
      onClick={() => (handleClick ? handleClick(index) : null)}
      style={{
        background: active ? activeColor || 'red' : defaultColor || 'white',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
      }}
    />
  );
};
export default Dot;
