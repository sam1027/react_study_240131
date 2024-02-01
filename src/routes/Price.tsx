import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { PriceData } from "./Coin";

const PriceDiv = styled.div`
    background-color: transparent;
`;

const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
`;

const PriceText = styled.span`
    color: ${props => props.theme.textColor};
`;

const PriceValue = styled(PriceText)`
    font-weight: bold;
    &:hover{
        color: ${props => props.theme.accentColor};
    }
`;

interface IPrice{
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
}

function Price() {
    const {state: {quotes : { USD: priceInfo}}} = useLocation<PriceData>();
    const keys = Object.keys(priceInfo);
    return (
        <PriceDiv>
            {keys.map(key => (
                <PriceRow key={key}>
                    <PriceText>{key}</PriceText>
                    <PriceValue>{priceInfo[key as keyof IPrice]}</PriceValue>
                </PriceRow>
            ))}
        </PriceDiv>
    );
}

export default Price;