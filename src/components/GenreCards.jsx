import React from "react";
import friction from "../assets/Fiction.svg";
import drama from "../assets/Drama.svg";
import humour from "../assets/Humour.svg";
import politics from "../assets/Politics.svg";
import phylosphy from "../assets/Philosophy.svg";
import history from "../assets/History.svg";
import advanture from "../assets/Adventure.svg";
import next from "../assets/Next.svg";
import { useNavigate } from "react-router-dom";
import BooksList from "./Books";

const GenreCards = () => {
    const genraData = [
        { icons: friction, title: "Fiction" },
        { icons: drama, title: "Drama" },
        { icons: humour, title: "Humour" },
        { icons: politics, title: "Politics" },
        { icons: phylosphy, title: "Philosophy" },
        { icons: history, title: "History" },
        { icons: advanture, title: "Adventure" },


    ]
    const navigate = useNavigate()

    const handleGenre = (title) => {
        navigate(`/books?topic=${encodeURIComponent(title)}`)
    }


    return (
        <>
            <div className="w-4/5  px-[20px] mx-auto bg-secondary ">
                <h1 className="text-48 text-primary font-bold py-[20px] text-center">
                    Gutenberg Project
                </h1>
                <p className="text-20 text-colorBlack font-semibold ">
                    A social cataloging website that allows you to
                    freely search its database of books,
                    annotations, and reviews.
                </p>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[20px] py-[40px]">
                    {genraData.map((items, index) => (
                        <div key={index} className="genraCard flex justify-around items-center">
                            <div>
                                <img width={20} height={20} src={items.icons} alt="" />
                            </div>
                            <div className="text-20">
                                {items.title}
                            </div>
                            <div>
                                <img className="cursor-pointer" width={20} height={20} src={next} alt="" onClick={() => handleGenre(items.title)} />
                            </div>
                        </div>
                    ))
                    }
                </div>

                <BooksList />
            </div>
        </>
    )
}

export default GenreCards;