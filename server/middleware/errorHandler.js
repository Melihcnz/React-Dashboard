import { useState, useEffect } from 'react';
import React, { createContext, useState, useContext } from 'react';

const cache = new Map();

export const useCache = (key, fetchFn) => {
  const [data, setData] = useState(cache.get(key));

  const fetchData = async () => {
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await fetchFn();
    cache.set(key, result);
    setData(result);
    return result;
  };

  return { data, fetchData };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    hata: true,
    mesaj: err.message || 'Sunucu hatası oluştu',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

module.exports = errorHandler; 