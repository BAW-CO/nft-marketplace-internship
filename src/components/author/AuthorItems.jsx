import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useState, useEffect } from 'react';
import { getAuthor } from "../../api/getAuthor";
import { useParams } from "react-router-dom";
import NewSkeleton from "../UI/NewSkeleton";

function AuthorItems({ authorImage }) {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getAuthor(id);
        setCollections(data.nftCollection);
      } catch (error) {
        console.error('Fetch error:', error); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchCollections();
  }, [id]);
  
  

  if (error) return <div>Something went wrong</div>;
  if (loading) {
    return (
      <div className="d-flex flex-wrap">
        {Array(4).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={`skeleton-${index}`}>
            <NewSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (!collections?.length) return <div>No items found</div>;
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {collections.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                <Link to={`/item-details/${nft.nftId}`}>
                  <img className="lazy" src={authorImage || AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorItems;
