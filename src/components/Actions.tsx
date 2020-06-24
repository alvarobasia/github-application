import React, {FormEvent, ReactElement} from "react";

export type GetRequests = (event: React.FormEvent) =>  void;

type ActionsType = {
    getRepos: GetRequests;
    getStarred: GetRequests;
}

const Actions: React.FC<ActionsType> = ({getRepos, getStarred}): ReactElement => (
    <div className="actions">
        <button onClick={getRepos}>Ver repositorios</button>
        <button  onClick={getStarred}>Ver favoritos</button>
    </div>
)


export default Actions