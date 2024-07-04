using ApiDependencies.DTOs.categorydto;
using backend.data;
using backend.services.productDetailsServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.categoryproducts;

[ApiController]
public class CategoryProducts:Controller
{
    private readonly smartexiaContext _smartexiaContext;
    private readonly ProductRatingsService _productRatingsService;
    
    public CategoryProducts(smartexiaContext smartexiaContext, ProductRatingsService productRatingsService)
    {
        _smartexiaContext = smartexiaContext;
        _productRatingsService = productRatingsService;
    }
    
    [HttpPost]
    [Route("/categoryproducts")]
    public async Task<IActionResult> getCategoryProducts([FromBody]categorydto category)
    {
        try
        {
            Console.WriteLine($"categoryId: {category.categoryId}");

            if (category.categoryId == 1)
            {
                var hubs = await _smartexiaContext.Hub.ToListAsync();

                if(!hubs.Any()) return NotFound(new {message = "No hubs found", status = 404});
                Console.WriteLine(hubs);
                return Ok(hubs);
            
            }
            
            var products = await _smartexiaContext.Product
                .Where(p => p.categoryId == category.categoryId)
                .ToListAsync();

            var productRatings = new List<object>();

            foreach (var p in products)
            {
                var ratingDto = await _productRatingsService.getProductRatings(p.id);
                var productWithRating = new 
                {
                    p.id,
                    p.name,
                    p.price,
                    p.imageUrl,
                    rating = (float)Math.Round(ratingDto.rating, 1)
                };
                productRatings.Add(productWithRating);
            }
            
            if(!productRatings.Any()) return NotFound(new {message="No products found", status = 404});
            return Ok(productRatings);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
}