import { useState, useEffect } from 'react'
import axios from 'axios'
// const axios = require('axios');

const useFetch = ({ query }) => {
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: { query },
        headers: {
            'X-RapidAPI-Key': '10e3654c5fmsh191df69c32527b8p1d57e1jsne223abaf709a',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setDatas(response.data.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { datas, isLoading, error, refetch };

}

export default useFetch;
