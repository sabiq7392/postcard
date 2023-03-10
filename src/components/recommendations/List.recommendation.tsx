"use client";

import { Fragment, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, LoadScript, MarkerF, OverlayView } from "@react-google-maps/api";
import useStoreRecommendations from "./store.recommendation";
import { css } from "@emotion/css";
import { A, Div, H1, H2, Img, P } from "@/styles/MameStyled_V2/core/HtmlTag";
import { Content } from "@/styles/MameStyled_V2/core/SyntaticSugar";
import { Button } from "antd";

// eslint-disable-next-line no-undef
type GoogleMapProps = google.maps.Map;
// eslint-disable-next-line no-undef
type GoogleMapLatLngLiteral = google.maps.LatLngLiteral;
// eslint-disable-next-line no-undef
type GoogleMapAutoComplete = google.maps.places.Autocomplete;

// eslint-disable-next-line no-undef
type GoogleMapPlaceResult = google.maps.places.PlaceResult;

export interface GetRecommendationsProps {
  isLoading: boolean,
}

export default function GetRecommendations(props: GetRecommendationsProps): ReactElement {
  const store = useStoreRecommendations();
  const listRecommendationContainer = useRef<HTMLElement>(null);

  // const [center, setCenter] = useState<GoogleMapLatLngLiteral>({
  //   lat: -6.208869746866656,
  //   lng: 106.84461723387074,
  // });
  const [center, setCenter] = useState<GoogleMapLatLngLiteral | null>(null);
  const [position, setPosition] = useState<GoogleMapLatLngLiteral>({     
    lat: -6.208869746866656,
    lng: 106.84461723387074,
  });

  const changeCenterMap = useCallback(() => {
    const listRecommendationPlaces = document.querySelectorAll(".list-recommendation__place");
    
    if (!listRecommendationPlaces) throw "There is no recommedation place";

    listRecommendationPlaces.forEach((place, index) => {
      const _place = place as HTMLElement;
      const placeOffsetTop = _place.offsetTop;
      const containerScrollTop = listRecommendationContainer.current?.scrollTop ?? 0;

      if ((containerScrollTop + 20) >= placeOffsetTop) {
        setCenter( (center) => ({
          ...center,
          lat: store.data?.places[index].lat ?? 0,
          lng: store.data?.places[index].long ?? 0,
        }));
      }
    });
    
  }, [store.data?.places]);

  useEffect(() => {
    const _listRecommendationContainer = listRecommendationContainer.current;
    if (listRecommendationContainer) {
      _listRecommendationContainer
        ?.addEventListener("scroll", changeCenterMap);
    }

    return () => {
      _listRecommendationContainer
        ?.removeEventListener("scroll", changeCenterMap);
    };
  }, [changeCenterMap]);
  
  const onLoad = useCallback((map: GoogleMapProps) => {
    // const bounds = new window.google.maps.LatLngBounds(position);
    // map.fitBounds(bounds);
  // }, [position]);
  }, []);

  const onChangePosition = ({ lat, lng }: GoogleMapLatLngLiteral) => {
    setPosition({ lat, lng });
  };

  return (
    <div className={css({ display: props.isLoading ? "none" : "flex" })}>
      <Content.Container ref={listRecommendationContainer} className={css`
        z-index: 1000;
        width: 50vw;
        min-width: 410px;
        max-width: 510px;
        height: 100vh;
        overflow: scroll;
        background-color: white;
        filter: drop-shadow(8px 0px 32px rgba(0, 0, 0, 0.12));
      `}>
        <Content.Header>
          <Div className={css`
            width: 100%;
            position: relative;
            display: flex;
            aspect-ratio: 1 / 1;
          `}>
            <Img
              src={store.data?.image_url ?? "/images/default-image.jpg"} 
              alt={"background"} 
              className={css`position: absolute; top: 0; height: 100%; width: 100%;`}
            />
            <Div className={css`position: absolute; top: 0; height: 100%; width: 100%; background-color: rgba(0,0,0,.7); z-index: 2; padding: 5%; color: white;`}>
              <H1 fontSize={"2.75rem"} className={css`font-family: Degular;`}>{store.data?.title.replaceAll("\"", "")}</H1>
            </Div>
          </Div>

          <Div className={css`background: #FAFAFA; padding: 1.875rem 3.125rem;`}>
            <P fontSize={"1.125rem"} className={css`
              font-family: 'Financier Display'; 
              line-height: 150%; 
              color: #4E4E53; 
              &::first-letter { font-size: 200% }
            `}>
              {store.data?.description}
            </P>
          </Div>
        </Content.Header>
        <Content.Body>
          <Div className={css`height: 2px; background: #DEDEDE; width: 100%;`} />
          {store.data?.places.map((place) => (
            <Fragment key={place.placeId}>
              <Content.Section key={place.placeId} className={css`background: #FFFFFF; padding: 1.875rem 3.125rem;` + " " + "list-recommendation__place"}>
                <Content.Header className={css`margin-bottom: 1.25rem!important;`}>
                  <A hoverXs={{ color: "#0078E8" }} href={place.url}>
                    <H2 className={css`font-family: Degular; font-size: 1.25rem; font-weight: 400;`}>
                      {place.name}
                    </H2>
                  </A>
                </Content.Header>
                <Content.Body>
                  <P className={css`font-family: Beacon DA; font-size: 1rem; color: #808085; line-height: 150%; font-weight: 400; margin-bottom: 1.875rem;`}>
                    {"\""}{place?.description ?? "-"}{"\""}
                  </P>
                  {place.media.map((_media, index) => (
                    <Img key={index} src={_media.url} alt={_media.credit} width={"100%"} style={{ aspectRatio: "4 / 3" }} />
                  ))}
                </Content.Body>
              </Content.Section>
              <Div className={css`height: 2px; background: #DEDEDE; width: 100%;`} />
            </Fragment>
          ))}

        </Content.Body>
        <Content.Footer className={css`height: 100vh`}>

        </Content.Footer>
      </Content.Container>
      
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={center ?? { lat: store.data?.places[0].lat ?? 0, lng: store.data?.places[0].long ?? 0 }}
          zoom={15}
          onLoad={onLoad}
          onClick={(e) => onChangePosition({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number })}
        >
          {store.data?.places.map((place) => (
            <Fragment key={place.placeId}>
              <OverlayView
                position={{ lat: place.lat, lng: place.long }} 
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <Button shape="round" style={{ background: "black", color: "white", fontFamily: "Degular", transform: "translateY(-35px) translateX(15px)" }}>
                  {place.name}
                </Button>
              </OverlayView>
              <MarkerF 
                key={place.placeId}  
                position={{ lat: place.lat, lng: place.long }} 
              />
            </Fragment>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}