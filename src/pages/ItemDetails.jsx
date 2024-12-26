import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getItemDetails} from "../api/getItemDetails";


function ItemDetails() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const data = await getItemDetails(id);
        setCollections(data);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItemDetails();
  }, [id]);
  
  
  if (error) return <div>Error loading item details</div>;
  if (loading) return <div>Loading...</div>;
  if (!collections) return <div>No item found</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={collections.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{collections.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {collections.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {collections.likes}
                    </div>
                  </div>
                  <p>
                    {collections.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${collections.ownerId}`}>
                            <img className="lazy" src={collections.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                        <Link to={`/author/${collections.ownerId}`}>
                            {collections.authorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        <Link to={`/author/${collections.ownerId}`}>
                            <img className="lazy" src={collections.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                        <Link to={`/author/${collections.ownerId}`}></Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{collections.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
