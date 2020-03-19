import { dataLayer, defaultMapStyle } from '../demos/map-gl/map-style.js';

import { Component } from 'react';
import MapGL from 'react-map-gl';
import { fromJS } from 'immutable';
import { updatePercentiles } from '../demos/map-gl/utils';

class GeoJson extends Component {
  state = {
    mapStyle: defaultMapStyle,
    year: 2015,
    data: null,
    hoveredFeature: null,
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };

  componentDidMount() {
    const requestJson = require('d3-fetch').json;
    requestJson('/static/us-income.geojson').then(response => {
      if (response) this._loadData(response);
    });
  }

  _loadData = data => {
    updatePercentiles(data, f => f.properties.income[this.state.year]);

    const mapStyle = defaultMapStyle
      .setIn(['sources', 'incomeByState'], fromJS({ type: 'geojson', data }))
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    this.setState({ data, mapStyle });
  };

  _onViewportChange = viewport => this.setState({ viewport });

  _onHover = event => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;
    const hoveredFeature =
      features && features.find(f => f.layer.id === 'data');

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  };

  _renderTooltip() {
    const { hoveredFeature, year, x, y } = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" css={` left: ${x}, top: ${y} `}>
          <div>State: {hoveredFeature.properties.name}</div>
          <div>Median Household Income: {hoveredFeature.properties.value}</div>
          <div>
            Percentile: {(hoveredFeature.properties.percentile / 8) * 100}
          </div>
        </div>
      )
    );
  }

  render() {
    const { viewport, mapStyle } = this.state;

    return (
      <>
        <div className="full-workspace">
          <MapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle={mapStyle}
            onViewportChange={this._onViewportChange}
            mapboxApiAccessToken={process.env.mapBoxApi}
            onHover={this._onHover}
          >
            {this._renderTooltip()}
          </MapGL>
        </div>
      </>
    );
  }
}

export default GeoJson;
