import React, { Component } from 'react';
import Countries from 'countries-api';
import Pagination from './Pagination';
import CountryCard from './CountryCard';

class App extends Component {
  state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null };

  async componentDidMount() {
    try {
      const { data: allCountries = [] } = await Countries.findAll();
      console.log(allCountries); // Verifique os dados aqui
      this.setState({ allCountries });
    } catch (error) {
      console.error("Erro ao carregar os países:", error);
    }
  }

  onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  }

  render() {
    const { allCountries, currentCountries, currentPage, totalPages } = this.state;
    const totalCountries = allCountries.length;
  
    if (totalCountries === 0) return null;
  
    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <h2 className="text-dark py-2 pr-4 m-0">
              <strong className="text-secondary">{totalCountries}</strong> Countries
            </h2>
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
            </span>
          </div>
  
          <div className="d-flex flex-row py-4 align-items-center">
            <Pagination 
              totalRecords={totalCountries} 
              pageLimit={18} 
              onPageChanged={this.onPageChanged} 
            />
          </div>
  
          {currentCountries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      </div>
    );
  }
  
}

export default App;
