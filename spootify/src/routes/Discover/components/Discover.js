import React, { Component } from 'react';
import getToken from '../helpers/getToken';
import makeRequest from '../helpers/makeRequest';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentDidMount() {
    const token = await getToken();
    
    Promise.all([ 
      this.getNewReleases(token), 
      this.getPlaylists(token), 
      this.getCategories(token)
    ]);
  }

  async getNewReleases(token) {
    const { albums: { items: newReleases }} = await makeRequest('new-releases', token);
    this.setState({ newReleases: newReleases });
  }

  async getPlaylists(token) {
    const { playlists: { items: playlists }} = await makeRequest('featured-playlists', token);
    this.setState({ playlists: playlists });
  }

  async getCategories(token) {
    const { categories: { items: categories }} = await makeRequest('categories', token);
    this.setState({ categories: categories });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
