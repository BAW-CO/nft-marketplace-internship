import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { getExplore } from "../../api/explore";
import Countdown from "../../api/countDown";
import { useState, useEffect } from 'react';
import NewSkeleton from "../UI/NewSkeleton";

function ExploreItems() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const displayedItems = collections.slice(0, visibleItems);
  const loadMore = () => {
    setVisibleItems(prev => prev + 4);
  };
  const [sortBy, setSortBy] = useState(''); 

  const handleSort = async (value) => { 
    setSortBy(value);
    const data = await getExplore(value);
    setCollections(data);
  };
  


useEffect(() => {
  const fetchCollections = async () => {
    console.log('Fetching started');
    try {
      const data = await getExplore();
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
    <>
      <div className="filter-by">
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading && collections.length > 0 && (
        displayedItems.map((collection) => (
          <div
            key={collection.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={collection.authorImage || AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <Countdown expiryDate={collection.expiryDate}/>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img src={collection.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{collection.title}</h4>
                </Link>
                <div className="nft__item_price">{collection.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{collection.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {loading && (
        <div className="d-flex flex-wrap">
          {Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={`skeleton-${index}`}>
              <NewSkeleton />
            </div>
          ))}
        </div>
      )}

      {visibleItems < collections.length && (
        <div className="text-center">
          <button className="btn-main" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}export default ExploreItems;
