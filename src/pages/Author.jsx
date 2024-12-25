import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useState, useEffect } from 'react';
import { getAuthor } from "../api/getAuthor";
import { useParams } from "react-router-dom";

function Author() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    setFollowerCount(collections.followers);
  }, [collections]);
  
  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowerCount(prev => prev - 1);
    } else {
      setFollowerCount(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      console.log('Fetching started');
      try {
        const data = await getAuthor(id);
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
  }, [id]);
  
  console.log('Current state:', { loading, collections });
  console.log(collections) 

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ 
            background: `url(${collections?.nftCollection?.[0]?.nftImage || AuthorBanner}) top` 
          }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={collections.authorImage || AuthorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {collections.authorName}
                          <span className="profile_username">@{collections.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {collections.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followerCount} followers</div>
                      <button 
                        className={`btn-main ${isFollowing ? 'following' : ''}`}
                        onClick={handleFollowClick}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  </div>
                </div>
                <AuthorItems authorImage={collections.authorImage} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Author;
