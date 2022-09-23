import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import Avatar from "./avatar";
import {
    CloseIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from "../../assets/svg";
import CONSTANT from "../../constants/constant";
import { SET_LANGUAGE } from "../../redux/types";
import "../../assets/styles/dialogStyle.scss";

const Dialog = (props: any) => {
    const { display, title, exit, context, buttons, icon, social, avatars, daremeId, ownerName, wrapExit, sizeType, subcontext, shareType, daremeTitle, isFundme, subTitle, langauge } = props;
    const [lang, setLang] = useState(langauge);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="dialog-wrapper" style={display ? { visibility: 'visible', opacity: 1 } : {}} onClick={wrapExit}>
            <div className="dialog-main" onClick={e => e.stopPropagation()}>
                {icon && icon.pos === 0 && <div className="big-icon">{icon.icon}</div>}
                {(title || exit) &&
                    <div className="dialog-header" style={exit ? { marginBottom: '16px' } : { justifyContent: 'center', marginBottom: '8px' }}>
                        <div className="dialog-title">
                            {title}
                        </div>
                        {exit &&
                            <div onClick={exit}>
                                <CloseIcon color="black" />
                            </div>
                        }
                    </div>
                }
                {langauge &&
                    <div className="dlg-language">
                        {lang === "CH" ?
                            <>
                                <div className="active">
                                    繁體中文
                                </div>
                                <div className="inactive" onClick={() => { setLang('EN') }}>
                                    English
                                </div>
                            </>
                            :
                            <>
                                <div className="inactive" onClick={() => { setLang('CH') }}>
                                    繁體中文
                                </div>
                                <div className="active">
                                    English
                                </div>
                            </>
                        }

                    </div>
                }
                {icon && icon.pos === 1 && <div className="big-icon">{icon.icon}</div>}
                {avatars &&
                    <>
                        {avatars.length === 2 ?
                            <div className="avatars-wrapper">
                                <div className="dialog-avatars">
                                    <div className="owner-avatar">
                                        <Avatar
                                            avatar={avatars[0]}
                                            size="web"
                                        />
                                    </div>
                                    <div className="user-avatar">
                                        <Avatar
                                            avatar={avatars[1]}
                                            size="web"
                                        />
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                {avatars.length === 1 &&
                                    <div className="cover-image">
                                        <img src={avatars[0]} style={sizeType ? { width: 'auto', height: '100%' } : { width: '100%', height: 'auto' }} />
                                    </div>
                                }
                            </>

                        }
                    </>
                }
                {subTitle &&
                    <div className="dialog-subcontext-top-header">
                        <span style={{ whiteSpace: 'pre-line' }}>{subTitle}</span>
                    </div>
                }
                <div className="dialog-context">
                    <span style={{ whiteSpace: 'pre-line' }}>{context}</span>
                </div>
                {subcontext &&
                    <>
                        <div className="dialog-subcontext-top-header">
                            <span style={{ whiteSpace: 'pre-line' }}>🎉 You’ve earned 30 Donuts!</span>
                        </div>
                        <div className="dialog-subcontext-header">
                            <span style={{ whiteSpace: 'pre-line' }}>You can now:</span>
                        </div>
                        <div className="dialog-subcontext">
                            <li>Support Creators with Donuts</li>
                            <li>Take part in their content curation</li>
                            <li>Get exclusive rewards from Creators</li>
                        </div>
                    </>
                }
                {buttons &&
                    <div className="dialog-buttons" style={buttons.length === 2 ? { justifyContent: 'space-between' } : {}}>
                        {
                            buttons.map((button: any, index: any) => (
                                <div key={index}>
                                    <Button
                                        color="primary"
                                        shape="rounded"
                                        fillStyle={index === 0 ? buttons.length === 1 ? "fill" : "outline" : "fill"}
                                        width={buttons.length === 2 ? "75px" : "190px"}
                                        text={button.text}
                                        handleSubmit={langauge ? () => {
                                            dispatch({ type: SET_LANGUAGE, payload: lang });
                                            exit();
                                            navigate("/");
                                        } : button.handleClick}
                                    />
                                </div>
                            ))
                        }
                    </div>
                }
                {social &&
                    <div className="dialog-social">
                        <div className="link" onClick={() => {
                            let text = "";
                            if (isFundme) {
                                text = `I have supported ${ownerName} in ${daremeTitle} on Creato! Join me now!`;
                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${CONSTANT.CLIENT_URL}/fundme/details/${daremeId}&quote=${text}`, 'sharer');
                            }
                            else {
                                if (shareType === "create") text = `I have created a DareMe - ${daremeTitle} on Creato! Join me to create content together with Donuts!`;
                                else if (shareType === "vote") text = `I have supported ${ownerName} in ${daremeTitle} on Creato! Join me now!`;
                                else if (shareType === "win") text = `I have decided the winning Dare in ${daremeTitle}! Stay tuned for more!`;
                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${CONSTANT.CLIENT_URL}/dareme/details/${daremeId}&quote=${text}`, 'sharer');
                            }
                        }}>
                            <FacebookIcon color="#EFA058" />
                        </div>
                        <div className="link" onClick={() => {
                            let text = "";
                            if (isFundme) {
                                text = `I have supported ${ownerName} in ${daremeTitle} on Creato! Join me now!%0a${CONSTANT.CLIENT_URL}/fundme/details/${daremeId}`;
                                window.open(`https://wa.me/?text=${text}`);
                            }
                            else {
                                if (shareType === "create") text = `I have created a DareMe - ${daremeTitle} on Creato! Join me to create content together with Donuts!%0a${CONSTANT.CLIENT_URL}/dareme/details/${daremeId}`;
                                else if (shareType === "vote") text = `I have supported ${ownerName} in ${daremeTitle} on Creato! Join me now!%0a${CONSTANT.CLIENT_URL}/dareme/details/${daremeId}`;
                                else if (shareType === "win") text = `I have decided the winning Dare in ${daremeTitle}! Stay tuned for more!%0a${CONSTANT.CLIENT_URL}/dareme/details/${daremeId}`;
                                window.open(`https://wa.me/?text=${text}`);
                            }
                        }}>
                            <WhatsappIcon color="#EFA058" />
                        </div>
                        <div className="link" onClick={() => {
                            let text = "";
                            if (isFundme) {
                                text = `I have supported ${ownerName} in ${daremeTitle} on Creato! Join me now!`;
                                window.open(`https://twitter.com/share?url=${CONSTANT.CLIENT_URL}/fundme/details/${daremeId}&text=${text}`, 'sharer');
                            }
                            else {
                                if (shareType === "create") text = `I have created a DareMe - ${daremeTitle} on Creato! Join me to create content together with Donuts!`;
                                else if (shareType === "vote") text = `I have supported ${ownerName} in ${daremeTitle} on Creato! Join me now!`;
                                else if (shareType === "win") text = `I have decided the winning Dare in ${daremeTitle}! Stay tuned for more!`;
                                window.open(`https://twitter.com/share?url=${CONSTANT.CLIENT_URL}/dareme/details/${daremeId}&text=${text}`, 'sharer');
                            }
                        }}>
                            <TwitterIcon color="#EFA058" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Dialog;