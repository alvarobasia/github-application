import React from "react";
import Search, {SearchType}from "./Search";
import UserInfo from "./UserInfo";
import Actions, {GetRequests} from "./Actions";
import Repos from "./Repos";
import { repoType } from '../App';

export type UserInfoType = {
    username: string;
    photo: string;
    repos: number;
    gitHubLogin: string;
    followers: number;
    following: number;
};

type Props = {
    isFetching: boolean;
    userInfo: UserInfoType | null;
    repos: repoType[];
    starred: repoType[];
    handleSearch: SearchType;
    getRepos: GetRequests;
    getStarred: GetRequests;
};




const AppContent: React.FC<Props> = ({repos, starred, userInfo, handleSearch, getRepos, getStarred, isFetching}) => (
    <div className='app'>
        <Search isDisable={isFetching}  handleSearch={handleSearch}/>
        {isFetching && <div>Carregando... </div>}
        {!!userInfo && <UserInfo userInfo={userInfo}/>}
        {!!userInfo && <Actions getRepos={getRepos} getStarred={getStarred}/>}
        {!!repos.length &&
        <Repos className='repos' title={'Repositórios'} repos={repos}/>}
        {!!starred.length && <Repos className='starred' title={'Favoritos'} repos={starred}/>}
    </div>
)



export default AppContent