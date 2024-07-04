using ApiDependencies.filters.authFiler;
using backend.data;
using backend.models.category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.homepage;

[ApiController]
public class HomepageProducts:Controller
{

    private readonly smartexiaContext _smartexiaContext;
    
    public HomepageProducts(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    [HttpGet]
    [Route("/homepage/categories")]
    // [ServiceFilter(typeof(TokenAuthenticationFilter))]
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
    
    [HttpGet]
    [Route("/homepage/discountedproducts")]
    // [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> GetDiscountedProducts()
    {
        try
        {
            var products = await _smartexiaContext.Product
                .Skip(0)
                .Take(10)
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
    
    [HttpGet]
    [Route("/homepage/featuredproducts")]
    // [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> GetFeaturedProducts()
    {
        try
        {
            var products = await _smartexiaContext.Product
                .Skip(20)
                .Take(15)
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
    
    [HttpGet]
    [Route("/homepage/newproducts")]
    // [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> GetNewProducts()
    {
        try
        {
            var products = await _smartexiaContext.Product
                .Skip(60)
                .Take(20)
                .Select(p => new {p.id, p.name, p.price, p.imageUrl})
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
    
    [HttpGet]
    [Route("/homepage/bestsellingproducts")]
    // [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> GetBestsellingProducts()
    {
        try
        {
            var products = await _smartexiaContext.Product
                .Skip(75)
                .Take(90)
                .Select(p => new { p.id, p.name, p.price, p.imageUrl})
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
