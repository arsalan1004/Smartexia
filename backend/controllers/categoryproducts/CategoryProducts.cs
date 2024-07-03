using backend.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.categoryproducts;

[ApiController]
public class CategoryProducts:Controller
{
    private readonly smartexiaContext _smartexiaContext;
    
    public CategoryProducts(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    [HttpPost]
    [Route("/categoryproducts")]
    public async Task<IActionResult> getCategoryProducts([FromBody]int categoryId)
    {
        try
        {
            if (categoryId == 1)
            {
                var hubs = await _smartexiaContext.Hub.ToListAsync();
                if(!hubs.Any()) return NotFound(new {message = "No hubs found", status = 404});
                return Ok(hubs);
            }
            
            var products = await _smartexiaContext.Product
                .Where(p => p.categoryId == categoryId)
                .Select(p => new { p.id,p.name, p.price, p.imageUrl})
                .ToListAsync();
            if(!products.Any()) return NotFound(new {message="No products found", status = 404});
            
            return Ok(products);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
}