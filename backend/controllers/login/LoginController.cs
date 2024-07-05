using ApiDependencies.authentication;
using backend.data;
using backend.DTOs.userDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.login;

[ApiController]

public class LoginController: Controller
{
    private readonly smartexiaContext _smartexiaContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly Authentication _firebaseAuth;
    
    public LoginController(smartexiaContext smartexiaContext, IHttpContextAccessor httpContextAccessor, Authentication firebaseAuth)
    {
        _smartexiaContext = smartexiaContext;
        _httpContextAccessor = httpContextAccessor;
        _firebaseAuth = firebaseAuth;
    }
    
    [HttpPost, Route("/login")]
    public async Task<IActionResult> LoginUser([FromBody] logindto logindto)
    {
        try
        {
            var user = await _smartexiaContext.User.Where(user=>user.email == logindto.email).FirstOrDefaultAsync();

            if (user is not null)
            {
                var token = await _firebaseAuth.Login(logindto.email, logindto.password);
                if (token is "Incorrect Email or Password") return Unauthorized(new{message="Incorrect email or password", status=401});
                
                var decodedToken = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance
                    .VerifyIdTokenAsync(token);
                
                var newUser = _smartexiaContext.User.Where(user => user.email == logindto.email).FirstOrDefault();

                _httpContextAccessor.HttpContext?.Session.SetString("token", token);
                return Ok(new {userId=newUser.id, message="Login successful", status=200});
            }

            return NotFound(new {message = "Account does not exist", status=404});
        }
        catch (Exception e)
        {
            Console.WriteLine("Error occured in login controller");
            Console.WriteLine(e);
            throw;
        }
    }
}