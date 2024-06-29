using ApiDependencies.authentication;
using backend.data;
using backend.DTOs.userDto;
using backend.models.user;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.login;

[ApiController]

public class RegisterController: Controller
{
    private readonly smartexiaContext _smartexiaContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly Authentication _firebaseAuth;
    
    public RegisterController(smartexiaContext smartexiaContext, IHttpContextAccessor httpContextAccessor, Authentication firebaseAuth)
    {
        _smartexiaContext = smartexiaContext;
        _httpContextAccessor = httpContextAccessor;
        _firebaseAuth = firebaseAuth;
    }
    
    [HttpPost, Route("/register")]
    public async Task<IActionResult> RegisterUser([FromBody] registerdto registerdto)
    {
        try
        {
            var user = await _smartexiaContext.User.Where(user=>user.email == registerdto.email).FirstOrDefaultAsync();

            if (user is not null)
            {
                return BadRequest(new {message="Account already exists", status=400});
            }

            var token = await _firebaseAuth.Register(registerdto.email, registerdto.password);

            if (token is null) return BadRequest(new{message="Error creating account after Firebase Auth", status=400});
            
            User newUser = new User
            {
                name = registerdto.name,
                email = registerdto.email,
                password = registerdto.password,
            };

            _smartexiaContext.Add(newUser);
            await _smartexiaContext.SaveChangesAsync();
            
            _httpContextAccessor.HttpContext?.Session.SetString("token", token);
            return Ok(new {message="Account created successfully", status=200});
        }
        catch (Exception e)
        {
            Console.WriteLine("Error occured in register controller");
            Console.WriteLine(e);
            throw;
        }
    }
    
}