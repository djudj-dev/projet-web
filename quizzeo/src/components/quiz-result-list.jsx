'use client' 
import { useQuery} from "react-query"
import { getApi } from "../lib/client-fetch";
import { QuizResult } from"./quiz-result";
import { Spinner } from "./spinner"
1
export const QuizResultList = ({ user }) => {

    const { data, isLoading, error } = useQuery ({
        queryKey: "user-results",
        queryFn: () => getApi("result/"+user.id),
        enabled: user !== undefined
    })
    
    if (data) {
        return (
            <>
                { Object.entries(data).length === 0 && 
                    <p>Vous n'avez fait aucun quiz pour l'instant</p>
                }
                {
                    Object.values(data).map((value) =>  {
                        const {
                            date,
                            score,
                            quiz: {
                                title
                            }
                        } = value
                        return <QuizResult { ...{score, title, date }} />
                    })
                }
            </>
        )
    }

    return <Spinner />
}
