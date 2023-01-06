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
      onLogin();
    }
    catch(error) {
      errors = await extractErrors(error);
    }
  }

  const onLogin = async () => {
    try {
      const endpoint = 'http://localhost:4000/graphql'

      const graphQLClient = new GraphQLClient(endpoint, {
      })
      const result = await graphQLClient.request(LOGIN_WITH_PASSWORD, formValues).then((data) => console.log(data));
      //const loginWithPassword = request('http://localhost:4000/graphql/', query, {variables: formValues});
      //const result = await loginWithPassword({variables: formValues});
      authToken.saveAuthToken(result);
      router.goto('/');
    }
    catch(error) {
      console.log(error.message)
    }
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