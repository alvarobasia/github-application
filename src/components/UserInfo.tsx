import React, {ReactElement} from "react";
import {UserInfoType} from './app-content'

type UserInfoContent = {
    userInfo: UserInfoType;
}
const UserInfo = ({userInfo}: UserInfoContent ): ReactElement => (
    <div className='user-info'>
        <img src={userInfo.photo} alt='Github avatar' />
        <h1>
            <a
                target={'_blank'}
                rel="noopener noreferrer"
                href={`https://github.com/${userInfo.gitHubLogin}`}>
                {userInfo.username}
            </a>
        </h1>
        <ul className="repos-info">
            <li>Repositórios: {userInfo.repos}</li>
            <li>Seguidores: {userInfo.followers}</li>
            <li>Seguindo: {userInfo.following}</li>
        </ul>
    </div>
)

export default UserInfo