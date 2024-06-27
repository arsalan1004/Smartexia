using backend.data;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers.login;

[ApiController]
public class loginController: Controller
{
    private readonly supabaseContext _supabaseContext;
    
    public loginController(supabaseContext supabaseContext)
    {
        _supabaseContext = supabaseContext;
    }
    
    [HttpGet, Route("/api/login")]
    public async Task<IActionResult> loginUser()
    {
        var users =   _supabaseContext.User.ToList();

        if (users.Any())
        {
            return Ok(users);
        }
        return NotFound();
    }
}