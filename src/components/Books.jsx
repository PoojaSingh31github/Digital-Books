import React, { useEffect, useState } from "react";
import prev from "../assets/Back.svg"
import next from "../assets/Next.svg";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);
    const [apiUrl, setApiUrl] = useState("https://gutendex.com/books");

    const fetchBooks = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBooks(data.results);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBooks(apiUrl);
    }, [apiUrl]);

    return (
        <div>
            <div className="flex justify-between my-4 px-4">
                <div disabled={!prevUrl} className="disabled:opacity-50">
                    <img width={20} height={20} src={prev} alt="" onClick={() => setApiUrl(prevUrl)} />
                </div>
                <div disabled={!nextUrl} className="disabled:opacity-50">
                    <img width={20} height={20} src={next} alt="" onClick={() => setApiUrl(nextUrl)} />
                </div>
            </div>

            <div className="flex overflow-x-auto gap-[20px] px-4 py-6">
                {books.map((book, index) => (
                    <div
                        key={index}
                        className="min-w-[250px] bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
                        onClick={() => {
                            const htmlUrl = book.formats["text/html"];
                            if (htmlUrl) {
                                window.open(htmlUrl, "_blank");
                            } else {
                                alert("No HTML version available for this book.");
                            }
                        }}
                    >
                        <img
                            src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
                            alt={book.title}
                            className="w-full h-[250px] object-cover rounded-t"
                        />
                        <div className="p-2">
                            <h2 className="font-semibold text-sm">{book.title}</h2>
                            <p className="text-xs text-gray-600">
                                {book.authors?.[0]?.name || "Unknown Author"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;
