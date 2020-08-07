import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchArtistProfile } from "../../helpers/api-helpers";

import {
  requestArtist,
  receiveArtist,
  receiveArtistError,
} from "../../actions";

function ArtistRoute() {
  const dispatch = useDispatch();

  const currentArtist = useSelector((state) => state.artists.currentArtist);
  const artistStatus = useSelector((state) => state.artists.status);
  const accessToken = useSelector((state) => state.auth.token);
  const accessStatus = useSelector((state) => state.auth.status);
  const { id } = useParams();

  useEffect(() => {
    if (accessToken) {
      dispatch(requestArtist());

      fetchArtistProfile(accessToken, id)
        .then((data) => dispatch(receiveArtist(data)))
        .catch((error) => dispatch(receiveArtistError()));
    }
  }, [accessToken]);

  console.log(currentArtist);

  if (currentArtist) {
    const {
      name,
      images: [{ url: primaryArtistImage }],
      followers: { total },
      genres: [firstGenre, secondGenre, thirdGenre],
    } = currentArtist;

    return (
      <Wrapper>
        <Header>
          <ArtistImage src={primaryArtistImage} alt="Artist Image" />
          <ArtistName>{name}</ArtistName>
          <FollowersContainer>
            <Followers>{Math.floor(currentArtist.followers.total)}</Followers>
            <span>Followers</span>
          </FollowersContainer>
        </Header>
        <TagsSection>
          <TagsTitle>Tags</TagsTitle>
          <TagsContainer>
            {[firstGenre, secondGenre, thirdGenre].map((genre, index) => {
              return (
                <Tag key={index}>
                  <Genre>{genre}</Genre>
                </Tag>
              );
            })}
          </TagsContainer>
        </TagsSection>
      </Wrapper>
    );
  } else {
    return <div>Loading...</div>;
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  margin: 0 auto;
`;

const Header = styled.div`
  position: absolute;
  width: 268px;
  height: 215px;
  left: 54px;
  top: 59px;
`;

const ArtistImage = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;
  border-radius: 50%;
`;

const ArtistName = styled.h1`
  position: absolute;
  width: 268px;
  height: 59px;
  left: 78px;
  top: 120px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  /* identical to box height */

  /* White */

  color: #ffffff;
  /* Triple shadow */

  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const FollowersContainer = styled.div`
  position: absolute;
  width: 93px;
  height: 17px;
  left: 120px;
  top: 257px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Followers = styled.span`
  color: #ff4fd8;
  padding-right: 15px;
`;

const TagsSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 79px;
  left: 110px;
  top: 478px;
`;

const TagsTitle = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 26px;
  color: white;
`;

const TagsContainer = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const Genre = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: white;
`;

export default ArtistRoute;
