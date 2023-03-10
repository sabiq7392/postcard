/* eslint-disable no-unused-vars */
import setQueryParams from "@/utils/setQueryParams";
import { ServiceImportantConfig } from "..";

export abstract class ServiceRecommendationConfigProps {
  abstract GetList: {
    query: {
      query: string
      smart_geo?: 1 | 0;
    }
  }
}

export abstract class ServiceRecommendationConfigMethod {
  abstract GetList: (props: ServiceRecommendationConfigProps["GetList"]) => ServiceImportantConfig;
}

const ServiceRecommendationConfig: ServiceRecommendationConfigMethod = {
  GetList: (props) => ({
    url: process.env.API_BASE_URL + "/recommendation" + setQueryParams(props.query ?? {}),
    method: "GET",
  }),
};

export default ServiceRecommendationConfig;