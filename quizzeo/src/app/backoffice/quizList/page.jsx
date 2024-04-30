import React from "react";
import CreateQuizButton from "../../../components/CreateQuizButton";
import QuizListTile from "../../../components/quizListTile";

// Il s'agit de la page avec la liste des quiz

export default function Page() {
    return (
        <main className="flex flex-col mt-[23px]">
            <section className="flex justify-between">
                <h1 className="text-4xl text-[#84602C]">Liste des quiz</h1>
                <CreateQuizButton />
            </section>
            <section className="grid grid-cols-2 gap-[20px] mt-[50px]">
                {/* Les composants ci-dessous devront être générée dynamiquement à partir de la data provenant du backend */}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
                <QuizListTile
                    setTileStatus={"Brouillon"}
                    setTileTitle={
                        "Enquête de satisfaction suite à la formation Laptop"
                    }
                    setTileAnswersNumber={"27"}
                    setTileDate={"29-04-2024"}
                    setTileOwner={"Product Ownering et Leadership"}
                />{" "}
            </section>
        </main>
    );
}
