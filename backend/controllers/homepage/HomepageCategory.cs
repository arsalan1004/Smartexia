using ApiDependencies.filters.authFiler;
using backend.data;
using backend.models.category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.homepage;

[ApiController]
public class HomepageCategory:Controller
{
    private readonly smartexiaContext _smartexiaContext;

    public HomepageCategory(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }

    [HttpGet]
    [Route("/homepage/categories")]
    [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> getCategories()
    {
        try
        {
            List<Category> categories = await _smartexiaContext.Category.ToListAsync();
            
            if(!categories.Any()) return NotFound(new {message = "No categories found", status = 404});
            
            return Ok(categories);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
            throw;
        }
    }
}