export default abstract class ServiceRecommendationModel {
  abstract GetList: {
    title: string,
    image_url: string,
    description: string,
    places: GetListPlace[],
  }
}

export type GetListPlace = {
  placeId: string,
  name: string,
  description: string,
  url: string,
  gmaps: string,
  lat: number,
  long: number,
  media: Array<{
    url: string,
    credit: string,
  }>
};