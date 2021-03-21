import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

const FinalStep = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // hook countries api
    useEffect(() => {
        const getCountries = async () => {
            try {
                setIsLoading(true);
                const result = await csc.getAllCountries();
                let allCountries = [];
                allCountries = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name,
                }));
                // set first index of all countries in first country
                // if there is none, set empty object
                const [{ isoCode: firstCountry } = {}] = allCountries;
                setCountries(allCountries);
                setSelectedCountry(firstCountry);
                setIsLoading(false);
            } catch (err) {
                setCountries([]);
                setIsLoading(false);
            }
        };

        getCountries();
    }, []);

    // hook states api
    useEffect(() => {
        const getStates = async () => {
            try {
                const result = await csc.getStatesOfCountry(selectedCountry);
                let allStates = [];
                allStates = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name,
                }));
                // set first index of all countries in first country
                // if there is none, set empty object
                const [{ isoCode: firstState = '' } = {}] = allStates;
                setCities([]);
                setSelectedCity('');
                setStates(allStates);
                setSelectedState(firstState);
            } catch (err) {
                setStates([]);
                setCities([]);
                setSelectedCity('');
            }
        };

        getStates();
    }, [selectedCountry]);

    // hook cities api
    useEffect(() => {
        const getCities = async () => {
            try {
                const result = await csc.getCitiesOfState(
                    selectedCountry,
                    selectedState,
                );
                let allCities = [];
                allCities = result?.map(({ name }) => ({
                    name,
                }));
                // set first index of all countries in first country
                // if there is none, set empty object
                const [{ name: firstCity = '' } = {}] = allCities;
                setCities(allCities);
                setSelectedCity(firstCity);
            } catch (err) {
                setCities([]);
            }
        };

        getCities();
    }, [selectedState]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <Form className='input-form' onSubmit={handleSubmit}>
            <div className='col-md-6 offset-md-3'>
                <Form.Group controlId='country'>
                    {isLoading && (
                        <p className='loading'>
                            Loading countries, Please wait ...
                        </p>
                    )}
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        as='select'
                        name='country'
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}>
                        {countries.map(({ isoCode, name }) => (
                            <option value={isoCode} key={isoCode}>
                                {name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        as='select'
                        name='state'
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}>
                        {states.length > 0 ? (
                            states.map(({ isoCode, name }) => (
                                <option value={isoCode} key={isoCode}>
                                    {name}
                                </option>
                            ))
                        ) : (
                            <option value='' key=''>
                                No State Found
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        as='select'
                        name='city'
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}>
                        {cities.length > 0 ? (
                            cities.map(({ name }) => (
                                <option value={name} key={name}>
                                    {name}
                                </option>
                            ))
                        ) : (
                            <option value='' key=''>
                                No City Found
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Register
                </Button>
            </div>
        </Form>
    );
};

export default FinalStep;
