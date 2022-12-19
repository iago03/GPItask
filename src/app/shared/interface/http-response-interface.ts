export interface httpResponse {
  company: string;
  markets: Array<marketsResponse>;
}

export interface marketsResponse {
  company: info;
  id: number;
  market: info;
  price: number;
}

export interface info {
  name: string;
  id: number;
}
