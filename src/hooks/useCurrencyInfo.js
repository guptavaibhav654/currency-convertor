import { useState, useEffect } from 'react';

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!currency) return;
        
        setLoading(true)
        setError(null)
        
        fetch(`https://v6.exchangerate-api.com/v6/f18090bb049614a34a5bbb57/latest/${currency}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch currency data')
                }
                return res.json()
            })
            .then(data => {
                if (data && data.conversion_rates) {
                    setData(data.conversion_rates)
                } else {
                    throw new Error('Invalid data format')
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Currency API Error:', err)
                setError(err.message)
                setData({})
                setLoading(false)
            })
    }, [currency])
    
    return { data, loading, error }
}

export default useCurrencyInfo;
