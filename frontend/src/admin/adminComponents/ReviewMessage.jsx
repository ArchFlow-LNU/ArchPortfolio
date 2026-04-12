import {useState} from "react";
import '../adminCss/ReviewMessage.css'

export default function ExpandableMessage ({ message }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 50;


    if (message.length <= MAX_LENGTH) {
        return <p className="message">{message}</p>;
    }

    return (
        <div className={`message-container ${isExpanded ? "expanded" : ""}`}>
            <p className="message">
                {isExpanded ? message : `${message.substring(0, MAX_LENGTH)}...`}
                <button
                    className="btn-toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? " Close" : " Read more"}
                </button>
            </p>
        </div>
    );
};