import { useParams } from "react-router-dom"


export const GroupDetails = () => {

    const { groupId } = useParams()

    return (
        <div>
            Group {groupId}
        </div> 
    )
}