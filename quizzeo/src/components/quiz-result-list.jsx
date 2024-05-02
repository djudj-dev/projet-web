'use client' 
import { useQuery} from "react-query"
import { getAuthApi } from "../lib/client-fetch";
import { QuizResult } from"./quiz-result";
import { Spinner } from "./spinner"
1
export const QuizResultList = ({ user, jwt }) => {

    const { data } = useQuery ({
        queryKey: "user-results",
        queryFn: () => getAuthApi("auth/result/"+user.id, jwt),
        enabled: user !== undefined
    })
    
    if (data) {
        return (
            <>
                { Object.entries(data).length === 0 && 
                    <p>Vous n'avez fait aucun quiz pour l'instant</p>
                }
                {
                    Object.values(data).map((value, index) =>  {
                        const {
                            date,
                            score,
                            quiz: {
                                title
                            }
                        } = value
                        return <QuizResult { ...{score, title, date, key: index }} />
                    })
                }
            </>
        )
    }

    return <Spinner />
}
