import { VscLoading } from 'react-icons/vsc';

import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-page">
            {/* <h1 className="pb-3">Loading...</h1> */}
            <div className="loading-icon-wrapper">
                <VscLoading className="loading-icon"/>
            </div>
        </div>
    );
};

export default Loading;