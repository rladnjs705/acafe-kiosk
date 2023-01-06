<script>
  import { LOGIN_WITH_PASSWORD } from '$apollo/query';
  import { authToken } from '$stores';
  import { extractErrors, loginValidateSchema } from '$utils/validates';
  import { GraphQLClient, request, gql } from 'graphql-request'

  let formValues = {
    email: '',
    pwd: ''
  }

  let errors = {}

  const onSubmitLogin = async () => {
    try {
      await loginValidateSchema.validate(formValues, {abortEarly: false});
      loginWithPassword();
    }
    catch(error) {
      errors = await extractErrors(error);
    }
  }

  const onLogin = async () => {
    try {
      // const res = await fetch("/graphql", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type" : "application/json"
      //   },
      //   body: JSON.stringify({query : LOGIN_WITH_PASSWORD})
      // });

      // console.log(res);
      // const result = await res.JSON();
      // console.log(result);
      // const endpoint = 'http://localhost:3000/graphql'
      // const graphQLClient = new GraphQLClient(endpoint, {
      //   method: 'POST',
      //   jsonSerializer: {
      //     parse: JSON.parse,
      //     stringify: JSON.stringify,
      // },})
      //const loginWithPassword = await graphQLClient.request(LOGIN_WITH_PASSWORD, formValues).then((data) => console.log(data));
      const loginWithPassword = request('http://localhost:3000/graphql/', LOGIN_WITH_PASSWORD, {variables: formValues});
      //const result = await loginWithPassword({variables: formValues});
      authToken.saveAuthToken(loginWithPassword);
      router.goto('/');
    }
    catch(error) {
      console.log(error.message)
    }
  }

</script>

<script context="module">
  export const load = async({ fetch }) => {
    const res = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(LOGIN_WITH_PASSWORD)
      });

      console.log(res);
      const { result } = await res.JSON();
      console.log(result);
  }
</script>

<!-- login form start -->
<div class="row d-flex justify-content-center align-items-center content-auth">
  <div class="auth-box">
    <div class="card auth">
      <div class="card-header">
        <h4>로그인</h4>
      </div>
      <div class="card-body">
        <div class="mb-3 input-box">
          <label for="idTextInput" class="form-label">아이디</label>
          <input type="text" class="form-control" bind:value={formValues.email} class:inputError={errors.email}> 
            <span class="invalid-feedback was-validated"></span>
            {#if errors.email}
              <span class="invalid-feedback was-validated">{errors.email}</span>
            {/if}
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label for="pwdTextInput" class="form-label">패스워드</label>
          </div>
          <input type="password" class="form-control" bind:value={formValues.pwd} class:inputError={errors.pwd}/> 
          {#if errors.pwd}
            <span class="invalid-feedback was-validated">{errors.pwd}</span>
          {/if}    
        </div>            
      </div>
      <div class="card-bottom d-flex flex-column">
        <button class="btn btn-primary pt-3 pb-3 mb-3" on:click={onSubmitLogin} >로그인</button>
        <p class="align-self-end">가입되지 않았습니다.<span><a href="/register">[회원가입]</a></span></p>
      </div>
    </div>
  </div>
</div>
<!-- login form end -->