// const Group = () => {
//     const { data, loading, error } = useQuery(GET_GROUP)
//     const [joinGroup] = useMutation(JOIN_GROUP)
//     const [leaveGroup] = useMutation(LEAVE_GROUP)
//     const [deleteGroup] = useMutation(DELETE_GROUP)
//     const [updateGroup] = useMutation(UPDATE_GROUP)

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error...</p>

//     const group = data?.group;

//     const handleJoinGroup = async () = {
//         await joinGroup({ variables: { id: group.id, userId: user.id } })
//     }
// }