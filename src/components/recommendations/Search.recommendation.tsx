"use client"

import { Button, Form, Modal } from "antd";
import { ReactElement, useRef, useState } from "react";
import { css } from "@emotion/css";
import { Input } from "antd";
import ServiceRecommendationController from "@/services/recommendation/controller.recommendation";
import useStoreRecommendations from "./store.recommendation";
import { useRouter } from "next/navigation";
import { Inter } from "@next/font/google";
import { Div, H1, P, Small } from "@/styles/MameStyled_V2/core/HtmlTag";
import { Content } from "@/styles/MameStyled_V2/core/SyntaticSugar";
import Image from "next/image";

type DTO = {
  query: string;
}

const inter = Inter({ 
  subsets: ['latin'] 
})

export default function SearchRecommendation(): ReactElement {
  const store = useStoreRecommendations();
  const router = useRouter();
  const buttonSubmit = useRef<HTMLButtonElement>(null);

  const onFinish = async (values: DTO) => {
    store.setData(null);
    store.setQuery(values.query)
    store.setLoadingStatus("LOADING");
    const recomendations = await ServiceRecommendationController.GetList({ query: { query: values.query } });

    if (!recomendations?.data)  {
      store.setLoadingStatus("ERROR");
    } else {
      store.setData(recomendations?.data ?? null);
      store.setLoadingStatus("SUCCESS");
    }
  };



  return (
    <>
      <Content.Container className={css`display: grid; place-items: center; min-height: 100vh;`}>
        <Div className={css`background: white;`}>
          {store.loadingStatus === "IDLE" && (
            <Form onFinish={onFinish}>
              <Content.Header className={css({ background: "url(/images/background.dot.png)", padding: "1rem 2rem" })}>
                <H1 fontSize={"1.5rem"} className={css`font-family: Degular;`}>Recommendation</H1>
              </Content.Header>
              <Content.Body className={css({ padding: "2rem" })}>
                <Form.Item name={"query"}>
                  <Input.TextArea 
                    rows={3} 
                    className={css`font-size: 2.5rem; font-family: Degular`}  
                    onPressEnter={() => buttonSubmit.current?.click()}
                  />
                </Form.Item>
                <Form.Item>
                  <Button ref={buttonSubmit} shape="round" size="large" htmlType="submit" className={css`font-family: 'Beacon DA';`}>
                    Recommend Me Places
                  </Button>
                </Form.Item>
              </Content.Body>
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
                src="/network.icon.svg" 
                alt="network icon" 
                width={120} 
                height={120} 
                className={css`margin-bottom: 3.25rem`}
              />
              <P fontSize={"1.125rem"} className={css`margin-bottom: 1rem; font-family: 'Beacon';`}>Searching the best places for you...</P>
              <Small fontSize={"1rem"} className={css`font-family: 'Beacon'; color: #808085;`}>Our AI is preparing the best places recommendation for you. Please wait a moment</Small>
            </Div>
          )}
        </Div>
        
      </Content.Container>
    </>
  )
}