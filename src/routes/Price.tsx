import styled from "styled-components";

import { useQuery } from "react-query";

import { fetchCoinTickers } from "../api";

const PriceChangeBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  strong {
    font-size: 24px;
  }
  span {
    font-size: 12px;
    margin: 0px 5px;
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IPriceProps {
  coinId: string;
}

const Price = ({ coinId }: IPriceProps) => {
  const { isLoading: tickersLoading, data: tickers } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  return (
    <>
      {tickersLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <PriceChangeBlock>
            <strong>하루</strong>
            <span>전보다</span>
            <strong className="highlight">
              {tickers?.quotes.USD.percent_change_24h}%
            </strong>
          </PriceChangeBlock>
          <PriceChangeBlock>
            <strong>일주일</strong>
            <span>전보다</span>
            <strong className="highlight">
              {tickers?.quotes.USD.percent_change_7d}%
            </strong>
          </PriceChangeBlock>
          <PriceChangeBlock>
            <strong>한 달</strong>
            <span>전보다</span>
            <strong className="highlight">
              {tickers?.quotes.USD.percent_change_30d}%
            </strong>
          </PriceChangeBlock>
          <PriceChangeBlock>
            <strong>일 년</strong>
            <span>전보다</span>
            <strong className="highlight">
              {tickers?.quotes.USD.percent_change_1y}%
            </strong>
          </PriceChangeBlock>
        </div>
      )}
    </>
  );
};

export default Price;
