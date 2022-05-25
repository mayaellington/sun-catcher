import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SunPostCard( {removeSunPost, sunPost, isProfile, user}){
    // const clickHandler = removeSunPost(sunPost._id)
    const clickHandler = () => {
        console.log('clickHandler');
        removeSunPost(sunPost._id)
      }
    return (
        <Card key={sunPost._id} raised>
          {isProfile ? (
            ""
          ) : (
            <Card.Content textAlign="left">
              <Card.Header>
                <Link to={`/${sunPost.user.username}`}>
                  <Image
                    size="large"
                    avatar
                    src={
                        sunPost.user.photoUrl
                        ? sunPost.user.photoUrl
                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                  />
                  {sunPost.user.username}
                </Link>
              </Card.Header>
            </Card.Content>
          )}
    
          <Image src={`${sunPost.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{sunPost.location}</Card.Description>
            <Card.Description>{sunPost.date}</Card.Description>
            <Card.Description>{sunPost.postType}</Card.Description>
            {isProfile ? (
            ""
          ) : (
        <button onClick={clickHandler} type="submit">Delete</button>
  )}

          </Card.Content>
        </Card>
      );
    }
