import { useQuery } from "@apollo/client"
import { QUERY_ALL_GROUPS } from "../utils/queries";

const Discover = () => {
    const  { data, loading, error } = useQuery(QUERY_ALL_GROUPS);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    return (
        <div>
            <h1>Groups</h1>
            <ul>
                {data.groups.map((group: any) => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Discover;