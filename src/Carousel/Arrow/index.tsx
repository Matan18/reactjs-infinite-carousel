import React from 'react';

interface IArrowProps {
  direction: 'right' | 'left';
  handleClick: () => void;
}

const Arrow: React.FC<IArrowProps> = ({
  direction,
  handleClick,
}: IArrowProps) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        ...arrowContainer,
        right: `${direction === 'right' ? '0px' : 'none'}`,
        left: `${direction === 'left' ? '0px' : 'none'}`,
      }}
    >
      {direction === 'right' ? (
        <img
          src="/chevronRight.svg"
          alt="ChevronRight"
          width={40}
          height={40}
        />
      ) : (
        <img src="/chevronLeft.svg" alt="ChevronLeft" width={40} height={40} />
      )}
    </button>
  );
};

export default Arrow;

const arrowContainer: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0',
  width: '10%',
  height: '100%',
  backgroundColor: '#c9c9c9',
  border: '0px',
};
