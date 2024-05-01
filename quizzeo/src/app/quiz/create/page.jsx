import { QuizCreatorPage } from "../../../components/quiz-generator";

export default function Page({ params }) {
    return (
        <div className="flex-auto w-max-[800px text-[#84602C] max-w-3xl mx-auto pt-8 pb-12 font-sans">
            <section className="text-center my-6">
                <h1 className="text-3xl font-bold">Créer votre quiz</h1>
                <p className="mt-6 text-lg">
                    Créer des quiz en quelques secondes et obtenez un feedback
                    immédiat et en temps réel <br></br>Gratuit et illimité
                </p>
            </section>
            <QuizCreatorPage />
        </div>
    );
}
