function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <form className="m-auto">
            <p className="search-text">Vous recherchez un musicien ? Un groupe ? Un genre ou un instrument ?</p>
            <label className="w-2/3">
                <input className="search-bar" placeholder="OSnaill, The Band, Métal, Guitare" name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </label>
        </form>
    );
}

export default SearchBar;