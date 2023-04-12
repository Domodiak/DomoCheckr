import axios from 'axios'
import config from '../config'
import { useState, useEffect } from 'react';

export function useAuth() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ auth, setAuth ] = useState(false)
    useEffect(() => {
        const fetchData = () => {
            axios.get(config.ApiHost + 'api/auth/check/')
                .then(response => {
                    if(response.status == 200) {
                        setAuth(true)
                    }
                    setIsLoading(false)
                })
                .catch(error => {
                    setIsLoading(false)
            })
        }
        fetchData()
    }, [ axios, config.ApiHost ])
    return [ auth, isLoading ]
}