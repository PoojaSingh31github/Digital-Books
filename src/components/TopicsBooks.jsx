import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import prev from "../assets/Back.svg"
import searchhh from "../assets/Search.svg"
const TopicBooks = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const topic = queryParams.get("topic") || "fiction";
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();

    const FatechBooks = async (query = "", newPage = 1) => {
        if (!hasMore) return;
        try {
            setLoading(true);
            const res = await fetch(`https://gutendex.com/books/?topic=${encodeURIComponent(topic)}&search=${query}&page=${newPage}`);
            const data = await res.json()
            setBooks(prevBooks =>
                newPage === 1 ? data.results : [...prevBooks, ...data.results]
            );
            setHasMore(data.results.length > 0);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    function debouce(func, delay) {
        let timer;
        return function (...argu) {
            clearTimeout(timer)
            timer = setTimeout(() => func(...argu), delay);
        }

    }


    let deb = useCallback(debouce((query) => {
        setPage(1);
        setHasMore(true);
        FatechBooks(query, 1)
    }, 500), [])


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        };
        let throttledScroll = debouce(handleScroll, 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", throttledScroll);
    }, [loading, hasMore]);


    useEffect(() => {
        setPage(1);
        setHasMore(true);
        FatechBooks();
    }, [topic])

    useEffect(() => {
        if (page > 1) {
            FatechBooks(search, page);
        }
    }, [page]);

    const handleBookOpen = (id) => {
        console.log("sdfgh", id)
        navigate(`/books?ids=${id}`)
    }

    if (loading) {
        return (
            <>
                <div className="h-[90%] flex justify-center items-center ">
                    <h1 className="text-48 text-primary font-bold py-[20px]">loading...</h1>
                </div>
            </>
        )
    }

    return (
        <div className="flex justify-center flex-col items-center mx-auto w-4/5 bg-secondary">
            <div className="flex justify-flex-start items-center gap-[50px] ">
                <div>
                    <img className="cursor-pointer w-10 h-10" src={prev} alt="" onClick={() => navigate(`/`)} />
                </div>
                <h1 className="text-48 text-primary font-bold py-[20px] ">{topic}</h1>
            </div>
            <div className=" w-[90%] mx-auto flex gap-[10px]">
                <div>
                    <img width={20} height={20} src={searchhh} alt="" />
                </div>
                <input className="bg-colorWhite searchBox w-full" type="text" placeholder="Search" value={search}
                    onChange={(e) => {
                        setSearch(e.target.value); deb(e.target.value)
                    }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-[20px] py-[50px]">
                {
                    books ? books.map((book, index) => (
                        <div key={index} className="Rectangle" onClick={() => {
                            const link = book.formats["text/html"];
                            if (link) {
                                window.open(link, "_blank");
                            } else {
                                alert("No HTML format available for this book.");
                            }
                        }}>
                            <img
                                src={book.formats["image/jpeg"]}
                                alt={book.title}
                                className="w-full h-[300px] rounded-md"
                            />
                            <h2 className="text-sm font-semibold text-colorBlack mt-2">{book.title}</h2>

                            <p className="text-sm text-colorGray">
                                {book.authors[0]?.name || "Unknown Author"}
                            </p>
                        </div>
                    )) : <div className="text-48 text-primary font-bold py-[20px]">
                        no book found
                    </div>
                }
            </div>
        </div>
    )
}

export default TopicBooks;