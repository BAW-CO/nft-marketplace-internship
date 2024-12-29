import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState, useEffect, useMemo } from 'react';
import { getNewItems } from "../../api/newItems";
import OwlCarousel from 'react-owl-carousel';
import NewSkeleton from "../UI/NewSkeleton";
import Countdown from "../../api/countDown";

function NewItems() {
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
      try {
        const data = await getNewItems();
        setCollections(data);
      } catch (error) {
        console.error('Fetch error:', error); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchCollections();
  }, []);
  

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up-right">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading && collections.length > 0 && (
            <OwlCarousel className='owl-theme' {...options}>
          {collections.map((collection) => (
            <div className="lg-3 md-6 sm-6 xs-12" key={collection.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                <Link to={`/author/${collection.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
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

                  <Link to={`/item-details/${collection.nftId}`}>
                    <img
                      src={collection.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${collection.nftid}`}>
                    <h4>{collection.title}</h4>
                  </Link>
                  <div className="nft__item_price">{collection.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{collection.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </OwlCarousel>
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
        </div>
      </div>
    </section>
  );
};

export default NewItems;
