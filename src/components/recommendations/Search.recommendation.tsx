"use client"

import { Button, Form, Modal, Switch, message } from "antd";
import { ReactElement, useRef, useState } from "react";
import { css } from "@emotion/css";
import { Input } from "antd";
import ServiceRecommendationController from "@/services/recommendation/controller.recommendation";
import useStoreRecommendations from "./store.recommendation";
import { useRouter } from "next/navigation";
import { Div, H1, Img, Label, P, Small, Span } from "@/styles/MameStyled_V2/core/HtmlTag";
import { Content } from "@/styles/MameStyled_V2/core/SyntaticSugar";
import Image from "next/image";
import { Grid } from "@/styles/MameStyled_V2/core/display/Grid";
import { Flex } from "@/styles/MameStyled_V2/core/display/Flex";

type DTO = {
  query: string;
  smart_geo: boolean,
}


export default function SearchRecommendation(): ReactElement {
  const store = useStoreRecommendations();
  const router = useRouter();
  const buttonSubmit = useRef<HTMLButtonElement>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isFormCanSubmit, setIsFormCanSubmit] = useState(false);

  const onFinish = async (values: DTO) => {
    store.setData(null);
    store.setQuery(values.query);
    store.setLoadingStatus("LOADING");

    console.log(values)

    const recomendations = await ServiceRecommendationController.GetList({ query: { query: values.query, smart_geo: values.smart_geo === true ? 1 : 0 } });

    if (!recomendations?.data)  {
      store.setLoadingStatus("ERROR");
      message.error("Fail to search, please try again");

      setTimeout(() => {
        store.setLoadingStatus("IDLE");
      }, 500);
    } else {
      store.setData(recomendations?.data ?? null);
      store.setLoadingStatus("SUCCESS");
    }
  };

  const onChange = (checked: boolean) => {
  };

  const onSetPrompt = (value: string) => {
    setPrompt(value);
    setIsFormCanSubmit(value.trim().length > 1);
  };

  return (
    <>
      <Content.Container className={css`display: grid; place-items: center; min-height: 100vh;`}>
        <Div>
          {store.loadingStatus === "IDLE" && (
            <Form onFinish={onFinish} className={css`display: grid; width: 70vw; min-width: 300px; max-width: 800px;`}>
              <Img src={"/images/loading.svg"} alt="loading" className={css`margin: auto;`} />
              <Div className={css`padding: 1.875rem; margin-top: 3rem;`}>
                <Content.Header>
                  <H1 fontSize={"2rem"} className={css`font-family: Degular; color: white;`}>What are you looking for?</H1>
                </Content.Header>
                <Content.Body> 
                  <Form.Item name={"query"} rules={[{ required: true }]}>
                    <Input
                      placeholder="Type your prompt here..."
                      onChange={(event) => onSetPrompt(event.target.value)}
                      className={css`font-size: 2.5rem; font-family: Degular; border-radius: 0; background: transparent; border: none; border-bottom: 2px solid #ECECEC; color: white; padding: 0; &::placeholder { color: #B2B2B2 }`}  
                      onPressEnter={() => isFormCanSubmit ? buttonSubmit.current?.click() : null}
                    />
                  </Form.Item>

                  <Form.Item name={"smart_geo"} initialValue={true} label="Smart Geo" className={css`label { color: white!important; }`}>
                    <Switch defaultChecked />
                  </Form.Item>

                  {!isFormCanSubmit && (
                    <Small fontSize={"1.25rem"} className={css`font-family: Degular; color: white; margin-top: 1rem; display: block;`}>
                      <Span className={css`font-weight: 500;`}>e.g.</Span> <Span className={css`font-weight: 600;`}>“Recommend me cheap romantic restaurants for my Valentine date”</Span>
                    </Small>
                  )}
                
                  {isFormCanSubmit && (
                    <Grid center className={css`margin-top: 3rem;`}>
                      <Form.Item>
                        <Button ref={buttonSubmit} shape="round" size="large" htmlType="submit" className={css`font-family: 'Beacon DA'; background: #3179E0; border: none; color: white; font-size: 1.25rem;`}>
                          Generate Recommendation
                        </Button>
                      </Form.Item>
                    </Grid>
                  )}
                </Content.Body>
              </Div>
            </Form>
          )}

          {store.loadingStatus === "LOADING" && (
            <Div className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 504px;
              padding: 2rem;
              text-align: center;
            `}>
              <Image 
                src="/images/loading.svg" 
                alt="loading" 
                width={120} 
                height={120} 
                className={css`margin-bottom: 3.25rem`}
              />
              <P fontSize={"1.125rem"} className={css`margin-bottom: 1rem; font-family: Beacon; color: white;`}>Searching the best places for you...</P>
              <Small fontSize={"1rem"} className={css`font-family: Beacon; color: #DFDFDF;`}>Our AI is preparing the best places recommendation for you. Please wait a moment</Small>
            </Div>
          )}
        </Div>
        
      </Content.Container>
    </>
  )
}