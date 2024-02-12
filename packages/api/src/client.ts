import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
    url: 'https://dd-hasura.purduearc.com/v1/graphql',
    fetchParams() {
        return {
            headers: {
                'x-hasura-admin-secret': import.meta.env.VITE_GRAPHQL_ADMIN_SECRET,
            },
        }
    }
})
