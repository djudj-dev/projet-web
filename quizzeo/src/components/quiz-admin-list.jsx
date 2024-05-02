'use client' 
import { useQuery} from "react-query"
import { getAuthApi } from "../lib/client-fetch";
import { Spinner } from "./spinner";
import { QuizStatList } from "./quiz-stat-list";
1
export const QuizResultList = ({ user, jwt }) => {

    const { data, isLoading, error } = useQuery ({
        queryKey: "quiz-admin-list",
        queryFn: () => getAuthApi("auth/quiz/"+user.id, jwt),
        enabled: user !== undefined
    })
    
    if (data) {
        return (
            <>
                { Object.entries(data).length === 0 && 
                    <p>Vous n'avez fait aucun quiz pour l'instant</p>
                }
                {
                    Object.values(data).map((quiz, index) =>  (
                        <QuizStatList { ...{ quiz, user, key: index}} />
                    ))
                }
            </>
        )
    }

    return <Spinner />
}
