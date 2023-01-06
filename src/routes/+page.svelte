<script>
    import { setClient } from 'svelte-apollo';
    import apolloClient from '../lib/apollo/apollo-client'
    import Menu from './menu/+page.svelte';
    import { authToken, auth } from '$stores';

    setClient(apolloClient);

    $: {
        if($authToken) {
            auth.createAuth();
        }
        else {
            auth.resetAuth();
        }
    }

    const initAuth = async () => {
    if($authToken) {
        await auth.createAuth();
    }
        return;
    }

</script>
{#await initAuth() then initAuth}
    <Menu />
{/await}