import React from "react";
import CreateQuizButton from "../../../components/CreateQuizButton";
import StatsTable from "../../../components/statsTable";

// Données à supprimer
const mockData = [
    {
        nomDuQuiz: "Contrôle de connaissance mathématique",
        createurQuiz: "JohnDoe",
        resultat: "50",
        dateFin: "30/04/2024",
    },
    {
        nomDuQuiz: "Quiz sur l'histoire de la France",
        createurQuiz: "MarieD",
        resultat: "80",
        dateFin: "25/03/2024",
    },
    {
        nomDuQuiz: "Examen de programmation Java",
        createurQuiz: "PaulM",
        resultat: "92",
        dateFin: "15/05/2024",
    },
    {
        nomDuQuiz: "Questionnaire sur la littérature anglaise",
        createurQuiz: "SarahL",
        resultat: "28",
        dateFin: "10/04/2024",
    },
    {
        nomDuQuiz: "Test de connaissances en biologie",
        createurQuiz: "TomB",
        resultat: "75",
        dateFin: "02/06/2024",
    },
    {
        nomDuQuiz: "Évaluation de compétences en marketing",
        createurQuiz: "EmilyW",
        resultat: "30",
        dateFin: "18/07/2024",
    },
    {
        nomDuQuiz: "Quiz sur les capitales du monde",
        createurQuiz: "DavidS",
        resultat: "62",
        dateFin: "28/02/2024",
    },
    {
        nomDuQuiz: "Examen de physique quantique",
        createurQuiz: "SophieP",
        resultat: "95",
        dateFin: "12/11/2024",
    },
    {
        nomDuQuiz: "Questionnaire sur l'art contemporain",
        createurQuiz: "AlexR",
        resultat: "22",
        dateFin: "06/09/2024",
    },
    {
        nomDuQuiz: "Test de connaissances en économie",
        createurQuiz: "LucasM",
        resultat: "85",
        dateFin: "22/01/2024",
    },
];

// Il s'agit de la page avec le statistiques des quiz

export default function Page() {
    return (
        <main className="flex flex-col mt-[23px] min-w-[800px]">
            <section className="flex justify-between">
                <h1 className="text-4xl text-[#84602C]">Statistiques</h1>
                <CreateQuizButton />
            </section>
            <section>
                <StatsTable quizData={mockData} />
            </section>
        </main>
    );
}
