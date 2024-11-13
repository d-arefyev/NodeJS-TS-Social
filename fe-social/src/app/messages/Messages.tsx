// messages/Messages.tsx
"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Messages() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((prevEvents) => [...prevEvents, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="p-4">
      <h1>Socket Connection Status: {isConnected ? "Connected" : "Disconnected"}</h1>
      <ConnectionManager />
      <MyForm />
      <div className="mt-4">
        <h2>Foo Events:</h2>
        <ul>
          {fooEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConnectionManager() {
  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  return (
    <div className="space-x-2">
      <button onClick={connect} className="px-4 py-2 bg-green-500 text-white">Connect</button>
      <button onClick={disconnect} className="px-4 py-2 bg-red-500 text-white">Disconnect</button>
    </div>
  );
}

function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        placeholder="Enter message"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
