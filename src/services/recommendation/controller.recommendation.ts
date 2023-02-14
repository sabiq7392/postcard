import useSWR from "swr";
import ServiceRecommendationConfig, { ServiceRecommendationConfigProps } from "./config.recommendation";
import axios, { AxiosResponse } from "axios";
import { ServiceImportantConfig } from "..";
import ServiceRecommendationModel from "./model.recommendation";

const fetcher = <Data, DTO = undefined>(props: ServiceImportantConfig<DTO>) => (
  axios(props)
    .then((response: AxiosResponse<Data>) => response?.data)
);

const ServiceRecommendationController = {
  useGetList (props: ServiceRecommendationConfigProps["GetList"]) {
    const response = useSWR(
      ServiceRecommendationConfig.GetList(props), 
      (key) => fetcher<ServiceRecommendationModel["GetList"]>(key)
    );

    return {
      data: response.data,
      isLoading: !response.data && !response.error,
      isError: response.error,
      isValidating: response.isValidating,
      mutate: response.mutate,
    };
  },
};

export default ServiceRecommendationController;