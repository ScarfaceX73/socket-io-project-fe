import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import Chat from './chat';

const socket = io.connect("socket-io-project-be-production.up.railway.app");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [toggle, setToggle] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
      setToggle(true);
    }
  }

  return (
    <div className="">
      {!toggle ? (
        <div>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Join Room
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label className="sr-only">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Username..."
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="sr-only">
                      Room
                    </label>
                    <input
                      type="text"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Room..."
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={joinRoom}
                  >
                    Join Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
        : (<Chat socket={socket} username={username} room={room} />)}
    </div>
  );
}

export default App;
