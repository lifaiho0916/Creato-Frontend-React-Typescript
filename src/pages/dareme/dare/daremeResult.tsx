import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { daremeAction } from "../../../redux/actions/daremeActions";
import VideoCardDesktop from "../../../components/dareme/videoCardDesktop";
import VideoCardMobile from "../../../components/dareme/videoCardMobile";
import AvatarLink from "../../../components/dareme/avatarLink";
import Title from "../../../components/general/title";
import ContainerBtn from "../../../components/general/containerBtn";
import DareOption from "../../../components/general/dareOption";
import CategoryBtn from "../../../components/general/categoryBtn";
import Dialog from "../../../components/general/dialog";
import RefundDlg from "../../../components/dareme/refundDlg";
import CONSTANT from "../../../constants/constant";
import { LanguageContext } from "../../../routes/authRoute";
import { CreatoCoinIcon, SpreadIcon } from "../../../assets/svg";
import { SET_FANWALL_INITIAL, SET_DIALOG_STATE } from "../../../redux/types";
import "../../../assets/styles/dareme/dare/daremeResultStyle.scss";

const DaremeResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexts = useContext(LanguageContext);
    const { daremeId } = useParams();
    const daremeState = useSelector((state: any) => state.dareme);
    const loadState = useSelector((state: any) => state.load);
    const fanwallState = useSelector((state: any) => state.fanwall);
    const userState = useSelector((state: any) => state.auth);
    const dlgState = useSelector((state: any) => state.load.dlgState)
    const dareme = daremeState.dareme;
    const refundDonuts = daremeState.refundDonuts
    const fanwall = fanwallState.fanwall;
    const [totalDonuts, setTotalDonuts] = useState(0)
    const [resultOptions, setResultOptions] = useState<Array<any>>([])
    const [maxOption, setMaxOption] = useState<any>(null)
    const [isWin, setIsWin] = useState(false)
    const [isStay, setIsStay] = useState(false)
    const [isWinOptionDlg, setIsWinOptionDlg] = useState(false)
    const [winOptionId, setWinOptionId] = useState(false)
    const [optionTitle, setOptionTitle] = useState("")
    const [isCopyLinkDlg, setIsCopyLinkDlg] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [refund, setRefund] = useState(false)
    const [isRefund, setIsRefund] = useState(false)
    const [isMyDonuts, setIsMyDonuts] = useState(false)
    const [isSupport, setIsSupport] = useState(false)
    const [isCopyLink, setIsCopyLink] = useState(false)
    const user = userState.user;

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(daremeAction.getDaremeResult(daremeId));
    }, [location]);

    useEffect(() => {
        if (dareme.title) {
            let total = 0;
            dareme.options.forEach((option: any) => { total += option.option.donuts; });
            setTotalDonuts(total);
            setResultOptions(dareme.options.sort((first: any, second: any) => {
                return first.option.donuts > second.option.donuts ? -1 : first.option.donuts < second.option.donuts ? 1 :
                    first.option.date < second.option.date ? 1 : first.option.date > second.option.date ? -1 : 0;
            }));
        }
    }, [dareme]);

    useEffect(() => {
        if (resultOptions.length) {
            setMaxOption(resultOptions.reduce((prev: any, current: any) => (prev.option.donuts > current.option.donuts) ? prev : current));
            setIsWin(resultOptions.filter((option: any) => option.option.win === true).length ? true : false);
        }
    }, [resultOptions]);

    useEffect(() => {
        if (dlgState.state) {
            if (dlgState.type === 'refund_donuts') setRefund(true)
        }
    }, [dlgState])

    const calcTime = (time: any) => {
        if (time > 1) return Math.ceil(time) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.DAYS
        if ((time * 24) > 1) return Math.ceil(time * 24) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.HOURS
        if ((time * 24 * 60) > 1) return Math.ceil(time * 24 * 60) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.MINS
        if (time > 0) return "1" + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.MIN

        const passTime = Math.abs(time);
        if ((passTime / 7) > 1) return Math.ceil((passTime / 7)) + (Math.ceil((passTime / 7)) === 1 ? contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.WEEK : contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.WEEKS) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.AGO
        if (passTime > 1) return Math.ceil(passTime) + (Math.ceil(passTime) === 1 ? contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.DAY : contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.DAYS) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.AGO
        if ((passTime * 24) > 1) return Math.ceil(passTime * 24) + (Math.ceil(passTime * 24) === 1 ? contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.HOUR : contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.HOURS) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.AGO
        if ((passTime * 24 * 60) > 1) return Math.ceil(passTime * 24 * 60) + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.MINS + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.AGO
        if (passTime > 0) return "1" + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.MIN + contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.AGO
    }

    return (
        <>
            <div className="title-header">
                <Title
                    title={contexts.HEADER_TITLE.DAREME_RESULT}
                    back={() => { navigate(loadState.prevRoute) }}
                    voters={() => { navigate(`/dareme/${daremeId}/voters`) }}
                    ownerId={dareme?.owner?._id}
                />
            </div>
            {(maxOption && dareme.owner) &&
                <div className="dareme-result">
                    <RefundDlg
                        confirm={true}
                        display={isSupport}
                        wrapExit={() => { setIsSupport(false) }}
                        exit={() => { setIsSupport(false) }}
                        title={'Confirm:'}
                        dareme={dareme}
                        refund={refundDonuts ? refundDonuts : 0}
                        buttons={[
                            {
                                text: 'Back',
                                handleClick: () => {
                                    setIsSupport(false)
                                    setRefund(true)
                                }
                            },
                            {
                                text: 'Send',
                                handleClick: () => {
                                    setIsCopied(false)
                                    setIsSupport(false)
                                    setIsCopyLink(true)
                                    dispatch({ type: SET_DIALOG_STATE, payload: { type: '', state: false } })
                                    dispatch(daremeAction.supportRefund(daremeId))
                                }
                            }
                        ]}
                    />
                    <RefundDlg
                        display={refund}
                        wrapExit={() => {
                            setRefund(false)
                            dispatch({ type: SET_DIALOG_STATE, payload: { type: '', state: false } })
                        }}
                        exit={() => {
                            setRefund(false)
                            dispatch({ type: SET_DIALOG_STATE, payload: { type: '', state: false } })
                        }}
                        title={'Winning Dare:'}
                        dareme={dareme}
                        refund={refundDonuts ? refundDonuts : 0}
                        buttons={[
                            {
                                text: 'No',
                                handleClick: () => {
                                    setRefund(false)
                                    setIsRefund(true)
                                }
                            },
                            {
                                text: 'Yes',
                                handleClick: () => {
                                    setRefund(false)
                                    setIsSupport(true)
                                }
                            }
                        ]}
                    />
                    <Dialog
                        display={isRefund}
                        wrapExit={() => { setIsRefund(false); }}
                        exit={() => { setIsRefund(false); }}
                        title={'Confirm:'}
                        context={'Donuts will be refunded to you.'}
                        buttons={[
                            {
                                text: 'No',
                                handleClick: () => {
                                    setIsRefund(false)
                                }
                            },
                            {
                                text: 'Yes',
                                handleClick: () => {
                                    setIsRefund(false)
                                    setIsMyDonuts(true)
                                    dispatch(daremeAction.refundDonuts(refundDonuts, daremeId))
                                }
                            }
                        ]}
                    />
                    <Dialog
                        display={isCopyLink}
                        title={'I supported:'}
                        avatars={[
                            dareme.owner.avatar.indexOf('uploads') === -1 ? dareme.owner.avatar : `${CONSTANT.SERVER_URL}/${dareme.owner.avatar}`,
                            user ? user.avatar.indexOf('uploads') === -1 ? user.avatar : `${CONSTANT.SERVER_URL}/${user.avatar}` : ""
                        ]}
                        exit={() => { setIsCopyLink(false) }}
                        wrapExit={() => { setIsCopyLink(false) }}
                        context={`Congratulations! You have supported ${dareme.owner.name} on ${dareme.title}`}
                        buttons={[
                            {
                                text: isCopied ? contexts.DIALOG.BUTTON_LETTER.COPIED : contexts.DIALOG.BUTTON_LETTER.COPY_LINK,
                                handleClick: () => {
                                    navigator.clipboard.writeText(`${CONSTANT.CLIENT_URL}/dareme/result/${daremeId}`);
                                    setIsCopied(true);
                                }
                            }
                        ]}
                        social
                        ownerName={dareme.owner.name}
                        daremeId={daremeId}
                        shareType={"vote"}
                        daremeTitle={dareme.title}
                    />
                    <Dialog
                        display={isMyDonuts}
                        wrapExit={() => { setIsMyDonuts(false); }}
                        exit={() => { setIsMyDonuts(false); }}
                        title={'Confirm:'}
                        context={`${refundDonuts} Donuts has been returned to you.`}
                        buttons={[
                            {
                                text: 'Check My Donuts',
                                handleClick: () => {
                                    setIsMyDonuts(false)
                                    navigate(`/${user.personalisedUrl}/wallet`)
                                }
                            }
                        ]}
                    />
                    <Dialog
                        display={isStay}
                        wrapExit={() => { setIsStay(false); }}
                        title={contexts.DIALOG.HEADER_TITLE.STAY_TUNED}
                        context={contexts.DIALOG.BODY_LETTER.BEFORE_FANWALL}
                        icon={{
                            pos: 0,
                            icon: <SpreadIcon color="#EFA058" width="60px" height="60px" />
                        }}
                    />
                    <Dialog
                        display={isWinOptionDlg}
                        exit={() => { setIsWinOptionDlg(false) }}
                        wrapExit={() => { setIsWinOptionDlg(false) }}
                        title="DareMe"
                        context={contexts.DIALOG.BODY_LETTER.CONFIRM_WIN_BEFORE + " " + optionTitle + " " + contexts.DIALOG.BODY_LETTER.CONFIRM_WIN_OPTION_AFTER}
                        buttons={[
                            {
                                text: contexts.DIALOG.BUTTON_LETTER.CONFIRM,
                                handleClick: () => {
                                    setIsCopied(false);
                                    setIsWinOptionDlg(false);
                                    dispatch(daremeAction.winDareOption(winOptionId, daremeId));
                                    setIsCopyLinkDlg(true);
                                }
                            }
                        ]}
                    />
                    <Dialog
                        display={isCopyLinkDlg}
                        title={contexts.DIALOG.HEADER_TITLE.CONGRAT}
                        wrapExit={() => { setIsCopyLinkDlg(false) }}
                        context={optionTitle + " " + contexts.DIALOG.BODY_LETTER.WIN_CONG}
                        buttons={[
                            {
                                text: isCopied ? contexts.DIALOG.BUTTON_LETTER.COPIED : contexts.DIALOG.BUTTON_LETTER.COPY_LINK,
                                handleClick: () => {
                                    navigator.clipboard.writeText(`${CONSTANT.CLIENT_URL}/dareme/details/${daremeId}`);
                                    setIsCopied(true);
                                }
                            }
                        ]}
                        social
                        ownerName={dareme.owner.name}
                        daremeId={daremeId}
                        shareType={"win"}
                        daremeTitle={dareme.title}
                    />
                    <div className="dareme-result-videoCardDesktop">
                        <VideoCardDesktop
                            url={`${CONSTANT.SERVER_URL}/${dareme.teaser}`}
                            sizeType={dareme.sizeType}
                            coverImage={dareme.cover ? `${CONSTANT.SERVER_URL}/${dareme.cover}` : ""}
                        />
                        <AvatarLink
                            username={dareme.owner.name}
                            avatar={dareme.owner.avatar}
                            ownerId={dareme.owner._id}
                            handleAvatar={() => { navigate(`/${dareme.owner.personalisedUrl}`) }}
                            daremeId={dareme._id}
                        />
                    </div>
                    <div className="dareme-result-information">
                        <div className="dareme-result-videoCardMobile">
                            <VideoCardMobile
                                url={CONSTANT.SERVER_URL + "/" + dareme.teaser}
                                title={dareme.title}
                                time={dareme.time}
                                finished={dareme.finished}
                                donuts={totalDonuts}
                                category={contexts.DAREME_CATEGORY_LIST[dareme.category - 1]}
                                sizeType={dareme.sizeType}
                                coverImage={dareme.cover ? `${CONSTANT.SERVER_URL}/${dareme.cover}` : ""}
                            />
                            <AvatarLink
                                avatar={dareme.owner.avatar}
                                username={dareme.owner.name}
                                ownerId={dareme.owner._id}
                                handleAvatar={() => { navigate(`/${dareme.owner.personalisedUrl}`) }}
                                daremeId={dareme._id}
                                isFundme={true}
                            />
                        </div>
                        <div className="desktop-header-info">
                            <div className="time-info">
                                <div className="left-time">
                                    {dareme.finished && contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.ENDED} {calcTime(dareme.time)} {!dareme.finished && contexts.GENERAL_COMPONENT.MOBILE_VIDEO_CARD.LEFT}
                                </div>
                                <div className="vote-info">
                                    <CreatoCoinIcon color="black" />
                                    <span>{totalDonuts !== null ? totalDonuts.toLocaleString() : ''}</span>
                                </div>
                            </div>
                            <div className="dare-title">{dareme.title}</div>
                            <div className="dare-category">
                                <CategoryBtn text={contexts.DAREME_CATEGORY_LIST[dareme.category - 1]} color="primary" />
                            </div>
                        </div>
                        <div className="result-info">
                            <div className="result-win-options">
                                {resultOptions.length > 0 &&
                                    <>
                                        {isWin ?
                                            resultOptions.filter((option: any) => option.option.win === true).map((option: any, i: any) => (
                                                <div key={i} style={{ marginBottom: '8px' }}>
                                                    <DareOption
                                                        dareTitle={option.option.title}
                                                        donuts={option.option.donuts}
                                                        voters={option.option.voters}
                                                        canVote={false}
                                                        disabled={false}
                                                        username={option.option.writer.name}
                                                        leading={true}
                                                        handleSubmit={() => { }}
                                                    />
                                                </div>
                                            ))
                                            :
                                            resultOptions.filter((option: any) => option.option.donuts === maxOption.option.donuts).map((option: any, i: any) => (
                                                <div key={i} style={{ marginBottom: '8px' }}>
                                                    <DareOption
                                                        dareTitle={option.option.title}
                                                        donuts={option.option.donuts}
                                                        voters={option.option.voters}
                                                        canVote={false}
                                                        disabled={false}
                                                        username={option.option.writer.name}
                                                        leading={true}
                                                        handleSubmit={() => {
                                                            if (dareme.owner._id === user.id && user) {
                                                                setWinOptionId(option.option._id);
                                                                setOptionTitle(option.option.title);
                                                                setIsWinOptionDlg(true);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </>
                                }
                            </div>
                            {!isWin ?
                                <div className="tie-letter">
                                    {(user && dareme.owner._id === user.id) ?
                                        <span>
                                            Please decide which Dare option wins!<br /><br />
                                        </span>
                                        :
                                        <span>
                                            {contexts.DAREME_FINISHED.BEFORE_CREATOR_NAME + " " + dareme.owner.name + " " + contexts.DAREME_FINISHED.AFTER_CREATOR_NAME}
                                        </span>
                                    }
                                </div>
                                :
                                <div className="result-button">
                                    {user && dareme.owner._id === user.id ?
                                        <>
                                            {fanwall && fanwall.writer && fanwall.posted === true ?
                                                <>
                                                    <div onClick={() => {
                                                        dispatch({ type: SET_FANWALL_INITIAL });
                                                        navigate(`/dareme/fanwall/detail/${fanwall._id}`);
                                                    }} >
                                                        <ContainerBtn text={contexts.DAREME_FINISHED.VIEW_ON_FANWALL} styleType="fill" />
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div onClick={() => { dispatch(daremeAction.postFanwall(dareme._id, navigate)); }}>
                                                        <ContainerBtn text="Post on Fanwall" styleType="fill" />
                                                    </div>
                                                </>
                                            }
                                        </> :
                                        <>
                                            <div onClick={() => {
                                                if (fanwall === null || fanwall.posted === null || (fanwall.writer && fanwall.posted === false)) setIsStay(true);
                                                else {
                                                    dispatch({ type: SET_FANWALL_INITIAL });
                                                    navigate(`/dareme/fanwall/detail/${fanwall._id}`);
                                                }
                                            }}>
                                                <ContainerBtn text={contexts.DAREME_FINISHED.VIEW_ON_FANWALL} styleType="fill" />
                                            </div>
                                        </>
                                    }
                                </div>
                            }
                            <div className="dare-options scroll-bar" style={!isWin ? { maxHeight: '130px' } : {}}>
                                {isWin ?
                                    resultOptions.filter((option: any) => option.option.win !== true).map((option: any, i: any) => (
                                        <div key={i} className="dare-option">
                                            <DareOption
                                                dareTitle={option.option.title}
                                                donuts={option.option.donuts}
                                                voters={option.option.voters}
                                                canVote={false}
                                                disabled={false}
                                                username={option.option.writer.name}
                                                leading={false}
                                                handleSubmit={() => { }}
                                            />
                                        </div>
                                    ))
                                    :
                                    resultOptions.filter((option: any) => option.option.donuts !== maxOption.option.donuts).map((option: any, i: any) => (
                                        <div key={i} className="dare-option">
                                            <DareOption
                                                dareTitle={option.option.title}
                                                donuts={option.option.donuts}
                                                voters={option.option.voters}
                                                canVote={false}
                                                disabled={false}
                                                username={option.option.writer.name}
                                                leading={false}
                                                handleSubmit={() => { }}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default DaremeResult;
