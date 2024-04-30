import React from "react";
import CreateQuizButton from "../../../components/CreateQuizButton";

export default function Page() {
    return (
        <main className="flex flex-col ml-4">
            <h1>List des quiz</h1>
            <CreateQuizButton />
        </main>
    );
}
