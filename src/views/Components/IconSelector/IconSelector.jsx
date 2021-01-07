import React from 'react';
import MyIcon from 'views/Components/MyIcon/MyIcon'
import iconsList from './index'
import './IconSelector.scss'

const IconSelector = () => {
  function logIcon(icon) {
    console.log(icon)
  }
  return (
    <div id="icon_scroll" className="icon_selector">
      {iconsList.icons.map((icon, index) => {
        return (
          <span key={index} className="icon_container" onClick={() => {
            logIcon(icon)
          }}>
            <MyIcon icon={icon.icon} style={{ fontSize: '30px', marginTop: '5px' }} />
          </span>
        )
      })}
    </div>
  );
};

export default IconSelector;