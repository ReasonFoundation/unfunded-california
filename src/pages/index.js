// eslint-disable-next-line filenames/match-exported
import React, { Component } from 'react'
import Layout from '../components/layout'
import indexStyles from './index.module.css'
import uuid from 'uuidv4'

import { isBrowser } from '../utils/isbrowser'

import { LoadScript } from 'react-google-maps-api'

import DistrictsLayer from '../layers/districts-layer'
import CitiesLayer from '../layers/cities-layer'
import CountiesLayer from '../layers/counties-layer'

const mapBoxStyle = {
  marginTop: '2rem',
  marginBottom: '3rem'
}

// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
const loadingStyle = {
  height: `100%`,
  backgroundColor: '#023456'
}

const mapContainerStyle = {
  height: `500px`,
  width: `650px`
}

const shapeExampleStyles = {
  container: mapContainerStyle,
  mapContainer: indexStyles.mapContainer
}

const Loading = (
  <div style={loadingStyle} />
)

const googleMapsLibraries = [
  'drawing',
  'visualization'
]

const loaderId = uuid()

const googleMapsApiKey = 'AIzaSyCfCz47g4CQp53WR0Mv1vdtrBOyCgSqCaE'

class IndexPage extends Component {
  state = {
    language: 'en',
    state: 'districts'
  }

  changeState = state => {
    this.setState(
      () => ({
        state
      })
    )
  }

  render = () =>
    isBrowser
      ? (
        <Layout>
          <div style={mapBoxStyle}>
            <LoadScript
              id={loaderId}
              googleMapsApiKey={googleMapsApiKey}
              language={this.state.language}
              region={'EN'}
              version={'weekly'}
              onLoad={
                () => console.log('script loaded')
              }
              loadingElement={Loading}
              libraries={googleMapsLibraries}
              preventGoogleFontsLoading
            >
              {
                this.state.state === 'districts'
                  ? (
                    <DistrictsLayer
                      changeState={this.changeState}
                      state={this.state.state}
                      json='/ca_school_districts_opeb.json'
                      styles={shapeExampleStyles}
                    />
                  ) : null
              }

              {
                this.state.state === 'counties'
                  ? (
                    <CountiesLayer
                      changeState={this.changeState}
                      state={this.state.state}
                      json='/ca_counties_opeb.json'
                      styles={shapeExampleStyles}
                    />
                  )
                  : null
              }

              {
                this.state.state === 'cities'
                  ? (
                    <CitiesLayer
                      changeState={this.changeState}
                      state={this.state.state}
                      json='/ca_cities_opeb.json'
                      styles={shapeExampleStyles}
                    />
                  )
                  : null
              }
            </LoadScript>
          </div>
        </Layout>
      )
      : null
}

export default IndexPage
