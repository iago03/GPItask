export interface HttpResponse {
  company: string;
  markets: Array<MarketsResponse>;
}

export interface MarketsResponse {
  company: Info;
  id: number;
  market: Info;
  price: number;
}

export interface Info {
  name: string;
  id: number;
}
