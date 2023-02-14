import useSWR from "swr";
import ServiceRecommendationConfig, { ServiceRecommendationConfigProps } from "./config.recommendation";
import axios, { Axios, AxiosResponse } from "axios";
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
      (key) => {
        if (!props.query?.query) return null;
        return fetcher<ServiceRecommendationModel["GetList"]>(key)
      }
    );

    return {
      data: response.data,
      isLoading: !response.data && !response.error,
      isError: response.error,
      isValidating: response.isValidating,
      mutate: response.mutate,
    };
  },

  async GetList(props: ServiceRecommendationConfigProps["GetList"]) {
    try {
      const response: AxiosResponse<ServiceRecommendationModel["GetList"]> | undefined = (
        await axios(ServiceRecommendationConfig.GetList(props))
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default ServiceRecommendationController;