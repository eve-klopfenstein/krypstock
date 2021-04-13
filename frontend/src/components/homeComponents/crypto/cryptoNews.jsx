import React, {useEffect, useState} from 'react'
import {CryptoHeadlineWrapper, CryptoNewsWrapper } from '../../../styles/components/stockStyles/newsStyles';
import { ShrinkingComponentWrapper } from '../../../styles/globalParts/containerStyles';
import TablePagination from '@material-ui/core/TablePagination';
import {darkTheme} from '../../../styles/Themes';

export const CryptoNews = () => {

    const [allNews, setAllNews] = useState([]);
    const apiKey = "c9f83156011c478e9d57aafff581a35d"
    const symbol = "crypto"

     //Pagination
     const [page, setPage] = useState(0);
     const rowsPerPage = 3;
     const handleChangePage = (event, newPage) => {
         setPage(newPage);
     };

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {

        const API_Call = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${apiKey}`;

        fetch(API_Call)
            .then(res => res.json())
            .then(data => {
                    setAllNews(data.articles);
                });
    }

    return (
        <>
        <ShrinkingComponentWrapper >  
            <h3>Latest News</h3>
            {allNews.length > 0 ? allNews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((news, index) => {
                return (
                    
                    <CryptoNewsWrapper key={index}>
                        <CryptoHeadlineWrapper>
                            <img onClick={()=> window.open(news.url, "_blank")} src={news.urlToImage} alt=""/>
                            <div>
                                <h3 onClick={()=> window.open(news.url, "_blank")}>{news.title}</h3>
                                <div className="publishDetial">
                                <p className='news_date'>By {news.author}</p>
                                <p className='news_date'>{news.publishedAt}</p>
                                </div>
                            </div>
                        </CryptoHeadlineWrapper>
                    </CryptoNewsWrapper>
      
                )
            })
            : ''
            }
            {
                allNews && allNews.length !== 0 ?
                <TablePagination 
                    component="div"
                    count={allNews.length}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    style={{color: darkTheme.text}}
                />
                : null
            }
        </ShrinkingComponentWrapper>
        </>
    )

}



  /* <NewsWrapper>
                            <h3>{news.title}</h3>
                            <h6>{news.description}</h6>
                            <img src={news.urlToImage}/>
                            <p className='news_date'>{news.publishedAt} - By {news.author} from {news.source.name}</p>
                            <a href={news.url} target='_blank' rel='noreferrer'>Click here to see the complete article</a>
                        </NewsWrapper> */



//     return (
//         <ShrinkingComponentWrapper>
//         <h3>Latest News</h3>
//         <NewsWrapper>
//             <a className="headline" href="https://finance.yahoo.com/news/stock-market-news-live-updates-april-7-2021-221305239-221231308.html">{"Stock market news live updates: Stock futures trade higher, shaking off earlier declines"}</a>
//             <a className="source" href="https://finance.yahoo.com/news/stock-market-news-live-updates-april-7-2021-221305239-221231308.html">{"Bloomberg"}</a>
//             <a className="headline" href="https://finance.yahoo.com/news/stock-market-news-live-updates-april-7-2021-221305239-221231308.html">{"Stock market news live updates: Stock futures trade higher, shaking off earlier declines"}</a>
//             <a className="source" href="https://finance.yahoo.com/news/stock-market-news-live-updates-april-7-2021-221305239-221231308.html">{"Bloomberg"}</a>
//             <a className="headline" href="https://finance.yahoo.com/news/stock-market-news-live-updates-april-7-2021-221305239-221231308.html">{"Stock market news live updates: Stock futures trade higher, shaking off earlier declines"}</a>
//             <a className="source" href="https://finance.yahoo.com/news/stock-market-news-live-updates-april-7-2021-221305239-221231308.html">{"Bloomberg"}</a>
//         </NewsWrapper>
//     </ShrinkingComponentWrapper>
//     )
// }
