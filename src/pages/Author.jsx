import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useState, useEffect } from 'react';
import { getAuthor } from "../api/getAuthor";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

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
      try {
        const data = await getAuthor(id);
        setCollections(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
  
    fetchCollections();
  }, [id]);
  
  
  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section id="profile_banner" className="text-light">
            <Skeleton height="300px" width="100%" />
          </section>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton height="150px" width="150px" borderRadius="50%" />
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <Skeleton height="40px" width="200px" />
                    </div>
                  </div>
                  <div className="row">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="col-lg-3 col-md-6 col-sm-6">
                        <Skeleton height="300px" width="100%" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
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
