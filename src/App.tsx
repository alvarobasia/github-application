// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactElement, Component, FormEvent} from "react"
import Axios, {AxiosPromise, AxiosResponse} from "axios";


import AppContent, {UserInfoType} from "./components/app-content";



import './App.scss'



const ENTER= 'Enter';
let value: string;

export type repoType = {
    name: string;
    link: string;
    id: number;
}

interface AppState {
    userInfo: UserInfoType | null;
    repos: repoType[];
    starred: repoType[];
    isFetching: boolean;
}

enum ReposType {
    REPOS= 'repos' ,
    STARRED = 'starred'
}

type ServerData = {
    name: string;
    html_url: string;
    id: number;
}


export default class App extends Component<any, AppState> {
    constructor(props: never) {
        super(props)
        this.state =  {
            userInfo: null,
            repos: [],
            starred: [],
            isFetching: false
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    getGitHubApiUrl(username: string, type?: string): string {
        const correctUrl = type ? `/${type}` : ''
        return `https://api.github.com/users/${username}${correctUrl}`
    }


    handleSearch(e: React.KeyboardEvent<HTMLInputElement>): void{
        const inputEvent = e.target as HTMLInputElement;
        value = inputEvent.value;
        e.persist()
            if ( e.key === ENTER) {
                this.setState({
                    isFetching: true,
                    userInfo: null,
                })
                Axios.get(this.getGitHubApiUrl(value), {
                    headers: {
                    }
                })
                    .then((e: AxiosResponse) => {
                        this.setState({
                            userInfo: {
                                username: e.data.name,
                                photo: e.data.avatar_url,
                                gitHubLogin: e.data.login,
                                repos: e.data.public_repos,
                                following: e.data.following,
                                followers: e.data.followers
                            },
                            repos: [],
                            starred: []
                        })
                    })
                    .catch(e => console.error(e))
                    .finally(() => this.setState({
                        isFetching: false
                    }))
            }
    }

    requestFunction(type: string): AxiosPromise<ServerData[]>{
        return Axios.get(this.getGitHubApiUrl(value, type))
    }
    getRepos( type: ReposType): (e: FormEvent) => void {
        return (): void => {
            const result = this.requestFunction(type)
            if(type === 'repos') {
                result.then((e: AxiosResponse<ServerData[]>) => this.setState({
                    repos: e.data.map( (repo: ServerData) => ({
                            name: repo.name,
                            link: repo.html_url,
                            id: repo.id
                        }))
                }))
            }else {
                result.then((e: AxiosResponse<ServerData[]>) => this.setState({
                    starred: e.data.map( (repo: ServerData) => ({
                            name: repo.name,
                            link: repo.html_url,
                            id:repo.id
                        }))
                }))
            }
        }
    }

    render(): ReactElement {
        return (
            <AppContent
                {...this.state}
                handleSearch={this.handleSearch}
                getRepos={this.getRepos(ReposType.REPOS)}
                getStarred={this.getRepos(ReposType.STARRED)}
            />
        )
    }
}


