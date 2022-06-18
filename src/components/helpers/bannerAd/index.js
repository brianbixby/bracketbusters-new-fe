import React from 'react';

function BannerAd() {
  return (
    <div
      className="bbBannerAd"
      onClick={() => window.open('https://www.builtbybixby.us', '_blank')}
    >
      <p>
        <span className="company">BUILT BY BIXBY</span>
        <span className="tagLine">WEBSITES MATTER.</span>
      </p>
    </div>
  );
}

export default BannerAd;
