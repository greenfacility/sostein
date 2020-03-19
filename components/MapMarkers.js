import MapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';

import CITIES from '../demos/mock/cities.json';
import CityInfo from '../demos/map-gl/city-info';
import CityPin from '../demos/map-gl/city-pin';
import { Component } from 'react';

class MapMarkers extends Component {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.5,
      bearing: 0,
      pitch: 0
    },
    popupInfo: null
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderCityMarker = (city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
    >
      <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} />
    </Marker>
  );

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;

    return (
      <div className="full-workspace">
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={process.env.mapBoxApi}
        >
          {CITIES.map(this._renderCityMarker)}
          {this._renderPopup()}
          <NavigationControl onViewportChange={this._updateViewport} />
        </MapGL>
      </div>
    );
  }
}

export default MapMarkers;
