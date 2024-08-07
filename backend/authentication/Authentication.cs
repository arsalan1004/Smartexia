using Firebase.Auth;

namespace ApiDependencies.authentication;

public class Authentication : IAuthentication
{
    private readonly FirebaseAuthClient _firebaseAuthClient;

    public Authentication(FirebaseAuthClient firebaseAuthClient)
    {
        _firebaseAuthClient = firebaseAuthClient;
    }
    
    // FIREBASE SIGNUP
    public async Task<string?> Register(string email, string password)
    {
        var userCredentials = await _firebaseAuthClient.CreateUserWithEmailAndPasswordAsync(email, password);

        return userCredentials is null ? null : await userCredentials.User.GetIdTokenAsync();
    }
    
    // FIREBASE LOGIN
    public async Task<string?> Login(string email, string password)
    {
        try {
          var userCredentials = await _firebaseAuthClient.SignInWithEmailAndPasswordAsync(email, password);
          
          return userCredentials is null ? null : await userCredentials.User.GetIdTokenAsync();
        } catch (Exception e) {
          var response =  "Incorrect Email or Password";
          return response;
        }
    }

    // FIREBASE LOGOUT
    public void Logout()
    {
        _firebaseAuthClient.SignOut();
    }
}

public interface IAuthentication
{
    
}