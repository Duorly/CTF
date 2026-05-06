import { useState } from "react";

export default function CreateVote() {

    const [title, setTitle] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");

    function handleCreateVote() {
        console.log(title);
        console.log(option1);
        console.log(option2);
    }

    return (
        <div>
            <h1>Create Vote</h1>
            <input
                type="text"
                placeholder="Vote title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Option 1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
            />

            <input
                type="text"
                placeholder="Option 2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
            />

            <button onClick={handleCreateVote}>
                Create Vote
            </button>


        </div>
    );
}