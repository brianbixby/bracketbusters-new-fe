import React from 'react';
import kd from './../assets/2.png';
import steph from './../assets/1.png';

function Slider(props) {
  let { joinedItem, formType } = props;

  let itemImage =
    formType === 'league' ? (
      <img className="cardImage" src={kd} alt="Kevin Durant" />
    ) : (
      <img className="cardImage" src={steph} alt="Steph Curry" />
    );
  let itemName =
    formType === 'league' ? joinedItem.leagueName : joinedItem.groupName;
  let itemImageRender = joinedItem.image ? (
    <img className="cardImage" src={joinedItem.image} alt="placeholder" />
  ) : (
    itemImage
  );
  return (
    <div className="cardItem">
      <div className="cardContentWrapper">
        <div className="cardContentBorderTop"></div>
        <div className="cardContentDiv">
          <p className="joinTextTitle">{itemName}</p>
          <p className="joinTextSubtitle">{joinedItem.motto}</p>
        </div>
      </div>
      <div className="cardImageDiv">{itemImageRender}</div>
    </div>
  );
}

export default Slider;
