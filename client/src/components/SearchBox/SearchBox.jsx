import React from "react";
import search from "./SearchBox.module.css"
import {useDispatch, useSelector} from "react-redux";
import {changeFilter} from "../../redux/filters/slice.js";

const SearchBox = () => {
    const dispatch = useDispatch();

    return(
        <div className={search["handleSearch"]}>
            <p>Find contacts by name</p>
            <input
                type="text"
                onChange={(e) => dispatch(changeFilter(e.target.value))}
            />
        </div>
    )
}

export default SearchBox;