import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
    const [currentMsg, setCurrentMsg] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMsg !== '') {
            const messageData = {
                room: room,
                username: username,
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMsg("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Live Chat
                        </h2>
                    </div>
                    <div className='chat-body h-96'>
                        <ScrollToBottom className='message-container h-full'>
                            {messageList.map((msgContent) => {
                                return (
                                    <div className="message" id={username === msgContent.username ? "you" : "other"}>
                                        <div>
                                            <div className="message-content">
                                                <p>{msgContent.message}</p>
                                            </div>
                                            <div className="message-meta">
                                                <p>{msgContent.time}</p>
                                                <p>{msgContent.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </ScrollToBottom>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label className="sr-only">
                                    Message
                                </label>
                                <input
                                    type="text"
                                    value={currentMsg}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Say Something...."
                                    onChange={(e) => setCurrentMsg(e.target.value)}
                                    onKeyDown={(e) => {
                                        e.key === "Enter" && sendMessage();
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;