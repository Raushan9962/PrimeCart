import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/data/products';
import { Frown } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      setResults(searchProducts(query));
    }
  }, [query]);

  return (
    <>
      <Helmet>
        <title>{`Search results for "${query}" - PrimeCart`}</title>
        <meta name="description" content={`Find products matching "${query}" at PrimeCart.`} />
      </Helmet>

      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
            <p className="text-lg text-gray-600">
              {results.length > 0
                ? `Showing ${results.length} results for `
                : `No results found for `}
              <span className="font-semibold text-purple-600">"{query}"</span>
            </p>
          </motion.div>

          {results.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {results.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Frown className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">We couldn't find any matches.</h2>
              <p className="text-gray-600">Try checking your spelling or using more general terms.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;