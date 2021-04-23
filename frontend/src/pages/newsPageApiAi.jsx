// import { DoubleButtonContainer, LeftButton, MainContentWrapper, RightButton } from "../styles/pages/homeStyles";
import React, { useEffect, useState } from "react";
import {iexAPIKey, iexSandboxKey} from "../store/constants";
import { stockNewsAction } from "../store/actions/newsActions";
import { useDispatch, useSelector } from "react-redux";
// import NewsStock from "../components/newsFeed/newsStock";
import SingleStockNewsFeed from "../components/newsFeed/singleStockNewsFeed";
import { ShowMore, NewsContentWrapper, HeaderTitle, WrapperBorder } from '../styles/components/stockStyles/newsStyles'
import SingleCryptoNewsFeed from "../components/newsFeed/singleCryptoNewsApiAi";
import { NaviWrapper } from '../styles/components/naviStyles/menuStyles';
import Burger from '../components/navi/burger';
import Menu from '../components/navi/menu';
import { NewsShrinkingComponent, ShrinkingComponentWrapper, AllComponentsWrapper } from '../styles/globalParts/containerStyles';
import {DoubleButtonContainer, LeftButton, RightButton} from '../styles/pages/homeStyles';


const NewsPage = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    // const apiKey = "c9f83156011c478e9d57aafff581a35d"
    // const symbol = "crypto"

    const [newsNumberShown, setNewsNumberShown] = useState(9);
    const [crytoNews, setCryptoNews] = useState([]);

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const allStockNews = useSelector(state => state.newsReducer.stockNews);

    useEffect(() => {
        // fetchStockNews();
        fetchCryptoNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchStockNews = () => {
        const API_Call = `https://cloud.iexapis.com/stable/time-series/news?range=1m&limit=30&token=${iexAPIKey}`;

        if (allStockNews.length === 0) {
            fetch(API_Call)
                .then(res => res.json())
                .then(data => {
                    const action = stockNewsAction(data);
                    dispatch(action);
                });
        }
    }


    const fetchCryptoNews = () => {
    const API_Call = `https://eventregistry.org/api/v1/article/getArticles?apiKey=919a6de0-17d5-49df-b7c9-55de20989583`;
      const method = 'POST';
      const body = {
        action: "getArticles",
        keyword: ['crypto'],
        articlesPage: 1,
        articlesCount: 30,
        articlesSortBy: "date",
        articlesSortByAsc: false,
        articlesArticleBodyLen: -1,
        resultType: "articles",
        dataType: [
          "news",
          "pr"
        ],
        lang: "eng",
        apiKey: "919a6de0-17d5-49df-b7c9-55de20989583",
        forceMaxDataTimeWindow: 31
      };
      const headers = new Headers({
          'Content-Type': 'application/json'
      });
      const config = {
          method: method,
          headers: headers,
          body: JSON.stringify(body)
      };
      fetch(API_Call, config)
                .then(res => res.json())
                .then(data => {
                    setCryptoNews(data.articles.results)
                });
    }

    return (
         <>
                <NaviWrapper>
                <div>
                    <Burger open={open} setOpen={setOpen}/>
                    <Menu open={open} setOpen={setOpen} />
                    </div>
                    <div className="heading">
                    <h2>News</h2>
                    </div>
                </NaviWrapper>
                <HeaderTitle>
                <DoubleButtonContainer>
                    <LeftButton  className="left-button"  onClick={() => toggleTab(1)} numberClicked={toggleState}>Crypto</LeftButton>
                    <RightButton className="right-button" onClick={() => toggleTab(2)} numberClicked={toggleState}>Stock</RightButton>
                    <span className={`animation ${toggleState === 1 ? 'start-crypto' : 'start-stock'}`}></span>
                </DoubleButtonContainer>
            </HeaderTitle>
                <AllComponentsWrapper>
            <ShrinkingComponentWrapper>
                <NewsContentWrapper>

                    {
                        allStockNews.length > 0 && toggleState === 2 ?
                            allStockNews.slice(0, newsNumberShown).map((news, index) => {
                                return (
                                    <SingleStockNewsFeed key={index} news={news} />
                                )
                            })
                            : ''
                    }
                    {
                        crytoNews.length > 0 && toggleState === 1 ?
                            crytoNews.slice(0, newsNumberShown).map((news, index) => {
                                return (
                                    <SingleCryptoNewsFeed key={index} news={news} />
                                )
                            })
                            : ''
                    }
                </NewsContentWrapper>
                <ShowMore>
                    {
                        newsNumberShown < 30 ?
                            <h3 onClick={() => setNewsNumberShown(newsNumberShown + 5)}>Show more</h3>
                            : ''
                    }
                </ShowMore>
            </ShrinkingComponentWrapper>
        </AllComponentsWrapper>
        </>
    )
}

export default NewsPage