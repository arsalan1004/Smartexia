using System.Globalization;
using ApiDependencies.DTOs.searchDto;
using backend.data;
using backend.services.productDetailsServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.searchproducts;

[ApiController]
public class ProductSearch: Controller
{
    private readonly smartexiaContext _smartexiaContext;
    private readonly ProductRatingsService _productRatingsService;

    public ProductSearch(smartexiaContext smartexiaContext, ProductRatingsService productRatingsService)
    {
        _smartexiaContext = smartexiaContext;
        _productRatingsService = productRatingsService;
    }
    
    [HttpPost]
    [Route("search/products")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> searchProducts([FromBody] searchQuerydto query)
    {
        try
        {
            TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;

            var products = await _smartexiaContext.Product
              .Where(x => x.name.Contains(textInfo.ToTitleCase(query.searchQuery))
                          && (query.filters.SubCategory == null || !query.filters.SubCategory.Any() || query.filters.SubCategory.Contains(x.subCategory))
                          && x.price >= query.priceRange.min
                          && x.price <= query.priceRange.max)
              .Select(x => new
              {
                  id = x.id,
                  name = x.name,
                  imageUrl = x.imageUrl,
                  price = x.price,
                  subCategory = x.subCategory,
              })
              .ToListAsync();
            
            var productRatings = new List<object>();

            foreach (var p in products)
            {
                var ratingDto = await _productRatingsService.getProductRatings(p.id);
                var productWithRating = new 
                {
                    p.id,
                    p.name,
                    p.imageUrl,
                    p.price,
                    p.subCategory,
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