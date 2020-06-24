import React, {ReactElement} from "react";



export type SearchType = (event: React.KeyboardEvent<HTMLInputElement>) =>  void;


type Search= {
    handleSearch: SearchType;
    isDisable: boolean;
}


const Search: React.FC<Search> = ({ handleSearch, isDisable }): ReactElement=>(
    <div className="search">
        <input
            type="search"
            placeholder="Digite o usuário no GitHub"
            disabled={isDisable}
            onKeyUp={handleSearch}
        />
    </div>
)

export default Search