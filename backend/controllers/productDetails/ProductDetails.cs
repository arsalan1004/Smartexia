using ApiDependencies.DTOs.productDetailsDto;
using ApiDependencies.filters.authFiler;
using ApiDependencies.services.productDetailsServices;
using backend.data;
using backend.DTOs.productDetailsDto;
using backend.services.productDetailsServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.productDetails;

[ApiController]
public class ProductDetails:Controller
{
    private readonly ProductFirmwareService _productFirmwareService;
    private readonly ProductProtocolService _productProtocolService;
    private readonly ProductNetworkBandService  _productNetworkBandService;
    private readonly ProductReviewsService _productReviewsService;
    private readonly ProductRatingsService _productRatingsService;

    private readonly smartexiaContext _smartexiaContext;
    
    public ProductDetails(ProductFirmwareService productFirmwareService, ProductProtocolService productProtocolService, ProductNetworkBandService productNetworkBandService, ProductReviewsService productReviewsService, smartexiaContext smartexiaContext, ProductRatingsService productRatingsService)
    {
        _productFirmwareService = productFirmwareService;
        _productProtocolService = productProtocolService;
        _productNetworkBandService = productNetworkBandService;
        _productReviewsService = productReviewsService;
        _productRatingsService = productRatingsService;
        _smartexiaContext = smartexiaContext;
    }

    [HttpPost]
    [Route("api/productDetails")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> GetProductDetails([FromBody] Requestdto requestdto)
    {
        try
        {
            var productFirmware =  await _productFirmwareService.getProductFirmware(requestdto.productId);
            var productProtocol =  await _productProtocolService.getProductProtocol(requestdto.productId);
            var productNetworkBand =  await _productNetworkBandService.getProductNetworkBand(requestdto.productId);
            var reviews = await _productReviewsService.getProductReviews(requestdto.productId);
            
            var product = _smartexiaContext.Product.Where(p => p.id == requestdto.productId).Include(x=>x.brand).Include(x=>x.category).Select(x => new ProductDetailsdto
            {
                id = x.id,
                name = x.name,
                description = x.description,
                imageUrl = x.imageUrl,
                price = x.price,
                brand = x.brand.name,
                category = x.category.name,
            }).ToList()[0];

            float productRating = _productRatingsService.getProductRatings(product.id).Result.rating;
            
            var productDetails = new
            {
                id = product.id,
                name = product.name,
                description = product.description,
                imageUrl = product.imageUrl,
                price = product.price,
                brand = product.brand,
                category = product.category,
                rating = (float)Math.Round(productRating,1),
                specifications = new
                {
                    firmware = productFirmware,
                    protocol = productProtocol,
                    networkBand = productNetworkBand
                },
                reviews
            };
            return Ok(productDetails);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }

}