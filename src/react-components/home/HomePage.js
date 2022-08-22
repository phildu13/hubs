import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import configs from "../../utils/configs";
import { CreateRoomButton } from "./CreateRoomButton";
import { PWAButton } from "./PWAButton";
import { useFavoriteRooms } from "./useFavoriteRooms";
import { usePublicRooms } from "./usePublicRooms";
import styles from "./HomePage.scss";
import { AuthContext } from "../auth/AuthContext";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { MediaGrid } from "../room/MediaGrid";
import { MediaTile } from "../room/MediaTiles";
import { PageContainer } from "../layout/PageContainer";
import { scaledThumbnailUrlFor } from "../../utils/media-url-utils";
import { Column } from "../layout/Column";
import { Button } from "../input/Button";
import { Container } from "../layout/Container";

export function HomePage() {
  const auth = useContext(AuthContext);
  const intl = useIntl();

  const { results: favoriteRooms } = useFavoriteRooms();
  const { results: publicRooms } = usePublicRooms();

  const sortedFavoriteRooms = Array.from(favoriteRooms).sort((a, b) => b.member_count - a.member_count);
  const sortedPublicRooms = Array.from(publicRooms).sort((a, b) => b.member_count - a.member_count);

  useEffect(() => {
    const qs = new URLSearchParams(location.search);

    // Support legacy sign in urls.
    if (qs.has("sign_in")) {
      const redirectUrl = new URL("/signin", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    } else if (qs.has("auth_topic")) {
      const redirectUrl = new URL("/verify", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    }

    if (qs.has("new")) {
      createAndRedirectToNewHub(null, null, true);
    }
  }, []);

  const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;
  
  return (
    <PageContainer className={styles.homePage}>
      <div className="row" style={{marginTop: 105}}>
        <div className="col-md-3">
        </div>
        <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
          <div className="logo-div">
            <img style={{width: 100+'%'}} src="https://cadgl.net/meta-xyz-images/logo-xyz-2.png" />
          </div>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            <img src="https://cadgl.net/meta-xyz-images/Metaverse-xyz.png" />
          </div>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            <h2 className="outline-text" style={{color: 'white', fontWeight: 400, textAlign: 'center'}}>CHOOSE AN AVATAR, PUT ON YOUR HEADSET AND JUMP IN</h2>
          </div>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row" style={{marginTop: 50}}>
        <div className="col-md-3">
        </div>
        <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            <button onClick={()=> {window.open("https://meta-xyz.live/PdSVuGZ/cocktail-bar", "_blank");}} className="home-buttons">Cocktailbar Metaverse</button>
          </div>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row" style={{marginTop: 10}}>
        <div className="col-md-3">
        </div>
        <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            <button  className="home-buttons">Create your Metaverse
          <p className="menu-sub-text">Coming soon</p></button>
          </div>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row" style={{marginTop: 50}}>
        <div className="col-md-3">
        </div>
        <div style={{display: 'none'}}>
            {canCreateRooms && <CreateRoomButton />}
        </div>
        {/* <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
          <div className="buttons" style={{textAlign: 'center'}}>
            <div>
            {canCreateRooms && <CreateRoomButton />}
            </div>
            <div style={{marginTop: 20}}>
              <a href="/signin" rel="noreferrer noopener">
                <FormattedMessage id="header.sign-in" defaultMessage="Sign In" />
              </a>
            </div>
          </div>
        </div> */}
        <div className="col-md-3">
        </div>
      </div>
      {/* <div id="footer-text" style={{width: 100+'%', textAlign: 'center' ,marginTop: 185}}>
          <h2 style={{color: 'white', fontWeight: 400}}>XYZ 2022</h2>
      </div> */}
      {/* <Container>
        <div className={styles.hero}>
          <div className={styles.logoContainer}>
            <img alt={configs.translation("app-name")} src={configs.image("logo")} />
          </div>
          <div className={styles.appInfo}>
            <div className={styles.appDescription}>{configs.translation("app-description")}</div>
            <iframe width="500px" height="300px" src="https://app.cadgl.com/iframe/d9eaa4c6-56b8-49e9-aa62-a8d59480ca47/" title="description"></iframe>
            {canCreateRooms && <CreateRoomButton />}
            <PWAButton />
          </div>
          <div className={styles.heroImageContainer}>
            <img
              alt={intl.formatMessage(
                {
                  id: "home-page.hero-image-alt",
                  defaultMessage: "Screenshot of {appName}"
                },
                { appName: configs.translation("app-name") }
              )}
              src={configs.image("home_background")}
            />
          </div>
        </div>
      </Container>
      {configs.feature("show_feature_panels") && (
        <Container className={classNames(styles.features, styles.colLg, styles.centerLg)}>
          <Column padding gap="xl" className={styles.card}>
            <img src={configs.image("landing_rooms_thumb")} />
            <h3>
              <FormattedMessage id="home-page.rooms-title" defaultMessage="Instantly create rooms" />
            </h3>
            <p>
              <FormattedMessage
                id="home-page.rooms-blurb"
                defaultMessage="Share virtual spaces with your friends, co-workers, and communities. When you create a room with Hubs, you’ll have a private virtual meeting space that you can instantly share - no downloads or VR headset necessary."
              />
            </p>
          </Column>
          <Column padding gap="xl" className={styles.card}>
            <img src={configs.image("landing_communicate_thumb")} />
            <h3>
              <FormattedMessage id="home-page.communicate-title" defaultMessage="Communicate naturally" />
            </h3>
            <p>
              <FormattedMessage
                id="home-page.communicate-blurb"
                defaultMessage="Choose an avatar to represent you, put on your headphones, and jump right in. Hubs makes it easy to stay connected with voice and text chat to other people in your private room."
              />
            </p>
          </Column>
          <Column padding gap="xl" className={styles.card}>
            <img src={configs.image("landing_media_thumb")} />
            <h3>
              <FormattedMessage id="home-page.media-title" defaultMessage="An easier way to share media" />
            </h3>
            <p>
              <FormattedMessage
                id="home-page.media-blurb"
                defaultMessage="Share content with others in your room by dragging and dropping photos, videos, PDF files, links, and 3D models into your space."
              />
            </p>
          </Column>
        </Container>
      )}
      {sortedPublicRooms.length > 0 && (
        <Container className={styles.roomsContainer}>
          <h3 className={styles.roomsHeading}>
            <FormattedMessage id="home-page.public--rooms" defaultMessage="Public Rooms" />
          </h3>
          <Column grow padding className={styles.rooms}>
            <MediaGrid center>
              {sortedPublicRooms.map(room => {
                return (
                  <MediaTile
                    key={room.id}
                    entry={room}
                    processThumbnailUrl={(entry, width, height) =>
                      scaledThumbnailUrlFor(entry.images.preview.url, width, height)
                    }
                  />
                );
              })}
            </MediaGrid>
          </Column>
        </Container>
      )}
      {sortedFavoriteRooms.length > 0 && (
        <Container className={styles.roomsContainer}>
          <h3 className={styles.roomsHeading}>
            <FormattedMessage id="home-page.favorite-rooms" defaultMessage="Favorite Rooms" />
          </h3>
          <Column grow padding className={styles.rooms}>
            <MediaGrid center>
              {sortedFavoriteRooms.map(room => {
                return (
                  <MediaTile
                    key={room.id}
                    entry={room}
                    processThumbnailUrl={(entry, width, height) =>
                      scaledThumbnailUrlFor(entry.images.preview.url, width, height)
                    }
                  />
                );
              })}
            </MediaGrid>
          </Column>
        </Container>
      )}
      <Container>
        <Column padding center grow>
          <Button lg preset="primary" as="a" href="/link">
            <FormattedMessage id="home-page.have-code" defaultMessage="Have a room code?" />
          </Button>
        </Column>
      </Container> */}
      
    </PageContainer>
  );
}
