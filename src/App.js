//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';


//        -        -        -        L O C A L   I M P O R T S        -        -        -
import "./styles.css";
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Characters from './components/pages/searcher/Characters';
import CharacterInfo from './components/pages/searcher/CharacterInfo';
import CharacterForm from './components/pages/searcher/CharacterForm';
import CharacterLoading from './components/pages/searcher/CharacterLoading';

//        -        -        -        C L A S S   A P P        -        -        -
export default class App extends React.Component {
     constructor ( props ) {
          super( props );
          this.state = {
               characters: {
                    leading: false,
                    error: false,
                    data: []
               }
          };
     }; // end of constructor

     getCharacters = str => {
          this.setState( {
               ...this.state,
               characters: {
                    ...this.state.characters,
                    loading: true
               }
          } );
          axios
               .get( `https://www.moogleapi.com/api/v1/characters/search?origin=${ str }` )
               .then( results => {
                    // console.log( results.data );
                    this.setState( {
                         ...this.state,
                         characters: {
                              loading: false,
                              data: [ ...results.data ]
                         }
                    } );
               } )
               .catch( error => {
                    console.log( error )
               } );
     }; // end of getCharacters

     render () {
          return (
               // <p onClick={ this.getCharacters }>Click me</p>
               <Layout>
                    <Switch>
                         <Route
                              exact path="/"
                              component={ Home }
                         />

                         <Route
                              path="/about"
                              component={ About }
                         />

                         <Route
                              exact path="/finalfantasy"
                              render={ () => (
                                   <>
                                        <h2>Write the game's number in numerals</h2>
                                        <CharacterForm getCharacters={ this.getCharacters } />
                                        { this.state.characters.loading && <CharacterLoading /> }
                                        { this.state.characters.data.length !== 0 && (
                                             <Characters characters={ this.state.characters.data } />
                                        ) }
                                   </>
                              ) }
                         />
                         <Route
                              path="/character/:name/:origin/:id"
                              component={ CharacterInfo }
                         />
                    </Switch>
               </Layout>
          ); // end of return
     }; //end of render
}; // end of App class