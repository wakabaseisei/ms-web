"use client";

import { useState } from "react";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";

import { GreetService } from "@buf/wakabaseisei_ms-protobuf.bufbuild_es/ms/apifront/v1/api_pb";

export default function Home() {
  const [greet, setGreet] = useState("");
  const [name, setName] = useState("");
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const transport = createConnectTransport({
    baseUrl: baseUrl,
  });

  const client = createClient(GreetService, transport);

  const handleGreetButtonClick = async () => {
    const res = await client.greet({
      name: name,
    });
    setGreet(res.greeting);
  };

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <p>{greet}</p>
      <div>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={handleNameInputChange}
        />
      </div>
      <button onClick={handleGreetButtonClick}>Call</button>
    </>
  );
}
