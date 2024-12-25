import React from "react";
import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { getTopSellers } from "../../api/topSellers";
import SellerSkeleton from "../UI/SellerSkeleton";


function TopSellers() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const options = useMemo(() => ({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 2 },
      992: { items: 4 }
    }
  }), []);

useEffect(() => {
  const fetchCollections = async () => {
    console.log('Fetching started');
    try {
      const data = await getTopSellers();
      console.log('Data received:', data);
      setCollections(data);
    } catch (error) {
      console.error('Fetch error:', error); 
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  fetchCollections();
}, []);

console.log('Current state:', { loading, collections });

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading && collections.length > 0 && (
            <div className="col-md-12">
              <ol className="author_list">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <div className="author_list_pp">
                    <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={collection.authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                    <Link to={`/author/${collection.authorId}`}>{collection.authorName}</Link>
                      <span>{collection.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {loading && (
            <div className="d-flex flex-wrap">
              {Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={`skeleton-${index}`}>
                  <SellerSkeleton />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default TopSellers;
