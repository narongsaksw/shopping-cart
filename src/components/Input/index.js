import React, { useState } from 'react';
import { StyledInput } from './style';
import * as AiIcons from 'react-icons/ai';

// const Input = ({ children, ...props }) => (
//   <StyledInput {...props}>{children}</StyledInput>
// );

const Input = React.forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const togglePassword = () => {
    if (props.type === 'password' && isActive) {
      document.getElementById('password').setAttribute('type', 'password');
      setIsActive(false);
    } else {
      document.getElementById('password').setAttribute('type', 'text');
      setIsActive(true);
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      {props.type === 'password' &&
        (isActive ? (
          <AiIcons.AiOutlineEye
            style={{ position: 'absolute', top: '35%', right: 15 }}
            onClick={togglePassword}
          />
        ) : (
          <AiIcons.AiOutlineEyeInvisible
            style={{ position: 'absolute', top: '35%', right: 15 }}
            onClick={togglePassword}
          />
        ))}
      <StyledInput ref={ref} {...props}>
        {props.children}
      </StyledInput>
    </div>
  );
});
export default Input;
