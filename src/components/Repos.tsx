import React, {ReactElement} from "react";
import {repoType}from '../App'

type RepoProps = {
    className: string;
    title: string;
    repos: repoType[];
}




const Repos: React.FC<RepoProps> = (props): ReactElement => (
    <div className={props.className}>
        <h2>{props.title}</h2>
        <ul >
            {props.repos.map( (repo): ReactElement =>
                <li key={repo.id}><a target={'_blank'}  rel="noopener noreferrer" href={repo.link}>{repo.name}</a></li>
            )}
        </ul>
    </div>
)
Repos.defaultProps= {
    className: 'repos',
    title: 'Repositório',
    repos: [{
        id: NaN,
        name: 'Nome',
        link: "#"
    }]
}
export default Repos