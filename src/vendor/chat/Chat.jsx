import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Config from "../Config";
import Navbar from "../Navbar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import parse from "html-react-parser";
import Skeleton from '@mui/material/Skeleton';
// import { LinkPreview } from "@dhaiwat10/react-link-preview";
import CVErrorAlert from './../model-select/CVErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { setEditorSettingStatus } from "../../features/EditorSettingStatusSlice";
import { TextareaAutosize } from "@mui/material";
import { t } from "i18next";
import SearchBarClose from "../../assets/images/assign-page/search-bar-close.svg"
import ChatSearch from "../../assets/images/chat/chat-search.svg"
import ChatSentIcon from "../../assets/images/chat/chat-sent-icon.svg"
import NoChatIcon from "../../assets/images/chat/no-chat-icon.svg"

function Chat(props) {
    Config.redirectIfNotLoggedIn(props);

    const location = useLocation();
    const dispatch = useDispatch();
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value)
    const userDetails = useSelector((state) => state.userDetails.value)

    /* State constants - start */
    const [didMount, setDidMount] = useState(false);
    const [activeChatTab, setActiveChatTab] = useState(1);
    const [searchThreadShow, setSearchThreadShow] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(null)
    const [allChatUsers, setAllChatUsers] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatSearchTerm, setChatSearchTerm] = useState("");
    const [isNoChat, setIsNoChat] = useState(true);
    const [showChatUserSkeleton, setShowChatUserSkeleton] = useState(false);
    const [showMessagesSkeleton, setShowMessagesSkeleton] = useState(false);
    const [allContacts, setAllContacts] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [recentMessages, setRecentMessages] = useState([]);
    const [updateNotification, setUpdateNotification] = useState(0);
    const [chatBoxMessage, setChatBoxMessage] = useState("");
    /* State constants - end */

    /* Ref constants - start */
    const messageInput = useRef(null);
    const threadSearch = useRef(null);
    const chatUserSearch = useRef(null);
    const threadsZone = useRef(null);
    const endThreadSender = useRef(null);
    const endThreadReceiver = useRef(null);
    const socket = useRef(null);
    const isWebSocketStared = useRef(false);
    const oldMessageIds = useRef([]);
    const messagesRef = useRef([]);
    const selectedThreadRef = useRef(null);

    let emptyRef = {};

    const params = new URLSearchParams(window.location.search);
    const threadParam = useRef(params.get("thread"));
    const receiverParam = useRef(params.get("receiver"));
    /* Ref constants - end */
    // const open = Boolean(anchorEl)

    /* Switch between Recent and Contact tabs */
    const activeChatToggle = (tab) => {
        if (activeChatTab != tab) setActiveChatTab(tab);
    };

    /* const fileOptions = [
        'option-1',
        'option-2',
        'option-3',
        'option-4',
    ] */

    // const ITEM_HEIGHT = 48

    /* Whenever the thread and receiver id changes, update */
    useEffect(() => {
        // Don't use if (didMount)
        if (threadParam.current != null && receiverParam.current) {
            updateThreadAndReceiver(parseInt(threadParam.current), parseInt(receiverParam.current));
            setIsNoChat(false);
        }
    }, [threadParam.current, receiverParam.current]);

    useEffect(() => {
        // Don't use if (didMount)
        if (location?.state?.id != null) {
            updateThreadAndReceiver(parseInt(location.state.id), parseInt(location.state.receiverId));
            setIsNoChat(false);
        }
    }, [location?.state?.id]);

    /* To active the most recent chat as active */
    const activeFirstChatUser = () => {
        updateThreadAndReceiver(chatUsers[0]?.thread_id, chatUsers[0]?.receiver_id);
    };

    useEffect(() => {
        setDidMount(true);
        getAllChatUsers();
        if (userDetails?.is_vendor) {
            getEdiorSettingStatus()
        }
        /* Socket starts */
        let endpoint = `${Config.CHAT_BASE_URL.replace("http", "ws")}/marketplace/messages/?${Config.userState.id}`;
        socket.current = new WebSocket(endpoint);
        document.title = '';
        setTimeout(() => {
            document.title = 'Ailaysa | Chat';
        }, 10);
        return () => {
            socket.current.close();
            socket.current = null;
        };

        /* Socket ends */
    }, []);

    const getEdiorSettingStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/vendor/editor_settings_status/`,
            auth: true,
            success: (response) => {
                dispatch(setEditorSettingStatus(response.data['incomplete status']))
            },
            error: (err) => {
                if (err.response?.data?.msg === "Unauthorised" || err.response?.data?.code === "bad_authorization_header") {
                    // AppConfigs.logout();
                }
            }
        });
    }

    // callback is called on intersection change
    const onIntersection = (entries, opts) => {
        entries.forEach((entry) => entry.target.classList.toggle("visible", entry.isIntersecting));
    };

    const checkMessageIsViewed = () => {
        // To check the element is on the browser visible part
        let observer = new IntersectionObserver(onIntersection, {
            root: null, // default is the viewport
            threshold: 0.5, // percentage of taregt's visible area. Triggers "onIntersection"
        });

        // Use the bserver to observe an element
        // observer.observe(document.querySelector('.new-message'))

        // To stop observing:
        // observer.unobserve(entry.target)
    };

    /* Websocket enable */
    const startWebSocket = () => {
        socket.current.onopen = function (e) {
            isWebSocketStared.current = true;
            sendMessage();
        };

        socket.current.onmessage = function (e) {
            let response = JSON.parse(e.data);
            if (response?.thread_id) {
                /* Latest chat user at the top - start */
                if (response?.thread_id !== selectedThreadRef.current) {
                    // setSelectedThread(response?.thread_id)
                    if (response.sent_by !== Config.userState.id)
                        // Only move the recent message to the top if received message not sent message
                        setChatUsers((prevState) => {
                            let currentChatUser = prevState.find((element) => element.thread_id === response?.thread_id);
                            return [currentChatUser, ...prevState.filter((element) => element !== currentChatUser)];
                        });
                } else {
                    socket.current.send(
                        JSON.stringify({
                            command: "mark_messages_read",
                            thread_id: selectedThreadRef.current,
                        })
                    );
                }
                /* Latest chat user at the top - end */
                /* Remove current selected thread notification - start */
                /* setRecentMessages(prevState => {
                    let recentMessageTemp = prevState.find(element => element.thread_id === response?.thread_id)
                    recentMessageTemp.unread_count = 0
                    setTimeout(() => {
                        return [
                            recentMessageTemp, ...prevState.filter(element => element !== recentMessageTemp)
                        ]
                    }, 2000)
                    return [
                        ...prevState
                    ]
                }) */
                /* Remove current selected thread notification - end */
                /* Load new message - start */
                updateNewMessage(response);
                /* Load new message - end */
            }
        };

        socket.current.onerror = function (e) {
            Config.log("On error");
            Config.log(e);
        };

        socket.current.onclose = function (e) {
            isWebSocketStared.current = false;
            Config.log("On close");
            Config.log(e);
        };
    };

    /* Whenever users list and messages changes, remove the empty chat and get the recent message */
    useEffect(() => {
        if (didMount) {
            if (chatUsers?.length || messages?.length) {
                setIsNoChat(false);
                getRecentMessages();
            }
        }
    }, [chatUsers, messages]);

    /* Update a newly sent message in the state */
    const updateNewMessage = (response = null) => {
        if (response) {
            let newMessageObject = response;
            newMessageObject.thread = newMessageObject.thread_id;
            let messageDate = newMessageObject.date;
            delete newMessageObject.date;
            delete newMessageObject.thread_id;
            delete newMessageObject.sent_by;
            let dateIndex = Object.keys(messagesRef.current?.message).indexOf(messageDate);
            if (dateIndex != -1) {
                setMessages((prevState) => ({
                    ...prevState,
                    message: {
                        ...prevState.message,
                        [messageDate]: [...prevState.message[messageDate], newMessageObject],
                    },
                }));
            } else {
                setMessages((prevState) => ({
                    ...prevState,
                    message: {
                        ...prevState.message,
                        [messageDate]: [newMessageObject],
                    },
                }));
            }
        }
    };

    /* Get all the previously chat users and all contacts then also filter if filter applied */
    const getAllChatUsers = (searchTerm = "") => {
        setShowChatUserSkeleton(true);
        let url = `${Config.BASE_URL}/marketplace/get_available_threads/`;
        if (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            let filteredUsers = allChatUsers.filter((element) => element.receiver.toLowerCase().indexOf(searchTerm) != -1);
            setChatUsers(filteredUsers);
            let filteredContacts = allContacts.filter((element) => element.receiver.toLowerCase().indexOf(searchTerm) != -1);
            setContacts(filteredContacts);
        } else
            Config.axios({
                url: url,
                auth: true,
                success: (response) => {
                    setAllChatUsers(response.data?.receivers_list);
                    setChatUsers(response.data?.receivers_list);
                    setAllContacts(response.data?.contacts_list);
                    setContacts(response.data?.contacts_list);
                },
            });
        setShowChatUserSkeleton(false);
    };

    /* Get the recent messages received */
    const getRecentMessages = () => {
        Config.axios({
            url: `${Config.BASE_URL}/marketplace/get_recent_messages`,
            auth: true,
            success: (response) => {
                setRecentMessages(response.data.data);
            },
        });
    };

    /* Whenever all the user set, make the first one as active */
    useEffect(() => {
        if (didMount && selectedThread == null) activeFirstChatUser();
    }, [chatUsers]);

    useEffect(() => {
        messageInput.current?.focus();
    }, [])


    /* Whenever the receiver id and selected thread changes, send the message and also get all the messages */
    useEffect(() => {
        if (didMount) {
            if (!isWebSocketStared.current) startWebSocket();
            if (messageInput.current != null) messageInput.current.value = "";
            setSearchThreadShow(false);
            getMessagesByThreadId();
            sendMessage();
        }
    }, [selectedThread, receiverId]);

    useEffect(() => {
        if (didMount) selectedThreadRef.current = selectedThread;
    }, [selectedThread]);

    /* Get all the messages by thread id */
    const getMessagesByThreadId = () => {
        if (selectedThread) {
            setShowMessagesSkeleton(true);
            let url = `${Config.CHAT_BASE_URL}/marketplace/chat/${selectedThread}`;
            if (chatSearchTerm) url += `?message=${chatSearchTerm}`;
            Config.axios({
                url: url,
                auth: true,
                success: (response) => {
                    setMessages(response.data[0]);
                    setShowMessagesSkeleton(false);
                    setUpdateNotification((prevState) => prevState + 1);
                    /* socket.current.send(JSON.stringify({
                        command: 'mark_messages_read',
                        thread_id: selectedThread
                    })) */
                },
            });
        }
    };

    /* When new message sent or receive scroll to the bottom to make it visible */
    useEffect(() => {
        if (didMount) {
            setTimeout(() => {
                scrollToLastThread();
            }, 200);
            messagesRef.current = messages;
        }
    }, [messages]);

    /* Scroll handler */
    const scrollParentToChild = (parent, child) => {
        // Where is the parent on page
        var parentRect = parent.getBoundingClientRect();
        // What can you see?
        var parentViewableArea = {
            height: parent.clientHeight,
            width: parent.clientWidth,
        };

        // Where is the child
        var childRect = child.getBoundingClientRect();
        // Is the child viewable?
        var isViewable = childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parentViewableArea.height;

        // if you can't see the child try to scroll parent
        if (!isViewable) {
            // Should we scroll using top or bottom? Find the smaller ABS adjustment
            const scrollTop = childRect.top - parentRect.top;
            const scrollBot = childRect.bottom - parentRect.bottom;
            if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
                // we're near the top of the list
                parent.scrollTop += scrollTop;
            } else {
                // we're near the bottom of the list
                parent.scrollTop += scrollBot;
            }
        }
    };

    /* Scroll to the last thread to make it visible */
    const scrollToLastThread = () => {
        // messageInput.current.scrollIntoView()
        let targetElement = endThreadSender?.current ? endThreadSender?.current : endThreadReceiver?.current;
        if (targetElement) scrollParentToChild(threadsZone.current, targetElement);
    };

    const updateThreadAndReceiver = (threadId, tempReceiverId) => {
        setSelectedThread(threadId);
        setReceiverId(tempReceiverId);
    };

    /* Send a new message */
    const sendMessage = () => {
        let message = messageInput.current?.value?.trim();
        console.log(message)
        if (message && selectedThread && receiverId) {
            let htmlEncodedMessage = message.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
                return "&#" + i.charCodeAt(0) + ";";
            });
            let data = {
                command: "message",
                message: htmlEncodedMessage,
                sent_by: Config.userState.id,
                send_to: receiverId,
                thread_id: selectedThread,
            };
            data = JSON.stringify(data);
            socket.current.send(data);
            messageInput.current.value = "";
        }
    };

    /* When search term changes, get the messages */
    useEffect(() => {
        getMessagesByThreadId();
    }, [chatSearchTerm]);

    useEffect(() => {
        if (didMount) {
            if (!searchThreadShow) resetThreadSearch();
        }
    }, [searchThreadShow]);

    /* Reset the messages search */
    const resetThreadSearch = () => {
        setChatSearchTerm("");
        getMessagesByThreadId();
    };

    const searchChatUser = () => {
        getAllChatUsers(chatUserSearch.current?.value);
    };

    const resetChatUserSearch = () => {
        chatUserSearch.current.value = "";
        getAllChatUsers();
    };

    useEffect(() => {
        /* Handle keydown eventHandler - start*/
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                if (messageInput.current?.value?.trim() !== '') {
                    e.preventDefault();
                    sendMessage();
                }
            }
        };
        /* Handle keydown eventHandler - start*/
        if (messageInput?.current) messageInput.current.addEventListener("keydown", handleKeyDown);
        return () => {
            if (messageInput?.current) messageInput.current.removeEventListener("keydown", handleKeyDown);
        };
    });

    /* To keep the message search input focus */
    useEffect(() => {
        if (didMount && searchThreadShow) {
            setTimeout(() => {
                threadSearch.current.focus();
            }, 100);
        }
    }, [searchThreadShow]);

    /* Highlight the term with mark tag */
    const highlightSearchText = (findTerm, text, caseMatch = false, wholeWordMatch = false) => {
        if (findTerm != "" && text != "") {
            let globalMatch, replaceFromRegExp;
            if (!caseMatch) {
                globalMatch = "gi";
                findTerm = findTerm.toLowerCase();
            } else globalMatch = "g";
            // findTerm = findTerm.replace(/\+/g, " ").trim().split(" ").sort((a, b) => b.length - a.length) // This will consider space separated words as different keyword
            findTerm = [findTerm.replace(/\+/g, " ").trim()];
            if (wholeWordMatch)
                replaceFromRegExp = new RegExp(
                    String.raw`(?:\B(?!\w)|\b(?=\w))(?:${findTerm.map((x) => x.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})(?:(?<=\w)\b|(?<!\w)\B)`,
                    globalMatch
                );
            else replaceFromRegExp = new RegExp(String.raw`(?:${findTerm.map((x) => x.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})`, globalMatch);
            text = text.replace(replaceFromRegExp, "<mark>$&</mark>");
            return text;
        }
        return text;
    };

    let isLastThread = false;
    let sameTimeThread = false;
    let firstChar = "";
    let changeFirstChar = true;
    let thisThread = "";
    let convertedDate = "";
    let linkPreviews = "";
    let recentMessage = "";
    let unreadCount = 0;
    let lastTimestamp = "";


    return (
        <React.Fragment>
            <Navbar updateNotification={updateNotification} />
            <section className={"chat-padding-correction " + (isNoChat ? "no-chat-wrapper" : "")}>
                {isIncompleteEditorSettings && (
                    <CVErrorAlert />
                )}
                {isNoChat ? (
                    <section className="no-chat-available-container">
                        <img src={NoChatIcon} alt="no-chat-icon" />
                        <h3>No conversations done yet</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p> */}
                    </section>
                ) : (
                    <div className={"chat-padd-align " + (isIncompleteEditorSettings ? "alert-algin" : "")}>
                        <div className="header-align">
                            <p className="section-header">Chat</p>
                        </div>
                        <div className="transeditor-chat-row">
                            <div className="transeditor-chat-list-col">
                                <div className="chat-search-box">
                                    <div className="chat-search-icon">
                                        <img src={ChatSearch} alt="search" />
                                    </div>
                                    <div className="chat-search-input">
                                        <input ref={chatUserSearch} className="chat-search" placeholder="Search..." onChange={(e) => searchChatUser()} />
                                    </div>
                                </div>
                                <div className="chat-list-tabs-cont">
                                    <div className="chat-list-tabs">
                                        <Nav tabs className="chat-switch-tab">
                                            <NavItem
                                                className={"chat-button-global " + classnames({ active: activeChatTab == 1 })}
                                                onClick={() => {
                                                    activeChatToggle(1);
                                                }}
                                            >
                                                <NavLink className="chat-switch-btn">Recent</NavLink>
                                            </NavItem>
                                            <NavItem
                                                className={"chat-button-global " + classnames({ active: activeChatTab == 2 })}
                                                onClick={() => {
                                                    activeChatToggle(2);
                                                }}
                                            >
                                                <NavLink className="chat-switch-btn">Contact</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <TabContent activeTab={activeChatTab}>
                                        <TabPane tabId={1}>
                                            <ul className="chat-member-list">
                                                {showChatUserSkeleton ? (
                                                    <>
                                                        {Array(8)
                                                            .fill(null)
                                                            .map((value, key) => (
                                                                <li className="chat-user-tile" key={key}>
                                                                    <div className="chat-member-list-details">
                                                                        <Skeleton animation="wave" variant="circle" width={32} height={32} />
                                                                        <div className="chat-member-content">
                                                                            <Skeleton animation="wave" variant="text" style={{ width: 70, height: 10 }} />
                                                                            <Skeleton animation="wave" variant="text" style={{ width: 100, height: 10 }} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="chat-member-time-badge-details">
                                                                        <Skeleton animation="wave" variant="text" style={{ width: 50, height: 10 }} />
                                                                    </div>
                                                                </li>
                                                            ))}
                                                    </>
                                                ) : chatUsers?.length == 0 ? (
                                                    <div className="transeditor-msgs-area-no-found">
                                                        <span>No chats to display</span>
                                                    </div>
                                                ) : (
                                                    chatUsers.map((chatUser) => {
                                                        recentMessage = recentMessages.find((element) => element.thread_id === chatUser?.thread_id)?.last_message
                                                            ? recentMessages.find((element) => element.thread_id === chatUser?.thread_id)?.last_message
                                                            : "";
                                                        unreadCount = recentMessages.find((element) => element.thread_id === chatUser?.thread_id)?.unread_count
                                                            ? recentMessages.find((element) => element.thread_id === chatUser?.thread_id)?.unread_count
                                                            : "";
                                                        lastTimestamp = recentMessages.find((element) => element.thread_id === chatUser?.thread_id)?.last_timestamp
                                                            ? recentMessages.find((element) => element.thread_id === chatUser?.thread_id)?.last_timestamp
                                                            : "";
                                                        return (
                                                            <React.Fragment key={chatUser?.thread_id}>
                                                                {/* <li className="chat-member-selected" key={index}> */}
                                                                <li
                                                                    onClick={() => updateThreadAndReceiver(chatUser?.thread_id, chatUser?.receiver_id)}
                                                                    className={chatUser?.thread_id === selectedThread ? "chat-user-tile-active" : "chat-user-tile"}
                                                                >
                                                                    <div className="chat-member-list-details">
                                                                        {chatUser?.avatar ? (
                                                                            <img src={Config.BASE_URL + chatUser?.avatar} alt="chat-profile-img" />
                                                                        ) : (
                                                                            <span className="no-profile-pic">
                                                                                {chatUser?.receiver
                                                                                    ?.match(/\b(\w)/g)
                                                                                    ?.join("")
                                                                                    ?.toUpperCase()}
                                                                            </span>
                                                                        )}
                                                                        <div className="chat-member-content">
                                                                            <span className="name">{chatUser?.receiver}</span>
                                                                            <span className="recent-msg">{parse(recentMessage)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="chat-member-time-badge-details">
                                                                        <div className="chat-member-time-badge">
                                                                            <span className="time">{Config.convertUTCToLocal(lastTimestamp, "time")}</span>
                                                                            {chatUser?.thread_id !== selectedThread && unreadCount > 0 && (
                                                                                <span className="badge">{unreadCount}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                )}
                                            </ul>
                                        </TabPane>
                                        <TabPane tabId={2}>
                                            <div className="contact-list">
                                                <ul className="chat-member-list">
                                                    {contacts?.length == 0 ? (
                                                        <div className="transeditor-msgs-area-no-found">
                                                            <span>No contacts to display</span>
                                                        </div>
                                                    ) : (
                                                        contacts &&
                                                        contacts.map((contact) => {
                                                            changeFirstChar = firstChar !== contact?.receiver?.charAt(0)?.toLowerCase();
                                                            if (changeFirstChar) firstChar = contact?.receiver?.charAt(0)?.toLowerCase();
                                                            return (
                                                                <React.Fragment key={contact?.thread_id}>
                                                                    {changeFirstChar && Boolean(firstChar.match(/[a-zA-Z]/)) && (
                                                                        <span className="contact-alphaber-sort">{firstChar.toUpperCase()}</span>
                                                                    )}
                                                                    <li
                                                                        onClick={() => updateThreadAndReceiver(contact?.thread_id, contact?.receiver_id)}
                                                                        className={
                                                                            contact?.thread_id === selectedThread ? "chat-user-tile-active" : "chat-user-tile"
                                                                        }
                                                                    >
                                                                        <p className="contact-member-no">{contact?.receiver}</p>
                                                                    </li>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    )}
                                                </ul>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                            <div className="transeditor-chat-area-col">
                                {showMessagesSkeleton ? (
                                    <div className="transeditor-chat-single-person">
                                        <div className="transeditor-chat-single-person-header">
                                            <div className="transeditor-chat-single-member-data">
                                                <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                                <div className="chat-signle-member-content">
                                                    <Skeleton animation="wave" variant="text" style={{ width: 70, height: 10 }} />
                                                    <Skeleton animation="wave" variant="text" style={{ width: 100, height: 10 }} />
                                                </div>
                                            </div>
                                            <div className="chat-single-member-accessible">
                                                <span className="chat-access-icon">
                                                    <Skeleton animation="wave" variant="circle" width={25} height={25} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="transeditor-msgs-area-main">
                                            <div className="transeditor-msgs-area">
                                                <div className="time-delay-separater">
                                                    <span>
                                                        <Skeleton animation="wave" variant="text" style={{ width: 50, height: 10 }} />
                                                    </span>
                                                </div>
                                                <div className="chat-sender-msg">
                                                    <div className="sender-msgs-cont">
                                                        <div className="sender-msg-with-sender-details">
                                                            <div className="sender-name-time-date">
                                                                <span className="time-date">
                                                                    <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                                </span>
                                                            </div>
                                                            <span className="msgs">
                                                                <Skeleton animation="wave" variant="text" style={{ width: 120, height: 10 }} />
                                                                <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-receiver-msg">
                                                    <div className="receiver-msgs-cont">
                                                        <div className="receiver-msg-with-sender-details">
                                                            <div className="receiver-name-time-date">
                                                                <span className="time-date">
                                                                    <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                                </span>
                                                            </div>
                                                            <span className="msgs">
                                                                <Skeleton animation="wave" variant="text" style={{ width: 120, height: 10 }} />
                                                                <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="time-delay-separater">
                                                    <span>
                                                        <Skeleton animation="wave" variant="text" style={{ width: 50, height: 10 }} />
                                                    </span>
                                                </div>
                                                <div className="chat-sender-msg">
                                                    <div className="sender-msgs-cont">
                                                        <div className="sender-msg-with-sender-details">
                                                            <div className="sender-name-time-date">
                                                                <span className="time-date">
                                                                    <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                                </span>
                                                            </div>
                                                            <span className="msgs">
                                                                <Skeleton animation="wave" variant="text" style={{ width: 120, height: 10 }} />
                                                                <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-receiver-msg">
                                                    <div className="receiver-msgs-cont">
                                                        <div className="receiver-msg-with-sender-details">
                                                            <div className="receiver-name-time-date">
                                                                <span className="time-date">
                                                                    <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                                </span>
                                                            </div>
                                                            <span className="msgs">
                                                                <Skeleton animation="wave" variant="text" style={{ width: 120, height: 10 }} />
                                                                <Skeleton animation="wave" variant="text" style={{ width: 60, height: 10 }} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-typing-area">
                                            <span className="chat-type-area">
                                                <Skeleton animation="wave" variant="text" style={{ height: 41 }} />
                                            </span>
                                            <span className="chat-send-icon-main">
                                                <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="transeditor-chat-single-person">
                                        <div className="transeditor-chat-single-person-header">
                                            <div className="transeditor-chat-single-member-data">
                                                {messages?.avatar ? (
                                                    <img src={Config.BASE_URL + messages.avatar} />
                                                ) : (
                                                    <span className="no-profile-header-chat">
                                                        {messages?.user_name
                                                            ?.match(/\b(\w)/g)
                                                            ?.join("")
                                                            ?.toUpperCase()}
                                                    </span>
                                                )}
                                                <div className="chat-signle-member-content">
                                                    <span className="name">{messages?.user_name}</span>
                                                    <span className="comp-name">{messages?.organisation_name}</span>
                                                </div>
                                            </div>
                                            <div className="chat-single-member-accessible">
                                                <div
                                                    className={searchThreadShow ? "chat-member-search-bar-enlarge chat-member-search-bar" : "chat-member-search-bar"}
                                                >
                                                    <input
                                                        ref={threadSearch}
                                                        type="search"
                                                        placeholder="Search...."
                                                        className="assign-search"
                                                        onChange={(e) => setChatSearchTerm(e.target.value)}
                                                        value={chatSearchTerm}
                                                        autoFocus={true}
                                                    />
                                                    <span
                                                        className="close"
                                                        onClick={() => {
                                                            setSearchThreadShow(false);
                                                        }}
                                                    >
                                                        <img src={SearchBarClose} alt="search-bar-close" />
                                                    </span>
                                                    {/* <SearchButton className="search-btn">
                                                        <span><img src={Config.HOST_URL + "assets/images/assign-page/search-icon.svg"} alt="search-icon"/></span>
                                                    </SearchButton> */}
                                                </div>
                                                <span
                                                    onClick={() => {
                                                        setSearchThreadShow(true);
                                                    }}
                                                    className="chat-access-icon"
                                                >
                                                    <img src={ChatSearch} alt="chat-search" />
                                                </span>
                                                {/*
                                                <span className="chat-access-icon" onClick={(e) => { setAnchorEl(e.currentTarget)}}>
                                                    <img src={Config.HOST_URL+"assets/images/chat/chat-vertical-bullet.svg"} alt="chat-bullet"/>
                                                </span>
                                                <Menu
                                                    id="long-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={() => setAnchorEl(null)}
                                                    PaperProps={{
                                                        style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                        width: "200px",
                                                        },
                                                    }}
                                                >
                                                    {fileOptions.map((items) => (
                                                        <MenuItem style={{fontSize: "14px"}} key={items} onClick={() => setAnchorEl(null)}>
                                                        {items}
                                                        </MenuItem>
                                                    ))} 
                                                </Menu>*/}
                                            </div>
                                        </div>
                                        <div ref={threadsZone} className="transeditor-msgs-area-main">
                                            <div
                                                className={
                                                    messages?.message && Object.keys(messages?.message)?.length === 0
                                                        ? "transeditor-msgs-area-no-found"
                                                        : "transeditor-msgs-area"
                                                }
                                            >
                                                {messages?.message &&
                                                    (Object.keys(messages?.message)?.length === 0 ? (
                                                        <span>No message found</span>
                                                    ) : (
                                                        Object.keys(messages?.message)?.sort()?.map((message, index, row) => {
                                                            return (
                                                                <React.Fragment key={message}>
                                                                    <div className="time-delay-separater">
                                                                        <span>
                                                                            {new Date(message).toLocaleString("default", {
                                                                                day: "numeric",
                                                                                month: "long",
                                                                                year: "numeric",
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                    {messages.message[message].map((thread, threadIndex, threadRow) => {
                                                                        isLastThread = index + 1 === row.length && threadIndex + 1 === threadRow.length;
                                                                        sameTimeThread =
                                                                            Config.convertUTCToLocal(thread?.timestamp, "date") +
                                                                            " " +
                                                                            Config.convertUTCToLocal(thread?.timestamp, "time") ===
                                                                            Config.convertUTCToLocal(messages.message[message][threadIndex - 1]?.timestamp, "date") +
                                                                            " " +
                                                                            Config.convertUTCToLocal(
                                                                                messages.message[message][threadIndex - 1]?.timestamp,
                                                                                "time"
                                                                            );
                                                                        linkPreviews = thread?.message
                                                                            ?.match(/\bhttps?:\/\/\S+/gi)
                                                                            // ?.map((link) => (
                                                                            //     <LinkPreview
                                                                            //         url={link?.match(/\bhttps?:\/\/\S+/gi)}
                                                                            //         className="link-preview-container"
                                                                            //     />
                                                                            // ));
                                                                        thisThread = thread?.message;
                                                                        thisThread = highlightSearchText(chatSearchTerm, thisThread);
                                                                        thisThread = thisThread.replace(/\bhttps?:\/\/\S+/gi, (match) => {
                                                                            return `<a target="_blank" href="${match
                                                                                .replaceAll("<mark>", "")
                                                                                .replaceAll("</mark>", "")}">${match}</a>`;
                                                                        });
                                                                        thisThread = parse(thisThread);
                                                                        convertedDate =
                                                                            new Date(Config.convertUTCToLocal(thread?.timestamp, "date")).toLocaleString("en-US", {
                                                                                month: "short",
                                                                                day: "numeric",
                                                                                year: "numeric",
                                                                            }) +
                                                                            " " +
                                                                            Config.convertUTCToLocal(thread?.timestamp, "time");
                                                                        return (
                                                                            <React.Fragment key={thread?.id}>
                                                                                {messages.logged_in_user === thread.user ? ( //Sender
                                                                                    <div
                                                                                        className="chat-sender-msg"
                                                                                        data-true={isLastThread}
                                                                                        ref={
                                                                                            isLastThread
                                                                                                ? endThreadSender
                                                                                                : (element) => {
                                                                                                    emptyRef = element;
                                                                                                }
                                                                                        }
                                                                                    >
                                                                                        <div className="sender-msgs-cont">
                                                                                            {/* {console.log(linkPreviews)} */}
                                                                                            {sameTimeThread ? (
                                                                                                <div className="sender-msg-with-sender-details">
                                                                                                    <span className="msgs"
                                                                                                    // dangerouslySetInnerHTML={{
                                                                                                    //     __html: (linkPreviews != null && linkPreviews != undefined) ? linkPreviews : "" + " " + thisThread
                                                                                                    // }}
                                                                                                    >
                                                                                                        {linkPreviews}
                                                                                                        {thisThread}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ) : (
                                                                                                <div className="sender-msg-with-sender-details">
                                                                                                    <div className="sender-name-time-date">
                                                                                                        <span className="time-date">{convertedDate}</span>
                                                                                                    </div>
                                                                                                    <span className="msgs"
                                                                                                    // dangerouslySetInnerHTML={{
                                                                                                    //     __html: (linkPreviews != null && linkPreviews != undefined) ? linkPreviews : "" + " " + thisThread
                                                                                                    // }}
                                                                                                    >
                                                                                                        {linkPreviews}
                                                                                                        {thisThread}
                                                                                                    </span>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div
                                                                                        className="chat-receiver-msg"
                                                                                        data-true={isLastThread}
                                                                                        ref={
                                                                                            isLastThread
                                                                                                ? endThreadReceiver
                                                                                                : (element) => {
                                                                                                    emptyRef = element;
                                                                                                }
                                                                                        }
                                                                                    >
                                                                                        <div className="receiver-msgs-cont">
                                                                                            {sameTimeThread ? (
                                                                                                <div className="receiver-msg">
                                                                                                    <span className="msgs"
                                                                                                    // dangerouslySetInnerHTML={{
                                                                                                    //     __html: (linkPreviews != null && linkPreviews != undefined) ? linkPreviews : "" + " " + thisThread
                                                                                                    // }}
                                                                                                    >
                                                                                                        {linkPreviews}
                                                                                                        {thisThread}
                                                                                                    </span>
                                                                                                </div>
                                                                                            ) : (
                                                                                                <div className="receiver-msg-with-sender-details">
                                                                                                    <div className="receiver-name-time-date">
                                                                                                        {/* <span className="name">Sathya Prakash</span> */}
                                                                                                        <span className="time-date">{convertedDate}</span>
                                                                                                    </div>
                                                                                                    <span className="msgs"
                                                                                                    // dangerouslySetInnerHTML={{
                                                                                                    //     __html: (linkPreviews != null && linkPreviews != undefined) ? linkPreviews : "" + " " + thisThread
                                                                                                    // }}
                                                                                                    >
                                                                                                        {linkPreviews}
                                                                                                        {thisThread}
                                                                                                    </span>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    ))}
                                            </div>
                                        </div>
                                        <div className="chat-typing-foot-area">
                                            <div className="chat-typing-area">
                                                <span className="chat-type-area">
                                                    <TextareaAutosize
                                                        ref={messageInput} 
                                                        className="sent-input" 
                                                        placeholder="Type a new message"
                                                    />
                                                    {/* <input ref={messageInput} className="sent-input" placeholder="Type a new message" /> */}
                                                </span>
                                                <span className="chat-send-icon-main" onClick={(e) => sendMessage()}>
                                                    <button className="chat-send-icon" type="submit">
                                                        <img src={ChatSentIcon} alt="chat-sent-icon" />
                                                    </button>
                                                </span>
                                            </div>
                                            <span className="multiline-chat-help-text">
                                                <b>Shift + Enter</b> {t("multiline_text_box_help_text")}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </React.Fragment>
    );
}
export default Chat;
