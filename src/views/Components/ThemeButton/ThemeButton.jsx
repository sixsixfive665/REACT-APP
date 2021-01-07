import React from 'react';
import './ThemeButton.scss'

const ThemeButton = (props) => {
  return (
    <button
      className={props.className ?
        (props.disabled ? props.className + ' theme_btn theme_btn_disabled' :
          props.className + ' theme_btn') : (props.disabled ? 'theme_btn theme_btn_disabled' : 'theme_btn')}
      style={{ ...props.style }}
      onClick={props.onClick}
      disabled={props.disabled ? 'disabled' : ''}
    >
      {props.children}
    </button>
  );
};

export default ThemeButton;