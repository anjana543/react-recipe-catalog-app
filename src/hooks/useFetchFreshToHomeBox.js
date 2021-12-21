import { useState, useEffect } from 'react';
import FreshToHome from '../data/FreshToHome';

const useFetchFreshToHomeBox = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(FreshToHome);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  return { data, loading };
};

export default useFetchFreshToHomeBox;
