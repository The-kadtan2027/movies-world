import React, {useState} from 'react'

function Search(props) {
    const [searchValue, setSearchValue] = useState("")
    
const handleOnChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
}
const handleSubmit = (e) => {
    e.preventDefault();
    props.search(searchValue);
    setSearchValue('');

}

    return (
        <form className='form'>
            <input type="text"
                value={searchValue}
                placeholder='Movie Name...'
                onChange={handleOnChange}
            />
            <button onClick={handleSubmit}>Search</button>

        </form>
    )
}

export default Search
