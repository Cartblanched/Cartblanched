import React from 'react';

class GoogleAd extends React.Component {

  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    return (
      <div className='ad'>
        <ins className='adsbygoogle adslot_1'
          style={{ display: "inline-block" }}
          data-ad-client='ca-pub-7292810486004926'
          data-ad-slot='7806394673'
        />
      </div>
    );
  }
}

export default GoogleAd;