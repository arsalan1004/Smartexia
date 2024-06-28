using ApiDependencies.authentication;
using ApiDependencies.filters.authFiler;
using backend.data;
using backend.DTOs.userDto;
using backend.models.user;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.login;

[ApiController]
[Route("/api")]
public class GoogleSignupController:Controller
{
    private readonly smartexiaContext _smartexiaContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly Authentication _firebaseAuth;
    
    public GoogleSignupController(smartexiaContext smartexiaContext, IHttpContextAccessor httpContextAccessor, Authentication firebaseAuth)
    {
        _smartexiaContext = smartexiaContext;
        _httpContextAccessor = httpContextAccessor;
        _firebaseAuth = firebaseAuth;
    }
    
    [HttpPost] 
    [Route("/googleSignup")]
    [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> GoogleSignup([FromBody] googlesignupdto googlesignupdto)
    {
        try
        {
            List<User> user = await _smartexiaContext.User.Where(user => user.email == googlesignupdto.email).ToListAsync();
            
            if(user.Any())
            {
                _httpContextAccessor.HttpContext?.Session.SetString("token", googlesignupdto.token);
                return Ok(new {message = "Login Successful", status = 200});
            }

            _smartexiaContext.User.Add(new User
            {
                name = googlesignupdto.name,
                email = googlesignupdto.email,
            });
            await _smartexiaContext.SaveChangesAsync();
            _httpContextAccessor.HttpContext?.Session.SetString("token", googlesignupdto.token);
            return Ok(new {message = "Signup Successful", status = 200});
        }
        catch (Exception e)
        {
            Console.WriteLine("Error occured in googleSignup controller");
            Console.WriteLine(e);
            throw;
        }
    }
}