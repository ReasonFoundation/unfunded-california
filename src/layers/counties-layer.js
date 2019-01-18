/* globals google */
import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap
} from 'react-google-maps-api'

const CountiesLayerPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired,
  json: PropTypes.string.isRequired,
  changeState: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired
}

const center = {
  lat: 38.005470223177466,
  lng: -118.76220703125
}

const options = {
  gestureHandling: 'none',
  zoomControl: false,
  mapTypeId: 'roadmap',
  mapTypeControl: false,
  scaleControl: false,
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  streetViewControl: false
}

const hoverStyle = {
  strokeColor: '#2a2a2a',
  strokeWeight: 2,
  zIndex: 2
}

const colors = [
  '#FF0000',
  '#FFFF00',
  '#00FF00'
]

const infoBoxStyle = {
  position: 'absolute',
  top: '2rem',
  right: '4rem',
  background: '#FFF',
  padding: '2rem'
}

// Add Thousand Separators to Numbers
// function numberWithCommas (x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// }

// returns a color based on the value given when the function is called
function getColor (opeb) {
  return opeb >= 10000 ? colors[0]
    : opeb > 2000 ? colors[1]
      : colors[2]
}

const CountiesLayer = ({ styles, json, changeState, state }) => (
  <div>
    <GoogleMap
      id='data-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      options={options}
      zoom={6}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args[0].latLng.lat(), ' : ', args[0].latLng.lng())
      }}
      onLoad={(map) => {
        // console.log('map.data: ', map.data)

        map.data.loadGeoJson(json)

        // Set a blank infoWindow to be used for each to state on click
        const stateInfoWindow = new google.maps.InfoWindow({
          content: ''
        })

        // Set and apply styling to the stateLayer
        map.data.setStyle((feature) => ({
          // call function to get color for state based on opeb_liability_per_pupil
          fillColor: getColor(feature.getProperty('opeb_liability_per_pupil')),
          fillOpacity: 0.3,
          strokeColor: '#b3b3b3',
          strokeWeight: 0.3,
          zIndex: 1
        }))

        // Add mouseover and mouse out styling for the GeoJSON State data
        map.data.addListener('mouseover', (e) => {
          map.data.overrideStyle(e.feature, hoverStyle)

          console.log(e)

          stateInfoWindow.setContent(
            '<div style="line-height:1.08;overflow:hidden;white-space:nowrap;">' +
            e.feature.getProperty('name') +
            '<br> Unfunded OPEB Per Pupil: $' +
            // numberWithCommas(e.feature.getProperty('opeb_liability_per_pupil')) +
            '</div>'
          )

          var anchor = new google.maps.MVCObject()

          anchor.set('position', e.latLng)

          stateInfoWindow.open(map, anchor)
        })

        map.data.addListener('mouseout', (e) => {
          map.data.revertStyle()
        })

        // Adds an info window on click with in a state that includes the state name and COLI
        map.data.addListener('click', (e) => {
          console.log(e)

          stateInfoWindow.setContent(
            '<div style="line-height:1.08;overflow:hidden;white-space:nowrap;">' +
            e.feature.getProperty('name') +
            '<br> Unfunded OPEB Per Pupil: $' +
            // numberWithCommas(e.feature.getProperty('opeb_liability_per_pupil')) +
            '</div>'
          )

          var anchor = new google.maps.MVCObject()

          anchor.set('position', e.latLng)

          stateInfoWindow.open(map, anchor)
        })

        // Final step here sets the stateLayer GeoJSON data onto the map
        map.data.setMap(map)
      }}
    />

    <div style={infoBoxStyle}>
      <div>
        <input
          type='checkbox'
          id='districts'
          onChange={() => { changeState('districts') }}
          checked={state === 'districts'}
        />

        <label htmlFor='districts'>School District</label>
      </div>

      <div>
        <input
          type='checkbox'
          id='counties'
          onChange={() => { changeState('counties') }}
          checked={state === 'counties'}
        />

        <label htmlFor='counties'>Counties</label>
      </div>

      <div>
        <input
          type='checkbox'
          id='cities'
          onChange={() => { changeState('cities') }}
          checked={state === 'cities'}
        />

        <label htmlFor='cities'>Cities</label>
      </div>
    </div>
  </div>
)

CountiesLayer.propTypes = CountiesLayerPropTypes

export default CountiesLayer
